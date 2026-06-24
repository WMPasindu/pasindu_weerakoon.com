import type { GalleryImage } from './types'

/**
 * The gallery is content you publish — moments with a title and a short
 * description. Items with a single image render as a photo; items with several
 * images render as an auto-sliding, swipeable collection in one card.
 */
export const gallery: GalleryImage[] = [
  {
    id: 'birthday',
    title: 'Birthday at 1BillionTech',
    description:
      'A surprise birthday cake from the team at 1BillionTech — the kind of small moment that makes a workplace feel like home.',
    images: ['/gallery/birthday-1.jpg', '/gallery/birthday-2.jpg'],
    tags: ['Moments', 'Team'],
    span: 'tall',
  },
  {
    id: 'team-outings',
    title: 'Team Outings',
    description:
      'Getting out of the office with the team — from the Lotus Tower to good company beyond the desk.',
    images: ['/gallery/team-lotus-tower.jpg', '/gallery/team-ogf.jpg'],
    tags: ['Team', 'Travel'],
    span: 'wide',
  },
  {
    id: 'camping-ella',
    title: 'Camping in Ella',
    description:
      'Nights under the stars in Ella — trading screens for hills, mist and a campfire.',
    images: ['/gallery/camping-ella.jpg', '/gallery/camping-ella-night.jpg'],
    tags: ['Travel', 'Outdoors'],
    span: 'tall',
  },
  {
    id: 'msc',
    title: 'MSc Graduation',
    description:
      'Completing my MSc in Information Technology — a milestone years in the making.',
    images: ['/gallery/msc.jpg'],
    tags: ['Milestones'],
    span: 'normal',
  },
  {
    id: 'family-time',
    title: 'Family Time',
    description:
      'The people who keep everything in perspective. Time with family is time well spent.',
    images: ['/gallery/family-time.jpg'],
    tags: ['Life'],
    span: 'normal',
  },
  {
    id: 'uni-friends',
    title: 'Chilling with Uni Friends',
    description:
      'Catching up with the friends who were there from the very beginning.',
    images: ['/gallery/uni-friends.jpg'],
    tags: ['Life', 'Friends'],
    span: 'wide',
  },
  {
    id: 'movie-office',
    title: 'Movie Time with Office Friends',
    description:
      'A movie night out with the office crew — the best teams play together too.',
    images: ['/gallery/movie-office.jpg'],
    tags: ['Team', 'Friends'],
    span: 'normal',
  },
]

export const galleryTags = Array.from(
  new Set(gallery.flatMap((image) => image.tags)),
).sort()
