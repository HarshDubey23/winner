"""Physically based renderer for a shadow-puppet stage.

Geometry (all lengths in mm):
    light (disc or rectangle) --- L --- screen
    puppet = planar occluder parallel to the screen, at gap d in front of it

For a planar occluder parallel to the screen and a planar source parallel to the
screen, the fraction of the source hidden from a screen point equals the
occluder mask magnified by M = L / (L - d) about the light's foot point,
convolved with the source shape scaled by d / (L - d).  This is exact for that
geometry; we use it as the ground-truth renderer.
"""
from dataclasses import dataclass, field

import cv2
import numpy as np
from scipy.signal import fftconvolve

FINE = 0.25  # mm per fine-grid sample


@dataclass
class Stage:
    L: float = 600.0             # light-to-screen distance
    src_w: float = 20.0          # source width (mm)
    src_h: float = 20.0          # source height (mm); equal to width -> disc
    disc: bool = True            # disc source if True, rectangle otherwise
    screen_sigma: float = 0.4    # cotton-screen diffusion blur (mm, Gaussian)
    width_mm: float = 700.0      # simulated screen window
    height_mm: float = 720.0


@dataclass
class Camera:
    mm_per_px: float = 0.52      # 1080p across ~1 m of screen
    blur_px: float = 0.6         # lens blur
    noise: float = 0.015         # Gaussian noise, fraction of white level
    exposure_s: float = 1 / 250
    seed: int = 0


@dataclass
class Puppet:
    """A stylised articulated Tholu-Bommalata-like figure (occluder plane)."""
    height: float = 400.0
    transmission: float = 0.4     # translucent dyed leather lets light through
    arm_angles: tuple = (-35.0, 35.0)   # degrees from vertical, left/right (outward)
    hole_r: float = 4.0           # ornamental perforation radius
    hole_pitch: float = 18.0
    offset: tuple = (0.0, 0.0)    # in-plane position of puppet centre
    holes: bool = True
    extra: dict = field(default_factory=dict)

    def mask(self, w_px, h_px, mm_per_px=FINE):
        """Return float mask (1 = leather, 0 = air) on a grid centred at origin."""
        m = np.zeros((h_px, w_px), np.uint8)
        cx, cy = w_px / 2 + self.offset[0] / mm_per_px, h_px / 2 + self.offset[1] / mm_per_px
        s = self.height / 400.0 / mm_per_px

        def P(x, y):
            return (int(round(cx + x * s)), int(round(cy + y * s)))

        # torso (tapered polygon)
        torso = np.array([P(-60, -100), P(60, -100), P(75, 40), P(45, 120), P(-45, 120), P(-75, 40)], np.int32)
        cv2.fillPoly(m, [torso], 1)
        # head + crown
        cv2.circle(m, P(0, -140), int(42 * s), 1, -1)
        crown = np.array([P(-30, -175), P(0, -205), P(30, -175)], np.int32)
        cv2.fillPoly(m, [crown], 1)
        # legs
        for sx in (-1, 1):
            leg = np.array([P(sx * 15, 115), P(sx * 50, 115), P(sx * 45, 200), P(sx * 18, 200)], np.int32)
            cv2.fillPoly(m, [leg], 1)
        # arms: upper + lower segments, rotated about shoulders
        for sx, ang in zip((-1, 1), self.arm_angles):
            shoulder = np.array([sx * 70.0, -85.0])
            a = np.deg2rad(ang)
            d1 = np.array([np.sin(a), np.cos(a)])
            elbow = shoulder + 95 * d1
            a2 = a + np.deg2rad(sx * 25)
            d2 = np.array([np.sin(a2), np.cos(a2)])
            wrist = elbow + 85 * d2
            for p0, p1, th in ((shoulder, elbow, 26), (elbow, wrist, 20)):
                cv2.line(m, P(*p0), P(*p1), 1, max(1, int(th * s)))
        m = m.astype(np.float32)
        if self.holes:
            # ornamental perforations inside the torso only (these let light through)
            torso_only = np.zeros_like(m, np.uint8)
            cv2.fillPoly(torso_only, [torso], 1)
            torso_only = cv2.erode(torso_only, np.ones((int(14 * s), int(14 * s)), np.uint8))
            r = max(1, int(self.hole_r * s))
            pitch = self.hole_pitch * s
            for gy in np.arange(cy - 100 * s, cy + 120 * s, pitch):
                for gx in np.arange(cx - 75 * s, cx + 75 * s, pitch):
                    if torso_only[int(gy), int(gx)]:
                        cv2.circle(m, (int(gx), int(gy)), r, 0, -1)
        return m


def source_kernel(stage: Stage, d: float):
    """Projected source footprint on the screen for an occluder at gap d."""
    k = d / (stage.L - d)
    kw, kh = stage.src_w * k / FINE, stage.src_h * k / FINE
    if kw < 1 and kh < 1:
        return np.ones((1, 1), np.float32)
    rw, rh = max(1, int(np.ceil(kw / 2))), max(1, int(np.ceil(kh / 2)))
    yy, xx = np.mgrid[-rh:rh + 1, -rw:rw + 1].astype(np.float32)
    if stage.disc:
        ker = ((xx / max(kw / 2, 0.5)) ** 2 + (yy / max(kh / 2, 0.5)) ** 2 <= 1).astype(np.float32)
    else:
        ker = ((np.abs(xx) <= kw / 2) & (np.abs(yy) <= kh / 2)).astype(np.float32)
    return ker / ker.sum()


def render_blocked(stage: Stage, puppet: Puppet, d: float, band=None):
    """Fraction of light blocked at each fine screen sample (before transmission)."""
    W, H = int(stage.width_mm / FINE), int(stage.height_mm / FINE)
    occ = puppet.mask(W, H)
    if band is not None:  # keep only rows in [y0, y1) of the occluder (for tilted puppets)
        y0, y1 = band
        keep = np.zeros_like(occ)
        keep[y0:y1] = 1
        occ = occ * keep
    M = stage.L / (stage.L - d)
    A = np.array([[M, 0, (1 - M) * W / 2], [0, M, (1 - M) * H / 2]], np.float32)
    shadow = cv2.warpAffine(occ, A, (W, H), flags=cv2.INTER_LINEAR)
    ker = source_kernel(stage, d)
    if ker.size > 1:
        shadow = fftconvolve(shadow, ker, mode="same")
    return np.clip(shadow, 0, 1)


def render_plane(stage: Stage, puppet: Puppet, d0, gx=0.0, gy=0.0, levels=7):
    """Blocked fraction for a flat puppet tilted out of the screen plane.

    Gap d(x, y) = d0 + gx*x + gy*y (x, y = occluder position from the puppet centre).
    Exact central projection from the light's foot point: a screen point (X, Y)
    comes from occluder point (x, y) = (X, Y) * (L - d0) / (L + gx*X + gy*Y).
    The outline is foreshortened by cos(angle); penumbra varies smoothly with the
    local gap (blend of blurred copies at a few gap levels)."""
    W, H = int(stage.width_mm / FINE), int(stage.height_mm / FINE)
    occ = puppet.mask(W, H)
    L = stage.L
    fx, fy = 1 / np.sqrt(1 + gx ** 2), 1 / np.sqrt(1 + gy ** 2)
    Xs = (np.arange(W) - W / 2) * FINE
    Ys = (np.arange(H) - H / 2) * FINE
    X, Y = np.meshgrid(Xs, Ys)
    scale = (L - d0) / (L + gx * X + gy * Y)
    x, y = X * scale, Y * scale                       # occluder-plane (screen-parallel) coords
    u, v = x / fx, y / fy                             # puppet's own coords (foreshortening)
    mapx = (u / FINE + W / 2).astype(np.float32)
    mapy = (v / FINE + H / 2).astype(np.float32)
    sharp = cv2.remap(occ, mapx, mapy, cv2.INTER_LINEAR, borderValue=0)
    dmap = np.clip(d0 + gx * x + gy * y, 0, 0.8 * L)
    inside = sharp > 0.01
    lo, hi = float(dmap[inside].min()), float(dmap[inside].max())
    dl = np.linspace(lo, hi, levels) if hi - lo > 0.5 else np.array([lo])
    stack = []
    for dv in dl:
        ker = source_kernel(stage, dv)
        stack.append(fftconvolve(sharp, ker, mode="same") if ker.size > 1 else sharp.copy())
    if len(dl) == 1:
        return np.clip(stack[0], 0, 1)
    stack = np.stack(stack)
    pos = np.clip((dmap - lo) / (hi - lo) * (len(dl) - 1), 0, len(dl) - 1 - 1e-6)
    i0 = np.floor(pos).astype(int)
    a = pos - i0
    rows, cols = np.indices(dmap.shape)
    out = stack[i0, rows, cols] * (1 - a) + stack[i0 + 1, rows, cols] * a
    return np.clip(out, 0, 1)


def render_screen(stage: Stage, puppet: Puppet, d, motion_mm_s=0.0, exposure_s=1 / 250):
    """Screen luminance (white = 1) on the fine grid.  d may be a float, a
    (d_top, d_bottom) tuple, or a dict(d0=, gx=, gy=) for a tilted puppet."""
    if isinstance(d, dict):
        blocked = render_plane(stage, puppet, d["d0"], d.get("gx", 0.0), d.get("gy", 0.0))
        lum = 1.0 - (1.0 - puppet.transmission) * blocked
        if motion_mm_s > 0:
            n = max(1, int(round(motion_mm_s * exposure_s / FINE)))
            lum = cv2.filter2D(lum, -1, np.ones((1, n), np.float32) / n, borderType=cv2.BORDER_REPLICATE)
        if stage.screen_sigma > 0:
            lum = cv2.GaussianBlur(lum, (0, 0), stage.screen_sigma / FINE)
        return lum
    if isinstance(d, (tuple, list)):
        H = int(stage.height_mm / FINE)
        nb = 12
        edges = np.linspace(0, H, nb + 1).astype(int)
        blocked = np.zeros((H, int(stage.width_mm / FINE)), np.float32)
        for i in range(nb):
            frac = (i + 0.5) / nb
            di = d[0] + (d[1] - d[0]) * frac
            blocked = np.maximum(blocked, render_blocked(stage, puppet, di, band=(edges[i], edges[i + 1])))
    else:
        blocked = render_blocked(stage, puppet, float(d))
    lum = 1.0 - (1.0 - puppet.transmission) * blocked
    if motion_mm_s > 0:
        n = max(1, int(round(motion_mm_s * exposure_s / FINE)))
        lum = cv2.filter2D(lum, -1, np.ones((1, n), np.float32) / n, borderType=cv2.BORDER_REPLICATE)
    if stage.screen_sigma > 0:
        lum = cv2.GaussianBlur(lum, (0, 0), stage.screen_sigma / FINE)
    return lum


def capture(lum_fine, cam: Camera, rng=None):
    """Sample the fine screen image with a camera: area sampling, lens blur, noise, 8-bit."""
    rng = rng or np.random.default_rng(cam.seed)
    H, W = lum_fine.shape
    scale = FINE / cam.mm_per_px
    img = cv2.resize(lum_fine, (int(W * scale), int(H * scale)), interpolation=cv2.INTER_AREA)
    if cam.blur_px > 0:
        img = cv2.GaussianBlur(img, (0, 0), cam.blur_px)
    img = img * 0.85 + 0.05  # white ~0.9, black floor 0.05 (realistic exposure)
    img = img + rng.normal(0, cam.noise, img.shape)
    return np.clip(np.round(img * 255), 0, 255).astype(np.uint8)
