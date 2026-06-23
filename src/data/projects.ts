import type { Project, ProjectCategory } from './types'

/**
 * Projects. The first group are real, named products; the rest are
 * representative case studies derived from Pasindu Weerakoon's CV experience.
 * Replace `cover` with real screenshots and `links` with live URLs as each
 * project goes public.
 */
export const projects: Project[] = [
  {
    slug: 'photolocations-lk',
    title: 'PhotoLocations.lk — Photo-Location Booking Marketplace',
    summary:
      'A marketplace for discovering and booking photo-shoot locations across Sri Lanka — weddings, model shoots, events and more.',
    description:
      'A two-sided marketplace where photographers and clients discover, compare and book photo-shoot locations across Sri Lanka, and where location owners list and manage their spaces. Built as an npm-workspaces monorepo with a React 18 + TypeScript + Ant Design client (TanStack Query + Zustand) and a layered Node 20 + Express + TypeScript API (routes → controller → service → repository) with Zod validation and JWT auth. The frontend is server-side rendered with Vite SSR — data is prefetched and dehydrated so pages ship real HTML for SEO and AI crawlers, with per-page meta and JSON-LD (Product, AggregateRating, Breadcrumb). The data layer is modelled in Prisma and abstracted behind repositories so it can move to PostgreSQL without touching business logic.',
    category: 'Web',
    tags: ['React', 'TypeScript', 'Ant Design', 'Node.js', 'Express', 'SSR'],
    cover: 'linear-gradient(135deg, #0e2f2a 0%, #15695e 100%)',
    featured: true,
    links: { caseStudy: '#' },
    metrics: [
      { label: 'Rendering', value: 'Vite SSR' },
      { label: 'Architecture', value: 'Monorepo' },
      { label: 'SEO', value: 'JSON-LD' },
    ],
  },
  {
    slug: 'ai-domain-name-generator',
    title: 'Agentic AI Domain-Name Generator',
    summary:
      'An agentic RAG platform that turns a plain-language prompt into available, on-brand domain names — powered by locally-hosted small language models.',
    description:
      'An agentic Retrieval-Augmented Generation platform that turns a user’s plain-language prompt into ranked, available domain-name suggestions. Built on a LangGraph pipeline where cooperating agents each own a stage: an orchestrator coordinates the flow; query expansion enriches the prompt; semantic retrieval pulls relevant context; a name-generator agent produces candidates in a single constrained-JSON call; a validator agent enforces naming rules and rejects literal or low-quality results; an availability check queries the domain registry; and a ranking agent scores survivors with a weighted composite for relevance and brand fit, looping back to regenerate when needed. Generation runs entirely on small language models hosted locally (Gemma, Mistral or Qwen via Ollama), so nothing leaves the environment. Retrieval uses Weaviate with hybrid search — dense embeddings combined with BM25 — over a curated domain/category corpus; Pydantic enforces structured model output; PostgreSQL persists suggestions. The pipeline is deliberately designed to minimise LLM calls so it stays responsive on CPU-bound local models.',
    category: 'AI',
    tags: ['React', 'Python', 'LangGraph', 'RAG', 'Weaviate', 'PostgreSQL'],
    cover: 'linear-gradient(135deg, #15695e 0%, #1f8a78 100%)',
    featured: true,
    links: { caseStudy: '#' },
    metrics: [
      { label: 'Retrieval', value: 'Dense + BM25' },
      { label: 'Models', value: 'Local SLM' },
      { label: 'Pipeline', value: 'LangGraph' },
    ],
  },
  {
    slug: 'smart-logistics-platform',
    title: 'Smart Logistics Platform',
    summary:
      'An end-to-end platform for organisations to manage their entire logistics flow in one place.',
    description:
      'A logistics management platform that gives organisations a single system to plan, track and manage their entire logistics flow — from orders and shipments through to fulfilment and reporting. Built with a React + JavaScript frontend, a Node.js and Python backend, and PostgreSQL for data, deployed on AWS. Designed around clear domain boundaries so each part of the logistics workflow can scale and evolve independently.',
    category: 'Platform',
    tags: ['React', 'JavaScript', 'Node.js', 'Python', 'PostgreSQL', 'AWS'],
    cover: 'linear-gradient(135deg, #14332f 0%, #15695e 70%, #1f8a78 100%)',
    featured: true,
    links: { caseStudy: '#' },
    metrics: [
      { label: 'Scope', value: 'End-to-end' },
      { label: 'Cloud', value: 'AWS' },
      { label: 'Stack', value: 'Full-stack' },
    ],
  },
  {
    slug: 'healthcare-react-18-migration',
    title: 'Healthcare Platform — React 18 + Next.js Migration',
    summary:
      'Modernised a large-scale healthcare platform from React 16 to React 18 with Next.js, improving performance by 25%.',
    description:
      'Led the modernisation of a clinical-grade healthcare web platform. Owned the migration plan, incremental rollout, and SSR strategy, leveraging React 18 concurrent features and Next.js to lift Core Web Vitals across the board while keeping the team shipping features in parallel.',
    category: 'Web',
    tags: ['React 18', 'Next.js', 'SSR', 'Performance', 'Healthcare'],
    cover: 'linear-gradient(135deg, #0e2f2a 0%, #15695e 100%)',
    links: { caseStudy: '#' },
    metrics: [
      { label: 'Performance lift', value: '+25%' },
      { label: 'Engineers led', value: '8' },
      { label: 'Downtime', value: '0' },
    ],
  },
  {
    slug: 'micro-frontend-platform',
    title: 'Micro-Frontend Platform & Mono-repo',
    summary:
      'Architected a modular frontend platform with mono-repo tooling, giving multiple teams deployment autonomy.',
    description:
      'Designed and rolled out a micro-frontend architecture with a Turborepo-based mono-repo, shared design tokens, and an independent build pipeline per team. Reduced cross-team coordination overhead, enabled parallel releases, and shrank deployment cycles by 30% through CI/CD optimisation.',
    category: 'Platform',
    tags: ['Micro-frontends', 'Mono-repo', 'Turborepo', 'CI/CD'],
    cover: 'linear-gradient(135deg, #123c36 0%, #1f8a78 100%)',
    links: { caseStudy: '#' },
    metrics: [
      { label: 'Deploy cycle', value: '−30%' },
      { label: 'Teams unblocked', value: '5' },
      { label: 'Shared packages', value: '20+' },
    ],
  },
  {
    slug: 'design-system-component-library',
    title: 'Atlas Design System',
    summary:
      'A centralised, accessible UI component library powering multiple web and mobile products across the org.',
    description:
      'Led the creation of an internal design system — tokens, themed components, accessibility-first patterns, and shared documentation. Aligned brand and UX across products, eliminated component reinvention, and gave product teams a faster, more consistent path from design to production.',
    category: 'Platform',
    tags: ['Design System', 'React', 'A11y (WCAG)', 'Tailwind'],
    cover: 'linear-gradient(160deg, #15695e 0%, #0e2f2a 100%)',
    links: { caseStudy: '#' },
    metrics: [
      { label: 'Products served', value: '6+' },
      { label: 'Components', value: '60+' },
      { label: 'A11y baseline', value: 'WCAG AA' },
    ],
  },
  {
    slug: 'fast-search-experience',
    title: 'Search & Filtering Experience',
    summary:
      'Designed a high-throughput search and filtering architecture that cut user-perceived latency by 40%.',
    description:
      'Rebuilt the search and filtering experience on a high-traffic healthcare product. Introduced debounced query orchestration, server-driven pagination, optimistic UI states, and result caching — making the experience feel instant on large datasets.',
    category: 'Web',
    tags: ['React', 'UX', 'Performance', 'Caching'],
    cover: 'linear-gradient(135deg, #14332f 0%, #1f8a78 100%)',
    links: { caseStudy: '#' },
    metrics: [
      { label: 'Latency', value: '−40%' },
      { label: 'P95 query', value: '<250ms' },
    ],
  },
  {
    slug: 'cross-platform-mobile',
    title: 'Cross-Platform Mobile Apps',
    summary:
      'Shipped production cross-platform apps in React Native, Flutter, and Ionic for global clients.',
    description:
      'Designed and built a portfolio of cross-platform mobile applications spanning React Native, Flutter, Ionic, and native Android. Led UI decisions, established automated testing workflows, and partnered with clients across timezones to ensure each release met functional and quality goals.',
    category: 'Mobile',
    tags: ['React Native', 'Flutter', 'Ionic', 'Android'],
    cover: 'linear-gradient(135deg, #0f4e45 0%, #2aa088 100%)',
    links: { caseStudy: '#' },
    metrics: [
      { label: 'Apps shipped', value: '10+' },
      { label: 'Platforms', value: '4' },
    ],
  },
  {
    slug: 'tdd-engineering-culture',
    title: 'TDD & Engineering Quality Programme',
    summary:
      'An org-wide programme to embed TDD, automated testing, and clean architecture across engineering teams.',
    description:
      'Designed and rolled out an engineering quality programme — pairing standards, code-review playbooks, automated test scaffolding with Jest, React Testing Library and Cypress, and reusable architectural patterns rooted in SOLID and clean architecture. Reduced regression incidents and made onboarding measurably faster.',
    category: 'Platform',
    tags: ['TDD', 'Jest', 'React Testing Library', 'Cypress', 'SOLID'],
    cover: 'linear-gradient(160deg, #0e2f2a 0%, #15695e 100%)',
    links: { caseStudy: '#' },
    metrics: [
      { label: 'Engineers coached', value: '15+' },
      { label: 'Coverage uplift', value: '+30 pts' },
    ],
  },
]

export const projectCategories: ProjectCategory[] = [
  'Web',
  'Platform',
  'Mobile',
  'AI',
  'Open Source',
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
