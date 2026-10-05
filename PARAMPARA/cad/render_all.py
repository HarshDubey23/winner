"""Renders every PARAMPARA equipment view and stores label anchor positions (renders/anchors.json)."""
import os, json, math, sys
import numpy as np
import cadquery as cq
import parampara_cad as P

R = P.REN
A = {}


def scale_bar(length, pos, axis="x", h=3.0):
    sz = {"x": (length, h, h), "y": (h, length, h), "z": (h, h, length)}[axis]
    return ("scale bar", cq.Workplane("XY").box(*sz).translate(pos), (0.1, 0.1, 0.1), 1)


def go(name, parts, cam, size=(1600, 1000), anchors=None, tubes=(), parallel=False, tol=0.2):
    A[name] = P.render(parts, cam, os.path.join(R, name + ".png"), size=size, anchors=anchors or {}, tubes=tubes, parallel=parallel, tol=tol)
    print("rendered", name, flush=True)


def sleeve_views():
    parts, anchors, cab = P.sleeve_scene()
    tubes = [P.tube(c, 0.9) for c in cab]
    go("sleeve_iso", parts, dict(focal=(350, 0, 0), pos=(120, -950, 620), up=(0, 0, 1), zoom=1.9), (2000, 1100), anchors, tubes, tol=0.25)
    sb = scale_bar(100, (420, -95, 0))
    an_top = dict(anchors); an_top["100 mm"] = (420, -95, 0)
    go("sleeve_dorsal", parts + [sb], dict(focal=(370, 0, 0), pos=(370, 0, 1500), up=(0, 1, 0), zoom=2.5), (2000, 760), an_top, tubes, parallel=True, tol=0.25)
    hand_an = {k: v for k, v in anchors.items() if any(w in k for w in ("ring", "motor", "hand board", "wrist"))}
    go("hand_iso", parts, dict(focal=(640, 4, 4), pos=(470, -300, 300), up=(0, 0, 1), dist=420, zoom=1.0), (1600, 1100), hand_an, tubes, tol=0.12)
    sb2 = scale_bar(50, (650, -60, -30))
    pal = {"palm (uncovered)": (610, 0, -14), "fingertips (uncovered)": (742, 10, -8), "ring strap": (P.X_KNUCKLE - 8 + 48 + 15, 10, -8),
           "thumb loop": (606, 50, -16), "50 mm": (650, -60, -30)}
    go("hand_palmar", parts + [sb2], dict(focal=(655, 5, 0), pos=(655, 5, -900), up=(0, -1, 0), zoom=3.3), (1600, 1100), pal, tubes, parallel=True, tol=0.12)
    lat = {"ring pod 4.4 mm": (P.X_KNUCKLE - 8 + 48 + 15, 10, 16), "motor pod 5.2 mm": (P.X_KNUCKLE - 8 + 24, 10, 15),
           "hand board 8 mm": (607, 0, 24), "fingertip pad free": (745, 10, -6)}
    go("hand_lateral", parts, dict(focal=(655, 0, 5), pos=(655, -900, 5), up=(0, 0, 1), zoom=3.3), (1800, 900), lat, tubes, parallel=True, tol=0.12)
    return anchors


def exploded():
    r = P.ring_parts()
    gap = 7.0
    parts = [("strap", r["strap"].translate((0, 0, -gap)), P.C["strap"], 1), ("base", r["base"], P.C["shell"], 1),
             ("pcb", r["pcb"].translate((0, 0, r["z_pcb"] + gap)), P.C["pcb"], 1),
             ("chip", r["chip"].translate((0, 0, r["z_pcb"] + gap)), P.C["chip"], 1),
             ("conn", r["conn"].translate((0, 0, r["z_pcb"] + gap)), (0.85, 0.85, 0.85), 1)]
    parts += [("cap", c.translate((0, 0, r["z_pcb"] + gap)), (0.75, 0.6, 0.4), 1) for c in r["caps"]]
    parts.append(("lid", r["lid"].translate((0, 0, r["z_lid"] + 2 * gap + 1)), P.C["imu"], 1))
    an = {"lid (PA12, blue = motion sensor)": (0, 3, r["z_lid"] + 2 * gap + 2), "BMI270 IMU 3.0 x 2.5 mm": (0.8, 0, r["z_pcb"] + gap + 1.6),
          "board 10 x 8 x 0.8 mm": (-3.5, -3.5, r["z_pcb"] + gap + 0.8), "4-pin cable connector": (-3.8, 0, r["z_pcb"] + gap + 1.8),
          "base with finger saddle (R 9 mm)": (5.5, -4.5, 1.5), "strap slot 5.2 x 0.9 mm": (0, -6.7, 1.5), "silicone strap": (0, -9.5, -gap - 3)}
    go("ring_exploded", parts, dict(focal=(0, 0, 6), pos=(55, -70, 55), up=(0, 0, 1), dist=95), (1500, 1100), an, tol=0.03)

    m = P.motor_parts()
    parts = [("strap", m["strap"].translate((0, 0, -gap)), P.C["strap"], 1), ("base", m["base"], P.C["shell"], 1),
             ("lra", m["lra"].translate((0, 0, m["z_lra"] + gap)), P.C["metal"], 1),
             ("lid", m["lid"].translate((0, 0, m["z_lid"] + 2 * gap)), P.C["motor"], 1)]
    an = {"lid (gold = vibration motor)": (0, 3, m["z_lid"] + 2 * gap + 1), "coin LRA 8 x 3.3 mm, 235 Hz": (0, -4, m["z_lra"] + gap + 2.5),
          "base, saddle R 10 mm": (5, -4, 2), "silicone strap": (0, -10.5, -gap - 3)}
    go("motor_exploded", parts, dict(focal=(0, 0, 6), pos=(55, -70, 55), up=(0, 0, 1), dist=90), (1500, 1100), an, tol=0.03)

    h = P.hand_parts()
    g = 12
    parts = [("base", h["base"], P.C["shell"], 1), ("pcb", h["pcb"].translate((0, 0, h["z_pcb"] + g)), P.C["pcb"], 1)]
    parts += [("chip", c.translate((0, 0, h["z_pcb"] + g)), P.C["chip"], 1) for c in h["chips"]]
    parts += [("conn", c.translate((0, 0, h["z_pcb"] + g)), (0.85, 0.85, 0.85), 1) for c in h["conns"]]
    parts.append(("lid", h["lid"].translate((0, 0, h["z_lid"] + 2 * g + 2)), P.C["imu"], 1))
    z = h["z_pcb"] + g + 1.6
    an = {"TCA9548A I2C switch": (-9, 6, z), "5 x DRV2605L haptic drivers": (9, -6, z), "BMI270 (back-of-hand IMU)": (-10, -6, z),
          "5 finger-cable ports": (21, 0, 4.5), "lid": (0, 8, h["z_lid"] + 2 * g + 3.5), "case 42 x 32 x 8 mm": (-14, -14, 3)}
    go("hand_exploded", parts, dict(focal=(0, 0, 14), pos=(120, -160, 130), up=(0, 0, 1), dist=190), (1600, 1150), an, tol=0.05)

    u = P.hub_parts()
    g = 16
    parts = [("base", u["base"], P.C["shell"], 1), ("bat", u["bat"].translate((0, 0, u["z_bat"] + g)), P.C["battery"], 1),
             ("pcb", u["pcb"].translate((0, 0, u["z_pcb"] + 2 * g)), P.C["pcb"], 1),
             ("esp", u["esp"].translate((0, 0, u["z_pcb"] + 2 * g)), P.C["chip"], 1),
             ("shield", u["shield"].translate((0, 0, u["z_pcb"] + 2 * g)), P.C["metal"], 1),
             ("sd", u["sd"].translate((0, 0, u["z_pcb"] + 2 * g)), P.C["metal"], 1),
             ("usb", u["usb"].translate((0, 0, u["z_pcb"] + 2 * g)), P.C["metal"], 1)]
    parts += [("chip", c.translate((0, 0, u["z_pcb"] + 2 * g)), P.C["chip"], 1) for c in u["chips"]]
    parts.append(("lid", u["lid"].translate((0, 0, u["z_lid"] + 3 * g)), P.C["hub"], 1))
    z = u["z_pcb"] + 2 * g + 1.0
    an = {"ESP32-S3-MINI-1 15.4 x 20.5 mm": (-16, 7, z + 2.8), "microSD (full-rate backup log)": (-15, -10, z + 1.8),
          "3 x DRV2605L + TCA9548A": (10, 6, z + 1.2), "USB-C charging": (26, 6, z + 3.2), "MCP73831 charger": (20, -4, z + 1.1),
          "LiPo 1,000 mAh, 50 x 34 x 6 mm": (0, -12, u["z_bat"] + g + 6), "case 62 x 44 x 16 mm, strap loops": (-20, -24, 4),
          "lid with LED window": (24, -15, u["z_lid"] + 3 * g + 2.4)}
    go("hub_exploded", parts, dict(focal=(0, 0, 30), pos=(160, -210, 170), up=(0, 0, 1), dist=250), (1700, 1250), an, tol=0.06)

    # line-up of the five housings, closed, for scale
    items = [("ring", 0), ("motor", 32), ("joint", 72), ("hand", 130), ("hub", 210)]
    parts = []
    for kind, x in items:
        for n, s, c in P.pod_assembly(kind):
            if "strap" in n: continue
            parts.append((n, s.translate((x, 0, 0)), c, 1))
    parts.append(scale_bar(50, (95, -40, 0)))
    an = {"finger ring\n13 x 11 x 4.4": (0, 0, 5), "finger motor\n12 dia x 5.2": (32, 0, 6), "joint pod\n28 x 20 x 8": (72, 0, 8.5),
          "hand board\n42 x 32 x 8": (130, 0, 8.5), "hub\n62 x 44 x 16": (210, 0, 17), "50 mm": (95, -40, 0)}
    go("pods_lineup", parts, dict(focal=(110, 0, 0), pos=(110, -260, 220), up=(0, 0, 1), dist=330), (2000, 800), an, tol=0.05)


def tabla():
    parts = P.tabla_parts()
    an = {"piezo clip on dayan shell (27 mm disc)": (130 - 81, 0, 245), "piezo clip on bayan shell": (-150 - 124, 0, 230),
          "base unit 86 x 56 x 24 mm": (-5, -170, 25), "dayan 140 mm head": (130, 0, 300), "bayan 229 mm head": (-150, 0, 290)}
    # the clips face the player (-y); place them there
    fixed = []
    for n, s, c, o in parts:
        if n.startswith("piezo clip"):
            x0 = 130 if "dayan" in n else -150
            r_at = 77 if "dayan" in n else 124
            z = 245 if "dayan" in n else 230
            clip = P.rbox(34, 34, 6, 6).faces(">Z").edges().fillet(1.5).rotate((0, 0, 0), (1, 0, 0), 90).translate((x0, -r_at - 1, z))
            fixed.append((n, clip, c, o))
            an[[k for k in an if ("dayan" in k if "dayan" in n else "bayan" in k) and "clip" in k][0]] = (x0, -r_at - 6, z)
        else:
            fixed.append((n, s, c, o))
    go("tabla_iso", fixed, dict(focal=(-10, 0, 150), pos=(-10, -900, 520), up=(0, 0, 1), zoom=1.15), (1700, 1150), an, tol=0.5)
    sb = scale_bar(100, (-50, -260, 0))
    an2 = {"dayan head 140 mm": (130, 0, 300), "bayan head 229 mm": (-150, 0, 290), "clip": (130, -82, 245), "clip ": (-150, -129, 230),
           "base unit": (-5, -170, 25), "100 mm": (-50, -260, 0)}
    go("tabla_top", fixed + [sb], dict(focal=(-10, -40, 0), pos=(-10, -40, 1500), up=(0, 1, 0), zoom=1.0), (1500, 1000), an2, parallel=True, tol=0.5)


def puppet():
    parts = P.puppet_parts()
    arm = [p for p in P.arm_parts() if p[0].split()[0] in ("hand", "index", "middle", "ring", "little", "thumb", "forearm")]
    off = np.array([-660, 0, 830])
    moved = [(n, s.translate(tuple(off)), c, o) for n, s, c, o in arm]
    tubes, an = [], {}
    for name, (y, zb, segs, r) in P.FINGERS.items():
        xr = P.X_KNUCKLE - 8 + segs[0] + segs[1] / 2
        for n, s, c in P.pod_assembly("ring"):
            moved.append((n, P.place(s, (xr + off[0], y, zb - 1.5 + r * 0.93 - 0.6 + off[2])), c, 1))
    # strings: head to middle finger, puppet hands to index and little fingers
    fx = lambda f: P.X_KNUCKLE - 8 + sum(P.FINGERS[f][2][:2]) + off[0]
    hand_x = 62 + 150 * math.sin(math.radians(25)); hand_z = 410 - 150 * math.cos(math.radians(25))
    strings = [((0, -10, 505), (fx("middle"), P.FINGERS["middle"][0], off[2] - 6)), ((0, 10, 505), (fx("ring"), P.FINGERS["ring"][0], off[2] - 6)),
               ((-hand_x, 0, hand_z), (fx("little"), P.FINGERS["little"][0], off[2] - 6)), ((hand_x, 0, hand_z), (fx("index"), P.FINGERS["index"][0], off[2] - 6))]
    for a, b in strings:
        tubes.append(P.tube([a, ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2), b], 0.8, P.C["thread"]))
    an = {"sensor pod in torso (30 x 20 x 10 mm)": (0, 45, 365), "strings looped on fingers": (fx("index") - 10, 30, off[2] - 120),
          "finger rings (IMU)": (fx("middle"), 10, off[2] + 10), "Kathputli, about 55 cm tall": (120, 0, 150)}
    go("puppet_iso", parts + moved, dict(focal=(0, 0, 440), pos=(760, 1250, 820), up=(0, 0, 1), zoom=1.0), (1200, 1500), an, tubes, tol=0.6)


def loom():
    parts = P.loom_parts()
    an = {"beater sensor (IMU)": (0, -40, 1100), "treadle switches": (110, -260, 22), "loom node (ESP32, battery)": (541, -470, 700),
          "phone camera over the cloth": (340, -320, 1300), "woven cloth (picks per cm)": (-200, -390, 925)}
    go("loom_iso", parts, dict(focal=(0, -120, 650), pos=(1500, -2100, 1600), up=(0, 0, 1), zoom=1.25), (1700, 1250), an, tol=2.0)


if __name__ == "__main__":
    which = sys.argv[1:] or ["sleeve", "exploded", "tabla", "puppet", "loom"]
    path = os.path.join(R, "anchors.json")
    if os.path.exists(path):
        A.update(json.load(open(path)))
    for w in which:
        {"sleeve": sleeve_views, "exploded": exploded, "tabla": tabla, "puppet": puppet, "loom": loom}[w]()
        json.dump(A, open(path, "w"), indent=1)
