import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const index = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
const llms = readFileSync(new URL('../src/pages/llms.txt.ts', import.meta.url), 'utf8');
const llmsFull = readFileSync(new URL('../src/pages/llms-full.txt.ts', import.meta.url), 'utf8');

test('homepage is a minimal bilingual advisory presentation', () => {
  assert.match(index, /minimal/);
  assert.match(index, /src="\/images\/matej-lukasik-profile\.jpg"/);
  assert.match(index, /mailto:matej@matejlukasik\.com/);
  assert.doesNotMatch(index, /mailto:matej@post\.work/);
  assert.match(index, /https:\/\/x\.com\/matejlukasik/);
  assert.match(index, /https:\/\/www\.linkedin\.com\/in\/matej-lukasik/);
  assert.doesNotMatch(index, /https:\/\/github\.com\/matk0/);
});

test('profile link row contains only direct contact channels', () => {
  assert.doesNotMatch(index, /POST_WORK_URL|linkText:|paragraph\.href|paragraph\.before|paragraph\.after/);
  assert.doesNotMatch(index, /\{ label: 'post\.work'/);
  assert.doesNotMatch(index, /\{ label: 'GitHub'/);
});

test('profile links render as accessible social icons', () => {
  assert.match(index, /icon: 'email'/);
  assert.match(index, /icon: 'x'/);
  assert.match(index, /icon: 'linkedin'/);
  assert.match(index, /aria-label=\{link\.label\}/);
  assert.match(index, /<svg/);
  assert.match(index, /<span class="sr-only">\{link\.label\}<\/span>/);
});

test('english homepage shows only the advisory positioning', () => {
  assert.match(
    index,
    /greeting:\s*'Strategic Advisor to Founder-Led Digital Businesses'/,
  );
  assert.doesNotMatch(index, /Former CTO and product builder/);
  assert.match(
    index,
    /description:\s*\n\s*'Matej Lukášik helps founders resolve consequential decisions across business model, brand, product, and technology\.'/,
  );
  assert.doesNotMatch(
    index,
    /Hi,|AUTHENTIC CREATION|clear the machinery of e-commerce|material abundance/,
  );
});

test('english homepage presents the full strategic advisory narrative', () => {
  assert.match(index, /For founders building businesses around work they genuinely believe in\./);
  assert.match(index, /I help founders turn competing truths into one clear strategic decision\./);
  assert.match(index, /Authenticity/);
  assert.match(index, /Commercial viability/);
  assert.match(index, /Self-expression/);
  assert.match(index, /Customer reality/);
  assert.match(index, /Aesthetics/);
  assert.match(index, /Conversion/);
  assert.match(index, /Meaning/);
  assert.match(index, /Money/);
  assert.match(index, /Intuition/);
  assert.match(index, /Evidence/);
  assert.match(index, /Vision/);
  assert.match(index, /Implementation/);
  assert.match(index, /See the whole\. Find the constraint\. Decide what changes\./);
  assert.match(index, /Strategic Consultation/);
  assert.match(index, /Strategic Diagnosis/);
  assert.match(index, /Co-CEO Month/);
  assert.match(index, /Two calendar weeks/);
  assert.match(index, /Bring me the problem that does not fit one box\./);
});

test('slovak homepage shows only the advisory positioning', () => {
  assert.match(index, /greeting:\s*'Strategic Advisor to Founder-Led Digital Businesses'/);
  assert.match(
    index,
    /greeting:\s*'Strategický poradca'/,
  );
  assert.doesNotMatch(index, /Bývalý CTO a tvorca produktov/);
  assert.match(
    index,
    /description:\s*\n\s*'Matej Lukášik pomáha zakladateľom riešiť dôležité rozhodnutia naprieč biznis modelom, značkou, produktom a technológiou\.'/,
  );
  assert.match(index, /<h1 class="text-4xl font-bold text-heading sm:text-5xl">\{copy\.profile\.greeting\}<\/h1>/);
  assert.doesNotMatch(
    index,
    /Ahoj,|AUTENTICKÚ TVORBU|komplexitu e-commerce|materiálnu hojnosť/,
  );
});

test('homepage hero omits the former CTO tagline component', () => {
  assert.doesNotMatch(index, /profile\.paragraphs\.map/);
  assert.doesNotMatch(index, /Former CTO and product builder/);
  assert.doesNotMatch(index, /Bývalý CTO a tvorca produktov/);
});

test('homepage removes the old marketing funnel while linking the paid consultation', () => {
  assert.doesNotMatch(index, /<Hero/);
  assert.doesNotMatch(index, /<Service/);
  assert.doesNotMatch(index, /<FAQ/);
  assert.doesNotMatch(index, /<CTABand/);
  assert.match(index, /const bookingHref = `\$\{paths\.contact\}\?focus=calendar`;/);
  assert.match(index, /consultation: bookingHref/);
  assert.doesNotMatch(index, /data-analytics-event="booking_intent_clicked"/);
});

test('homepage has a compact domain language selector', () => {
  assert.match(index, /aria-label="Language"/);
  assert.match(index, /href=\{DOMAINS\.en\}/);
  assert.match(index, /href=\{DOMAINS\.sk\}/);
  assert.match(index, />\s*EN\s*</);
  assert.match(index, />\s*SK\s*</);
  assert.match(index, /mb-8 flex justify-end/);
  assert.doesNotMatch(index, /absolute right-5 top-5/);
  assert.doesNotMatch(index, /\?lang=/);
});

test('minimal layout mode removes navigation, footer, cookie, and analytics chrome', () => {
  assert.match(layout, /minimal/);
  assert.match(layout, /!minimal && <Nav/);
  assert.match(layout, /!minimal && <Footer/);
  assert.match(layout, /!minimal && <CookieNotice/);
  assert.match(layout, /!minimal && <Analytics/);
});

test('metadata and machine-readable pages use the strategic advisory positioning', () => {
  assert.match(layout, /Strategic Advisor to Founder-Led Digital Businesses/);
  assert.doesNotMatch(layout, /Technical, UX, and SEO work for founder-led e-shops/);
  assert.match(llms, /Strategic Advisor to Founder-Led Digital Businesses/);
  assert.match(llmsFull, /Strategic Advisor to Founder-Led Digital Businesses/);
  assert.doesNotMatch(llms, /AI Agent Consulting|CEO orchestrator/);
  assert.doesNotMatch(llmsFull, /AI Solution Implementation|Agent Threat Atlas/);
});

test('profile portrait asset exists in public images', () => {
  assert.ok(existsSync(new URL('../public/images/matej-lukasik-profile.jpg', import.meta.url)));
});
