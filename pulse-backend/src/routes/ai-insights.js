// pulse-backend/src/routes/ai-insights.js
const express = require('express');
const { createPublicClient, http } = require('viem');
const { polygon } = require('viem/chains');
const { summarizeTx } = require('../../../ai-models/inference/summarization');
const { detect_anomaly } = require('../../../ai-models/inference/anomaly-detection'); 

const router = express.Router();

const publicClient = createPublicClient({
  chain: polygon,
  transport: http(process.env.POLYGON_RPC_URL || 'https://polygon.drpc.org'),
});

router.get('/live-tx-insights', async (req, res) => {
  try {
    const blockNumber = await publicClient.getBlockNumber();
    const block = await publicClient.getBlock({
      blockNumber: blockNumber - 5n, // last few blocks for recent activity
      includeTransactions: true,
    });

    const recentTxs = block.transactions.slice(0, 20).map(tx => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to || '0x0',
      value: tx.value ? Number(tx.value) / 1e18 : 0, // in POL
    }));

    const insights = recentTxs.map(tx => {
      const summary = summarizeTx(tx);
      const isAnomaly = detect_anomaly([tx.value])[0] || false;
      return {
        ...tx,
        aiSummary: summary,
        anomalyFlag: isAnomaly,
        riskLevel: isAnomaly ? 'high' : 'normal',
      };
    });

    res.json({
      success: true,
      latestBlock: Number(blockNumber),
      insights,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('AI insights error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Optional: POST for batch anomaly check from frontend
router.post('/batch-anomaly', (req, res) => {
  const { values } = req.body; // array of numbers (e.g. amounts)
  if (!Array.isArray(values)) return res.status(400).json({ error: 'Invalid input' });

  const anomalies = detect_anomaly(values);
  res.json({ anomalies, details: anomalies.map((a, i) => ({ index: i, flagged: a })) });
});

module.exports = router;