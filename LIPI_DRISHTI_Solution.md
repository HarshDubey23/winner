# LIPI-DRISHTI: Reading India's Invisible Manuscripts
### SIH 2026 · PS 26214 (AICTE Student Innovation · Heritage & Culture · Hardware), new direction

> **One line:** A field-portable, ₹35k open-hardware light dome that makes **faded, unreadable palm-leaf manuscripts readable again**. It captures each leaf under dozens of light angles *and* UV/visible/infrared wavelengths, fuses the "carved groove" signal with the "ink" signal, and an on-device AI enhances, transcribes and reads the recovered text aloud. Built for the Government's new **Gyan Bharatam Mission** (1 crore+ manuscripts).

---

## 0. How I found it: open-source tech scan → heritage problem

The goal was to find what open-source developers and researchers are building now and which of it solves a real *hardware* heritage problem in India.

| Open-source / trending tech | What developers use it for | Heritage problem it could solve | Verdict |
|---|---|---|---|
| **MISHA**: RIT's open-source low-cost multispectral imager (launched 2024) | Revealing faded ink and undertext in libraries (Library of Congress, BnF…) | Faded Indian manuscripts | ✅ **Core of the pick** |
| **Open RTI domes** (SimpleRTIDome ~€200, GWU Arduino dome, HASOR) | Relighting surfaces to read incised inscriptions, coins, tablets | Palm leaves are **incised with a stylus**, so the groove survives after the ink fades | ✅ **Core of the pick** |
| Open Indic palm-leaf datasets (Malayalam HMPLMD, Tamil, Balinese) + OCR models | Character recognition on palm leaves | Transcribing recovered text | ✅ AI layer |
| LeRobot SO-101 open-source arm (Hugging Face) | Imitation learning from human demos | "Robot apprentice" that records a master artisan's hand skill | ⚠️ Fun, but robot calligraphy/painting is already common in research. Lower novelty. |
| Gaussian splatting / photogrammetry | 3D digital twins | 3D-scanning artifacts | ❌ Crowded. A PS 26214 team (DHAROHAR) already does photogrammetry. |
| BME688 AI gas sensor (e-nose) | Smell classification | Detecting fake Kannauj attar (a GI product) | ⚠️ Niche, weak demo |
| mmWave radar / GPR | Seeing through walls | Hidden voids in monuments | ❌ Too costly/hard for 10 weeks |

**Why this combination:** each piece exists separately. **Combining stylus-groove imaging (RTI) and ink imaging (multispectral) into one cheap, portable device for Indian palm leaves, with Indic AI on top,** is what I did not find anywhere.

---

## 1. The problem (slide 1)

- India's knowledge heritage is in manuscripts. The Government's **Gyan Bharatam Mission** (Union Budget 2025-26; Ministry of Culture; total outlay **₹482.85 crore**) aims to **survey, document, conserve and digitise over 1 crore manuscripts**, and explicitly calls for **AI and 3D imaging**.
- A huge share are **palm-leaf manuscripts**: organic, eaten by humidity, fungus and insects, often recopied every few centuries. Odisha State Museum alone holds **50,000+**.
- **The writing is vanishing.** Palm-leaf text was **scratched in with a metal stylus, then blackened with lampblack**. When the black fades, the leaf looks blank, **but the carved grooves are still there.**
- Today's fix is expensive imported multispectral systems (Bengaluru's Tara Prakashana uses a MegaVision system). Fully integrated multi-light + multispectral domes cost **$20,000+**. Survey teams in villages, mathas and temples cannot carry them.

**Hook for the jury:** *"The ink is gone, but the letters are still carved in the leaf. We read the carving with light."*

---

## 2. The solution

### 2.1 What happens in the demo
1. A leaf that looks **blank or faded** is placed under the dome.
2. In about 60–90 s the dome flashes **~32 light angles** (raking to overhead) and **6–7 wavelengths** (UV 365 nm, blue, green, red, 850 nm, 940 nm NIR). A monochrome-sensitive camera captures each one.
3. On screen:
   - **The groove channel (RTI):** a surface-normal map, then a relit image where carved letters pop out as shadows.
   - **The ink channel (multispectral):** PCA/ICA on the spectral stack pulls out residual ink invisible to the eye.
   - **Fusion:** both channels are combined into one high-contrast "recovered page".
   - **AI layer:** the line is segmented, characters recognised (Malayalam/Tamil/Grantha/Odia/Devanagari as available), transliterated and **read aloud**. A human verifies; the confidence shown per character.
   - **Conservation triage:** UV fluorescence highlights fungus/insect damage, and the leaf gets a condition score ("urgent / monitor / stable").
4. Everything is saved offline into a **standard record** (images + metadata + transcription) ready for the National Digital Repository.

### 2.2 Architecture
```
 Raspberry Pi 5 ── capture app + processing (offline)
   │  CSI
   ├── Camera: Sony IMX477 (HQ camera) with IR-cut filter removed + lens (+ filter wheel optional)
   │  UART/I2C
   └── ESP32 LED sequencer ── 3× PCA9685 / MOSFET boards ──► DOME
                                                             • 32 angle positions × white + 850 nm
                                                             • ring of 365 nm UV
                                                             • top cluster: 450/525/630/740/940 nm narrowband
 Processing (Python, open-source):
   RTI fitting (PTM/HSH least squares) → normals → relight / specular-enhance
   Multispectral stack → flat-field → PCA/ICA (MISHA-style) → ink map
   Fusion → enhancement → line segmentation → OCR model (fine-tuned on open palm-leaf datasets) → TTS
   UV fluorescence → damage segmentation → condition score
```

### 2.3 What's genuinely new (say it exactly like this)

**Prior art you must cite:**
- **MISHA** (open-source multispectral imager).
- **RTI domes**, open-source and commercial.
- **Multispectral RTI research prototypes** (e.g., a 52-direction multispectral dome; "Extended Framework for Multispectral RTI").
- **RTI on incised stylus texts** (Roman wax/wood tablets, KU Leuven).
- **Multispectral imaging of Sanskrit palm leaves** (RIT/Tara Prakashana).
- **Palm-leaf OCR datasets.**

**What LIPI-DRISHTI adds:**
1. **Palm-leaf-specific fusion of the stylus-groove channel and the ink channel.** Recover text even when **zero ink** remains.
2. **Field-portable and under ₹40k, fully offline,** versus $5k–$20k+ imported systems. Sized for a Gyan Bharatam survey team's backpack.
3. **An end-to-end Indic pipeline:** recovered image, transcription, audio, and a repository-ready record.
4. **Conservation triage in the same capture** (UV fluorescence damage scoring).

*Before submitting, do a Google Patents + InPASS search on "palm leaf + reflectance transformation + multispectral".*

---

## 3. How you prove it (the measurable part judges love)

**Build your own ground-truth leaves.** Buy blank palm leaves and a stylus. Raghurajpur (Odisha) palm-leaf etching is a living craft, and blank leaves and styluses are sold.
1. Incise known text (a shloka, Tirukkural lines, your team names) and blacken with lampblack.
2. Then **degrade** them: wash, abrade, or UV-fade until they look blank.
3. Measure **character error rate (CER)** for: plain photo vs RTI only vs multispectral only vs **fused**.
4. Slide graph: *"Readable characters: plain photo 12% → LIPI-DRISHTI 85%"*. Use *your* measured numbers.
5. Then show **one real old leaf.** Approach an Oriental Research Institute, a state archive, or a matha/temple library. Even one real recovery photo is gold.

---

## 4. BOM (indicative, recheck prices)

| Item | Qty | ≈ ₹ |
|---|---|---|
| Raspberry Pi 5 (8 GB) + cooler + SD | 1 | 9,000 |
| Raspberry Pi HQ Camera (IMX477) + 16 mm / 6 mm lens | 1 | 7,500 |
| IR-cut removal (or Arducam IMX477 NoIR variant) + 1–2 bandpass filters | — | 2,500 |
| ESP32 DevKit | 1 | 450 |
| PCA9685 PWM boards + logic MOSFET modules | 3 + 6 | 2,000 |
| LEDs: 32× white + 32× 850 nm + 8× 365 nm UV + narrowband (450/525/630/740/940) | ~90 | 3,500 |
| Dome: 3D-printed geodesic frame or 40 cm acrylic hemisphere, matte black inside | 1 | 3,000 |
| Leaf stage (matte black, soft weights; no glass glare), calibration targets (white/grey card, colour chart) | — | 1,500 |
| 12 V / 5 V SMPS, wiring, connectors | — | 1,500 |
| Blank palm leaves + stylus + lampblack for ground-truth tests | — | 1,500 |
| UV safety glasses, enclosure, misc | — | 1,500 |
| **Total** | | **≈ ₹34k** |

---

## 5. 10-week plan with go/no-go gates (6 people: 2 hardware, 1 firmware, 2 imaging/AI, 1 content/PPT + outreach)

| Week | Work | **Gate** |
|---|---|---|
| 1 | Order parts; make 20 ground-truth leaves (incise, blacken, degrade); contact 2 manuscript libraries | — |
| 2 | Hand-held **H-RTI test** (phone camera + torch at angles, free RTIBuilder workflow) on a degraded leaf | **G1: carved letters visible in relit image? If yes, the core physics is proven.** |
| 3 | Dome v1 (16 angles, white only) + ESP32 sequencing + Pi capture; **PoC video for idea round** | **G2: one-click capture under 2 min** |
| 4 | Add NIR/UV/narrowband LEDs; flat-field calibration | — |
| 5 | RTI fitting + relighting; MSI PCA/ICA (adapt MISHA's open-source processing) | **G3: fused image beats both single channels on CER** |
| 6 | Fusion + enhancement; UV damage segmentation | — |
| 7 | OCR: fine-tune on open palm-leaf dataset (pick 1 script); TTS output | — |
| 8 | Full CER experiment on 20 leaves; one real leaf from a library | **G4: measurable recovery gain** |
| 9 | Field-kit packaging (battery, foldable dome), repository-ready export | — |
| 10 | Demo rehearsal, backup data, video | — |

**Feasibility: about 8/10.** Electronics and imaging are standard; there is no slow craft loop like weaving. The main risk is OCR accuracy, so keep the AI as *assistive* (human verifies). The image recovery alone is already the wow.

---

## 6. 6-slide PPT content
1. **Title + problem:** 1 crore manuscripts (Gyan Bharatam, ₹482.85 cr); palm-leaf ink fading; imported systems cost $5k–$20k+; survey teams are in the field.
2. **Solution:** LIPI-DRISHTI. A blank-looking leaf next to the recovered text, the one-line "groove + ink" idea, and the user flow.
3. **Technical approach:** dome architecture diagram, RTI + multispectral fusion pipeline, and the **PoC photo** (H-RTI result from week 2).
4. **Feasibility:** BOM ~₹34k, gates, risks (glare → matte stage + polarisers; OCR → human-in-loop; UV safety → enclosure + glasses).
5. **Impact:** Gyan Bharatam survey teams, Oriental Research Institutes, state museums (Odisha 50k+ leaves), mathas/temple libraries, scholars; recovered texts become public audio/text; conservation triage saves the most urgent leaves first.
6. **References + prior-art table:** MISHA, RTI domes, multispectral RTI research, KU Leuven stylus-tablet RTI, RIT/Tara Prakashana palm-leaf MSI, HMPLMD dataset. Columns: groove? ink? portable < ₹40k? Indic OCR? triage? (LIPI-DRISHTI ✓✓✓✓✓).

---

## 7. Jury Q&A
| Question | Answer |
|---|---|
| "MISHA already exists." | MISHA is multispectral only (ink). Palm-leaf text is *carved*: when ink is gone, MISHA sees nothing. We add the groove channel (RTI) and fuse them, plus Indic OCR and triage, at Indian cost. |
| "RTI already exists." | Yes, and we cite it. Nobody we found packages groove + ink fusion for palm leaves as a field kit. |
| "Is it hardware?" | Custom dome, multi-wavelength LED array, synchronised ESP32 sequencer, modified camera, calibration, battery field-kit. The novelty is in the capture physics. |
| "Will it damage leaves?" | Low-intensity LEDs for seconds, no heat; UV exposure is minimal and gated; a non-contact stage. |
| "OCR accuracy?" | Image recovery is the main product. OCR is assistive with per-character confidence and human verification. |

---

## Sources
- Gyan Bharatam Mission: [Deccan Herald](https://www.deccanherald.com/business/union-budget/union-budget-2025-two-ambitious-digital-projects-launched-to-conserve-manuscripts-3384633) · [Manorama Yearbook](https://www.manoramayearbook.in/current-affairs/india/2025/02/06/gyan-bharatam-mission-manuscripts.html) · [Rau's IAS Compass](https://compass.rauias.com/current-affairs/gyan-bharatam-mission/)
- MISHA (open-source multispectral): [RIT CHIPR MISHA](https://www.rit.edu/chipr/misha) · [RIT news](https://www.rit.edu/news/misha)
- Open RTI domes: [SimpleRTIDome / Zenodo](https://zenodo.org/records/10698358) · [GWU RTI (GitHub)](https://github.com/nichlock/rti) · [Hackaday affordable RTI dome](https://hackaday.io/project/11951-affordable-reflectance-transformation-imaging-dome) · [HASOR open RTI](https://iramis.cea.fr/en/nimbe/lapa/development-of-an-open-source-rti-acquisition-system-hasor-handheld-acquisition-system-open-rti/) · [Historic England H-RTI guide](https://historicengland.org.uk/images-books/publications/multi-light-imaging-heritage-applications/heag069-multi-light-imaging/)
- Multispectral RTI prior art and costs: [Conservation Wiki: RTI](https://conservation-wiki.com/wiki/Reflectance_Transformation_Imaging_(RTI)) · [Extended Framework for Multispectral RTI](https://www.researchgate.net/publication/362809026_Extended_Framework_for_Multispectral_RTI) · [Low-cost multispectral for pigments (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8347707/)
- Incised stylus text RTI: [KU Leuven, Tongeren tablets](https://lirias.kuleuven.be/retrieve/3d9628ce-c136-4c2e-8190-5f46cd1f51b8) · [Legibility of incised texts](https://www.academia.edu/504610/Image_Capture_and_Processing_for_Enhancing_the_Legibility_of_Incised_Texts)
- Palm-leaf MSI in India: [RIT restores 700-year-old text](https://www.rit.edu/news/imaging-technology-restores-700-year-old-sacred-hindu-text) · [Tara Prakashana multispectral](https://taraprakashana.org/?p=6738) · [Mukund (Heidelberg)](https://www.sai.uni-heidelberg.de/krs/pdf/2021-11-08-Mukund.pdf)
- Palm-leaf writing process / collections: [Wikipedia: Palm-leaf manuscript](https://en.wikipedia.org/wiki/Palm-leaf_manuscript) · [eSamskriti: Odisha palm-leaf tradition](https://www.esamskriti.com/e/Culture/Indian-Culture/The-tradition-of-Palm-Leaf-writing-in-Odisha-1.aspx)
- OCR datasets: [HMPLMD Malayalam palm-leaf dataset (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9938152/) · [Mendeley Tamil dataset](https://data.mendeley.com/datasets/b7vhz7z83k)
- Other scanned tech: [LeRobot SO-101](https://circuitdigest.com/tutorial/physical-ai-robot-arm-lerobot-tutorial) · [DHAROHAR PS26214 repo](https://github.com/rupesh0411/SANJEEVAANI-PS26214-DHAROHAR)
