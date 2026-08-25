import { LinkOutlined } from '@ant-design/icons'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Stagger, StaggerItem } from '@/components/animations/Stagger'
import { projects } from '@/data/projects'

/** Compact, scannable project list — category, title, one-liner, stack. */
export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Portfolio"
        title="Selected work"
        subtitle="Products, platforms and applications I have led and built."
      />
      <Stagger>
        <div className="work">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <article
                className={`work__item work__item--${project.category
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
              >
                <header className="work__head">
                  <span className="work__category">{project.category}</span>
                  {project.links.live ? (
                    <a
                      className="work__link"
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkOutlined /> Live
                    </a>
                  ) : (
                    project.clientProject && (
                      <span className="work__badge">Client project</span>
                    )
                  )}
                </header>

                <h3 className="work__title">{project.title}</h3>
                <p className="work__summary">{project.summary}</p>

                {project.metrics && (
                  <p className="work__metrics">
                    {project.metrics.map((m) => (
                      <span key={m.label}>
                        <strong>{m.value}</strong> {m.label}
                      </span>
                    ))}
                  </p>
                )}

                <ul className="work__tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            </StaggerItem>
          ))}
        </div>
      </Stagger>
    </Section>
  )
}
