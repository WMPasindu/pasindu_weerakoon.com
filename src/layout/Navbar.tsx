import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button, Drawer } from 'antd'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { Logo } from '@/components/common/Logo'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { Container } from '@/components/common/Container'
import { useIsMobile } from '@/hooks/useMediaQuery'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = siteConfig.nav.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.to === '/'}
      className={({ isActive }) =>
        `nav-link${isActive ? ' nav-link--active' : ''}`
      }
      onClick={() => setOpen(false)}
    >
      {item.label}
    </NavLink>
  ))

  return (
    <motion.header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container>
        <div className="navbar__inner">
          <Logo />

          {!isMobile && <nav className="navbar__links">{links}</nav>}

          <div className="navbar__actions">
            <ThemeToggle />
            {!isMobile && (
              <Button type="primary" shape="round">
                <Link to="/contact">Let’s talk</Link>
              </Button>
            )}
            {isMobile && (
              <Button
                type="text"
                shape="circle"
                aria-label="Open menu"
                icon={<MenuOutlined />}
                onClick={() => setOpen(true)}
              />
            )}
          </div>
        </div>
      </Container>

      <Drawer
        placement="right"
        open={open && isMobile}
        onClose={() => setOpen(false)}
        closeIcon={<CloseOutlined />}
        title={siteConfig.shortName}
        width={280}
      >
        <nav className="navbar__drawer-links">{links}</nav>
        <Button
          type="primary"
          block
          shape="round"
          style={{ marginTop: 24 }}
          onClick={() => setOpen(false)}
        >
          <Link to="/contact">Let’s talk</Link>
        </Button>
      </Drawer>
    </motion.header>
  )
}
