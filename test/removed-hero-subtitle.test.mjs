import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { test } from 'node:test';

const srcDir = fileURLToPath(new URL('../src', import.meta.url));
const removedPhrases = [
  'Deployed in days, not months.',
  'Nasadeni za dni, nie mesiace.',
];

function filesUnder(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);

    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });
}

test('removed hero subtitles are not shipped in source content', () => {
  const sourceFiles = filesUnder(srcDir);

  for (const file of sourceFiles) {
    const content = readFileSync(file, 'utf8');

    for (const phrase of removedPhrases) {
      assert.ok(!content.includes(phrase), `${phrase} remains in ${file}`);
    }
  }
});
