import numpy as np

def detectAnomaly(data):
  thresholds = np.load('../outputs/anomaly-thresholds.npy')
  # Logic...
  return "Anomaly detected" if any(thresholds > 3) else "Normal"