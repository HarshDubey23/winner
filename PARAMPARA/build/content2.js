// Sections 8–18 and appendices of the PARAMPARA final dossier.
module.exports = function (L) {
  const { P, H1, H2, H3, BL, NL, T, Box, Code, COLOR } = L;
  const out = [];
  const add = (...xs) => xs.forEach((x) => (Array.isArray(x) ? out.push(...x) : out.push(x)));

  // ---------------------------------------------------------------- 8
  add(H1("8. Innovation: where exactly we innovate", true));
  add(P("A jury judges innovation at three levels: **component** (new physics or a new part), **system** (a new combination that does something no part does alone) and **context** (a new use that matters). We claim no new component physics. Our innovations are at the system and context levels, and each one is specific enough to check."));
  add(T([0.35, 1.4, 2.1, 1.9, 2.1], ["#", "Innovation", "What it is", "Closest prior art", "Our difference"], [
    ["I1", "Glove-free Skill Envelope", "Per-stroke time, hand, family, relative strength, micro-timing vector d and arm kinematics, captured from the instrument and wrists", "Electronic Tabla controller [@kapur2002]; TablaNet stroke recognition for network play [@sarkar2007]; four-way tabla stroke CNN [@rohit2021]", "Recognition is used to build a teachable, signed reference of one specific master, not a sound controller or a transcription"],
    ["I2", "Faded haptic replay judged at zero guidance", "The master's timeline replayed as tactons; guidance withdrawn by a probe-anchored rule; primary metric is unaided retention", "Haptic Drum Kit and Bracelets [@holland2010; @bouwer2013]; MusicJacket [@vanderlinden2011]; vibrotactile drumming guidance [@leechoi]", "None of these closes the loop with automatic fading plus a probe schedule driven by measured strokes"],
    ["I3", "Skill-aware guidance mode", "Guidance cues for novices, error-only cues for advanced learners", "Error amplification vs guidance in a lab timing task [@milot2010]", "First application to a music wearable that we found"],
    ["I4", "Anticipation-compensated cueing", "Cue time includes each user's measured anticipation m and actuator latency ℓ_a", "Wearable metronomes cue on the beat [@soundbrenner]", "Cues are personalised so an anticipating student lands on the master's micro-timing, not on a grid"],
    ["I5", "Consent-bound signed skill lineage", "COSE/Ed25519 envelope, parent hashes, guru approval to branch, revocation, custodian key", "C2PA for media [@c2pa]; W3C Verifiable Credentials [@w3cvc]; TKDL defensive documentation [@tkdl]", "Provenance applied to embodied performance data, with branching rules that mirror guru–shishya permission"],
    ["I6", "Lineage-respecting data governance", "Gharana tag; no automatic blending; guru gates readiness", "Mingei and i-Treasures digitise crafts but do not encode lineage permission [@zabulis2020; @itreasures]", "Cultural rules turned into machine-checked constraints"],
    ["I7", "One stack, many traditions", "Sense → envelope → faded haptics → sign, reusable across art forms", "i-Treasures captured pottery and dance gestures [@itreasures; @manitsaris2014]", "A low-cost, deployable, signed transmission stack, not only analysis"],
  ], { size: 16 }));
  add(Box("The innovation in one sentence (use on the idea slide)", ["**PARAMPARA turns a master's tacit rhythm into signed, consented data, teaches it through touch, and then deliberately removes itself, measuring success only when the student plays alone.**"]));
  add(H3("Innovation ladder: how far each part goes beyond the state of the art"));
  add(T([1.6, 1.3, 1.3, 2.2], ["Part", "Exists today", "PARAMPARA level", "Evidence for the step"], [
    ["Stroke sensing on tabla", "Yes (controllers, MIR)", "Re-used", "[@kapur2002; @rohit2023]"],
    ["Haptic rhythm cues", "Yes (drum kit, bracelets, metronome)", "Re-used and personalised (I4)", "[@holland2010; @soundbrenner; @repp2005]"],
    ["Fading guidance with retention probes", "In lab motor-learning studies", "Embedded in a product loop (I2, I3)", "[@winstein1990; @milot2010]; Section 7"],
    ["Signed provenance", "For media files (C2PA)", "For performance skill data with consent and branching (I5, I6)", "[@c2pa; @unesco2015]"],
    ["Combination for an Indian tradition", "Not found", "New (system level)", "Section 9 search log"],
  ], { size: 16 }));

  // ---------------------------------------------------------------- 9
  add(H1("9. Novelty: evidence and prior-art matrix"));
  add(H2("9.1 Prior-art matrix"));
  add(P("Columns are the six properties that together define PARAMPARA. 'Part' means the work does this partly or in a different form."));
  add(T([2.1, 0.55, 0.9, 0.8, 0.75, 0.85, 0.8, 0.75], ["Work", "Year", "Captures a master", "Haptic to learner", "Fades guidance", "Unaided retention", "Signed + consent", "Indian tradition"], [
    ["Electronic Tabla Controller [@kapur2002]", "2002", "Part", "No", "No", "No", "No", "Yes"],
    ["TablaNet [@sarkar2007]", "2007", "Part", "No", "No", "No", "No", "Yes"],
    ["Electronic tabla (Pardue et al.) [@pardue2020]", "2020", "Part", "No", "No", "No", "No", "Yes"],
    ["Tabla stroke CNN [@rohit2021; @rohit2023]", "2021–23", "Audio analysis", "No", "No", "No", "No", "Yes"],
    ["Layika glove [@layika2026]", "2026", "No (gesture to sound)", "No", "No", "No", "No", "Yes"],
    ["Haptic Drum Kit [@holland2010]", "2010", "No (pre-scored)", "Yes", "No", "Part", "No", "No"],
    ["Haptic Bracelets [@bouwer2013; @holland2018]", "2013–18", "Part (live teacher)", "Yes", "No", "Part", "No", "No"],
    ["MusicJacket [@vanderlinden2011]", "2011", "No (target path)", "Yes (corrective)", "No", "Part", "No", "No"],
    ["Vibrotactile drumming guidance [@leechoi]", "2013–15", "No", "Yes", "No", "No", "No", "No"],
    ["PianoTouch / Mobile Music Touch / passive haptic learning [@huang2008; @huang2010; @seim2015]", "2008–10", "No", "Yes", "No", "Part", "No", "No"],
    ["Grindlay haptic drumstick [@grindlay2008]", "2008", "Part (recorded)", "Yes (force)", "No", "Yes", "No", "No"],
    ["i-Treasures [@itreasures]", "2013–17", "Yes", "Part", "No", "No", "No", "No"],
    ["Expert pottery gestures [@manitsaris2014]", "2014", "Yes", "No (visual feedback)", "No", "No", "No", "No"],
    ["PotteryGo VR training [@potterygo]", "2018", "No", "No", "No", "Part", "No", "No"],
    ["Soundbrenner Pulse [@soundbrenner]", "2016", "No", "Yes (metronome)", "No", "No", "No", "No"],
    ["Shadow-play teaching patent [@shadowpatent]", "recent", "No", "No", "No", "No", "No", "No (Chinese)"],
    ["C2PA Content Credentials [@c2pa]", "2021–25", "n/a", "No", "No", "No", "Yes (media)", "No"],
    ["**PARAMPARA**", "2026", "**Yes**", "**Yes**", "**Yes**", "**Yes**", "**Yes**", "**Yes**"],
  ], { size: 15, highlightLast: true }));
  add(H2("9.2 Search log (4 October 2026)"));
  add(T([2.2, 2.2, 2.6], ["Where we searched", "Query", "Result"], [
    ["Web index incl. NIME, ISMIR, IEEE, ACM, arXiv, ResearchGate", "tabla + haptic / vibrotactile / wearable teaching", "No haptic tabla teaching system found. Closest: Layika (NIME 2026), virtual percussion gloves, electronic tablas"],
    ["Google Patents (via web search)", "tabla learning device + vibration feedback + wearable", "No tabla-specific patent found; generic wearable motion-teaching patents exist"],
    ["Web index", "haptic music learning review", "2022 scoping review; Musical Haptics book (2018); no tabla entries"],
    ["Web index", "pottery wheel-throwing expert gestures; haptic pottery", "Manitsaris et al. 2014; i-Treasures; PotteryGo; force-feedback virtual clay"],
    ["Web index", "puppetry teaching sensors; marionette motion capture", "Chinese shadow-play teaching patent; marionette-inspired interface; Yamane et al. marionette"],
  ], { size: 16 }));
  add(P("**Limit of this search:** a web search is not a professional patent search. Before submission, search the Indian Patent Office (InPASS), Google Patents and IEEE Xplore directly, and record the date. [To validate]"));
  add(Box("Defensible novelty statement", ["*\"To our knowledge, PARAMPARA is the first system that captures a specific master's stroke timing and strength without instrumenting the master's hands, teaches it through haptic cues that fade according to unaided probe performance, and binds the data to the master's signed consent and lineage. Each component builds on published work, which we cite.\"*"], COLOR.blue, "EEF3F8"));
  add(H3("Words that lose credibility (do not use)"));
  add(BL(["'World's first' (say 'to our knowledge')", "'Transmits the guru's feel' (say 'transmits timing, hand, stroke family and strength')", "'Replaces the guru' (it extends the guru's reach)", "'Blockchain' (we use signatures and hashes; no chain is needed)", "'AI learns the gharana' (we do not blend or generate style)"]));

  // ---------------------------------------------------------------- 10
  add(H1("10. Feasibility"));
  add(H2("10.1 Technical maturity of each subsystem"));
  add(T([1.4, 2.6, 1.6, 0.9], ["Subsystem", "Proof that it works", "Key number", "TRL now → at finale"], [
    ["Onset detection", "Standard drum-trigger practice; onset-detection methods [@bello2005]", "4 kHz sampling = 0.25 ms resolution", "4 → 5"],
    ["Stroke family", "Four-way CNN on tabla audio [@rohit2021; @rohit2023]; MVP only needs hand + ring/damp", "Dataset of about 26,600 strokes", "3 → 4"],
    ["Wireless timing", "ESP-NOW on ESP32 [@espnow]; cues scheduled locally", "Round trip about 2.4 ms; cue jitter target ≤ 3 ms", "4 → 5"],
    ["Haptic drive", "DRV2605L closed-loop LRA drive with real-time playback [@drv2605l]", "4 drivers on 2 I²C buses", "5 → 6"],
    ["Cue perception", "Four wrist sites [@chen2008]; drum + strength 96.18% [@leechoi]; tactile sync near auditory [@ammirante2016]", "Code recognition target ≥ 90%", "3 → 4"],
    ["Open-source precedents", "VHP 12-channel haptic board [@vhp]; ARIADNE platform [@ariadne]", "Reference designs exist", "—"],
    ["Signing", "Ed25519 [@rfc8032]; COSE [@rfc9052]; audited libraries", "32-byte keys, 64-byte signatures", "6"],
    ["App", "Web Bluetooth in Chrome and Edge [@webbt]", "Demo on a Chrome laptop", "5"],
    ["Fade controller", "Our simulation (Section 7)", "At most 4 reversals in any run", "3 → 4"],
  ], { size: 16 }));
  add(H2("10.2 Latency budget for Live Mirror (targets, not measurements)"));
  add(T([3, 1.5], ["Stage", "ms"], [
    ["Piezo sampling and threshold", "≈ 0.25"], ["Peak window", "3–4"], ["ESP-NOW transfer", "2–6"], ["Cuff processing", "≈ 1"],
    ["DRV2605L + LRA rise to perceptible vibration", "10–30"], ["**Total**", "**≈ 20–45 (target ≤ 50)**"],
  ], { highlightLast: true }));
  add(P("Replay mode does not depend on radio latency at all, because cues fire from timers on the cuff. Its target is cue jitter of 3 ms SD or less, measured with an accelerometer next to the actuator. [Target]"));
  add(H2("10.3 Perceptual feasibility and limits"));
  add(BL([
    "**Locations:** 4 sites is the evidence-based maximum for the wrist [@chen2008]; arm sites close together along the forearm are hard to tell apart [@cholewiak2003].",
    "**Strength levels:** two levels are proven [@leechoi]; three levels are our hypothesis H2. Fallback: two levels.",
    "**Rhythm through touch:** tactile synchronisation approaches auditory for simple rhythms with a large contact area [@ammirante2016]. We keep the student hearing their own tabla; touch is a coach, not a replacement.",
    "**Masking:** striking produces its own sensations, so actuators sit on the wrist, not the fingers. [To validate]",
  ]));
  add(H2("10.4 Build plan"));
  add(T([0.6, 2.8, 2.2], ["Week", "Goal", "Exit check"], [
    ["1", "Bench: piezo conditioning, onset detection, timestamps, logging", "T1 and T2 on a practice pad"],
    ["2", "Cuffs: DRV2605L on two I²C buses, ESP-NOW clock sync, schedule playback", "T5, T6, T8"],
    ["3", "App, scoring, Fade Engine 2.0, signing and verify page; record a real theka", "End-to-end Replay session"],
    ["4", "Mini-pilot (n = 5–8), deck, demo rehearsal, backup video", "Demo runs 3 times without help"],
  ]));
  add(P("**36-hour hackathon compression:** hours 0–6 integrate and re-calibrate; 6–18 Replay, scoring and fade curve; 18–26 signing and verify demo, polish; 26–32 rehearse, record backup video, fix the top three bugs; 32–36 final checks, spares, sleep. **Feature freeze at hour 26.** Roles: hardware, firmware, app, algorithms, research/UX, story and guru liaison."));
  add(H2("10.5 Acceptance tests (all targets)"));
  add(T([0.4, 1.6, 2.6, 1.6], ["#", "Test", "Method", "Target"], [
    ["T1", "Onset accuracy", "200 strokes per drum vs 240 fps video + clap sync", "F-measure ≥ 0.95 within ±10 ms"],
    ["T2", "False triggers", "5 minutes of bumps and room noise", "≤ 1% of events"],
    ["T3", "Hand attribution", "Alternate and simultaneous strokes", "≥ 95% correct"],
    ["T5", "Cue jitter", "Accelerometer on cuff, 200 cues", "SD ≤ 3 ms"],
    ["T7", "Live Mirror latency", "Strike to vibration onset", "≤ 50 ms"],
    ["T8", "Clock sync error", "Shared GPIO pulse comparison", "≤ 2 ms"],
    ["T9", "Code recognition", "20-trial test per user", "≥ 90%"],
    ["T10", "Battery", "Continuous replay", "≥ 3 h"],
    ["T12", "Tamper test", "Flip each byte of an envelope in turn", "100% rejected"],
    ["T13", "Fade controller", "Simulated learners (Section 7)", "Reaches low or zero g; ≤ 1 reversal per 10 cycles"],
    ["T14", "Comfort and heat", "1 hour of wear", "No notable warming or discomfort"],
  ], { size: 16 }));
  add(H2("10.6 Top risks"));
  add(T([1.8, 0.8, 0.8, 2.2, 1.6], ["Risk", "Likelihood", "Impact", "Mitigation", "Fallback"], [
    ["Piezo cross-talk between drums", "Medium", "High", "Foam isolation, dominance rule, tuned window", "Two separate pads for the demo"],
    ["Cues hard to perceive", "Medium", "High", "Per-user thresholds, firm band, LRA at resonance", "Two strength levels; three codes"],
    ["2.4 GHz congestion at venue", "High", "Medium", "Schedule held on cuffs; short sync bursts", "USB wired path; backup video"],
    ["Web Bluetooth flaky", "Medium", "Medium", "Test on the exact laptop", "USB serial"],
    ["No real guru recording", "Medium", "High", "Start outreach now; one theka is enough", "Record a trained teacher and say so"],
    ["Time overrun", "High", "High", "Feature freeze; MoSCoW priorities", "Cut Live Mirror, keep Replay"],
    ["Jury doubts the claims", "Medium", "High", "Narrow claims, cited evidence, pilot data", "Lead with the 60-second feel demo"],
  ], { size: 16 }));
  add(Box("Feasibility verdict", ["**Feasible within 4 weeks for a 6-person student team.** Every subsystem uses off-the-shelf parts with published precedents. The two real risks are perceptual (can students tell the codes apart?) and logistical (a real guru recording). Both have tests (T9) and fallbacks."], COLOR.green, "EEF6EF"));

  // ---------------------------------------------------------------- 11
  add(H1("11. Viability"));
  add(H2("11.1 Cost"));
  add(T([2.2, 1.4, 2.6], ["Item", "Cost", "Note"], [
    ["Prototype system (base unit + 2 cuffs)", "≈ ₹6,000–7,500", "Section 5.10; indicative"],
    ["Budget version (ERM, no drivers)", "≈ ₹3,500–4,500", "Less precise cues"],
    ["Design-for-manufacture version", "Lower, from a real quote", "Custom PCB, integrated driver and IMU [Target]"],
    ["Comparison: one month of a guru's honorarium under Guru-Shishya Parampara", "₹7,500", "For 4 shishyas, one year [@gsp]"],
  ]));
  add(P("**The economic argument:** a complete PARAMPARA kit costs less than one month of a guru's state honorarium, and one signed envelope can support many students between lessons. It multiplies the guru's reach; it does not replace the guru."));
  add(H2("11.2 Demand signals"));
  add(BL([
    "More than one lakh classical music examinees every year through ABGMVM alone [@abgmvm].",
    "More than 15 million Indian households learning music, according to an industry estimate [@musiclearners]; online classical platforms already sell tabla lessons, all video-first [@apps].",
    "People already pay for haptic rhythm: the Soundbrenner Pulse wearable metronome shipped to buyers in 67 countries, with reported annual sales of about US$1.5 million [@soundbrenner].",
    "The haptic technology market is estimated at roughly US$3.8–4.3 billion in 2024 [@hapmarket]. Component supply and know-how are mature.",
  ]));
  add(H2("11.3 Institutional channels that already exist"));
  add(T([1.6, 2.4, 2.6], ["Channel", "What exists", "How PARAMPARA plugs in"], [
    ["Guru-Shishya Parampara (Ministry of Culture, 7 ZCCs)", "Year-long honoraria for gurus, accompanists and shishyas [@gsp]", "Kit per sanctioned guru; signed envelopes become the scheme's documented output"],
    ["SNA ICH scheme and National Inventory", "Funding and inventory for intangible heritage since 2013 [@snaich]", "Signed envelopes as verifiable inventory records"],
    ["PM Vishwakarma", "About 30 lakh artisans; ₹500/day training stipend; guru–shishya training mode [@pmv]", "Craft version (pottery, carving) for advanced training modules"],
    ["KVIC Kumhar Sashaktikaran", "More than 18,000 electric potter wheels distributed [@ksy]", "Instrumented wheels for the pottery version (Section 13.3)"],
    ["AICTE IKS Division; NEP 2020", "IKS research and popularisation [@iks]; local artists as master instructors [@nep2020]", "Lab kits for IKS courses; guru recordings for schools"],
    ["UGC Artists/Artisans-in-Residence", "Guidelines for hiring artists in higher education [@ugc2025]", "Resident guru records envelopes for the campus library"],
  ], { size: 16 }));
  add(H2("11.4 Business models [To validate]"));
  add(T([1.6, 2.6, 2.2], ["Model", "Who pays", "Notes"], [
    ["Institution licence", "Music schools, academies, ZCCs", "Hardware at near cost; annual software and library licence"],
    ["Guru-shared envelope library", "Students subscribe", "Revenue share to consenting gurus; terms recorded in the envelope"],
    ["Open reference design", "Schools build their own", "Builds adoption; grants fund maintenance"],
    ["Grants and CSR", "Cultural programmes, CSR heritage funds", "Preservation of living traditions"],
  ]));
  add(P("Payment flows are contractual and institutional. The technology records terms and attribution; it cannot force payment, and we never claim that it can."));
  add(H2("11.5 Legal and ethical viability"));
  add(BL([
    "**Consent and privacy:** audio and motion recordings of identifiable people are personal data. The DPDP Act 2023 and the DPDP Rules notified on 13 November 2025 phase in obligations over 12–18 months [@dpdp]. PARAMPARA is privacy-by-design: data stays on the device or in the user's app, consent is explicit and recorded, deletion is supported.",
    "**Performers' rights:** the Copyright Act gives performers rights in their performances, including moral rights [@copyright1957]. The signed licence and attribution fields carry these terms with the data. Take legal advice before any commercial launch.",
    "**Heritage ethics:** UNESCO's principles call for free, prior and informed consent of practitioners [@unesco2015]; the 2003 Convention centres transmission [@unesco2003]. The guru owns, approves and can revoke.",
  ]));
  add(H2("11.6 Sustainability"));
  add(BL([
    "**Environmental:** rechargeable cells, repairable modular boards, no consumables.",
    "**Social:** revenue share and credit flow to gurus; keeps living masters at the centre.",
    "**SDG alignment:** SDG 4.7 (education for appreciation of cultural diversity), SDG 8.3 (decent work and micro-enterprise for artisans), SDG 11.4 (safeguard cultural heritage).",
  ]));

  // ---------------------------------------------------------------- 12
  add(H1("12. Impact"));
  add(H2("12.1 Theory of change"));
  add(T([1.2, 1.3, 1.3, 1.4, 1.5], ["Inputs", "Activities", "Outputs", "Outcomes", "Long-term impact"], [
    ["Kits; consenting gurus; app", "Record envelopes; students practise with fading cues; probes", "Signed envelopes; learning curves; retention scores", "Students keep timing accuracy without the device; gurus reach more learners", "Living traditions transmitted beyond one room and one lifetime"],
    ["Institution partners", "Pilots in schools and ZCCs", "Usage and outcome data", "Evidence for policy adoption", "A national, verifiable archive of embodied skill"],
  ], { size: 16 }));
  add(H2("12.2 Who benefits and how we will measure it"));
  add(T([1.3, 2.6, 2.4], ["Group", "Benefit (hypothesis)", "Measure"], [
    ["Gurus", "Their playing style is preserved and reaches more students on their terms", "Gurus recorded; consent and satisfaction feedback"],
    ["Students", "Access to a master's timing and strength where no teacher is nearby; honest feedback", "Retention scores, hours practised, cost per learner"],
    ["Institutions and archivists", "Verifiable, signed records of lineages", "Envelopes archived and verified"],
    ["Researchers", "First dataset pairing masters' micro-timing with learners' trajectories", "Open (consented) dataset releases; papers"],
    ["Artisans (crafts version)", "Faster advanced training under PM Vishwakarma-style schemes", "Training hours to proficiency"],
  ], { size: 16 }));
  add(H2("12.3 Accessibility: a research hypothesis, not a claim"));
  add(P("India counts about 50.7 lakh people with hearing disability [@census2011]. Deaf and hearing participants can synchronise their movement to vibrotactile music [@tranchant2017], and vibrotactile drumming guidance was explicitly proposed for learners for whom visual demonstration does not work, such as blind learners [@leechoi]. PARAMPARA could open rhythm training to these groups. We have not tested it and make no claim; it needs its own study. [To validate]"));
  add(H2("12.4 Impact KPIs for the first 12 months [Target]"));
  add(T([2.6, 1.4, 2.4], ["KPI", "Target", "How measured"], [
    ["Gurus recorded with signed consent", "10 across 3 gharanas", "Envelope registry"],
    ["Students completing a 2-week programme", "100", "App logs"],
    ["Retention timing spread vs video-only (paired)", "Effect size dz ≥ 0.5 with 95% CI", "Stage A/B studies"],
    ["Code recognition after familiarisation", "≥ 90%", "T9"],
    ["Institutions piloting", "3 (school, academy, ZCC)", "MoUs"],
    ["Second tradition prototyped", "1 (pakhawaj, Kathak or pottery)", "Demo + bench tests"],
  ]));

  // ---------------------------------------------------------------- 13
  add(H1("13. Where else PARAMPARA works: tabla, pottery, puppetry, dance and more"));
  add(P("The brief asked which other traditions this can serve. The pipeline does not depend on tabla. What changes from one tradition to another is the sensors, the 'unit of skill' and the vibration code. (The brief's word 'poppetry' could mean pottery or puppetry, so we cover both.)"));
  add(H2("13.1 The Skill Transfer Stack"));
  add(T([1.2, 2.2, 3], ["Layer", "Same everywhere", "Changes per tradition"], [
    ["1. Sense", "Timestamped events from cheap sensors", "Piezo, IMU, force, string tension, wheel speed"],
    ["2. Envelope", "Per-unit features, micro-timing, signed CBOR", "Unit = stroke, step, pull, tool pass"],
    ["3. Haptic replay + fade", "Tactons, probes, Fade Engine 2.0", "Body sites (wrist, ankle), code table"],
    ["4. Sign and lineage", "COSE/Ed25519, consent, approval, revocation", "Lineage tags (gharana, parampara, craft cluster)"],
  ], { boldFirstCol: true }));
  add(H2("13.2 Domain map"));
  add(T([1.25, 1.2, 1.25, 1.05, 1.95, 1.15, 0.95], ["Tradition", "Tacit skill", "Sensors", "Haptic cue", "Evidence it can be captured or taught", "Channel", "Effort"], [
    ["Pakhawaj, dholak, mridangam", "Stroke timing, strength", "Piezo sites", "Same code", "Tabla methods transfer to other drums [@rohit2021]", "GSP, SNA", "Low"],
    ["Kathak footwork (tatkar)", "Heel/toe timing, layakari", "Ankle IMU, piezo insole or floor", "Ankle cuffs", "Haptic Drum Kit used ankle cues [@holland2010]; dance with vibrotactile feedback [@drobny2010]", "GSP, NEP schools", "Medium"],
    ["Bharatanatyam adavus", "Posture sequence with sollukattu timing", "IMU, camera", "Timing by touch; posture shown visually", "Adavu recognition research [@mallick]", "GSP", "Med–High"],
    ["Wheel-throwing pottery", "Hand pressure, centring, pull rhythm", "Thin-film force pads, wrist IMU, wheel speed", "Pressure-level and rhythm cues", "Expert gestures captured with inertial sensors + HMM [@manitsaris2014]; i-Treasures pottery [@itreasures]; PotteryGo [@potterygo]", "PM Vishwakarma, KVIC [@pmv; @ksy]", "Medium"],
    ["String puppetry (Kathputli)", "Pull timing that gives the puppet life", "IMU on control bar, string tension", "Wrist pulses on the beat", "Human motion mapped to a string marionette [@yamane2004]; novices used a marionette-style interface [@marionette2025]", "ZCCs, SNA", "Med–High"],
    ["Shadow puppetry (Tholu Bommalata)", "Rod manipulation with narration", "Rod IMU", "Wrist cues", "Shadow-play teaching system patented in China [@shadowpatent]", "ZCCs", "Medium"],
    ["Handloom weaving", "Beat-up rhythm, treadle sequence", "IMU on beater, treadle switches", "Rhythm cues", "64.66 lakh artisans [@handicrafts]", "Handloom schemes", "Medium"],
    ["Tala-keeping for vocalists", "Kriya (counting gestures), tala cycle", "Finger pads, mic", "Tala pulses", "Layika links finger counting to tala [@layika2026]", "Music schools", "Low"],
    ["Carving, metal craft", "Tool force, stroke rhythm", "Instrumented tools", "Force-level cues", "Craft capture in Mingei [@zabulis2020]", "PM Vishwakarma", "High"],
    ["Rhythm for deaf learners", "Beat", "—", "Full code", "Vibrotactile beat synchronisation [@tranchant2017]", "Special schools", "Research"],
  ], { size: 15 }));
  add(H2("13.3 Deep dive: pottery on the chak"));
  add(BL([
    "**Why it matters:** KVIC has distributed more than 18,000 electric potter wheels [@ksy], and PM Vishwakarma trains potters in guru–shishya mode with a ₹500/day stipend [@pmv]. Clusters such as Khurja (GI item 178) have declined for a decade [@khurja]. Machines speed up production; they do not pass on a master's hands.",
    "**What is tacit:** centring pressure, the speed of raising walls, wall thickness, timing of each pull against wheel speed.",
    "**Proof it can be captured:** Manitsaris et al. captured expert wheel-throwing gestures with wireless inertial sensors, recognised them with hidden Markov models, and proposed real-time feedback on expert–learner differences [@manitsaris2014]. i-Treasures chose pottery as one of its four heritage cases [@itreasures]. PotteryGo learners trained in VR went on to make a real ceramic base about as easily as studio-taught learners [@potterygo].",
    "**PARAMPARA design:** thin-film force sensors under silicone finger cots (or on the rib tool, so the hand stays bare), wrist IMU, Hall-effect wheel-speed sensor. Envelope = pressure profile p(t), wheel rpm, hand height. Cues: intensity for 'press more or less', rhythm for pulls. Same fade engine and signing.",
    "**Risks:** wet clay and water (sealed sensors), and touch masking from clay contact (cues on the forearm). Phase 3.",
  ]));
  add(H2("13.4 Deep dive: puppetry"));
  add(BL([
    "**Why it matters:** Kathputli is performed by the Nat Bhatt community from Nagaur, Churu and Sikar in Rajasthan. Competition from cinema and television has shortened performances, and many puppeteers now make souvenirs instead [@kathputli]. Shadow theatre in India is considered endangered [@kathputli].",
    "**What is tacit:** the timing and amplitude of string pulls that make a wooden figure look alive, synchronised with music and dialogue.",
    "**Proof it can be captured:** human motion capture has been adapted to drive a string marionette through inverse kinematics [@yamane2004]; a marionette-style control interface was usable by novices [@marionette2025]; a shadow-play teaching method based on gesture tracking has been patented in China [@shadowpatent], which shows both feasibility and commercial interest.",
    "**PARAMPARA design:** IMU on the master's control bar, optional string-tension sensors. Envelope = pull events with timing and amplitude. Student feels wrist pulses on the beat of each pull; the fade engine withdraws them.",
  ]));
  add(H2("13.5 Deep dive: Kathak footwork"));
  add(P("Tatkar is percussion with the feet: heel and toe strikes in precise rhythmic patterns, with ghungroo bells. It maps almost one-to-one onto the tabla pipeline: a piezo insole or floor plate gives onsets, an ankle IMU gives heel versus toe, and ankle cuffs replace wrist cuffs. The Haptic Drum Kit already showed that ankle vibration can guide foot timing [@holland2010]. This is the strongest candidate for the second tradition."));
  add(H2("13.6 Which tradition next?"));
  add(T([1.8, 1, 1, 1, 1, 0.8], ["Tradition", "Heritage value", "Sensing ease", "Haptic fit", "Funding channel", "Total /20"], [
    ["Pakhawaj / mridangam", "4", "5", "5", "4", "18"], ["Kathak footwork", "5", "4", "4", "4", "17"],
    ["Wheel-throwing pottery", "4", "3", "3", "5", "15"], ["Kathputli", "5", "3", "3", "3", "14"],
    ["Handloom weaving", "4", "3", "3", "4", "14"], ["Bharatanatyam", "5", "2", "2", "4", "13"],
  ], { boldFirstCol: true }));
  add(P("Scores are our team judgement on a 1–5 scale. [Design choice]"));

  // ---------------------------------------------------------------- 14
  add(H1("14. How PARAMPARA will fascinate the jury"));
  add(H2("14.1 Who judges and what they score"));
  add(P("SIH panels combine academics, industry engineers and ministry officials. Institute reports list the parameters as novelty, complexity, clarity, methodology, feasibility, practicality, sustainability, scale of impact, user experience and future potential; one published internal rubric weights them as below [@sihrubric]. Confirm the official rubric with your SPOC."));
  add(T([1.5, 0.75, 2.15, 2.15, 1.55], ["Criterion", "Weight", "What judges look for", "Our proof", "Demo / slide moment"], [
    ["Feasibility & practicability", "20%", "Will it work, with what parts, by when?", "Off-the-shelf BOM; TRL table; 4-week plan; acceptance tests", "Working cuffs on the table"],
    ["Impact & potential", "20%", "Who benefits, how many, measurably?", "1 lakh+ examinees; government channels; KPIs; pottery and puppetry extensions", "Domain map slide"],
    ["Novelty & innovation", "15%", "What is new versus existing work?", "Seven innovations; prior-art matrix; search log", "Matrix slide with one fully ticked row"],
    ["Complexity & detail", "15%", "Real engineering depth?", "Onset detection, clock sync, anticipation compensation, COSE signing, controller simulation", "Live fade curve and tamper test"],
    ["Sustainability & scalability", "15%", "Will it last and grow?", "Same stack for 10 traditions; institution licences; open reference design", "Roadmap slide"],
    ["User experience", "10%", "Is it pleasant and usable?", "4-site code, 60-second calibration, comfort tests", "The judge wears it"],
  ], { size: 16 }));
  add(H2("14.2 Five moments that make a jury remember a team"));
  add(NL([
    "**'You are the student.'** The judge wears the cuff, closes their eyes and feels a recorded guru's theka. Nothing on a slide competes with a physical experience.",
    "**'Now we switch it off.'** The fade curve falls on screen while the score holds, then a probe cycle runs with zero cues. Say: *'We measure learning with the device off.'* This shows the team understands learning science, not only gadgets.",
    "**'Watch the signature fail.'** Verify the guru's envelope, flip one byte, verification fails and replay is refused. Ten seconds, very visual.",
    "**'Here is what we got wrong.'** Show that the simulation caught the slow fade rule and how it was fixed. Judges rarely see students reporting their own errors; it builds trust.",
    "**'The same stack teaches a potter.'** One slide shows pottery, puppetry and Kathak using the same four layers, with the PM Vishwakarma and KVIC numbers. Scale becomes believable.",
  ]));
  add(H2("14.3 Three-minute demo script"));
  add(T([0.9, 4.8], ["Time", "What happens"], [
    ["0:00–0:20", "Hook: 'Video shows how culture looks. PARAMPARA lets you feel when a master strikes.' One line on Zakir Hussain: recordings survive, talim does not."],
    ["0:20–1:20", "Judge wears the right cuff (and left if time allows). Recorded guru theka plays as haptics; judge taps along; live score appears."],
    ["1:20–2:00", "Fade curve: g falls, score holds, probe cycle at g = 0. 'We measure learning with the device off.'"],
    ["2:00–2:30", "Trust: verify the guru's signature, flip one byte, watch it fail. Show the lineage graph."],
    ["2:30–3:00", "Close: pilot result (even preliminary), the domain map, and a guru's quote (with consent)."],
  ], { boldFirstCol: true }));
  add(P("**Checklist:** two spare cuffs and cells, a USB power bank, a pre-calibrated default profile with a 20-second re-check, offline copy of the app, backup video, printed one-page architecture, a signed demo envelope and a deliberately tampered copy."));
  add(H2("14.4 Lines that land"));
  add(BL([
    "'Video shows how a master plays. We let you feel it, then we take the help away.'",
    "'Our success metric is the score when the device is off.'",
    "'We do not transmit the guru's soul. We transmit timing, hand, stroke family and strength, and we measure them.'",
    "'Every envelope is signed. Change one byte and it stops working.'",
    "'The guru owns the recording, approves the student and can revoke it.'",
    "'One kit costs less than one month of a guru's state honorarium, and it multiplies their reach.'",
    "'Our own simulation caught a bug in our first design. Here is the fix.'",
  ]));
  add(H2("14.5 Jury questions and short answers"));
  add(T([2.2, 4.2], ["Question", "Short answer (with evidence)"], [
    ["Can wrist vibration carry fine technique?", "No, and we do not claim it. We transmit timing, hand, family and strength. Haptics are strongest for timing [@feygin2002]; kinematics are shown visually."],
    ["Won't students depend on the cuff?", "The fade engine removes cues; success is measured at zero guidance after 24 hours. Feedback on fewer trials improves retention [@winstein1990]."],
    ["Is this new?", "Components exist (E-Tabla, Haptic Drum Kit, MusicJacket, Layika). The combination of capture, faded replay with retention testing and signed lineage is not in the literature we searched (Section 9)."],
    ["Can people really feel rhythm through the skin?", "Tactile synchronisation approaches auditory for simple rhythms [@ammirante2016]; drum and strength cues were recognised 96% of the time [@leechoi]."],
    ["Why not just a metronome app?", "A metronome gives the grid, not the master's micro-timing, hand or stroke family, and it cannot measure unaided retention. Our trial includes a metronome arm."],
    ["Why tabla?", "Discrete, measurable strokes; a living oral tradition; clear lineages; open datasets. The pipeline is not tabla-specific (Section 13)."],
    ["Does it replace the guru?", "No. The guru records, approves readiness and keeps control. It extends reach between lessons."],
    ["How do you handle gharana differences?", "Every envelope carries a lineage tag; blending needs explicit consent from every guru involved."],
    ["What if a guru wants to withdraw?", "Signed revocation, honoured at the next sync. We state the offline window honestly."],
    ["What happens after a guru passes away?", "A custodian key (family or institution) named in the consent terms. To be agreed with gurus."],
    ["Why not blockchain?", "Signatures and hashes already give tamper evidence and provenance, as in C2PA for media [@c2pa]. A chain adds cost and no needed property."],
    ["Is the data private?", "Stored on device or in the user's app; explicit consent; deletion supported; designed for the DPDP Act and Rules [@dpdp]."],
    ["How accurate is it?", "Bench targets T1–T14 and pilot results. We report what we measured and label everything else as a target."],
    ["What if the pilot shows no benefit?", "We report it. The archive, signing and measurement value remain, and we change the cue design."],
    ["Can it help deaf learners?", "Plausibly: deaf participants synchronise to vibrotactile beats [@tranchant2017]. Untested by us; no claim."],
    ["Cost and scale?", "About ₹6,000–7,500 now; lower with a custom PCB. Channels: Guru-Shishya Parampara, SNA, PM Vishwakarma [@gsp; @snaich; @pmv]."],
  ], { size: 16 }));
  add(H2("14.6 Mistakes that lose points"));
  add(BL([
    "Opening with crore-scale market numbers instead of the working demo.",
    "Saying 'world's first', 'AI' or 'blockchain' without need.",
    "A reference that a judge cannot find (Section 3).",
    "Presenting the simulation as proof of learning.",
    "No plan B when the venue radio fails.",
  ]));
  add(H2("14.7 Mapping to the SIH idea deck"));
  add(T([1.5, 4.5], ["Slide", "Content from this dossier"], [
    ["Title", "PARAMPARA: Feel the Guru's Hand; PS 26214; team"],
    ["Idea / solution", "Pitch, four pillars, Figure 1, the innovation sentence (Section 8)"],
    ["Technical approach", "Skill Envelope, haptic code, Fade Engine 2.0, trust layer, BOM"],
    ["Feasibility and viability", "TRL table, build plan, risks, cost, channels (Sections 10–11)"],
    ["Impact and benefits", "Theory of change, KPIs, domain map (Sections 12–13)"],
    ["Research and references", "Evidence table (Section 1), prior-art matrix, 6–8 V-status references"],
  ], { boldFirstCol: true }));

  // ---------------------------------------------------------------- 15
  add(H1("15. Validation and research plan"));
  add(P("We merge the two source plans into three stages. Stage A fits the SIH timeline; Stage B is the publishable trial; Stage C runs alongside both."));
  add(H2("15.1 Research questions"));
  add(T([0.5, 3, 3], ["ID", "Question", "Hypothesis"], [
    ["RQ1", "Does faded haptic replay improve unaided retention of timing compared with audio-and-video practice?", "H1 (primary): retention timing spread (SD of bias-corrected error) is lower after haptic practice"],
    ["RQ2", "Can users tell the five codes and three strength levels apart?", "H2: recognition ≥ 90% after short familiarisation"],
    ["RQ3", "Does the fade engine reach low guidance without a large drop at probe?", "H3: dependency index (guided score − probe score) is small at the end"],
    ["RQ4", "Is the device comfortable and acceptable to students and gurus?", "H4: good usability (SUS [@brooke1996]) and workload (NASA-TLX [@hart1988]); gurus accept the consent design"],
  ], { size: 16 }));
  add(H2("15.2 Stage A: within-subject crossover pilot (SIH)"));
  add(BL([
    "**Participants:** 12–15 adults without tabla training; prior musical training recorded as a covariate; exclude reduced sensation in hands or wrists.",
    "**Design:** each person learns two matched 8-stroke phrases, one with haptic replay (H) and one with guru audio + hand video (V); condition and phrase order counterbalanced. Same post-cycle score display and practice time in both.",
    "**Protocol:** Day 1: consent, calibration (tactile threshold, anticipation offset, piezo), code test, baseline, 6 blocks × 8 cycles per phrase. Day 2 (24 h later): unaided retention, transfer at ±10% tempo, questionnaires.",
    "**Power:** paired, two-sided α = 0.05, 80% power: dz ≈ 1.0 needs about 10 people, dz ≈ 0.8 about 15 [@cohen1988]. With fewer, report as a pilot with an interval estimate, not a significance claim.",
    "**Analysis:** paired t-test or Wilcoxon; effect size dz with bootstrap 95% CI; every participant's trajectory shown; power-law fit per learner [@newell1981]. Analysis plan written down before data collection.",
  ]));
  add(H2("15.3 Stage B: four-arm randomised trial (after SIH)"));
  add(T([1.6, 4.2], ["Arm", "What participants get"], [
    ["1. Video only", "Recorded guru playing the phrase, with audio"],
    ["2. Video + metronome", "Same, plus an audio metronome on the beat (the PDF's control)"],
    ["3. PARAMPARA, fixed fade", "Video + haptic replay with a fixed linear fade"],
    ["4. PARAMPARA, adaptive (Fade Engine 2.0)", "Video + haptic replay with probe-anchored fading"],
  ], { boldFirstCol: true }));
  add(BL([
    "**Why four arms:** arm 2 tests whether a cheap metronome explains the gain; arm 3 vs arm 4 tests whether adaptivity adds anything beyond a good fixed fade, which our simulation could not settle (Section 7).",
    "**Size:** for a between-group effect d ≈ 0.75 (two-sided α = 0.05, 80% power), about 29 per arm, about 120 in total [@cohen1988].",
    "**Schedule:** 3 sessions of 30 minutes over one week; unaided tests before, after and at 1-week retention, plus a transfer test.",
    "**Analysis:** mixed model with group × time; planned contrasts 3 vs 1, 4 vs 3, 3 vs 2. Pre-register on OSF; ethics approval from the institute.",
  ]));
  add(H2("15.4 Stage C: guru and student interviews"));
  add(P("Interview 3–5 gurus and 5–10 students with consent. Key guru questions: how readiness is decided; what is corrected most (timing, strength, hand position, sound); what 'laya sense' means; what is lost on video calls; whether they would record for students they never meet, and on what terms; who should control the recording after them; views on cross-gharana teaching; what would make them distrust such a device; what it must never claim. Summarise as themes; quote only with permission. [To validate]"));
  add(H2("15.5 Threats to validity"));
  add(T([2, 4], ["Threat", "Mitigation"], [
    ["Small sample", "Within-subject design; intervals not just p-values; call it a pilot"],
    ["Novelty effect", "24-hour and 1-week retention tests"],
    ["Phrase difficulty", "Matched phrases; counterbalancing; pre-pilot check"],
    ["Experimenter bias", "Automatic scoring; fixed script; analyst blind to condition where possible"],
    ["Sensor error", "Bench validation first (T1–T14)"],
    ["Prior musical skill", "Recorded as a covariate"],
  ]));
  add(P("**If the result is negative or unclear, we report it.** The archive, signing and objective timing measurement keep their value, and the next iteration changes the cue design. Judges respect a clearly reported null result more than an inflated claim. [Plausible]"));

  // ---------------------------------------------------------------- 16
  add(H1("16. Limitations and honest risks"));
  add(NL([
    "**Narrow capture.** Timing, hand, family and strength only. Finger shape, contact point, bayan heel pressure and tone colour are not captured.",
    "**Tactile limits.** At most about four wrist sites and two to three strength levels; slow to medium laya only in this version.",
    "**Proxy measures.** Piezo amplitude is a relative force proxy; piezo decay may not separate ringing from damped strokes without the microphone.",
    "**Evidence.** The pilot is small and short; results will be directional at best.",
    "**Literature is mixed.** Haptic guidance can help or hurt depending on task and learner [@heuer2015; @sigrist2013]. Our hypothesis could be wrong.",
    "**Simulation is assumption-bound.** It tests the controller only; it shows adaptive and fixed fading roughly tied.",
    "**Enforcement.** Revocation has an offline window; licence fees cannot be enforced technically; copying cannot be prevented.",
    "**Keys.** Prototype keys are software keys; identity binding depends on a trustworthy pairing step.",
    "**Cultural acceptance.** Some gurus may reject recording or device-mediated teaching. Their view decides what ships.",
    "**Style imitation.** An envelope is not audio and cannot generate a performance, but it could help someone imitate a style. Consent terms must say what use is allowed.",
  ]));

  // ---------------------------------------------------------------- 17
  add(H1("17. Roadmap"));
  add(T([1.4, 3, 2], ["Phase", "Scope", "Exit criterion"], [
    ["1. SIH MVP (now)", "Piezo capture, Replay, scoring, Fade Engine 2.0, signing and verify, one theka, Stage A pilot", "Demo runs 3× unaided; T1–T14 logged; pilot effect size with CI"],
    ["2. Stronger product (3–6 months)", "Bol classification (CNN on our recordings, building on [@rohit2023]), Live Mirror, structured fade, more taals, drut laya", "Stage B trial launched; 10 gurus recorded"],
    ["3. Trust and capture (6–12 months)", "Secure element, institutional countersignature (W3C VC [@w3cvc]), royalty ledger, camera-based finger capture, EMG trials", "One institution issuing countersignatures"],
    ["4. Platform (12+ months)", "Second and third traditions (pakhawaj, Kathak, pottery), community library, accessibility study", "Two traditions live; accessibility study ethics-approved"],
  ], { size: 16 }));

  // ---------------------------------------------------------------- 18
  add(H1("18. Pre-submission checklist"));
  add(BL([
    "Open every reference you put on a slide; use V-status ones or re-check P and S entries (Section 19).",
    "Run a patent and literature search on InPASS, Google Patents and IEEE Xplore for 'tabla', 'haptic', 'wearable', 'skill transfer'; record the date.",
    "Get written consent from the guru for the recording, the consent terms and any quote.",
    "Confirm the ethics process for the pilot with your institute.",
    "Bench-test T1–T14 and keep the logs.",
    "Replace every [Target] in the deck with a measured result, or keep the label.",
    "Replace ₹ estimates with real quotes.",
    "Re-run `PARAMPARA/sim/fade_engine_sim.py` after any change to the fade constants.",
    "Rehearse the 3-minute demo three times and record a backup video.",
    "Confirm the official SIH rubric and deck template with your SPOC.",
  ]));

  // ---------------------------------------------------------------- Appendices
  out.push("__APPENDIX__");
  add(H1("Appendix A. Parameter sheet (starting values)", true));
  add(T([2.4, 2, 1.2], ["Parameter", "Value", "Section"], [
    ["Piezo sampling", "≥ 4 kHz", "5.10"], ["Onset threshold k (× noise σ)", "6–8", "5.10"], ["Refractory time R", "40 ms", "5.10"],
    ["Cross-talk window W", "10 ms", "5.10"], ["σ_t, σ_A", "35 ms, 4 dB", "5.7"], ["Score weights", "0.5 / 0.25 / 0.25", "5.7"],
    ["Intensity levels", "×2, ×3.5, ×6 of threshold", "5.5"], ["Probe frequency (v2)", "1 probe per 4 guided cycles", "5.8"],
    ["Skill estimate smoothing α", "0.5", "5.8"], ["Mastery level", "0.85", "5.8"], ["Max change in g per update", "0.2", "5.8"],
    ["Assist-as-needed trigger", "2 guided cycles < 0.5", "5.8"], ["Mode switch to error-only cues", "ŝ ≥ 0.7", "5.8"],
    ["Mastery gate", "ŝ ≥ 0.85 × 3 blocks, 2 days, guru approval", "5.8"], ["Supported laya (MVP)", "Inter-stroke interval ≥ 400 ms", "5.5"],
  ], { size: 17 }));
  add(H1("Appendix B. Pseudo-code"));
  add(H3("Fade Engine 2.0 (per cycle)"));
  add(Code([
    "state: g = 1.0, s_hat = None, guided_since_probe = 0, scores = []",
    "",
    "before each cycle:",
    "    if guided_since_probe >= 4:  run PROBE cycle (no cues, score hidden)",
    "    else:                        run GUIDED cycle with guidance g",
    "",
    "after a PROBE cycle with score S:",
    "    s_hat = S if s_hat is None else 0.5*s_hat + 0.5*S",
    "    target = clip(1 - s_hat/0.85, 0, 1)",
    "    g = clip(target, g - 0.2, g + 0.2);  if g < 0.05: g = 0",
    "    mode = 'error_only' if s_hat >= 0.7 else 'guidance'",
    "    guided_since_probe = 0",
    "",
    "after a GUIDED cycle with score S:",
    "    scores.append(S); guided_since_probe += 1",
    "    if g > 0 and last two scores < 0.5:  g = min(1, g + 0.2)   # assist as needed",
    "",
    "cue selection inside a guided cycle (stroke i):",
    "    cue_i = Bernoulli(g) or |e'_t,i(previous cycle)| > 2*sigma_t",
  ]));
  add(H3("Onset detector (per piezo channel, 4 kHz)"));
  add(Code([
    "every sample x:",
    "    e = sliding_max(abs(x), 3 ms)",
    "    if armed and e > max(theta_min, mu + k*sigma) and now - last_onset > R:",
    "        t = now; peak = max(abs(x) over next 3 ms); emit Onset(channel, t, peak)",
    "        armed = False; last_onset = t",
    "    if e < 0.5*theta: armed = True",
    "    if quiet: update mu, sigma (exponential moving average)",
  ]));
  add(H3("Cue scheduling on a cuff"));
  add(Code([
    "on SCHEDULE(list of (c_i, site, level), start_time):",
    "    for each item: esp_timer_start_once(timer_i, (start_time + c_i) - now)",
    "on timer_i fire:",
    "    drv[site].set_rtp_amplitude(level_to_amplitude(level)); pulse(duration_for(site))",
  ]));
  add(H1("Appendix C. Glossary"));
  add(T([1.4, 4.6], ["Term", "Meaning"], [
    ["Taal, matra, theka", "Rhythmic cycle; one beat in it; the basic stroke pattern that defines the taal"],
    ["Sam, khali, tali", "First beat of the cycle; the 'empty' beat; clap beats"],
    ["Laya", "Tempo (vilambit slow, madhya medium, drut fast)"],
    ["Bol", "Spoken syllable naming a stroke (Dha, Dhin, Tin, Ta …)"],
    ["Dayan, bayan", "Right (treble) and left (bass) drums of the tabla"],
    ["Gharana, baaj", "Lineage or school of playing; playing style (band or khula)"],
    ["Talim, riyaz, paltā", "Traditional training; daily practice; structured variation"],
    ["Tacton", "A structured tactile message built from rhythm, intensity and location"],
    ["LRA, ERM", "Linear resonant actuator; eccentric rotating-mass motor"],
    ["Retention, transfer", "Performance after a delay without help; performance in a changed context"],
    ["NMA", "Negative mean asynchrony: tapping slightly before a pacing signal"],
    ["COSE, CBOR", "CBOR Object Signing and Encryption; Concise Binary Object Representation"],
    ["Ed25519", "Elliptic-curve digital signature scheme (32-byte keys, 64-byte signatures)"],
    ["ESP-NOW", "Low-latency peer-to-peer radio protocol on ESP32"],
    ["TRL", "Technology readiness level (1 = idea, 9 = proven in operation)"],
  ], { size: 17, boldFirstCol: true }));
  return out;
};
