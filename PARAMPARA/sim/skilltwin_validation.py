"""
Confound-controlled validation of a master's fingerprint (PARAMPARA Skill Twin, experiment E1).

The question a hostile judge asks: "Are you identifying the master, or their instrument,
tuning, recording session or sensor placement?"  This script answers it with three tests on
data recorded as  masters x sessions (different days, sensors re-worn) x instruments (swapped):

  T-a  Leave-one-session-out:    train on other days, predict the master on an unseen day.
  T-b  Leave-one-instrument-out: train on one tabla/loom/puppet, predict the master on the other.
  T-c  Direct confound test:     is "same master, different instrument" more similar than
                                 "different master, same instrument"?  (label permutation test)
  plus a control: how well do the same features identify the INSTRUMENT? (should be poor)

Usage:
  python3 skilltwin_validation.py demo            # two synthetic worlds (software check only)
  python3 skilltwin_validation.py analyze X.csv   # real data: columns master,session,instrument,f1..fn
"""
import sys, json, csv
import numpy as np

def zscore(X):
    return (X - X.mean(0)) / (X.std(0) + 1e-9)

def nearest_centroid_acc(Xtr, ytr, Xte, yte):
    cents = {g: Xtr[ytr == g].mean(0) for g in np.unique(ytr)}
    pred = np.array([min(cents, key=lambda g: np.sum((x - cents[g]) ** 2)) for x in Xte])
    return float(np.mean(pred == yte))

def group_out_acc(X, y, groups):
    """Leave one group out (sessions or instruments); returns mean accuracy over folds."""
    X = zscore(X)
    accs = [nearest_centroid_acc(X[groups != g], y[groups != g], X[groups == g], y[groups == g]) for g in np.unique(groups)]
    return float(np.mean(accs))

def random_cv_acc(X, y, rng, k=5):
    X = zscore(X); idx = rng.permutation(len(y)); folds = np.array_split(idx, k)
    return float(np.mean([nearest_centroid_acc(np.delete(X, f, 0), np.delete(y, f), X[f], y[f]) for f in folds]))

def confound_gap(X, master, instrument):
    """Mean distance(different master, same instrument) - mean distance(same master, different instrument).
    Positive = the master matters more than the instrument."""
    X = zscore(X)
    D = np.sqrt(((X[:, None, :] - X[None, :, :]) ** 2).sum(-1))
    sm_di = (master[:, None] == master[None, :]) & (instrument[:, None] != instrument[None, :])
    dm_si = (master[:, None] != master[None, :]) & (instrument[:, None] == instrument[None, :])
    return float(D[dm_si].mean() - D[sm_di].mean())

def confound_test(X, master, instrument, rng, n=1000):
    obs = confound_gap(X, master, instrument)
    null = [confound_gap(X, rng.permutation(master), instrument) for _ in range(n)]
    p = (1 + sum(v >= obs for v in null)) / (n + 1)
    return obs, p

def evaluate(X, master, session, instrument, seed=0, n_perm=1000):
    rng = np.random.default_rng(seed)
    obs, p = confound_test(X, master, instrument, rng, n_perm)
    res = {
        "naive_random_cv_master_acc": round(random_cv_acc(X, master, rng), 3),
        "T-a_leave_one_session_out_master_acc": round(group_out_acc(X, master, session), 3),
        "T-b_leave_one_instrument_out_master_acc": round(group_out_acc(X, master, instrument), 3),
        "T-c_confound_gap": round(obs, 3), "T-c_permutation_p": round(p, 4),
        "control_instrument_acc_leave_one_master_out": round(group_out_acc(X, instrument, master), 3),
        "chance_master": round(1 / len(np.unique(master)), 3),
        "chance_instrument": round(1 / len(np.unique(instrument)), 3),
    }
    res = _verdict(res)
    return res

def _verdict(res):
    """Pre-registered decision rule: the style claim stands only if all three tests pass."""
    ok_a = res["T-a_leave_one_session_out_master_acc"] >= 0.70
    ok_b = res["T-b_leave_one_instrument_out_master_acc"] >= 0.70
    ok_c = res["T-c_confound_gap"] > 0 and res["T-c_permutation_p"] < 0.01
    res["verdict"] = "PASS: style claim supported" if (ok_a and ok_b and ok_c) else "FAIL: drop the style claim"
    return res

def synth(world, rng, masters=3, sessions=2, instruments=2, cycles=20, n_feat=40):
    """Synthetic recordings. 'master_driven': style lives in the player. 'instrument_driven':
    features mostly reflect the instrument (a confound), with almost no true master effect."""
    m_eff = rng.normal(0, 1, (masters, n_feat))
    i_eff = rng.normal(0, 1, (instruments, n_feat))
    s_eff = rng.normal(0, 0.3, (masters, sessions, n_feat))        # day-to-day + sensor re-wearing
    a_m, a_i = (0.6, 0.15) if world == "master_driven" else (0.05, 0.9)
    X, M, S, I = [], [], [], []
    for m in range(masters):
        for s in range(sessions):
            for i in range(instruments):
                for _ in range(cycles):
                    X.append(a_m * m_eff[m] + a_i * i_eff[i] + s_eff[m, s] + rng.normal(0, 1, n_feat))
                    M.append(m); S.append(s); I.append(i)
    return np.array(X), np.array(M), np.array(S), np.array(I)

def demo():
    out = {}
    for world in ["master_driven", "instrument_driven"]:
        X, M, S, I = synth(world, np.random.default_rng(42))
        out[world] = evaluate(X, M, S, I, n_perm=500)
    print(json.dumps(out, indent=2))
    with open(__file__.replace(".py", "_demo.json"), "w") as f:
        json.dump(out, f, indent=2)
    return out

def analyze(path):
    rows = list(csv.DictReader(open(path)))
    feats = [k for k in rows[0] if k not in ("master", "session", "instrument")]
    X = np.array([[float(r[k]) for k in feats] for r in rows])
    enc = lambda col: np.unique([r[col] for r in rows], return_inverse=True)[1]
    res = evaluate(X, enc("master"), enc("session"), enc("instrument"))
    print(json.dumps(res, indent=2)); return res

if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "demo"
    demo() if cmd == "demo" else analyze(sys.argv[2])
