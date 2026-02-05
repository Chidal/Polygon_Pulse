import numpy as np
from scipy import stats

# Load data
data = np.loadtxt('../data/tx-sample.csv', delimiter=',', skiprows=1, usecols=(3,))  # Amounts

# Simple anomaly detection: Z-score
z_scores = np.abs(stats.zscore(data))
anomalies = data[z_scores > 3]

print(f"Anomalies: {anomalies}")

# Save model (e.g., thresholds)
np.save('../outputs/anomaly-thresholds.npy', z_scores)