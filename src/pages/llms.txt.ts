import type { APIRoute } from 'astro';
import type { Lang } from '../i18n';

const EN = `# Matej Lukášik — Strategic Advisor to Founder-Led Digital Businesses

> For founders building businesses around work they genuinely believe in.

Matej helps founders find the real constraint, make a consequential decision, and turn it into one coherent direction across business model, brand, product, and technology.

## Ways to work together

### Strategic Consultation — €300

Two hours for one clearly framed business decision. Includes a short intake, a private working session, and a concise written recap of the decision, open questions, and next steps.

### Strategic Diagnosis — €4,000

Two calendar weeks for a consequential but unclear business situation. The outcome is the actual constraint, the decision it requires, rejected alternatives and what not to do, a 90-day priority map, and an initiative brief ready for the team.

### Co-CEO Month — €10,000

Four weeks of embedded strategic partnership for one founder and one consequential initiative. Includes up to four hours of reserved capacity each business day, participation in relevant meetings, a live decision and assumption log, weekly priorities, aligned briefs and reviews, and an end-of-month outcome review with a 60-day plan.

The founder retains executive authority and final decisions. Specialists remain accountable for the quality of their domain work.

## Contact

- Email: matej@post.work
- LinkedIn: https://www.linkedin.com/in/matej-lukasik
- X: https://x.com/matejlukasik
- Slovak site: https://matejlukasik.sk/
`;

const SK = `# Matej Lukášik — Strategický poradca pre zakladateľov digitálnych firiem

> Pre zakladateľov, ktorí budujú firmu okolo práce, ktorej skutočne veria.

Matej pomáha zakladateľom nájsť skutočné obmedzenie, urobiť dôležité rozhodnutie a premeniť ho na jeden súdržný smer naprieč biznis modelom, značkou, produktom a technológiou.

## Možnosti spolupráce

### Strategická konzultácia — 300 €

Dve hodiny pre jedno jasne ohraničené biznisové rozhodnutie. Zahŕňa krátky vstupný dotazník, súkromnú pracovnú konzultáciu a stručné písomné zhrnutie rozhodnutia, otvorených otázok a ďalších krokov.

### Strategická diagnóza — 4 000 €

Dva kalendárne týždne pre dôležitú, no nejasnú biznisovú situáciu. Výstupom je skutočné obmedzenie, rozhodnutie, ktoré si vyžaduje, zamietnuté alternatívy a čo nerobiť, priority na 90 dní a zadanie iniciatívy pripravené pre tím.

### Co-CEO na mesiac — 10 000 €

Štyri týždne strategického partnerstva pre jedného zakladateľa a jednu kľúčovú iniciatívu. Zahŕňa až štyri hodiny vyhradenej kapacity každý pracovný deň, účasť na relevantných stretnutiach, živý záznam rozhodnutí a predpokladov, týždenné priority, zosúladené zadania a kontroly práce a záverečné vyhodnotenie s plánom na ďalších 60 dní.

Zakladateľ si ponecháva výkonnú právomoc a konečné rozhodnutia. Špecialisti zostávajú zodpovední za kvalitu práce vo svojej disciplíne.

## Kontakt

- Email: matej@post.work
- LinkedIn: https://www.linkedin.com/in/matej-lukasik
- X: https://x.com/matejlukasik
- English site: https://matejlukasik.com/
`;

export const GET: APIRoute = ({ locals }) => {
  const lang = ((locals as any).lang as Lang) || 'en';
  return new Response(lang === 'sk' ? SK : EN, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
