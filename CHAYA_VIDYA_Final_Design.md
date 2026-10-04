# CHAYA VIDYA: final design, the Shadow-Native Stage
### SIH 2026 · PS 26214 (AICTE, Student Innovation, Heritage & Culture, Hardware) · Team Sanskruti Spectacle

> **One line:** a practice stage for Tholu Bommalata that measures **the real shadow of a real, unmodified GI-tagged puppet** (how far it is from the screen, its tilt, its timing against the beat) and coaches the learner the way a master would. **No servos, no sensors on the sticks, no virtual puppet.**
>
> **Core insight:** *measure the art, not the artist's skeleton.* The audience only ever sees the shadow. Its geometry already encodes the puppeteer's main technique (moving the puppet toward the lamp and back so the figure looms and fades), and the puppet's own **traditional punched perforations** act as a built-in ruler for reading it.

Evidence tags: **[V]** verified from a cited source · **[S]** our simulation (code in `chaya/`, reproducible) · **[I]** engineering inference · **[H]** hypothesis still to be tested on real hardware. Nothing below is presented as measured on real hardware unless tagged [V].

---

## 0. Verdict

| Question | Answer |
|---|---|
| Keep the servo CHAYA? | **Kill.** It is prior art, it replaces the skill it claims to teach, and the servos are underpowered (§2). |
| Keep CHAYA 2.0 (IMUs on the sticks + penumbra)? | **Kill the IMUs. Demote the penumbra to a fallback.** The shadow contains the output, so stick sensors are unnecessary. The penumbra cue fails under motion and lamp changes [S]. |
| What replaces them? | **The Shadow-Native Stage.** Compact fixed light, cotton screen with 4 printed markers, an audience-side camera, a heel-plank beat sensor, backstage cues and tablet replay. Depth comes from the **perforation homography**, a new cue (§4). |
| Does it work? | **In simulation, yes, by a wide margin.** Depth RMSE 0.1 mm static, 0.04 mm when the puppet moves at 30 cm/s, 5.6 mm with random ±15° tilt; 57/57 contact decisions correct; all 4 learner faults flagged [S]. **On real hardware this is unproven.** Realistic real-world target: ≤ 5 mm over 0–100 mm. PoC-1 (one afternoon with a phone, §8.1) settles it. |
| Novelty level | **System level, moderate to strong.** I found no prior system that reads a real shadow puppet's distance and tilt from its own perforations for coaching. That is absence of evidence, not proof of absence; run an InPASS + Google Patents search before claiming it (§10). |
| Biggest risk | Hole contrast on lightly dyed, translucent leather, plus leather curl. Both are testable in PoC-1 [H]. |

---

## 1. The paper you sent, and what it changes

**Wang, Yun, Yang, Zheng & Liu, "AI-Enhanced Motion Capture for Multimodal Interaction in Chinese Shadow Puppetry Heritage", *Multimodal Technologies and Interaction* 10(5):46, MDPI, published 28 April 2026.** [V] https://doi.org/10.3390/mti10050046

### 1.1 What it actually is
- A **review plus comparative case analysis**. The authors state that **"no new data were created or analyzed"** and that the study does not offer "direct empirical proof" [V]. Use it as **framing and judging language**, not as technical evidence.
- It compares three application models [V]:
  - **Technology-driven:** ShadowStory (CHI 2011, WiTilt handheld sensors).
  - **Culturally integrated:** an AI shadow-puppet robot using LSTMs, and a VR system with a breathing sensor.
  - **Entertainment-oriented:** the game *Projection: First Light*.
- It also discusses a Kinect V2 "Virtual Puppet" system and a Leap Motion parametric-model system [V].
- **Four "cultural resolution" dimensions** [V]:
  - Morphological fidelity
  - Performative fidelity
  - Narrative-context continuity
  - Symbolic-ethical integrity

### 1.2 What the paper criticises in existing systems [V]
1. **Structural simplification.** ShadowStory reduces the articulated puppet to a 7-component model, which leads to "formulaic and stylized performances".
2. **Handheld controllers.** ShadowStory and *Projection* make users act through handheld controllers. That "compromises the intimate connection between the puppeteer and the puppet".
3. **Algorithmic homogenization.** With no standardized motion database, stylistic differences between traditions erode.
4. **Context loss.** Digital museums reproduce the form but not the function or ritual context.
5. **Technology trade-offs (its Table 1).**
   - Inertial capture: "accumulated errors over time require periodic calibration".
   - Vision: "sensitive to lighting, complex movements may lose detail".

**Consequence for us:** criticisms 1 and 2 are exactly why the **servo CHAYA** and the **IMU-handle CHAYA** die. Criticism 5 is exactly why stick IMUs die.

### 1.3 What the paper asks for next, and how this design answers it

| Paper's stated direction [V] | How the Shadow-Native Stage answers it |
|---|---|
| "Training-oriented digital systems that combine gesture recognition, multimodal feedback, and practitioner-informed verbal guidance… apprenticeship, movement correction" | This is the product. Multimodal feedback (backstage light cues, an optional wrist buzz, replay) plus the **master's own voice notes** attached to each phrase. |
| "Lightweight temporal models and edge-based interaction architectures… attentive to interpretability" | Classical geometry (homography) plus DTW on a laptop or Pi. Every score is explainable in mm and ms. No black-box network in the loop. |
| "Ontology-informed metadata… culturally meaningful motion semantics" to stop homogenization | Each recorded phrase is tagged with the **episode, character and technique name in the master's own Telugu terms**. The vocabulary comes from the tradition, not from a generic skeleton. |
| "Heritage practitioner–technician–user collaborative platform"; the intervention threshold as a "culturally negotiated boundary" | Masters decide what is recorded, what is scored and what is never scored (e.g. ritual contexts). Validation is done with practitioners (§9). |
| "Traceability-oriented frameworks… rights-related governance" | Every master recording carries a consent record and a content hash in a simple append-only log. No blockchain is needed (§11). |
| "Perception–Symbol dual channel… digitization of body rhythm" | Body rhythm is measured directly: heel-plank beats against shadow motion timing (the TIMING score). |
| "Hybrid capture strategies (inertial + vision)" | **Deliberately declined, for a stated reason.** In shadow theatre the output is optical and on a known plane, so vision of the *shadow* is enough. IMUs would add drift, weight and modification of heirloom sticks for no gain (§2). |

### 1.4 How the design scores on the paper's four dimensions

| Dimension | Prior systems (as the paper describes them) | Shadow-Native Stage |
|---|---|---|
| Morphological fidelity | Simplified digital models | **Real, unmodified GI puppet**, so nothing is simplified by construction |
| Performative fidelity | Wrist sensors, controllers, Kinect body or hand mapping | **Real three-stick technique** on a real screen. We measure the shadow, which is what the audience judges |
| Narrative-context continuity | Thin storylines | Phrases recorded inside real episodes, with music and the master's explanation |
| Symbolic-ethical integrity | Commercial decontextualization | Consent, attribution, master-controlled scoring, purchase of authentic GI puppets from artisans |

**Positioning sentence for the PPT:** *"A 2026 review of AI motion capture for shadow puppetry (MDPI MTI 10:46) found that existing systems simplify the puppet and break the puppeteer–puppet bond, and called for practitioner-guided training systems. We built the opposite of motion capture: we measure the real shadow of a real puppet."*

---

## 2. Kill list (final)

| # | Design | Why it dies | Evidence |
|---|---|---|---|
| K1 | **Servo CHAYA** (Pi + PCA9685 + MG90S/SG90 servos mirroring a handle) | (a) Robotic Indian shadow puppets already exist: Inker Robotics + Sajeesh Pulavar, Tholpavakoothu, 2021. Chinese shadow-play robot patents exist too (CN203038033U, CN102716587B, CN102626554B, CN101837198A, CN101822906A). (b) It replaces the skill instead of teaching it. (c) 9 g micro-servos are undersized for 0.6–1.8 m leather puppets. (d) The paper criticises exactly this kind of controller mediation | [V] dossier §3; paper §3.1 |
| K2 | **CHAYA 2.0 stick IMUs** (BNO085/MPU-6050 + ESP32 on each of the 3 sticks) | (a) Drift: MPU-6050 yaw drifts about 1.8°/min (TDK), and the paper's Table 1 flags inertial drift. (b) They add mass to sticks the technique depends on, and they modify heirloom puppets. (c) Three radios to sync. (d) **Unnecessary:** the shadow already carries the output, including depth (§4) | [V] TDK; paper Table 1; [S] E1–E7 |
| K3 | **Penumbra (edge-blur) as the main depth cue** | Fails under motion: 67 mm RMSE at 1/60 s exposure. Fails if the lamp changes without recalibration: 31 mm. It is also weak at small gaps, because w = s·d/(L−d) is only 1.8 mm at d = 50 mm, roughly 3–4 camera pixels | [S] E4, E5 |
| K4 | **Shadow area as a depth cue** | Any arm movement changes the area (2.2 mm error under articulation, 6.2 mm with tilt). It cannot separate depth from pose | [S] E2, E7 |
| K5 | **Tube light or wide LED panel at short throw** | A 15 × 150 mm tube at 0.6 m blurs the perforations away: 26 mm RMSE, holes visible in only 5/12 frames. It only becomes usable at 1.5 m (7.3 mm, 11/12) | [S] E5 |
| K6 | **MediaPipe or skeleton tracking of the puppeteer** | The puppeteer is backstage, with hands occluded by sticks and puppet. It measures the wrong thing (the body, not the art). It is also the exact approach the paper says simplifies | [I]; paper §2–3 |
| K7 | **Deep learning in the live loop** | Not needed. Geometry is exact, cheap and interpretable. Keep ML for later phrase tagging only if masters want it | [I]; paper §5 (interpretability) |

---

## 3. The final system

### 3.1 Physical layout
```
 BACKSTAGE (puppeteer side)                         SCREEN                 AUDIENCE SIDE
                                                      ║
  [Compact LED ≤20 mm, warm white,                   ║ cotton/mull cloth     [Camera, fixed, exposure
   flicker-free DC driver]                           ║ on a taut frame        locked ≤ 1/250 s]
        │◄────────────── L = 0.6–1.0 m (fixed) ─────►║                            │
        ●  ── light ──►  [REAL GI puppet on its 3    ║  ■ ArUco 0     ■ ArUco 1   │ USB / CSI
                          sticks, unmodified] ◄─d──► ║                            ▼
                          ▲ puppeteer's hands        ║  ■ ArUco 3     ■ ArUco 2  [Laptop or Pi 5]
                                                      ║                            │
  [Heel plank + piezo → ESP32] ── Wi-Fi beats ───────────────────────────────────►│
  [Red LED cue bar, low, shielded] ◄──────────── live cues ────────────────────────┤
  [Optional wrist buzz band (ESP32-C3)] ◄──────────────────────────────────────────┤
                                                                     [Tablet: ghost-overlay replay]
```

### 3.2 Why each component is what it is

| Component | Spec | Reason (alternatives rejected) |
|---|---|---|
| **Light** | Single COB LED with an emitting area ≤ 20 mm, 10 W class, warm white (~2700 K), constant-current DC driver (**no PWM dimming**), fixed on a stand at L = 0.6–1.0 m | Penumbra scales with source size, so a small source keeps the perforations sharp [S E5]. PWM flicker would band at 1/250 s [I]. A small warm source is also physically closer to a traditional oil-lamp flame than a modern tube light: crisp shadows [I, confirm with practitioners]. A fixed L is required because L is the ruler's scale |
| **Screen** | Cotton or mull cloth, ≈ 1.2 × 0.9 m practice size, stretched taut on a wood or PVC frame. Four 60 mm ArUco markers (DICT_4X4_50, IDs 0–3) at the corners | Markers rectify any camera angle to true millimetres on the screen plane. A taut screen limits sag error [I] |
| **Camera** | **Prototype:** any 1080p phone or webcam with manual exposure locked at ≤ 1/250 s. **Kit:** Raspberry Pi Global Shutter Camera (1.6 MP, Sony IMX296) + 6 mm CS lens. **Full-size stage:** 4K camera (0.5 mm/px covers 1.92 × 1.08 m) | A short exposure kills motion blur [S E4]. A global shutter avoids rolling-shutter skew of a moving puppet, which we have **not** simulated [I]. 1456 px across 0.9 m ≈ 0.62 mm/px, close to the simulated 1080p case (0.52 mm/px) |
| **Compute** | Laptop for the prototype. Raspberry Pi 5 (8 GB) for a stand-alone kit | Measured ~50 ms/frame at 1.3 MP in plain Python on a 4-core x86 CPU [S]. A Pi 5 will be slower, so crop to the puppet ROI and run live cues at 10–15 Hz; recording stays at the camera rate [I, must be measured] |
| **Beat sensor** | Piezo disc clipped (not glued) to the troupe's own heel plank, or to a training plank, read by an ESP32 that time-stamps strikes over Wi-Fi. A USB mic is the fallback | The foot plank is part of the tradition [V Wikipedia] and gives the rhythm grid. A piezo gives clean onsets, with no music separation needed [I] |
| **Live cues** | 8–16 LED WS2812 strip, red, below the screen line, shielded so it does not light the screen. Optional ESP32-C3 wrist band with a coin vibration motor | Cue only two things live: **"pressed vs drifting"** and **"late/early vs beat"**. Everything else waits for the replay. Bandwidth feedback with a faded schedule follows the guidance hypothesis [V Frontiers 2016] |
| **Replay** | Tablet or phone browser view: the learner's rectified shadow with the master's shadow as a semi-transparent "ghost", DTW-aligned, plus the three scores and the flagged moment | Concurrent expert overlay is the single most intuitive teaching visual. It is also your demo moment [I] |
| **Puppets** | 2 authentic GI-tagged puppets ("Andhra Pradesh Leather Puppetry", GI application 107, Nimmalakunta/Narsaraopet), bought from artisans or Lepakshi. **Never modified** | Morphological fidelity. Money goes to artisans. The GI is registered until 31-07-2027 [V IP India] |

### 3.3 Software pipeline (implemented in `chaya/shadow_depth.py` and `chaya/scoring.py`)

1. **Capture** each frame with fixed exposure and gain.
2. **Rectify:**
   - Detect ArUco 0–3, then a homography gives a fronto-parallel screen image at 0.5 mm/px.
   - *To add before the real kit:* one-time lens undistortion from a checkerboard (`cv2.calibrateCamera`).
3. **Normalise** with Otsu levels to get the silhouette mask.
4. **Detect perforations:** bright blobs inside the eroded silhouette, cleaned with a 3 × 3 morphological opening and an area filter (≥ 25% of p90, 0.4–2.5× the median).
5. **Match to the template.** The template is the frame with the puppet pressed flat (d = 0).
   - Affine ICP with a rotation sweep from −45° to 45° gives the correspondences.
   - RANSAC homography (2 px threshold, ≥ 50% inliers) follows. RANSAC automatically drops moving arms and holes hidden by sticks.
6. **Compute depth:**
   - The largest singular value of the homography Jacobian at the torso gives the magnification M.
   - Then **d = L(1 − 1/M)**, plus a small per-rig linear correction.
7. **Compute tilt:** the local scale at ±45 mm left/right and up/down of the torso gives yaw and pitch.
8. **Fallbacks:** edge transition width and silhouette area, combined by inverse-variance fusion. They are used only if the perforations are not found.
9. **Events:**
   - Contact = d < 10 mm.
   - Position = silhouette centroid (mm).
   - Beats from the piezo, all on one clock.
10. **Scores** (`scoring.py`):

    | Score | How it is computed | Flag when |
    |---|---|---|
    | **TIMING** | Lag that maximises the cross-correlation of master and learner speed profiles | \|lag\| > 100 ms |
    | **CONTACT** | Frame-wise agreement of "pressed" states after lag alignment | agreement < 90% |
    | **SHAPE** | 99th percentile of DTW-aligned trajectory distance | > 15 mm |

11. **Feedback policy:** live cues only when an error exceeds its band, with the cue rate faded across sessions. A no-feedback retention check runs at the end.

**Why the perforation ruler works (the slide-3 sentence):**
- dM/dd = L/(L−d)². At L = 600 mm, **1 mm of gap changes the shadow scale by 0.17%**.
- Over a 200 mm hole pattern that moves the outer holes by about 0.33 mm (0.7 px).
- No single hole can resolve that, but **dozens of holes fitted together** average to sub-pixel precision.
- The tradition already punched the ruler into the puppet.

### 3.4 Operating modes

| Mode | What happens | Time |
|---|---|---|
| **CALIBRATE** | Per rig: puppet pressed flat (template), then held parallel at 5 known gaps using spacer blocks (25/50/100/150/200 mm) | ~2 min per rig. The current code recalibrates per puppet. Per-puppet "template only" (theory relation plus one pressed frame) is a planned simplification [I] |
| **RECORD MASTER** | The master performs a phrase with music. Stored: rectified shadow video, d(t), x,y(t), contact(t), tilt(t), beats(t), the master's voice note, metadata (episode, character, technique term), consent record | Real time |
| **PRACTISE** | The learner performs the same phrase with the same character's puppet. Live backstage cues for contact lapses and beat timing. The cue rate fades across sessions | Real time |
| **REVIEW** | Tablet replay with the ghost overlay. TIMING / CONTACT / SHAPE with the exact moment marked. The master can add a voice correction | Right after |

### 3.5 Bill of materials (indicative Indian prices, Oct 2026; **verify before ordering**)

| Item | Prototype (laptop + phone) ₹ | Stand-alone kit ₹ |
|---|---|---|
| Cotton screen + frame (≈ 1.2 × 0.9 m) | 800–1,500 | 800–1,500 |
| ArUco prints, lamination | 50 | 50 |
| COB LED ≤ 20 mm + heatsink + CC driver + 12 V adapter | 600–1,200 | 600–1,200 |
| Light stand or rigid mount (fixes L) | 500 | 500 |
| Camera | 0 (phone or existing webcam) | 4,555 (Pi Global Shutter Camera) + 1,500–2,500 (6 mm CS lens) |
| Compute | 0 (laptop) | 8,000–9,500 (Pi 5, 8 GB) |
| Piezo + ESP32 + plank strap | 600–1,250 | 600–1,250 |
| WS2812 cue bar | 300–600 | 300–600 |
| Wrist buzz band (ESP32-C3 + coin motor + LiPo) | — | 800–1,200 |
| 2 authentic GI puppets (artisan / Lepakshi) | 2,400–10,000 | 2,400–10,000 |
| Cables, 3D-printed mounts, spacer blocks | 1,000 | 1,000 |
| **Total** | **≈ ₹6–16k** | **≈ ₹21–34k** |

Puppet choice drives the spread. Pi 5 and camera prices come from the dossier sources; re-check Robu/Robocraze listings on the day you order.

---

## 4. The proof: simulation experiments (all reproducible, `cd chaya && python3 experiments.py`)

### 4.1 What was simulated
`chaya/shadow_sim.py` is a physically based renderer:
- **Optics:**
  - A disc or rectangular light source of real size.
  - Central projection: exact for tilted puppets via projective remap.
  - Spatially varying penumbra, w = s·d/(L−d).
- **Puppet:** translucent leather (τ = 0.4) with a perforation grid (4 mm holes at 18 mm pitch) and articulated arms.
- **Screen and camera:**
  - Cotton-screen diffusion.
  - Camera resampling, blur and noise, 8-bit quantisation.
  - Motion blur for a chosen exposure.

Parameters are in `results/metrics.json → assumptions`.

### 4.2 Results [S]

| Exp | Condition | Perforation cue | Edge-blur cue | Area cue | Verdict |
|---|---|---|---|---|---|
| E1 | Static, 1080p (60 tests, d = 0–200 mm) | **0.10 mm RMSE** | 7.7 mm | 0.37 mm | Contact 15/15 pressed, 42/42 away |
| E1 | Static, 4K | **0.03 mm** | 8.7 mm | 0.40 mm | Contact 57/57 |
| E2 | Arms moving (calibrated in a different pose) | **0.06 mm** | 7.4 mm | 2.2 mm | Area breaks under articulation |
| E3 | Tilt recovery | Single-axis yaw/pitch to 15°: error **≤ 0.6°**; combined 6.8°/6.8° read as 9.7°/10.8° | — | — | Mean abs error 0.8°, max 4.0° |
| E7 | Depth with random tilt to ±15° | **5.6 mm** | 6.0 mm | 6.2 mm | Tilt is the hardest case |
| E4 | Puppet moving 30 cm/s, exposure 1/60 s | **0.04 mm** | 67 mm | — | Edge cue fails |
| E4 | Same, exposure 1/250 s | **0.04 mm** | 10.5 mm | — | |
| E5 | Lamp changed 20 → 30 mm, no recalibration | **0.09 mm** | 31 mm | — | Perforation cue is pure geometry |
| E5 | Tube light 15 × 150 mm at L = 0.6 m | holes found in 5/12 frames | fused **26 mm** | — | **Kill short-throw tube light** |
| E5 | Tube light at L = 1.5 m | 11/12 frames | fused 7.3 mm | — | |
| E6 | Scoring four learners vs master (2 mm depth noise) | correct: **no flag** · late 180 ms: **TIMING** (measured 167 ms) · contact lapse: **CONTACT** (70.7% agreement) · missed bow: **SHAPE** (35.0 mm vs 3.95 mm for the correct learner) | | | 4/4 correct, 0 false flags |
| PoC tool self-test | Simulated "phone photos": perspective-warped, JPEG-compressed | perforation ≤ 0.2 mm | — | — | Leave-one-out fused RMSE 1.6 mm |
| Speed | 1.3 MP frame, plain Python, 4-core x86 | ~50 ms/frame (~20 fps) | | | Pi 5 untested |

Figures in `chaya/results/`:
- `fig1_shadow_frames.png`: what the camera sees at different gaps and tilts.
- `fig2_depth_accuracy.png`: estimated vs true depth for each cue.
- `fig3_robustness.png`: motion, lamp change, tube light, annotated.
- `fig4_scoring_traces.png`: master vs faulty learners.
- `poc_selftest.png`: **simulated**; do not present it as real.

### 4.3 Realistic error budget for the real rig [I]
The simulation idealises the puppet as flat and the optics as perfect. Expected real-world error sources for the perforation cue:

| Source | Mechanism | Rough size | Mitigation |
|---|---|---|---|
| Lens distortion | ~0.5% residual scale error → δd ≈ L·δM/M² | **~3 mm** at L = 600 | One-time checkerboard undistortion; calibrate near where the puppet works |
| Leather curl / non-flat puppet | Homography fits a mean plane | 1–5 mm | Fit only on the torso holes; template taken pressed flat |
| Cloth sag / wrinkles | Rectification plane ≠ cloth | 1–3 mm | Taut frame; marker near each corner; optionally a 3 × 3 marker grid |
| L uncertainty ±10 mm | δd = δL·d/L | 1.7 mm at d = 100 | Absorbed by per-rig calibration |
| Low hole contrast (light dyes, τ → 0.7) | Fewer holes detected | Unknown, **biggest risk** | Choose the colour channel with best contrast; bias toward darker-dyed regions; edge/area fallback |
| Stick occlusion | Central stick hides a strip of holes | Fewer inliers | RANSAC already tolerates it |
| Rolling shutter (phone) | Skew while moving | Unknown | Global-shutter camera in the kit |

**Claim for the PPT:** "Simulation: sub-millimetre. Target on the real rig: ≤ 5 mm RMSE over 0–100 mm and ≥ 95% pressed/away accuracy. PoC-1 measured result: ___". Fill in the blank only with real numbers.

---

## 5. Prior art and the precise novelty

| Work | What it does | Why it is not this |
|---|---|---|
| **CN121483109B** (Hunan Agricultural Univ., filed 2026-01-05, granted/published 2026-08-04) [V Patsnap] | Shadow-play teaching with real-time feedback from **camera hand tracking → virtual puppet** | Virtual puppet; measures hands. We measure the real shadow of the real puppet |
| **ShadowStory** (CHI 2011) [V] | Handheld WiTilt sensors drive digital puppets | Controller-mediated; criticised by the 2026 review |
| Kinect V2 "Virtual Puppet"; Leap Motion parametric system [V paper §4] | Body or hand → virtual puppet | Same |
| **ShadowPlayVR** (VRST 2023) [V paper ref 3] | VR embodiment of shadow-puppet techniques | VR, no real puppet |
| **Inker Robotics** (Kerala, 2021); Chinese shadow-robot patents [V] | Robots perform | No human skill transmitted |
| **PlayAnywhere** (Wilson, UIST 2005) [V Microsoft Research](https://www.microsoft.com/en-us/research/?p=304277) | **Shadow analysis to tell hover from touch** on a projected tabletop | Closest physics precedent for "shadow → contact". Different domain; no continuous depth or tilt from a perforation pattern. **Cite it; do not hide it** |
| Penumbra/soft-shadow physics (e.g. NVIDIA PCSS, 2005) [V] | Blur grows with occluder–receiver distance | Textbook physics; we use it only as a fallback cue |
| Wayang moving-shadow video analysis (ICITEE 2016; *verify the exact citation before quoting*) | Analyses wayang shadows in video | Analysis only; no depth from perforations, no coaching |

**Novelty statement (defensible):** *"To our knowledge, the first coaching system that recovers a real shadow puppet's distance from the screen and its tilt from the projected geometry of the puppet's own traditional perforations, and uses that to give practitioner-guided feedback, without modifying the puppet or instrumenting the performer."*

---

## 6. KPIs (what you promise, and how you measure it)

| KPI | Target | Measured by |
|---|---|---|
| Depth RMSE, 0–100 mm, real rig | ≤ 5 mm | PoC-1 leave-one-out |
| Pressed vs away (10 mm threshold) accuracy | ≥ 95% | PoC-1 / PoC-2 |
| Dynamic depth error at 20–30 cm/s | ≤ 10 mm | PoC-2 with side-view ground truth |
| Tilt error (single axis to 15°) | ≤ 3° | Tilted-jig photos |
| Live cue latency (camera → LED) | ≤ 150 ms | PoC-3 with a 240 fps slow-motion phone |
| Fault detection (late / lapse / shape) | ≥ 90% recall, ≤ 10% false flags | PoC-4, blinded |
| Agreement with master's corrections | Cohen's κ ≥ 0.6 | PoC-5 |
| Setup time for a new rig | ≤ 10 min | Stopwatch |
| Puppet modification | **zero** | By design |

---

## 7. What exists today vs what must still be built (honest status)

| Piece | Status |
|---|---|
| Shadow renderer, depth/tilt estimator, scoring, experiments E1–E7 | **Done**, in `chaya/`, reproducible |
| Real-photo PoC tool (`poc_real_photos.py`) and ArUco markers (`make_markers.py`) | **Done.** Self-tested on simulated photos only |
| Real photos from a real puppet | **Not done.** This is the next step (§8.1) |
| Lens undistortion, colour-channel selection | To add (small) |
| Live loop: camera → estimator → LED bar at ≥ 10 Hz | To build (≈ 1 week) |
| ESP32 piezo beat firmware, wrist band | To build (≈ 2–3 days) |
| Tablet ghost-overlay replay | To build (≈ 1 week) |
| Practitioner recordings and validation | To do (§9) |

---

## 8. Physical validation protocol (do it in this order)

### 8.1 PoC-1: static depth (one afternoon, ~₹1,500) **→ your proof slide**
Follow `chaya/README.md` → "PoC-1 with a phone":
1. Set up the screen and print the markers (60 mm), then measure the marker centre distances.
2. Fix the LED at L ≈ 600 mm.
3. Mount the phone on a tripod with exposure locked.
4. Photograph the puppet pressed flat (`d_000.jpg`), then at 25/50/75/100/150 mm using spacer blocks.
5. Run `python3 poc_real_photos.py --folder photos --L 600 --screen_w <mm> --screen_h <mm>`. The output is `results/poc_result.png` and the leave-one-out table.
6. **Do it twice:**
   - With a real Tholu Bommalata puppet.
   - With a punched-card control (6–8 mm holes).

   If the real puppet fails and the card passes, the problem is hole contrast. Try other colour channels or a darker region.

**Pass criterion:** leave-one-out RMSE ≤ 5 mm and correct pressed/away for every photo.

### 8.2 PoC-2: moving puppet
- Record a video at 60 fps, 1/250 s.
- A **second phone looks along the screen plane from the side** at a printed mm scale. This is cheap ground truth for the gap.
- Compare d(t) from the shadow with the side-view gap at 20 time points.

### 8.3 PoC-3: latency
- Light the cue LED whenever the puppet leaves the screen.
- Film the screen and the LED together at 240 fps.
- Frames between the gap appearing and the LED lighting give the latency.

### 8.4 PoC-4: scoring validity
- An experienced student or practitioner performs one phrase 10× correctly and 10× with a scripted fault: late entry, drifting off the screen, missed bow.
- The order is randomised and the scorer is blind to it.
- Report recall and false-flag rate per fault type.

### 8.5 PoC-5: practitioner agreement
- A master watches 10 learner takes and names what they would correct.
- Compare with the system flags (Cohen's κ).
- Ask three questions:
  1. "Does the shadow measure what you look for?"
  2. "What must never be scored?"
  3. "What would you name this technique?"

### 8.6 Learning pilot (for the finale, not before submission)
- **Participants:** 12–20 novices (students, or CCRT-trained teachers), randomised into two groups:
  - Video-only practice.
  - CHAYA (video + faded cues + ghost replay).
- **Schedule:** 5 sessions of 20 minutes. Pre-test, post-test, and a 48-hour no-feedback retention test.
- **Scoring:** blind, by a master and by the system.
- **Reporting:** effect sizes with confidence intervals. It is a pilot, so no claims of significance unless the data show it.
- **Ethics:** needs institutional ethics approval and written consent.

---

## 9. "Research with prof": who validates what

You cannot claim expert validation you have not done. Here is how to get it in about a week.

| Who | What you ask them to check | What you bring | What you get for the PPT |
|---|---|---|---|
| **Physics / optics faculty** (your college) | The shadow model (M = L/(L−d), penumbra), the error budget §4.3, the PoC-1 method | This file, `results/metrics.json`, fig1–3, PoC-1 photos | A sign-off line: "Method reviewed by Dr ___, Dept. of Physics" |
| **CSE / ECE faculty** (CV or embedded) | Pipeline §3.3, latency test, Pi 5 feasibility | `chaya/` code, a run of `experiments.py` | Review notes; possibly a lab slot and a camera |
| **Design / humanities / performing-arts faculty**, or a CCRT resource person | Cultural framing, scoring boundaries, consent form | §1.4, §11 | Cultural-review line |
| **Practitioners**: Nimmalakunta GI artisans, Lepakshi Handicrafts, CCRT Madhapur (Hyderabad), Sarmaya Arts Foundation | PoC-5 questions; permission to record 2–3 phrases; a support/consent note | A short video of your rig; the consent form | Quote plus letter. **This is the strongest single item for an SIH heritage judge** |
| Optional: corresponding authors of the MDPI paper (Xi'an Univ. of Posts & Telecom.; emails on the paper) | A 2-line opinion on whether shadow-native sensing addresses their "training-oriented system" direction | A 1-page summary | Only use a reply if you actually get one |

**Email template (faculty):**
> Subject: 20-min review request: shadow-physics depth sensing for SIH 2026 (PS 26214)
>
> Respected Sir/Ma'am, our team is building a practice stage for Tholu Bommalata (Andhra leather shadow puppetry). It measures how far a real puppet is from the screen using only the geometry of its shadow: the puppet's punched perforations act as a ruler (M = L/(L−d)). Our simulation gives sub-millimetre error, and we will test a real rig this week. Could you spare 20 minutes to review the method and error budget (2-page summary attached)? — Team Sanskruti Spectacle

**Email/WhatsApp template (practitioner, via Lepakshi / CCRT / artisan contact):**
> Namaskaram. We are engineering students building a low-cost practice stage that helps new learners of Tholu Bommalata. It uses only a camera on the audience side and your real puppets, unchanged. We would like to buy two puppets from you and request a 20-minute call: what should a learner be corrected on, and what should never be scored? Your recordings, if any, remain yours, with your name on them.

Keep a **validation log** (date · person · what they said · what you changed). It goes in slide 6 and in your viva answers.

---

## 10. Risks and mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Perforations low-contrast on real dyed leather | Medium | PoC-1 tests it on day 1. Colour-channel choice; darker regions; card control; edge/area fallback |
| Leather curl / large puppets (1–1.8 m) exceed the screen or FOV | Medium | Practice kit with 0.6–0.9 m puppets; 4K camera for full stage |
| Real error ≫ simulation | Medium | Error budget §4.3; undistortion; present real numbers only |
| Practitioners object to "scoring" a tradition | Low–Med | Frame it as a "practice mirror"; the master decides what is scored; no use in ritual contexts |
| Novelty challenged (PlayAnywhere, CN121483109B) | Medium | Cite both; claim the system-level combination precisely (§5) |
| **Public repository = public disclosure** | **High if you want a patent** | `HarshDubey23/winner` is **public**. India's grace period is narrow. If the college IPR cell wants a provisional patent, make the repo private now and file before any further disclosure, including the PPT |
| Venue lighting / ambient light | Low | The stage is dark by tradition (night performances); fixed exposure |
| Pi 5 too slow | Medium | ROI crop, 10–15 Hz cues; laptop fallback |

---

## 11. Ethics, consent and rights
- **Written, informed consent** from every recorded master. The master owns the recordings; every phrase carries their name; they can withdraw.
- **Performers' rights** under the Copyright Act 1957 (§38/38A) apply to recorded performances [V dossier]. Any reuse or licensing needs the master's written permission and a revenue share (business-model *hypothesis*).
- **Traceability:** an append-only log of SHA-256 hashes + consent IDs per recording [I]. This answers the paper's "traceability" direction without blockchain hype.
- **GI:** buy only from authorised producers; never sell or show laser-cut replicas as "Tholu Bommalata".
- **Context:** no scoring in ritual settings; learners are told the system is a mirror, not a judge. Minors need parental consent. All data stays local by default.

---

## 12. What goes on the 6 PPT slides

| Slide | Content | Visual |
|---|---|---|
| 1 Title | "CHAYA VIDYA: the shadow teaches back" · PS 26214 · team | Your own photo of a real puppet's coloured shadow |
| 2 Proposed solution | Problem (skill hidden backstage, shrinking troupes, learners without a master) → insight "measure the art, not the artist's skeleton" → what the learner experiences | Split image: shadow on one side, hidden hands on the other |
| 3 Technical approach | Layout §3.1, pipeline §3.3, the perforation-ruler equation, modes | `fig1_shadow_frames.png` + block diagram |
| 4 Feasibility & viability | **Real PoC-1 graph** (`poc_result.png`), simulation table (one line each), BOM ₹6–16k / ₹21–34k, risks | `poc_result.png` (real) + `fig3_robustness.png` |
| 5 Impact & benefits | Users: CCRT teachers, Guru-Shishya learners, troupes, museums. Master attribution and royalty model; artisan puppet purchases. The paper's 4 dimensions table §1.4 | `fig4_scoring_traces.png` |
| 6 Research & references | Prior-art table §5 + novelty sentence; validation log; references incl. MDPI MTI 10:46 (2026), GI 107, CN121483109B, PlayAnywhere | — |

---

## 13. Next 7 days
1. **Day 1–2:** buy or borrow one perforated puppet (or make a punched card), build the screen, run **PoC-1**.
2. **Day 2:** email the physics and CSE faculty (§9) with PoC-1 results attached.
3. **Day 3–4:** contact Lepakshi / Nimmalakunta artisans / CCRT; buy 2 GI puppets; ask the PoC-5 questions.
4. **Day 4–6:** build the live loop (webcam → laptop → LED bar) and run PoC-3 latency.
5. **Day 7:** fill slide 4 with real numbers only; update the validation log.

---

## References (new in this document; the rest are in `CHAYA_VIDYA_Research_Dossier.md`)
- Wang G., Yun H., Yang L., Zheng Q., Liu T. "AI-Enhanced Motion Capture for Multimodal Interaction in Chinese Shadow Puppetry Heritage." *Multimodal Technol. Interact.* 2026, 10(5), 46. https://doi.org/10.3390/mti10050046
- Wilson A. D. "PlayAnywhere: A Compact Interactive Tabletop Projection-Vision System." UIST 2005. https://doi.org/10.1145/1095034.1095047 · [Microsoft Research page](https://www.microsoft.com/en-us/research/?p=304277)
- Lu F. et al. "ShadowStory." CHI 2011. https://doi.org/10.1145/1978942.1979221
- He Y. "ShadowPlayVR." VRST 2023 (as cited in the MDPI paper, ref. 3).
- CN121483109B (Patsnap): https://eureka.patsnap.com/patent/CN121483109B
- IP India GI application 107: https://search.ipindia.gov.in/GIRPublicSearch/Application/Details/107
- MPU-6050 yaw drift (TDK): https://adm.invensense.tdk.com/mpu-6050-yaw-over-time
- Guidance hypothesis (Frontiers in Neuroscience 2016): https://www.frontiersin.org/articles/10.3389/fnins.2016.00251/full
- Code and data: `chaya/` (this repository): `results/metrics.json`, `results/run_log.txt`, figures.
