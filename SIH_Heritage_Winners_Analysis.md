# What Actually Wins in SIH Heritage & Culture (2022–2025), and a New Pick: SHILA-NAADI
### SIH 2026 · PS 26214 (AICTE Student Innovation · Heritage & Culture · Hardware) · Research date: 03 Oct 2026

---

## 0. Read this first: the deadline

- The portal snapshot of the SIH 2026 problem statements (scraped 3 Sept 2026) lists **"Deadline for Idea Submission: 30 September 2026"** for SIH26214. Public guides call it a hard deadline. **I found no extension.** Today is 3 Oct.
- **If your SPOC already submitted an idea for 26214:** the idea PPT is locked. Use this document to sharpen *that* idea for the national evaluation (Oct–Nov) and the finale (Dec). Switching to a brand-new idea is not possible on the portal.
- **If nothing was submitted:** SIH 2026 is closed for this PS. Everything below still applies to SIH 2027 and to other hardware competitions.
- **Confirm this with your SPOC today, before spending more time on new ideas.**

---

## 1. Where the data comes from (and what is missing)

| Source | What it gave | Reliability |
|---|---|---|
| Official SIH 2023 grand-finale result table (mirrored on GitHub by `DuanBoomer/Smart-India-Hackathon-Result-Analysis`, scraped from sih.gov.in) | All 275 winning teams: PS ID, team, college, prize | High |
| SIH 2023 PS list (GitHub `Wraient/SIH-2024-Problems`, actually the 2023 list) | Maps PS IDs to themes. **SIH1480 = Student Innovation · Heritage & Culture · Hardware**, the exact predecessor of 26214 | High |
| SIH 2026 PS scrape (GitHub `vedantchalke36/sih-2026-problem-statements`, `NIVION-HUB/SIH2026-PS`) | All 2026 PSs, deadlines, idea counts | High (snapshot of 3 Sept) |
| SIH 2025 PS lists (GitHub `vishnu-prasath15/SIH25-PS`) | 2025 heritage PSs | Medium |
| Winning decks archive (GitHub `JoysonBeera/sih-winning-presentations`, `Aadiii00/SIH-Winners-PPt-and-Sources`) | Two 2025 heritage decks (internal-round winners only), a third-party 2026 "playbook" | Medium |
| College news and press | Named heritage winners 2022–2025 | Medium |
| Competitor repos for 26214 / 26197 on GitHub | What other 2026 teams are building | High (for those teams) |

**Missing:** sih.gov.in itself is blocked from this environment, and **most heritage winners never publish their project details.** For 2024 and 2025 I could find team names but not what most of them built. The patterns below are drawn from what is verifiable; where I infer, I say so.

---

## 2. The competition math for PS 26214

| Fact | Evidence |
|---|---|
| 26214 is a re-run of an old PS. Same title, same theme, same category | SIH 2023 **SIH1480**: "Ideas that showcase the rich cultural heritage and traditions of India", Hardware, Heritage & Culture, AICTE MIC-Student Innovation |
| **Only one winner nationally** in 2023 (₹1,00,000) | SIH1480 winner: team "Innov_Sewage disposal machine", Sri Venkateshwaraa College of Engg. & Tech., Puducherry (nodal centre MIT-ADT Pune). The project details are not public; the team name suggests a sanitation machine, which would mean a practical machine won a "heritage" PS. *(Inference, not confirmed.)* |
| Other student-innovation hardware PSs in 2023 had **1 winner, or 2 joint winners at ₹50,000 each** | 2023 result table (e.g. Toys & Games HW: "THE DICE DEFENDERS 6.O"; Travel & Tourism HW: "AGRATAS") |
| Each 2026 PS accepts up to **500 ideas** | Portal metadata ("Submitted Ideas: x/500") |
| About **4–5 teams per PS** reach the finale | Public SIH 2026 guides |
| Prize in 2025: ₹1.5 lakh per winning team | 2025 winner press releases |

**What this means:** you are competing against up to ~500 teams for roughly 1 national win. A "good" idea is not enough. You need the one that a panel cannot ignore **and** that works live.

**2026 sibling PSs** (same open format, AICTE): 26197 Heritage & Culture (software), 26225 Toys & Games (hardware), 26221 Travel & Tourism (hardware). Ministry PSs in the theme: 26090 artisan market-linkage app (software), 26096 digital heritage archive (hardware, filed under Smart Education). A ministry PS 26020 (Khadi hand-spinning equipment, hardware) sits in Agriculture.

---

## 3. Heritage & culture winners I could verify

| Year | PS / organisation | Winner | What they built | Type |
|---|---|---|---|---|
| 2022 | Ministry of Culture: *Indoor navigation for museum* (48 proposals, 5 shortlisted) | Team Ventricles, Assam Kaziranga University (₹1 lakh) | Museum indoor navigation | SW + sensors |
| 2022 | Ministry of Culture: *virtual museum on turbans* | Team Master Chiefs (IIIT Hyderabad) | AR/VR "Turban Culture" app: try on turbans virtually | SW (AR/VR) |
| 2022 | Ministry of Culture (PS topic not published) | Linguistic Pandas, MAIT Delhi (₹1 lakh) | Not public | SW |
| 2022 | Indian Knowledge Systems: *OCR of temple inscriptions* | (teams like "Vigrah" attempted Ashokan Brahmi OCR; winner not confirmed) | Brahmi OCR | SW (AI) |
| 2023 | SIH1480 Student Innovation, Heritage (HW), the predecessor of 26214 | Innov_Sewage disposal machine, SVCET Puducherry (₹1 lakh) | Not public (see §2) | HW |
| 2023 | SIH1493 Student Innovation, Heritage (SW) | Team-Kavach, Thapar (₹1 lakh); Grand Line, KLE Tech (AWS prize ₹50k) | Not public | SW |
| 2023 | SIH1309 Ministry of Textiles (wool) | Team Vizion | KnitKraft: wool farm-to-fabric monitoring | SW |
| 2024 | Ministry of Culture SIH1648: *online chatbot ticketing for museums* | Winner not found | Very crowded PS (many teams built chatbots) | SW |
| 2025 | Heritage & Culture category, software finale at QISCET Ongole | Tattvaverse / Netaji Ninjas (₹1.5 lakh) | Not public | SW |
| 2025 | AICTE Travel & Tourism (HW) | Team Oblivion Overwatch, GLA University (₹1.5 lakh) | Not public | HW |
| 2025 | SIH25267 (hardware) | Caffeinated Coders, Lords Institute (₹1.5 lakh) | **Low-cost jute ribboning machine** | HW |
| 2025 internal | SIH25165 Temple crowd management (Gujarat) / SIH25061 Sikkim monasteries | NeXora / TechTrek (internal winners only) | YOLOv8 + FastAPI dashboard / 360° virtual tours | SW |
| 2026 | Handloom Hackathon (Ministry of Textiles) | Weaver Mithra (KLB IIHT), Sutradhar (IIT Madras) | Weaver back-support device; weaver-to-buyer market access | HW / SW |

---

## 4. What other 2026 teams are building for this PS (from GitHub)

| Repo | PS | What it is |
|---|---|---|
| SANJEEVAANI-PS26214-DHAROHAR | **26214** | Raspberry Pi photogrammetry turntable + oral history + "Digital Heritage Passport" |
| JEEVANT – Living India | 26197 | Artisan fair-trade marketplace platform |
| VIRASAT | 26197 | AI heritage discovery platform (FastAPI + React) |
| HERITA, BHARAT, Sanskriti, Roots & Radiance | 26197 / SIH | Heritage portals, virtual tours, quizzes, AI assistants |

**Crowded zones to avoid:** photogrammetry/3D archives, AR/VR tours, artisan marketplaces, heritage chatbots, crowd dashboards, LED/interactive walls, AI try-ons.

---

## 5. Seven patterns: what wins and what loses

1. **A real user with a documented pain beats a "showcase".** Every verified heritage win had a named stakeholder and a bounded ask (a museum that needs navigation, a ministry that wants a turban museum). Pitches like "promote culture" or "a platform for heritage" are the internal-round entries that reach nationals and then lose.
2. **In open hardware PSs, practical machines win, even under "heritage".** The 2023 SIH1480 winner's name suggests a sanitation machine (inference). In 2025 a low-cost jute ribboning machine won nationally. The Handloom Hackathon 2026 winners were a weaver back-support device and a market-access tool. Judges reward *usefulness you can see*.
3. **A working demo is the entry ticket.** The third-party 2026 playbook says it bluntly: "Presenting only slides, no working demo" gets teams eliminated internally, and "a well-scoped, boring-sounding idea with a working model will consistently beat a flashy idea with mock screens." The hardware finale is judged live.
4. **Measurable before/after.** Winning decks quote numbers: time saved, cost vs the existing tool, accuracy against a reference. A heritage idea needs a number a judge can check on the table.
5. **Software heritage ideas are a red ocean.** Most heritage entries (and all the 2026 competitor repos I found) are platforms, apps, AR and archives. A hardware idea that is *not* a camera, LED or AR wrapper stands out by default.
6. **Cost against the incumbent is a scored criterion.** Hardware rubrics score cost-efficiency. The strongest line is "we match a ₹X-lakh instrument within Y% for ₹Z thousand", measured, not claimed.
7. **Big, unverifiable claims hurt.** ANTAR-DRISHTI showed this: impressive physics that cannot produce a result within the judging window loses to a modest device that works.

---

## 6. Scorecard: all six ideas against the winning patterns

Each criterion is scored 1–5 (max 40). The scores are my honest judgement; I have tried not to favour the new idea.

| Criterion | LIPI-DRISHTI (reframed) | ANTAR-DRISHTI | NAAD-DHARA | SPARSH | BANDHA | **SHILA-NAADI (new)** |
|---|---|---|---|---|---|---|
| Real, documented pain + stakeholder | 4 | 3 | 4 | 4 | 3 | **4** |
| Live demo that works in minutes | 4 | 1 | 5 | 3 | 3 | **5** |
| Measurable number a judge can verify | 5 | 2 | 5 | 3 | 4 | **5** |
| Unique vs other 26214 teams | 4 | 5 | 5 | 4 | 5 | **5** |
| Hardware depth (not a camera/LED wrapper) | 3 | 5 | 3 | 5 | 4 | **4** |
| Feasible by Dec for a 6-person team | 4 | 1 | 3 | 2 | 2 | **3** |
| Cost vs incumbent | 4 | 2 | 4 | 3 | 4 | **5** |
| No ₹10 alternative already does it | 2 (oil + charcoal) | 4 | 3 (QR audio clip) | 3 (static replicas) | 4 | **4** |
| **Total / 40** | **30** | **23** | **32** | **27** | **29** | **35** |

---

## 7. The new pick: SHILA-NAADI (शिला-नाड़ी), pulse diagnosis for India's stone heritage

> **One line:** A ₹25–35k portable ultrasonic kit that **sees inside stone pillars, sculptures and blocks** (a cross-section image built from sound) and **checks the stone's health against its own musical note**, replacing the "tap it with a hammer and listen" check that is damaging the very monuments it inspects.

*Naadi-pareeksha* is the traditional Indian pulse diagnosis. SHILA-NAADI takes the pulse of stone.

### 7.1 Why this problem is real
- **Hampi's musical pillars:** ASI banned visitors from tapping the 56 pillars of the Vijaya Vittala temple in 2008, because tapping was damaging them. The official replacement is QR codes that play recordings.
- **Hampi keeps losing pillars:** after heavy rain, **8 of the 16 pillars** of the Saalu Mantapa near the Virupaksha temple fell (The News Minute, c. 2019). The pillars had started leaning *before* the rain, and similar damage happened in 2013 and 2015. In **May 2024 another portion of the Saalu Mantapa collapsed**. Reports said 3–4 more mantapas were "on the verge of falling", and that ASI restores in phases because it lacks **budget and skilled manpower**. That is exactly the gap a cheap, easy-to-use inspection kit fills.
- **How stone is checked today:** the quick field check is hammer-sounding (tap and listen), which is subjective and is itself repeated impact on fragile stone. Lab-grade **ultrasonic pulse velocity (UPV)** testers cost **₹75,000 to ₹9.15 lakh** in India (Proceq Pundit Lab ₹5.6–5.75 lakh; PL-200 ₹9.15 lakh). They also give **one number per path, not an image**.
- **Indian science already proved the physics at Hampi:** IGCAR's 2008 study (J. Acoust. Soc. Am.) used low-frequency ultrasonic testing and impact-echo on the musical pillars. It found an excellent match between the pillars' measured notes and flexural frequencies calculated from their dimensions and ultrasonic velocity.

**Hook for the jury:** *"For 500 years people tapped Hampi's pillars to hear them sing, and the tapping is what broke them. Today engineers still check a pillar by tapping it with a hammer. We replaced the hammer with a stopwatch accurate to 0.1 microseconds, and we can see inside the stone."*

### 7.2 How it works
1. **Ultrasonic pulse:** a custom high-voltage pulser (150–200 V spike) drives a piezo transducer pressed on the stone (through a conservation-safe couplant). A second transducer on the other side receives the pulse.
2. **Timing:** a low-noise receiver and fast ADC (or a TDC chip) time the first arrival to about 0.1 µs. Travel times are 50–100 µs for 30 cm of stone, so this is roughly 0.1–0.2% precision.
3. **Velocity and stiffness:** velocity = path / time. Velocity gives the stone's dynamic modulus. Weathered or cracked stone is slower.
4. **Cross-section image (tomography):** an 8–16 position fixture around a pillar or block measures dozens of crossing paths. A Python SIRT/ART reconstruction turns travel times into a velocity map. Voids and cracks show up as slow zones.
5. **The stone's voice (cultural cross-check):** from the measured modulus and the dimensions, beam theory predicts the stone's first flexural note. A gentle strike on a demo bar (never on a monument) is recorded with a contact mic and FFT. **Predicted vs measured note** is a live, two-instrument consistency check. A cracked bar both slows the ultrasound and lowers the note.
6. **Health card:** each scan produces a "pillar health card" (velocity map, anomaly flags, comparison with the last scan), which is what an ASI circle or temple administration would file.

### 7.3 Physics check (computed, demo scale)
| Quantity | Value |
|---|---|
| P-wave velocity | Granite ~4.5–5.5 km/s, sandstone ~2.5–4 km/s, concrete ~3.5–4.5 km/s |
| Travel time across 30 cm | ~55–120 µs |
| Extra delay caused by a 10 cm void at the centre of a 30 cm block | Path ~31.6 cm vs 30 cm → **+5.4%** (~3–4 µs in granite). At 5 MS/s sampling that is 15–20 samples, easily detected |
| Smallest void to expect | ~8–10 cm in a 30–40 cm section at 50–150 kHz (wavelength 3–10 cm; travel-time tomography blurs at the Fresnel-zone scale). Say this honestly |
| Example note prediction | Granite bar 600 × 60 × 30 mm, E ≈ 50 GPa, ρ ≈ 2,700 kg/m³ → bar velocity ≈ 4,300 m/s → **f₁ ≈ 369 Hz** (free-free Euler–Bernoulli). Poisson-ratio uncertainty gives about ±5%, so claim "within 5%", not exact |
| Damage demo | A saw notch at mid-span visibly lowers f₁ and lengthens travel time across the notch. Both are measurable live |

### 7.4 What already exists (cite it; do not hide it)
- **UPV testing** of concrete and stone (an established technique; Indian standard IS 13311 covers concrete).
- **IGCAR's 2008 Hampi pillar study** (ultrasonic velocity + impact-echo + flexural theory).
- **Ultrasonic tomography of heritage columns:** a reconfigurable research system tested on limestone columns of the Convent of Carmo, Lisbon (*Sensors*, 2022); masonry-pillar tomography studies in Europe.
- **Low-cost UPV prototypes** (academic papers; Arduino-based pulsers).
- **Open-source ultrasound boards:** un0rick (~$489) and lit3rick by kelu124.
- In India, sonic pulse-velocity tests have been used on the Qutb Minar, and CBRI/CEPT run heritage NDT projects.

**What SHILA-NAADI adds (say it exactly like this):**
1. **Field kit at ₹25–35k**, against ₹0.75–9 lakh UPV testers that give no image, and lab-only tomography rigs.
2. **Cross-section imaging plus a health card** designed for Indian pillars and sculptures, plus a repeat-scan comparison for monitoring.
3. **The stone's own voice as a second, independent check:** predicted vs measured note, rooted in India's own musical-pillar science.
4. **No impact on the stone:** it replaces hammer-sounding.

*It is not "first in the world". It is proven physics, made affordable and imaging-capable, for a documented Indian heritage failure.*

### 7.5 Demo for the jury (two "wow" moments, both checkable)
1. **Blind void test:** a faculty member casts 3 concrete/stone-dust blocks with foam voids at positions only they know, and seals the positions in an envelope. A judge picks a block. SHILA-NAADI scans it in ~5–10 minutes and shows the void. Open the envelope.
2. **The singing stone:** the device measures a granite bar with ultrasound and *announces* its note before anyone strikes it. The judge strikes it and the FFT agrees within a few percent. Then show the notched bar: the note drops and the health card turns amber.
3. **Accuracy slide:** "Our ₹30k kit vs the college civil lab's ₹5-lakh-class UPV tester: travel-time difference X% on granite, sandstone and concrete." Use your own measured numbers.

### 7.6 BOM (indicative; recheck prices)
| Item | ≈ ₹ |
|---|---|
| 2 contact ultrasonic transducers, 50–150 kHz (IndiaMART NDT class) **or** DIY PZT discs on wear plates | 2,000–15,000 |
| HV supply (12 V → 150–200 V boost module) + MOSFET pulser + gate driver | 1,500 |
| Receiver: protection, low-noise amplifier / VGA, band-pass filter | 1,500 |
| Digitiser/timing: STM32G4 board (multi-MS/s ADC) or TDC7200 breakout | 2,500 |
| Raspberry Pi 5 (or a laptop) for reconstruction + UI | 0–9,000 |
| 8–16 position fixture (aluminium extrusion, angle scale, spring holders) + HV-rated relay multiplexer (phase 2) | 5,000 |
| Couplant (water-based gel + cling-film barrier, or dry elastomer pads) | 500 |
| Specimens: granite/sandstone offcuts, concrete blocks with foam voids, granite bars | 4,000 |
| Contact piezo mic + MEMS mic for the tone check | 500 |
| Enclosure, battery, wiring, safety (HV interlock) | 2,500 |
| **Total** | **≈ ₹20–40k** (depends mainly on transducers) |

**Biggest de-risk:** almost every engineering college's **civil-engineering lab already owns a UPV tester.** Borrow it in week 1. It gives a reference instrument for your accuracy claim and lets you prove the tomography before your own electronics work.

### 7.7 Team and plan to the finale (≈10 weeks, gated)
Team of 6: 2 electronics (pulser/receiver, at least one ECE member), 1 firmware/timing, 1 reconstruction/ML (Python), 1 mechanical/specimens (fixture, casting), 1 pitch/outreach (ASI circle, state archaeology, INTACH contacts).

| Week | Work | Gate |
|---|---|---|
| 1 | Borrow the civil lab UPV; cast void blocks; buy stone offcuts; order parts | — |
| 2 | Manual 6×6-ray scan of a void block **with the borrowed UPV**; first Python tomogram | **G1: void visible in the right place? Yes means the physics is proven without our own hardware** |
| 3–4 | Own pulser + receiver + timing | **G2: our travel times within 2% of the lab UPV on 3 materials** |
| 4–5 | Tone module; modulus → note prediction | **G3: predicted note within 5% on 3 granite bars** |
| 5–6 | Fixture + 8-channel multiplexer; automated scan under 10 minutes | — |
| 7 | Damage experiments (notch, crack, weathered stone); blind void tests | **G4: blind localisation error under ~3 cm on 30 cm blocks** |
| 8 | Field trial on an old stone structure with permission (campus, local temple, or a state archaeology site) | — |
| 9 | Health-card UI, repeatability statistics, packaging | — |
| 10 | Rehearsal, backup data, video | — |

**Fallback if G2 fails:** finish with the borrowed lab UPV as the sensor. The tomography fixture, reconstruction, tone cross-check and health card are still your innovation, and the demo still works.

### 7.8 Risks, honestly
| Risk | Mitigation |
|---|---|
| Analog front-end noise / weak signals | Lab UPV fallback; averaging; band-pass filtering; open-source lit3rick design as reference |
| Couplant on heritage stone | Water-based gel over cling film, or dry elastomer pads; it is a one-time survey, not millions of taps |
| Carved, irregular pillar surfaces | Demo on regular specimens; in the field, measure transducer positions (tape + photo) and report relative anomalies |
| Layered stone is anisotropic (sandstone) | Calibrate per stone type; flag direction-dependent velocity |
| HV safety | 150–200 V at microamps, an interlock and an enclosure |
| "UPV already exists" | Agree, cite IGCAR and the Lisbon rig, then show the cost gap, the image and the voice cross-check |
| Team lacks analog skills | That is the gate at week 3–4; get an ECE faculty co-mentor early |

### 7.9 Jury Q&A
| Question | Answer |
|---|---|
| "Ultrasonic testing is old." | Yes. IGCAR used it at Hampi in 2008 and we cite them. A commercial UPV costs ₹0.75–9 lakh and gives one number per path. Ours costs ~₹30k, gives a cross-section image and a health card, and cross-checks with the stone's own note. |
| "Will you put gel on a monument?" | A conservation-safe couplant over a barrier film, once per survey. Today's alternative is repeated hammer impacts. |
| "Resolution?" | About 8–10 cm voids in 30–40 cm sections at our frequencies. Enough to find a hollow core or a deep crack before a pillar fails; we show the blind-test error. |
| "Why not GPR or thermography?" | GPR units are costly and struggle in some stone; IR thermography sees near-surface delamination. Ultrasound measures the full section and the stiffness directly. |
| "Is it hardware innovation?" | A custom high-voltage pulser, a low-noise receiver, sub-microsecond timing, a multi-transducer fixture and tomographic reconstruction, all built and validated by us against a lab instrument. |
| "Who will use it?" | ASI circles and state archaeology departments for condition surveys, conservation architects, INTACH chapters, and temple administrations that look after thousands of stone temples. |
| "Where is the culture?" | It protects India's stone heritage, and its second sensor is the science of India's singing pillars. |

---

## 8. If an idea was already submitted

- **LIPI-DRISHTI was submitted:** apply the fixes from the brutal review. Add the "oil + charcoal" baseline to the CER experiment, reframe as non-invasive recovery where oiling is not allowed or not safe, and cut OCR/TTS to "future scope".
- **NAAD-DHARA was submitted:** fold in §7.2 step 5 and §7.3. Measuring each slab's modulus with a borrowed UPV before cutting is exactly the NDT-driven tuning loop, and it upgrades the hardware story.
- **Something else was submitted:** keep its core, and borrow the patterns in §5. A named stakeholder, a live measurable demo, a "matched the ₹X-lakh instrument" number, and no unverifiable claims.

---

## Sources
- SIH 2023 official results (mirror): [DuanBoomer/Smart-India-Hackathon-Result-Analysis](https://github.com/DuanBoomer/Smart-India-Hackathon-Result-Analysis) · SIH 2023 PS list: [Wraient/SIH-2024-Problems](https://github.com/Wraient/SIH-2024-Problems)
- SIH 2026 PS scrape: [vedantchalke36/sih-2026-problem-statements](https://github.com/vedantchalke36/sih-2026-problem-statements) · [NIVION-HUB/SIH2026-PS](https://github.com/NIVION-HUB/SIH2026-PS) · SIH 2025 PSs: [vishnu-prasath15/SIH25-PS](https://github.com/vishnu-prasath15/SIH25-PS)
- Winning decks: [JoysonBeera/sih-winning-presentations](https://github.com/JoysonBeera/sih-winning-presentations) · [Aadiii00/SIH-Winners-PPt-and-Sources](https://github.com/Aadiii00/SIH-Winners-PPt-and-Sources)
- Timeline / deadline: [Reskilll: SIH 2026 timeline](https://reskilll.com/blogs/smart-india-hackathon-2026-launched-timeline-registration-how-to-participate/) · [FirstVidya SIH 2026 guide](https://firstvidya.com/sih-2026-guide/)
- 2022 heritage winners: [Kaziranga University: museum indoor navigation](https://kzu.ac.in/view/KU_team_wins_AICTE_SIH_2022_with_a_Prize_of_Rs_1_Lakhs/18005725898) · [IIIT Hyderabad: Turban Culture](https://blogs.iiit.ac.in/?p=13714) · [MAIT SIH page (Linguistic Pandas)](https://cse.mait.ac.in/index.php/hackathon/sih) · [Brahmi inscription OCR (Medium)](https://srinidhithinks.medium.com/histoinformatics-in-india-epigraphy-d3c7c2fd59b0)
- 2024 museum chatbot PS: [Engineers Planet: SIH1648](https://engineersplanet.com/abstracts/online-chatbot-based-ticketing-system/amp/)
- 2025 winners: [Lords Institute: jute ribboning machine](https://www.lords.ac.in/smart-india-hackathon-2025-winners/) · [ZCOER: Tattvaverse / Netaji Ninjas](https://zcoer.in/?p=56636) · [Odisha Plus: GLA Oblivion Overwatch](https://odisha.plus/2025/12/manipal-university-jaipur-smart-india-hackathon-2025-hardware/) · [Handloom Hackathon 2026](https://www.indiasnews.net/news/279241286/handloom-hackathon-2026-concludes-with-breakthrough-innovations-to-modernize-india-usd-5-billion-handloom-industry)
- Competitors: [DHAROHAR (26214)](https://github.com/rupesh0411/SANJEEVAANI-PS26214-DHAROHAR) · [JEEVANT (26197)](https://github.com/shivam-thakur11/SIH2026197-JEEVANT-LIVING-INDIA) · [VIRASAT (26197)](https://github.com/Abhixzane/virasat-sih26197)
- Hampi: [Outlook Traveller: tapping ban + QR codes](https://www.outlooktraveller.com/News/now-you-can-listen-to-hampis-musical-pillars-with-a-simple-qr-code-scan) · [Deccan Herald: Saalu Mantapa collapse (2024)](https://www.deccanherald.com/amp/story/india%2Fkarnataka%2Fportion-of-salu-mantapa-at-hampi-collapses-3033650) · [Vision IAS: Virupaksha collapse, 27 May 2024](https://visionias.in/current-affairs/news-today/2024-05-27/culture/a-portion-of-hampis-virupaksha-temple-in-karnataka-collapsed) · [The News Minute: 8 of 16 pillars fell](https://www.thenewsminute.com/karnataka/heavy-rains-cause-partial-collapse-hampi-heritage-structure-110517) · [IGCAR Hampi NDT study (IAS repository)](https://repository.ias.ac.in/91296)
- Prior art: [Ultrasonic tomography system for heritage columns (Sensors 2022, PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9460912/) · [Masonry pillar ultrasonic tomography (Gdańsk)](https://pub.pg.edu.pl/pl/publication/147609/non-destructive-assessment-of-masonry-pillars-using-ultrasonic-tomography) · [un0rick](https://github.com/kelu124/un0rick/) · [lit3rick](https://github.com/kelu124/lit3rick) · [Low-cost UPV (BAM, Inventions)](https://opus4.kobv.de/opus4-bam/files/54675/inventions-06-00036-v2.pdf) · [Qutb Minar investigations](https://oasisbr.ibict.br/vufind/Record/RCAP_f625332cb98ee5c7da3536e34c60f580) · [CEPT CRDF non-invasive testing](https://crdf.org.in/project/non-invasive-testing-methods-for-historic-buildings)
- UPV prices: [IndiaMART UPV testers](https://dir.indiamart.com/delhi/ultrasonic-pulse-velocity-tester.html)
