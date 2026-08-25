import { Typography } from 'antd'
import { Section } from '@/components/common/Section'
import { Reveal } from '@/components/animations/Reveal'
import { profile } from '@/data/profile'
import { awards, certifications, education } from '@/data/credentials'

const { Paragraph } = Typography

interface GlanceEntry {
  /** Main line. */
  value: string
  /** Optional muted supporting line, e.g. institution and dates. */
  meta?: string
}

const glance: { label: string; entries: GlanceEntry[] }[] = [
  {
    label: 'Role',
    entries: [
      { value: 'Technical Lead', meta: '1 BillionTech · Colombo, Sri Lanka' },
    ],
  },
  {
    label: 'Education',
    entries: education.map((item) => ({
      value: item.degree,
      meta: `${item.institution.replace(/\s*\(.*\)$/, '')} · ${item.period}`,
    })),
  },
  {
    label: 'Open to',
    entries: [{ value: 'Leadership & architecture roles' }],
  },
]

/** A short, high-signal introduction plus an at-a-glance facts panel. */
export function AboutSection() {
  return (
    <Section id="about" muted>
      <div className="about">
        <Reveal>
          <div className="sec-head__label">
            <span className="sec-head__index">01</span>
            <span className="sec-head__eyebrow">About</span>
            <span className="sec-head__rule" aria-hidden="true" />
          </div>
          <h2 className="about__headline">{profile.headline}</h2>
          {profile.bio.map((para, i) => (
            <Paragraph key={i} className="about__bio">
              {para}
            </Paragraph>
          ))}
        </Reveal>

        <Reveal>
          <dl className="glance">
            {glance.map((item) => (
              <div className="glance__item" key={item.label}>
                <dt className="glance__label">{item.label}</dt>
                <dd className="glance__value">
                  {item.entries.map((entry) => (
                    <span className="glance__entry" key={entry.value}>
                      <span className="glance__main">{entry.value}</span>
                      {entry.meta && (
                        <span className="glance__sub">{entry.meta}</span>
                      )}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          <p className="about__credentials">
            <strong>Certifications:</strong> {certifications.join(' · ')}
            <span className="about__sep">|</span>
            <strong>Award:</strong> {awards.join(' · ')}
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
