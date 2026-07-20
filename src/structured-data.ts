import type { Lang } from './i18n';

const BUSINESS_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Ulica Hlboká 5943/14',
  postalCode: '917 01',
  addressLocality: 'Trnava',
  addressCountry: 'SK',
};

const BUSINESS_IDENTIFIERS = [
  {
    '@type': 'PropertyValue',
    propertyID: 'IČO',
    value: '50113801',
  },
  {
    '@type': 'PropertyValue',
    propertyID: 'Živnostenský register SR',
    value: '250-37148',
  },
];

export function getStructuredData(lang: Lang, siteOrigin: string) {
  const personId = `${siteOrigin}/#person`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Matej Lukášik',
        url: siteOrigin,
        jobTitle: lang === 'sk' ? 'Konzultant pre agentickú AI' : 'Agentic AI Consultant',
        image: `${siteOrigin}/avatar.png`,
        sameAs: [
          'https://www.linkedin.com/in/matej-lukasik',
          'https://x.com/matejlukasik',
          'https://github.com/matk0',
          'https://youtube.com/@matejlukasik',
        ],
        address: BUSINESS_ADDRESS,
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteOrigin}/#business`,
        name: lang === 'sk'
          ? 'Matej Lukášik — audit procesov a automatizácia AI'
          : 'Matej Lukášik — AI Process Audits and Automation',
        url: siteOrigin,
        description: lang === 'sk'
          ? 'Pomáham firmám nájsť opakujúcu sa prácu, ktorá im berie najviac času, zjednodušiť ju, zautomatizovať a zmerať výsledok.'
          : 'I help businesses find recurring work that takes up the most time, simplify it, automate it, and measure the result.',
        areaServed: 'EU',
        availableLanguage: ['en', 'sk'],
        provider: { '@id': personId },
        telephone: '+421944302185',
        email: 'matej@matejlukasik.com',
        address: BUSINESS_ADDRESS,
        identifier: BUSINESS_IDENTIFIERS,
      },
    ],
  };
}
