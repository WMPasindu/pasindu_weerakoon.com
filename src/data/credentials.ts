/**
 * Academic credentials, certifications and awards from the CV.
 * Rendered on the About page.
 */

export interface EducationItem {
  degree: string
  field: string
  institution: string
  period: string
}

export const education: EducationItem[] = [
  {
    degree: 'MSc Information Technology',
    field: 'Enterprise Application Development',
    institution: 'SLIIT (Sri Lanka Institute of Information Technology)',
    period: 'Jan 2021 — Dec 2022',
  },
  {
    degree: 'BSc (Hons) Information Technology',
    field: 'Specializing in Information Technology',
    institution: 'SLIIT (Sri Lanka Institute of Information Technology)',
    period: 'Jan 2014 — Dec 2018',
  },
]

export const certifications: string[] = [
  'Android Development Masterclass',
  'Blockchain & Cryptocurrency',
]

export const awards: string[] = [
  'TMT East Hackathon Winner — Cloud Technologies',
]
