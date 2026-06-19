import { Typography } from 'antd'
import { Reveal } from '@/components/animations/Reveal'

const { Title, Paragraph } = Typography

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

/** Consistent, animated heading used to introduce every major section. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div
        style={{
          textAlign: align,
          maxWidth: align === 'center' ? 720 : undefined,
          marginInline: align === 'center' ? 'auto' : undefined,
          marginBottom: 'clamp(28px, 4vw, 48px)',
        }}
      >
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Title level={2} style={{ marginTop: eyebrow ? 12 : 0 }}>
          {title}
        </Title>
        {subtitle && (
          <Paragraph type="secondary" style={{ fontSize: 17, marginBottom: 0 }}>
            {subtitle}
          </Paragraph>
        )}
      </div>
    </Reveal>
  )
}
