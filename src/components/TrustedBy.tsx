import './TrustedBy.css'

const LOGOS = [
  'Sentrial',
  'Martin',
  'Wyn Labs',
  'Artisio',
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
    </section>
  )
}
