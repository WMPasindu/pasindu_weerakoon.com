import { siteConfig } from './site'

export interface RouteMeta {
  /** URL path to prerender. */
  path: string
  /** Full <title>. */
  title: string
  /** Meta description. */
  description: string
}

/**
 * Per-route SEO metadata used by the build-time prerender to bake a correct
 * <title>, description, canonical and Open Graph tags into each route's static
 * HTML. Keep in sync with the per-page useDocumentTitle() calls.
 */
export const routeMeta: RouteMeta[] = [
  {
    path: '/',
    title: `${siteConfig.name} — Software Engineer & Technical Lead | Sri Lanka`,
    description: siteConfig.description,
  },
  {
    path: '/about',
    title: `About — ${siteConfig.name}`,
    description:
      'About Pasindu Weerakoon — a Software Engineer and Technical Lead in Colombo, Sri Lanka with 9+ years across React, TypeScript, micro-frontends, design systems and cross-platform mobile.',
  },
  {
    path: '/projects',
    title: `Projects — ${siteConfig.name}`,
    description:
      'Selected work by Pasindu Weerakoon — React platforms, micro-frontend architectures, design systems and cross-platform mobile apps built over 9+ years.',
  },
  {
    path: '/articles',
    title: `Articles — ${siteConfig.name}`,
    description:
      'Articles by Pasindu Weerakoon on frontend engineering, React architecture, design systems, and engineering leadership.',
  },
  {
    path: '/gallery',
    title: `Gallery — ${siteConfig.name}`,
    description:
      'A visual gallery from Pasindu Weerakoon — Software Engineer and Technical Lead in Sri Lanka.',
  },
  {
    path: '/contact',
    title: `Contact — ${siteConfig.name}`,
    description:
      'Get in touch with Pasindu Weerakoon — Software Engineer and Technical Lead in Colombo, Sri Lanka. Available for engineering leadership and React projects.',
  },
]
