import './TrustedBy.css'

const LOGOS = [
  'Wyn Labs',
  'Sentrial',
  'BrainHi',
  'Artisio',
]

export default function TrustedBy() {
  return (
    <section className="trusted-by">
      <p className="trusted-by-label">Trusted by agent vendors and teams building at</p>
      <ul className="trusted-by-logos">
        {LOGOS.map((name) => (
          <li key={name}>
            <span className="trusted-by-name">{name}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
