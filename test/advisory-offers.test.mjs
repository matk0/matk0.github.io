import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const llms = readFileSync(new URL('../src/pages/llms.txt.ts', import.meta.url), 'utf8');
const llmsFull = readFileSync(new URL('../src/pages/llms-full.txt.ts', import.meta.url), 'utf8');
const publicAdvisoryCopy = `${index}\n${llms}\n${llmsFull}`;

test('the public site sells the three-offer advisory ladder in English and Slovak', () => {
  assert.match(index, /Strategic Consultation/);
  assert.match(index, /Strategická konzultácia/);
  assert.match(index, /€300/);
  assert.match(index, /300 €/);
  assert.match(index, /Strategic Diagnosis/);
  assert.match(index, /Strategická diagnóza/);
  assert.match(index, /€4,000/);
  assert.match(index, /4 000 €/);
  assert.match(index, /Co-CEO Month/);
  assert.match(index, /Co-CEO na mesiac/);
  assert.match(index, /€10,000/);
  assert.match(index, /10 000 €/);
  assert.match(index, /four hours of reserved capacity each business day/);
  assert.match(index, /štyri hodiny vyhradenej kapacity každý pracovný deň/);
  assert.match(index, /relevant meetings/);
  assert.match(index, /relevantných stretnutiach/);
  assert.doesNotMatch(publicAdvisoryCopy, /former CTO|Former CTO|bývalý CTO|Bývalý CTO/);
});
