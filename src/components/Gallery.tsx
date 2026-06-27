import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

const shots = [
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=800&q=80',
]

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Активную карточку определяем по позиции скролла (карусель на ПК)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const cardWidth = track.scrollWidth / shots.length
      setActive(Math.round(track.scrollLeft / cardWidth))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.max(0, Math.min(shots.length - 1, index))
    const card = track.children[clamped] as HTMLElement | undefined
    card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }

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
              disabled={active === shots.length - 1}
              aria-label="Следующая работа"
            >
              →
            </button>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="gallery" ref={trackRef}>
          {shots.map((src, i) => (
            <div className="gallery__item" key={src}>
              <img src={src} alt={`Пример стрижки ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </Reveal>

      <div className="gallery__dots">
        {shots.map((_, i) => (
          <button
            key={i}
            className="gallery__dot"
            data-active={i === active}
            onClick={() => goTo(i)}
            aria-label={`Перейти к работе ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
