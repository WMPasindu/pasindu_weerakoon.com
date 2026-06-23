import type { Article } from './types'
import { estimateReadingMinutes } from '@/utils/format'

// Markdown bodies are imported as raw strings via Vite's `?raw` suffix.
// Keeping the body out of this file lets you write articles in real markdown
// with full editor support, while the metadata stays type-checked here.
import reactMigration from '@/content/articles/react-16-to-18-migration.md?raw'
import microFrontendMonorepo from '@/content/articles/micro-frontend-monorepo.md?raw'
import designSystemAdoption from '@/content/articles/design-system-adoption.md?raw'

type ArticleMeta = Omit<Article, 'readingMinutes'> & {
  readingMinutes?: number
}

const rawArticles: ArticleMeta[] = [
  {
    slug: 'react-16-to-18-migration',
    title: 'Migrating a Large React App from 16 to 18 — Without a Rewrite',
    description:
      'An incremental, low-risk playbook for upgrading a business-critical React app to React 18 and Next.js — and the changes that actually moved performance ~25%.',
    date: '2026-05-12',
    tags: ['React', 'Next.js', 'Performance', 'Architecture'],
    cover: 'linear-gradient(135deg, #0e2f2a 0%, #15695e 100%)',
    body: reactMigration,
    featured: true,
  },
  {
    slug: 'micro-frontend-monorepo',
    title: 'Micro-Frontends in a Mono-repo: Autonomy Without Chaos',
    description:
      'When micro-frontends are worth it, how to compose them in a Turborepo mono-repo, and the trade-offs that cut our deployment cycles by ~30%.',
    date: '2026-04-08',
    tags: ['Architecture', 'Micro-frontends', 'Mono-repo', 'React'],
    cover: 'linear-gradient(135deg, #15695e 0%, #1f8a78 100%)',
    body: microFrontendMonorepo,
    featured: true,
  },
  {
    slug: 'design-system-adoption',
    title: 'Building a Design System Teams Actually Adopt',
    description:
      'Why design systems fail on adoption, not components — and how tokens, DX, accessibility and kind versioning drive consistent UI across products.',
    date: '2026-02-26',
    tags: ['Design Systems', 'Frontend', 'Accessibility', 'TypeScript'],
    cover: 'linear-gradient(135deg, #14332f 0%, #15695e 70%, #1f8a78 100%)',
    body: designSystemAdoption,
    featured: true,
  },
]

/** Articles enriched with derived fields and sorted newest-first. */
export const articles: Article[] = rawArticles
  .map((article) => ({
    ...article,
    readingMinutes:
      article.readingMinutes ?? estimateReadingMinutes(article.body),
  }))
  .sort((a, b) => b.date.localeCompare(a.date))

export const featuredArticles = articles.filter((a) => a.featured)

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}
