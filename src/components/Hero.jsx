import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import './Hero.css'

export default function Hero() {
  useReveal()

  const handleScroll = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero" id="hero" aria-label="Inicio">
      <div className="hero__bg-blob hero__bg-blob--1" aria-hidden="true" />
      <div className="hero__bg-blob hero__bg-blob--2" aria-hidden="true" />

      <div className="container hero__inner">
        {/* Content */}
        <div className="hero__content reveal">
          <span className="hero__badge" aria-label="Agencia de Marketing Digital">
            <span className="badge-dot" aria-hidden="true" />
            Agencia de Marketing Digital
          </span>

          <h1 className="hero__title">
            Marketing digital<br />
            que genera{' '}
            <span className="accent">resultados reales</span>
          </h1>

          <p className="hero__subtitle">
            Transformamos el impacto de tus redes sociales en valor real
            para tu negocio. Campañas personalizadas con ROI medible desde
            el primer día.
          </p>

          <div className="hero__actions">
            <a
              href="#contacto"
              className="btn btn--primary btn--lg"
              onClick={(e) => handleScroll(e, '#contacto')}
            >
              Empezar ahora
            </a>
            <a
              href="#proyectos"
              className="btn btn--ghost btn--lg"
              onClick={(e) => handleScroll(e, '#proyectos')}
            >
              Ver proyectos
            </a>
          </div>

          <div className="hero__proof">
            <div className="proof__avatars" aria-hidden="true">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${i}`}
                  alt=""
                  width="38"
                  height="38"
                />
              ))}
            </div>
            <p className="proof__text">
              <strong>+87&nbsp;K clientes</strong> confían en nosotros
            </p>
          </div>
        </div>

        {/* Visual */}
        <div className="hero__visual reveal-right delay-2" aria-hidden="true">
          <div className="visual__card visual__card--main">
            <div className="card-dots">
              <span className="card-dot card-dot--r" />
              <span className="card-dot card-dot--y" />
              <span className="card-dot card-dot--g" />
            </div>
            <div className="visual__chart">
              {[40, 65, 45, 80, 55, 95].map((h, i) => (
                <div
                  key={i}
                  className={`chart-bar${i === 5 ? ' chart-bar--active' : ''}`}
                  style={{ '--h': `${h}%` }}
                />
              ))}
            </div>
            <p className="visual__card-label">+150% conversiones este mes</p>
          </div>

          <div className="visual__float visual__float--1">
            <i className="fas fa-rocket" aria-hidden="true" />
            <span>ROI +300%</span>
          </div>
          <div className="visual__float visual__float--2">
            <i className="fas fa-chart-line" aria-hidden="true" />
            <span>Campaña activa</span>
          </div>

          <div className="visual__orb visual__orb--1" />
          <div className="visual__orb visual__orb--2" />
        </div>
      </div>
    </section>
  )
}
