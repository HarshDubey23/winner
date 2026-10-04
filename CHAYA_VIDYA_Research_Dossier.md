# CHAYA VIDYA: Research & Decision Dossier for SIH PS 26214 (Idea/PPT Round)
### Evidence-driven R&D, prior-art and competitive study · Prepared 04 Oct 2026 · For building the PPT, not a PPT itself

**Evidence tags used throughout**
- **[V]** Verified: a source is linked.
- **[I]** Inference: my reasoning from verified facts.
- **[P]** Proposal: a design choice I recommend.
- **[H]** Hypothesis: must be tested before you claim it.

**Limitations.** sih.gov.in and many publisher sites are blocked from this research environment. Facts below come from search-indexed primary and secondary sources, GitHub mirrors and government pages. I could not open most PDFs or images directly, so **image licences must be checked by you before use.** Where I could not verify something, I say so.

---

## 0. Executive verdict (read this first)

| Question | Answer |
|---|---|
| **Keep, redesign, replace or kill CHAYA?** | **Fundamentally redesign.** Kill the current architecture (sensor handle → Raspberry Pi → servos → puppet). Keep the cultural core (real leather puppet, real light, real shadow) and the purpose (transmitting the manipulation skill), but invert how it works. |
| **Why kill the current architecture?** | (1) It replaces the very stick technique it claims to teach: the learner learns to wave an IMU handle, not to work the three sticks [I]. (2) Robotic Indian shadow puppets already exist: Kerala's **Inker Robotics + Sajeesh Pulavar** automated four Tholpavakoothu puppets in 2021, and the piece is shown at the District Heritage Museum, Palakkad [V]. (3) Chinese patents on robots that perform shadow plays exist [V]. (4) A servo rig fixed in place cannot do moving the puppet toward and away from the lamp, or pressing it against the screen, which is the essence of the craft [V][I]. |
| **Single strongest version** | **CHAYA VIDYA 2.0, "the instrumented shadow stage"** [P]. Clip-on inertial sensors on the **real** sticks capture the hidden backstage technique. An audience-side camera reads the **physics of the real shadow**: edge blur (penumbra) and shadow size (magnification) give the puppet's distance from the screen, i.e. whether it is pressed on or drifting. A microphone aligns movement to the music. A masters' consented "performance score" (sticks + shadow + music) becomes the reference, and learners get **fading haptic feedback** while using a real GI-tagged puppet. No servos. AI is limited to alignment (DTW) and simple classifiers. |
| **Real novelty** | **System-level novelty, moderate.** In my searches I found no system that (a) instruments real traditional shadow-puppet control sticks **and** (b) measures the real cast shadow's physics as the skill outcome, for teaching from consented masters' references, for an Indian tradition. Each part has prior art: virtual puppets controlled by sensors, gesture-based teaching with feedback, motion capture for preservation, and robotic puppets. **Do not claim "first in the world."** [I] |
| **Biggest threat** | **CN121483109B** (Hunan Agricultural University; filed 5 Jan 2026, published 4 Aug 2026): a shadow-play **teaching method with real-time feedback** from camera-based hand tracking, using virtual puppets [V]. Next come **Inker Robotics** (robotic Indian puppetry, 2021) [V], **ShadowStory** (CHI 2011; handheld sensors controlling digital shadow puppets) [V], and the EU projects **i-Treasures / Mingei** that use sensors to pass rare skills from masters to apprentices [V]. |
| **Evidence you must have before submission** | (1) A **shadow-physics proof-of-concept graph**: penumbra width and magnification against puppet-to-screen distance, measured on your own rig. (2) **Stick-motion repeatability data** from one sensor on a real stick. (3) **Practitioner validation**: at least 2–3 conversations with Tholu Bommalata practitioners or institutions, quotes and (ideally) a support or consent note. (4) A **photo of an authentic GI puppet you bought**. (5) A **prior-art comparison table**. (6) A **consent and benefit-sharing statement**. |
| **Honest odds** | With (1)–(6), CHAYA 2.0 is a strong, visually memorable, culturally authentic entry. Without practitioner validation and real data, it reads as "a student robotics project about puppets" and will lose to better-evidenced entries. [I] |
| **Deadline reality** | The SIH 2026 portal snapshot listed **30 Sept 2026** as the idea-submission deadline for SIH26214 [V]. If your SPOC already submitted, the idea is locked. Use this dossier for the internal round, the finale, or SIH 2027. Confirm with your SPOC. |

---

## 1. SIH context: what the idea round actually rewards

| Item | Finding | Tag |
|---|---|---|
| PS | SIH26214, *Student Innovation: Ideas that showcase the rich cultural heritage and traditions of India*, Hardware, Heritage & Culture, AICTE MIC-Student Innovation. Up to 500 ideas per PS. | [V] [sih-2026-problem-statements mirror](https://github.com/vedantchalke36/sih-2026-problem-statements) |
| History | The same PS ran in 2023 as **SIH1480**. It had exactly **one** national winner (₹1 lakh). | [V] [SIH 2023 results mirror](https://github.com/DuanBoomer/Smart-India-Hackathon-Result-Analysis) |
| PPT format | **Maximum 6 slides including the title slide, PDF upload.** Slides: Title (PS ID, title, theme, category, team ID, team name) → Proposed solution → Technical approach → Feasibility & viability → Impact & benefits → Research & references. | [V] [IGNOU copy of SIH 2026 guidelines (via search)](https://www.ignou.ac.in/viewFile/NCIDE/notification/Guidelines-SIH-2026.pdf); matches real 2025 submissions in [sih-winning-presentations](https://github.com/JoysonBeera/sih-winning-presentations) |
| Evaluation weights | Third-party sites list "Problem understanding & innovation 20%, Technical approach & feasibility 25%, Prototype/implementation plan 25%, Impact & scalability 20%, Presentation clarity 10%". **Not confirmed from an official MIC document.** | [unverified] [Reskilll template](https://reskilll.com/blogs/sih-2026-ppt-template-exact-format-slides-evaluators-score/) |
| Reading time | Third-party claim: evaluators spend about 2–3 minutes per PPT. | [unverified] [Reskilll](https://blogs.reskilll.com/sih-2026-ppt-template-exact-format-slides-evaluators-score/) |
| Finalists | About 4–5 teams per PS reach the finale (public guides). | [V-secondary] [FirstVidya](https://firstvidya.com/sih-2026-guide/) |
| Team | 6 members; at least 1 female member. | [V-secondary] [Reskilll guide](https://blogs.reskilll.com/smart-india-hackathon-2026-complete-guide-registration-themes-winning/) |

**Implication [I].** Six slides and roughly two minutes of attention. The PPT needs one unforgettable image (a real shadow, plus the hidden hands behind it), one sentence of insight, one graph of real data, one honest prior-art table and one credible plan. Everything else is noise.

---

## 2. Cultural ground truth (verified)

### 2.1 Tholu Bommalata (Andhra Pradesh)

| Fact | Source |
|---|---|
| Shadow-puppet theatre of Andhra Pradesh. The name means "dance of leather puppets" (*tholu* = leather, *bomma* = puppet, *aata* = play/dance). | [V] [Wikipedia](https://en.wikipedia.org/wiki/Tholu_bommalata) · [Britannica](https://www.britannica.com/art/tholu-bommalata) |
| Distinguished among South Indian shadow traditions by **life-sized, richly hued, translucent** articulated puppets. Practised by the **Aare Kapu** community, concentrated in Anantapur, Guntur and Nellore districts. | [V] [Sahapedia](https://www.sahapedia.org/tholu-bommalata-telugu-shadow-puppet-theatre) |
| GoI *Yojana* (Aug 2020): India has six shadow traditions: Chamadyacha Bahulya (MH), **Tholu Bommalata (AP)**, Togalu Gombeyatta (KA), Tolu Bommalattam (TN), Tolpava Kuthu (KL), Ravanachhaya (OD). Shadow puppets are **"pressed against the screen with a strong source of light behind it"**. Tholu Bommalata puppets are large, **jointed at waist, shoulders, elbows and knees, and coloured on both sides to throw coloured shadows**. | [V] [Yojana Aug 2020 (Publications Division)](https://www.publicationsdivision.nic.in/journals/Journalarchives/Yojana/Yojana-English/2020/August/Yojana_2020_August_pdf.pdf) · [summary](https://iasexamportal.com/the-gist/yojana-shadow-puppet-theatre-traditions) |
| **Manipulation:** the puppet is mounted on a central palm-stem handle. The arms move with detachable sticks that have a string and peg slipped into holes in the hands. **One puppeteer holds the central stick in one hand and the two arm sticks in the other.** Size and position change by moving the puppet closer to or farther from the lamp, which makes figures "materialize" and fade. Stationary puppets are pinned to the screen with date-palm thorns. | [V] [Wikipedia](https://en.wikipedia.org/wiki/Tholu_bommalata) |
| Sticks attach at the joints (shoulders, knees, elbows, head). Puppets can exceed **5 ft**, made from goat, cow or buffalo skin, translucent, stained with vegetable dyes. | [V] [Incredible India (GoI)](https://www.incredibleindia.gov.in/en/andhra-pradesh/amaravati/leather-puppetry) |
| Puppet sizes cited as **91–183 cm**. | [V] [The National, 2023](https://www.thenationalnews.com/arts-culture/2023/09/30/indian-puppetry-storytelling/) |
| Skin is cleaned for about two weeks, treated with herbs, oiled and pounded until translucent. | [V-secondary] [Robinage](https://robinage.com/leather-puppets-tholu-bommalata/) |
| **Music:** harmonium (drone), mrudangam, bells on ankles and wrists, finger cymbals. The puppeteer bangs a **wooden plank tied to his foot** to underline fights. Performances are at night and last 4+ hours. | [V] [Wikipedia](https://en.wikipedia.org/wiki/Tholu_bommalata) |
| **Troupe structure:** a family. The head is lead puppeteer, with 2–3 other puppeteers including 1–2 women who sing, narrate and perform, plus up to 5–6 others **including younger members in training**. | [V] [UNIMA WEPA](https://wepa.unima.org/en/tolu-bommalatam/) |
| **GI:** "Andhra Pradesh Leather Puppetry", GI application no. **107**, certificate no. **93**, registered **09-09-2008**, valid to **31-07-2027**. Area: **Nimmalakunta (Anantapur) and Narsaraopet (Guntur)**. | [V] [IP India GIR 107](https://search.ipindia.gov.in/GIRPublicSearch/Application/Details/107) · [GI document](https://www.origin-gi.com/wp-content/uploads/2017/01/78-andhra-pradesh-leather-puppetry.pdf) |
| **Dalavai Chalapathi Rao** (b. 1936, Nimmalakunta): **Padma Shri 2020**. His family moved craftsmen "from plain puppetry to leather paintings, lamp shades, room partitions", which "started attracting the younger generation as the remuneration was lucrative". | [V] [Wikipedia](https://en.wikipedia.org/wiki/Dalavai_Chalapathi_Rao) · [Lepakshi Handicrafts artisan page (AP Govt)](https://lepakshihandicrafts.gov.in/artisans/dalavai-chalpathi-rao.html) |

### 2.2 Decline: what the sources actually say

| Finding | Source |
|---|---|
| Sharp decline **since the 1970s**. Puppeteers left for agriculture or leather handicrafts because of **financial constraints**. Live performances lost their audience to TV and cinema. | [V] [Homegrown](https://homegrown.co.in/homegrown-creators/tholu-bommalaata-the-centuries-old-shadow-puppetry-tradition-of-andhra-and-telangana) · [UNIMA WEPA](https://wepa.unima.org/en/tolu-bommalatam/) |
| "Poverty…, the loss of figures to floods or eaten by rats, and weak interest by Indian cultural authorities and the local population" are pushing performers toward their end. | [V] [UNIMA WEPA (via search excerpt)](https://wepa.unima.org/en/tolu-bommalatam/) |
| "Only **6–8 troupes** left in the Rayalaseema region" still take puppetry as their main livelihood. **This figure dates from about 2015–17; do not present it as current.** | [V-dated] [Indpaedia](http://indpaedia.com/ind/index.php/Tholu_Bommalata) |
| Artisans' income has shifted to **leather crafts** (lampshades, wall hangings). | [V] [30stades](https://30stades.com/2022/07/06/tholu-bommalata-andhra-pradesh-leather-puppet-makers-breathe-new-life-into-craft-paintings-homedecor) · [Sarmaya](https://sarmaya.in/guides/tholu-bommalata/) |

### 2.3 Related traditions (for scale and comparison)

| Tradition | Key facts | Source |
|---|---|---|
| **Tholpavakoothu (Kerala)** | A ritual art in Bhagavathy/Kaali temples of Palakkad, in *koothumadams*, January–May, 10 pm to dawn. The Kamba Ramayanam is performed in **21 parts over 21 nights**, before rows of oil lamps. **It is performed for the goddess even without an audience.** K. K. Ramachandra Pulavar (Padma Shri) has **trained teachers at CCRT workshops for about 10 years**. | [V] [Wikipedia: Pulavar](https://en.wikipedia.org/wiki/K._K._Ramachandra_Pulavar) · [Onmanorama](https://www.onmanorama.com/entertainment/art-and-culture/2019/02/01/how-keralas-puppetry-has-emerged-from-shadow.amp.html) · [Kerala Tourism](https://www.keralatourism.org/kerala-article/tholpavakoothu-shadow-puppetry/130/) |
| **Ravanachhaya (Odisha)** | Non-articulated, 20–25 cm figures. Performed around Odash village, Pallahara (Angul). One source says only one troupe remains in Odisha. | [V] [MAP Academy](https://mapacademy.io/?p=3680) · [Odisha Bytes](https://odishabytes.com/ravana-chhaya-odishas-poetic-shadow-narrative-precursor-to-motion-pictures/) |
| **UNESCO** | Wayang (Indonesia), Karagöz (Türkiye, 2009) and **Chinese shadow puppetry (2011)** are inscribed. Wayang is often described as descended from South Indian leather puppetry such as Tholu Bommalata. **None of India's inscribed elements is a puppetry tradition** (verify against the current list before you say so). | [V] [UNESCO: Chinese shadow puppetry](https://ich.unesco.org/en/RL/chinese-shadow-puppetry-00421) · [Wikipedia: Wayang](https://en.wikipedia.org/wiki/Wayang) · [India ICH list](https://en.wikipedia.org/wiki/List_of_Intangible_Cultural_Heritage_elements_in_India) |

### 2.4 Institutions and channels (your stakeholder map)

| Institution or scheme | Relevance | Source |
|---|---|---|
| **CCRT** (Centre for Cultural Resources and Training, Ministry of Culture) | Runs national **"Role of Puppetry in Education"** workshops for in-service teachers. One 15-day workshop was held at **CCRT Madhapur (Telangana)** under **NEP 2020**. | [V] [CCRT programme page](https://ccrtindia.gov.in/program_schemes/workshop-titled-role-of-puppetry-in-education). The Madhapur / NEP 2020 detail is from a news report found via search, either [Arunachal Times](https://arunachaltimes.in/?p=248547) or [Assam Tribune](https://assamtribune.com/workshop-on-puppetry-concludes); confirm which before quoting |
| **Guru Shishya Parampara** (Ministry of Culture, via the 7 Zonal Cultural Centres including **Thanjavur**) | For rare and vanishing arts. Each guru trains 5–8 shishyas. **Guru ₹7,500/month, accompanist ₹3,750, pupil ₹1,500**, for 6–12 months. | [V] [myScheme](https://myscheme.gov.in/schemes/gsp) · [Journals of India](https://journalsofindia.com/guru-shishya-parampara-scheme/?print=pdf) |
| **Lepakshi Handicrafts** (AP Govt emporium) | Sells leather puppets; an authentic purchase channel. | [V] [Leather puppets page](https://lepakshihandicrafts.gov.in/leather-puppets.html) |
| **Sarmaya Arts Foundation** | Holds **180 leather puppets**; runs virtual Tholu Bommalata workshops (e.g. Dec 2020). | [V] [Sarmaya guide](https://sarmaya.in/guides/tholu-bommalata/) · [workshop](https://sarmaya.in/at-school/tholu-bommalaata-virtual-workshop/) |
| **National Crafts Museum & Hastkala Academy** | Holds Tholu Bommalata puppets with catalogue pages. | [V] [Leather Puppet 26311](https://nationalcraftsmuseum.nic.in/artifacts-detail/26311) |
| **NID** | Open elective where students co-create with Nimmalakunta master artisans (products, not performance). | [V] [NID OE25B16](https://openelective.nid.edu/CourseAbstract/OE25B16.pdf) |
| Workshop marketplaces | Rooftop runs Tholu Bommalata workshops, showing a paid demand for teaching. | [V] [Rooftop](https://rooftopapp.com/blogs/tag/tholu-bommalata-workshop/) |

---

## 3. What is actually broken (problem analysis)

**CHAYA's original assumption:** "the embodied motor skill isn't transferring, so build a tool that transfers it."

**What the evidence supports:**
1. **The primary cause is economic.** Patronage collapsed, audiences moved to TV and cinema, and families moved to crafts that pay [V]. Skill transfer breaks **because** the next generation sees no livelihood in performing [I].
2. **Training does still happen inside families** (younger members train in the troupe) [V]. The government already pays for transmission (Guru Shishya Parampara) [V].
3. **New learner populations exist and are growing:** teachers trained by CCRT under NEP 2020, school workshops, online workshops, museum audiences [V]. These learners are **outside the family lineage**, have **no access to a master's hands for months**, and are exactly the people a measurement-and-feedback tool can help [I].
4. **The hidden technique isn't recorded.** Audiences and most documentation see the **shadow**. The skill sits in the **backstage stick work, distance from the lamp, pressure on the screen and timing to the music** [V for the technique; I that documentation mostly films the front].
5. **Paid teaching is a livelihood channel.** Workshops are a paying market (Rooftop, Sarmaya, CCRT), and Dalavai Chalapathi Rao's family shows that income attracts the young [V]. A tool that lets **masters teach more learners well, and be paid per use of their recorded routines**, attacks the root cause indirectly [P].

**Corrected problem statement for the PPT [P]:**

> "Tholu Bommalata's skill lives in the puppeteer's hidden hands, not in the shadow the audience sees. As troupes shrink and new learners (teachers trained by CCRT, students, museum visitors) arrive without a master beside them, that hidden skill is neither recorded nor coached, and the masters who hold it earn nothing from teaching at scale."

---

## 4. Prior art and competition (ruthless)

### 4.1 India
| Item | What it is | Threat to CHAYA | Source |
|---|---|---|---|
| **Inker Robotics + Sajeesh Pulavar, 2021** | Four Tholpavakoothu puppets (Rama, Sita, Lakshmana, the deer) automated for a 3-minute golden-deer episode, displayed at the District Heritage Museum, Palakkad. | **Kills the original servo CHAYA.** "Robotic Indian shadow puppets" is already done. | [V] [Al Jazeera](https://www.aljazeera.com/features/2021/7/5/technology-meets-tradition-keralas-robotic-leather-puppets) · [Republic](https://www.republicworld.com/india/puppeteer-who-dared-to-automate-shadow-puppets-to-revive-a-dying-art) · [Better India](https://thebetterindia.com/268023/traditional-leather-puppetry-tholpavakoothu-kerala-engineer-robotics-heritage) |
| NID co-creation elective; Sarmaya and Rooftop workshops | Craft and education, not technology. | Low (they are channels, not competitors). | links in §2.4 |
| Tholu Bommalata-specific sensing or AI projects | **None found** in my searches (absence of evidence ≠ evidence). | — | search logs |

### 4.2 Global research
| Work | What it does | Gap relative to CHAYA 2.0 | Source |
|---|---|---|---|
| **ShadowStory** (Lu et al., CHI 2011) | Children make digital shadow puppets on a tablet and perform on a projection screen, **controlled by handheld wireless sensors**. 7-day school trial. | Digital puppets; no real puppet or real shadow; not about traditional technique. | [V] [DOI 10.1145/1978942.1979221](https://www.doi.org/10.1145/1978942.1979221) |
| Kinect control of Chinese shadow puppets ("Wusong Fights the Tiger") | Body gestures drive virtual puppets. | Virtual; whole-body proxy, not sticks. | [V] [UIC repository](https://repository.uic.edu.cn/handle/39GCC9TT/6597?mode=full) |
| Macao Polytechnic: Kinect game-based learning of shadow-puppet manipulation | A manipulation-learning game. | Virtual. | [V] [MPU](https://research.mpu.edu.mo/en/publications/a-study-on-design-of-manipulation-of-shadow-puppet-game-based-lea/) |
| NYU Shanghai "Hands Behind the Light" | Three coloured sticks tracked by webcam animate a **virtual** puppet, to convey the experience of manipulation. | Virtual; no skill measurement. | [V] [project page](https://ima.shanghai.nyu.edu/projects/capstones/hands-behind-light-experiencing-forgotten-art-shadow-puppet-manipulation) |
| Wayang Kulit Kelantan motion capture | A mocap facility records the puppeteer and the puppets for preservation. | Lab mocap; preservation, not coaching; not Indian. | [V] [academia.edu](https://www.academia.edu/73434451/The_Use_of_a_Motion_Capture_Facility_to_Capture_the_Puppeteer_and_Puppets_Movements_in_Wayang_Kulit_Kelantan_Performance) |
| "AI-Enhanced Motion Capture… Chinese Shadow Puppetry Heritage" (MDPI MTI) | AI mocap for preserving and transmitting Chinese shadow puppetry. | I saw the title and an excerpt in search but could not verify the details. | [V-partial] [MDPI](https://www.mdpi.com/2414-4088/10/5/46) |
| Golan Levin & Zachary Lieberman, *Manual Input Sessions* | Computer vision analyses **real** analogue hand shadows and augments them with sound and graphics. | Art piece; hand shadows; no skill coaching. | [V-secondary] [UCSB MAT](https://www.mat.ucsb.edu/g.legrady/academic/courses/08s594/prj/mc/index.html) |
| eShadow (Greek Karagiozis) | A digital shadow-theatre tool. | Digital. | [V] [DiPP 2018](https://dipp.math.bas.bg/dipp/article/view/217) |
| Robotic puppets driven by motion capture (PolyU/UTAS; CMU motorized marionette) | Bend-twist sensors map human motion to servo marionettes. | **This is the original CHAYA architecture**, already published. | [V] [PolyU](https://research.polyu.edu.hk/en/publications/motion-control-of-a-robotic-puppet-through-a-hybrid-motion-captur/) · [CMU](https://ri.cmu.edu/?p=122018) |
| **i-Treasures** (EU FP7, 2013–2017) | A sensor-based platform to **pass rare know-how from Living Human Treasures to apprentices** (songs, dance, craft). | Framework prior art for "capture the master, teach the apprentice". | [V] [CORDIS 600676](https://cordis.europa.eu/project/id/600676/de) · [CNR ITD](https://www.itd.cnr.it/en/research/projects/i-treasures.html) |
| **Mingei** (H2020, €3.28M, 2018–2021) → **Craeft** (Horizon Europe, 2023–) | Motion capture of craft practitioners (glass blowing, silk weaving, mastic) for preservation and education. | Same framework; crafts rather than puppetry. | [V] [CORDIS 822336](https://www.cordis.europa.eu/project/id/822336) · [Waag](https://waag.org/en/project/mingei) |

### 4.3 Patents (legal status not verified; run InPASS / Google Patents before any claim)
| Patent | Subject | Threat | Source |
|---|---|---|---|
| **CN121483109B** (Hunan Agricultural Univ.; filed 2026-01-05, published 2026-08-04) | **Shadow-play teaching with real-time feedback** from camera-based hand pose and depth, mapped to a **virtual** puppet. | **Highest.** It covers the "feedback training for shadow puppetry" concept. Our difference is the real puppet, real shadow and instrumented real sticks. | [V] [Patsnap](https://eureka.patsnap.com/patent/CN121483109B) |
| CN203038033U | Mechanical and control device for shadow-play performance. | Kills servo CHAYA. | [V] [Google Patents](https://patents.google.com/patent/CN203038033U/zh) |
| CN102716587B, CN102626554B, CN101837198A, CN101822906A | Automatic control and robotic movement of shadow puppets. | Kills servo CHAYA. | [V] (listed in Google Patents results) |
| US9454236 | 3D mouse device controlling marionettes. | Input-device prior art. | [V] [USPTO PDF](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/9454236) |
| US8633933 / US8339402 | Animated performance (puppetry) using multiple cameras. | Capture prior art. | [V] [USPTO](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8633933) |

### 4.4 Threat ranking
1. **CN121483109B**: covers feedback teaching for shadow puppetry, with a virtual puppet.
2. **Inker Robotics 2021**: robotic Indian shadow puppets.
3. **ShadowStory / Kinect / NYU Shanghai**: sensor or vision control of shadow puppets.
4. **i-Treasures / Mingei / Craeft**: the "capture the master, teach the apprentice" framing.
5. **Wayang Kelantan mocap**: motion capture of puppeteers.

---

## 5. Teardown of the current CHAYA, component by component

| Component | Problem | Verdict |
|---|---|---|
| Sensor handle (2× MPU-6050 + flex sensors) | It replaces the three traditional sticks. The MPU-6050 has no magnetometer, so its **yaw drifts (TDK cites about 1.8°/min)**. Flex sensors on a rigid handle measure grip, not technique. | Replace. [V] [TDK InvenSense](https://adm.invensense.tdk.com/mpu-6050-yaw-over-time) |
| Raspberry Pi → PCA9685 → MG90S/SG90 servos → puppet | Teleoperation removes depth play and screen pressure. MG90S servos are small for 0.9–1.8 m puppets. Robotic puppets are prior art (Inker, CN patents, PolyU/CMU). | **Kill.** |
| "Learner practises same movement" | With what feedback, judged against what? There is no ground truth for "good". | Redesign around measured, master-validated metrics. |
| Camera + MediaPipe + DTW | A hand-pose camera behind the screen sees hands but not stick angles or screen contact. DTW similarity is not the same as quality. | Keep DTW only as an alignment tool. Point the camera at the **shadow**. |
| 10 W diffused LED | A wide diffuse source makes the penumbra large and destroys the depth cue (§8.3). | Replace with a **compact source of known size** (or calibrate a real lamp). |
| Audio narration | Fine, but it is not innovation. | Replace with **music-sync analysis** (mic + beat tracking). |
| Manual rod fallback | A good instinct. In 2.0 the real rods are the primary interface. | Kept, and promoted to the core. |
| Artisan puppet ₹1,200 | Good. Make the authentic GI purchase visible as part of the impact story. | Keep and expand. |

---

## 6. Alternative directions considered

| # | Direction | Why weaker | Verdict |
|---|---|---|---|
| A | Original CHAYA (servo mirroring) | Replaces the skill; prior art (Inker, CN patents, PolyU/CMU). | Kill |
| B | Autonomous robotic performance for museums | Inker did it; it transmits no skill; it competes with puppeteers' livelihoods. | Kill |
| C | AR/VR or projected digital puppetry | ShadowStory, Kinect systems, NYU and CN121483109B already exist; it loses the real medium. | Kill |
| D | Camera-only phone app (shadow side) | Cheap and scalable, but it is an app disguised as hardware and cannot see the backstage stick technique. | Keep as a **low-cost tier** inside 2.0 |
| E | Haptic exoskeleton guiding the learner's hands | Expensive and intrusive. Motor-learning evidence says heavy physical guidance harms retention (the "guidance hypothesis"). | Kill [V] [Frontiers 2016](https://www.frontiersin.org/articles/10.3389/fnins.2016.00251/full) |
| F | Full-body mocap suit (Xsens-class) | Costly, and it captures the body, not the sticks. | Kill |
| G | Documentation archive only | Crowded and passive. | Fold the archive into 2.0's "performance score" |
| H | A robot that lets a troupe perform with fewer puppeteers | Undermines employment. | Kill |
| I | **Instrumented real sticks + shadow-physics sensing + music sync + fading feedback + consented master references** | Hardest to dismiss; keeps the real medium; produces measurable output. | **Choose (CHAYA 2.0)** |

---

## 7. The insight that makes 2.0 defensible

**"The shadow is the score."** A shadow on the screen carries hard physical information about how the puppeteer is holding the puppet [P][V-physics]:

- **Edge blur (penumbra).** For a light of width *s* at distance *L* from the screen, with the puppet a gap *d* in front of the screen, the penumbra is **w ≈ s·d / (L − d)**. A puppet pressed against the screen (d → 0) throws a **knife-sharp** edge. As it drifts toward the lamp, the edge blurs linearly. This is the standard soft-shadow relation used in computer graphics, [NVIDIA PCSS](https://http.download.nvidia.com/developer/presentations/2005/SIGGRAPH/Percentage_Closer_Soft_Shadows.pdf). [V]
- **Size (magnification).** **M = L / (L − d)**: the shadow grows as the puppet moves away from the screen. This is the very effect masters use deliberately to make figures loom or fade [V for the technique].
- **Colour saturation.** Tholu Bommalata's translucent dyes project as **coloured** shadows [V]. Colour is sharpest when the puppet is pressed against the screen [H].

So a single audience-side camera, plus a light source whose size you know, can **measure the puppeteer's depth technique without touching the puppet**. Clip-on IMUs on the sticks capture **what the audience never sees**: the angles and timing of the three sticks. A microphone ties both to the music. To my knowledge this front-plus-back pairing applied to traditional shadow-puppet coaching is not in the prior art I found [I].

---

## 8. CHAYA VIDYA 2.0: full specification [P]

### 8.1 System overview
```
 BACKSTAGE (hidden skill)                    SCREEN                 AUDIENCE SIDE (visible outcome)
 ┌────────────────────────────┐                                     ┌──────────────────────────────┐
 │ Real GI leather puppet     │   compact light of known size s     │ Fixed camera (1080p60 / 4K)  │
 │  • central palm-stem stick ◄─ IMU node 1 (BNO085+ESP32, 100 Hz)   │  • shadow position & area→M  │
 │  • arm stick L             ◄─ IMU node 2                          │  • edge-spread width → w     │
 │  • arm stick R             ◄─ IMU node 3 (+ haptic LRA)           │  • colour saturation         │
 │ Puppeteer's foot plank / music ── USB mic → beat/onset tracking   │                              │
 └──────────────┬─────────────┘                                     └───────────────┬──────────────┘
                └────────── BLE / Wi-Fi UDP, time-synced ────► Laptop / Raspberry Pi 5 ◄──┘
                                                               • fusion → "performance score"
                                                               • alignment to master reference (DTW)
                                                               • 3 scores: CONTACT · TIMING · SHAPE
                                                               • fading haptic feedback + stage-edge LEDs
```

### 8.2 Modes
1. **Record (masters, with consent):** a synchronized three-stream "performance score" (stick kinematics + shadow physics + music), plus video. Stored with consent metadata and a licence.
2. **Learn:** a learner performs a master's phrase with a real puppet and gets **bandwidth feedback** (a buzz only when error exceeds a threshold) that **fades** across sessions, plus a post-phrase card with three scores.
3. **Shadow-only (low-cost tier):** any troupe, school or museum can use just the camera and light. No puppet modification.

### 8.3 Shadow-physics numbers (computed)
Example geometry: compact source s = 2 cm, L = 60 cm, a 1080p camera covering a 1 m wide screen (≈0.52 mm/pixel):

| Puppet gap d | Penumbra w | Pixels | Magnification M |
|---|---|---|---|
| 0 cm (pressed) | 0 mm | 0 | 1.000 |
| 2 cm | 0.7 mm | 1.3 | 1.034 |
| 5 cm | 1.8 mm | 3.5 | 1.091 |
| 10 cm | 4.0 mm | 7.7 | 1.200 |
| 20 cm | 10.0 mm | 19.2 | 1.500 |

**Honest resolution [I]:** with a 1080p camera covering the whole screen, "pressed" vs "≥ 3–5 cm away" is robust, but finer than about 2 cm needs a 4K camera or a narrower field of view. A **wide diffuse LED panel (e.g. s = 20 cm) makes the penumbra huge**, which is why 2.0 specifies a compact source, or calibrates the effective size of a traditional lamp flame.

### 8.4 Hardware and BOM (indicative Indian prices; verify before ordering)
| Subsystem | Choice | Why this choice (rejected alternatives) | ≈ ₹ |
|---|---|---|---|
| Stick IMU ×3 | **BNO085** 9-axis with on-chip fusion (game-rotation-vector mode) | MPU-6050 has yaw drift (~1.8°/min) [V] and needs host fusion. ICM-20948 is cheaper but needs your own fusion. A camera alone cannot see the stick angles backstage. | 1,500–2,500 each (verify) |
| Node MCU ×3 | **ESP32-C3/S3 mini** + 150–300 mAh LiPo, BLE/Wi-Fi | Wires between three independently moving sticks would tangle and change the technique. | ~600–1,000 each ([ESP32-S3 DevKit ~₹979](https://price-history.in/product/esp32-s3-devkit-n16r8-board-otg-CCNl0LIm)) |
| Haptics ×2 | LRA/coin vibration motor + DRV2605L | Audio feedback would clash with the music; LEDs are not visible while you watch the screen. | 600 |
| Clip-on collars | 3D-printed split collars with foam lining for 6–12 mm bamboo; **target < 15 g per node** | No drilling or gluing on the master's puppet; removable. | 500 |
| Shadow camera | USB 1080p60 webcam, or **Raspberry Pi Camera Module 3** (4K option for finer depth) | A backstage hand camera (MediaPipe) misses stick angles and contact. | 2,500–3,400 ([Zbotic](https://zbotic.in/product/raspberry-pi-camera-module-3/)) |
| Light | Compact high-CRI COB LED with a fixed aperture (10–20 mm) + driver; a calibrated oil-lamp mode for authenticity | A wide diffuse panel destroys the depth cue (§8.3). | 600 |
| Screen and frame | Cotton/muslin screen, PVC or aluminium frame (~1.2 × 0.8 m demo) | A traditional surface; portable. | 1,500–2,500 |
| Audio | USB mic (or INMP441 I2S) | Beat and onset tracking of mrudangam, cymbals and the foot plank. | 300–800 |
| Compute | Your laptop, **or** Raspberry Pi 5 (8 GB) for a standalone kit | A laptop is the cheapest for prototyping; a Pi suits kiosks. | 0 / ~8,000–9,500 |
| Authentic puppet(s) | GI Nimmalakunta puppet(s) from **Lepakshi Handicrafts** or artisans directly | Authenticity, impact, and correct weight and balance. | 1,000–5,000 |
| Power and misc | Chargers, cables, mounts | — | 1,500 |
| **Prototype total** | | | **≈ ₹15–25k (with laptop) / ≈ ₹25–35k (with Pi 5)** |
| Master honorarium | Paid recording session(s), like GSP day rates | Ethics, and the livelihood thesis. | 5,000–10,000 |

### 8.5 Software and algorithms
| Block | Method | Why (rejected alternatives) |
|---|---|---|
| Time sync | A shared clock (NTP-like over Wi-Fi) plus a clap/LED sync event at session start | Needed to fuse three streams to about 10 ms. |
| Shadow segmentation | Background model of the lit screen; Lab/HSV thresholding; contour; screen homography from 4 corner markers | Classical CV is enough: controlled lighting, no training data needed. |
| Depth from shadow | (a) magnification from area ratio to the "pressed" template: d = L(1 − 1/M); (b) penumbra from the **edge-spread function** (10–90% rise) along contour normals: d = wL/(s + w); combined in a fused estimate | Physics-based and explainable. A learned depth model would need data you don't have. |
| Contact state | Fused d < threshold (calibrated per rig), plus colour saturation as a secondary cue | Interpretable, and maps to the master's language ("press it to the screen"). |
| Stick kinematics | BNO085 quaternions → angles relative to a "home pose"; reset yaw at each phrase start; angular velocity for accents | Short phrases plus a reset sidestep drift. |
| Music | Onset and beat tracking (librosa) on the mic stream; detects the foot-plank strikes | Timing to the *talam* and to effect strikes is part of the skill [V for the plank]. |
| Alignment | Multivariate **DTW** (sticks + shadow depth) between learner and master phrase | Small data (tens of phrases); DTW is transparent; deep sequence models are overkill. |
| Scores | **CONTACT** (% of frames in the master's contact state), **TIMING** (median accent-to-beat offset, ms), **SHAPE** (normalised DTW distance) | Three numbers a master can sanity-check. |
| Feedback policy | Bandwidth feedback (only when error exceeds threshold) with a **faded schedule** across sessions; summary-only mode for retention tests | Guidance hypothesis [V] [Frontiers](https://www.frontiersin.org/articles/10.3389/fnins.2016.00251/full). Haptic guidance helps novices and timing; error amplification helps skilled learners and spatial accuracy [V] [Frontiers Sys Neuro 2015](https://www.frontiersin.org/journals/systems-neuroscience/articles/10.3389/fnsys.2015.00052/full) |
| Data format | "Performance score" = JSON/CSV streams + video + consent/licence metadata | Portable, archivable, owned by the master. |

### 8.6 Data requirements
- **Master reference library:** about 20 canonical phrases (entry, walking, bow, lament, fight, flight, exit) × about 10 repetitions × 1–2 masters ≈ 200–400 phrase samples, i.e. about 1–2 hours of recording [P].
- **Validation labels:** masters rate learner attempts 1–5 per phrase. Use 2 raters where possible and check inter-rater reliability [P].

---

## 9. Validation plan

### 9.1 Before submission (≈1 week, ≈₹5–8k)
| ID | Experiment | Output for the PPT | Pass criterion [H] |
|---|---|---|---|
| **PoC-1** | Rig: cotton screen, compact LED (s ≈ 2 cm) at L ≈ 60 cm, a puppet (real or cut-out), ruler. Move the puppet from 0 to 20 cm in 2 cm steps. Fix a phone camera on the audience side. Measure edge 10–90% width and silhouette area. | **Graph of penumbra and magnification vs distance, with the theory curves overlaid** | Monotonic; within ±20% of theory |
| **PoC-2** | One IMU (BNO085, or MPU-6050 if that is all you have, noting drift) on a real stick. Repeat one gesture 10×, then do 10 "wrong" variants. | Angle traces; DTW distance histogram (correct vs wrong) | Separable distributions |
| **PoC-3** | Record a short mrudangam/harmonium clip and perform with it. | Beats overlaid on stick accents; timing-offset histogram | Offsets measurable to ≤ 30 ms |
| **PoC-4** | Talk to 2–3 practitioners or institutions (Nimmalakunta artisans via Lepakshi Handicrafts, CCRT Madhapur, SZCC Thanjavur, Sarmaya). Ask: the top 3 beginner mistakes? Does screen contact, lamp distance or music timing matter most? Would you record routines if paid and credited? | Quotes; ideally a short support or consent note | At least 2 practitioners confirm the metrics matter |
| **PoC-5** | Buy one authentic GI puppet. | Hero photo for slide 1 or 2 | — |

### 9.2 Technical KPIs (for the finale)
| KPI | Target [H] |
|---|---|
| Stick orientation error vs camera reference (2-min trials, with home-pose reset) | < 5° RMS |
| Shadow depth estimate error, 0–20 cm range (1080p) | < 2–3 cm |
| Contact-state classification vs hand-labelled frames | > 90% |
| End-to-end feedback latency | < 100 ms |
| Setup and calibration time | < 10 min |
| Node weight on a stick | < 15 g each |
| Prototype cost | < ₹25k (laptop version) |

### 9.3 Learning study (finale and after)
- **Design [P]:** 12 novices randomised into A (video of the master only) or B (CHAYA 2.0 with fading feedback). Pre-test, then 3 × 20-minute practice sessions, then a **24-hour retention test without feedback**, plus a transfer test on a new phrase.
- **Outcomes:** blind master ratings (primary) and the CONTACT, TIMING and SHAPE scores (secondary).
- **Hypothesis H1 [H]:** B > A at retention.
- **For the idea round, present this only as a plan.** Do not claim results you don't have.

---

## 10. Risks and failure modes

| Risk | Likelihood | Mitigation |
|---|---|---|
| Masters are uninterested, or object to recording | Medium | Pay honoraria; co-ownership; revenue share; start with institutions (CCRT, SZCC) |
| Metrics don't match what masters value | Medium | PoC-4 interviews first; masters set the thresholds; master ratings are the primary outcome |
| Node weight or bulk changes the stick technique | Medium | < 15 g nodes; one placement near the grip; check with a master |
| IMU drift or magnetic disturbance from the lamp's metal | Low–Med | BNO085 game rotation vector (no magnetometer) plus home-pose resets; short phrases |
| Lighting variation (oil lamp flicker) | Medium | LED mode for training; calibrated lamp mode for authenticity demos |
| Camera resolution limits fine depth | Medium | 4K or a narrower field of view; report honest resolution |
| "Gamifying a ritual art" backlash (Tholpavakoothu is temple ritual) | Low–Med | Target Tholu Bommalata secular and educational contexts; no scoring in ritual settings; master consent |
| Prior-art challenge (CN121483109B) | High (for the novelty claim) | Claim **system novelty** only; cite it; stress real puppet and real shadow physics |
| Over-claiming impact | High | Show the economic root cause honestly; claim a channel, not a cure |

---

## 11. Deployment, stakeholders and livelihood model [P]

| Stakeholder | Role | What CHAYA 2.0 gives them |
|---|---|---|
| Nimmalakunta / Narsaraopet masters (GI area) | Owners of the knowledge | Paid recording sessions, royalty per use of their routine, puppet sales, credit |
| CCRT ("Role of Puppetry in Education", NEP 2020) | Trains teachers | A coaching kit so teachers keep improving after the workshop ends |
| Guru Shishya Parampara via SZCC Thanjavur | Funds transmission | Measurable progress records for gurus and shishyas |
| Schools and colleges | New learners | Authentic, measurable puppetry lessons |
| Museums (National Crafts Museum, Sarmaya, state museums) | Public engagement | A "step behind the screen" installation with real puppets |
| Lepakshi Handicrafts / artisans | Sales channel | Every kit includes GI puppets bought from authorised producers |

**Business-model sketch.** A kit sold or rented to institutions (₹25–35k). Each kit includes authentic GI puppets. Masters earn per routine licensed, plus workshop fees. The shadow-only tier is free or low-cost for schools. **Present this as a hypothesis.**

---

## 12. IP, ethics and cultural ownership

| Topic | Position | Source |
|---|---|---|
| WIPO lists **puppet performances** among traditional cultural expressions (TCEs). Communities should control documentation of their culture. | Treat recorded routines as the community's TCE | [V] [WIPO TCE gap analysis](https://wipo.int/documents/d/igc/docs-en-tce_gap_analysis.pdf) · [WIPO pub 1023](https://tind.wipo.int/record/28634/files/wipo_pub_1023.pdf) |
| UNESCO Ethical Principles for Safeguarding ICH (2015): **free, prior, sustained and informed consent**; communities have the primary role | Written consent; withdrawal rights; community review | [V] [Wiki Loves Living Heritage: ethical sharing](https://meta.wikimedia.org/wiki/Wiki_Loves_Living_Heritage/Ethical_sharing) |
| India Copyright Act: §2(qq) "performer" includes "any other person who makes a performance". §38/38A give performers the exclusive right to make and exploit sound or visual recordings (50 years). | Recording a master's performance (video, and arguably motion data) needs their consent. **Motion data's legal status is untested [I].** | [V] [Legal School summary](https://thelegalschool.in/blog/rights-of-performers-under-copyright-law) · [Khurana & Khurana](https://khuranaandkhurana.com/?p=14069) |
| GI "Andhra Pradesh Leather Puppetry" | Buy and label puppets only from authorised producers; no laser-cut "Tholu Bommalata" replicas | [V] [IP India GIR 107](https://search.ipindia.gov.in/GIRPublicSearch/Application/Details/107) |
| Your own IP | Possible claim: "method of assessing shadow-puppet manipulation from penumbra/magnification of the real shadow fused with stick kinematics". Search InPASS and Google Patents first. CN121483109B and graphics literature may limit claims. | [I] |

---

## 13. Roadmap
| When | Milestone |
|---|---|
| Week 0 (before PPT) | PoC-1 to PoC-5; prior-art table; consent template; PPT |
| Weeks 1–3 | 3 stick nodes, time sync, shadow analysis pipeline, compact light rig |
| Weeks 4–5 | Master recording session (paid, consented): 20 phrases; scoring and feedback engine |
| Weeks 6–8 | Pilot with 6–12 novices (school or college); iterate thresholds with the master |
| Weeks 9–10 | Finale build: robust demo, shadow-only fallback, data slides |
| After SIH | CCRT/SZCC pilot; museum installation; troupe co-ownership agreement |

---

## 14. Evidence checklist before you submit

- [ ] PoC-1 graph (penumbra and magnification vs distance, with theory overlay)
- [ ] PoC-2 traces and DTW separation plot
- [ ] PoC-3 beat-alignment plot (optional but strong)
- [ ] ≥2 practitioner or institution conversations, with quotes and permission to quote
- [ ] Photo of your bought GI puppet; your own rig photos (front shadow plus hidden hands)
- [ ] Prior-art table (§4), honest
- [ ] Consent and benefit-sharing statement
- [ ] All statistics carry a source and year (no "6–8 troupes" without "c. 2015–17")

---

## 15. PPT blueprint (6 slides) [P]

**Slide 1: Title**
- Fields: PS ID SIH26214, title, theme, category, team ID, team name.
- Name: **"CHAYA VIDYA: The shadow is the score."**
- Hero image (your own photo, ideally): split frame, with the coloured Tholu Bommalata shadow on the left and the puppeteer's hidden hands and three sticks on the right.

**Slide 2: Proposed solution (problem + insight + solution)**
- Top line: *"The audience sees the shadow. The skill is in the hidden hands, and nobody records or coaches it."*
- 3 verified facts:
  1. Decline since the 1970s; families moved to crafts that pay. Older reports cite only 6–8 troupes still performing as a livelihood (c. 2015–17).
  2. Training happens inside families. New learners (CCRT teachers under NEP 2020, schools) have no master beside them.
  3. GI-tagged (2008); Padma Shri 2020 for Dalavai Chalapathi Rao.
- Insight box: *"A pressed puppet throws a sharp edge; a drifting one blurs and grows. w = s·d/(L−d)."*
- Solution in one line: clip-on sensors on the **real** sticks plus a camera that reads the **real** shadow's physics, giving master-referenced, fading feedback.
- Small two-sided diagram.

**Slide 3: Technical approach**
- Architecture diagram (§8.1).
- BOM highlights: BNO085 + ESP32 nodes, compact light, camera, mic, laptop or Pi.
- **The PoC-1 graph, the hero of the slide.**
- The three scores (CONTACT · TIMING · SHAPE) with one-line definitions.
- Note "no servos, no VR; AI only for alignment".

**Slide 4: Feasibility & viability**
- Cost ≈ ₹15–25k.
- PoC-2 and PoC-3 plots.
- Risks and mitigations (top 4 from §10).
- Gated plan (§13).
- A practitioner quote (PoC-4).

**Slide 5: Impact & benefits**
- Stakeholder ecosystem (§11) with logos: CCRT, SZCC, GSP, Lepakshi, museums.
- Livelihood loop: recorded routines bring royalties; kits buy GI puppets; workshops are paid teaching.
- KPIs (§9.2) and the planned learning study (§9.3).
- Ethics badge: consent + performer rights + GI-authentic.

**Slide 6: Research & references**
- **Prior-art comparison table:** columns = real puppet · real shadow · stick sensing · shadow-physics sensing · coaching feedback · master consent/royalty. Rows = Inker Robotics, CN121483109B, ShadowStory, Kinect systems, Wayang mocap, i-Treasures/Mingei, CHAYA 2.0.
- Short source list.

**Claims you may make:** "system-level novelty to our knowledge"; "uses the physics of the real shadow"; "keeps the traditional medium"; "PoC measured X".

**Claims you must not make:**
- "First in the world."
- "AI preserves the art."
- "Improves learning by N%" before the study.
- A current troupe count, unless you found a newer source.
- "India's shadow puppetry is not UNESCO-listed", unless you verified the current list.

---

## 16. Image and asset bank (check every licence; prefer your own photos)

| Asset | Source link | Licence note | Use in PPT |
|---|---|---|---|
| Tholu Bommalata performance and puppet images | [Wikipedia: Tholu bommalata](https://en.wikipedia.org/wiki/Tholu_bommalata) (images hosted on Wikimedia Commons) | Usually CC BY-SA; attribute per file | Slide 1/2 background if no own photo |
| Museum puppets (Govt catalogue) | [National Crafts Museum 26311](https://nationalcraftsmuseum.nic.in/artifacts-detail/26311) · [26306 Demon](https://nationalcraftsmuseum.nic.in/artifacts-detail/26306) · [26329 Male figure](https://nationalcraftsmuseum.nic.in/artifacts-detail/26329) | Government site; ask permission or cite | Slide 2 authenticity strip |
| Collection and guide images | [Sarmaya guide](https://sarmaya.in/guides/tholu-bommalata/) | Rights reserved; request permission | Slide 2 |
| Artisan and emporium | [Lepakshi: Dalavai Chalapathi Rao](https://lepakshihandicrafts.gov.in/artisans/dalavai-chalpathi-rao.html) · [Lepakshi leather puppets](https://lepakshihandicrafts.gov.in/leather-puppets.html) | AP Govt site; cite | Slide 5 ecosystem |
| Official tourism imagery | [Incredible India: leather puppetry](https://www.incredibleindia.gov.in/en/andhra-pradesh/amaravati/leather-puppetry) | GoI; cite | Slide 2 |
| Authoritative text quote | [Yojana Aug 2020](https://www.publicationsdivision.nic.in/journals/Journalarchives/Yojana/Yojana-English/2020/August/Yojana_2020_August_pdf.pdf) | Quote with citation | Slide 2 insight box ("pressed against the screen") |
| Competitor: robotic Tholpavakoothu | [Al Jazeera 2021](https://www.aljazeera.com/features/2021/7/5/technology-meets-tradition-keralas-robotic-leather-puppets) | Copyrighted; use a small credited thumbnail or text only | Slide 6 prior-art table |
| Competitor: CN121483109B | [Patsnap](https://eureka.patsnap.com/patent/CN121483109B) | Patent figures are generally reproducible with citation | Slide 6 |
| Competitor: CN203038033U drawing | [Google Patents](https://patents.google.com/patent/CN203038033U/zh) | Patent drawing, cite | Slide 6 |
| Competitor: ShadowStory | [ACM DOI](https://www.doi.org/10.1145/1978942.1979221) | ACM copyright; text reference only | Slide 6 |
| Competitor: NYU "Hands Behind the Light" | [project page](https://ima.shanghai.nyu.edu/projects/capstones/hands-behind-light-experiencing-forgotten-art-shadow-puppet-manipulation) | Rights reserved; text only | Slide 6 |
| Framework: i-Treasures / Mingei | [CORDIS i-Treasures](https://cordis.europa.eu/project/id/600676/de) · [Mingei (Waag)](https://waag.org/en/project/mingei) | Text reference | Slide 6 |
| Physics diagram | **Draw your own** penumbra/magnification diagram ([NVIDIA PCSS slides](https://http.download.nvidia.com/developer/presentations/2005/SIGGRAPH/Percentage_Closer_Soft_Shadows.pdf) for reference) | Own work | Slide 2/3 |
| UNESCO comparison | [UNESCO: Chinese shadow puppetry](https://ich.unesco.org/en/RL/chinese-shadow-puppetry-00421) | Text reference | Optional, slide 2 |

**Most persuasive images are ones you shoot yourselves:**
1. The bought GI puppet on your rig, from the front (coloured shadow) and the back (hands and sticks), as a split frame.
2. PoC-1, side by side: a sharp shadow vs a blurred, enlarged one at d = 10 cm.
3. A clip-on node on a bamboo stick, close up.

---

## 17. Final verdict

1. **Kill** the servo/teleoperation CHAYA. It is prior art (Inker 2021, Chinese patents, PolyU/CMU), and it removes the skill it claims to teach.
2. **Build CHAYA VIDYA 2.0**: instrumented real sticks, plus shadow-physics sensing, plus music sync, plus fading feedback, plus consented master references, plus a livelihood loop.
3. **Real novelty:** moderate and system-level. Measuring the real shadow's physics, with the hidden stick kinematics, for coaching a living Indian tradition. Not first in the world; cite CN121483109B and the rest.
4. **Biggest threat:** CN121483109B (feedback teaching, with virtual puppets).
5. **Must-have evidence:** the PoC-1 graph, PoC-2 data, practitioner validation, a bought GI puppet, an honest prior-art table, and a consent statement.
6. **CHAYA 2.0 vs KARGHA-SAAKSHI** (our other candidate) [I]:
   - **CHAYA 2.0** wins on visual storytelling and literal fit with "showcase heritage". Its problem evidence is moderate: the decline is documented, but skill transfer is not the only bottleneck.
   - **KARGHA** wins on problem severity: an institution has admitted on record it cannot distinguish handloom from powerloom.
   - **Pick CHAYA 2.0 only if you can get practitioner validation and the PoC-1 graph within the week.** Otherwise KARGHA, with its scanner test, is the safer selection bet.

---

## 18. Source index (grouped)
- **SIH:** [PS mirror](https://github.com/vedantchalke36/sih-2026-problem-statements) · [2023 results mirror](https://github.com/DuanBoomer/Smart-India-Hackathon-Result-Analysis) · [IGNOU guidelines copy](https://www.ignou.ac.in/viewFile/NCIDE/notification/Guidelines-SIH-2026.pdf) · [Reskilll template (unofficial)](https://reskilll.com/blogs/sih-2026-ppt-template-exact-format-slides-evaluators-score/) · [winning decks archive](https://github.com/JoysonBeera/sih-winning-presentations)
- **Culture:** [Wikipedia](https://en.wikipedia.org/wiki/Tholu_bommalata) · [Sahapedia](https://www.sahapedia.org/tholu-bommalata-telugu-shadow-puppet-theatre) · [Britannica](https://www.britannica.com/art/tholu-bommalata) · [Yojana Aug 2020](https://www.publicationsdivision.nic.in/journals/Journalarchives/Yojana/Yojana-English/2020/August/Yojana_2020_August_pdf.pdf) · [UNIMA WEPA](https://wepa.unima.org/en/tolu-bommalatam/) · [Indpaedia](http://indpaedia.com/ind/index.php/Tholu_Bommalata) · [Homegrown](https://homegrown.co.in/homegrown-creators/tholu-bommalaata-the-centuries-old-shadow-puppetry-tradition-of-andhra-and-telangana) · [The National](https://www.thenationalnews.com/arts-culture/2023/09/30/indian-puppetry-storytelling/) · [Incredible India](https://www.incredibleindia.gov.in/en/andhra-pradesh/amaravati/leather-puppetry) · [IP India GIR 107](https://search.ipindia.gov.in/GIRPublicSearch/Application/Details/107) · [Dalavai Chalapathi Rao](https://en.wikipedia.org/wiki/Dalavai_Chalapathi_Rao) · [K. K. Ramachandra Pulavar](https://en.wikipedia.org/wiki/K._K._Ramachandra_Pulavar) · [Onmanorama](https://www.onmanorama.com/entertainment/art-and-culture/2019/02/01/how-keralas-puppetry-has-emerged-from-shadow.amp.html) · [MAP Academy: Ravanachhaya](https://mapacademy.io/?p=3680) · [UNESCO Chinese shadow puppetry](https://ich.unesco.org/en/RL/chinese-shadow-puppetry-00421) · [India ICH list](https://en.wikipedia.org/wiki/List_of_Intangible_Cultural_Heritage_elements_in_India)
- **Institutions:** [CCRT puppetry workshop](https://ccrtindia.gov.in/program_schemes/workshop-titled-role-of-puppetry-in-education) · [Arunachal Times](https://arunachaltimes.in/?p=248547) · [GSP scheme](https://myscheme.gov.in/schemes/gsp) · [Lepakshi](https://lepakshihandicrafts.gov.in/leather-puppets.html) · [Sarmaya](https://sarmaya.in/guides/tholu-bommalata/) · [National Crafts Museum](https://nationalcraftsmuseum.nic.in/artifacts-detail/26311) · [NID OE](https://openelective.nid.edu/CourseAbstract/OE25B16.pdf) · [Rooftop workshops](https://rooftopapp.com/blogs/tag/tholu-bommalata-workshop/)
- **Prior art:** [Inker (Al Jazeera)](https://www.aljazeera.com/features/2021/7/5/technology-meets-tradition-keralas-robotic-leather-puppets) · [ShadowStory](https://www.doi.org/10.1145/1978942.1979221) · [Kinect shadow puppets](https://repository.uic.edu.cn/handle/39GCC9TT/6597?mode=full) · [MPU Kinect learning](https://research.mpu.edu.mo/en/publications/a-study-on-design-of-manipulation-of-shadow-puppet-game-based-lea/) · [NYU Shanghai](https://ima.shanghai.nyu.edu/projects/capstones/hands-behind-light-experiencing-forgotten-art-shadow-puppet-manipulation) · [Wayang Kelantan mocap](https://www.academia.edu/73434451/The_Use_of_a_Motion_Capture_Facility_to_Capture_the_Puppeteer_and_Puppets_Movements_in_Wayang_Kulit_Kelantan_Performance) · [MDPI AI-MoCap](https://www.mdpi.com/2414-4088/10/5/46) · [Manual Input Sessions](https://www.mat.ucsb.edu/g.legrady/academic/courses/08s594/prj/mc/index.html) · [eShadow](https://dipp.math.bas.bg/dipp/article/view/217) · [PolyU robotic puppet](https://research.polyu.edu.hk/en/publications/motion-control-of-a-robotic-puppet-through-a-hybrid-motion-captur/) · [CMU marionette](https://ri.cmu.edu/?p=122018) · [i-Treasures](https://cordis.europa.eu/project/id/600676/de) · [Mingei](https://www.cordis.europa.eu/project/id/822336)
- **Patents:** [CN121483109B](https://eureka.patsnap.com/patent/CN121483109B) · [CN203038033U](https://patents.google.com/patent/CN203038033U/zh) · [US9454236](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/9454236) · [US8633933](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8633933)
- **Technology and learning science:** [MPU-6050 yaw drift (TDK)](https://adm.invensense.tdk.com/mpu-6050-yaw-over-time) · [NVIDIA PCSS penumbra](https://http.download.nvidia.com/developer/presentations/2005/SIGGRAPH/Percentage_Closer_Soft_Shadows.pdf) · [Guidance hypothesis (Frontiers 2016)](https://www.frontiersin.org/articles/10.3389/fnins.2016.00251/full) · [Haptic guidance vs error amplification (Frontiers 2015)](https://www.frontiersin.org/journals/systems-neuroscience/articles/10.3389/fnsys.2015.00052/full) · [Error-augmentation review (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6033222/)
- **Ethics and IP:** [WIPO TCE gap analysis](https://wipo.int/documents/d/igc/docs-en-tce_gap_analysis.pdf) · [WIPO pub 1023](https://tind.wipo.int/record/28634/files/wipo_pub_1023.pdf) · [Ethical sharing (UNESCO principles)](https://meta.wikimedia.org/wiki/Wiki_Loves_Living_Heritage/Ethical_sharing) · [Performer rights (India)](https://thelegalschool.in/blog/rights-of-performers-under-copyright-law)
