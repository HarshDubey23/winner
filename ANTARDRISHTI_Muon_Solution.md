# ANTAR-DRISHTI: Seeing Inside India's Monuments with Cosmic Rays
### SIH 2026 · PS 26214 (AICTE Student Innovation · Heritage & Culture · Hardware), the "revolutionary hardware" option

> **One line:** A student-built, low-cost **muon telescope** that uses free, natural cosmic-ray muons, falling on every square cm of Earth about once a minute, to "X-ray" monuments **without drilling, touching or any radiation source**. It finds hidden chambers, voids, cracks and density changes inside stupas, shikharas, fort walls and statues.
> This is the same physics that discovered the **hidden corridor in Egypt's Great Pyramid** (ScanPyramids, 2017/2023). **I found no published muography of an Indian monument.**

---

## 0. Why this counts as "revolutionary" (and the honest trade-off)

| | LIPI-DRISHTI (manuscripts) | **ANTAR-DRISHTI (muography)** |
|---|---|---|
| Is the *hardware itself* new to students and judges? | No (LEDs, camera) | **Yes: a particle detector.** Scintillators, SiPMs, coincidence electronics, tracking |
| "Has anyone in India done this on heritage?" | Partly (imported MSI systems) | **Not found.** Indian groups are only starting muography detector R&D (Thick-GEM, 2026 preprint) |
| Jury wow | High | **Very high:** "Pyramid-discovery technology, built by students for ₹~70k" |
| Research frontier | Mature | **Open problem:** muography of *medium-sized* heritage objects (statues, walls) is called "under-explored" in the 2024–25 literature |
| Risk in 10 weeks | Low–medium | **Medium–high:** imports (SiPMs), long data runs, physics skills |

**Bottom line:** if you want something nobody else in the PS 26214 pool will have, this is it. If you want the safest path to a working demo, LIPI-DRISHTI remains safer.

---

## 1. The problem (slide 1)
- India's monuments hide unknown interiors: solid stupas, temple shikharas, fort walls, sealed chambers. **Looking inside means drilling (forbidden) or radar.**
- **Real example:** in 2024 the ASI, with CSIR-NGRI, ran a **ground-penetrating radar (GPR)** survey of Puri Jagannath temple's Ratna Bhandar to check for hidden chambers. GPR works, but it needs surface contact, has **limited depth in thick masonry**, and is hard to interpret.
- Muography sees through **tens of metres of stone**, needs **no contact**, **no radiation source**, and can also **monitor slow density changes** (cracks, water ingress, settlement) over months. A Japanese–Indonesian group used muon monitoring for seismic evaluation of the **Prambanan** World Heritage temple after the 2006 earthquake.
- **Commercial muography systems are research-lab-only and very expensive.** India has world-class cosmic-ray expertise (TIFR's GRAPES-3 muon telescope at Ooty) but no heritage muography programme.

**Hook:** *"The universe sends us free X-rays every second. We built the camera."*

---

## 2. The solution

### 2.1 Detector (demo scale)
- **Two (or three) tracking planes**, each with **4 + 4 crossed scintillator strips** (X and Y, about 20 × 5 × 1 cm). That gives a 4×4 pixel per plane, and with 2 planes about **16×16 = 256 direction bins**, rebinned to 8×8 for statistics.
- Each strip is read by a **silicon photomultiplier (SiPM)**: 16–24 channels total, using **CosmicWatch v3X** open-source front-end ideas (SiPM bias, amplifier, peak detector).
- **Coincidence + timing:** an FPGA (Tang Nano / iCE40, cheap) or RP2040 PIO latches which strips fired within about 100 ns. That gives a **muon track direction**.
- **Raspberry Pi 5:** logging, live track display, angular flux maps, transmission/density maps, temperature/pressure correction (BME280, because muon rate varies with air pressure).
- **Battery + weatherproof case + tilt mount:** point it at a wall, a stupa or the sky.

### 2.2 Imaging principle
1. **Open-sky run:** measure the muon flux per direction (reference).
2. **Target run:** the same directions through the object.
3. **Transmission ratio** per direction gives integrated density along each line (**opacity map**).
4. **Anomalies** (lower density = void/chamber, higher = dense core/metal) appear as bright or dark spots.
5. **Two or more viewpoints** give a coarse 3D localisation.

### 2.3 Realistic numbers (computed, sea level)
- Vertical muon intensity is about 70 m⁻² s⁻¹ sr⁻¹. Two 20×20 cm planes 30 cm apart have an acceptance of about 178 cm²·sr, which gives **~1.2 muons/s ≈ 4,500 per hour** looking up.
- With 64 direction bins: about **70 muons per bin per hour**.
  - To see a **5% density contrast at 3σ**, you need about 3,600 events per bin, which takes **~2 days** per image.
  - To see a **~20% contrast** (dense block or large void), it takes **~3–4 hours**.
- Near-horizontal directions have far fewer muons (∝cos²θ), so **plan long runs and pre-record them**. Show live tracks at the demo and the multi-day images as results.

### 2.4 Simulation for full scale (the PPT "vision" slide)
- **Geant4** (or the faster **CRY cosmic-ray generator + simple ray-tracing**) simulates muography of a **real Indian structure model**: a stupa dome (Sanchi-like), a temple shikhara, or a fort wall with a hypothetical hidden chamber.
- Output: *"With a 1 m² detector, a 3 m chamber inside a 20 m stupa becomes visible in N days."* This is what turns a tabletop demo into a national-scale proposal.

---

## 3. Demo (what judges see)
1. **Live:** a screen showing muon tracks arriving in real time ("each line is a particle from space, born about 15 km up").
2. **Hidden-object challenge:** a closed box or table hides a dense mass (steel weights / water containers / concrete blocks) in one region. The pre-recorded overnight run shows the **"shadow" exactly where the mass is**. Then reveal it.
3. **Building scan:** results from pointing the detector through college building floors or a stairwell/water tank (multi-day run), showing the structure's density map.
4. **Vision:** a Geant4 simulation of a stupa with a hidden chamber, and a roadmap to a 1 m² detector with ASI/IGNCA/TIFR.

---

## 4. BOM (indicative; **order SiPMs and scintillator in week 1 because of import lead times**)

| Item | Qty | ≈ ₹ |
|---|---|---|
| Plastic scintillator strips (~20×5×1 cm) or bars to cut (EJ-200 class or low-cost import) | 16–24 | 15,000–25,000 |
| SiPMs (e.g., 6 mm onsemi MicroFC-class) | 16–24 | 25,000–40,000 |
| SiPM bias boost converter + amplifier/peak-detector PCBs (CosmicWatch-derived, JLCPCB) | 1 set | 5,000 |
| FPGA board (Tang Nano 9K / iCEBreaker) or RP2040 boards | 1–2 | 2,500 |
| Raspberry Pi 5 + SD + display | 1 | 10,000 |
| Light-tight wrapping (Tyvek, black tape), optical grease, 3D-printed holders, aluminium frame | — | 4,000 |
| BME280, battery pack, case, tilt mount | — | 4,000 |
| **Total** | | **≈ ₹65–90k** |

**Cost-cutting / mentorship:** email TIFR (GRAPES-3/INO), IISER, IIT physics departments, or a local university HEP group. Labs often have **spare scintillator and SiPMs** and may co-mentor. A national-lab mentor letter is itself a strong slide.

---

## 5. 10-week plan with gates (6 people: 2 detector/analog, 1 FPGA/firmware, 1 DAQ/software, 1 simulation, 1 PPT/outreach)

| Week | Work | **Gate** |
|---|---|---|
| 1 | Order SiPMs/scintillator (or borrow); build **one CosmicWatch-style single detector** from available parts; start Geant4/CRY setup | — |
| 2 | Single detector counting muons; **two-detector coincidence** (stacked) | **G1: coincidence rate ≈ expected (~1/min per 25 cm² class); idea-round PoC video** |
| 3–4 | Strip planes assembled, light-tight, SiPM gain matched | **G2: all channels alive, noise-free** |
| 5 | FPGA coincidence + track reconstruction; live track display | **G3: angular distribution follows cos²θ (physics validation slide)** |
| 6 | Open-sky reference run (24–48 h) with pressure correction | — |
| 7 | Hidden-mass experiment runs (overnight ×3) | **G4: shadow visible at the correct position** |
| 8 | Building/stairwell scan (multi-day); stupa simulation results | — |
| 9 | Packaging, battery field mode, final analysis plots | — |
| 10 | Demo rehearsal, backup recorded data, video | — |

**Fallback if G1/G2 fail (parts don't arrive):** single-pixel CosmicWatch pairs still give **zenith-angle flux scans**, i.e. 1D muography: tilt the pair, measure the shadow of a building. That is still a valid, demo-able result.

**Feasibility: about 6/10.** The physics and open-source designs are proven (high-school students build CosmicWatch). The risks are logistics (imports), long acquisition times and analog skills. The gates make the risk visible early.

---

## 6. 6-slide PPT content
1. **Problem:** hidden interiors of monuments; drilling is forbidden; GPR is limited (Ratna Bhandar 2024 example); no Indian heritage muography.
2. **Solution:** ANTAR-DRISHTI, a portable low-cost muon telescope. Include a ScanPyramids reference image and our detector render.
3. **Technical approach:** scintillator + SiPM planes, FPGA coincidence, track reconstruction, transmission maps, Geant4 simulation; PoC coincidence-count photo.
4. **Feasibility:** BOM ₹65–90k, rate calculations (§2.3), gates, fallback, national-lab mentorship.
5. **Impact:** ASI non-invasive surveys, structural health monitoring of temples in seismic zones, discovery of unknown chambers (public excitement plus heritage tourism), and a science-outreach version for museums (a "cosmic ray counter" exhibit).
6. **References:** CosmicWatch papers, ScanPyramids (Nature 2017), the "Muons for cultural heritage" review, the "Cosmic rays for imaging cultural heritage objects" paper, Prambanan muon study, Indian Thick-GEM muography preprint, GRAPES-3.

---

## 7. Jury Q&A
| Question | Answer |
|---|---|
| "Is it safe?" | Fully passive. We only *count* natural muons. No radiation source, no contact. |
| "Too slow?" | Monuments don't move. Hours to days per image is normal in muography, and it enables long-term monitoring that radar cannot do. |
| "Resolution?" | Demo: about 10° angular bins. It scales with detector area and distance. The simulation slide shows full-scale resolution. |
| "Why not GPR?" | Complementary. GPR is shallow and needs contact; muography sees through tens of metres with no contact. |
| "Has it been done?" | Yes, abroad (Pyramids, Prambanan, volcanoes). **Not on Indian monuments that we could find**, and not with a student-built low-cost system in India. |

---

## Sources
- CosmicWatch: [v3X paper (arXiv 2508.12111)](https://arxiv.org/html/2508.12111v2) · [original (arXiv 1801.03029)](https://arxiv.org/pdf/1801.03029) · [AAPT advanced labs wiki](https://advlabs.aapt.org/wiki/Cosmic_Watch_Muon_Detectors)
- Muography for heritage: [Muons for cultural heritage (arXiv 2309.08394)](https://arxiv.org/pdf/2309.08394) · [Cosmic rays for imaging cultural heritage objects (arXiv 2405.10417)](https://arxiv.org/pdf/2405.10417) · [Toward using cosmic rays to image CH objects (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11952855/) · [Europhysics News 2025](https://www.europhysicsnews.org/articles/epn/pdf/2025/04/epn2025564p19.pdf) · [Student-built muography (Muographix interview)](https://news.muographix.u-tokyo.ac.jp/?p=1263)
- Prambanan muon study: [ITAM record](https://invenio.itam.cas.cz/record/18701)
- India: [Thick-GEM detectors fabricated in India for muography (arXiv 2606.08664)](https://arxiv.org/pdf/2606.08664) · [GRAPES-3](https://en.wikipedia.org/wiki/GRAPES-3)
- Ratna Bhandar GPR survey: [The Week](https://www.theweek.in/wire-updates/national/2025/07/29/cal22-od-asi-temple.html) · [Organiser (ASI + NGRI GPR)](https://organiser.org/2024/09/22/257190/bharat/odisha-asi-begins-second-round-of-technical-survey-of-the-ratna-bhandar-of-shree-jagannath-mandir-in-puri/amp/) · [Odisha Plus](https://odisha.plus/2024/11/odisha-government-clarifies-that-no-secret-chambers-inside-puri-temple/)
