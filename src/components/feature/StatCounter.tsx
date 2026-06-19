import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { Typography } from 'antd'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const { Text } = Typography

interface StatCounterProps {
  /** e.g. "8+", "99.9%", "300k+" — leading number animates, rest is preserved. */
  value: string
  label: string
}

/** Splits a stat into its leading number and suffix so the number can count up. */
function parse(value: string): {
  target: number
  prefix: string
  suffix: string
  decimals: number
} {
  const match = value.match(/^(\D*)([\d.]+)(.*)$/)
  if (!match) return { target: 0, prefix: '', suffix: value, decimals: 0 }
  const [, prefix, num, suffix] = match
  const decimals = num.includes('.') ? num.split('.')[1].length : 0
  return { target: parseFloat(num), prefix, suffix, decimals }
}

/** Animated, count-up statistic used on the hero and about page. */
export function StatCounter({ value, label }: StatCounterProps) {
  const prefersReduced = usePrefersReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const { target, prefix, suffix, decimals } = parse(value)
  const [display, setDisplay] = useState(
    prefersReduced ? value : `${prefix}0${suffix}`,
  )

  useEffect(() => {
    if (prefersReduced || !inView) return
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`)
      },
    })
    return () => controls.stop()
  }, [inView, prefersReduced, target, prefix, suffix, decimals])

  return (
    <div className="stat" ref={ref}>
      <span className="stat__value gradient-text">{display}</span>
      <Text type="secondary" className="stat__label">
        {label}
      </Text>
    </div>
  )
}
