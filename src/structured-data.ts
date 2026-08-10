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
        jobTitle: lang === 'sk'
          ? 'Konzultant pre AI systémy a softvérové inžinierstvo'
          : 'AI Systems & Software Engineering Consultant',
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
          ? 'Matej Lukášik — Konzultant pre AI systémy a softvérové inžinierstvo'
          : 'Matej Lukášik — AI Systems & Software Engineering Consultant',
        url: siteOrigin,
        description: lang === 'sk'
          ? 'Pomáham malým a stredným firmám nahrádzať časovo náročné procesy a nevyhovujúci softvér správnou kombináciou softvéru na mieru, automatizácií a AI agentov.'
          : 'I help small and medium-sized businesses replace time-consuming workflows and software that no longer fits with the right mix of bespoke software systems, automations, and AI agents.',
        areaServed: ['Europe', 'United States'],
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
