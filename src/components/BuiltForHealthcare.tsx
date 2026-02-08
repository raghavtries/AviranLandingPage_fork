import './BuiltForHealthcare.css'

const FEATURES = [
  {
    number: '01',
    title: 'Self-Improving Agents',
    description:
      'Real-time telemetry, stress testing, and drift detection. Agents that get better automatically.',
  },
  {
    number: '02',
    title: 'Deploy Your Way',
    description:
      'Add our layer to your existing agents. Or deploy our pre-built teams for billing, scheduling, and documentation.',
  },
  {
    number: '03',
    title: 'In Production Today',
    description:
      'Used by AI vendors, clinics, and hospitals. Live in production environments, not just pilots.',
  },
]

export default function BuiltForHealthcare() {
  return (
    <section id="features" className="built-for">
      <h2 className="built-for-heading">Built for Healthcare</h2>
      <ul className="built-for-list">
        {FEATURES.map((f) => (
          <li key={f.number} className="built-for-card">
            <span className="built-for-number">{f.number}</span>
            <h3 className="built-for-title">{f.title}</h3>
            <p className="built-for-desc">{f.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
