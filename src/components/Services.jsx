import './Services.css'

const SERVICES = [
  {
    icon: 'fa-magnifying-glass',
    title: 'Search Engine Optimization',
    result: '+120% tráfico orgánico',
    text: 'Posicionamos tu negocio en los primeros resultados de Google con estrategias SEO técnicas, de contenido y link building que generan tráfico orgánico sostenible.',
    tags: ['Auditoría técnica', 'Link building', 'Contenido SEO'],
    featured: false,
  },
  {
    icon: 'fa-share-nodes',
    title: 'Social Media Strategy',
    result: '+5K seguidores/mes',
    text: 'Construimos comunidades reales y generamos engagement auténtico en Instagram, TikTok, Facebook y LinkedIn con contenido estratégico y campañas de paid media.',
    tags: ['Content calendar', 'Paid social', 'Community mgmt'],
    featured: true,
  },
  {
    icon: 'fa-chart-pie',
    title: 'Reporting & Analysis',
    result: 'Decisiones en tiempo real',
    text: 'Dashboards en tiempo real y reportes detallados para que siempre sepas el rendimiento de cada peso invertido. Decisiones basadas en datos, no suposiciones.',
    tags: ['Dashboard 24/7', 'KPI tracking', 'Reportes semanales'],
    featured: false,
  },
  {
    icon: 'fa-palette',
    title: 'Branding & Identidad',
    result: '+85% reconocimiento',
    text: 'Diseñamos marcas memorables con identidad visual sólida: logotipo, manual de marca, línea gráfica y tono de comunicación coherente en todos los canales.',
    tags: ['Logotipo', 'Manual de marca', 'Línea gráfica'],
    featured: false,
  },
  {
    icon: 'fa-globe',
    title: 'Desarrollo Web',
    result: 'Hasta 8.3% conversión',
    text: 'Sitios web y landing pages de alto rendimiento, optimizados para conversión, velocidad y SEO. Tu presencia digital con impacto desde el primer clic.',
    tags: ['Landing pages', 'Core Web Vitals', 'CRO'],
    featured: false,
  },
  {
    icon: 'fa-bullseye',
    title: 'Paid Media & Ads',
    result: 'ROAS promedio 4.2x',
    text: 'Campañas de Google Ads, Meta Ads y TikTok Ads con segmentación precisa y optimización continua para maximizar el retorno de inversión publicitaria.',
    tags: ['Google Ads', 'Meta Ads', 'TikTok Ads'],
    featured: false,
  },
]

function ServiceCard({ icon, title, result, text, tags, featured, delay }) {
  const handleScroll = (e) => {
    e.preventDefault()
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <article
      className={`service-card reveal delay-${delay}${featured ? ' service-card--featured' : ''}`}
      aria-label={title}
    >
      {featured && <span className="service-card__popular" aria-label="Servicio más popular">Popular</span>}

      <div className="service-card__head">
        <div className="service-card__icon" aria-hidden="true">
          <i className={`fas ${icon}`} />
        </div>
        <span className="service-card__result" aria-label={`Resultado típico: ${result}`}>
          <i className="fas fa-arrow-trend-up" aria-hidden="true" />
          {result}
        </span>
      </div>

      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__text">{text}</p>

      <ul className="service-card__tags" aria-label={`Incluye: ${tags.join(', ')}`}>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      <a href="#contacto" className="service-card__link" onClick={handleScroll}>
        Solicitar servicio <i className="fas fa-arrow-right" aria-hidden="true" />
      </a>
    </article>
  )
}

export default function Services() {
  return (
    <section className="services" id="servicios" aria-label="Nuestros servicios">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">Lo que hacemos</span>
          <h2 className="section-title">
            Nuestros <span className="accent">servicios</span>
          </h2>
          <p className="section-subtitle">
            Soluciones digitales integrales para hacer crecer tu negocio con resultados medibles.
          </p>
        </header>

        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} delay={(i % 3) + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
