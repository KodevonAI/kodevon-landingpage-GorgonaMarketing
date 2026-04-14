import './Process.css'

const STEPS = [
  {
    number: '01',
    icon: 'fa-magnifying-glass-chart',
    title: 'Auditoría',
    text: 'Analizamos en profundidad tu negocio, competencia, audiencia objetivo y presencia digital actual para identificar oportunidades reales de crecimiento.',
    tags: ['Análisis competitivo', 'Diagnóstico SEO', 'Buyer persona'],
  },
  {
    number: '02',
    icon: 'fa-map',
    title: 'Estrategia',
    text: 'Diseñamos un plan 360° personalizado con KPIs claros, canales priorizados, presupuesto optimizado y cronograma de ejecución orientado a resultados.',
    tags: ['KPIs definidos', 'Roadmap 90 días', 'Budget allocation'],
  },
  {
    number: '03',
    icon: 'fa-rocket',
    title: 'Ejecución',
    text: 'Nuestro equipo especializado implementa cada táctica con precisión: contenido, campañas, SEO técnico, creatividades y automatizaciones.',
    tags: ['Contenido creativo', 'Campañas activas', 'SEO técnico'],
  },
  {
    number: '04',
    icon: 'fa-chart-line',
    title: 'Optimización',
    text: 'Medimos cada métrica en tiempo real, ajustamos con datos y escalamos lo que funciona. Reportes semanales con insights accionables.',
    tags: ['Reportes semanales', 'A/B testing', 'Escalamiento'],
  },
]

export default function Process() {
  return (
    <section className="process" id="proceso" aria-label="Nuestro proceso de trabajo">
      <div className="container">
        <header className="section-header reveal">
          <span className="section-label">Cómo trabajamos</span>
          <h2 className="section-title">
            Un proceso diseñado para <span className="accent">ganar</span>
          </h2>
          <p className="section-subtitle">
            Metodología probada en cientos de campañas para generar resultados predecibles.
          </p>
        </header>

        <div className="process__grid">
          {STEPS.map((step, i) => (
            <article
              key={step.number}
              className={`process-card reveal delay-${i + 1}`}
              aria-label={`Paso ${step.number}: ${step.title}`}
            >
              <div className="process-card__top">
                <span className="process-card__num" aria-hidden="true">{step.number}</span>
                <div className="process-card__icon" aria-hidden="true">
                  <i className={`fas ${step.icon}`} />
                </div>
              </div>
              <h3 className="process-card__title">{step.title}</h3>
              <p className="process-card__text">{step.text}</p>
              <ul className="process-card__tags" aria-label={`Incluye: ${step.tags.join(', ')}`}>
                {step.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              {i < STEPS.length - 1 && (
                <div className="process-card__connector" aria-hidden="true" />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
