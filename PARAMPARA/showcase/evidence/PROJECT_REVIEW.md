# PARAMPARA — repository review and submission evidence

Reviewed 5 October 2026. Source: https://github.com/HarshDubey23/winner/tree/claude/gracious-albattani-baeanh/PARAMPARA

Cloned branch: `claude/gracious-albattani-baeanh`
Source commit: `7e97edc0fdfc4ba47d44efcb11a37f0529f7cc83`

## What the project is

PARAMPARA proposes recording a consenting craft master's movement and tool timing as a Skill Fingerprint, using it to guide learners, fading the guidance, then measuring unaided performance. Tabla is the flagship. Handloom and Kathputli are generalisation demonstrations.

One sleeve has nine IMUs (five fingers, hand, forearm, upper arm, shoulder) and eight haptic motors (five fingers, wrist, elbow, shoulder). Two sleeves support bilateral work. An ESP32-S3 hub, two switched I2C buses, battery and microSD are planned per sleeve. Tool sensors provide the outcome signal: drum pickups, loom switches/beater sensing, or a puppet IMU.

The proposed workflow is consent → capture → validate fingerprint against session/instrument confounds → teach → fade → device-silent check → retention test. The phone app implements a reduced rhythm version, not the complete wearable workflow.

## Contents inspected

| Folder / artifact | Purpose | Evidence status |
|---|---|---|
| `README.md`, `build/content_v6.js` | Latest design, budgets, BOM, pilot protocols and claim boundaries | Source of v6 report; reference claims were not independently re-audited |
| v1–v6 DOCX/PDF documents and `build/` | Historical and latest research reports and generators | Reports, not hardware results |
| `cad/parampara_cad.py`, `render_all.py` | Parametric housings, sleeve, craft scenes and exploded assemblies | Reused to produce the new GLBs |
| `cad/out/` | Ten STEP and ten STL housing parts, bounding sizes | CAD geometry, not print-fit certification |
| `cad/renders/`, `figures/` | Product renders, diagrams and plots | Existing illustrations; CAD images are not photographs |
| `firmware/src/`, `firmware/test/` | Device drivers, routing, teaching logic, host mocks | Fresh host run: 27 checks, 0 failures; clock error 63 microseconds in the synthetic test |
| `lite/index.html`, `lite/e2e_test.py` | Phone rhythm teaching, fading, unaided scores and CSV export | Fresh browser checks passed: on-time about 99.9%, 60 ms late about 75.3%, silent 0%; A/B master profiles are examples |
| `sim/` | Fade models, synthetic confound checks, Groove MIDI analysis | Synthetic results must be distinguished from real-data analysis |
| `ppt/` | Six-slide specifications, prompts, assets and wireframes | Preparation materials, not a completed final submission deck |

## What was added in this step

A browser-based 3D viewer with eight GLB assets and nine views: sleeve, hand close-up, four exploded modules, tabla, puppetry and loom. Orbit, zoom, labels, part selection, auto-rotation and PNG export support presentation use. CAD geometry is exported from the existing repository; it is not newly invented equipment. Housing STEP/STL downloads and the phone demo are bundled alongside it.

Viewer verification: all nine views loaded successfully in Chromium with no captured page errors or failed HTTP responses. The PNG export was downloaded successfully. The mobile layout was checked at 390 px width with no horizontal overflow. Saved screenshots and `viewer-checks.json` are included. Visual inspection led to adjusted lighting, camera framing and overlapping-label suppression.

GLB coordinates are metres with Y up, converted from source CAD millimetres with Z up. GLBs are visual meshes; retain STEP for CAD editing and STL for printing. The hub's source base plus lid is 14 + 2.4 = 16.4 mm; some source captions round this to 16 mm. Strap lugs extend outside nominal body dimensions.

## What this proves, and what remains

The model demonstrates the design and component placement. Host tests demonstrate selected logic with mock hardware. Neither proves that a built sleeve works or improves learning.

Fresh phone check: `lite-fresh-results.json` and `lite-on_time.png`, `lite-late_60ms.png`, `lite-silent.png`. The original repository's scripted-player methodology was run in three isolated Chromium pages using `verify.cjs --lite`; this uses synthetic taps through the app's own test hook. Successful cases faded guidance to 0.6; silence retained guidance at 1.0. These are software checks, not participant outcomes.

No complete ESP-IDF target project, PCB fabrication package, physical bench measurements, real tabla-master recordings or completed human trials were found in PARAMPARA. The full radio/storage acquisition loop, wearable-to-app integration, ghost-arm feedback and consent/signing workflow still require implementation and verification. The BMI270 driver requires the external Bosch configuration data. Treat component selection, power budgets, comfort, fit and timing as design assumptions pending bench tests.

One design inconsistency needs reconciliation before PCB manufacture: `cad/parampara_cad.py` models an additional BMI270 block inside the hub, while `firmware/src/sleeve.h` defines nine IMU sites without a separate hub site. The nine-sensor sleeve count already includes the separate forearm/wrist pod. The viewer preserves the source geometry; decide whether that hub block is a spare or should be removed before finalising the schematic and BOM.

The synthetic fingerprint demonstration was also rerun from a copy of the source: it accepted the deliberately master-driven dataset and rejected the instrument-driven dataset. See `synthetic-validation-log.txt` and `skilltwin_validation_demo.json`. This verifies that demonstration's behaviour; it is not evidence from real tabla performers. The Groove MIDI dataset results remain repository-supplied and were not reproduced here.

Before making stronger claims, build one sensor/motor channel, verify the target firmware and power system, test a complete sleeve against H1–H8, record with consent, and run the predefined E0–E5 protocols. Preserve failed results as well as successes.

## Suggested submission evidence

1. Interactive 3D link plus a labelled equipment image in the PPT.
2. STEP/STL source files, BOM and an electrical architecture diagram.
3. Working phone-demo link and an actual screen recording showing teach → fade → unaided score.
4. Firmware source and the fresh host-test log, explicitly marked mock-hardware tests.
5. Simulation code, input assumptions and outputs, explicitly marked synthetic where applicable.
6. A short build plan with the missing physical tests and their pass criteria.

A model and animation support engineering intent; your strongest next proof of build ability is a photographed, measured sensor → controller → motor bench demonstration.

## Where to put links

Use GitHub Pages for the interactive viewer and phone web app. Upload the contents of `showcase/` to the publishing root of a repository you control; keep subfolders intact. Select that branch/root in Settings → Pages. Use the actual URL returned by GitHub after deployment; no public URL has been created in this step.

Use Google Drive for the final PDF/PPT, downloadable evidence ZIP and MP4 video. For each submission item choose Share → General access → Anyone with the link → Viewer, where your account allows it. Test every link in a signed-out/private browser window.

On the PPT, select descriptive text such as “Explore equipment in 3D”, use Insert → Link, and paste the public viewer URL. Add a QR code pointing to that same URL once it exists. Use a separate “Watch demonstration” link for the video. Export to PDF and check the links again.

Official guidance checked: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site and https://support.google.com/drive/answer/2494822

## Next step: the complete simulation video

Suggested 90-second storyboard: 0–12 s explain the craft gap; 12–30 s rotate the sleeve and show sensing/feedback modules; 30–42 s show the tabla pickups; 42–67 s record the real phone app teaching and fading; 67–80 s show its unaided check; 80–90 s show current evidence and the next physical build milestone. Use loom and puppet cutaways only as secondary demos.

Label animated sensor data and motion as illustrative. Do not invent a learner result, physical prototype footage or a real-master recording. A complete project video remains a subsequent step; this package provides its 3D equipment assets.
