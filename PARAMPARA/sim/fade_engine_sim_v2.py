"""
PARAMPARA fade-engine simulation, v2: realistic practice conditions.
Still a controller check, NOT evidence of human learning.

What changes from v1 (fade_engine_sim.py):
  * Practice is split into 3 sessions of 16 cycles on different days, with overnight
    forgetting between sessions (skill loses a random 5–20% of its gain).
  * Learners differ a lot: learning rate is log-normal (about 8× spread between the
    10th and 90th percentile) instead of a narrow normal.
  * Retention is measured at the START of a 4th day, after one more night of forgetting,
    with no cues: this is the pilot's primary outcome.
  * Fade Engine 2.1 = v2 + a probe at the start of every session (re-anchors the skill
    estimate after forgetting).
The fixed linear fade cannot see sessions or learners; it falls from 1 to 0 over 36 cycles.
"""
import json, os
import numpy as np

N, SESS, CYC = 1000, 3, 16
B, W, NOISE = 0.6, 0.35, 0.05
MASTERY, STEP, S_LO = 0.85, 0.20, 0.50

def h(model, g, s):
    if model == "A":
        return np.exp(-((g - np.clip(0.9 - s, 0, 1)) ** 2) / (2 * W ** 2))
    if model == "B":
        return np.exp(-((g - 0.4) ** 2) / (2 * W ** 2))
    return 1.0 - 0.5 * g

def run(policy, model, s0, eta, forget, rng):
    s, g, s_hat, k = s0, 1.0, None, 0
    perf = lambda s, g: float(np.clip(s + (1 - s) * B * g + rng.normal(0, NOISE), 0, 1))
    learn = lambda s, g: s + eta * (1 - s) * h(model, g, s)
    for day in range(SESS):
        if day > 0:
            s = s0 + (s - s0) * (1 - forget[day - 1])          # overnight forgetting
        since_probe, scores = 0, []
        if policy == "adaptive_v21" and day > 0:               # session-start probe
            sc = perf(s, 0.0); s = learn(s, 0.0); k += 1
            s_hat = sc if s_hat is None else 0.5 * s_hat + 0.5 * sc
            g = float(np.clip(np.clip(1 - s_hat / MASTERY, 0, 1), g - STEP, g + STEP))
        for c in range(CYC):
            if policy == "always_on":
                ge = 1.0
            elif policy == "no_guidance":
                ge = 0.0
            elif policy == "linear_fade":
                ge = max(0.0, 1 - k / 36)
            else:  # adaptive_v2 / adaptive_v21
                if since_probe >= 4:
                    sc = perf(s, 0.0); s = learn(s, 0.0); k += 1; since_probe = 0
                    s_hat = sc if s_hat is None else 0.5 * s_hat + 0.5 * sc
                    tgt = float(np.clip(1 - s_hat / MASTERY, 0, 1))
                    g = float(np.clip(tgt, g - STEP, g + STEP)); g = 0.0 if g < 0.05 else g
                    continue
                ge = g
            sc = perf(s, ge); s = learn(s, ge); k += 1
            if policy.startswith("adaptive"):
                since_probe += 1; scores.append(sc)
                if g > 0 and len(scores) >= 2 and scores[-1] < S_LO and scores[-2] < S_LO:
                    g = min(1.0, g + STEP)
    s_ret = s0 + (s - s0) * (1 - forget[-1])                    # night before the retention test
    return float(np.mean([perf(s_ret, 0.0) for _ in range(3)]))

POL = ["always_on", "no_guidance", "linear_fade", "adaptive_v2", "adaptive_v21"]

def main():
    out = {}
    for model in "ABC":
        rng = np.random.default_rng(2026)
        s0 = rng.uniform(0.05, 0.30, N)
        eta = np.clip(rng.lognormal(np.log(0.04), 0.8, N), 0.005, 0.2)
        forget = rng.uniform(0.05, 0.20, (N, SESS))
        res = {p: np.array([run(p, model, s0[i], eta[i], forget[i], np.random.default_rng(11 + 3 * i)) for i in range(N)]) for p in POL}
        q = np.quantile(eta, [1 / 3, 2 / 3]); grp = np.digitize(eta, q)
        out[model] = {p: {"retention_mean": round(float(res[p].mean()), 3),
                          "retention_sd": round(float(res[p].std()), 3),
                          "slow_mid_fast": [round(float(res[p][grp == j].mean()), 3) for j in range(3)]} for p in POL}
        d = res["adaptive_v21"] - res["linear_fade"]
        boot = [np.mean(np.random.default_rng(b).choice(d, len(d))) for b in range(2000)]
        out[model]["v21_minus_linear"] = {"mean": round(float(d.mean()), 3),
                                          "ci95": [round(float(np.percentile(boot, 2.5)), 3), round(float(np.percentile(boot, 97.5)), 3)],
                                          "share_learners_better": round(float((d > 0).mean()), 3)}
    here = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(here, "fade_sim_v2_results.json"), "w") as f:
        json.dump(out, f, indent=2)
    print(json.dumps(out, indent=2))

if __name__ == "__main__":
    main()
