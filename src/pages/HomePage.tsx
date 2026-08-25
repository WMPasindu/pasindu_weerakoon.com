import { Card, Col, Row, Typography } from 'antd'
import { ClusterOutlined, RocketOutlined, TeamOutlined } from '@ant-design/icons'
import { PageTransition } from '@/components/animations/PageTransition'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Stagger, StaggerItem } from '@/components/animations/Stagger'
import { Hero } from '@/components/feature/Hero'
import { AboutSection } from '@/components/sections/AboutSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { GallerySection } from '@/components/sections/GallerySection'
import { ContactSection } from '@/components/sections/ContactSection'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

const { Title, Paragraph } = Typography

const whatIDo = [
  {
    icon: <ClusterOutlined />,
    title: 'Architect systems',
    body: 'Design resilient, scalable frontend architectures — micro-frontends, mono-repos and design systems — and make the expensive-to-reverse decisions with care.',
  },
  {
    icon: <RocketOutlined />,
    title: 'Ship products',
    body: 'Turn ambiguous ideas into polished, performant web and mobile products, with performance and accessibility built in rather than bolted on.',
  },
  {
    icon: <TeamOutlined />,
    title: 'Grow teams',
    body: 'Mentor engineers, set the quality bar with TDD and clean architecture, and build the feedback loops that let teams move fast without breaking things.',
  },
]

/**
 * Single-page portfolio. Every section lives on one scrolling page so visitors
 * (and crawlers) get the full picture without navigating away.
 */
export function HomePage() {
  useDocumentTitle()

  return (
    <PageTransition>
      <Hero />

      {/* What I do */}
      <Section id="services">
        <SectionHeading
          eyebrow="What I do"
          title="How I help teams"
          subtitle="Three things I bring to every engagement."
          align="center"
        />
        <Stagger>
          <Row gutter={[24, 24]}>
            {whatIDo.map((item, index) => (
              <Col xs={24} md={8} key={item.title}>
                <StaggerItem className="grid-cell">
                  <Card className="feature-card" variant="borderless">
                    <div className="feature-card__top">
                      <span className="feature-card__icon">{item.icon}</span>
                      <span className="feature-card__no">{`0${index + 1}`}</span>
                    </div>
                    <Title level={4} style={{ marginBottom: 8 }}>
                      {item.title}
                    </Title>
                    <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                      {item.body}
                    </Paragraph>
                  </Card>
                </StaggerItem>
              </Col>
            ))}
          </Row>
        </Stagger>
      </Section>

      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <GallerySection />
      <ContactSection />
    </PageTransition>
  )
}
