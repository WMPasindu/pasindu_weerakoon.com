import type { ReactNode } from 'react'
import { Container } from './Container'

interface SectionProps {
  children: ReactNode
  id?: string
  /** Tints the section background to create visual rhythm between blocks. */
  muted?: boolean
  containerSize?: 'default' | 'narrow' | 'wide'
  className?: string
}

/** A vertically-padded page section with an optional muted background. */
export function Section({
  children,
  id,
  muted = false,
  containerSize = 'default',
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        paddingBlock: 'clamp(56px, 9vw, 112px)',
        background: muted ? 'var(--surface-muted)' : 'transparent',
      }}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  )
}
