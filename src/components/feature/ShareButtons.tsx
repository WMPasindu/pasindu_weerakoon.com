import { useState } from 'react'
import { App, Button, Tooltip } from 'antd'
import { LinkedinFilled, XOutlined, LinkOutlined } from '@ant-design/icons'

interface ShareButtonsProps {
  /** Article title, used as share text. */
  title: string
}

/**
 * Social share row for an article. Uses the current page URL at runtime so the
 * shared link always points at the canonical article page (which is prerendered
 * with article-specific Open Graph tags for a rich preview).
 */
export function ShareButtons({ title }: ShareButtonsProps) {
  const { message } = App.useApp()
  const [url] = useState(() =>
    typeof window !== 'undefined' ? window.location.href : '',
  )

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  const twitter = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      message.success('Link copied to clipboard')
    } catch {
      message.info(url)
    }
  }

  return (
    <div className="share-row">
      <span className="share-row__label">Share</span>
      <Tooltip title="Share on LinkedIn">
        <Button
          shape="circle"
          icon={<LinkedinFilled />}
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        />
      </Tooltip>
      <Tooltip title="Share on X">
        <Button
          shape="circle"
          icon={<XOutlined />}
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
        />
      </Tooltip>
      <Tooltip title="Copy link">
        <Button
          shape="circle"
          icon={<LinkOutlined />}
          onClick={copyLink}
          aria-label="Copy link"
        />
      </Tooltip>
    </div>
  )
}
