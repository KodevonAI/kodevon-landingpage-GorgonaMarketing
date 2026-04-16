import { useState, useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'
import './Hero.css'

const CYCLING_WORDS = ['resultados', 'conversiones', 'comunidades', 'crecimiento']

const SPARK_POINTS = '0,65 23.6,55 47.3,60 70.9,48 94.5,52 118.2,42 141.8,46 165.5,35 189.1,28 212.7,22 236.4,15 260,8'
const SPARK_AREA   = `0,70 ${SPARK_POINTS} 260,70`

const PLATFORMS = [
  { icon: 'fa-instagram',  label: 'Instagram',  cls: 'plat--ig' },
  { icon: 'fa-tiktok',     label: 'TikTok',     cls: 'plat--tt' },
  { icon: 'fa-google',     label: 'Google Ads', cls: 'plat--gg' },
  { icon: 'fa-meta',       label: 'Meta Ads',   cls: 'plat--meta' },
  { icon: 'fa-linkedin-in', label: 'LinkedIn',  cls: 'plat--li' },
]

function CyclingWord() {
  const [idx, setIdx] = useState(0)
  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (prefersReduced.current) return
    const t = setInterval(() => setIdx((i) => (i + 1) % CYCLING_WORDS.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <span className="hero__cycling" aria-label={CYCLING_WORDS[idx]}>
      <span key={idx} className="hero__cycling-word">{CYCLING_WORDS[idx]}</span>
    </span>
  )
}

function DashboardVisual() {
  return (
    <div className="dashboard" role="img" aria-label="Panel de campaña activa mostrando métricas de marketing">
      {/* Header */}
      <div className="dashboard__header">
        <div className="dashboard__mac-dots" aria-hidden="true">
          <span /><span /><span />
        </div>
        <span className="dashboard__title">Campaign Dashboard</span>
        <span className="dashboard__live" aria-label="Campaña en vivo">
          <span className="live-pulse" aria-hidden="true" />
          En vivo
        </span>
      </div>

      {/* Sparkline chart */}
      <div className="dashboard__chart-wrap">
        <div className="dashboard__chart-label">
          <span>Conversiones</span>
          <strong className="chart-delta">↑ +150%</strong>
        </div>
        <svg
          viewBox="0 0 260 70"
          className="dashboard__sparkline"
          aria-hidden="true"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="sparkAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#2ec990" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#2ec990" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={SPARK_AREA} fill="url(#sparkAreaGrad)" />
          <polyline
            points={SPARK_POINTS}
            fill="none"
            stroke="#2ec990"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="260" cy="8" r="4" fill="#2ec990" />
          <circle cx="260" cy="8" r="7" fill="#2ec990" opacity="0.2" className="dot-pulse-ring" />
        </svg>
      </div>

      {/* KPI pills */}
      <div className="dashboard__kpis">
        {[
          { label: 'CTR',   value: '8.3%',  delta: '↑ 2.1%' },
          { label: 'ROAS',  value: '4.2x',  delta: '↑ 0.8x' },
          { label: 'Conv.', value: '+150%', delta: '↑ vs mes' },
        ].map((k) => (
          <div className="kpi-pill" key={k.label}>
            <span className="kpi-pill__value">{k.value}</span>
            <span className="kpi-pill__label">{k.label}</span>
            <span className="kpi-pill__delta">{k.delta}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="dashboard__goal">
        <div className="dashboard__goal-header">
          <span>Meta mensual</span>
          <strong>78%</strong>
        </div>
        <div className="dashboard__goal-track" aria-hidden="true">
          <div className="dashboard__goal-fill" style={{ '--w': '78%' }} />
        </div>
      </div>

      {/* Active platforms */}
      <div className="dashboard__platforms">
        <span className="platforms-label">Canales activos:</span>
        <div className="platforms-icons">
          {PLATFORMS.map((p) => (
            <span key={p.label} className={`plat-icon ${p.cls}`} title={p.label}>
              <i className={`fab ${p.icon}`} aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      {/* Activity feed */}
      <div className="dashboard__feed">
        <div className="feed-item">
          <span className="feed-icon feed-icon--ig">
            <i className="fab fa-instagram" aria-hidden="true" />
          </span>
          <div className="feed-body">
            <strong>+12&nbsp;K seguidores</strong>
            <span>Esta semana en Instagram</span>
          </div>
          <span className="feed-badge feed-badge--up">↑</span>
        </div>
        <div className="feed-item">
          <span className="feed-icon feed-icon--mint">
            <i className="fas fa-bullseye" aria-hidden="true" />
          </span>
          <div className="feed-body">
            <strong>Nueva conversión</strong>
            <span>Google Ads — hace 2&nbsp;min</span>
          </div>
          <span className="feed-dot-live" aria-hidden="true" />
        </div>
        <div className="feed-item">
          <span className="feed-icon feed-icon--gold">
            <i className="fas fa-dollar-sign" aria-hidden="true" />
          </span>
          <div className="feed-body">
            <strong>$2.3&nbsp;M gestionados</strong>
            <span>Inversión publicitaria total</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  useReveal()

  const handleScroll = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="hero" id="hero" aria-label="Inicio">
      {/* Background layer */}
      <div className="hero__dot-grid" aria-hidden="true" />
      <div className="hero__blob hero__blob--1" aria-hidden="true" />
      <div className="hero__blob hero__blob--2" aria-hidden="true" />
      <div className="hero__blob hero__blob--3" aria-hidden="true" />

      <div className="container hero__inner">
        {/* ── Left: Copy ── */}
        <div className="hero__copy reveal">
          <div className="hero__eyebrow">
            <span className="hero__badge">
              <span className="badge-pulse" aria-hidden="true" />
              Agencia de Marketing Digital
            </span>
            <span className="hero__award" aria-label="Top Agency Colombia 2024">
              <i className="fas fa-trophy" aria-hidden="true" /> Top Agency CO 2024
            </span>
          </div>

          <h1 className="hero__title">
            Marketing digital<br />
            que genera{' '}
            <CyclingWord />
          </h1>

          <p className="hero__subtitle">
            Transformamos el impacto de tus redes sociales en valor real para
            tu negocio. Campañas personalizadas con ROI medible desde el primer día.
          </p>

          <div className="hero__actions">
            <a
              href="#contacto"
              className="btn btn--primary btn--lg"
              onClick={(e) => handleScroll(e, '#contacto')}
            >
              Empezar ahora
              <i className="fas fa-arrow-right" aria-hidden="true" />
            </a>
            <a
              href="#proyectos"
              className="btn btn--ghost btn--lg"
              onClick={(e) => handleScroll(e, '#proyectos')}
            >
              <i className="fas fa-play" aria-hidden="true" />
              Ver proyectos
            </a>
          </div>

          {/* Social proof */}
          <div className="hero__proof">
            <div className="proof__avatars" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${i}`}
                  alt=""
                  width="36"
                  height="36"
                />
              ))}
            </div>
            <div className="proof__body">
              <div className="proof__stars" aria-label="5 estrellas" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <i key={i} className="fas fa-star" aria-hidden="true" />
                ))}
              </div>
              <p className="proof__text">
                <strong>+87&nbsp;K clientes</strong> — calificación&nbsp;5.0
              </p>
            </div>
          </div>

          {/* Partners strip */}
          <div className="hero__partners">
            <span className="partners-label">Partners oficiales:</span>
            <div className="partners-logos">
              <span className="partner-logo"><i className="fab fa-google" aria-hidden="true" /> Google</span>
              <span className="partner-logo"><i className="fab fa-meta" aria-hidden="true" /> Meta</span>
              <span className="partner-logo"><i className="fab fa-tiktok" aria-hidden="true" /> TikTok</span>
            </div>
          </div>
        </div>

        {/* ── Right: Dashboard Visual ── */}
        <div className="hero__visual reveal-right delay-2">
          <DashboardVisual />
        </div>
      </div>

    </section>
  )
}
