import type { Article } from './types'
import { estimateReadingMinutes } from '@/utils/format'

// Markdown bodies are imported as raw strings via Vite's `?raw` suffix.
// Keeping the body out of this file lets you write articles in real markdown
// with full editor support, while the metadata stays type-checked here.
import scalingFrontendTeams from '@/content/articles/scaling-frontend-teams.md?raw'
import animationsThatRespectUsers from '@/content/articles/animations-that-respect-users.md?raw'
import fromEngineerToTechLead from '@/content/articles/from-engineer-to-tech-lead.md?raw'

type ArticleMeta = Omit<Article, 'readingMinutes'> & {
  readingMinutes?: number
}

const rawArticles: ArticleMeta[] = [
  {
    slug: 'scaling-frontend-teams',
    title: 'Scaling Frontend Teams Without Slowing Down',
    description:
      'How design systems, explicit boundaries, and fast feedback keep a growing frontend team shipping.',
    date: '2026-04-18',
    tags: ['Leadership', 'Architecture', 'Frontend'],
    cover: 'linear-gradient(135deg, #3a2418 0%, #d65a31 100%)',
    body: scalingFrontendTeams,
    featured: true,
  },
  {
    slug: 'animations-that-respect-users',
    title: 'Animations That Respect Your Users',
    description:
      'A practical guide to building motion that is smooth, purposeful, and accessible.',
    date: '2026-03-02',
    tags: ['Frontend', 'Animation', 'Accessibility'],
    cover: 'linear-gradient(160deg, #5c3a23 0%, #e8924a 100%)',
    body: animationsThatRespectUsers,
    featured: true,
  },
  {
    slug: 'from-engineer-to-tech-lead',
    title: 'From Engineer to Tech Lead: What Actually Changes',
    description:
      'The real shift when you move into technical leadership — and the skills nobody tells you to build.',
    date: '2026-01-21',
    tags: ['Leadership', 'Career'],
    cover: 'linear-gradient(135deg, #8a4a25 0%, #e8924a 100%)',
    body: fromEngineerToTechLead,
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
