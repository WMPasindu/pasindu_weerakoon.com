import { Typography } from 'antd'
import { motion, useReducedMotion } from 'framer-motion'
import type { Skill } from '@/data/types'

const { Text } = Typography

interface SkillBarProps {
  skill: Skill
}

/** Proficiency bar that fills with a spring the first time it scrolls in. */
export function SkillBar({ skill }: SkillBarProps) {
  const prefersReduced = useReducedMotion()

  return (
    <div className="skill-bar">
      <div className="skill-bar__head">
        <Text strong>{skill.name}</Text>
        <Text type="secondary">{skill.level}%</Text>
      </div>
      <div className="skill-bar__track">
        <motion.div
          className="skill-bar__fill"
          initial={prefersReduced ? false : { width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: 'spring', stiffness: 60, damping: 18 }}
        />
      </div>
    </div>
  )
}
