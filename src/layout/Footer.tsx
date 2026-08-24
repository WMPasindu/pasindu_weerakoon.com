import { Typography } from 'antd'
import { siteConfig } from '@/config/site'
import { profile } from '@/data/profile'
import { Container } from '@/components/common/Container'
import { SocialLinks } from '@/components/common/SocialLinks'

const { Text } = Typography

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <Container>
        <div className="footer__grid">
          <div>
            <p className="footer__cta-eyebrow eyebrow">Have an idea?</p>
            <a href="#contact" className="footer__cta">
              Let’s build something →
            </a>
            <p className="footer__email">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {siteConfig.nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="footer__link">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <Text type="secondary">
            © {year} {siteConfig.name} · {siteConfig.jobTitle} ·{' '}
            {siteConfig.location}
          </Text>
          <SocialLinks size="small" />
        </div>
      </Container>
    </footer>
  )
}
