"""PoC-1 with a real puppet and a phone: shadow distance from real photos.

Setup (one afternoon):
  * cotton screen on a frame, ArUco markers 0-3 at the corners (make_markers.py)
  * compact light (small LED, <= 20 mm emitting area) behind the puppet at distance L
  * phone on a tripod on the audience side, fixed, 1080p or better, fixed exposure
  * a perforated puppet (real leather puppet, or card with a punched hole grid)
  * photograph the puppet pressed on the screen (0 mm) and at known gaps
    (e.g. 0, 25, 50, 75, 100, 150 mm) using a ruler/spacer; name files d_000.jpg, d_025.jpg ...

Run:
  python3 poc_real_photos.py --folder photos --L 600 --screen_w 900 --screen_h 600
Outputs results/poc_result.png and a leave-one-out error table.
"""
import argparse
import glob
import os
import re

import cv2
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

from shadow_depth import Calibrator, features

MM_PER_PX = 0.5


def rectify(img_bgr, screen_w, screen_h):
    """Warp the screen to a fronto-parallel image at MM_PER_PX using ArUco 0-3 (TL, TR, BR, BL)."""
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY) if img_bgr.ndim == 3 else img_bgr
    det = cv2.aruco.ArucoDetector(cv2.aruco.getPredefinedDictionary(cv2.aruco.DICT_4X4_50))
    corners, ids, _ = det.detectMarkers(gray)
    if ids is None or not set(range(4)).issubset(set(ids.flatten())):
        raise RuntimeError("need ArUco markers 0,1,2,3 visible")
    centre = {int(i): c[0].mean(0) for i, c in zip(ids.flatten(), corners)}
    src = np.float32([centre[0], centre[1], centre[2], centre[3]])
    W, H = int(screen_w / MM_PER_PX), int(screen_h / MM_PER_PX)
    dst = np.float32([[0, 0], [W, 0], [W, H], [0, H]])
    Hm = cv2.getPerspectiveTransform(src, dst)
    out = cv2.warpPerspective(gray, Hm, (W, H))
    m = int(45 / MM_PER_PX)  # blank out the marker areas
    for x, y in [(0, 0), (W - m, 0), (W - m, H - m), (0, H - m)]:
        out[max(0, y - m // 2):y + m, max(0, x - m // 2):x + m] = np.percentile(out, 90)
    return out


def load(folder):
    items = []
    for p in sorted(glob.glob(os.path.join(folder, "*"))):
        m = re.search(r"d_?(\d+)", os.path.basename(p))
        if m and p.lower().endswith((".jpg", ".jpeg", ".png")):
            items.append((float(m.group(1)), p))
    return items


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--folder", required=True)
    ap.add_argument("--L", type=float, required=True, help="light-to-screen distance, mm")
    ap.add_argument("--screen_w", type=float, required=True, help="marker 0->1 centre distance, mm")
    ap.add_argument("--screen_h", type=float, required=True, help="marker 1->2 centre distance, mm")
    ap.add_argument("--out", default=os.path.join(os.path.dirname(__file__), "results", "poc_result.png"))
    a = ap.parse_args()
    items = load(a.folder)
    if len(items) < 4 or min(d for d, _ in items) != 0:
        raise SystemExit("need >= 4 photos including d_000 (puppet pressed on screen)")
    feats, ds = [], []
    for d, p in items:
        img = rectify(cv2.imread(p), a.screen_w, a.screen_h)
        feats.append(features(img, MM_PER_PX))
        ds.append(d)
    ds = np.array(ds)
    cal = Calibrator(a.L).fit(feats, ds)
    M = np.array([cal.hole_M(f)[0] for f in feats])
    w = np.array([f["width"] for f in feats])
    # leave-one-out: recalibrate without each non-zero distance, then predict it
    loo = []
    for i in range(len(ds)):
        if ds[i] == 0:
            continue
        keep = [j for j in range(len(ds)) if j != i]
        c = Calibrator(a.L).fit([feats[j] for j in keep], ds[keep])
        e = c.estimate(feats[i])
        loo.append((ds[i], e["hole"], e["width"], e["fused"]))
    print(f"{'true d':>7} {'perforation':>12} {'edge blur':>10} {'fused':>8}   (leave-one-out estimates, mm)")
    for r in loo:
        print(f"{r[0]:7.1f} {r[1]:12.1f} {r[2]:10.1f} {r[3]:8.1f}")
    err = np.array([r[3] - r[0] for r in loo], float)
    print(f"fused leave-one-out RMSE: {np.sqrt(np.nanmean(err ** 2)):.1f} mm")
    fig, ax = plt.subplots(1, 2, figsize=(10, 4))
    dd = np.linspace(0, ds.max() * 1.05, 100)
    ax[0].plot(dd, a.L / (a.L - dd), "k--", label="theory  M = L/(L-d)")
    ax[0].plot(ds, M, "o", label="measured from perforations")
    ax[0].set_xlabel("puppet-to-screen gap d (mm)"); ax[0].set_ylabel("shadow magnification M"); ax[0].legend(); ax[0].grid(alpha=.3)
    ax[1].plot(ds, w, "o-")
    ax[1].set_xlabel("puppet-to-screen gap d (mm)"); ax[1].set_ylabel("edge transition width (mm)"); ax[1].grid(alpha=.3)
    fig.suptitle("PoC-1: the shadow reveals how far the puppet is from the screen")
    fig.tight_layout(); fig.savefig(a.out, dpi=150)
    print("saved", a.out)


if __name__ == "__main__":
    main()
