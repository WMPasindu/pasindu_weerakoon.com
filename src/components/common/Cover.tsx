import type { CSSProperties, ReactNode } from 'react'

interface CoverProps {
  /** Either an image URL or a CSS gradient string. */
  source: string
  alt?: string
  /** Optional overlay content (badges, initials, icons). */
  children?: ReactNode
  aspectRatio?: string
  className?: string
  style?: CSSProperties
}

const isGradient = (value: string) =>
  value.startsWith('linear-gradient') || value.startsWith('radial-gradient')

/**
 * Unified cover renderer. Accepts a real image or a gradient string so content
 * always looks intentional, even before real screenshots exist.
 */
export function Cover({
  source,
  alt = '',
  children,
  aspectRatio = '16 / 10',
  className,
  style,
}: CoverProps) {
  const gradient = isGradient(source)
  return (
    <div
      className={className}
      role={gradient ? 'img' : undefined}
      aria-label={gradient ? alt : undefined}
      style={{
        position: 'relative',
        aspectRatio,
        overflow: 'hidden',
        background: gradient ? source : 'var(--surface-muted)',
        ...style,
      }}
    >
      {!gradient && (
        <img
          src={source}
          alt={alt}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      )}
      {gradient && <span className="cover__grain" aria-hidden="true" />}
      {children}
    </div>
  )
}
