import { Col, Row, Space, Tag, Typography } from 'antd'
import { EnvironmentOutlined } from '@ant-design/icons'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/animations/Reveal'
import { SocialLinks } from '@/components/common/SocialLinks'
import { profile } from '@/data/profile'
import { awards, certifications, education } from '@/data/credentials'

const { Title, Paragraph, Text } = Typography

/** Biography, location, credentials and recognition. */
export function AboutSection() {
  return (
    <Section id="about" muted>
      <SectionHeading
        eyebrow="About"
        title="Who I am"
        subtitle="Engineering leadership grounded in hands-on architecture and craft."
      />

      <Row gutter={[48, 40]}>
        <Col xs={24} lg={14}>
          <Reveal>
            <Paragraph type="secondary" style={{ marginBottom: 16 }}>
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

        <Col xs={24} lg={10}>
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

            <Title level={5} className="skill-group__title" style={{ marginTop: 28 }}>
              Certifications
            </Title>
            <Space size={[8, 8]} wrap style={{ marginBottom: 24 }}>
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
              <Paragraph key={a} style={{ marginBottom: 8, fontWeight: 500 }}>
                {a}
              </Paragraph>
            ))}
          </Reveal>
        </Col>
      </Row>
    </Section>
  )
}
