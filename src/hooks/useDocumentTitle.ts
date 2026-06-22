import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteConfig } from '@/config/site'

/** Creates or updates a <meta name="..."> / <meta property="..."> tag. */
function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  )
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Sets the document title and per-page SEO meta (description, canonical, and
 * Open Graph / Twitter mirrors) on route changes. Helps each route rank for
 * its own intent while keeping the homepage's static meta intact for crawlers.
 */
export function useDocumentTitle(title?: string, description?: string): void {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${siteConfig.name}`
      : `${siteConfig.name} — ${siteConfig.jobTitle}`
    document.title = fullTitle

    const desc = description ?? siteConfig.description
    setMeta('name', 'description', desc)

    const url = `${siteConfig.url}${pathname === '/' ? '/' : pathname}`
    setCanonical(url)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', desc)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', desc)
  }, [title, description, pathname])
}
