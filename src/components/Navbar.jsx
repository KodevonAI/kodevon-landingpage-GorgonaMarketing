import { useState, useEffect, useCallback } from 'react'
import './Navbar.css'

const NAV_LINKS = [
  { href: '#hero',       label: 'Inicio' },
  { href: '#nosotros',   label: 'Nosotros' },
  { href: '#servicios',  label: 'Servicios' },
  { href: '#proyectos',  label: 'Proyectos' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault()
    closeMenu()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [closeMenu])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a
          href="#hero"
          className="navbar__logo"
          onClick={(e) => handleNavClick(e, '#hero')}
          aria-label="Gorgona Marketing — Inicio"
        >
          <span className="logo-text">GORGONA</span>
          <span className="logo-dot" aria-hidden="true">.</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Navegación principal">
          <ul className="navbar__links navbar__links--desktop">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contacto"
                className="btn btn--primary nav-cta"
                onClick={(e) => handleNavClick(e, '#contacto')}
              >
                Hablemos
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        id="mobile-menu"
        className={`navbar__mobile${menuOpen ? ' open' : ''}`}
        aria-label="Menú móvil"
        aria-hidden={!menuOpen}
      >
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link"
                onClick={(e) => handleNavClick(e, link.href)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contacto"
              className="btn btn--primary"
              onClick={(e) => handleNavClick(e, '#contacto')}
              tabIndex={menuOpen ? 0 : -1}
            >
              Hablemos
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
