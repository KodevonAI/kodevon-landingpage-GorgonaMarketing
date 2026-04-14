import './CTABanner.css'

export default function CTABanner() {
  const handleScroll = (e) => {
    e.preventDefault()
    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="cta-banner" aria-label="Llamada a la acción">
      <div className="cta-banner__glow" aria-hidden="true" />
      <div className="container cta-banner__inner reveal">
        <div>
          <h2 className="cta-banner__title">
            ¿Listo para hacer <span className="accent">WOW</span> a tus clientes?
          </h2>
          <p className="cta-banner__subtitle">
            Agenda una llamada gratuita y descubre cómo podemos crecer juntos.
          </p>
        </div>
        <div className="cta-banner__actions">
          <a href="tel:+573000000000" className="btn btn--primary btn--lg">
            <i className="fas fa-phone" aria-hidden="true" /> Llamar ahora
          </a>
          <a href="#contacto" className="btn btn--outline btn--lg" onClick={handleScroll}>
            Escribirnos
          </a>
        </div>
      </div>
    </section>
  )
}
