function summarizeTx(tx) {
  const { from, to, value, token = 'POL', hash } = tx;
  
  let summary = `Tx ${hash.slice(0,8)}...: `;
  
  if (value > 1000) {
    summary += `Whale movement detected – ${value.toLocaleString()} ${token} `;
  } else if (value > 100) {
    summary += `Significant transfer of ${value.toLocaleString()} ${token} `;
  } else {
    summary += `Standard tx of ${value} ${token} `;
  }
  
  summary += `from ${from.slice(0,6)}... to ${to.slice(0,6)}...`;
  
  if (to.toLowerCase().includes('0xquickswap')) {
    summary += ' → QuickSwap swap';
  }
  
  return summary;
}

module.exports = { summarizeTx };