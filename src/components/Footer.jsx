import { useState } from 'react'
import './Footer.css'

const SOCIALS = [
  { href: '#', icon: 'fa-instagram',   label: 'Instagram de Gorgona Marketing' },
  { href: '#', icon: 'fa-linkedin-in', label: 'LinkedIn de Gorgona Marketing' },
  { href: '#', icon: 'fa-tiktok',      label: 'TikTok de Gorgona Marketing' },
  { href: '#', icon: 'fa-facebook-f',  label: 'Facebook de Gorgona Marketing' },
]

const COMPANY_LINKS = [
  { href: '#nosotros',   label: 'Nosotros' },
  { href: '#proyectos',  label: 'Proyectos' },
  { href: '#testimonios', label: 'Testimonios' },
  { href: '#contacto',   label: 'Contacto' },
]

const SERVICE_LINKS = [
  'SEO', 'Social Media', 'Paid Media', 'Branding', 'Desarrollo Web',
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <a href="#hero" className="footer__logo" onClick={(e) => handleNavClick(e, '#hero')}>
            <span className="logo-text">GORGONA</span>
            <span className="logo-dot" aria-hidden="true">.</span>
          </a>
          <p>
            Transformamos el impacto de tus redes sociales en valor real para
            tu negocio.
          </p>

          <form className="footer__newsletter" onSubmit={handleSubscribe} aria-label="Suscripción al boletín">
            <label htmlFor="footer-email" className="sr-only">Tu correo electrónico</label>
            <input
              id="footer-email"
              type="email"
              name="footer-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email…"
              autoComplete="email"
              inputMode="email"
              spellCheck={false}
              aria-label="Correo para suscripción"
            />
            <button type="submit" className="btn btn--primary" disabled={subscribed}>
              {subscribed ? '¡Suscrito!' : 'Suscribirse'}
            </button>
          </form>
        </div>

        {/* Links */}
        <nav className="footer__links" aria-label="Mapa del sitio">
          <div className="footer__col">
            <h3>Empresa</h3>
            <ul>
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => handleNavClick(e, l.href)}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3>Servicios</h3>
            <ul>
              {SERVICE_LINKS.map((s) => (
                <li key={s}>
                  <a href="#servicios" onClick={(e) => handleNavClick(e, '#servicios')}>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3>Contacto</h3>
            <ul>
              <li><a href="tel:+573000000000">+57&nbsp;300&nbsp;000&nbsp;0000</a></li>
              <li><a href="mailto:hola@gorgonamarketing.com">hola@gorgonamarketing.com</a></li>
              <li><span>Colombia</span></li>
            </ul>
            <nav aria-label="Redes sociales">
              <ul className="footer__socials">
                {SOCIALS.map((s) => (
                  <li key={s.icon}>
                    <a href={s.href} aria-label={s.label} className="social-icon-btn">
                      <i className={`fab ${s.icon}`} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </nav>

      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>
            &copy;{' '}
            {new Intl.DateTimeFormat('es', { year: 'numeric' }).format(new Date())}{' '}
            Gorgona Marketing. Todos los derechos reservados.
          </p>
          <div>
            <a href="#">Política de privacidad</a>
            <a href="#">Términos de uso</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
