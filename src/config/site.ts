/**
 * Global, content-agnostic site configuration.
 * Edit this file to rebrand the portfolio without touching components.
 */

export interface NavItem {
  label: string
  to: string
}

export const siteConfig = {
  /** Used in <title>, meta tags and the footer. */
  name: 'Pasindu Weerakoon',
  shortName: 'PW',
  jobTitle: 'Technical Lead · React & Frontend Architect',
  location: 'Colombo, Sri Lanka',
  description:
    'Portfolio of Pasindu Weerakoon — Technical Lead, Software Engineer and React & Frontend Architect based in Colombo, Sri Lanka. 9+ years building scalable web and mobile products, micro-frontend platforms and design systems.',
  /** Keywords the site should be discoverable for. */
  keywords: [
    'Pasindu Weerakoon',
    'Pasindu',
    'Weerakoon',
    'Software Engineer',
    'Software Developer',
    'Technical Lead',
    'React Developer',
    'Frontend Architect',
    'Frontend Developer',
    'Sri Lanka',
    'Colombo',
    'React',
    'TypeScript',
    'React Native',
    'Web Developer Sri Lanka',
  ],
  url: 'https://pasinduweerakoon.com',
  /** Public social / professional profiles (used for Person schema sameAs). */
  socials: [
    'https://www.linkedin.com/in/pasindu-weerakoon',
    'https://github.com/WMPasindu',
  ],
  /** Primary navigation, also drives the mobile drawer. */
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Articles', to: '/articles' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ] satisfies NavItem[],
} as const

export type SiteConfig = typeof siteConfig
