import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

test('layout uses the ml SVG favicon', () => {
  assert.match(layout, /<link rel="icon" type="image\/svg\+xml" href="\/favicon\.svg" \/>/);
});

test('favicon SVG uses ml initials in the logo font', () => {
  const faviconPath = new URL('../public/favicon.svg', import.meta.url);

  assert.ok(existsSync(faviconPath), 'expected public/favicon.svg');

  const svg = readFileSync(faviconPath, 'utf8');
  assert.match(svg, /Space Grotesk/);
  assert.match(svg, /fill="#1B1340"/);
  assert.match(svg, />ml</);
});

test('fallback favicon PNGs are real PNGs at expected sizes', async () => {
  const expectedSizes = new Map([
    ['../public/favicon.png', 512],
    ['../public/favicon-32x32.png', 32],
    ['../public/favicon-16x16.png', 16],
    ['../public/apple-touch-icon.png', 180],
  ]);

  for (const [path, size] of expectedSizes) {
    const metadata = await sharp(fileURLToPath(new URL(path, import.meta.url))).metadata();

    assert.equal(metadata.format, 'png', `${path} should be a PNG`);
    assert.equal(metadata.width, size, `${path} width`);
    assert.equal(metadata.height, size, `${path} height`);
  }
});
