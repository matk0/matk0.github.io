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
        jobTitle: lang === 'sk' ? 'Konzultant pre agentickú AI' : 'Agentic AI Consultant for SMBs',
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
        name: 'Matej Lukášik — Agentic AI Consulting',
        url: siteOrigin,
        description: lang === 'sk'
          ? 'Agentická AI pre malé a stredné firmy, ktoré chcú bezpečné a merateľné výsledky.'
          : 'Agentic AI for small and medium-sized businesses that want safe, measurable results.',
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
