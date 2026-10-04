"""Composes the labelled equipment figures for the v5 document from the renders in cad/renders."""
import os, json, textwrap
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D
from matplotlib.patches import FancyBboxPatch, Rectangle
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
REN = os.path.join(HERE, "renders")
FIG = os.path.join(HERE, "..", "figures")
A = json.load(open(os.path.join(REN, "anchors.json")))
INK, GREY, MAROON, BLUE, GOLD, GREEN = "#222222", "#5e5e5e", "#7A1F1F", "#1F4E79", "#B8901A", "#2E6B3A"
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 12})
FS = 1.22  # label scale for legibility at document size


def img(name):
    return np.asarray(Image.open(os.path.join(REN, name + ".png")).convert("RGB"))


def callouts(fig, rect, name, labels, mode="lr", fs=11.5, wrap=30, title=None, skip=(), color=INK, sides=None, direct=False):
    """Draw render `name` into fig at rect=[x0,y0,w,h] (figure fraction, aspect kept) with leader-line labels."""
    fs = fs * FS
    im = img(name); H, W = im.shape[:2]
    fw, fh = fig.get_size_inches()
    x0, y0, w, h = rect
    # keep aspect: fit image inside rect
    ar_img = W / H; ar_rect = (w * fw) / (h * fh)
    if ar_img > ar_rect:
        nh = w * fw / ar_img / fh; y0 += (h - nh) / 2; h = nh
    else:
        nw = h * fh * ar_img / fw; x0 += (w - nw) / 2; w = nw
    ax = fig.add_axes([x0, y0, w, h]); ax.imshow(im); ax.axis("off")
    if title:
        fig.text(x0 + w / 2, y0 + h + 0.012, title, ha="center", va="bottom", fontsize=fs + 1, color=MAROON, weight="bold")
    pts = {k: v for k, v in A[name].items() if k in labels and k not in skip and 0 <= v[0] <= W and 0 <= v[1] <= H}
    to_fig = lambda p: (x0 + p[0] / W * w, y0 + (1 - p[1] / H) * h)
    items = [(labels[k], to_fig(p)) for k, p in pts.items()]
    if mode == "lr":
        left = sorted([it for it in items if it[1][0] < x0 + w / 2], key=lambda it: -it[1][1])
        right = sorted([it for it in items if it[1][0] >= x0 + w / 2], key=lambda it: -it[1][1])
        for side, group in (("l", left), ("r", right)):
            n = len(group)
            for i, (txt, (ax_, ay_)) in enumerate(group):
                ty = y0 + h * (0.92 - 0.84 * (i + 0.5) / max(n, 1)) if n > 1 else ay_
                tx = x0 - 0.012 if side == "l" else x0 + w + 0.012
                t = "\n".join(textwrap.wrap(txt, wrap))
                fig.text(tx, ty, t, ha="right" if side == "l" else "left", va="center", fontsize=fs, color=color, linespacing=1.15)
                fig.add_artist(Line2D([tx + (0.004 if side == "l" else -0.004), ax_], [ty, ay_], color=GREY, lw=0.9, transform=fig.transFigure))
                fig.add_artist(Line2D([ax_], [ay_], marker="o", ms=3.5, color=MAROON, transform=fig.transFigure))
    else:  # labels above and below, spread horizontally
        if sides:
            inv = {labels[k]: v for k, v in sides.items() if k in labels}
            top = sorted([it for it in items if inv.get(it[0], "t") == "t"], key=lambda it: it[1][0])
            bot = sorted([it for it in items if inv.get(it[0], "t") == "b"], key=lambda it: it[1][0])
        else:
            top = sorted([it for it in items if it[1][1] >= y0 + h / 2], key=lambda it: it[1][0])
            bot = sorted([it for it in items if it[1][1] < y0 + h / 2], key=lambda it: it[1][0])
        for side, group in (("t", top), ("b", bot)):
            n = len(group)
            for i, (txt, (ax_, ay_)) in enumerate(group):
                tx = ax_ if direct else x0 + w * (0.06 + 0.88 * (i + 0.5) / max(n, 1))
                ty = y0 + h + 0.03 if side == "t" else y0 - 0.03
                t = "\n".join(textwrap.wrap(txt, wrap))
                fig.text(tx, ty, t, ha="center", va="bottom" if side == "t" else "top", fontsize=fs, color=color, linespacing=1.15)
                fig.add_artist(Line2D([tx, ax_], [ty - 0.004 if side == "t" else ty + 0.004, ay_], color=GREY, lw=0.9, transform=fig.transFigure))
                fig.add_artist(Line2D([ax_], [ay_], marker="o", ms=3.5, color=MAROON, transform=fig.transFigure))
    return (x0, y0, w, h), to_fig


def scale_label(fig, to_fig, name, key, text, where="below"):
    if key in A[name]:
        x, y = to_fig(A[name][key])
        if where == "below":
            fig.text(x, y - 0.025, text, ha="center", va="top", fontsize=13, color=INK)
        elif where == "right":
            fig.text(x + 0.075, y, text, ha="left", va="center", fontsize=13, color=INK)
        else:
            fig.text(x, y + 0.02, text, ha="center", va="bottom", fontsize=13, color=INK)


def panel_letter(fig, x, y, s):
    fig.text(x, y, s, fontsize=17, weight="bold", color=MAROON, ha="left", va="top")


def save(fig, name):
    fig.savefig(os.path.join(FIG, name), dpi=200, facecolor="white")
    plt.close(fig)
    print("saved", name)


# ---------------------------------------------------------------------------------------------
def sleeve_views():
    fig = plt.figure(figsize=(12, 7.6))
    L = {"shoulder pod (IMU + motor)": "Shoulder pod: IMU + motor", "upper-arm pod (IMU)": "Upper-arm pod: IMU",
         "elbow motor": "Elbow motor", "hub (ESP32-S3, battery)": "Hub: ESP32-S3, battery, microSD",
         "wrist pod (forearm IMU + motor)": "Wrist pod: forearm IMU + motor", "hand board (IMU, 5 drivers)": "Hand board: IMU + 5 motor drivers",
         "middle motor": "Finger motor (x5)", "middle ring (IMU)": "Finger ring IMU (x5)", "thumb motor": "Thumb motor", "thumb ring (IMU)": "Thumb ring IMU"}
    sides = {k: ("b" if k in ("shoulder pod (IMU + motor)", "upper-arm pod (IMU)", "elbow motor", "hub (ESP32-S3, battery)", "wrist pod (forearm IMU + motor)") else "t") for k in L}
    callouts(fig, [0.04, 0.47, 0.92, 0.38], "sleeve_iso", L, mode="tb", fs=11, wrap=18, sides=sides)
    panel_letter(fig, 0.01, 0.99, "a")
    fig.text(0.05, 0.985, "Isometric view, right arm, palm down", fontsize=14, color=GREY, va="top")
    r, tf = callouts(fig, [0.06, 0.05, 0.88, 0.26], "sleeve_dorsal", {}, mode="lr")
    scale_label(fig, tf, "sleeve_dorsal", "100 mm", "100 mm")
    panel_letter(fig, 0.01, 0.36, "b")
    fig.text(0.05, 0.355, "Dorsal (top) view, orthographic, to scale", fontsize=14, color=GREY, va="top")
    save(fig, "v5_sleeve_views.png")


def hand_views():
    fig = plt.figure(figsize=(12, 11.5))
    L = {"wrist pod (forearm IMU + motor)": "Wrist pod (forearm IMU + motor)", "hand board (IMU, 5 drivers)": "Hand board 42 x 32 x 8 mm",
         "middle motor": "Finger motor pod on the first segment", "middle ring (IMU)": "Finger ring IMU on the middle segment",
         "thumb motor": "Thumb motor", "thumb ring (IMU)": "Thumb ring IMU"}
    callouts(fig, [0.25, 0.56, 0.50, 0.40], "hand_iso", L, mode="lr", fs=11.5, wrap=20)
    panel_letter(fig, 0.01, 0.99, "a"); fig.text(0.04, 0.985, "Hand close-up", fontsize=14, color=GREY, va="top")
    P = {"palm (uncovered)": "Palm uncovered", "fingertips (uncovered)": "Fingertips uncovered", "ring strap": "Silicone ring straps (6 mm)",
         "thumb loop": "Thumb loop holds the hand plate"}
    r, tf = callouts(fig, [0.24, 0.27, 0.52, 0.25], "hand_palmar", P, mode="lr", fs=11.5, wrap=18)
    scale_label(fig, tf, "hand_palmar", "50 mm", "50 mm", where="above")
    panel_letter(fig, 0.01, 0.54, "b"); fig.text(0.04, 0.535, "Palm side: nothing between skin and drum, thread or string", fontsize=14, color=GREY, va="top")
    S = {"ring pod 4.4 mm": "Ring pod 4.4 mm high", "motor pod 5.2 mm": "Motor pod 5.2 mm high", "hand board 8 mm": "Hand board 8 mm high",
         "fingertip pad free": "Fingertip pad free"}
    callouts(fig, [0.16, 0.03, 0.56, 0.18], "hand_lateral", S, mode="lr", fs=11.5, wrap=26)
    panel_letter(fig, 0.01, 0.235, "c"); fig.text(0.04, 0.23, "Side view (little-finger side), orthographic", fontsize=14, color=GREY, va="top")
    save(fig, "v5_hand_views.png")


def pods():
    fig = plt.figure(figsize=(12, 13))
    R = {"lid (PA12, blue = motion sensor)": "Lid (blue = motion sensor)", "BMI270 IMU 3.0 x 2.5 mm": "BMI270 IMU, 3.0 x 2.5 mm",
         "board 10 x 8 x 0.8 mm": "Board 10 x 8 x 0.8 mm", "4-pin cable connector": "4-pin cable connector",
         "base with finger saddle (R 9 mm)": "Base, finger saddle R 9 mm", "strap slot 5.2 x 0.9 mm": "Strap slot", "silicone strap": "Silicone strap"}
    callouts(fig, [0.16, 0.57, 0.21, 0.37], "ring_exploded", R, fs=10.5, wrap=16)
    panel_letter(fig, 0.01, 0.99, "a"); fig.text(0.04, 0.985, "Finger ring IMU pod, 13 x 11 x 4.4 mm", fontsize=14, color=GREY, va="top")
    M = {"lid (gold = vibration motor)": "Lid (gold = motor)", "coin LRA 8 x 3.3 mm, 235 Hz": "Coin LRA 8 x 3.3 mm, 235 Hz",
         "base, saddle R 10 mm": "Base, saddle R 10 mm", "silicone strap": "Silicone strap"}
    callouts(fig, [0.66, 0.57, 0.21, 0.37], "motor_exploded", M, fs=10.5, wrap=16)
    panel_letter(fig, 0.51, 0.99, "b"); fig.text(0.54, 0.985, "Finger motor pod, 12 mm dia x 5.2 mm", fontsize=14, color=GREY, va="top")
    Hh = {"TCA9548A I2C switch": "TCA9548A I2C switch", "5 x DRV2605L haptic drivers": "5 x DRV2605L drivers", "BMI270 (back-of-hand IMU)": "BMI270 hand IMU",
          "5 finger-cable ports": "5 finger-cable ports", "lid": "Lid", "case 42 x 32 x 8 mm": "Case, saddle R 70 mm"}
    callouts(fig, [0.16, 0.27, 0.26, 0.25], "hand_exploded", Hh, fs=10.5, wrap=14)
    panel_letter(fig, 0.01, 0.545, "c"); fig.text(0.04, 0.54, "Hand board, 42 x 32 x 8 mm", fontsize=14, color=GREY, va="top")
    U = {"ESP32-S3-MINI-1 15.4 x 20.5 mm": "ESP32-S3 module", "microSD (full-rate backup log)": "microSD backup log",
         "3 x DRV2605L + TCA9548A": "3 x DRV2605L + TCA9548A", "USB-C charging": "USB-C", "MCP73831 charger": "MCP73831 charger",
         "LiPo 1,000 mAh, 50 x 34 x 6 mm": "LiPo 1,000 mAh", "case 62 x 44 x 16 mm, strap loops": "Case with strap loops", "lid with LED window": "Lid, LED window"}
    callouts(fig, [0.63, 0.27, 0.22, 0.25], "hub_exploded", U, fs=10.5, wrap=13)
    panel_letter(fig, 0.51, 0.545, "d"); fig.text(0.54, 0.54, "Forearm hub, 62 x 44 x 16 mm", fontsize=14, color=GREY, va="top")
    Lu = {"finger ring\n13 x 11 x 4.4": "Finger ring 13 x 11 x 4.4", "finger motor\n12 dia x 5.2": "Finger motor 12 dia x 5.2",
          "joint pod\n28 x 20 x 8": "Joint pod 28 x 20 x 8", "hand board\n42 x 32 x 8": "Hand board 42 x 32 x 8", "hub\n62 x 44 x 16": "Hub 62 x 44 x 16"}
    sides = {"finger ring\n13 x 11 x 4.4": "t", "finger motor\n12 dia x 5.2": "b", "joint pod\n28 x 20 x 8": "t",
             "hand board\n42 x 32 x 8": "b", "hub\n62 x 44 x 16": "t"}
    r, tf = callouts(fig, [0.05, 0.065, 0.90, 0.125], "pods_lineup", Lu, mode="tb", fs=10.5, wrap=12, direct=True, sides=sides)
    scale_label(fig, tf, "pods_lineup", "50 mm", "50 mm", where="right")
    panel_letter(fig, 0.01, 0.235, "e"); fig.text(0.04, 0.23, "Same scale (mm)", fontsize=14, color=GREY, va="top")
    save(fig, "v5_pods_exploded.png")


def tabla():
    fig = plt.figure(figsize=(12, 6.2))
    T = {"piezo clip on dayan shell (27 mm disc)": "Piezo clip on dayan shell (27 mm disc, removable putty)", "piezo clip on bayan shell": "Piezo clip on bayan shell",
         "base unit 86 x 56 x 24 mm": "Base unit 86 x 56 x 24 mm", "dayan 140 mm head": "Dayan, 140 mm head", "bayan 229 mm head": "Bayan, 229 mm head"}
    callouts(fig, [0.19, 0.06, 0.32, 0.86], "tabla_iso", T, fs=11, wrap=16)
    panel_letter(fig, 0.01, 0.99, "a"); fig.text(0.04, 0.985, "Player's view", fontsize=14, color=GREY, va="top")
    r, tf = callouts(fig, [0.71, 0.12, 0.27, 0.74], "tabla_top", {}, fs=11)
    scale_label(fig, tf, "tabla_top", "100 mm", "100 mm")
    panel_letter(fig, 0.69, 0.99, "b"); fig.text(0.72, 0.985, "Top view, to scale", fontsize=14, color=GREY, va="top")
    save(fig, "v5_tabla_kit.png")


def puppet_loom():
    fig = plt.figure(figsize=(12, 7.4))
    Pp = {"sensor pod in torso (30 x 20 x 10 mm)": "Sensor pod in the wooden torso, 30 x 20 x 10 mm", "strings looped on fingers": "Strings looped on the fingers",
          "finger rings (IMU)": "Finger ring IMUs", "Kathputli, about 55 cm tall": "Kathputli, about 55 cm"}
    callouts(fig, [0.17, 0.04, 0.22, 0.88], "puppet_iso", Pp, fs=11, wrap=17)
    panel_letter(fig, 0.01, 0.99, "a"); fig.text(0.04, 0.985, "Puppetry kit", fontsize=14, color=GREY, va="top")
    Lm = {"beater sensor (IMU)": "Beater sensor (IMU): beat timing and force", "treadle switches": "Treadle switches: treadle order",
          "loom node (ESP32, battery)": "Loom node (ESP32, battery)", "phone camera over the cloth": "Phone camera over the cloth",
          "woven cloth (picks per cm)": "Woven cloth: picks per cm and evenness"}
    callouts(fig, [0.60, 0.06, 0.25, 0.84], "loom_iso", Lm, fs=11, wrap=16)
    panel_letter(fig, 0.45, 0.99, "b"); fig.text(0.48, 0.985, "Handloom kit on a two-treadle frame loom", fontsize=14, color=GREY, va="top")
    save(fig, "v5_puppet_loom_kits.png")


# ---------------------------------------------------------------------------------------------
def block_diagram():
    fig = plt.figure(figsize=(12, 6.6)); ax = fig.add_axes([0.01, 0.01, 0.98, 0.98]); ax.set_xlim(0, 120); ax.set_ylim(0, 66); ax.axis("off")

    def box(x, y, w, h, title, lines=(), ec=INK, fc="white", tc=INK, fs=10.5):
        ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.25,rounding_size=1.2", ec=ec, fc=fc, lw=1.4))
        ax.text(x + w / 2, y + h - 1.6, title, ha="center", va="top", fontsize=fs + 0.5, weight="bold", color=tc)
        for i, l in enumerate(lines):
            ax.text(x + w / 2, y + h - 4.6 - 2.7 * i, l, ha="center", va="top", fontsize=fs - 1, color=INK)

    def line(x0, y0, x1, y1, txt=None, color=GREY, off=(0, 1.0), ha="center"):
        ax.plot([x0, x1], [y0, y1], color=color, lw=1.6, solid_capstyle="round")
        if txt: ax.text((x0 + x1) / 2 + off[0], (y0 + y1) / 2 + off[1], txt, fontsize=9.2, color=color, ha=ha)

    box(43, 25, 34, 19, "Forearm hub", ["ESP32-S3-MINI-1 (240 MHz, Wi-Fi, BLE 5)", "MCP73831 charger, LiPo 1,000 mAh", "microSD: full-rate log", "USB-C"], ec=GREEN, fc="#EEF6EF")
    box(1, 42, 33, 19, "Arm bus (I2C0, 400 kHz)", ["TCA9548A 0x70 in the hub", "ch0: shoulder IMU 0x68 + DRV 0x5A", "ch1: upper-arm IMU 0x68 + elbow DRV", "ch2: wrist IMU 0x68 + wrist DRV"], ec=BLUE)
    box(1, 9, 33, 22, "Hand bus (I2C1, 400 kHz)", ["TCA9548A 0x70 on the hand board", "ch0: thumb IMU 0x68, hand IMU 0x69,", "thumb DRV 0x5A", "ch1-ch4: finger IMU 0x68 + DRV 0x5A", "one 6-wire flat cable per finger"], ec=BLUE)
    box(86, 42, 33, 19, "Tool sensor node", ["Tabla: 2 piezo discs, ADC with DMA", "Loom: beater IMU + treadle switches", "Puppet: IMU in the torso", "same ESP32 family"], ec=MAROON)
    box(86, 9, 33, 22, "Laptop or phone app", ["USB receiver (ESP32-S3)", "fingerprint, ghost arm, scores", "fade rule, consent and signing", "CSV export for E0-E5"], ec=MAROON)
    line(34.6, 51, 42.6, 40); ax.text(38.6, 50, "4 wires\nup to 45 cm", fontsize=9, color=BLUE, ha="center", va="bottom")
    line(34.6, 20, 42.6, 29); ax.text(38.6, 18.5, "5 wires\n20 cm", fontsize=9, color=BLUE, ha="center", va="top")
    line(77.4, 40, 85.4, 51, color=MAROON); ax.text(81.4, 50, "radio +\nshared clock", fontsize=9, color=MAROON, ha="center", va="bottom")
    line(77.4, 29, 85.4, 20, color=MAROON); ax.text(81.4, 18.5, "radio\n(ESP-NOW)", fontsize=9, color=MAROON, ha="center", va="top")
    ax.text(60, 6.5, "Each mux channel is its own short bus segment, so every segment stays far below the I2C limit of 400 pF.", ha="center", va="top", fontsize=9.5, color=GREY)
    ax.text(60, 64.5, "One sleeve: 9 IMUs (BMI270) and 8 vibration motors (coin LRA, each with a DRV2605L driver)", ha="center", fontsize=11.5, color=INK, weight="bold")
    save(fig, "v5_block_diagram.png")


def drawings():
    """Dimensioned orthographic drawings (mm) of the ring pod and the hub, from the CAD parameters."""
    import parampara_cad as Pc
    fig = plt.figure(figsize=(12, 7.2))

    def dim(ax, x0, y0, x1, y1, txt, off=0, vertical=False):
        if vertical:
            ax.annotate("", (x0 + off, y0), (x0 + off, y1), arrowprops=dict(arrowstyle="<->", lw=0.9, color=INK, shrinkA=0, shrinkB=0))
            ax.text(x0 + off + (0.6 if off >= 0 else -0.6), (y0 + y1) / 2, txt, rotation=90, ha="left" if off >= 0 else "right", va="center", fontsize=9.5)
            ax.plot([x0, x0 + off], [y0, y0], color=GREY, lw=0.5); ax.plot([x1, x0 + off], [y1, y1], color=GREY, lw=0.5)
        else:
            ax.annotate("", (x0, y0 + off), (x1, y0 + off), arrowprops=dict(arrowstyle="<->", lw=0.9, color=INK, shrinkA=0, shrinkB=0))
            ax.text((x0 + x1) / 2, y0 + off + (0.5 if off >= 0 else -0.5), txt, ha="center", va="bottom" if off >= 0 else "top", fontsize=9.5)
            ax.plot([x0, x0], [y0, y0 + off], color=GREY, lw=0.5); ax.plot([x1, x1], [y1, y0 + off], color=GREY, lw=0.5)

    def rrect(ax, cx, cy, w, h, r, **kw):
        ax.add_patch(FancyBboxPatch((cx - w / 2 + r, cy - h / 2 + r), w - 2 * r, h - 2 * r, boxstyle=f"round,pad={r}", **kw))

    # ring pod: top view and front section
    R = Pc.RING
    ax = fig.add_axes([0.02, 0.50, 0.46, 0.44]); ax.set_aspect("equal"); ax.axis("off"); ax.set_xlim(-14, 30); ax.set_ylim(-14, 13)
    rrect(ax, 0, 0, R["L"], R["W"], 2.2, fc="#dfe7ef", ec=INK, lw=1.2)
    for s in (1, -1):
        ax.add_patch(Rectangle((-3.5, s * (R["W"] / 2 + 0.6) - 1.1), 7, 2.2, fc="#c9c9c9", ec=INK, lw=0.8))
        ax.add_patch(Rectangle((-2.6, s * (R["W"] / 2 + 0.6) - 0.45), 5.2, 0.9, fc="white", ec=INK, lw=0.6))
    ax.add_patch(Rectangle((-0.7, -1.25), 3.0, 2.5, fc="#333", ec=INK, lw=0.6)); ax.text(0.8, 1.8, "BMI270", ha="center", fontsize=8)
    dim(ax, -R["L"] / 2, -R["W"] / 2 - 2, R["L"] / 2, -R["W"] / 2 - 2, f"{R['L']:.0f}", off=-2.2)
    dim(ax, R["L"] / 2, -R["W"] / 2, R["L"] / 2, R["W"] / 2, f"{R['W']:.0f}", off=2.0, vertical=True)
    ax.text(0, 11.5, "Finger ring IMU pod: top view", ha="center", fontsize=11, weight="bold", color=MAROON)
    # front section (looking along the finger)
    ox = 21
    th = np.linspace(-1, 1, 50)
    sr = R["saddle_r"]; half = R["W"] / 2
    xs = np.linspace(-half, half, 60); ys = -(np.sqrt(np.maximum(sr ** 2 - xs ** 2, 0)) - sr) * 1.0
    bottom = ys - ys.max() + 0.6
    top_z = R["base_h"] + R["lid_h"]
    ax.fill_between(xs + ox, bottom, top_z, color="#dfe7ef", ec=INK, lw=1.0)
    ax.add_patch(plt.Circle((ox, -sr + 0.6), sr, fill=False, ec=GREY, ls="--", lw=0.8))
    dim(ax, ox + half, 0, ox + half, top_z, f"{top_z:.1f}", off=2.2, vertical=True)
    ax.text(ox, -10.5, f"finger saddle R {sr:.0f}", ha="center", fontsize=9.5, color=GREY)
    ax.text(ox, 7.2, "Front view", ha="center", fontsize=10, color=GREY)

    # hub: top view and side view
    U = Pc.HUB
    ax = fig.add_axes([0.52, 0.50, 0.46, 0.44]); ax.set_aspect("equal"); ax.axis("off"); ax.set_xlim(-40, 95); ax.set_ylim(-36, 34)
    rrect(ax, 0, 0, U["L"], U["W"], 6, fc="#e3eee5", ec=INK, lw=1.2)
    for s in (1, -1):
        ax.add_patch(Rectangle((-14, s * (U["W"] / 2 + 1.2) - 1.7), 28, 3.4, fc="#c9c9c9", ec=INK, lw=0.8))
    ax.add_patch(plt.Circle((U["L"] / 2 - 7, -U["W"] / 2 + 7), 1.6, fc="white", ec=INK, lw=0.8))
    ax.add_patch(Rectangle((U["L"] / 2 - 2, 6 - 4.8), 2.5, 9.6, fc="#999", ec=INK, lw=0.8)); ax.text(U["L"] / 2 + 2, 6, "USB-C", fontsize=8.5, va="center")
    dim(ax, -U["L"] / 2, -U["W"] / 2 - 4, U["L"] / 2, -U["W"] / 2 - 4, f"{U['L']:.0f}", off=-4)
    dim(ax, -U["L"] / 2, -U["W"] / 2, -U["L"] / 2, U["W"] / 2, f"{U['W']:.0f}", off=-5, vertical=True)
    ax.text(0, 30, "Forearm hub: top view", ha="center", fontsize=11, weight="bold", color=MAROON)
    ox = 68
    hz = U["base_h"] + U["lid_h"]
    sr = U["saddle_r"]; half = U["W"] / 2
    xs = np.linspace(-half, half, 80); ys = -(np.sqrt(np.maximum(sr ** 2 - xs ** 2, 0)) - sr)
    bottom = ys - ys.max() + 0.6
    ax.fill_between(xs * 0.5 + ox, bottom * 0.5 - 8, hz * 0.5 - 8, color="#e3eee5", ec=INK, lw=1.0)
    dim(ax, ox + half * 0.5, -8, ox + half * 0.5, hz * 0.5 - 8, f"{hz:.1f}", off=3, vertical=True)
    ax.text(ox, 5, "Front view (scale 1:2)", ha="center", fontsize=10, color=GREY)
    ax.text(ox, -16, f"forearm saddle R {sr:.0f}", ha="center", fontsize=9.5, color=GREY)

    # stack-up table for the hub
    ax = fig.add_axes([0.05, 0.03, 0.90, 0.40]); ax.axis("off")
    rows = [["Layer (hub, bottom to top)", "Height (mm)", "Source"],
            ["Case floor", "2.0", "design"], ["LiPo pouch cell, 1,000 mAh, 50 x 34 x 6", "6.0", "cell size"],
            ["Clearance", "0.6", "design"], ["Main board", "1.0", "design"],
            ["Tallest part: ESP32-S3-MINI-1 module", "2.4", "Espressif datasheet"], ["Clearance to lid", "2.0", "design"],
            ["Lid", "2.4", "design"], ["Total", "16.4", ""]]
    tb = ax.table(cellText=rows[1:], colLabels=rows[0], loc="center", cellLoc="left", colWidths=[0.55, 0.15, 0.30])
    tb.auto_set_font_size(False); tb.set_fontsize(10.5); tb.scale(1, 1.55)
    for (r_, c_), cell in tb.get_celld().items():
        cell.set_edgecolor("#D9CFC0")
        if r_ == 0: cell.set_facecolor(MAROON); cell.get_text().set_color("white"); cell.get_text().set_weight("bold")
        elif r_ == len(rows) - 1: cell.get_text().set_weight("bold"); cell.set_facecolor("#EAF1F8")
    save(fig, "v5_drawings.png")


if __name__ == "__main__":
    for f in (sleeve_views, hand_views, pods, tabla, puppet_loom, block_diagram, drawings):
        f()
