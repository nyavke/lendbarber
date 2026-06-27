import Reveal from './Reveal'

const shots = [
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
]

export default function Gallery() {
  return (
    <section id="work">
      <Reveal>
        <p className="eyebrow">02 / Работы</p>
      </Reveal>
      <div className="gallery">
        {shots.map((src, i) => (
          <Reveal key={src} delay={i * 0.12} className="gallery__item">
            <img src={src} alt={`Работа мастера ${i + 1}`} loading="lazy" />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
