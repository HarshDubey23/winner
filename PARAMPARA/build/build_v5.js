// Builds PARAMPARA_v5_Final_Solution.docx (exact equipment + real-data edition)
// Run: node PARAMPARA/build/build_v5.js
process.env.PARAMPARA_REFS = require("path").join(__dirname, "refs_v5");
const fs = require("fs");
const path = require("path");
const L = require("./lib");
const { D, W, COLOR, FONT, refs, cited, runs, P, H1, H3, spacer } = L;

const OUT = path.join(__dirname, "..", "PARAMPARA_v5_Final_Solution.docx");

// ---- cover -------------------------------------------------------------------
function cover() {
  const c = [];
  c.push(spacer(1500));
  c.push(new D.Paragraph({ children: [new D.TextRun({ text: "SMART INDIA HACKATHON 2026  ·  PS 26214", font: FONT, size: 20, bold: true, color: COLOR.gold, characterSpacing: 40 })], spacing: { after: 200 } }));
  c.push(new D.Paragraph({ children: [new D.TextRun({ text: "PARAMPARA", font: FONT, size: 88, bold: true, color: COLOR.maroon, characterSpacing: 60 })], spacing: { after: 60 } }));
  c.push(new D.Paragraph({ children: [new D.TextRun({ text: "Feel the Master's Hand", font: FONT, size: 40, color: COLOR.blue })], spacing: { after: 240 } }));
  c.push(new D.Paragraph({
    border: { left: { style: D.BorderStyle.SINGLE, size: 24, color: COLOR.gold, space: 12 } }, indent: { left: 240 },
    children: runs("One sensor sleeve, from the fingers to the shoulder. Three living crafts: tabla, handloom and puppetry. We measure how a master moves, prove it is the master's, teach it, and step back until the learner performs alone.", { size: 26 }),
    spacing: { after: 480 },
  }));
  c.push(new D.Paragraph({ children: runs("**Final solution document · version 5**", { size: 24 }), spacing: { after: 80 } }));
  c.push(new D.Paragraph({ children: runs("AICTE · MIC Student Innovation · Heritage & Culture · Hardware", { size: 20, color: COLOR.grey }), spacing: { after: 80 } }));
  c.push(new D.Paragraph({ children: runs("4 October 2026", { size: 20, color: COLOR.grey }), spacing: { after: 600 } }));
  c.push(...L.Box("In one minute", [[
    "**One innovation:** a master's Skill Fingerprint (how every finger, the wrist, elbow and shoulder move, plus what the tool does), used as a teaching reference.",
    "**Tabla is the flagship;** handloom and Kathputli puppetry show the same sleeve and code generalise.",
    "**Exact equipment:** CAD-drawn sleeve with datasheet-checked parts, power, data and mass budgets, and eight bench tests.",
    "**Real data today:** on 10 professional drummers, our method names the performer on a new session and in a new style at about three times chance.",
    "**Learning counted with the device off,** and the master owns the recording.",
  ]]));
  c.push(new D.Paragraph({ children: [new D.PageBreak()] }));
  return c;
}

// ---- references section --------------------------------------------------------
function references() {
  const r = [H1("16. References", true)];
  r.push(P("Status at the end of each entry: **V** verified by live web search in October 2026; **P** existence verified, some details from memory (check before quoting); **S** standard textbook or classic paper. Only references cited in this document are listed."));
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

// ---- assemble (two passes: collect cited references, then renumber) -----------
const allRefs = refs.slice();
require("./content_v5")(L);
const citedKeys = new Set(cited);
const filtered = [];
let pendingGroup = null;
for (const r of allRefs) {
  if (r.group) { pendingGroup = r; continue; }
  if (citedKeys.has(r.key)) { if (pendingGroup) { filtered.push(pendingGroup); pendingGroup = null; } filtered.push(r); }
}
let groupIndex = 0;
const relabelled = filtered.map((r) => {
  if (!r.group) return r;
  const name = r.group.replace(/^[A-Z]\.\s*/, "").replace(/\s*\(added in v[245]\)/, "")
    .replace("Prior art and channels found in v2", "Prior art and education channels");
  return { group: String.fromCharCode(65 + groupIndex++) + ". " + name };
});
L.setRefs(relabelled);
const bodyAll = require("./content_v5")(L);
const cut = bodyAll.indexOf("__APPENDIX__");
const children = [...cover(), ...bodyAll.slice(0, cut), ...references(), ...bodyAll.slice(cut + 1)];

const uncited = refs.filter((r) => r.key && !cited.has(r.key)).map((r) => r.key);
if (uncited.length) console.warn("Uncited references:", uncited.join(", "));
const counts = refs.filter((r) => r.key).reduce((a, r) => ((a[r.s] = (a[r.s] || 0) + 1), a), {});
console.log("References:", refs.filter((r) => r.key).length, counts);

const headerPara = new D.Paragraph({
  alignment: D.AlignmentType.RIGHT,
  border: { bottom: { style: D.BorderStyle.SINGLE, size: 4, color: COLOR.line, space: 4 } },
  children: [new D.TextRun({ text: "PARAMPARA  ·  Final Solution Document v5  ·  SIH 2026 PS 26214", font: FONT, size: 15, color: COLOR.grey })],
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
  title: "PARAMPARA: Final Solution Document",
  description: "Final solution document v5 (exact equipment, real-data test) for SIH 2026 PS 26214",
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
