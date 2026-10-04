// PARAMPARA 2.0 (red-team revision): sections 8–19 and appendices.
module.exports = function (L) {
  const { P, H1, H2, H3, BL, NL, T, Box, Code, COLOR } = L;
  const out = [];
  const add = (...xs) => xs.forEach((x) => (Array.isArray(x) ? out.push(...x) : out.push(x)));

  // ---------------------------------------------------------------- 8
  add(H1("8. Innovation: where exactly we innovate", true));
  add(P("We claim no new component physics. Our innovations are at the **system** and **context** levels, and each one is specific enough for a judge to check."));
  add(T([0.35, 1.4, 2.1, 1.9, 2.1], ["#", "Innovation", "What it is", "Closest prior art", "Our difference"], [
    ["I1", "Gharana Fingerprint from the instrument", "Per-matra micro-timing, accent contour, stroke sequence and arm preparation of one master, from piezo + wrist IMU, with no glove", "Gharana recognition from audio [@gowriprasad2021]; tabla stroke CNNs [@rohit2023]; drummer fingerprints [@carter2025]", "Recognition becomes a **teachable, consented reference** of a specific master, measured on the instrument itself"],
    ["I2", "Perception-driven multisensory curriculum", "Three tiers; touch for structure, hearing for micro-timing, vision for movement; tolerance tightens by tier; Tier 3 scores style similarity", "Haptic drum teaching [@holland2010; @leechoi]; multimodal feedback review [@sigrist2013]", "Channel allocation derived from measured perceptual limits [@lauzon2020; @friberg1995]"],
    ["I3", "Movement-aware anticipatory tactons", "Cues end before the student's measured preparatory lift, outside the suppression window, at ≥ 3× threshold", "Wearable metronomes cue on the beat [@soundbrenner]", "Uses movement-related tactile suppression research [@williams1998; @juravle2017] to schedule cues"],
    ["I4", "Probe-gated mastery (Fade Engine 2.1)", "Session-start and periodic unaided probes drive guidance; skill-aware switch to error-only cues; guru approval gate", "Lab feedback-schedule studies [@winstein1990; @milot2010]", "Embedded in a product loop; realistic simulation shows a small, consistent gain over a fixed fade"],
    ["I5", "Guru-first consent and credit", "Passkey fingerprint signing; spoken consent in the guru's language; CARE and TK-label governance; archive-ready provenance", "C2PA for media [@c2pa]; TK Labels [@localcontexts]; TKDL [@tkdl]", "Applied to embodied performance data, with guru–shishya branching rules"],
    ["I6", "'Feel the gharanas' showcase", "Public kiosk: feel and hear three masters' theka, see their fingerprints, guess which is which", "Static museum audio; Tabla Touch electronic tabla [@tablatouch]", "Turns style into an experience and a measurable discrimination test"],
    ["I7", "One stack, many traditions", "Sense → fingerprint → multisensory faded teaching → consented lineage", "i-Treasures and Mingei captured crafts and dance [@itreasures; @manitsaris2014; @zabulis2020]", "A deployable, low-cost transmission stack, not only analysis"],
  ], { size: 15 }));
  add(Box("The innovation in one sentence", ["**PARAMPARA measures a master's rhythmic fingerprint, teaches it through the senses best suited to each part, deliberately withdraws its help, and keeps the master's consent and credit attached to every byte.**"]));

  // ---------------------------------------------------------------- 9
  add(H1("9. Novelty: evidence and prior-art matrix"));
  add(T([2.1, 0.55, 0.85, 0.8, 0.75, 0.8, 0.8, 0.75], ["Work", "Year", "Measures a master's style", "Haptic to learner", "Fades guidance", "Unaided retention", "Signed + consent", "Indian tradition"], [
    ["Electronic Tabla Controller [@kapur2002]", "2002", "No", "No", "No", "No", "No", "Yes"],
    ["TablaNet [@sarkar2007]", "2007", "Part (recognition)", "No", "No", "No", "No", "Yes"],
    ["Electronic tabla (Pardue et al.) [@pardue2020]", "2020", "No", "No", "No", "No", "No", "Yes"],
    ["Tabla gharana recognition [@gowriprasad2021]", "2021", "Yes (gharana)", "No", "No", "No", "No", "Yes"],
    ["Tabla stroke CNN [@rohit2021; @rohit2023]", "2021–23", "Part", "No", "No", "No", "No", "Yes"],
    ["Tabla Touch [@tablatouch]", "recent", "No", "No", "No", "No", "No", "Yes"],
    ["Multi-modal Indian percussion tutor (poster) [@hotmobile2026]", "2026", "Part (senses learner)", "No", "No", "No", "No", "Yes"],
    ["Layika glove [@layika2026]", "2026", "No", "No", "No", "No", "No", "Yes"],
    ["Haptic Drum Kit [@holland2010]", "2010", "No", "Yes", "No", "Part", "No", "No"],
    ["Haptic Bracelets [@bouwer2013; @holland2018]", "2013–18", "Part (live)", "Yes", "No", "Part", "No", "No"],
    ["MusicJacket [@vanderlinden2011]", "2011", "No", "Yes", "No", "Part", "No", "No"],
    ["Vibrotactile drumming guidance [@leechoi]", "2013–15", "No", "Yes", "No", "No", "No", "No"],
    ["Grindlay haptic drumstick [@grindlay2008]", "2008", "Part", "Yes (force)", "No", "Yes", "No", "No"],
    ["Bharatanatyam haptics performance [@srinivasan2023]", "2023", "No", "Part", "No", "No", "No", "Yes"],
    ["i-Treasures [@itreasures]", "2013–17", "Yes", "Part", "No", "No", "No", "No"],
    ["Expert pottery gestures [@manitsaris2014]", "2014", "Yes", "No", "No", "No", "No", "No"],
    ["Soundbrenner Pulse [@soundbrenner]", "2016", "No", "Yes", "No", "No", "No", "No"],
    ["C2PA [@c2pa]", "2021–25", "n/a", "No", "No", "No", "Yes (media)", "No"],
    ["**PARAMPARA 2.0**", "2026", "**Yes**", "**Yes**", "**Yes**", "**Yes**", "**Yes**", "**Yes**"],
  ], { size: 14, highlightLast: true }));
  add(H2("9.1 Search log (4–5 October 2026)"));
  add(T([2.1, 2.3, 2.6], ["Where", "Query", "Result"], [
    ["Web index incl. NIME, ISMIR, IEEE, ACM, arXiv", "tabla + haptic / vibrotactile / wearable teaching", "No system that teaches a master's style back through touch. Closest: Layika (2026), HotMobile 2026 mridangam tutor poster, electronic tablas"],
    ["Web index", "tabla gharana recognition; microtiming tabla", "Gharana recognition (ISMIR 2021); Hindustani tempo/accent corpus study; expressive timing in vocals"],
    ["Google Patents (via web search)", "tabla learning device + vibration feedback", "No tabla-specific patent found; generic wearable motion-teaching patents exist"],
    ["Hugging Face Hub", "tabla datasets", "None (only unrelated results); public tabla data sits on Zenodo"],
    ["Web index", "pottery / puppetry / dance haptic teaching", "Pottery gesture capture; shadow-play teaching patent (China); Bharatanatyam haptics performance"],
  ], { size: 16 }));
  add(P("**Limit:** this is not a professional patent search. Before submission, search InPASS (Indian Patent Office), Google Patents and IEEE Xplore directly and record the date. [To validate]"));
  add(Box("Defensible novelty statement", ["*\"To our knowledge, PARAMPARA is the first system that measures a specific tabla master's rhythmic fingerprint on the instrument, teaches it back through a multisensory curriculum in which touch carries structure and hearing carries micro-timing, schedules cues around movement-related tactile suppression, gates progress on unaided probes, and binds the data to the master's consent and lineage. Each component builds on cited work.\"*"], COLOR.blue, "EEF3F8"));
  add(H3("Words to avoid"));
  add(BL(["'World's first' (say 'to our knowledge')", "'Transmits the guru's soul or feel' (say 'measures and teaches timing, accents, strokes and hand')", "'Replaces the guru'", "'Blockchain'", "'AI generates gharana style' (we never blend or generate)"]));

  // ---------------------------------------------------------------- 10
  add(H1("10. Evidence plan: four decisive experiments, then trials"));
  add(P("Version 1 had only borrowed evidence. Version 2 adds four short experiments that retire the two killer risks (is style measurable? can a cue be felt while playing?) within the 4-week build, before any learning trial. All are minimal-risk perception tasks; they still need written consent and the institute's ethics process."));
  add(T([0.45, 1.5, 2.3, 0.8, 1.5, 1.5], ["#", "Aim", "Design", "n", "Success [Target]", "If it fails"], [
    ["E1", "Style is measurable", "3 players × ≥ 20 Teentaal cycles at 80/min (+10 at 60 and 100); features per Section 4.2; nearest-centroid LOO; 1,000 permutations", "3 players", "Accuracy ≥ 0.70 (chance 0.33), p < 0.01", "Drop the style claim; keep Tiers 1–2 and the archive"],
    ["E2", "Cues are felt while playing", "1-up/2-down staircase threshold at rest vs while playing; wrist vs forearm; on-beat vs anticipatory", "8", "Threshold rise ≤ 2× in at least one condition", "Move to upper arm; raise intensity; two-level code"],
    ["E3", "Masters can be told apart", "ABX: A and B are two masters' envelopes of the same theka; 20 trials touch-only, 20 trials touch + sound", "10", "≥ 15/20 correct (binomial p = 0.021); group mean > 50%", "Style taught by ear only; touch stays structural"],
    ["E4", "Codes decoded while playing", "40 trials: 5 families × 2–3 strength levels during a theka", "8–10", "≥ 90% families; ≥ 80% levels", "Fewer codes; two strength levels"],
  ], { size: 15 }));
  add(H2("10.1 Stage A: within-subject crossover pilot (if time allows before the finale)"));
  add(BL([
    "12–15 adults without tabla training learn two matched 8-stroke phrases, one with PARAMPARA (Tiers 1–2) and one with guru audio + hand video; order counterbalanced.",
    "Primary outcome: 24-hour unaided timing spread. Power: dz ≈ 1.0 needs about 10 people, dz ≈ 0.8 about 15 [@cohen1988]. Report dz with a bootstrap 95% CI; with fewer people, call it a pilot.",
    "Questionnaires: SUS [@brooke1996], NASA-TLX [@hart1988], comfort.",
  ]));
  add(H2("10.2 Stage B: four-arm randomised trial (after SIH)"));
  add(T([1.8, 4], ["Arm", "What participants get"], [
    ["1. Video only", "Recorded guru phrase with audio"],
    ["2. Video + metronome", "Same, plus an audio metronome (the obvious cheap competitor)"],
    ["3. PARAMPARA, fixed fade", "Multisensory curriculum with a fixed linear fade"],
    ["4. PARAMPARA, Fade Engine 2.1", "Multisensory curriculum with probe-gated fading"],
  ], { boldFirstCol: true }));
  add(P("About 29 per arm for d ≈ 0.75 (two-sided α = 0.05, 80% power), about 120 in total [@cohen1988]. Three 30-minute sessions over a week; unaided tests before, after and at 1 week, plus tempo transfer. Mixed model (group × time); planned contrasts 3 vs 2 (beats a metronome?), 4 vs 3 (does adaptivity help?), 3 vs 1. Pre-registered on OSF."));
  add(H2("10.3 Stage C: guru and student interviews"));
  add(P("3–5 gurus and 5–10 students, with consent: how readiness is judged; what is corrected most; what 'laya sense' means; what video loses; terms for recording for unseen students; control after their lifetime; cross-gharana teaching; what would make them distrust the device; what it must never claim. Themes reported; quotes only with permission. [To validate]"));
  add(P("**If any result is negative, we report it.** The archive, fingerprint and measurement value remain, and the design changes. [Plausible]"));

  // ---------------------------------------------------------------- 11
  add(H1("11. Feasibility"));
  add(H2("11.1 Technical maturity"));
  add(T([1.4, 2.6, 1.6, 0.9], ["Subsystem", "Proof that it works", "Key number", "TRL now → finale"], [
    ["Onset detection", "Standard drum-trigger practice; onset methods [@bello2005]", "0.25 ms resolution at 4 kHz", "4 → 5"],
    ["Fingerprint features + classifier", "Gharana and performer recognition literature [@gowriprasad2021; @stamatatos2005]; our pipeline (self-tested)", "≥ 20 cycles per player (Figure 1)", "3 → 4"],
    ["Stroke family on device", "Four-way tabla CNN [@rohit2021; @rohit2023]; TinyML on ESP32-S3 [@tflm]", "≈ 26,600 training strokes", "3 → 4"],
    ["Wireless timing", "ESP-NOW round trip about 2.4 ms [@espnow]; regression skew compensation [@ftsp2004]", "Sync target ≤ 1 ms", "4 → 5"],
    ["Haptic drive", "DRV2605L closed-loop LRA drive [@drv2605l]", "4 drivers, 2 I²C buses", "5 → 6"],
    ["Cue perception during play", "Wrist cues during drumming [@holland2010]; suppression timing [@williams1998]", "E2", "3 → 4"],
    ["Passkey signing", "WebAuthn Level 3 Recommendation [@webauthn3]; COSE [@rfc9052]", "Fingerprint on the guru's phone", "6"],
    ["App", "Web Bluetooth in Chrome and Edge [@webbt]", "Demo on a Chrome laptop", "5"],
    ["Open-source haptic platforms", "VHP 12-channel board [@vhp]; ARIADNE [@ariadne]", "Reference designs exist", "—"],
    ["Fade controller", "Two simulations (Section 7)", "Stable; small gain under realistic conditions", "3 → 4"],
  ], { size: 15 }));
  add(H2("11.2 Timing budget"));
  add(T([3, 1.5], ["Live Mirror stage (targets)", "ms"], [
    ["Piezo sampling and threshold", "≈ 0.25"], ["Peak window", "3–4"], ["ESP-NOW transfer", "2–6"], ["Cuff processing", "≈ 1"],
    ["DRV2605L + LRA rise to perceptible vibration", "10–30"], ["**Total**", "**≈ 20–45 (target ≤ 50)**"],
  ], { highlightLast: true }));
  add(P("Learn mode does not depend on radio latency: cues fire from cuff timers on a synchronised timeline. Target cue jitter ≤ 3 ms SD, measured with the accelerometer rig. On-device stroke classification runs after each onset and never delays cues. [Target]"));
  add(H2("11.3 Four-week build plan (with the experiments)"));
  add(T([0.6, 3, 2.2], ["Week", "Build", "Evidence produced"], [
    ["1", "Piezo bench, onset detection, logging; accelerometer rig", "T1, T2; E2 rig ready"],
    ["2", "Cuffs (DRV2605L, 2 I²C buses), ESP-NOW sync with skew compensation, movement-aware scheduler", "T5–T8; **E2** and **E4** run"],
    ["3", "Record 3 players; fingerprint analysis; app (tiers, scoring, Fade Engine 2.1, passkey signing, verify)", "**E1** result"],
    ["4", "Kiosk mode; **E3**; mini-pilot (n = 5–8); deck; backup video", "E3 result; pilot interval estimate"],
  ]));
  add(P("**36-hour hackathon:** hours 0–6 integrate and calibrate; 6–18 Learn mode, fade curve, fingerprint view; 18–26 kiosk and verify; 26–32 rehearse, backup video, top-3 bug fixes; 32–36 checks and sleep. Feature freeze at hour 26."));
  add(H2("11.4 Acceptance tests (targets)"));
  add(T([0.4, 1.6, 2.6, 1.6], ["#", "Test", "Method", "Target"], [
    ["T1", "Onset accuracy", "200 strokes per drum vs 240 fps video + clap sync", "F ≥ 0.95 within ±10 ms"],
    ["T2", "False triggers", "5 min of bumps and room noise", "≤ 1%"],
    ["T3", "Hand attribution", "Alternate and simultaneous strokes", "≥ 95%"],
    ["T5", "Cue jitter", "Accelerometer, 200 cues", "SD ≤ 3 ms"],
    ["T7", "Live Mirror latency", "Strike to vibration onset", "≤ 50 ms"],
    ["T8", "Clock sync", "Shared GPIO pulse", "≤ 1 ms"],
    ["T9", "Code recognition while playing (E4)", "40 trials", "≥ 90% families"],
    ["T10", "Battery", "Continuous Learn mode", "≥ 3 h"],
    ["T12", "Tamper test", "Flip each byte in turn", "100% rejected"],
    ["T13", "Fade controller", "Simulations", "Stable; ≤ 1 reversal / 10 cycles"],
    ["T14", "Comfort and heat", "1 h wear", "No warming or discomfort"],
    ["T15", "Stroke classifier on device", "Public four-way test set", "Within 5 points of the published desktop model [Target]"],
  ], { size: 15 }));
  add(H2("11.5 Top risks"));
  add(T([1.8, 0.8, 0.8, 2.2, 1.6], ["Risk", "Likelihood", "Impact", "Mitigation", "Fallback"], [
    ["No consenting master for E1", "Medium", "High", "Start outreach now: music colleges, ZCC gurus, local teachers", "Three senior students of different teachers; say so"],
    ["Fingerprint too small (E1)", "Medium", "High", "Record 30 cycles; add arm kinematics", "Tiers 1–2 only; archive value"],
    ["Cues masked while playing (E2)", "Medium", "High", "Anticipatory timing; intensity; site choice", "Forearm/upper arm; two-level code"],
    ["Piezo cross-talk", "Medium", "High", "Foam isolation; dominance rule; tuned window", "Practice pad with separated zones"],
    ["2.4 GHz congestion at venue", "High", "Medium", "Schedule held on cuffs; short sync bursts", "USB wired path; backup video"],
    ["Time overrun", "High", "High", "Feature freeze; MoSCoW", "Cut Live Mirror and Branch"],
  ], { size: 15 }));
  add(Box("Feasibility verdict", ["**Feasible in 4 weeks for a 6-person team**, with the two killer risks tested by E1 and E2 in weeks 2–3, before the team depends on them. Every part is off the shelf; the analysis code already exists."], COLOR.green, "EEF6EF"));

  // ---------------------------------------------------------------- 12
  add(H1("12. Viability"));
  add(H2("12.1 Cost"));
  add(T([2.4, 1.6, 2.4], ["Item", "Cost", "Note"], [
    ["Prototype system (dev boards)", "≈ ₹6,000–7,500", "Section 5.10"],
    ["Production system, ~1,000 units", "≈ ₹3,000–5,600", "LCSC reference prices + estimates [@lcsc] [Target]"],
    ["Practice pad (two piezo zones)", "≈ ₹300–500", "Estimate; no tabla needed to start [Target]"],
    ["Comparison: commercial electronic tabla", "£500–1,458", "Tabla Touch [@tablatouch]"],
    ["Comparison: one month of a guru's state honorarium", "₹7,500", "Guru-Shishya Parampara [@gsp]"],
  ]));
  add(H2("12.2 Honest market sizing (bottom-up)"));
  add(BL([
    "**Beachhead = institutions, not households.** Seven Zonal Cultural Centres run Guru-Shishya Parampara [@gsp]; SNA runs the ICH scheme [@snaich]; schools offer CBSE subject 036 [@cbse036]; Kala Utsav runs a percussive category in 36 States/UTs [@kalautsav]; NCAA partners with institutions to archive [@ncaa].",
    "**Learners:** more than one lakh ABGMVM examinees a year across all disciplines [@abgmvm]; the tabla share is unpublished, so we do not multiply it out.",
    "**Willingness to pay for haptic rhythm exists but is niche:** Soundbrenner reported about US$1.5 million a year [@soundbrenner]. PARAMPARA's revenue therefore rests on institutions and grants, not mass consumer sales.",
    "**Supply is mature:** haptic technology is a US$3.8–4.3 billion market (2024 estimates) [@hapmarket].",
  ]));
  add(H2("12.3 Institutional channels"));
  add(T([1.7, 2.3, 2.6], ["Channel", "What exists", "How PARAMPARA plugs in"], [
    ["Guru-Shishya Parampara (7 ZCCs)", "Year-long honoraria for gurus and shishyas [@gsp]", "Kit per sanctioned guru; signed fingerprints as documented output"],
    ["NCAA / IGNCA", "Trusted digital repository (ISO 16363) for audiovisual heritage [@ncaa]", "Fingerprints as a new consented data type next to audio/video"],
    ["SNA ICH scheme", "Funding + National ICH Inventory [@snaich]", "Verifiable inventory records"],
    ["CBSE 036 / Kala Utsav", "School percussion curriculum and competition [@cbse036; @kalautsav]", "School kits; kiosk at Kala Utsav"],
    ["AICTE IKS; NEP 2020; UGC", "IKS division [@iks]; local artists as master instructors; bagless days [@nep2020; @nep426]; artists-in-residence [@ugc2025]", "IKS lab kits; guru recordings for schools; resident gurus record for campus libraries"],
    ["PM Vishwakarma; KVIC", "30 lakh artisans; guru–shishya training; 18,000+ electric wheels [@pmv; @ksy]", "Crafts versions (Section 14)"],
  ], { size: 15 }));
  add(H2("12.4 Business models [To validate]"));
  add(T([1.6, 2.4, 2.4], ["Model", "Who pays", "Notes"], [
    ["Institution licence", "Academies, schools, ZCCs", "Hardware near cost; annual software and library licence"],
    ["Guru-shared library", "Students subscribe", "Revenue share to consenting gurus, recorded in the envelope"],
    ["Showcase kiosks", "Museums, festivals, archives", "Rental or sale; content licensed from gurus"],
    ["Open reference design + grants", "Cultural programmes, CSR", "Adoption first; grants fund maintenance"],
  ]));
  add(H2("12.5 Legal, ethical and environmental viability"));
  add(BL([
    "**Privacy:** DPDP Act 2023 and Rules (13 November 2025; phased over 12–18 months) [@dpdp]; data minimisation; passkeys keep biometrics on the guru's phone.",
    "**Rights:** performers' rights under the Copyright Act [@copyright1957]; legal advice before commercial launch.",
    "**Heritage ethics:** UNESCO principles [@unesco2015; @unesco2003]; CARE [@care2020].",
    "**Environment:** rechargeable cells, repairable modules, no consumables. SDG 4.7, 8.3 and 11.4.",
  ]));

  // ---------------------------------------------------------------- 13
  add(H1("13. Impact"));
  add(H2("13.1 Theory of change"));
  add(T([1.2, 1.3, 1.3, 1.4, 1.5], ["Inputs", "Activities", "Outputs", "Outcomes", "Long-term impact"], [
    ["Kits; consenting gurus; app", "Record fingerprints; tiered practice with fading; probes", "Signed fingerprints; learning curves; retention scores", "Students keep timing and accents without the device; gurus reach more learners", "Living styles transmitted beyond one room and one lifetime"],
    ["Archive and school partners", "NCAA deposits; school kits; kiosks", "A consented corpus of masters' playing data", "Research on style; public engagement", "A national, verifiable archive of embodied skill"],
  ], { size: 15 }));
  add(H2("13.2 Who benefits and how we measure it"));
  add(T([1.3, 2.6, 2.4], ["Group", "Benefit (hypothesis)", "Measure"], [
    ["Gurus", "Style preserved and credited on their terms", "Gurus recorded; consent and satisfaction"],
    ["Students", "A master's timing and accents where no teacher is near; honest feedback", "Retention, practice hours, cost per learner"],
    ["Archives", "A new data type: how masters play, not only how they sound", "Fingerprints deposited and verified"],
    ["Researchers", "First consented dataset pairing masters' fingerprints with learners' trajectories", "Dataset releases; papers"],
    ["Public", "Heritage as a felt, measurable experience at kiosks", "Visitors; discrimination-game scores"],
  ], { size: 15 }));
  add(H2("13.3 Accessibility: a hypothesis, not a claim"));
  add(P("India counts about 50.7 lakh people with hearing disability [@census2011]. Deaf and hearing participants synchronise to vibrotactile beats [@tranchant2017], and vibrotactile drumming guidance was proposed for learners for whom visual demonstration fails [@leechoi]. The kiosk and Tier 1 could open rhythm learning to these groups. Untested; needs its own study. [To validate]"));
  add(H2("13.4 KPIs for the first 12 months [Target]"));
  add(T([2.6, 1.4, 2.4], ["KPI", "Target", "How measured"], [
    ["Masters recorded with signed consent", "10 across 3 gharanas", "Registry"],
    ["Fingerprint identification (E1 extended)", "≥ 0.70 accuracy, 10 masters", "Analysis pipeline"],
    ["Students completing a 2-week programme", "100", "App logs"],
    ["Retention vs video-only (paired)", "dz ≥ 0.5 with 95% CI", "Stage A/B"],
    ["Kiosk visitors", "2,000 at 2 events", "Kiosk logs"],
    ["Institutions piloting", "3 (school, academy, ZCC or archive)", "MoUs"],
  ]));

  // ---------------------------------------------------------------- 14
  add(H1("14. Where else PARAMPARA works: tabla, pottery, puppetry, dance and more"));
  add(P("The stack is not tabla-specific: sensors, the unit of skill and the code table change; the fingerprint, multisensory teaching, fading and consent layers stay. Expansion is **gated**: a second tradition starts only after tabla E1–E4 pass."));
  add(T([1.25, 1.2, 1.25, 1.05, 1.95, 1.15, 0.95], ["Tradition", "Tacit skill", "Sensors", "Haptic cue", "Evidence it can be captured or taught", "Channel", "Effort"], [
    ["Pakhawaj, dholak, mridangam", "Stroke timing, accents", "Piezo sites", "Same code", "Tabla methods transfer [@rohit2021]; mridangam tutoring work [@hotmobile2026]", "GSP, SNA", "Low"],
    ["Kathak footwork (tatkar)", "Heel/toe timing, layakari", "Ankle IMU, piezo insole or floor", "Ankle cuffs", "Ankle cues guided drum-kit feet [@holland2010]; dance with vibrotactile feedback [@drobny2010]", "GSP, schools", "Medium"],
    ["Bharatanatyam adavus", "Footwork with sollukattu", "IMU, camera", "Timing by touch", "Adavu recognition [@mallick]; haptics performance [@srinivasan2023]", "GSP", "Med–High"],
    ["Wheel-throwing pottery", "Pressure, centring, pull rhythm", "Thin-film force pads, wrist IMU, wheel speed", "Pressure and rhythm cues", "Expert gestures captured [@manitsaris2014]; i-Treasures pottery [@itreasures]; PotteryGo [@potterygo]", "PM Vishwakarma, KVIC, bagless days [@pmv; @ksy; @nep426]", "Medium"],
    ["String puppetry (Kathputli)", "Pull timing that gives life", "IMU on control bar, string tension", "Wrist pulses", "Human motion mapped to a marionette [@yamane2004]; novice-usable interface [@marionette2025]", "ZCCs, SNA", "Med–High"],
    ["Shadow puppetry (Tholu Bommalata)", "Rod manipulation with narration", "Rod IMU", "Wrist cues", "Shadow-play teaching patent (China) [@shadowpatent]", "ZCCs", "Medium"],
    ["Handloom weaving", "Beat-up rhythm, treadle sequence", "IMU on beater, treadle switches", "Rhythm cues", "64.66 lakh artisans [@handicrafts]", "Handloom schemes", "Medium"],
    ["Tala-keeping for vocalists", "Kriya and tala cycle", "Finger pads, mic", "Tala pulses", "Layika [@layika2026]", "Music schools", "Low"],
  ], { size: 14 }));
  add(H2("14.1 Pottery on the chak"));
  add(P("KVIC has distributed more than 18,000 electric wheels [@ksy]; PM Vishwakarma trains potters in guru–shishya mode [@pmv]; NEP 2020 sends Grade 6–8 students to intern with potters [@nep426]; clusters such as Khurja have declined [@khurja]. Expert wheel-throwing gestures have already been captured with inertial sensors and hidden Markov models [@manitsaris2014]. **PARAMPARA version:** force sensing on the rib tool (hands stay bare), wrist IMU and wheel speed; the fingerprint is a pressure and height profile over time; cues encode 'press more or less' and pull rhythm. Risks: water, clay masking touch at the hands (cues go to the forearm). Phase 4."));
  add(H2("14.2 Puppetry"));
  add(P("Kathputli is performed by the Nat Bhatt community of Nagaur, Churu and Sikar; competition from cinema and television has shortened shows and pushed puppeteers toward souvenirs [@kathputli]. Human motion has been mapped onto string marionettes [@yamane2004]. **PARAMPARA version:** an IMU on the master's control bar records pull timing and amplitude; students feel wrist pulses on each pull while hearing the music and dialogue. Phase 4."));
  add(H2("14.3 Kathak footwork: the next tradition"));
  add(P("Tatkar is percussion with the feet, so the tabla pipeline transfers almost one-to-one: piezo insole or floor plate for onsets, ankle IMU for heel versus toe, ankle cuffs instead of wrist cuffs. Ankle vibration has already guided drum-kit footwork [@holland2010]."));
  add(T([1.8, 1, 1, 1, 1, 0.8], ["Tradition", "Heritage value", "Sensing ease", "Haptic fit", "Channel", "Total /20"], [
    ["Pakhawaj / mridangam", "4", "5", "5", "4", "18"], ["Kathak footwork", "5", "4", "4", "4", "17"],
    ["Wheel-throwing pottery", "4", "3", "3", "5", "15"], ["Kathputli", "5", "3", "3", "3", "14"],
    ["Handloom weaving", "4", "3", "3", "4", "14"], ["Bharatanatyam", "5", "2", "2", "4", "13"],
  ], { boldFirstCol: true }));

  // ---------------------------------------------------------------- 15
  add(H1("15. How PARAMPARA will fascinate the jury"));
  add(H2("15.1 Rubric mapping"));
  add(P("Institute reports list novelty, complexity, clarity, methodology, feasibility, practicality, sustainability, scale of impact, user experience and future potential; one internal rubric weights them as below [@sihrubric]. Confirm with your SPOC."));
  add(T([1.5, 0.75, 2.15, 2.15, 1.55], ["Criterion", "Weight", "What judges look for", "Our proof", "Moment in the pitch"], [
    ["Feasibility", "20%", "Will it work, by when?", "TRL table; E1–E4 results; analysis code; 4-week plan", "Working cuffs + E2/E4 charts"],
    ["Impact", "20%", "Who benefits, measurably?", "Archive gap; school and ZCC channels; KPIs; kiosk; crafts roadmap", "NCAA slide + kiosk photo"],
    ["Novelty", "15%", "What is new?", "Fingerprint + perception-driven curriculum + consent; matrix; search log", "Matrix with one fully ticked row"],
    ["Complexity", "15%", "Real engineering depth?", "Custom PCB; on-device classifier; skew-compensated sync; movement-aware scheduler; simulations", "Cue timeline figure; live fade curve"],
    ["Sustainability", "15%", "Will it last and grow?", "Bottom-up channels; volume BOM; open design; gated expansion", "Roadmap slide"],
    ["User experience", "10%", "Pleasant and usable?", "Fingerprint signing; one-button recording; kiosk game", "The judge wears it"],
  ], { size: 15 }));
  add(H2("15.2 Five moments a jury remembers"));
  add(NL([
    "**'Which master is this?'** The judge feels and hears two masters' theka and guesses. Then the fingerprint plot shows why they differ. This is heritage as measurable science.",
    "**'You are the student.'** The judge wears the cuff and plays along on the practice pad; the score appears.",
    "**'Now the device steps back.'** The fade curve drops, then a probe cycle runs with no cues: 'We measure learning with the device off.'",
    "**'The guru signs with a fingerprint.'** One touch on a phone signs the recording; a tampered copy fails.",
    "**'Here is what our own red team found, and what we changed.'** Show the v1 → v2 table. Judges rarely see this honesty.",
  ]));
  add(H2("15.3 Three-minute demo script"));
  add(T([0.9, 4.8], ["Time", "What happens"], [
    ["0:00–0:20", "Hook: 'Every master plays the same theka differently. Archives keep their sound; nothing keeps their hands.' One line on Zakir Hussain."],
    ["0:20–1:00", "Fingerprint: two masters' plots on screen; the judge feels and hears both and guesses (the kiosk game)."],
    ["1:00–1:50", "Learn: judge wears the cuff, plays along; Tier 1 cues; live score; fade curve drops; probe at g = 0."],
    ["1:50–2:20", "Trust: guru signs with a phone fingerprint; tamper test fails; consent card shown."],
    ["2:20–3:00", "Evidence: E1–E4 results, simulation, roadmap (Kathak next, then crafts), and a guru's quote (with consent)."],
  ], { boldFirstCol: true }));
  add(H2("15.4 Hard questions and short answers"));
  add(T([2.2, 4.2], ["Question", "Answer"], [
    ["Isn't this a metronome?", "A metronome gives one grid. We give this master's accents, strokes and hands, and in Tier 3 their micro-timing. E1 shows masters really differ [@gowriprasad2021; @srinivasamurthy2017]."],
    ["Can touch carry 10 ms timing?", "No. Touch resolves 10–30 ms at best [@lauzon2020]; hearing about 10 ms [@friberg1995]. So touch carries structure and the ear carries micro-timing."],
    ["Doesn't playing mask the vibration?", "It can: sensitivity drops 25–45 ms before movement [@williams1998]. Our cues end before the lift and are strong; E2 measures it."],
    ["Why sign anything?", "So the guru controls use and gets credit, following CARE and UNESCO principles [@care2020; @unesco2015]. It costs one fingerprint touch."],
    ["Won't students depend on the cuff?", "Probes measure unaided skill and fading withdraws cues [@winstein1990]; mastery needs the guru's approval."],
    ["Does adaptive fading help?", "Under realistic conditions our simulation shows a small, consistent gain; we test it against a fixed fade in the trial (Section 7)."],
    ["Is this new?", "Closest work is cited (Section 9). None measures a master's fingerprint and teaches it back with fading and consent."],
    ["Does it replace the guru?", "No. The guru records, approves readiness and can revoke."],
    ["Cost and scale?", "≈ ₹3,000–5,600 per system at volume; institutions first (ZCCs, schools, archives)."],
    ["What if E1 fails?", "We drop the style claim and keep structure, laya and the archive. We report it."],
  ], { size: 15 }));
  add(H2("15.5 Mapping to the SIH idea deck"));
  add(T([1.5, 4.5], ["Slide", "Content"], [
    ["Title", "PARAMPARA 2.0: Feel the Guru's Hand; PS 26214"],
    ["Idea", "Pitch; Measure-Teach-Fade-Protect; innovation sentence"],
    ["Technical approach", "Architecture; fingerprint; three tiers; cue timeline; Fade Engine 2.1; passkey signing; PCB"],
    ["Feasibility & viability", "TRL; E1–E4; build plan; risks; volume BOM; channels"],
    ["Impact & benefits", "Theory of change; NCAA gap; kiosk; KPIs; traditions map"],
    ["Research & references", "Evidence tables; prior-art matrix; 6–8 V-status references"],
  ], { boldFirstCol: true }));

  // ---------------------------------------------------------------- 16
  add(H1("16. Limitations and honest risks"));
  add(NL([
    "**Style may be small.** If E1 finds tiny differences between masters, the style claim goes; Tiers 1–2 and the archive remain.",
    "**Touch has limits.** About four wrist sites, two (maybe three) strength levels, slow-to-medium laya only.",
    "**Masking is real.** Cue timing and intensity mitigate it; E2 decides.",
    "**Proxy measures.** Piezo amplitude is a relative force proxy; ringing vs damped may need the microphone.",
    "**Simulations are assumption-bound.** The adaptive advantage is small and model-dependent.",
    "**Evidence is short-term.** Pilots are small; long-term retention is unknown.",
    "**Enforcement.** Revocation has an offline window; copying cannot be prevented; licences are contractual.",
    "**Cultural acceptance.** Some gurus will refuse recording or device-mediated teaching; their view decides.",
    "**Style imitation.** A fingerprint is not audio and cannot generate a performance, but it could help imitation; consent terms say what is allowed.",
    "**No public tabla data was analysed by us** (download blocked in our environment); E1 provides the first numbers.",
  ]));

  // ---------------------------------------------------------------- 17
  add(H1("17. Roadmap"));
  add(T([1.4, 3, 2], ["Phase", "Scope", "Exit criterion"], [
    ["1. SIH MVP (4 weeks)", "Capture, fingerprint view, Tiers 1–2, movement-aware cues, Fade Engine 2.1, passkey signing, kiosk mode, E1–E4", "E1 and E2 pass; demo runs 3× unaided"],
    ["2. Product (3–6 months)", "Custom PCB cuff; on-device classifier; Tier 3 style mirror; more taals; Stage B trial", "Trial launched; 10 masters recorded"],
    ["3. Archive and trust (6–12 months)", "NCAA pilot deposit; institutional countersignature (W3C VC [@w3cvc]); TK labels; royalty ledger", "One institution issuing countersignatures"],
    ["4. Platform (12+ months)", "Kathak footwork, pakhawaj/mridangam, then pottery and puppetry; accessibility study", "Two traditions live"],
  ], { size: 16 }));

  // ---------------------------------------------------------------- 18
  add(H1("18. Pre-submission checklist"));
  add(BL([
    "**Run E1–E4** and put the real numbers on the slides (replace every [Target]).",
    "Secure at least one consenting guru or senior teacher, plus a support letter from a music college, ZCC or gurukul.",
    "Open every reference used on a slide; use V-status ones or re-check P and S entries.",
    "Formal patent and literature search (InPASS, Google Patents, IEEE Xplore); record the date.",
    "Written consent from every player for recordings, fingerprints, kiosk use and quotes; institute ethics process.",
    "Bench-test T1–T15 and keep the logs.",
    "Replace ₹ estimates with real quotes.",
    "Re-run the simulations after any change to fade constants.",
    "Rehearse the 3-minute demo three times; record a backup video.",
    "Confirm the official SIH rubric and deck template with the SPOC.",
  ]));

  // ---------------------------------------------------------------- 19
  add(H1("19. Source merge decisions and reference audit (from v1)"));
  add(H2("19.1 What the two original documents disagreed on"));
  add(T([1.2, 1.8, 1.8, 3.2], ["Topic", "Executive Summary PDF", "Engineering dossier", "Final decision"], [
    ["Guru capture", "Glove (flex, FSR) + wrist IMU + piezo", "Piezo + wrist IMU (+ mic); no glove", "No glove: it changes the guru's touch; strokes are recoverable from audio/piezo [@rohit2023]"],
    ["Actuators", "Coin ERM, 2–3 on one band", "LRA + DRV2605L, 2 per cuff", "LRA; ERM as budget fallback [@bolanowski1988; @drv2605l]"],
    ["Skin sites", "2–3 on one arm", "4 (dorsal/palmar × L/R)", "4 sites [@chen2008]"],
    ["Envelope", "JSON + SHA-256 + Ed25519/ECDSA", "Deterministic CBOR + Ed25519", "COSE over deterministic CBOR; passkey signing in v2 [@rfc9052; @webauthn3]"],
    ["Scoring", "Weighted Euclidean, 90% pass", "Bias-corrected exponential", "Bias-corrected + tier-adaptive + style similarity [@repp2005]"],
    ["Evaluation", "3 groups, n = 30–45", "Crossover, n = 12–15", "E1–E4 → crossover pilot → 4-arm trial"],
    ["Claim", "'Kinesthetic feel of the guru'", "Timing, hand, family, strength", "Measured fingerprint; touch for structure, ear for micro-timing"],
    ["Lineage", "'Gharana kabhi merge nahi hota'", "Lineages interacted; no automatic blending", "No blending without every guru's consent [@gharanas]"],
  ], { size: 15 }));
  add(H2("19.2 Reference audit"));
  add(T([0.3, 2.6, 2.6, 2], ["#", "Claim as written in the sources", "What we found", "Action"], [
    ["1", "Grindlay: haptic + audio cut errors ~17–18%", "Correct: −17% velocity error, −18% early timing error", "Keep [@grindlay2008]"],
    ["2", "'Grindlay (2008), ACM Multimedia, pp. 481–484'", "Venue does not match; 2008 haptics symposium paper + 2007 MIT thesis", "Corrected [@grindlay2007]"],
    ["3", "'Masur & Sacks, IEEE Robotics (2025)'", "**No such paper**; closest is Zahedi et al. 2017, IEEE RA-L", "Removed [@zahedi2017]"],
    ["4", "'Flandorfer et al., Sensors 22(4):1564 (2022)'", "**Not found**", "Removed; use [@sigrist2013]"],
    ["5", "MusicJacket 'CHI 2010 WIP', 'IEEE TIM 2009'", "CHI 2010 EA exists; IEEE TIM is 2011, 60(1)", "Corrected [@johnson2010; @vanderlinden2011]"],
    ["6", "SparkFun buying guide for IMU specs", "Vendor page, not research", "Replaced by datasheets"],
    ["7", "Kapur et al., 'JNMR 32(4)'", "Verified: NIME 2002, pp. 108–112", "Cite NIME [@kapur2002]"],
    ["8", "Chat-tool markers such as 【35†L1-L4】", "Not references; claims untraceable", "Removed"],
    ["9", "Huang & Starner 'passive learning'", "Two works: PianoTouch 2008, Mobile Music Touch 2010", "Cited separately [@huang2008; @huang2010; @seim2015]"],
  ], { size: 15 }));

  // ---------------------------------------------------------------- Appendices
  out.push("__APPENDIX__");
  add(H1("Appendix A. Parameter sheet (starting values)", true));
  add(T([2.4, 2, 1.2], ["Parameter", "Value", "Section"], [
    ["Piezo sampling", "≥ 4 kHz", "5.10"], ["Onset threshold k; refractory; cross-talk window", "6–8; 40 ms; 10 ms", "5.10"],
    ["σ_t by tier", "35 / 20 / 12 ms", "5.3"], ["σ_A; score weights", "4 dB; 0.5 / 0.25 / 0.25", "5.6"],
    ["Cue intensity", "≥ 3× resting threshold", "5.4"], ["Cue end before lift", "45 ms + margin (≈ 60 ms)", "5.4"],
    ["Probes", "Session start + 1 per 4 guided cycles", "5.7"], ["Skill smoothing α; mastery", "0.5; 0.85", "5.7"],
    ["Max change in g; assist trigger", "0.2; 2 cycles < 0.5", "5.7"], ["Mode switch to error-only cues", "ŝ ≥ 0.7", "5.7"],
    ["Fingerprint recording", "≥ 20 cycles per master at 80/min", "4.3"], ["Supported laya (MVP)", "Inter-stroke interval ≥ 400 ms", "5.5"],
  ], { size: 16 }));
  add(H1("Appendix B. Pseudo-code"));
  add(H3("Movement-aware cue scheduling (per stroke i)"));
  add(Code([
    "t_prep   = median lift-to-strike time of this student (wrist IMU, last 20 strokes)",
    "d_tacton = duration_for(family_i)          # 30–80 ms",
    "c_i      = E_i - t_prep - 45 - margin - d_tacton - latency_actuator[site]",
    "level    = max(3 * threshold[site], accent_to_level(acc_guru_i))",
    "schedule(timer_at = c_i, site = site_for(hand_i, family_i), level, d_tacton)",
  ]));
  add(H3("Fade Engine 2.1"));
  add(Code([
    "at session start:        S = probe();  update(S)",
    "every 4 guided cycles:   S = probe();  update(S)",
    "update(S):  s_hat = S if first else 0.5*s_hat + 0.5*S",
    "            g = clip(clip(1 - s_hat/0.85, 0, 1), g - 0.2, g + 0.2);  if g < 0.05: g = 0",
    "            mode = 'error_only' if s_hat >= 0.7 else 'guidance'",
    "after a guided cycle:    if g > 0 and last two scores < 0.5: g = min(1, g + 0.2)",
    "cue stroke i if Bernoulli(g) or |e'_t,i(previous)| > 2*sigma_t",
  ]));
  add(H3("Fingerprint (per cycle)"));
  add(Code([
    "T, t0  = least_squares_fit(onsets ~ matra_index)",
    "d      = onsets - (t0 + T*matra_index)            # micro-timing residuals (ms)",
    "acc    = 20*log10(amp / median(amp))              # accent contour (dB)",
    "x      = concat(d, acc)                          # one vector per cycle",
    "accuracy = leave_one_cycle_out(nearest_centroid, zscore(X), master_labels)",
    "p        = permutation_test(accuracy, 1000)",
  ]));
  add(H1("Appendix C. Glossary"));
  add(T([1.4, 4.6], ["Term", "Meaning"], [
    ["Taal, matra, theka", "Rhythmic cycle; one beat; basic stroke pattern of the taal"],
    ["Sam, khali, tali", "First beat; 'empty' beat; clap beats"],
    ["Laya", "Tempo"], ["Bol", "Spoken syllable naming a stroke"],
    ["Gharana, baaj", "Lineage or school; playing style"],
    ["Talim, riyaz, paltā", "Training; daily practice; structured variation"],
    ["Gharana Fingerprint", "A master's measurable per-matra timing, accent, stroke and movement profile"],
    ["Tacton", "Structured tactile message (rhythm, intensity, location)"],
    ["Tactile suppression", "Reduced touch sensitivity just before and during one's own movement"],
    ["Probe cycle", "A cycle played with no cues to measure unaided skill"],
    ["Passkey", "A FIDO2/WebAuthn credential; the private key stays on the user's device, unlocked by fingerprint or PIN"],
    ["CARE, FAIR", "Principles for Indigenous data governance; for findable, accessible, interoperable, reusable data"],
    ["COSE, CBOR", "CBOR Object Signing and Encryption; Concise Binary Object Representation"],
    ["LRA, ERM", "Linear resonant actuator; eccentric rotating-mass motor"],
    ["TRL", "Technology readiness level (1 = idea, 9 = proven in operation)"],
  ], { size: 16, boldFirstCol: true }));
  return out;
};
