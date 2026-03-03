import numpy as np

def analyze_yield(current_apy, protocol='Aave', baseline_file='training/outputs/yield-baselines.npy'):
    try:
        baselines = np.load(baseline_file)
        avg_apy = baselines[0]
        risk_threshold = baselines[1]
    except:
        avg_apy, risk_threshold = 5.0, 2.0  # fallback
    
    diff = current_apy - avg_apy
    risk = 'low'
    alert = ''
    
    if diff > 1.5:
        alert = f"Migrate to {protocol} for +{diff:.1f}% better APY!"
    elif diff < -risk_threshold:
        risk = 'high'
        alert = f"Risk detected: {protocol} yield dropped {abs(diff):.1f}% below baseline"
    
    return {
        'current_apy': current_apy,
        'baseline_apy': avg_apy,
        'difference': diff,
        'risk_level': risk,
        'alert': alert
    }