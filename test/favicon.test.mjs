import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');

test('layout uses the pixel portrait favicon', () => {
  assert.match(layout, /href="\/favicon-pixel-32\.png"/);
  assert.match(layout, /href="\/apple-touch-pixel\.png"/);
});

test('favicon SVG uses the mlx mark in Clash Grotesk styling', () => {
  const faviconPath = new URL('../public/favicon.svg', import.meta.url);

  assert.ok(existsSync(faviconPath), 'expected public/favicon.svg');

  const svg = readFileSync(faviconPath, 'utf8');
  assert.match(svg, /Clash Grotesk/);
  assert.match(svg, /#1B1340/);
  assert.match(svg, /#9F8CFF/);
  assert.match(svg, /data:image\/png;base64/);
  assert.match(svg, /exponential-x/);
});

test('fallback favicon PNGs are real PNGs at expected sizes', async () => {
  const expectedSizes = new Map([
    ['../public/favicon-pixel-512.png', 512],
    ['../public/favicon-pixel-48.png', 48],
    ['../public/favicon-pixel-32.png', 32],
    ['../public/favicon-pixel-16.png', 16],
    ['../public/apple-touch-pixel.png', 180],
  ]);

  for (const [path, size] of expectedSizes) {
    const metadata = await sharp(fileURLToPath(new URL(path, import.meta.url))).metadata();

    assert.equal(metadata.format, 'png', `${path} should be a PNG`);
    assert.equal(metadata.width, size, `${path} width`);
    assert.equal(metadata.height, size, `${path} height`);
  }
});
