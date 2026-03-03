import numpy as np

def detect_anomaly(amounts, threshold_file='training/outputs/anomaly-thresholds.npy'):
    """
    Simple z-score based anomaly detection.
    amounts: list or np.array of transaction values (in wei or normalized)
    """
    try:
        thresholds = np.load(threshold_file)
        mean, std = thresholds[0], thresholds[1]
    except:
        # Fallback defaults if file missing
        mean, std = 100, 500
    
    amounts = np.array(amounts)
    z_scores = np.abs((amounts - mean) / std)
    anomalies = z_scores > 3.0  # standard threshold
    
    return {
        'anomalies': anomalies.tolist(),
        'flagged_indices': np.where(anomalies)[0].tolist(),
        'z_scores': z_scores.tolist()
    }