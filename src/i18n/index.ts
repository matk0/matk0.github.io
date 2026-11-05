import en from './en.json';
export const languages = { en } as const;
export type Lang = 'en';
export const CONTACT_EMAIL = 'matej@matejlukasik.com';
export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;
export function t(_lang: Lang) { return en; }
export const DOMAINS = { en: 'https://matejlukasik.com' } as const;
export const POSTWORK_URL = 'https://post.work/';
export function isProductionHost(hostname: string): boolean { return ['matejlukasik.com','matejlukasik.sk'].includes(hostname.replace(/^www\./, '')); }
export function getSiteOrigin(_lang: Lang, currentUrl?: URL): string { return currentUrl && !isProductionHost(currentUrl.hostname) ? currentUrl.origin : DOMAINS.en; }
export function getLocalizedPaths(_lang: Lang) { return { about: '/#about', cv: '/cv', projects: '/projects', privacy: '/privacy' }; }
