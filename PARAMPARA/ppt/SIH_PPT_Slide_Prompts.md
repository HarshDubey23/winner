# PARAMPARA · SIH 2026 PS 26214 · Slide-by-slide PPT prompts

> **Superseded for the six idea-submission slides by `SIH_PPT_Master_Prompts.md`** (exact part positions, wireframes, copy-ready content and one master prompt per slide). Keep this file only for the finale slides 7–12.

Use this file to build the SIH idea-submission deck (6 slides, the official limit) and, if you reach the finale, the jury deck (6 more slides). Every slide has:

1. **The 5-second test**: what a judge must understand at a glance.
2. **Winning decks vs us**: what strong SIH decks do, what gets teams cut, and how this slide beats both.
3. **Layout**: exact zones in inches on a 16:9 slide (13.333 × 7.5 in).
4. **Exact content**: final wording, already checked against the v6 dossier. Do not add claims.
5. **Visuals**: which file from this repository goes where.
6. **Colours, borders and type** for every element.
7. **Speaker notes**: 30–40 seconds.
8. **Copy-paste prompt**: one self-contained block for Gamma, Canva Magic Design, PowerPoint Copilot, Google Slides with Gemini, ChatGPT, or a human designer.

---

## 0. Rules that apply to every slide

### Official SIH format (idea submission)

- **Maximum 6 slides including the title slide**: Title, Idea, Technical Approach, Feasibility and Viability, Impact and Benefits, Research and References. Keep the **official SIH template** (its header, SIH logo and slide titles) and fill only the content area. Submit as **PDF**.
- **No paragraphs.** Points, diagrams, infographics and pictures only, precise and easy to understand.
- **Fill the Title slide fields exactly** as registered on the portal: Problem Statement ID, Problem Statement Title, Theme, PS Category, Team ID, Team Name.

### Honesty rules (these protect your score)

- Equipment images are **CAD renders**. Label every one "CAD render" (9 pt, grey, bottom-right of the image). Never use an AI-generated "photo" of the sleeve, and never present a render as a built device.
- Say only what is true today: "phone prototype working, end-to-end tests pass", "firmware core: 27 unit tests pass", "eight **defined** bench tests", "**pre-test** on real performers (10 drummers)". Never say "validated end to end", "proven fingerprint" or "improves learning".
- Master A and Master B in PARAMPARA Lite are **example profiles**. Say so if they appear.
- Placeholders in **[square brackets]** must be filled by the team (Team ID, Team Name, exact PS title, guru names once consent is signed).

### What strong SIH decks do (and what gets teams cut)

| Strong SIH decks | Decks that get cut | PARAMPARA's edge |
|---|---|---|
| A working prototype, even a rough one, shown with screenshots, a QR code or a demo video | Beautiful slides with nothing working | Phone prototype that runs today, end-to-end tests, firmware tests |
| Bullets and diagrams; an architecture diagram and a flowchart | Paragraphs copied from a report | Every slide is a diagram plus at most 6 short bullets |
| Exact tech stack with part numbers | "IoT, AI, ML, cloud" with no specifics | Every chip named with its datasheet value |
| Risks with mitigations | No risks, or vague ones | Risk table with a fallback for each risk |
| Impact in numbers, tied to real users | Generic "will help millions" | Census and government numbers with sources |
| References with links | No references, or fake ones | 92 references, 81 verified live |

Sources for these patterns: the official template guidance and post-event write-ups by winning and mentoring teams (links at the end of this file).

---

## 1. Global design system (paste this first into any AI tool)

```text
DESIGN SYSTEM: PARAMPARA (SIH 2026, PS 26214). Apply to every slide.

Canvas: 16:9, 13.333 x 7.5 in. Keep the official SIH template header (logo, slide title band) untouched.
Content safe area: x 0.45-12.88 in, y 1.10-7.05 in. 12-column grid, 0.20 in gutters. Align every box to the grid.

COLOURS (each colour has one job, never decorative):
- Maroon #7A1F1F: slide headline accent, key numbers, the "problem" side, emphasis bars.
- Deep blue #1F4E79: technology, motion sensors (IMU), diagrams, links, QR codes.
- Brass gold #B8901A: vibration motors (haptics), highlights, thin dividers, the USP box border.
- Green #2E6B3A: "done / working / pass" status only.
- Red #9B2C2C: risks only.
- Ink #222222: body text. Grey #5E5E5E: captions and labels. Line #D9CFC0: borders and grid lines.
- Card fill #FAF7F0 (warm off-white). USP fill #FFF8E6. Diagram fill for blue items #EEF3F8, for gold items #FBF3DD, for green items #EEF6EF.
- Slide background: white #FFFFFF (official template). No gradients, no dark slides, no neon.

COLOUR CODE ON EQUIPMENT (must match the CAD renders): blue = motion sensor (IMU), gold = vibration motor, green = hub.

TYPOGRAPHY:
- Headings: Poppins SemiBold (fallback Montserrat SemiBold). Slide headline 28-30 pt, maroon or ink.
- Body: Inter Regular (fallback Open Sans). 14-16 pt, ink, line spacing 1.15.
- Numbers and specs: JetBrains Mono (fallback Roboto Mono), 12-14 pt; hero numbers 32-40 pt Poppins Bold maroon.
- Section labels: Inter SemiBold 11 pt, UPPERCASE, letter-spacing 1.5 pt, grey.
- Hindi/Devanagari words (tabla bols): Noto Sans Devanagari.
- Captions: Inter Italic 9-10 pt grey. Minimum text size anywhere: 9 pt.

SHAPES AND BORDERS:
- Cards: rectangle, corner radius 8 px (0.08 in), border 1 pt #D9CFC0, fill #FAF7F0, inner padding 0.15 in. No drop shadows.
- Emphasis card: same card plus a 6 pt maroon bar on the left edge.
- USP / key-claim box: border 1.5 pt #B8901A, fill #FFF8E6, radius 8 px.
- Status pills: fully rounded, 9 pt bold, green text on #EEF6EF for DONE; blue on #EEF3F8 for DESIGNED; gold on #FBF3DD for DEFINED; grey on #F2F2F2 for NOT YET.
- Arrows and connectors: 1.5 pt, #5E5E5E, round caps, small triangle heads.
- Tables: header row fill #7A1F1F with white 11 pt bold text; body rows alternate #FFFFFF / #F7F3EC; grid 0.75 pt #D9CFC0; cell padding 0.06 in.

ICONS: one line-icon family only (Lucide or Phosphor "regular"), 2 px stroke, 0.32-0.40 in, coloured by meaning (blue tech, gold haptics, maroon problem, green done). No emoji, no 3D clip-art, no stock people.

IMAGES: only the PARAMPARA CAD renders, figures and screenshots supplied (transparent PNGs in PARAMPARA/ppt/assets/). Label renders "CAD render" in 9 pt grey. Never generate a photo-realistic image of the device.

WRITING: no paragraphs. Bullets of at most 12 words. Bold only the number or the key noun. Every number has a source in the dossier.
FOOTER (if the template allows): "PARAMPARA · PS 26214 · [Team Name]" 9 pt grey left; slide number right.
```

---

## 2. Assets (all in this repository)

| Use | File | What it shows |
|---|---|---|
| Hero render, slides 1, 3 | `PARAMPARA/ppt/assets/sleeve_iso_transparent.png` | Full sleeve on a right arm, isometric, no labels |
| Top view to scale | `PARAMPARA/ppt/assets/sleeve_dorsal_transparent.png` | Top view with a 100 mm scale bar |
| Hand close-up | `PARAMPARA/ppt/assets/hand_iso_transparent.png` | Finger rings (blue), finger motors (gold), hand board |
| Palm side | `PARAMPARA/ppt/assets/hand_palmar_transparent.png` | Palm and fingertips uncovered |
| Exploded parts | `PARAMPARA/ppt/assets/ring_exploded_transparent.png`, `motor_exploded_transparent.png`, `hand_exploded_transparent.png`, `hub_exploded_transparent.png` | Inside each housing |
| Same-scale line-up | `PARAMPARA/ppt/assets/pods_lineup_transparent.png` | All five housings with a 50 mm bar |
| Tool kits | `PARAMPARA/ppt/assets/tabla_iso_transparent.png`, `tabla_top_transparent.png`, `puppet_iso_transparent.png`, `loom_iso_transparent.png` | Tabla piezo clips, puppet pod, loom sensors |
| Labelled figures (fallback) | `PARAMPARA/figures/v5_sleeve_views.png`, `v5_hand_views.png`, `v5_pods_exploded.png`, `v5_tabla_kit.png`, `v5_puppet_loom_kits.png` | Same renders with callouts already drawn |
| Electronics | `PARAMPARA/figures/v5_block_diagram.png` | Two I2C buses, address map |
| Drawings | `PARAMPARA/figures/v5_drawings.png` | Ring pod and hub with dimensions |
| Pipeline | `PARAMPARA/figures/v4_pipeline.png` | Sense, Fingerprint, Teach, Fade, Measure, Own |
| Real-performer pre-test | `PARAMPARA/figures/v5_gmd_results.png` | 10-drummer results |
| Confound test | `PARAMPARA/figures/confound_test.png` | How E1 rejects a fake fingerprint |
| Working prototype | `PARAMPARA/figures/v6_lite_screenshot.png` | PARAMPARA Lite running |
| QR code | `PARAMPARA/ppt/assets/qr_parampara_lite.png` | Link to PARAMPARA Lite (share the link first so judges can open it) |

---

## SLIDE 1 · Title page

**5-second test:** "PARAMPARA, a wearable for India's living crafts, PS 26214, hardware, this team."

**Winning decks vs us**

- Strong decks: every portal field filled exactly; one strong visual; a one-line idea title judges can repeat.
- Decks that get cut: a wrong or missing PS ID, a logo collage, a vague title like "Smart Heritage System".
- Our edge: the CAD hero image of the sleeve says "hardware, real engineering" before anyone reads.

**Layout (16:9)**

- Official header band: untouched.
- Left column x 0.45-6.6 in: field block (y 1.4-5.6 in).
- Right column x 6.8-12.9 in: hero render (y 1.3-6.4 in), slightly overlapping the right edge of the content area is fine if the template allows.
- Bottom strip y 6.5-7.0 in: one-line idea promise.

**Exact content**

- Problem Statement ID: **26214**
- Problem Statement Title: **[exact title from the SIH portal]**
- Theme: **Heritage & Culture** (check against the portal)
- PS Category: **Hardware**
- Team ID: **[Team ID]** · Team Name: **[Team Name]**
- Idea title (largest text on the slide): **PARAMPARA: Feel the Master's Hand**
- Sub-line: "One sensor sleeve, fingers to shoulder, that captures a master's skill and teaches it until the learner plays alone."
- Bottom strip: "Tabla (flagship) · Handloom · Kathputli puppetry"

**Visuals**

- `sleeve_iso_transparent.png`, width 6.0 in, placed right, the hand at the upper right. Caption "CAD render" 9 pt grey.
- Optional, behind the field block: a very faint line-art motif (tabla, loom, puppet outline) in brass #B8901A at 6% opacity. Use the decorative-image prompt in Section 8, or skip it.

**Colours, borders, type**

- Field labels: Inter SemiBold 11 pt UPPERCASE grey #5E5E5E. Field values: Inter 16 pt ink.
- Fields sit in one card: fill #FAF7F0, 1 pt #D9CFC0 border, radius 8 px, 6 pt maroon left bar.
- Idea title: Poppins SemiBold 34 pt maroon #7A1F1F. Sub-line: Inter 15 pt ink.
- Bottom strip: three text items separated by small brass dots, Inter SemiBold 13 pt; "Tabla (flagship)" in maroon, others in grey.

**Speaker notes (20 s)**
"We are Team [name], problem statement 26214. PARAMPARA is a sensor sleeve from the fingers to the shoulder. It captures how a master moves and teaches it back, then steps away until the learner plays alone. Tabla is our flagship; handloom and Kathputli show that it generalises."

**Copy-paste prompt**
```text
Create SLIDE 1 (Title page) of an SIH 2026 idea-submission deck, 16:9, inside the official SIH template (keep its header and logo).
Design system: white background; maroon #7A1F1F, deep blue #1F4E79, brass #B8901A, ink #222222, grey #5E5E5E, line #D9CFC0, card fill #FAF7F0; Poppins SemiBold headings, Inter body, JetBrains Mono for numbers; cards radius 8 px, 1 pt #D9CFC0 border, no shadows; line icons only; no stock photos.
Layout: left column (x 0.45-6.6 in, y 1.4-5.6 in) holds one card with a 6 pt maroon left bar listing six fields as label/value rows:
  PROBLEM STATEMENT ID: 26214 | PROBLEM STATEMENT TITLE: [exact title from portal] | THEME: Heritage & Culture | PS CATEGORY: Hardware | TEAM ID: [Team ID] | TEAM NAME: [Team Name]
  Labels Inter SemiBold 11 pt uppercase grey, values Inter 16 pt ink.
Above or below the card, the idea title in Poppins SemiBold 34 pt maroon: "PARAMPARA: Feel the Master's Hand", and the sub-line in Inter 15 pt ink: "One sensor sleeve, fingers to shoulder, that captures a master's skill and teaches it until the learner plays alone."
Right column (x 6.8-12.9 in, y 1.3-6.4 in): place the image sleeve_iso_transparent.png (a CAD render of the sleeve on an arm), about 6 in wide, hand towards the upper right; caption "CAD render" 9 pt grey at its bottom-right.
Bottom strip (y 6.5-7.0 in): "Tabla (flagship) · Handloom · Kathputli puppetry" in Inter SemiBold 13 pt, "Tabla (flagship)" maroon, the rest grey, separated by small brass dots.
Optional faint brass (#B8901A, 6% opacity) line-art of a tabla, a loom and a string puppet behind the left card. No other decoration, no gradient, no emoji.
```

---

## SLIDE 2 · Idea title: Proposed solution

**5-second test:** "Masters' hand skill is disappearing; PARAMPARA records how a master moves, proves it is the master's, teaches it by touch, and only counts what you do with the device off."

**Winning decks vs us**

- Strong decks: problem in numbers, the solution as a 4-6-step flow, and a clear "what is unique" box.
- Decks that get cut: a wall of text; uniqueness claimed but never compared; solution not linked to the problem.
- Our edge: one innovation, one pipeline, a comparison strip against YouTube, motion-capture suits and the TIKL suit, and the line judges remember: "The device succeeds only when the learner no longer needs it."

**Layout**

- Row A, y 1.15-2.55 in: three problem cards side by side (each 3.9 × 1.3 in).
- Row B, y 2.75-4.55 in: the 5-step pipeline across the full width plus an "OWN" bar under it.
- Row C, y 4.75-7.0 in: left (x 0.45-6.6) "What makes it new" comparison table; right (x 6.8-12.9) USP box.

**Exact content**

- Section label row A: "THE PROBLEM"
    - Card 1 (icon: loom): "**35.22 lakh** handloom weavers and allied workers, down from **43.32 lakh**" · source "Handloom Census 2019-20"
    - Card 2 (icon: string puppet / hand): "Kathputli strings are tied to the fingers; Delhi's puppeteer colony (**~2,800 families**) was moved in **2017**" · source "UNIMA, PARI"
    - Card 3 (icon: archive box): "Archives keep how masters **sound and look**, not how they **move**" · source "NCAA (IGNCA)"
- Section label row B: "OUR SOLUTION: ONE SLEEVE, FIVE STEPS"
    1. **Sense**: 9 motion sensors + 8 vibration motors per arm, plus a sensor on the tool
    2. **Fingerprint**: how the master moves + what the tool does, per cycle
    3. **Teach**: touch = which finger and joint; sound = exact timing; screen = ghost arm
    4. **Fade**: cues are removed as the learner improves
    5. **Measure**: score only with the device **off**
    - OWN bar: "The master records, approves with a phone fingerprint, and can withdraw. Credit travels with the data."
- Row C left, label "WHAT IS NEW": three-row mini table

  | Existing | Does | Does not |
  |---|---|---|
  | Video lessons | Show the master | Measure you; check learning without help |
  | Motion-capture suits (US$5,000+) | Capture movement | Teach one master's way; affordable |
  | TIKL haptic suit (MIT) | Joint vibration in a lab | Fingers; fading; device-off test |
- Row C right, USP box: "**The device succeeds only when the learner no longer needs it.**" Under it, three short lines: "Master's Skill Fingerprint, proven against instrument and session" · "Fingertips and palm stay free" · "Tabla flagship; handloom and puppetry generalise"

**Visuals**

- Five pipeline steps as rounded rectangles (2.3 × 1.3 in) joined by grey arrows; icon on top of each: Sense = radio-wave/sensor (blue), Fingerprint = fingerprint (maroon), Teach = vibration hand (gold), Fade = slider going down (gold), Measure = gauge (green).
- Or use `PARAMPARA/figures/v4_pipeline.png` full width if the tool cannot draw shapes.

**Colours, borders, type**

- Problem cards: fill #FAF7F0, 1 pt #D9CFC0, radius 8 px, 6 pt maroon left bar; hero number Poppins Bold 22 pt maroon; text Inter 12.5 pt; source line Inter Italic 9 pt grey.
- Pipeline headers: Sense and Fingerprint maroon fill #7A1F1F with white text; Teach and Fade deep blue #1F4E79 with white text; Measure green #2E6B3A with white text; bodies white with 1.5 pt border in the header colour; body text Inter 11.5 pt.
- OWN bar: fill #FFF8E6, 1.5 pt brass border, text Inter 11.5 pt #5A4500.
- Comparison table: maroon header, alternating rows, 11 pt.
- USP box: fill #FFF8E6, 1.5 pt #B8901A border, radius 8 px; quote Poppins SemiBold 17 pt maroon; lines Inter 12 pt ink with small green check icons.

**Speaker notes (40 s)**
"Handloom lost eight lakh workers in a decade; Kathputli lives in puppeteers' fingers; archives keep sound, not movement. PARAMPARA senses the master from fingers to shoulder, turns that into a fingerprint, teaches it by touch and sound, removes the help step by step, and only scores what you do alone. Video cannot measure you, motion-capture suits cost five thousand dollars and do not teach, and the MIT TIKL suit needed a lab and never faded out. The device succeeds only when the learner no longer needs it."

**Copy-paste prompt**
```text
Create SLIDE 2 ("Idea title / Proposed solution") of an SIH 2026 deck, 16:9, inside the official SIH template.
Design system: white background; maroon #7A1F1F (problem, key numbers), deep blue #1F4E79 (technology), brass #B8901A (haptics, highlights), green #2E6B3A (done/measure), ink #222222, grey #5E5E5E, line #D9CFC0, card fill #FAF7F0, USP fill #FFF8E6. Poppins SemiBold headings, Inter body, JetBrains Mono numbers. Cards radius 8 px, 1 pt #D9CFC0 border, no shadows. Lucide line icons, 2 px stroke. No paragraphs.
Headline in the template title area: "PARAMPARA: a master's Skill Fingerprint, taught until you no longer need it".
ROW A (y 1.15-2.55 in), label "THE PROBLEM" (Inter SemiBold 11 pt uppercase grey). Three equal cards with a 6 pt maroon left bar, each: icon, hero number in Poppins Bold 22 pt maroon, one line Inter 12.5 pt, source Inter Italic 9 pt grey:
  1) loom icon: "35.22 lakh handloom weavers and allied workers, down from 43.32 lakh" (Handloom Census 2019-20)
  2) puppet icon: "Kathputli strings are tied to the fingers; Delhi's puppeteer colony (~2,800 families) was moved in 2017" (UNIMA, PARI)
  3) archive icon: "Archives keep how masters sound and look, not how they move" (NCAA, IGNCA)
ROW B (y 2.75-4.55 in), label "OUR SOLUTION: ONE SLEEVE, FIVE STEPS". Five rounded boxes 2.3 x 1.3 in joined by 1.5 pt grey arrows. Header bands: Sense and Fingerprint maroon, Teach and Fade deep blue, Measure green, white header text; white bodies with 1.5 pt border in the header colour; body Inter 11.5 pt:
  Sense: "9 motion sensors + 8 vibration motors per arm, plus a sensor on the tool"
  Fingerprint: "How the master moves + what the tool does, per cycle"
  Teach: "Touch = which finger and joint; sound = exact timing; screen = ghost arm"
  Fade: "Cues are removed as the learner improves"
  Measure: "Score only with the device off"
  Under the row, a full-width bar (fill #FFF8E6, 1.5 pt brass border): "OWN: the master records, approves with a phone fingerprint, and can withdraw. Credit travels with the data."
ROW C left (x 0.45-6.6 in, y 4.75-7.0 in), label "WHAT IS NEW": table with maroon header (Existing | Does | Does not):
  Video lessons | Show the master | Measure you; check learning without help
  Motion-capture suits (US$5,000+) | Capture movement | Teach one master's way; affordable
  TIKL haptic suit (MIT) | Joint vibration in a lab | Fingers; fading; device-off test
ROW C right (x 6.8-12.9 in): USP box (fill #FFF8E6, 1.5 pt brass border, radius 8 px). Quote in Poppins SemiBold 17 pt maroon: "The device succeeds only when the learner no longer needs it." Then three Inter 12 pt lines with small green check icons: "Master's Skill Fingerprint, proven against instrument and session" / "Fingertips and palm stay free" / "Tabla flagship; handloom and puppetry generalise".
Keep generous white space; align all boxes to a 12-column grid.
```

---

## SLIDE 3 · Technical approach (the most important slide)

**5-second test:** "I can see exactly what the device is, where every sensor and motor sits, which chips it uses, how data flows, and that parts of it already work."

**Winning decks vs us**

- Strong decks: an architecture diagram, the exact tech stack with part numbers, a step-by-step method, and evidence of a working prototype (screenshot, QR, video).
- Decks that get cut: logo soup ("IoT + AI + Cloud"), no diagram, no picture of the hardware, no proof anything runs.
- Our edge: a CAD render with every part placed, real datasheet values, a two-bus electronics diagram, the confound-proof method, and a QR code to a prototype that runs today with passing tests.

**Layout (dense but ordered; three zones)**

- Zone 1, left half (x 0.45-6.55 in, y 1.10-4.70 in): "THE DEVICE": sleeve render with numbered callouts, plus a hand close-up inset.
- Zone 2, right half (x 6.75-12.88 in, y 1.10-4.70 in): "INSIDE": tech-stack table (4 rows) and a small electronics diagram.
- Zone 3, full width (y 4.85-7.05 in): "METHOD" flow of 6 steps on the left two-thirds, "WORKING TODAY" card with screenshot and QR on the right third.

**Exact content**

Zone 1 callouts on `sleeve_iso_transparent.png` (numbered circles, 0.26 in, blue for sensors, gold for motors, green for hub):

1. Shoulder pod: IMU + motor
2. Upper-arm pod: IMU
3. Elbow: motor
4. Hub: ESP32-S3, battery, microSD
5. Wrist pod: forearm IMU + motor
6. Hand board: IMU + 5 motor drivers
7. Finger rings ×5: IMU (middle segment)
8. Finger motors ×5 (first segment)

- Inset (bottom-left of Zone 1, 2.2 in wide): `hand_palmar_transparent.png` with the caption "Palm and fingertips stay free".
- Under the render, one line of spec chips (JetBrains Mono 10.5 pt, pill borders): "9 IMUs/arm" · "8 motors/arm" · "≈160 g/arm (est.)" · "≈5.6 h battery (est.)" · "fingertips free"

Zone 2 tech-stack table (header maroon; first column bold):

| Layer | Exact parts and tools |
|---|---|
| Sensing | BMI270 6-axis IMU (2.5 × 3.0 mm) ×9 per arm, 200 Hz; Murata 27 mm piezo on each tabla drum |
| Haptics | C08-005 coin LRA (8 mm, 235 Hz) ×8, each driven by a DRV2605L; 2 × TCA9548A I2C switches |
| Compute and radio | ESP32-S3-MINI-1 (240 MHz, Wi-Fi + BLE 5), ESP-NOW, microSD backup log, MCP73831 + 1,000 mAh LiPo |
| Software | C++17 firmware (27 unit tests), Madgwick orientation filter, Python analysis, Web Audio phone app, passkey (WebAuthn) consent |

- Under the table: `v5_block_diagram.png` cropped to the hub and two bus boxes, 5.9 in wide, or a redrawn mini diagram: "Arm bus (I2C0, 400 kHz) → Hub ← Hand bus (I2C1)"; "Hub → radio → laptop/phone app"; "Tool node (tabla piezo) → shared clock".

Zone 3 method flow (6 small boxes with arrows):

1. **Record** master: 2 days × 2 instruments × 20 cycles
2. **Fingerprint**: joint timing, order, speed + tool signal
3. **Confound test**: new day ≥70%, new instrument ≥70%, p<0.01
4. **Teach**: finger/joint pulses end just before movement
5. **Fade**: check cycle every 4 cycles; guidance falls with skill
6. **Measure**: unaided score after 48 h, device off

"WORKING TODAY" card (green status pill "WORKING"): `v6_lite_screenshot.png` (2.3 in wide) + `qr_parampara_lite.png` (1.0 in) + three lines:

- "Phone prototype: teach, fade, device-off score"
- "End-to-end test: on time ≈100%, 60 ms late = 75%, silent = 0"
- "Firmware core: 27/27 unit tests pass"

**Colours, borders, type**

- Zone labels: Inter SemiBold 11 pt uppercase grey with a 2 pt brass underline 0.6 in long.
- Callout circles: white number on blue #1F4E79 (sensors), on brass #B8901A (motors), on green #2E6B3A (hub); leader lines 0.75 pt grey; callout text Inter 10.5 pt ink.
- Spec chips: 0.75 pt #D9CFC0 border, fully rounded, JetBrains Mono 10.5 pt; "(est.)" in grey.
- Table: maroon header, 10.5-11 pt; part numbers in JetBrains Mono.
- Method boxes: 1.9 × 1.0 in, white fill, 1.25 pt blue border, step number in a blue circle; arrows 1.5 pt grey.
- Working-today card: fill #EEF6EF, 1.25 pt green border, radius 8 px; pill "WORKING" green on white.
- Caption under the render: "CAD render of our design; the sleeve is built in weeks 1-3" (9 pt grey italic). This line is important for honesty.

**Speaker notes (45 s)**
"This is the sleeve. Blue are motion sensors, gold are vibration motors: nine and eight per arm, from the shoulder to every finger, with the palm and fingertips free. A BMI270 on each segment, an 8 mm 235 hertz motor driven by a DRV2605L, two I2C switches because those drivers share one address, and an ESP32-S3 hub. We record a master on two days and two instruments, and keep the fingerprint only if it still names the master on a new day and a new instrument. Pulses end just before each movement, fade as skill grows, and we score only with the device off. The teaching loop already runs on a phone, scan the code, and the firmware core passes 27 tests."

**Copy-paste prompt**
```text
Create SLIDE 3 ("Technical approach") of an SIH 2026 deck, 16:9, inside the official SIH template. This is the most important slide: dense but perfectly ordered, no paragraphs.
Design system: white background; maroon #7A1F1F, deep blue #1F4E79 (motion sensors, tech), brass #B8901A (vibration motors), green #2E6B3A (hub, working), ink #222222, grey #5E5E5E, line #D9CFC0, card fill #FAF7F0. Poppins SemiBold headings, Inter body, JetBrains Mono for part numbers and numbers. Radius 8 px, 1 pt borders, no shadows. Lucide line icons.
Headline: "Technical approach: one sleeve, two buses, a method that rejects fake fingerprints".
ZONE 1 left half (x 0.45-6.55 in, y 1.10-4.70 in), label "THE DEVICE": place sleeve_iso_transparent.png (CAD render of a sensor sleeve on a right arm, palm down) about 6 in wide. Add 8 numbered callout circles (0.26 in; blue fill for sensors, brass for motors, green for hub; white numbers; 0.75 pt grey leader lines; Inter 10.5 pt labels):
  1 Shoulder pod: IMU + motor | 2 Upper-arm pod: IMU | 3 Elbow: motor | 4 Hub: ESP32-S3, battery, microSD | 5 Wrist pod: forearm IMU + motor | 6 Hand board: IMU + 5 motor drivers | 7 Finger rings x5: IMU | 8 Finger motors x5
  Inset bottom-left, 2.2 in wide: hand_palmar_transparent.png with caption "Palm and fingertips stay free".
  Under the render, pill chips (JetBrains Mono 10.5 pt): "9 IMUs/arm" "8 motors/arm" "≈160 g/arm (est.)" "≈5.6 h battery (est.)" "fingertips free".
  Caption, 9 pt grey italic: "CAD render of our design; the sleeve is built in weeks 1-3".
ZONE 2 right half (x 6.75-12.88 in, y 1.10-4.70 in), label "INSIDE": table, maroon header (Layer | Exact parts and tools), first column bold, 10.5 pt:
  Sensing | BMI270 6-axis IMU (2.5 x 3.0 mm) x9 per arm, 200 Hz; Murata 27 mm piezo on each tabla drum
  Haptics | C08-005 coin LRA (8 mm, 235 Hz) x8, each driven by a DRV2605L; 2 x TCA9548A I2C switches
  Compute and radio | ESP32-S3-MINI-1 (240 MHz, Wi-Fi + BLE 5), ESP-NOW, microSD backup log, MCP73831 + 1,000 mAh LiPo
  Software | C++17 firmware (27 unit tests), Madgwick orientation filter, Python analysis, Web Audio phone app, passkey (WebAuthn) consent
  Below it a compact block diagram: "Arm bus (I2C0, 400 kHz)" box -> "Forearm hub (ESP32-S3)" box <- "Hand bus (I2C1, 400 kHz)" box; hub -> "radio (ESP-NOW)" -> "Laptop/phone app"; "Tool node: tabla piezo" -> "shared clock" -> hub. Blue borders for buses, green for hub, maroon for app and tool node. (Or insert v5_block_diagram.png.)
ZONE 3 full width (y 4.85-7.05 in), label "METHOD": six boxes 1.9 x 1.0 in with blue step circles and grey arrows:
  1 Record master: 2 days x 2 instruments x 20 cycles | 2 Fingerprint: joint timing, order, speed + tool signal | 3 Confound test: new day ≥70%, new instrument ≥70%, p<0.01 | 4 Teach: finger/joint pulses end just before movement | 5 Fade: check cycle every 4 cycles | 6 Measure: unaided score after 48 h, device off
  At the right end, a "WORKING TODAY" card (fill #EEF6EF, 1.25 pt green border, green pill "WORKING"): screenshot v6_lite_screenshot.png 2.3 in wide, QR code qr_parampara_lite.png 1.0 in, and three lines in Inter 11 pt: "Phone prototype: teach, fade, device-off score" / "End-to-end test: on time ≈100%, 60 ms late = 75%, silent = 0" / "Firmware core: 27/27 unit tests pass".
Colour code must match the render: blue = sensors, gold = motors, green = hub.
```

---

## SLIDE 4 · Feasibility and viability

**5-second test:** "It is buildable now from off-the-shelf parts for about ₹20-32 thousand, every risk has a fallback, institutions already pay for this kind of teaching, and the team shows exactly what is done and what is not."

**Winning decks vs us**

- Strong decks: a cost table, a timeline, a risk-mitigation table and a believable first customer.
- Decks that get cut: "no risks", unrealistic timelines, revenue claims with no buyer.
- Our edge: a bill of materials from datasheet parts, engineering budgets, a proof ladder with honest statuses, risks with fallbacks, and an institution-first plan tied to existing government schemes.

**Layout (2 × 2 grid)**

- Top-left (x 0.45-6.55, y 1.10-3.95): "FEASIBLE NOW": cost and budgets.
- Top-right (x 6.75-12.88, y 1.10-3.95): "PROOF LADDER": statuses.
- Bottom-left (x 0.45-6.55, y 4.10-7.05): "RISKS → FALLBACKS" table.
- Bottom-right (x 6.75-12.88, y 4.10-7.05): "VIABLE: WHO PAYS".

**Exact content**

- FEASIBLE NOW:
    - Hero number: **₹20,000-32,000** "two sleeves + three tool kits (estimate)"; comparison line: "a motion-capture suit costs US$5,000-12,000+"
    - Four budget tiles (2 × 2, JetBrains Mono): "Data 21.6 kB/s per sleeve" · "Battery ≈5.6 h (est.)" · "Mass ≈160 g/arm (est.)" · "I2C < 100 pF vs 400 pF limit"
    - One line: "All parts off the shelf; boards made by a PCB assembly service; 8 defined bench tests (H1-H8)"
- PROOF LADDER (8 rows, status pill on the right):
    1. Design + validation plan, pass rules fixed: **DONE**
    2. Method pre-tested on 10 real drummers: **DONE**
    3. Teaching loop on a phone, end-to-end tests: **DONE**
    4. Firmware core, 27 unit tests: **DONE**
    5. Sleeve built, bench tests H1-H8: **WEEKS 1-3**
    6. Tabla masters recorded; E0 (sleeve does not change playing): **WEEKS 4-5**
    7. E1 verdict: fingerprint belongs to the master: **WEEK 5**
    8. E5a and E5: device-off learning estimates: **WEEKS 1-7**
- RISKS → FALLBACKS (table: Risk | What we do | Fallback; 5 rows):
    - No master in time | Outreach via ZCCs, WSCs, colleges in week 1 | Senior practitioners, stated clearly
    - Sleeve changes playing (E0) | Lighter rings; adjust with the master | Hand, wrist and elbow only
    - Fingerprint near pass mark | Add movement features; 30 cycles | Graded claim fixed in advance
    - Cues not felt while striking | Cue earlier, stronger pulse | Move cue to the wrist
    - Boards late | Order in week 1 | Breakout boards in larger rings
- VIABLE: WHO PAYS (three columns with icons):
    - Tabla: "Guru-Shishya Parampara (₹7,500/month per guru), CBSE subject 036 schools"
    - Handloom: "28 Weavers' Service Centres, SAMARTH, 315-hour NSQF course"
    - Puppetry: "Sangeet Natak Akademi scheme, artists in schools"
    - Under them: "Model: institution kit + yearly licence + share to consenting masters. **Test: 3 signed letters of intent in year 1.**"

**Visuals**

- Small render `pods_lineup_transparent.png` (3.2 in wide) under the budget tiles, caption "All housings, to scale (CAD render)".
- Icons: rupee (maroon), battery (green), weight (grey), chip (blue); people/school/loom/puppet for the payer columns.

**Colours, borders, type**

- Quadrant cards: fill #FAF7F0, 1 pt #D9CFC0, radius 8 px; quadrant label Inter SemiBold 11 pt uppercase grey with a brass underline.
- Hero number Poppins Bold 30 pt maroon.
- Budget tiles: white fill, 0.75 pt border, value JetBrains Mono 13 pt ink, label Inter 9.5 pt grey.
- Ladder pills: DONE = green #2E6B3A on #EEF6EF; WEEKS = grey #5E5E5E on #F2F2F2. A thin vertical line connects the rungs; done rungs have a filled green dot, future rungs an empty grey dot.
- Risk table header red #9B2C2C (risks only), body 10 pt, fallback column text in green.
- Payer columns: thin vertical dividers 0.75 pt #D9CFC0; the "Test: 3 letters of intent" line in a brass-bordered strip.

**Speaker notes (45 s)**
"Everything here is off the shelf: about twenty to thirty-two thousand rupees for two sleeves and three tool kits, against five thousand dollars or more for a motion-capture suit. Our budgets fit: data, battery, weight and bus load. This ladder is honest: four rungs are done today, the sleeve and the masters come next, each with a measurement we will show. Every risk has a fallback, including the one our drummer pre-test revealed: timing alone is close to our pass mark, so we add body motion and fixed graded claims. The first buyers already pay for live teaching: Guru-Shishya Parampara, Weavers' Service Centres and schools. Our year-one test is three signed letters of intent."

**Copy-paste prompt**
```text
Create SLIDE 4 ("Feasibility and viability") of an SIH 2026 deck, 16:9, inside the official SIH template. 2 x 2 grid of quadrant cards (fill #FAF7F0, 1 pt #D9CFC0, radius 8 px), each with a label in Inter SemiBold 11 pt uppercase grey underlined by a 2 pt brass (#B8901A) line.
Colours: maroon #7A1F1F, deep blue #1F4E79, brass #B8901A, green #2E6B3A (done only), red #9B2C2C (risks only), ink #222222, grey #5E5E5E. Fonts: Poppins SemiBold, Inter, JetBrains Mono. Lucide line icons. No paragraphs.
Headline: "Feasible with off-the-shelf parts; viable through institutions that already fund teaching".
TOP-LEFT "FEASIBLE NOW" (x 0.45-6.55, y 1.10-3.95 in): hero number "₹20,000-32,000" in Poppins Bold 30 pt maroon, label "two sleeves + three tool kits (estimate)", line "a motion-capture suit costs US$5,000-12,000+". Four small white tiles (0.75 pt border; value JetBrains Mono 13 pt; label Inter 9.5 pt grey) with icons: "Data 21.6 kB/s per sleeve", "Battery ≈5.6 h (est.)", "Mass ≈160 g/arm (est.)", "I2C < 100 pF vs 400 pF limit". Small image pods_lineup_transparent.png 3.2 in wide, caption "All housings, to scale (CAD render)". One line: "All parts off the shelf; PCB assembly service; 8 defined bench tests (H1-H8)".
TOP-RIGHT "PROOF LADDER" (x 6.75-12.88, y 1.10-3.95 in): 8 rungs on a thin vertical line; filled green dots for done, empty grey dots for future; status pills right-aligned (DONE green on #EEF6EF; WEEKS grey on #F2F2F2), Inter 11 pt:
  1 Design + validation plan, pass rules fixed - DONE | 2 Method pre-tested on 10 real drummers - DONE | 3 Teaching loop on a phone, end-to-end tests - DONE | 4 Firmware core, 27 unit tests - DONE | 5 Sleeve built, bench tests H1-H8 - WEEKS 1-3 | 6 Tabla masters recorded; E0 sleeve does not change playing - WEEKS 4-5 | 7 E1 verdict: fingerprint belongs to the master - WEEK 5 | 8 E5a and E5 device-off learning estimates - WEEKS 1-7
BOTTOM-LEFT "RISKS -> FALLBACKS" (x 0.45-6.55, y 4.10-7.05 in): table with red #9B2C2C header (Risk | What we do | Fallback), 10 pt, fallback text green:
  No master in time | Outreach via ZCCs, WSCs, colleges in week 1 | Senior practitioners, stated clearly
  Sleeve changes playing (E0) | Lighter rings; adjust with the master | Hand, wrist and elbow only
  Fingerprint near pass mark | Add movement features; 30 cycles | Graded claim fixed in advance
  Cues not felt while striking | Cue earlier, stronger pulse | Move cue to the wrist
  Boards late | Order in week 1 | Breakout boards in larger rings
BOTTOM-RIGHT "VIABLE: WHO PAYS" (x 6.75-12.88, y 4.10-7.05 in): three columns with icons and thin dividers:
  Tabla: "Guru-Shishya Parampara (₹7,500/month per guru); CBSE subject 036 schools"
  Handloom: "28 Weavers' Service Centres; SAMARTH; 315-hour NSQF course"
  Puppetry: "Sangeet Natak Akademi scheme; artists in schools"
  Bottom strip with brass border: "Model: institution kit + yearly licence + share to consenting masters. Test: 3 signed letters of intent in year 1."
```

---

## SLIDE 5 · Impact and benefits

**5-second test:** "Who gains, by how much, and how it will be measured; the benefits are real and stated without hype."

**Winning decks vs us**

- Strong decks: named beneficiaries with numbers, benefits split into social / economic / environmental, and a link to national goals or SDGs.
- Decks that get cut: "will help millions", invented market sizes, environmental claims that do not hold.
- Our edge: government numbers with sources, a health angle with real prevalence data, measured outcomes for each group, and SDG targets that fit exactly (SDG 4, 8, 11.4).

**Layout**

- Left two-thirds (x 0.45-8.6 in): "WHO GAINS" five rows (icon | group | benefit | how we measure).
- Right third (x 8.8-12.88 in): "BY THE NUMBERS" stack of 4 stat tiles, then SDG badges.
- Bottom strip (y 6.45-7.05 in): "BENEFITS" chips: Social · Economic · Health · Educational · Cultural · Environmental.

**Exact content**

- WHO GAINS (table rows):
    - Masters | Their own way of playing, weaving, puppeteering preserved and credited on their terms | Masters recorded; their feedback
    - Learners | Practise against a real master between lessons; honest progress | Unaided score after 48 h
    - Weavers | Feedback on raised-shoulder time during long hours | Shoulder time before vs after (to be tested)
    - Archives | A new record: how masters move, not only sound | Consented fingerprints deposited (NCAA)
    - Researchers | A consented dataset linking masters and learners | Dataset and publications
- BY THE NUMBERS (tiles; number big, label small, source tiny):
    - "35.22 lakh" handloom weavers and allied workers (Handloom Census 2019-20)
    - "76% vs 42%" shoulder pain, handloom vs powerloom weavers (Varanasi, n = 364)
    - "64.66 lakh" handloom and handicraft artisans (PIB 2025)
    - "36 States/UTs" in Kala Utsav; tabla is CBSE subject 036
- SDG badges (small, official colours allowed here only): SDG 4 Quality Education · SDG 8 Decent Work · SDG 11.4 Safeguard cultural heritage
- BENEFITS chips:
    - Social: masters keep control and credit (UNESCO ethics, CARE)
    - Economic: low-cost kit; licence share to masters
    - Health: posture feedback for weavers (to be tested)
    - Educational: learning counted with the device off
    - Cultural: a record of how masters move
    - Environmental: reusable, repairable kit with open CAD files
- Footnote (9 pt grey): "Possible future benefit, not tested: rhythm learning by touch for deaf learners (50.7 lakh people with hearing disability, Census 2011)."

**Visuals**

- Five small line icons: guru/teacher, student, loom, archive box, flask.
- Optional small image at top-right of the left zone: `puppet_iso_transparent.png` or `loom_iso_transparent.png` (1.6 in) as a visual anchor.

**Colours, borders, type**

- Table header maroon; group names bold maroon; "how we measure" column in blue.
- Stat tiles: white fill, 1 pt #D9CFC0, radius 8 px, a 4 pt brass top bar; number Poppins Bold 26 pt maroon; label Inter 11 pt; source Inter Italic 8.5-9 pt grey.
- Benefit chips: fully rounded, 0.75 pt border in the meaning colour (Health green, Economic brass, Educational blue, Social and Cultural maroon, Environmental grey), Inter SemiBold 10.5 pt.

**Speaker notes (35 s)**
"Five groups gain, and each has a measurement. Masters keep their legacy on their terms. Learners get an honest device-off score. Weavers, three in four of whom report shoulder pain on handlooms, get posture feedback, which we will test before we claim it. Archives get a new kind of record, how masters move. And everything maps to SDG 4, 8 and target 11.4 on cultural heritage."

**Copy-paste prompt**
```text
Create SLIDE 5 ("Impact and benefits") of an SIH 2026 deck, 16:9, inside the official SIH template.
Colours: maroon #7A1F1F, deep blue #1F4E79, brass #B8901A, green #2E6B3A, ink #222222, grey #5E5E5E, line #D9CFC0. Fonts: Poppins SemiBold, Inter, JetBrains Mono. Radius 8 px, 1 pt borders, no shadows. Lucide line icons. No paragraphs, no hype words.
Headline: "Impact: five groups gain, each with a measurement".
LEFT two-thirds (x 0.45-8.6 in, y 1.10-6.35 in), label "WHO GAINS": table with maroon header (Group | Benefit | How we measure), first column bold maroon with an icon, third column text blue, 11 pt:
  Masters | Their own way of playing, weaving, puppeteering preserved and credited on their terms | Masters recorded; their feedback
  Learners | Practise against a real master between lessons; honest progress | Unaided score after 48 h
  Weavers | Feedback on raised-shoulder time during long hours | Shoulder time before vs after (to be tested)
  Archives | A new record: how masters move, not only sound | Consented fingerprints deposited (NCAA)
  Researchers | A consented dataset linking masters and learners | Dataset and publications
RIGHT third (x 8.8-12.88 in), label "BY THE NUMBERS": four stat tiles (white, 1 pt #D9CFC0 border, 4 pt brass top bar; number Poppins Bold 26 pt maroon; label Inter 11 pt; source Inter Italic 9 pt grey):
  "35.22 lakh" handloom weavers and allied workers - Handloom Census 2019-20
  "76% vs 42%" shoulder pain, handloom vs powerloom weavers - Varanasi study, n = 364
  "64.66 lakh" handloom and handicraft artisans - PIB 2025
  "36 States/UTs" in Kala Utsav; tabla is CBSE subject 036
  Below: three small SDG badges: SDG 4 Quality Education, SDG 8 Decent Work, SDG 11.4 Safeguard cultural heritage.
BOTTOM strip (y 6.45-7.05 in), label "BENEFITS": six rounded chips with coloured borders: Social (maroon) "masters keep control and credit" / Economic (brass) "low-cost kit; licence share to masters" / Health (green) "posture feedback for weavers (to be tested)" / Educational (blue) "learning counted with the device off" / Cultural (maroon) "a record of how masters move" / Environmental (grey) "reusable, repairable kit; open CAD files".
Footnote 9 pt grey: "Possible future benefit, not tested: rhythm learning by touch for deaf learners (50.7 lakh people with hearing disability, Census 2011)."
```

---

## SLIDE 6 · Research and references

**5-second test:** "This team read the science, tested its own assumptions, and every claim has a checkable source."

**Winning decks vs us**

- Strong decks: grouped references with links, and the one or two findings the idea stands on.
- Decks that get cut: no references, Wikipedia only, or citations that do not exist.
- Our edge: three columns (what science shows, what we tested ourselves, key references) and a QR code to the full 92-reference dossier with verification status.

**Layout**

- Column 1 (x 0.45-4.45 in): "WHAT SCIENCE SHOWS": 5 evidence cards.
- Column 2 (x 4.65-8.65 in): "WHAT WE TESTED OURSELVES": the drummer chart and 3 result lines.
- Column 3 (x 8.85-12.88 in): "KEY REFERENCES": 8 short references and the QR/link to the dossier.

**Exact content**

- WHAT SCIENCE SHOWS (number first):
    - "−27% error, up to 23% faster learning": joint vibration suit (Lieberman & Breazeal, IEEE T-RO 2007)
    - "96.18%": drum and strength cues recognised by touch (Lee & Choi, POSTECH)
    - "−17% / −18%": loudness and timing error with haptic guidance (Grindlay, IEEE Haptics 2008)
    - "Less feedback, better retention" (Winstein & Schmidt 1990)
    - "Experts move shoulder → elbow → wrist; novices do not" (Furuya & Kinoshita 2007)
- WHAT WE TESTED OURSELVES:
    - Image: `v5_gmd_results.png` (3.9 in wide)
    - "Same grooves, 4 drummers: **63%** named by how they play vs **26%** by which notes (chance 25%)"
    - "New session: 3 × chance; E1-sized trios average **66%** vs our **70%** pass mark, so we add body motion"
    - "Phone prototype end-to-end tests pass; firmware 27/27 tests pass"
    - Small label: "Pre-test on real performers (Groove MIDI Dataset, CC BY 4.0), not tabla"
- KEY REFERENCES (Inter 9.5 pt, numbered):
    1. Lieberman & Breazeal (2007) TIKL, IEEE Trans. Robotics
    2. Lee & Choi, vibrotactile drumming guidance, IEEE haptics
    3. Grindlay (2008) Haptic guidance benefits musical motor learning, IEEE HAPTICS
    4. Winstein & Schmidt (1990) J. Exp. Psych.: LMC 16(4)
    5. Furuya & Kinoshita (2007) Neuroscience Letters
    6. Gillick et al. (2019) Groove MIDI Dataset, ICML
    7. Ministry of Textiles, 4th All India Handloom Census 2019-20
    8. UNESCO (2015) Ethical Principles for Safeguarding ICH
    - Under the list: QR (blue) + "Full dossier: 92 references, 81 verified live" + "[short link to the PDF in your drive or repository]".

**Colours, borders, type**

- Evidence cards: fill #FAF7F0, 1 pt #D9CFC0, radius 8 px; number Poppins Bold 18 pt blue; text Inter 11 pt; citation Inter Italic 9 pt grey.
- Column 2 card: fill #EEF6EF, 1.25 pt green border (our own tests); chart framed by 0.75 pt #D9CFC0.
- References: hanging indent, numbers in brass bold, titles ink, venues grey italic.

**Speaker notes (30 s)**
"Our idea stands on published results: joint vibration speeds up learning, people can read drum cues by touch, and less feedback gives better retention. We also tested our own assumption on real performers: drummers are recognised by how they play, not what they play, but timing alone is close to our pass mark, which is why we measure the body too. The full dossier has 92 references, each marked verified."

**Copy-paste prompt**
```text
Create SLIDE 6 ("Research and references") of an SIH 2026 deck, 16:9, inside the official SIH template. Three equal columns, each headed by an Inter SemiBold 11 pt uppercase grey label with a 2 pt brass underline.
Colours: maroon #7A1F1F, deep blue #1F4E79, brass #B8901A, green #2E6B3A, ink #222222, grey #5E5E5E, line #D9CFC0, card fill #FAF7F0. Fonts: Poppins, Inter, JetBrains Mono. Radius 8 px, 1 pt borders.
Headline: "Research: what science shows, what we tested, where to check".
COLUMN 1 "WHAT SCIENCE SHOWS" (x 0.45-4.45 in): five stacked cards (number in Poppins Bold 18 pt blue, text Inter 11 pt, citation Inter Italic 9 pt grey):
  "-27% error, up to 23% faster learning" joint vibration suit (Lieberman & Breazeal, IEEE T-RO 2007)
  "96.18%" drum and strength cues recognised by touch (Lee & Choi, POSTECH)
  "-17% / -18%" loudness and timing error with haptic guidance (Grindlay, IEEE Haptics 2008)
  "Less feedback, better retention" (Winstein & Schmidt 1990)
  "Experts move shoulder -> elbow -> wrist; novices do not" (Furuya & Kinoshita 2007)
COLUMN 2 "WHAT WE TESTED OURSELVES" (x 4.65-8.65 in): one card with fill #EEF6EF and 1.25 pt green border. Insert chart image v5_gmd_results.png 3.9 in wide. Then three lines Inter 11 pt:
  "Same grooves, 4 drummers: 63% named by how they play vs 26% by which notes (chance 25%)"
  "New session: 3x chance; E1-sized trios average 66% vs our 70% pass mark, so we add body motion"
  "Phone prototype end-to-end tests pass; firmware 27/27 tests pass"
  Small grey label: "Pre-test on real performers (Groove MIDI Dataset, CC BY 4.0), not tabla".
COLUMN 3 "KEY REFERENCES" (x 8.85-12.88 in): numbered list, Inter 9.5 pt, numbers brass bold, venues grey italic:
  1 Lieberman & Breazeal (2007) TIKL, IEEE Trans. Robotics | 2 Lee & Choi, vibrotactile drumming guidance, IEEE haptics | 3 Grindlay (2008) Haptic guidance benefits musical motor learning, IEEE HAPTICS | 4 Winstein & Schmidt (1990) J. Exp. Psych.: LMC 16(4) | 5 Furuya & Kinoshita (2007) Neuroscience Letters | 6 Gillick et al. (2019) Groove MIDI Dataset, ICML | 7 Ministry of Textiles, 4th All India Handloom Census 2019-20 | 8 UNESCO (2015) Ethical Principles for Safeguarding ICH
  Below: a blue QR code (1.1 in) and the text "Full dossier: 92 references, 81 verified live" plus "[short link]".
```

---

## 7. Finale / jury deck (only if you reach the grand finale)

At the finale the 6-slide limit no longer applies to your pitch deck (check your nodal centre's instructions). Add these after the six slides above. Same design system.

### SLIDE 7 · Live demo (the moment)

- **5-second test:** "Watch the cues fade and the score appear."
- **Layout:** full-width 3-step storyboard (three frames 3.9 × 3.2 in) + a "If the demo fails" strip.
- **Content:** Frame 1 "Cues on: pulses before each stroke" (hand close-up render, gold motor glow) · Frame 2 "Cues fade: check cycle every 4 cycles" (guidance meter going 100% → 40%) · Frame 3 "Device off: 16 beats alone → unaided score" (screenshot of the score). Strip: "Backup: recorded video · QR to the phone prototype".
- **Prompt:**
```text
Create a finale slide "Live demo: the device succeeds when it is no longer needed". Three equal storyboard frames (white cards, 1 pt #D9CFC0, radius 8 px) joined by grey arrows. Frame headers: "1 Cues on" (brass), "2 Cues fade" (blue), "3 Device off" (green). Frame 1: hand_iso_transparent.png with a soft brass glow on the finger motors; caption "Pulses arrive just before each stroke". Frame 2: a horizontal guidance meter (blue fill) stepping 100% -> 80% -> 60% -> 40%; caption "Check cycle every 4 cycles; fewer cues as skill grows". Frame 3: v6_lite_screenshot.png cropped to the score panel; caption "16 beats alone; the unaided score is the result". Bottom strip with brass border: "Backup: recorded video · QR to the phone prototype" with qr_parampara_lite.png. Colours: maroon #7A1F1F, blue #1F4E79, brass #B8901A, green #2E6B3A; fonts Poppins, Inter.
```

### SLIDE 8 · Equipment deep-dive

- **Content:** left `v5_pods_exploded.png` (or the four exploded transparent renders), right `v5_drawings.png` + a 6-row component table (BMI270, DRV2605L, TCA9548A, ESP32-S3-MINI-1, C08-005 LRA, MCP73831 with one datasheet fact each).
- **Prompt:**
```text
Create a finale slide "Inside the sleeve: every part, every dimension". Left 55%: a 2 x 2 grid of exploded CAD renders (ring_exploded, motor_exploded, hand_exploded, hub_exploded transparent PNGs) with titles "Finger ring IMU 13 x 11 x 4.4 mm", "Finger motor 12 dia x 5.2 mm", "Hand board 42 x 32 x 8 mm", "Hub 62 x 44 x 16 mm" in Inter SemiBold 11 pt; caption "CAD renders". Right 45%: v5_drawings.png on top, then a table with maroon header (Part | Datasheet fact | Why): BMI270 | 2.5 x 3.0 x 0.83 mm, 685 µA, 2 KB FIFO | fits a finger ring / DRV2605L | fixed I2C address 0x5A, LRA auto-resonance | crisp pulses / TCA9548A | 8 channels, 400 kHz | shares one bus / ESP32-S3-MINI-1 | 15.4 x 20.5 mm, 240 MHz, BLE 5 | two buses + radio / C08-005 LRA | 8 mm, 235 Hz, 75 mA | skin is most sensitive near 200-300 Hz / MCP73831 | 15-500 mA charger | safe USB-C charging. Part numbers in JetBrains Mono.
```

### SLIDE 9 · The hardest question: is it the master or the instrument?

- **Content:** the question in a blue quote box; E1 design (3 masters × 2 days × 2 instruments × 20 cycles = 240 cycles); `confound_test.png`; the graded-claim table (pass / weak / none).
- **Prompt:**
```text
Create a finale slide "Is it the master, or the instrument?". Top: a quote box (fill #EEF3F8, 1.5 pt blue border) with the judge's question in Poppins SemiBold 18 pt: "Are you identifying the master, or their instrument, tuning, session or sensor placement?". Middle-left: an E1 design graphic: 3 master icons x 2 calendar days x 2 drum icons x 20 cycles = 240 cycles, with tests "T-a new day ≥70%", "T-b new instrument ≥70%", "T-c direct test p<0.01". Middle-right: confound_test.png with caption "Software check on synthetic data: the test rejects a fake fingerprint". Bottom: table with maroon header (E1 result | What we claim | What we teach): all pass | master-specific fingerprint | levels 1-3 / T-c passes, accuracy 50-70% | real but weak fingerprint | levels 1-2 / T-c fails | no master fingerprint | levels 1-2.
```

### SLIDE 10 · Validation plan E0–E5

- **Content:** a 7-row table E0, E1, E2, E3, E4, E5a, E5 (question | people | pass rule | crafts), with a highlighted E0 row: "Does the sleeve change how masters play? Equivalence within ±10 ms, ±5%, ±1 dB".
- **Prompt:**
```text
Create a finale slide "Every claim has a test, and every test has a pass rule fixed in advance". Full-width table, maroon header (# | Question | People | Pass rule | Crafts), 11 pt, alternating rows; highlight the E0 row with a 6 pt maroon left bar:
E0 | Does the sleeve change how masters play? | each master | equivalent within ±10 ms, ±5%, ±1 dB; comfort ≥4/5 | all three
E1 | Is the fingerprint the master's? | 3 per craft | new day and new instrument ≥70%; direct test p<0.01 | all three
E2 | Can cues be felt while performing? | 8 | at most 2 x rest threshold | tabla, puppetry
E3 | Can people tell two masters apart? | 10 | ≥15 of 20 | tabla
E4 | Can cues be read while performing? | 8-10 | ≥90% sites, ≥80% strengths | tabla, puppetry
E5a | Does fading beat always-on cues (phone)? | 16 | difference with 95% CI (pilot) | tabla, this week
E5 | Device-off learning vs video | 16 | difference with 95% CI; full trial (120) if ≥ video | tabla
Footer line in grey: "Pilots of 16 detect only large effects (d ≈ 1.5); the 120-person trial detects d ≈ 0.52."
```

### SLIDE 11 · Tool kits for three crafts

- **Content:** three columns with `tabla_iso_transparent.png`, `loom_iso_transparent.png`, `puppet_iso_transparent.png`; under each: sensor, what it measures, fitting, and the "cycle" unit.
- **Prompt:**
```text
Create a finale slide "One sleeve, three crafts". Three equal columns with column headers "Tabla (flagship)" maroon, "Handloom (demo)" blue, "Kathputli (demo)" brass. Images: tabla_iso_transparent.png, loom_iso_transparent.png, puppet_iso_transparent.png (each about 3.6 in wide, caption "CAD render"). Under each, four rows with small icons: Sensor / Measures / Fitting / Cycle:
Tabla: 2 Murata 27 mm piezo discs on the shells | stroke time, strength, drum | clip with removable putty | 16-beat tal cycle
Handloom: beater IMU, treadle switches, phone camera | beat timing and force, treadle order, picks per cm | straps; nothing on the warp | one pick
Kathputli: IMU pod in the wooden torso + finger rings | puppet turn and tilt; finger moves | inside the costume; strings untouched | one gesture phrase
Effort strip at the bottom: "Effort: tabla 80% · puppetry 10% · handloom 5% · platform 5%".
```

### SLIDE 12 · Team, ask and close

- **Content:** six roles (Hardware, Firmware, App, Analysis, Research and partner liaison, Pitch) with names; "What we ask": access to Zonal Cultural Centre gurus and one Weavers' Service Centre; mentor in haptics; closing line "The device succeeds only when the learner no longer needs it."
- **Prompt:**
```text
Create a closing slide "Team and next step". Left: six team cards (name, role, one-line ownership) in a 3 x 2 grid: Hardware (boards, housings, bench tests), Firmware (buses, cue timing, clock sync), App (ghost arm, lessons, consent), Analysis (fingerprint, confound test, statistics), Research and partner liaison (masters, consent, sessions), Pitch (deck, demo, backup video). Right: "What we ask" card with brass border: "Introductions to Zonal Cultural Centre gurus and one Weavers' Service Centre; a mentor in haptics". Bottom centre, large: "The device succeeds only when the learner no longer needs it." in Poppins SemiBold 24 pt maroon. Fonts Poppins and Inter; colours maroon #7A1F1F, blue #1F4E79, brass #B8901A.
```

---

## 8. Decorative image prompts (illustrations only, never the device)

Use only for the title-slide background motif or section dividers. Label nothing as real.

```text
Minimal single-colour line art on a transparent background: a tabla pair, a two-treadle handloom and a Rajasthani Kathputli string puppet, drawn with even 2 px strokes in brass #B8901A, flat, no shading, no text, no people's faces, generous spacing, wide 16:9 composition, suitable at 6% opacity behind slide text.
```

```text
Flat icon set, line style, 2 px stroke, deep blue #1F4E79 on transparent: motion sensor chip, vibration motor (concentric arcs), fingerprint, fading slider, gauge, archive box, loom, string puppet, tabla, rupee, battery, weight, shield with check. Consistent 24 px grid, rounded caps, no fill.
```

---

## 9. Final QA checklist before you export the PDF

- [ ] Exactly 6 slides in the official template; title fields match the portal.
- [ ] No paragraph longer than two lines anywhere.
- [ ] Every render has a "CAD render" label; no AI photo of the device.
- [ ] Words used: "defined bench tests", "pre-test on real performers", "phone prototype working". Never "validated end to end", "proven fingerprint", "improves learning".
- [ ] Colour code consistent: blue = sensors, gold = motors, green = hub/done, red = risks only.
- [ ] Every number traceable to the v6 dossier (sources on Slide 6).
- [ ] QR code tested on two phones, and the link shared publicly before submission.
- [ ] Text at least 9 pt; contrast checked by printing one slide in greyscale.
- [ ] File exported as PDF; check that images are not blurry (use the 2x PNGs in `PARAMPARA/ppt/assets`).

### Sources for the format and winning-deck patterns

- [Smart India Hackathon 2026 idea submission template (SlideShare)](https://www.slideshare.net/slideshow/innovative-smart-india-hackathon-2026-idea-submission-template-for-software-hardware-solutions/289256695)
- [SIH 2025 complete guide and PPT template (lets-code)](https://www.lets-code.co.in/blogs/sih-2025-complete-guide-ppt-template/)
- [How I won Smart India Hackathon (Reskilll)](https://blogs.reskilll.com/how-i-won-smart-india-hackathon-lessons-36-hours-changed-everything/)
- [Common SIH mistakes that get teams eliminated (Reskilll)](https://blogs.reskilll.com/common-sih-mistakes-teams-eliminated-how-to-avoid/)
- [A beginner's guide to winning SIH (DEV Community)](https://dev.to/ishikajain/a-beginners-guide-to-winning-smart-india-hackathon-1pei)
