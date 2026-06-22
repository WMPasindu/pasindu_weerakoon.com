import { useMemo, useState } from 'react'
import { Segmented } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { PageTransition } from '@/components/animations/PageTransition'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/animations/Reveal'
import { ProjectCard } from '@/components/feature/ProjectCard'
import { projectCategories, projects } from '@/data/projects'
import type { ProjectCategory } from '@/data/types'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

type Filter = 'All' | ProjectCategory

export function ProjectsPage() {
  useDocumentTitle(
    'Projects',
    'Selected work by Pasindu Weerakoon — React platforms, micro-frontend architectures, design systems and cross-platform mobile apps built over 9+ years.',
  )
  const [filter, setFilter] = useState<Filter>('All')

  const visible = useMemo(
    () =>
      filter === 'All'
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  )

  return (
    <PageTransition>
      <Section>
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects"
          subtitle="Products, platforms, and open-source work I’ve led and built."
        />

        <Reveal>
          <div className="filter-bar">
            <Segmented<Filter>
              size="large"
              value={filter}
              onChange={setFilter}
              options={['All', ...projectCategories]}
            />
          </div>
        </Reveal>

        <motion.div className="auto-grid" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="grid-cell"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    </PageTransition>
  )
}
