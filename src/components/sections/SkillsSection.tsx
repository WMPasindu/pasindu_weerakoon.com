import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/animations/Reveal'
import { skillCategories, skillsByCategory } from '@/data/skills'

/** Skills as compact chip groups — the full toolbox at a glance. */
export function SkillsSection() {
  return (
    <Section id="skills" muted>
      <SectionHeading
        eyebrow="Toolbox"
        title="Skills & expertise"
        subtitle="The technologies and disciplines I work in every day."
      />
      <Reveal>
        <div className="skills">
          {skillCategories.map((category) => (
            <div className="skills__group" key={category}>
              <h3 className="skills__title">{category}</h3>
              <ul className="skills__list">
                {skillsByCategory(category).map((skill) => (
                  <li className="skills__chip" key={skill.name}>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
