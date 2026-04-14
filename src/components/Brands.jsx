import './Brands.css'

const BRANDS = [
  { icon: 'fa-google',      label: 'Google Ads',      cls: 'brand--gg' },
  { icon: 'fa-meta',        label: 'Meta Ads',         cls: 'brand--meta' },
  { icon: 'fa-instagram',   label: 'Instagram',        cls: 'brand--ig' },
  { icon: 'fa-tiktok',      label: 'TikTok For Business', cls: 'brand--tt' },
  { icon: 'fa-linkedin-in', label: 'LinkedIn Ads',     cls: 'brand--li' },
  { icon: 'fa-shopify',     label: 'Shopify',          cls: 'brand--shopify' },
  { icon: 'fa-youtube',     label: 'YouTube Ads',      cls: 'brand--yt' },
  { icon: 'fa-twitter',     label: 'X (Twitter)',      cls: 'brand--tw' },
  { icon: 'fa-mailchimp',   label: 'Mailchimp',        cls: 'brand--mc' },
  { icon: 'fa-hubspot',     label: 'HubSpot',          cls: 'brand--hs' },
]

// Duplicated for seamless loop
const TRACK = [...BRANDS, ...BRANDS]

export default function Brands() {
  return (
    <section className="brands" aria-label="Plataformas y herramientas con las que trabajamos">
      <div className="brands__header">
        <p className="brands__caption">Gestionamos campañas en las plataformas líderes</p>
      </div>

      <div className="brands__marquee" aria-hidden="true">
        <ul className="brands__track">
          {TRACK.map((b, i) => (
            <li key={`${b.label}-${i}`} className={`brand-item ${b.cls}`}>
              <i className={`fab ${b.icon}`} aria-hidden="true" />
              <span>{b.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
