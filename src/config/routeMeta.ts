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
 * Metadata for the build-time prerender. The portfolio is a single page, so
 * there is one entry — its title, description, canonical and Open Graph tags
 * are baked into the static HTML.
 */
export const routeMeta: RouteMeta[] = [
  {
    path: '/',
    title: `${siteConfig.name} — Software Engineer & Technical Lead | Sri Lanka`,
    description: siteConfig.description,
  },
]
