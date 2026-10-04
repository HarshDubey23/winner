"""Simulation experiments that test whether CHAYA's shadow-native sensing works.

Run:  python3 experiments.py        (writes results/metrics.json and figures)

E1  depth accuracy vs distance, 1080p vs 4K (translucent puppet)
E2  robustness to arm articulation (calibrated with one pose, tested with others)
E3  tilted puppet: recover top vs bottom distance from local edge blur
E4  motion blur: puppet moving 300 mm/s, exposure 1/60 s vs 1/250 s
E5  light changed without recalibration (20 mm -> 30 mm source); tube light with its own calibration
E6  end-to-end scoring of synthetic learner performances (timing / contact / shape errors)
"""
import json
import os

import cv2
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

from shadow_depth import Calibrator, edge_width, features, normalise
from shadow_sim import Camera, Puppet, Stage, capture, render_screen
from scoring import score_performance, synth_performance

OUT = os.path.join(os.path.dirname(__file__), "results")
os.makedirs(OUT, exist_ok=True)
RNG = np.random.default_rng(42)
CAL_D = [0, 25, 50, 100, 150, 200]
CAMS = {"1080p": Camera(mm_per_px=0.52), "4K": Camera(mm_per_px=0.26)}


def calibrate(stage, puppet, cam, reps=2):
    feats, ds = [], []
    for d in CAL_D:
        lum = render_screen(stage, puppet, d)
        fs = [features(capture(lum, cam, RNG), cam.mm_per_px) for _ in range(reps)]
        avg = {k: float(np.nanmean([f[k] for f in fs])) for k in ("width", "area", "n_holes")}
        avg["holes"] = fs[0]["holes"]
        feats.append(avg)
        ds.append(d)
    return Calibrator(stage.L).fit(feats, ds)


def rmse(a):
    a = np.asarray(a, float)
    a = a[np.isfinite(a)]
    return float(np.sqrt(np.mean(a ** 2))) if len(a) else float("nan")


def contact_stats(true_d, est_d, thr=10.0):
    true_d, est_d = np.asarray(true_d), np.asarray(est_d)
    pos, neg = true_d == 0, true_d >= 20
    tp = np.sum(est_d[pos] < thr)
    tn = np.sum(est_d[neg] >= thr)
    return {"pressed_detected": f"{tp}/{pos.sum()}", "away_detected": f"{tn}/{neg.sum()}",
            "accuracy": float((tp + tn) / (pos.sum() + neg.sum()))}


def e1_depth_accuracy(metrics):
    stage, pup = Stage(), Puppet()
    test_d = np.concatenate([np.zeros(15), RNG.uniform(0, 200, 45)])
    lums = [render_screen(stage, pup, d) for d in test_d]
    res = {}
    for name, cam in CAMS.items():
        cal = calibrate(stage, pup, cam)
        rows = []
        for d, lum in zip(test_d, lums):
            e = cal.estimate(features(capture(lum, cam, RNG), cam.mm_per_px))
            rows.append((d, e["width"], e["hole"], e["area"], e["fused"]))
        rows = np.array(rows)
        err = rows[:, 1:] - rows[:, :1]
        bins = {"0-50": rows[:, 0] <= 50, "50-100": (rows[:, 0] > 50) & (rows[:, 0] <= 100), "100-200": rows[:, 0] > 100}
        res[name] = {
            "rmse_mm": {k: rmse(err[:, i]) for i, k in enumerate(["edge_blur", "perforation_scale", "area", "fused"])},
            "fused_mae_by_range_mm": {k: float(np.nanmean(np.abs(err[m, 3]))) for k, m in bins.items()},
            "contact_detection(<10mm)": contact_stats(rows[:, 0], rows[:, 4]),
            "n_tests": int(len(rows)),
        }
        res[name]["_rows"] = rows.tolist()
    metrics["E1_depth_accuracy"] = {k: {kk: vv for kk, vv in v.items() if kk != "_rows"} for k, v in res.items()}
    # figure
    fig, axs = plt.subplots(1, 2, figsize=(11, 4.6), sharey=True)
    for ax, (name, r) in zip(axs, res.items()):
        rows = np.array(r["_rows"])
        ax.plot([0, 200], [0, 200], "k--", lw=1, label="ideal")
        ax.scatter(rows[:, 0], rows[:, 1], s=14, alpha=.6, label="edge blur (penumbra)")
        ax.scatter(rows[:, 0], rows[:, 2], s=14, alpha=.6, label="perforation scale (magnification)")
        ax.scatter(rows[:, 0], rows[:, 4], s=22, c="k", marker="x", label="fused")
        ax.set_title(f"{name} camera  (fused RMSE {r['rmse_mm']['fused']:.1f} mm)")
        ax.set_xlabel("true puppet-to-screen distance d (mm)")
        ax.grid(alpha=.3)
    axs[0].set_ylabel("estimated d (mm)")
    axs[0].legend(fontsize=8, loc="upper left")
    fig.suptitle("E1: distance recovered from the shadow alone (simulated, translucent puppet, noise 1.5%)")
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "fig2_depth_accuracy.png"), dpi=150)
    plt.close(fig)
    return res


def e2_articulation(metrics, cam=CAMS["1080p"]):
    stage = Stage()
    cal = calibrate(stage, Puppet(), cam)
    errs = {"edge_blur": [], "perforation_scale": [], "area": [], "fused": []}
    for _ in range(30):
        d = RNG.uniform(0, 200)
        p = Puppet(arm_angles=(RNG.uniform(-85, 0), RNG.uniform(0, 85)), offset=(RNG.uniform(-40, 40), RNG.uniform(-30, 30)))
        e = cal.estimate(features(capture(render_screen(stage, p, d), cam, RNG), cam.mm_per_px))
        for k, kk in zip(errs, ["width", "hole", "area", "fused"]):
            errs[k].append(e[kk] - d)
    metrics["E2_articulation_rmse_mm"] = {k: rmse(v) for k, v in errs.items()}
    return errs


def e3_tilt(metrics, cam=CAMS["1080p"]):
    """Puppet plane tilted (yaw = gx, pitch = gy, in mm of gap per mm across the puppet)."""
    stage, pup = Stage(), Puppet()
    cal = calibrate(stage, pup, cam)
    out = []
    for d0, gx, gy in [(30, 0.0, 0.0), (60, 0.18, 0.0), (60, -0.18, 0.0), (40, 0.0, 0.27), (80, 0.0, -0.27), (50, 0.12, 0.12), (50, 0.27, 0.0)]:
        img = capture(render_screen(stage, pup, {"d0": d0, "gx": gx, "gy": gy}), cam, RNG)
        t = cal.tilt(features(img, cam.mm_per_px))
        gx_est = (t["right"] - t["left"]) / 90.0
        gy_est = (t["bottom"] - t["top"]) / 90.0
        out.append({"d0": d0, "yaw_deg_true": round(float(np.degrees(np.arctan(gx))), 1),
                    "yaw_deg_est": round(float(np.degrees(np.arctan(gx_est))), 1),
                    "pitch_deg_true": round(float(np.degrees(np.arctan(gy))), 1),
                    "pitch_deg_est": round(float(np.degrees(np.arctan(gy_est))), 1)})
    errs = [abs(o["yaw_deg_est"] - o["yaw_deg_true"]) for o in out] + [abs(o["pitch_deg_est"] - o["pitch_deg_true"]) for o in out]
    metrics["E3_tilt"] = {"cases": out, "mean_abs_angle_error_deg": float(np.mean(errs)), "max_abs_angle_error_deg": float(np.max(errs))}
    return out


def e7_tilted_depth(metrics, cam=CAMS["1080p"]):
    """Depth accuracy when the puppet is not parallel to the screen (up to +-15 deg)."""
    stage, pup = Stage(), Puppet()
    cal = calibrate(stage, pup, cam)
    errs = {"perforation_homography": [], "area": [], "edge_blur": []}
    for _ in range(20):
        d0 = RNG.uniform(0, 150)
        gx, gy = np.tan(np.deg2rad(RNG.uniform(-15, 15, 2)))
        f = features(capture(render_screen(stage, pup, {"d0": d0, "gx": gx, "gy": gy}), cam, RNG), cam.mm_per_px)
        e = cal.estimate(f)
        c = cal.tpl.mean(0) - np.array([stage.width_mm / 2, stage.height_mm / 2])
        d_true = d0 + gx * c[0] + gy * c[1]      # gap at the perforation centre
        errs["perforation_homography"].append(e["hole"] - d_true)
        errs["area"].append(e["area"] - d_true)
        errs["edge_blur"].append(e["width"] - d_true)
    metrics["E7_tilted_puppet_depth_rmse_mm"] = {k: rmse(v) for k, v in errs.items()}


def e4_motion(metrics, cam=CAMS["1080p"]):
    stage, pup = Stage(), Puppet()
    cal = calibrate(stage, pup, cam)
    res = {}
    for exp_name, exp in [("1/60 s", 1 / 60), ("1/250 s", 1 / 250)]:
        errs = {"edge_blur": [], "perforation_scale": []}
        for d in [0, 30, 60, 100, 150]:
            img = capture(render_screen(stage, pup, d, motion_mm_s=300, exposure_s=exp), cam, RNG)
            e = cal.estimate(features(img, cam.mm_per_px))
            errs["edge_blur"].append(e["width"] - d)
            errs["perforation_scale"].append(e["hole"] - d)
        res[exp_name] = {k: rmse(v) for k, v in errs.items()}
    metrics["E4_motion_300mm_s_rmse_mm"] = res
    return res


def e5_light(metrics, cam=CAMS["1080p"]):
    pup = Puppet()
    cal20 = calibrate(Stage(src_w=20, src_h=20), pup, cam)
    errs = {"edge_blur": [], "perforation_scale": []}
    for d in RNG.uniform(0, 200, 15):
        e = cal20.estimate(features(capture(render_screen(Stage(src_w=30, src_h=30), pup, d), cam, RNG), cam.mm_per_px))
        errs["edge_blur"].append(e["width"] - d)
        errs["perforation_scale"].append(e["hole"] - d)
    tube_res = {}
    for L in (600, 1500):
        tube = Stage(L=L, src_w=15, src_h=150, disc=False)  # vertical tube light
        calt = calibrate(tube, pup, cam)
        terrs, avail = [], 0
        for d in RNG.uniform(0, 200, 12):
            e = calt.estimate(features(capture(render_screen(tube, pup, d), cam, RNG), cam.mm_per_px))
            terrs.append(e["fused"] - d)
            avail += int(np.isfinite(e["hole"]))
        tube_res[f"L={L}mm"] = {"fused_rmse_mm": rmse(terrs), "perforation_cue_available": f"{avail}/12"}
    metrics["E5_light"] = {
        "source_20mm_to_30mm_without_recalibration_rmse_mm": {k: rmse(v) for k, v in errs.items()},
        "tube_light_15x150mm_with_own_calibration": tube_res,
    }


def fig_frames():
    stage, pup, cam = Stage(), Puppet(), CAMS["1080p"]
    fig, axs = plt.subplots(1, 4, figsize=(13, 4.2))
    for ax, d in zip(axs, [0, 25, 75, 150]):
        img = capture(render_screen(stage, pup, d), cam, RNG)
        h, w = img.shape
        crop = img[int(h * .30):int(h * .62), int(w * .38):int(w * .72)]
        ax.imshow(crop, cmap="gray", vmin=0, vmax=255)
        M = stage.L / (stage.L - d)
        pen = stage.src_w * d / (stage.L - d)
        ax.set_title(f"d = {d} mm\nscale x{M:.3f}, penumbra {pen:.1f} mm", fontsize=10)
        ax.axis("off")
    fig.suptitle("What the audience-side camera sees as the puppet leaves the screen (simulated, 1080p)")
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "fig1_shadow_frames.png"), dpi=150)
    plt.close(fig)


def e6_scoring(metrics, depth_noise_mm):
    rng = np.random.default_rng(7)
    master = synth_performance("master", rng, depth_noise_mm)
    rows = {}
    for kind in ["correct", "late_180ms", "contact_lapse", "missed_bow"]:
        learner = synth_performance(kind, rng, depth_noise_mm)
        rows[kind] = score_performance(master, learner)
    metrics["E6_scoring"] = {"depth_noise_used_mm": depth_noise_mm, "scores": rows}
    # figure
    fig, axs = plt.subplots(3, 1, figsize=(10, 7.5), sharex=True)
    for kind, col in [("master", "k"), ("late_180ms", "tab:orange"), ("contact_lapse", "tab:red"), ("missed_bow", "tab:blue")]:
        p = master if kind == "master" else synth_performance(kind, np.random.default_rng(11), depth_noise_mm)
        lw = 2.5 if kind == "master" else 1.2
        axs[0].plot(p["t"], p["x"], col, lw=lw, label=kind)
        axs[1].plot(p["t"], p["y"], col, lw=lw)
        axs[2].plot(p["t"], p["d"], col, lw=lw)
    for b in master["beats"]:
        for ax in axs:
            ax.axvline(b, color="0.85", lw=.8, zorder=0)
    axs[0].set_ylabel("x (mm)"); axs[1].set_ylabel("y (mm)"); axs[2].set_ylabel("distance d (mm)")
    axs[2].set_xlabel("time (s)  - grey lines = heel-plank beats")
    axs[0].legend(fontsize=8, ncol=4)
    axs[0].set_title("E6: master phrase vs three faulty learner phrases (all measured from the shadow)")
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "fig4_scoring_traces.png"), dpi=150)
    plt.close(fig)


def fig_robustness(metrics):
    labels, eb, ps = [], [], []
    e1 = metrics["E1_depth_accuracy"]["1080p"]["rmse_mm"]
    labels.append("static\n(1080p)"); eb.append(e1["edge_blur"]); ps.append(e1["perforation_scale"])
    e2 = metrics["E2_articulation_rmse_mm"]
    labels.append("arms moving"); eb.append(e2["edge_blur"]); ps.append(e2["perforation_scale"])
    for k, v in metrics["E4_motion_300mm_s_rmse_mm"].items():
        labels.append(f"moving 30 cm/s\nexp {k}"); eb.append(v["edge_blur"]); ps.append(v["perforation_scale"])
    v = metrics["E7_tilted_puppet_depth_rmse_mm"]
    labels.append("puppet tilted\nup to 15 deg"); eb.append(v["edge_blur"]); ps.append(v["perforation_homography"])
    v = metrics["E5_light"]["source_20mm_to_30mm_without_recalibration_rmse_mm"]
    labels.append("lamp changed,\nno recalibration"); eb.append(v["edge_blur"]); ps.append(v["perforation_scale"])
    x = np.arange(len(labels))
    fig, ax = plt.subplots(figsize=(10, 4.4))
    ax.bar(x - .2, eb, .4, label="edge blur cue")
    ax.bar(x + .2, ps, .4, label="perforation-scale cue")
    ax.axhline(e2["area"], color="r", ls="--", lw=1, label=f"area cue with arms moving ({e2['area']:.0f} mm)")
    for xi, v in zip(x, ps):
        ax.text(xi + .2, v + 0.8, f"{v:.1f}", ha="center", fontsize=8, color="tab:orange")
    for xi, v in zip(x, eb):
        ax.text(xi - .2, v + 0.8, f"{v:.0f}", ha="center", fontsize=8, color="tab:blue")
    ax.set_xticks(x); ax.set_xticklabels(labels, fontsize=9)
    ax.set_ylabel("RMSE of distance (mm)")
    ax.set_title("E2/E4/E5: which cue survives real-world nuisances (lower is better)")
    ax.legend(fontsize=8); ax.grid(axis="y", alpha=.3)
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "fig3_robustness.png"), dpi=150)
    plt.close(fig)


if __name__ == "__main__":
    metrics = {"assumptions": {
        "L_mm": 600, "source_mm": 20, "screen_blur_mm": 0.4, "camera_noise": 0.015,
        "puppet_transmission": 0.4, "puppet_height_mm": 400,
        "calibration_distances_mm": CAL_D,
        "note": "Simulation of the stated geometry; real rigs must be calibrated and tested (see README)."}}
    fig_frames()
    e1_depth_accuracy(metrics)
    e2_articulation(metrics)
    e3_tilt(metrics)
    e7_tilted_depth(metrics)
    e4_motion(metrics)
    e5_light(metrics)
    fig_robustness(metrics)
    e6_scoring(metrics, depth_noise_mm=max(2.0, metrics["E1_depth_accuracy"]["1080p"]["rmse_mm"]["fused"]))
    with open(os.path.join(OUT, "metrics.json"), "w") as f:
        json.dump(metrics, f, indent=2, default=float)
    print(json.dumps(metrics, indent=2, default=float))
