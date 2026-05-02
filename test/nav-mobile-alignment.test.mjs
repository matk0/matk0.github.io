import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const nav = readFileSync(new URL('../src/components/Nav.astro', import.meta.url), 'utf8');

test('mobile language picker is grouped with the hamburger menu', () => {
  const actionGroup = /<div class="[^"]*\bflex\b[^"]*\bitems-center\b[^"]*\bgap-3\b[^"]*">/.exec(nav);

  assert.ok(actionGroup, 'expected a right-side action group');

  const actionGroupStart = actionGroup.index;
  const actionGroupEnd = nav.indexOf('</div>', actionGroupStart);
  const languagePicker = nav.indexOf('{altLang.toUpperCase()}', actionGroupStart);
  const hamburgerButton = nav.indexOf('<button id="mobile-menu-btn"', actionGroupStart);

  assert.ok(languagePicker > actionGroupStart, 'expected the language picker in the action group');
  assert.ok(
    hamburgerButton > languagePicker && hamburgerButton < actionGroupEnd,
    'expected the hamburger menu button in the same action group as the language picker',
  );
});
