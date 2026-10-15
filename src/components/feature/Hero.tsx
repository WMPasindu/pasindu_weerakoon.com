import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '@/data/profile'
import { Container } from '@/components/common/Container'
import { SocialLinks } from '@/components/common/SocialLinks'
import { scrollToSection } from '@/utils/scroll'

const ease = [0.22, 1, 0.36, 1] as const

/** Four-point sparkle used either side of the top pill. */
function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <path
        d="M12 0c.7 6.3 5 10.6 12 12-7 1.4-11.3 5.7-12 12-.7-6.3-5-10.6-12-12C7 10.6 11.3 6.3 12 0z"
        fill="currentColor"
      />
    </svg>
  )
}

/**
 * Poster-style hero: an outlined name pill, a display headline with the key
 * word highlighted, an oval portrait flanked by tags, and a card carrying the
 * pitch, calls to action and headline numbers.
 */
export function Hero() {
  const prefersReduced = useReducedMotion()

  const rise = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease, delay },
        }

  return (
    <section className="hero">
      <Container>
        <div className="hero__poster">
          <motion.p className="hero__pill" {...rise(0)}>
            <Sparkle />
            <span>{profile.name}</span>
            <Sparkle />
          </motion.p>

          <motion.h1 className="hero__display" {...rise(0.06)}>
            Technical <mark className="hero__mark">Lead</mark>
            <br />
            &amp; Frontend Specialist
          </motion.h1>

          <motion.p className="hero__kicker" {...rise(0.12)}>
            Building scalable React ecosystems &amp; the teams behind them
          </motion.p>

          {/* Portrait with flanking tags */}
          <motion.div className="hero__figure" {...rise(0.18)}>
            <span className="hero__tag hero__tag--left">
              9+ Years Experience
            </span>
            <div className="hero__oval">
              <img src={profile.portrait} alt={profile.name} />
            </div>
            <span className="hero__tag hero__tag--right">
              React &amp; AI Engineering
            </span>
          </motion.div>

          {/* Card overlapping the portrait */}
          <motion.div className="hero__card" {...rise(0.24)}>
            <p className="hero__blurb">{profile.summary}</p>

            <div className="hero__cta">
              <Button
                type="primary"
                size="large"
                shape="round"
                href="#contact"
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection('contact')
                }}
              >
                Work with me <ArrowRightOutlined />
              </Button>
              <Button
                size="large"
                shape="round"
                href="#projects"
                onClick={(event) => {
                  event.preventDefault()
                  scrollToSection('projects')
                }}
              >
                View my work
              </Button>
            </div>

            <div className="hero__facts">
              {profile.stats.slice(0, 3).map((stat) => (
                <div className="hero__fact" key={stat.label}>
                  <span className="hero__fact-value">{stat.value}</span>
                  <span className="hero__fact-label">{stat.label}</span>
                </div>
              ))}
              <div className="hero__socials">
                <SocialLinks size="middle" />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
