import { useState, useId } from 'react'
import './Contact.css'

const SERVICES = [
  { value: 'seo',      label: 'SEO' },
  { value: 'social',   label: 'Social Media' },
  { value: 'ads',      label: 'Paid Media & Ads' },
  { value: 'branding', label: 'Branding' },
  { value: 'web',      label: 'Desarrollo Web' },
  { value: 'otro',     label: 'Otro' },
]

const SOCIALS = [
  { href: '#', icon: 'fa-instagram',   label: 'Instagram de Gorgona Marketing' },
  { href: '#', icon: 'fa-linkedin-in', label: 'LinkedIn de Gorgona Marketing' },
  { href: '#', icon: 'fa-tiktok',      label: 'TikTok de Gorgona Marketing' },
  { href: '#', icon: 'fa-facebook-f',  label: 'Facebook de Gorgona Marketing' },
]

export default function Contact() {
  const formId = useId()
  const [fields, setFields] = useState({
    nombre: '', empresa: '', email: '', servicio: '', mensaje: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success

  const validate = () => {
    const errs = {}
    if (!fields.nombre.trim())  errs.nombre  = 'El nombre es requerido.'
    if (!fields.email.trim())   errs.email   = 'El email es requerido.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errs.email = 'Ingresa un email válido.'
    if (!fields.mensaje.trim()) errs.mensaje = 'El mensaje es requerido.'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((f) => ({ ...f, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      // Focus first error field
      const firstKey = Object.keys(errs)[0]
      document.getElementById(`${formId}-${firstKey}`)?.focus()
      return
    }
    setStatus('sending')
    // Simulate send — replace with real endpoint
    setTimeout(() => {
      setStatus('success')
      setFields({ nombre: '', empresa: '', email: '', servicio: '', mensaje: '' })
    }, 1200)
  }

  return (
    <section className="contact" id="contacto" aria-label="Formulario de contacto">
      <div className="container contact__inner">

        {/* Info */}
        <div className="contact__info reveal-left">
          <span className="section-label">Contacto</span>
          <h2 className="section-title">
            Hablemos de tu{' '}
            <span className="accent">próximo proyecto</span>
          </h2>
          <p className="contact__subtitle">
            Cuéntanos tus objetivos y te mostraremos cómo alcanzarlos con
            una estrategia diseñada específicamente para tu negocio.
          </p>

          <ul className="contact__details" aria-label="Datos de contacto">
            <li>
              <span className="contact__icon" aria-hidden="true">
                <i className="fas fa-phone" />
              </span>
              <div>
                <strong>Teléfono</strong>
                <a href="tel:+573000000000">+57&nbsp;300&nbsp;000&nbsp;0000</a>
              </div>
            </li>
            <li>
              <span className="contact__icon" aria-hidden="true">
                <i className="fas fa-envelope" />
              </span>
              <div>
                <strong>Email</strong>
                <a href="mailto:hola@gorgonamarketing.com">hola@gorgonamarketing.com</a>
              </div>
            </li>
            <li>
              <span className="contact__icon" aria-hidden="true">
                <i className="fas fa-location-dot" />
              </span>
              <div>
                <strong>Ubicación</strong>
                <span>Colombia</span>
              </div>
            </li>
          </ul>

          <nav aria-label="Redes sociales de Gorgona Marketing">
            <ul className="contact__socials">
              {SOCIALS.map((s) => (
                <li key={s.icon}>
                  <a href={s.href} aria-label={s.label} className="social-btn">
                    <i className={`fab ${s.icon}`} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Form */}
        <div className="contact__form-wrap reveal-right">
          <form
            className="contact__form"
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formulario de contacto"
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor={`${formId}-nombre`}>Nombre *</label>
                <input
                  id={`${formId}-nombre`}
                  type="text"
                  name="nombre"
                  value={fields.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre…"
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.nombre}
                  aria-describedby={errors.nombre ? `${formId}-nombre-err` : undefined}
                />
                {errors.nombre && (
                  <span id={`${formId}-nombre-err`} className="form-error" role="alert">
                    {errors.nombre}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor={`${formId}-empresa`}>Empresa</label>
                <input
                  id={`${formId}-empresa`}
                  type="text"
                  name="empresa"
                  value={fields.empresa}
                  onChange={handleChange}
                  placeholder="Tu empresa…"
                  autoComplete="organization"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor={`${formId}-email`}>Email *</label>
              <input
                id={`${formId}-email`}
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="tu@correo.com…"
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${formId}-email-err` : undefined}
              />
              {errors.email && (
                <span id={`${formId}-email-err`} className="form-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor={`${formId}-servicio`}>Servicio de interés</label>
              <select
                id={`${formId}-servicio`}
                name="servicio"
                value={fields.servicio}
                onChange={handleChange}
                autoComplete="off"
              >
                <option value="">Selecciona un servicio</option>
                {SERVICES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor={`${formId}-mensaje`}>Mensaje *</label>
              <textarea
                id={`${formId}-mensaje`}
                name="mensaje"
                value={fields.mensaje}
                onChange={handleChange}
                rows={4}
                placeholder="Cuéntanos sobre tu proyecto…"
                aria-required="true"
                aria-invalid={!!errors.mensaje}
                aria-describedby={errors.mensaje ? `${formId}-mensaje-err` : undefined}
              />
              {errors.mensaje && (
                <span id={`${formId}-mensaje-err`} className="form-error" role="alert">
                  {errors.mensaje}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--lg btn--full"
              disabled={status === 'sending'}
            >
              {status === 'sending'
                ? <>Enviando… <i className="fas fa-spinner fa-spin" aria-hidden="true" /></>
                : <>Enviar mensaje <i className="fas fa-paper-plane" aria-hidden="true" /></>
              }
            </button>

            {status === 'success' && (
              <p
                className="form-success"
                role="status"
                aria-live="polite"
              >
                <i className="fas fa-circle-check" aria-hidden="true" />
                {' '}¡Mensaje enviado! Te contactaremos pronto.
              </p>
            )}
          </form>
        </div>

      </div>
    </section>
  )
}
