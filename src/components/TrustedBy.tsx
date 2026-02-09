import './TrustedBy.css'

const LOGOS = [
  'Sentrial',
  'Martin',
  'Wyn Labs',
  'Artisio',
  'Databricks',
]

export default function TrustedBy() {
  return (
    <section className="trusted-by">
      <p className="trusted-by-label">Used by teams like Sentrial and Martin</p>
      <ul className="trusted-by-logos">
        {LOGOS.map((name) => (
          <li key={name}>
            <span className="trusted-by-name">{name}</span>
          </li>
        ))}
      </ul>
      <p className="trusted-by-recent">
        Recently: a Databricks employee used Aviran on their deployed AI agent.
      </p>
    </section>
  )
}
