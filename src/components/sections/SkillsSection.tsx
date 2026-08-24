import { Col, Row, Typography } from 'antd'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/animations/Reveal'
import { SkillBar } from '@/components/feature/SkillBar'
import { skillCategories, skillsByCategory } from '@/data/skills'

const { Title } = Typography

/** Skills grouped by discipline, with animated proficiency bars. */
export function SkillsSection() {
  return (
    <Section id="skills" muted>
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
  )
}
