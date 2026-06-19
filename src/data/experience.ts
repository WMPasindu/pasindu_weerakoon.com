import type { ExperienceItem } from './types'

/**
 * Career history sourced from Pasindu Weerakoon's CV.
 * Ordered newest-first.
 */
export const experience: ExperienceItem[] = [
  {
    role: 'Technical Lead',
    company: '1 BillionTech (Pvt) Limited',
    period: 'Aug 2025 — Present',
    location: 'Colombo, Sri Lanka',
    description:
      'Define the frontend architectural roadmap for enterprise-grade products, balancing rapid feature delivery with long-term maintainability.',
    highlights: [
      'Architected modular frontend systems using micro-frontends and mono-repo structures, improving code sharing and deployment autonomy across multiple engineering teams.',
      'Established engineering standards centred on Test-Driven Development with Jest and React Testing Library, significantly reducing technical debt.',
      'Achieved a 30% reduction in deployment cycles through automated CI/CD and build-tool optimisation.',
    ],
    tags: ['React', 'TypeScript', 'Micro-frontends', 'Mono-repo', 'CI/CD', 'Leadership'],
  },
  {
    role: 'Associate Technical Lead',
    company: '1 BillionTech (Pvt) Limited',
    period: 'Apr 2023 — Aug 2025',
    location: 'Colombo, Sri Lanka',
    description:
      'Drove the adoption of modern React patterns and TypeScript across the organisation to ensure type safety and architectural consistency.',
    highlights: [
      'Led the development of a centralised UI component library with accessibility and brand alignment across multiple web and mobile products.',
      'Represented the technical perspective in planning sessions, communicating complex architectural trade-offs to senior business stakeholders.',
      'Coached and mentored engineers through code review, design reviews, and pairing sessions.',
    ],
    tags: ['React', 'TypeScript', 'Design Systems', 'Mentorship'],
  },
  {
    role: 'Senior Software Engineer',
    company: '1 Billion Tech',
    period: 'Jun 2022 — Apr 2023',
    location: 'Colombo, Sri Lanka',
    description:
      'Led the modernisation of a large-scale healthcare platform and senior-level feature engineering.',
    highlights: [
      'Orchestrated the migration of a healthcare platform from React 16 to React 18 with Next.js, improving performance metrics by 25%.',
      'Designed and implemented complex search and filtering architectures, reducing user-perceived latency by 40%.',
      'Acted as a technical coach for mid-level developers, focusing on SOLID principles and automated testing strategies.',
    ],
    tags: ['React 18', 'Next.js', 'Performance', 'SOLID'],
  },
  {
    role: 'Software Engineer',
    company: 'Allion Technologies (Pvt) Limited',
    period: 'Jan 2021 — Jun 2022',
    location: 'Colombo, Sri Lanka',
    description:
      'Built and maintained high-performance cross-platform applications with React Native and React.js.',
    highlights: [
      'Led UI design decisions and established automated testing workflows for high-quality production releases.',
      'Collaborated directly with clients to gather requirements and communicate project status across cross-functional teams.',
    ],
    tags: ['React Native', 'React', 'UI', 'Testing'],
  },
  {
    role: 'Software Engineer',
    company: 'Virtusa (Pvt) Limited',
    period: 'Jan 2019 — Jan 2021',
    location: 'Colombo, Sri Lanka',
    description:
      'Developed Java microservices and Angular frontends for global enterprise clients.',
    highlights: [
      'Engaged in full-lifecycle Agile delivery, with strong focus on unit testing and comprehensive documentation.',
      'Worked with overseas clients in Agile teams, providing daily status updates, estimations, and requirements analysis.',
      'Wrote comprehensive test cases and resolved bugs to maintain a high quality bar.',
    ],
    tags: ['Java', 'Microservices', 'Angular', 'Agile'],
  },
  {
    role: 'Associate Software Engineer',
    company: 'Allion Technologies (Pvt) Limited',
    period: 'Apr 2018 — Jan 2019',
    location: 'Colombo, Sri Lanka',
    description:
      'Developed mobile applications across Android, React Native, Flutter, iOS, and Ionic platforms.',
    highlights: [
      'Managed the full software lifecycle — planning through deployment, testing, bug fixing, and client-driven enhancements.',
    ],
    tags: ['Android', 'React Native', 'Flutter', 'iOS', 'Ionic'],
  },
  {
    role: 'Associate Software Engineer',
    company: 'XGEN Group (Pvt) Ltd',
    period: 'Sep 2017 — Mar 2018',
    location: 'Colombo, Sri Lanka',
    description:
      'Built a financial Android tablet application for a major Sri Lankan finance organisation.',
    highlights: [
      'Integrated third-party libraries (Retrofit, OkHttpClient, AwesomeValidation) and Android APIs for location tracking and advanced features.',
      'Mentored an intern developer and collaborated with UI/UX engineers to ensure high usability and design standards.',
    ],
    tags: ['Android', 'Java', 'Kotlin', 'Retrofit'],
  },
  {
    role: 'Software Engineering Intern',
    company: 'SoftVessel (Pvt) Limited',
    period: 'Apr 2017 — Sep 2017',
    location: 'Kiribathgoda, Sri Lanka',
    description:
      'Developed and maintained a POS Android application for mobile phones and tablets.',
    highlights: [
      'Introduced tablet-specific features and integrated Android APIs for location tracking and camera.',
      'Improved memory management and local storage for a smoother in-store experience.',
    ],
    tags: ['Android', 'Java'],
  },
]
