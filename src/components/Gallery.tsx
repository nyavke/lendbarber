import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import Reveal from './Reveal'

const shots = [
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=800&q=80',
]

const AUTOPLAY_MS = 3200
// Сколько карточек видно одновременно (совпадает с CSS: flex-basis на 3 в ряд)
const PER_VIEW = 3
// Достижимые позиции прокрутки: 6 фото при 3 видимых = 4 позиции
const PAGES = Math.max(1, shots.length - PER_VIEW + 1)

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()

  // Прокрутка трека по горизонтали (страницу по вертикали не двигает)
  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const target = Math.max(0, Math.min(PAGES - 1, index))
    const cardWidth = track.scrollWidth / shots.length
    track.scrollTo({ left: cardWidth * target, behavior: 'smooth' })
  }

  // Активную позицию определяем по скроллу, ограничивая числом реальных позиций
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const cardWidth = track.scrollWidth / shots.length
      setActive(Math.min(PAGES - 1, Math.round(track.scrollLeft / cardWidth)))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  // Автопрокрутка: только на ПК (карусель), не при reduced-motion, пауза на ховере
  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 721px)').matches
    if (paused || reduce || !isDesktop) return
    const id = window.setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % PAGES
        goTo(next)
        return next
      })
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [paused, reduce])

  return (
    <section id="work">
      <Reveal>
        <div className="gallery__head">
          <p className="eyebrow" style={{ margin: 0 }}>
            02 / Работы
          </p>
          <div className="gallery__nav">
            <button
              className="gallery__btn"
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              aria-label="Предыдущая работа"
            >
              ←
            </button>
            <button
              className="gallery__btn"
              onClick={() => goTo(active + 1)}
              disabled={active === PAGES - 1}
              aria-label="Следующая работа"
            >
              →
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div
          className="gallery"
          ref={trackRef}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {shots.map((src, i) => (
            <div className="gallery__item" key={src}>
              <img src={src} alt={`Пример стрижки ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </Reveal>

      <div className="gallery__dots">
        {Array.from({ length: PAGES }, (_, i) => (
          <button
            key={i}
            className="gallery__dot"
            data-active={i === active}
            onClick={() => goTo(i)}
            aria-label={`Позиция ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
