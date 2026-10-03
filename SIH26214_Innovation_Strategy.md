# SIH 26214: Ideas Meant to Impress the Jury

**Second-opinion review of the "Sanskriti Spectacle Architect v3" dossier, with three new concepts**
Prepared 03 Oct 2026 · For Team Sanskruti Spectacle (6-member hardware team)

---

## 0. Summary

1. **What PS 26214 is.** It is AICTE's open-ended **"Student Innovation: ideas that showcase the rich cultural heritage and traditions of India"** (Heritage & Culture, Hardware). It has no fixed problem, so many teams will pick it. **What separates you from them matters more than for any other problem statement.**
2. **The dossier's thesis is right.** Promoting culture means getting people to take part, not tutoring one person. But the dossier scores ideas with gates built for teamLab and Instagram: joy, crowd and shareability. **The SIH jury is academics and industry engineers.** They score novelty, technical complexity, feasibility, impact and cost. Every one of the dossier's five finalists is technically shallow (LED matrix plus NFC, IMU sticks, a photobooth, an escape room). An engineering professor can call any of them "WS2812 + ESP32, what's new?" in five seconds.
3. **The new direction: *heritage as working science*.** Take a real, published, measurable phenomenon that Indian builders engineered. Rebuild it from first principles with modern sensing. Then let a crowd play with it. Judges get engineering they can check, culture people can feel, and a demo that cannot be faked.
4. **New #1 pick: NAAD-DHARA, India's Sounding Monuments.** Since 2008 the ASI has stopped visitors tapping Hampi's musical pillars, because tapping was damaging them. The official replacement is a **QR code that plays a 25-second clip**. You use beam theory and FEA to compute stone pillars, build them, tune them to swaras, and hand the public the music back. Two more stations sit beside them: a Gol Gumbaz whispering dome built from a speaker array, and C.V. Raman's 1920 tabla-harmonics discovery made visible. The whole thing runs on real physics, can be measured live in front of the jury, and costs about ₹45k to build.
5. **Keep from the dossier:** the Living Kolam Floor (it is already in the "culture is the algorithm" family) and its two-scale rule, BOM discipline, risk tables and pattern laws. **Fix before anyone outside the team sees it:** citation numbering errors and one unverified reference (§6).

---

## 1. What I verified about PS 26214 and how SIH scores

| Item | Finding |
|---|---|
| PS 26214 title | "Student Innovation – Ideas that showcase the rich cultural heritage and traditions of India" · AICTE · Heritage & Culture · **Hardware** |
| Nature of the PS | Open-ended. Other teams are already on it. Example: one public GitHub repo for PS 26214 ("SANJEEVAANI DHAROHAR") is a Raspberry Pi photogrammetry turntable with oral-history recording. Expect many digitisation, AR/VR, AI try-on and LED-wall entries. |
| SIH judging (published SIH criteria and college internal-round sheets) | Novelty of idea · **complexity / technical difficulty** · feasibility and practicability · sustainability · scale of impact · user experience · future potential · presentation and teamwork. Hardware rubrics add design and prototyping, technical implementation, durability/scalability and **cost efficiency**. A common weighting is about 20% each for innovation, technical difficulty, impact, presentation and team. |
| Who judges | Panels from academia and industry, plus ministry/nodal officials. These are not experience designers or influencers. |

**What this means:** The dossier's seven gates (Joy, Crowd, Culture, Share, Repeat, Revenue, Build) have **no gate for technical novelty or engineering depth**. That accounts for roughly 40% of an SIH score (innovation plus technical difficulty). The finalists were optimised for the wrong scoresheet.

---

## 2. Honest review of the dossier

### What it gets right (keep all of this)
- **Participation over tutoring** is the right lesson from MudraMitra.
- **The two-scale rule** (a full-scale vision with a named funder, plus a buildable demo) is exactly how strong SIH decks are built.
- **BOMs at Robu.in prices**, a Wokwi + Unity + Fusion 360 simulation plan, and risk tables. These are execution-grade.
- **The Living Kolam Floor** is the most original of the five. Its mechanic comes from published mathematics: kolam as Eulerian circuits, with active arXiv work in 2025.

### What will hurt you with an SIH jury

| # | Problem | Why it matters | Fix |
|---|---|---|---|
| 1 | **Thin technology in #1 (Sankalpa Srot).** It is capacitive pads, NFC tags, addressable LEDs and a projector. | "Technical difficulty" is about 20% of the score. A diya wall reads as decoration engineering. | Either switch the lead (§3) or add real research depth to it (§5). |
| 2 | **Crore-scale framing (₹3–8 Cr walls, ₹1–4 Cr arenas).** | "Cost efficiency" and "feasibility" are scored. Judges distrust student decks that open with ₹8 Cr. | Lead with the ₹20–50k demo and a **₹5–25 L pilot** at one named venue. Keep crore figures on the roadmap slide only. |
| 3 | **Ritual commercialisation optics.** "Sankalpa diya ₹51/₹101", "e-puja economics", aarti every 20 minutes in a pavilion. | Panels are diverse and national. Selling a ritual as a ticket can read as trivialising faith. | Present any ritual concept as free, with revenue coming from CSR and tourism. Prefer secular, pan-Indian heritage-science themes. |
| 4 | **Crowded idea spaces.** An AI saree/drape booth (the nano-banana wave) and LED garba floors will appear in many submissions. CNC rangoli/kolam plotters already exist in student journals. | Novelty is scored against the other teams in the room. | Avoid #4 (Nine-Yard Machine) as a lead. Make the kolam mechanic co-operative and Eulerian-constrained (that part is still new), not just "a machine draws rangoli". |
| 5 | **The "500 ideas / 10 rounds / 5 personas" theatre.** | Judges never see it, and the SIH idea deck is a short fixed template (typically about 6 slides: title, idea, technical approach, feasibility & viability, impact & benefits, research & references). Confirm with your SPOC's template. | Use the dossier internally. Pitch one idea with depth. |
| 6 | **Citation hygiene** (details in §6). | A judge who clicks one wrong reference will distrust all of them. | Renumber and recheck before submission. |

---

## 3. The new direction: heritage as working science

**The design rule:** pick a heritage phenomenon that is:
1. **Real and published.** There is a peer-reviewed paper you can cite on the slide.
2. **Engineered by Indian builders, makers or scientists.** This is pan-Indian national pride, not one community's ritual.
3. **Physically reproducible** by students, with numbers you can predict *and* measure live.
4. **Playable by a group,** so it keeps the dossier's crowd thesis.
5. **Currently inaccessible to the public.** It is locked, protected, remote, or simply never explained.

This passes the dossier's seven gates *and* the SIH scoresheet. "Rebuilt from the equations, and the jury can measure it" is an answer to "what's novel?" that a panel cannot wave away.

### Three new concepts

| Rank | Concept | One line | Engineering depth | Demo cost |
|---|---|---|---|---|
| **1** | **NAAD-DHARA: India's Sounding Monuments** | The pillars, domes and drums Indians engineered to *sound*, rebuilt from physics and played by crowds | Modal analysis/FEA, NDT-based tuning, real-time DSP, speaker-array auralization | ~₹45k |
| 2 | **KOLAM-SANGAM: the co-operative Eulerian floor + rice-flour robot** | Strangers co-design a valid single-stroke kolam on a tile floor; a robot draws it in real rice flour as a take-home artifact | Graph algorithms (Eulerian circuits), sensor fusion, CNC/path planning | ~₹35k |
| 3 | **BHOJA-YANTRA: India's first robotics manual, built** | A working reconstruction of an automaton described in the 11th-century *Samarāṅgaṇa Sūtradhāra* (Ch. 31: mechanical birds, guard figures, lamp-tending dolls) | Mechanism design (cams, linkages), embedded control, interpretation with a Sanskrit scholar | ~₹30k |

---

## 4. Concept #1 in full: NAAD-DHARA, India's Sounding Monuments

### 4.1 The hook (the jury's first 30 seconds)

> "Sir/Ma'am, for 500 years, anyone could tap the pillars of Hampi's Vijaya Vittala temple and hear music come out of solid granite. In 2008 the ASI had to stop it, because millions of taps were weakening the stone. Today you scan a QR code and hear a 25-second recording. **We think India deserves its music back.** We used the same beam equations the scientists who studied those pillars used to explain them. We *designed* new granite pillars from them, tuned each to a swara, and you can play them together right now. Then step into our ring and whisper. You'll hear Gol Gumbaz answer you seven times."

### 4.2 Why this one fascinates an SIH panel

- **A real problem with a documented weak official fix.** The ASI touch ban and the QR-clip substitute are both reported in national media. Your problem slide is a fact, not a hypothetical.
- **Science the panel can verify on the spot.** You show the predicted frequency (Euler–Bernoulli) beside the measured FFT peak, live, on the stone the judge just struck. That matches the published finding that the Hampi pillars sound in **flexural modes**, which agree well with beam theory.
- **Indian science lineage on a national stage.** **C.V. Raman** first showed in 1920 (*Nature*) that Indian drums like the tabla and mridangam are unusual: they produce **harmonic** overtones, thanks to the loaded *syahi* membrane. A Nobel laureate's own research sits on your demo table.
- **The whole country is in it, not one tradition.** Hampi (Vijayanagara, Karnataka). Gol Gumbaz (Adil Shahi, Bijapur). Golconda's Fateh Darwaza clap that carries to Bala Hisar about 1 km away (Qutb Shahi, Telangana). Neolithic **rock gongs at Kupgal/Sanganakallu**, near Bellary, about 60 km from Hampi, which may be India's oldest "instruments". Tabla and mridangam span the Hindustani and Carnatic traditions.
- **The crowd plays together.** A pillar mandapam is an ensemble instrument: 4–8 people play at once, and a raga emerges only when they co-ordinate. The dome ring lets strangers whisper to each other across it.
- **The field is active and has potential partners.** Archaeoacoustics of Indian temples is a live research area: impulse-response studies of Hampi and Pattadakal (JASA 2025) and Ahmedabad University's "Sonic Spatiality in Heritage Spaces". That gives you named academic collaborators for your feasibility slide.

### 4.3 The three stations

**Station A: Stambha (the playable pillars).** This is the hero station.
- A set of 7–8 granite bars or pillars (demo: free-free bars on nodal supports, the way a lithophone or xylophone is mounted). Each is **computed** to one swara.
- Design equation for the first flexural mode of a free-free bar:
  `f₁ = (4.730² / 2πL²) · √(E·t² / 12ρ)`
- Worked example: granite, E ≈ 50 GPa, ρ ≈ 2650 kg/m³, 30 mm thick, Sa = 240 Hz:

  | Swara | Sa | Re | Ga | Ma | Pa | Dha | Ni | Sa' |
  |---|---|---|---|---|---|---|---|---|
  | f (Hz, just intonation) | 240 | 270 | 300 | 320 | 360 | 400 | 450 | 480 |
  | Bar length L (mm) | 747 | 704 | 668 | 647 | 610 | 579 | 546 | 528 |

- **The engineering part judges will love:** granite's modulus varies (about 40–70 GPa), which shifts pitch by roughly ±18%, about three semitones. So you **reverse the Hampi researchers' method**. They used ultrasonic velocity to *explain* pillar frequencies. You measure each raw slab (an ultrasonic pulse-velocity or tap-test FFT gives you E), compute the cut length, cut slightly long, then trim to tune. That is a real closed-loop, NDT-driven manufacturing process, and it is exactly what makes this "hardware" rather than "LEDs".
- Sensing and play: a piezo contact pickup on each bar plus an I2S MEMS mic, feeding an ESP32-S3 running an FFT. The display shows **predicted vs. measured peak**. The LED under each bar blooms with amplitude. In ensemble mode, the screen recognises which raga phrase the group just played (for example Mohanam/Bhupali, a pentatonic scale that is easy for beginners) and the whole mandapam lights up.
- Fusion 360 FEA modal analysis supplies the "simulation" slide: mode shapes, nodal points where you mount the supports, and the frequencies predicted for each bar.

**Station B: Gumbaz (a whispering dome without the dome).**
- A ring of 8 speakers and 4 mics, about 3 m across. A visitor claps or whispers. The system convolves their voice in real time with the **impulse response of Gol Gumbaz** (or Golconda's gate) and plays it back around the ring, so they hear the repeating echoes.
- Where the impulse response comes from (be honest on the slide): (a) ask the researchers who already measure South Indian temple IRs; (b) a geometric-acoustics simulation of the published dome dimensions (pyroomacoustics ray-tracing on a mesh); (c) your own measurement at a smaller local dome or stepwell. Option (b) alone is acceptable for the PPT round.
- Crowd play: two strangers on opposite sides of the ring whisper to each other (the whispering-gallery effect, steered by beamforming). A "Golconda alarm" game: one team claps at the "gate" and another must hear it at the "Bala Hisar" speaker.

**Station C: Raman's Drum (seeing harmonics).**
- A real dayan (tabla) next to a plain un-loaded membrane. Strike both. A live spectrum shows the tabla's near-harmonic overtone ladder (Raman's five harmonics) against the plain drum's inharmonic mess.
- Optional spectacle: a laser bounced off a small mirror on the membrane draws Lissajous-style patterns on the wall, or a Chladni plate shows the mode shapes with sand.
- A 30-second "why the black spot matters" story. It explains the *science* of Indian classical percussion, not just the music.

### 4.4 Two scales (same shape as the dossier, so it slots straight in)

| | Hackathon demo | Pilot (12–18 months) | Full scale |
|---|---|---|---|
| What | 8-bar granite or aluminium stambha + a 1.5 m 6-speaker mini ring + tabla station | A 3-station gallery at one NCSM science centre or a state museum, plus a Hampi visitor-centre unit | A touring "Sounding Monuments of India" pavilion, plus permanent units at Hampi, Bijapur and Golconda visitor centres |
| Cost | ~₹45k | ₹10–25 L | ₹1–3 Cr for a touring pavilion |
| Who pays | Team / institute | **National Council of Science Museums (NCSM, under the Ministry of Culture; it runs 26 centres and builds interactive exhibits in-house)** · state archaeology departments · Adopt-a-Heritage/Monument Mitra CSR partner | Ministry of Culture, Karnataka/Telangana tourism, CSR, ticketed science-centre galleries |

**Revenue (keep it modest on the slide):** B2G/B2B exhibit sales and licences to science centres and museums. Tuned granite "heritage lithophone" sets for schools and Atal Tinkering Labs give you a product line. Stone-cutter clusters (Karnataka granite artisans) get paid tuning work, which is a livelihood angle judges like. An exhibit sale is a believable model, unlike ritual ticketing.

### 4.5 Demo BOM (indicative, Robu.in/Amazon/local, Oct 2026 prices to recheck)

| Item | Qty | ≈ ₹ |
|---|---|---|
| Granite bars cut by a local stone cutter (30 mm, 0.5–0.8 m) + 2 spares | 10 | 6,000–9,000 |
| *(Fallback/backup set: aluminium 6061 flat bars)* | 8 | 3,000 |
| Nodal supports (rubber tubing, felt, MDF/steel frame) | — | 3,500 |
| ESP32-S3 DevKit | 3 | 2,400 |
| Piezo contact pickups + preamp (LM358/TL072) | 8 | 1,200 |
| INMP441 I2S MEMS mics | 6 | 1,200 |
| WS2812B strip (under-bar glow) | 3 m | 1,300 |
| Raspberry Pi 5 (8 GB) for real-time convolution | 1 | 7,800 |
| USB 7.1 audio interfaces (cheap) ×2, or one multichannel interface | 2 | 2,000 |
| Small passive speakers + TPA3116 amps | 6 + 2 | 5,500 |
| Dayan (tabla) + a plain-membrane drum | 2 | 4,000 |
| Laser module, small mirror, Chladni plate, exciter | — | 1,500 |
| Ultrasonic pulse-velocity: borrow from your civil dept (UPV testers are standard concrete-lab kit); otherwise tap-test FFT only | — | 0 |
| Wiring, SMPS, fabrication, paint, signage | — | 4,000 |
| **Total** | | **≈ ₹43–47k** |

### 4.6 Simulation stack for the PPT round
- **Fusion 360 FEA (modal):** mode shapes and frequencies of each bar, nodal mounting points, a pillar-mandapam render.
- **Python (NumPy/SciPy):** the tuning calculator (E from measured f → cut length). Also a sensitivity plot showing the ±18% pitch spread from granite variability, the problem your process solves.
- **pyroomacoustics:** a synthetic impulse response of a Gol Gumbaz-sized dome, and an auralised clap (play it during the pitch).
- **Wokwi:** the ESP32 piezo-trigger, FFT and LED pipeline.
- **Unity/Blender:** a full-scale gallery walkthrough.

### 4.7 The 3-minute live jury demo
1. **0:00** The judge strikes a granite bar. The screen shows *Predicted 300 Hz · Measured 301 Hz*: "Ga, computed from its length."
2. **0:40** Three judges play Sa–Re–Ga–Pa–Dha. The system recognises Mohanam and the mandapam blooms.
3. **1:30** A judge whispers into the ring and hears Gol Gumbaz echo back.
4. **2:15** The tabla vs. plain drum spectrum: "This is what Raman saw in 1920."
5. **2:45** Close: "Hampi's music was silenced to save it. We gave it back, without touching a single original stone."

### 4.8 Top risks and mitigations
| Risk | Mitigation |
|---|---|
| Granite cracks or mis-tunes | Cut long and trim. Buy 2 spare blanks. Keep the aluminium backup set ready on finals day. |
| Real-time convolution latency in the dome | Partitioned convolution on the Pi 5 with a short head, or pre-baked IR tails. Under 20 ms is fine for claps and whispers. |
| No real Gol Gumbaz IR | Say on the slide that it is simulated and validated against the published "7–10 audible repeats" description. Reach out to the archaeoacoustics groups. |
| Noisy finals hall | Contact piezos are immune to ambient noise for the pillars. Use a directional mic in the ring and provide headphone fallback. |
| "Is this just a xylophone?" | No. The novelty is the *NDT-driven computational tuning of natural stone* plus the heritage replication and the measured-vs-predicted validation. A xylophone is tuned by ear on processed wood. |

---

## 5. Concepts #2 and #3 in brief

### #2 KOLAM-SANGAM: an upgrade of the dossier's Living Kolam Floor
- **The new part:** the floor only accepts moves that keep the shared drawing **Eulerian-completable**. Strangers must co-operate to close it as a single stroke. When they succeed, a **gantry robot draws the finished kolam in real rice flour** on a tray or the floor. Kolam is traditionally drawn in rice flour partly to feed ants and birds, which you can mention as a sustainability point.
- **Why it is stronger than the dossier version:** the judges watch a physical artifact being made from the crowd's own design, the core algorithm comes from 2025 arXiv research, and the plotter answers "what does the hardware *do*?"
- **Honesty note:** CNC rangoli plotters already exist (a STM journal paper and a PCBWay project), so do not pitch the robot as the innovation. The innovation is the **co-operative Eulerian constraint engine** plus the crowd-to-artifact loop.

### #3 BHOJA-YANTRA: build India's 11th-century automaton
- Chapter 31 of King Bhoja's *Samarāṅgaṇa Sūtradhāra* describes yantras: mechanical birds, guard figures (dvārapāla), dolls that move and refill lamps, and a moving cosmos model. Build **one** working reconstruction (for example, a lamp-tending doll on cams and linkages) with a short "how we interpreted the verse" panel signed off by a Sanskrit faculty member.
- **Why judges like it:** mechanical and robotics depth, an "India's first robotics text" headline, and a group show where kids trigger the automaton performance.
- **Risks:** the text is terse and readings are contested. Frame it as a *speculative reconstruction* and cite the translation you used.

### If the team still wants to lead with a dossier finalist
- **Sankalpa Srot:** give it research depth. For example, put **real floating diyas on a water channel** with wireless pods and a flow-physics ripple model instead of an LED wall. Make it free, funded by CSR.
- **Shila Codes:** the best dossier fit for "heritage as working science". Make each puzzle a **measurable** physics truth: the Konark wheel as a working sundial with a gnomon, a Jantar Mantar shadow reading against the real ephemeris, and a Hampi pillar as a NAAD-DHARA mini-bar. In effect, merge it with #1.

---

## 6. Fact-check notes on the dossier (fix before external use)

- **Citation numbering drift in Table 4.1 and the text:** Amsterdam is cited as [26] but reference [26] is Mysuru Dasara (Amsterdam is [14]). Lyon is cited as [29] but Lyon is listed at both [13] and [29]. Mysuru is cited as [41], which is Xylobands. Deep Prasar cites [40] for Xylobands, but [40] is PixMob. Vivid Sydney appears as [11], [12], [27] and [28]. Renumber the whole list.
- **Reference [49]** ("Heritage Science (Nature) s40494-026-02310-3") could not be verified. The kolam-Eulerian work I could confirm is arXiv 2507.02874 and 2510.18907. Replace or verify [49].
- **Swadesh Darshan/PRASHAD:** the text says 76 projects / ₹5,290 cr, while reference [34] says 117 projects / ₹5,756 cr. Pick one and date it.
- **Sankalpa Srot revenue** ("₹2.5L/day at 5k visitors") is festival-peak arithmetic. The dossier itself concedes this, so say so on the slide.

---

## 7. Recommended 10-week plan (NAAD-DHARA)

| Week | Work |
|---|---|
| 1 | Lock the concept. Email two archaeoacoustics groups and your civil department for a UPV tester. Order aluminium bars and electronics. |
| 2 | Python tuning calculator + Fusion 360 modal FEA. Build and tune the aluminium set as a proof of process. |
| 3–4 | Source granite blanks. Measure E for each, cut long, trim to tune. Log predicted vs. measured for every bar; this table becomes a slide. |
| 4–5 | ESP32-S3 piezo/FFT/LED firmware. Raga-phrase recognition (simple note-sequence matcher). |
| 5–6 | pyroomacoustics dome IR. Pi 5 real-time convolution. Speaker-ring frame. |
| 7 | Tabla station: spectrum display, laser/Chladni visual. |
| 8 | Unity gallery render, 90-second video, PPT in the official template. |
| 9–10 | Integration, a noisy-room rehearsal, the 3-minute demo rehearsed against a timer, and a backup kit. |

---

## Sources

- PS 26214 title/category: [SANJEEVAANI-PS26214-DHAROHAR (GitHub)](https://github.com/rupesh0411/SANJEEVAANI-PS26214-DHAROHAR); SIH 2026 catalogues ([blinknbuild](https://www.blinknbuild.in/Assets/SIH_2026_All_226_Problem_Statements_Master_Catalogue.pdf), [PS PDF](https://sih-2026-problem-statements.shaikrohit187.workers.dev/public/pdfs/SIH_2026_All_PS.pdf)); [Reskilll SIH 2026 guide](https://blogs.reskilll.com/smart-india-hackathon-2026-complete-guide-registration-themes-winning/)
- SIH judging criteria: [SIH FAQ 2019](https://www.sih.gov.in/pdf/FAQs%20for%20SIH2019.pdf); [NNRG Internal SIH 2025](https://nnrg.edu.in/PDF/events/cse/Internal-SIH-2025.pdf); [SSIP Gujarat hackathon report](https://www.ssipgujarat.in/admin20/files/event/report1_path/6968/HACKATHON%202025%20REPORT.pdf)
- Hampi pillars, ASI restriction and QR clips: [Outlook Traveller](https://www.outlooktraveller.com/News/now-you-can-listen-to-hampis-musical-pillars-with-a-simple-qr-code-scan); [Deccan Herald](https://www.deccanherald.com/india/karnataka/restoring-lost-glory-hampi-2213554)
- Hampi pillar science (flexural modes, ultrasonic NDT, Euler–Bernoulli): [IAS repository](https://repository.ias.ac.in/97974); [DA-IICT acoustic analysis](https://drsr.daiict.ac.in/items/d806ea35-8240-42f6-b093-bfd78f8c6b05); [Physics Today](https://physicstoday.aip.org/news/musical-pillars-made-of-solid-granite)
- Temple archaeoacoustics: [JASA 2025, Acoustic analysis of two Hindu temples](https://www.citedrive.com/en/discovery/acoustic-analysis-of-two-hindu-temples-in-southern-india); [Ahmedabad University, Sonic Spatiality in Heritage Spaces](https://ahduni.edu.in/academics/schools-centres/centre-for-heritage-management/events/sonic-spatiality-in-heritage-spaces/)
- Gol Gumbaz: [Sonic Wonders](https://www.sonicwonders.org/gol-gumbaz-mausoleum-bijapur-india/) · Golconda: [Wikipedia](https://en.wikipedia.org/wiki/Golconda)
- Kupgal rock gongs: [Wikipedia](https://en.wikipedia.org/wiki/Kupgal_petroglyphs); [Stone Pages](https://www.stonepages.com/news/archives/000628.html)
- Raman's drums: [Raman & Kumar 1920, Nature (IAS repo)](https://repository.ias.ac.in/52555); [Eigenspectra of Indian drums (arXiv)](https://arxiv.org/pdf/0809.1320)
- NCSM: [Presentation by NCSM (MoE)](https://education.gov.in/sites/upload_files/mhrd/files/raa/Presentation_by_NCSM.pdf)
- Kolam mathematics: [arXiv 2507.02874](https://arxiv.org/pdf/2507.02874); [arXiv 2510.18907](https://arxiv.org/pdf/2510.18907) · existing rangoli plotters: [STM journal](https://journals.stmjournals.com/?p=166873), [PCBWay](https://www.pcbway.com/project/shareproject/Draw_Rangoli_using_3D_Printer_2D_Plotter_c5be2615.html)
- Samarāṅgaṇa Sūtradhāra: [Wikipedia](https://en.wikipedia.org/wiki/Samarangana_Sutradhara)
