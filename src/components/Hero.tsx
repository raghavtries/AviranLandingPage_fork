import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <h1 className="hero-title">
        Healthcare agents that
        <span className="hero-title-accent"> self improve</span>
      </h1>
      <p className="hero-subtitle">
        Detect drift, diagnose problems, and auto-fix AI systems in real-time.
      </p>
      <a href="#demo" className="hero-cta">
        Request Demo
      </a>
      <div className="hero-dashboard">
        <div className="hero-dashboard-placeholder">
          <span>Aviran Dashboard</span>
        </div>
      </div>
    </section>
  )
}
