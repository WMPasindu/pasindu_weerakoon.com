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
  description:
    'Portfolio of Pasindu Weerakoon — Technical Lead and React & Frontend Architect. 9+ years building scalable web ecosystems, micro-frontend platforms, and design systems.',
  url: 'https://pasinduweerakoon.dev',
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
