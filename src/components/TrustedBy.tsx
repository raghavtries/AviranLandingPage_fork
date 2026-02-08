import './TrustedBy.css'

const LOGOS = [
  'Prime Medical',
  'Ismail Healthcare',
  'Pear Health',
  'PARAKH Hospital',
]

export default function TrustedBy() {
  return (
    <section className="trusted-by">
      <p className="trusted-by-label">Trusted by healthcare professionals at</p>
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
