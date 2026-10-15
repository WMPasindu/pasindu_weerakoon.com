/**
 * Global, content-agnostic site configuration.
 * Edit this file to rebrand the portfolio without touching components.
 */

export interface NavItem {
  label: string
  /** Section id on the single page (used for anchor links and scroll-spy). */
  id: string
}

export const siteConfig = {
  /** Used in <title>, meta tags and the footer. */
  name: 'Pasindu Weerakoon',
  shortName: 'PW',
  jobTitle: 'Technical Lead · React & Frontend Specialist',
  location: 'Colombo, Sri Lanka',
  description:
    'Portfolio of Pasindu Weerakoon — Technical Lead, Software Engineer and React & Frontend Specialist based in Colombo, Sri Lanka. 9+ years building scalable web and mobile products, micro-frontend platforms and design systems.',
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
  /** Primary navigation — in-page sections. Also drives the mobile drawer. */
  nav: [
    { label: 'About', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Recommendations', id: 'recommendations' },
    { label: 'Contact', id: 'contact' },
  ] satisfies NavItem[],
} as const

export type SiteConfig = typeof siteConfig
