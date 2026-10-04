"""Turning shadow measurements into three coaching scores: TIMING, CONTACT, SHAPE.

Inputs per frame (60 Hz), all measured from the shadow / heel plank:
    x, y : shadow centroid on the screen (mm)
    d    : puppet-to-screen distance from the shadow physics (mm)
    beats: heel-plank strike times (s)
"""
import numpy as np

FS = 60.0
BEAT = 0.6  # 100 beats per minute


def _ease(t, keys):
    """Piecewise cosine-eased interpolation through (time, value) keyframes."""
    ts, vs = zip(*keys)
    out = np.empty_like(t)
    for i, ti in enumerate(t):
        j = np.searchsorted(ts, ti) - 1
        j = int(np.clip(j, 0, len(ts) - 2))
        a = np.clip((ti - ts[j]) / (ts[j + 1] - ts[j]), 0, 1)
        a = 0.5 - 0.5 * np.cos(np.pi * a)
        out[i] = vs[j] + (vs[j + 1] - vs[j]) * a
    return out


def synth_performance(kind, rng, depth_noise_mm=3.0):
    """A one-phrase entry-bow-loom-gesture-exit sequence on an 8-beat cycle."""
    beats = 0.3 + BEAT * np.arange(9)
    t = np.arange(0, beats[-1] + 0.3, 1 / FS)
    lag = 0.18 if kind == "late_180ms" else 0.0
    b = beats + lag
    x = _ease(t, [(0, -250), (b[0], -250), (b[2], 0), (b[6], 0), (b[6] + .3, 80), (b[7], 0), (b[8], 250), (t[-1] + 1, 250)])
    bow = 0 if kind == "missed_bow" else 40
    y = _ease(t, [(0, 0), (b[3], 0), (b[3] + .3, bow), (b[4], 0), (t[-1] + 1, 0)])
    d = _ease(t, [(0, 0), (b[5], 0), (b[5] + .3, 150), (b[5] + .6, 0), (t[-1] + 1, 0)])
    if kind == "contact_lapse":
        d = d + _ease(t, [(0, 0), (b[1], 0), (b[1] + .4, 50), (b[4] - .4, 55), (b[4], 0), (t[-1] + 1, 0)])
    if kind != "master":
        x = x + rng.normal(0, 1.5, len(t))
        y = y + rng.normal(0, 1.5, len(t))
    d_meas = np.clip(d + rng.normal(0, depth_noise_mm, len(t)), 0, None)
    return {"t": t, "x": x, "y": y, "d": d_meas, "d_true": d, "beats": beats}


def _lag(master, learner):
    """Lag (s) maximising correlation of the speed profiles."""
    def speed(p):
        return np.hypot(np.gradient(p["x"]), np.gradient(p["y"])) * FS + np.abs(np.gradient(p["d"])) * FS * 0.2
    a, b = speed(master), speed(learner)
    a, b = a - a.mean(), b - b.mean()
    max_shift = int(0.5 * FS)
    shifts = range(-max_shift, max_shift + 1)
    cc = [np.dot(a[max(0, -s):len(a) - max(0, s)], b[max(0, s):len(b) - max(0, -s)]) for s in shifts]
    return shifts[int(np.argmax(cc))] / FS


def _dtw(a, b, band=40):
    """DTW with path; returns the 99th percentile of aligned frame distances (mm)."""
    n, m = len(a), len(b)
    D = np.full((n + 1, m + 1), np.inf)
    D[0, 0] = 0
    cost = np.linalg.norm(a[:, None, :] - b[None, :, :], axis=2)
    for i in range(1, n + 1):
        for j in range(max(1, i - band), min(m, i + band) + 1):
            D[i, j] = cost[i - 1, j - 1] + min(D[i - 1, j], D[i, j - 1], D[i - 1, j - 1])
    i, j, d = n, m, []
    while i > 0 and j > 0:
        d.append(cost[i - 1, j - 1])
        step = np.argmin([D[i - 1, j - 1], D[i - 1, j], D[i, j - 1]])
        i, j = (i - 1, j - 1) if step == 0 else ((i - 1, j) if step == 1 else (i, j - 1))
    return float(np.percentile(d, 99))


def score_performance(master, learner, contact_mm=10.0):
    lag = _lag(master, learner)
    k = int(round(lag * FS))
    sl = slice(max(0, k), len(learner["t"]) + min(0, k))
    sm = slice(max(0, -k), len(master["t"]) - max(0, k))
    m_contact = master["d"][sm] < contact_mm
    l_contact = learner["d"][sl] < contact_mm
    agree = float(np.mean(m_contact == l_contact))
    A = np.stack([master["x"][sm], master["y"][sm]], 1)[::2]
    B = np.stack([learner["x"][sl], learner["y"][sl]], 1)[::2]
    shape = float(_dtw(A, B))
    return {
        "timing_lag_ms": round(lag * 1000),
        "contact_agreement": round(agree, 3),
        "shape_p99_mm": round(shape, 2),
        "flags": [f for f, bad in [("TIMING", abs(lag) > 0.1), ("CONTACT", agree < 0.9), ("SHAPE", shape > 15.0)] if bad],
    }
