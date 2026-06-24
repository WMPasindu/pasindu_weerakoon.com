import type { Article } from './types'
import { estimateReadingMinutes } from '@/utils/format'

// Markdown bodies are imported as raw strings via Vite's `?raw` suffix.
// Keeping the body out of this file lets you write articles in real markdown
// with full editor support, while the metadata stays type-checked here.
import reactMigration from '@/content/articles/react-16-to-18-migration.md?raw'
import microFrontendMonorepo from '@/content/articles/micro-frontend-monorepo.md?raw'
import designSystemAdoption from '@/content/articles/design-system-adoption.md?raw'
import ragArchitecture from '@/content/articles/fast-reliable-rag-architecture.md?raw'
import agenticOnPrem from '@/content/articles/agentic-ai-rag-on-prem.md?raw'

type ArticleMeta = Omit<Article, 'readingMinutes'> & {
  readingMinutes?: number
}

const rawArticles: ArticleMeta[] = [
  {
    slug: 'agentic-ai-rag-on-prem',
    title: 'Running Agentic AI with RAG On-Prem: A Practical Setup',
    description:
      'How to host an agentic RAG system on your own hardware — the container stack, secure SSH access and tunnels, the deployment pipeline, and the runtime flow that keeps data inside your network.',
    date: '2026-06-16',
    tags: ['AI', 'RAG', 'DevOps', 'Architecture'],
    cover: 'linear-gradient(135deg, #14332f 0%, #1f8a78 100%)',
    body: agenticOnPrem,
    featured: true,
  },
  {
    slug: 'fast-reliable-rag-architecture',
    title: 'Designing a Fast, Reliable RAG Architecture',
    description:
      'How an agentic RAG pipeline cut response time from ~30–60s to a few seconds — minimising LLM calls, hybrid retrieval, and concurrent, cached availability checks without dropping quality.',
    date: '2026-05-09',
    tags: ['AI', 'RAG', 'Performance', 'Architecture'],
    cover: 'linear-gradient(135deg, #0e2f2a 0%, #15695e 100%)',
    body: ragArchitecture,
    featured: true,
  },
  {
    slug: 'react-16-to-18-migration',
    title: 'Migrating a Large React App from 16 to 18 — Without a Rewrite',
    description:
      'An incremental, low-risk playbook for upgrading a business-critical React app to React 18 and Next.js — and the changes that actually moved performance ~25%.',
    date: '2026-02-20',
    tags: ['React', 'Next.js', 'Performance', 'Architecture'],
    cover: 'linear-gradient(135deg, #15695e 0%, #1f8a78 100%)',
    body: reactMigration,
  },
  {
    slug: 'micro-frontend-monorepo',
    title: 'Micro-Frontends in a Mono-repo: Autonomy Without Chaos',
    description:
      'When micro-frontends are worth it, how to compose them in a Turborepo mono-repo, and the trade-offs that cut our deployment cycles by ~30%.',
    date: '2025-11-15',
    tags: ['Architecture', 'Micro-frontends', 'Mono-repo', 'React'],
    cover: 'linear-gradient(135deg, #14332f 0%, #15695e 70%, #1f8a78 100%)',
    body: microFrontendMonorepo,
  },
  {
    slug: 'design-system-adoption',
    title: 'Building a Design System Teams Actually Adopt',
    description:
      'Why design systems fail on adoption, not components — and how tokens, DX, accessibility and kind versioning drive consistent UI across products.',
    date: '2025-08-22',
    tags: ['Design Systems', 'Frontend', 'Accessibility', 'TypeScript'],
    cover: 'linear-gradient(135deg, #0e2f2a 0%, #1f8a78 100%)',
    body: designSystemAdoption,
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
