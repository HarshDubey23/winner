// PARAMPARA 2.0 (red-team revision): sections 0–7.
module.exports = function (L) {
  const { P, H1, H2, H3, BL, NL, T, Box, Code, Fig, COLOR } = L;
  const fig = (n) => require("path").join(__dirname, "..", "figures", n);
  const out = [];
  const add = (...xs) => xs.forEach((x) => (Array.isArray(x) ? out.push(...x) : out.push(x)));

  // ---------------------------------------------------------------- contents + 0
  add(H2("Contents"));
  add(T([0.6, 4.4], null, [
    ["1", "Executive summary"], ["2", "Red-team review: 14 attacks and how version 2 answers them"], ["3", "The problem, with honest numbers"],
    ["4", "The core insight: a master's style is measurable (Gharana Fingerprint)"], ["5", "The solution: PARAMPARA 2.0"],
    ["6", "Learning-science and perception foundation"], ["7", "Simulations: fade controller and fingerprint planning"],
    ["8", "Innovation: where exactly we innovate"], ["9", "Novelty: evidence and prior-art matrix"], ["10", "Evidence plan: four decisive experiments, then trials"],
    ["11", "Feasibility"], ["12", "Viability"], ["13", "Impact"], ["14", "Where else PARAMPARA works: tabla, pottery, puppetry, dance and more"],
    ["15", "How PARAMPARA will fascinate the jury"], ["16", "Limitations and honest risks"], ["17", "Roadmap"], ["18", "Pre-submission checklist"],
    ["19", "Source merge decisions and reference audit (from v1)"], ["20", "References"], ["A–C", "Appendices: parameters, pseudo-code, glossary"],
  ], { size: 18, cantSplit: true }));

  add(H1("0. How to read this document", true));
  add(P("This is **version 2.0** of the PARAMPARA dossier. Version 1 merged the team's two documents and fact-checked them. We then rated v1 ourselves as a harsh SIH judge (about 59/100) and found six serious weaknesses. **Version 2 redesigns the idea to answer every one of them**, adds about 30 new sources, two new simulations and a ready-to-run analysis pipeline. Section 2 maps each attack to its answer."));
  add(T([1.3, 4], ["Label", "Meaning"], [
    ["[Established]", "Well replicated in the literature or standard engineering practice."],
    ["[Plausible]", "Reasonable inference, or the evidence is mixed."],
    ["[Design choice]", "Our decision. It can be changed."],
    ["[Target]", "A number we must measure on our prototype. It is not a result yet."],
    ["[To validate]", "Needs interviews, a bench test or an experiment before we can claim it."],
  ], { boldFirstCol: true }));
  add(P("Reference status in Section 20: **V** verified in this session by live web search (October 2026); **P** existence verified, some details from memory; **S** standard reference carried over, not re-checked."));
  add(Box("Honesty rules", [[
    "Nothing here is a measured result from our prototype unless it says so. Bench and experiment numbers are written as [Target].",
    "Our simulations test the controller and plan sample sizes. They are not evidence that people learn.",
    "No open tabla dataset was reachable from our build environment, so the fingerprint analysis code is tested on synthetic data only. Experiment E1 (Section 10) produces the real numbers.",
    "Rupee figures are indicative October 2026 estimates; only the component prices marked V were checked.",
  ]], COLOR.blue, "EEF3F8"));

  // ---------------------------------------------------------------- 1
  add(H1("1. Executive summary", true));
  add(Box("One-line pitch", ["**Every master plays the same theka differently. PARAMPARA measures that difference, teaches it through touch and sound, steps back until the student plays alone, and keeps the master's consent and credit attached to the data.**"]));
  add(H3("The problem"));
  add(BL([
    "Tabla is learned through *talim*: years of face-to-face imitation. A guru's timing, accents and touch are **tacit knowledge**; notation and video record what is played, not how a particular master plays it [@polanyi1966; @nonaka1995].",
    "India archives how heritage *sounds and looks*: the National Cultural Audiovisual Archives has identified over 3 lakh hours of recordings and digitised over 23,000 [@ncaa]. **No archive stores how a master's hands play** as data a learner can practise against.",
    "Masters are mortal. When Ustad Zakir Hussain died on 15 December 2024 [@zakir], his recordings remained; the talim did not.",
  ]));
  add(H3("PARAMPARA 2.0 in four verbs"));
  add(T([0.9, 2.6, 2.5], ["Verb", "What the system does", "Evidence that it is possible"], [
    ["**Measure**", "Captures each master's **Gharana Fingerprint**: per-matra micro-timing, accent contour, stroke families and arm preparation, from piezo triggers and wrist sensors. No glove.", "Tabla gharana recognised from audio [@gowriprasad2021]; accent and tempo patterns within the tal cycle [@srinivasamurthy2017]; performers identified from timing [@stamatatos2005; @repp1992; @carter2025]"],
    ["**Teach**", "A **three-tier curriculum** that gives each sense the job it does best: touch carries structure (hand, stroke, accent, approximate time); hearing carries micro-timing; vision carries arm movement and the 'style mirror'.", "Haptics teach timing structure [@feygin2002; @grindlay2008; @holland2010]; touch resolves 10–30 ms at best, hearing about 10 ms [@lauzon2020; @friberg1995]"],
    ["**Fade**", "Cues are timed **before** movement-related tactile suppression, and withdrawn by Fade Engine 2.1, which re-checks unaided skill at the start of every session.", "Suppression peaks 25–45 ms before movement [@williams1998; @juravle2017]; reduced feedback improves retention [@winstein1990]"],
    ["**Protect**", "The guru signs with a phone fingerprint (passkey). Consent, credit and Traditional Knowledge labels travel with every envelope, following the CARE principles.", "WebAuthn Level 3 W3C Recommendation, 1 billion+ passkey users [@webauthn3]; CARE [@care2020]; TK Labels [@localcontexts]"],
  ], { size: 16 }));
  add(H3("What is genuinely new"));
  add(P("Related systems exist: haptic drum teaching [@holland2010; @leechoi], a tabla gesture glove for singers [@layika2026], a multi-sensor mridangam tutoring proposal that *senses* the learner [@hotmobile2026], and gharana recognition from audio [@gowriprasad2021]. **None of them measures a specific master's rhythmic fingerprint and then transmits it back to a learner through touch and sound, with fading, unaided retention probes and consented lineage.** That combination, and the perception-driven design behind it, is our contribution (Sections 8–9)."));
  add(H3("Four decisive experiments the team runs before the finale"));
  add(T([0.5, 2.3, 2.6, 1.6], ["#", "Question", "Design", "Success criterion [Target]"], [
    ["E1", "Is each master's style measurable with our sensors?", "3 players × ≥ 20 Teentaal cycles; nearest-centroid classifier, leave-one-cycle-out; 1,000-label permutation test", "Accuracy ≥ 0.70 (chance 0.33), p < 0.01"],
    ["E2", "Can a cue be felt while playing?", "8 people; detection threshold at rest vs while playing; wrist vs forearm; on-beat vs anticipatory cue", "Threshold rise ≤ 2× in at least one condition"],
    ["E3", "Can people tell two masters apart by touch and sound?", "10 people; ABX test, 20 trials, touch-only and touch + sound", "≥ 15/20 correct per person (one-sided binomial p = 0.021)"],
    ["E4", "Can learners decode the codes while playing?", "8–10 people; 40 trials, 5 families × 2–3 strength levels", "≥ 90% families; ≥ 80% strength levels"],
  ], { size: 16 }));
  add(H3("Honest scorecard (projected)"));
  add(T([1.3, 1, 1, 3.6], ["SIH criterion (weight)", "v1 (our harsh rating)", "v2 projected", "What moves the score"], [
    ["Novelty (15%)", "6", "8.5–9", "Fingerprint + perception-driven multisensory curriculum + consent; prior art cited openly"],
    ["Feasibility (20%)", "7.5", "8.5–9.5", "E1–E4 retire the two killer risks; analysis code ready; TRL table"],
    ["Technical complexity (15%)", "6", "8.5", "Custom PCB cuff, on-device stroke classifier, drift-compensated sync, movement-aware scheduler, two simulations"],
    ["Sustainability (15%)", "5.5", "8", "Honest bottom-up sizing; institution channels; volume BOM about ₹3,000–5,600 per system; practice-pad entry"],
    ["User experience (10%)", "6", "8.5–9", "Guru signs with a fingerprint; no app needed to record; 'feel the gharanas' kiosk"],
    ["Impact (20%)", "6", "8.5–9", "Archive gap (NCAA) + teaching + public showcase + accessibility study"],
    ["**Weighted total**", "**≈ 59**", "**≈ 85–90**", "**Reaching 95+ requires real E1–E4 results and a real guru partner. Only the team can produce those.**"],
  ], { size: 16 }));

  // ---------------------------------------------------------------- 2
  add(H1("2. Red-team review: 14 attacks and how version 2 answers them"));
  add(P("We attacked v1 the way a hostile SIH panel or an AI reviewer would, then redesigned. Each answer points to evidence and states what risk remains."));
  add(T([0.3, 1.5, 2.6, 1.6, 1.4], ["#", "Attack", "Version 2 answer", "Evidence", "Residual risk"], [
    ["1", "'It is just an expensive metronome.'", "A metronome gives one grid. PARAMPARA gives **this master's** accents, hand and stroke sequence, and, in Tier 3, this master's micro-timing. E1 proves the masters actually differ; E3 tests whether the difference can be felt and heard.", "[@gowriprasad2021; @srinivasamurthy2017; @carter2025; @stamatatos2005]", "If E1 shows tiny differences, Tier 3 becomes ear-led only"],
    ["2", "'Your scoring tolerance (σ_t = 35 ms) cannot even see the guru's micro-timing.'", "Tolerance now **tightens by tier**: 35 → 20 → 12 ms. Tier 3 scores *style similarity* (correlation of the student's per-matra residuals and accents with the guru's), not absolute error.", "Auditory JND about 10 ms [@friberg1995]; ±15–25 ms shifts are perceptible [@fruhauf2013]", "Novices may not reach Tier 3 in a short pilot, so the pilot only claims Tiers 1–2"],
    ["3", "'Touch cannot carry 10–20 ms timing.'", "Agreed, and the design now says so. **Touch carries structure; hearing carries micro-timing; vision carries movement.** Each sense gets the job the research says it does best.", "Vibrotactile asynchrony thresholds 10–30 ms+ [@lauzon2020]; modality-specific feedback [@sigrist2013]", "None for the claim; the effect size is still unknown"],
    ["4", "'Striking masks the vibration.'", "**Movement-aware scheduling:** cues end before the student's preparatory lift, outside the suppression window; intensity ≥ 3× threshold; site chosen by E2. Wrist cues already worked during drum-kit playing.", "[@williams1998; @juravle2017; @holland2010]", "Anticipatory cues add a learning step; E2 compares on-beat vs anticipatory timing"],
    ["5", "'Cryptography is buzzword stacking; nobody forges a theka.'", "Reframed as **consent and credit**. Signing is invisible (a fingerprint on the guru's phone). The value is CARE-style data governance, TK labels and archive-grade provenance, explained in 10 seconds.", "[@care2020; @localcontexts; @unesco2015; @webauthn3]", "Some judges will not care; keep it short"],
    ["6", "'Your own simulation says adaptive fading is pointless.'", "Under realistic conditions (overnight forgetting, 8× spread in learning speed), **Fade Engine 2.1 beats a fixed fade by +0.015 retention (95% CI 0.013–0.017)** in two of three learner models and ties in the third; it helps about two-thirds of learners and is never worse. The headline claim is *probe-gated mastery*, not 'adaptive beats fixed'.", "Section 7; [@winstein1990; @guadagnoli2004]", "Small, model-dependent effect; the trial includes a fixed-fade arm"],
    ["7", "'No data of your own.'", "Four short experiments (E1–E4) with 3 players and 8–10 participants, pre-registered, with analysis code already written (`sim/fingerprint.py`).", "Section 10", "Depends on the team running them"],
    ["8", "'Maker-grade hardware.'", "Custom cuff PCB (ESP32-C3, 2× DRV2605L, BMI270, charger), on-device INT8 stroke classifier on ESP32-S3, regression-based clock-skew compensation, accelerometer test rig.", "[@lcsc; @tflm; @ftsp2004; @rohit2023]", "PCB may not be back by the finale, so show the schematic and a dev-board build"],
    ["9", "'Inflated statistics.'", "Fixed: ABGMVM's 1 lakh+ covers all disciplines; the 15 million households figure is labelled unaudited; Soundbrenner is used only to show a niche haptic product can sustain a business. Sizing is bottom-up through institutions.", "[@abgmvm; @musiclearners; @soundbrenner]", "Tabla-specific counts are not published"],
    ["10", "'Weak fit with a heritage *showcase* PS.'", "New **Taal-Sparsh showcase kiosk**: visitors (including deaf visitors) feel three gharanas' theka and see the fingerprint plot, for museums, Kala Utsav and archive events. Style as visible, measurable heritage science.", "[@kalautsav; @ncaa; @tranchant2017]", "Kiosk content needs consenting gurus"],
    ["11", "'Elderly gurus will not use apps.'", "Recording needs no app: one button on the base unit. Signing is a fingerprint on the guru's own phone (passkey) or a 'Guru Mohar' NFC card. Consent is read aloud in the guru's language and recorded.", "[@webauthn3]", "A helper is still needed for first set-up"],
    ["12", "'Students need a tabla plus ₹6k.'", "Entry option: a two-zone piezo practice pad. Volume BOM about ₹3,000–5,600 per complete system. Institutions own kits and share them.", "[@tablaprice; @tablatouch; @lcsc]", "The pad is a proxy for the real instrument"],
    ["13", "'Pottery and puppetry are scope creep.'", "Kept on the roadmap behind an explicit gate: only after tabla E1–E4 pass. Kathak footwork is the next tradition because the pipeline transfers almost one-to-one.", "Section 14", "None for the MVP"],
    ["14", "'This already exists.'", "Closest work is cited and compared: teacher-to-learner haptic bracelets, a mridangam tutoring proposal, gharana recognition, Layika. None measures a master's fingerprint and teaches it back with fading and consent.", "[@holland2018; @hotmobile2026; @gowriprasad2021; @layika2026]", "Run a formal patent search before submission"],
  ], { size: 15 }));

  // ---------------------------------------------------------------- 3
  add(H1("3. The problem, with honest numbers"));
  add(H2("3.1 Tacit knowledge is the bottleneck"));
  add(P("Polanyi's 'we know more than we can tell' fits tabla [@polanyi1966]. In Nonaka and Takeuchi's SECI model, the hardest step is externalisation, turning tacit skill into explicit form [@nonaka1995]. Talim is almost pure socialisation: it works, but it cannot leave the guru's room or outlive the guru. **PARAMPARA externalises a master's rhythm as a fingerprint, then internalises it in the student through faded multisensory practice.**"));
  add(T([1.2, 2, 3], ["SECI mode", "Traditional talim", "PARAMPARA 2.0"], [
    ["Socialisation", "Sitting with the guru", "Still central: the guru records, approves readiness, keeps control"],
    ["Externalisation", "Rare; notation captures bols, not style", "Gharana Fingerprint: micro-timing, accent contour, stroke families, arm preparation"],
    ["Combination", "Composition notebooks", "Signed library and lineage graph; archive deposit with consent"],
    ["Internalisation", "Riyaz", "Three-tier curriculum with Fade Engine 2.1; success = unaided retention"],
  ], { boldFirstCol: true }));
  add(H2("3.2 Why tabla first"));
  add(BL([
    "**Measurable:** discrete percussive events, timestamped to a fraction of a millisecond [@bello2005].",
    "**Scientifically Indian:** C. V. Raman showed the loaded tabla membrane gives harmonic overtones [@raman1920; @raman1934].",
    "**Rich, documented lineages:** six commonly listed gharanas descend from one another [@gharanas], and gharana identity is recoverable from audio [@gowriprasad2021].",
    "**Data and models exist:** stroke datasets and CNN classifiers [@gillet2003; @chordia2005; @rohit2021; @rohit2023]; Hindustani corpora [@compmusic].",
    "**In the school system:** CBSE offers Hindustani Music Percussion (tabla, pakhawaj) as subject 036 [@cbse036]; NCERT's Kala Utsav has a percussive instrumental category [@kalautsav].",
  ]));
  add(H2("3.3 Scale and stakes (corrected in v2)"));
  add(T([1.8, 2.2, 0.7, 2.5], ["Indicator", "Figure", "Source", "How to read it"], [
    ["Classical music examinees (ABGMVM)", "More than 1 lakh a year, about 800 centres", "[@abgmvm]", "**All disciplines**, not only tabla; the tabla share is not published"],
    ["School channel", "CBSE subject 036; Kala Utsav percussive category (about 700 national finalists from 36 States/UTs)", "[@cbse036; @kalautsav]", "A structured, government-run pipeline of percussion learners"],
    ["Households learning music", "More than 15 million (industry estimate)", "[@musiclearners]", "**Unaudited** investor claim; used only as context"],
    ["Archive gap", "Over 3 lakh hours identified, 23,000+ digitised (audio/video only)", "[@ncaa]", "Sound and image are archived; playing technique is not"],
    ["State support for transmission", "Guru-Shishya Parampara via 7 Zonal Cultural Centres; SNA ICH scheme", "[@gsp; @snaich]", "Existing budget lines"],
    ["India's UNESCO ICH elements", "16 (Deepavali added December 2025)", "[@deepavali2025]", "Heritage transmission is a national priority"],
    ["Artisans", "About 64.66 lakh; handicraft exports ₹33,122.79 crore (2024–25)", "[@handicrafts]", "The same tacit-skill problem in crafts (Section 14)"],
    ["Global precedent", "Japan has certified Living National Treasures since 1950", "[@japanlnt]", "Masters treated as national assets"],
  ], { size: 16 }));
  add(H2("3.4 Why video, apps and metronomes are not enough"));
  add(BL([
    "**Video** shows the hands but has low temporal resolution for rhythm, and cannot say which limb does what [@holland2018]; in piano learning, vibrotactile cues gave about half the timing error of visual cues [@coscia2024].",
    "**A metronome** gives one uniform grid. Masters do not play a uniform grid: tempo and accents vary systematically within the tal cycle [@srinivasamurthy2017], and individual players have measurable timing signatures [@carter2025; @repp1992].",
    "**Apps** (e.g. Darbar Academy, myGurukul) are video-first [@apps] and cannot measure unaided retention, because they do not sense the student's strokes against a master's reference.",
    "**Touch alone is not enough either.** Haptic guidance can make learners passive [@heuer2015; @salmoni1984], and touch is poorer than hearing for fine timing [@lauzon2020]. So PARAMPARA 2.0 combines touch, sound and vision, and fades the touch.",
  ]));
  add(Box("Problem statement", ["The timing, accents and movement that make a tabla master's playing their own are not stored in any form a learner can practise against or be measured on. When masters retire or pass away, and when students live far from them, that knowledge is lost. **We need a low-cost system that measures a master's style as consented, verifiable data, teaches it through the senses best suited to each part, and proves that the student has learned it without the device.**"]));

  // ---------------------------------------------------------------- 4
  add(H1("4. The core insight: a master's style is measurable"));
  add(P("Version 1's weakest point was the claim that a 'feel' is transmitted. Version 2 makes that claim testable. **The Gharana Fingerprint is the measurable part of a master's style: where in the cycle they lean early or late, which matras they accent and by how much, and how their arm prepares each stroke.**"));
  add(H2("4.1 Evidence that style is measurable"));
  add(T([2.3, 2.6, 0.9], ["Finding", "Why it matters for PARAMPARA", "Source"], [
    ["Tabla gharana recognised automatically from audio of solo performances (38+ hours of data)", "Gharana identity leaves a measurable acoustic and rhythmic trace", "[@gowriprasad2021]"],
    ["Hindustani corpus: systematic tempo patterns within the tal cycle and percussion accent patterns at cycle positions", "Accent contour and intra-cycle timing are real, measurable dimensions", "[@srinivasamurthy2017]"],
    ["Expert vocalists lead and lag the tabla beat in measurable, expressive ways", "Timing offsets from the beat carry musical meaning in Hindustani music", "[@bhake2025]"],
    ["Pianists identified from expressive timing and dynamics by machine learning", "Performer identity is recoverable from timing + dynamics", "[@stamatatos2005]"],
    ["28 pianists: shared timing principles plus individual signatures", "Style = common grammar + personal deviations", "[@repp1992]"],
    ["Five rock drummers each showed a distinctive microtiming fingerprint across 79 recordings", "Drummers, like our tabla masters, have timing fingerprints", "[@carter2025; @drummistic]"],
    ["Listeners rate ±15–25 ms drum shifts differently; auditory JND about 10 ms", "Micro-timing at this scale is audible, so it can be taught by ear", "[@fruhauf2013; @friberg1995]"],
  ], { size: 16 }));
  add(H2("4.2 What the fingerprint contains"));
  add(T([1.5, 2.4, 1.2, 1.9], ["Feature", "Definition", "Sensor", "Channel used to teach it"], [
    ["Stroke sequence", "Hand and stroke family at each matra", "Piezo per drum (+ mic)", "Touch (Tier 1)"],
    ["Accent contour", "Relative strength in dB at each matra (bhari/khali shape)", "Piezo amplitude", "Touch intensity (Tier 1–3) + sound"],
    ["Micro-timing profile", "Per-matra residual from the cycle's own tempo fit (ms)", "Piezo onset, µs clock", "Sound + style mirror (Tier 3)"],
    ["Intra-cycle tempo curve", "How tempo moves inside the cycle", "Onsets", "Sound + visual"],
    ["Arm preparation", "Lift angle, peak angular speed, lift-to-strike time", "Wrist IMU", "Vision (target bars)"],
    ["Resonance", "Decay time; ringing vs damped", "Mic", "Sound"],
  ], { size: 16 }));
  add(P("Each cycle becomes one vector (timing residuals and accents for all 16 matras of Teentaal) after removing that cycle's own tempo and loudness, so sensor placement and overall tempo do not leak into the comparison."));
  add(H2("4.3 How we will prove it (Experiment E1)"));
  add(BL([
    "**Players:** three tabla players, ideally from at least two gharanas (gurus or senior teachers), with written consent.",
    "**Material:** Teentaal theka at 80 matras/min, at least 20 cycles each (about 4 minutes), plus 10 cycles at 60 and 100 matras/min to test whether the fingerprint survives tempo change.",
    "**Analysis:** z-scored nearest-centroid classifier, leave-one-cycle-out; significance by permuting player labels 1,000 times; per-matra differences with bootstrap 95% CIs. Code: `PARAMPARA/sim/fingerprint.py analyze strokes.csv`.",
    "**Success criterion [Target]:** accuracy ≥ 0.70 against 0.33 chance, permutation p < 0.01. Written down before recording (pre-registration).",
    "**If it fails:** the fingerprint is below our sensor resolution. PARAMPARA still teaches structure and laya (Tiers 1–2) and still archives consented performances; we drop the style claim.",
  ]));
  add(Fig(fig("fingerprint_power.png"), 600, 260, "Figure 1. Planning E1 (simulation with stated assumptions: 3 players, cycle-to-cycle variation 15 ms and 1.5 dB). If players' mean profiles differ by about 6 ms and 0.6 dB per matra, 20 cycles each give about 80% accuracy; at 10 ms, about 96%."));
  add(P("The simulation only sets the recording length: **record at least 20 cycles per player.** The real effect size is unknown until E1 is run. [Target]"));

  // ---------------------------------------------------------------- 5
  add(H1("5. The solution: PARAMPARA 2.0"));
  add(H2("5.1 Modes"));
  add(T([1.1, 1, 3.4, 0.9], ["Mode", "Who", "What happens", "Priority"], [
    ["Record", "Guru", "Plays; base unit + wrist cuffs capture the fingerprint. One button, no app needed. Signs with a phone fingerprint (passkey) or Guru Mohar card.", "Must"],
    ["Learn (Tiers 1–3)", "Student", "Touch, sound and vision cues by tier; scoring; Fade Engine 2.1.", "Must"],
    ["Assess", "Student", "Probe cycles with no cues; retention score.", "Must"],
    ["Fingerprint view", "Anyone", "Per-matra timing and accent plots; compare masters.", "Must"],
    ["Showcase kiosk", "Public", "'Feel the gharanas': wear the cuff, feel and hear three masters' theka, guess which is which.", "Should"],
    ["Branch", "Student, after approval", "Records an own variation as a signed child envelope.", "Should"],
    ["Verify", "Anyone", "Shows signer, consent terms and lineage; a tampered copy fails.", "Should"],
    ["Live Mirror", "Guru + student", "Live strokes felt within about 50 ms (prior art exists; demo only).", "Could"],
  ], { boldFirstCol: true }));
  add(H2("5.2 Architecture"));
  add(Fig(fig("architecture.png"), 600, 320, "Figure 2. Architecture. Guru side records the fingerprint; student side learns, is assessed and branches; the app signs, verifies and visualises."));
  add(P("Cues are scheduled locally on the cuffs from a shared, drift-compensated timeline, so radio jitter never touches cue timing. [Design choice]"));
  add(H2("5.3 The three-tier multisensory curriculum"));
  add(P("Version 1 asked touch to do everything. Version 2 gives each sense the job the evidence says it does best: touch for structure and accent [@holland2010; @leechoi], hearing for fine timing [@friberg1995; @lauzon2020], vision for movement and post-cycle feedback [@sigrist2013]."));
  add(T([1, 1.5, 1.5, 1.3, 1.4, 0.8, 1.2], ["Tier", "Goal", "Touch carries", "Hearing carries", "Vision carries", "σ_t", "Exit gate"], [
    ["1 Structure", "Theka sequence, hands, stroke families, accents", "Which hand, which family, accent level, approximate time", "Own tabla + guru audio", "Cycle dashboard", "35 ms", "Unaided probe ≥ 0.80"],
    ["2 Laya", "Steady tempo; bias vs spread", "Fading cues (Fade Engine 2.1)", "No click; own sound", "Bias and spread chart", "20 ms", "Probe ≥ 0.85 on 2 days"],
    ["3 Style", "This master's micro-timing and accent contour", "Accent contour only", "Guru audio overlay; sonified timing deviations", "Style mirror: your profile vs the guru's", "12 ms", "Style similarity r ≥ 0.6 + guru approval"],
  ], { size: 15 }));
  add(P("**Tier 3 style similarity** = correlation between the student's per-matra timing residuals and accents and the master's, averaged over probe cycles. It rewards playing *like this master*, which an absolute-error score cannot do. [Design choice; To validate]"));
  add(H2("5.4 Movement-aware haptics"));
  add(P("Touch sensitivity on a moving arm drops sharply just before and during movement; in the classic study the drop peaked 25–45 ms before movement onset and was largest for weak stimuli [@williams1998; @juravle2017]. A cue that arrives as the student starts to lift may simply not be felt. PARAMPARA therefore ends each cue **before** the preparatory lift, and keeps it strong:"));
  add(Fig(fig("cue_timeline.png"), 600, 220, "Figure 3. Movement-aware cue timing for one stroke (illustrative values). The tacton ends before the student's lift and outside the suppression zone."));
  add(BL([
    "**Command time:** c_i = E_i − t_prep − 45 ms − margin − d_tacton − ℓ_a, where t_prep is the student's own lift-to-strike time measured by the wrist IMU, and ℓ_a the actuator latency.",
    "**Intensity:** at least 3× the resting detection threshold, because suppression is weakest for strong stimuli [@williams1998].",
    "**Site:** wrist (dorsal/palmar) by default, mid-forearm as the alternative; E2 picks the winner. Wrist cues already guided limbs during drum-kit playing [@holland2010].",
    "**Learnability:** an anticipatory cue works like a conductor's upbeat. E2 compares it with an on-beat cue; we keep whichever is detected and used better. [To validate]",
  ]));
  add(H2("5.5 The haptic language"));
  add(T([1.3, 1.1, 0.7, 0.8, 0.9, 1], ["Family", "Typical bols", "Cuff", "Site", "Pulse", "Intended feel"], [
    ["F1 dayan resonant", "Na/Ta, Tin, Tun", "Right", "Dorsal", "1 × 60 ms", "Round tap"],
    ["F2 dayan damped", "Te, Tit", "Right", "Palmar", "1 × 30 ms", "Short tick"],
    ["F3 bayan open", "Ge/Ghe", "Left", "Dorsal", "1 × 80 ms", "Long, low"],
    ["F4 bayan damped", "Ka/Ke", "Left", "Palmar", "1 × 30 ms", "Short tick"],
    ["F5 both", "Dha, Dhin", "Both", "Dorsal", "1 × 80 ms", "'Together'"],
  ], { size: 16 }));
  add(BL([
    "**Four sites** match the measured limit of the wrist [@chen2008]. Location carries the hand; duration and site carry the family; intensity carries the accent [@brewster2004; @jones2008].",
    "**Accent levels:** two levels are proven (96.18% recognition with drum identity) [@leechoi]; a third level is tested in E4. Adjacent levels differ by about ×1.7 because skin intensity discrimination is coarse [@gescheider1997].",
    "**LRAs at resonance** sit near the Pacinian peak around 250 Hz [@bolanowski1988]; the DRV2605L drives them closed-loop with overdrive and braking [@drv2605l].",
  ]));
  add(H2("5.6 Scoring"));
  add(Code([
    "e'_t,i = (t_student,i − E_i) − b_cycle          bias-corrected timing error",
    "e_A,i  = 20·log10(a_student,i / a_guru,i)      accent error (dB)",
    "S_i    = w1·exp(−|e'_t,i|/σ_t) + w2·exp(−|e_A,i|/σ_A) + w3·m_i     (Tiers 1–2)",
    "Style  = ½·corr(d_student, d_guru) + ½·corr(acc_student, acc_guru) (Tier 3)",
  ]));
  add(P("Bias and spread are reported separately, because people normally tap tens of milliseconds early [@repp2005]. σ_t tightens by tier (35 → 20 → 12 ms). Free-tempo phrases (later) are aligned with dynamic time warping [@sakoe1978; @muller2015]. [Design choice]"));
  add(H2("5.7 Fade Engine 2.1"));
  add(NL([
    "**Probe at the start of every session** (re-anchors the skill estimate after overnight forgetting), then one probe every 4 guided cycles.",
    "**Skill estimate** ŝ = moving average (α = 0.5) of probe scores.",
    "**Target guidance** g = clip(1 − ŝ / 0.85, 0, 1), changed by at most 0.2 per update; g < 0.05 becomes 0.",
    "**Assist as needed:** two guided cycles below 0.5 raise g by 0.2 [@wolbrecht2008; @mc2009].",
    "**Which strokes:** each stroke cued with probability g, plus bandwidth cues where last cycle's error exceeded 2σ_t [@winstein1990].",
    "**Mode switch:** at ŝ ≥ 0.7, guidance cues give way to error-only cues, because skilled learners gain more from error emphasis [@milot2010; @mc2010].",
    "**Optional 'ask for a cue' button**, off by default and logged: self-controlled practice is predicted to help [@wulf2016], but recent large replications failed, so it stays exploratory.",
  ]));
  add(P("**Mastery gate:** ŝ ≥ 0.85 on 3 probe blocks over at least 2 days, **plus** the guru's signed approval."));
  add(H2("5.8 Guru-first user experience"));
  add(BL([
    "**Recording:** the guru plays. One button on the base unit starts and stops; an LED ring shows the tal cycle (sam, khali). No app is needed during recording.",
    "**Signing with a fingerprint:** the companion app asks the guru's own phone to sign the envelope hash with a passkey (WebAuthn). The private key never leaves the phone and no key files are managed. WebAuthn Level 3 became a W3C Recommendation on 25 August 2026, and over a billion people already use passkeys [@webauthn3]. Fallback: a 'Guru Mohar' NFC card, a digital seal.",
    "**Consent in their language:** the terms are read aloud (Hindi or regional language), the guru's spoken 'yes' is recorded, and the choices (replay, teach, branch, commercial, expiry, custodian) are stored inside the signed envelope.",
    "**Approving a student:** the guru hears the student's unaided probe recording on their phone and approves with the same fingerprint.",
  ]));
  add(H2("5.9 Consent, credit and cultural data governance"));
  add(P("Version 1 led with cryptography. Version 2 leads with **who decides and who gets credit**; the cryptography is the invisible lock underneath."));
  add(T([1.5, 2.6, 2.2], ["Principle", "Source", "How PARAMPARA implements it"], [
    ["Free, prior and informed consent of practitioners", "UNESCO ethical principles for ICH [@unesco2015]", "Spoken consent + signed choices inside every envelope; revocation honoured at sync"],
    ["Collective benefit, authority to control, responsibility, ethics", "CARE principles [@care2020]", "Guru (and custodian) controls use; revenue share fields; guru gates readiness"],
    ["Findable, accessible, interoperable, reusable", "FAIR principles [@fair2016]", "Open, documented CBOR/JSON schema; deposits to an archive such as NCAA with consent [@ncaa]"],
    ["Provenance and attribution labels", "Local Contexts TK Labels [@localcontexts]", "Each envelope carries TK Attribution / Community Voice style labels"],
    ["Defensive documentation of traditional knowledge", "TKDL precedent [@tkdl]; WIPO work on traditional cultural expressions [@wipoigc]", "Dated, signed records of who played what, usable as evidence of origin"],
    ["Tamper evidence", "COSE signatures over deterministic CBOR with Ed25519 [@rfc9052; @rfc8949; @rfc8032; @bernstein2012]; signed-manifest pattern as in C2PA [@c2pa]", "One-byte change → verification fails → replay refused"],
  ], { size: 16 }));
  add(Fig(fig("lineage.png"), 600, 206, "Figure 4. Lineage as a hash-linked graph. A child envelope needs the parent's consent and the guru's signed approval."));
  add(P("Law: the DPDP Act 2023 and Rules notified 13 November 2025 apply to identifiable recordings [@dpdp]; performers' rights under the Copyright Act apply to performances [@copyright1957]. Data stays on device or in the user's app by default."));
  add(H2("5.10 Hardware: prototype and production"));
  add(T([2.6, 0.5, 1.2], ["Prototype part (dev boards)", "Qty", "Approx. ₹"], [
    ["ESP32-S3 dev board (base unit)", "1", "600–900"], ["ESP32 boards (cuffs)", "2", "500–800"],
    ["DRV2605L breakouts (one per actuator)", "4", "1,400–2,000"], ["LRA actuators (about 10 mm)", "4", "400–1,000"],
    ["IMU (guru wrists; reused on student cuffs)", "2", "300"], ["Piezo discs + conditioning", "2 sets", "150"],
    ["I²S microphones (optional)", "2", "400–600"], ["LiPo cells + charger/protection", "3", "800"],
    ["Bands, printed pockets, OLED, wiring", "–", "1,000"], ["**Total (prototype)**", "", "**≈ 6,000–7,500**"],
  ], { highlightLast: true }));
  add(T([2.4, 1.3, 2.4], ["Production cuff (custom PCB, ~1,000 units)", "Unit cost", "Basis"], [
    ["ESP32-C3-MINI-1 module", "US$1.0–2.0", "LCSC reference [@lcsc]"],
    ["2 × DRV2605L", "US$1.5–2.9", "LCSC reference [@lcsc]"],
    ["2 × LRA (8–10 mm)", "US$3–10", "US$5.15 at 1–9 units; volume lower [@lcsc]"],
    ["BMI270 IMU", "US$1.3–5.6", "LCSC reference [@lcsc]"],
    ["Charger, LDO, passives, 300 mAh LiPo", "≈ US$2", "Estimate [Target]"],
    ["PCB, assembly, strap, enclosure", "≈ US$4–5", "Estimate [Target]"],
    ["**Cuff total**", "**≈ US$13–28 (≈ ₹1,100–2,400)**", "**System (2 cuffs + base unit ≈ ₹1,000) ≈ ₹3,000–5,600**"],
  ], { highlightLast: true, size: 16 }));
  add(BL([
    "**On-device stroke classifier:** an INT8 CNN on the ESP32-S3 classifies each stroke into the four atomic classes used in tabla research (damped, resonant treble, resonant bass, both) [@rohit2023], trained on the public four-way dataset [@rohit2021]. Keyword-spotting-scale models run in about 30–100 ms per second of audio on this chip [@tflm]; a 100 ms stroke window is far smaller. [Target]",
    "**Clock sync:** two-way exchanges over ESP-NOW, with offset **and skew** estimated by linear regression, as in the Flooding Time Synchronization Protocol (1.4 µs average error on motes) [@ftsp2004]. Our target is ≤ 1 ms. [Target]",
    "**Test rig:** an accelerometer glued beside each LRA, plus a piezo and a logic analyser, measures command-to-vibration latency, cue jitter and strike-to-cue delay (tests T5–T8).",
    "**Practice pad:** a rubber pad with two piezo zones lets beginners start without a tabla; real tablas start at about ₹1,700 [@tablaprice]. Commercial electronic tablas cost £500–1,458 [@tablatouch].",
    "**Onset and cross-talk rules:** threshold θ = max(θ_min, μ + k·σ), k ≈ 6–8; refractory 40 ms; strikes on both drums within 10 ms count as one both-hands stroke. [Design choice]",
  ]));

  // ---------------------------------------------------------------- 6
  add(H1("6. Learning-science and perception foundation"));
  add(T([1.4, 2.4, 0.9, 2.3], ["Principle", "Key finding", "Source", "Design rule"], [
    ["Performance is not learning", "Learning shows as delayed retention and transfer", "[@schmidtlee]", "Primary outcome: unaided retention after 24 h"],
    ["Guidance hypothesis", "Frequent feedback helps practice, can hurt retention", "[@salmoni1984]", "Fade engine; probes"],
    ["Reduced feedback frequency", "50% feedback beat 100% at retention", "[@winstein1990]", "g < 1 early; bandwidth cues"],
    ["Challenge point", "Best difficulty depends on skill", "[@guadagnoli2004]", "g tracks the gap to mastery"],
    ["Skill-dependent haptics", "Novices gain from guidance, experts from error amplification", "[@milot2010; @mc2010]", "Mode switch at ŝ ≥ 0.7"],
    ["Haptics are double-edged", "Information helps; passivity harms", "[@heuer2015; @sigrist2013; @mc2008]", "Active striking; anticipatory, never forcing"],
    ["Haptics and timing structure", "Haptic training dominated timing accuracy; vibrotactile cues halved piano timing error vs visual", "[@feygin2002; @grindlay2008; @coscia2024]", "Touch carries structure"],
    ["Fine timing by ear", "Auditory JND about 10 ms; tactile asynchrony 10–30 ms+", "[@friberg1995; @lauzon2020]", "Micro-timing taught by ear (Tier 3)"],
    ["Movement-related suppression", "Touch dulled 25–45 ms before and during movement", "[@williams1998; @juravle2017]", "Cues end before the lift"],
    ["Sensorimotor synchronisation", "Negative mean asynchrony; clock vs motor noise", "[@repp2005; @repp2013; @wing1973]", "Bias-corrected scoring"],
    ["Contextual interference", "Mixed practice beats blocked practice at retention", "[@shea1979; @bjork2011]", "Interleave phrases later"],
    ["Power law of practice", "Error falls as a power of practice", "[@newell1981]", "Per-learner curves"],
    ["Touch perception", "Pacinian peak near 250 Hz; about 4 wrist sites", "[@bolanowski1988; @chen2008; @cholewiak2003]", "LRAs; four sites"],
    ["Tactile rhythm is usable", "Tactile synchronisation near auditory for simple rhythms", "[@ammirante2016; @tranchant2017]", "Touch adds a channel; sound stays on"],
  ], { size: 15 }));

  // ---------------------------------------------------------------- 7
  add(H1("7. Simulations: fade controller and fingerprint planning"));
  add(Box("What these are", ["Controller checks and sample-size planning with **assumed** models. They show how the design behaves and how much data to collect. **They are not evidence that people learn.**"], COLOR.red, "FBEFEF"));
  add(H2("7.1 v1 simulation (ideal conditions)"));
  add(P("500 learners, one 48-cycle session, three learner models (challenge point; fixed optimum; guidance hurts). Findings: always-on cues were never best; the original dossier constants never reached zero guidance (0 of 500 in every model); Fade Engine 2.0 roughly tied with a fixed linear fade (within ±0.02). Code: `sim/fade_engine_sim.py`."));
  add(Fig(fig("fade_sim.png"), 600, 246, "Figure 5. v1 simulation, model A: guidance and internal skill per cycle."));
  add(H2("7.2 v2 simulation (realistic conditions)"));
  add(BL([
    "1,000 learners; **3 sessions of 16 cycles on different days**, with overnight forgetting of 5–20% of the day's gain.",
    "Learning rates **log-normal** (about 8× spread between slow and fast learners), instead of a narrow normal.",
    "Primary outcome: **unaided retention on day 4**, after one more night of forgetting, as in the pilot.",
    "Fade Engine 2.1 adds a probe at the start of every session. Code: `sim/fade_engine_sim_v2.py`.",
  ]));
  add(T([2.4, 1.2, 1.2, 1.2], ["Day-4 unaided retention (mean)", "Model A", "Model B", "Model C"], [
    ["Always-on cues", "0.479", "0.424", "0.572"],
    ["No cues (video-only proxy)", "0.464", "0.580", "**0.708**"],
    ["Fixed linear fade", "0.673", "0.630", "0.676"],
    ["Fade Engine 2.0", "0.681", "0.637", "0.663"],
    ["**Fade Engine 2.1**", "**0.688**", "**0.645**", "0.676"],
    ["2.1 minus linear fade (95% bootstrap CI)", "+0.015 (0.013–0.017)", "+0.016 (0.013–0.018)", "+0.001 (−0.001–0.003)"],
    ["Learners better off with 2.1", "66.8%", "66.2%", "51.0%"],
    ["Slow third of learners: linear → 2.1", "0.466 → 0.496", "0.446 → 0.452", "0.491 → 0.479"],
  ], { boldFirstCol: true, size: 16 }));
  add(H3("What we learned"));
  add(NL([
    "**Always-on cues are poor in every model**, as the guidance hypothesis predicts.",
    "**Under realistic conditions Fade Engine 2.1 gives a small but consistent advantage** over a fixed fade in two models and ties in the third. The gain is concentrated in slow learners in model A (+0.030), exactly where a one-size schedule fades too early.",
    "**The effect is small and assumption-bound.** We therefore claim *probe-gated mastery*, and the Stage B trial keeps a fixed-fade arm to test adaptivity on people.",
    "In model C (guidance only hurts) no cues is best, by construction. If the trial looks like model C, PARAMPARA's value shifts to measurement, the fingerprint and the archive. That is why E1 matters.",
  ]));
  add(H2("7.3 Fingerprint planning"));
  add(P("Section 4.3 and Figure 1: with 3 players and assumed cycle-to-cycle noise of 15 ms and 1.5 dB, 20 cycles per player identify players at about 80% accuracy if their profiles differ by about 6 ms and 0.6 dB per matra, about 96% at 10 ms, and about 52% at 3 ms (still above the 33% chance level). Code: `sim/fingerprint.py power`; self-test: `sim/fingerprint.py selftest`."));
  return out;
};
