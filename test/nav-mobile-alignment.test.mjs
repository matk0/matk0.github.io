import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const nav = readFileSync(new URL('../src/components/Nav.astro', import.meta.url), 'utf8');

test('top navigation uses the approved pixel-art portrait logo', () => {
  assert.match(nav, /href="\/"/);
  assert.match(nav, /src="\/images\/matej-pixel-logo\.png"/);
  assert.match(nav, /alt="Matej Lukášik"/);
});

test('desktop navigation keeps the link group centered independently of side content', () => {
  assert.match(
    nav,
    /class="[^"]*\bmd:grid\b[^"]*md:grid-cols-\[1fr_auto_1fr\][^"]*"/,
    'expected a balanced three-column desktop navigation shell',
  );
  assert.match(nav, /class="[^"]*\bmd:justify-self-start\b[^"]*" aria-label="Matej Lukášik"/);
  assert.match(nav, /class="[^"]*\bhidden\b[^"]*\bmd:flex\b[^"]*\bmd:justify-self-center\b[^"]*"/);
  assert.match(nav, /class="[^"]*\bflex\b[^"]*\bitems-center\b[^"]*\bmd:justify-self-end\b[^"]*"/);
});

test('mobile navigation retains an accessible hamburger without a language picker', () => {
  assert.match(nav, /id="mobile-menu-btn"/);
  assert.match(nav, /aria-controls="mobile-menu"/);
  assert.doesNotMatch(nav, /altLang|language picker/i);
});
