import Reveal from './Reveal'

export default function CTA() {
  return (
    <section id="contact" className="cta">
      <Reveal>
        <p className="eyebrow">04 / Запись</p>
        <h2 className="display">К креслу</h2>
        <a className="btn" href="tel:+70000000000">
          Записаться
        </a>
      </Reveal>
    </section>
  )
}
