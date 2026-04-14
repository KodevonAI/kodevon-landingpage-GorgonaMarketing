import { useCounter } from '../hooks/useCounter'
import './Stats.css'

const STATS = [
  { target: 150, symbol: '%',  label: 'Aumento promedio en conversiones' },
  { target: 87,  symbol: 'K+', label: 'Clientes satisfechos' },
  { target: 20,  symbol: 'M+', label: 'En inversión gestionada' },
  { target: 8,   symbol: '+',  label: 'Años de experiencia' },
]

function StatCard({ target, symbol, label }) {
  const { value, ref } = useCounter(target)
  return (
    <div className="stat-card" ref={ref}>
      <p className="stat-card__number" aria-label={`${target}${symbol} — ${label}`}>
        <span aria-hidden="true">{value}</span>
        <span className="stat-symbol" aria-hidden="true">{symbol}</span>
      </p>
      <p className="stat-card__label" aria-hidden="true">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="stats" aria-label="Estadísticas">
      <div className="container stats__grid">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}
