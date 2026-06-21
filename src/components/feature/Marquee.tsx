import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface MarqueeProps {
  items: string[]
  /** Seconds for one full loop — lower is faster. */
  speed?: number
  reverse?: boolean
}

/**
 * Infinite horizontal marquee — a kinetic strip of keywords that adds modern
 * motion to the page. The list is duplicated so the loop is seamless. Pauses
 * on hover and falls back to a static, wrapped row for reduced motion.
 */
export function Marquee({ items, speed = 32, reverse = false }: MarqueeProps) {
  const prefersReduced = usePrefersReducedMotion()

  if (prefersReduced) {
    return (
      <div className="marquee marquee--static">
        <div className="marquee__row">
          {items.map((item) => (
            <MarqueeItem key={item} label={item} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="marquee" aria-hidden="true">
      <div
        className={`marquee__track${reverse ? ' marquee__track--reverse' : ''}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((dup) => (
          <div className="marquee__row" key={dup}>
            {items.map((item) => (
              <MarqueeItem key={`${dup}-${item}`} label={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function MarqueeItem({ label }: { label: string }) {
  return (
    <span className="marquee__item">
      {label}
      <span className="marquee__dot" aria-hidden="true" />
    </span>
  )
}
