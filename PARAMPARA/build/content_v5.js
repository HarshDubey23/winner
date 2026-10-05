// PARAMPARA final solution document, v5: exact equipment (CAD, datasheets, budgets, bench tests),
// a real-data test on 10 drummers, tabla as the proven flagship, handloom and puppetry as generalisation demos.
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
    ["4", "The equipment, exactly: drawings, datasheets, budgets and bench tests"],
    ["5", "How it works: Fingerprint, Teach, Fade, Measure, Own"],
    ["6", "Evidence today: a real-data test on ten drummers"], ["7", "Validation plan: E0–E5"],
    ["8", "What we build for SIH"], ["9", "Evidence from published research"], ["10", "Feasibility"],
    ["11", "Viability: institution-first, craft by craft"], ["12", "Impact"], ["13", "The pitch"],
    ["14", "Limits we state openly"], ["15", "Roadmap after SIH"], ["16", "References"],
    ["A–G", "Execution kit: partner kit, E1 protocol, other protocols, demo checklist, simulations, reference check and parameters, CAD and code index"],
  ], { size: 18, cantSplit: true }));
  add(P("Citations like [12] point to Section 16. Every reference carries a status: **V** verified by live web search in October 2026, **P** existence verified with some details from memory, **S** a standard textbook or classic paper. Numbers we have not yet measured are marked **[Target]**; engineering estimates are marked **[Estimate]**. All equipment images are **CAD renders of our design, not photographs**.", { size: 18, color: COLOR.grey }));

  // ---------------------------------------------------------------- 1
  add(H1("1. The idea on one page", true));
  add(Box("The problem", [
    "In tabla, handloom weaving and string puppetry, a master's skill lives in the hands and arms: which finger moves, how the wrist, elbow and shoulder work together, and the rhythm of it all. It passes on only face to face, over years. India's handloom workforce fell from 43.32 lakh to 35.22 lakh between the last two censuses [@handloomcensus]; Delhi's puppeteer colony was demolished in 2017 [@kathputlicolony]; and archives keep how masters **sound and look** [@ncaa], not how they **move**.",
  ]));
  add(Box("Our one innovation", [
    "**A master's Skill Fingerprint: a measured, consented record of how one master moves (every finger, the wrist, elbow and shoulder) and what their tool does, proven to belong to the master and not to their instrument or the day, and used as a teaching reference.**",
    "**Tabla is the flagship**, validated end to end. Handloom and puppetry are **generalisation demonstrations** of the same sleeve and the same code.",
  ], ...BLUE));
  add(Fig(fig("v4_pipeline.png"), 600, 209, "Figure 1. Five steps, plus ownership by the master."));
  add(H3("Why three crafts, and why these three"));
  add(T([1.2, 1.9, 2.2, 1.8], ["Craft", "Kind of skill", "What the tool sensor measures", "The 'cycle' we compare"], [
    ["Tabla (flagship)", "Fast striking rhythm", "A piezo on each drum: stroke time and strength", "One tal cycle (16 beats of Teentaal)"],
    ["Handloom (demo)", "Whole-arm coordination and force in a steady rhythm", "Beater motion, treadle switches, a phone photo of the cloth", "One pick: open the shed, throw, beat"],
    ["String puppetry (demo)", "Fine, expressive finger control", "A small motion sensor inside the puppet", "One gesture phrase, e.g. a walk or a bow"],
  ], { size: 16, boldFirstCol: true }));
  add(P("A strike, a coordinated cycle and a fine expressive gesture are three different kinds of hand skill. If one sleeve and one pipeline handle all three, they can serve most hand crafts. The demos test only the two riskiest questions for each craft (E0 and E1), so the team's effort stays on the flagship."));
  add(H3("What the jury will see live"));
  add(NL([
    "**The sleeve.** The judge wears it, plays a tabla phrase or moves a Kathputli puppet, and feels which finger and which joint to move.",
    "**The proof.** Real masters' fingerprints, and the test showing they belong to the master, not to the instrument or the day.",
    "**Device off.** Cues fade, the judge performs alone, and the screen shows the unaided score.",
  ]));
  add(Box("Evidence status, stated plainly", [
    "**Done today:** (1) a **real-data test** on 10 professional drummers (Groove MIDI Dataset): playing style named the drummer at about three times chance on a **new recording session** and in a **new musical style**; with identical written grooves, 'how they play' named the drummer in 63% of cases (chance 25%) while 'which notes' did not (26%) (Section 6). (2) The complete equipment design: CAD models, datasheet-checked parts, power, data, mass and bus budgets, and eight bench tests (Section 4). (3) Open code for the fingerprint, the confound test and the fade rule. (4) Protocols, consent forms and pass/fail rules written before any data.",
    "**Not yet done:** recordings of real tabla masters, results of E0–E5, a built sleeve, signed partner agreements. **We claim none of these until they exist.** The real-data test also tells us honestly that timing alone sits **near** our pass mark, which is why the sleeve's movement data matters.",
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
    ["Puppetry", "Four families of puppetry: string, shadow, rod and glove. In Kathputli the strings are looped on the puppeteer's fingers, with no control bar. Delhi's Kathputli Colony (about 2,800 families of folk artists) was moved to a transit camp in 2017.", "[@puppetforms; @wepakathputli; @kathputli; @kathputlicolony]"],
    ["Policy", "The State pays gurus to teach in person (Guru-Shishya Parampara), runs a scheme for intangible heritage, and counts about 64.66 lakh handloom and handicraft artisans. India has 16 elements on UNESCO's intangible heritage list.", "[@gsp; @snaich; @handicrafts; @deepavali2025]"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("2.3 Why existing tools fall short"));
  add(T([1.6, 2.4, 2.4], ["Tool", "What it does well", "What it cannot do"], [
    ["Video lessons and apps", "Show the master's hands [@apps]", "Measure the learner; check learning without help"],
    ["Training centres and Guru-Shishya Parampara", "The gold standard: a master in the room [@gsp; @wsc]", "Reach beyond one room, one master's time and one lifetime"],
    ["Motion-capture and haptic suits", "Measure body movement; US$5,000 to over US$12,000 [@xsens; @teslasuit]", "Teach a specific master's way at a school's budget; prove unaided learning"],
    ["European craft-capture projects", "Capture and represent craft gestures [@mingei; @craeft]", "Teach one master's fingerprint through a wearable that fades out"],
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
  add(P("The fingerprint is the average and spread of these features over at least 20 cycles. **Only features that pass the confound test (Section 7) are used for teaching.**"));
  add(H2("3.2 Why the whole arm, not only the hand"));
  add(T([3.2, 2.2, 0.8], ["Published finding", "Meaning for us", "Source"], [
    ["Expert pianists move shoulder, then elbow, then wrist in a clear sequence; novices do not", "Expertise shows in how the joints are ordered", "[@furuya2007]"],
    ["Experts let the arm's own motion do work at the elbow and wrist, so their muscles do less", "Efficient technique is visible in the whole arm", "[@furuya2008]"],
    ["Four drummers played the same accent with individual movement strategies", "Movement carries personal style", "[@dahl2004]"],
    ["Eight people were told apart from accelerometer gestures (98.6% recognition), used for user authentication", "Movement alone can identify a person", "[@uwave2009]"],
    ["Vibration at the joints in error cut real-time error by up to 27% and sped learning up to 23%", "Joint-level touch cues work; that study needed an optical lab", "[@tikl2007]"],
    ["76% of handloom weavers in a Varanasi survey reported shoulder pain", "Measuring the shoulder also matters for health", "[@siddiqui2021]"],
  ], { size: 16 }));
  add(H2("3.3 Why we believe a fingerprint exists"));
  add(T([3.2, 2.2, 0.8], ["Finding", "Meaning for us", "Source"], [
    ["**Our own test on real data:** drummers named from timing and loudness on a new session and in a new style at about 3 × chance; identical grooves, different drummers, 63% vs 25% chance", "A performer fingerprint survives a change of day and of music", "Section 6 [@gmd2019]"],
    ["Tabla gharanas recognised automatically from audio of solo performances (38+ hours)", "Style leaves a measurable trace", "[@gowriprasad2021]"],
    ["Systematic accent and tempo patterns within the tal cycle in a large Hindustani corpus", "Accent and timing shapes are measurable", "[@srinivasamurthy2017]"],
    ["Pianists identified from timing and loudness; famous drummers each have a timing fingerprint", "Performers can be told apart", "[@stamatatos2005; @repp1992; @carter2025]"],
  ], { size: 16 }));
  add(H2("3.4 What is new"));
  add(T([2.1, 2.2, 2.3], ["Closest existing work", "What it does", "What it does not do"], [
    ["TIKL vibrotactile suit [@tikl2007]", "Joint-level vibration to correct arm poses", "Use a low-cost wearable (it used an optical lab); capture fingers; teach a specific master; fade; test device-off"],
    ["Teslasuit, Xsens suits [@teslasuit; @xsens]", "Body motion capture (and haptics)", "Teach; prove the learner can perform alone; fit a school or weaving centre's budget"],
    ["Mingei, CRAEFT [@mingei; @craeft; @zabulis2020]", "Capture and represent craft gestures, simulators, haptics", "A wearable that teaches one master's fingerprint and withdraws itself"],
    ["Pottery gesture capture, i-Treasures [@manitsaris2014; @itreasures]", "Recognise expert gestures with body sensors", "Teach them back with fading and device-off measurement"],
    ["Haptic Drum Kit and bracelets [@holland2010; @holland2018]", "Vibration cues for which limb plays", "Finger-level cues; a specific master's style; retention"],
    ["Open-palm data glove [@hosie2025]", "Accurate finger tracking with the palm free", "Teaching or a master reference"],
  ], { size: 16 }));
  add(Box("Novelty statement", [
    "*\"To our knowledge, PARAMPARA is the first low-cost wearable that captures an individual master's skill fingerprint from fingers to shoulder together with what the tool does, proves that the fingerprint belongs to the master rather than to the instrument or the session, teaches it back through finger- and joint-level touch with sound and a ghost arm, withdraws the help as the learner improves, and counts only device-off performance, under the master's consent.\"*",
  ], ...BLUE));

  // ---------------------------------------------------------------- 4
  add(H1("4. The equipment, exactly: drawings, datasheets, budgets and bench tests", true));
  add(P("Every view below is rendered from our CAD model (CadQuery, open source). Housing sizes are design values; electronic part sizes and ratings are taken from the manufacturers' datasheets. The arm, loom and puppet are stylised so the equipment can be seen; the equipment itself is drawn at its real size."));
  add(H2("4.1 The sleeve at a glance"));
  add(Fig(fig("v5_sleeve_views.png"), 600, 380, "Figure 2. One sleeve per arm. (a) Isometric view. (b) Top view to scale. Blue lids are motion sensors, gold lids are vibration motors, green is the hub."));
  add(T([1.7, 0.5, 2.3, 1.7], ["Unit (per arm)", "Qty", "Contents", "Placement"], [
    ["Finger ring IMU pod", "5", "BMI270 on a 10 × 8 mm board", "Middle segment of each finger, top of the thumb's first segment"],
    ["Finger motor pod", "5", "8 mm coin LRA", "First segment of each finger; thumb base"],
    ["Hand board", "1", "BMI270, TCA9548A, 5 × DRV2605L", "Back of the hand, on a fabric plate with a thumb loop"],
    ["Wrist pod", "1", "BMI270 + LRA", "Back of the lower forearm (measures forearm rotation)"],
    ["Elbow motor pod", "1", "LRA", "Back of the elbow"],
    ["Upper-arm pod", "1", "BMI270", "Middle of the upper arm"],
    ["Shoulder pod", "1", "BMI270 + LRA", "Top of the shoulder"],
    ["Hub", "1", "ESP32-S3-MINI-1, TCA9548A, 3 × DRV2605L, charger, microSD, LiPo", "Back of the upper forearm, in a sleeve pocket with a strap"],
  ], { size: 15, boldFirstCol: true, keep: true }));
  add(P("**Per arm: 9 motion sensors and 8 vibration motors**, wired to two I2C buses (Section 4.5)."));
  add(H2("4.2 The hand: fingertips and palm stay free"));
  add(Fig(fig("v5_hand_views.png"), 560, 537, "Figure 3. (a) Hand close-up. (b) Palm side: nothing covers the palm or fingertips, so the touch on the drum, the thread or the string is unchanged. (c) Side view: the tallest finger part is the 5.2 mm motor pod."));
  add(H2("4.3 Inside each housing"));
  add(Fig(fig("v5_pods_exploded.png"), 560, 607, "Figure 4. Exploded views. (a) Finger ring IMU pod. (b) Finger motor pod. (c) Hand board. (d) Forearm hub. (e) All housings to the same scale."));
  add(T([1.5, 2.9, 1.5, 0.7], ["Part", "Datasheet facts we rely on", "Why this part", "Source"], [
    ["BMI270 IMU", "2.5 × 3.0 × 0.83 mm; 16-bit accelerometer and gyroscope; 685 µA; 2 KB FIFO; I2C addresses 0x68/0x69", "Small enough for a finger ring; FIFO lets the hub read in bursts", "[@bmi270]"],
    ["DRV2605L haptic driver", "2–5.2 V; 3 × 3 mm; closed-loop LRA auto-resonance; fixed I2C address 0x5A", "Crisp, repeatable pulses whatever the motor's tolerance", "[@drv2605lds; @drv2605l]"],
    ["TCA9548A I2C switch", "8 channels; 0x70–0x77; 100/400 kHz", "Lets eight drivers with the same address share one bus", "[@tca9548a]"],
    ["ESP32-S3-MINI-1", "15.4 × 20.5 × 2.4 mm; dual core 240 MHz; Wi-Fi and Bluetooth 5", "Two I2C buses, radio, enough speed for filtering", "[@esp32s3mini]"],
    ["C08-005 coin LRA", "8 × 3.3 mm; 235 Hz; 1.8 V; 75 mA typical; 1.28 G", "235 Hz sits where skin is most sensitive to vibration (Pacinian channel)", "[@c08005; @bolanowski1988]"],
    ["MCP73831 charger", "SOT-23-5; 15–500 mA programmable; 4.20 V", "Safe single-cell charging over USB-C", "[@mcp73831]"],
    ["7BB-27-4L0 piezo (tabla)", "27 mm × 0.54 mm; 4.6 kHz; 20 nF", "Contact pickup on the drum shell, no change to the head", "[@murata7bb]"],
  ], { size: 15, boldFirstCol: true }));
  add(H2("4.4 Dimensioned drawings"));
  add(Fig(fig("v5_drawings.png"), 600, 360, "Figure 5. Ring pod and hub with key dimensions (mm), and the hub's height stack-up."));
  add(H2("4.5 Electronics"));
  add(Fig(fig("v5_block_diagram.png"), 600, 330, "Figure 6. Two I2C buses per sleeve. Each finger shares one switch channel between its ring IMU and its motor driver."));
  add(P("**Why two buses and a switch on each.** The DRV2605L has a fixed address, so eight drivers cannot share one bus without a switch [@drv2605lds; @tca9548a]. Each switch channel also isolates its own short cable segment: the longest (hub to shoulder, about 45 cm) adds well under 100 pF, far below the I2C limit of 400 pF per line [@um10204]."));
  add(H2("4.6 Engineering budgets"));
  add(T([1.5, 3.3, 1.5], ["Budget", "Calculation", "Result"], [
    ["Data (per sleeve)", "9 IMUs × 12 bytes × 200 samples/s = 21.6 kB/s. Hand bus: 6 IMUs = 14.4 kB/s, about 36% of a 400 kHz bus; arm bus: 3 IMUs = 7.2 kB/s, about 18%", "Fits, with FIFO burst reads [@bmi270]"],
    ["Radio (two sleeves)", "2 × 21.6 kB/s ≈ 350 kbit/s to a USB receiver; a full-rate copy is also written to each hub's microSD card", "Fits; no data lost if radio drops [Target]"],
    ["Power (per sleeve)", "ESP32-S3 with radio ≈ 110 mA [@esp32s3power] + 9 × 0.685 mA IMUs [@bmi270] + motors 75 mA at ≤ 20% duty ≈ 15 mA [@c08005] + microSD ≈ 10 mA → ≈ 142 mA. 1,000 mAh × 80% usable ÷ 142 mA", "≈ 5.6 h [Estimate]; pass mark ≥ 3 h (H5)"],
    ["Mass (per arm)", "Housings from CAD volume at 1.01 g/cm³ (PA12): ring 0.4 g, motor pod 0.4 g, joint pod 1.9 g, hand board 4.4 g, hub 15.4 g; plus boards, motors, 1,000 mAh cell (≈ 20 g), cables and fabric", "≈ 160 g per arm, ≈ 30 g on the hand and fingers [Estimate]"],
    ["Bus capacitance", "45 cm of thin cable (≤ 100 pF/m) + 2 devices (≈ 10 pF each) per channel", "< 100 pF vs 400 pF limit [@um10204]"],
    ["Timing", "Hubs and the tool node share a clock by timestamp exchange with drift correction [@ftsp2004]; tabla piezos sampled by DMA at 16 kHz per channel (driver allows up to 83 kHz) [@espadc]", "Body-to-drum sync ≤ 2 ms [Target] (H3)"],
  ], { size: 15, boldFirstCol: true }));
  add(H2("4.7 Tool kits"));
  add(Fig(fig("v5_tabla_kit.png"), 600, 310, "Figure 7. Tabla kit: a 27 mm piezo disc in a clip on each drum shell, held with removable putty, and a base unit. Drum sizes follow a standard 5.5-inch dayan and 9-inch bayan [@tablasize]."));
  add(Fig(fig("v5_puppet_loom_kits.png"), 600, 370, "Figure 8. (a) Puppetry kit: a 30 × 20 × 10 mm sensor pod in the wooden torso of a Kathputli (typical puppets are 43–58 cm tall [@kathputlisize]); the strings stay on the fingers [@wepakathputli]. (b) Handloom kit on a stylised two-treadle frame loom."));
  add(T([1.1, 2.6, 2.4, 1.3], ["Craft", "Sensors", "What they measure", "Fitting"], [
    ["Tabla", "Two 27 mm piezo discs [@murata7bb]; base unit with ESP32-S3", "Stroke time, strength and drum [@bello2005]", "Clip on the shell, removable putty"],
    ["Handloom", "IMU on the beater; switches under both treadles; phone camera over the cloth; small loom node", "Beat timing and force; treadle order; picks per cm and evenness [@fabricdensity]", "Straps and clamps; nothing on the warp"],
    ["Puppetry", "IMU pod in the torso; finger rings of the sleeve", "Puppet's turn, tilt and movement; the puppeteer's fingers", "Inside the costume; strings untouched"],
  ], { size: 15, boldFirstCol: true }));
  add(H2("4.8 Bench tests before any person uses it"));
  add(T([0.5, 2.0, 2.6, 1.6], ["#", "Test", "Method", "Pass [Target]"], [
    ["H1", "Sampling", "Logic analyser on each bus; 10 minutes at 200 samples/s", "Interval jitter ≤ 0.5 ms; no missed samples"],
    ["H2", "Cue latency", "Accelerometer taped to a motor pod; command to vibration onset, 500 cues", "Latency ≤ 20 ms; jitter ≤ 3 ms"],
    ["H3", "Body-to-drum sync", "Tap the drum head with a sleeved finger 200 times; compare IMU spike with piezo onset", "Difference ≤ 2 ms in 95% of taps"],
    ["H4", "Data integrity", "Two sleeves streaming for 30 minutes; compare radio log with microSD log", "Radio loss < 1%; microSD complete"],
    ["H5", "Battery", "Continuous streaming with cues at 20% duty", "≥ 3 hours"],
    ["H6", "Orientation", "Pods on a 0/30/60/90° jig, static", "Error ≤ 2°"],
    ["H7", "Fit and comfort", "Three hand sizes; donning time; pod temperature after 1 hour; weigh the sleeve", "Donning ≤ 3 min; warming ≤ 5 °C; ≤ 200 g per arm"],
    ["H8", "Stroke detection", "200 tabla strokes labelled from slow-motion video", "Precision and recall ≥ 95%"],
  ], { size: 15 }));
  add(H2("4.9 Safety, hygiene and materials"));
  add(BL([
    "**Low voltage only:** one 3.7 V cell per sleeve with a protected pouch cell and a charger with thermal regulation [@mcp73831]; no mains connection while worn.",
    "**Skin contact:** medical-grade silicone straps; PA12 housings with rounded edges; fabric sleeve washable once pods clip out.",
    "**Comfortable vibration:** cue strength set from each person's own threshold (E2), with a hard maximum in firmware.",
    "**Weight on the hand about 30 g [Estimate]:** E0 checks that it does not change how masters play.",
  ]));
  add(H2("4.10 Open design files"));
  add(P("STEP and STL files for every housing, the CAD script and the render script are in `PARAMPARA/cad` (Appendix G). Anyone can print, inspect or improve them."));

  // ---------------------------------------------------------------- 5
  add(H1("5. How it works: Fingerprint, Teach, Fade, Measure, Own"));
  add(H2("5.1 Fingerprint"));
  add(P("The tool sensor marks each cycle: a tal cycle on tabla, a pick on the loom, a gesture phrase on the puppet. For every cycle the software removes the cycle's overall tempo and size, then stores, for each joint, **when it moves relative to the tool event, which joint leads, how fast and how far**, with the tool features and the rhythm. Averaging over cycles gives the fingerprint; the spread shows the master's consistency. Orientation comes from the Madgwick filter [@madgwick2011] after a 20-second N-pose calibration [@npose]. Because shoulder angles from body-worn sensors can be off by 10–20° [@imuvalid], the fingerprint relies mainly on timing, order and speed, and E1 re-fits the sleeve on each day so placement error is tested, not assumed away."));
  add(H2("5.2 Teach: each sense does what it is best at"));
  add(T([1.3, 2.4, 2.6], ["Sense", "What it carries", "Why"], [
    ["Touch: finger and joint motors", "Which finger moves next; which joint should lead or is lagging; how strong the accent is", "Joint-level vibration improved arm learning [@tikl2007]; drum and strength cues were recognised 96% of the time [@leechoi]"],
    ["Hearing", "Exact timing: the master's tiny early and late shifts", "The ear notices about 10 ms [@friberg1995]; the skin needs 10–30 ms or more [@lauzon2020]"],
    ["Sight: ghost arm", "The master's arm as a moving figure over the learner's; replay after each cycle", "Visual feedback suits movement shape and review [@sigrist2013]"],
  ], { size: 16, boldFirstCol: true }));
  add(P("**Timing the cue.** Touch is dulled on a limb that is about to move [@williams1998; @juravle2017], so each cue ends just before the movement and is set well above the learner's threshold."));
  add(T([1.2, 2.6, 2.4], ["Level", "What the learner learns", "Moves on when"], [
    ["1. Structure", "The pattern: which finger, which joint, which stroke or step", "Performs it without cues, 80% correct"],
    ["2. Steady rhythm", "Keeping the cycle steady while cues fade out", "Unaided score ≥ 85% on two different days"],
    ["3. Style", "This master's own timing, accents and joint order", "Matches the master's fingerprint and the master approves (only where E1 passes)"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("5.3 Fade"));
  add(P("Feedback given less often leads to better long-term learning, even though practice feels harder [@salmoni1984; @winstein1990]. At the start of each session and every four cycles the learner performs one cycle with **no cues**. Better check cycles mean fewer cues; two struggles in a row bring cues back a little; reaching the target on two different days asks the master to approve the next level."));
  add(H2("5.4 Measure: with the device off"));
  add(P("Learning means what the learner can do **after a break and without help** [@schmidtlee]."));
  add(T([1.1, 4.4], ["Craft", "Unaided score (device silent)"], [
    ["Tabla", "Timing, accent and stroke accuracy against the master's reference; steadiness and early/late tendency reported separately [@repp2005]"],
    ["Handloom", "Evenness of picks per cm (phone photo), steadiness of the beat, correct treadle–throw–beat order; time with the shoulder raised reported for health"],
    ["Puppetry", "How closely the puppet's motion follows the master's (after time alignment), and whether viewers pick it as the master's"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("5.5 Own: consent and credit stay with the master"));
  add(BL([
    "The master decides how the recording may be used (teaching, sharing, commercial use, time limit) and can withdraw it.",
    "The master approves each recording and each learner's progress with the fingerprint sensor on their own phone; the key never leaves the phone [@webauthn3].",
    "Credit and terms travel with the data as machine-readable labels [@localcontexts]; an edited copy fails verification.",
    "This follows UNESCO's ethical principles (free, prior and informed consent) and the CARE principles [@unesco2015; @care2020].",
  ]));

  // ---------------------------------------------------------------- 6
  add(H1("6. Evidence today: a real-data test on ten drummers", true));
  add(P("We could not record tabla masters before this document, so we ran our confound-controlled method on the closest public data: the **Groove MIDI Dataset**, 1,150 performances by 10 drummers recorded to a click on one electronic kit over several sessions, with drummer, session and style labels (CC BY 4.0) [@gmd2019]. Four drummers also played the **same ten written grooves**: the drum version of 'every master plays the same theka differently'."));
  add(H2("6.1 Method, fixed before running"));
  add(BL([
    "**Unit:** 16 beats (four bars), the length of one Teentaal cycle; 4,118 units from the 7 drummers with at least two sessions. One-bar units were also run and are reported.",
    "**Features (how, not what):** for kick, snare and hi-hat/ride, the timing against the click and the loudness on beats, offbeats and sixteenths, plus their spread: 24 numbers per unit.",
    "**Classifier:** the same simple nearest-centroid method as our E1 code; balanced accuracy, so chance is one over the number of drummers.",
    "**Tests:** new session; new style (a style never seen in training); both at once; same grooves; a control using only which notes were written; and the direct confound test with 1,000 label shuffles.",
  ]));
  add(Fig(fig("v5_gmd_results.png"), 600, 230, "Figure 9. Real data. Left: drummers named from 'how they play' on a new session and in a new style at about three times chance. Middle: identical grooves, four drummers: 'how' names the drummer (63%), 'which notes' does not (26%, chance 25%). Right: in E1-sized groups of three drummers, the new-session test averaged 66%."));
  add(T([2.8, 1.2, 1.2, 1.0], ["Test (real data)", "16-beat units", "1-bar units", "Chance"], [
    ["Naive random split (inflated)", "66%", "59%", "14%"],
    ["New session (T-a)", "48%", "43%", "14%"],
    ["New style (T-b)", "64%", "56%", "14%"],
    ["New session and new style together", "47%", "44%", "14%"],
    ["Same ten grooves, 4 drummers: how they play", "63%", "63%", "25%"],
    ["Same ten grooves: which notes only (control)", "26%", "26%", "25%"],
    ["Same grooves, whole performances named correctly", "26 of 40", "27 of 40", "10 of 40"],
    ["Direct confound test: gap (p, 1,000 shuffles)", "+0.73 (p = 0.001)", "+0.54 (p = 0.001)", "gap ≤ 0"],
    ["E1-sized trios, new session: mean (range)", "66% (34–88%)", "63% (34–83%)", "33%"],
    ["E1-sized trios reaching our 70% pass mark", "13 of 35", "11 of 35", ""],
  ], { size: 15, boldFirstCol: true, highlightLast: true }));
  add(H2("6.2 What this proves, and what it does not"));
  add(Box("What it proves", [[
    "**A performer fingerprint in timing and loudness is real** and survives a new recording session and a different musical style, at about three times chance.",
    "**It lives in how people play, not what they play:** with identical grooves, notes alone are at chance while timing and loudness name the drummer.",
    "**Our method and code work on real performers,** not only on synthetic data.",
  ]], ...GREEN));
  add(Box("What it does not prove, stated plainly", [[
    "It is not tabla, not Indian masters and not body movement: it is MIDI from Western drummers on one electronic kit, so it cannot test an instrument swap.",
    "**Timing and loudness alone sit near our pass mark:** in groups of three, the new-session test averaged 66%, and 13 of 35 trios reached 70%. A tabla E1 based only on sound could fail.",
    "That is exactly why PARAMPARA adds the sleeve: movement carries individual strategy [@dahl2004; @furuya2007; @uwave2009]. **We keep the 70% pass mark unchanged.**",
  ]]));
  add(Code(["python3 PARAMPARA/sim/gmd_fingerprint.py groove/   # reproduces Section 6"]));

  // ---------------------------------------------------------------- 7
  add(H1("7. Validation plan: E0–E5"));
  add(H2("7.1 The hardest question"));
  add(Box(null, ["*\"Are you identifying the master, or their instrument, tuning, recording session or sensor placement?\"*"], ...BLUE));
  add(P("Music systems that appeared to recognise artists were partly recognising each album's recording conditions, the 'album effect' [@flexer2010]. So E1 breaks that link. **Per craft:** 3 masters × 2 sessions on different days (sleeve re-fitted) × 2 instruments (masters swap tablas, looms or puppets) × 20 cycles = **240 cycles**."));
  add(T([1.6, 2.6, 1.5, 1.4], ["Test", "Question", "Pass [decided in advance]", "Rules out"], [
    ["T-a New day", "Trained on one day, does it name the master on the other day?", "≥ 70% (chance 33%)", "Session, sensor placement"],
    ["T-b New instrument", "Trained on one instrument, does it name the master on the other?", "≥ 70% (chance 33%)", "Instrument, tuning"],
    ["T-c Direct test", "Same master on different instruments more alike than different masters on the same instrument?", "Yes, p < 0.01 (1,000 shuffles)", "All of the above"],
    ["Control", "How well do the same features name the instrument?", "Reported", "How much instrument signal remains"],
  ], { size: 16, boldFirstCol: true }));
  add(Fig(fig("confound_test.png"), 600, 211, "Figure 10. Software check on synthetic data: when the instrument secretly drives the data, a naive split still looks above chance (61%), but the new-day and new-instrument tests fall to 29% and 52% and the verdict is FAIL."));
  add(H3("What each E1 result lets us claim (fixed in advance)"));
  add(T([2.4, 2.2, 1.8], ["E1 result for a craft", "What we claim", "What we teach"], [
    ["T-a, T-b ≥ 70% and T-c p < 0.01", "A master-specific style fingerprint", "Levels 1–3"],
    ["T-c p < 0.01, but T-a or T-b between 50% and 70%", "A real but weak fingerprint; not enough to teach one master's style", "Levels 1–2; style shown for information only"],
    ["T-c not significant", "No master fingerprint for this craft", "Levels 1–2"],
  ], { size: 16 }));
  add(H2("7.2 All experiments"));
  add(T([0.45, 1.5, 2.3, 0.6, 1.9, 1.0], ["#", "Question", "Design", "People", "Pass [Target]", "Crafts"], [
    ["E0", "Does the sleeve change how masters perform?", "Alternating blocks of 10 cycles with and without the sleeve; the tool sensor measures both", "Each master", "Equivalent within ±10 ms, ±5% cycle time, ±1 dB (two one-sided tests [@lakens2017]); comfort ≥ 4 of 5", "All three"],
    ["E1", "Is the fingerprint the master's?", "Section 7.1", "3 masters per craft", "T-a, T-b ≥ 70%; T-c p < 0.01", "All three"],
    ["E2", "Can cues be felt while performing?", "Weakest felt cue at rest vs while performing; finger, wrist, elbow, shoulder", "8", "At most twice the rest strength at one site per joint", "Tabla, puppetry"],
    ["E3", "Can people tell two masters apart through PARAMPARA?", "A, B, then X; 20 rounds", "10", "≥ 15 of 20 (p = 0.02)", "Tabla"],
    ["E4", "Can cues be read while performing?", "40 random cues: 5 fingers, 3 joints, 2 strengths", "8–10", "≥ 90% sites, ≥ 80% strengths", "Tabla, puppetry"],
    ["E5", "Do learners improve with the device off?", "16 beginners randomised: video practice or PARAMPARA; 3 sessions; retention test 48 h later, device off, blinded tester", "16", "Difference with 95% CI; full trial if PARAMPARA ≥ video", "Tabla"],
  ], { size: 15 }));
  add(P("**Honest sample sizes.** With 8 people per group, E5 can only detect a very large effect (d ≈ 1.5 at 80% power); its job is to estimate the effect and test the procedure. The 120-person trial in the roadmap (60 per group) detects d ≈ 0.52 [@cohen1988]. All studies have written consent, institute ethics approval, and pass rules registered before recording."));

  // ---------------------------------------------------------------- 8
  add(H1("8. What we build for SIH"));
  add(H2("8.1 Flagship and demos"));
  add(T([1.3, 2.3, 2.7], ["Craft", "Validated at SIH", "Live at the finale"], [
    ["Tabla (flagship)", "H1–H8, E0, E1, E2, E3, E4, E5", "Judge plays with the sleeve; two masters' fingerprints with the E1 verdict; device-off score"],
    ["Puppetry (demo)", "E0, E1, E2, E4", "Judge moves a Kathputli and feels the string-finger cues"],
    ["Handloom (demo)", "E0, E1", "A weaver's recording replayed on the ghost arm; cloth evenness from a phone photo"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("8.2 Three deliverables"));
  add(T([1.5, 2.6, 2.2], ["Deliverable", "What the judge experiences", "Done when [Target]"], [
    ["1. Two sleeves and three tool kits", "Wears a sleeve and feels finger and joint cues while performing", "H1–H8 pass; E4 ≥ 90%"],
    ["2. Proven fingerprints", "Real masters' fingerprints with the confound-test verdict for each craft", "E0 and E1 reported, pass or fail"],
    ["3. Device-off learning", "Practises; cues fade; performs alone; sees the unaided score and the E5 result", "Fade runs end to end; E5 reported with its CI"],
  ], { size: 16, boldFirstCol: true }));
  add(H2("8.3 Bill of materials (two sleeves, three tool kits)"));
  add(T([2.8, 0.6, 1.4, 0.8], ["Item", "Qty", "Approx. ₹ [Estimate]", "Source"], [
    ["BMI270 IMUs (US$1.26 each at volume)", "18", "2,000–3,000", "[@lcsc]"],
    ["DRV2605L drivers (US$0.72 each at volume)", "16", "1,000–2,000", "[@lcsc]"],
    ["TCA9548A switches", "4", "300–600", "[@tca9548a]"],
    ["ESP32-S3-MINI-1 modules (hubs) and ESP32 boards (tool nodes, receiver)", "2 + 4", "2,500–3,500", "[@esp32s3mini]"],
    ["Coin LRAs 8 mm (US$5.15 at 1–9 units; cheaper in volume)", "16", "3,000–7,000", "[@lcsc; @c08005]"],
    ["LiPo 1,000 mAh cells, MCP73831 chargers, microSD cards", "2 sets", "1,500–2,200", "[@mcp73831]"],
    ["Circuit boards made and assembled by a PCB service (ring, joint, hand and hub boards)", "≈ 20 boards", "4,000–6,000", "–"],
    ["3D-printed PA12 housings, silicone straps, fabric sleeves, flat cables", "2 sleeves", "3,000–4,000", "–"],
    ["Tool kits: piezo discs and base unit; beater IMU and treadle switches; puppet pod", "3", "2,500–3,700", "[@murata7bb]"],
    ["**Total prototype**", "", "**≈ 20,000–32,000**", ""],
  ], { highlightLast: true, size: 15, keep: true }));
  add(P("US$ prices converted at about ₹85 per US$. A whole kit costs less than one Teslasuit (about US$5,000) by a factor of more than ten [@teslasuit]; at volume, one sleeve could cost about ₹5,000–7,000 [Target]."));

  // ---------------------------------------------------------------- 9
  add(H1("9. Evidence from published research"));
  add(T([3, 2, 0.8], ["Finding", "Key number", "Source"], [
    ["Joint-level vibration suit while copying a teacher", "Error down up to 27%; learning up to 23% faster", "[@tikl2007]"],
    ["Haptic guidance added to audio training (drumming task)", "−17% loudness error; −18% early timing error", "[@grindlay2008]"],
    ["Haptic vs visual training of a movement", "Timing learned better from haptics", "[@feygin2002]"],
    ["Beginners learned drum patterns from vibration alone", "Haptic Drum Kit", "[@holland2010]"],
    ["Violin bowing with vibration feedback", "Improved; half kept the gain without feedback", "[@vanderlinden2011]"],
    ["Feeling a drum and strength cue on the body", "96.18% recognised", "[@leechoi]"],
    ["Piano: vibration vs visual cues (n = 14)", "Timing error 12.1% vs 22.3%", "[@coscia2024]"],
    ["Feedback on half the trials vs every trial", "Better retention", "[@winstein1990]"],
    ["Low-cost orientation filter", "Below 0.8° static, 1.7° dynamic", "[@madgwick2011]"],
    ["Open-palm glove, fingertips free", "Finger error 1.25°", "[@hosie2025]"],
  ], { size: 16 }));
  add(H3("What we will not claim"));
  add(BL([
    "That PARAMPARA transmits a master's 'soul'. We measure and teach **observable** parts of their skill.",
    "That it replaces the master. The master records, approves and controls.",
    "That a 16-person pilot proves long-term learning, or that the sleeve reduces weavers' pain.",
    "That the drummer test proves a tabla fingerprint. It shows the method works on real performers and calibrates our risk.",
  ]));

  // ---------------------------------------------------------------- 10
  add(H1("10. Feasibility"));
  add(H2("10.1 Eight-week plan"));
  add(T([0.7, 3.2, 2.2], ["Week", "Build and record", "Proof produced"], [
    ["1", "Order boards from a PCB assembly service; print housings; first sleeve on breakout boards. Partner outreach (Appendix A); ethics application; pass rules registered.", "H1 on breakout boards"],
    ["2", "Hub firmware: two buses, FIFO reads, motors, microSD, radio; tabla kit", "H2, H3, H8"],
    ["3", "Assembled boards arrive (fallback: breakout boards in larger rings); both sleeves built", "H4–H7; E2 and E4 on volunteers"],
    ["4", "Fingerprint pipeline and ghost arm; tabla masters, day 1", "E0 (tabla); E1 day 1"],
    ["5", "Tabla masters, day 2 (instruments swapped, sleeve re-fitted); puppeteers, days 1–2", "E1 verdict (tabla); E0 and E1 (puppetry); E3"],
    ["6", "Weavers at a weaving centre, days 1–2; learning pilot starts", "E0 and E1 (handloom)"],
    ["7", "Learning pilot: 16 beginners, 3 sessions each, retention test", "E5 with confidence interval"],
    ["8", "Full demo; three rehearsals without help; backup video; deck with real numbers", "Demo runs end to end"],
  ], { size: 16 }));
  add(H2("10.2 Team of six"));
  add(T([1.5, 4.5], ["Role", "Owns"], [
    ["Hardware", "Boards, housings, sleeves, tool kits, bench tests H1–H8"], ["Firmware", "Buses, cue timing, radio, clock sync, logging"],
    ["App", "Ghost arm, lessons, scores, consent screens"], ["Analysis", "Fingerprint features, confound test, fade rule, statistics"],
    ["Research and partner liaison", "Outreach to masters, consent, recording sessions"], ["Pitch", "Deck, demo script, backup video"],
  ], { boldFirstCol: true }));
  add(H2("10.3 Top risks"));
  add(T([2, 2.6, 2], ["Risk", "What we do", "Fallback"], [
    ["No masters available in time", "Outreach in week 1 through Zonal Cultural Centres, Weavers' Service Centres, music colleges and puppeteer communities", "Senior practitioners of different teachers, stated clearly"],
    ["Assembled boards late", "Order in week 1; breakout boards from day 1", "Larger rings on breakout boards for E0–E4"],
    ["Sleeve changes how masters perform (E0)", "Lighter rings; adjust positions with the master", "Hand, wrist and elbow sensors only"],
    ["Fingerprint near the pass mark (as in Section 6)", "Add movement features; record 30 cycles", "Graded claim (Section 7.1)"],
    ["Finger cues not felt while striking (E2)", "Cue before the movement; stronger pulse", "Move the cue to the wrist"],
    ["Radio trouble at the venue", "microSD log; cues stored on the sleeve", "USB cable; backup video"],
  ], { size: 16 }));

  // ---------------------------------------------------------------- 11
  add(H1("11. Viability: institution-first, craft by craft"));
  add(P("**Our first customers are institutions, because hardware cost and the need to protect masters' content make direct consumer sales premature.**"));
  add(T([1.1, 2.6, 2.6], ["Craft", "What already exists", "What PARAMPARA adds"], [
    ["Tabla", "Guru-Shishya Parampara honoraria (e.g. ₹7,500 a month for a guru) [@gsp]; CBSE subject 036 [@cbse036]; ABGMVM exam centres [@abgmvm]", "A kit per guru or music room; fingerprints as lasting output of state-funded teaching"],
    ["Handloom", "28 Weavers' Service Centres and SAMARTH training [@wsc]; a 315-hour NSQF qualification [@nsqfhandloom]", "A training aid with device-off scores as evidence of skill; shoulder feedback for weaver health"],
    ["Puppetry", "Intangible heritage scheme through Sangeet Natak Akademi [@snaich]; artists in schools [@nep426]; artists-in-residence [@ugc2025]", "Recorded, credited fingerprints of puppeteers; a teaching kit for workshops"],
    ["All", "National audiovisual archive [@ncaa]", "A new kind of record: how masters move"],
  ], { size: 16, boldFirstCol: true }));
  add(BL([
    "**Cost:** about ₹20,000–32,000 for the two-sleeve prototype; less than four months of a guru's state honorarium [@gsp] and a small fraction of a motion-capture suit [@xsens].",
    "**Who pays:** institutions buy kits and a yearly licence; consenting masters receive a share whenever their fingerprints are used; grants and CSR support preservation. **These are hypotheses: our first-year test is three signed letters of intent.**",
    "**Rules:** explicit, recorded consent; data stays on the device or the user's app by default [@dpdp]; performers' rights respected [@copyright1957].",
  ]));

  // ---------------------------------------------------------------- 12
  add(H1("12. Impact"));
  add(T([1.3, 2.7, 2.3], ["Who", "Benefit", "How we will measure it"], [
    ["Masters", "Their own way of playing, weaving or puppeteering preserved, credited and shared on their terms", "Masters recorded; their feedback"],
    ["Learners", "Practise against a real master between lessons, and see honest progress", "Unaided score after a break"],
    ["Weavers", "Feedback on shoulder posture during long hours [@siddiqui2021]", "Time with the shoulder raised (to be tested)"],
    ["Archives", "A record of how masters move, not only how they sound and look", "Consented fingerprints deposited"],
    ["Researchers", "A consented dataset linking masters' fingerprints with learners' progress", "Dataset and publications"],
  ], { size: 16, boldFirstCol: true }));
  add(P("**Possible wider benefit, not yet tested:** deaf people can follow a beat through vibration [@tranchant2017]; India has about 50.7 lakh people with hearing disability [@census2011]."));

  // ---------------------------------------------------------------- 13
  add(H1("13. The pitch"));
  add(H2("13.1 Six things the jury should remember"));
  add(NL([
    "A master's skill lives in the fingers, wrist, elbow and shoulder.",
    "We measure it with one low-cost sleeve; tabla is proven, handloom and puppetry show it generalises.",
    "We prove the fingerprint is the master's, not the instrument's; on real drummers our method already finds it.",
    "We teach it through touch, sound and a ghost arm.",
    "We remove the help and count only what the learner does alone.",
    "The master owns and controls the recorded legacy.",
  ]));
  add(H2("13.2 Three-minute demo"));
  add(T([0.9, 4.8], ["Time", "What happens"], [
    ["0:00–0:20", "'Archives keep how masters sound and look. Nothing keeps how their hands move.'"],
    ["0:20–0:50", "Two tabla masters' fingerprints and the E1 verdict: still recognised on a new day and on a swapped tabla."],
    ["0:50–1:50", "The judge wears the sleeve and plays along. Cues fade. A check cycle runs with the device silent; the unaided score appears. 'The device succeeds only when it is no longer needed.'"],
    ["1:50–2:20", "The judge moves a Kathputli and feels the string-finger cues; a weaver's recording replays on the ghost arm."],
    ["2:20–2:40", "The master's consent: approved with a phone fingerprint; an edited copy is rejected."],
    ["2:40–3:00", "E0–E5 results and the drummer test; institutions first."],
  ], { boldFirstCol: true }));
  add(H2("13.3 Hard questions"));
  add(T([2.2, 4.2], ["Question", "Answer"], [
    ["Are you identifying the master, or the instrument, tuning, session or sensor placement?", "We test exactly that: two days with the sleeve re-fitted and two instruments. A fingerprint counts only if it names the master on a new day **and** a new instrument (Section 7). On real drummers, the method already separates performer from session and style (Section 6)."],
    ["Show me proof, not plans.", "The drummer test is real data. The equipment is fully specified with datasheets, budgets and bench tests. Master recordings and E0–E5 are scheduled with pass rules fixed in advance, and we report them whichever way they go."],
    ["Three crafts: isn't that spreading thin?", "Tabla is the flagship and gets every test. Handloom and puppetry get only E0 and E1, to show the platform generalises."],
    ["Doesn't the sleeve change how a master plays?", "Fingertips and palm stay free, about 30 g sits on the hand, and E0 measures performance with and without it."],
    ["Does PARAMPARA teach better than video?", "Not yet shown. E5 is a randomised pilot with a device-off retention test; the 120-person trial follows."],
    ["Why not a motion-capture suit?", "Suits cost US$5,000 or more and do not teach [@teslasuit; @xsens]."],
    ["Can vibration carry tiny timing?", "No, and we don't ask it to: touch carries which finger, which joint and how strong; the ear carries timing [@friberg1995; @lauzon2020]."],
    ["Can we meet the masters?", "They are named in the deck with signed consent; with their agreement we invite them or share their contact through our institute."],
    ["What if E1 fails?", "We follow the graded claim table in Section 7.1 and say so."],
  ], { size: 16 }));

  // ---------------------------------------------------------------- 14
  add(H1("14. Limits we state openly"));
  add(BL([
    "**Body sensors have limits:** shoulder angles can be off by many degrees [@imuvalid]; we rely on timing, order and speed.",
    "**The real-data test is not tabla:** Western drummers, MIDI, one kit; it cannot test an instrument swap.",
    "**Timing alone is near the pass mark** (Section 6); the style claim depends on the sleeve's movement data.",
    "**Not captured:** grip force inside the hand, tone colour, thread tension.",
    "**Small first studies:** E0–E5 test feasibility and estimate effects.",
    "**Looms are not portable:** handloom work happens at weaving centres; the finale shows recordings.",
    "**Some masters may not want to be recorded.** Their choice decides what we do.",
  ]));

  // ---------------------------------------------------------------- 15
  add(H1("15. Roadmap after SIH"));
  add(T([1.5, 3.2, 1.8], ["When", "What", "Starts only if"], [
    ["0–6 months", "Tabla learning trial with about 120 people (detects d ≈ 0.52) [@cohen1988]", "E0–E5 pass for tabla"],
    ["0–6 months", "Handloom training pilot at a Weavers' Service Centre, with shoulder feedback", "E0 and E1 pass for handloom"],
    ["0–6 months", "Flexible-circuit sleeve; volume cost about ₹5,000–7,000; on-device stroke recognition [@rohit2023]", "Bench tests stable"],
    ["6–12 months", "Style level where E1 passes; archive pilot with NCAA [@ncaa]", "Clear fingerprints in E1"],
    ["12+ months", "Glove and shadow puppetry, kathak footwork, pottery [@puppetforms; @manitsaris2014]", "Three-craft deployment working"],
  ], { size: 16 }));

  // ---------------------------------------------------------------- Appendices
  out.push("__APPENDIX__");
  add(H1("Appendix A. Partner kit for three crafts", true));
  add(T([1.1, 4.4], ["Craft", "Where to find masters"], [
    ["Tabla", "Gurus empanelled with a Zonal Cultural Centre under Guru-Shishya Parampara [@gsp]; tabla faculty at music colleges; Gandharva Mahavidyalaya centres [@abgmvm]"],
    ["Handloom", "Weavers' Service Centres [@wsc]; master weavers and trainers of the two-treadle qualification [@nsqfhandloom]"],
    ["Puppetry", "Kathputli families and troupes, including the former Kathputli Colony community [@kathputlicolony]; puppeteers known to Zonal Cultural Centres and Sangeet Natak Akademi [@snaich]"],
  ], { size: 16, boldFirstCol: true }));
  add(Box("Outreach message", [
    "*Respected Guruji / Ustad, we are engineering students building PARAMPARA for Smart India Hackathon 2026. It records how a master moves while playing, weaving or working a puppet (light sensors on the back of the hand and arm, nothing on the fingertips or palm), so that learners can practise against it, with the master's consent and credit. We would be grateful for two short sessions of about 45 minutes on different days. You decide how the recording may be used, you will receive a copy, and you can withdraw it at any time.*",
    "*Pranam Guruji / Ustad ji, hum engineering students hain aur Smart India Hackathon 2026 ke liye PARAMPARA bana rahe hain. Isme guru ke haath aur baanh ki gati record hoti hai (haath ke peeche aur baanh par halke sensor, ungliyon ke siron aur hatheli par kuch nahi), taaki shishya uske saath abhyas kar sakein, guru ki anumati aur naam ke saath. Kya aap alag-alag din do baar lagbhag 45 minute de sakte hain? Recording ka upyog aap tay karenge, aapko copy milegi, aur aap kabhi bhi wapas le sakte hain.*",
  ]));
  add(T([4.6, 1.2], ["Consent: I agree that…", "Yes / No"], [
    ["my movements may be recorded with sensors on the back of my hands and arms, and a sensor on my instrument, loom or puppet", "☐ / ☐"],
    ["I may be asked to perform on a second instrument, loom or puppet", "☐ / ☐"],
    ["the recording may be used to teach learners through PARAMPARA", "☐ / ☐"],
    ["my name, gharana or community may be shown with the recording", "☐ / ☐"],
    ["the recording may be shown at Smart India Hackathon 2026", "☐ / ☐"],
    ["the recording may be used commercially (only with a separate written agreement)", "☐ / ☐"],
    ["I understand I can withdraw at any time, and I will receive a copy of my recording", "☐"],
  ], { size: 16 }));
  add(P("Signature, date and witness; a spoken consent recording in the master's language is kept with the form. The master receives a copy of the recording and fingerprint, credit wherever it is used, control (approve, limit, withdraw) and a share of any licence income as agreed in writing."));

  add(H1("Appendix B. Experiment E1 protocol"));
  add(T([1.4, 1.6, 1.6, 1.6], ["", "Day 1", "Day 2 (sleeve re-fitted)", "Cycles"], [
    ["Master A", "Instrument 1, then 2", "Instrument 2, then 1", "4 × 20 = 80"],
    ["Master B", "Instrument 2, then 1", "Instrument 1, then 2", "80"],
    ["Master C", "Instrument 1, then 2", "Instrument 2, then 1", "80"],
  ], { size: 16, boldFirstCol: true }));
  add(NL([
    "**Set-up:** sleeves on both arms, 20-second N-pose; tool sensor fitted; tuning, loom settings or puppet noted.",
    "**Recording:** at least 20 uninterrupted cycles per instrument: Teentaal theka at 80 beats per minute (tabla); 20 picks of plain weave (handloom); a fixed gesture phrase repeated 20 times (puppetry).",
    "**E0 block:** on day 1, alternating blocks of 10 cycles with and without the sleeve on instrument 1.",
    "**Export** one row per cycle: master, session, instrument, f1 … fn.",
    "**Analyse:** `python3 PARAMPARA/sim/skilltwin_validation.py analyze e1.csv`; report T-a, T-b, T-c, the control and the verdict.",
  ]));
  add(Box("Result template for the deck", ["Craft ___ · masters A, B, C · new day ___% · new instrument ___% (chance 33%) · confound gap ___, p = ___ · instrument control ___% (chance 50%) · claim (Section 7.1) ___."], ...BLUE));

  add(H1("Appendix C. Protocols for E0 and E2–E5"));
  add(T([0.5, 2.6, 2.2, 1.4], ["#", "Procedure", "Measure", "Pass [Target]"], [
    ["E0", "Blocks: no sleeve, sleeve, no sleeve, sleeve; 10 cycles each; tool sensor on throughout; comfort rating", "Differences in timing, cycle time and strength; two one-sided tests [@lakens2017]", "Within ±10 ms, ±5%, ±1 dB; comfort ≥ 4 of 5"],
    ["E2", "Weakest felt cue (up-down method) at rest and while performing slowly; finger, wrist, elbow and shoulder; cue before vs on the beat", "Ratio of performing to rest strength", "≤ 2 at one or more sites per joint"],
    ["E3", "Feel and hear A, B, then X (random). 20 rounds", "Correct out of 20", "≥ 15 (p = 0.02)"],
    ["E4", "40 random cues across 5 fingers and 3 joints at 2 strengths while performing", "Percentage correct", "≥ 90% sites, ≥ 80% strengths"],
    ["E5", "16 beginners randomised 8 and 8: video practice or PARAMPARA; three 20-minute sessions on three days; retention 48 h later, device off, blinded tester", "Unaided score at retention", "Difference and 95% CI; full trial if PARAMPARA ≥ video"],
  ], { size: 16 }));

  add(H1("Appendix D. Demo day checklist"));
  add(BL([
    "Two sleeves plus one spare; rings in three sizes; spare cells, power bank, cables; microSD cards.",
    "Tabla and practice pad; a Kathputli with its pod; handloom recordings and a cloth sample.",
    "Pre-calibrated judge profile with a 20-second N-pose re-check; offline app copy.",
    "Masters' fingerprints and E1 verdicts; one signed recording and one edited copy.",
    "Printed one-page summary, consent summaries, bench-test sheet (H1–H8).",
    "Backup video; three rehearsals completed without help.",
  ]));

  add(H1("Appendix E. Simulations (planning tools, not evidence of learning)"));
  add(Fig(fig("fingerprint_power.png"), 600, 260, "Figure E1. With assumed variation between tabla cycles (15 ms, 1.5 dB) and 20 cycles per player, profiles differing by about 6 ms and 0.6 dB per beat are told apart about 80% of the time."));
  add(T([2.6, 1.1, 1.1, 1.1], ["Unaided score on day 4 (simulated)", "Assumption A", "Assumption B", "Assumption C"], [
    ["Cues always on", "0.48", "0.42", "0.57"], ["No cues", "0.46", "0.58", "0.71"],
    ["Fixed fade", "0.67", "0.63", "0.68"], ["Check-cycle fade (PARAMPARA)", "0.69", "0.65", "0.68"],
  ], { boldFirstCol: true }));
  add(P("Cues that never stop do poorly under every assumption; check-cycle fading did slightly better than a fixed fade under two of three (+0.015, 95% CI 0.013–0.017). People, not simulations, decide (E5 and the full trial). On synthetic data the confound test passes a master-driven world and fails an instrument-driven one (Figure 10)."));

  add(H1("Appendix F. Reference check and parameters"));
  add(T([3, 3], ["Original citation in the team's first documents", "Finding"], [
    ["'Masur & Sacks, Gesture-Based Adaptive Haptic Guidance, IEEE Robotics (2025)'", "Does not exist; closest real work is Zahedi et al. 2017 [@zahedi2017]"],
    ["'Flandorfer et al., Wearable Haptic Learning Systems, Sensors (2022)'", "Not found; replaced by a verified review [@sigrist2013]"],
    ["'Grindlay (2008), ACM Multimedia'", "Wrong venue; correct sources cited [@grindlay2008; @grindlay2007]"],
  ], { size: 16 }));
  add(T([2.6, 2.4], ["Parameter", "Value"], [
    ["IMU sampling", "200 samples per second (FIFO burst reads)"], ["Tabla piezo sampling", "16,000 samples per second per channel (DMA)"],
    ["I2C buses", "2 per sleeve, 400 kHz, TCA9548A on each"], ["Calibration", "20-second N-pose each session"],
    ["Cue length", "30–80 ms"], ["Cue strength", "≥ 3 × the person's weakest felt level, firmware maximum"],
    ["Check cycles", "session start + every 4 cycles"], ["Target to move on", "unaided score ≥ 85% on 2 days + master's approval"],
    ["E1 pass", "T-a and T-b ≥ 70%; T-c p < 0.01"], ["Fingerprint recording", "≥ 20 cycles per master, day and instrument"],
  ], { size: 16 }));

  add(H1("Appendix G. CAD and code index"));
  add(T([2.6, 3.4], ["File", "What it is"], [
    ["PARAMPARA/cad/parampara_cad.py", "Parametric CAD of every housing, the sleeve assembly and the three tool kits; exports STEP and STL"],
    ["PARAMPARA/cad/out/*.step, *.stl", "Ring, motor, joint, hand-board and hub housings and lids, ready to inspect or print"],
    ["PARAMPARA/cad/render_all.py, compose_figures.py", "Off-screen renders and the labelled figures in Section 4"],
    ["PARAMPARA/sim/gmd_fingerprint.py, make_gmd_figure.py", "Real-data test on the Groove MIDI Dataset (Section 6)"],
    ["PARAMPARA/sim/skilltwin_validation.py", "E1 confound test (T-a, T-b, T-c, control, verdict)"],
    ["PARAMPARA/sim/fade_engine_sim_v2.py, fingerprint.py", "Fade simulation and E1 recording-length planning"],
  ], { size: 16 }));
  add(Code([
    "python3 PARAMPARA/cad/parampara_cad.py            # STEP/STL files",
    "python3 PARAMPARA/cad/render_all.py && python3 PARAMPARA/cad/compose_figures.py",
    "python3 PARAMPARA/sim/gmd_fingerprint.py groove/  # real-data test",
    "node PARAMPARA/build/build_v5.js                  # this document",
  ]));
  return out;
};
