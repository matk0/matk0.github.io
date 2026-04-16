import en from './en.json';
import sk from './sk.json';

export const languages = { en, sk } as const;
export type Lang = keyof typeof languages;

export function t(lang: Lang) {
  return languages[lang];
}

export const DOMAINS: Record<Lang, string> = {
  en: 'https://matejlukasik.com',
  sk: 'https://matejlukasik.sk',
};

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'sk' ? 'en' : 'sk';
}

const PATH_MAP: Record<string, Record<Lang, string>> = {
  '/': { en: '/', sk: '/' },
  '/services': { en: '/', sk: '/' },
  '/sluzby': { en: '/', sk: '/' },
  '/about': { en: '/', sk: '/' },
  '/o-mne': { en: '/', sk: '/' },
  '/contact': { en: '/contact', sk: '/kontakt' },
  '/kontakt': { en: '/contact', sk: '/kontakt' },
};

export function getAlternateUrl(lang: Lang, currentPath: string): string {
  const altLang = getAlternateLang(lang);
  const entry = PATH_MAP[currentPath];
  const altPath = entry ? entry[altLang] : '/';
  return `${DOMAINS[altLang]}${altPath}`;
}

export function getExpectedPath(lang: Lang, currentPath: string): string | null {
  const entry = PATH_MAP[currentPath];
  if (!entry) return null;
  return entry[lang];
}

export function getLocalizedPaths(lang: Lang) {
  return {
    services: '/#services',
    about: '/#about',
    contact: lang === 'sk' ? '/kontakt' : '/contact',
  };
}
