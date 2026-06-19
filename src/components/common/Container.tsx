import type { CSSProperties, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  /** Narrower max-width for reading-focused pages like article detail. */
  size?: 'default' | 'narrow' | 'wide'
  className?: string
  style?: CSSProperties
}

const maxWidths: Record<NonNullable<ContainerProps['size']>, number> = {
  narrow: 760,
  default: 1160,
  wide: 1320,
}

/** Centers content with a consistent max-width and responsive gutters. */
export function Container({
  children,
  size = 'default',
  className,
  style,
}: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth: maxWidths[size],
        marginInline: 'auto',
        paddingInline: 'clamp(20px, 5vw, 40px)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
