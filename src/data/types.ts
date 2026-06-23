/**
 * Shared domain types for the portfolio content layer.
 * Keeping these centralized makes the data files self-documenting and
 * guarantees every page consumes a consistent, type-safe shape.
 */

export interface SocialLink {
  label: string
  href: string
  /** Key used to resolve an icon in the UI layer. */
  icon: 'github' | 'linkedin' | 'twitter' | 'mail' | 'medium' | 'dribbble'
}

export interface Profile {
  name: string
  /** First name shown oversized in the editorial hero banner. */
  firstName: string
  /** Short headline shown in the hero, e.g. "Technical Lead & Software Engineer". */
  title: string
  /** Role rendered bottom-right in the hero, one word per line. */
  roleLines: string[]
  /** Short specialization line shown top-right in the hero banner. */
  specialization: string
  /** Path to the cut-out portrait used in the hero (PNG with transparency). */
  portrait: string
  /** A few rotating phrases (kept for reuse on other surfaces). */
  taglines: string[]
  location: string
  email: string
  phone?: string
  /** One-paragraph elevator pitch. */
  summary: string
  /** Longer bio paragraphs for the About page. */
  bio: string[]
  avatar: string
  resumeUrl?: string
  socials: SocialLink[]
  /** Headline stats rendered on the hero / about. */
  stats: { label: string; value: string }[]
}

export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Cloud & DevOps'
  | 'Leadership'

export interface Skill {
  name: string
  category: SkillCategory
  /** Proficiency 0-100, used for the animated proficiency bars. */
  level: number
}

export interface ExperienceItem {
  role: string
  company: string
  /** e.g. "2022 — Present" */
  period: string
  location: string
  description: string
  highlights: string[]
  tags: string[]
}

export type ProjectCategory =
  | 'Web'
  | 'Platform'
  | 'Mobile'
  | 'Open Source'
  | 'AI'

export interface Project {
  slug: string
  title: string
  summary: string
  description: string
  category: ProjectCategory
  tags: string[]
  cover: string
  /** Marks the project for the "featured" home section. */
  featured?: boolean
  /** Client engagement (vs. an internal case study); shows a subtle label. */
  clientProject?: boolean
  links: {
    live?: string
    repo?: string
    caseStudy?: string
  }
  /** Quantified outcomes a technical lead would care about. */
  metrics?: { label: string; value: string }[]
}

export interface Article {
  slug: string
  title: string
  description: string
  /** ISO date string. */
  date: string
  readingMinutes: number
  tags: string[]
  cover: string
  /** Markdown body imported via Vite `?raw`. */
  body: string
  featured?: boolean
}

export interface GalleryImage {
  id: string
  title: string
  description: string
  src: string
  tags: string[]
  /** Aspect-ratio hint for the masonry layout. */
  span?: 'tall' | 'wide' | 'normal'
}
