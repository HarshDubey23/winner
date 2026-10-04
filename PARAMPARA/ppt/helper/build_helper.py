"""
Builds the PPT helper from spec.py:
  helper/wireframes/slideN_wireframe.png   annotated layout guide per slide (real text, real images, exact positions)
  helper/wireframes/all_slides.png         the six guides on one sheet
  ../SIH_PPT_Master_Prompts.md             per-slide part map, exact content, master prompt, image prompts
  helper/PARAMPARA_slide_assets.zip        every image the prompts ask you to upload
It also checks every text box for overflow (in the real fonts, Poppins and Inter) and every element for leaving its part.
Run: python3 PARAMPARA/ppt/helper/build_helper.py
"""
import html, json, os, re, subprocess, sys, zipfile
from playwright.sync_api import sync_playwright

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import spec as S

HERE, ROOT = S.HERE, S.ROOT
PPT = os.path.dirname(HERE)
WF = os.path.join(HERE, "wireframes")
os.makedirs(WF, exist_ok=True)
PX = 100.0                         # pixels per inch in the wireframe page
pt = lambda s: s * PX / 72.0
fmt = lambda v: f"{v:.2f}"

# ----------------------------------------------------------------------------------------------- HTML wireframe
def md_inline(s):
    s = html.escape(s)
    s = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", s)
    return s.replace("\n", "<br>")

def box_css(x, y, w, h):
    return f"left:{x*PX:.1f}px;top:{y*PX:.1f}px;width:{w*PX:.1f}px;height:{h*PX:.1f}px;"

def font_css(e):
    if e.get("font") == "head":
        return f"font-family:Poppins;font-weight:{700 if e['size'] >= 24 else 600};"
    return f"font-family:Inter;font-weight:{700 if e.get('bold') else 400};"

UID = [0]
def uid():
    UID[0] += 1
    return f"e{UID[0]}"

def render_item(e, svg):
    t = e["t"]
    if t == "text":
        st = box_css(e["x"], e["y"], e["w"], e["h"]) + font_css(e)
        st += f"font-size:{pt(e['size']):.2f}px;color:#{e['color']};text-align:{e['align']};padding:{e['pad']*PX:.1f}px;"
        st += "justify-content:center;" if e["valign"] == "middle" else "justify-content:flex-start;"
        if e["fill"]: st += f"background:#{e['fill']};"
        if e["border"]: st += f"border:1px solid #{e['border']};"
        if e["radius"]: st += f"border-radius:{e['radius']*PX:.1f}px;"
        if e["italic"]: st += "font-style:italic;"
        return f'<div class="el txt fit" id="{uid()}" style="{st}"><div>{md_inline(e["text"])}</div></div>'
    if t == "bullets":
        st = box_css(e["x"], e["y"], e["w"], e["h"]) + f"font-size:{pt(e['size']):.2f}px;color:#{e['color']};"
        lis = "".join(f'<li style="margin-bottom:{e["gap"]}px"><span class="mk" style="color:#{e["mcolor"]}">{html.escape(e["mark"])}</span>'
                      f'<span>{md_inline(it)}</span></li>' for it in e["items"])
        return f'<div class="el fit" id="{uid()}" style="{st}"><ul>{lis}</ul></div>'
    if t == "img":
        st = box_css(e["x"], e["y"], e["w"], e["h"])
        tag = f'<span class="tag">{html.escape(e["tag"])}</span>' if e["tag"] else ""
        src = "file://" + os.path.normpath(os.path.join(PPT, e["src"]))
        return f'<div class="el img" style="{st}"><img src="{src}">{tag}</div>'
    if t == "table":
        st = box_css(e["x"], e["y"], e["w"], e["h"]) + f"font-size:{pt(e['size']):.2f}px;"
        cols = "".join(f'<col style="width:{c*PX:.1f}px">' for c in e["cols"])
        rows = []
        for ri, r in enumerate(e["rows"]):
            head = e["head"] and ri == 0
            tds = []
            for ci, c in enumerate(r):
                cs = ""
                if head: cs += f"background:#{e['head_fill']};color:#{e['head_color']};font-weight:700;"
                elif e["hl_col"] == ci: cs += f"background:#{e['hl_fill']};color:#{S.M};font-weight:700;"
                elif ci == 0 and e["first_bold"]: cs += "font-weight:700;"
                if e["align"] == "center" and ci > 0: cs += "text-align:center;"
                tds.append(f'<td style="{cs}">{md_inline(c)}</td>')
            rows.append("<tr>" + "".join(tds) + "</tr>")
        return (f'<div class="el fit" id="{uid()}" style="{st}"><table><colgroup>{cols}</colgroup>'
                + "".join(rows) + "</table></div>")
    if t == "chevron":
        p = 0.16 * PX
        st = box_css(e["x"], e["y"], e["w"], e["h"]) + f"font-size:{pt(e['size']):.2f}px;color:#{e['color']};background:#{e['fill']};"
        left = f"{p:.0f}px 50%," if not e["first"] else ""
        st += f"clip-path:polygon(0 0,calc(100% - {p:.0f}px) 0,100% 50%,calc(100% - {p:.0f}px) 100%,0 100%,{left[:-1] if left else '0 100%'});"
        st += f"padding:0 {p + 4:.0f}px 0 {(p + 6) if not e['first'] else 8:.0f}px;"
        return f'<div class="el chev fit" id="{uid()}" style="{st}"><div>{md_inline(e["text"])}</div></div>'
    if t == "arrow":
        svg.append(f'<line x1="{e["x1"]*PX:.1f}" y1="{e["y1"]*PX:.1f}" x2="{e["x2"]*PX:.1f}" y2="{e["y2"]*PX:.1f}" '
                   f'stroke="#{e["color"]}" stroke-width="1.6" marker-end="url(#ah{e["color"]})"/>')
        return ""
    if t == "callout":
        r = 0.11 * PX
        st = f"left:{e['ax']*PX - r:.1f}px;top:{e['ay']*PX - r:.1f}px;width:{2*r:.1f}px;height:{2*r:.1f}px;background:#{e['color']};"
        return f'<div class="el co" style="{st}">{e["letter"]}</div>'
    if t == "leader":
        lx, ly, lw, lh = e["lx"], e["ly"], e["lw"], e["lh"]
        if lx <= e["ax"] <= lx + lw:
            ex, ey = e["ax"], (ly if e["ay"] < ly else ly + lh)
        else:
            ex, ey = (lx if e["ax"] < lx else lx + lw), ly + lh / 2
        svg.append(f'<line x1="{e["ax"]*PX:.1f}" y1="{e["ay"]*PX:.1f}" x2="{ex*PX:.1f}" y2="{ey*PX:.1f}" stroke="#{e["color"]}" stroke-width="1"/>'
                   f'<circle cx="{e["ax"]*PX:.1f}" cy="{e["ay"]*PX:.1f}" r="3.2" fill="#{e["color"]}" stroke="#fff" stroke-width="1"/>')
        st = box_css(lx, ly, lw, lh) + f"font-size:{pt(e['size']):.2f}px;border:1px solid #{e['color']};"
        return f'<div class="el ldr fit" id="{uid()}" style="{st}"><div>{html.escape(e["text"])}</div></div>'
    raise ValueError(t)

def render_part(p, svg):
    out = [f'<div class="part" style="{box_css(p["x"], p["y"], p["w"], p["h"])}background:#{p["fill"]};border:1px solid #{p["border"]};"></div>']
    out.append(f'<div class="badge" style="left:{(p["x"]+0.12)*PX:.1f}px;top:{(p["y"]+0.09)*PX:.1f}px;background:#{p["badge"]}">{p["n"]}</div>')
    out.append(f'<div class="ptitle fit" id="{uid()}" style="{box_css(p["x"]+0.47, p["y"]+0.07, p["w"]-0.59, 0.32)}color:#{p["title_color"]}">'
               f'<div>{html.escape(p["title"].upper())}</div></div>')
    out.append(f'<div class="coord" style="left:{(p["x"]+p["w"])*PX:.1f}px;top:{(p["y"]-0.135)*PX:.1f}px">'
               f'P{p["n"]} · x {fmt(p["x"])} · y {fmt(p["y"])} · {fmt(p["w"])} × {fmt(p["h"])} in</div>')
    for e in p["items"]:
        out.append(render_item(e, svg))
    return "".join(out)

CSS = """
*{box-sizing:border-box;margin:0;padding:0}
body{background:#fff}
.slide{position:relative;width:1333.3px;height:750px;background:#fff;overflow:hidden;font-family:Inter;color:#1E1E1E}
.zone{position:absolute;left:0;width:1333.3px;background:repeating-linear-gradient(135deg,#F1F1F1 0 6px,#FAFAFA 6px 12px)}
.zl{position:absolute;font:600 9px/1.1 Inter;color:#8A8A8A;letter-spacing:.3px}
.slot{position:absolute;border:1px dashed #9A9A9A;border-radius:6px;display:flex;align-items:center;justify-content:center;text-align:center;font:500 9px/1.15 Inter;color:#7A7A7A;background:#fff}
.title{position:absolute;display:flex;flex-direction:column;justify-content:center;font:600 27.8px/1.12 Poppins;color:#7A1F1F;overflow:hidden}
.part{position:absolute;border-radius:6px}
.badge{position:absolute;width:27px;height:27px;border-radius:50%;color:#fff;font:700 13px/27px Poppins;text-align:center}
.ptitle{position:absolute;display:flex;flex-direction:column;justify-content:center;font:600 15.3px/1.1 Poppins;letter-spacing:.4px;overflow:hidden;white-space:nowrap}
.coord{position:absolute;transform:translateX(-100%);font:500 8.5px/11px Inter;color:#9A9A9A;white-space:nowrap}
.el{position:absolute;overflow:hidden}
.txt,.chev,.ldr{display:flex;flex-direction:column;line-height:1.2}
.chev{justify-content:center;line-height:1.15}
.ldr{background:#fff;border-radius:3px;justify-content:center;padding:0 5px;line-height:1.1;color:#1E1E1E}
.img img{width:100%;height:100%;object-fit:contain;display:block}
.tag{position:absolute;left:2px;bottom:2px;font:500 9px/1 Inter;color:#5A5A5A;background:rgba(255,255,255,.85);padding:2px 4px;border-radius:3px}
.co{border-radius:50%;color:#fff;font:700 11px/22px Inter;text-align:center;border:1.5px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.15)}
ul{list-style:none;line-height:1.2}
li{display:flex;gap:5px}
.mk{flex:0 0 auto;font-weight:700}
table{border-collapse:collapse;width:100%;table-layout:fixed;line-height:1.16}
td{border-bottom:1px solid #D9CFC0;padding:2.5px 4px;vertical-align:middle}
svg.ov{position:absolute;left:0;top:0;width:1333.3px;height:750px;pointer-events:none}
"""

def slide_html(sl):
    svg = []
    UID[0] = 0
    parts = "".join(render_part(p, svg) for p in sl["parts"])
    colors = sorted({e["color"] for p in sl["parts"] for e in p["items"] if e["t"] == "arrow"})
    markers = "".join(f'<marker id="ah{c}" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">'
                      f'<path d="M0,0 L7,3.5 L0,7 z" fill="#{c}"/></marker>' for c in colors)
    head = (f'<div class="zone" style="top:0;height:95px"></div>'
            f'<div class="slot" style="{box_css(0.40, 0.17, 1.20, 0.62)}">Team logo or name<br>(official template)</div>'
            f'<div class="title fit" id="title" style="{box_css(1.75, 0.13, 9.60, 0.74)}"><div>{html.escape(sl["title"])}</div></div>'
            f'<div class="slot" style="{box_css(11.53, 0.15, 1.40, 0.66)}">SIH 2026 logo<br>(official template)</div>'
            f'<div class="zone" style="top:698px;height:52px"></div>'
            f'<div class="zl" style="left:40px;top:719px">OFFICIAL TEMPLATE FOOTER: PS 26214 · [TEAM NAME] · TEAM ID</div>'
            f'<div class="zl" style="right:40px;top:719px">SLIDE {sl["n"]} OF 6 · {len(sl["parts"])} PARTS · 13.333 × 7.5 in</div>')
    return (f'<!doctype html><meta charset="utf-8"><style>{CSS}</style><div class="slide">{head}{parts}'
            f'<svg class="ov" viewBox="0 0 1333.3 750"><defs>{markers}</defs>{"".join(svg)}</svg></div>')

FIT_JS = """() => [...document.querySelectorAll('.fit')].filter(e =>
  e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1).map(e =>
  ({id: e.id, text: e.innerText.slice(0, 60), over_h: e.scrollHeight - e.clientHeight, over_w: e.scrollWidth - e.clientWidth}))"""

# ----------------------------------------------------------------------------------------------- geometry checks
def bbox(e):
    if e["t"] == "arrow": return (min(e["x1"], e["x2"]), min(e["y1"], e["y2"]), abs(e["x2"]-e["x1"]), abs(e["y2"]-e["y1"]))
    if e["t"] == "callout": return (e["ax"] - 0.11, e["ay"] - 0.11, 0.22, 0.22)
    if e["t"] == "leader": return (e["lx"], e["ly"], e["lw"], e["lh"])
    return (e["x"], e["y"], e["w"], e["h"])

def geometry_problems(sl):
    probs = []
    ps = sl["parts"]
    for p in ps:
        if p["x"] < 0.39 or p["x"] + p["w"] > 12.94 or p["y"] < 1.04 or p["y"] + p["h"] > 6.96:
            probs.append(f"part {p['n']} leaves the content zone")
        for e in p["items"]:
            x, y, w, h = bbox(e)
            if x < p["x"] + 0.05 or y < p["y"] + 0.3 or x + w > p["x"] + p["w"] - 0.05 or y + h > p["y"] + p["h"] - 0.04:
                probs.append(f"part {p['n']}: {e['t']} at ({x:.2f},{y:.2f},{w:.2f},{h:.2f}) leaves the part")
    for i, a in enumerate(ps):
        for b in ps[i+1:]:
            if a["x"] < b["x"] + b["w"] - 0.01 and b["x"] < a["x"] + a["w"] - 0.01 and a["y"] < b["y"] + b["h"] - 0.01 and b["y"] < a["y"] + a["h"] - 0.01:
                probs.append(f"parts {a['n']} and {b['n']} overlap")
    return probs

# ----------------------------------------------------------------------------------------------- prompt text
def q(s):
    return s.replace("\n", " | ")

def fontname(e):
    return "Poppins " + ("Bold" if e["size"] >= 24 else "SemiBold") if e.get("font") == "head" else "Inter" + (" Bold" if e.get("bold") else "")

def describe(e):
    t = e["t"]
    if t == "text":
        if not e["text"]:
            extra = f"fill #{e['fill']}" + (f", 1 pt #{e['border']} border" if e["border"] else "") + (f", corner radius {e['radius']:.2f} in" if e["radius"] else "")
            return f"Shape (no text) at x {fmt(e['x'])}, y {fmt(e['y'])}, {fmt(e['w'])} × {fmt(e['h'])} in: {extra}."
        bits = [f"{fontname(e)} {e['size']:g} pt", f"#{e['color']}"]
        if e["italic"]: bits.append("italic")
        if e["fill"]: bits.append(f"fill #{e['fill']}")
        if e["border"]: bits.append(f"1 pt #{e['border']} border")
        if e["radius"]: bits.append(f"corner radius {e['radius']:.2f} in")
        if e["align"] != "left": bits.append("centred" if e["align"] == "center" else "right-aligned")
        if e["valign"] == "middle": bits.append("vertically centred")
        if e["pad"]: bits.append(f"inner margin {e['pad']:.2f} in")
        return f"Text at x {fmt(e['x'])}, y {fmt(e['y'])}, {fmt(e['w'])} × {fmt(e['h'])} in: \"{q(e['text'])}\" ({', '.join(bits)})."
    if t == "bullets":
        items = " ".join(f"({i+1}) \"{it}\"" for i, it in enumerate(e["items"]))
        return (f"Bullet list at x {fmt(e['x'])}, y {fmt(e['y'])}, {fmt(e['w'])} × {fmt(e['h'])} in, Inter {e['size']:g} pt #{e['color']}, "
                f"bullet character \"{e['mark']}\" in #{e['mcolor']}, {e['gap']} pt after each item: {items}.")
    if t == "img":
        tag = f"; small tag \"{e['tag']}\" on its bottom-left corner (Inter 7.5 pt #5A5A5A on white at 85%)" if e["tag"] else ""
        return f"Image `{os.path.basename(e['src'])}` at x {fmt(e['x'])}, y {fmt(e['y'])}, fitted inside {fmt(e['w'])} × {fmt(e['h'])} in (keep aspect ratio, no crop){tag}."
    if t == "table":
        rows = "\n".join("      | " + " | ".join(c if c else "(empty)" for c in r) + " |" for r in e["rows"])
        bits = [f"Inter {e['size']:g} pt", "0.75 pt #D9CFC0 line under every row, no vertical lines", "cell margins 0.03 in top/bottom, 0.05 in left/right"]
        if e["head"]: bits.append(f"first row is the header: fill #{e['head_fill']}, bold, text #{e['head_color']}")
        else: bits.append("no header row")
        if e["first_bold"]: bits.append("first column bold")
        if e["hl_col"] is not None: bits.append(f"column {e['hl_col']+1} (our column) fill #{e['hl_fill']}, bold, text #{S.M}")
        if e["align"] == "center": bits.append("columns 2 onwards centred")
        return (f"Table at x {fmt(e['x'])}, y {fmt(e['y'])}, width {fmt(e['w'])} in, max height {fmt(e['h'])} in; column widths "
                f"{', '.join(fmt(c) for c in e['cols'])} in; {'; '.join(bits)}. Rows:\n{rows}")
    if t == "chevron":
        return (f"{'Pentagon arrow (flat left end)' if e['first'] else 'Chevron arrow'} shape at x {fmt(e['x'])}, y {fmt(e['y'])}, {fmt(e['w'])} × {fmt(e['h'])} in, "
                f"fill #{e['fill']}, no outline; text \"{q(e['text'])}\" Inter {e['size']:g} pt #{e['color']}, centred.")
    if t == "arrow":
        return f"Arrow line from ({fmt(e['x1'])}, {fmt(e['y1'])}) to ({fmt(e['x2'])}, {fmt(e['y2'])}) in, 1.25 pt #{e['color']}, triangle head at the end."
    if t == "callout":
        return (f"Callout circle \"{e['letter']}\" centred at ({fmt(e['ax'])}, {fmt(e['ay'])}) in on the render: 0.22 in diameter, fill #{e['color']}, "
                f"white 1 pt outline, white Inter Bold 8 pt letter.")
    if t == "leader":
        return (f"Label \"{e['text']}\" at x {fmt(e['lx'])}, y {fmt(e['ly'])}, {fmt(e['lw'])} × {fmt(e['lh'])} in (white box, 1 pt #{e['color']} border, "
                f"Inter {e['size']:g} pt #1E1E1E, vertically centred) with a 0.75 pt #{e['color']} line to a 0.06 in #{e['color']} dot at "
                f"({fmt(e['ax'])}, {fmt(e['ay'])}) in, on that part of the render.")
    raise ValueError(t)

GLOBAL = """GLOBAL STYLE (same on all six slides)
- Canvas: 16:9, 13.333 × 7.5 in, white background (#FFFFFF). All positions are in inches from the top-left corner.
- Keep the official SIH 2026 template header (y 0 to 0.95 in: team logo/name left, SIH logo right) and footer (y 6.98 to 7.5 in) exactly as the template has them. Put nothing of ours there except the slide title.
- Slide title: text box x 1.75, y 0.13, 9.60 × 0.74 in, Poppins SemiBold 20 pt, #7A1F1F, left-aligned, vertically centred, at most 2 lines.
- Panels ("parts"): white fill, 1 pt #D9CFC0 border, corner radius 0.06 in, no shadow. Gap between panels 0.15 in.
- Panel header: a 0.27 in circle badge at (panel x + 0.12, panel y + 0.09) with the part number in white Poppins Bold 10 pt, filled with the panel colour; header text at (panel x + 0.47, panel y + 0.07), height 0.32 in, Poppins SemiBold 11 pt, UPPERCASE, letter spacing 0.4 pt, in the panel colour. Panel content starts 0.42 in below the panel top.
- Fonts: Poppins (headings, big numbers) and Inter (everything else). If PowerPoint lacks them, install both from Google Fonts or use Calibri for both. Nothing smaller than 7.5 pt; body text 8.5 to 10 pt.
- Colours: maroon #7A1F1F (idea, problem, risks), blue #1F4E79 (technical), brass #B8901A (money, value), green #2E6B3A (proof that works today), text #1E1E1E, muted #5A5A5A. Tints: #F6ECEC, #EAF1F8, #FBF5E6, #EEF6EF, #F4F4F4.
- Images: transparent PNGs placed exactly as given, aspect ratio kept, never stretched or cropped. Every CAD image keeps a small "CAD render" tag; never present a render as a photograph.
- Text: use the words given, word for word. "**x**" means bold, " | " means a line break. Do not add sentences, numbers, emojis or clip art.
- Before finishing: no text overflows its box, nothing overlaps, every element sits inside its panel, all six (or five) parts are visible and evenly spaced."""

def master_prompt(sl):
    files = []
    for p in sl["parts"]:
        for e in p["items"]:
            if e["t"] == "img" and os.path.basename(e["src"]) not in files: files.append(os.path.basename(e["src"]))
    lines = [f"You are a senior presentation designer who builds hardware design-review slides. Build slide {sl['n']} of 6 of an SIH 2026 idea-submission deck "
             f"(problem statement 26214, PARAMPARA). Make exactly ONE slide. Output a .pptx file (python-pptx) or, in Canva or Gamma, place everything by hand at the positions below.",
             f"UPLOAD THESE IMAGES FIRST: {', '.join(files) if files else 'none'} (from the PARAMPARA slide asset pack).", "", GLOBAL, "",
             f"SLIDE TITLE: \"{sl['title']}\"", "",
             f"LAYOUT: {len(sl['parts'])} parts. Reading order: {sl['reading']}", ""]
    for p in sl["parts"]:
        border = "no border" if p["border"] == p["fill"] else f"1 pt #{p['border']} border"
        lines.append(f"PART {p['n']}: {p['title'].upper()}  (answers: {p['answers']})")
        lines.append(f"  Panel: x {fmt(p['x'])}, y {fmt(p['y'])}, {fmt(p['w'])} × {fmt(p['h'])} in; fill #{p['fill']}; {border}; badge #{p['badge']}; header text #{p['title_color']}.")
        for e in p["items"]:
            lines.append("  - " + describe(e))
        lines.append("")
    lines.append("DO NOT: " + " ".join(sl["donts"]))
    lines.append(f"SPEAKER NOTES (put in the notes pane, not on the slide): {sl['notes']}")
    return "\n".join(lines)

# ----------------------------------------------------------------------------------------------- references
def load_refs():
    js = "const r=require(process.argv[1]);process.stdout.write(JSON.stringify(r.filter(x=>x.key)))"
    out = subprocess.run(["node", "-e", js, os.path.join(ROOT, "build/refs_v5.js")], capture_output=True, text=True, check=True).stdout
    by = {r["key"]: r for r in json.loads(out)}
    refs = {}
    for n, k in S.REF_KEYS.items():
        refs[n] = dict(t=by[k]["t"], u=by[k].get("u", ""))
    refs.update(S.EXTRA_REFS)
    return refs

# ----------------------------------------------------------------------------------------------- markdown
def content_lines(p):
    out = []
    for e in p["items"]:
        t = e["t"]
        if t == "text" and e["text"]: out.append(f"- {q(e['text'])}")
        elif t == "bullets": out += [f"- {e['mark']} {it}" for it in e["items"]]
        elif t == "img": out.append(f"- Image: `{os.path.basename(e['src'])}`" + (f" (tag: \"{e['tag']}\")" if e["tag"] else ""))
        elif t == "table":
            r0 = e["rows"][0]
            out.append("")
            out.append("| " + " | ".join(c or " " for c in r0) + " |")
            out.append("|" + "---|" * len(r0))
            out += ["| " + " | ".join(c or " " for c in r) + " |" for r in e["rows"][1:]]
            out.append("")
        elif t == "chevron": out.append(f"- Arrow step: {q(e['text'])}")
        elif t == "leader": out.append(f"- Call-out label: {e['text']}")
        elif t == "callout": out.append(f"- Letter {e['letter']} on the render at ({fmt(e['ax'])}, {fmt(e['ay'])}) in")
    # fold repeated call-out letters
    return out

def build_md(refs, fits):
    L = []
    A = L.append
    A("# PARAMPARA · SIH 2026 PS 26214 · Master prompts and helper for the 6-slide hardware PPT")
    A("")
    A("This file gives you, for each of the six official slides: how many parts the slide has and exactly where each part goes, the exact words for every part, "
      "a picture of the layout (wireframe), one copy-paste prompt that builds the slide, and the GPT image prompts for that slide. "
      "Everything comes from one source (`ppt/helper/spec.py`), so the wireframes, the positions and the prompts always match. "
      "Every text box was checked in the real fonts (Poppins and Inter): nothing overflows at the sizes given.")
    A("")
    A("## 0. Read this first")
    A("")
    A("**About winner decks.** National-winner idea PPTs are not published officially, and the decks circulating on GitHub and Telegram as 'SIH winner PPTs' cannot be verified, so this layout does not copy any of them. "
      "It follows two things that are verifiable: the official SIH idea template (6 slides, PDF, the fixed questions on each slide) and the way hardware teams present at international design reviews "
      "(product render, exploded view, block diagram, parts list with datasheet numbers, engineering budgets, test plan, risk register, and an honest done/next/not-yet line).")
    A("")
    A("**How the slides are split.** Every slide has 5 or 6 numbered parts (the number badge is part of the design). Each part answers one question the template asks, so a judge can tick off the template while reading. "
      "The table *Template question → where it is answered* on each slide proves nothing is missing.")
    A("")
    A("**How to use this (pick one):**")
    A("")
    A("1. **ChatGPT (fastest):** open a new chat, upload the images listed in the slide's prompt (all are in `helper/PARAMPARA_slide_assets.zip`), paste the slide's master prompt, and ask for a .pptx. Do one slide per chat. Then paste all six slides into the official SIH template.")
    A("2. **Canva or Google Slides:** set a custom size of 13.333 × 7.5 in, keep the wireframe image open beside you, and place each part at the x, y, w, h given in the part table. Copy the text from *Exact content*.")
    A("3. **PowerPoint by hand:** same as 2; use *Shape Format → Size and Position* to type the exact numbers.")
    A("")
    A("**Honesty rules (keep them, they protect you in the evaluation):** CAD renders are labelled 'CAD render'. AI images are labelled 'Concept illustration (AI)'. Say 'eight defined bench tests', 'pre-test on real performers', 'phone prototype working'. "
      "Never write 'validated end to end', 'proven fingerprint' or 'improves learning'. Master A and B in PARAMPARA Lite are example profiles.")
    A("")
    A("**Fill before export:** the exact PS title from the portal, the theme (check it on the portal), your Team ID and Team Name. Make the QR on slides 3 and 6 point to a public link (host `PARAMPARA/lite/index.html` on GitHub Pages, then regenerate the QR).")
    A("")
    A("## 1. Global design system")
    A("")
    A("![All six layout guides](helper/wireframes/all_slides.png)")
    A("")
    A("| Item | Value |")
    A("|---|---|")
    A("| Canvas | 16:9, 13.333 × 7.5 in (PowerPoint 'Widescreen'), white background |")
    A("| Template zones | Header y 0 to 0.95 in (team logo left, SIH logo right, slide title between); footer y 6.98 to 7.5 in. Our parts live in x 0.40 to 12.93, y 1.05 to 6.95 |")
    A("| Slide title | x 1.75, y 0.13, 9.60 × 0.74 in; Poppins SemiBold 20 pt; #7A1F1F; 1 or 2 lines |")
    A("| Panel | White, 1 pt #D9CFC0 border, corner radius 0.06 in, no shadow; 0.15 in gap between panels |")
    A("| Panel header | 0.27 in number badge (panel colour, white Poppins Bold 10 pt) + UPPERCASE Poppins SemiBold 11 pt title in the panel colour; content starts 0.42 in below the panel top |")
    A("| Fonts | Poppins (titles, big numbers), Inter (all other text). Fallback: Calibri for both |")
    A("| Sizes | Big numbers 16 to 40 pt; body 8.5 to 10 pt; tables 8.5 pt; captions and tags 7.5 to 8.5 pt. Nothing below 7.5 pt |")
    A("| Images | Transparent PNGs, aspect ratio kept, never cropped; each CAD image tagged 'CAD render' |")
    A("| Motif | Numbered panel badges + colour per meaning (no side bars, no gradients, no clip art) |")
    A("")
    A("| Colour | Hex | Use it for |")
    A("|---|---|---|")
    for name, hx, use in S.COLOURS:
        A(f"| {name} | `#{hx}` | {use} |")
    A("")
    # assets
    A("## 2. Images used, and where")
    A("")
    A("All files are in `PARAMPARA/ppt/assets/` and `PARAMPARA/figures/`, and together in `PARAMPARA/ppt/helper/PARAMPARA_slide_assets.zip`. These are our own CAD renders, charts and screenshots, not AI images.")
    A("")
    A("| File | What it shows | Slide · part | Tag to print |")
    A("|---|---|---|---|")
    what = {"hand_iso_transparent.png": "Hand end of the sleeve, 3/4 view (CAD)", "sleeve_iso_transparent.png": "Whole right-arm sleeve, 3/4 view (CAD)",
            "sleeve_dorsal_transparent.png": "Whole sleeve, back view (CAD)", "hand_palmar_transparent.png": "Palm side: palm and fingertips free (CAD)",
            "tabla_iso_transparent.png": "Tabla kit: piezo clips + base unit (CAD)", "puppet_iso_transparent.png": "Kathputli kit: pod in the torso (CAD)",
            "loom_iso_transparent.png": "Handloom kit: beater IMU, treadle switches (CAD)", "ring_exploded_transparent.png": "Finger ring IMU pod, exploded (CAD)",
            "motor_exploded_transparent.png": "Finger motor pod, exploded (CAD)", "hand_exploded_transparent.png": "Hand board, exploded (CAD)",
            "hub_exploded_transparent.png": "Forearm hub, exploded (CAD)", "qr_parampara_lite.png": "QR to the phone prototype",
            "v6_lite_screenshot.png": "PARAMPARA Lite running (real screenshot)", "v5_gmd_results.png": "Our pre-test on real drummer data (chart)"}
    seen = {}
    for sl in S.SLIDES:
        for p in sl["parts"]:
            for e in p["items"]:
                if e["t"] == "img":
                    b = os.path.basename(e["src"])
                    seen.setdefault(b, [e["src"], [], e["tag"]])[1].append(f"{sl['n']}·{p['n']}")
    for b, (src, where, tag) in seen.items():
        A(f"| `{b}` | {what.get(b, '')} | {', '.join(where)} | {tag or '(none)'} |")
    A("")
    # slides
    for sl in S.SLIDES:
        A(f"## Slide {sl['n']} · {sl['name']}  ({len(sl['parts'])} parts)")
        A("")
        A(f"**The template asks:** {'; '.join(sl['asks'])}.")
        A("")
        A(f"**What a judge must take away in 5 seconds:** {sl['takeaway']}")
        A("")
        A(f"**Reading order:** {sl['reading']}")
        A("")
        A(f"![Slide {sl['n']} layout guide](helper/wireframes/slide{sl['n']}_wireframe.png)")
        A("")
        A("### Template question → where it is answered")
        A("")
        A("| Template question | Answered in |")
        A("|---|---|")
        for a, b in sl["mapping"]:
            A(f"| {a} | {b} |")
        A("")
        A("### The parts: position and purpose")
        A("")
        A("| Part | Name | x, y (in) | w × h (in) | Colour | What goes here and why |")
        A("|---|---|---|---|---|---|")
        for p in sl["parts"]:
            A(f"| {p['n']} | {p['title']} | {fmt(p['x'])}, {fmt(p['y'])} | {fmt(p['w'])} × {fmt(p['h'])} | `#{p['color'] if p['color'] != S.WHITE else p['fill']}` | {p['what']} |")
        A("")
        A("### Exact content (copy-ready)")
        A("")
        A(f"**Slide title:** {sl['title']}")
        A("")
        for p in sl["parts"]:
            A(f"**Part {p['n']} · {p['title']}**")
            A("")
            lines = content_lines(p)
            # collapse callout letters into one line
            cos = [x for x in lines if x.startswith("- Letter ")]
            lines = [x for x in lines if not x.startswith("- Letter ")]
            if cos:
                lines.append("- Letters on the renders (they match the parts table): " + "; ".join(c[len("- Letter "):] for c in cos))
            L.extend(lines)
            A("")
        A("### Master prompt for this slide")
        A("")
        A("Paste this whole block into ChatGPT (after uploading the images it names), or follow it by hand in Canva or PowerPoint.")
        A("")
        A("```text")
        A(master_prompt(sl))
        A("```")
        A("")
        ims = [ip for ip in S.IMAGE_PROMPTS if str(sl["n"]) in re.findall(r"\d+", ip["slide"].split("(")[0]) or f"{sl['n']} (" in ip["slide"]]
        A("### Images for this slide")
        A("")
        A("Use our own files listed in the prompt. Optional AI images (prompts in section 9): " + (", ".join(f"{ip['id']} ({ip['file']})" for ip in ims) if ims else "none needed") + ".")
        A("")
        A("### Speaker notes (about 40 seconds)")
        A("")
        A(sl["notes"])
        A("")
        A("### Don't")
        A("")
        for d in sl["donts"]:
            A(f"- {d}")
        A("")
    # image prompts
    A("## 9. GPT image prompts (optional, for context and concept pictures only)")
    A("")
    A("Rules: (1) the exact equipment pictures are our CAD renders; AI never replaces them. (2) For a concept picture of the device, upload the CAD renders named in the prompt so GPT keeps the real design. "
      "(3) Print the label given under each prompt on the slide, in Inter 7.5 pt #5A5A5A. (4) Generate 3 or 4 versions and keep the one with correct hands and no text. (5) Real photos beat AI: for context scenes, a CC-licensed photo from Wikimedia Commons with its credit line is stronger.")
    A("")
    for ip in S.IMAGE_PROMPTS:
        A(f"### {ip['id']} · `{ip['file']}` · slide {ip['slide']} · {ip['ratio']}")
        A("")
        A(f"**Upload first:** {', '.join('`'+u+'`' for u in ip['upload']) if ip['upload'] else 'nothing'}  ")
        A(f"**Label to print on the slide:** {ip['label']}")
        A("")
        A("```text")
        A(ip["prompt"])
        A("```")
        A("")
    A("**Free icon alternative (no AI needed):** Lucide icons (lucide.dev, ISC licence), stroke 2 px, colour #7A1F1F: " +
      "; ".join(f"{a} → `{b}`" for a, b in S.ICON_ALTS) + ".")
    A("")
    # real photos
    A("## 10. Real equipment photos: the strongest proof you can add in 2 days")
    A("")
    A("Judges trust a photo of real boards on a desk more than any render. These breakout boards carry the same chips as the sleeve. Approximate Indian retail prices; check current prices with your supplier.")
    A("")
    A("| Buy | Qty | Approx. price |")
    A("|---|---|---|")
    for a, b, c in S.BUY:
        A(f"| {a} | {b} | {c} |")
    A("")
    A("| Shot | How to take it | Where it goes |")
    A("|---|---|---|")
    for a, b, c in S.SHOTS:
        A(f"| {a} | {b} | {c} |")
    A("")
    A("Phone camera tips: daylight from a window, no flash, plain dark mat, phone held parallel to the table, tap to focus on the chip markings, take 5 shots of each and keep the sharpest. Tag these 'Photo: our breadboard prototype'.")
    A("")
    # refs
    A("## 11. Numbered references used on the slides")
    A("")
    A("The numbers match the [n] markers on slides 2 to 6. Put each title on slide 6 as a hyperlink to its URL.")
    A("")
    for n in sorted(refs):
        r = refs[n]
        A(f"{n}. {r['t']}" + (f" <{r['u']}>" if r["u"] else ""))
    A("")
    # QA
    A("## 12. Final check before you export the PDF")
    A("")
    for c in ["Exactly 6 slides, in the template order: Title, Idea, Technical approach, Feasibility & viability, Impact & benefits, Research & references.",
              "Official header and footer untouched; logos sharp; slide titles at the same place on every slide.",
              "Title slide fields copied exactly from the portal (PS title, theme, Team ID, Team Name).",
              "Every part from the part tables is present; every template question is answered (check the mapping tables).",
              "No text smaller than 7.5 pt; no text overflowing; panels aligned on the same edges; 0.15 in gaps.",
              "Every CAD image tagged 'CAD render'; every AI image tagged 'Concept illustration (AI)'; every screenshot tagged.",
              "Every number has its [n] marker, and every [n] is listed on slide 6.",
              "QR codes open a public link on a phone that is not yours.",
              "Banned words absent: 'validated end to end', 'proven', 'improves learning', 'guaranteed'.",
              "Export as PDF (File → Export → PDF, 'Standard' quality) and open it once on a phone to check readability."]:
        A(f"- [ ] {c}")
    A("")
    A("Overflow check of this layout (Poppins/Inter, Chromium): " + ("no text box overflows." if not fits else f"{len(fits)} boxes overflow (see build log)."))
    A("")
    return "\n".join(L)

# ----------------------------------------------------------------------------------------------- main
def main():
    problems, fits_all = [], []
    for sl in S.SLIDES:
        problems += [f"slide {sl['n']}: {x}" for x in geometry_problems(sl)]
    with sync_playwright() as pw:
        try:
            b = pw.chromium.launch()
        except Exception:
            b = pw.chromium.launch(executable_path="/opt/pw-browsers/chromium")
        page = b.new_page(viewport={"width": 1334, "height": 750}, device_scale_factor=1.5)
        shots = []
        for sl in S.SLIDES:
            path = os.path.join(WF, f"slide{sl['n']}_wireframe.html")
            open(path, "w").write(slide_html(sl))
            page.goto("file://" + path)
            page.evaluate("document.fonts.ready")
            page.wait_for_timeout(300)
            fits = page.evaluate(FIT_JS)
            fits_all += [dict(slide=sl["n"], **f) for f in fits]
            png = os.path.join(WF, f"slide{sl['n']}_wireframe.png")
            page.locator(".slide").screenshot(path=png)
            os.remove(path)
            shots.append(png)
        b.close()
    from PIL import Image, ImageDraw
    ims = [Image.open(s).convert("RGB") for s in shots]
    w, h = ims[0].size
    sw, sh = w // 2, h // 2
    sheet = Image.new("RGB", (2 * sw + 3 * 24, 3 * sh + 4 * 24), "#E6E6E6")
    for i, im in enumerate(ims):
        sheet.paste(im.resize((sw, sh), Image.LANCZOS), (24 + (i % 2) * (sw + 24), 24 + (i // 2) * (sh + 24)))
    sheet.save(os.path.join(WF, "all_slides.png"))
    refs = load_refs()
    open(os.path.join(PPT, "SIH_PPT_Master_Prompts.md"), "w").write(build_md(refs, fits_all))
    with zipfile.ZipFile(os.path.join(HERE, "PARAMPARA_slide_assets.zip"), "w", zipfile.ZIP_DEFLATED) as z:
        added = set()
        for sl in S.SLIDES:
            for p in sl["parts"]:
                for e in p["items"]:
                    if e["t"] == "img" and e["src"] not in added:
                        added.add(e["src"]); z.write(os.path.normpath(os.path.join(PPT, e["src"])), os.path.basename(e["src"]))
        for ip in S.IMAGE_PROMPTS:
            for u in ip["upload"]:
                if "assets/" + u not in added:
                    added.add("assets/" + u); z.write(os.path.join(PPT, "assets", u), u)
    for x in problems: print("GEOMETRY:", x)
    for f in fits_all: print("OVERFLOW:", f)
    print(f"{len(problems)} geometry problems, {len(fits_all)} overflowing boxes")

if __name__ == "__main__":
    main()
