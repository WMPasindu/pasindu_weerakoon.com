import { Col, Row } from 'antd'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Stagger, StaggerItem } from '@/components/animations/Stagger'
import { ProjectCard } from '@/components/feature/ProjectCard'
import { projects } from '@/data/projects'

/** All projects, newest and most significant first. */
export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Portfolio"
        title="Selected work"
        subtitle="Products, platforms and applications I have led and built."
      />
      <Stagger>
        <Row gutter={[24, 24]}>
          {projects.map((project) => (
            <Col xs={24} md={12} lg={8} key={project.slug}>
              <StaggerItem className="grid-cell">
                <ProjectCard project={project} />
              </StaggerItem>
            </Col>
          ))}
        </Row>
      </Stagger>
    </Section>
  )
}
