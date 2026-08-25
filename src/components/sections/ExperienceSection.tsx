import { Tag } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/animations/Reveal'
import { experience } from '@/data/experience'

/**
 * Compact career list. Each role is a native <details> row — collapsed by
 * default to keep the page short, but the detail stays in the DOM so search
 * engines and AI crawlers still read every highlight.
 */
export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading
        index="02"
        eyebrow="Career"
        title="Experience"
        subtitle="Nine years of building products and the teams behind them. Expand any role for detail."
      />
      <Reveal>
        <div className="roles">
          {experience.map((job, index) => (
            <details
              className="role"
              key={`${job.company}-${job.period}`}
              open={index === 0}
            >
              <summary className="role__summary">
                <span className="role__period">{job.period}</span>
                <span className="role__title">
                  <strong>{job.role}</strong>
                  <span className="role__company">{job.company}</span>
                </span>
                <DownOutlined className="role__chevron" aria-hidden="true" />
              </summary>
              <div className="role__body">
                <p className="role__desc">{job.description}</p>
                <ul className="role__highlights">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <div className="role__tags">
                  {job.tags.map((tag) => (
                    <Tag key={tag} bordered={false}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
