import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { ArrowRightOutlined, StarFilled } from '@ant-design/icons'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '@/data/profile'
import { Container } from '@/components/common/Container'
import { Magnetic } from '@/components/animations/Magnetic'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Clean, centred showcase hero: a "Hello!" pill, a moderate headline with the
 * name accented, the role as a subtitle, a short pitch and CTAs — then the
 * portrait on a soft colour dome with a small glass experience badge.
 */
export function Hero() {
  const prefersReduced = useReducedMotion()

  const rise = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease, delay },
        }

  return (
    <section className="hero">
      <Container size="wide">
        <div className="hero__stage">
          <div className="hero__copy">
            <motion.span className="hero__hello glass" {...rise(0)}>
              <span className="hero__hello-dot" /> Hello, I’m
            </motion.span>

            <motion.h1 className="hero__headline" {...rise(0.08)}>
              <span className="hero__headline-accent">{profile.name}</span>
            </motion.h1>

            <motion.p className="hero__subtitle" {...rise(0.16)}>
              {profile.title}
            </motion.p>

            <motion.p className="hero__pitch" {...rise(0.24)}>
              I lead engineering teams and architect scalable React platforms —
              turning complex systems into clean, reliable products.
            </motion.p>

            <motion.div className="hero__actions" {...rise(0.32)}>
              <Magnetic>
                <Button type="primary" size="large" shape="round">
                  <Link to="/projects">
                    View Work <ArrowRightOutlined />
                  </Link>
                </Button>
              </Magnetic>
              <Button size="large" shape="round">
                <Link to="/contact">Let’s talk</Link>
              </Button>
            </motion.div>
          </div>

          {/* Portrait on a colour dome */}
          <div className="hero__visual">
            <span className="hero__dome" aria-hidden="true" />
            <motion.div
              className="hero__photo"
              {...(prefersReduced
                ? {}
                : {
                    initial: { opacity: 0, y: 40 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.9, ease, delay: 0.2 },
                  })}
            >
              <img src={profile.portrait} alt={profile.name} />
            </motion.div>

            <motion.div className="hero__badge glass" {...rise(0.5)}>
              <div className="hero__stars" aria-hidden="true">
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
                <StarFilled />
              </div>
              <strong className="hero__stat-value">9+ Years</strong>
              <span className="hero__stat-label">Experience</span>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
