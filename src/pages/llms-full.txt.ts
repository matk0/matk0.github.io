import type { APIRoute } from 'astro';
import { t, CONTACT_EMAIL, CONTACT_HREF, DOMAINS, type Lang } from '../i18n';
import { cv } from '../data/cv';

function render(lang: Lang): string {
  const s = t(lang);
  const resume = cv[lang];
  const domain = DOMAINS[lang];
  const projectsPath = lang === 'sk' ? '/projekty' : '/projects';

  const sections: string[] = [];

  sections.push(`# ${s.about.bioName} — ${s.about.bioTitle}`);
  sections.push('');
  sections.push(`> ${s.footer.description}`);
  sections.push('');
  sections.push(`Site: ${domain}`);
  sections.push(`Contact: [${CONTACT_EMAIL}](${CONTACT_HREF})`);
  sections.push(`Location: ${resume.location}`);
  sections.push('');

  sections.push('---');
  sections.push('');
  sections.push(`# ${lang === 'sk' ? 'Domovská stránka' : 'Home'} (${domain}/)`);
  sections.push('');
  sections.push(`## ${s.home.heroTitle}`);
  sections.push('');
  sections.push(s.home.heroDescription);
  sections.push('');

  sections.push(`## ${s.home.ctaBandTitle}`);
  sections.push(s.home.ctaBandDescription);
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

  sections.push('---');
  sections.push('');
  sections.push(`# ${s.projects.heroTitle} (${domain}${projectsPath})`);
  sections.push('');
  sections.push(s.projects.heroDescription);
  sections.push('');
  for (const project of s.projects.items) {
    sections.push(`## ${project.title}`);
    sections.push(`*${project.eyebrow} — ${project.status}*`);
    sections.push('');
    sections.push(project.description);
    sections.push('');
    sections.push(`${s.projects.ownershipLabel}: ${project.ownership}`);
    sections.push('');
  }

  sections.push('---');
  sections.push('');
  sections.push(`# CV (${domain}/cv)`);
  sections.push('');
  sections.push(`## ${resume.name}`);
  sections.push(resume.headline);
  sections.push('');
  sections.push(`## ${resume.profileHeading}`);
  sections.push(resume.profile.join('\n\n'));
  sections.push('');
  sections.push(`## ${resume.experienceHeading}`);
  for (const entry of resume.entries) {
    sections.push(`### ${entry.role} — ${entry.organization}`);
    sections.push(`${entry.period} | ${entry.location}`);
    sections.push('');
    sections.push(entry.summary);
    for (const highlight of entry.highlights) sections.push(`- ${highlight}`);
    sections.push('');
  }

  sections.push('---');
  sections.push('');
  sections.push(`# ${lang === 'sk' ? 'Emailový kontakt' : 'Email contact'}`);
  sections.push('');
  sections.push(`[${CONTACT_EMAIL}](${CONTACT_HREF})`);
  sections.push('');

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
