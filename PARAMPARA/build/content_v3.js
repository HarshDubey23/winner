// PARAMPARA final solution document, v3 (judge edition): lean, one innovation, buildable.
module.exports = function (L) {
  const { P, H1, H2, H3, BL, NL, T, Box, Code, Fig, COLOR } = L;
  const fig = (n) => require("path").join(__dirname, "..", "figures", n);
  const out = [];
  const add = (...xs) => xs.forEach((x) => (Array.isArray(x) ? out.push(...x) : out.push(x)));

  // ---------------------------------------------------------------- contents
  add(H2("Contents"));
  add(T([0.6, 4.4], null, [
    ["1", "The idea on one page"], ["2", "The problem"], ["3", "The innovation: a master's fingerprint as a teaching reference"],
    ["4", "How it works: Sense, Fingerprint, Teach, Fade, Measure"], ["5", "What we build for SIH: three things, done well"],
    ["6", "Evidence: what science shows and what we validate"], ["7", "Feasibility"], ["8", "Viability: institution-first deployment"],
    ["9", "Impact"], ["10", "The pitch: what the jury will see and hear"], ["11", "Limits we state openly"], ["12", "Roadmap after SIH"],
    ["13", "References"], ["A–F", "Execution kit: guru partner kit, experiment protocols, demo checklist, simulations, reference check, parameters"],
  ], { size: 18, cantSplit: true }));
  add(P("Citations like [12] point to Section 13. Every reference carries a status: **V** verified by live web search in October 2026, **P** existence verified with some details from memory, **S** a standard textbook or classic paper. Numbers we have not yet measured are marked **[Target]**.", { size: 18, color: COLOR.grey }));

  // ---------------------------------------------------------------- 1
  add(H1("1. The idea on one page", true));
  add(Box("The problem", ["Every tabla master plays the same theka in their own way: where they lean early or late, which beats they stress, how their hands move. This is learned only face to face, over years. India archives how masters **sound** [@ncaa]; nothing records how they **play** in a form a student can practise against. When masters pass away, as Ustad Zakir Hussain did in December 2024 [@zakir], their recordings stay and their teaching goes."]));
  add(Box("Our one innovation", ["**A measurable, consented fingerprint of an individual master's playing style, used as a teaching reference.**", "Everything else in PARAMPARA exists to capture, teach, test or protect that fingerprint."], COLOR.blue, "EEF3F8"));
  add(H3("How it works"));
  add(Fig(fig("v3_pipeline.png"), 600, 209, "Figure 1. Five steps, plus ownership by the guru."));
  add(H3("Why not YouTube or a metronome?"));
  add(P("Video shows what a master does; a metronome gives everyone the same grid. **Neither measures the student's own playing against a specific master, and neither checks whether the student can play without help.** PARAMPARA does both: measure, teach, fade, and prove retention."));
  add(H3("What the jury will see live"));
  add(NL([
    "**A working cuff.** The judge wears it, plays along, and feels which hand, which stroke and how strong.",
    "**A real fingerprint.** Two real masters, the same theka, visibly different measured profiles.",
    "**Learning without the device.** Cues fade out, the judge plays alone, and the screen shows the unaided score.",
  ]));
  add(P("**Our test of success:** *the device succeeds only when the student no longer needs it.*"));

  // ---------------------------------------------------------------- 2
  add(H1("2. The problem"));
  add(H2("2.1 Skill that cannot be written down"));
  add(P("Tabla is taught through *talim*: the student sits with the guru and imitates for years. The philosopher Michael Polanyi called this kind of skill tacit knowledge: 'we know more than we can tell' [@polanyi1966]. Knowledge-management research shows that turning tacit skill into an explicit, shareable form is the hardest step of all [@nonaka1995]. Notation records the bols, not the way a particular master plays them."));
  add(H2("2.2 Why it matters now"));
  add(T([2.2, 2.8, 0.8], ["Fact", "What it means", "Source"], [
    ["India's national audiovisual archive has identified over 3 lakh hours of recordings and digitised over 23,000", "Sound and image are being preserved. Playing technique is not.", "[@ncaa]"],
    ["The State pays gurus to teach in person through the Guru-Shishya Parampara scheme (7 Zonal Cultural Centres)", "Transmission is valued, but limited to the guru's own room and time", "[@gsp]"],
    ["Tabla is a school subject (CBSE subject 036) and a Kala Utsav category in 36 States/UTs", "There is a structured pipeline of learners who need good references", "[@cbse036; @kalautsav]"],
    ["Over one lakh students take ABGMVM music exams every year (all disciplines)", "Demand for structured classical learning is large", "[@abgmvm]"],
    ["India now has 16 elements on UNESCO's intangible heritage list", "Keeping living traditions alive is a national priority", "[@deepavali2025]"],
  ], { size: 16 }));
  add(H2("2.3 Why existing tools fall short"));
  add(T([1.4, 2.6, 2.4], ["Tool", "What it does well", "What it cannot do"], [
    ["Video lessons and apps", "Show the master's hands and sound [@apps]", "Measure the student's playing; check learning without help"],
    ["Metronome", "Keeps a steady grid", "Show a specific master's accents, hand pattern or timing; measure retention"],
    ["Electronic tabla", "Plays tabla sounds from pads [@tablatouch]", "Teach a master's style"],
    ["Live lessons", "The gold standard", "Scale beyond one room, one city and one lifetime"],
  ], { size: 16 }));

  // ---------------------------------------------------------------- 3
  add(H1("3. The innovation: a master's fingerprint as a teaching reference"));
  add(H2("3.1 What the fingerprint is"));
  add(P("The fingerprint is the measurable part of a master's style, taken from their own playing of a standard theka. It has four parts:"));
  add(T([1.5, 3, 1.5], ["Part", "What it captures", "How we measure it"], [
    ["Stroke pattern", "Which hand and which kind of stroke on each beat", "One piezo sensor per drum"],
    ["Accent shape", "How much stronger or softer each beat is (the bhari–khali shape)", "Strength of each stroke, relative to the cycle"],
    ["Timing shape", "Where in the cycle the master plays slightly early or late", "Stroke times compared with the master's own tempo"],
    ["Hand movement", "How high and how fast the arm lifts before each stroke", "Motion sensor in the wrist cuff"],
  ], { size: 16, boldFirstCol: true }));
  add(P("The master plays their own tabla normally. **There is no glove**, so the recording does not change how they play."));
  add(H2("3.2 Why we believe style is measurable"));
  add(T([3.2, 2.2, 0.8], ["Published finding", "Meaning for us", "Source"], [
    ["Tabla gharanas recognised automatically from audio of solo performances (38+ hours)", "Gharana style leaves a measurable trace", "[@gowriprasad2021]"],
    ["A large Hindustani corpus shows systematic accent and tempo patterns within the tal cycle", "Accent and timing shapes are real and measurable", "[@srinivasamurthy2017]"],
    ["Pianists identified from their timing and loudness by machine learning", "Performers can be told apart by timing and dynamics", "[@stamatatos2005; @repp1992]"],
    ["Famous drummers each show a distinctive timing fingerprint across 79 recordings", "Percussionists have timing fingerprints", "[@carter2025]"],
  ], { size: 16 }));
  add(H2("3.3 What is new"));
  add(T([2.2, 2.2, 2.2], ["Closest existing work", "What it does", "What it does not do"], [
    ["Tabla gharana recognition [@gowriprasad2021]", "Identifies a gharana from audio", "Teach it back to a learner"],
    ["Haptic Drum Kit and bracelets [@holland2010; @holland2018]", "Vibration cues for drum rhythms", "Use a specific master's style; fade; prove retention"],
    ["Vibrotactile drumming guidance [@leechoi]", "Body cues for which drum and how hard", "Capture a master; measure unaided learning"],
    ["Indian percussion tutoring poster [@hotmobile2026]", "Proposes sensing a mridangam learner", "Transmit a master's style back by touch"],
    ["Layika glove [@layika2026]", "Finger gestures trigger tabla sounds", "Teach or measure a master's style"],
  ], { size: 16 }));
  add(Box("Novelty statement", ["*\"To our knowledge, PARAMPARA is the first system that measures an individual tabla master's playing fingerprint on the instrument and uses it as a teaching reference, delivered through touch and sound, withdrawn as the student improves, and checked by playing without help, under the master's consent.\"*"], COLOR.blue, "EEF3F8"));
  add(H2("3.4 If the fingerprint turns out to be too small"));
  add(P("We test this first (experiment E1, Section 6). **If our sensors cannot tell masters apart, we drop the style claim.** PARAMPARA then still teaches the theka structure and steady laya, measures unaided learning, and keeps consented recordings for the archive. We say this openly because a claim we cannot test is not worth making."));

  // ---------------------------------------------------------------- 4
  add(H1("4. How it works: Sense, Fingerprint, Teach, Fade, Measure"));
  add(H2("4.1 Sense"));
  add(P("A small base unit clips onto the tabla with removable putty. One piezo sensor per drum detects every stroke, its timing to a fraction of a millisecond, which hand, and how strong [@bello2005]. A motion sensor in each wrist cuff records the arm's lift and swing."));
  add(H2("4.2 Fingerprint"));
  add(P("The master plays the Teentaal theka for about four minutes (at least 20 cycles). For every cycle the app removes that cycle's overall tempo and loudness, then stores the master's stroke pattern, accent shape and timing shape for all 16 beats. Averaging over cycles gives the fingerprint; the spread between cycles shows how consistent the master is."));
  add(H2("4.3 Teach: each sense does what it is best at"));
  add(T([1.2, 2.4, 2.6], ["Sense", "What it carries", "Why"], [
    ["Touch", "Which hand, which kind of stroke, how strong, roughly when", "Vibration cues taught drum rhythms to beginners [@holland2010]; drum and strength cues were recognised 96% of the time [@leechoi]"],
    ["Hearing", "The exact timing: tiny early or late shifts", "The ear notices about 10 ms [@friberg1995]; the skin needs 10–30 ms or more [@lauzon2020]"],
    ["Sight", "Arm movement and, after each cycle, 'your profile vs the master's'", "Visual feedback suits movement and review between cycles [@sigrist2013]"],
  ], { size: 16, boldFirstCol: true }));
  add(P("Two wrist cuffs carry four small vibration motors: back and front of each wrist, the most locations the wrist can reliably tell apart [@chen2008]. The wrist tells the student which hand; the site and pulse length tell which stroke; the strength tells the accent."));
  add(P("**Timing the cue.** Touch is dulled on a limb that is about to move [@williams1998; @juravle2017]. So each cue ends just before the student starts to lift the hand, and is set well above the student's own sensing threshold."));
  add(T([1.2, 2.6, 2.4], ["Level", "What the student learns", "Moves on when"], [
    ["1. Structure", "The theka: hands, strokes and accents", "Plays it without cues, 80% correct"],
    ["2. Steady laya", "Keeping tempo with cues fading out", "Unaided score ≥ 85% on two different days"],
    ["3. Style", "This master's accent and timing shape, by ear and on screen", "Profile matches the master's, and the guru approves"],
  ], { size: 16, boldFirstCol: true }));
  add(P("For SIH we build and test Levels 1 and 2. Level 3 depends on the result of E1."));
  add(H2("4.4 Fade"));
  add(P("Help that never goes away makes learners dependent. Motor-learning research shows that feedback given less often leads to better long-term learning, even though practice feels harder [@salmoni1984; @winstein1990]. The fade rule is simple:"));
  add(NL([
    "At the start of each session, and every few cycles, the student plays one cycle with **no cues** (a check cycle).",
    "The better the student does in check cycles, the fewer cues the next cycles get.",
    "If the student struggles twice in a row, cues come back a little.",
    "When the student reaches the target without cues on two different days, the guru is asked to approve the next step.",
  ]));
  add(H2("4.5 Measure"));
  add(P("Learning means what the student can do **after a break and without help**, not how well they do while being guided [@schmidtlee]. PARAMPARA's headline number is therefore the **unaided score**: timing, strength and stroke accuracy in a cycle played with the device silent. Steadiness and early/late tendency are reported separately, because everyone naturally plays slightly ahead of a beat [@repp2005]."));
  add(H2("4.6 Own: consent and credit stay with the guru"));
  add(BL([
    "The guru decides how the recording may be used (teaching, sharing, commercial use, time limit) and can withdraw it.",
    "The guru approves each recording, and each student's progress, with the fingerprint sensor on their own phone. The secret key never leaves the phone; this is the same passkey standard used for secure logins [@webauthn3].",
    "Credit and the guru's terms travel with the data. Any edited copy fails verification.",
    "This follows UNESCO's ethical principles for intangible heritage (free, prior and informed consent) and the CARE principles for community data [@unesco2015; @care2020].",
  ]));

  // ---------------------------------------------------------------- 5
  add(H1("5. What we build for SIH: three things, done well"));
  add(T([1.5, 2.6, 2.2], ["Deliverable", "What the judge experiences", "Done when [Target]"], [
    ["1. Working cuff and base unit", "Wears the cuff, plays on a tabla or practice pad, feels hand, stroke and accent cues", "Cues fire on time (variation ≤ 3 ms) and 9 in 10 cues are recognised while playing"],
    ["2. Real fingerprint", "Sees two real masters' profiles side by side, and hears and feels the difference", "Our analysis tells the masters apart in ≥ 70% of cycles (chance 33%), recorded with consent"],
    ["3. Learning without the device", "Practises; cues fade; plays alone; sees the unaided score", "Fade rule runs end to end; score shown live"],
  ], { size: 16, boldFirstCol: true }));
  add(Fig(fig("v3_mvp_hardware.png"), 600, 202, "Figure 2. The MVP: three parts, all built from off-the-shelf boards."));
  add(T([2.8, 0.5, 1.2], ["Part", "Qty", "Approx. ₹"], [
    ["ESP32-S3 board (base unit)", "1", "600–900"], ["ESP32 boards (cuffs)", "2", "500–800"],
    ["Haptic driver boards (DRV2605L), one per motor [@drv2605l]", "4", "1,400–2,000"], ["Vibration motors (LRA, about 10 mm)", "4", "400–1,000"],
    ["Motion sensors", "2", "300"], ["Piezo sensors and parts", "2 sets", "150"],
    ["Batteries with chargers", "3", "800"], ["Straps, small screen, wiring, enclosures", "–", "1,000–1,500"],
    ["**Total prototype**", "", "**≈ 6,000–7,500**"],
  ], { highlightLast: true }));
  add(H3("Deliberately left out of the SIH build"));
  add(P("To keep the MVP small and solid, these wait for the roadmap (Section 12): custom circuit board, on-device AI stroke recognition, the Style level, live guru-to-student mode, public kiosk, archive integration, and other art forms."));

  // ---------------------------------------------------------------- 6
  add(H1("6. Evidence: what science shows and what we validate"));
  add(H2("6.1 What published research already shows"));
  add(T([3, 2, 0.8], ["Finding", "Key number", "Source"], [
    ["Adding haptic guidance to audio training in a drumming task", "−17% final loudness error; −18% early timing error", "[@grindlay2008]"],
    ["Haptic vs visual training of a movement", "Timing learned better from haptics", "[@feygin2002]"],
    ["Beginners learned intricate drum patterns from vibration cues alone", "Haptic Drum Kit study", "[@holland2010]"],
    ["Violin bowing with vibration feedback", "Improved; half kept the gain without feedback", "[@vanderlinden2011]"],
    ["Feeling a drum and strength cue on the body", "96.18% recognised", "[@leechoi]"],
    ["Piano: vibration vs visual cues (n = 14)", "Timing error 12.1% vs 22.3%", "[@coscia2024]"],
    ["Feedback on half the trials vs every trial", "Worse in practice, better retention", "[@winstein1990]"],
    ["Following a beat by touch vs sound (simple rhythms)", "Touch close to sound", "[@ammirante2016]"],
  ], { size: 16 }));
  add(H2("6.2 What we validate before the finale"));
  add(P("These four short experiments answer the questions that could break the idea. They are not a full learning study; they **validate the critical feasibility questions that justify one**. Protocols and consent forms are in Appendices A–C, and the analysis code is ready."));
  add(T([0.5, 2, 2.4, 0.6, 1.6], ["#", "Question", "How", "People", "Success [Target]"], [
    ["E1", "Can we tell masters apart?", "3 players (at least 2 gurus or senior teachers) × 20 cycles of Teentaal; computer tells players apart cycle by cycle", "3", "≥ 70% correct (chance 33%), not due to luck (p < 0.01)"],
    ["E2", "Can a cue be felt while playing?", "Weakest cue felt at rest vs while playing; wrist vs forearm", "8", "Needs at most twice the strength while playing"],
    ["E3", "Can people tell two masters apart by touch and sound?", "Hear and feel A, B, then X: is X like A or B? 20 rounds", "10", "≥ 15 of 20 right (unlikely by chance, p = 0.02)"],
    ["E4", "Can players read the cues while playing?", "40 cues while playing a theka", "8–10", "≥ 90% of strokes, ≥ 80% of strengths"],
  ], { size: 16 }));
  add(H2("6.3 What we will not claim"));
  add(BL([
    "That PARAMPARA transmits a guru's 'soul' or 'feel'. We measure and teach **observable** parts of a master's style.",
    "That it replaces the guru. The guru records, approves and controls.",
    "That a small pilot proves long-term learning. That needs the larger trial in the roadmap.",
  ]));

  // ---------------------------------------------------------------- 7
  add(H1("7. Feasibility"));
  add(H2("7.1 Four-week plan"));
  add(T([0.6, 3.2, 2.2], ["Week", "Build", "Proof produced"], [
    ["1", "Base unit: sensors, stroke detection, logging. Contact gurus (Appendix A).", "Stroke detection checked against slow-motion video"],
    ["2", "Cuffs: four motors, cue timing; check-cycle and fade logic", "E2 and E4 done"],
    ["3", "Record masters; fingerprint view; consent and signing", "E1 done"],
    ["4", "Full demo; E3; small trial with 5–8 people; rehearse; backup video", "E3 done; demo runs 3 times without help"],
  ]));
  add(H2("7.2 Team of six"));
  add(T([1.5, 4.5], ["Role", "Owns"], [
    ["Hardware", "Base unit, cuffs, power, straps"], ["Firmware", "Stroke detection, cue timing, radio"],
    ["App", "Fingerprint view, lessons, scores, consent screens"], ["Analysis", "Fingerprint statistics, fade rule, experiments"],
    ["Research and guru liaison", "Guru outreach, consent, E1–E4 sessions"], ["Pitch", "Deck, demo script, backup video"],
  ], { boldFirstCol: true }));
  add(H2("7.3 Top risks"));
  add(T([2, 2.6, 2], ["Risk", "What we do", "Fallback"], [
    ["No guru available in time", "Start outreach in week 1 through music colleges, Zonal Cultural Centres and local teachers", "Senior students of two different teachers, stated clearly"],
    ["Masters not distinguishable (E1)", "Record 30 cycles; add hand-movement features", "Drop the style claim; teach structure and laya"],
    ["Cues hard to feel while playing (E2)", "Earlier, stronger cues; choose the better site", "Forearm site; two strength levels"],
    ["The two drums trigger each other's sensor", "Foam isolation; simple 'stronger sensor wins' rule", "Practice pad with separated zones"],
    ["Radio interference at the venue", "Cues are stored on the cuffs in advance", "USB cable; backup video"],
  ], { size: 16 }));
  add(P("Every part is available off the shelf, the riskiest questions are answered in weeks 2–3, and each has a fallback. **This is buildable in four weeks.**"));

  // ---------------------------------------------------------------- 8
  add(H1("8. Viability: institution-first deployment"));
  add(P("**Our initial deployment model is institution-first, because hardware cost and the need to protect gurus' content make direct-to-consumer sales premature.**"));
  add(T([1.7, 2.3, 2.4], ["Partner", "What already exists", "What PARAMPARA adds"], [
    ["Zonal Cultural Centres", "Guru-Shishya Parampara: year-long honoraria, e.g. ₹7,500 a month for a guru [@gsp]", "One kit per sanctioned guru; recorded fingerprints as lasting output"],
    ["Schools", "CBSE percussion subject 036; Kala Utsav [@cbse036; @kalautsav]", "Shared kits for music rooms"],
    ["National archive (NCAA, IGNCA)", "Certified trusted digital repository for audio and video [@ncaa]", "A new kind of record: how masters play"],
    ["Sangeet Natak Akademi", "Scheme and national inventory for intangible heritage [@snaich]", "Verifiable, consented records"],
    ["AICTE IKS Division", "Indian Knowledge Systems programmes in higher education [@iks]", "Lab kits and student projects"],
  ], { size: 16 }));
  add(BL([
    "**Cost:** about ₹6,000–7,500 for the prototype; less than one month of a guru's state honorarium [@gsp]. A custom board would bring the cost down further (roadmap).",
    "**Who pays:** institutions buy kits and a yearly licence; consenting gurus receive a share whenever their recordings are used; grants and CSR support preservation. These models are still to be tested with partners.",
    "**Rules:** consent is explicit and recorded; data stays on the device or the user's app by default, in line with India's data protection law [@dpdp]; performers' rights are respected [@copyright1957].",
  ]));

  // ---------------------------------------------------------------- 9
  add(H1("9. Impact"));
  add(T([1.3, 2.7, 2.3], ["Who", "Benefit", "How we will measure it"], [
    ["Gurus", "Their own style is preserved, credited and shared on their terms", "Gurus recorded; their feedback"],
    ["Students", "Practise against a real master between lessons, and see honest progress", "Unaided score after a break"],
    ["Archives", "A record of how masters play, not only how they sound", "Consented fingerprints deposited"],
    ["Researchers", "A consented dataset linking masters' styles with learners' progress", "Dataset and publications"],
  ], { size: 16, boldFirstCol: true }));
  add(H3("First-year targets [Target]"));
  add(T([2.6, 1.6, 2], ["Measure", "Target", "Source of the number"], [
    ["Masters recorded with consent", "10, across 3 gharanas", "Recording register"],
    ["Students completing a 2-week programme", "100", "App records"],
    ["Unaided score vs video-only practice", "Clearly better, with confidence interval", "Learning trial"],
    ["Institutions piloting", "3", "Signed agreements"],
  ]));
  add(P("**Possible wider benefit, not yet tested:** deaf people can follow a beat through vibration [@tranchant2017], and India has about 50.7 lakh people with hearing disability [@census2011]. A future study could open rhythm learning to them."));

  // ---------------------------------------------------------------- 10
  add(H1("10. The pitch: what the jury will see and hear"));
  add(H2("10.1 Six things the jury should remember"));
  add(NL([
    "A guru has a unique playing style.",
    "We measure it.",
    "We teach it through touch and sound.",
    "We gradually remove the help.",
    "We prove the student can play without us.",
    "The guru owns and controls the recorded legacy.",
  ]));
  add(H2("10.2 Three-minute demo"));
  add(T([0.9, 4.8], ["Time", "What happens"], [
    ["0:00–0:20", "'Every master plays the same theka differently. Archives keep their sound. Nothing keeps their hands.'"],
    ["0:20–1:00", "Two masters' fingerprints on screen. The judge hears and feels both, and guesses which is which."],
    ["1:00–2:10", "The judge wears the cuff and plays along. Cues fade. A check cycle runs with the device silent. The unaided score appears. 'The device succeeds only when it is no longer needed.'"],
    ["2:10–2:35", "The guru's consent: approved with a phone fingerprint; an edited copy is rejected."],
    ["2:35–3:00", "Results of E1–E4, and the plan: institutions first, then more art forms."],
  ], { boldFirstCol: true }));
  add(H2("10.3 Hard questions"));
  add(T([2.2, 4.2], ["Question", "Answer"], [
    ["Why not just watch YouTube?", "Video shows what the guru does. We measure the student's own playing against the master and remove help step by step until they play alone."],
    ["Isn't this a fancy metronome?", "A metronome gives everyone the same grid. We teach one master's strokes, accents and timing, and E1 shows masters really differ."],
    ["Can vibration carry tiny timing differences?", "No, and we don't ask it to. Touch carries hand, stroke and accent; the ear carries fine timing [@friberg1995; @lauzon2020]."],
    ["Doesn't playing drown out the vibration?", "It can, so cues end just before the hand moves and are strong [@williams1998]. E2 measures it."],
    ["Won't students depend on the cuff?", "Cues fade out, and we only count the score with the device silent [@winstein1990]."],
    ["Why all this about consent?", "So the guru controls how their legacy is used and is credited. It costs one fingerprint touch."],
    ["Which guru gave you the data?", "Named in the deck, with their consent form and fingerprint (Appendix A)."],
    ["Is it new?", "Related work teaches rhythm by vibration or recognises gharanas from audio. None measures a master's fingerprint and teaches it back with fading and consent (Section 3.3)."],
    ["Does it replace the guru?", "No. It extends the guru's reach between lessons, under the guru's control."],
    ["What if E1 fails?", "We drop the style claim, keep structure and laya teaching, and say so."],
  ], { size: 16 }));

  // ---------------------------------------------------------------- 11
  add(H1("11. Limits we state openly"));
  add(BL([
    "**Narrow capture:** strokes, accents, timing and arm movement only; not finger shape or tone colour.",
    "**Touch has limits:** four sites and two or three strength levels; slow-to-medium tempo for now.",
    "**Small first studies:** E1–E4 test feasibility, not long-term learning.",
    "**Fingerprint size is unknown until E1.** If it is small, Level 3 waits.",
    "**Copying cannot be fully prevented;** consent and credit are recorded, and licences are contractual.",
    "**Some gurus may not want to be recorded.** Their choice decides what we do.",
  ]));

  // ---------------------------------------------------------------- 12
  add(H1("12. Roadmap after SIH"));
  add(T([1.5, 3.2, 1.8], ["When", "What", "Starts only if"], [
    ["0–6 months", "Learning trial with about 120 people: video, video + metronome, PARAMPARA with fixed fading, PARAMPARA with check-cycle fading [@cohen1988]", "E1–E4 pass"],
    ["0–6 months", "Custom circuit board and lower cost; stroke recognition on the device trained on public tabla data [@rohit2023]", "MVP stable"],
    ["6–12 months", "Level 3 (style); archive pilot with NCAA [@ncaa]; 'Feel the Gharanas' exhibition kiosk", "E1 shows clear fingerprints"],
    ["12+ months", "Kathak footwork, then pakhawaj and mridangam; later pottery and puppetry [@manitsaris2014; @yamane2004]", "Tabla deployment working"],
  ], { size: 16 }));

  // ---------------------------------------------------------------- Appendices (execution kit)
  out.push("__APPENDIX__");
  add(H1("Appendix A. Guru partner kit", true));
  add(H2("A.1 Whom to approach"));
  add(BL([
    "Tabla faculty at a music college or university department.",
    "Gurus empanelled with a Zonal Cultural Centre under Guru-Shishya Parampara [@gsp].",
    "Teachers at Gandharva Mahavidyalaya or Prayag Sangeet Samiti affiliated centres [@abgmvm].",
    "Established local teachers with senior students (useful for E1's third player).",
  ]));
  add(H2("A.2 Outreach message"));
  add(Box(null, [
    "*Respected Guruji, we are engineering students building PARAMPARA for Smart India Hackathon 2026. It records how a master plays a theka (timing, accents and strokes) so that students can practise against it, with the guru's consent and credit. We would be grateful for 30 minutes of your time to record a Teentaal theka on your own tabla. Nothing is attached to your hands. You decide how the recording may be used, you will receive a copy, and you can withdraw it at any time.*",
    "*Pranam Guruji, hum engineering students hain aur Smart India Hackathon 2026 ke liye PARAMPARA bana rahe hain. Isme guru ka theka bajane ka tareeka (timing, zor aur bol) record hota hai, taaki shishya uske saath abhyas kar sakein, guru ki anumati aur naam ke saath. Kya aap 30 minute de sakte hain? Aap apne hi tabla pe Teentaal theka bajaenge, haath pe kuch nahi lagega. Recording ka upyog aap tay karenge, aapko copy milegi, aur aap kabhi bhi wapas le sakte hain.*",
  ]));
  add(H2("A.3 Consent form (plain language)"));
  add(T([4.6, 1.2], ["I agree that…", "Yes / No"], [
    ["my playing of the Teentaal theka may be recorded with sensors on the tabla and a motion sensor on my wrist", "☐ / ☐"],
    ["the recording may be used to teach students through PARAMPARA", "☐ / ☐"],
    ["my name and gharana may be shown with the recording", "☐ / ☐"],
    ["the recording may be shown at Smart India Hackathon 2026", "☐ / ☐"],
    ["the recording may be used commercially (only with a separate written agreement)", "☐ / ☐"],
    ["a person I name may manage the recording after me: ______________", "☐ / ☐"],
    ["I understand I can withdraw at any time, and I will receive a copy of my recording", "☐"],
  ], { size: 16 }));
  add(P("Signature, date and witness. A spoken consent recording in the guru's language is kept with the form. Institute ethics approval is obtained before recording students (E2–E4)."));
  add(H2("A.4 What the guru receives"));
  add(BL(["A copy of their recording and fingerprint.", "Credit wherever it is used.", "Control: approve, limit or withdraw.", "A share of any future licence income, as agreed in writing."]));

  add(H1("Appendix B. Experiment E1 protocol: telling masters apart"));
  add(NL([
    "**Set-up:** base unit on the player's own tabla; wrist cuffs on; quiet room; tuning noted.",
    "**Warm-up:** 2 minutes of free playing.",
    "**Recording:** Teentaal theka at 80 beats per minute with a soft click for the first cycle only; at least 20 uninterrupted cycles (about 4 minutes). Optional: 10 cycles each at 60 and 100 beats per minute.",
    "**Repeat** for each of the three players, in random order.",
    "**Export** one row per stroke to a CSV file with the columns: guru, cycle, matra, onset_ms, amp.",
    "**Analyse:** `python3 PARAMPARA/sim/fingerprint.py analyze strokes.csv`. The script leaves out one cycle at a time, predicts its player from the rest, and repeats the whole test 1,000 times with shuffled names to check the result is not luck.",
    "**Report:** accuracy, chance level (33%), p-value, and each player's accent and timing profile with error bars.",
  ]));
  add(P("**Success, decided before recording:** accuracy ≥ 70% with p < 0.01. **If not met:** we report it and drop the style claim (Section 3.4)."));
  add(Box("Result template for the deck", ["Masters A, B, C · 20 cycles each · identified correctly in ___% of cycles (chance 33%), p = ___ · biggest differences at matras ___ (accent) and ___ (timing)."], COLOR.blue, "EEF3F8"));

  add(H1("Appendix C. Experiments E2–E4 protocols"));
  add(T([0.5, 2.4, 2.4, 1.4], ["#", "Procedure", "Measure", "Success [Target]"], [
    ["E2", "Find the weakest cue each person can feel (up-down method), at rest and while playing a slow theka; wrist and forearm; cue before vs on the beat", "Ratio of 'while playing' to 'at rest' strength", "≤ 2 in at least one condition"],
    ["E3", "Play A (master 1), B (master 2), then X (one of them, random). Answer 'A or B'. 20 rounds with touch only, 20 with touch and sound", "Correct answers out of 20", "≥ 15 of 20 (p = 0.02)"],
    ["E4", "While playing a theka, 40 random cues: 5 stroke kinds × 2–3 strengths; player calls out what they felt", "Percentage correct", "≥ 90% strokes, ≥ 80% strengths"],
  ], { size: 16 }));
  add(P("All are short, low-risk tasks: 20–30 minutes per person, seated, with comfortable vibration levels and the right to stop at any time. Written consent and the institute's ethics process apply."));

  add(H1("Appendix D. Demo day checklist"));
  add(BL([
    "Two spare cuffs, spare batteries, USB power bank and cables.",
    "Practice pad as well as a tabla.",
    "Pre-calibrated judge profile with a 20-second re-check.",
    "Offline copy of the app on the demo laptop (Chrome).",
    "Two masters' fingerprints loaded; one signed recording and one edited copy.",
    "Printed one-page architecture and the guru's consent summary.",
    "Backup video of the full demo.",
    "Three full rehearsals completed without help.",
  ]));

  add(H1("Appendix E. Simulations (planning tools, not evidence of learning)"));
  add(H2("E.1 How much to record for E1"));
  add(Fig(fig("fingerprint_power.png"), 600, 260, "Figure E1. Simulation with assumed variation between cycles (15 ms, 1.5 dB). With 20 cycles per player, players whose profiles differ by about 6 ms and 0.6 dB per beat are told apart about 80% of the time; at 10 ms, about 96%."));
  add(P("This sets the recording length (**at least 20 cycles per player**). The real difference between masters is unknown until E1."));
  add(H2("E.2 Does fading by check cycles help?"));
  add(P("We simulated 1,000 learners over three practice days with overnight forgetting and very different learning speeds, under three different assumptions about how guidance affects learning."));
  add(T([2.6, 1.1, 1.1, 1.1], ["Unaided score on day 4 (simulated)", "Assumption A", "Assumption B", "Assumption C"], [
    ["Cues always on", "0.48", "0.42", "0.57"], ["No cues", "0.46", "0.58", "0.71"],
    ["Fixed fade", "0.67", "0.63", "0.68"], ["Check-cycle fade (PARAMPARA)", "0.69", "0.65", "0.68"],
  ], { boldFirstCol: true }));
  add(P("Cues that never stop do poorly under every assumption. Check-cycle fading did slightly better than a fixed fade under two assumptions (+0.015, 95% CI 0.013–0.017) and equally under the third. The gain is small and depends on the assumptions, so the learning trial tests it on people. Code: `PARAMPARA/sim/fade_engine_sim_v2.py`."));

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
    ["Stroke sensor sampling", "≥ 4,000 times per second"], ["Fingerprint recording", "≥ 20 cycles of Teentaal at 80 beats/min"],
    ["Cue length", "30–80 ms"], ["Cue strength", "≥ 3 × the person's weakest felt level"],
    ["Cue ends before hand lift", "about 100 ms (measured per person)"], ["Check cycles", "session start + every 4 cycles"],
    ["Target to move on", "unaided score ≥ 85% on 2 days + guru approval"], ["Supported tempo (MVP)", "at least 0.4 s between strokes"],
  ], { size: 16 }));
  return out;
};
