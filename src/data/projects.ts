import type { Project, ProjectCategory } from './types'

/**
 * Real projects by Pasindu Weerakoon. Replace `cover` with real screenshots
 * and `links` with live URLs / repos as each project goes public.
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
    // Warm brown→amber cover to set this AI project apart from the teal ones.
    cover: 'linear-gradient(135deg, #5c3210 0%, #b85c1e 55%, #e0913f 100%)',
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
    slug: 'readyme-al-exam-app',
    title: 'ReadyMe — A/L Exam Prep Mobile App',
    summary:
      'A cross-platform mobile app that helps Advanced Level (A/L) students prepare for their exams.',
    description:
      'ReadyMe is a mobile app built to help Sri Lankan Advanced Level (A/L) students get exam-ready — giving them a focused, on-the-go way to study and practise for their A/L examinations. Built with React Native so a single codebase ships to both Android and iOS, with a clean, distraction-free UI aimed at students.',
    category: 'Mobile',
    tags: ['React Native', 'Mobile', 'Education', 'Cross-platform'],
    cover: 'linear-gradient(135deg, #0f4e45 0%, #2aa088 100%)',
    links: { caseStudy: '#' },
    metrics: [
      { label: 'Platform', value: 'iOS + Android' },
      { label: 'Built with', value: 'React Native' },
      { label: 'For', value: 'A/L students' },
    ],
  },
  {
    slug: 'math-custom-keyboard',
    title: 'Custom Math Keyboard for Mobile',
    summary:
      'A custom mobile keyboard that lets users type mathematical notation, rendered with MathJax.',
    description:
      'A custom keyboard for mobile that makes typing mathematical notation effortless — users compose equations and math symbols directly from a purpose-built input, with expressions rendered cleanly via MathJax. Built with React Native and JavaScript, backed by custom native modules to implement the keyboard behaviour and bridge platform capabilities the standard layer doesn’t expose.',
    category: 'Mobile',
    tags: ['React Native', 'JavaScript', 'MathJax', 'Native Modules'],
    cover: 'linear-gradient(135deg, #123c36 0%, #1f8a78 100%)',
    links: { caseStudy: '#' },
    metrics: [
      { label: 'Rendering', value: 'MathJax' },
      { label: 'Bridge', value: 'Native modules' },
      { label: 'Platform', value: 'Mobile' },
    ],
  },
  {
    slug: 'ios-subscription-iap',
    title: 'iOS Subscription Service with In-App Purchases',
    summary:
      'An iOS subscription service for purchasing games, with automatic monthly billing via Apple In-App Purchases.',
    description:
      'A subscription service for iOS that lets users purchase games and pay through an auto-renewable subscription — the monthly amount is charged automatically via Apple’s In-App Purchase system. Built with Swift and React Native, handling the IAP flow end to end: product configuration, purchase and restore, receipt handling and subscription lifecycle.',
    category: 'Mobile',
    tags: ['Swift', 'React Native', 'iOS', 'In-App Purchase'],
    cover: 'linear-gradient(160deg, #15695e 0%, #0e2f2a 100%)',
    links: { caseStudy: '#' },
    metrics: [
      { label: 'Billing', value: 'Auto-renew' },
      { label: 'Payments', value: 'Apple IAP' },
      { label: 'Platform', value: 'iOS' },
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
