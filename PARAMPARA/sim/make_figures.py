"""Draws the architecture and lineage figures used in the PARAMPARA dossier."""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "figures")
MAROON, BLUE, GOLD, INK, GREY = "#7A1F1F", "#1F4E79", "#B8901A", "#222222", "#6B6B6B"

def box(ax, x, y, w, h, title, sub, color):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.012,rounding_size=0.018",
                                fc="white", ec=color, lw=1.6))
    ax.add_patch(FancyBboxPatch((x, y + h - 0.055), w, 0.055, boxstyle="square,pad=0",
                                fc=color, ec=color, lw=0))
    ax.text(x + w / 2, y + h - 0.028, title, ha="center", va="center", color="white", fontsize=8.2, weight="bold")
    ax.text(x + w / 2, y + (h - 0.055) / 2, sub, ha="center", va="center", color=INK, fontsize=6.9, linespacing=1.35)

def arrow(ax, a, b, label="", color=GREY, rad=0.0, lx=0, ly=0):
    ax.add_patch(FancyArrowPatch(a, b, arrowstyle="-|>", mutation_scale=10, lw=1.2, color=color,
                                 connectionstyle=f"arc3,rad={rad}"))
    if label:
        ax.text((a[0] + b[0]) / 2 + lx, (a[1] + b[1]) / 2 + ly, label, fontsize=6.4, color=color,
                ha="center", va="center", style="italic",
                bbox=dict(fc="white", ec="none", pad=0.6))

def architecture():
    fig, ax = plt.subplots(figsize=(10.5, 5.6), dpi=200)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
    ax.text(0.22, 0.975, "GURU SIDE  (Record)", ha="center", fontsize=9.5, weight="bold", color=MAROON)
    ax.text(0.78, 0.975, "STUDENT SIDE  (Replay · Assess · Branch)", ha="center", fontsize=9.5, weight="bold", color=BLUE)
    ax.plot([0.5, 0.5], [0.30, 0.96], ls=(0, (4, 4)), color="#BBBBBB", lw=1)

    box(ax, 0.03, 0.70, 0.40, 0.22, "Wrist cuffs ×2 (guru)", "ESP32 + 6-axis IMU (200–500 Hz)\narm lift · swing · prep time κ\nno glove: the guru's touch is untouched", MAROON)
    box(ax, 0.03, 0.40, 0.40, 0.24, "Base unit on the tabla", "ESP32-S3 · 2 piezo triggers (≥ 4 kHz)\noptional I²S mic (16 kHz) for timbre\nonset · hand · family · strength · decay", MAROON)
    box(ax, 0.57, 0.70, 0.40, 0.22, "Haptic cuffs ×2 (student)", "ESP32 + 2× DRV2605L + 2× LRA per cuff\n4 skin sites: dorsal / palmar × L / R\ncues fired from a local timeline", BLUE)
    box(ax, 0.57, 0.40, 0.40, 0.24, "Base unit on student's tabla", "same hardware, student role\ntimestamps every stroke (µs clock)\nscores vs the envelope", BLUE)
    box(ax, 0.16, 0.04, 0.68, 0.24, "Companion web app (Chrome / Edge · Web Bluetooth · IndexedDB)",
        "Record → review → label → SIGN (Ed25519 / COSE)  ·  Library + lineage DAG  ·  Verify\n"
        "Replay scheduler · Scoring (bias vs spread) · Fade Engine 2.0 · Probes · Dashboard\n"
        "Consent flags · revocation list · guru approval for branching", GOLD)

    arrow(ax, (0.23, 0.70), (0.23, 0.645), "ESP-NOW", MAROON, lx=0.05)
    arrow(ax, (0.77, 0.645), (0.77, 0.70), "ESP-NOW clock sync\n+ cue schedule", BLUE, lx=0.075)
    arrow(ax, (0.23, 0.40), (0.33, 0.285), "BLE / USB: strokes", MAROON, lx=-0.07)
    arrow(ax, (0.67, 0.285), (0.77, 0.40), "BLE / USB: strokes ↑  schedule ↓", BLUE, lx=0.09)
    arrow(ax, (0.43, 0.81), (0.57, 0.81), "Live Mirror (≤ 50 ms target)", GREY, lx=0, ly=0.03)
    ax.text(0.5, 0.335, "Signed Skill Envelope\n(per-stroke time, hand, family,\nstrength, micro-timing, kinematics)",
            ha="center", va="center", fontsize=6.8, color=INK,
            bbox=dict(boxstyle="round,pad=0.35", fc="#FFF7E0", ec=GOLD, lw=1))
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "architecture.png"))

def lineage():
    fig, ax = plt.subplots(figsize=(10.5, 3.6), dpi=200)
    ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
    def node(x, y, t, s, c):
        ax.add_patch(FancyBboxPatch((x - 0.11, y - 0.11), 0.22, 0.22, boxstyle="round,pad=0.01,rounding_size=0.02",
                                    fc="white", ec=c, lw=1.5))
        ax.text(x, y + 0.045, t, ha="center", va="center", fontsize=7.6, weight="bold", color=c)
        ax.text(x, y - 0.035, s, ha="center", va="center", fontsize=6.2, color=INK, linespacing=1.3)
    node(0.13, 0.55, "Guru envelope G1", "Teentaal theka, 80 bpm\nsigner = guru key\nconsent: replay ✓ branch ✓", MAROON)
    node(0.385, 0.78, "Approval A1", "guru signs\n{student key, G1 hash}", GOLD)
    node(0.385, 0.25, "Revocation R0", "guru signs {target hash}\nhonoured at next sync", "#8A8A8A")
    node(0.65, 0.78, "Student paltā S1", "parent = hash(G1)\ncarries A1\nlineage tag inherited", BLUE)
    node(0.65, 0.30, "Tampered copy", "1 byte changed\n→ signature fails\n→ replay refused", "#B5523B")
    node(0.865, 0.55, "Grand-student S2", "parent = hash(S1)\nneeds S1's consent\n+ new approval", BLUE)
    arrow(ax, (0.24, 0.62), (0.275, 0.72), "", MAROON)
    arrow(ax, (0.495, 0.78), (0.54, 0.78), "", GOLD)
    arrow(ax, (0.24, 0.47), (0.54, 0.385), "copied & edited", "#B5523B", lx=0.0, ly=0.035)
    arrow(ax, (0.76, 0.72), (0.785, 0.665), "", BLUE)
    ax.text(0.5, 0.02, "Hash-linked lineage graph (like Git history). No blockchain: Ed25519 signatures + SHA-256 hashes give tamper evidence and provenance.",
            ha="center", fontsize=7, color=GREY, style="italic")
    fig.tight_layout()
    fig.savefig(os.path.join(OUT, "lineage.png"))

if __name__ == "__main__":
    architecture(); lineage()
