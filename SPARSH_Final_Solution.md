# SPARSH: Heritage You Can Touch
### Final recommended solution for SIH 2026 · PS 26214 (AICTE Student Innovation · Heritage & Culture · Hardware)

> **One-line pitch:** A low-cost, refreshable **multi-height pin-relief display** that lets blind and low-vision people *feel* any Indian monument, sculpture, painting or script on demand, and *hear* the story of whatever their finger touches.
> One device replaces a cabinet full of static replicas, for about ₹30k instead of the roughly ₹21 lakh that commercial tactile displays cost.

---

## 1. Why this one (final comparison)

Each candidate is scored 1–10 against how SIH juries score: novelty, technical difficulty, feasibility, impact, cost, demo.

| Candidate | Novelty | Tech depth | Feasibility (10 wks) | Social impact | Uniqueness vs other teams | Live demo | **Total** |
|---|---|---|---|---|---|---|---|
| **SPARSH (refreshable tactile heritage)** | 9 | 9 | 8 | **10** | 9 | 9 | **54** |
| NAAD-DHARA (sounding monuments) | 9 | 8 | 7 (stone cutting risk) | 7 | 10 | 10 | 51 |
| NUPUR (smart ghungroo / laya) | 7 | 7 | 9 | 6 | 6 (looks like last year's wearable) | 8 | 43 |
| Living Kolam floor | 8 | 6 | 8 | 5 | 7 | 8 | 42 |
| Sankalpa Srot (diya wall) | 5 | 4 | 8 | 5 | 5 | 8 | 35 |

**Why SPARSH wins:**
1. **Real, hard hardware.** It has a CNC-style gantry, a precision Z-pusher, a mechanical pin-locking bed, calibration, plus computer vision and audio. You cannot replace it with an app, and nobody can call it "just LEDs".
2. **The Government is already paying for the static version.** The National Museum (Ministry of Culture) runs "Anubhav", a tactile gallery of 22 replicas, and "Heritage at My Fingertips", 41 tactile models of monuments. Static replicas mean one object per model, fixed at one location. SPARSH is the scalable version: **one device holds an unlimited library, works in any language and goes anywhere.**
3. **The problem is real and measurable.** The National Blindness & Visual Impairment Survey (2015–19) estimates blindness prevalence at **0.36% of the overall population**. Applied to India's population, that is millions of people who are shut out of a heritage that is almost entirely *visual*. Do the exact headcount math from the NPCBVI report on your slide.
4. **The cost gap is dramatic.** The cheapest commercial refreshable tactile graphics display (Orbit Graphiti) costs about **US$25,000**. Your target is under ₹50k at production scale.
5. **Few teams will think of it.** Most PS 26214 teams will build AR/VR, digitisation, AI try-ons, LED walls or wearables. "Accessible heritage" combined with "refreshable shape display" is rare.

---

## 2. The problem slide

- India's heritage is experienced **visually**: monuments, carvings, miniature paintings, inscriptions. Blind and low-vision citizens are effectively excluded.
- Current fixes are **static tactile replicas**. Each replica is one object, costs hours of fabrication, sits in one city, cannot be updated, and needs storage. National Museum's flagship galleries hold 22 and 41 replicas.
- **Refreshable** tactile displays exist, but they are binary (pins only up or down, built for braille/graphics), cost about ₹20 lakh+, and carry no Indian heritage content.
- The Rights of Persons with Disabilities Act, 2016 pushes accessibility of public and cultural spaces. Museums need a scalable way to comply.

---

## 3. The solution

### 3.1 What the user experiences
1. A blind visitor selects "Konark Sun Temple wheel" by voice or braille button.
2. In about 60–90 s, **576 pins rise to 8 different heights**, forming the wheel's relief: rim, 8 spokes, carvings.
3. As their finger moves, an overhead camera tracks the fingertip. When they **double-tap** a region, SPARSH narrates it in Hindi, English or a regional language: *"You are touching the hub. The spokes cast shadows that worked like a sundial…"*
4. Switch to a **Warli painting**, an **Ashokan Brahmi inscription** (feel the actual script shapes), the **Hampi site map** or a **Madhubani fish motif**. Same device.

### 3.2 Heritage content library (launch pack of 10)
Konark wheel · Sanchi gateway panel · Ajanta Padmapani outline · Khajuraho/temple relief panel · Warli dance circle · Madhubani fish · Ashokan Brahmi edict line · Devanagari/Tamil letter forms · Hampi site plan · Taj Mahal elevation.

### 3.3 Architecture

```
[Heritage source: 3D scan / photo / line art]
        │  (laptop / Pi 5 pipeline)
        ▼
 Depth/relief map → simplify → quantize to 8 heights → 24×24 pin map + region labels (audio)
        │  (serial/Wi-Fi)
        ▼
 ESP32 + 3× TMC2209 ──► XY gantry (under the pin bed) ──► Z-pusher sets each pin height
        │
        ├─► Lock-release servo (sliding lock plate: release all pins = reset by gravity)
        │
 Raspberry Pi 5 + overhead camera ──► fingertip tracking (MediaPipe Hands) ──► region lookup ──► audio narration (speaker)
```

### 3.4 Key mechanism (the engineering heart)
- **Pin bed:** 24 × 24 = **576 steel pins** (3 mm × 40 mm) at 6 mm pitch, giving a 14 × 14 cm active area. Two laser-cut acrylic guide plates hold them, with a **friction-lock layer** (silicone/EVA sheet) between them. A pin pushed up **stays at that height with zero power.**
- **Setter:** a gantry under the bed (built from 2020 extrusion with GT2 belts, or a re-used 3D-printer frame) moves a **Z-pusher** under each pin and pushes it to one of **8 heights (0–7 mm, ~1 mm steps)**. Only non-zero pins are visited, so a typical relief needs about 40–60% of pins. A 4-tip pusher head cuts refresh time about 4×.
- **Reset:** a servo slides the lock plate (the oval-hole shift-lock idea from the tactile-display patent literature), all pins drop by gravity, then it re-locks.
- **Closed-loop calibration:** the camera or a ToF sensor checks the pin field after setting. The system re-pushes mis-set pins and logs a height-accuracy metric (a great slide: *"98% pins within ±0.5 mm"*, once you've measured it).

### 3.5 What's genuinely new (be honest; judges respect it)
Prior art exists, so cite it:
- Plotter-style single-actuator pin setting (US patent 7009595)
- MagnePins (Monash, a DIY binary display)
- Single-actuator braille refresh research (SSSA Pisa)

All of these are **binary** displays (pin up or down) for braille or graphics. SPARSH adds four things:
1. **Multi-height relief:** 8 levels, so carvings feel like carvings, not dot outlines.
2. **Finger-aware narration:** touch becomes a guided story.
3. **A heritage-to-tactile content pipeline:** relief maps from 3D scans and line art, with region annotations in Indian languages.
4. **India-grade cost:** about ₹30k demo, under ₹50k product, against the ~₹21 lakh class of commercial displays.

---

## 4. Demo BOM (indicative, Robu.in / Amazon / local, recheck Oct 2026 prices)

| Item | Qty | ≈ ₹ |
|---|---|---|
| 2020 aluminium extrusion frame, linear rods/rails, GT2 belts & pulleys | set | 4,000 |
| NEMA17 steppers + TMC2209 drivers | 3 + 3 | 4,500 |
| Z-pusher (lead-screw + NEMA17 or 4× MG90S multi-tip head) | 1 | 1,200 |
| Steel pins 3 × 40 mm (or cut silver-steel rod) | 600 | 2,500 |
| Laser-cut acrylic guide plates + silicone/EVA lock sheet | 3 + 1 | 2,500 |
| MG996R servo (lock/reset slide) | 2 | 700 |
| ESP32 DevKit | 1 | 450 |
| Raspberry Pi 5 (4 GB) + Camera Module 3 | 1 + 1 | 8,500 |
| Speaker + PAM8403 amp, braille-labelled buttons | — | 800 |
| 12 V 10 A SMPS, limit switches, wiring | — | 1,500 |
| Enclosure, fixtures, misc | — | 2,500 |
| **Total** | | **≈ ₹29–32k** |

*Option to save about ₹8k: reuse a college 3D printer frame as the gantry for the idea-round proof-of-concept.*

---

## 5. Idea-submission round: proof of concept (2 weeks, before the PPT deadline)
1. Build an **8 × 8 pin bed** on top of any 3D printer or plotter, with one Z-pusher.
2. Video (2–3 min): the pusher sets pins to **three different heights** forming a small shape (a Konark spoke segment or the Brahmi letter "𑀅"). A hand is placed on it, and a laptop webcam plus MediaPipe triggers an audio line for the touched region.
3. That's your "we're not talking hawa-hawaai" proof. Put the full 24 × 24 version in the PPT as a Fusion 360 render.

---

## 6. 6-slide PPT content (official template order)
1. **Title & problem:** "Heritage is visual. Millions of blind Indians are locked out." Use NPCBVI data, the National Museum's static-replica galleries and the ₹21 L display cost.
2. **Proposed solution:** SPARSH, a refreshable multi-height pin relief plus touch-aware narration. Show a user-journey strip.
3. **Technical approach:** the architecture diagram (§3.3), the mechanism exploded view (Fusion 360) and the content pipeline.
4. **Feasibility & viability:** the BOM (~₹30k), the PoC video stills, risks and mitigations (§8), and a 10-week plan.
5. **Impact & benefits:** blind and low-vision visitors, blind schools (NIEPVD, state blind schools), museums (NCSM, National Museum, state museums), regional languages, and a library that grows with new ASI/3D-scan content.
6. **Research & references:** NPCBVI survey, National Museum galleries, Tactron/Graphiti cost, MagnePins, the US7009595 patent, pin-array literature, RPwD Act 2016.

---

## 7. 10-week build plan (6 people: 2 mech, 2 embedded, 1 vision/audio, 1 content/PPT)

| Week | Mechanical | Embedded | Vision / content |
|---|---|---|---|
| 1 | Pin, plate and lock-sheet tolerance tests (hole Ø, friction) | ESP32 + TMC2209 motion basics | Pick 10 heritage items; source scans/line art |
| 2 | 8×8 PoC bed; pusher tip design | Single-pin height control | Relief-map → pin-map script (Python) |
| 3 | **PoC video shot** | Height calibration routine | MediaPipe fingertip → region lookup |
| 4–5 | Full 24×24 bed, gantry frame | Path planning (visit only non-zero pins, nearest-neighbour order) | Audio narration recording (Hindi/English + 1 regional) |
| 6 | Lock/reset slide mechanism | Refresh-time optimisation (multi-tip head) | Region annotation tool |
| 7 | Enclosure, safety edges | Closed-loop pin verification | Library of 10 items done |
| 8 | Integration | Integration | User test with 3–5 blind users (contact a local blind school; record their feedback quotes) |
| 9–10 | Fixes, spares, backup bed | Demo script, timer rehearsals | Final PPT/video |

**The user test in week 8 is your secret weapon.** One quote from a blind student saying *"pehli baar Konark ka pahiya chhu ke samjha"* ("for the first time I understood Konark's wheel by touching it") beats any graph.

---

## 8. Risks and jury Q&A

| Question / risk | Answer |
|---|---|
| "Why not just 3D-print models?" | One print is one object: hours of work, fixed in one place, can't be updated. SPARSH holds an unlimited library, refreshes in about a minute and works in any language. |
| "Braille displays already exist." | They are binary, built for text/dots, and cost ₹20 L+. SPARSH does 8-level relief for art and architecture at ~₹30k. |
| "Refresh is slow." | You explore a relief for minutes, and the pins hold without power. Multi-tip head and sparse visiting get it to about 60–90 s. |
| Pins jam | Oval holes, compliant lock sheet, tolerance tests in week 1, spare pin bed. |
| Height drift | Closed-loop camera/ToF verification and auto re-push. |
| Finger tracking with pins in view | Top camera with a fingertip-landmark model, plus double-tap confirmation to avoid false triggers. |
| Hygiene | Steel pins and a sealed bed; wipeable surface. |

---

## 9. Scale-up story (roadmap slide)
Demo (24×24, ~₹30k) → museum unit (48×48, about 28 cm, ~₹1.5–2 L) → one in every NCSM science centre, National/state museum and blind school, with a content library via ASI/IGNCA scans → a classroom version for **STEM tactile graphics**: maps, geometry, charts. Funders: Ministry of Culture museum grants, Department of Empowerment of Persons with Disabilities (Accessible India), CSR, and school education budgets.

---

## Sources
- National Museum tactile galleries: [National Museum: For the Disabled](https://www.nationalmuseumindia.gov.in/en/for-the-disabled) · ["Heritage at My Fingertips" / Saksham (Tribune)](https://www.tribuneindia.com/news/business/redefining-inclusion-saksham-unveils-indias-first-accessible-cultural-gallery-and-immersive-sensory-dining-experiences/) · [Scroll: "Please touch"](https://scroll.in/magazine/1061436/please-touch-indian-art-is-finally-growing-sensitive-to-the-needs-of-the-visually-impaired)
- Blindness prevalence: [NPCBVI National Blindness & VI Survey 2015–19](https://npcbvi.mohfw.gov.in/writeReadData/mainlinkFile/File341.pdf) · [PMC9302795](https://pmc.ncbi.nlm.nih.gov/articles/PMC9302795)
- Cost of tactile displays: [Tactron abstract (Graphiti ~US$25k)](https://abstracts.societyforscience.org/Home/PrintPdf/25133)
- Prior art: [US7009595B2 plotter-style tactile array](https://patents.google.com/patent/US7009595) · [MagnePins (Monash)](https://www.monash.edu/it/hcc/embodied-visualisation/projects/magnepins) · [SSSA single-actuator display](https://www.iris.sssup.it/handle/11382/534062) · [Pin-array design/cost review (UCL)](https://discovery.ucl.ac.uk/id/eprint/10173339/) · [Stanford electrostatic adhesive brakes](https://shape.stanford.edu/research/ElectrostaticAdhesiveBrakes/electrostatic-adhesive-brakes.pdf)
