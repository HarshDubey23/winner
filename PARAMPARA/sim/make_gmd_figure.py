"""Figure for the real-data check on the Groove MIDI Dataset (reads gmd_fingerprint_results.json)."""
import os, json
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

HERE = os.path.dirname(os.path.abspath(__file__))
R = json.load(open(os.path.join(HERE, "gmd_fingerprint_results.json")))["four_bars_16_beats"]
BLUE, ORANGE, INK, GREY, GRID = "#2a78d6", "#eb6834", "#222222", "#6b6b6b", "#e6e6e6"
plt.rcParams.update({"font.family": "DejaVu Sans", "font.size": 11})

fig = plt.figure(figsize=(12, 4.6))
ax1 = fig.add_axes([0.20, 0.17, 0.30, 0.66])
rows = [("Naive random split", R["naive_random_split"]), ("New session (T-a)", R["T-a_new_session"]),
        ("New style (T-b)", R["T-b_new_style"]), ("New session and style", R["T-ab_new_session_and_style"])]
y = np.arange(len(rows))[::-1]
ax1.barh(y, [v for _, v in rows], color=BLUE, height=0.56)
for yy, (_, v) in zip(y, rows):
    ax1.text(v + 0.015, yy, f"{v:.0%}", va="center", fontsize=11, color=INK)
ax1.axvline(R["chance"], color=GREY, ls="--", lw=1.2)
ax1.text(R["chance"] + 0.01, -0.62, f"chance {R['chance']:.0%}", ha="left", fontsize=10, color=GREY)
ax1.set_yticks(y); ax1.set_yticklabels([r for r, _ in rows]); ax1.set_xlim(0, 1); ax1.set_ylim(-0.8, len(rows) - 0.5)
ax1.set_xticks([0, 0.25, 0.5, 0.75, 1]); ax1.set_xticklabels(["0", "25%", "50%", "75%", "100%"])
ax1.set_title(f"Name the drummer (7 drummers, 16-beat units)", fontsize=12, loc="left", color=INK)

ax2 = fig.add_axes([0.60, 0.17, 0.16, 0.66])
vals = [R["eval_same_grooves"], R["control_pattern_only_eval"]]
ax2.bar([0, 1], vals, color=[BLUE, ORANGE], width=0.6)
for x, v in zip([0, 1], vals):
    ax2.text(x, v + 0.02, f"{v:.0%}", ha="center", fontsize=11, color=INK)
ax2.axhline(R["eval_chance"], color=GREY, ls="--", lw=1.2)
ax2.text(1.45, R["eval_chance"], "chance\n25%", va="center", fontsize=10, color=GREY)
ax2.set_xticks([0, 1]); ax2.set_xticklabels(["how they\nplay", "which notes\n(control)"])
ax2.set_ylim(0, 1); ax2.set_yticks([0, 0.25, 0.5, 0.75, 1]); ax2.set_yticklabels(["0", "25%", "50%", "75%", "100%"])
ax2.set_title("Same 10 grooves, 4 drummers", fontsize=12, loc="left", color=INK)

ax3 = fig.add_axes([0.85, 0.17, 0.13, 0.66])
m, (lo, hi) = R["trios_T-a_mean"], R["trios_T-a_min_max"]
ax3.vlines(0, lo, hi, color=BLUE, lw=3)
ax3.plot([0], [m], "o", color=BLUE, ms=9)
ax3.text(0.12, m, f"mean {m:.0%}", va="center", fontsize=10.5, color=INK)
ax3.text(0.12, lo, f"{lo:.0%}", va="center", fontsize=10, color=GREY); ax3.text(0.12, hi, f"{hi:.0%}", va="center", fontsize=10, color=GREY)
ax3.axhline(0.70, color=INK, lw=1.2); ax3.text(-0.48, 0.715, "E1 pass 70%", fontsize=9.5, color=INK)
ax3.axhline(1 / 3, color=GREY, ls="--", lw=1.2); ax3.text(-0.48, 0.29, "chance 33%", fontsize=9.5, color=GREY)
ax3.set_xlim(-0.5, 0.7); ax3.set_ylim(0, 1); ax3.set_xticks([])
ax3.set_yticks([0, 0.25, 0.5, 0.75, 1]); ax3.set_yticklabels(["0", "25%", "50%", "75%", "100%"])
ax3.set_title("E1-sized: 35 trios,\nnew session", fontsize=12, loc="left", color=INK)

for ax in (ax1, ax2, ax3):
    for s in ("top", "right"): ax.spines[s].set_visible(False)
    ax.spines["left"].set_color("#bbbbbb"); ax.spines["bottom"].set_color("#bbbbbb")
    ax.tick_params(colors=INK)
ax1.grid(axis="x", color=GRID); ax2.grid(axis="y", color=GRID); ax3.grid(axis="y", color=GRID)
for ax in (ax1, ax2, ax3): ax.set_axisbelow(True)
fig.text(0.01, 0.03, "Real data: Groove MIDI Dataset (Gillick et al. 2019, CC BY 4.0), 4,118 sixteen-beat units, 7 drummers. Features: timing against the click and loudness only.", fontsize=9.5, color=GREY)
fig.savefig(os.path.join(HERE, "..", "figures", "v5_gmd_results.png"), dpi=200, facecolor="white")
print("saved")
