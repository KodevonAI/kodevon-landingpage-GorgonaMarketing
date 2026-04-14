import { useState, useEffect, useCallback, useId } from 'react'
import './Testimonials.css'

const TESTIMONIALS = [
  {
    stars: 5,
    text: '"Gorgona transformó completamente nuestra presencia digital. En 4 meses triplicamos nuestras ventas online y logramos posicionarnos como referentes en nuestro sector."',
    name: 'Carlos Mendoza',
    role: 'CEO, TechStart Colombia',
    avatar: 'https://i.pravatar.cc/60?img=10',
  },
  {
    stars: 5,
    text: '"El equipo de Gorgona entiende el negocio, no solo el marketing. Sus reportes son claros y el ROI ha superado todas nuestras expectativas desde el primer mes."',
    name: 'Laura García',
    role: 'Directora de Marketing, RetailPlus',
    avatar: 'https://i.pravatar.cc/60?img=20',
  },
  {
    stars: 5,
    text: '"Pasamos de tener cero presencia en redes a ser la cuenta más seguida de nuestro nicho. El contenido que crean es auténtico y genera conversaciones reales."',
    name: 'Andrés Rodríguez',
    role: 'Fundador, EcoFresh',
    avatar: 'https://i.pravatar.cc/60?img=30',
  },
  {
    stars: 5,
    text: '"La estrategia SEO que implementaron nos llevó al #1 en Google para nuestras palabras clave principales. El tráfico orgánico se multiplicó por 5 en 6 meses."',
    name: 'María Pedraza',
    role: 'Gerente General, ImmobiliariaCo',
    avatar: 'https://i.pravatar.cc/60?img=40',
  },
]

function Stars({ count }) {
  return (
    <div className="testimonial__stars" aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: count }).map((_, i) => (
        <i key={i} className="fas fa-star" aria-hidden="true" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const id = useId()
  const total = TESTIMONIALS.length
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const goTo = useCallback((index) => {
    setCurrent((index + total) % total)
  }, [total])

  // Auto-advance every 5 s — skip if user prefers reduced motion
  useEffect(() => {
    if (prefersReduced) return
    const timer = setTimeout(() => goTo(current + 1), 5000)
    return () => clearTimeout(timer)
  }, [current, goTo, prefersReduced])

  const t = TESTIMONIALS[current]

  return (
    <section className="testimonials" id="testimonios" aria-label="Testimonios de clientes">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">Clientes</span>
          <h2 className="section-title">
            Lo que dicen <span className="accent">de nosotros</span>
          </h2>
        </header>

        {/* Desktop: 2-column grid */}
        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.name}
              className={`testimonial-card reveal delay-${(i % 2) + 1}`}
            >
              <Stars count={t.stars} />
              <p className="testimonial__text">{t.text}</p>
              <div className="testimonial__author">
                <img
                  src={t.avatar}
                  alt={`Foto de ${t.name}`}
                  width="48"
                  height="48"
                  loading="lazy"
                />
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile: single carousel */}
        <div
          className="testimonials__carousel"
          role="region"
          aria-label="Carrusel de testimonios"
          aria-roledescription="carrusel"
        >
          <article
            id={`${id}-slide`}
            className="testimonial-card testimonial-card--carousel"
            aria-live="polite"
            aria-atomic="true"
          >
            <Stars count={t.stars} />
            <p className="testimonial__text">{t.text}</p>
            <div className="testimonial__author">
              <img
                src={t.avatar}
                alt={`Foto de ${t.name}`}
                width="48"
                height="48"
                loading="lazy"
              />
              <div>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          </article>

          <div className="testimonials__controls">
            <button
              className="testimonials__btn"
              aria-label="Testimonio anterior"
              onClick={() => goTo(current - 1)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(current - 1) }
              }}
            >
              <i className="fas fa-chevron-left" aria-hidden="true" />
            </button>

            <div className="testimonials__dots" role="tablist" aria-label="Seleccionar testimonio">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  className={`dot${current === i ? ' active' : ''}`}
                  aria-label={`Testimonio ${i + 1} de ${total}`}
                  aria-selected={current === i}
                  onClick={() => goTo(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i) }
                  }}
                />
              ))}
            </div>

            <button
              className="testimonials__btn"
              aria-label="Siguiente testimonio"
              onClick={() => goTo(current + 1)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(current + 1) }
              }}
            >
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
