import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <p className="hero-tagline">Self-Learning for Agents</p>
      <h1 className="hero-title">
        AI agents that
        <span className="hero-title-accent"> self improve</span>
      </h1>
      <p className="hero-subtitle">
        Continuously optimize prompts, tools, and parameters in production. Find the best configs, simulate them, and auto-deploy—like CI for your agents.
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
