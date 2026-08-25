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
  headline: 'I turn complex systems into clean architecture — and engineers into leaders.',
  bio: [
    'I am a Technical Lead at 1 BillionTech with 9+ years in frontend engineering and architecture. I design React platforms that scale — micro-frontends, mono-repos and design systems — and lead the teams that build them.',
    'My work sits where architecture meets delivery: cutting deployment cycles by 30%, lifting performance 25% on a healthcare platform, and coaching 15+ engineers on TDD and clean architecture.',
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
