"""Figure: the confound-controlled E1 tests on two synthetic worlds (software check, not data)."""
import json, os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

HERE = os.path.dirname(os.path.abspath(__file__))
res = json.load(open(os.path.join(HERE, "skilltwin_validation_demo.json")))
BLUE, ORANGE, INK, MUTED, GRID, SURF = "#2a78d6", "#eb6834", "#0b0b0b", "#52514e", "#e4e2dc", "#fcfcfb"

rows = [("Naive random split", "naive_random_cv_master_acc", BLUE),
        ("New day (session held out)", "T-a_leave_one_session_out_master_acc", BLUE),
        ("New instrument (held out)", "T-b_leave_one_instrument_out_master_acc", BLUE),
        ("Control: identify the instrument", "control_instrument_acc_leave_one_master_out", ORANGE)]
titles = {"master_driven": "World 1: style lives in the master", "instrument_driven": "World 2: the instrument secretly drives the data"}

fig, axes = plt.subplots(1, 2, figsize=(9.4, 3.3), dpi=220, sharey=True, facecolor=SURF)
for ax, world in zip(axes, ["master_driven", "instrument_driven"]):
    r = res[world]
    ax.set_facecolor(SURF)
    ys = list(range(len(rows)))[::-1]
    for y, (label, key, col) in zip(ys, rows):
        v = r[key]
        ax.barh(y, v, height=0.56, color=col, edgecolor=SURF, linewidth=2)
        ax.text(v + 0.02, y, f"{v:.0%}", va="center", fontsize=7.6, color=INK,
                bbox=dict(boxstyle="square,pad=0.15", fc=SURF, ec="none"), zorder=5)
    # reference lines only across the three master-identification rows
    ax.plot([r["chance_master"]] * 2, [0.6, 3.4], color=MUTED, lw=1, ls=(0, (3, 3)), zorder=1)
    ax.plot([0.70] * 2, [0.6, 3.4], color=INK, lw=1, zorder=1)
    ax.text(r["chance_master"], 3.6, "chance 33%", fontsize=6.4, color=MUTED, ha="center")
    ax.text(0.70, 3.6, "pass 70%", fontsize=6.4, color=INK, ha="center")
    ax.set_xlim(0, 1.12); ax.set_ylim(-0.95, 3.85)
    ax.set_yticks(ys); ax.set_yticklabels([x[0] for x in rows], fontsize=7.4, color=INK)
    ax.set_xticks([0, 0.25, 0.5, 0.75, 1.0]); ax.set_xticklabels(["0%", "25%", "50%", "75%", "100%"], fontsize=7, color=MUTED)
    ax.grid(axis="x", color=GRID, lw=0.6); ax.set_axisbelow(True)
    for s in ["top", "right", "left"]: ax.spines[s].set_visible(False)
    ax.spines["bottom"].set_color(GRID)
    ax.tick_params(length=0)
    verdict = r["verdict"].split(":")[0]
    ax.set_title(f"{titles[world]}\nVerdict: {verdict}", fontsize=8.2, color=INK, loc="left")
fig.text(0.01, 0.01, "Blue = identifying the master. Orange = identifying the instrument (should be low if the fingerprint is truly the master's). Synthetic data; software check only.",
         fontsize=6.6, color=MUTED)
fig.tight_layout(rect=(0, 0.05, 1, 1))
fig.savefig(os.path.join(HERE, "..", "figures", "confound_test.png"), facecolor=SURF)
