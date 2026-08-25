import { Reveal } from '@/components/animations/Reveal'

interface SectionHeadingProps {
  /** Two-digit index rendered as a designed section marker, e.g. "01". */
  index?: string
  /** Small uppercase label above the title. */
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

/** Consistent, numbered heading used to introduce every major section. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <Reveal>
      <header className={`sec-head${align === 'center' ? ' sec-head--center' : ''}`}>
        <div className="sec-head__label">
          {index && <span className="sec-head__index">{index}</span>}
          {eyebrow && <span className="sec-head__eyebrow">{eyebrow}</span>}
          <span className="sec-head__rule" aria-hidden="true" />
        </div>
        <h2 className="sec-head__title">{title}</h2>
        {subtitle && <p className="sec-head__subtitle">{subtitle}</p>}
      </header>
    </Reveal>
  )
}
