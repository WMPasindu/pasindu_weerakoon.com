import { useEffect } from 'react'
import { siteConfig } from '@/config/site'

/** Sets the document title to "<page> — <site>" and restores nothing (SPA). */
export function useDocumentTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} — ${siteConfig.name}` : siteConfig.name
  }, [title])
}
