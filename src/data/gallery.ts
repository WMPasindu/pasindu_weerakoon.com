import type { GalleryImage } from './types'

/**
 * The gallery is content you publish — images with a title and a short,
 * meaningful description. The placeholder art in /public/gallery is generated
 * by `scripts/generate-placeholders.mjs`; swap `src` for your own photos.
 */
export const gallery: GalleryImage[] = [
  {
    id: 'g1',
    title: 'Whiteboard, 7am',
    description:
      'The architecture sketch that became Atlas. Sometimes the best diagrams never make it into a doc.',
    src: '/gallery/shot-1.svg',
    tags: ['Process', 'Architecture'],
    span: 'tall',
  },
  {
    id: 'g2',
    title: 'Ship day',
    description:
      'The quiet minute after a big release goes green. Hard-won and worth savoring.',
    src: '/gallery/shot-2.svg',
    tags: ['Team', 'Moments'],
    span: 'wide',
  },
  {
    id: 'g3',
    title: 'Conference talk',
    description:
      'Speaking on building motion that respects users — the talk that became an article.',
    src: '/gallery/shot-3.svg',
    tags: ['Speaking'],
    span: 'normal',
  },
  {
    id: 'g4',
    title: 'Late-night debugging',
    description:
      'A race condition that hid for three weeks. The fix was four lines; finding it was the work.',
    src: '/gallery/shot-4.svg',
    tags: ['Engineering'],
    span: 'normal',
  },
  {
    id: 'g5',
    title: 'Mentoring session',
    description:
      'Pairing with a junior engineer on their first system design. Watching it click never gets old.',
    src: '/gallery/shot-5.svg',
    tags: ['Mentorship', 'Team'],
    span: 'wide',
  },
  {
    id: 'g6',
    title: 'Golden hour',
    description:
      'Stepping away from the screen. Perspective is a feature, not a distraction.',
    src: '/gallery/shot-6.svg',
    tags: ['Life'],
    span: 'tall',
  },
]

export const galleryTags = Array.from(
  new Set(gallery.flatMap((image) => image.tags)),
).sort()
