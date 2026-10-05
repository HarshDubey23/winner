# PARAMPARA
Research & prototype evidence

Submission companion | 5 October 2026

A proposed open-palm sensing and haptic sleeve for preserving craft movement and supporting independent practice. Tabla is the first validation case; handloom and puppetry remain extension concepts.

Figure 1. Repository-derived 3D CAD, rendered digitally. No assembled sleeve is shown.

![Figure 1. Repository-derived 3D CAD, rendered digitally. No assembled sleeve is shown.](video\scene-2.jpg)

### What is demonstrated now

Interactive CAD; a working phone practice prototype; host-tested firmware logic; a compiled public ESP32 circuit simulation; reproducible experiments on public electronic-drum MIDI; and a captioned 72-second 3D video.

### What is still unproven

Real tabla identification, sensor and haptic accuracy, wearable comfort, instrument invariance, battery endurance and improved human retention require physical data. No selection outcome or numerical quality rating is guaranteed.

Source: HarshDubey23/winner, branch claude/gracious-albattani-baeanh, commit 7e97edc0fdfc4ba47d44efcb11a37f0529f7cc83. Prepared from the supplied repository plus fresh tests. Team identity and official problem-statement details belong in the team submission.

# 1. Evidence and claim boundaries

Use this matrix when describing the project to judges. A test pass is evidence of the tested software behavior, not a measurement of wearable accuracy.

| Claim area | Available evidence | Boundary |
| --- | --- | --- |
| 3D equipment design | 8 GLB scenes; 9 viewer views; 20 housing STEP/STL files | CAD geometry; no manufacturability approval |
| Firmware core | 27 existing host checks; 1,000 scoring cases and 425 timing/fade checks passed | Mock/host execution; no full ESP32-S3 sleeve deployment |
| Virtual circuit | ESP32 sketch compiled and executed in Wokwi; serial logs retained | MPU6050/LED substitutes; one channel |
| Phone practice | On-time, late and silent scripted input tests; CSV output | Synthetic example profiles; browser timing |
| Performer information | 47.6% held-session balanced accuracy, 7 electronic-drum performers | Not tabla, not wearable, not skill quality |
| Same-groove experiment | 63.125% balanced unit accuracy; 25% chance, 4 performers | 158 units from 40 performances on one electronic kit |
| Learning benefit | Protocol and controller fixture exist | No measured human retention improvement |
| Physical prototype | Planned CAD, architecture and bench protocol | No assembled device claimed |

The original v6 research report and complete 169-entry upstream reference catalog are retained as historical source material. Their original verification labels and numerical claims are not re-certified by this dossier. Freshly reproduced results and consulted primary sources are identified separately.

# 2. Research question and focused scope

### Problem hypothesis

Audio and video preserve important parts of a performance. The project asks whether a synchronized record of body movement and tool events can preserve additional, teachable information about how a consenting master performs a phrase. The size of this gap has not yet been measured with tabla teachers or learners.

### A defensible first use case

Limit the first study to one defined Teentaal exercise, two drum-event channels and a small set of motion sites. Demonstrate repeatable capture before expanding to a complete sleeve. Handloom and Kathputli models communicate possible transfer; they are not independently validated products.

### Three questions that must be answered separately

- Identity: does the representation distinguish performers across sessions, phrases and instruments?

- Teaching: does adaptive cueing improve delayed, unaided performance over simpler baselines?

- Practicality: can users wear and operate the system without changing the technique being studied?

### What published work contributes

Prior haptic music-learning and force-training work motivates multimodal guidance. It does not establish a benefit for PARAMPARA, tabla or this actuator layout. The present controller intentionally includes cue-free checks; a comparison study must establish whether fading actually helps. [R6, R7]

### Novelty positioning

Present the contribution as a specific integration and validation approach: a master-consented movement reference, body/tool synchronization, and teaching evaluated without cues. Do not claim that haptic music learning, wearable IMUs or motion capture are individually new. Patent novelty and freedom to operate have not been assessed.

### Research retained from the original report

The historical report covers craft context, motor-learning literature, skill fingerprints, equipment, feasibility, institutional adoption, impact, E0-E5 protocols, partner outreach, simulations and an execution kit. It is included for completeness. This dossier updates the executable evidence and narrows claims that require new data.

# 3. Proposed system architecture

| Layer | Role and interfaces |
| --- | --- |
| Capture | Nine BMI270 sites per arm: five fingers, hand, forearm/wrist, upper arm and shoulder. Tool-event channels provide stroke timing and relative strength. |
| Routing | TCA9548A I2C switches separate repeated device addresses. Two bus branches are proposed. Channel allocation, cable capacitance and polling time require a verified hardware map. |
| Hub | ESP32-S3-MINI-1, timestamps, local storage and communication. Charging and power management must be designed for wearable use. |
| Haptics | Eight LRA cue sites: five fingers, wrist, elbow and shoulder, driven through DRV2605L devices. Electrical drive and mechanical onset must be characterized separately. |
| Analysis | Segment phrases; extract timing/movement features; fit references on training sessions only; evaluate held-out sessions and instruments. |
| Teaching | Play a reference; schedule anticipatory cues; reduce cue density; evaluate regular no-cue cycles and delayed retention. |
| Ownership | Master consent, permitted use, attribution, export and deletion rules accompany every recording. |

### The data path

Consented master + synchronized body/tool recordings -> quality checks -> phrase features -> session/instrument validation -> approved reference -> learner practice -> cue-free score -> delayed retention assessment.

### Integration gaps to resolve

- The CAD hub includes an additional BMI270 while the intended site map describes nine sites. Decide whether this replaces a site or becomes a tenth, then update CAD, wiring, firmware and BOM together.

- The repository includes firmware core and mocked hardware tests, not a completed production ESP-IDF application or PCB design.

- BMI270 initialization requires its configuration data and a verified boot sequence; a drawn chip is not a working sensor interface.

# 4. Mechanical and electrical feasibility

| Housing | Nominal repository envelope |
| --- | --- |
| Finger IMU ring | 13 x 11 x 4.4 mm |
| Haptic pod | Diameter 12 x 5.2 mm |
| Back-of-hand board | 42 x 32 x 8 mm |
| Joint pod | 28 x 20 x 8 mm |
| Forearm hub | 62 x 44 x 16.4 mm |

Housing dimensions exclude strap lugs and loops. Exploded spacing is for inspection. CAD exports demonstrate packaging intent; they do not prove clearances, tolerance stacks, strap comfort, cable strain relief or production readiness.

### Provisional one-arm purchasing scope

9 motion sensors, 8 haptic drivers, 8 LRAs, one ESP32-S3 hub, I2C switches, storage, regulated power, protected battery/charging circuitry, cables/connectors, straps and printed housings. Tool sensors and a second arm are additional. Final counts must follow the reconciled schematic. Obtain dated supplier quotes; no fresh price or finished BOM cost is asserted here.

### Timing and power need measurements

The BMI270 datasheet specifies mode-dependent filtering and delay. At 200 Hz the sample interval is 5 ms; sub-sample event estimates and timestamp alignment do not make raw samples arrive every 2 ms. Separate sample rate, clock alignment, filter delay and actuator onset in any latency claim. [R3]

DRV2605L is an LRA/ERM driver; LED output in a simulator does not establish motor acceleration, resonant tuning or rise time. Shared-address routing is a known design pattern, but bus bandwidth and simultaneous motor demand remain design checks. [R4, R5]

### Build order

First validate one sensor and one actuator with synchronized timestamps. Add the tool-event channel. Then expand the bus and only then the wearable. Record supply voltage, reset rate, event timing and thermal observations at each step.

# 5. Executable virtual electronics

Public project: https://wokwi.com/projects/477036096886805505

The saved project compiles and runs an ESP32 sketch. It reads a virtual MPU6050 over I2C, shows an acceleration threshold on a blue LED, schedules cue commands on an orange LED, and accepts a manual tap button. Wokwi was chosen for its ESP32 support. [R1, R2]

| Connection | Virtual wiring |
| --- | --- |
| Power | ESP32 3V3 -> MPU6050 VCC; all grounds common |
| I2C | GPIO21 -> SDA; GPIO22 -> SCL; sensor address 0x68 |
| Cue indicator | GPIO25 -> 330 ohm resistor -> orange LED -> GND |
| Motion indicator | GPIO26 -> 330 ohm resistor -> blue LED -> GND |
| Tap button | GPIO18 input pull-up -> switch -> GND |

| Input condition | Observed serial outcome |
| --- | --- |
| Default: 60 ms late, synthetic | Score 0.7500; guidance 0.80 at cycle 0, 0.60 at cycle 4 |
| 0 then r: on-time, synthetic | Score 1.0000; guidance eventually reaches 0.00 |
| d then r: synthetic taps off | No manual taps: score 0.0000, guidance 1.00 |

All readings above are simulator outputs. Scores are algorithm values, not percentages of sensing accuracy. Default acceleration is 0.500 g; the motion indicator threshold is |ax| > 0.35 g. Sensor-read failures inhibit the cue command.

### Known differences from the proposed sleeve

MPU6050 substitutes for BMI270; an LED substitutes for an LRA. This is a standalone one-channel sketch, not a port of the complete firmware. The first beat at a cycle boundary is not pre-cued by this simple scheduler. That boundary behavior must be fixed before claiming a full real-time cycle scheduler. The core fixture and Wokwi sketch are distinct pieces of evidence.

Files: circuit/sketch.ino, circuit/diagram.json, circuit/README.md; results/wokwi-*-log.txt. The screenshot is included in the evidence folder. Serial commands: d toggle synthetic inputs; r reset; 0/6/9 select 0/60/90 ms synthetic offsets.

# 6. Firmware and controller verification

### Fresh generated-case benchmark

| Measure | Observed result |
| --- | --- |
| Generated scoring cases | 1,000 |
| Timing and fade checks | 425 |
| Failures | 0 |
| Maximum difference from expected score | 0 within the tested generated cases |
| Input domain | 60-180 BPM; fixed per-cycle timing offset -120 to +120 ms; independent missing taps 0-25% |
| Reproducibility | Seed 26214; core-cases.csv and core-benchmark.json |

The C++ benchmark includes the actual teaching header and compares outputs with expected values calculated from generated tap truth. It checks score behavior, bounded guidance updates and silence during check cycles. This does not test sensor drivers on hardware, electrical faults, arbitrary malformed data or real users.

### Existing firmware checks

The original host suite passed 27 checks with zero failures. These cover mocked core/device behavior. The retained test log identifies the execution. Do not describe 27 or 1,425 passing checks as a device-accuracy percentage.

### Controller semantics

A check occurs when cycle index modulo 4 equals zero. Target guidance is clamp(1 - score / 0.85, 0, 1), with a maximum change of 0.20 per check. Cue density steps from every beat to every second beat, every fourth beat, the first beat only, then none. The planned cue window starts 120 ms before a stroke and ends 80 ms before it.

### Important scoring limitation

The core combines hand correctness and timing. It does not yet constitute a complete tabla-quality metric and does not explicitly penalize every extra tap. Before a human study, define false-positive strokes, wrong bols, amplitude, phrase boundaries and duplicate taps. Keep the score specification fixed before testing.

The 25-cycle animation uses scripted scores 0.25, 0.75 and 0.95 to exercise controller states. It is not a prediction of how rapidly a person learns. Files: research/core_benchmark.cpp, results/core-cases.csv, results/teaching-trace.json.

# 7. Phone prototype and 3D evidence

### Phone practice that runs today

The browser prototype provides example master profiles, Teentaal timing, practice cues, adaptive fading, no-cue checks and CSV export. Example profiles are synthetic. A participant can try the interaction without claiming that the sleeve has already been manufactured.

| Scripted browser input | Observed score range |
| --- | --- |
| On-time taps | 0.998625-0.998704 |
| 60 ms late taps | 0.752304-0.752904 |
| No taps | 0.000000 |

These are controlled browser tests, not learner outcomes. Small score differences from ideal targets reflect scheduling in the browser test. On-time and late fixtures both reached guidance 0.60 during the tested period; silence retained guidance 1.00.

### Inspectable geometry

Eight repository-derived GLB files support nine views: full sleeve, hand close-up, exploded finger sensor, motor, hand board and hub, plus tabla, loom and puppet scenes. The earlier viewer checks completed all nine views without page/network errors and checked a mobile viewport for horizontal overflow.

### What the new simulation adds

The evidence dashboard replays the actual C++ trace with representative cue markers on the 3D sleeve. The replay runs at 4x time, can be paused, restarted or scrubbed by cycle, and links to the circuit, phone app, report and video. Marker light is an output-command illustration, not a model of skin vibration or force.

### Video specification

72 seconds, 1280 x 720 pixels, 20 frames/second, H.264 MP4. VTK renders the actual GLB meshes with a moving camera. Captions show the circuit concept, controller behavior, dataset evidence and remaining validation. The file has no audio; a presenter narration script is supplied for optional recording.

Evidence files include screenshot checks, source/model hashes, housing exports and the reproducible video renderer. Mechanical motion of a learner, fabric deformation and acoustic tabla physics are outside this visualization.

# 8. Public-data experiment: method

### Question

Can timing and velocity features retain performer information beyond the written groove pattern? This is a method pre-test on electronic drums. It is not a validation of a tabla Skill Fingerprint.

### Dataset and provenance

Groove MIDI Dataset v1.0.0 contains 1,150 performances by ten drummers, captured using a Roland TD-11 electronic drum kit. The retained analysis uses seven performers with eligible units. The shared-groove evaluation contains four performers and 40 performances. Dataset license: CC BY 4.0. [R8]

The official MIDI-only archive was downloaded again. Its SHA-256 matched the publisher value: 651cbc524ffb891be1a3e46d89dc82a1cecb09a57c748c7b45b844c4841dcc1e. The original analysis was then rerun locally with a retained log.

### Feature and evaluation procedure

- Map MIDI events to drum categories and beat positions; retain bars with at least eight mapped hits.

- Compute timing-offset and velocity features; compare a nearest-centroid classifier with a written-pattern control.

- Fit feature handling on training data; hold out performer-session groups and style groups for harder evaluations.

- For the four-bar version, average four retained bars. Rejected bars mean these groups are not guaranteed to be contiguous.

- Use performer-balanced unit accuracy. Separately report performance-level averages and majority votes; these are different metrics.

### Limits of the design

One electronic kit cannot demonstrate invariance to different instruments. MIDI velocity is not calibrated physical force. Missing-feature patterns may still carry groove information. The held-session procedure excludes one performer-session group at a time; it is not a new global recording day for all performers. Generalization to tabla, motion sensors or unknown performers is untested.

Files: research/gmd_fingerprint.py, research/gmd_fingerprint_results.json, results/gmd-reproduction-log.txt. The untouched upstream script is retained in the source repository.

# 9. Public-data results and ablation

| Evaluation | One bar | Four retained bars |
| --- | --- | --- |
| Eligible units | 16,957 | 4,118 |
| Random split, 7 performers | 59.2% | 66.1% |
| Held session, 7 performers | 42.9% | 47.6% |
| Held style, 7 performers | 55.7% | 63.7% |
| Held session + style | 44.4% | 47.3% |
| Shared grooves, 4 performers | 62.5% | 63.1% |
| Written-pattern control | 26.1% | 25.6% |

Chance is 14.3% for the seven-performer task and 25% for the four-performer task. Different evaluation sets have different units; their percentages are not directly interchangeable. Lead with held-session results rather than the easier random split.

### Fresh feature ablation on shared grooves

| Feature set | Balanced unit accuracy | Performance macro + 95% bootstrap interval |
| --- | --- | --- |
| Timing + velocity | 63.125% | 62.5% [51.25%, 73.75%] |
| Timing only | 38.388% | 38.125% [28.734%, 48.125%] |
| Written-pattern control | 25.625% | 25.625% [20.625%, 32.5%] |

Evaluation: 158 four-bar units from 40 performances by four drummers. Intervals use 2,000 whole-performance bootstrap resamples, stratified within drummer, seed 26214. The interval applies to the performance-macro estimate, not to the balanced unit estimate. No feature search was performed.

### Interpretation

The combined representation contains performer information in this dataset. Velocity contributes substantially: timing alone reaches only 38.4% balanced unit accuracy. Do not claim that timing alone achieves 63.1%, that the model recognizes tabla masters at this rate, or that a p-value measures product accuracy.

The original four-bar majority vote correctly named 26 of 40 performances. This differs from the 62.5% performance-macro average of unit accuracies. Files: research/benchmark_ablation.py; results/gmd-ablation.json includes per-performance rows and confusion counts.

# 10. Teaching, consent and adoption

### Learning workflow

Capture a master with explicit permission; check recording quality; validate whether the representation survives a new session and instrument; let the master approve a phrase reference; practice with cues; run regular cue-free checks; assess delayed retention using the same unaided scoring rules.

### Separate assistance from learning

A better score while a pulse tells the learner what to do can reflect assistance. A retention study must compare performance after the cues stop. The proposed study should compare phone-only instruction, fixed cueing and adaptive cueing with comparable practice time and a predefined delayed assessment.

### Data ownership checklist

- Record the permitted audience, craft, phrase, teaching use, publication use and retention period in understandable consent language.

- Let masters review their recordings and attribution before release. Do not treat style or tradition as a proprietary label owned by the software.

- Separate public demo data from identifiable raw motion/video. Use participant codes, minimize collected data and control access.

- Define export, withdrawal and deletion procedures and explain practical limits after public release. Seek institutional review where applicable.

### Institution-first pilot hypothesis

A music school, craft institution or training group could host the first supervised trial. The value proposition is inspectable practice feedback and preservation of a consenting teacher's examples. Willingness to use, willingness to pay, support load and maintenance cost have not been established.

### What not to use as impact proof

Do not convert a national craft-workforce trend into evidence that this product reverses that trend. Do not describe an untested business model as revenue, a contact as a partnership, or a sample consent form as completed consent. The historical report provides context and proposed outreach, not newly verified field findings.

# 11. Physical validation gates

These are proposed experiments and acceptance decisions, not completed results. Agree numerical thresholds with the teacher and engineering team before collecting data.

| Gate | Experiment and retained evidence | Decision |
| --- | --- | --- |
| G1: one channel | Build one IMU + driver/LRA. Log boot, timestamps, supply and errors. Compare tool events with a synchronized external reference. | Can it capture and cue consistently? |
| G2: latency | Use a logic analyzer and a contact/acceleration reference to measure command-to-mechanical onset. Report median, tail and jitter. | Is the anticipatory cue reliable? |
| G3: full bus | Load all intended channels; test disconnects, repeated addresses, storage and supply transients. Retain traces and fault logs. | Does scaling preserve behavior? |
| G4: comfort | Short supervised sessions with different hand sizes. Record slipping, obstruction, discomfort and technique changes. | Does wearing it alter the skill? |
| G5: identity | Consent several tabla teachers; repeat sessions and instruments; hold out whole sessions and instruments. Compare timing-only and pattern controls. | Does a reference generalize? |
| G6: learning | Compare phone-only, fixed and fading cues. Use balanced allocation, fixed outcomes and delayed no-cue assessment. | Is there a meaningful benefit? |
| G7: maintenance | Test charging, connectors, cleaning, replacement and data export. Record costs and time. | Can a partner operate it? |

Sample size should follow pilot variance and a power analysis; an arbitrary small sample cannot establish a reliable learning effect. Report exclusions and all planned outcomes, including failures. Use the same scoring and train/test split rules for every condition.

# 12. Submission and judge demonstration

### Suggested evidence sequence

- Open the dashboard and rotate the model. Say: "This is our digital mechanical prototype."

- Run the public Wokwi project. Show the serial score changing between on-time, late and missing-input modes.

- Pause on a no-cue cycle in the replay. Explain why the test must work without assistance.

- Show the phone prototype and export a session CSV.

- Open the research results: 47.6% held-session electronic-drum accuracy and the timing-only ablation.

- Finish with the one-channel physical validation plan and the exact evidence still missing.

### Safe submission wording

"We have implemented a browser practice prototype, tested the teaching core, built inspectable CAD, and executed an ESP32 circuit simulation. We reproduced a public electronic-drum experiment to test the feature approach. Physical tabla sensing, cue onset and human retention remain the next validation milestones."

### Where to attach links

Use Google Drive for the PDF, MP4 and ZIP as downloadable evidence. Use a static website host such as GitHub Pages for the interactive HTML/GLB dashboard; Drive file previews are not a substitute for serving a web app. Attach the public Wokwi URL directly. A local 127.0.0.1 URL only works on your own computer. [R9, R10]

### Before submission

Confirm the current competition portal's actual file formats, limits, required sections, deadline, problem-statement eligibility and link policy. Current SIH requirements were not independently accessible in this run; an older guideline must not be treated as the current rulebook. Open every submitted link while signed out and test on a phone.

### Judge questions worth preparing

Why a sleeve rather than a phone? Answer with the additional body-motion hypothesis and planned comparison. What is your accuracy? Name the exact dataset, split and metric. Where is the prototype? Distinguish the executable software and simulated electronics from the unbuilt wearable. What fails? Explain timing-only performance, instrument generalization and hardware timing gaps.

# 13. Sources and reproduction index

[R1] Wokwi documentation: supported virtual microcontrollers and simulator scope

https://docs.wokwi.com/

[R2] Wokwi MPU6050 component: virtual I2C and acceleration attributes

https://docs.wokwi.com/parts/wokwi-mpu6050

[R3] Bosch BMI270 datasheet: electrical specifications, sampling and filtering

https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bmi270-ds000.pdf

[R4] Texas Instruments DRV2605L product information

https://www.ti.com/product/DRV2605L

[R5] TI multi-driver evaluation guide, SLOU400

https://www.ti.com/lit/ug/slou400/slou400.pdf

[R6] Microsoft Research: Haptic Feedback Enhances Force Skill Learning

https://www.microsoft.com/en-us/research/publication/haptic-feedback-enhances-force-skill-learning/

[R7] Grindlay: Haptic guidance benefits musical motor learning (retained upstream reference; not newly audited)

https://www.ee.columbia.edu/~grindlay/pubs/Haptics_2008.pdf

[R8] Magenta Groove MIDI Dataset; Gillick, Roberts, Engel, Eck and Bamman (2019)

https://magenta.withgoogle.com/datasets/groove

[R9] GitHub Pages: creating a site

https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

[R10] Google Drive: share files

https://support.google.com/drive/answer/2494822

### Preserved research and reproducibility

research/upstream-reference-register.json preserves all 169 entries in the upstream reference catalog, including its original status fields. docs/Historical-PARAMPARA-v6.pdf preserves the original research narrative. These are provenance records, not a claim that every linked source was re-read. START_HERE.md lists run commands, output files and hosting steps. SHA256SUMS.txt identifies the final pack contents.

Dataset attribution: Groove MIDI Dataset, Gillick et al., 2019, CC BY 4.0. Analysis outputs and feature ablation are derived work; the dataset does not endorse this project. Third-party code licenses are retained alongside their code.
