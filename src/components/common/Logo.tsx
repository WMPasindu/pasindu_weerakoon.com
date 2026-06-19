import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'

/** Elegant serif wordmark — understated, editorial. */
export function Logo() {
  return (
    <Link to="/" className="brand" aria-label={`${siteConfig.name} — home`}>
      <span className="brand__word">{siteConfig.name}</span>
    </Link>
  )
}
