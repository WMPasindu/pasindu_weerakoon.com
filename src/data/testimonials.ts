export interface Testimonial {
  /** Recommender's name. */
  name: string
  /** Their headline / role at the time of writing. */
  title: string
  /** How they worked with Pasindu, e.g. "Worked on the same team". */
  relationship: string
  /** Date the recommendation was given. */
  date: string
  /** The recommendation text, as written. */
  quote: string
}

/**
 * LinkedIn recommendations received. Quoted from the recommendations on
 * https://www.linkedin.com/in/pasindu-weerakoon — only obvious typos are
 * corrected; the wording is otherwise the recommender's own.
 */
export const testimonials: Testimonial[] = [
  {
    name: 'Pulasthi Aberathne',
    title: 'Senior FullStack Developer @ BizGrow Digital | CIMA, CGMA',
    relationship: 'Worked with Pasindu on the same team',
    date: 'September 2023',
    quote:
      'I have had the privilege of working closely with Pasindu Weerakoon on multiple projects, and I can confidently say that he is an exceptional professional with a unique blend of skills and qualities that make him a standout colleague. Pasindu’s leadership skills are truly exemplary. His ability to inspire and guide the team towards achieving our goals has been instrumental in our project successes. He leads by example and consistently demonstrates dedication and commitment to every task he undertakes.',
  },
  {
    name: 'Hiran Dissanayake',
    title:
      'Lead QA Engineer | Delivery & Release Coordinator | CSP-PO | Google PM Professional',
    relationship: 'Worked with Pasindu on the same team',
    date: 'November 2020',
    quote:
      'I rarely come across real talents who stand out like Pasindu. I had the pleasure of working with Pasindu for two years at Virtusa, collaborating on several technologies. Pasindu’s ability to handle multiple projects/tasks was unlike any I’ve seen before and made a dramatic increase in the productivity level of our project. No matter how tense a meeting, Pasindu made sure everyone left with a smile.',
  },
  {
    name: 'Rajitha Perera',
    title: 'Senior Software Engineer at e-Jan Networks Co. | Writer',
    relationship: 'Managed Pasindu directly',
    date: 'September 2018',
    quote:
      'I was particularly impressed by Pasindu’s ability to handle multiple Mobile Application Projects effortlessly. That skill often takes years to develop among Mobile Application developers, but it seemed to come perfectly naturally to him. I heartily recommend Pasindu and would like to work continuously.',
  },
  {
    name: 'Lakshan Jayakody',
    title: 'Senior Lead Software Engineer',
    relationship: 'Studied together with Pasindu',
    date: 'September 2018',
    quote:
      'I had the privilege of working with Pasindu for more than a year. He is a proactive, result oriented, responsible and technically sound person. He has exceptional troubleshooting and analytical skills in a wide range of technologies. He is a great asset that a company should have.',
  },
  {
    name: 'Vidura Adikari',
    title:
      'Founder | SoftVessel · Technical Product Manager, Agile & Software Engineering Coach',
    relationship: 'Managed Pasindu directly',
    date: 'September 2018',
    quote:
      'Pasindu has a great attitude towards the software development industry and he is very keen on learning new technology, getting experience on best practices in software engineering and delivering clean code on time. I worked with Pasindu in 2017 and he arrived very early to work, then started working promptly and finished what he started. He adapts to any challenge with a calm and cool mindset.',
  },
]
