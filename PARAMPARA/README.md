# PARAMPARA: final research dossier (SIH 2026, PS 26214)

**Deliverable:** [`PARAMPARA_Final_Research_Dossier.docx`](PARAMPARA_Final_Research_Dossier.docx) (43 pages, A4)

It merges the team's *Executive Summary* PDF and the *Research & Engineering Dossier* into one final solution:

- **Reference audit.** Two citations in the PDF were fabricated ("Masur & Sacks 2025", "Flandorfer 2022") and several were mis-cited. Section 3 lists every fix.
- **105 numbered references**, each tagged V (verified by live search, Oct 2026: 59), P (exists, details from memory: 15) or S (classic, not re-checked: 31).
- Innovation (7 specific innovations), novelty (prior-art matrix + search log), feasibility, viability, impact, jury strategy, validation plan.
- Extensions to pakhawaj, Kathak footwork, pottery, puppetry, weaving and more (Section 13).
- **Our own fade-engine simulation** (Section 7). It found that the original fade constants never reach zero guidance in a 48-cycle pilot. Fade Engine 2.0 fixes that. It tests the controller, not human learning.

## Rebuild

```bash
python3 PARAMPARA/sim/fade_engine_sim.py   # simulation + figures/fade_sim.png + sim/fade_sim_results.json
python3 PARAMPARA/sim/make_figures.py      # figures/architecture.png, figures/lineage.png
node PARAMPARA/build/build.js              # writes the .docx (needs the `docx` npm package)
```

Content lives in `build/content1.js` (sections 0–7) and `build/content2.js` (sections 8–18 and appendices); references in `build/refs.js`.
