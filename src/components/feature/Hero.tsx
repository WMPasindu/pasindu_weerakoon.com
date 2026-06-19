import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '@/data/profile'

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Editorial hero banner: an elegant serif greeting sits behind a full-bleed
 * portrait, with the name oversized bottom-left and the role bottom-right —
 * layered for a premium magazine feel.
 */
export function Hero() {
  const prefersReduced = useReducedMotion()
  const anim = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease, delay },
        }

  return (
    <section className="hero">
      {/* Greeting + portrait are direct children of the full-width hero so the
          photo centers to the actual viewport, not the content container. */}
      <motion.h1
        className="hero__greeting"
        {...(prefersReduced
          ? {}
          : {
              initial: { opacity: 0, scale: 0.96 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.9, ease },
            })}
      >
        Hey, there
      </motion.h1>

      <motion.div
        className="hero__portrait"
        {...(prefersReduced
          ? {}
          : {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.9, ease, delay: 0.15 },
            })}
      >
        <span className="hero__portrait-halo" aria-hidden="true" />
        <img src={profile.portrait} alt={profile.name} />
      </motion.div>

      <div className="hero__inner">
        <motion.span className="hero__pill" {...anim(0.4)}>
          <span className="hero__pill-dot" />
          Available for new opportunities
        </motion.span>

        <motion.div className="hero__spec" {...anim(0.5)}>
          <span className="hero__spec-label" aria-hidden="true">
            <span className="hero__spec-rule" /> Focus
          </span>
          <p className="hero__spec-text">
            Crafting scalable <em>React</em> ecosystems —
            <br />
            <em>micro-frontends</em>, <em>design&nbsp;systems</em>,
            <br />
            and cross-platform mobile.
          </p>
        </motion.div>

        <motion.div className="hero__name" {...anim(0.55)}>
          <span className="hero__iam">I&nbsp;am</span>
          <span className="hero__name-big">{profile.firstName}</span>
        </motion.div>

        <motion.div className="hero__role" {...anim(0.6)}>
          <div>Technical</div>
          <div>
            Lead <span className="hero__role-amp">&amp;</span>
          </div>
          <div>Architect</div>
        </motion.div>
      </div>
    </section>
  )
}
