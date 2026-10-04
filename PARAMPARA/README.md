# PARAMPARA: final research dossier (SIH 2026, PS 26214)

**Latest deliverable: [`PARAMPARA_v2_Final_Research_Dossier.docx`](PARAMPARA_v2_Final_Research_Dossier.docx)** (version 2.0, red-team revision, 43 pages, 133 references: 82 V, 20 P, 31 S).

Version 2 answers all 14 attacks from our own harsh SIH-judge review of v1 (about 59/100):
- **Gharana Fingerprint:** a measurable per-matra timing and accent signature of each master (experiment E1, analysis code `sim/fingerprint.py`).
- **Three-tier multisensory curriculum:** touch for structure, hearing for micro-timing, vision for movement, based on measured perceptual limits.
- **Movement-aware haptics:** cues end before the student's lift, outside the movement-related tactile suppression window.
- **Fade Engine 2.1:** realistic simulation (`sim/fade_engine_sim_v2.py`) shows a small, consistent gain over a fixed fade (+0.015 retention, 95% CI 0.013–0.017, in 2 of 3 learner models).
- Passkey (fingerprint) signing, CARE / TK-label consent governance, custom PCB with volume BOM, showcase kiosk, four decisive experiments E1–E4.

Version 1 ([`PARAMPARA_Final_Research_Dossier.docx`](PARAMPARA_Final_Research_Dossier.docx)) merges the team's *Executive Summary* PDF and the *Research & Engineering Dossier* into one final solution:

- **Reference audit.** Two citations in the PDF were fabricated ("Masur & Sacks 2025", "Flandorfer 2022") and several were mis-cited. Section 3 lists every fix.
- **105 numbered references**, each tagged V (verified by live search, Oct 2026: 59), P (exists, details from memory: 15) or S (classic, not re-checked: 31).
- Innovation (7 specific innovations), novelty (prior-art matrix + search log), feasibility, viability, impact, jury strategy, validation plan.
- Extensions to pakhawaj, Kathak footwork, pottery, puppetry, weaving and more (Section 13).
- **Our own fade-engine simulation** (Section 7). It found that the original fade constants never reach zero guidance in a 48-cycle pilot. Fade Engine 2.0 fixes that. It tests the controller, not human learning.

## Rebuild

```bash
python3 PARAMPARA/sim/fade_engine_sim_v2.py  # realistic fade simulation (v2)
python3 PARAMPARA/sim/fingerprint.py power   # E1 planning + figures/fingerprint_power.png
node PARAMPARA/build/build_v2.js             # writes the v2 .docx
python3 PARAMPARA/sim/fade_engine_sim.py   # simulation + figures/fade_sim.png + sim/fade_sim_results.json
python3 PARAMPARA/sim/make_figures.py      # figures/architecture.png, figures/lineage.png
node PARAMPARA/build/build.js              # writes the .docx (needs the `docx` npm package)
```

v2 content lives in `build/content_v2a.js`, `build/content_v2b.js` and `build/refs_v2.js`. v1 content lives in `build/content1.js` (sections 0–7) and `build/content2.js` (sections 8–18 and appendices); references in `build/refs.js`.
