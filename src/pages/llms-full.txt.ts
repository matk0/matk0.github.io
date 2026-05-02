import type { APIRoute } from 'astro';
import { t, DOMAINS, type Lang } from '../i18n';

function render(lang: Lang): string {
  const s = t(lang);
  const domain = DOMAINS[lang];
  const contactPath = lang === 'sk' ? '/kontakt' : '/contact';

  const sections: string[] = [];

  sections.push(`# ${s.about.bioName} — ${s.about.bioTitle}`);
  sections.push('');
  sections.push(`> ${s.footer.description}`);
  sections.push('');
  sections.push(`Site: ${domain}`);
  sections.push(`Contact: ${s.contact.email}`);
  sections.push(`Location: ${s.contact.location}`);
  sections.push('');

  sections.push('---');
  sections.push('');
  sections.push(`# ${lang === 'sk' ? 'Domovska stranka' : 'Home'} (${domain}/)`);
  sections.push('');
  sections.push(`## ${s.home.heroTitle}`);
  sections.push('');
  sections.push(s.home.heroDescription);
  sections.push('');

  sections.push(`## ${s.home.painTitle}`);
  sections.push('');
  sections.push(`### ${s.home.pain1Title}`);
  sections.push(s.home.pain1Description);
  sections.push('');
  sections.push(`### ${s.home.pain2Title}`);
  sections.push(s.home.pain2Description);
  sections.push('');
  sections.push(`### ${s.home.pain3Title}`);
  sections.push(s.home.pain3Description);
  sections.push('');

  sections.push(`## ${s.home.servicesTitle}`);
  sections.push('');
  sections.push(`### ${s.home.consultingTitle}`);
  sections.push(s.home.consultingDescription);
  sections.push('');
  sections.push(`### ${s.home.implementationTitle}`);
  sections.push(s.home.implementationDescription);
  sections.push('');
  sections.push(`### ${s.home.trainingTitle}`);
  sections.push(s.home.trainingDescription);
  sections.push('');

  sections.push(`## ${s.home.processTitle}`);
  sections.push('');
  for (const step of s.home.processSteps) {
    sections.push(`### ${step.label} — ${step.title}`);
    sections.push(step.description);
    sections.push('');
  }

  sections.push(`## ${s.home.trustTitle}`);
  sections.push(s.home.trustDescription);
  sections.push('');

  sections.push('---');
  sections.push('');
  sections.push(`# ${lang === 'sk' ? 'Sluzby — detail' : 'Services — detail'}`);
  sections.push('');
  sections.push(`## ${s.services.consulting.title}`);
  sections.push(`*${s.services.consulting.subtitle}*`);
  sections.push('');
  sections.push(s.services.consulting.description);
  sections.push('');
  for (const item of s.services.consulting.includes) sections.push(`- ${item}`);
  sections.push('');

  sections.push(`## ${s.services.implementation.title}`);
  sections.push(`*${s.services.implementation.subtitle}*`);
  sections.push('');
  sections.push(s.services.implementation.description);
  sections.push('');
  for (const item of s.services.implementation.includes) sections.push(`- ${item}`);
  sections.push('');

  sections.push(`## ${s.services.training.title}`);
  sections.push(`*${s.services.training.subtitle}*`);
  sections.push('');
  sections.push(s.services.training.description);
  sections.push('');
  for (const item of s.services.training.includes) sections.push(`- ${item}`);
  sections.push('');

  sections.push('---');
  sections.push('');
  sections.push(`# ${lang === 'sk' ? 'O mne' : 'About'}`);
  sections.push('');
  sections.push(`## ${s.about.bioName}`);
  sections.push(`*${s.about.bioTitle}*`);
  sections.push('');
  sections.push(s.about.bioText);
  sections.push('');

  sections.push(`## ${s.about.approachTitle}`);
  sections.push('');
  sections.push(`### ${s.about.principle1Title}`);
  sections.push(s.about.principle1Description);
  sections.push('');
  sections.push(`### ${s.about.principle2Title}`);
  sections.push(s.about.principle2Description);
  sections.push('');
  sections.push(`### ${s.about.principle3Title}`);
  sections.push(s.about.principle3Description);
  sections.push('');

  sections.push(`## ${s.about.techTitle}`);
  sections.push(s.about.techDescription);
  sections.push('');

  sections.push('---');
  sections.push('');
  sections.push(`# ${s.contact.heroTitle} (${domain}${contactPath})`);
  sections.push('');
  sections.push(s.contact.heroDescription);
  sections.push('');
  sections.push(`Email: ${s.contact.email}`);
  sections.push(`${lang === 'sk' ? 'Lokacia' : 'Location'}: ${s.contact.location}`);
  sections.push('');

  sections.push(`## ${s.contact.faqTitle}`);
  sections.push('');
  for (const item of s.contact.faq) {
    sections.push(`### ${item.question}`);
    sections.push(item.answer);
    sections.push('');
  }

  return sections.join('\n');
}

export const GET: APIRoute = ({ locals }) => {
  const lang = ((locals as any).lang as Lang) || 'en';
  return new Response(render(lang), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
