import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Variants } from 'framer-motion'
import { fadeUp } from './variants'

interface RevealProps {
  children: ReactNode
  /** Override the default fade-up variant. */
  variants?: Variants
  /** Delay before the entrance, in seconds. */
  delay?: number
  /** Trigger once (default) or every time it scrolls into view. */
  once?: boolean
  className?: string
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}

/**
 * Reveals its children with a spring entrance the first time they scroll into
 * view. Falls back to a static render when the user prefers reduced motion.
 */
export function Reveal({
  children,
  variants = fadeUp,
  delay = 0,
  once = true,
  className,
  as = 'div',
}: RevealProps) {
  const prefersReduced = useReducedMotion()
  const MotionTag = motion[as]

  if (prefersReduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
