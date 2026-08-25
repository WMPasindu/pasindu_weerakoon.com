import { LinkedinFilled } from '@ant-design/icons'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Stagger, StaggerItem } from '@/components/animations/Stagger'
import { testimonials } from '@/data/testimonials'
import { siteConfig } from '@/config/site'

/** Initials used for the recommender avatar. */
function initials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

/** Recommendations received on LinkedIn, quoted with attribution. */
export function TestimonialsSection() {
  return (
    <Section id="recommendations" muted>
      <SectionHeading
        index="05"
        eyebrow="Recommendations"
        title="What colleagues say"
        subtitle="Recommendations from engineers and managers I have worked with, as written on LinkedIn."
      />

      <Stagger>
        <div className="quotes">
          {testimonials.map((item) => (
            <StaggerItem key={item.name}>
              <figure className="quote">
                <span className="quote__mark" aria-hidden="true">
                  &rdquo;
                </span>
                <blockquote className="quote__text">{item.quote}</blockquote>
                <figcaption className="quote__author">
                  <span className="quote__avatar" aria-hidden="true">
                    {initials(item.name)}
                  </span>
                  <span className="quote__who">
                    <strong className="quote__name">{item.name}</strong>
                    <span className="quote__title">{item.title}</span>
                    <span className="quote__meta">
                      {item.relationship} · {item.date}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </div>
      </Stagger>

      <p className="quotes__source">
        <a
          href={siteConfig.socials[0]}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedinFilled /> See all recommendations on LinkedIn
        </a>
      </p>
    </Section>
  )
}
