import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const llms = read('../src/pages/llms.txt.ts');
const en = JSON.parse(read('../src/i18n/en.json'));

test('public copy no longer advertises a booked consultation', () => {
  const publicCopy = JSON.stringify({ en }) + '\n' + llms;
  assert.doesNotMatch(publicCopy, /cal\.com|book a|30-minute|30-minút|free.consultation|bezplatn.*konzultáci|booking/iu);
  assert.equal(en.home.processSteps.length, 3);

  for (const copy of [en]) {
    assert.deepEqual(copy.home.processSteps.map(({ label }) => label), ['01', '02', '03']);
  }
});
