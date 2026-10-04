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
