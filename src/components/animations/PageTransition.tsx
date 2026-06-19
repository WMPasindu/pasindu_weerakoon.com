import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { pageTransition } from './variants'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * Wraps each routed page so navigation feels like a smooth crossfade-and-lift
 * rather than a hard cut. Rendered inside <AnimatePresence> in the router.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return <>{children}</>

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
