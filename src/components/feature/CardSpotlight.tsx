import { useEffect } from 'react'

const SELECTOR = '.project-card.ant-card, .article-card.ant-card, .feature-card.ant-card'

/**
 * Mounts a single global pointer listener that gives every card a
 * cursor-following radial glow by writing --mx / --my CSS variables on the
 * card under the pointer. One delegated listener keeps it cheap regardless of
 * how many cards are on the page. Renders nothing.
 */
export function CardSpotlight() {
  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null
      const card = target?.closest<HTMLElement>(SELECTOR)
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      card.style.setProperty('--mx', `${x}%`)
      card.style.setProperty('--my', `${y}%`)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return null
}
