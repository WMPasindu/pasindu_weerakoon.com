import { Button, Tooltip } from 'antd'
import {
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  MailOutlined,
  MediumOutlined,
  DribbbleOutlined,
} from '@ant-design/icons'
import type { ComponentType } from 'react'
import { profile } from '@/data/profile'
import type { SocialLink } from '@/data/types'

const iconMap: Record<SocialLink['icon'], ComponentType> = {
  github: GithubOutlined,
  linkedin: LinkedinOutlined,
  twitter: TwitterOutlined,
  mail: MailOutlined,
  medium: MediumOutlined,
  dribbble: DribbbleOutlined,
}

interface SocialLinksProps {
  size?: 'small' | 'middle' | 'large'
}

/** Renders the profile's social links as accessible icon buttons. */
export function SocialLinks({ size = 'middle' }: SocialLinksProps) {
  return (
    <div style={{ display: 'inline-flex', gap: 8 }}>
      {profile.socials.map((social) => {
        const Icon = iconMap[social.icon]
        const isMail = social.icon === 'mail'
        return (
          <Tooltip key={social.label} title={social.label}>
            <Button
              shape="circle"
              size={size}
              type="text"
              href={social.href}
              target={isMail ? undefined : '_blank'}
              rel={isMail ? undefined : 'noopener noreferrer'}
              aria-label={social.label}
              icon={<Icon />}
            />
          </Tooltip>
        )
      })}
    </div>
  )
}
