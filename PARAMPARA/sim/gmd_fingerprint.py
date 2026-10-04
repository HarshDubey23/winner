"""
Real-data check of the PARAMPARA fingerprint idea on the Groove MIDI Dataset (GMD).

GMD (Gillick et al., ICML 2019; CC BY 4.0): 10 drummers, 1,150 MIDI performances on one
electronic kit (Roland TD-11), recorded to a click over several sessions. Four drummers also
played the SAME ten written grooves (the eval session): the drum equivalent of "every master
plays the same theka differently".

The question is the one a hostile judge asks of PARAMPARA's E1: does a performer fingerprint
survive a new recording session and a different style, or is the classifier recognising the
session set-up or the music? We use only HOW the drummer plays (micro-timing against the click
and loudness, per drum and per metrical position), never WHICH notes are written.

Tests (balanced accuracy, chance = 1 / number of drummers):
  naive         bars shuffled at random (inflated: the same performance in train and test)
  T-a           hold out one drummer-session: trained on other days, name the drummer on a new day
  T-b           hold out one style for everyone: name the drummer in a style never seen in training
  T-ab          both at once: new day AND new style
  eval          4 drummers, identical grooves: trained on their own sessions, tested on the eval session
  control       the same eval test using only the written pattern (which notes, not how) - should be weak
  T-c           same drummer in different styles closer than different drummers in the same style?
                (drummer labels permuted within style, 1,000 times)

Usage:
  curl -sSO https://storage.googleapis.com/magentadata/datasets/groove/groove-v1.0.0-midionly.zip
  unzip -q groove-v1.0.0-midionly.zip
  python3 gmd_fingerprint.py path/to/groove        # writes gmd_fingerprint_results.json

Units: one 4/4 bar (4 beats), and four bars (16 beats, the length of one Teentaal cycle).
E1-sized check: every trio of drummers (chance 33%) against E1's 70% pass mark.
"""
import sys, os, csv, json, collections
import numpy as np
import mido

GROUPS = {"kick": {35, 36}, "snare": {37, 38, 40}, "hats/ride": {22, 26, 42, 44, 46, 51, 53, 59}}
CLASSES = {"beat": {0, 4, 8, 12}, "offbeat 8th": {2, 6, 10, 14}, "16th": {1, 3, 5, 7, 9, 11, 13, 15}}
MIN_HITS = 8


def notes_of(path):
    t, out = 0.0, []
    for msg in mido.MidiFile(path):
        t += msg.time
        if msg.type == "note_on" and msg.velocity > 0:
            out.append((t, msg.note, msg.velocity))
    return out


def bar_features(path, bpm):
    """One row per 4/4 bar: mean offset (ms) and velocity per drum group x metrical class, plus spreads."""
    s16 = 60.0 / bpm / 4
    bars = collections.defaultdict(list)
    for t, note, vel in notes_of(path):
        k = int(round(t / s16))
        off = (t - k * s16) * 1000.0
        if abs(off) > 0.35 * s16 * 1000:  # ambiguous (e.g. triplet) notes are left out
            continue
        g = next((name for name, s in GROUPS.items() if note in s), None)
        if g:
            bars[k // 16].append((g, k % 16, off, vel))
    rows, pats = [], []
    for b, hits in sorted(bars.items()):
        if len(hits) < MIN_HITS:
            continue
        f = []
        for g in GROUPS:
            for c, steps in CLASSES.items():
                sel = [(o, v) for gg, st, o, v in hits if gg == g and st in steps]
                f += [np.mean([o for o, _ in sel]) if sel else np.nan, np.mean([v for _, v in sel]) if sel else np.nan]
            sel = [(o, v) for gg, st, o, v in hits if gg == g]
            f += [np.std([o for o, _ in sel]) if len(sel) > 1 else np.nan, np.std([v for _, v in sel]) if len(sel) > 1 else np.nan]
        pat = np.zeros(len(GROUPS) * 16)
        for gg, st, _, _ in hits:
            pat[list(GROUPS).index(gg) * 16 + st] = 1
        rows.append(f)
        pats.append(pat)
    return rows, pats


FEATURE_NAMES = [f"{g} {c} {q}" for g in GROUPS for c in list(CLASSES) + ["all"]
                 for q in (["offset_ms", "velocity"] if c != "all" else ["offset_sd", "velocity_sd"])]


def load(root, bars_per_unit=1):
    """bars_per_unit=4 gives 16-beat units, the length of one Teentaal cycle."""
    info = [r for r in csv.DictReader(open(os.path.join(root, "info.csv")))
            if r["beat_type"] == "beat" and r["time_signature"] == "4-4"]
    X, P, meta = [], [], []
    for r in info:
        rows, pats = bar_features(os.path.join(root, r["midi_filename"]), float(r["bpm"]))
        for i in range(0, len(rows) - bars_per_unit + 1, bars_per_unit):
            with np.errstate(all="ignore"):
                import warnings
                with warnings.catch_warnings():
                    warnings.simplefilter("ignore", RuntimeWarning)
                    X.append(np.nanmean(np.array(rows[i:i + bars_per_unit], float), 0))
            P.append(np.mean(pats[i:i + bars_per_unit], 0))
            meta.append((r["drummer"], r["session"].split("/")[1], r["style"].split("/")[0], r["id"]))
    return np.array(X, float), np.array(P, float), meta


# ---- classifier: z-scored nearest centroid, NaNs imputed with training means ------------------
def fit_predict(Xtr, ytr, Xte):
    mu = np.nanmean(Xtr, 0)
    Xtr = np.where(np.isnan(Xtr), mu, Xtr); Xte = np.where(np.isnan(Xte), mu, Xte)
    sd = Xtr.std(0) + 1e-9
    Xtr = (Xtr - mu) / sd; Xte = (Xte - mu) / sd
    labels = sorted(set(ytr))
    C = np.array([Xtr[ytr == g].mean(0) for g in labels])
    d = ((Xte[:, None, :] - C[None]) ** 2).sum(-1)
    return np.array(labels)[d.argmin(1)]


def balanced(y, pred):
    return float(np.mean([np.mean(pred[y == g] == g) for g in sorted(set(y))]))


def fold_eval(X, y, folds):
    """folds: list of (train_mask, test_mask). Pools predictions, returns balanced accuracy."""
    ys, ps = [], []
    for tr, te in folds:
        if te.sum() == 0 or len(set(y[tr])) < 2 or y[te][0] not in set(y[tr]):
            continue
        ys.append(y[te]); ps.append(fit_predict(X[tr], y[tr], X[te]))
    ys, ps = np.concatenate(ys), np.concatenate(ps)
    return balanced(ys, ps), len(ys)


def analyse(root, bars_per_unit=1, n_perm=1000, seed=0):
    rng = np.random.default_rng(seed)
    X, P, meta = load(root, bars_per_unit)
    drum = np.array([m[0] for m in meta]); sess = np.array([m[1] for m in meta])
    style = np.array([m[2] for m in meta]); perf = np.array([m[3] for m in meta])
    res = {"bars_per_unit": bars_per_unit, "units_total": int(len(X))}

    # Drummers with at least two sessions and 100 bars (excluding the shared eval session).
    own = sess != "eval_session"
    keep = [d for d in sorted(set(drum)) if len(set(sess[(drum == d) & own])) >= 2 and ((drum == d) & own).sum() >= 100]
    m = own & np.isin(drum, keep)
    Xm, ym, sm, stm = X[m], drum[m], sess[m], style[m]
    K = len(keep)
    res["drummers"] = keep; res["chance"] = round(1 / K, 3); res["units_used"] = int(m.sum())

    idx = rng.permutation(len(ym)); parts = np.array_split(idx, 5)
    naive = []
    for p in parts:
        te = np.zeros(len(ym), bool); te[p] = True
        naive.append((~te, te))
    res["naive_random_split"] = round(fold_eval(Xm, ym, naive)[0], 3)

    cells = sorted(set(zip(ym, sm)))
    fa = [(~((ym == d) & (sm == s)), (ym == d) & (sm == s)) for d, s in cells]
    res["T-a_new_session"], res["T-a_test_units"] = fold_eval(Xm, ym, fa)

    fb = []
    for st in sorted(set(stm)):
        for d in keep:
            te = (stm == st) & (ym == d)
            if te.sum() >= 10 // bars_per_unit:
                fb.append((stm != st, te))
    res["T-b_new_style"], res["T-b_test_units"] = fold_eval(Xm, ym, fb)

    fab = []
    for d, s in cells:
        for st in sorted(set(stm[(ym == d) & (sm == s)])):
            te = (ym == d) & (sm == s) & (stm == st)
            if te.sum() >= 10 // bars_per_unit:
                fab.append(((stm != st) & ~((ym == d) & (sm == s)), te))
    res["T-ab_new_session_and_style"], res["T-ab_test_units"] = fold_eval(Xm, ym, fab)

    # Same grooves: drummers who played the shared eval session.
    ev_d = sorted(set(drum[sess == "eval_session"]))
    tr = own & np.isin(drum, ev_d); te = sess == "eval_session"
    pred = fit_predict(X[tr], drum[tr], X[te])
    res["eval_drummers"] = ev_d
    res["eval_same_grooves"] = round(balanced(drum[te], pred), 3)
    res["eval_chance"] = round(1 / len(ev_d), 3)
    predp = fit_predict(P[tr], drum[tr], P[te])
    res["control_pattern_only_eval"] = round(balanced(drum[te], predp), 3)
    # Per-groove result: each of the 10 shared grooves, majority vote over its bars.
    gid = np.array([m_[3].split("/")[-1] for m_ in meta])[te]
    votes = collections.defaultdict(list)
    for d_, g_, p_ in zip(drum[te], gid, pred):
        votes[(d_, g_)].append(p_)
    correct = [collections.Counter(v).most_common(1)[0][0] == d_ for (d_, g_), v in votes.items()]
    res["eval_performances_named_correctly"] = f"{sum(correct)} of {len(correct)}"

    # T-c: confound gap on drummer x style cell centroids.
    mu = np.nanmean(Xm, 0); Z = np.where(np.isnan(Xm), mu, Xm); Z = (Z - Z.mean(0)) / (Z.std(0) + 1e-9)
    cell = [(d, st) for d in keep for st in sorted(set(stm)) if ((ym == d) & (stm == st)).sum() >= 30 // bars_per_unit]
    C = np.array([Z[(ym == d) & (stm == st)].mean(0) for d, st in cell])
    cd = np.array([c[0] for c in cell]); cs = np.array([c[1] for c in cell])
    D = np.sqrt(((C[:, None] - C[None]) ** 2).sum(-1))

    def gap(lab):
        a = [D[i, j] for i in range(len(cell)) for j in range(i + 1, len(cell)) if lab[i] != lab[j] and cs[i] == cs[j]]
        b = [D[i, j] for i in range(len(cell)) for j in range(i + 1, len(cell)) if lab[i] == lab[j] and cs[i] != cs[j]]
        return np.mean(a) - np.mean(b)

    obs = gap(cd)
    null = []
    for _ in range(n_perm):
        lab = cd.copy()
        for st in set(cs):
            ii = np.where(cs == st)[0]; lab[ii] = rng.permutation(lab[ii])
        null.append(gap(lab))
    res["T-c_cells"] = len(cell)
    res["T-c_gap"] = round(float(obs), 3)
    res["T-c_p"] = round(float((1 + np.sum(np.array(null) >= obs)) / (1 + n_perm)), 4)

    # E1-sized check: every trio of drummers (chance 33%), the same tests as E1's T-a and T-ab.
    import itertools
    trio = {"T-a": [], "T-ab": []}
    for tri in itertools.combinations(keep, 3):
        mm = np.isin(ym, tri)
        X3, y3, s3, st3 = Xm[mm], ym[mm], sm[mm], stm[mm]
        c3 = sorted(set(zip(y3, s3)))
        trio["T-a"].append(fold_eval(X3, y3, [(~((y3 == d) & (s3 == s)), (y3 == d) & (s3 == s)) for d, s in c3])[0])
        f3 = []
        for d, s in c3:
            for st in sorted(set(st3[(y3 == d) & (s3 == s)])):
                te_ = (y3 == d) & (s3 == s) & (st3 == st)
                if te_.sum() >= 10 // bars_per_unit:
                    f3.append(((st3 != st) & ~((y3 == d) & (s3 == s)), te_))
        trio["T-ab"].append(fold_eval(X3, y3, f3)[0])
    for k, v in trio.items():
        v = np.array(v)
        res[f"trios_{k}_mean"] = round(float(v.mean()), 3)
        res[f"trios_{k}_min_max"] = [round(float(v.min()), 3), round(float(v.max()), 3)]
        res[f"trios_{k}_share_at_least_70pct"] = f"{int((v >= 0.7).sum())} of {len(v)}"

    # Profiles for the figure: eval session, mean offset per drum group on beats vs offbeats.
    prof = {}
    for d in ev_d:
        sel = X[(drum == d) & te]
        prof[d] = {FEATURE_NAMES[i]: round(float(np.nanmean(sel[:, i])), 2) for i in range(len(FEATURE_NAMES))}
        prof[d]["units"] = int(len(sel))
    res["eval_profiles"] = prof
    for k in ["T-a_new_session", "T-b_new_style", "T-ab_new_session_and_style"]:
        res[k] = round(res[k], 3)
    return res


if __name__ == "__main__":
    root = sys.argv[1] if len(sys.argv) > 1 else "groove"
    out = {"one_bar_4_beats": analyse(root, 1), "four_bars_16_beats": analyse(root, 4)}
    path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gmd_fingerprint_results.json")
    json.dump(out, open(path, "w"), indent=2)
    for unit, r in out.items():
        print(unit, json.dumps({k: v for k, v in r.items() if k != "eval_profiles"}, indent=1))
