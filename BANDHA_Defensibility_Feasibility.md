# BANDHA-YANTRA: Defensibility, 10-Week Feasibility, and How Past Winners Submitted
Research notes, 03 Oct 2026. PS 26214 (same open statement as SIH1538 in 2024 and SIH25113 in 2025).

---

## A. Defensibility (prior-art check)

### What already exists (we must not claim these)
| Prior art | What it does | Impact on our claim |
|---|---|---|
| **DigiBunai** (Digital India Corp., open source, Ministry-backed) | Textile CAD with customised graphs per loom parameters, colour reduction, repeats/mirroring, and a stated **"provision to create IKAT designs"** | ⚠️ "Photo → ikat design graph" is **not** novel on its own. Software-only ikat design exists. |
| **Arahne CAD** (commercial) | Simulates ikat's feathered/blurred edges in fabric previews | ⚠️ An ikat *look* preview is not novel. |
| **Laxmi Asu Machine** (C. Mallesham; NIF/DST; Padma Shri) | Automates asu **winding** for Pochampally | Different step. It is our "hook" story, not competition. |
| **Auto-Ikat-Group-Former (AIGF)**, CET Bhubaneswar, 2011, for the Odisha Directorate of Textiles; "under patent examination", not commercialised | Mechanical device that forms tying groups for rectangular ikat frames (Nuapatna/Bargarh) | Different step (grouping), but it is **prior hardware in ikat prep**. Cite it, and read the paper before claiming anything near "tying automation". |
| Microsoft digital centre at Pochampally (CSR) | Trains weavers on design software and online sales | Confirms the design step is already partly digital. |
| AR craft guidance research (WeavAR bead-weaving, Dalhousie AR-handcraft) | Head-worn or projected guidance for crafts | Generic "AR guidance for crafts" is not novel. |

### What still looks novel (claim it narrowly)
In my searches I found **no** system that does the following. *Run a formal Google Patents + InPASS (Indian patent) search before submission.*

1. **Projection-guided tie marking directly on stretched yarn**, with **camera re-registration** as the yarn shifts or stretches. This replaces the charcoal-thread grid that is still used in Patan and Pochampally.
2. **An empirically measured dye-bleed model.** Bleed in mm as a function of tie tightness × dye time × fibre, used to *compensate* tie positions and to *predict* the woven result.
3. **Closed-loop validation:** photograph the woven cloth and compare it to the prediction, then update the model.

### Reframe the pitch (this is the key change)
- ❌ Old pitch: "Photo-to-ikat software." A judge from the Ministry of Textiles side may say "DigiBunai already does ikat designs."
- ✅ **New pitch:** *"Design software already exists: DigiBunai, the government's own tool. What's missing is the bridge from the screen to the artisan's hands. Marking is still done with charcoal thread, errors are found only after weaving, and nobody can predict bleed. BANDHA-YANTRA is that bridge: projection-guided tying on real yarn, a measured bleed model, and verified output."*
- **Import DigiBunai graphs as an input format.** You turn the obvious objection into a strength, and Ministry judges like reuse of government open-source tools. *Verify DigiBunai's export formats first.*

### Strengthen the "hardware" part (so it is not "just a projector")
- **Motorised, tensioned tying frame:** a stepper indexes bundle groups under the projection zone.
- **Load cells on the tension bars (HX711):** yarn stretch changes tie positions, so measure it and correct for it.
- **ESP32 control panel:** foot pedal, stage/colour-bath indicator, tie counter.
- **Stretch goal:** a semi-automatic wrapping head for one bundle. Present it as a prototype only. It is the AIGF/Asu lineage, so cite both.

**Defensibility verdict: medium, defensible as system novelty.** The algorithm alone is weak. The hardware loop (projection + tracking + measured bleed + verification) is where the novelty lies. Say exactly that on the slide, with a prior-art comparison table. Judges reward honesty far more than being caught out on a claim.

---

## B. Feasibility in 10 weeks

### Skill reality check
- **Warp ikat on a rigid-heddle loom** is an established hobby and workshop technique. Workshops teach it with Procion MX cold fibre-reactive dye on cotton: stretch, wrap, dye, unwrap, weave. Learnable in about a week of practice.
- **Projector–camera calibration on a near-planar yarn sheet** is a standard OpenCV homography plus marker tracking. About 1 week for someone who knows Python.
- **Optional field visit:** Pochampally (Telangana) or Nuapatna (Odisha). Weavers' Service Centres (Ministry of Textiles) run short training courses, and design schools take students to Pochampally. One weaver interview is enough.

### Critical path and go/no-go gates
| Week | Deliverable | **Gate** |
|---|---|---|
| 1 | Buy loom, yarn, Procion MX dye kit, projector. Weave one plain sample. Image → bundle-grid script. | — |
| 2 | Hand-tie and dye one 2-colour warp; weave a 10×10 cm swatch. | **G1: is the motif recognisable? If not after 2 attempts → switch to NAAD-DHARA (backup).** |
| 3 | Projector marks tie zones on the frame; **PoC video for the idea round**. | **G2: marking error ≤ 2 mm** |
| 4 | Bleed experiment: 3 tie tightnesses × 2 dye times × 2 repeats = 12 mini-samples. | — |
| 5 | Fit the bleed model; compensation + preview renderer. | **G3: preview vs real swatch similarity score is measurable** |
| 6 | Camera re-registration; load-cell tension compensation; ESP32 panel. | — |
| 7 | Motorised indexing frame; tie counter; colour-stage guidance. | — |
| 8 | **Hero sample** (Konark wheel / Warli motif, ~20×20 cm) made fully with the system; weaver interview. | **G4: hero sample matches preview** |
| 9 | Measure the metrics: marking time vs charcoal-grid method, error rate, similarity score. | — |
| 10 | Rehearse, make backup samples, record video. | — |

**Biggest schedule risk:** each dye-and-weave cycle takes 2–3 days. Run the physical track (2 people) in parallel with the software and hardware tracks from day 1.

**Budget:** about ₹35k (see `BANDHA_Ikat_Solution.md`). Add about ₹2k for HX711 + load cells.

**Feasibility verdict: about 7/10.** It is doable, but it depends on 2 team members committing to the craft track. Gate G1 in week 2 limits the risk: by then you either have a woven motif or you switch.

---

## C. How past winners of this exact PS submitted

### The PS lineage
| Year | PS ID | Title |
|---|---|---|
| 2024 | **SIH1538** | Student Innovation – ideas that showcase the rich cultural heritage and traditions of India (Hardware) |
| 2025 | **SIH25113** | same |
| 2026 | **SIH26214** | same |

### Who won (what I could verify)
- **2024 (SIH1538):** **"Globe Preventers 24"**, Sri Sai Ram Institute of Technology, Chennai: Winner, ₹1,00,000. **The project content is not publicly documented** in any source I could reach. A shortlisted team was **"HeriTex"** (R.M.K. College of Engineering & Technology); the name suggests heritage textiles, which would be our closest prior entrant.
- **2025 (SIH25113):** the Google AI answer says **RVCE-26** (RV College of Engineering) won with a "smart yoga dress". **I could not verify the project** from any reachable source. The "exact PPT/video" text in that answer was AI-invented (it said the decks are confidential, then wrote one anyway). Check RVCE's or the team's LinkedIn post directly.
- **No winning idea deck for this PS is public.** The official winner list (sih.gov.in) and college PDFs were blocked from my environment, so open them yourself: sih.gov.in → SIH 2024/2025 → Grand Finale Results, filtered to AICTE / MIC-Student Innovation / Heritage & Culture.

### What real SIH idea decks look like (actual winner PDFs, other PSs)
I opened 6 winner idea decks from a public GitHub repo (2023–2025, other PSs). *Caution: that repo funnels to a paid "winners vault"; treat it as examples, not gospel.*
- **Exactly 6 slides.** Slide 1: PS ID, PS title, theme, PS category, team ID, team name.
- Slide 2: **Proposed Solution**, bullet points plus one architecture diagram.
- Slide 3: **Technical Approach**, tech stack and logos plus a flowchart.
- Slides 4–6: **Feasibility & Viability**, **Impact & Benefits**, **Research & References**.
- **Design quality is plain:** dense bullets, basic diagrams, logo collages. The bar at screening is *clarity + template compliance + plausibility*, not polish.

### Official 2026 format (from guides summarising the 2026 template; confirm on the portal)
- Max **6 slides including the title**. Use the **provided template** without changing its section pointers. Submit as **PDF**.
- Use points, diagrams and pictures, not paragraphs.
- Slide 3 explicitly allows "flow charts / images / **working prototype**".

### How to beat the plain-deck baseline (our edge)
1. **Slide 3: a real photo of the PoC.** The projector marking yarn plus a woven swatch. Most decks show only logos.
2. **One measured graph.** Bleed (mm) vs tie tightness. Real data in an idea round is rare.
3. **A prior-art table on slide 2 or 4:** DigiBunai / Arahne / Asu machine / AIGF vs BANDHA, with ✓/✗ columns. It shows judges you have done the homework.
4. **A before/after metric:** "charcoal-grid marking: X min → projection: Y min" (from your PoC timing).
5. Keep text scannable: one sentence per bullet, maximum about 6 bullets per slide.

---

## Sources
- DigiBunai: [Vikaspedia](https://en.vikaspedia.in/viewcontent/social-welfare/entrepreneurship/indian-handloom/digibunai™-computer-aided-textile-designing-for-weaving) · [OpenForge](https://openforge.gov.in/projects/digibunai) · [DigiBunai Artwork Designer](https://digibunai.dic.gov.in/index.php/products/bunai)
- Arahne ikat simulation: [Arahne tutorial](https://www.arahne.si/tutorials/embelish-your-fabric-simulating-various-effects/)
- AIGF / ikat technology review: [An insight into the ikat technology in India (ResearchGate)](https://www.researchgate.net/publication/331096059_An_insight_into_the_ikat_technology_in_India_ancient_to_modern_era)
- Asu machine: [NIF](https://nif.org.in/innovation/laxmi-asu-making-machine-for-pochampally-sarees/748) · [DST](https://dst.gov.in/node/6035)
- Pochampally digital centre: [The Week](https://www.theweek.in/news/biz-tech/pochampally-handloom-weaving-telangana-digitalised.html) · [India CSR](https://indiacsr.in/microsoft-and-telangana-govt-to-enable-digitization-of-handloom-ecosystem/)
- Warp ikat workshops (feasibility): [MMAWG Zicafoose workshop](https://mmawg.org/docs/2024ZicafooseWorkshop.pdf) · [Dye your own warps (rigid heddle)](https://create.bainbridgebarn.org/AssnFe/ev.asp?ID=5272270)
- Weavers' Service Centres / cluster visits: [IIS Univ WSC visit](https://fashiontextile.iisuniv.ac.in/node/2184) · [FDDI Pochampally visit](https://fddiindia.com/News1001c)
- AR craft research: [Dalhousie GEM lab](https://gem.cs.dal.ca/publications/?tgid=16) · [Cambridge repository](https://www.repository.cam.ac.uk/handle/1810/277479)
- Winners: [SIH 2024 Grand Finale results](https://www.sih.gov.in/sih2024/sih2024-grand-finale-result) · [Sairam: Globe Preventers 24](https://sairam.edu.in/extraordinary-victory-at-smart-india-hackathon-2024/) · [SIH 2024 screening result](https://sih.gov.in/sih2024/screeningresult)
- Winner deck examples: [Aadiii00/SIH-Winners-PPt-and-Sources](https://github.com/Aadiii00/SIH-Winners-PPt-and-Sources)
- 2026 template: [Reskilll: SIH 2026 PPT template](https://blogs.reskilll.com/sih-2026-ppt-template-exact-format-slides-evaluators-score/) · [SlideShare 2026 template](https://www.slideshare.net/slideshow/innovative-smart-india-hackathon-2026-idea-submission-template-for-software-hardware-solutions/289256695)
