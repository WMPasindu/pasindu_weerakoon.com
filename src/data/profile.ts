import type { Profile } from './types'

/**
 * Personal profile. Sourced from Pasindu Weerakoon's CV — edit here to update
 * the hero, about page, footer and contact surfaces in one place.
 */
export const profile: Profile = {
  name: 'Pasindu Weerakoon',
  firstName: 'Pasindu',
  title: 'Technical Lead · React & Frontend Architect',
  roleLines: ['Technical', 'Lead &', 'Architect'],
  specialization:
    'Specialized in React, Frontend Architecture, Micro-frontends, Design Systems, and Cross-Platform Mobile.',
  // Drop a cut-out PNG (transparent background) at public/portrait.png for the
  // floating editorial look, or a JPG at public/portrait.jpg for a framed photo.
  portrait: '/portrait.png',
  taglines: [
    'I lead teams that ship.',
    'I architect frontends that scale.',
    'I turn complexity into clean systems.',
    'I grow engineers into leaders.',
  ],
  location: 'Colombo, Western Province, Sri Lanka',
  email: 'wmpasindu@gmail.com',
  phone: '+94 71 583 6036',
  summary:
    'Strategic Senior Technical Lead with 9+ years in frontend engineering and architectural design — building scalable web ecosystems in React, leading multi-team units of 15+ engineers, and aligning technical roadmaps with business goals.',
  bio: [
    'I am a Technical Lead and frontend architect with over nine years of experience building scalable web and cross-platform mobile products. I currently lead frontend engineering at 1 BillionTech, where I define the architectural roadmap for enterprise-grade products and shape the engineering culture across multiple teams.',
    'My focus is the intersection of architecture and delivery — micro-frontends, mono-repos, design systems, and the testing and CI practices that let teams move fast without breaking things. I have led the migration of a large healthcare platform from React 16 to React 18 with Next.js (improving performance ~25%), cut deployment cycles by 30% with CI/CD optimisation, and reduced user-perceived latency by 40% on critical search experiences.',
    'Beyond the code, I care deeply about people. I mentor mid-level and senior engineers, run TDD/clean-architecture programmes, and represent the technical voice with senior business stakeholders. I hold an MSc in IT (Enterprise Application Development) and a BSc Hons in IT, both from SLIIT.',
  ],
  avatar: '/avatar.svg',
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/pasindu-weerakoon',
      icon: 'linkedin',
    },
    { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
    { label: 'Email', href: 'mailto:wmpasindu@gmail.com', icon: 'mail' },
  ],
  stats: [
    { label: 'Years of experience', value: '9+' },
    { label: 'Engineers led', value: '15+' },
    { label: 'Deployment time cut', value: '30%' },
    { label: 'Latency reduced', value: '40%' },
  ],
}
