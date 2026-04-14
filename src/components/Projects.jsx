import { useState, useCallback } from 'react'
import './Projects.css'

const FILTERS = ['Todos', 'Marketing', 'Branding', 'SEO', 'Web']

const PROJECTS = [
  {
    category: 'Marketing',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=640&q=80',
    alt: 'Pantalla con gráficas de rendimiento de campañas de marketing',
    title: 'Agency Optimization',
    desc: 'Incremento del 200% en leads calificados en 3 meses.',
  },
  {
    category: 'Branding',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=640&q=80',
    alt: 'Diseño de identidad visual y manual de marca',
    title: 'Online Management',
    desc: 'Rediseño de identidad visual con +85% de reconocimiento de marca.',
  },
  {
    category: 'SEO',
    img: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=640&q=80',
    alt: 'Análisis de palabras clave y posicionamiento en buscadores',
    title: 'Technical Agency',
    desc: 'Posicionamiento en top 3 de Google para 40+ keywords objetivo.',
  },
  {
    category: 'Web',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=640&q=80',
    alt: 'Diseño de landing page de alto rendimiento en pantalla',
    title: 'E-commerce Growth',
    desc: 'Landing page con tasa de conversión del 8.3% en campaña de lanzamiento.',
  },
  {
    category: 'Marketing',
    img: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=640&q=80',
    alt: 'Crecimiento de comunidad en redes sociales',
    title: 'Social Growth',
    desc: 'De 5&nbsp;K a 120&nbsp;K seguidores orgánicos en Instagram en 6 meses.',
  },
  {
    category: 'Branding',
    img: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=640&q=80',
    alt: 'Identidad de marca completa para startup tecnológica',
    title: 'Brand Identity',
    desc: 'Manual de marca completo para startup tech con proyección regional.',
  },
]

function ProjectCard({ img, alt, title, desc, category }) {
  const handleScroll = (e) => {
    e.preventDefault()
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <article className="project-card">
      <div className="project-card__img">
        <img
          src={img}
          alt={alt}
          width="640"
          height="420"
          loading="lazy"
        />
        {/* Overlay is decorative — real link is in card body for keyboard/touch */}
        <div className="project-card__overlay" aria-hidden="true">
          <span className="project-tag">{category}</span>
        </div>
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          <span className="project-tag project-tag--inline">{category}</span>
        </div>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc" dangerouslySetInnerHTML={{ __html: desc }} />
        <a
          href="#contacto"
          className="project-card__link"
          onClick={handleScroll}
        >
          Ver caso <i className="fas fa-arrow-right" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

export default function Projects() {
  const [active, setActive] = useState('Todos')

  const filtered = active === 'Todos'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === active)

  const handleFilter = useCallback((filter) => {
    setActive(filter)
  }, [])

  return (
    <section className="projects" id="proyectos" aria-label="Portafolio de proyectos">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">Portafolio</span>
          <h2 className="section-title">
            Nuestros <span className="accent">proyectos</span>
          </h2>
          <p className="section-subtitle">
            Casos de éxito que demuestran resultados reales.
          </p>
        </header>

        <div
          className="projects__filters reveal"
          role="group"
          aria-label="Filtrar proyectos por categoría"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${active === f ? ' active' : ''}`}
              aria-pressed={active === f}
              onClick={() => handleFilter(f)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleFilter(f)
                }
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects__grid" aria-live="polite" aria-atomic="true">
          {filtered.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}
