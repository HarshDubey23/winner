"""Two simple figures for the v3 (judge edition) document."""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "figures")
MAROON, BLUE, GOLD, INK, GREY, GREEN = "#7A1F1F", "#1F4E79", "#B8901A", "#222222", "#6B6B6B", "#2E6B3A"

def rbox(ax, x, y, w, h, fc, ec, lw=1.5, r=0.02):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle=f"round,pad=0.008,rounding_size={r}", fc=fc, ec=ec, lw=lw))

def arrow(ax, a, b, color=GREY):
    ax.add_patch(FancyArrowPatch(a, b, arrowstyle="-|>", mutation_scale=12, lw=1.4, color=color))

def pipeline():
    fig, ax = plt.subplots(figsize=(8.6, 3.0), dpi=220)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
    steps = [("1  SENSE", "Sensors on the tabla\nand wrists record\nevery stroke", MAROON),
             ("2  FINGERPRINT", "The master's\ntiming, accents\nand strokes", MAROON),
             ("3  TEACH", "Touch: what & when\nSound: exact timing\nScreen: arm movement", BLUE),
             ("4  FADE", "Cues are removed\nas the student\nimproves", BLUE),
             ("5  MEASURE", "Score with the\ndevice switched off", GREEN)]
    w, gap, y, h = 0.168, 0.03, 0.36, 0.52
    for i, (t, s, c) in enumerate(steps):
        x = 0.01 + i * (w + gap)
        rbox(ax, x, y, w, h, "white", c)
        ax.add_patch(plt.Rectangle((x - 0.004, y + h - 0.13), w + 0.008, 0.13, color=c))
        ax.text(x + w / 2, y + h - 0.065, t, ha="center", va="center", color="white", fontsize=8.2, weight="bold")
        ax.text(x + w / 2, y + (h - 0.13) / 2, s, ha="center", va="center", color=INK, fontsize=7.4, linespacing=1.35)
        if i < len(steps) - 1:
            arrow(ax, (x + w + 0.003, y + h / 2), (x + w + gap - 0.003, y + h / 2))
    rbox(ax, 0.01, 0.05, 0.98, 0.2, "#FFF7E0", GOLD, r=0.015)
    ax.text(0.5, 0.15, "OWN  ·  The guru records, approves and can withdraw. Consent and credit travel with the data (signed with the guru's phone fingerprint).",
            ha="center", va="center", fontsize=7.6, color="#5A4300")
    fig.tight_layout(pad=0.3)
    fig.savefig(os.path.join(OUT, "v3_pipeline.png"))

def mvp_hardware():
    fig, ax = plt.subplots(figsize=(8.6, 2.9), dpi=220)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
    boxes = [(0.01, "Base unit on the tabla", "ESP32-S3\n2 piezo sensors (one per drum)\ndetects each stroke:\ntime · hand · strength", MAROON),
             (0.36, "Laptop app (Chrome)", "fingerprint view · lessons\nfade rule · unaided score\nguru consent and signature", GREEN),
             (0.71, "Two wrist cuffs", "ESP32 + motion sensor\n2 vibration motors per cuff\n(4 skin sites in total)", BLUE)]
    for x, t, s_, c in boxes:
        rbox(ax, x, 0.12, 0.28, 0.76, "white", c)
        ax.add_patch(plt.Rectangle((x - 0.004, 0.72), 0.288, 0.16, color=c))
        ax.text(x + 0.14, 0.80, t, ha="center", va="center", color="white", fontsize=8.4, weight="bold")
        ax.text(x + 0.14, 0.42, s_, ha="center", va="center", color=INK, fontsize=7.6, linespacing=1.4)
    arrow(ax, (0.295, 0.5), (0.355, 0.5)); ax.text(0.325, 0.60, "strokes", ha="center", fontsize=6.8, color=GREY)
    arrow(ax, (0.645, 0.5), (0.705, 0.5)); ax.text(0.675, 0.60, "cue plan", ha="center", fontsize=6.8, color=GREY)
    ax.text(0.5, 0.02, "Off-the-shelf development boards; about ₹6,000–7,500 for the complete prototype.", ha="center", fontsize=7, color=GREY, style="italic")
    fig.tight_layout(pad=0.3)
    fig.savefig(os.path.join(OUT, "v3_mvp_hardware.png"))

if __name__ == "__main__":
    pipeline(); mvp_hardware()


def sensor_sleeve():
    """Stylised right arm: 9 motion sensors and 8 vibration motors per arm (illustrative layout)."""
    import numpy as np
    fig, ax = plt.subplots(figsize=(9.2, 3.6), dpi=220)
    ax.set_xlim(0, 10.2); ax.set_ylim(0, 4.2); ax.axis("off"); ax.set_aspect("equal")
    skin, edge = "#F3E3D3", "#B89A80"
    # torso edge + upper arm + forearm + hand (simple shapes)
    ax.add_patch(plt.Polygon([[0.2, 3.9], [1.3, 3.9], [1.6, 3.2], [1.35, 1.0], [0.2, 1.0]], fc="#ECE7E0", ec="#CFC7BC", lw=1))
    ax.add_patch(plt.Polygon([[1.2, 3.45], [1.55, 2.75], [4.2, 2.35], [4.25, 3.05]], fc=skin, ec=edge, lw=1.2))   # upper arm
    ax.add_patch(plt.Polygon([[4.05, 3.05], [4.2, 2.35], [6.9, 2.45], [6.9, 2.95]], fc=skin, ec=edge, lw=1.2))   # forearm
    ax.add_patch(FancyBboxPatch((6.85, 2.25), 1.15, 0.9, boxstyle="round,pad=0.02,rounding_size=0.18", fc=skin, ec=edge, lw=1.2))  # hand
    fingers = [(8.0, 3.05, 1.05), (8.0, 2.82, 1.2), (8.0, 2.6, 1.12), (8.0, 2.38, 0.95)]
    for x, y, L in fingers:
        ax.add_patch(FancyBboxPatch((x, y - 0.08), L, 0.16, boxstyle="round,pad=0.01,rounding_size=0.08", fc=skin, ec=edge, lw=1))
    ax.add_patch(plt.Polygon([[7.1, 2.3], [7.55, 1.75], [7.8, 1.8], [7.5, 2.35]], fc=skin, ec=edge, lw=1))         # thumb
    imu = dict(marker="o", ms=8.5, mfc=BLUE, mec="white", mew=1.2, ls="none")
    hap = dict(marker="D", ms=6.5, mfc=GOLD, mec="white", mew=1.0, ls="none")
    imus = [(1.45, 3.1), (2.9, 2.83), (5.6, 2.72), (7.35, 2.75)] + [(x + L * 0.62, y) for x, y, L in fingers] + [(7.62, 1.92)]
    haps = [(1.65, 3.38), (4.15, 2.72), (6.6, 2.62)] + [(x + L * 0.25, y) for x, y, L in fingers] + [(7.38, 2.12)]
    for x, y in imus: ax.plot(x, y, **imu)
    for x, y in haps: ax.plot(x, y, **hap)
    ax.add_patch(FancyBboxPatch((4.55, 2.5), 0.75, 0.3, boxstyle="round,pad=0.02,rounding_size=0.06", fc=GREEN, ec="white"))
    ax.text(4.925, 2.65, "hub", ha="center", va="center", fontsize=7, color="white", weight="bold")
    notes = [(1.45, 3.1, 1.0, 3.95, "shoulder"), (2.9, 2.83, 2.8, 3.95, "upper arm (elbow)"), (5.6, 2.72, 5.4, 1.35, "forearm (wrist)"),
             (7.35, 2.75, 6.6, 1.0, "back of hand"), (8.65, 3.05, 8.9, 3.95, "5 finger rings (middle segment)"), (4.15, 2.72, 3.6, 1.6, "elbow motor"), (6.6, 2.62, 7.0, 4.0, "wrist motor")]
    for x, y, tx, ty, t in notes:
        ax.annotate(t, xy=(x, y), xytext=(tx, ty), fontsize=7, color=INK, ha="center",
                    arrowprops=dict(arrowstyle="-", color=GREY, lw=0.7))
    ax.plot(0.4, 0.55, **imu); ax.text(0.62, 0.55, "motion sensor (9 per arm)", fontsize=7.2, va="center", color=INK)
    ax.plot(3.4, 0.55, **hap); ax.text(3.62, 0.55, "vibration motor (8 per arm: 5 fingers, wrist, elbow, shoulder)", fontsize=7.2, va="center", color=INK)
    ax.text(5.1, 0.12, "Fingertips and palm stay free: sensors sit on the back of the fingers and arm, so the touch on drum, threads and strings is unchanged (checked in E0).", fontsize=7, color=GREY, style="italic", ha="center")
    fig.tight_layout(pad=0.2)
    fig.savefig(os.path.join(OUT, "v4_sensor_sleeve.png"))

if __name__ == "__main__":
    sensor_sleeve()


def pipeline_v4():
    fig, ax = plt.subplots(figsize=(8.6, 3.0), dpi=220)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
    steps = [("1  SENSE", "Sleeves on both arms\n(fingers to shoulder)\n+ a sensor on the tool", MAROON),
             ("2  FINGERPRINT", "How the master moves\n+ what the tool does\n(sound, cloth, puppet)", MAROON),
             ("3  TEACH", "Touch: finger & joint\nSound: exact timing\nScreen: ghost arm", BLUE),
             ("4  FADE", "Cues are removed\nas the learner\nimproves", BLUE),
             ("5  MEASURE", "Learner performs\nwith the device off", GREEN)]
    w, gap, y, h = 0.168, 0.03, 0.36, 0.52
    for i, (t, s, c) in enumerate(steps):
        x = 0.01 + i * (w + gap)
        rbox(ax, x, y, w, h, "white", c)
        ax.add_patch(plt.Rectangle((x - 0.004, y + h - 0.13), w + 0.008, 0.13, color=c))
        ax.text(x + w / 2, y + h - 0.065, t, ha="center", va="center", color="white", fontsize=8.2, weight="bold")
        ax.text(x + w / 2, y + (h - 0.13) / 2, s, ha="center", va="center", color=INK, fontsize=7.2, linespacing=1.35)
        if i < len(steps) - 1:
            arrow(ax, (x + w + 0.003, y + h / 2), (x + w + gap - 0.003, y + h / 2))
    rbox(ax, 0.01, 0.05, 0.98, 0.2, "#FFF7E0", GOLD, r=0.015)
    ax.text(0.5, 0.15, "OWN  ·  The master records, approves and can withdraw. Consent and credit travel with the data (signed with the master's phone fingerprint).",
            ha="center", va="center", fontsize=7.4, color="#5A4300")
    fig.tight_layout(pad=0.3)
    fig.savefig(os.path.join(OUT, "v4_pipeline.png"))

if __name__ == "__main__":
    pipeline_v4()
