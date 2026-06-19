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

const allTags = Array.from(new Set(articles.flatMap((a) => a.tags))).sort()

export function ArticlesPage() {
  useDocumentTitle('Articles')
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
              options={['All', ...allTags]}
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
