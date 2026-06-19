/** Formatting helpers shared across the content surfaces. */

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`
}

/** Estimate reading time from raw markdown at ~200 wpm. */
export function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}
