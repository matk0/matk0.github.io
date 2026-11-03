import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { transformSync } from 'esbuild';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const source = read('../src/i18n/index.ts')
  .replace("import en from './en.json';", 'const en = {};')
  .replace("import sk from './sk.json';", 'const sk = {};');
const { code } = transformSync(source, { format: 'esm', loader: 'ts' });
const moduleUrl = 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
const { CONTACT_EMAIL, CONTACT_HREF, getLocalizedPaths } = await import(moduleUrl);

test('contact invitations use one direct email destination', () => {
  assert.equal(CONTACT_EMAIL, 'matej@matejlukasik.com');
  assert.equal(CONTACT_HREF, 'mailto:matej@matejlukasik.com');
  for (const lang of ['en']) {
    assert.equal('contact' in getLocalizedPaths(lang), false);
  }

  for (const path of [
    '../src/components/Nav.astro',
    '../src/components/Footer.astro',
    '../src/pages/projects.astro',
  ]) {
    const page = read(path);
    assert.match(page, /href=\{CONTACT_HREF\}/, path + ' must offer direct email');
    assert.doesNotMatch(page, /paths\.contact|focus=contact-form|focus=calendar|bookingHref/);
  }
});

test('retired form, email backend and focus effects are removed', () => {
  for (const path of [
    '../src/components/ContactForm.astro',
    '../src/pages/api/contact.ts',
    '../src/components/CalEmbed.astro',
    '../src/components/FirstStepOffer.astro',
  ]) {
    assert.equal(existsSync(new URL(path, import.meta.url)), false, path + ' must be removed');
  }

  assert.doesNotMatch(read('../src/styles/global.css'), /contact-form-flash|contactFormFlash|booking-calendar-flash/);
});
