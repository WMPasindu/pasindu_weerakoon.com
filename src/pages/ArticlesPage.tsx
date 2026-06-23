import { useMemo, useState } from 'react'
import { Segmented } from 'antd'
import { AnimatePresence, motion } from 'framer-motion'
import { PageTransition } from '@/components/animations/PageTransition'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Reveal } from '@/components/animations/Reveal'
import { ArticleCard } from '@/components/feature/ArticleCard'
import { articles } from '@/data/articles'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

// A small, curated set of filters (not every tag) keeps the control clean.
// Only filters that actually match at least one article are shown.
const CURATED_FILTERS = [
  'React',
  'Architecture',
  'Design Systems',
  'Performance',
] as const

const filters = [
  'All',
  ...CURATED_FILTERS.filter((f) => articles.some((a) => a.tags.includes(f))),
]

export function ArticlesPage() {
  useDocumentTitle(
    'Articles',
    'Articles by Pasindu Weerakoon on frontend engineering, React architecture, design systems, and engineering leadership.',
  )
  const [tag, setTag] = useState<string>('All')

  const visible = useMemo(
    () =>
      tag === 'All' ? articles : articles.filter((a) => a.tags.includes(tag)),
    [tag],
  )

  return (
    <PageTransition>
      <Section>
        <SectionHeading
          eyebrow="Writing"
          title="Articles"
          subtitle="Long-form notes on engineering, leadership, and building great software."
        />

        <Reveal>
          <div className="filter-bar">
            <Segmented
              size="large"
              value={tag}
              onChange={(value) => setTag(value as string)}
              options={filters}
            />
          </div>
        </Reveal>

        <motion.div className="auto-grid auto-grid--wide" layout>
          <AnimatePresence mode="popLayout">
            {visible.map((article) => (
              <motion.div
                key={article.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="grid-cell"
              >
                <ArticleCard article={article} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>
    </PageTransition>
  )
}
