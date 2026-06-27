import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const HERO_IMG =
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=80'

// Сильный ease-out (Emil Kowalski / easing.dev)
const ease = [0.23, 1, 0.32, 1] as const

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Параллакс фото + лёгкое затухание контента при скролле
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <header className="hero" ref={ref}>
      <motion.img
        className="hero__img"
        src={HERO_IMG}
        alt="Активная стрижка в барбершопе"
        style={reduce ? undefined : { y: imgY, scale: imgScale }}
        initial={{ scale: reduce ? 1 : 1.18, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
      />
      <div className="hero__veil" />

      <motion.div
        className="hero__content"
        style={reduce ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <h1 className="hero__title display">
          {['ОСТРО', 'ЧИСТО', 'ТОЧНО'].map((line, i) => (
            <span key={line} style={{ display: 'block', overflow: 'hidden' }}>
              <motion.span
                style={{ display: 'block' }}
                initial={{ y: reduce ? '0%' : '110%', opacity: reduce ? 0 : 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease, delay: 0.3 + i * 0.12 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="hero__sub">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Мужская парикмахерская в центре города. Работаем по записи,
            на стрижку закладываем минимум 40 минут.
          </motion.p>
          <motion.div
            className="hero__scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <span /> листайте вниз
          </motion.div>
        </div>
      </motion.div>
    </header>
  )
}
