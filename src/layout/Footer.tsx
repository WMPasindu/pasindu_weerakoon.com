import { Link } from 'react-router-dom'
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
            <Link to="/contact" className="footer__cta">
              Let’s build something →
            </Link>
            <p className="footer__email">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {siteConfig.nav.map((item) => (
              <Link key={item.to} to={item.to} className="footer__link">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <Text type="secondary">
            © {year} {siteConfig.name}. Built with React, TypeScript & Ant
            Design.
          </Text>
          <SocialLinks size="small" />
        </div>
      </Container>
    </footer>
  )
}
