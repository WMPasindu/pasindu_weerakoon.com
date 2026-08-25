/**
 * Smoothly scrolls to a section on the single page and updates the URL hash
 * without triggering a router navigation. Honours reduced-motion.
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id)
  if (!el) return
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches
  el.scrollIntoView({
    behavior: prefersReduced ? 'auto' : 'smooth',
    block: 'start',
  })
  window.history.replaceState(null, '', `#${id}`)
}
