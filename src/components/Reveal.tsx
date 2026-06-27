import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

// Сильный ease-out (Emil Kowalski / easing.dev)
const EASE_OUT = [0.23, 1, 0.32, 1] as const

/** Плавное появление снизу при попадании во вьюпорт */
export default function Reveal({ children, delay = 0, y = 40, className }: Props) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
