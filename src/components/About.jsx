import './About.css'

const CHECKLIST = [
  'Estrategias basadas en datos reales',
  'Equipo especializado y certificado',
  'Reportes transparentes y medibles',
  'Soporte dedicado 24/7',
]

export default function About() {
  const handleScroll = (e) => {
    e.preventDefault()
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="about" id="nosotros" aria-label="Nosotros">
      <div className="container about__inner">

        <div className="about__visual reveal-left">
          <div className="about__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=640&q=80"
              alt="Equipo de Gorgona Marketing trabajando en estrategias digitales"
              width="640"
              height="480"
              loading="lazy"
            />
            <div className="about__badge" aria-label="Agencia Top Colombia 2024">
              <i className="fas fa-award" aria-hidden="true" />
              <div>
                <strong>Agencia Top</strong>
                <span>Colombia 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about__content reveal-right">
          <span className="section-label">Quiénes somos</span>
          <h2 className="section-title">
            Estrategia digital con{' '}
            <span className="accent">propósito</span>
          </h2>
          <p className="about__text">
            En Gorgona Marketing no creemos en fórmulas genéricas. Cada cliente
            tiene una historia única y merece una estrategia diseñada a la medida.
            Combinamos datos, creatividad y tecnología para llevar tu marca al
            siguiente nivel.
          </p>
          <ul className="about__list" aria-label="Nuestras ventajas">
            {CHECKLIST.map((item) => (
              <li key={item}>
                <i className="fas fa-circle-check" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <a href="#contacto" className="btn btn--primary" onClick={handleScroll}>
            Conoce al equipo
          </a>
        </div>

      </div>
    </section>
  )
}
