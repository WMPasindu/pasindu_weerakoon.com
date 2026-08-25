import { useCallback, useEffect, useState } from 'react'
import { Button, Drawer } from 'antd'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { siteConfig } from '@/config/site'
import { Logo } from '@/components/common/Logo'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { Container } from '@/components/common/Container'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { scrollToSection } from '@/utils/scroll'

const SECTION_IDS = siteConfig.nav.map((item) => item.id)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the section currently nearest the top of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback((id: string) => {
    setOpen(false)
    scrollToSection(id)
  }, [])

  const links = siteConfig.nav.map((item) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      className={`nav-link${active === item.id ? ' nav-link--active' : ''}`}
      onClick={(event) => {
        event.preventDefault()
        goTo(item.id)
      }}
    >
      {item.label}
    </a>
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
          <a
            href="#top"
            onClick={(event) => {
              event.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              window.history.replaceState(null, '', '/')
            }}
          >
            <Logo />
          </a>

          {!isMobile && <nav className="navbar__links">{links}</nav>}

          <div className="navbar__actions">
            <ThemeToggle />
            {!isMobile && (
              <Button
                type="primary"
                shape="round"
                onClick={() => goTo('contact')}
              >
                Let’s talk
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
          onClick={() => goTo('contact')}
        >
          Let’s talk
        </Button>
      </Drawer>
    </motion.header>
  )
}
