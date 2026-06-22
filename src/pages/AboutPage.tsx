import { Avatar, Col, Row, Space, Tag, Timeline, Typography } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import { PageTransition } from '@/components/animations/PageTransition'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/animations/Reveal'
import { SkillBar } from '@/components/feature/SkillBar'
import { SocialLinks } from '@/components/common/SocialLinks'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { skillCategories, skillsByCategory } from '@/data/skills'
import { awards, certifications, education } from '@/data/credentials'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const { Title, Paragraph, Text } = Typography

export function AboutPage() {
  useDocumentTitle(
    'About',
    'About Pasindu Weerakoon — a Software Engineer and Technical Lead in Colombo, Sri Lanka with 9+ years across React, TypeScript, micro-frontends, design systems and cross-platform mobile.',
  )

  return (
    <PageTransition>
      {/* Intro */}
      <Section>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={9} lg={8}>
            <Reveal variants={undefined}>
              <div className="about-portrait">
                <Avatar
                  src={profile.avatar}
                  size={240}
                  shape="square"
                  className="about-portrait__img"
                />
              </div>
            </Reveal>
          </Col>
          <Col xs={24} md={15} lg={16}>
            <Reveal>
              <span className="eyebrow">About me</span>
              <Title level={1} style={{ marginTop: 12 }}>
                {profile.name}
              </Title>
              <Text type="secondary" style={{ fontSize: 18 }}>
                {profile.title}
              </Text>
              <Paragraph type="secondary" style={{ marginTop: 8 }}>
                <EnvironmentOutlined /> {profile.location}
              </Paragraph>
              {profile.bio.map((para, i) => (
                <Paragraph key={i} style={{ fontSize: 16 }}>
                  {para}
                </Paragraph>
              ))}
              <Space style={{ marginTop: 8 }}>
                <SocialLinks />
              </Space>
            </Reveal>
          </Col>
        </Row>
      </Section>

      {/* Experience */}
      <Section muted>
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
                <div className="experience-item">
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
                </div>
              ),
            }))}
          />
        </Reveal>
      </Section>

      {/* Skills */}
      <Section>
        <SectionHeading
          eyebrow="Toolbox"
          title="Skills & expertise"
          subtitle="The technologies and disciplines I work in every day."
        />
        <Row gutter={[40, 40]}>
          {skillCategories.map((category) => (
            <Col xs={24} md={12} key={category}>
              <Reveal>
                <Title level={5} className="skill-group__title">
                  {category}
                </Title>
                {skillsByCategory(category).map((skill) => (
                  <SkillBar key={skill.name} skill={skill} />
                ))}
              </Reveal>
            </Col>
          ))}
        </Row>
      </Section>

      {/* Education, certifications & awards */}
      <Section muted>
        <SectionHeading
          eyebrow="Credentials"
          title="Education & recognition"
          subtitle="Formal qualifications, industry certifications, and a few moments worth celebrating."
        />
        <Row gutter={[40, 40]}>
          <Col xs={24} md={14}>
            <Reveal>
              <Title level={5} className="skill-group__title">
                Education
              </Title>
              {education.map((item) => (
                <div key={item.degree} className="credential">
                  <div className="credential__head">
                    <Text strong>{item.degree}</Text>
                    <Text type="secondary">{item.period}</Text>
                  </div>
                  <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    {item.field} · {item.institution}
                  </Paragraph>
                </div>
              ))}
            </Reveal>
          </Col>
          <Col xs={24} md={10}>
            <Reveal>
              <Title level={5} className="skill-group__title">
                Certifications
              </Title>
              <Space size={[8, 8]} wrap style={{ marginBottom: 28 }}>
                {certifications.map((cert) => (
                  <Tag key={cert} bordered={false}>
                    {cert}
                  </Tag>
                ))}
              </Space>
              <Title level={5} className="skill-group__title">
                Awards
              </Title>
              {awards.map((a) => (
                <Paragraph
                  key={a}
                  style={{ marginBottom: 8, fontWeight: 500 }}
                >
                  🏆 {a}
                </Paragraph>
              ))}
            </Reveal>
          </Col>
        </Row>
      </Section>
    </PageTransition>
  )
}
