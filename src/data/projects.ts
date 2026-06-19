import type { Project, ProjectCategory } from './types'

/**
 * Representative projects derived from Pasindu Weerakoon's CV experience.
 * Covers double as case studies for the work — replace `cover` with real
 * screenshots and `links` with live URLs whenever a project goes public.
 */
export const projects: Project[] = [
  {
    slug: 'healthcare-react-18-migration',
    title: 'Healthcare Platform — React 18 + Next.js Migration',
    summary:
      'Modernised a large-scale healthcare platform from React 16 to React 18 with Next.js, improving performance by 25%.',
    description:
      'Led the modernisation of a clinical-grade healthcare web platform. Owned the migration plan, incremental rollout, and SSR strategy, leveraging React 18 concurrent features and Next.js to lift Core Web Vitals across the board while keeping the team shipping features in parallel.',
    category: 'Web',
    tags: ['React 18', 'Next.js', 'SSR', 'Performance', 'Healthcare'],
    cover: 'linear-gradient(135deg, #3a2418 0%, #d65a31 100%)',
    featured: true,
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
    cover: 'linear-gradient(135deg, #5c3a23 0%, #e8924a 100%)',
    featured: true,
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
    cover: 'linear-gradient(160deg, #d65a31 0%, #3a2418 100%)',
    featured: true,
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
    cover: 'linear-gradient(135deg, #2a1a10 0%, #b8431f 100%)',
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
    cover: 'linear-gradient(135deg, #8a4a25 0%, #e8924a 100%)',
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
    cover: 'linear-gradient(160deg, #3a2418 0%, #d65a31 100%)',
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
