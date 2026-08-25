import { Typography } from 'antd'
import { Section } from '@/components/common/Section'
import { Reveal } from '@/components/animations/Reveal'
import { profile } from '@/data/profile'
import { awards, certifications, education } from '@/data/credentials'

const { Paragraph } = Typography

const glance = [
  { label: 'Role', value: 'Technical Lead · 1 BillionTech' },
  { label: 'Based in', value: 'Colombo, Sri Lanka' },
  { label: 'Focus', value: 'React · Frontend architecture · Design systems' },
  { label: 'Experience', value: '9+ years · 15+ engineers led' },
  { label: 'Education', value: `${education[0].degree}, SLIIT` },
  { label: 'Open to', value: 'Leadership & architecture roles' },
]

/** A short, high-signal introduction plus an at-a-glance facts grid. */
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
                <dd className="glance__value">{item.value}</dd>
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
