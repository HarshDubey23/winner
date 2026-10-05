"""
Gharana / guru fingerprint analysis for PARAMPARA (experiment E1).

  analyze <strokes.csv>   real data: columns guru,cycle,matra,onset_ms,amp
  power                   planning: how many cycles per guru are needed (simulated, assumption-based)
  selftest                checks the pipeline on synthetic data (software test only, no claims)

Per cycle, the feature vector is the guru's micro-timing residual (ms) and relative accent (dB)
at each matra position of the theka, after removing that cycle's own tempo and loudness.
Classifier: z-scored nearest-centroid, leave-one-cycle-out; significance by label permutation.
"""
import sys, csv, json, os
import numpy as np

def cycle_features(onsets_ms, amps):
    """Residuals from a least-squares tempo fit, and accent in dB relative to the cycle median."""
    i = np.arange(len(onsets_ms))
    T, t0 = np.polyfit(i, onsets_ms, 1)
    resid = onsets_ms - (t0 + T * i)
    acc = 20 * np.log10(np.maximum(amps, 1e-9) / np.median(amps))
    return np.concatenate([resid, acc])

def loo_nearest_centroid(X, y):
    X = (X - X.mean(0)) / (X.std(0) + 1e-9)
    correct = 0
    for k in range(len(y)):
        m = np.ones(len(y), bool); m[k] = False
        cents = {g: X[m & (y == g)].mean(0) for g in np.unique(y)}
        pred = min(cents, key=lambda g: np.sum((X[k] - cents[g]) ** 2))
        correct += pred == y[k]
    return correct / len(y)

def permutation_p(X, y, acc, n=1000, seed=0):
    rng = np.random.default_rng(seed)
    hits = sum(loo_nearest_centroid(X, rng.permutation(y)) >= acc for _ in range(n))
    return (hits + 1) / (n + 1)

def analyze(path, n_perm=1000):
    rows = list(csv.DictReader(open(path)))
    cycles = {}
    for r in rows:
        cycles.setdefault((r["guru"], r["cycle"]), []).append((int(r["matra"]), float(r["onset_ms"]), float(r["amp"])))
    X, y = [], []
    for (g, c), v in cycles.items():
        v.sort()
        X.append(cycle_features(np.array([a[1] for a in v]), np.array([a[2] for a in v]))); y.append(g)
    X, y = np.array(X), np.array(y)
    acc = loo_nearest_centroid(X, y)
    n_pos = X.shape[1] // 2
    prof = {g: {"timing_ms": X[y == g, :n_pos].mean(0).round(1).tolist(),
                "accent_db": X[y == g, n_pos:].mean(0).round(2).tolist(),
                "cycles": int((y == g).sum())} for g in np.unique(y)}
    res = {"accuracy": round(float(acc), 3), "chance": round(1 / len(np.unique(y)), 3),
           "permutation_p": permutation_p(X, y, acc, n_perm), "profiles": prof}
    print(json.dumps(res, indent=2)); return res

def synth(n_guru, n_cyc, between_t, within_t, between_a, within_a, rng, n_pos=16, T=750.0):
    """Assumption-based synthetic gurus: each has a mean timing and accent profile per matra."""
    base_acc = np.array([3, 0, 0, 1, 2, 0, 0, 1, 2, -2, -2, -1, 1, 0, 0, 1], float)[:n_pos]  # bhari/khali contour
    X, y = [], []
    for g in range(n_guru):
        mt = rng.normal(0, between_t, n_pos); ma = base_acc + rng.normal(0, between_a, n_pos)
        tempo = T * rng.uniform(0.97, 1.03)
        for c in range(n_cyc):
            on = np.arange(n_pos) * tempo + mt + rng.normal(0, within_t, n_pos)
            amp = 10 ** ((ma + rng.normal(0, within_a, n_pos)) / 20)
            X.append(cycle_features(on, amp)); y.append(g)
    return np.array(X), np.array(y)

def power():
    rng = np.random.default_rng(7)
    within_t, within_a = 15.0, 1.5          # assumed cycle-to-cycle variability (ms, dB)
    grid_t = [3, 6, 10]                     # assumed between-guru spread of mean timing per position (ms)
    cycles = [3, 5, 10, 20, 30]
    out = {}
    for bt in grid_t:
        ba = bt / 10.0                      # matching accent spread (dB): 0.3, 0.6, 1.0
        out[bt] = []
        for nc in cycles:
            accs = [loo_nearest_centroid(*synth(3, nc, bt, within_t, ba, within_a, rng)) for _ in range(40)]
            out[bt].append(round(float(np.mean(accs)), 3))
    print(json.dumps({"cycles_per_guru": cycles, "accuracy_by_between_timing_ms": out,
                      "assumptions": {"gurus": 3, "within_timing_ms": within_t, "within_accent_db": within_a}}, indent=2))
    import matplotlib; matplotlib.use("Agg"); import matplotlib.pyplot as plt
    fig, ax = plt.subplots(figsize=(9, 3.9), dpi=200)
    cols = ["#B8901A", "#1F4E79", "#7A1F1F"]
    for (bt, accs), c in zip(out.items(), cols):
        ax.plot(cycles, accs, "o-", color=c, lw=2, label=f"guru profiles differ by {bt} ms (and {bt/10:.1f} dB) per matra")
    ax.axhline(1 / 3, ls="--", color="#888", lw=1); ax.text(30, 1 / 3 + 0.02, "chance (3 gurus)", ha="right", fontsize=7, color="#666")
    ax.set_xlabel("Recorded theka cycles per guru (1 cycle ≈ 12 s at 80 matras/min)", fontsize=8)
    ax.set_ylabel("Leave-one-cycle-out accuracy", fontsize=8); ax.set_ylim(0.2, 1.02)
    ax.set_title("Planning E1: how many cycles must each guru record? (simulated; assumptions in text)", fontsize=8.5)
    ax.grid(alpha=0.25); ax.spines[["top", "right"]].set_visible(False); ax.tick_params(labelsize=8)
    fig.legend(*ax.get_legend_handles_labels(), fontsize=7, frameon=False, loc="lower center", ncol=3)
    fig.tight_layout(rect=(0, 0.08, 1, 1))
    fig.savefig(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "figures", "fingerprint_power.png"))
    with open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "fingerprint_power.json"), "w") as f:
        json.dump(out, f, indent=2)

def selftest():
    rng = np.random.default_rng(1)
    X, y = synth(3, 20, 10, 15, 1.0, 1.5, rng)
    acc = loo_nearest_centroid(X, y); assert acc > 0.6, acc
    Xn, yn = synth(3, 20, 0.0, 15, 0.0, 1.5, rng)       # no real difference between gurus
    accn = loo_nearest_centroid(Xn, yn); assert accn < 0.6, accn
    print("selftest ok: separable", round(acc, 2), "| null", round(accn, 2))

if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "selftest"
    {"analyze": lambda: analyze(sys.argv[2]), "power": power, "selftest": selftest}[cmd]()
