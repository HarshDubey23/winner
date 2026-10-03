# PS 26214: Ruthless Teardown, and Ideas Rebuilt From First Principles
### Written as a national-level SIH judge / hardware CTO. Nothing here is softened. · 03 Oct 2026

---

## Part 1. The verdict on everything we have produced so far

**Kill all six, and kill the method that produced them.** Every idea in this repo started from a technology (RTI, muons, ultrasound, pin displays, projection) and then went looking for a heritage use. That is why each one feels bolted on, and why a judge can name the existing product within a minute.

### SHILA-NAADI (ultrasonic stone tomography + "singing stone"), my own last recommendation
| | |
|---|---|
| **What already exists** | **Proceq Pundit PD8000**: multi-channel ultrasonic pulse-echo imaging of concrete with AI interpretation. **ACS A1040 MIRA**: handheld tomograph with 48 dry-point-contact transducers that images cavities, cracks and delaminations from one side, up to 2.5 m deep, **with no couplant gel**. Commercial UPV testers in India cost ₹0.75–9 lakh. Heritage-column tomography rig in Lisbon (2022). Sonic tomography of masonry pillars is routine in Italian conservation. UPV is a standard undergraduate civil-engineering lab. |
| **Broken assumption 1** | The Hampi collapses I cited were caused by **soil loosening under leaning pillars**, not by voids inside pillars. My device would not have caught the very failures I used to justify it. |
| **Broken assumption 2** | The "predict the note" cross-check only works on a free-free bar you cut yourself. A real pillar is clamped into masonry, so the trick does not transfer to any monument. |
| **Broken assumption 3** | "We give an image, UPV gives one number" is false. MIRA gives images, has dry contact, needs one-sided access, and is sold today. |
| **Broken assumption 4** | Foam voids cast into concrete blocks are a staged demo. A civil-engineering judge will recognise their own lab practical. |
| **No buyer** | ASI hires CBRI, the IITs and consultants who already own proper equipment. Nobody is waiting for a student kit. |
| **First 60 seconds** | "So you built a worse Pundit. MIRA already images concrete without gel. Which Hampi pillar fell because of an internal void?" |
| **Verdict** | **Kill.** It is a civil-lab exercise in a heritage costume. My 35/40 score was self-graded and wrong. |

### NAAD-DHARA (tuned granite pillars, speaker-array dome, Raman's tabla)
| | |
|---|---|
| **What already exists** | Lithophones are prehistoric. Stone marimbas are already made from granite countertop offcuts. Marimba makers tune bars by undercutting while watching an FFT. That is the whole "beam-theory + NDT tuning loop", and it is standard luthier practice. The "Gol Gumbaz dome" is a convolution reverb with a free impulse-response library. The Raman tabla demo is a science-museum staple. |
| **Broken assumption** | A replica xylophone in a hall does not give Hampi its music back. Nobody's life or livelihood changes. |
| **First 60 seconds** | "It's a granite xylophone and a reverb plugin. What problem did you solve, and for whom?" |
| **Verdict** | **Kill.** It is an exhibit, not a solution. |

### LIPI-DRISHTI (RTI + multispectral dome for palm leaves)
| | |
|---|---|
| **What already exists** | RTI kits and open domes; MISHA (open-source multispectral); multispectral-RTI research; RIT/Tara Prakashana palm-leaf multispectral imaging; IIIT-Hyderabad palm-leaf layout datasets. **And the ₹10 incumbent:** conservators and digitisation projects oil each folio with lampblack before imaging. |
| **Broken assumption** | That lost ink is the bottleneck. The real constraints are throughput and handling, and oil already restores the contrast. |
| **First 60 seconds** | "Every conservator oils the leaf. Why ₹35k of LEDs around a camera?" |
| **Verdict** | **Kill.** |

### BANDHA (photo-to-ikat with projected tie marks)
| | |
|---|---|
| **What already exists** | **DigiBunai**: the Government's free, open-source textile CAD (Ministry of Textiles, IIT Delhi, WSC), which already has an IKAT design provision. Projection-guided assembly is ordinary industrial practice. |
| **Broken assumptions** | Design generation is not the ikat weaver's bottleneck; powerloom and printed imitations are. Automating the master's design act also devalues exactly what the GI tag protects. The demo needs days of dyeing and weaving. |
| **First 60 seconds** | "DigiBunai already does ikat for free. You added a projector?" |
| **Verdict** | **Kill.** |

### SPARSH (refreshable multi-height pin display for blind visitors)
| | |
|---|---|
| **What already exists** | Dot Pad (2,400 pins, more than $12k), APH/HumanWare Monarch (~$15–18k), Orbit Graphiti, HyperBraille, MIT inFORM. The National Museum's static tactile galleries. A 3D-printed replica costs about ₹200 overnight. |
| **Broken assumption** | That a coarse pin bed can convey a sculpture. Blind visitors get far more from a real 3D replica. A mechanical pin-locking bed is also a reliability nightmare to demo. |
| **First 60 seconds** | "A 3D printer makes a better tactile replica overnight for ₹200." |
| **Verdict** | **Kill.** |

### ANTAR-DRISHTI (muon telescope)
Already destroyed in the earlier review. Tabletop masses cut the muon flux by only ~1–3%, so each run takes ~12 days. The design has 49 direction bins, not 256. SINP has done Indian muon tomography since 2018. No monument data is possible in 10 weeks. **Kill.**

### Derivatives: kill these too
LED/diya walls, kolam floors and kolam robots, the NUPUR smart ghungroo, the BHOJA-YANTRA automaton replica, photogrammetry archives (DHAROHAR already exists for this PS), AR/VR tours, artisan marketplaces, heritage chatbots, crowd dashboards.

---

## Part 2. Kill these whole directions

| Direction | Why it dies |
|---|---|
| **Record or digitise heritage** (imaging, scanning, archives) | The Government already contracts this out, the technology is a commodity, and half the field is doing it. |
| **Showcase exhibits / installations** | No user and no failure being fixed, so judges score it as entertainment. |
| **Cheaper clone of a lab instrument** | The only novelty is price, and cheap Chinese and Indian versions usually already exist. Judges hear "import substitution", not innovation. |
| **Physics flex with no result in the judging window** | A muon run takes days, so the live demo shows nothing. |
| **Automating the artisan's creative act** | It destroys the thing GI and the Handloom Act protect, and artisans will oppose it. |
| **Sensors + AI + dashboard on a monument** | Crowded, low on insight, and easily reduced to "an IoT project". |
| **Demos on self-made failure samples** (fake degraded leaves, foam voids) | Judges discount any test object you built to fail. |

## Part 3. The root assumptions that were broken

1. **"Heritage = monuments and manuscripts."** Living heritage (rituals, crafts, processions, music) is where people, money and physical failure actually are.
2. **"The problem is awareness or visibility."** The real problems are livelihoods stolen by imitations, rituals that physically destroy what they worship, people dying at heritage events, and theft and swapping of sacred objects.
3. **"Wow = complex physics."** Wow is an undeniable before/after in 30 seconds, on an object the judge chose.
4. **"Cheaper = innovative."**
5. **"Pick the technology, then find a heritage use."** Start from a failure that an institution has publicly admitted it cannot fix.

## Part 4. What makes a judge stop talking

- An **official body has admitted, on record, that it cannot solve the problem**.
- The **insight fits in one sentence** and is physically checkable.
- The demo uses **real objects, bought or certified, that the judge picks**.
- The result is **visible or binary in under a minute**.
- It **cannot be reduced to a phone app**: the hardware is doing physics that a phone cannot.
- A **user exists who enforces or pays**.
- It costs **₹ thousands, not lakhs**, and can be built by students in weeks.

---

## Part 5. Five concepts built from first principles (ranked, and attacked too)

### #1 KARGHA-SAAKSHI (करघा-साक्षी, "the loom as witness"): forensic proof that a human wove the cloth

**The failure on record.** Assam's Handloom & Textiles Department cannot prosecute sellers of powerloom gamosas and mekhela-chadors. Seized goods must go to the Textile Committee lab in Kolkata, and **that lab has repeatedly said it cannot distinguish identical handloom and powerloom products.** This is despite a GI tag for the Assam Gamosa (2022) and a Gauhati High Court judgment (June 2023) upholding the ban on powerloom gamosas. Nationally, the Handlooms (Reservation of Articles for Production) Act, 1985 reserves 11 items for handloom, and the "perfect imitations" go unpunished because nobody can prove the difference.

**The hidden insight.** A handwoven cloth is a **seismogram of a human body**. Every beat of the batten lands with a slightly different force, so pick spacing jitters irregularly. Every few centimetres the weaver stops to roll the cloth forward, which leaves a step in pick density. A powerloom's cloth instead carries **its gearbox's signature**: periodic take-up speed variation produces periodic pick-density variation at gear-tooth periods (standard loom engineering, e.g. NPTEL). The difference is in the **statistics and spectrum of pick spacing**, not in appearance, which is exactly why visual experts and the Kolkata lab fail.

**The physical mechanism.**
- A 650 nm laser shines through the fabric. The fabric acts as a 2D diffraction grating.
- Spot spacing along the weft axis gives the local pick spacing. Spot spacing along the warp axis gives the end spacing, which the reed fixes and keeps constant along the cloth.
- **The ratio of the two spot spacings is self-calibrating.** It does not depend on screen distance or alignment, and its variation along the cloth is pure pick-density variation.
- Worked numbers: a 0.4 mm pick gives ~1.6 mrad between orders. A lensless camera sensor centroids 10 or more orders to roughly 0.1–0.2% precision, enough to see 1% density changes.
- A stepper rail moves the cloth past the beam in 1 mm steps over 30–50 cm, giving a 300–500-point pick-density trace.
- From the trace: the coefficient of variation, the power spectrum (sharp lines mean a gear signature; broadband jitter plus periodic steps means a human), and automatic detection of cloth-advance steps.
- **Output: a physical, explainable, printable measurement, not an AI score.** That matters in court.

**User.** State handloom enforcement wings, Textile Committee labs, the Handloom Mark / India Handloom Brand schemes, government emporiums and buyers, and GI holders (Gamosa, Pochampally, Chanderi, Maheshwari, Mangalagiri, Jamdani ground weave).

**Demo moment.** The judge takes one of two identical-looking gamosas (one certified handloom, one bought from a market as powerloom) and feeds it through. The laser pattern on the wall visibly "breathes" for the handloom and stays rigid for the powerloom. Within 60 s the screen shows either **"Handwoven: irregular beat, cloth advanced every 6.2 cm"** or **"Machine: periodic signature at 3.1 mm."** Then swap them and repeat.

**Success metrics.**
- Blind classification accuracy on 40 or more provenance-certified samples (target ≥95%).
- Effect size between the two classes (CV and spectral-line strength).
- Under 60 s per test.
- Repeatability across operators.

**Why existing solutions fail.**
- The Textile Committee lab admits it cannot do this.
- The Handloom Mark is a paper label.
- A 2024 *Scientific Reports* deep-learning model (25,000 images from Assam weavers) is a black box, specific to its products, hungry for data, and hard to defend in court.
- Consumer tips ("hold it up to the light") are subjective.

**BOM (≈ ₹8–12k).**
| Part | ≈ ₹ |
|---|---|
| Laser module | 200 |
| Lensless camera module (Pi Cam / OV-class) | 1,500–2,500 |
| Linear rail, stepper, driver | 2,500 |
| Pi Zero 2 / Pi 4 | 2,000–5,000 |
| Rollers, enclosure, screen | 1,500 |
| Encoder | 500 |

**Prototype difficulty.** Hardware: low–medium. Signal processing: medium. One electronics/mechanical person and one DSP person.

**What makes it genuinely new.** The physical discovery (the weaver's rhythm versus the machine's gear signature), plus a self-calibrating optical measurement that turns that discovery into **legally explainable evidence**. It is not "technology + AI + dashboard".

**How a ruthless judge attacks it, and the honest answers.**
- *"Isn't this just an FFT of a fabric photo?"* The novelty is the signature and the calibrated forensic metric. The instrument exists to make that metric robust and cheap.
- *"Imitators will add random jitter."* Mechanical powerlooms in the imitation clusters can't. Servo take-up could, so this becomes cat-and-mouse; say so.
- *"Modern handlooms with ratchet take-up may be regular."* This is the biggest risk. Test it first.
- *"It won't work on zari brocade or heavy silk."* True. Scope it to plain-weave GI products, and treat reflected-light mode as future work.

**7-day kill test (₹3k).** Buy 5 certified handloom gamosas (government emporium) and 5 powerloom gamosas (market). Scan them in transmission on a flatbed scanner at 1200–2400 dpi, extract pick positions in Python, and compare CV and spectra. **If the two classes overlap, kill the idea before buying a single part.**

---

### #2 NIRDHOOM-DEEPA (निर्धूम दीप): a real-flame ritual lamp that physically cannot soot

**The failure on record.** Kerala's surviving murals are being "systematically destroyed by oil and soot deposited by incessantly burning lamps". Murals in the living temples of Hampi Virupaksha and Lepakshi suffer oil and soot damage. At Thanjavur, lamps burn in narrow passages beside sculptures and paintings, and oil damage is "beyond manageable limits" (Uma Chandru, ICOM-CIDOC 2015). One study of ten temples measured an **average PM2.5 of 658 µg/m³**, about 11× India's 24-hour standard of 60; another, in Kanpur, recorded PM10 of up to 2,184 µg/m³ inside temples. Conservators cannot ban lamps; devotees will not accept LEDs.

**The hidden insight.** Soot emission from a wick flame is a **threshold phenomenon** (the ASTM D1322 smoke point). Below a critical flame size, the soot that makes a flame yellow and bright **is burned off inside the flame before it can escape**. One wick-fed diffusion-flame study (on aromatic fuel surrogates) reports no soot emission for any fuel once the wick was thinner than ~1.7 mm or shorter than ~5.9 mm. Find the exact paper before putting this on a slide; ghee and sesame oil will have their own thresholds. Flicker drives flames past the threshold. Traditional thick or long cotton wicks in draughty corridors sit permanently above it.

**Mechanism.**
- Split one large flame into N sub-threshold micro-flames in fixed-protrusion brass wick tubes. This matches existing ritual forms (panchamukhi deepam, multi-wick nilavilakku).
- A Mariotte-style constant-level reservoir holds oil height, and so flame height, constant, and removes overflow and spills.
- A perforated honeycomb draught collar damps flicker.
- The result: same real fire, same ghee or sesame oil, similar light, with the soot oxidised before it leaves the flame.

**User.** Temple administrations (TN HR&CE, Travancore/Cochin Devaswom boards), ASI and state archaeology for living temples with murals, and households (indoor PM).

**Demo moment.** Two lamps burn the same ghee side by side. Hold a white porcelain plate 15 cm above each for 60 s: **one comes away black, the other clean.** A PM2.5 sensor in a small chamber plots the difference live.

**Metrics.**
- Soot emission factor (mg per g of fuel, by glass-slide transmittance or filter mass). Target ≥10× reduction.
- PM2.5 emission factor.
- Light output within ±10% of the traditional lamp (lux).
- Burn time and spill events.

**Why existing solutions fail.**
- LED diyas are not *agni*, and many temples reject them.
- "Smokeless" lamp oils (e.g. Pitambari Deepshakti) can't be mandated for what devotees offer, and do not change flame physics.
- Glass-chimney akhand diyas blacken their chimneys and still emit soot.
- Wick-lifting diyas just let people raise the flame for brightness, which makes the soot worse.

**BOM.**
| Part | ≈ ₹ |
|---|---|
| Lamp prototype (3D print → brass) | 300–800 each |
| Test rig: PMS5003 PM sensor, ESP32, lux sensor, 0.01 g balance, slide photometer, glass slides | 5,000–8,000 total |

**Difficulty.** Building it: low. Experimentation: medium, because combustion results vary.

**What is new.** Translating smoke-point physics into a ritual-compatible lamp, with **measured** protection for murals and lungs. It resolves the ritual-versus-heritage conflict without banning anything.

**How a ruthless judge attacks it.**
- *"Candle makers have known wick sizing for a century."* True; the science is known, and the application and proof are the contribution.
- *"Is this even a hardware project?"* It is a combustion device; SIH hardware has rewarded mechanical machines (the 2025 jute ribboner won). Still, expect some judges to call it low-tech.
- *"Priests choose wicks by tradition"* (banana fibre, lotus-stem fibre). Adoption is a social risk.

**3-day kill test (₹1k).** Compare soot from a traditional wick with 3 × 1.5 mm micro-wicks, using ghee and sesame oil, at equal light output. **If the reduction is under 5×, kill.**

---

### #3 RATHA-RAKSHA (रथ-रक्षा): a guardian for processions under live wires

**The failure on record.** Living heritage processions keep killing people under overhead power lines.
- Thanjavur, 27 April 2022: a temple chariot touched a high-tension line and **11 people died, including 3 children**.
- Muharram 2024 in UP: **4 dead, 26 injured** in 6 incidents. Ratlam: a tazia touched a line, **3 dead**. Amroha: **2 dead, 52 injured**.
- Belgaum: a 28-ft Ganesh idol touched a line, **4 dead**. Hyderabad 2025: multiple deaths during Ganesh processions.
- Chariots also **capsize** (Dharmapuri: 2 crushed) and **collapse** (Vellore, a 60-ft chariot).
- This cuts across religions. Durga Puja and the Kumbh Mela are on UNESCO's Intangible Cultural Heritage list.

**The hidden insight.** A live line announces itself through its 50 Hz electric field. Near a conductor E ∝ V/r, so with **two probes a known height Δ apart, E₁/E₂ = (r+Δ)/r**. Distance to the wire therefore comes out **independent of the line voltage**. No DISCOM coordination, maps or GPS are needed. An IMU adds a rollover margin (static stability from roll angle and lateral acceleration), so the crew is warned before a tall chariot tips.

**Mechanism.** Two insulated probe plates on a mast at the top of the structure, high-impedance JFET/op-amp front ends, 50 Hz band-pass filtering, ratio-based ranging, an IMU, and a siren plus a beacon visible to the pullers.

**Demo moment.** Push a 1:10 chariot model under a mock line driven by a current-limited 50 Hz high-voltage source (or a 230 V line at scaled distances). The alarm fires at the set distance **whatever the voltage setting**. Then tilt the model on a ramp: the warning sounds before it topples.

**Metrics.** Ranging error versus true distance across voltages, detection range, false-alarm rate, and warning lead time before tip-over.

**Why existing solutions fail.**
- Crane power-line proximity alarms exist (E-field based, patented since the 1990s, e.g. SA Sky MX). They are built for crane booms, priced for industry and absent from festivals.
- Cutting power along the route needs coordination that fails in side lanes.
- Lifting wires with bamboo poles kills people too: a Hyderabad youth died shifting wires.

**BOM (≈ ₹3–5k per unit).**
| Part | ≈ ₹ |
|---|---|
| Probes and analog front end | 500 |
| ESP32 | 400 |
| IMU | 300 |
| Siren and beacon | 500 |
| Battery | 800 |
| Mast | 500 |

**Difficulty.** Medium: the high-impedance analog stage, and field distortion from the structure's own metal and the people on it.

**How a ruthless judge attacks it.**
- *"This is disaster management or electrical safety, not heritage."* This is the biggest PS-fit risk.
- *"Crane alarms exist."*
- *"Three-phase lines, multiple conductors and the chariot's own iron frame break your ratio."*
- *"High voltage in the demo hall?"* Safety plan needed.

**Kill test.** Build the two-probe front end and measure the ratio versus distance under a 230 V extension lead at 10–100 cm. **If the distance error exceeds 20%, kill.**

---

### #4 MURTI-SWAR (मूर्ति-स्वर): a voiceprint identity for temple bronzes

**The failure on record.** In the Kapaleeshwarar peacock-idol case, an idol was allegedly replaced during the 2004 renovation, and the Supreme Court listed a connected matter for September 2026. Repatriations hinge on old photographs: the Smithsonian's 2026 return of three bronzes rested on 1956–59 photos in the French Institute of Pondicherry archive. Most idols were never photographed, and a skilled replica defeats a photograph.

**The hidden insight.** Every casting has a unique spatial distribution of density, stiffness and porosity, so its spectrum of resonant frequencies is a **physical fingerprint** that a replica cannot copy and polishing cannot erase. Ratios between modes cancel temperature effects.

**⚠️ Prior art, and it is serious.** This is the published and **patented "Sonic Imprint"** (University of Palermo; US 8,166,820), already tested on museum artworks. Industrial Resonant Acoustic Method (RAM) inspection uses the same physics. **The science is not new.** Only the application is: Indian temple strongrooms, swap detection during renovations, and proving identity where photographs fail.

**Demo.** Three brass figurines from the same mould. The judge shuffles them in secret, the device gives each a gentle tap, and it names each one.

**Metrics.** Identification accuracy, false-match rate, and robustness to re-mounting, temperature and a garland's mass.

**BOM.** ≈ ₹4–6k (soft solenoid tapper, contact and MEMS mics, ESP32/Pi, foam cradle, temperature sensor).

**Verdict.** The demo is magic but the novelty is weak. There are also ritual and legal hurdles: who gets to tap a deity, and would it stand as evidence? Photographs and 3D scans are the incumbents.

---

### #5 JAWARI-RAKSHAK (जवारी-रक्षक): micro-profile meter and guided filing jig for sitar/tanpura bridges

**The insight.** The famous jawari "buzz" (C.V. Raman's grazing-contact physics) is set by **tens of microns of bridge curvature**. Today it is filed by ear by a shrinking pool of specialists, and heavy players' bridges groove within months. A dial or laser-triangulation profilometer, a buzz index (spectral energy of the grazing partials) and an angle-guided filing jig turn tacit skill into a closed loop. The craftsman still does the filing; the tool shows the target.

**Context.** Miraj sitars and tanpuras received GI tags in 2024, and about 450 craftsmen work there.

**Demo.** A tanpura with a "dead" jawari is measured, filed with guidance, and the buzz audibly returns, with before/after spectrograms.

**BOM.** ≈ ₹5–10k.

**Verdict.** Charming and deeply cultural, but **niche and low-severity**. Judges may see a hobby tool.

---

### Ideas I generated and killed during my own screening
| Idea | Why it died |
|---|---|
| Laser diffraction to tell pashmina from fine wool by its cuticle scales | **Already published** ("Optical differentiation between cashmere and other textile fibres by laser diffraction"). FibreLux does field diffraction for ~$2k. Srinagar's ₹44-crore PTQCC lab and CCMB's DNA test exist. |
| An acoustic "stethoscope" for insects inside palm-leaf bundles | Acoustic stored-product insect detection (USDA's A-SPIDS) is mature. It reduces to sensor + classifier. |
| A device to protect lingams from erosion during abhishekam | The Supreme Court already imposed rules at Mahakaleshwar (RO water only, 500 ml limit, no rubbing, lingam covered with cloth during bhasma aarti because the ash's pH of 10.51 attacks the orthoquartzite). Metal kavacham covers already exist. |
| Weighing an idol in water (Archimedes during abhishekam) to verify it | A replica in the same alloy and weight passes. It cannot prove identity. |
| A machine to oil palm leaves for digitisation | Derivative of LIPI; conservators object to mechanised re-inking. |
| Hearing Hampi's pillars hum from ambient vibration | The signal is likely below cheap sensors' noise floor, and it still needs contact. |

---

## Part 6. Recommendation

- **Run the kill tests for #1 and #2 this week, in parallel.** Together they cost about ₹4k and take about 7 days.
- If **KARGHA-SAAKSHI** separates the two classes cleanly, lead with it. It is the only concept here with an **institution's written admission of failure**, a **judge-chosen real object**, an **explainable physical signature** and **a user who enforces the law**.
- If it fails, **NIRDHOOM-DEEPA** has the most undeniable demo, but prepare for the "too low-tech" attack.
- **Reminder:** the SIH 2026 portal showed an idea-submission deadline of 30 Sept 2026. Confirm with your SPOC what, if anything, was submitted. Everything above may be for the finale (if an idea in this space was submitted) or for SIH 2027.

---

## Sources
- Teardown prior art: [Proceq Pundit PD8000](https://directindustry.com/prod/proceq/product-7242-2215663.html) · [ACS A1040 MIRA tomograph](https://testingindonesia.co.id/product/a1040-mira/) · [Heritage column ultrasonic tomography (Sensors 2022)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9460912/) · [The News Minute: Hampi collapse (soil loosening)](https://www.thenewsminute.com/karnataka/heavy-rains-cause-partial-collapse-hampi-heritage-structure-110517) · [Lithophone](https://en.wikipedia.org/wiki/Lithophone) · [Granite stone marimba](https://www.tidewater.net/~xylojim/edstone.html) · [Marimba bar tuning](https://lafavre.us/tuning-marimba.htm) · [DigiBunai (ikat provision)](https://digibunai.dic.gov.in/index.php/about) · [Dot Pad price (NFB)](https://nfb.org/node/16431) · [APH Monarch price (TechCrunch)](https://techcrunch.com/2023/03/17/the-monarch-could-be-the-next-big-thing-in-braille)
- KARGHA-SAAKSHI: [Assam: lab cannot distinguish handloom from powerloom](https://apparelresources.com/business-news/trade/lack-laboratories-assam-preventing-legal-action-businessmen-selling-powerloom-products/) · [Assam pushes for gamosa lab](https://www.sentinelassam.com/amp/story/topheadlines/assam-pushes-for-lab-to-tell-real-gamosas-apart-from-powerloom-fakes) · [Gamosa GI and Gauhati HC 2023 ban](https://www.sentinelassam.com/amp/story/more-news/editorial/legal-loopholes-in-gamosa-protection) · [Handloom Reservation Act violations (The Wire)](https://thewire.in/culture/handlooms-are-dying-and-its-because-of-our-failure-to-protect-them) · [Handloom deep-learning recognition (Sci Rep 2024)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10994934/) · [How to identify handloom (pick spacing tip)](https://anuprerna.com/blogs/how-to-identify-handloom-fabrics-in-a-powerloom-world/470602) · [NPTEL: take-up variation → pick-density variation](https://archive.nptel.ac.in/content/storage2/courses/116102005/download/faqm11.pdf) · [Fabric as diffraction grating (Univ. Sydney)](https://www.physics.usyd.edu.au/super/physics_tut/activities/Waves_and_Optics/Diffraction_Patterns.pdf)
- NIRDHOOM-DEEPA: [Kerala mural deterioration](https://en.wikipedia.org/wiki/Kerala_mural_painting) · [Uma Chandru, ICOM-CIDOC 2015 (Hampi, Lepakshi, Thanjavur)](https://cidoc.mini.icom.museum/wp-content/uploads/sites/6/2018/12/Final_CIDOC_Paper_August_24_2015_Uma_Chandru__1_.pdf) · [Temple PM study, Kanpur (AAQR)](https://aaqr.org/articles/aaqr-16-04-2015aac-0146) · [Temple PM2.5 study (Springer)](https://link.springer.com/doi/10.1007/s11356-022-18739-5) · [Wick-fed flame sooting (Cambridge)](https://como.ceb.cam.ac.uk/publications/F-153-31-39/) · [Smoke point / wick flame literature](https://elib.spbstu.ru/dl/2/k19-47.pdf/en/info) · [Candle soot on church frescoes (Asinou)](https://www.thesalmons.org/lynn/asinou_paper4.pdf) · [Pitambari smokeless lamp oil](https://www.pitambari.com/shop/?p=6764)
- RATHA-RAKSHA: [Thanjavur 2022 (Scroll)](https://scroll.in/latest/1022734/tamil-nadu-11-die-by-electrocution-during-temple-chariot-procession-in-thanjavur) · [Amroha tazia (Deccan Herald)](https://www.deccanherald.com/india/2-dead-52-injured-due-to-electrocution-during-tazia-procession-in-ups-amroha-1242058.html) · [Ratlam tazia (FPJ)](https://www.freepressjournal.in/indore/three-killed-as-tazia-touches-power-line-in-ratlam) · [UP Muharram 2024](https://www.deccanherald.com/amp/story/india%2Futtar-pradesh%2F4-dead-and-26-injured-in-six-separate-incidents-during-muharram-processions-across-uttar-pradesh-3109801) · [Belgaum Ganesh (Deccan Herald)](https://www.deccanherald.com/india/karnataka/4-electrocuted-in-belgaum-during-ganesha-procession-347907.html) · [Hyderabad 2025 (ETV Bharat)](https://www.etvbharat.com/en/!state/many-die-of-electrocution-in-ganesh-idol-procession-in-hyderabad-enn25081901439) · [Dharmapuri chariot capsize](https://thenewsminute.com/amp/story/tamil-nadu/two-killed-four-injured-tn-s-dharmapuri-temple-chariot-collapses-crowd-164919) · [Crane E-field alarm patent US8866469](https://patents.google.com/patent/US8866469) · [SA Sky MX](https://www.cranehotline.com/articles/made-sa-sky-mx-detects-power-lines-to-save-lives)
- MURTI-SWAR: [Kapaleeshwarar peacock idol case](https://www.thenewsminute.com/article/madras-hc-orders-probe-missing-peacock-idol-kapaleeswarar-temple-160487) · [SC hearing Sept 2026](https://dailypioneer.com/news/supreme-court-to-hear-kapaleeswarar-temple-idol-case-on-september-2) · [Smithsonian return via IFP photos](https://www.drishtiias.com/state-pcs-current-affairs/us-museum-to-return-three-ancient-bronze-sculptures-stolen-from-tamil-nadu-to-india/print_manually) · [Sonic Imprint patent US8166820](https://patents.google.com/patent/US8166820) · [Resonant Acoustic Method (The Modal Shop)](https://www.modalshop.com/docs/themodalshoplibraries/white-papers/physical-basis-of-the-resonant-acoustic-method-for-flaw.pdf)
- JAWARI-RAKSHAK: [Miraj GI tags 2024 (The Week)](https://www.theweek.in/news/india/2024/04/07/sitars-tanpuras-made-in-maharashtras-miraj-town-get-gi-tags.html) · [Jivari physics](https://en.wikipedia.org/wiki/Jivari) · [Tanpura string–bridge modelling (QUB)](https://pureadmin.qub.ac.uk/ws/files/94023894/25_DAFx_16_paper_08_PN.pdf)
- Killed in screening: [Laser diffraction cashmere differentiation](https://core.ac.uk/works/67302753) · [FibreLux price](https://texasfarmbureau.org/fibrelux-a-fieldfriendly-compact-wool-measurement-tool/) · [PTQCC Srinagar](https://archive.factordaily.com/pashmina-certification-authenticity-nanotechnology-kashmir/) · [CCMB pashmina DNA tool](https://scitales.ccmb.res.in/the-fiber-of-truth-a-dna-tool-for-pashmina-authentication/) · [Acoustic stored-product insect detection (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11511369/) · [Mahakaleshwar SC directions (SCC Online)](https://www.scconline.com/blog/post/2020/09/02/sc-lists-8-directions-to-prevent-deterioration-of-shivlinga-at-mahakaleshwar-temple-ujjain/)
