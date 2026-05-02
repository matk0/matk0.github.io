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

export const LOCAL_LANG_COOKIE = 'lang';

const PRODUCTION_HOSTS = new Set(
  Object.values(DOMAINS).map((domain) => new URL(domain).hostname),
);

export function isLang(value: string | null | undefined): value is Lang {
  return value === 'en' || value === 'sk';
}

export function isProductionHost(hostname: string): boolean {
  return PRODUCTION_HOSTS.has(hostname.replace(/^www\./, ''));
}

export function getLangFromHostname(hostname: string): Lang {
  if (hostname.endsWith('.sk')) return 'sk';
  return 'en';
}

export function getLangFromUrl(currentUrl: URL, cookieLang?: string): Lang {
  if (isProductionHost(currentUrl.hostname)) {
    return getLangFromHostname(currentUrl.hostname);
  }

  const queryLang = currentUrl.searchParams.get('lang');
  if (isLang(queryLang)) return queryLang;
  if (isLang(cookieLang)) return cookieLang;

  return getLangFromHostname(currentUrl.hostname);
}

export function getSiteOrigin(lang: Lang, currentUrl?: URL): string {
  if (currentUrl && !isProductionHost(currentUrl.hostname)) {
    return currentUrl.origin;
  }

  return DOMAINS[lang];
}

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

export function getAlternateUrl(lang: Lang, currentPath: string, currentUrl?: URL): string {
  const altLang = getAlternateLang(lang);
  const entry = PATH_MAP[currentPath];
  const altPath = entry ? entry[altLang] : '/';
  const alternateUrl = new URL(altPath, getSiteOrigin(altLang, currentUrl));

  if (currentUrl && !isProductionHost(currentUrl.hostname)) {
    for (const [key, value] of currentUrl.searchParams) {
      if (key !== 'lang') alternateUrl.searchParams.append(key, value);
    }

    alternateUrl.searchParams.set('lang', altLang);
  }

  return alternateUrl.href;
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
