import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Restores the right scroll position on load. Deep links such as
 * `/#projects` scroll to that section once it has rendered; everything else
 * starts at the top.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // Sections render inside a Suspense boundary, so wait a frame.
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      })
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}
