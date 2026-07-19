import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const nav = readFileSync(new URL('../src/components/Nav.astro', import.meta.url), 'utf8');

test('top navigation uses the mlx logotype asset', () => {
  assert.match(nav, /href="\/"/);
  assert.match(nav, /src="\/logo\.svg"/);
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

test('mobile language picker is grouped with the hamburger menu', () => {
  const actionGroup = /<div class="[^"]*\bflex\b[^"]*\bitems-center\b[^"]*\bgap-3\b[^"]*">/.exec(nav);

  assert.ok(actionGroup, 'expected a right-side action group');

  const actionGroupStart = actionGroup.index;
  const actionGroupEnd = nav.indexOf('</div>', actionGroupStart);
  const languagePicker = nav.indexOf('{altLang.toUpperCase()}', actionGroupStart);
  const hamburgerButton = nav.indexOf('id="mobile-menu-btn"', actionGroupStart);

  assert.ok(languagePicker > actionGroupStart, 'expected the language picker in the action group');
  assert.ok(
    hamburgerButton > languagePicker && hamburgerButton < actionGroupEnd,
    'expected the hamburger menu button in the same action group as the language picker',
  );
});
