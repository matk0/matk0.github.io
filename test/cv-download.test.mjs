import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildSync } from 'esbuild';
import { PDFDocument } from 'pdf-lib';
import { readFileSync } from 'node:fs';

const { outputFiles } = buildSync({
  entryPoints: [new URL('../src/pages/cv.pdf.ts', import.meta.url).pathname],
  bundle: true, format: 'esm', platform: 'node', write: false,
});
const endpoint = await import(`data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`);

test('CV download returns a readable A4 PDF with the correct filename and identity', async () => {
  const response = await endpoint.GET();
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'application/pdf');
  assert.match(response.headers.get('Content-Disposition'), /attachment; filename="Matej-Lukasik-CV.pdf"/);
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.equal(new TextDecoder().decode(bytes.slice(0, 5)), '%PDF-');
  const pdf = await PDFDocument.load(bytes);
  assert.equal(pdf.getAuthor(), 'Ing. Matej Lukášik');
  assert.equal(pdf.getSubject(), 'Senior Product Engineer');
  assert.ok(pdf.getPageCount() >= 1 && pdf.getPageCount() <= 3);
  for (const page of pdf.getPages()) {
    assert.ok(Math.abs(page.getWidth() - 595.28) < 0.1);
    assert.ok(Math.abs(page.getHeight() - 841.89) < 0.1);
  }
});

test('CV page provides a direct download without requiring JavaScript', () => {
  const source = readFileSync(new URL('../src/pages/cv.astro', import.meta.url), 'utf8');
  assert.match(source, /href="\/cv\.pdf" download="Matej-Lukasik-CV\.pdf"/);
  assert.match(source, /Download CV as PDF/);
});
