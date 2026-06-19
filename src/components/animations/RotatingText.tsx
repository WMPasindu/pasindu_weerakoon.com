import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface RotatingTextProps {
  /** Phrases to cycle through with a typewriter effect. */
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseMs?: number
  className?: string
}

/**
 * A lightweight typewriter that types, pauses, deletes, and advances through a
 * list of phrases. With reduced motion it simply shows the first phrase.
 */
export function RotatingText({
  phrases,
  typingSpeed = 55,
  deletingSpeed = 30,
  pauseMs = 1400,
  className,
}: RotatingTextProps) {
  const prefersReduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>(
    'typing',
  )

  useEffect(() => {
    if (prefersReduced) return
    const current = phrases[index % phrases.length]

    if (phase === 'typing') {
      if (text === current) {
        const t = setTimeout(() => setPhase('pausing'), pauseMs)
        return () => clearTimeout(t)
      }
      const t = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        typingSpeed,
      )
      return () => clearTimeout(t)
    }

    if (phase === 'deleting') {
      const t = setTimeout(() => {
        if (text === '') {
          setIndex((i) => (i + 1) % phrases.length)
          setPhase('typing')
        } else {
          setText(current.slice(0, text.length - 1))
        }
      }, deletingSpeed)
      return () => clearTimeout(t)
    }

    // pausing
    const t = setTimeout(() => setPhase('deleting'), pauseMs)
    return () => clearTimeout(t)
  }, [
    text,
    phase,
    index,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseMs,
    prefersReduced,
  ])

  if (prefersReduced) {
    return <span className={className}>{phrases[0]}</span>
  }

  return (
    <span className={className}>
      {text}
      <span className="rotating-text__caret" aria-hidden="true">
        |
      </span>
    </span>
  )
}
