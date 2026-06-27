import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Quote from './components/Quote'
import CTA from './components/CTA'

export default function App() {
  return (
    <>
      <nav className="nav">
        <div className="nav__logo">NOIR</div>
        <ul className="nav__links">
          <li><a href="#services">Услуги</a></li>
          <li><a href="#work">Работы</a></li>
          <li><a href="#contact">Запись</a></li>
        </ul>
      </nav>

      <main>
        <Hero />
        <Services />
        <Gallery />
        <Quote />
        <CTA />
      </main>

      <footer>
        <span>NOIR Barbershop</span>
        <span>ул. Лезвия, 12 · 10:00–22:00</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </>
  )
}
