import './Services.css'

const SERVICES = [
  {
    icon: 'fa-magnifying-glass',
    title: 'Search Engine Optimization',
    text: 'Posicionamos tu negocio en los primeros resultados de Google con estrategias SEO técnicas, de contenido y link building que generan tráfico orgánico sostenible.',
    featured: false,
  },
  {
    icon: 'fa-share-nodes',
    title: 'Social Media Strategy',
    text: 'Construimos comunidades reales y generamos engagement auténtico en Instagram, TikTok, Facebook y LinkedIn con contenido estratégico y campañas de paid media.',
    featured: true,
  },
  {
    icon: 'fa-chart-pie',
    title: 'Reporting & Analysis',
    text: 'Dashboards en tiempo real y reportes detallados para que siempre sepas el rendimiento de cada peso invertido. Decisiones basadas en datos, no suposiciones.',
    featured: false,
  },
  {
    icon: 'fa-palette',
    title: 'Branding & Identidad',
    text: 'Diseñamos marcas memorables con identidad visual sólida: logotipo, manual de marca, línea gráfica y tono de comunicación coherente en todos los canales.',
    featured: false,
  },
  {
    icon: 'fa-globe',
    title: 'Desarrollo Web',
    text: 'Sitios web y landing pages de alto rendimiento, optimizados para conversión, velocidad y SEO. Tu presencia digital con impacto desde el primer clic.',
    featured: false,
  },
  {
    icon: 'fa-bullseye',
    title: 'Paid Media & Ads',
    text: 'Campañas de Google Ads, Meta Ads y TikTok Ads con segmentación precisa y optimización continua para maximizar el retorno de inversión publicitaria.',
    featured: false,
  },
]

function ServiceCard({ icon, title, text, featured, delay }) {
  const handleScroll = (e) => {
    e.preventDefault()
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <article
      className={`service-card reveal${featured ? ' service-card--featured' : ''} delay-${delay}`}
      aria-label={title}
    >
      <div className="service-card__icon" aria-hidden="true">
        <i className={`fas ${icon}`} />
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__text">{text}</p>
      <a href="#contacto" className="service-card__link" onClick={handleScroll}>
        Saber más <i className="fas fa-arrow-right" aria-hidden="true" />
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
            Soluciones digitales integrales para hacer crecer tu negocio.
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
