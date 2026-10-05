"""
PARAMPARA fade-engine simulation: a controller check, NOT evidence of human learning.

Engineering test T13 asks: does the fade rule stay stable (no oscillation), reach
zero guidance inside the pilot's 48 cycles, and recover after bad cycles?

Learner (assumed):
  performance  P  = s + (1 - s) * B * g + noise     (guidance covers part of the gap)
  learning     ds = eta * (1 - s) * h(g, s)         (saturating, power-law-like)
Three assumptions about h() are tested, because the ranking of policies depends on them:
  A "challenge point":   h = exp(-(g - clip(0.9 - s))^2 / 2w^2)  (novices need more help)
  B "fixed optimum":     h = exp(-(g - 0.4)^2 / 2w^2)            (dossier's original)
  C "guidance hurts":    h = 1 - 0.5 g                            (strong guidance hypothesis)
Policies: always-on, no cues, fixed linear fade, adaptive v1 (dossier constants),
adaptive v2 (probe-anchored, proposed here).
"""
import json, os
import numpy as np

N_LEARNERS, N_CYCLES = 500, 48
B, W, NOISE = 0.6, 0.35, 0.05
S_HI, S_LO, LAM, M = 0.80, 0.50, 0.8, 3          # v1 constants from the dossier
MASTERY, STEP_MAX = 0.85, 0.20                   # v2 constants

def h(model, g, s):
    if model == "A":
        return np.exp(-((g - np.clip(0.9 - s, 0, 1)) ** 2) / (2 * W ** 2))
    if model == "B":
        return np.exp(-((g - 0.4) ** 2) / (2 * W ** 2))
    return 1.0 - 0.5 * g

def run(policy, model, s0, eta, rng):
    s, g = s0, 1.0
    perf = lambda s, g: float(np.clip(s + (1 - s) * B * g + rng.normal(0, NOISE), 0, 1))
    learn = lambda s, g: s + eta * (1 - s) * h(model, g, s)
    G, Sk, kinds = [], [], []
    scores, since_change, since_probe, s_hat = [], 0, 0, None
    reversals, last_dir = 0, 0
    k = 0

    def step(g_eff, kind):
        nonlocal s, k
        sc = perf(s, g_eff); s = learn(s, g_eff)
        G.append(g_eff); Sk.append(s); kinds.append(kind); k += 1
        return sc

    def track(old, new):
        nonlocal reversals, last_dir
        if new != old:
            d = 1 if new > old else -1
            if last_dir and d != last_dir:
                reversals += 1
            last_dir = d

    while k < N_CYCLES:
        if policy in ("always_on", "no_guidance", "linear_fade"):
            g = {"always_on": 1.0, "no_guidance": 0.0}.get(policy, max(0.0, 1 - k / (0.75 * N_CYCLES)))
            step(g, "guided"); continue

        if policy == "adaptive_v1":
            if g < 0.6 and since_probe >= 6:                      # two probe cycles
                sc = min(step(0.0, "probe"), step(0.0, "probe") if k < N_CYCLES else 1.0)
                since_probe = 0
                if sc < S_LO and g < 0.5:
                    track(g, 0.5); g = 0.5
                continue
            sc = step(g, "guided"); since_probe += 1
            scores.append(sc); since_change += 1; old = g
            if len(scores) >= M and np.mean(scores[-M:]) >= S_HI and since_change >= M:
                g = LAM * g; since_change = 0
            elif len(scores) >= 2 and scores[-1] < S_LO and scores[-2] < S_LO:
                g = min(1.0, g / LAM); since_change = 0
            if g < 0.05: g = 0.0
            track(old, g); continue

        # adaptive_v2: one probe every 4 guided cycles from the start; the probe score is
        # a direct estimate of unaided skill; guidance tracks the remaining gap to mastery,
        # rate-limited, with an assist-as-needed return on two failed guided cycles.
        if since_probe >= 4:
            sc = step(0.0, "probe"); since_probe = 0
            s_hat = sc if s_hat is None else 0.5 * s_hat + 0.5 * sc
            target = float(np.clip(1 - s_hat / MASTERY, 0, 1))
            old = g; g = float(np.clip(target, g - STEP_MAX, g + STEP_MAX))
            if g < 0.05: g = 0.0
            track(old, g); continue
        sc = step(g, "guided"); since_probe += 1
        scores.append(sc)
        if g > 0 and len(scores) >= 2 and scores[-1] < S_LO and scores[-2] < S_LO:
            old = g; g = min(1.0, g + STEP_MAX); track(old, g)

    probe = float(np.mean([perf(s, 0.0) for _ in range(3)]))
    return dict(G=G, S=Sk, kinds=kinds, final_s=s, probe=probe, reversals=reversals)

POLICIES = ["always_on", "no_guidance", "linear_fade", "adaptive_v1", "adaptive_v2"]

def simulate(model, seed=26214):
    rng = np.random.default_rng(seed)
    s0 = rng.uniform(0.05, 0.30, N_LEARNERS)
    eta = np.clip(rng.normal(0.04, 0.01, N_LEARNERS), 0.01, 0.08)
    return {p: [run(p, model, s0[i], eta[i], np.random.default_rng(seed + 7 * i)) for i in range(N_LEARNERS)]
            for p in POLICIES}

def controller_stats(runs):
    first0 = []
    for r in runs:
        idx = next((i for i, (g, kd) in enumerate(zip(r["G"], r["kinds"])) if g == 0 and kd == "guided"), None)
        first0.append(idx)
    hit = [i + 1 for i in first0 if i is not None]
    return dict(share_reaching_g0=round(len(hit) / len(runs), 3),
                median_cycle_g0=(int(np.median(hit)) if hit else None),
                reversals_per_10_cycles=round(float(np.mean([r["reversals"] for r in runs])) / 4.8, 3),
                max_reversals_one_run=int(max(r["reversals"] for r in runs)))

def main():
    here = os.path.dirname(os.path.abspath(__file__))
    results, all_runs = {}, {}
    for model in ["A", "B", "C"]:
        out = simulate(model); all_runs[model] = out
        results[model] = {p: dict(unaided_probe_mean=round(float(np.mean([r["probe"] for r in out[p]])), 3),
                                  unaided_probe_sd=round(float(np.std([r["probe"] for r in out[p]])), 3))
                          for p in POLICIES}
        results[model]["controller_v1"] = controller_stats(out["adaptive_v1"])
        results[model]["controller_v2"] = controller_stats(out["adaptive_v2"])
    with open(os.path.join(here, "fade_sim_results.json"), "w") as f:
        json.dump(results, f, indent=2)
    print(json.dumps(results, indent=2))

    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    col = {"always_on": "#B5523B", "no_guidance": "#8A8A8A", "linear_fade": "#C9A227",
           "adaptive_v1": "#7FA7C9", "adaptive_v2": "#1F4E79"}
    lab = {"always_on": "Always-on cues", "no_guidance": "No cues (video-only proxy)",
           "linear_fade": "Fixed linear fade", "adaptive_v1": "Adaptive v1 (dossier constants)",
           "adaptive_v2": "Adaptive v2 (probe-anchored)"}
    out = all_runs["A"]; x = np.arange(1, N_CYCLES + 1)
    fig, ax = plt.subplots(1, 2, figsize=(10.5, 4.3), dpi=200)
    for p in POLICIES:
        G = []
        for r in out[p]:
            g_line, last = [], 1.0
            for g, kd in zip(r["G"][:N_CYCLES], r["kinds"][:N_CYCLES]):
                last = g if kd == "guided" else last      # probe cycles (g = 0) are not drawn
                g_line.append(last)
            G.append(g_line)
        Sk = np.array([r["S"][:N_CYCLES] for r in out[p]])
        ax[0].plot(x, np.array(G).mean(0), color=col[p], lw=2, label=lab[p])
        ax[1].plot(x, Sk.mean(0), color=col[p], lw=2)
        ax[1].fill_between(x, np.percentile(Sk, 25, 0), np.percentile(Sk, 75, 0), color=col[p], alpha=0.10, lw=0)
    ax[0].set_title("Mean guidance level g on guided cycles (model A)", fontsize=9)
    ax[0].set_xlabel("Practice cycle (probe cycles at g = 0 not drawn)", fontsize=8)
    ax[0].set_ylabel("Guidance g (0 = no cues)", fontsize=8)
    ax[1].set_title("Mean internal skill s, i.e. what an unaided probe measures (band = IQR)", fontsize=9)
    ax[1].set_xlabel("Practice cycle", fontsize=8); ax[1].set_ylabel("Skill s (0-1)", fontsize=8)
    for a in ax:
        a.grid(alpha=0.25); a.spines[["top", "right"]].set_visible(False); a.tick_params(labelsize=8)
    fig.legend(*ax[0].get_legend_handles_labels(), loc="lower center", ncol=5, fontsize=7.5, frameon=False)
    fig.tight_layout(rect=(0, 0.07, 1, 1))
    fig.savefig(os.path.join(here, "..", "figures", "fade_sim.png"))

if __name__ == "__main__":
    main()
