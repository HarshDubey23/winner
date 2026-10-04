"""
Single source of truth for the 6-slide SIH hardware deck helper: every part's position, exact text, images,
template mapping, speaker notes and image prompts. build_helper.py turns this into wireframe PNGs and the
prompt document, so the wireframes and the prompts can never disagree.
Units: inches on a 13.333 x 7.5 in (16:9) slide, measured from the top-left corner. Font sizes in points.
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))          # .../PARAMPARA

# ----------------------------------------------------------------------------------------------- palette
M, BL, BR, G = "7A1F1F", "1F4E79", "B8901A", "2E6B3A"     # maroon (idea), blue (technical), brass (money), green (proof)
TX, MU, BD = "1E1E1E", "5A5A5A", "D9CFC0"                 # text, muted, panel border
MT, BT, RT, GT, NT = "F6ECEC", "EAF1F8", "FBF5E6", "EEF6EF", "F4F4F4"   # tints
WHITE = "FFFFFF"
COLOURS = [
    ("Maroon", M, "Idea, problem, risks, slide titles, the product name"),
    ("Indigo blue", BL, "Everything technical: hardware, electronics, budgets, datasheets"),
    ("Brass", BR, "Money and value: cost, viability, economic benefit; badge on dark panels"),
    ("Green", G, "Proof that already works: 'Working today', done items, environmental benefit"),
    ("Text", TX, "All body text"),
    ("Muted grey", MU, "Captions, image tags, units"),
    ("Panel border", BD, "1 pt border of every white panel"),
    ("Maroon tint", MT, "Highlight column of the comparison table, gap labels"),
    ("Blue tint", BT, "Technical boxes in diagrams, 'next' band"),
    ("Brass tint", RT, "Cost and viability highlights, tool-node boxes"),
    ("Green tint", GT, "'Working today' panels, 'done' band"),
    ("Neutral tint", NT, "Craft tiles, 'not claimed yet' band"),
]

# ----------------------------------------------------------------------------------------------- element helpers
def T(x, y, w, h, text, size=10, color=TX, font="body", bold=False, italic=False, align="left",
      fill=None, border=None, valign="top", pad=0.0, radius=0.0):
    return dict(t="text", x=x, y=y, w=w, h=h, text=text, size=size, color=color, font=font, bold=bold,
                italic=italic, align=align, fill=fill, border=border, valign=valign, pad=pad, radius=radius)

def B(x, y, w, h, items, size=10, color=TX, mark="•", mcolor=None, gap=3):
    return dict(t="bullets", x=x, y=y, w=w, h=h, items=items, size=size, color=color, mark=mark,
                mcolor=mcolor or color, gap=gap)

def I(x, y, w, h, src, tag=None):
    return dict(t="img", x=x, y=y, w=w, h=h, src=src, tag=tag)

def TB(x, y, w, h, cols, rows, size=9, head=True, head_fill=NT, head_color=TX, hl_col=None, hl_fill=MT,
       first_bold=False, align=None):
    return dict(t="table", x=x, y=y, w=w, h=h, cols=cols, rows=rows, size=size, head=head, head_fill=head_fill,
                head_color=head_color, hl_col=hl_col, hl_fill=hl_fill, first_bold=first_bold, align=align)

def CH(x, y, w, h, text, fill, color=TX, size=9, first=False):
    return dict(t="chevron", x=x, y=y, w=w, h=h, text=text, fill=fill, color=color, size=size, first=first)

def AR(x1, y1, x2, y2, color=MU):
    return dict(t="arrow", x1=x1, y1=y1, x2=x2, y2=y2, color=color)

def CO(letter, ax, ay, color=BL):
    """Lettered callout dot placed on a part of a CAD render (A to E)."""
    return dict(t="callout", letter=letter, ax=ax, ay=ay, color=color)

def LB(text, ax, ay, lx, ly, lw, lh=0.24, size=8.5, color=BL):
    """Leader-line label: dot on the part at (ax, ay), text box at (lx, ly)."""
    return dict(t="leader", text=text, ax=ax, ay=ay, lx=lx, ly=ly, lw=lw, lh=lh, size=size, color=color)

def P(n, title, x, y, w, h, color, items, answers, what, fill=WHITE, border=BD, title_color=None, badge=None):
    return dict(n=n, title=title, x=x, y=y, w=w, h=h, color=color, items=items, answers=answers, what=what,
                fill=fill, border=border, title_color=title_color or color, badge=badge or color)

# ----------------------------------------------------------------------------------------------- render anchors
ANCH = json.load(open(os.path.join(ROOT, "cad/renders/anchors.json")))
SIZES = {"sleeve_iso": (1948, 498), "hand_iso": (1306, 794), "sleeve_dorsal": (1867, 523), "hand_palmar": (1266, 814)}

def anchor(img, label, x, y, w):
    """Absolute slide position (in) of a named anchor on a CAD render placed at (x, y) with width w."""
    px, py = ANCH[img][label]
    s = w / SIZES[img][0]
    return round(x + px * s, 2), round(y + py * s, 2)

A = "assets/"          # relative to PARAMPARA/ppt
F = "../figures/"      # relative to PARAMPARA/ppt

# =============================================================================================== SLIDES
SLIDES = []

# ----------------------------------------------------------------------------------------------- 1 TITLE
hx, hy, hw = 7.25, 1.50, 5.53          # hero render placement
h_ring = anchor("hand_iso", "thumb ring (IMU)", hx, hy, hw)
h_motor = anchor("hand_iso", "thumb motor", hx, hy, hw)
h_board = anchor("hand_iso", "hand board (IMU, 5 drivers)", hx, hy, hw)
h_wrist = anchor("hand_iso", "wrist pod (forearm IMU + motor)", hx, hy, hw)

SLIDES.append(dict(
    n=1, key="title", name="Title",
    title="PARAMPARA: a Skill Fingerprint sleeve for India's living crafts",
    asks=["Problem Statement ID", "Problem Statement Title", "Theme", "PS Category", "Team ID", "Team Name"],
    mapping=[("Problem Statement ID, Title, Theme, PS Category, Team ID, Team Name", "Part 2 (exact fields table)"),
             ("(not asked, but judges decide in 5 seconds) What is it?", "Part 1 (name + one-line definition)"),
             ("(not asked) Is it real hardware?", "Part 3 (hero CAD render with dimensions)"),
             ("(not asked) Scope", "Part 4 (three crafts, tabla flagship)"),
             ("(not asked) Any proof yet?", "Part 5 (working today)")],
    takeaway="PARAMPARA is a wearable for India's living crafts, entered as hardware for PS 26214, and it already has working proof.",
    reading="Z-pattern: name (top-left), then the official fields, then the hero render (right), then the craft strip and proof (bottom).",
    parts=[
        P(1, "Our solution", 0.40, 1.05, 6.55, 1.80, M, [
            T(0.52, 1.38, 6.30, 0.74, "PARAMPARA", 40, M, font="head", bold=True),
            T(0.52, 2.12, 6.30, 0.46, "Captures how a master's fingers, wrist, elbow and shoulder move, teaches it back by touch, then fades away until the learner plays alone.", 12.5),
            T(0.52, 2.59, 6.30, 0.22, "SKILL FINGERPRINT SLEEVE  ·  TABLA FLAGSHIP  ·  HANDLOOM & KATHPUTLI DEMOS", 9.5, BR, bold=True),
        ], "Identity (not a template field, but the first thing a judge reads)",
           "The product name, big, and one sentence that says what it does. A judge who reads only this knows the idea."),
        P(2, "Official SIH fields", 0.40, 3.00, 6.55, 2.30, M, [
            TB(0.52, 3.42, 6.31, 1.82, [2.05, 4.26], [
                ["Problem Statement ID", "26214"],
                ["Problem Statement Title", "[paste the exact title from the SIH portal]"],
                ["Theme", "Heritage & Culture  [check on portal]"],
                ["PS Category", "Hardware"],
                ["Team ID", "[Team ID]"],
                ["Team Name", "[Team Name]"],
            ], size=12, head=False, first_bold=True),
        ], "All six template fields: PS ID, PS Title, Theme, PS Category, Team ID, Team Name",
           "Exactly the fields the template asks for, in the same order, copied character by character from the portal."),
        P(3, "The equipment · CAD render", 7.10, 1.05, 5.83, 4.25, BL, [
            I(hx, hy, hw, 3.36, A + "hand_iso_transparent.png", "CAD render"),
            LB("Ring motion sensor 13 × 11 × 4.4 mm", h_ring[0], h_ring[1], 7.40, 1.58, 2.28),
            LB("Coin motor pod Ø12 × 5.2 mm", h_motor[0], h_motor[1], 7.40, 1.92, 2.00),
            LB("Hand board 42 × 32 × 8 mm", h_board[0], h_board[1], 10.45, 3.45, 2.20),
            LB("Wrist pod 28 × 20 × 8 mm", h_wrist[0], h_wrist[1], 7.40, 4.40, 2.10),
            T(7.25, 4.88, 5.53, 0.36, "CAD render of our design (CadQuery): one sleeve per arm with 9 BMI270 motion sensors and 8 coin vibration motors. Palm and fingertips stay free.", 8.5, MU, italic=True),
        ], "Shows it is real hardware with real dimensions",
           "The hero image: our own CAD render of the hand end of the sleeve, with four dimension call-outs. Labelled 'CAD render' so no judge mistakes it for a photo."),
        P(4, "Three crafts, one sleeve", 0.40, 5.45, 8.30, 1.50, M, [
            I(0.52, 5.87, 0.95, 0.98, A + "tabla_iso_transparent.png", "CAD"),
            T(1.52, 5.90, 1.62, 0.95, "**TABLA**\nFlagship · about 80% of our effort · full test plan", 9.5),
            I(3.24, 5.87, 0.95, 0.98, A + "puppet_iso_transparent.png", "CAD"),
            T(4.24, 5.90, 1.62, 0.95, "**KATHPUTLI**\nDemo · strings stay on the fingers, pod in the torso", 9.5),
            I(5.96, 5.87, 0.95, 0.98, A + "loom_iso_transparent.png", "CAD"),
            T(6.96, 5.90, 1.62, 0.95, "**HANDLOOM**\nDemo · beater and treadle sensing at a weaving centre", 9.5),
        ], "Scope: which crafts, and which one is the flagship",
           "Three small CAD renders of the tool kits so the judge sees one sleeve generalises, and that tabla is the focus."),
        P(5, "Working today", 8.85, 5.45, 4.08, 1.50, G, [
            B(8.97, 5.86, 3.84, 1.04, [
                "Phone prototype: teach, fade, device-off score (automated test PASS)",
                "Firmware core: 27 of 27 unit checks pass",
                "Pre-test on real drummer data: 7 drummers, 4,118 units",
            ], 9.5, mark="✓", mcolor=G, gap=2),
        ], "Proof (sets this team apart on slide 1)",
           "Three facts that are true today and checkable in the repository. Green = already working.",
           fill=GT, border=G),
    ],
    notes="We are Team [name], problem statement 26214, hardware. PARAMPARA is a sensor sleeve from the fingers to the shoulder. It records how a master moves, teaches it back by touch, and then steps away until the learner plays alone. Tabla is our flagship; Kathputli and handloom show the same sleeve generalises. Three things already work today: the phone prototype, the firmware core and a pre-test on real performer data.",
    donts=["Do not shrink the official fields; they are what the screening team checks first.",
           "Do not replace the CAD render with an AI picture of the device.",
           "Do not write 'proven' or 'validated' anywhere on this slide."],
))

# ----------------------------------------------------------------------------------------------- 2 IDEA
SLIDES.append(dict(
    n=2, key="idea", name="Idea",
    title="Proposed solution: a master's Skill Fingerprint, captured and taught by touch",
    asks=["Detailed explanation of the proposed solution", "How it addresses the problem", "Innovation and uniqueness of the solution"],
    mapping=[("Detailed explanation of the proposed solution", "Part 2 (what it is) + Part 3 (how it works, 6 steps)"),
             ("How it addresses the problem", "Part 1 (the problem, with numbers) + Part 4 (gap → our answer)"),
             ("Innovation and uniqueness", "Part 5 (comparison table) + Part 6 (our test of success)")],
    takeaway="Skill lives in the hands and is disappearing; PARAMPARA records it as a fingerprint, teaches it by touch, then fades, and nothing else does all of that.",
    reading="Row 1: problem → solution. Row 2: the 6-step flow across the full width. Row 3: why it solves the problem → how it differs → the one-line USP.",
    parts=[
        P(1, "The problem", 0.40, 1.05, 4.05, 2.35, M, [
            T(0.52, 1.45, 3.81, 0.40, "Craft skill lives in the hands. It passes on only face to face, over years.", 10, italic=True),
            T(0.52, 1.88, 1.30, 0.46, "35.22 lakh", 16, M, font="head", bold=True, valign="middle"),
            T(1.86, 1.88, 2.47, 0.46, "handloom weavers and allied workers in 2019–20, down from 43.32 lakh [1]", 9),
            T(0.52, 2.37, 1.30, 0.46, "≈ 2,800", 16, M, font="head", bold=True, valign="middle"),
            T(1.86, 2.37, 2.47, 0.46, "Kathputli and folk-artist families moved out of Delhi's colony in 2017 [2]", 9),
            T(0.52, 2.86, 1.30, 0.46, "3 lakh+ hrs", 16, M, font="head", bold=True, valign="middle"),
            T(1.86, 2.86, 2.47, 0.46, "of heritage audio-video found by NCAA: sound and sight, not movement [3]", 9),
        ], "How it addresses the problem (the problem side, with numbers)",
           "One sentence of context and three numbers with sources. Numbers in maroon so the eye lands on them first."),
        P(2, "Proposed solution", 4.60, 1.05, 8.33, 2.35, M, [
            I(4.72, 1.50, 4.75, 1.33, A + "sleeve_dorsal_transparent.png", "CAD render"),
            T(4.72, 2.90, 4.75, 0.44, "Right-arm sleeve, back view: 9 motion sensors (blue), 8 vibration motors (brass), forearm hub (green).", 8.5, MU, italic=True),
            T(9.62, 1.46, 3.19, 0.42, "**One sleeve per arm + one sensor kit per craft tool + an app.**", 10),
            B(9.62, 1.92, 3.19, 1.42, [
                "**Captures:** 9 motion sensors from fingers to shoulder, plus the tool (drum strokes, beater, puppet)",
                "**Teaches:** 8 coin motors pulse the finger or joint that should move next",
                "**Fades:** cues drop as the unaided score rises; the final test is device-off",
            ], 9),
        ], "Detailed explanation of the proposed solution",
           "The whole sleeve (CAD render) on the left so the judge sees the device; three verbs on the right say what it does."),
        P(3, "How it works", 0.40, 3.55, 12.53, 1.20, M, [
            CH(0.52, 3.94, 2.00, 0.72, "**1 SENSE**\nSleeve and tool sensor record the master, 200 samples/s", MT, size=8.5, first=True),
            CH(2.58, 3.94, 2.00, 0.72, "**2 FINGERPRINT**\nTiming, strength, joint order and spread over ≥ 20 cycles", BT, size=8.5),
            CH(4.64, 3.94, 2.00, 0.72, "**3 TEACH**\nA pulse on the right finger or joint, just before each stroke", RT, size=8.5),
            CH(6.70, 3.94, 2.00, 0.72, "**4 FADE**\nA check every 4th cycle; cues drop as the score rises", GT, size=8.5),
            CH(8.76, 3.94, 2.00, 0.72, "**5 MEASURE**\nDevice-off test: the unaided score is the result", BT, size=8.5),
            CH(10.82, 3.94, 2.00, 0.72, "**6 OWN**\nMaster consents, approves, is credited; data stays local", MT, size=8.5),
        ], "Detailed explanation (the process, as a flow)",
           "Six arrow shapes across the full width: the pipeline in one glance. Full width because it is the spine of the idea."),
        P(4, "How it solves the problem", 0.40, 4.90, 4.05, 2.05, M, [
            T(0.52, 5.31, 1.55, 0.46, "Skill can't be written down", 9, M, bold=True, fill=MT, valign="middle", pad=0.06),
            AR(2.09, 5.54, 2.21, 5.54, M),
            T(2.25, 5.31, 2.08, 0.46, "Recorded as a measurable fingerprint, fingers to shoulder", 9, valign="middle"),
            T(0.52, 5.84, 1.55, 0.46, "A master's time = one room", 9, M, bold=True, fill=MT, valign="middle", pad=0.06),
            AR(2.09, 6.07, 2.21, 6.07, M),
            T(2.25, 5.84, 2.08, 0.46, "The kit guides practice between lessons; the master approves", 9, valign="middle"),
            T(0.52, 6.37, 1.55, 0.46, "No fair check of learning", 9, M, bold=True, fill=MT, valign="middle", pad=0.06),
            AR(2.09, 6.60, 2.21, 6.60, M),
            T(2.25, 6.37, 2.08, 0.46, "Same device-off test for everyone, 48 h later", 9, valign="middle"),
        ], "How it addresses the problem (gap → answer)",
           "Three gaps, each with an arrow to our answer. This is the sentence judges look for under 'how it addresses the problem'."),
        P(5, "Innovation & uniqueness", 4.60, 4.90, 5.25, 2.05, M, [
            TB(4.70, 5.28, 5.05, 1.62, [1.42, 0.78, 1.02, 0.85, 0.98], [
                ["", "Video apps", "Mocap or haptic suit", "TIKL lab suit [4]", "PARAMPARA"],
                ["Measures the learner", "✗", "✓", "✓", "✓"],
                ["Teaches one master's style", "✗", "✗", "✗", "✓"],
                ["Finger and joint cues", "✗", "partial", "joints only", "✓"],
                ["Fades, tests device-off", "✗", "✗", "✗", "✓"],
                ["Cost", "low", "US$5–12k+ [5,6]", "optical lab", "₹20–32k"],
            ], size=8.5, hl_col=4, first_bold=True, align="center"),
        ], "Innovation and uniqueness",
           "A ✓/✗ comparison against the three closest alternatives, with our column tinted maroon. Judges read uniqueness from tables faster than from sentences."),
        P(6, "Our test of success", 10.00, 4.90, 2.93, 2.05, WHITE, [
            T(10.12, 5.30, 2.69, 0.88, "“The device succeeds only when the learner no longer needs it.”", 13, WHITE, font="head", bold=True),
            T(10.12, 6.20, 2.69, 0.68, "Confound-proof: a fingerprint counts only if it names the master on a new day and a new instrument (≥ 70%, chance 33%).", 8.5, "F3E3C0"),
        ], "Innovation (the single unique selling point)",
           "The one sentence we want judges to repeat, on the only dark panel of the slide so it is remembered.",
           fill=M, border=M, title_color=WHITE, badge=BR),
    ],
    notes="Craft skill lives in the hands, and the numbers show it is thinning out. PARAMPARA is one sleeve per arm, a sensor kit for the tool and an app. It senses the master, builds a fingerprint, teaches it by pulses on the right finger or joint, fades the cues, and measures the learner with the device off. The master owns the data. Video apps don't measure the learner, motion-capture suits cost lakhs and don't teach one master's style, and lab suits like TIKL need an optical lab. Our test of success: the device succeeds only when the learner no longer needs it.",
    donts=["No paragraph longer than two lines.", "Do not claim the sleeve improves learning; say it measures and tests it.",
           "Every number keeps its [n] source marker."],
))

# ----------------------------------------------------------------------------------------------- 3 TECHNICAL
sx, sy, sw = 0.52, 1.48, 4.96          # sleeve render
s_sh = anchor("sleeve_iso", "shoulder pod (IMU + motor)", sx, sy, sw)
s_wr = anchor("sleeve_iso", "wrist pod (forearm IMU + motor)", sx, sy, sw)
s_hub = anchor("sleeve_iso", "hub (ESP32-S3, battery)", sx, sy, sw)
kx, ky, kw = 0.52, 2.80, 2.70          # hand render
k_ring = anchor("hand_iso", "middle ring (IMU)", kx, ky, kw)
k_mot = anchor("hand_iso", "middle motor", kx, ky, kw)
k_brd = anchor("hand_iso", "hand board (IMU, 5 drivers)", kx, ky, kw)
k_wr = anchor("hand_iso", "wrist pod (forearm IMU + motor)", kx, ky, kw)

SLIDES.append(dict(
    n=3, key="technical", name="Technical approach",
    title="Technical approach: the sleeve hardware, firmware and teaching method",
    asks=["Technologies to be used (programming languages, frameworks, hardware)",
          "Methodology and process for implementation (flow charts, images, working prototype)"],
    mapping=[("Technologies: hardware", "Part 1 (CAD of the equipment) + Part 2 (exact components) + Part 3 (electronics)"),
             ("Technologies: languages and frameworks", "Part 5 (tech-stack chips)"),
             ("Methodology / process, as a flow chart", "Part 4 (6-step teaching process)"),
             ("Images", "Parts 1 and 5 (CAD renders, exploded views)"),
             ("Working prototype", "Part 6 (phone prototype screenshot, QR, test results)")],
    takeaway="Every part is named, sized and wired; the method is a clear six-step flow; and a prototype already runs.",
    reading="Left column = the device (what it looks like, then how it is taught). Middle = what it is made of. Right = how it is wired, then proof it works.",
    parts=[
        P(1, "The equipment · CAD, to scale", 0.40, 1.05, 5.20, 3.45, BL, [
            I(sx, sy, sw, 1.27, A + "sleeve_iso_transparent.png", "CAD render"),
            I(kx, ky, kw, 1.64, A + "hand_iso_transparent.png", "CAD render"),
            I(3.40, 2.85, 2.08, 1.34, A + "hand_palmar_transparent.png", None),
            T(3.40, 4.20, 2.08, 0.24, "Palm side: palm and fingertips free", 8.5, MU, italic=True, align="center"),
            CO("D", s_sh[0], s_sh[1]), CO("D", s_wr[0], s_wr[1]), CO("E", s_hub[0], s_hub[1]),
            CO("A", k_ring[0], k_ring[1]), CO("B", k_mot[0], k_mot[1]), CO("C", k_brd[0], k_brd[1]),
        ], "Technologies: hardware (what the equipment looks like)",
           "The full sleeve on top, the hand end below, the palm side as an inset. Letters A–E on the renders match the rows of the parts table in Part 2."),
        P(2, "Exact components (per arm)", 5.75, 1.05, 3.85, 3.45, BL, [
            TB(5.85, 1.46, 3.65, 2.98, [0.32, 2.85, 0.48], [
                ["", "Part · datasheet facts", "Qty"],
                ["A D", "**BMI270** IMU · 2.5 × 3.0 × 0.83 mm · 16-bit · 2 KB FIFO [8]", "9"],
                ["B D", "**C08-005** coin LRA · Ø8 × 3.3 mm · 235 Hz · 1.8 V [12]", "8"],
                ["B D", "**DRV2605L** haptic driver · closed loop · I2C 0x5A [9]", "8"],
                ["C E", "**TCA9548A** I2C switch · 8 channels · 400 kHz [10]", "2"],
                ["E", "**ESP32-S3-MINI-1** · 240 MHz dual core · Wi-Fi · BLE 5 [11]", "1"],
                ["E", "**MCP73831** charger [13] + 1,000 mAh LiPo + microSD", "1"],
                ["T", "**Tabla kit:** 2 × Murata 7BB-27-4L0 piezo, Ø27 mm [14] + base unit", "1"],
            ], size=8.5, head_fill=BT, head_color=BL),
        ], "Technologies: hardware (exact parts with datasheet numbers)",
           "Every chip by part number with the datasheet fact that made us choose it. Letters link each row to the render; T = tabla kit."),
        P(3, "Electronics", 9.75, 1.05, 3.18, 3.45, BL, [
            T(9.87, 1.46, 2.94, 0.50, "**Hand bus · I2C1 · 400 kHz**\nTCA9548A → 6 IMUs + 5 drivers", 8.5, fill=BT, border=BL, pad=0.05, align="center", radius=0.05),
            T(9.87, 2.03, 2.94, 0.50, "**Arm bus · I2C0 · 400 kHz**\nTCA9548A → 3 IMUs + 3 drivers", 8.5, fill=BT, border=BL, pad=0.05, align="center", radius=0.05),
            AR(11.34, 2.55, 11.34, 2.70, BL),
            T(9.87, 2.72, 2.94, 0.52, "**Forearm hub · ESP32-S3**\n1,000 mAh LiPo · microSD log · USB-C", 8.5, fill=GT, border=G, pad=0.05, align="center", radius=0.05),
            AR(11.34, 3.26, 11.34, 3.52, G),
            T(11.42, 3.27, 1.40, 0.24, "ESP-NOW + shared clock", 7.5, MU, italic=True),
            T(9.87, 3.54, 1.42, 0.52, "**Tool node**\npiezo · loom · puppet", 8.5, fill=RT, border=BR, pad=0.04, align="center", radius=0.05),
            T(11.39, 3.54, 1.42, 0.52, "**App**\nphone or laptop", 8.5, fill=RT, border=BR, pad=0.04, align="center", radius=0.05),
            T(9.87, 4.10, 2.94, 0.36, "Driver address is fixed (0x5A), so one switch channel per finger; each segment < 100 pF vs 400 pF limit [15].", 7.5, MU, italic=True),
        ], "Technologies: hardware (how it is wired)",
           "A simple block diagram drawn with native shapes (not a pasted picture): two I2C buses → hub → radio → tool node and app."),
        P(4, "Methodology · teaching process", 0.40, 4.65, 5.20, 2.30, M, [
            T(0.52, 5.06, 1.55, 0.82, "**1 RECORD**\n3 masters × 2 days × 2 instruments × 20 cycles", 8.5, fill=MT, pad=0.06, radius=0.05),
            AR(2.08, 5.47, 2.22, 5.47, M),
            T(2.23, 5.06, 1.55, 0.82, "**2 EXTRACT**\nBody · tool · rhythm · consistency features", 8.5, fill=MT, pad=0.06, radius=0.05),
            AR(3.79, 5.47, 3.93, 5.47, M),
            T(3.94, 5.06, 1.55, 0.82, "**3 CONFOUND TEST**\nNew day ≥ 70% · new instrument ≥ 70% · p < 0.01", 8.5, fill=MT, pad=0.06, radius=0.05),
            AR(4.71, 5.89, 1.30, 6.03, M),
            T(0.52, 6.05, 1.55, 0.82, "**4 TEACH**\n40 ms pulse ending 80 ms before the stroke", 8.5, fill=RT, pad=0.06, radius=0.05),
            AR(2.08, 6.46, 2.22, 6.46, M),
            T(2.23, 6.05, 1.55, 0.82, "**5 FADE**\nCheck every 4th cycle; guidance ± 0.2 per check", 8.5, fill=RT, pad=0.06, radius=0.05),
            AR(3.79, 6.46, 3.93, 6.46, M),
            T(3.94, 6.05, 1.55, 0.82, "**6 SCORE**\nDevice-off unaided score; move on at ≥ 85% on 2 days", 8.5, fill=GT, pad=0.06, radius=0.05),
        ], "Methodology and process (flow chart)",
           "Six boxes in two rows with arrows: record → extract → confound test (row 1, building the fingerprint), teach → fade → score (row 2, teaching it)."),
        P(5, "Inside the pods · tech stack", 5.75, 4.65, 3.85, 2.30, BL, [
            I(5.92, 5.04, 0.42, 0.92, A + "ring_exploded_transparent.png", None),
            I(6.52, 5.04, 0.42, 0.92, A + "motor_exploded_transparent.png", None),
            I(7.12, 5.04, 0.92, 0.92, A + "hand_exploded_transparent.png", None),
            I(8.30, 5.04, 0.80, 0.92, A + "hub_exploded_transparent.png", None),
            T(5.80, 5.97, 0.70, 0.18, "Ring IMU", 7.5, MU, align="center"),
            T(6.40, 5.97, 0.70, 0.18, "Motor pod", 7.5, MU, align="center"),
            T(7.10, 5.97, 0.96, 0.18, "Hand board", 7.5, MU, align="center"),
            T(8.22, 5.97, 0.96, 0.18, "Hub", 7.5, MU, align="center"),
            T(5.87, 6.20, 1.78, 0.21, "C++17 firmware · ESP32-S3", 8, BL, fill=BT, align="center", valign="middle", radius=0.1),
            T(7.72, 6.20, 1.78, 0.21, "ESP-NOW radio · clock sync", 8, BL, fill=BT, align="center", valign="middle", radius=0.1),
            T(5.87, 6.44, 1.78, 0.21, "Python · NumPy · mido", 8, BL, fill=BT, align="center", valign="middle", radius=0.1),
            T(7.72, 6.44, 1.78, 0.21, "HTML5 · Web Audio app", 8, BL, fill=BT, align="center", valign="middle", radius=0.1),
            T(5.87, 6.68, 1.78, 0.21, "CadQuery → STEP / STL", 8, BL, fill=BT, align="center", valign="middle", radius=0.1),
            T(7.72, 6.68, 1.78, 0.21, "Unit + Playwright E2E tests", 8, BL, fill=BT, align="center", valign="middle", radius=0.1),
        ], "Images (exploded views) + technologies: languages and frameworks",
           "Four exploded CAD views prove every housing is designed down to the board; six chips list the software stack."),
        P(6, "Working today", 9.75, 4.65, 3.18, 2.30, G, [
            I(9.87, 5.05, 1.45, 1.29, F + "v6_lite_screenshot.png", "Screenshot"),
            I(11.47, 5.05, 0.85, 0.85, A + "qr_parampara_lite.png", None),
            T(11.42, 5.92, 1.42, 0.40, "Scan: try the phone prototype", 8, MU, align="left"),
            T(9.87, 6.38, 2.94, 0.52, "**E2E test PASS:** on time 99.96% · 60 ms late 75.0% · silent 0%\n**Firmware:** 27/27 checks · clock sync 63 µs", 8),
        ], "Working prototype",
           "A real screenshot of running software, a QR to try it, and the automated test numbers. Green = it works today.",
           fill=GT, border=G),
    ],
    notes="Each arm wears nine BMI270 motion sensors and eight coin vibration motors, each motor with its own DRV2605L driver. Because that driver has a fixed address, we use two TCA9548A switches, one per bus. An ESP32-S3 hub logs everything at full rate to microSD and talks to the tool node and the app by radio with a shared clock. The method: record three masters on two days and two instruments, extract features, and keep only what survives the confound test; then teach with pulses just before each stroke, fade, and score the learner with the device off. The teaching loop already runs on a phone and passes automated tests, and the firmware core passes 27 of 27 checks.",
    donts=["Do not paste the block diagram as a tiny picture; draw it with shapes so it stays readable.",
           "Do not label CAD renders as photos.", "Keep part numbers exact (BMI270, DRV2605L, TCA9548A, ESP32-S3-MINI-1, C08-005, MCP73831, 7BB-27-4L0)."],
))

# ----------------------------------------------------------------------------------------------- 4 FEASIBILITY
cost = [("Sensors, drivers, switches", 3.3, 5.6), ("Coin motors", 3.0, 7.0), ("Hubs, power, storage", 4.0, 5.7),
        ("Assembled circuit boards", 4.0, 6.0), ("Housings, straps, fabric", 3.0, 4.0), ("Three tool kits", 2.5, 3.7)]
cost_items = []
for i, (lab, lo, hi) in enumerate(cost):
    y = 2.06 + i * 0.215
    cost_items += [T(4.97, y, 1.62, 0.20, lab, 8, valign="middle"),
                   T(6.62, y + 0.035, round(1.30 * (lo + hi) / 2 / 6.5, 2), 0.13, "", 8, fill=BR, radius=0.03),
                   T(7.98, y, 0.66, 0.20, f"₹{lo:g}–{hi:g}k", 8, MU, valign="middle", align="right")]

SLIDES.append(dict(
    n=4, key="feasibility", name="Feasibility and viability",
    title="Feasibility & viability: buildable now, and every risk has a fallback",
    asks=["Analysis of the feasibility of the idea", "Potential challenges and risks", "Strategies for overcoming these challenges"],
    mapping=[("Feasibility analysis: technical", "Part 1 (engineering budgets)"),
             ("Feasibility analysis: economic", "Part 2 (prototype cost and comparison)"),
             ("Feasibility analysis: what is already done", "Part 3 (proof ladder: done / next / not claimed)"),
             ("Potential challenges and risks", "Part 4 (left column of the table)"),
             ("Strategies for overcoming them", "Part 4 (strategy + fallback columns) + Part 5 (8-week plan)"),
             ("Viability (who pays)", "Part 6 (institutions first, the model, the year-1 test)")],
    takeaway="It is buildable from off-the-shelf parts for about ₹20–32 thousand, the numbers add up, every risk has a fallback, and institutions already pay for this kind of teaching.",
    reading="Row 1: can it be built (technical) → can it be afforded (cost) → how far along is it (proof ladder). Row 2: what could go wrong → when it happens → who pays.",
    parts=[
        P(1, "Technical feasibility · budgets", 0.40, 1.05, 4.30, 2.70, BL, [
            TB(0.50, 1.46, 4.10, 1.97, [0.78, 1.72, 1.60], [
                ["Budget", "Calculation", "Result"],
                ["Data", "9 IMUs × 12 B × 200 per s", "21.6 kB/s · hand bus 36% used ✓"],
                ["Battery", "≈ 142 mA from 1,000 mAh × 80%", "≈ 5.6 h (est.) vs ≥ 3 h ✓"],
                ["Mass", "CAD volumes + parts", "≈ 160 g per arm, ≈ 30 g on hand (est.)"],
                ["I2C load", "45 cm cable + 2 devices", "< 100 pF vs 400 pF limit ✓"],
                ["Sync", "Timestamp exchange + drift fit", "≤ 2 ms target · 63 µs in simulation"],
            ], size=9, head_fill=BT, head_color=BL, first_bold=True),
            T(0.50, 3.45, 4.10, 0.25, "est. = calculated from datasheets; bench tests H1–H8 confirm it.", 8, MU, italic=True),
        ], "Feasibility analysis (technical)",
           "Five engineering budgets with the calculation shown. This is what a hardware reviewer checks first: does data, power, weight, bus and timing fit?"),
        P(2, "Economic feasibility · cost", 4.85, 1.05, 3.90, 2.70, BR, [
            T(4.97, 1.44, 1.75, 0.55, "₹20–32k", 24, M, font="head", bold=True, valign="middle"),
            T(6.74, 1.46, 1.90, 0.52, "two sleeves + three tool kits, prototype (est.)", 8.5, MU, valign="middle"),
            *cost_items,
            T(4.97, 3.35, 3.66, 0.34, "vs Teslasuit ≈ US$5,000 [6] · Xsens MVN US$12,430 [5]: over 10× cheaper. Volume target ₹5–7k per sleeve.", 8),
        ], "Feasibility analysis (economic)",
           "One big number, a bar per cost group (draw it as a native bar chart), and the comparison with commercial suits."),
        P(3, "Proof ladder · done vs next", 8.90, 1.05, 4.03, 2.70, G, [
            T(9.02, 1.46, 3.79, 0.80, "**DONE ✓**  CAD and STEP for every housing · firmware core 27/27 checks · phone prototype, E2E PASS · pre-test on 7 real drummers", 8.5, fill=GT, border=G, pad=0.06, radius=0.05),
            T(9.02, 2.32, 3.79, 0.78, "**NEXT 8 WEEKS**  bench tests H1–H8 · E0: sleeve doesn't change masters · E1: confound-proof fingerprint · E5a and E5 pilots (16 people)", 8.5, fill=BT, border=BL, pad=0.06, radius=0.05),
            T(9.02, 3.16, 3.79, 0.52, "**NOT CLAIMED YET**  a built sleeve · masters' fingerprints · a learning effect", 8.5, fill=NT, border=BD, pad=0.06, radius=0.05),
        ], "Feasibility analysis (stage of development)",
           "Three bands: done (green), next 8 weeks (blue), not claimed yet (grey). Honesty here earns trust everywhere else."),
        P(4, "Challenges → strategies → fallback", 0.40, 3.90, 6.10, 3.05, M, [
            TB(0.50, 4.31, 5.90, 2.58, [1.72, 2.48, 1.70], [
                ["Challenge or risk", "Strategy", "Fallback"],
                ["Masters not available in time", "Week-1 outreach: Zonal Cultural Centres, Weavers' Service Centres, music colleges", "Senior practitioners, stated clearly"],
                ["Sleeve changes how masters play", "Light rings fitted with the master; E0 equivalence test (± 10 ms) [26]", "Hand, wrist, elbow sensors only"],
                ["Fingerprint near pass mark (pre-test 66%)", "Add movement features; record 30 cycles", "Graded claim, fixed in advance"],
                ["Finger cues not felt while striking", "Cue before the movement; stronger pulse (E2)", "Move the cue to the wrist"],
                ["Assembled boards arrive late", "Order in week 1; breakout boards from day 1", "Larger rings on breakouts"],
                ["Radio trouble at the venue", "Full-rate microSD log; cues stored on the sleeve", "USB cable; backup video"],
            ], size=9, head_fill=MT, head_color=M, first_bold=True),
        ], "Potential challenges and risks + strategies for overcoming them",
           "Six real risks, each with what we do and what we fall back to. Three columns answer two template questions at once."),
        P(5, "8-week build plan", 6.65, 3.90, 2.95, 3.05, BL, [
            *[x for i, (wk, txt) in enumerate([
                ("W1", "Order PCBs, print housings, E5a starts"), ("W2", "Hub firmware, tabla kit · H2 H3 H8"),
                ("W3", "Both sleeves built · H4–H7 · E2 E4"), ("W4", "Masters day 1 · E0 · fingerprint code"),
                ("W5", "Day 2, instruments swapped · E1"), ("W6", "Puppeteers and weavers · E0 E1"),
                ("W7", "Pilot E5: 16 beginners, 48 h test"), ("W8", "Full demo · 3 rehearsals · real numbers")])
              for x in (T(6.77, 4.31 + i * 0.32, 0.40, 0.25, wk, 8, WHITE, bold=True, fill=BL, align="center", valign="middle", radius=0.05),
                        T(7.22, 4.31 + i * 0.32, 2.30, 0.27, txt, 8, valign="middle"))],
        ], "Strategies (when each step happens)",
           "A vertical week-by-week timeline: judges see the team has a dated plan, not a wish."),
        P(6, "Viability · who pays", 9.75, 3.90, 3.18, 3.05, BR, [
            T(9.87, 4.31, 2.94, 0.24, "**Institutions first** (they already pay for teaching):", 8.5),
            B(9.87, 4.58, 2.94, 1.30, [
                "Guru-Shishya Parampara gurus (₹7,500 a month honorarium) [21]",
                "28 Weavers' Service Centres; 315-hour NSQF course [22, 23]",
                "CBSE 036 schools and music colleges [24]",
                "IGNCA's national archive, NCAA [3]",
            ], 8.5),
            T(9.87, 5.94, 2.94, 0.48, "**Model:** kit + yearly licence; masters earn a share when their fingerprint is used; CSR and grants.", 8.5),
            T(9.87, 6.46, 2.94, 0.42, "**Year-1 test:** 3 signed letters of intent (a hypothesis until signed).", 8.5, fill=RT, pad=0.05, valign="middle"),
        ], "Viability",
           "Who pays and why they would: existing state schemes and institutions, the business model, and a measurable first-year test."),
    ],
    notes="Feasibility first: data, power, weight, bus load and timing all fit, with the calculation on the slide. The prototype costs about twenty to thirty-two thousand rupees for two sleeves and three tool kits, more than ten times cheaper than a commercial suit. Here is honestly where we are: what is done, what the next eight weeks prove, and what we do not claim yet. Each risk has a strategy and a fallback, and the eight-week plan shows when each test happens. Viability: institutions already pay gurus and training centres; we sell kits and licences, masters earn a share, and our first-year test is three signed letters of intent.",
    donts=["Do not hide the 'not claimed yet' band; it is what makes the rest believable.",
           "Mark every estimate as est.", "Do not show revenue projections; there is no data for them yet."],
))

# ----------------------------------------------------------------------------------------------- 5 IMPACT
aud = [
    ("Masters & gurus", "Tabla ustads, Guru-Shishya gurus", "Their own way of playing preserved, credited and shared on their terms", "masters recorded; their approval"),
    ("Learners", "CBSE 036 students, music colleges", "Practise against a real master between lessons; see honest progress", "unaided score 48 h later"),
    ("Weavers & trainers", "35.22 lakh weavers · 28 WSCs", "Training aid with skill evidence; shoulder feedback (76% report pain [25])", "time with shoulder raised (to test)"),
    ("Puppeteers", "Kathputli families and troupes", "A credited record of their technique and a kit for workshops", "puppeteers recorded; workshops run"),
    ("Archives & research", "IGNCA / NCAA, universities", "A new kind of record: how masters move, with consent", "consented fingerprints deposited"),
]
aud_items = []
for i, (who, scale, ben, meas) in enumerate(aud):
    x = 0.52 + i * 2.49
    aud_items += [T(x, 1.46, 2.37, 2.10, "", 8, fill="FAFAFA", border=BD, radius=0.05),
                  T(x + 0.10, 1.55, 0.40, 0.40, str(i + 1), 11, WHITE, font="head", bold=True, fill=M, align="center", valign="middle", radius=0.2),
                  T(x + 0.58, 1.55, 1.72, 0.40, who, 11, M, font="head", bold=True, valign="middle"),
                  T(x + 0.10, 2.01, 2.17, 0.24, scale, 8, MU, italic=True),
                  T(x + 0.10, 2.28, 2.17, 0.74, ben, 10),
                  T(x + 0.10, 3.06, 2.17, 0.42, "**Measured by:** " + meas, 8, fill=MT, pad=0.05, valign="middle")]

SLIDES.append(dict(
    n=5, key="impact", name="Impact and benefits",
    title="Impact & benefits: who gains, and how we will measure it",
    asks=["Potential impact on the target audience", "Benefits of the solution (social, economic, environmental, etc.)"],
    mapping=[("Potential impact on the target audience", "Part 1 (five stakeholder cards, each with a measure)"),
             ("Social benefits", "Part 2"), ("Economic benefits", "Part 3"), ("Environmental benefits", "Part 4"),
             ("(not asked, judges value it) Alignment and scale", "Part 5 (SDGs) + Part 6 (roadmap)")],
    takeaway="Five groups gain something concrete, each benefit has a way to measure it, and the benefits are social, economic and environmental.",
    reading="Top: who gains (one card each). Middle: three benefit columns, exactly as the template names them. Bottom: SDGs and the scale-up path.",
    parts=[
        P(1, "Target audience · who gains and how we measure it", 0.40, 1.05, 12.53, 2.60, M, aud_items,
          "Potential impact on the target audience",
          "Five cards in one row, each with who, how many, the benefit and how we will measure it. A benefit with a measure reads as a plan, not a promise."),
        P(2, "Social benefits", 0.40, 3.80, 4.08, 2.00, M, [
            B(0.52, 4.21, 3.84, 1.52, [
                "Keeps living crafts teachable beyond one room and one lifetime",
                "Masters stay in control: consent, approval, credit",
                "A fair check of learning: the same device-off test for all",
                "Possible, not yet tested: feeling the beat by vibration, for 50.7 lakh people with hearing disability [27]",
            ], 10),
        ], "Benefits: social", "Four social benefits; the untested one is labelled as such."),
        P(3, "Economic benefits", 4.63, 3.80, 4.07, 2.00, BR, [
            B(4.75, 4.21, 3.83, 1.52, [
                "Kit over 10× cheaper than mocap or haptic suits; ₹5–7k per sleeve at volume (target)",
                "State-funded teaching (GSP, SAMARTH) leaves a reusable output",
                "New income: masters share in every licensed use of their fingerprint",
                "Skill evidence for weavers next to the 315-hour NSQF course",
            ], 10),
        ], "Benefits: economic", "Cost advantage, value for existing schemes, income for masters, evidence for weavers."),
        P(4, "Environmental benefits", 8.85, 3.80, 4.08, 2.00, G, [
            B(8.97, 4.21, 3.84, 1.52, [
                "One sleeve, three crafts: only the tool kit changes",
                "Clip-out pods: repair one pod, not the whole sleeve; washable fabric",
                "Low power: ≈ 142 mA, one 1,000 mAh cell, USB-C; no consumables",
                "Open STEP/STL files: housings printed on demand, no moulds",
            ], 10),
        ], "Benefits: environmental", "Reuse, repairability, low power and no tooling, all true from the design itself."),
        P(5, "SDG alignment", 0.40, 5.95, 4.70, 1.00, BL, [
            T(0.52, 6.34, 1.44, 0.54, "**SDG 4**\nQuality education", 8.5, WHITE, fill="C5192D", pad=0.05, valign="middle", radius=0.04),
            T(2.04, 6.34, 1.44, 0.54, "**SDG 8**\nDecent work", 8.5, WHITE, fill="A21942", pad=0.05, valign="middle", radius=0.04),
            T(3.56, 6.34, 1.42, 0.54, "**SDG 11.4**\nSafeguard heritage", 8.5, WHITE, fill="FD9D24", pad=0.05, valign="middle", radius=0.04),
        ], "Impact alignment (extra)", "Three official SDG tiles in their official colours [28]."),
        P(6, "Scale-up roadmap · each step only if its tests pass", 5.25, 5.95, 7.68, 1.00, M, [
            CH(5.37, 6.34, 2.44, 0.54, "**0–6 months** 120-person tabla trial · handloom pilot · flexible sleeve", MT, size=8, first=True),
            CH(7.87, 6.34, 2.44, 0.54, "**6–12 months** Style-level teaching · NCAA archive pilot", RT, size=8),
            CH(10.37, 6.34, 2.44, 0.54, "**12+ months** Kathak footwork, pottery, glove and shadow puppetry", GT, size=8),
        ], "Impact at scale (extra)", "Three arrow stages; each starts only when its tests pass."),
    ],
    notes="Five groups gain, and each benefit has a measure. Masters keep their own way of playing, credited. Learners practise against a real master and see honest progress. Weavers get a training aid and shoulder feedback. Puppeteers get a credited record, and archives get something they don't have: how masters move. Socially, crafts stay teachable and masters stay in control. Economically, the kit is over ten times cheaper than a suit and masters earn when their fingerprint is used. Environmentally, one sleeve serves three crafts, pods are repairable, and nothing needs moulds.",
    donts=["Do not claim a learning improvement or a health effect; say 'to be tested'.",
           "Do not invent user numbers; use only the sourced figures.", "Use the official SDG colours and numbers only."],
))

# ----------------------------------------------------------------------------------------------- 6 REFERENCES
SLIDES.append(dict(
    n=6, key="references", name="Research and references",
    title="Research & references: what we tested, what science says, where facts come from",
    asks=["Details and links of the research and references"],
    mapping=[("Research we did ourselves", "Part 1 (real-data pre-test with its chart)"),
             ("Research by others", "Part 2 (key numbers from papers)"),
             ("References with links", "Parts 3 and 4 (numbered, hyperlinked) + Part 5 (repository QR)")],
    takeaway="This team tested its own assumptions on real data, every claim has a checkable source, and everything can be re-run.",
    reading="Top: our own evidence (left) beside published evidence (right). Bottom: numbered sources by type, and a QR to reproduce everything.",
    parts=[
        P(1, "Our own test on real performer data", 0.40, 1.05, 6.75, 2.85, G, [
            I(1.04, 1.42, 5.48, 2.10, F + "v5_gmd_results.png", None),
            T(0.52, 3.56, 6.51, 0.30, "Our analysis of real data. 7 drummers, 4,118 units: named at ≈ 3× chance on a new session; same grooves 63% vs 26% (chance 25%) [7]", 8, MU, italic=True),
        ], "Research (our own)",
           "The chart from our pre-test on the public Groove MIDI Dataset. It shows the method works on real performers and why the sleeve is needed (timing alone sits near the pass mark)."),
        P(2, "Published evidence · key numbers", 7.30, 1.05, 5.63, 2.85, BL, [
            TB(7.40, 1.46, 5.43, 2.38, [2.40, 2.05, 0.98], [
                ["Finding", "Number", "Source"],
                ["Joint vibration suit, copying a teacher", "error −27%, learning +23% faster", "[4] 2007"],
                ["Haptic guidance in a drumming task", "−17% loudness, −18% early timing error", "[16] 2008"],
                ["Drum and strength cues felt on the body", "96.18% recognised", "[17]"],
                ["Piano: vibration vs visual cues (n = 14)", "timing error 12.1% vs 22.3%", "[18] 2024"],
                ["Feedback on fewer trials", "better retention", "[19] 1990"],
                ["Experts move shoulder → elbow → wrist", "expertise shows in joint order", "[20] 2007"],
                ["Tabla gharanas recognised from audio", "style leaves a measurable trace", "[29] 2021"],
            ], size=9, head_fill=BT, head_color=BL),
        ], "Research (published)", "Six findings with their key number, so judges see the science behind each design choice."),
        P(3, "Equipment datasheets and science", 0.40, 4.05, 4.10, 2.90, BL, [
            T(0.52, 4.46, 3.86, 2.44, "\n".join([
                "[4] Lieberman & Breazeal, TIKL, IEEE T-RO 2007",
                "[8] Bosch Sensortec, BMI270 datasheet",
                "[9] Texas Instruments, DRV2605L datasheet",
                "[10] Texas Instruments, TCA9548A datasheet",
                "[11] Espressif, ESP32-S3-MINI-1 datasheet",
                "[12] Precision Microdrives, C08-005 LRA",
                "[13] Microchip, MCP73831 datasheet",
                "[14] Murata, 7BB-27-4L0 piezo diaphragm",
                "[15] NXP, UM10204 I2C-bus specification",
                "[16] Grindlay, IEEE HAPTICS 2008",
                "[17] Lee & Choi, vibrotactile drumming guidance",
                "[18] Coscia & Al Borno, arXiv 2406.06720",
                "[19] Winstein & Schmidt, J Exp Psych 1990",
                "[20] Furuya & Kinoshita, Neurosci Lett 2007",
                "[29] Gowriprasad et al., tabla gharanas, ISMIR 2021",
            ]), 8.5),
        ], "References (equipment and science), each hyperlinked", "Datasheets for every chip on slide 3 and the papers behind slide 6, numbered to match the [n] markers."),
        P(4, "Problem, policy and method sources", 4.65, 4.05, 4.10, 2.90, M, [
            T(4.77, 4.46, 3.86, 2.44, "\n".join([
                "[1] Ministry of Textiles, Handloom Census 2019–20",
                "[2] PARI, Delhi's kathputli artists (2017)",
                "[3] IGNCA, National Cultural Audiovisual Archives",
                "[5] Xsens MVN Link price, CG Channel 2021",
                "[6] Teslasuit price, TweakTown",
                "[7] Gillick et al., Groove MIDI Dataset, ICML 2019",
                "[21] Ministry of Culture, Guru-Shishya Parampara",
                "[22] Rajya Sabha: Weavers' Service Centres",
                "[23] Textiles Committee, NSQF TC HLM 06",
                "[24] CBSE, Hindustani music subject 036",
                "[25] Siddiqui et al., weavers' MSDs, 2021",
                "[26] Lakens, equivalence tests, 2017",
                "[27] Census of India 2011, disability",
                "[28] United Nations, SDG targets 4, 8, 11.4",
            ]), 8.5),
        ], "References (problem, policy and methods), each hyperlinked", "Government data, schemes and method papers behind slides 2, 4 and 5."),
        P(5, "Open, reproducible proof", 8.90, 4.05, 4.03, 2.90, BR, [
            I(9.02, 4.45, 1.20, 1.20, A + "qr_parampara_lite.png", None),
            T(10.32, 4.47, 2.49, 1.18, "**Scan to try PARAMPARA Lite** on your phone.\n\n**Code, CAD, data:** github.com/HarshDubey23/winner (PARAMPARA folder)", 8.5),
            B(9.02, 5.74, 3.79, 1.16, [
                "make -C firmware test → 27 checks, 0 failures",
                "python3 lite/e2e_test.py → PASS",
                "python3 sim/gmd_fingerprint.py → chart above",
                "CAD: STEP and STL for every housing in /cad",
                "Full dossier: 39 pages, 92 references",
            ], 8.5, mark="›", mcolor=BR, gap=2),
        ], "Links (repository and prototype)", "A QR and the exact commands anyone can run to reproduce every number in the deck.",
           fill=RT, border=BR),
    ],
    notes="We did not only read: we tested our method on real performer data. Seven drummers were named at about three times chance on a new session, and with identical grooves, how they played named them while which notes they played did not. Published studies back each design choice: joint vibration speeds learning, drum cues are recognised 96% of the time, and feedback on fewer trials improves retention. Every chip has its datasheet and every number has a source, and the QR and commands let anyone re-run our tests.",
    donts=["Do not list sources you have not opened.", "Every [n] on slides 2–5 must appear here.",
           "Make the QR point to a public link (GitHub Pages), not a private one."],
))

# ----------------------------------------------------------------------------------------------- references
REF_KEYS = {1: "handloomcensus", 2: "kathputlicolony", 3: "ncaa", 4: "tikl2007", 5: "xsens", 6: "teslasuit", 7: "gmd2019",
            8: "bmi270", 9: "drv2605lds", 10: "tca9548a", 11: "esp32s3mini", 12: "c08005", 13: "mcp73831", 14: "murata7bb",
            15: "um10204", 16: "grindlay2008", 17: "leechoi", 18: "coscia2024", 19: "winstein1990", 20: "furuya2007",
            21: "gsp", 22: "wsc", 23: "nsqfhandloom", 24: "cbse036", 25: "siddiqui2021", 26: "lakens2017", 27: "census2011",
            29: "gowriprasad2021"}
EXTRA_REFS = {28: dict(t="United Nations. Sustainable Development Goals: Goal 4 (target 4.4, skills), Goal 8 (decent work), Goal 11 (target 11.4, safeguard cultural heritage).", u="https://sdgs.un.org/goals")}

# ----------------------------------------------------------------------------------------------- image prompts (GPT)
IMAGE_PROMPTS = [
    dict(id="IMG-1", slide="1 (Part 3, optional swap) or 2 (Part 2)", file="concept_tabla_sleeve.png", ratio="16:9",
         upload=["hand_iso_transparent.png", "sleeve_iso_transparent.png"],
         label="Concept illustration (AI), based on our CAD design; not a photo of a built device",
         prompt="Use the two attached CAD renders as the exact design reference for the device; keep its parts, colours and proportions. Create a photorealistic studio photograph of an adult Indian tabla player's right forearm and hand resting over a dayan (the small right-hand tabla), wearing this exact sensor sleeve: a slim charcoal-grey stretch-fabric sleeve from upper arm to wrist; a rounded dark-navy box (62 × 44 × 16 mm) strapped on the forearm with a small green status light; small navy pods at the wrist, elbow and shoulder; on the back of the hand a flat navy board (42 × 32 × 8 mm) on a grey silicone pad; on every finger, between the knuckles, a thin black silicone ring carrying a tiny navy pod (13 × 11 × 4.4 mm) and, nearer the hand, a small brass-coloured coin pod (12 mm); thin flat grey cables run from each finger to the hand board. The palm and fingertips are completely uncovered. Fingers poised just above the black centre of the drum head, about to strike. Background: softly out-of-focus music room with warm wood, shallow depth of field, 85 mm lens look at f/2.8, soft key light from upper left, gentle rim light, natural skin tones, neutral colour grade (not orange). 16:9, 3840 × 2160. Exactly five fingers, realistic hands, no jewellery, no text, no logos, no watermark."),
    dict(id="IMG-2", slide="2 (Part 1 background, at 15% opacity) or 5 (Part 1)", file="context_guru_shishya.png", ratio="3:2",
         upload=[], label="Illustration (AI); or replace with a real CC-licensed photo with credit",
         prompt="Documentary-style photograph, natural window light: an elderly Indian tabla guru in a white kurta sits cross-legged on a cotton durrie facing a teenage student; the guru's hand lightly guides the student's right wrist above a tabla pair; a harmonium and a tanpura stand blurred in the background. Warm but realistic colours, 35 mm lens look, f/4, eye level, calm and respectful mood, both faces partly visible, nothing staged. 3:2, 3000 × 2000. No text, no logos, no watermark, realistic hands with five fingers."),
    dict(id="IMG-3", slide="1 (Part 4) or 5 (Part 1, Puppeteers card)", file="concept_kathputli.png", ratio="4:5",
         upload=["puppet_iso_transparent.png", "hand_iso_transparent.png"],
         label="Concept illustration (AI), based on our CAD design",
         prompt="Use the attached renders as the exact reference for the puppet pod and the finger rings. Photorealistic photograph of a Rajasthani Kathputli string puppet, about 50 cm tall, in a red and gold costume with a carved wooden head, hanging in front of a plain dark-maroon cloth backdrop. The puppeteer's hand is visible at the top of the frame: the strings are looped directly over the fingers (no control bar), and each finger wears a thin black ring with a tiny navy pod, matching the reference. A small cut-away window in the puppet's costume at the chest shows a 30 × 20 × 10 mm navy sensor box inside the wooden torso. Soft stage spotlight from above, slight haze, 50 mm lens look. 4:5, 2400 × 3000. No text, no logos, no watermark."),
    dict(id="IMG-4", slide="1 (Part 4) or 5 (Part 1, Weavers card)", file="concept_handloom.png", ratio="4:3",
         upload=["loom_iso_transparent.png"], label="Concept illustration (AI), based on our CAD design",
         prompt="Use the attached render as the exact reference for where the sensors go. Photorealistic photograph of an Indian two-treadle wooden frame handloom in a weaving centre, cotton cloth with a red border on the loom. A weaver's hands hold the wooden beater; a small navy box (about 40 × 25 × 12 mm) is strapped to the centre of the beater bar; two thin black switch pads sit under the two treadles; a smartphone on a small clamp arm looks down at the woven cloth. Daylight from a side window, dust in the light, 35 mm lens look, f/4. 4:3, 3200 × 2400. No faces needed, no text, no logos, no watermark."),
    dict(id="IMG-5", slide="1 (Part 3 alternative) or 3 (Part 5)", file="studio_ring_pod.png", ratio="1:1",
         upload=["ring_exploded_transparent.png"], label="Rendered from our CAD (image-to-image); same geometry",
         prompt="Use the attached CAD render as the exact geometry: keep every part, its position, size and proportion identical, and add nothing. Re-render it as a premium studio product shot of an exploded finger-ring sensor pod: top to bottom, a matte navy-blue PA12 nylon lid, a tiny green circuit board (10 × 8 mm) with one small black chip and a white 4-pin connector, a matte black base with a curved finger saddle, and a black silicone ring strap. Pure white background, soft contact shadows, three-quarter view from above at 30°, even softbox lighting, crisp edges, subtle material texture. 1:1, 2048 × 2048. No text, no labels, no logos, no watermark."),
    dict(id="IMG-6", slide="2 (Part 3) and 5 (Part 1)", file="icons_set.png", ratio="3:1",
         upload=[], label="Icons (no label needed); free alternative: Lucide icons",
         prompt="A set of 12 flat line icons in a 6 × 2 grid with equal spacing, on a pure white background. Uniform 2 px stroke, rounded line caps and joins, single colour #7A1F1F, no fills, no shadows, no text, same visual weight and the same 24 × 24 design grid for all. Row 1: (1) a forearm with three small signal arcs (sense); (2) a fingerprint drawn from wavy sound-wave lines (fingerprint); (3) a hand with small vibration arcs at one fingertip (teach); (4) three vertical bars getting shorter and lighter from left to right (fade); (5) a semicircular gauge with a check mark (measure); (6) a shield with a small person inside (own). Row 2: (7) a seated teacher figure; (8) a student figure with a book; (9) a simple handloom frame; (10) a string puppet; (11) an archive box; (12) a magnifier over a small bar chart. 3:1, 3000 × 1000."),
]

ICON_ALTS = [("Sense", "activity"), ("Fingerprint", "fingerprint"), ("Teach", "hand"), ("Fade", "trending-down"),
             ("Measure", "gauge"), ("Own", "shield-check"), ("Masters & gurus", "graduation-cap"), ("Learners", "book-open"),
             ("Weavers", "spool / scissors"), ("Puppeteers", "drama"), ("Archives", "archive"), ("Researchers", "microscope")]

# ----------------------------------------------------------------------------------------------- real equipment photo plan
BUY = [("ESP32-S3 dev board (ESP32-S3-DevKitC-1 or any ESP32-S3 board)", "1", "₹700–1,200"),
       ("BMI270 breakout board", "2", "₹600–1,200 each"),
       ("DRV2605L haptic driver breakout", "2", "₹350–700 each"),
       ("TCA9548A I2C switch breakout", "1", "₹200–400"),
       ("8 mm coin LRA vibration motor (C08-005 or similar 235 Hz LRA)", "2", "₹150–450 each"),
       ("27 mm piezo disc (Murata 7BB-27-4L0 or similar)", "2", "₹20–60 each"),
       ("Breadboard, jumper wires, velcro strap, 3.7 V LiPo + charger board", "1 set", "₹400–700")]
SHOTS = [
    ("Flat lay of every board", "All boards in a row on a dark cutting mat with a steel ruler; label cards under each part number", "Slide 3, Part 2 (small row of real photos under the table) or a backup slide"),
    ("Breadboard prototype", "ESP32-S3 + TCA9548A + 2 BMI270 + 2 DRV2605L + 2 LRAs wired and powered; LED on", "Slide 3, Part 6 (next to the phone screenshot)"),
    ("Coin motor on a finger", "LRA on a velcro ring on a team member's index finger, close-up, shallow focus", "Slide 2, Part 2 or Slide 3, Part 1 inset"),
    ("Live data", "Laptop screen with the serial plot of IMU data while the finger taps the tabla", "Slide 3, Part 6"),
    ("Piezo on the tabla", "Piezo disc taped to the dayan shell (not the head), cable to the board", "Slide 3, Part 2 (tabla kit row)"),
    ("Team at work", "Two members soldering or testing, faces visible, real lab", "Slide 4, Part 3 (done band) or a closing slide"),
]
