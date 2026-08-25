import { Button } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '@/data/profile'
import { Container } from '@/components/common/Container'
import { SocialLinks } from '@/components/common/SocialLinks'
import { scrollToSection } from '@/utils/scroll'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Clean, professional two-column hero: an introduction, role, summary, CTAs,
 * a few key facts and social links on the left; a framed portrait on the
 * right. Restrained motion only — a single fade-up on load.
 */
export function Hero() {
  const prefersReduced = useReducedMotion()

  const rise = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, ease, delay },
        }

  return (
    <section className="hero">
      <Container size="wide">
        <div className="hero__grid">
          <div className="hero__intro">
            <motion.p className="hero__eyebrow" {...rise(0)}>
              Software Engineer · Technical Lead
            </motion.p>
            <motion.h1 className="hero__title" {...rise(0.06)}>
              {profile.name}
            </motion.h1>
            <motion.p className="hero__role" {...rise(0.12)}>
              {profile.title}
            </motion.p>
            <motion.p className="hero__summary" {...rise(0.18)}>
              {profile.summary}
            </motion.p>

            <motion.div className="hero__cta" {...rise(0.24)}>
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
            </motion.div>

            <motion.div className="hero__facts" {...rise(0.3)}>
              {profile.stats.slice(0, 3).map((stat) => (
                <div className="hero__fact" key={stat.label}>
                  <span className="hero__fact-value">{stat.value}</span>
                  <span className="hero__fact-label">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div className="hero__socials" {...rise(0.36)}>
              <SocialLinks size="middle" />
            </motion.div>
          </div>

          <motion.div
            className="hero__photo"
            {...(prefersReduced
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.98 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.7, ease, delay: 0.15 },
                })}
          >
            <img src={profile.portrait} alt={profile.name} />
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
