import { Space, Tag, Timeline, Typography } from 'antd'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/animations/Reveal'
import { experience } from '@/data/experience'

const { Title, Paragraph, Text } = Typography

/** Chronological career timeline. */
export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Career"
        title="Experience"
        subtitle="A track record of leading teams and shipping products that scale."
      />
      <Reveal>
        <Timeline
          mode="left"
          className="experience-timeline"
          items={experience.map((job) => ({
            children: (
              <article className="experience-item">
                <div className="experience-item__head">
                  <Title level={4} style={{ marginBottom: 2 }}>
                    {job.role}
                  </Title>
                  <Text strong type="secondary">
                    {job.company} · {job.location}
                  </Text>
                </div>
                <Text type="secondary" className="experience-item__period">
                  {job.period}
                </Text>
                <Paragraph style={{ marginTop: 12 }}>
                  {job.description}
                </Paragraph>
                <ul className="experience-item__highlights">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <Space size={[6, 6]} wrap>
                  {job.tags.map((tag) => (
                    <Tag key={tag} bordered={false}>
                      {tag}
                    </Tag>
                  ))}
                </Space>
              </article>
            ),
          }))}
        />
      </Reveal>
    </Section>
  )
}
