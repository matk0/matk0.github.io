import { PDFDocument, StandardFonts, rgb, type PDFFont } from 'pdf-lib';
import type { CVContent } from '../data/cv';

// Text-based, single-column A4 export: readable on paper and by CV parsers.
export async function createCVPdf(content: CVContent): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`${content.name} — CV`);
  pdf.setAuthor(content.name);
  pdf.setSubject(content.headline);
  pdf.setLanguage('en');
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const width = 595.28, height = 841.89, margin = 40;
  const ink = rgb(0.15, 0.14, 0.18), purple = rgb(0.34, 0.24, 0.65);
  let page = pdf.addPage([width, height]);
  let y = height - margin;

  function wrap(text: string, font: PDFFont, size: number, available = width - margin * 2) {
    const lines: string[] = [];
    let line = '';
    for (const word of text.split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if (line && font.widthOfTextAtSize(next, size) > available) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    if (line) lines.push(line);
    return lines;
  }

  function ensureSpace(space: number) {
    if (y - space >= margin + 16) return;
    page = pdf.addPage([width, height]);
    page.drawText(`${content.name} | ${content.headline}`, {
      x: margin, y: height - margin, font: regular, size: 9, color: ink,
    });
    y = height - margin - 28;
  }

  function text(value: string, options: { size?: number; strong?: boolean; indent?: number; accent?: boolean; gap?: number } = {}) {
    const { size = 10, strong = false, indent = 0, accent = false, gap = 6 } = options;
    const font = strong ? bold : regular;
    for (const line of wrap(value, font, size, width - margin * 2 - indent)) {
      ensureSpace(size * 1.3);
      y -= size;
      page.drawText(line, { x: margin + indent, y, size, font, color: accent ? purple : ink });
      y -= size * 0.3;
    }
    y -= gap;
  }

  function heading(value: string, followingSpace = 45) {
    ensureSpace(30 + followingSpace);
    y -= 7;
    page.drawLine({ start: { x: margin, y }, end: { x: width - margin, y }, color: rgb(0.84, 0.82, 0.88), thickness: 0.5 });
    y -= 10;
    text(value, { size: 12, strong: true, accent: true, gap: 9 });
  }

  text(content.name, { size: 24, strong: true, gap: 4 });
  text(content.headline, { size: 13, accent: true, gap: 8 });
  text(`${content.location} | ${content.email} | ${content.phone}`, { size: 9, gap: 3 });
  text('matejlukasik.com | linkedin.com/in/matej-lukasik | github.com/matk0', { size: 9, gap: 7 });
  heading(content.profileHeading);
  for (const paragraph of content.profile) text(paragraph);

  const entryHeight = (entry: CVContent['entries'][number]) =>
    38 + (entry.summary ? wrap(entry.summary, regular, 10).length * 13 + 6 : 0)
    + entry.highlights.reduce((sum, bullet) => sum + wrap(bullet, regular, 10, width - margin * 2 - 12).length * 13 + 4, 0);
  heading(content.experienceHeading, entryHeight(content.entries[0]));
  for (const entry of content.entries) {
    ensureSpace(Math.min(entryHeight(entry), height - margin * 2 - 50));
    text(`${entry.role} — ${entry.organization}`, { size: 11, strong: true, gap: 3 });
    text([entry.period, entry.location].filter(Boolean).join(' | '), { size: 9, accent: true, gap: 7 });
    if (entry.summary) text(entry.summary);
    for (const bullet of entry.highlights) {
      ensureSpace(13);
      page.drawText('•', { x: margin + 1, y: y - 10, font: regular, size: 10, color: purple });
      text(bullet, { indent: 12, gap: 4 });
    }
    y -= 6;
  }
  const pages = pdf.getPages();
  pages.forEach((sheet, index) => {
    sheet.drawText('matejlukasik.com', { x: margin, y: 27, size: 8, font: regular, color: ink });
    const number = `${index + 1} / ${pages.length}`;
    sheet.drawText(number, { x: width - margin - regular.widthOfTextAtSize(number, 8), y: 27, size: 8, font: regular, color: ink });
  });
  return pdf.save();
}
