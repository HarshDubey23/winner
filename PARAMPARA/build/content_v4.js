// PARAMPARA final solution document, v4: one sensor sleeve (fingers to shoulder), three crafts,
// a fingerprint proven to belong to the master, and learning measured with the device off.
module.exports = function (L) {
  const { P, H1, H2, H3, BL, NL, T, Box, Code, Fig, COLOR } = L;
  const fig = (n) => require("path").join(__dirname, "..", "figures", n);
  const out = [];
  const add = (...xs) => xs.forEach((x) => (Array.isArray(x) ? out.push(...x) : out.push(x)));
  const BLUE = [COLOR.blue, "EEF3F8", true];
  const GREEN = [COLOR.green, "EEF6EF", true];

  // ---------------------------------------------------------------- contents
  add(H2("Contents"));
  add(T([0.6, 4.4], null, [
    ["1", "The idea on one page"], ["2", "The problem: three crafts, one gap"],
    ["3", "The innovation: a master's Skill Fingerprint, fingers to shoulder"],
    ["4", "How it works: Sense, Fingerprint, Teach, Fade, Measure, Own"],
    ["5", "Validation: answering the hardest question first"], ["6", "What we build for SIH"],
    ["7", "Evidence from published research"], ["8", "Feasibility"], ["9", "Viability: institution-first, craft by craft"],
    ["10", "Impact"], ["11", "The pitch: what the jury will see and hear"], ["12", "Limits we state openly"],
    ["13", "Roadmap after SIH"], ["14", "References"],
    ["A–F", "Execution kit: partner kit for three crafts, E1 protocol, E0 and E2–E5 protocols, demo checklist, simulations, reference check and parameters"],
  ], { size: 18, cantSplit: true }));
  add(P("Citations like [12] point to Section 14. Every reference carries a status: **V** verified by live web search in October 2026, **P** existence verified with some details from memory, **S** a standard textbook or classic paper. Numbers we have not yet measured are marked **[Target]**.", { size: 18, color: COLOR.grey }));

  // ---------------------------------------------------------------- 1
  add(H1("1. The idea on one page", true));
  add(Box("The problem", [
    "In tabla, handloom weaving and string puppetry, a master's skill lives in the hands and arms: which finger moves, how the wrist, elbow and shoulder work together, and the rhythm of it all. It passes on only face to face, over years. India's handloom workforce fell from 43.32 lakh to 35.22 lakh between the last two censuses [@handloomcensus]; Delhi's puppeteer colony was demolished in 2017 [@kathputlicolony]; and archives keep how masters **sound and look** [@ncaa], not how they **move**.",
  ]));
  add(Box("Our one innovation", [
    "**A master's Skill Fingerprint: a measured, consented record of how one master moves (every finger, the wrist, elbow and shoulder) and what their tool does, proven to belong to the master and not to their instrument or the day, and used as a teaching reference.**",
    "One sensor sleeve and one software pipeline serve three crafts. Everything else in PARAMPARA exists to capture, prove, teach or protect that fingerprint.",
  ], ...BLUE));
  add(Fig(fig("v4_pipeline.png"), 600, 209, "Figure 1. Five steps, plus ownership by the master."));
  add(H3("Why three crafts, and why these three"));
  add(T([1.2, 1.9, 2.2, 1.8], ["Craft", "Kind of skill", "What the tool sensor measures", "The 'cycle' we compare"], [
    ["Tabla", "Fast striking rhythm", "A piezo on each drum: stroke time and strength", "One tal cycle (16 beats of Teentaal)"],
    ["Handloom", "Whole-arm coordination and force in a steady rhythm", "Beater motion, treadle switches, a phone photo of the cloth", "One pick: open the shed, throw, beat"],
    ["String puppetry (Kathputli)", "Fine, expressive finger control", "A small motion sensor inside the puppet", "One gesture phrase, e.g. a walk or a bow"],
  ], { size: 16, boldFirstCol: true }));
  add(P("A strike, a coordinated cycle and a fine expressive gesture are three different kinds of hand skill. **If one sleeve and one pipeline work for all three, they can serve most hand crafts.** For SIH, tabla is the lead craft and is validated in full; handloom and puppetry are validated on the two questions that matter most (Section 5)."));
  add(H3("Why not video, or a motion-capture suit?"));
  add(P("Video shows the master but cannot measure the learner or check learning without help. Motion-capture suits measure movement but cost about US$5,000 to over US$12,000 [@teslasuit; @xsens] and are built for animation and VR, not for teaching one master's way. **PARAMPARA measures fingers to shoulder at a fraction of that cost, teaches one master's way, and proves the learner can do it alone.**"));
  add(H3("What the jury will see live"));
  add(NL([
    "**The sleeve.** The judge wears it, plays a tabla phrase or moves a Kathputli puppet, and feels which finger and which joint to move.",
    "**The proof.** Real masters' fingerprints, and the test showing they belong to the master, not to the instrument or the day (Section 5).",
    "**Device off.** Cues fade, the judge performs alone, and the screen shows the unaided score.",
  ]));
  add(Box("Evidence status, stated plainly", [
    "**Done today:** a design grounded in published research (Section 7); open analysis code for the fingerprint, the confound test and the fade rule; the confound test shown on synthetic data to accept a real fingerprint and reject a fake one (Figure 3); protocols, consent forms and pass/fail rules written **before** any data.",
    "**Not yet done:** recordings of real masters, results of E0–E5, signed partner agreements. **We claim none of these until they exist.** Result templates are ready (Appendices B and C), so the finale deck shows the real numbers, whichever way they go.",
  ], ...GREEN));
  add(P("**Our test of success:** *the device succeeds only when the learner no longer needs it.*"));

  // ---------------------------------------------------------------- 2
  add(H1("2. The problem: three crafts, one gap"));
  add(H2("2.1 Skill that cannot be written down"));
  add(P("All three crafts are learned by sitting with a master and imitating for years. Michael Polanyi called this tacit knowledge: 'we know more than we can tell' [@polanyi1966]; turning it into a shareable form is the hardest step in knowledge transfer [@nonaka1995]. Notation records the bols, a draft records the weave pattern, a script records the story. **None records the hands.**"));
  add(H2("2.2 The three crafts today"));
  add(T([1.1, 4.3, 1.1], ["Craft", "Situation", "Source"], [
    ["Tabla", "Taught face to face (*talim*). A school subject (CBSE 036) and a Kala Utsav category in 36 States/UTs. Ustad Zakir Hussain died in December 2024: his recordings stay, his teaching goes.", "[@cbse036; @kalautsav; @zakir]"],
    ["Handloom", "35.22 lakh weavers and allied workers in 2019–20, down from 43.32 lakh. Training runs through 28 Weavers' Service Centres; 56,934 weavers trained under SAMARTH in six years. The national two-treadle qualification is 315 hours of hands-on practice. Handloom weavers report shoulder pain far more often than powerloom weavers (76% vs 42%).", "[@handloomcensus; @wsc; @nsqfhandloom; @siddiqui2021]"],
    ["Puppetry", "Four families of puppetry: string, shadow, rod and glove. In Kathputli the strings are looped on the puppeteer's fingers, with no control bar: the skill is literally in the fingers. Puppeteers face a shrinking audience; Delhi's Kathputli Colony (about 2,800 families of folk artists) was moved to a transit camp in 2017.", "[@puppetforms; @wepakathputli; @kathputli; @kathputlicolony]"],
    ["Policy", "The State pays gurus to teach in person (Guru-Shishya Parampara), runs a scheme for intangible heritage, and counts about 64.66 lakh handloom and handicraft artisans. India has 16 elements on UNESCO's intangible heritage list.", "[@gsp; @snaich; @handicrafts; @deepavali2025]"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("2.3 Why existing tools fall short"));
  add(T([1.6, 2.4, 2.4], ["Tool", "What it does well", "What it cannot do"], [
    ["Video lessons and apps", "Show the master's hands [@apps]", "Measure the learner; check learning without help"],
    ["Training centres and Guru-Shishya Parampara", "The gold standard: a master in the room [@gsp; @wsc]", "Reach beyond one room, one master's time and one lifetime"],
    ["Motion-capture suits", "Measure body movement [@xsens; @teslasuit]", "Teach a specific master's way at an affordable cost; prove unaided learning"],
    ["European craft-capture projects", "Capture and represent craft gestures for museums and education [@mingei; @craeft]", "Teach one master's fingerprint through a wearable that fades out"],
  ], { size: 16 }));

  // ---------------------------------------------------------------- 3
  add(H1("3. The innovation: a master's Skill Fingerprint, fingers to shoulder"));
  add(H2("3.1 What the fingerprint is"));
  add(T([1.3, 3.2, 1.6], ["Layer", "What it captures", "Measured by"], [
    ["Body", "How each finger, the wrist, elbow and shoulder move in each cycle: which joint leads, when, how fast and how far", "9 motion sensors per arm"],
    ["Tool", "What the movement produces: drum stroke time and strength; beater timing and force, cloth density; the puppet's motion", "One tool sensor per craft"],
    ["Rhythm", "Where in the cycle the master is slightly early or late, and how steady", "Body and tool sensors together"],
    ["Consistency", "How much the master varies from cycle to cycle", "Spread over at least 20 cycles"],
  ], { size: 16, boldFirstCol: true }));
  add(P("The fingerprint is the average and spread of these features over at least 20 cycles. **Only features that pass the confound test (Section 5) are used for teaching.**"));
  add(H2("3.2 Why the whole arm, not only the hand"));
  add(T([3.2, 2.2, 0.8], ["Published finding", "Meaning for us", "Source"], [
    ["Expert pianists move shoulder, then elbow, then wrist in a clear sequence; novices do not", "Expertise shows in how the joints are ordered, not only in the fingers", "[@furuya2007]"],
    ["Experts let the arm's own motion do work at the elbow and wrist, so their muscles do less", "Efficient technique is visible in the whole arm", "[@furuya2008]"],
    ["Four drummers played the same accent with individual movement strategies", "Movement carries personal style", "[@dahl2004]"],
    ["Vibration at the joints in error cut real-time error by up to 27% and sped learning up to 23%", "Joint-level touch cues work, but that study needed an optical lab", "[@tikl2007]"],
    ["Kathputli strings are tied to the fingers", "For puppetry, finger sensing is essential", "[@wepakathputli]"],
    ["76% of handloom weavers in a Varanasi survey reported shoulder pain", "Measuring the shoulder also matters for weavers' health", "[@siddiqui2021]"],
  ], { size: 16 }));
  add(H2("3.3 Why we believe a fingerprint exists"));
  add(T([3.2, 2.2, 0.8], ["Published finding", "Meaning for us", "Source"], [
    ["Tabla gharanas recognised automatically from audio of solo performances (38+ hours)", "Style leaves a measurable trace", "[@gowriprasad2021]"],
    ["A large Hindustani corpus shows systematic accent and tempo patterns within the tal cycle", "Accent and timing shapes are measurable", "[@srinivasamurthy2017]"],
    ["Pianists identified from timing and loudness; famous drummers each have a timing fingerprint", "Performers can be told apart", "[@stamatatos2005; @repp1992; @carter2025]"],
  ], { size: 16 }));
  add(P("**None of these studies separated the performer from their instrument and recording session in a craft setting.** That is exactly what our experiment E1 does (Section 5)."));
  add(H2("3.4 What is new"));
  add(T([2.1, 2.2, 2.3], ["Closest existing work", "What it does", "What it does not do"], [
    ["TIKL vibrotactile suit [@tikl2007]", "Joint-level vibration to correct arm poses", "Use a low-cost wearable (it used an optical lab); capture fingers; teach a specific master; fade; test device-off"],
    ["Teslasuit, Xsens suits [@teslasuit; @xsens]", "Body motion capture (and haptics)", "Teach; prove the learner can perform alone; cost suits a school or weaving centre"],
    ["Mingei, CRAEFT [@mingei; @craeft; @zabulis2020]", "Capture and represent craft gestures, simulators, haptics", "A wearable that teaches one master's fingerprint and withdraws itself"],
    ["Pottery gesture capture, i-Treasures [@manitsaris2014; @itreasures]", "Recognise expert gestures with body sensors", "Teach them back with fading and device-off measurement"],
    ["Haptic Drum Kit and bracelets [@holland2010; @holland2018]", "Vibration cues for which limb plays", "Finger-level cues; a specific master's style; retention"],
    ["Open-palm data glove [@hosie2025]", "Accurate finger tracking with the palm free", "Teaching or a master reference"],
    ["Tabla gharana recognition [@gowriprasad2021]", "Identifies style from audio", "Body movement; teaching"],
  ], { size: 16 }));
  add(Box("Novelty statement", [
    "*\"To our knowledge, PARAMPARA is the first low-cost wearable that captures an individual master's skill fingerprint from fingers to shoulder together with what the tool does, proves that the fingerprint belongs to the master rather than to the instrument or the session, teaches it back through finger- and joint-level touch with sound and a ghost arm, withdraws the help as the learner improves, and counts only device-off performance, under the master's consent, across three Indian crafts on one platform.\"*",
  ], ...BLUE));
  add(H2("3.5 If a fingerprint turns out to belong to the instrument"));
  add(P("E1 decides this separately for each craft. **If a craft's fingerprint fails the confound test, we drop the style claim for that craft.** PARAMPARA then still teaches structure, rhythm and posture, measures device-off learning and archives consented recordings. We say this in advance because a claim we cannot test is not worth making."));

  // ---------------------------------------------------------------- 4
  add(H1("4. How it works: Sense, Fingerprint, Teach, Fade, Measure, Own"));
  add(H2("4.1 Sense: the sleeve"));
  add(Fig(fig("v4_sensor_sleeve.png"), 600, 235, "Figure 2. One sleeve per arm: 9 motion sensors and 8 vibration motors, from the fingers to the shoulder."));
  add(T([1.5, 4.5], ["Part", "Specification"], [
    ["Motion sensors (9 per arm)", "Top of the shoulder, upper arm, forearm, back of the hand, and a ring on the middle segment of each finger and the thumb. 6-axis sensors (e.g. BMI270) at 100–200 samples per second; orientation from the Madgwick filter [@madgwick2011]."],
    ["Vibration motors (8 per arm)", "Base of each finger and thumb, wrist, elbow and shoulder. Each motor has its own driver chip (DRV2605L) for crisp, repeatable pulses [@drv2605l]."],
    ["Hub", "ESP32-S3 on the forearm; two I2C multiplexers; rechargeable battery for 3–4 hours [Target]. Radio to a phone or laptop; timestamps shared with the tool sensors [@espnow; @ftsp2004]."],
    ["Fingertips and palm", "**Left free.** Nothing sits between the skin and the drum, the thread or the string. Open-palm designs still track fingers accurately [@hosie2025]."],
    ["Calibration", "A 20-second standing pose (N-pose) at the start of each session [@npose]."],
    ["Fit and hygiene", "Washable fabric sleeve; rings in three sizes; sensors and motors clip out."],
  ], { size: 16, boldFirstCol: true }));
  add(P("**Accuracy, honestly.** A single sensor's orientation is accurate to about a degree in the lab [@madgwick2011], but joint angles from body-worn sensors can be off by 10–20° at the shoulder, depending on the system and calibration [@imuvalid]. So the fingerprint relies mainly on the **timing, order and speed** of the joints, which tolerate small placement errors, and uses angles only as ranges. E1 re-fits the sleeve on each recording day, so placement error is **tested, not assumed away**."));
  add(H2("4.2 Sense: the tool"));
  add(T([1.1, 2.5, 2.5, 1.5], ["Craft", "Tool sensor", "Measures", "Fitting"], [
    ["Tabla", "One piezo per drum and a small base unit", "Stroke time (under a millisecond), strength, which drum [@bello2005]", "Clipped on with removable putty"],
    ["Handloom", "Motion sensor on the beater; switches under the treadles; phone photo of the cloth", "Beat timing and force (peak acceleration); treadle order; picks per cm and their evenness [@fabricdensity]", "Strapped on; nothing on the warp or the shuttle path"],
    ["Puppetry", "Small motion sensor and battery inside the puppet's head or body", "How the puppet turns, tilts and moves", "Inside the costume; strings untouched"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("4.3 Fingerprint"));
  add(P("The tool sensor marks each cycle: a tal cycle on tabla, a pick on the loom, a gesture phrase on the puppet. For every cycle the software removes the cycle's overall tempo and size, then stores, for each joint, **when it moves relative to the tool event, which joint leads, how fast and how far**, together with the tool features and the rhythm. Averaging over cycles gives the fingerprint; the spread shows the master's consistency. **The code is the same for all three crafts; only the cycle definition changes.**"));
  add(H2("4.4 Teach: each sense does what it is best at"));
  add(T([1.3, 2.4, 2.6], ["Sense", "What it carries", "Why"], [
    ["Touch: finger and joint motors", "Which finger moves next; which joint should lead or is lagging; how strong the accent is", "Joint-level vibration improved arm learning [@tikl2007]; drum and strength cues were recognised 96% of the time [@leechoi]"],
    ["Hearing", "Exact timing: the master's tiny early and late shifts", "The ear notices about 10 ms [@friberg1995]; the skin needs 10–30 ms or more [@lauzon2020]"],
    ["Sight: ghost arm", "The master's arm as a moving figure over the learner's; replay after each cycle", "Visual feedback suits movement shape and review between attempts [@sigrist2013]"],
  ], { size: 16, boldFirstCol: true }));
  add(T([1.1, 1.9, 2, 1.4, 1.6], ["Craft", "Finger cue", "Joint cue", "Sound", "Screen"], [
    ["Tabla", "Which finger strikes (e.g. index for *na*)", "Wrist lift before an accented beat", "Bols at the master's timing", "Ghost arms; accent profile"],
    ["Handloom", "Grip and release of the shuttle hand", "Shoulder-then-elbow order of the beat; alert if the shoulder stays raised", "The master's beat rhythm", "Ghost arm; cloth evenness map"],
    ["Puppetry", "Which string-finger to pull, and how much", "Wrist turn for the puppet's turn", "Music cue", "Ghost hand and ghost puppet"],
  ], { size: 15, boldFirstCol: true }));
  add(P("**Timing the cue.** Touch is dulled on a limb that is about to move [@williams1998; @juravle2017]. So each cue ends just before the movement starts and is set well above the learner's own sensing threshold."));
  add(T([1.2, 2.6, 2.4], ["Level", "What the learner learns", "Moves on when"], [
    ["1. Structure", "The pattern: which finger, which joint, which stroke or step", "Performs it without cues, 80% correct"],
    ["2. Steady rhythm", "Keeping the cycle steady while cues fade out", "Unaided score ≥ 85% on two different days"],
    ["3. Style", "This master's own timing, accents and joint order", "Matches the master's fingerprint, and the master approves (only where E1 passes)"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("4.5 Fade"));
  add(P("Help that never goes away makes learners dependent. Feedback given less often leads to better long-term learning, even though practice feels harder [@salmoni1984; @winstein1990]. The fade rule:"));
  add(NL([
    "At the start of each session, and every four cycles, the learner performs one cycle with **no cues** (a check cycle).",
    "The better the check cycles, the fewer cues the next cycles get.",
    "If the learner struggles twice in a row, cues come back a little.",
    "When the learner reaches the target without cues on two different days, the master is asked to approve the next level.",
  ]));
  add(H2("4.6 Measure: with the device off"));
  add(P("Learning means what the learner can do **after a break and without help**, not how well they do while guided [@schmidtlee]. Each craft has an unaided score taken from check cycles and from a retention test at least a day later:"));
  add(T([1.1, 4.4], ["Craft", "Unaided score (device silent)"], [
    ["Tabla", "Timing, accent and stroke accuracy against the master's reference; steadiness and early/late tendency reported separately, because everyone plays slightly ahead of a beat [@repp2005]"],
    ["Handloom", "Evenness of picks per cm in the woven cloth (phone photo), steadiness of the beat rhythm, correct treadle–throw–beat order; time with the shoulder raised reported for health"],
    ["Puppetry", "How closely the puppet's motion follows the master's (after time alignment), and whether viewers who do not know the answer pick it as the master's"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("4.7 Own: consent and credit stay with the master"));
  add(BL([
    "The master decides how the recording may be used (teaching, sharing, commercial use, time limit) and can withdraw it.",
    "The master approves each recording, and each learner's progress, with the fingerprint sensor on their own phone. The secret key never leaves the phone; this is the passkey standard used for secure logins [@webauthn3].",
    "Credit and the master's terms travel with the data as machine-readable labels [@localcontexts]. An edited copy fails verification.",
    "This follows UNESCO's ethical principles for intangible heritage (free, prior and informed consent) and the CARE principles for community data [@unesco2015; @care2020].",
  ]));

  // ---------------------------------------------------------------- 5
  add(H1("5. Validation: answering the hardest question first"));
  add(H2("5.1 The hardest question"));
  add(Box(null, ["*\"Are you identifying the master, or their instrument, tuning, recording session or sensor placement?\"*"], ...BLUE));
  add(P("This is a known trap. Music systems that appeared to recognise artists were partly recognising each album's recording conditions, the 'album effect' [@flexer2010]. A naive test could fool us in the same way: if each master plays only their own tabla, loom or puppet on one day, a computer can 'identify the master' by recognising the instrument. **So E1 is designed to break that link.**"));
  add(H2("5.2 E1: a fingerprint that survives a new day and a new instrument"));
  add(P("**Recording plan per craft:** 3 masters × 2 sessions on different days (sleeve taken off and re-fitted) × 2 instruments (masters swap tablas, looms or puppets) × 20 cycles = **240 cycles**."));
  add(T([1.6, 2.6, 1.5, 1.4], ["Test", "Question", "Pass [decided in advance]", "Rules out"], [
    ["T-a New day", "Trained on one day, does it name the master on the other day?", "≥ 70% (chance 33%)", "Session, sensor placement"],
    ["T-b New instrument", "Trained on one instrument, does it name the master on the other?", "≥ 70% (chance 33%)", "Instrument, tuning"],
    ["T-c Direct test", "Is the same master on different instruments more alike than different masters on the same instrument?", "Yes, with p < 0.01 (1,000 label shuffles)", "All of the above together"],
    ["Control", "How well do the same features name the instrument?", "Reported for transparency", "Shows how much instrument signal remains"],
  ], { size: 16, boldFirstCol: true }));
  add(P("**Verdict: PASS only if T-a, T-b and T-c all pass.** Otherwise the style claim is dropped for that craft (Section 3.5)."));
  add(Fig(fig("confound_test.png"), 600, 211, "Figure 3. Software check on synthetic data. World 1: style lives in the master, and every test passes. World 2: the instrument secretly drives the data. A naive random split still looks well above chance (61%), but the new-day and new-instrument tests fall to 29% and 52%, and the verdict is FAIL. The test rejects a fake fingerprint, as it should. Instrument chance level is 50%."));
  add(Code([
    "python3 PARAMPARA/sim/skilltwin_validation.py demo            # reproduces Figure 3",
    "python3 PARAMPARA/sim/skilltwin_validation.py analyze e1.csv  # real E1 data",
  ]));
  add(H2("5.3 All experiments, with pass rules fixed before data"));
  add(T([0.45, 1.5, 2.3, 0.6, 1.9, 1.0], ["#", "Question", "Design", "People", "Pass [Target]", "Crafts at SIH"], [
    ["E0", "Does the sleeve change how masters perform?", "Alternating blocks of 10 cycles with and without the sleeve; the tool sensor measures both", "Each master", "Equivalent within ±10 ms timing, ±5% cycle time, ±1 dB strength (two one-sided tests [@lakens2017]); comfort ≥ 4 of 5", "All three"],
    ["E1", "Is the fingerprint the master's?", "Section 5.2", "3 masters per craft", "T-a and T-b ≥ 70%; T-c p < 0.01", "All three"],
    ["E2", "Can cues be felt while performing?", "Weakest felt cue at rest vs while performing; finger, wrist, elbow and shoulder sites", "8", "Needs at most twice the rest strength, for at least one site per joint", "Tabla, puppetry"],
    ["E3", "Can people tell two masters apart through PARAMPARA?", "Feel and hear A, B, then X: is X like A or B? 20 rounds", "10", "≥ 15 of 20 right (p = 0.02)", "Tabla"],
    ["E4", "Can cues be read while performing?", "40 random cues: 5 fingers and 3 joints, 2 strengths", "8–10", "≥ 90% of sites, ≥ 80% of strengths", "Tabla, puppetry"],
    ["E5", "Do learners improve with the device off?", "16 beginners randomised: video practice or PARAMPARA; 3 sessions on 3 days; retention test 48 hours later, device off", "16", "Report the difference in unaided score with a 95% confidence interval; run the full trial only if PARAMPARA is at least equal to video", "Tabla"],
  ], { size: 15 }));
  add(P("E5 is a **pilot**: 16 people cannot prove a small effect. It estimates the effect size and tests the procedure for the 120-person trial (Section 13), and we publish the result whichever way it goes. All studies are short, seated, low-risk tasks with written consent and institute ethics approval; pass rules are registered before recording."));

  // ---------------------------------------------------------------- 6
  add(H1("6. What we build for SIH"));
  add(H2("6.1 Three deliverables"));
  add(T([1.5, 2.6, 2.2], ["Deliverable", "What the judge experiences", "Done when [Target]"], [
    ["1. Two sleeves and three tool kits", "Wears a sleeve, plays a tabla phrase or moves a puppet, and feels finger and joint cues", "Cue timing varies ≤ 3 ms; 9 in 10 cues recognised while performing (E4)"],
    ["2. Proven fingerprints", "Sees real masters' fingerprints and the confound-test verdict for each craft", "E0 and E1 reported for all three crafts, pass or fail"],
    ["3. Device-off learning", "Practises; cues fade; performs alone; sees the unaided score, and the E5 pilot result", "Fade rule runs end to end; E5 reported with its confidence interval"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("6.2 Scope per craft"));
  add(T([1.1, 2.3, 2.9], ["Craft", "Validated at SIH", "Live at the finale"], [
    ["Tabla (lead)", "E0, E1, E2, E3, E4, E5", "Judge plays with the sleeve; two masters' fingerprints; device-off score"],
    ["Puppetry", "E0, E1, E2, E4", "Judge moves a Kathputli puppet and feels the string-finger cues"],
    ["Handloom", "E0, E1", "Master's recording replayed on the ghost arm; cloth evenness from a phone photo; a tabletop loom if the venue allows"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("6.3 Bill of materials"));
  add(T([3.2, 0.5, 1.3], ["Part", "Qty", "Approx. ₹"], [
    ["ESP32-S3 hub boards", "2", "1,400–1,800"],
    ["6-axis motion sensor modules (9 per sleeve) [@lcsc]", "18", "4,500–7,200"],
    ["Vibration motors (coin LRA)", "16", "3,200–6,900"],
    ["Haptic driver boards (DRV2605L) [@drv2605l]", "16", "4,800–7,200"],
    ["I2C multiplexers", "4", "600–1,000"],
    ["Batteries with chargers", "2", "800–1,200"],
    ["Fabric sleeves, 3D-printed finger rings, cables, enclosures", "2", "1,600–2,400"],
    ["Tool kits: tabla base unit with piezos; loom beater sensor and treadle switches; puppet sensor", "3", "2,500–3,700"],
    ["**Total prototype (two sleeves, three tool kits)**", "", "**≈ 19,000–31,000**"],
  ], { highlightLast: true }));
  add(P("Estimates from retail module prices. At volume the chips cost about US$1.26 (motion sensor) and US$0.72 (driver) each [@lcsc], so a custom flexible circuit could bring one sleeve to about **₹5,000–7,000 [Target]**, against US$5,000 or more for a motion-capture or haptic suit [@teslasuit; @xsens]."));
  add(H3("Deliberately left out of the SIH build"));
  add(P("Custom circuit board, on-device AI recognition, the Style level for any craft whose E1 fails, live remote teaching, and further crafts. These wait for the roadmap (Section 13)."));

  // ---------------------------------------------------------------- 7
  add(H1("7. Evidence from published research"));
  add(H2("7.1 Touch, sound and learning"));
  add(T([3, 2, 0.8], ["Finding", "Key number", "Source"], [
    ["Joint-level vibration suit while copying a teacher's arm movement", "Error down up to 27%; learning up to 23% faster", "[@tikl2007]"],
    ["Adding haptic guidance to audio training in a drumming task", "−17% final loudness error; −18% early timing error", "[@grindlay2008]"],
    ["Haptic vs visual training of a movement", "Timing learned better from haptics", "[@feygin2002]"],
    ["Beginners learned intricate drum patterns from vibration cues alone", "Haptic Drum Kit study", "[@holland2010]"],
    ["Violin bowing with vibration feedback", "Improved; half kept the gain without feedback", "[@vanderlinden2011]"],
    ["Feeling a drum and strength cue on the body", "96.18% recognised", "[@leechoi]"],
    ["Piano: vibration vs visual cues (n = 14)", "Timing error 12.1% vs 22.3%", "[@coscia2024]"],
    ["Feedback on half the trials vs every trial", "Worse in practice, better retention", "[@winstein1990]"],
  ], { size: 16 }));
  add(H2("7.2 Sensing"));
  add(T([3, 2, 0.8], ["Finding", "Key number", "Source"], [
    ["Low-cost orientation filter for wearable sensors", "Below 0.8° static, 1.7° dynamic", "[@madgwick2011]"],
    ["Open-palm glove, fingertips free", "Finger error 1.25°, wrist 4.85°", "[@hosie2025]"],
    ["Body-worn sensors vs optical capture at the shoulder", "About 10–20° in one system; under 4° for most joints in another", "[@imuvalid]"],
    ["Cloth density measured from images", "Error below 0.86% vs manual counting", "[@fabricdensity]"],
  ], { size: 16 }));
  add(H2("7.3 What we will not claim"));
  add(BL([
    "That PARAMPARA transmits a master's 'soul'. We measure and teach **observable** parts of their skill.",
    "That it replaces the master. The master records, approves and controls.",
    "That a 16-person pilot proves long-term learning, or that the sleeve reduces weavers' pain. Both need larger studies.",
  ]));

  // ---------------------------------------------------------------- 8
  add(H1("8. Feasibility"));
  add(H2("8.1 Eight-week plan"));
  add(T([0.7, 3.2, 2.2], ["Week", "Build and record", "Proof produced"], [
    ["1", "Sleeve v1 on one arm: sensors, hub, logging, N-pose. Partner outreach in all three crafts (Appendix A). Ethics application; pass rules registered.", "Sensor timing checked against slow-motion video"],
    ["2", "Second sleeve; motors and cue timing; three tool kits", "E2 and E4 run on volunteers"],
    ["3", "Fingerprint pipeline and ghost arm; tabla masters, day 1", "E0 (tabla); E1 day 1"],
    ["4", "Tabla masters, day 2 (instruments swapped, sleeve re-fitted); puppeteers, day 1", "E1 verdict (tabla); E0 (puppetry)"],
    ["5", "Weavers at a weaving centre, days 1 and 2; puppeteers, day 2", "E0 and E1 (handloom, puppetry); E3"],
    ["6–7", "Learning pilot: 16 beginners, 3 sessions each, retention test", "E5 result with confidence interval"],
    ["8", "Full demo; three rehearsals without help; backup video; deck with real numbers", "Demo runs end to end"],
  ], { size: 16 }));
  add(H2("8.2 Team of six"));
  add(T([1.5, 4.5], ["Role", "Owns"], [
    ["Hardware", "Sleeves, rings, tool kits, power"], ["Firmware", "Sensor reading, cue timing, radio, time sync"],
    ["App", "Ghost arm, lessons, scores, consent screens"], ["Analysis", "Fingerprint features, confound test, fade rule, E0–E5 statistics"],
    ["Research and partner liaison", "Outreach to masters, consent, recording sessions"], ["Pitch", "Deck, demo script, backup video"],
  ], { boldFirstCol: true }));
  add(H2("8.3 Top risks"));
  add(T([2, 2.6, 2], ["Risk", "What we do", "Fallback"], [
    ["No masters available in time", "Outreach in week 1 through Zonal Cultural Centres, Weavers' Service Centres, music colleges and puppeteer communities", "Senior practitioners of different teachers, stated clearly"],
    ["Masters cannot swap looms", "Record two looms at one weaving centre", "Report T-a only for handloom and say so"],
    ["Sleeve changes how masters perform (E0)", "Lighter rings; adjust positions with the master", "Hand, wrist and elbow sensors only"],
    ["Shoulder angles inaccurate", "Use timing, order and speed features", "Drop shoulder angles from the fingerprint"],
    ["Finger cues not felt while striking (E2)", "Cue before the movement; stronger pulse", "Move the cue to the wrist"],
    ["Fingerprint fails E1 for a craft", "Report it", "Teach structure and rhythm for that craft (Section 3.5)"],
    ["Radio trouble at the venue", "Cues stored on the sleeve in advance", "USB cable; backup video"],
  ], { size: 16 }));
  add(P("Every part is off the shelf, the riskiest questions are answered by week 5, and each risk has a fallback. **The SIH build is feasible in eight weeks; the results decide what we claim.**"));

  // ---------------------------------------------------------------- 9
  add(H1("9. Viability: institution-first, craft by craft"));
  add(P("**Our first customers are institutions, because hardware cost and the need to protect masters' content make direct consumer sales premature.**"));
  add(T([1.1, 2.6, 2.6], ["Craft", "What already exists", "What PARAMPARA adds"], [
    ["Tabla", "Guru-Shishya Parampara honoraria (e.g. ₹7,500 a month for a guru) [@gsp]; CBSE subject 036 [@cbse036]; ABGMVM exam centres [@abgmvm]", "A kit per guru or music room; fingerprints as lasting output of state-funded teaching"],
    ["Handloom", "28 Weavers' Service Centres and SAMARTH training [@wsc]; a 315-hour NSQF qualification [@nsqfhandloom]", "A training aid with device-off scores as evidence of skill; shoulder-load feedback for weaver health"],
    ["Puppetry", "Intangible heritage scheme through Sangeet Natak Akademi [@snaich]; artists in schools on bagless days [@nep426]; artists-in-residence in universities [@ugc2025]", "Recorded, credited fingerprints of puppeteers; a teaching kit for workshops"],
    ["All", "National audiovisual archive, a certified trusted repository [@ncaa]", "A new kind of record: how masters move"],
  ], { size: 16, boldFirstCol: true }));
  add(BL([
    "**Cost:** about ₹19,000–31,000 for the two-sleeve prototype, falling with a custom board; a whole kit costs less than four months of a guru's state honorarium [@gsp] and a small fraction of a motion-capture suit [@xsens].",
    "**Who pays:** institutions buy kits and a yearly licence; consenting masters receive a share whenever their fingerprints are used; grants and CSR support preservation. **These are hypotheses: our first-year test is three signed letters of intent.**",
    "**Rules:** consent is explicit and recorded; data stays on the device or the user's app by default, in line with India's data protection law [@dpdp]; performers' rights are respected [@copyright1957].",
  ]));

  // ---------------------------------------------------------------- 10
  add(H1("10. Impact"));
  add(T([1.3, 2.7, 2.3], ["Who", "Benefit", "How we will measure it"], [
    ["Masters", "Their own way of playing, weaving or puppeteering preserved, credited and shared on their terms", "Masters recorded; their feedback"],
    ["Learners", "Practise against a real master between lessons, and see honest progress", "Unaided score after a break"],
    ["Weavers", "Feedback on shoulder posture during long weaving hours [@siddiqui2021]", "Time with the shoulder raised, before and after (to be tested)"],
    ["Archives", "A record of how masters move, not only how they sound and look", "Consented fingerprints deposited"],
    ["Researchers", "A consented dataset linking masters' fingerprints with learners' progress in three crafts", "Dataset and publications"],
  ], { size: 16, boldFirstCol: true }));
  add(H3("First-year targets [Target]"));
  add(T([2.6, 1.6, 2], ["Measure", "Target", "Source of the number"], [
    ["Masters recorded with consent", "15 (tabla, handloom, puppetry)", "Recording register"],
    ["Learners completing a two-week programme", "100", "App records"],
    ["Unaided score vs video-only practice", "Better, with confidence interval", "Learning trial"],
    ["Institutions piloting", "3, at least one per craft", "Signed letters of intent"],
  ]));
  add(P("**Possible wider benefit, not yet tested:** deaf people can follow a beat through vibration [@tranchant2017], and India has about 50.7 lakh people with hearing disability [@census2011]. A future study could open rhythm learning to them."));

  // ---------------------------------------------------------------- 11
  add(H1("11. The pitch: what the jury will see and hear"));
  add(H2("11.1 Six things the jury should remember"));
  add(NL([
    "A master's skill lives in the fingers, wrist, elbow and shoulder.",
    "We measure it with one low-cost sleeve, in tabla, handloom and puppetry.",
    "We prove the fingerprint is the master's, not the instrument's.",
    "We teach it through touch, sound and a ghost arm.",
    "We remove the help and count only what the learner does alone.",
    "The master owns and controls the recorded legacy.",
  ]));
  add(H2("11.2 Three-minute demo"));
  add(T([0.9, 4.8], ["Time", "What happens"], [
    ["0:00–0:20", "'Archives keep how masters sound and look. Nothing keeps how their hands move.'"],
    ["0:20–0:55", "Two tabla masters' fingerprints on screen, and the E1 verdict: the master is still recognised on a new day and on a swapped tabla."],
    ["0:55–1:55", "The judge wears the sleeve and plays along. Finger and wrist cues fade. A check cycle runs with the device silent; the unaided score appears. 'The device succeeds only when it is no longer needed.'"],
    ["1:55–2:25", "The judge moves a Kathputli puppet and feels which string-finger to pull. A weaver's recording replays on the ghost arm with the cloth evenness map."],
    ["2:25–2:45", "The master's consent: approved with a phone fingerprint; an edited copy is rejected."],
    ["2:45–3:00", "E0–E5 results, and the plan: institutions first, one platform for many crafts."],
  ], { boldFirstCol: true }));
  add(H2("11.3 Hard questions"));
  add(T([2.2, 4.2], ["Question", "Answer"], [
    ["Are you identifying the master, or the instrument, tuning, session or sensor placement?", "We tested exactly that. Each master was recorded on two days with the sleeve re-fitted, and on two instruments. A fingerprint counts only if it names the master on a new day **and** on a new instrument, and if the same master on another instrument is closer than another master on the same instrument (Section 5)."],
    ["Three crafts: isn't that spreading thin?", "One sleeve, one pipeline. Tabla is validated in full; handloom and puppetry are tested on the two riskiest questions, E0 and E1. That shows the platform generalises."],
    ["Doesn't wearing sensors change how a master plays?", "Fingertips and palm are free, and E0 tests it: the same tool sensor measures performance with and without the sleeve."],
    ["Is there any learning evidence?", "E5: beginners randomised to video or PARAMPARA, tested 48 hours later with the device off, reported with a confidence interval. It is a pilot; the full trial follows."],
    ["Why not YouTube?", "Video shows the master. We measure the learner against that master and remove help until they perform alone."],
    ["Why not a motion-capture suit?", "Suits cost US$5,000 or more and do not teach [@teslasuit; @xsens]. Our sleeve is built to teach, at a fraction of the cost."],
    ["Can vibration carry tiny timing differences?", "No, and we don't ask it to. Touch carries which finger, which joint and how strong; the ear carries fine timing [@friberg1995; @lauzon2020]."],
    ["Won't learners depend on the sleeve?", "Cues fade, and only the device-off score counts [@winstein1990]."],
    ["Can we meet the masters?", "They are named in the deck with their signed consent. With their agreement we invite them to the demo or share their contact through our institute."],
    ["Does it replace the master?", "No. It extends the master's reach between lessons, under the master's control."],
    ["What if E1 fails?", "We drop the style claim for that craft, keep teaching structure and rhythm, and say so."],
  ], { size: 16 }));

  // ---------------------------------------------------------------- 12
  add(H1("12. Limits we state openly"));
  add(BL([
    "**Body sensors have limits:** shoulder angles can be off by many degrees [@imuvalid]; we rely on timing, order and speed, and E1 tests the result.",
    "**Not captured:** grip force inside the hand, tone colour of a stroke, thread tension.",
    "**Touch has limits:** eight sites per arm and two or three strength levels; fast passages are taught by ear and screen.",
    "**Small first studies:** E0–E5 test feasibility and estimate effects; they do not prove long-term learning.",
    "**A craft's fingerprint may fail E1.** If so, its Style level waits.",
    "**Looms are not portable;** handloom work happens at weaving centres, and the finale shows recordings.",
    "**Copying cannot be fully prevented;** consent and credit are recorded, and licences are contractual.",
    "**Some masters may not want to be recorded.** Their choice decides what we do.",
  ]));

  // ---------------------------------------------------------------- 13
  add(H1("13. Roadmap after SIH"));
  add(T([1.5, 3.2, 1.8], ["When", "What", "Starts only if"], [
    ["0–6 months", "Tabla learning trial with about 120 people: video, video with metronome, PARAMPARA with fixed fading, PARAMPARA with check-cycle fading [@cohen1988]", "E0–E5 pass for tabla"],
    ["0–6 months", "Handloom training pilot at a Weavers' Service Centre, including shoulder-posture feedback", "E0 and E1 pass for handloom"],
    ["0–6 months", "Custom flexible circuit; lower cost; stroke recognition on the device [@rohit2023]", "Prototype stable"],
    ["6–12 months", "Style level where E1 passes; archive pilot with NCAA [@ncaa]; 'Feel the Master' exhibition kiosk", "Clear fingerprints in E1"],
    ["12+ months", "Glove and shadow puppetry, kathak footwork, pottery [@puppetforms; @manitsaris2014]", "Three-craft deployment working"],
  ], { size: 16 }));

  // ---------------------------------------------------------------- Appendices (execution kit)
  out.push("__APPENDIX__");
  add(H1("Appendix A. Partner kit for three crafts", true));
  add(H2("A.1 Whom to approach"));
  add(T([1.1, 4.4], ["Craft", "Where to find masters"], [
    ["Tabla", "Gurus empanelled with a Zonal Cultural Centre under Guru-Shishya Parampara [@gsp]; tabla faculty at music colleges; Gandharva Mahavidyalaya centres [@abgmvm]"],
    ["Handloom", "Weavers' Service Centres [@wsc]; master weavers and trainers of the two-treadle qualification [@nsqfhandloom]; nearby handloom clusters"],
    ["Puppetry", "Kathputli families and troupes, including the former Kathputli Colony community [@kathputlicolony]; puppeteers listed by Zonal Cultural Centres and Sangeet Natak Akademi [@snaich]"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("A.2 Outreach message"));
  add(Box(null, [
    "*Respected Guruji / Ustad, we are engineering students building PARAMPARA for Smart India Hackathon 2026. It records how a master moves while playing, weaving or working a puppet (light sensors on the back of the hand and arm, nothing on the fingertips or palm), so that learners can practise against it, with the master's consent and credit. We would be grateful for two short sessions of about 45 minutes on different days. You decide how the recording may be used, you will receive a copy, and you can withdraw it at any time.*",
    "*Pranam Guruji / Ustad ji, hum engineering students hain aur Smart India Hackathon 2026 ke liye PARAMPARA bana rahe hain. Isme guru ke haath aur baanh ki gati record hoti hai (haath ke peeche aur baanh par halke sensor, ungliyon ke siron aur hatheli par kuch nahi), taaki shishya uske saath abhyas kar sakein, guru ki anumati aur naam ke saath. Kya aap alag-alag din do baar lagbhag 45 minute de sakte hain? Recording ka upyog aap tay karenge, aapko copy milegi, aur aap kabhi bhi wapas le sakte hain.*",
  ]));
  add(H2("A.3 Consent form (plain language)"));
  add(T([4.6, 1.2], ["I agree that…", "Yes / No"], [
    ["my movements may be recorded with sensors on the back of my hands and arms, and a sensor on my instrument, loom or puppet", "☐ / ☐"],
    ["I may be asked to play, weave or perform on a second instrument, loom or puppet", "☐ / ☐"],
    ["the recording may be used to teach learners through PARAMPARA", "☐ / ☐"],
    ["my name, gharana or community may be shown with the recording", "☐ / ☐"],
    ["the recording may be shown at Smart India Hackathon 2026", "☐ / ☐"],
    ["the recording may be used commercially (only with a separate written agreement)", "☐ / ☐"],
    ["a person I name may manage the recording after me: ______________", "☐ / ☐"],
    ["I understand I can withdraw at any time, and I will receive a copy of my recording", "☐"],
  ], { size: 16 }));
  add(P("Signature, date and witness. A spoken consent recording in the master's language is kept with the form. Institute ethics approval is obtained before any study with volunteers (E2–E5)."));
  add(H2("A.4 What the master receives"));
  add(BL(["A copy of their recording and fingerprint.", "Credit wherever it is used.", "Control: approve, limit or withdraw.", "A share of any future licence income, as agreed in writing."]));

  add(H1("Appendix B. Experiment E1 protocol: is the fingerprint the master's?"));
  add(H2("B.1 Recording matrix (per craft)"));
  add(T([1.4, 1.6, 1.6, 1.6], ["", "Day 1", "Day 2 (sleeve re-fitted)", "Cycles"], [
    ["Master A", "Instrument 1, then 2", "Instrument 2, then 1", "4 × 20 = 80"],
    ["Master B", "Instrument 2, then 1", "Instrument 1, then 2", "80"],
    ["Master C", "Instrument 1, then 2", "Instrument 2, then 1", "80"],
  ], { size: 16, boldFirstCol: true }));
  add(P("Instruments: two tabla sets, two looms at one weaving centre, or two puppets of the same type. The order is counterbalanced so fatigue and warm-up do not line up with an instrument."));
  add(H2("B.2 Procedure"));
  add(NL([
    "**Set-up:** sleeves on both arms, 20-second N-pose; tool sensor fitted; tuning, loom settings or puppet noted.",
    "**Warm-up:** 2 minutes of free performance.",
    "**Recording:** at least 20 uninterrupted cycles per instrument: Teentaal theka at 80 beats per minute (tabla); 20 picks of plain weave (handloom); a fixed gesture phrase chosen by the master, repeated 20 times (puppetry).",
    "**E0 block:** on day 1, add alternating blocks of 10 cycles with and without the sleeve on instrument 1.",
    "**Export** one row per cycle to a CSV file with the columns master, session, instrument, f1 … fn (the cycle features from Section 4.3; the export is part of the week-3 build).",
    "**Analyse:** `python3 PARAMPARA/sim/skilltwin_validation.py analyze e1.csv`.",
    "**Report** T-a, T-b, T-c, the control, chance levels and the verdict, plus each master's profile with error bars.",
  ]));
  add(Box("Result template for the deck", ["Craft ___ · masters A, B, C · new day ___% · new instrument ___% (chance 33%) · confound gap ___, p = ___ · instrument control ___% (chance 50%) · verdict ___."], ...BLUE));

  add(H1("Appendix C. Experiments E0 and E2–E5 protocols"));
  add(T([0.5, 2.6, 2.2, 1.4], ["#", "Procedure", "Measure", "Pass [Target]"], [
    ["E0", "Alternating blocks (no sleeve, sleeve, no sleeve, sleeve), 10 cycles each; tool sensor on throughout; master rates comfort", "Difference in timing, cycle time and strength; equivalence by two one-sided tests [@lakens2017]", "Within ±10 ms, ±5%, ±1 dB; comfort ≥ 4 of 5"],
    ["E2", "Find the weakest cue each person can feel (up-down method), at rest and while performing slowly; finger, wrist, elbow and shoulder sites; cue before vs on the beat", "Ratio of 'while performing' to 'at rest' strength", "≤ 2 at one or more sites per joint"],
    ["E3", "Feel and hear A (master 1), B (master 2), then X (one of them, at random). Answer 'A or B'. 20 rounds", "Correct answers out of 20", "≥ 15 of 20 (p = 0.02)"],
    ["E4", "While performing, 40 random cues across 5 fingers and 3 joints at 2 strengths; the person calls out what they felt", "Percentage correct", "≥ 90% sites, ≥ 80% strengths"],
    ["E5", "16 beginners randomised (8 and 8) to video practice or PARAMPARA; three 20-minute sessions on three days on the tabla theka; retention test 48 hours later with the device off; the tester does not know the group", "Unaided score at retention (primary); score during practice (secondary)", "Difference and 95% CI reported; full trial if PARAMPARA ≥ video"],
  ], { size: 16 }));
  add(P("All are short, low-risk tasks, seated, with comfortable vibration levels and the right to stop at any time. Written consent and the institute's ethics process apply."));

  add(H1("Appendix D. Demo day checklist"));
  add(BL([
    "Two sleeves plus one spare; finger rings in three sizes; spare batteries, power bank and cables.",
    "Tabla and practice pad; a Kathputli puppet with its sensor; handloom recordings and a cloth sample.",
    "Pre-calibrated judge profile with a 20-second N-pose re-check.",
    "Offline copy of the app on the demo laptop.",
    "Masters' fingerprints and E1 verdicts loaded; one signed recording and one edited copy.",
    "Printed one-page summary and the masters' consent summaries.",
    "Backup video of the full demo; three rehearsals completed without help.",
  ]));

  add(H1("Appendix E. Simulations (planning tools, not evidence of learning)"));
  add(H2("E.1 How much to record for E1"));
  add(Fig(fig("fingerprint_power.png"), 600, 260, "Figure E1. Simulation with assumed variation between tabla cycles (15 ms, 1.5 dB). With 20 cycles per player, players whose profiles differ by about 6 ms and 0.6 dB per beat are told apart about 80% of the time; at 10 ms, about 96%."));
  add(P("This sets the recording length (**at least 20 cycles per master per condition**). The real difference between masters is unknown until E1."));
  add(H2("E.2 The confound test on synthetic data"));
  add(T([2.6, 1.3, 1.3], ["Test (synthetic, 3 masters × 2 days × 2 instruments × 20 cycles)", "World 1: master-driven", "World 2: instrument-driven"], [
    ["Naive random split", "96%", "61%"], ["T-a New day", "85%", "29%"], ["T-b New instrument", "96%", "52%"],
    ["T-c Confound gap (p)", "+0.77 (p = 0.002)", "−1.92"], ["Control: name the instrument", "66%", "100%"],
    ["**Verdict**", "**PASS**", "**FAIL**"],
  ], { boldFirstCol: true }));
  add(P("World 2 shows why the naive test is dangerous: it looks well above chance although the 'fingerprint' is really the instrument. Code and results: `PARAMPARA/sim/skilltwin_validation.py`, `skilltwin_validation_demo.json`."));
  add(H2("E.3 Does fading by check cycles help?"));
  add(P("We simulated 1,000 learners over three practice days with overnight forgetting and very different learning speeds, under three assumptions about how guidance affects learning."));
  add(T([2.6, 1.1, 1.1, 1.1], ["Unaided score on day 4 (simulated)", "Assumption A", "Assumption B", "Assumption C"], [
    ["Cues always on", "0.48", "0.42", "0.57"], ["No cues", "0.46", "0.58", "0.71"],
    ["Fixed fade", "0.67", "0.63", "0.68"], ["Check-cycle fade (PARAMPARA)", "0.69", "0.65", "0.68"],
  ], { boldFirstCol: true }));
  add(P("Cues that never stop do poorly under every assumption. Check-cycle fading did slightly better than a fixed fade under two assumptions (+0.015, 95% CI 0.013–0.017) and equally under the third. The gain is small and depends on the assumptions, so people, not simulations, decide (E5 and the full trial). Code: `PARAMPARA/sim/fade_engine_sim_v2.py`."));

  add(H1("Appendix F. Reference check and parameters"));
  add(H2("F.1 References removed from the original team documents"));
  add(T([3, 3], ["Original citation", "Finding"], [
    ["'Masur & Sacks, Gesture-Based Adaptive Haptic Guidance, IEEE Robotics (2025)'", "Does not exist; closest real work is Zahedi et al. 2017 [@zahedi2017]"],
    ["'Flandorfer et al., Wearable Haptic Learning Systems, Sensors (2022)'", "Not found; replaced by a verified review [@sigrist2013]"],
    ["'Grindlay (2008), ACM Multimedia'", "Wrong venue; correct sources cited [@grindlay2008; @grindlay2007]"],
    ["Chat-tool markers such as 【35†L1-L4】", "Not references; removed"],
  ], { size: 16 }));
  add(H2("F.2 Starting parameters"));
  add(T([2.6, 2.4], ["Parameter", "Value"], [
    ["Motion sensor sampling", "100–200 samples per second"], ["Tabla stroke sensor sampling", "≥ 4,000 samples per second"],
    ["Fingerprint recording", "≥ 20 cycles per master, day and instrument"], ["Calibration", "20-second N-pose each session"],
    ["Cue length", "30–80 ms"], ["Cue strength", "≥ 3 × the person's weakest felt level"],
    ["Cue ends before movement", "about 100 ms (measured per person)"], ["Check cycles", "session start + every 4 cycles"],
    ["Target to move on", "unaided score ≥ 85% on 2 days + master's approval"], ["E1 pass", "T-a and T-b ≥ 70%; T-c p < 0.01"],
  ], { size: 16 }));
  return out;
};
