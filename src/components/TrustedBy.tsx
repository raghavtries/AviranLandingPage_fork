import './TrustedBy.css'

const PARTNERS = [
  { name: 'Sentrial', url: 'https://sentrial.com' },
  { name: 'Martin', url: 'https://trymartin.com' },
  { name: 'Wyn Labs', url: null },
  { name: 'Artisio', url: null },
  { name: 'Databricks', url: 'https://www.databricks.com/' },
]

export default function TrustedBy() {
  return (
    <section className="trusted-by">
      <p className="trusted-by-label">Used by teams like Sentrial and Martin</p>
      <ul className="trusted-by-logos">
        {PARTNERS.map(({ name, url }) => (
          <li key={name}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" className="trusted-by-name trusted-by-link">
                {name}
              </a>
            ) : (
              <span className="trusted-by-name">{name}</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
