"""Recover puppet-to-screen distance from a camera image of the shadow.

Three physical cues, all measured on the audience side of the screen:
  1. penumbra width  w = s*d/(L-d)  -> mean transition width of the outer edge
  2. magnification   M = L/(L-d)    -> spacing of the puppet's own perforations
  3. magnification   M              -> silhouette area (weak: breaks when arms move)
Each cue is mapped to distance with a per-rig calibration (5-6 frames at known
distances), so the method works with any light: LED, bulb, tube light or lamp.
"""
import cv2
import numpy as np


def normalise(img):
    """Map image to 0 (full shadow) .. 1 (lit screen) using Otsu levels."""
    g = img.astype(np.float32)
    t, _ = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    dark = np.median(g[g < t])
    white = np.median(g[g >= t])
    return np.clip((g - dark) / max(white - dark, 1e-6), 0, 1)


def _outer_mask(n):
    binary = (n < 0.5).astype(np.uint8)
    cnts, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    cnts = [c for c in cnts if cv2.contourArea(c) > 500]
    return binary, cnts


def edge_width(n, mm_per_px, rows=None, band_px=30):
    """Mean 10-90% transition width (mm) along the outer silhouette edge."""
    binary, cnts = _outer_mask(n)
    if not cnts:
        return np.nan
    filled = np.zeros_like(binary)
    cv2.drawContours(filled, cnts, -1, 1, -1)          # silhouette with holes filled
    edge = np.zeros_like(binary)
    cv2.drawContours(edge, cnts, -1, 1, 1)
    near = cv2.dilate(edge, np.ones((2 * band_px + 1, 2 * band_px + 1), np.uint8)).astype(bool)
    # ignore pixels next to perforations so only the outer edge is measured
    holes = (filled.astype(bool) & (n >= 0.5))
    holes = cv2.dilate(holes.astype(np.uint8), np.ones((2 * band_px + 1,) * 2, np.uint8)).astype(bool)
    trans = near & ~holes & (n > 0.1) & (n < 0.9)
    perim_mask = edge.astype(bool) & ~holes
    if rows is not None:
        sel = np.zeros_like(trans)
        sel[rows[0]:rows[1]] = True
        trans &= sel
        perim_mask &= sel
    # edge length: count of 8-connected contour pixels ~ arc length in px (x ~1.11 avg)
    perim_px = perim_mask.sum() * 1.11
    if perim_px < 50:
        return np.nan
    return trans.sum() / perim_px * mm_per_px


def hole_centroids(n, mm_per_px):
    """Centroids (mm) of perforations: bright blobs enclosed by the silhouette."""
    binary, cnts = _outer_mask(n)
    filled = np.zeros_like(binary)
    cv2.drawContours(filled, cnts, -1, 1, -1)
    inner = cv2.erode(filled, np.ones((5, 5), np.uint8)).astype(bool)
    bright = ((n >= 0.5) & inner).astype(np.uint8)
    bright = cv2.morphologyEx(bright, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    k, lab, stats, cents = cv2.connectedComponentsWithStats(bright)
    areas = stats[1:, cv2.CC_STAT_AREA]
    if len(areas) == 0:
        return np.zeros((0, 2))
    big = areas >= max(4, 0.25 * np.percentile(areas, 90))   # drop edge slivers / speckle
    if big.sum() == 0:
        return np.zeros((0, 2))
    med = np.median(areas[big])
    keep = big & (areas > 0.4 * med) & (areas < 2.5 * med)
    return cents[1:][keep] * mm_per_px


def pattern_radius(c):
    if len(c) < 6:
        return np.nan
    return float(np.sqrt(((c - c.mean(0)) ** 2).sum(1).mean()))


def match_holes(tpl, pts, iters=12):
    """Affine map template perforations -> frame perforations (ICP, rotation-robust).
    Returns (A 2x2, t, inlier template indices, rms residual mm) or None."""
    from scipy.spatial import cKDTree
    if len(tpl) < 6 or len(pts) < 6:
        return None
    ct, cp = tpl.mean(0), pts.mean(0)
    T, P = tpl - ct, pts - cp
    tree = cKDTree(P)
    pitch = np.median(cKDTree(T).query(T, k=2)[0][:, 1])
    s0 = pattern_radius(pts) / max(pattern_radius(tpl), 1e-9)
    best = None
    for ang in np.deg2rad(np.arange(-45, 46, 3)):
        R = np.array([[np.cos(ang), -np.sin(ang)], [np.sin(ang), np.cos(ang)]])
        dist = tree.query(T @ (s0 * R).T)[0]
        sc = np.median(dist)
        if best is None or sc < best[0]:
            best = (sc, s0 * R)
    A, t = best[1], np.zeros(2)
    for _ in range(iters):
        pred = T @ A.T + t
        dist, idx = tree.query(pred)
        ok = dist < 0.35 * pitch * np.sqrt(abs(np.linalg.det(A)))
        if ok.sum() < 6:
            return None
        X = np.hstack([T[ok], np.ones((ok.sum(), 1))])
        sol, *_ = np.linalg.lstsq(X, P[idx[ok]], rcond=None)
        A, t = sol[:2].T, sol[2]
    pred = T @ A.T + t
    dist, idx = tree.query(pred)
    ok = dist < 0.35 * pitch * np.sqrt(abs(np.linalg.det(A)))
    return A, t, np.where(ok)[0], float(np.sqrt(np.mean(dist[ok] ** 2)))


def fit_homography(tpl, pts):
    """Correspondences from affine ICP, then a RANSAC homography (exact model for a
    flat puppet projected by a point-like light onto the screen)."""
    from scipy.spatial import cKDTree
    m = match_holes(tpl, pts)
    if m is None:
        return None
    A, t, inl, _ = m
    T = tpl - tpl.mean(0)
    P = pts - pts.mean(0)
    idx = cKDTree(P).query(T @ A.T + t)[1]
    src = tpl[inl].astype(np.float32)
    dst = pts[idx[inl]].astype(np.float32)
    H, mask = cv2.findHomography(src, dst, cv2.RANSAC, 2.0)
    if H is None:
        return None
    return H, int(mask.sum())


def local_scale(H, p, h=1.0):
    """Largest singular value of the homography Jacobian at template point p."""
    def f(q):
        v = H @ np.array([q[0], q[1], 1.0])
        return v[:2] / v[2]
    J = np.column_stack([(f(p + [h, 0]) - f(p - [h, 0])) / (2 * h), (f(p + [0, h]) - f(p - [0, h])) / (2 * h)])
    sv = np.linalg.svd(J, compute_uv=False)
    return float(sv[0]), float(sv[1] / sv[0])


def magnification(A):
    """Largest singular value = magnification (foreshortening only shrinks);
    ratio of singular values = cos(out-of-plane rotation)."""
    sv = np.linalg.svd(A, compute_uv=False)
    return float(sv[0]), float(sv[1] / sv[0])


def silhouette_area(n, mm_per_px):
    return float((n < 0.5).sum()) * mm_per_px ** 2


def features(img, mm_per_px):
    n = normalise(img)
    c = hole_centroids(n, mm_per_px)
    return {
        "width": edge_width(n, mm_per_px),
        "holes": c,
        "n_holes": len(c),
        "area": silhouette_area(n, mm_per_px),
    }


class Calibrator:
    """Per-rig calibration: frames of the puppet at known gaps d (mm).
    The d = 0 frame (puppet pressed on the screen) is also the perforation template."""

    def __init__(self, L):
        self.L = L

    def _d_from_M(self, M):
        return self.L * (1 - 1 / np.asarray(M, float))

    def hole_M(self, f, at=(0.0, 0.0)):
        r = fit_homography(self.tpl, f["holes"])
        if r is None or r[1] < 0.5 * len(self.tpl):
            return np.nan, np.nan
        return local_scale(r[0], self.tpl.mean(0) + np.asarray(at, float))

    def fit(self, cal_feats, cal_d):
        cal_d = np.asarray(cal_d, float)
        f0 = cal_feats[int(np.argmin(cal_d))]
        self.tpl, self.A0 = f0["holes"], f0["area"]
        w = np.array([f["width"] for f in cal_feats])
        self.w_poly = np.polyfit(w, cal_d, 2)
        mh = np.array([self.hole_M(f)[0] for f in cal_feats])
        ok = np.isfinite(mh)
        self.h_poly = np.polyfit(self._d_from_M(mh[ok]), cal_d[ok], 1) if ok.sum() >= 3 else None
        ma = np.array([np.sqrt(f["area"] / self.A0) for f in cal_feats])
        self.a_poly = np.polyfit(self._d_from_M(ma), cal_d, 1)
        self.sig = {
            "width": np.std(np.polyval(self.w_poly, w) - cal_d) + 2.0,
            "hole": (np.std(np.polyval(self.h_poly, self._d_from_M(mh[ok])) - cal_d[ok]) + 1.0) if self.h_poly is not None else np.inf,
        }
        return self

    def estimate(self, f):
        est = {"width": float(np.polyval(self.w_poly, f["width"])) if np.isfinite(f["width"]) else np.nan}
        M, aniso = self.hole_M(f)
        est["hole"] = float(np.polyval(self.h_poly, self._d_from_M(M))) if (self.h_poly is not None and np.isfinite(M)) else np.nan
        est["out_of_plane_deg"] = float(np.degrees(np.arccos(np.clip(aniso, 0, 1)))) if np.isfinite(aniso) else np.nan
        est["area"] = float(np.polyval(self.a_poly, self._d_from_M(np.sqrt(f["area"] / self.A0))))
        cues = [(k, est[k]) for k in ("width", "hole") if np.isfinite(est[k])]
        den = sum(1 / self.sig[k] ** 2 for k, _ in cues)
        est["fused"] = sum(v / self.sig[k] ** 2 for k, v in cues) / den if den > 0 else np.nan
        return est

    def tilt(self, f, arm=45.0):
        """Distance at points +-arm mm left/right and above/below the perforation centre:
        returns dict with d_left, d_right, d_top, d_bottom (mm)."""
        out = {}
        for name, off in (("left", (-arm, 0)), ("right", (arm, 0)), ("top", (0, -arm)), ("bottom", (0, arm))):
            M, _ = self.hole_M(f, at=off)
            out[name] = float(np.polyval(self.h_poly, self._d_from_M(M))) if np.isfinite(M) else np.nan
        return out
