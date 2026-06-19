import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, staggerContainer } from './variants'

interface StaggerProps {
  children: ReactNode
  className?: string
  /** Fraction of the container that must be visible before animating. */
  amount?: number
}

/**
 * Container that choreographs its <StaggerItem> children into view one after
 * another. Pair with <StaggerItem> for grids and lists.
 */
export function Stagger({ children, className, amount = 0.15 }: StaggerProps) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <div className={className}>{children}</div>

  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}
