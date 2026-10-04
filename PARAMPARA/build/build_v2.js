// Builds PARAMPARA_v2_Final_Research_Dossier.docx (red-team revision)
// Run: node PARAMPARA/build/build_v2.js
process.env.PARAMPARA_REFS = require("path").join(__dirname, "refs_v2");
const fs = require("fs");
const path = require("path");
const L = require("./lib");
const { D, W, COLOR, FONT, refs, cited, runs, P, H1, H3, spacer } = L;

const OUT = path.join(__dirname, "..", "PARAMPARA_v2_Final_Research_Dossier.docx");

// ---- cover -------------------------------------------------------------------
function cover() {
  const c = [];
  c.push(spacer(1300));
  c.push(new D.Paragraph({ children: [new D.TextRun({ text: "SMART INDIA HACKATHON 2026  ·  PS 26214", font: FONT, size: 20, bold: true, color: COLOR.gold, characterSpacing: 40 })], spacing: { after: 200 } }));
  c.push(new D.Paragraph({ children: [new D.TextRun({ text: "PARAMPARA 2.0", font: FONT, size: 84, bold: true, color: COLOR.maroon, characterSpacing: 50 })], spacing: { after: 60 } }));
  c.push(new D.Paragraph({ children: [new D.TextRun({ text: "Feel the Guru's Hand", font: FONT, size: 40, color: COLOR.blue })], spacing: { after: 240 } }));
  c.push(new D.Paragraph({
    border: { left: { style: D.BorderStyle.SINGLE, size: 24, color: COLOR.gold, space: 12 } }, indent: { left: 240 },
    children: runs("Measure a master's rhythmic fingerprint. Teach it through touch, sound and sight. Step back until the student plays alone. Keep the master's consent and credit attached.", { size: 26 }),
    spacing: { after: 480 },
  }));
  c.push(new D.Paragraph({ children: runs("**Final research dossier, version 2.0 (red-team revision)**", { size: 24 }), spacing: { after: 80 } }));
  c.push(new D.Paragraph({ children: runs("AICTE · MIC Student Innovation · Heritage & Culture · Hardware", { size: 20, color: COLOR.grey }), spacing: { after: 80 } }));
  c.push(new D.Paragraph({ children: runs("Version 2.0 · 5 October 2026", { size: 20, color: COLOR.grey }), spacing: { after: 560 } }));
  c.push(...L.Box("What changed from version 1", [[
    "Every weakness from our own harsh SIH-judge review (v1 ≈ 59/100) is answered in Section 2, with evidence and the risk that remains.",
    "New core: the Gharana Fingerprint, a measurable signature of each master, and a three-tier curriculum that gives touch, hearing and vision the jobs the research says they do best.",
    "Movement-aware haptics, Fade Engine 2.1, fingerprint signing by passkey, CARE-based consent, a custom PCB with volume pricing, and a public showcase kiosk.",
    "Four decisive experiments (E1–E4) with ready analysis code, two new simulations and about 30 new sources.",
  ]]));
  c.push(new D.Paragraph({ children: [new D.PageBreak()] }));
  return c;
}

// ---- references section --------------------------------------------------------
function references() {
  const r = [H1("20. References", true)];
  r.push(P("Status at the end of each entry: **V** verified this session by live web search (October 2026); **P** existence verified, some details from memory; **S** standard reference carried over, not re-checked. Numbers quoted in the text come from V-status entries unless marked otherwise."));
  for (const ref of refs) {
    if (ref.group) { r.push(H3(ref.group)); continue; }
    const kids = [new D.TextRun({ text: `[${ref.n}]  `, font: FONT, size: 17, bold: true, color: COLOR.cite })];
    kids.push(...runs(ref.t, { size: 17 }));
    kids.push(new D.TextRun({ text: `  Status: ${ref.s}.`, font: FONT, size: 17, bold: true, color: ref.s === "V" ? COLOR.green : ref.s === "P" ? COLOR.gold : COLOR.grey }));
    if (ref.u) {
      kids.push(new D.TextRun({ text: "  ", font: FONT, size: 17 }));
      kids.push(new D.ExternalHyperlink({ link: ref.u, children: [new D.TextRun({ text: ref.u, font: FONT, size: 15, color: COLOR.blue, underline: {} })] }));
    }
    r.push(new D.Paragraph({ children: kids, indent: { left: 520, hanging: 520 }, spacing: { after: 70, line: 252 } }));
  }
  return r;
}

// ---- assemble -------------------------------------------------------------------
const body1 = require("./content_v2a")(L);
const body2all = require("./content_v2b")(L);
const cut = body2all.indexOf("__APPENDIX__");
const body2 = body2all.slice(0, cut);
const appendix = body2all.slice(cut + 1);
const children = [...cover(), ...body1, ...body2, ...references(), ...appendix];

const uncited = refs.filter((r) => r.key && !cited.has(r.key)).map((r) => r.key);
if (uncited.length) console.warn("Uncited references:", uncited.join(", "));
const counts = refs.filter((r) => r.key).reduce((a, r) => ((a[r.s] = (a[r.s] || 0) + 1), a), {});
console.log("References:", refs.filter((r) => r.key).length, counts);

const headerPara = new D.Paragraph({
  alignment: D.AlignmentType.RIGHT,
  border: { bottom: { style: D.BorderStyle.SINGLE, size: 4, color: COLOR.line, space: 4 } },
  children: [new D.TextRun({ text: "PARAMPARA 2.0  ·  Final Research Dossier  ·  SIH 2026 PS 26214", font: FONT, size: 15, color: COLOR.grey })],
});
const footerPara = new D.Paragraph({
  alignment: D.AlignmentType.CENTER,
  children: [
    new D.TextRun({ text: "Page ", font: FONT, size: 15, color: COLOR.grey }),
    new D.TextRun({ children: [D.PageNumber.CURRENT], font: FONT, size: 15, color: COLOR.grey }),
    new D.TextRun({ text: " of ", font: FONT, size: 15, color: COLOR.grey }),
    new D.TextRun({ children: [D.PageNumber.TOTAL_PAGES], font: FONT, size: 15, color: COLOR.grey }),
  ],
});

const doc = new D.Document({
  creator: "Team PARAMPARA",
  title: "PARAMPARA 2.0: Final Research Dossier",
  description: "Merged, fact-checked research dossier for SIH 2026 PS 26214",
  styles: {
    default: { document: { run: { font: FONT, size: 20, color: COLOR.ink } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 34, bold: true, font: FONT, color: COLOR.maroon },
        paragraph: { spacing: { before: 0, after: 200 }, outlineLevel: 0,
          border: { bottom: { style: D.BorderStyle.SINGLE, size: 12, color: COLOR.gold, space: 6 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: FONT, color: COLOR.blue },
        paragraph: { spacing: { before: 260, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: FONT, color: COLOR.maroon },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: "bul", levels: [
        { level: 0, format: D.LevelFormat.BULLET, text: "•", alignment: D.AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 260 } } } },
        { level: 1, format: D.LevelFormat.BULLET, text: "–", alignment: D.AlignmentType.LEFT, style: { paragraph: { indent: { left: 800, hanging: 260 } } } },
      ] },
      { reference: "num", levels: [
        { level: 0, format: D.LevelFormat.DECIMAL, text: "%1.", alignment: D.AlignmentType.LEFT, style: { paragraph: { indent: { left: 420, hanging: 300 } } } },
      ] },
    ],
  },
  sections: [{
    properties: {
      titlePage: true,
      page: { size: { width: 11906, height: 16838 }, margin: { top: 1300, right: 1440, bottom: 1200, left: 1440, header: 600, footer: 600 } },
    },
    headers: { default: new D.Header({ children: [headerPara] }), first: new D.Header({ children: [new D.Paragraph({ children: [] })] }) },
    footers: { default: new D.Footer({ children: [footerPara] }), first: new D.Footer({ children: [new D.Paragraph({ children: [] })] }) },
    children,
  }],
});

D.Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUT, buf);
  console.log("Wrote", OUT, (buf.length / 1024).toFixed(0) + " KB");
});
