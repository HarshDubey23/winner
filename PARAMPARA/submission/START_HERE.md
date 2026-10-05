## Current film — performance-led revision

Use `film-v3/PARAMPARA-4min-Jury-Film.mp4`. This is the selected 4:10 jury cut, with the professional opening ident, conversational Hindi/Hinglish narration, real tabla/Kathputli/weaving ambience, consistent CAD and evidence boundaries. Earlier film versions are retained only for reference. Sources and sharing instructions: `film-v3/README.md`.

# PARAMPARA evidence pack

Prepared 5 October 2026. No PPT is included, as requested.

## What to submit

1. **Research dossier:** `docs/PARAMPARA-Research-Evidence.pdf` (14 pages), with editable Markdown beside it. It includes research, architecture, hardware feasibility, actual results, limits, consent, validation gates and judge Q&A.
2. **Video:** `video/PARAMPARA-Digital-Prototype.mp4` (72 seconds, 720p, captioned, no audio). All geometry is actual repository CAD. `video/PRESENTER_SCRIPT.md` supplies optional narration.
3. **Working circuit:** https://wokwi.com/projects/477036096886805505 . Click Start. It is an ESP32 virtual prototype using clearly identified substitutes.
4. **Interactive evidence dashboard:** `submission/index.html`, served as a website. It includes the 3D cue replay, phone prototype, all CAD views, video and report links.
5. **Supporting evidence:** raw results and screenshots in `results/`, source and dataset files in `research/`, circuit code and diagram in `circuit/`, CAD and earlier tests in sibling `showcase/`.

The original 169-entry reference catalog and historical v6 PDF are preserved. Their old verification tags are inherited source metadata, not a fresh audit of all 169 sources. Use the new dossier for current claim wording.

## Open locally

Extract the complete ZIP. Keep the `submission` and `showcase` folders beside each other. In the extracted `PARAMPARA` directory run:

```powershell
python -m http.server 8766 --bind 127.0.0.1
```

Open `http://127.0.0.1:8766/submission/` in a browser. Do not double-click the HTML: browsers restrict loading models from file URLs. The MP4 and PDF can be opened directly. This localhost address is not a public submission link.

## Share links properly

**PDF, video and ZIP: Google Drive.** Upload the final files into one dedicated submission folder. If your institution permits, set the intended files to “Anyone with the link” and Viewer. Copy each file's share link. Test the links in a signed-out/private window, including video playback and downloading the ZIP. Do not put participant recordings in this public folder.

**Interactive 3D: static web hosting.** GitHub Pages can serve the HTML, JavaScript, GLB and video. Put the extracted `PARAMPARA` directory in the selected publishing folder and enable Pages for that folder/branch. The resulting website path ends in `/PARAMPARA/submission/` if you retained that top-level folder. Use the exact URL GitHub gives you. A GitHub source-file URL or a Drive preview is not the running 3D app. No public 3D hosting URL has been created in this pack.

**Circuit: attach the Wokwi project URL directly.** The code is already saved online; local copies are provided for portability.

Use labelled links such as **Research evidence**, **Digital prototype video**, **Interactive 3D demo**, and **ESP32 circuit simulation** in your PPT or portal. Use a QR code only after the final hosted URL has been checked. Keep a text URL beside every QR. Official references: https://support.google.com/drive/answer/2494822 and https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site .

## What you can truthfully say

“We implemented the phone practice prototype and tested the teaching core. We created an inspectable mechanical design and executed an ESP32 circuit simulation. We reproduced a public electronic-drum feature experiment. Physical tabla sensing, haptic onset, comfort and retention remain the next validation steps.”

Do not label the MIDI result as tabla accuracy. Do not turn synthetic controller scores into human learning results. No selection guarantee or 9.8/10 rating can be established by a simulation pack.

## Reproduce the results

Use a compiler supporting C++17 and Python with the recorded dependencies. Original firmware headers are packaged in `firmware/src/`.

```powershell
# Run from PARAMPARA/submission/research
g++ -std=c++17 -O2 core_benchmark.cpp -o ../build/core_benchmark.exe
../build/core_benchmark.exe

# Python needs numpy and mido. Dataset archive and extracted MIDI are included.
python gmd_fingerprint.py data/groove
python benchmark_ablation.py
```

The analysis script takes the dataset directory as its single positional argument and writes `gmd_fingerprint_results.json` next to itself. A fresh run overwrites that JSON; redirect console output to a new file if you want to preserve the supplied run logs. Create `submission/build/` first if your ZIP extractor omitted that empty directory.

The video renderer `research/render_video.py` requires VTK, trimesh, numpy, Pillow and imageio-ffmpeg. It uses Windows Segoe UI fonts. The PDF builder `research/build_dossier.py` uses reportlab. The preserved historical PDF is required at `PARAMPARA/PARAMPARA_v6_Final_Solution.pdf` if rerunning that builder; a copy is included under `docs/` and can be placed there first. These renderers are optional: final files are already provided.

## Evidence inventory

- `results/core-benchmark.json`: 1,000 scoring cases; 425 timing/fade checks; zero failures, tested synthetic domain stated.
- `results/core-cases.csv`: generated-case inputs and outputs.
- `results/teaching-trace.json`: 25-cycle trace from the actual C++ core.
- `research/gmd_fingerprint_results.json`: reproduced dataset experiment.
- `results/gmd-ablation.json`: feature ablation, per-performance outcomes, confusion counts and bootstrap intervals.
- `results/wokwi-observed-log.txt`, `wokwi-ontime-log.txt`, `wokwi-silent-log.txt`: observed simulator serial output.
- `results/dashboard.png`, `wokwi-running.png`: UI proof.
- `../showcase/evidence/`: earlier host tests, phone tests, viewer checks, screenshots and housing ZIP.
- `research/upstream-reference-register.json`: complete retained source register.
- `docs/claim-evidence-matrix.csv`: claims paired with evidence and boundaries.
- `docs/figures/gmd-ablation.png` and `controller-trace.png`: ready-to-attach research plots, with scope and uncertainty stated.
- `SHA256SUMS.txt`: checksums for the packaged files.

## Attribution and remaining decisions

Source repository: https://github.com/HarshDubey23/winner/tree/claude/gracious-albattani-baeanh/PARAMPARA at commit `7e97edc0fdfc4ba47d44efcb11a37f0529f7cc83`.

Groove MIDI Dataset: Gillick, Roberts, Engel, Eck and Bamman (2019), https://magenta.withgoogle.com/datasets/groove , CC BY 4.0. This pack's analysis is derived work; dataset authors do not endorse PARAMPARA. The official archive SHA-256 is `651cbc524ffb891be1a3e46d89dc82a1cecb09a57c748c7b45b844c4841dcc1e`. Keep dataset licenses and the Three.js license with redistributed files.

Confirm the actual SIH problem statement, current portal rules, deadline and permitted file sizes yourself before submitting. No current-rule compliance or field partnership is asserted. The most valuable next evidence is a measured one-sensor/one-actuator physical bench demonstration, followed by real consenting tabla recordings.


## Cinematic film

The new 3-minute Hindi/Hinglish film with English subtitles is in `film/PARAMPARA-Cinematic-Film-Hindi.mp4`. See `film/README.md` for sharing and `film/CREDITS.md` for sources. It uses a single equipment master image throughout. The 72-second CAD animation remains separate technical evidence.


## Earlier four-minute engineering cut

`film-v2/PARAMPARA-4min-Hindi.mp4` is retained as an earlier engineering-heavy cut. For submission, use the selected film named at the top of this guide. `film-v2/PARAMPARA-CAD-Component-Tour.mp4` remains useful as the separate equipment walkthrough.
