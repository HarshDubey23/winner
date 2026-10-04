// Sections 0–7 of the PARAMPARA final dossier.
module.exports = function (L) {
  const { P, H1, H2, H3, BL, NL, T, Box, Code, Fig, COLOR, spacer } = L;
  const fig = (n) => require("path").join(__dirname, "..", "figures", n);
  const out = [];
  const add = (...xs) => xs.forEach((x) => (Array.isArray(x) ? out.push(...x) : out.push(x)));

  // ---------------------------------------------------------------- 0
  add(H2("Contents"));
  add(T([0.6, 4.4], null, [
    ["1", "Executive summary"], ["2", "What we merged and how we decided"], ["3", "Reference audit: what was wrong in the source documents"],
    ["4", "The problem, with proof"], ["5", "The final solution: PARAMPARA"], ["6", "Learning-science foundation"],
    ["7", "Our simulation of the fade engine"], ["8", "Innovation: where exactly we innovate"], ["9", "Novelty: evidence and prior-art matrix"],
    ["10", "Feasibility"], ["11", "Viability"], ["12", "Impact"], ["13", "Where else PARAMPARA works: tabla, pottery, puppetry, dance and more"],
    ["14", "How PARAMPARA will fascinate the jury"], ["15", "Validation and research plan"], ["16", "Limitations and honest risks"],
    ["17", "Roadmap"], ["18", "Pre-submission checklist"], ["19", "References"], ["A–C", "Appendices: parameters, pseudo-code, glossary"],
  ], { size: 18, cantSplit: true }));

  add(H1("0. How to read this document", true));
  add(P("This is the **final, merged research dossier** for PARAMPARA. It combines the team's two earlier documents (a 13-page *Executive Summary* PDF and the *Research & Engineering Dossier*), checks every reference in both against live sources, adds about 60 new sources, and adds our own simulation of the fade engine. Every important claim carries a numbered citation like [1] that points to Section 19."));
  add(H3("Claim labels (kept from the engineering dossier)"));
  add(T([1.3, 4], ["Label", "Meaning"], [
    ["[Established]", "Well replicated in the literature or standard engineering practice."],
    ["[Plausible]", "Reasonable inference, or the evidence is mixed."],
    ["[Design choice]", "Our decision. It can be changed."],
    ["[Target]", "A number we must measure on our prototype. It is not a result yet."],
    ["[To validate]", "Needs interviews, a bench test or the pilot before we can claim it."],
  ], { boldFirstCol: true }));
  add(H3("Reference status (shown at the end of every entry in Section 19)"));
  add(T([1.3, 4], ["Status", "Meaning"], [
    ["V", "Verified in this session by live web search (October 2026). Numbers quoted from these sources were read in the search results."],
    ["P", "The work exists, but some bibliographic details (pages, co-authors, exact year) come from memory. Re-check before the final deck."],
    ["S", "Standard or classic reference carried over from the dossier. Widely cited, not re-checked this session."],
  ], { boldFirstCol: true }));
  add(Box("Three honesty rules used throughout", [[
    "Nothing in this document is a measured result from our prototype unless it says so. Bench and pilot numbers are written as [Target].",
    "The only numbers we generated ourselves come from the simulation in Section 7. It tests the controller, not human learning.",
    "Rupee figures are indicative October 2026 estimates. Replace them with real quotes before submission.",
  ]], COLOR.blue, "EEF3F8"));

  // ---------------------------------------------------------------- 1
  add(H1("1. Executive summary", true));
  add(Box("One-line pitch", ["**Video shows how a master plays. PARAMPARA lets a student feel when and how hard the master strikes, then steps back until the student can play alone.**"]));
  add(H3("The problem"));
  add(BL([
    "Tabla is learned through *talim*: years of face-to-face imitation of a guru. The guru's timing and touch are **tacit knowledge**. Notation and video record *what* is played, not *how it feels* to play it [@polanyi1966; @nonaka1995].",
    "Demand is large and structured. The Akhil Bharatiya Gandharva Mahavidyalaya Mandal alone examines **more than one lakh music students a year at about 800 centres** [@abgmvm]. The State already pays for hand-to-hand transmission through the Guru-Shishya Parampara scheme [@gsp] and, for crafts, PM Vishwakarma, with **about 30 lakh artisans registered** [@pmv].",
    "Masters are mortal. When Ustad Zakir Hussain died on 15 December 2024 [@zakir], his recordings remained. What cannot be recovered is the talim. No format in common use stores a master's stroke timing and strength as data that a learner can feel and be measured against.",
  ]));
  add(H3("The solution: four pillars"));
  add(NL([
    "**Capture (Skill Envelope).** Piezo triggers on the drums and wrist motion sensors record each stroke's time, hand, stroke family, relative strength, micro-timing and arm movement. No glove, so the guru's touch is not changed.",
    "**Transmit by touch.** Two wrist cuffs with four linear resonant actuators (LRAs) replay the guru's timeline as short vibration codes: which hand, which stroke family, how strong, exactly when.",
    "**Fade, then prove learning.** A probe-anchored fade engine withdraws the cues as the student improves. Success is measured with the device *off*, in a delayed retention test, because that is how motor-learning science defines learning [@schmidtlee; @salmoni1984].",
    "**Sign the lineage.** Each envelope is signed with the guru's key, carries consent terms, and links to its parent by hash. A student can record a signed variation only with the guru's approval. Edit one byte and verification fails.",
  ]));
  add(H3("Why we believe it can work: evidence, not hope"));
  add(T([3.2, 2.2, 0.8], ["Published evidence", "Key number", "Source"], [
    ["Drumming task: haptic + audio training vs audio alone", "−17% final velocity error; −18% early timing error", "[@grindlay2008]"],
    ["3-D movement: haptic vs visual training", "Timing learned better from haptics; shape from vision", "[@feygin2002]"],
    ["Violin bowing with vibrotactile feedback (MusicJacket)", "Improved bowing; half kept the gain without feedback; no control learner matched it", "[@vanderlinden2011]"],
    ["Vibrotactile drum + strength cues on the body", "96.18% recognition (target drum and 2 strength levels)", "[@leechoi]"],
    ["Tactile vs auditory metronome, simple rhythms, large contact area", "Tactile synchronisation close to auditory", "[@ammirante2016]"],
    ["Piano: vibrotactile vs visual cues (n = 14)", "Timing error 12.1% vs 22.3%", "[@coscia2024]"],
    ["Feedback on 50% vs 100% of trials", "Worse in practice, better at retention", "[@winstein1990]"],
    ["Vibration sites on the wrist", "About 2 per side, 4 using both sides: our 4-site code", "[@chen2008]"],
  ]));
  add(H3("What is new"));
  add(P("The parts exist: an electronic tabla controller (2002) [@kapur2002], the Haptic Drum Kit (2010) [@holland2010], MusicJacket (2011) [@vanderlinden2011], and a tabla gesture glove for singers (Layika, NIME 2026) [@layika2026]. In our searches we found **no work that combines** (a) glove-free capture of a specific master's stroke timing and strength, (b) faded haptic replay whose success criterion is unaided retention, and (c) a consented, signed, hash-linked lineage of skill data, for any Indian art form. Section 9 shows the prior-art matrix and the search log."));
  add(H3("Honest scorecard"));
  add(T([1.2, 0.7, 3, 2.2], ["Dimension", "Score /10", "Strongest proof", "Main risk"], [
    ["Innovation", "9", "Seven specific innovations (Section 8); the system combination is absent from prior art", "A judge may dismiss it as 'just vibration'"],
    ["Novelty", "8", "No work in the matrix ticks all six columns (Section 9)", "Haptic Bracelets already send live teacher-to-learner cues; we cite them"],
    ["Feasibility", "8", "All parts off the shelf; ESP-NOW round trip about 2.4 ms [@espnow]; LRA auto-resonance driver [@drv2605l]; 4-week build plan", "Piezo cross-talk; crowded 2.4 GHz at the venue"],
    ["Viability", "7", "About ₹6,000–7,500 prototype; existing government channels [@gsp; @snaich; @pmv]; over one lakh exam-takers a year [@abgmvm]", "Willingness to pay is not yet tested"],
    ["Impact", "8", "Preservation, access, measurable learning, extends to pottery, puppetry and dance (Section 13)", "Pilot will be small"],
    ["Jury appeal", "9", "Judge wears the cuff within 60 seconds; live tamper test; zero-guidance probe", "Demo failure, so we keep a backup video"],
  ], { boldFirstCol: true }));
  add(H3("What changed compared with the two source documents"));
  add(BL([
    "**Two fabricated references removed** and several mis-cited ones corrected (Section 3).",
    "**Guru glove dropped from the core design.** Flex and FSR sensors on the fingers change how a guru plays and add slow, noisy channels. Piezo plus wrist IMU is kept (Section 2).",
    "**Coin ERM motors replaced** by LRAs with DRV2605L drivers, using **4 skin sites**, which is what wrist-localisation data supports [@chen2008].",
    "**Fade rule fixed.** Our simulation showed that the dossier's constants never reach zero guidance within a 48-cycle pilot. Fade Engine 2.0 does, and it stays stable (Section 7).",
    "**Signing moved to a standard.** Ad-hoc 'hash the JSON and sign it' becomes COSE_Sign1 over deterministic CBOR with Ed25519 [@rfc9052; @rfc8949; @rfc8032].",
    "**Two evaluation plans merged** into a staged design: a within-subject pilot for SIH, then a four-arm trial (Section 15).",
  ]));

  // ---------------------------------------------------------------- 2
  add(H1("2. What we merged and how we decided"));
  add(P("The two source documents disagreed on twelve design points. Our rule: keep whichever choice has stronger published evidence; when neither has, choose the simpler and more testable option."));
  add(T([1.1, 1.8, 1.8, 3.6], ["Topic", "Executive Summary PDF", "Engineering dossier", "Final decision and reason"], [
    ["Guru capture", "Data glove: wrist IMU, flex sensor per finger, FSR pads, plus piezo", "Piezo per drum, wrist IMU, optional mic; no glove", "**Dossier.** A glove changes the guru's touch and tone, which is exactly what we want to preserve. Stroke categories can be recovered from audio and piezo signals [@rohit2021; @rohit2023]. The glove becomes a Phase 3 research option."],
    ["Student actuators", "Coin ERM motors, 2–3 on one band", "LRA + DRV2605L, 2 per cuff, 2 cuffs", "**Dossier.** LRAs resonate near the Pacinian peak around 250 Hz [@bolanowski1988]; the driver's closed loop gives fast start and braking [@drv2605l]. ERM stays as the budget fallback."],
    ["Skin sites", "2–3 on one wrist and forearm", "4: dorsal and palmar on each wrist", "**4 sites**, the measured limit for the wrist [@chen2008]. Which hand is encoded by which wrist."],
    ["Envelope format", "JSON, SHA-256, Ed25519 or ECDSA", "Deterministic CBOR, Ed25519", "**COSE_Sign1 over deterministic CBOR with Ed25519** [@rfc9052; @rfc8949; @rfc8032]. JSON export for people to read."],
    ["Similarity score", "Weighted Euclidean distance; pass at 90%", "Exponential score with bias-corrected timing", "**Dossier.** People tap tens of milliseconds early [@repp2005], so precision is scored separately from bias."],
    ["Fade rule", "±0.2 steps at 90% / 80% thresholds", "Multiplicative fade with hysteresis and probes", "**Fade Engine 2.0**, chosen after simulation (Section 7)."],
    ["Evaluation", "3 groups (video / video + metronome / PARAMPARA), n = 30–45, repeated-measures ANOVA, 1-week retention", "Within-subject crossover, n = 12–15, 24-hour retention", "**Both, staged.** Crossover pilot for SIH; four-arm trial afterwards that adds metronome and fixed-fade arms (Section 15)."],
    ["Cost", "About US$52 per band", "₹6,000–7,500 per complete system (driver count corrected)", "**Dossier**, with one DRV2605L per actuator."],
    ["Claim", "'Transmitting the kinesthetic feel of a guru's stroke'", "Timing, hand, family and 3 strength levels only", "**Dossier's narrow claim.** Overclaiming is the fastest way to lose a technical jury."],
    ["Lineage rule", "'Gharana kabhi merge nahi hota'", "Gharanas influenced each other; no automatic blending", "**Dossier.** Lucknow grew from Delhi, and Farrukhabad and Benares from Lucknow [@gharanas]. The rule is: no blending without the consent of every guru involved."],
    ["Timeline", "V1 6–8 weeks, V2 3–4 months, V3 6–8 months", "4-week build, 36-hour hackathon plan", "Dossier plan for SIH; the PDF's V1–V3 become the post-SIH roadmap (Section 17)."],
    ["Live mode", "Not specified", "Live Mirror, target 50 ms or less", "Kept as a secondary demo. Prior art exists (teacher-and-learner Haptic Bracelets [@holland2018]), so it is not claimed as new."],
  ], { size: 16 }));

  // ---------------------------------------------------------------- 3
  add(H1("3. Reference audit: what was wrong in the source documents"));
  add(P("A judge who clicks one wrong reference will distrust all the others. We checked every reference in both documents with live web searches in October 2026."));
  add(T([0.3, 2.6, 2.6, 2], ["#", "Claim as written", "What we found", "Action"], [
    ["1", "Grindlay: haptic + audio reduced timing and velocity errors by about 17–18%", "Numbers correct: −17% final velocity error, −18% early-stage timing error, compared with audio alone", "Keep [@grindlay2008]"],
    ["2", "'Grindlay (2008), Proc. 16th ACM Int'l Conf. on Multimedia, pp. 481–484'", "Venue does not match. The study is the 2008 IEEE haptics symposium paper and the 2007 MIT thesis", "Corrected [@grindlay2007]"],
    ["3", "'Masur, D. A., & Sacks, O. Gesture-Based Adaptive Haptic Guidance in Motor Skills. IEEE Robotics (2025)'", "**No such paper.** The closest real work is Zahedi et al. (2017), IEEE Robotics and Automation Letters", "**Removed.** Cite the real paper only where relevant [@zahedi2017]"],
    ["4", "'Flandorfer, P., et al. Wearable Haptic Learning Systems: A Survey. Sensors 22(4):1564 (2022)'", "**Not found** in any search", "**Removed.** Use the Sigrist et al. review instead [@sigrist2013]"],
    ["5", "'Johnson, R. M. G., MusicJacket, CHI 2010 WIP' and 'IEEE TIM 2009'", "The CHI 2010 paper exists; the IEEE TIM paper is 2011, 60(1):104–113", "Years corrected [@johnson2010; @vanderlinden2011]"],
    ["6", "'SparkFun buying guide' cited for IMU specifications", "A vendor web page, not research", "Replaced by datasheets"],
    ["7", "Kapur et al., 'Journal of New Music Research 32(4)'", "Verified version: NIME 2002, pp. 108–112", "Cite NIME [@kapur2002]"],
    ["8", "Feygin et al.: haptics helped timing more than shape", "Confirmed: timing dominated by haptic training, shape by visual training", "Keep [@feygin2002]"],
    ["9", "'Learners reported achievement with minimal feedback' (PDF markers 【35†L1-L4】)", "These are chat-tool line markers, not references. The claim cannot be traced", "**Removed.** We cite what MusicJacket actually measured"],
    ["10", "'【15†L53-L60】 coin vibrator about $0.5'", "Chat-tool marker, not a source", "Replaced with datasheets and indicative prices"],
    ["11", "Huang and Starner: 'passive haptic learning, piano fingering'", "Two separate works: PianoTouch (ISWC 2008) and Mobile Music Touch (CHI 2010). A 2024 study shows results depend on task", "Cited separately [@huang2008; @huang2010; @coscia2024]"],
    ["12", "Holland et al. (2010), Haptic Drum Kit", "Confirmed: beginners learned intricate patterns from haptic stimuli alone", "Keep [@holland2010]"],
    ["13", "Raman & Kumar (1920), Nature 104", "Confirmed: 104(2620), p. 500", "Keep [@raman1920]"],
  ], { size: 16 }));
  add(Box("Rule for the final deck", ["Put only V-status references on slides, or P and S references that a team member has opened and checked. Section 19 gives the status of every entry."], COLOR.red, "FBEFEF"));

  // ---------------------------------------------------------------- 4
  add(H1("4. The problem, with proof"));
  add(H2("4.1 Tacit knowledge is the bottleneck"));
  add(P("Polanyi's line 'we know more than we can tell' describes tabla well [@polanyi1966]. Nonaka and Takeuchi's SECI model describes four ways knowledge moves: socialisation (tacit to tacit), externalisation (tacit to explicit), combination (explicit to explicit) and internalisation (explicit to tacit) [@nonaka1995]. Guru–shishya talim is almost pure socialisation. It works, but it cannot reach beyond the guru's room or lifetime. **PARAMPARA is designed as an externalisation machine (the Skill Envelope) joined to an internalisation machine (faded haptic practice).**"));
  add(T([1.2, 2, 3], ["SECI mode", "In traditional talim", "In PARAMPARA"], [
    ["Socialisation", "Sitting with the guru", "Still central. The guru records, approves readiness and keeps control"],
    ["Externalisation", "Rare. Notation captures bols, not feel", "Skill Envelope: micro-timing, dynamics, stroke family, arm kinematics, signed"],
    ["Combination", "Collections of compositions in notebooks", "Library and lineage graph of signed envelopes"],
    ["Internalisation", "Riyaz (daily practice)", "Haptic replay with fading; success = unaided retention"],
  ], { boldFirstCol: true }));
  add(H2("4.2 Why tabla is the right first case"));
  add(BL([
    "**Measurable.** Every stroke is a discrete percussive event. Onsets can be timestamped to a fraction of a millisecond at 4 kHz sampling with standard methods [@bello2005].",
    "**Scientifically Indian.** C. V. Raman showed in 1920 that the loaded membrane of the tabla and mridangam produces harmonic overtones, an exception among drums [@raman1920; @raman1934].",
    "**Rich lineage.** Six commonly listed gharanas descend from one another (Delhi to Ajrada and Lucknow; Lucknow to Farrukhabad and Benares; Punjab separate) [@gharanas]. That makes it an ideal test case for provenance.",
    "**Data and models exist.** Tabla stroke recognition has been studied since 2003 [@gillet2003; @chordia2005]; open datasets and CNN classifiers now separate damped, resonant-treble and resonant-bass strokes [@rohit2021; @rohit2023]; Hindustani corpora come from CompMusic [@compmusic].",
  ]));
  add(P("Demo content: the Teentaal theka, 16 matras in 4 + 4 + 4 + 4, at a slow-to-medium tempo of about 80 matras per minute."));
  add(T([1, 1, 1, 1, 1, 1, 1, 1, 1], null, [
    ["Matra", "1", "2", "3", "4", "5", "6", "7", "8"], ["Bol", "Dha", "Dhin", "Dhin", "Dha", "Dha", "Dhin", "Dhin", "Dha"],
    ["Matra", "9", "10", "11", "12", "13", "14", "15", "16"], ["Bol", "Dha", "Tin", "Tin", "Ta", "Ta", "Dhin", "Dhin", "Dha"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("4.3 Scale and stakes"));
  add(T([1.8, 2.1, 0.7, 2.6], ["Indicator", "Figure", "Source", "What it means for us"], [
    ["Classical music examinees (ABGMVM)", "More than 1 lakh a year; about 800 centres", "[@abgmvm]", "Structured, exam-driven learners exist at scale"],
    ["Households learning music", "More than 15 million (industry estimate)", "[@musiclearners]", "A market signal, not an audited figure"],
    ["Online classical platforms", "Darbar Academy, myGurukul and others, all video-first", "[@apps]", "The video channel is crowded; the touch channel is empty"],
    ["India's UNESCO ICH elements", "16, after Deepavali was added in Dec 2025 at the committee India hosted", "[@deepavali2025]", "Heritage transmission is a national priority"],
    ["State support for transmission", "Guru-Shishya Parampara honoraria via 7 Zonal Cultural Centres; SNA's ICH scheme", "[@gsp; @snaich]", "Existing budget lines a device can plug into"],
    ["Artisans", "About 64.66 lakh; handicraft exports ₹33,122.79 crore (2024–25)", "[@handicrafts]", "The same tacit-skill problem exists in crafts (Section 13)"],
    ["Global precedent", "Japan has certified 'Living National Treasures' since 1950; UNESCO Living Human Treasures", "[@japanlnt]", "Masters are treated as national assets, and they are mortal"],
  ], { size: 16 }));
  add(H2("4.4 Why video and apps are not enough"));
  add(BL([
    "Vision has low temporal resolution for following rhythm. Hearing is accurate, but it cannot say which limb does what. Touch can address each limb separately [@holland2018].",
    "Haptic guidance teaches timing better than visual demonstration [@feygin2002]. In piano learning, vibrotactile cues gave about half the timing error of visual cues [@coscia2024].",
    "Apps cannot measure unaided retention, because they do not sense the student's strokes against a master's reference.",
    "Touch is not magic. Haptic guidance can also *harm* learning when the learner becomes passive [@heuer2015; @salmoni1984]. That is why fading is part of the core design, not an add-on.",
  ]));
  add(Box("Problem statement", ["Indian performing and craft traditions pass on skill through years of face-to-face imitation. The timing, force and movement of a master's hands are not stored in any form a learner can feel or be measured against. When masters retire or pass away, and when students live far from them, that knowledge is lost. **We need a low-cost device that captures a master's skill as verifiable data, transmits it through touch, and proves that the student has learned it without the device, under the master's consent and control.**"]));
  add(H3("How PARAMPARA maps to PS 26214"));
  add(T([1.3, 4], ["PS 26214 element", "PARAMPARA answer"], [
    ["Hardware (category)", "Two wearable cuffs and an instrument-mounted base unit built on ESP32, sensors and haptic drivers"],
    ["Rich cultural heritage and traditions", "Guru–shishya parampara of Hindustani tabla, an intangible heritage practice; extendable to crafts and dance"],
    ["Student innovation", "A student-built prototype with a testable learning claim and a published-style evaluation"],
    ["Showcase", "A judge wears the cuff and feels a master's rhythm in under a minute"],
  ], { boldFirstCol: true }));

  // ---------------------------------------------------------------- 5
  add(H1("5. The final solution: PARAMPARA"));
  add(H2("5.1 Concept and modes"));
  add(P("The same base unit and cuff hardware serve both guru and student; firmware selects the role. [Design choice]"));
  add(T([1, 1, 3.4, 0.9], ["Mode", "Who", "What happens", "Priority"], [
    ["Record", "Guru", "Plays a phrase in a chosen taal and tempo. Base unit and wrist IMUs build the envelope. The guru reviews, labels and signs.", "Must"],
    ["Replay", "Student", "The envelope plays as haptic cues from a timeline stored on the cuffs. The base unit scores each stroke; the fade engine adapts.", "Must (main demo)"],
    ["Assess", "Student", "Probe cycles with no cues produce the unaided retention score.", "Must"],
    ["Branch", "Student, after approval", "Records an own variation (paltā) as a signed child envelope.", "Should"],
    ["Verify", "Anyone", "Drag in an envelope; see signer and lineage. Change one byte and verification fails.", "Should"],
    ["Live Mirror", "Guru and student", "The guru plays live; the student feels strokes within about 50 ms. Prior art exists, so this is a demo feature, not a claim.", "Could"],
  ], { boldFirstCol: true }));
  add(H2("5.2 Architecture"));
  add(Fig(fig("architecture.png"), 600, 320, "Figure 1. PARAMPARA architecture. Guru side records; student side replays, assesses and branches; the app signs and verifies."));
  add(P("**Replay data flow.** (1) The app loads a signed envelope and verifies the signature. (2) It sends the cue schedule (times, site, level) to both cuffs. (3) The base unit sends a start beat; cuffs align clocks and fire cues from local hardware timers. (4) The student plays; the base unit timestamps strokes and sends them to the app. (5) The app aligns, scores, updates the guidance level and sends the next schedule."));
  add(P("**Timing principle.** Cues are scheduled locally on the cuffs from a shared timeline, not streamed one by one, so radio jitter cannot affect cue timing. [Design choice]"));
  add(H2("5.3 What we capture, and what we do not"));
  add(T([2, 1, 2.8], ["Dimension", "Captured?", "How"], [
    ["Stroke time and tempo", "Yes", "Piezo trigger and microsecond timestamp"],
    ["Micro-timing against the tempo grid", "Yes", "Residuals from a least-squares tempo fit (5.4)"],
    ["Which hand", "Yes", "One sensor per drum"],
    ["Stroke strength", "Partly", "Peak amplitude, relative within the phrase"],
    ["Resonant versus damped", "Partly", "Decay time; optional microphone [To validate]"],
    ["Arm lift and swing", "Partly", "Wrist IMU; shown visually, not as vibration"],
    ["Finger shape, contact point, bayan heel pressure, tone colour", "No", "Future: high-speed camera, EMG, pressure sensing. Not claimed."],
  ]));
  add(P("Our claim stays narrow: **PARAMPARA transmits rhythm, timing, hand, stroke family and intensity, not 'the feel of the whole hand'.** [Design choice]"));
  add(H2("5.4 The Skill Envelope"));
  add(P("For a theka played at beat level, fit a straight line to the onset times t_i by least squares:"));
  add(Code(["t_i ≈ t0 + i·T + d_i          (T, t0) = argmin Σ (t_i − t0 − i·T)²"]));
  add(P("T is the guru's tempo (ms per matra) and the residuals **d = (d_1 … d_n) are the guru's micro-timing profile**. Relative dynamics are a_i = A_i / median(A), so sensor coupling cancels. Together with stroke family f_i, hand h_i and arm kinematics κ_i, these vectors are what we mean by 'feel'. Nothing more mystical. Whether students can perceive and imitate d is a hypothesis for the pilot. [To validate]"));
  add(T([1.2, 1.3, 3.5], ["Field", "Type", "Meaning"], [
    ["v, taal, matras, T_ms", "uint, text, uint, float", "Format version, taal, cycle length, fitted tempo"],
    ["strokes[]", "array", "Per stroke: t (ms), hand (0 L, 1 R, 2 both), fam (0–4), a (relative amplitude), tau (decay, ms), kin (3 × int16)"],
    ["d[]", "array", "Micro-timing residuals (ms)"],
    ["meta", "map", "Title, gharana/lineage tag, tuning note, capture configuration, created time"],
    ["parent", "32 bytes, optional", "SHA-256 of the parent envelope"],
    ["consent", "map", "use (replay / teach), branch, commercial, expires, custodian"],
    ["license", "32 bytes", "Hash of the licence text"],
    ["(COSE wrapper)", "COSE_Sign1", "Protected header (alg = EdDSA, key id), payload, 64-byte signature"],
  ]));
  add(P("Size is about 15–25 bytes per stroke, so a 16-stroke phrase repeated 8 times is a few kilobytes. [Plausible]"));
  add(H2("5.5 The haptic language"));
  add(T([1.3, 1.1, 0.7, 0.8, 0.9, 1], ["Family", "Typical bols", "Cuff", "Site", "Pulse", "Intended feel"], [
    ["F1 dayan resonant", "Na/Ta, Tin, Tun", "Right", "Dorsal", "1 × 60 ms", "Round tap"],
    ["F2 dayan damped", "Te, Tit", "Right", "Palmar", "1 × 30 ms", "Short tick"],
    ["F3 bayan open", "Ge/Ghe", "Left", "Dorsal", "1 × 80 ms", "Long, low"],
    ["F4 bayan damped", "Ka/Ke", "Left", "Palmar", "1 × 30 ms", "Short tick"],
    ["F5 both", "Dha, Dhin", "Both", "Dorsal", "1 × 80 ms", "'Together'"],
  ], { size: 16 }));
  add(BL([
    "**Why four sites:** about two vibration locations can be told apart on each side of the wrist, about four using both sides [@chen2008]. Location carries 'which hand'; duration and site carry 'which family'. Tactile messages built from rhythm, intensity and location are called tactons [@brewster2004]; keep the code small [@jones2008].",
    "**Three intensity levels** at about ×2, ×3.5 and ×6 of each user's detection threshold [Plausible]. Evidence: drum identity plus **two** strength levels, coded by intensity and duration, reached 96.18% recognition [@leechoi]. Amplitude discrimination on skin is coarse, with Weber fractions of tens of percent [@gescheider1997], so adjacent levels differ by about ×1.7. Three levels must be tested (hypothesis H2).",
    "**Why LRAs:** they resonate near the Pacinian channel's best frequency around 250 Hz [@bolanowski1988]. The DRV2605L runs the LRA at resonance automatically and supports real-time amplitude per pulse [@drv2605l].",
    "**Tempo limit for the MVP:** inter-stroke interval of at least 400 ms (slow to medium laya), so pulses on one site do not merge. Drut laya is future work. [Design choice]",
  ]));
  add(H2("5.6 Anticipation-compensated cue timing"));
  add(P("People tapping with a pacing signal usually tap tens of milliseconds early (negative mean asynchrony), and musicians less so [@repp2005]. Actuators also take time to reach a perceptible vibration. PARAMPARA therefore commands each cue at"));
  add(Code(["c_i = E_i + m − ℓ_a"]));
  add(P("where E_i is the master's expected stroke time, m is the user's own anticipation measured by tapping along with 20 cues, and ℓ_a is the actuator latency measured once per cuff with an accelerometer. The ℓ_a term makes the vibration start on time; the m term shifts cues slightly later so an anticipating student lands on the master's micro-timing. [Design choice; To validate]"));
  add(H2("5.7 Scoring"));
  add(Code([
    "e_t,i  = t_student,i − E_i                    timing error (ms)",
    "e'_t,i = e_t,i − b_cycle                      bias-corrected (b_cycle = cycle median)",
    "e_A,i  = 20·log10(a_student,i / a_guru,i)     strength error (dB)",
    "m_i    = 1 if the stroke family matches, else 0",
    "S_i    = w1·exp(−|e'_t,i|/σ_t) + w2·exp(−|e_A,i|/σ_A) + w3·m_i",
    "S_k    = mean of S_i over the cycle (miss = 0; extra stroke = small penalty)",
  ]));
  add(P("Starting values: w = 0.5 / 0.25 / 0.25, σ_t = 35 ms, σ_A = 4 dB; bias is penalised only when |b_cycle| > 60 ms. All are [Design choice], to tune with pilot data. We report **bias (accuracy)** and **spread (precision)** separately so that a student is not punished for normal anticipation. Fixed-tempo replay matches each student stroke to the nearest expected stroke within ±T/2; free-tempo phrases (later) will use dynamic time warping [@sakoe1978; @muller2015]."));
  add(H2("5.8 Fade Engine 2.0 (revised after simulation)"));
  add(P("g in [0, 1] is the guidance level: g = 1 means every stroke is cued. A **probe cycle** has no cues at all and measures unaided performance."));
  add(NL([
    "**Probe early and often.** One probe cycle after every 4 guided cycles, from the start of the session. The score is not shown during the probe.",
    "**Estimate skill from probes.** ŝ = exponential moving average (α = 0.5) of probe scores.",
    "**Guidance tracks the gap to mastery.** Target g = clip(1 − ŝ / 0.85, 0, 1).",
    "**Rate limit.** g changes by at most 0.2 per update; g < 0.05 becomes 0.",
    "**Assist as needed.** Two consecutive guided cycles below 0.5 raise g by 0.2 [@wolbrecht2008; @mc2009].",
    "**Choose which strokes to cue.** Each stroke is cued with probability g, plus a cue wherever last cycle's error exceeded 2σ_t (bandwidth feedback) [@winstein1990].",
    "**Switch mode for advanced learners.** Once ŝ ≥ 0.7, replace 'do this now' cues with error-only cues ('you were late here'). Skilled learners gain more from error emphasis and novices from guidance [@milot2010; @mc2010].",
    "**Optional 'ask for a cue' button**, off by default and logged. Self-controlled practice is predicted to help [@wulf2016], but recent large replications failed, so it is exploratory only.",
  ]));
  add(P("**Mastery gate:** ŝ ≥ 0.85 on 3 probe blocks, on at least 2 different days, **and** the guru signs an approval record. The system suggests; the guru decides. [Design choice]"));
  add(H2("5.9 Trust layer: signed, consented lineage"));
  add(Fig(fig("lineage.png"), 600, 206, "Figure 2. Lineage as a hash-linked graph. A child envelope needs the parent's consent and the guru's signed approval; a tampered copy fails verification."));
  add(BL([
    "**Encoding and signature.** Deterministic CBOR [@rfc8949], wrapped as COSE_Sign1 [@rfc9052] with Ed25519: 32-byte public keys, 64-byte signatures [@rfc8032; @bernstein2012].",
    "**Lineage.** Each envelope may name its parent by SHA-256 hash, forming a directed acyclic graph like Git history. No blockchain is needed.",
    "**Consent inside the signed payload**, so it cannot be changed silently: use, branch, commercial, expiry, and an optional custodian key (family or institution) for after the guru's lifetime. [Design choice; discuss with gurus]",
    "**Approval and revocation records** are signed by the guru. Revocation is honoured at the next sync; an offline device keeps working until then, and a revocation cannot make a student unlearn. We state both limits openly.",
    "**Identity binding.** Prototype: in-person QR pairing. Roadmap: an institution (a Zonal Cultural Centre, Sangeet Natak Akademi or an academy) countersigns the guru's key as a W3C Verifiable Credential [@w3cvc].",
    "**Gharana rule.** Every envelope carries a lineage tag; blending across lineages needs the explicit consent of every guru involved.",
  ]));
  add(P("**Why a jury will find this credible:** the same pattern of signed manifests with hash links is the basis of C2PA Content Credentials, the media-provenance standard backed by Adobe, Microsoft, Sony and others [@c2pa]. India's Traditional Knowledge Digital Library shows the value of documenting traditional knowledge defensively: its evidence led to 265 patent applications being withdrawn, set aside or amended by March 2022 [@tkdl]. The consent design follows UNESCO's ethical principles of free, prior and informed consent [@unesco2015] and respects performers' rights under the Copyright Act [@copyright1957] and the DPDP Act and Rules [@dpdp]."));
  add(T([1.4, 2.4, 1.8], ["Threat", "Mitigation", "Residual risk"], [
    ["Edited envelope", "Signature check fails; replay refused", "None if the check runs"],
    ["Fake 'guru'", "In-person pairing; later institutional countersignature", "Social engineering at pairing"],
    ["Use after revocation", "Revocation list checked at sync", "Offline window"],
    ["Copying and sharing", "Licence and attribution travel with the data", "Legal and social, not technical"],
    ["Key theft", "Key on device behind a PIN; secure element on the roadmap", "Prototype keys are software keys"],
    ["False lineage claim", "Child must point to a real parent hash and carry the guru's approval", "Low"],
  ]));
  add(H2("5.10 Hardware and bill of materials (corrected)"));
  add(T([2.6, 0.5, 1.2], ["Part", "Qty", "Approx. ₹ (indicative)"], [
    ["ESP32-S3 dev board (base unit)", "1", "600–900"], ["ESP32 boards (cuffs)", "2", "500–800"],
    ["DRV2605L haptic driver breakouts (one per actuator)", "4", "1,400–2,000"], ["LRA actuators (about 10 mm)", "4", "400–1,000"],
    ["MPU6050 IMU (guru wrists; reused on student cuffs)", "2", "300"], ["Piezo discs + resistors + clamp diodes", "2 sets", "150"],
    ["INMP441 I²S microphones (optional)", "2", "400–600"], ["LiPo cells + charger/protection boards", "3", "800"],
    ["Bands, 3D-printed pockets, OLED, wiring, perfboard", "–", "1,000"], ["**Total**", "", "**≈ 6,000–7,500**"],
  ], { highlightLast: true }));
  add(BL([
    "**Budget fallback:** ERM motors driven by transistors, no DRV2605L: about ₹3,500–4,500, with less precise cues.",
    "**Onset and cross-talk rules:** an onset fires when the rectified piezo envelope exceeds θ = max(θ_min, μ + k·σ) with k ≈ 6–8 and noise μ, σ tracked during silence; it re-arms below 0.5·θ after a refractory time R ≈ 40 ms. If both drums trigger within W ≈ 10 ms the event is one both-hands stroke (F5); otherwise the channel with the larger normalised peak owns it. [Design choice; tune on the bench]",
    "**Two I²C buses:** the DRV2605L has a fixed I²C address, and the ESP32 has two I²C controllers, so each cuff drives its two drivers on separate buses without a multiplexer. [Design choice]",
    "**Piezo conditioning:** 1 MΩ bleed resistor, 10–47 kΩ series resistor, clamp to the ADC range, sample at 4 kHz or more, take the peak in a 3 ms window. Mount with removable putty; never glue to the instrument. [Established DIY drum-trigger practice]",
    "**Safety:** protected LiPo cells, firmware caps on vibration amplitude and duty cycle, at least 3 hours of runtime per cuff. [Target]",
  ]));
  add(H2("5.11 Software"));
  add(BL([
    "**Firmware** (ESP-IDF or Arduino-ESP32): a 4 kHz piezo onset task at highest priority; a haptic task firing cues from high-resolution timers; IMU, I²S, ESP-NOW, BLE, clock-sync and crypto tasks.",
    "**Clock sync:** NTP-style exchange over ESP-NOW, about 20 rounds, keep the round with the smallest delay, re-sync every cycle. [Plausible; confirm on hardware]",
    "**Companion web app:** Next.js, Web Bluetooth (Chrome and Edge only, not Safari or Firefox [@webbt]), IndexedDB, audited Ed25519 and CBOR libraries. Screens: pair, calibrate, record, review and sign, library and lineage, practice, assess, dashboard, verify.",
  ]));

  // ---------------------------------------------------------------- 6
  add(H1("6. Learning-science foundation"));
  add(P("Every rule in the fade engine and the evaluation plan traces back to a published finding. This table is the 'why' behind the design."));
  add(T([1.4, 2.4, 0.9, 2.3], ["Principle", "Key finding", "Source", "Design rule in PARAMPARA"], [
    ["Performance is not learning", "Learning shows as delayed retention and transfer, not practice scores", "[@schmidtlee]", "Primary outcome is unaided retention after 24 hours"],
    ["Guidance hypothesis", "Frequent feedback helps practice but can hurt retention", "[@salmoni1984]", "Fade engine and probe cycles"],
    ["Reduced feedback frequency", "50% feedback beat 100% at retention", "[@winstein1990]", "Cue probability g drops below 1 early"],
    ["Challenge point", "Best difficulty depends on the learner's skill", "[@guadagnoli2004]", "g tracks the gap to mastery"],
    ["Skill-dependent haptics", "Novices gain from guidance, skilled learners from error amplification", "[@milot2010; @mc2010]", "Mode switch at ŝ ≥ 0.7"],
    ["Haptic guidance is double-edged", "Helps through information; harms through passivity", "[@heuer2015; @sigrist2013; @mc2008]", "Student always strikes actively; cues are anticipatory, never forcing"],
    ["Haptics and timing", "Haptic training dominated timing accuracy", "[@feygin2002; @grindlay2008]", "Lead with timing; do not claim fine technique"],
    ["Contextual interference", "Mixed practice beats blocked practice at retention", "[@shea1979; @bjork2011]", "Interleave phrases in later sessions"],
    ["Power law of practice", "Error falls as a power of practice", "[@newell1981]", "Fit learning curves per learner"],
    ["Sensorimotor synchronisation", "Negative mean asynchrony; clock vs motor noise", "[@repp2005; @repp2013; @wing1973]", "Bias-corrected scoring; Wing–Kristofferson diagnosis"],
    ["Assist as needed", "Reduce help as the patient improves", "[@wolbrecht2008; @mc2009]", "Return help after failure"],
    ["Touch perception", "Pacinian peak near 250 Hz; few wrist sites", "[@bolanowski1988; @chen2008; @cholewiak2003]", "LRAs; four sites"],
    ["Tactile rhythm is usable", "Tactile synchronisation near auditory for simple rhythms", "[@ammirante2016; @tranchant2017]", "Touch adds a channel; sound stays on"],
  ], { size: 16 }));

  // ---------------------------------------------------------------- 7
  add(H1("7. Our simulation of the fade engine"));
  add(Box("What this is, and what it is not", ["A **controller check** (engineering test T13): does the fade rule stay stable, reach zero guidance within the pilot's 48 cycles, and recover after bad cycles? The learner model is *assumed*, so the comparison between policies follows from the model. **It is not evidence that PARAMPARA helps humans learn.** That evidence can only come from the pilot."], COLOR.red, "FBEFEF"));
  add(H2("7.1 Method"));
  add(BL([
    "500 simulated learners, 48 practice cycles each (6 blocks × 8 cycles, as in the pilot protocol). Starting skill s0 uniform in 0.05–0.30; learning rate η ~ N(0.04, 0.01).",
    "Performance P = s + (1 − s)·0.6·g + noise (σ = 0.05). Learning per cycle Δs = η·(1 − s)·h(g, s).",
    "**Three learner models**, because the answer depends on them: **A** 'challenge point' (best g falls as skill rises: g_opt = 0.9 − s); **B** 'fixed optimum' (g_opt = 0.4, the dossier's original model); **C** 'guidance hurts' (h = 1 − 0.5·g, a strong form of the guidance hypothesis).",
    "**Five policies:** always-on cues; no cues (a video-only proxy); fixed linear fade (1 to 0 over 36 cycles); adaptive v1 (dossier constants: S_hi 0.80, λ 0.8, 3-cycle dwell); adaptive v2 (Fade Engine 2.0, Section 5.8).",
    "Code: `PARAMPARA/sim/fade_engine_sim.py` (seeded, reproducible). Results file: `fade_sim_results.json`.",
  ]));
  add(H2("7.2 Results"));
  add(T([2.2, 1.2, 1.2, 1.2], ["Policy (unaided probe score, mean ± SD)", "Model A", "Model B", "Model C"], [
    ["Always-on cues", "0.558 ± 0.052", "0.462 ± 0.084", "0.673 ± 0.094"],
    ["No cues (video-only proxy)", "0.468 ± 0.197", "0.685 ± 0.094", "**0.865** ± 0.079"],
    ["Fixed linear fade", "**0.839** ± 0.087", "0.761 ± 0.092", "0.812 ± 0.088"],
    ["Adaptive v1 (dossier constants)", "0.678 ± 0.102", "0.523 ± 0.139", "0.723 ± 0.115"],
    ["Adaptive v2 (Fade Engine 2.0)", "0.827 ± 0.089", "**0.771** ± 0.099", "0.806 ± 0.098"],
  ], { boldFirstCol: true }));
  add(T([2.2, 1.6, 1.6], ["Controller behaviour (all three models)", "Adaptive v1", "Adaptive v2"], [
    ["Learners reaching g = 0 within 48 cycles", "0% in every model", "11–29% (median cycle 46); the rest end at low guidance, mean g 0.11–0.18"],
    ["Direction reversals per 10 cycles (mean)", "0 (it only ever decreases, slowly)", "0.05–0.07"],
    ["Most reversals in any single run", "0", "4"],
  ], { boldFirstCol: true }));
  add(Fig(fig("fade_sim.png"), 600, 246, "Figure 3. Simulation, model A. Left: guidance on guided cycles. Right: internal skill, which is what an unaided probe measures (band = interquartile range)."));
  add(H2("7.3 What we learned, honestly"));
  add(NL([
    "**Always-on cues are never the best policy** and are worst or near-worst in every model. This matches the guidance hypothesis and is why fading is core.",
    "**The dossier's original rule (v1) was too slow.** It never reached zero guidance in any run: an 80% threshold on *guided* performance is reached late, and λ = 0.8 with a 3-cycle dwell needs about 40 cycles to fall from 1 to 0.05. We replaced it.",
    "**Fade Engine 2.0 is robust.** It is never the worst policy and is within 0.06 of the best policy in every model (best in model B).",
    "**Adaptive v2 is roughly tied with a well-chosen fixed fade** (within ±0.02 for slow, medium and fast learners in all three models). So we will **not** claim that adaptive fading beats a good fixed schedule. The four-arm trial includes a fixed-fade arm to test it (Section 15).",
    "**Why keep adaptivity anyway:** a fixed schedule needs to know the session length and the learner's speed in advance, cannot react to regressions (fatigue, a missed week), and has no stopping rule. The adaptive engine ends with a measurable mastery criterion that feeds the guru's approval gate.",
    "**Stability passes T13:** at most 4 direction changes in any run, about 0.05 per 10 cycles on average, below the 1-per-10-cycles target.",
  ]));
  return out;
};
