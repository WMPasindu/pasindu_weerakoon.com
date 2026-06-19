import type { Skill, SkillCategory } from './types'

/**
 * Skills inventory from Pasindu Weerakoon's CV.
 * Levels are self-assessed (0–100) and drive the animated proficiency bars.
 */
export const skills: Skill[] = [
  // Languages
  { name: 'TypeScript', category: 'Languages', level: 95 },
  { name: 'JavaScript', category: 'Languages', level: 95 },
  { name: 'Java', category: 'Languages', level: 75 },
  { name: 'Kotlin', category: 'Languages', level: 65 },

  // Frontend
  { name: 'React', category: 'Frontend', level: 96 },
  { name: 'Next.js', category: 'Frontend', level: 88 },
  { name: 'Redux & Context API', category: 'Frontend', level: 90 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 88 },
  { name: 'Material UI', category: 'Frontend', level: 85 },
  { name: 'Micro-frontends', category: 'Frontend', level: 90 },
  { name: 'Mono-repos (Nx / Turborepo)', category: 'Frontend', level: 85 },
  { name: 'Server-Side Rendering', category: 'Frontend', level: 85 },

  // Backend (cross-platform / mobile lives here as "build" platform)
  { name: 'React Native', category: 'Backend', level: 90 },
  { name: 'Flutter', category: 'Backend', level: 70 },
  { name: 'Ionic', category: 'Backend', level: 70 },
  { name: 'Android (Java / Kotlin)', category: 'Backend', level: 78 },
  { name: 'Java Microservices', category: 'Backend', level: 72 },

  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud & DevOps', level: 80 },
  { name: 'Azure', category: 'Cloud & DevOps', level: 75 },
  { name: 'CI/CD Pipelines', category: 'Cloud & DevOps', level: 90 },
  { name: 'Docker', category: 'Cloud & DevOps', level: 82 },
  { name: 'Build Optimisation', category: 'Cloud & DevOps', level: 88 },

  // Leadership
  { name: 'Technical Roadmapping', category: 'Leadership', level: 92 },
  { name: 'Design Systems', category: 'Leadership', level: 92 },
  { name: 'Clean Architecture & SOLID', category: 'Leadership', level: 92 },
  { name: 'Mentorship', category: 'Leadership', level: 90 },
  { name: 'Stakeholder Communication', category: 'Leadership', level: 88 },
  { name: 'TDD / BDD', category: 'Leadership', level: 88 },
]

export const skillCategories: SkillCategory[] = [
  'Languages',
  'Frontend',
  'Backend',
  'Cloud & DevOps',
  'Leadership',
]

export function skillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((skill) => skill.category === category)
}
