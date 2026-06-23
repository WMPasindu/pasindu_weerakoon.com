import { Link } from 'react-router-dom'
import { Button, Card, Col, Row, Typography } from 'antd'
import {
  ArrowRightOutlined,
  ClusterOutlined,
  RocketOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { PageTransition } from '@/components/animations/PageTransition'
import { Section } from '@/components/common/Section'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/animations/Reveal'
import { Stagger, StaggerItem } from '@/components/animations/Stagger'
import { Hero } from '@/components/feature/Hero'
import { ProjectCard } from '@/components/feature/ProjectCard'
import { ArticleCard } from '@/components/feature/ArticleCard'
import { StatCounter } from '@/components/feature/StatCounter'
import { Magnetic } from '@/components/animations/Magnetic'
import { featuredProjects } from '@/data/projects'
import { articles } from '@/data/articles'

// Show only the three most recent articles on the home page.
const latestArticles = articles.slice(0, 3)
import { profile } from '@/data/profile'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'


const { Title, Paragraph } = Typography

const whatIDo = [
  {
    icon: <ClusterOutlined />,
    title: 'Architect systems',
    body: 'Design resilient, scalable architectures and make the expensive-to-reverse decisions with care.',
  },
  {
    icon: <RocketOutlined />,
    title: 'Ship products',
    body: 'Turn ambiguous ideas into polished, performant products that people genuinely enjoy using.',
  },
  {
    icon: <TeamOutlined />,
    title: 'Grow teams',
    body: 'Mentor engineers, set the quality bar, and build the feedback loops that let teams move fast.',
  },
]

export function HomePage() {
  useDocumentTitle()

  return (
    <PageTransition>
      <Hero />

      {/* Intro lead — editorial pull-quote with italic serif accents and
          highlighted statistics. */}
      <Container>
        <Reveal>
          <div className="lead-block">
            <span className="lead-eyebrow">
              <span className="lead-rule" aria-hidden="true" />
              About
            </span>
            <p className="lead">
              Strategic Senior Technical Lead with{' '}
              <em className="lead-stat">9+&nbsp;years</em> in{' '}
              <em>frontend&nbsp;engineering</em> and{' '}
              <em>architectural&nbsp;design</em> — building scalable{' '}
              <em>React</em> ecosystems, leading multi-team units of{' '}
              <em className="lead-stat">15+&nbsp;engineers</em>, and aligning{' '}
              technical roadmaps with business goals.
            </p>
          </div>
        </Reveal>
      </Container>

      {/* Stats strip */}
      <Container>
        <Reveal>
          <div className="stats-strip">
            {profile.stats.map((stat) => (
              <StatCounter
                key={stat.label}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </Reveal>
      </Container>

      {/* What I do */}
      <Section>
        <SectionHeading
          eyebrow="What I do"
          title="Engineering leadership, end to end"
          subtitle="From the first architecture diagram to the engineers I help grow along the way."
          align="center"
        />
        <Stagger>
          <Row gutter={[24, 24]}>
            {whatIDo.map((item) => (
              <Col xs={24} md={8} key={item.title}>
                <StaggerItem>
                  <Card className="feature-card" variant="borderless">
                    <span className="feature-card__icon">{item.icon}</span>
                    <Title level={4}>{item.title}</Title>
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

      {/* Featured projects */}
      <Section muted>
        <div className="section-head-row">
          <SectionHeading
            eyebrow="Selected work"
            title="Featured projects"
            subtitle="A few things I’m proud to have led and built."
          />
          <Reveal>
            <Button type="link" className="see-all">
              <Link to="/projects">
                All projects <ArrowRightOutlined />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Stagger>
          <Row gutter={[24, 24]}>
            {featuredProjects.map((project) => (
              <Col xs={24} md={12} lg={8} key={project.slug}>
                <StaggerItem className="grid-cell">
                  <ProjectCard project={project} />
                </StaggerItem>
              </Col>
            ))}
          </Row>
        </Stagger>
      </Section>

      {/* Featured articles */}
      <Section>
        <div className="section-head-row">
          <SectionHeading
            eyebrow="Writing"
            title="Latest articles"
            subtitle="Notes on engineering, leadership, and craft."
          />
          <Reveal>
            <Button type="link" className="see-all">
              <Link to="/articles">
                All articles <ArrowRightOutlined />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Stagger>
          <Row gutter={[24, 24]}>
            {latestArticles.map((article) => (
              <Col xs={24} md={12} lg={8} key={article.slug}>
                <StaggerItem className="grid-cell">
                  <ArticleCard article={article} />
                </StaggerItem>
              </Col>
            ))}
          </Row>
        </Stagger>
      </Section>

      {/* CTA */}
      <Section>
        <Reveal>
          <div className="cta-panel">
            <span className="cta-panel__glow" aria-hidden="true" />
            <Title level={2} style={{ marginBottom: 12 }}>
              Let’s build something great together.
            </Title>
            <Paragraph type="secondary" style={{ fontSize: 17, maxWidth: 560 }}>
              Whether you’re scaling a team or shipping a new product, I’d love
              to hear what you’re working on.
            </Paragraph>
            <Magnetic>
              <Button type="primary" size="large" shape="round">
                <Link to="/contact">
                  Get in touch <ArrowRightOutlined />
                </Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </Section>
    </PageTransition>
  )
}
