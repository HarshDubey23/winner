// Small helpers on top of docx-js so the content file reads like a document.
const fs = require("fs");
const D = require("docx");
const refs = require(process.env.PARAMPARA_REFS || "./refs");

const W = 9026; // A4 width (11906) minus two 1-inch margins, in DXA
const COLOR = { maroon: "7A1F1F", blue: "1F4E79", gold: "B8901A", ink: "222222", grey: "5E5E5E",
  cream: "FBF6EC", zebra: "F7F3EC", line: "D9CFC0", cite: "1F4E79", green: "2E6B3A", red: "9B2C2C" };
const FONT = "Arial";

// ---- citations -------------------------------------------------------------
const keyNum = {};
let counter = 0;
for (const r of refs) if (r.key) { counter += 1; keyNum[r.key] = counter; r.n = counter; }
const cited = new Set();
function resolveCites(str) {
  return str.replace(/\[@([^\]]+)\]/g, (_, inner) => {
    const nums = inner.split(";").map((k) => k.trim().replace(/^@/, "")).map((k) => {
      if (!keyNum[k]) throw new Error("Unknown reference key: " + k);
      cited.add(k);
      return keyNum[k];
    }).sort((a, b) => a - b);
    return "\u0001[" + nums.join(", ") + "]\u0001";
  });
}

// ---- inline markup: **bold**, *italic*, `code`, [@cite] ---------------------
function runs(text, base = {}) {
  const s = resolveCites(String(text));
  const parts = s.split(/(\u0001\[[^\u0001]*\]\u0001|\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`)/g).filter((x) => x !== "");
  const size = base.size || 20;
  return parts.map((p) => {
    const o = { text: p, font: FONT, size, color: base.color || COLOR.ink, bold: base.bold, italics: base.italics };
    if (p.startsWith("\u0001")) { o.text = p.slice(1, -1); o.color = COLOR.cite; o.bold = false; }
    else if (p.startsWith("**")) { o.text = p.slice(2, -2); o.bold = true; }
    else if (p.startsWith("`")) { o.text = p.slice(1, -1); o.font = "Courier New"; o.size = size - 2; }
    else if (p.startsWith("*") && p.endsWith("*") && p.length > 2) { o.text = p.slice(1, -1); o.italics = true; }
    return new D.TextRun(o);
  });
}

function P(text, o = {}) {
  return new D.Paragraph({
    children: runs(text, o),
    alignment: o.align || D.AlignmentType.LEFT,
    spacing: { before: o.before || 0, after: o.after === undefined ? 120 : o.after, line: o.line || 276 },
    keepNext: o.keepNext,
    indent: o.indent ? { left: o.indent } : undefined,
  });
}

function H1(text, pageBreak = false) {
  return new D.Paragraph({ heading: D.HeadingLevel.HEADING_1, pageBreakBefore: pageBreak, keepNext: true,
    spacing: { before: pageBreak ? 0 : 480, after: 200 }, children: [new D.TextRun({ text, font: FONT })] });
}
function H2(text) { return new D.Paragraph({ heading: D.HeadingLevel.HEADING_2, keepNext: true, children: [new D.TextRun({ text, font: FONT })] }); }
function H3(text) { return new D.Paragraph({ heading: D.HeadingLevel.HEADING_3, keepNext: true, children: [new D.TextRun({ text, font: FONT })] }); }

// ---- lists -------------------------------------------------------------------
let listInstance = 0;
function BL(items, level = 0) {
  const out = [];
  for (const it of items) {
    if (Array.isArray(it)) { out.push(...BL(it, level + 1)); continue; }
    out.push(new D.Paragraph({ children: runs(it), numbering: { reference: "bul", level }, spacing: { after: 60, line: 268 } }));
  }
  return out;
}
function NL(items) {
  listInstance += 1;
  const inst = listInstance;
  return items.map((it) => new D.Paragraph({ children: runs(it), numbering: { reference: "num", level: 0, instance: inst }, spacing: { after: 60, line: 268 } }));
}

// ---- tables ------------------------------------------------------------------
const border = { style: D.BorderStyle.SINGLE, size: 4, color: COLOR.line };
const borders = { top: border, bottom: border, left: border, right: border };

function cellParas(text, o) {
  return String(text).split("\n").map((line) => new D.Paragraph({
    children: runs(line, { size: o.size, bold: o.bold, color: o.color }),
    spacing: { after: 30, line: 250 }, alignment: o.align,
  }));
}

function T(widths, head, rows, o = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  const cols = widths.map((w) => Math.round((w / total) * W));
  cols[cols.length - 1] += W - cols.reduce((a, b) => a + b, 0);
  const size = o.size || 17;
  const mk = (txt, i, isHead, r) => new D.TableCell({
    width: { size: cols[i], type: D.WidthType.DXA },
    borders,
    shading: isHead ? { fill: o.headFill || COLOR.maroon, type: D.ShadingType.CLEAR, color: "auto" }
      : (o.highlightLast && r === rows.length - 1) ? { fill: "EAF1F8", type: D.ShadingType.CLEAR, color: "auto" }
      : (r % 2 === 1 ? { fill: COLOR.zebra, type: D.ShadingType.CLEAR, color: "auto" } : undefined),
    margins: { top: 60, bottom: 60, left: 90, right: 90 },
    verticalAlign: D.VerticalAlign.TOP,
    children: cellParas(txt, { size, bold: isHead || (o.boldFirstCol && i === 0), color: isHead ? "FFFFFF" : COLOR.ink }),
  });
  const trs = [];
  if (head) trs.push(new D.TableRow({ tableHeader: true, cantSplit: true, children: head.map((h, i) => mk(h, i, true, -1)) }));
  rows.forEach((r, ri) => trs.push(new D.TableRow({ cantSplit: o.cantSplit !== false, children: r.map((c, i) => mk(c, i, false, ri)) })));
  return [new D.Table({ width: { size: W, type: D.WidthType.DXA }, columnWidths: cols, rows: trs }), spacer(80)];
}

function Box(title, lines, color = COLOR.maroon, fill = COLOR.cream, keep = false) {
  const kids = [];
  if (title) kids.push(new D.Paragraph({ children: runs(title, { bold: true, color, size: 21 }), spacing: { after: 80 } }));
  for (const l of lines) {
    if (Array.isArray(l)) kids.push(...l.map((x) => new D.Paragraph({ children: runs(x, { size: 19 }), numbering: { reference: "bul", level: 0 }, spacing: { after: 50, line: 262 } })));
    else kids.push(new D.Paragraph({ children: runs(l, { size: 19 }), spacing: { after: 70, line: 266 } }));
  }
  const thick = { style: D.BorderStyle.SINGLE, size: 24, color };
  const thin = { style: D.BorderStyle.SINGLE, size: 4, color: COLOR.line };
  return [new D.Table({
    width: { size: W, type: D.WidthType.DXA }, columnWidths: [W],
    rows: [new D.TableRow({ cantSplit: keep, children: [new D.TableCell({
      width: { size: W, type: D.WidthType.DXA }, borders: { left: thick, top: thin, bottom: thin, right: thin },
      shading: { fill, type: D.ShadingType.CLEAR, color: "auto" }, margins: { top: 120, bottom: 100, left: 200, right: 160 },
      children: kids })] })],
  }), spacer(100)];
}

function Code(lines) {
  return lines.map((l, i) => new D.Paragraph({
    children: [new D.TextRun({ text: l === "" ? " " : l, font: "Courier New", size: 16, color: COLOR.ink })],
    shading: { fill: "F2F2F2", type: D.ShadingType.CLEAR, color: "auto" },
    spacing: { after: i === lines.length - 1 ? 140 : 0, line: 240 },
    indent: { left: 120, right: 120 },
  }));
}

function Fig(file, wpx, hpx, caption) {
  return [
    new D.Paragraph({ alignment: D.AlignmentType.CENTER, spacing: { before: 60, after: 60 }, keepNext: true,
      children: [new D.ImageRun({ type: "png", data: fs.readFileSync(file), transformation: { width: wpx, height: hpx },
        altText: { title: caption.slice(0, 40), description: caption, name: caption.slice(0, 20) } })] }),
    new D.Paragraph({ alignment: D.AlignmentType.CENTER, spacing: { after: 180 }, children: runs(caption, { size: 17, italics: true, color: COLOR.grey }) }),
  ];
}

function spacer(after = 120) { return new D.Paragraph({ children: [], spacing: { after } }); }
function PB() { return new D.Paragraph({ children: [new D.PageBreak()] }); }

// Replace the reference list (used to renumber after filtering to cited entries).
function setRefs(list) {
  refs.splice(0, refs.length, ...list);
  for (const k of Object.keys(keyNum)) delete keyNum[k];
  counter = 0;
  for (const r of refs) if (r.key) { counter += 1; keyNum[r.key] = counter; r.n = counter; }
  cited.clear();
}

module.exports = { D, W, COLOR, FONT, refs, keyNum, cited, setRefs, runs, P, H1, H2, H3, BL, NL, T, Box, Code, Fig, spacer, PB };
