import { motion } from 'framer-motion'
import Reveal from './Reveal'

const text = 'Стрижём, бреем и приводим бороду в порядок с 2012 года.'
const words = text.split(' ')

const features = [
  { k: '12', t: 'лет стрижём в этом районе' },
  { k: '40 мин', t: 'закладываем на каждого клиента' },
  { k: '6', t: 'мастеров работают посменно всю неделю' },
]

const info = [
  {
    label: 'Адрес',
    value: 'ул. Лезвия, 12',
    note: 'Первый этаж, отдельный вход со двора',
  },
  {
    label: 'Часы',
    value: '10:00 — 22:00',
    note: 'Ежедневно, без выходных',
  },
  {
    label: 'Телефон',
    value: <a href="tel:+70000000000">+7 000 000-00-00</a>,
    note: 'Звонок или сообщение в мессенджер',
  },
  {
    label: 'Запись',
    value: <a href="#contact">Онлайн 24/7</a>,
    note: 'Подтверждение в течение 10 минут',
  },
]

export default function Quote() {
  return (
    <section className="statement">
      <Reveal>
        <p className="eyebrow">03 / О нас</p>
      </Reveal>

      <h2 className="statement__quote display">
        {words.map((w, i) => (
          <motion.span
            key={i}
            className={`word ${i >= 4 ? 'accent' : ''}`}
            initial={{ opacity: 0.14 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
          >
            {w}&nbsp;
          </motion.span>
        ))}
      </h2>

      <Reveal>
        <div className="features">
          {features.map((f) => (
            <div key={f.k} className="feature">
              <div className="feature__k">{f.k}</div>
              <p className="feature__t">{f.t}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="plate" style={{ marginTop: 'clamp(40px, 6vh, 80px)' }}>
          {info.map((cell) => (
            <div key={cell.label} className="plate__cell">
              <div className="plate__label">{cell.label}</div>
              <div className="plate__value">{cell.value}</div>
              <p className="plate__note">{cell.note}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
