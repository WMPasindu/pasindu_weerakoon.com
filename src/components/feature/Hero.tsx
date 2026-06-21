import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { StarFilled } from '@ant-design/icons'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '@/data/profile'
import { Container } from '@/components/common/Container'
import { SocialLinks } from '@/components/common/SocialLinks'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Showcase hero modelled on the reference: an intro on the left ("Hy! I Am" +
 * name in gold, years + socials below, with a dashed arrow), a circular framed
 * portrait in the centre, and a tagline + glass credential card + script
 * sign-off on the right.
 */
export function Hero() {
  const prefersReduced = useReducedMotion()

  const rise = (delay: number, x = 0) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 24, x },
          animate: { opacity: 1, y: 0, x: 0 },
          transition: { duration: 0.7, ease, delay },
        }

  return (
    <section className="hero">
      <Container size="wide">
        <div className="hero__stage">
          {/* Left — intro */}
          <div className="hero__left">
            <motion.div {...rise(0.05, -20)}>
              <p className="hero__hi">Hy! I Am</p>
              <h1 className="hero__name">
                {profile.firstName}
                <span className="hero__name-dot">.</span>
              </h1>
            </motion.div>

            <motion.span
              className="hero__arrow"
              aria-hidden="true"
              {...rise(0.5)}
            >
              <svg viewBox="0 0 220 130" width="100%" height="100%">
                <path
                  d="M210 14 C150 -6 70 24 96 78 C108 104 150 104 150 78 C150 58 120 60 110 84 C100 108 60 120 18 110"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="2 12"
                />
                <path
                  d="M30 96 L16 112 L36 118"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>

            <motion.div className="hero__exp" {...rise(0.35)}>
              <span className="hero__exp-num">9+</span>
              <span className="hero__exp-text">
                Years
                <br />
                Experience
              </span>
            </motion.div>

            <motion.div className="hero__socials" {...rise(0.45)}>
              <SocialLinks size="middle" />
            </motion.div>
          </div>

          {/* Center — circular portrait */}
          <motion.div
            className="hero__portrait"
            {...(prefersReduced
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.94 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.9, ease, delay: 0.15 },
                })}
          >
            <div className="hero__portrait-ring">
              <img src={profile.portrait} alt={profile.name} />
            </div>
          </motion.div>

          {/* Right — tagline, credential card, sign-off */}
          <div className="hero__right">
            <motion.p className="hero__tagline" {...rise(0.2, 20)}>
              I build scalable systems and lead great teams,
              <br />
              and I love what I do.
            </motion.p>

            <motion.div className="hero__cred glass" {...rise(0.4)}>
              <div className="hero__cred-top">
                <span className="hero__cred-label">Trusted experience</span>
                <span className="hero__stars" aria-hidden="true">
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                  <StarFilled />
                </span>
              </div>
              <div className="hero__cred-bottom">
                <span className="hero__cred-meta">
                  15+ engineers led · 9+ years
                </span>
                <strong className="hero__cred-score">5.0</strong>
              </div>
            </motion.div>

            <motion.div className="hero__signoff" {...rise(0.55)}>
              <span className="hero__signoff-script">Technical</span>
              <span className="hero__signoff-bold">Lead.</span>
            </motion.div>

            <motion.div className="hero__cv" {...rise(0.6)}>
              <Button type="primary" size="large" shape="round">
                <Link to="/contact">Let’s talk</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
