"""
PARAMPARA equipment CAD (CadQuery) and renders (VTK, off-screen).

Every dimension below is a design value in millimetres. Component sizes come from datasheets:
  BMI270 IMU 2.5 x 3.0 x 0.83 mm (Bosch BST-BMI270-DS000)      DRV2605L 3.0 x 3.0 mm VSSOP-10 (TI SLOS854)
  TCA9548A 7.8 x 4.4 mm TSSOP-24 (TI SCPS207)                     ESP32-S3-MINI-1 15.4 x 20.5 x 2.4 mm (Espressif)
  C08-005 coin LRA 8.0 dia x 3.3 mm, 235 Hz (Precision Microdrives) MCP73831 SOT-23-5 (Microchip)
  Murata 7BB-27-4L0 piezo disc 27 mm dia x 0.54 mm, 4.6 kHz
Tabla: 5.5-inch dayan (head 140 mm, height 267 mm) and 9-inch bayan (head 229 mm, height 260 mm), retail listing.
Kathputli: about 55 cm tall (retail listings 43-58 cm). Arm, loom and puppet bodies are stylised, not to scale.

Run:  python3 PARAMPARA/cad/parampara_cad.py         -> PARAMPARA/cad/out/*.step|stl, PARAMPARA/cad/renders/*.png
"""
import os, json, math
import numpy as np
import cadquery as cq

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out"); REN = os.path.join(HERE, "renders")
os.makedirs(OUT, exist_ok=True); os.makedirs(REN, exist_ok=True)

C = dict(  # colours (RGB 0-1)
    skin=(0.93, 0.79, 0.68), shell=(0.17, 0.19, 0.22), imu=(0.13, 0.33, 0.52), motor=(0.76, 0.58, 0.12),
    hub=(0.19, 0.45, 0.25), pcb=(0.08, 0.38, 0.22), chip=(0.07, 0.07, 0.08), metal=(0.78, 0.79, 0.80),
    battery=(0.62, 0.68, 0.78), strap=(0.30, 0.30, 0.33), cable=(0.25, 0.25, 0.27), fabric=(0.28, 0.30, 0.34),
    wood=(0.55, 0.33, 0.17), wood2=(0.70, 0.48, 0.28), brass=(0.70, 0.55, 0.25), head=(0.93, 0.88, 0.76),
    syahi=(0.08, 0.08, 0.08), maroon=(0.48, 0.12, 0.12), cloth=(0.80, 0.20, 0.16), white=(0.95, 0.95, 0.95),
    thread=(0.93, 0.90, 0.80), gold=(0.85, 0.66, 0.18), phone=(0.12, 0.12, 0.14), steel=(0.6, 0.62, 0.65))


# =============================================================================================
# Wearable parts. Each pod is built with its base on z = 0 and a concave saddle underneath that
# matches the body segment; +x points along the limb towards the fingertips.
# =============================================================================================
def saddle_cut(solid, length, width, radius, axis="x"):
    """Cut a concave cylindrical saddle (radius) into the underside, axis along the limb."""
    if axis == "x":
        cyl = cq.Workplane("YZ").workplane(offset=-length).center(0, -radius + 0.6).circle(radius).extrude(2 * length)
    else:
        cyl = cq.Workplane("XZ").workplane(offset=-width).center(0, -radius + 0.6).circle(radius).extrude(2 * width)
    return solid.cut(cyl)


def rbox(l, w, h, r):
    return cq.Workplane("XY").box(l, w, h, centered=(True, True, False)).edges("|Z").fillet(r)


# ---- finger ring: IMU pod (13 x 11 x 4.4 mm) ------------------------------------------------
RING = dict(L=13.0, W=11.0, base_h=3.4, lid_h=1.0, wall=0.9, saddle_r=9.0, pcb=(10.0, 8.0, 0.8))


def ring_parts():
    L, W, bh, lh, t = RING["L"], RING["W"], RING["base_h"], RING["lid_h"], RING["wall"]
    base = rbox(L, W, bh, 2.2)
    base = base.cut(rbox(L - 2 * t, W - 2 * t, bh, 1.4).translate((0, 0, 1.2)))      # pocket for the board
    base = base.cut(cq.Workplane("XY").box(2.0, 3.2, 1.6).translate((-L / 2, 0, bh - 0.4)))  # cable notch
    lug = cq.Workplane("XY").box(7.0, 2.2, 1.6, centered=(True, True, False)).edges("|Z").fillet(0.6)
    lug = lug.cut(cq.Workplane("XY").box(5.2, 0.9, 3).translate((0, 0, 0.8)))       # strap slot 5.2 x 0.9
    base = base.union(lug.translate((0, W / 2 + 0.6, 0))).union(lug.translate((0, -W / 2 - 0.6, 0)))
    base = saddle_cut(base, L, W, RING["saddle_r"])
    lid = rbox(L, W, lh, 2.2).faces(">Z").edges().fillet(0.45)
    px, py, pt = RING["pcb"]
    pcb = cq.Workplane("XY").box(px, py, pt, centered=(True, True, False)).edges("|Z").fillet(0.5)
    chip = cq.Workplane("XY").box(3.0, 2.5, 0.83, centered=(True, True, False))     # BMI270
    caps = [cq.Workplane("XY").box(1.0, 0.5, 0.5, centered=(True, True, False)).translate((x, y, pt)) for x, y in ((2.6, 2.2), (2.6, -2.2))]
    conn = cq.Workplane("XY").box(2.0, 4.6, 1.0, centered=(True, True, False)).translate((-px / 2 + 1.2, 0, pt))
    strap = (cq.Workplane("YZ").circle(RING["saddle_r"] + 1.0).circle(RING["saddle_r"]).extrude(5.0)
             .translate((-2.5, 0, -RING["saddle_r"] + 0.6)))
    return dict(base=base, lid=lid, pcb=pcb, chip=chip.translate((0.8, 0, pt)), caps=caps, conn=conn, strap=strap,
                z_pcb=1.2, z_lid=bh)


# ---- finger motor pod: coin LRA pod (12 mm dia x 5.2 mm) ------------------------------------
MOTOR = dict(D=12.0, base_h=4.2, lid_h=1.0, saddle_r=10.0, lra=(8.0, 3.3))


def motor_parts():
    D, bh, lh = MOTOR["D"], MOTOR["base_h"], MOTOR["lid_h"]
    base = cq.Workplane("XY").circle(D / 2).extrude(bh)
    base = base.cut(cq.Workplane("XY").circle(MOTOR["lra"][0] / 2 + 0.2).extrude(bh).translate((0, 0, 0.9)))
    base = base.cut(cq.Workplane("XY").box(2.4, 1.6, 1.4).translate((-D / 2, 0, bh - 0.5)))
    lug = cq.Workplane("XY").box(6.0, 2.2, 1.6, centered=(True, True, False)).edges("|Z").fillet(0.6)
    lug = lug.cut(cq.Workplane("XY").box(4.4, 0.9, 3).translate((0, 0, 0.8)))
    base = base.union(lug.translate((0, D / 2 + 0.5, 0))).union(lug.translate((0, -D / 2 - 0.5, 0)))
    base = saddle_cut(base, D, D, MOTOR["saddle_r"])
    lid = cq.Workplane("XY").circle(D / 2).extrude(lh).faces(">Z").edges().fillet(0.45)
    lra = cq.Workplane("XY").circle(MOTOR["lra"][0] / 2).extrude(MOTOR["lra"][1])
    strap = (cq.Workplane("YZ").circle(MOTOR["saddle_r"] + 1.0).circle(MOTOR["saddle_r"]).extrude(5.0)
             .translate((-2.5, 0, -MOTOR["saddle_r"] + 0.6)))
    return dict(base=base, lid=lid, lra=lra, strap=strap, z_lra=0.9, z_lid=bh)


# ---- joint pod: shoulder / upper-arm / wrist (IMU, plus LRA at shoulder and wrist) -----------
JOINT = dict(L=28.0, W=20.0, base_h=6.6, lid_h=1.4, saddle_r=40.0, pcb=(22.0, 15.0, 0.8))


def joint_parts():
    L, W, bh, lh = JOINT["L"], JOINT["W"], JOINT["base_h"], JOINT["lid_h"]
    base = rbox(L, W, bh, 4.0).cut(rbox(L - 2, W - 2, bh, 3.2).translate((0, 0, 1.4)))
    base = base.cut(cq.Workplane("XY").box(2.4, 6.0, 2.0).translate((-L / 2, 0, bh - 0.8)))
    clip = cq.Workplane("XY").box(10, 2.0, 2.4, centered=(True, True, False)).translate((0, W / 2 + 0.6, 0))
    base = base.union(clip).union(clip.mirror("XZ"))
    base = saddle_cut(base, L, W, JOINT["saddle_r"])
    lid = rbox(L, W, lh, 4.0).faces(">Z").edges().fillet(0.6)
    px, py, pt = JOINT["pcb"]
    pcb = cq.Workplane("XY").box(px, py, pt, centered=(True, True, False)).edges("|Z").fillet(1.0)
    chip = cq.Workplane("XY").box(3.0, 2.5, 0.83, centered=(True, True, False)).translate((-5, 0, pt))
    lra = cq.Workplane("XY").circle(4.0).extrude(3.3).translate((4.5, 0, pt))
    conn = cq.Workplane("XY").box(2.6, 7.0, 1.2, centered=(True, True, False)).translate((-px / 2 + 1.6, 0, pt))
    return dict(base=base, lid=lid, pcb=pcb, chip=chip, lra=lra, conn=conn, z_pcb=1.4, z_lid=bh)


# ---- hand plate: back-of-hand board (IMU + TCA9548A + 5 x DRV2605L) -------------------------
HAND = dict(L=42.0, W=32.0, base_h=6.4, lid_h=1.6, saddle_r=70.0, pcb=(37.0, 27.0, 1.0))


def hand_parts():
    L, W, bh, lh = HAND["L"], HAND["W"], HAND["base_h"], HAND["lid_h"]
    base = rbox(L, W, bh, 5.0).cut(rbox(L - 2.2, W - 2.2, bh, 4.0).translate((0, 0, 1.4)))
    for y in (-11, -5.5, 0, 5.5, 11):   # five finger-cable ports at the distal end
        base = base.cut(cq.Workplane("XY").box(2.6, 3.6, 1.6).translate((L / 2, y, bh - 0.7)))
    base = base.cut(cq.Workplane("XY").box(2.6, 6.0, 1.8).translate((-L / 2, 0, bh - 0.8)))  # hub cable
    base = saddle_cut(base, L, W, HAND["saddle_r"])
    lid = rbox(L, W, lh, 5.0).faces(">Z").edges().fillet(0.7)
    px, py, pt = HAND["pcb"]
    pcb = cq.Workplane("XY").box(px, py, pt, centered=(True, True, False)).edges("|Z").fillet(1.5)
    parts = [cq.Workplane("XY").box(7.8, 4.4, 1.2, centered=(True, True, False)).translate((-9, 6, pt))]   # TCA9548A
    for i, y in enumerate((-9.5, -3.5, 2.5)):                                                      # DRV2605L x5
        parts.append(cq.Workplane("XY").box(3, 3, 1.1, centered=(True, True, False)).translate((6, y, pt)))
    for y in (-9.5, -3.5):
        parts.append(cq.Workplane("XY").box(3, 3, 1.1, centered=(True, True, False)).translate((12, y, pt)))
    parts.append(cq.Workplane("XY").box(3.0, 2.5, 0.83, centered=(True, True, False)).translate((-10, -6, pt)))  # BMI270
    conns = [cq.Workplane("XY").box(2.2, 3.0, 1.2, centered=(True, True, False)).translate((px / 2 - 1.4, y, pt)) for y in (-11, -5.5, 0, 5.5, 11)]
    conns.append(cq.Workplane("XY").box(2.6, 5.0, 1.2, centered=(True, True, False)).translate((-px / 2 + 1.6, 0, pt)))
    return dict(base=base, lid=lid, pcb=pcb, chips=parts, conns=conns, z_pcb=1.4, z_lid=bh)


# ---- forearm hub: ESP32-S3-MINI-1, TCA9548A, 3 x DRV2605L, BMI270, charger, microSD, LiPo -----
HUB = dict(L=62.0, W=44.0, base_h=14.0, lid_h=2.4, saddle_r=48.0, pcb=(56.0, 38.0, 1.0), bat=(50.0, 34.0, 6.0))


def hub_parts():
    L, W, bh, lh = HUB["L"], HUB["W"], HUB["base_h"], HUB["lid_h"]
    base = rbox(L, W, bh, 6.0).cut(rbox(L - 3, W - 3, bh, 4.6).translate((0, 0, 2.0)))
    base = base.cut(cq.Workplane("XY").box(4, 9.6, 3.6).translate((L / 2, 6, 10.4)))      # USB-C port
    base = base.cut(cq.Workplane("XY").box(4, 7.0, 2.6).translate((-L / 2, -8, 10.0)))    # hand cable
    base = base.cut(cq.Workplane("XY").box(4, 7.0, 2.6).translate((-L / 2, 8, 10.0)))     # arm cable
    for y in (-W / 2 - 1.2, W / 2 + 1.2):   # 25 mm strap loops
        loop = cq.Workplane("XY").box(28, 3.4, 4.0, centered=(True, True, False)).edges("|Z").fillet(1.0)
        loop = loop.cut(cq.Workplane("XY").box(25.4, 1.4, 6).translate((0, 0, 2.0)))
        base = base.union(loop.translate((0, y, 0)))
    base = saddle_cut(base, L, W, HUB["saddle_r"])
    lid = rbox(L, W, lh, 6.0).faces(">Z").edges().fillet(0.9)
    lid = lid.cut(cq.Workplane("XY").circle(1.6).extrude(5).translate((L / 2 - 7, -W / 2 + 7, -1)))  # LED window
    px, py, pt = HUB["pcb"]
    pcb = cq.Workplane("XY").box(px, py, pt, centered=(True, True, False)).edges("|Z").fillet(2.0)
    esp = cq.Workplane("XY").box(20.5, 15.4, 2.4, centered=(True, True, False)).translate((-14, 7, pt))
    shield = cq.Workplane("XY").box(14.0, 13.4, 0.3, centered=(True, True, False)).translate((-16.5, 7, pt + 2.4))
    chips = [cq.Workplane("XY").box(7.8, 4.4, 1.2, centered=(True, True, False)).translate((6, 12, pt)),     # TCA9548A
             cq.Workplane("XY").box(3.0, 2.5, 0.83, centered=(True, True, False)).translate((-4, -12, pt)),  # BMI270
             cq.Workplane("XY").box(2.9, 1.6, 1.1, centered=(True, True, False)).translate((20, -4, pt))]    # MCP73831
    for x in (4, 10, 16):
        chips.append(cq.Workplane("XY").box(3, 3, 1.1, centered=(True, True, False)).translate((x, 2, pt)))  # DRV2605L
    sd = cq.Workplane("XY").box(14.0, 15.0, 1.8, centered=(True, True, False)).translate((-15, -10, pt))
    usb = cq.Workplane("XY").box(7.3, 8.9, 3.2, centered=(True, True, False)).translate((px / 2 - 3.2, 6, pt))
    bat = cq.Workplane("XY").box(*HUB["bat"], centered=(True, True, False)).edges("|X").fillet(1.5)
    return dict(base=base, lid=lid, pcb=pcb, esp=esp, shield=shield, chips=chips, sd=sd, usb=usb, bat=bat,
                z_bat=2.2, z_pcb=8.6, z_lid=bh)


# =============================================================================================
# Craft tool kits
# =============================================================================================
def revolve_profile(pts):
    return cq.Workplane("XZ").polyline(pts).close().revolve(360, (0, 0, 0), (0, 1, 0))


def tabla_parts():
    out = []
    # dayan: 140 mm head, 267 mm tall wooden shell (positioned at x = +130)
    day = revolve_profile([(0, 0), (64, 0), (74, 60), (77, 150), (73, 240), (70, 262), (0, 262)])
    out.append(("dayan shell", day.translate((130, 0, 30)), C["wood"], 1))
    out.append(("dayan head", cq.Workplane("XY").circle(70).extrude(4).translate((130, 0, 292)), C["head"], 1))
    out.append(("dayan syahi", cq.Workplane("XY").circle(27).extrude(1.6).translate((130, 0, 295.2)), C["syahi"], 1))
    out.append(("dayan rim", cq.Workplane("XY").circle(74).circle(66).extrude(7).translate((130, 0, 288)), C["wood2"], 1))
    for k in range(16):
        a = 2 * math.pi * k / 16
        strip = cq.Workplane("XY").box(5, 1.6, 200, centered=(True, True, False)).translate((0, 0, 0))
        strip = strip.rotate((0, 0, 0), (0, 0, 1), math.degrees(a)).translate((130 + 76.5 * math.cos(a), 76.5 * math.sin(a), 82))
        out.append(("strap", strip, C["head"], 1))
    for k in range(8):
        a = 2 * math.pi * (k + 0.5) / 8
        g = cq.Workplane("XY").circle(9).extrude(34).translate((130 + 82 * math.cos(a), 82 * math.sin(a), 110))
        out.append(("gatta", g, C["wood2"], 1))
    # bayan: 229 mm head, 260 mm tall metal kettle (x = -150)
    bay = revolve_profile([(0, 0), (55, 0), (100, 40), (124, 120), (122, 200), (115, 252), (0, 252)])
    out.append(("bayan shell", bay.translate((-150, 0, 30)), C["brass"], 1))
    out.append(("bayan head", cq.Workplane("XY").circle(114.5).extrude(4).translate((-150, 0, 282)), C["head"], 1))
    out.append(("bayan syahi", cq.Workplane("XY").circle(36).extrude(1.6).translate((-150 + 30, 0, 285.2)), C["syahi"], 1))
    out.append(("bayan rim", cq.Workplane("XY").circle(118).circle(110).extrude(7).translate((-150, 0, 278)), C["wood2"], 1))
    # cushion rings (chutta)
    for x, r in ((130, 78), (-150, 92)):
        out.append(("cushion", cq.Workplane("XY").circle(r).circle(r - 26).extrude(30).edges().fillet(9).translate((x, 0, 0)), C["maroon"], 1))
    # piezo clips: 27 mm disc in a 34 x 34 x 6 mm clip on the shell, 45 mm below the rim, facing the player
    clip = rbox(34, 34, 6, 6).faces(">Z").edges().fillet(1.5)
    disc = cq.Workplane("XY").circle(13.5).extrude(0.54)
    for name, x0, r_at, z in (("dayan", 130, 75.5, 245), ("bayan", -150, 118.5, 230)):
        c_ = clip.rotate((0, 0, 0), (0, 1, 0), -90).translate((x0, 0, 0))
        out.append((f"piezo clip {name}", c_.translate((-r_at - 5.5, 0, z)).rotate((x0, 0, 0), (x0, 0, 1), -90 if name == "dayan" else -90), C["imu"], 1))
    # base unit: 86 x 56 x 24 mm between the drums, at the front
    bu = rbox(86, 56, 24, 7).faces(">Z").edges().fillet(2.5)
    out.append(("base unit", bu.translate((-5, -170, 0)), C["shell"], 1))
    out.append(("base unit lid", rbox(80, 50, 1.2, 6).translate((-5, -170, 24)), C["imu"], 1))
    return out


def puppet_parts():
    """Stylised Kathputli, 550 mm tall; sensor pod in the wooden torso; strings to the puppeteer's fingers."""
    out = []
    z0 = 0
    skirt = revolve_profile([(0, 0), (150, 0), (95, 220), (55, 300), (0, 300)])
    out.append(("skirt", skirt.translate((0, 0, z0)), C["cloth"], 1))
    out.append(("skirt band", cq.Workplane("XY").circle(151).circle(140).extrude(14).translate((0, 0, z0 + 2)), C["gold"], 1))
    torso = cq.Workplane("XY").ellipse(55, 34).extrude(130).edges().fillet(14).translate((0, 0, z0 + 290))
    out.append(("torso", torso, C["wood2"], 1))
    out.append(("waistcoat", cq.Workplane("XY").ellipse(57, 36).extrude(80).translate((0, 0, z0 + 300)), C["maroon"], 1))
    out.append(("neck", cq.Workplane("XY").circle(14).extrude(25).translate((0, 0, z0 + 415)), C["wood2"], 1))
    head = cq.Workplane("XY").sphere(42).translate((0, 0, z0 + 470))
    out.append(("head", head, C["wood2"], 1))
    turban = cq.Workplane("XY").ellipse(46, 44).extrude(38).edges(">Z").fillet(16).translate((0, 0, z0 + 485))
    out.append(("turban", turban, C["gold"], 1))
    out.append(("face", cq.Workplane("XY").box(30, 4, 8).translate((0, -41, z0 + 478)), C["syahi"], 1))
    for s in (-1, 1):
        arm = (cq.Workplane("XY").circle(13).extrude(150).translate((0, 0, -150))
               .rotate((0, 0, 0), (0, 1, 0), -s * 25).translate((s * 62, 0, z0 + 410)))
        out.append(("arm", arm, C["cloth"], 1))
        hand = cq.Workplane("XY").sphere(14).translate((s * (62 + 150 * math.sin(math.radians(25))), 0, z0 + 410 - 150 * math.cos(math.radians(25))))
        out.append(("hand", hand, C["wood2"], 1))
    # sensor pod (30 x 20 x 10 mm) fixed in a recess at the back of the wooden torso
    pod = rbox(30, 20, 10, 4).faces(">Z").edges().fillet(1.5).rotate((0, 0, 0), (1, 0, 0), -90).translate((0, 40, z0 + 365))
    out.append(("sensor pod", pod, C["imu"], 1))
    return out


def loom_parts():
    """Stylised two-treadle frame loom (about 1.0 m wide), with the PARAMPARA loom kit."""
    out = []
    W, D, H = 1000, 1100, 1300
    post = lambda x, y, h: cq.Workplane("XY").box(60, 60, h, centered=(True, True, False)).translate((x, y, 0))
    for x in (-W / 2, W / 2):
        for y in (-D / 2, D / 2):
            out.append(("post", post(x, y, H if y > 0 else 900), C["wood"], 1))
        out.append(("side rail", cq.Workplane("XY").box(60, D, 60).translate((x, 0, 860)), C["wood"], 1))
        out.append(("top rail", cq.Workplane("XY").box(60, 60, 60).translate((x, D / 2, H - 30)), C["wood"], 1))
    out.append(("cross top", cq.Workplane("XY").box(W + 60, 60, 60).translate((0, D / 2 - 250, H - 30)), C["wood"], 1))
    for x in (-W / 2, W / 2):
        out.append(("upright", cq.Workplane("XY").box(60, 60, H - 860, centered=(True, True, False)).translate((x, D / 2 - 250, 860)), C["wood"], 1))
    out.append(("breast beam", cq.Workplane("XY").box(W, 80, 60).translate((0, -D / 2, 890)), C["wood2"], 1))
    out.append(("back beam", cq.Workplane("XY").box(W, 80, 60).translate((0, D / 2, 890)), C["wood2"], 1))
    out.append(("cloth beam", cq.Workplane("YZ").circle(45).extrude(W).translate((-W / 2, -D / 2 + 60, 650)), C["wood2"], 1))
    out.append(("warp beam", cq.Workplane("YZ").circle(60).extrude(W).translate((-W / 2, D / 2 - 60, 650)), C["wood2"], 1))
    # warp threads and woven cloth
    out.append(("cloth", cq.Workplane("XY").box(W - 120, 330, 3).translate((0, -D / 2 + 160, 921)), C["cloth"], 1))
    out.append(("warp", cq.Workplane("XY").box(W - 120, D - 400, 1.5).translate((0, 40, 921)), C["thread"], 0.65))
    # two heddle shafts
    for k, yy in enumerate((90, 160)):
        out.append(("shaft", cq.Workplane("XY").box(W - 80, 18, 280).translate((0, yy, 940 + (k * 30))), C["wood2"], 1))
    # overslung beater (batten) with reed, pivoting from the top cross bar
    bx = -40
    out.append(("beater top", cq.Workplane("XY").box(W - 40, 70, 55).translate((0, bx, 1060)), C["wood"], 1))
    out.append(("reed", cq.Workplane("XY").box(W - 120, 10, 120).translate((0, bx, 975)), C["steel"], 0.8))
    out.append(("beater bottom", cq.Workplane("XY").box(W - 40, 60, 40).translate((0, bx, 900)), C["wood"], 1))
    for x in (-W / 2 + 40, W / 2 - 40):
        out.append(("sword", cq.Workplane("XY").box(30, 30, H - 900).translate((x, bx, 900 + (H - 900) / 2 - 20)), C["wood"], 1))
    # treadles (pivot at the back) and bench
    for x in (-110, 110):
        tr = cq.Workplane("XY").box(70, 820, 30).rotate((0, 0, 0), (1, 0, 0), 6).translate((x, 100, 70))
        out.append(("treadle", tr, C["wood2"], 1))
    out.append(("bench", cq.Workplane("XY").box(800, 300, 40).translate((0, -D / 2 - 330, 520)), C["wood"], 1))
    for x in (-360, 360):
        out.append(("bench leg", cq.Workplane("XY").box(40, 260, 500, centered=(True, True, False)).translate((x, -D / 2 - 330, 0)), C["wood"], 1))
    # --- PARAMPARA loom kit ---
    out.append(("beater sensor", rbox(40, 26, 14, 5).translate((0, bx, 1087)), C["imu"], 1))
    for x in (-110, 110):
        out.append(("treadle switch", rbox(60, 50, 22, 6).translate((x, -260, 0)), C["motor"], 1))
    out.append(("loom node", rbox(70, 50, 22, 7).rotate((0, 0, 0), (0, 1, 0), 90).translate((W / 2 + 41, -D / 2 + 80, 700)), C["shell"], 1))
    arm = cq.Workplane("XY").box(20, 20, 380, centered=(True, True, False)).translate((W / 2 - 60, -D / 2, 920))
    out.append(("phone arm", arm, C["steel"], 1))
    out.append(("phone arm top", cq.Workplane("XY").box(20, 260, 20).translate((W / 2 - 60, -D / 2 + 110, 1300)), C["steel"], 1))
    phone = rbox(150, 72, 8, 8).rotate((0, 0, 0), (0, 1, 0), 0).translate((W / 2 - 160, -D / 2 + 230, 1290))
    out.append(("phone", phone, C["phone"], 1))
    return out


# =============================================================================================
# The arm and the full sleeve assembly (right arm, palm down; +x to the fingertips, +y thumb side)
# =============================================================================================
FINGERS = {  # name: (y, z_base, [proximal, middle, distal] lengths, radius)
    "index": (30, 2, [45, 26, 20], 9.0), "middle": (10, 3, [48, 30, 22], 9.4),
    "ring": (-10, 2, [44, 28, 21], 9.0), "little": (-28, 0, [36, 22, 19], 8.0)}
X_KNUCKLE = 660
THUMB = dict(base=(585, 40, -6), yaw=42, pitch=-14, seg=[46, 32, 27], r=10.5)


def capsule(p0, p1, r):
    p0, p1 = np.array(p0, float), np.array(p1, float)
    v = p1 - p0; L = np.linalg.norm(v)
    cyl = cq.Solid.makeCylinder(r, L, cq.Vector(*p0), cq.Vector(*(v / L)))
    s = cq.Workplane("XY").add(cyl).union(cq.Workplane("XY").sphere(r).translate(tuple(p0))).union(cq.Workplane("XY").sphere(r).translate(tuple(p1)))
    return s


def thumb_points():
    b = np.array(THUMB["base"], float)
    yaw, pitch = math.radians(THUMB["yaw"]), math.radians(THUMB["pitch"])
    d = np.array([math.cos(yaw) * math.cos(pitch), math.sin(yaw) * math.cos(pitch), math.sin(pitch)])
    pts = [b]
    for L in THUMB["seg"]:
        pts.append(pts[-1] + d * L)
    return pts, d


def arm_parts():
    out = []
    shoulder = cq.Workplane("XY").sphere(60)
    out.append(("shoulder", shoulder, C["skin"], 1))
    upper = cq.Workplane("YZ").circle(52).workplane(offset=300).circle(40).loft()
    out.append(("upper arm", upper, C["skin"], 1))
    out.append(("elbow", cq.Workplane("XY").sphere(40.5).translate((300, 0, 0)), C["skin"], 1))
    fore = cq.Workplane("YZ").workplane(offset=300).ellipse(40, 37).workplane(offset=255).ellipse(31, 20).loft()
    out.append(("forearm", fore, C["skin"], 1))
    hand = (cq.Workplane("YZ").workplane(offset=550).ellipse(32, 20).workplane(offset=40).ellipse(42, 16)
            .workplane(offset=70).ellipse(44, 14).loft())
    out.append(("hand", hand, C["skin"], 1))
    for name, (y, zb, segs, r) in FINGERS.items():
        x = X_KNUCKLE - 8
        rr = r
        for i, L in enumerate(segs):
            out.append((f"{name} {i}", capsule((x, y, zb), (x + L, y, zb - 1.5 * i), rr), C["skin"], 1))
            x += L; rr *= 0.93
    pts, _ = thumb_points()
    rr = THUMB["r"]
    for i in range(3):
        out.append((f"thumb {i}", capsule(pts[i], pts[i + 1], rr), C["skin"], 1))
        rr *= 0.92
    return out


def place(shape, pos, yaw=0.0, roll=0.0, pitch=0.0):
    s = shape
    if roll: s = s.rotate((0, 0, 0), (1, 0, 0), roll)
    if pitch: s = s.rotate((0, 0, 0), (0, 1, 0), pitch)
    if yaw: s = s.rotate((0, 0, 0), (0, 0, 1), yaw)
    return s.translate(tuple(pos))


def pod_assembly(kind):
    """Closed pod as a list of (name, shape, colour)."""
    if kind == "ring":
        p = ring_parts()
        return [("ring base", p["base"], C["shell"]), ("ring lid", p["lid"].translate((0, 0, p["z_lid"])), C["imu"]), ("ring strap", p["strap"], C["strap"])]
    if kind == "motor":
        p = motor_parts()
        return [("motor base", p["base"], C["shell"]), ("motor lid", p["lid"].translate((0, 0, p["z_lid"])), C["motor"]), ("motor strap", p["strap"], C["strap"])]
    if kind in ("joint", "joint_imu"):
        p = joint_parts()
        lidc = C["imu"]
        parts = [("joint base", p["base"], C["shell"]), ("joint lid", p["lid"].translate((0, 0, p["z_lid"])), lidc)]
        if kind == "joint":
            parts.append(("joint motor dot", cq.Workplane("XY").circle(4.2).extrude(0.6).translate((4.5, 0, p["z_lid"] + JOINT["lid_h"] - 0.3)), C["motor"]))
        return parts
    if kind == "hand":
        p = hand_parts()
        return [("hand base", p["base"], C["shell"]), ("hand lid", p["lid"].translate((0, 0, p["z_lid"])), C["imu"])]
    if kind == "hub":
        p = hub_parts()
        return [("hub base", p["base"], C["shell"]), ("hub lid", p["lid"].translate((0, 0, p["z_lid"])), C["hub"])]


def sleeve_scene():
    """Arm + sleeve fabric + all pods + cables. Returns (parts, anchors)."""
    parts = list(arm_parts())
    anchors = {}
    fab = cq.Workplane("YZ").workplane(offset=20).circle(55.5).workplane(offset=280).circle(44).loft()
    parts.append(("sleeve upper", fab, C["fabric"], 0.42))
    fab2 = cq.Workplane("YZ").workplane(offset=300).ellipse(43.5, 40.5).workplane(offset=258).ellipse(34, 23.5).loft()
    parts.append(("sleeve fore", fab2, C["fabric"], 0.42))
    # dorsal hand plate held by a thumb loop (palm and fingertips stay uncovered)
    plate = cq.Workplane("XY").box(70, 60, 1.2).edges("|Z").fillet(14).translate((605, 2, 16.5))
    parts.append(("hand plate", plate, C["fabric"], 0.55))
    tp, td = thumb_points()
    loop = cq.Solid.makeTorus(13.5, 1.6, cq.Vector(*(tp[0] + td * 20)), cq.Vector(*td))
    parts.append(("thumb loop", cq.Workplane("XY").add(loop), C["fabric"], 1))

    def add(kind, pos, yaw=0, roll=0, pitch=0, key=None):
        for n, s, c in pod_assembly(kind):
            parts.append((n, place(s, pos, yaw, roll, pitch), c, 1))
        if key: anchors[key] = tuple(np.array(pos, float) + np.array([0, 0, 4]))

    add("joint", (10, 0, 57.0), key="shoulder pod (IMU + motor)")
    add("joint_imu", (150, 0, 45.6), key="upper-arm pod (IMU)")
    add("motor", (302, 0, 40.0), key="elbow motor")
    add("hub", (400, 0, 37.0), key="hub (ESP32-S3, battery)")
    add("joint", (532, 0, 21.0), key="wrist pod (forearm IMU + motor)")
    add("hand", (607, 0, 16.0), key="hand board (IMU, 5 drivers)")
    cab = []
    for name, (y, zb, segs, r) in FINGERS.items():
        xm = X_KNUCKLE - 8 + segs[0] / 2
        xr = X_KNUCKLE - 8 + segs[0] + segs[1] / 2
        add("motor", (xm, y, zb + r - 0.7), key=f"{name} motor" if name == "middle" else None)
        add("ring", (xr, y, zb - 1.5 + r * 0.93 - 0.6), key=f"{name} ring (IMU)" if name == "middle" else None)
        cab.append([(628, y * 0.35, 21), (xm - 5, y, zb + r + 3.5), (xr - 6, y, zb + r + 2.5)])
    pts, d = thumb_points()
    yaw = math.degrees(math.atan2(d[1], d[0]))
    mt = (pts[0] + pts[1]) / 2; rt = (pts[1] + pts[2]) / 2
    add("motor", tuple(mt + np.array([0, 0, THUMB["r"] - 1])), yaw=yaw, key="thumb motor")
    add("ring", tuple(rt + np.array([0, 0, THUMB["r"] * 0.92 - 1])), yaw=yaw, key="thumb ring (IMU)")
    cab.append([(612, 12, 21), tuple(mt + np.array([-4, 0, THUMB["r"] + 4])), tuple(rt + np.array([-5, 0, THUMB["r"] + 3]))])
    cab += [[(368, -8, 50), (330, -8, 47), (302, -4, 46)], [(368, 8, 50), (220, 8, 52), (166, 4, 54)],
            [(166, 0, 54), (60, 0, 62), (24, 0, 66)], [(432, -6, 50), (500, -6, 34), (518, 0, 30)],
            [(432, 8, 50), (520, 10, 30), (585, 8, 24)]]
    return parts, anchors, cab


# =============================================================================================
# Rendering (VTK, off-screen)
# =============================================================================================
def to_polydata(shape, tol=0.15):
    import vtk
    vs, ts = (shape.val() if hasattr(shape, "val") else shape).tessellate(tol, 0.2)
    pts = vtk.vtkPoints()
    for v in vs:
        pts.InsertNextPoint(v.x, v.y, v.z)
    polys = vtk.vtkCellArray()
    for t in ts:
        polys.InsertNextCell(3); [polys.InsertCellPoint(i) for i in t]
    pd = vtk.vtkPolyData(); pd.SetPoints(pts); pd.SetPolys(polys)
    n = vtk.vtkPolyDataNormals(); n.SetInputData(pd); n.SetFeatureAngle(35); n.SplittingOn(); n.ConsistencyOn(); n.Update()
    return n.GetOutput()


def tube(points, r=0.9, color=C["cable"]):
    import vtk
    pts = vtk.vtkPoints(); lines = vtk.vtkCellArray()
    sp = vtk.vtkParametricSpline()
    for p in points:
        pts.InsertNextPoint(*p)
    sp.SetPoints(pts)
    src = vtk.vtkParametricFunctionSource(); src.SetParametricFunction(sp); src.SetUResolution(60); src.Update()
    tf = vtk.vtkTubeFilter(); tf.SetInputConnection(src.GetOutputPort()); tf.SetRadius(r); tf.SetNumberOfSides(12); tf.CappingOn(); tf.Update()
    return tf.GetOutput(), color


def render(parts, cam, path, size=(1600, 1000), tol=0.15, tubes=(), anchors=None, parallel=False, ssaa=2, bg=(1, 1, 1), crop=24):
    """cam: dict(pos, focal, up, zoom). Returns {anchor: (x_px, y_px)} in the saved image."""
    import vtk
    from PIL import Image
    ren = vtk.vtkRenderer(); ren.SetBackground(*bg)
    cache = {}
    for name, shape, color, opacity in parts:
        pd = to_polydata(shape, tol)
        m = vtk.vtkPolyDataMapper(); m.SetInputData(pd)
        a = vtk.vtkActor(); a.SetMapper(m)
        pr = a.GetProperty(); pr.SetColor(*color); pr.SetOpacity(opacity)
        pr.SetAmbient(0.18); pr.SetDiffuse(0.78); pr.SetSpecular(0.22); pr.SetSpecularPower(28)
        ren.AddActor(a)
    for pd, color in tubes:
        m = vtk.vtkPolyDataMapper(); m.SetInputData(pd)
        a = vtk.vtkActor(); a.SetMapper(m); a.GetProperty().SetColor(*color); a.GetProperty().SetSpecular(0.3)
        ren.AddActor(a)
    lk = vtk.vtkLightKit(); lk.SetKeyLightIntensity(0.95); lk.AddLightsToRenderer(ren)
    ren.SetUseDepthPeeling(True); ren.SetMaximumNumberOfPeels(8)
    camera = ren.GetActiveCamera()
    camera.SetFocalPoint(*cam["focal"]); camera.SetPosition(*cam["pos"]); camera.SetViewUp(*cam["up"])
    if parallel:
        camera.ParallelProjectionOn()
    ren.ResetCamera()
    camera.SetFocalPoint(*cam["focal"])
    if "dist" in cam:
        d = np.array(cam["pos"], float) - np.array(cam["focal"], float); d /= np.linalg.norm(d)
        camera.SetPosition(*(np.array(cam["focal"]) + d * cam["dist"]))
    camera.Zoom(cam.get("zoom", 1.0))
    if parallel and "scale" in cam:
        camera.SetParallelScale(cam["scale"])
    W, H = size[0] * ssaa, size[1] * ssaa
    win = vtk.vtkRenderWindow(); win.SetOffScreenRendering(1); win.AddRenderer(ren); win.SetSize(W, H)
    win.SetAlphaBitPlanes(1); win.SetMultiSamples(0)
    ren.ResetCameraClippingRange()
    win.Render()
    f = vtk.vtkWindowToImageFilter(); f.SetInput(win); f.ReadFrontBufferOff(); f.Update()
    from vtkmodules.util.numpy_support import vtk_to_numpy
    img = f.GetOutput(); w_, h_, _ = img.GetDimensions()
    arr = vtk_to_numpy(img.GetPointData().GetScalars()).reshape(h_, w_, -1)[::-1, :, :3]
    im = Image.fromarray(arr.astype("uint8")).resize(size, Image.LANCZOS)
    ox = oy = 0
    if crop:
        a_ = np.asarray(im).astype(int)
        mask = (np.abs(a_ - np.array(bg) * 255).sum(-1) > 12)
        ys, xs = np.where(mask)
        if len(xs):
            ox, oy = max(0, xs.min() - crop), max(0, ys.min() - crop)
            im = im.crop((ox, oy, min(size[0], xs.max() + crop), min(size[1], ys.max() + crop)))
    im.save(path)
    px = {}
    for k, p in (anchors or {}).items():
        ren.SetWorldPoint(p[0], p[1], p[2], 1.0); ren.WorldToDisplay()
        x, y, _ = ren.GetDisplayPoint()
        px[k] = (x / ssaa - ox, size[1] - y / ssaa - oy)
    win.Finalize()
    return px


def export_parts():
    """STEP and STL files for the printable housings."""
    files = {}
    r, m, j, h, u = ring_parts(), motor_parts(), joint_parts(), hand_parts(), hub_parts()
    for name, s in (("ring_pod_base", r["base"]), ("ring_pod_lid", r["lid"]), ("motor_pod_base", m["base"]), ("motor_pod_lid", m["lid"]),
                    ("joint_pod_base", j["base"]), ("joint_pod_lid", j["lid"]), ("hand_board_case", h["base"]), ("hand_board_lid", h["lid"]),
                    ("hub_case", u["base"]), ("hub_lid", u["lid"])):
        cq.exporters.export(s, os.path.join(OUT, name + ".step"))
        cq.exporters.export(s, os.path.join(OUT, name + ".stl"), tolerance=0.05, angularTolerance=0.2)
        bb = s.val().BoundingBox()
        files[name] = dict(size_mm=[round(bb.xlen, 2), round(bb.ylen, 2), round(bb.zlen, 2)], volume_mm3=round(s.val().Volume(), 1))
    return files


if __name__ == "__main__":
    info = export_parts()
    json.dump(info, open(os.path.join(OUT, "parts.json"), "w"), indent=2)
    print(json.dumps(info, indent=1))
