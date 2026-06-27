import Reveal from './Reveal'

const items = [
  { name: 'Классическая стрижка', desc: 'Тип стрижки', price: '₽1800' },
  { name: 'Стрижка + борода', desc: 'Тип стрижки', price: '₽2600' },
  { name: 'Королевское бритьё', desc: 'Тип стрижки', price: '₽2000' },
  { name: 'Камуфляж седины', desc: 'Тип стрижки', price: '₽1500' },
]

export default function Services() {
  return (
    <section id="services">
      <div className="services__head">
        <Reveal>
          <p className="eyebrow">01 / Прайс</p>
          <h2 className="display">Услуги</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ maxWidth: 300, color: 'var(--grey)', fontSize: 14, lineHeight: 1.6 }}>
            Записывайтесь заранее. Свободные окна обычно разбирают за пару дней.
          </p>
        </Reveal>
      </div>

      {items.map((s, i) => (
        <Reveal key={s.name} delay={i * 0.06}>
          <div className="service">
            <span className="service__num">0{i + 1}</span>
            <div>
              <div className="service__name display">{s.name}</div>
              <p className="service__desc">{s.desc}</p>
            </div>
            <span className="service__price">{s.price}</span>
          </div>
        </Reveal>
      ))}
    </section>
  )
}
