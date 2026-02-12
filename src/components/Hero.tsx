import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <p className="hero-tagline">Self-Learning for AI Agents</p>
      <h1 className="hero-title">
        AI agents that
        <span className="hero-title-accent"> self learn</span>
      </h1>
      <p className="hero-subtitle">
        Continuously optimize prompts, tools, and parameters in production. Find the best configs, simulate them, and auto-deploy—like CI for your agents.
      </p>
      <a href="https://calendly.com/raghav-jsub/chat" className="hero-cta">
        Request Demo
      </a>
      <div className="hero-dashboard">
        <div className="aviran-dashboard-mockup">
          <aside className="dashboard-sidebar">
            <div className="sidebar-header">
              <span className="sidebar-logo-icon">A</span>
              <span className="sidebar-brand">Aviran</span>
            </div>
            <div className="sidebar-search">
              <span className="sidebar-search-placeholder">Search...</span>
              <span className="sidebar-search-kbd">⌘K</span>
            </div>
            <nav className="sidebar-nav">
              <div className="sidebar-nav-item active">
                <span className="sidebar-nav-icon">⊞</span>
                Dashboard
              </div>
              <div className="sidebar-nav-item">Traces</div>
              <div className="sidebar-nav-section">OBSERVE</div>
              <div className="sidebar-nav-item">Sessions</div>
              <div className="sidebar-nav-item">
                Issue patterns
                <span className="sidebar-badge red">4</span>
              </div>
              <div className="sidebar-nav-section">IMPROVE</div>
              <div className="sidebar-nav-item">
                Experiments
                <span className="sidebar-badge orange">8</span>
              </div>
              <div className="sidebar-nav-item">Judges</div>
              <div className="sidebar-nav-item">Prompts</div>
              <div className="sidebar-nav-item">Docs</div>
            </nav>
            <div className="sidebar-assistant">Assistant — Ask anything...</div>
          </aside>
          <main className="dashboard-main">
            <div className="dashboard-main-header">
              <div>
                <h3 className="dashboard-main-title">Agents</h3>
                <p className="dashboard-main-subtitle">
                  Select an agent to see breakdown, scores, issue patterns, and start experiments.
                </p>
              </div>
              <button type="button" className="dashboard-refresh" aria-label="Refresh">↻</button>
            </div>
            <div className="dashboard-agent-cards">
              <div className="agent-card">
                <div className="agent-card-header">
                  <span className="agent-card-icon">⚙</span>
                  <div>
                    <div className="agent-card-name">Client A&apos;s Sales Agent</div>
                    <div className="agent-card-sub">default</div>
                  </div>
                </div>
                <span className="agent-card-tag experiment">Experiment running</span>
                <div className="agent-card-metrics">
                  <div className="agent-metric">
                    <span className="agent-metric-value">7/10</span>
                    <span className="agent-metric-label">Avg score</span>
                  </div>
                  <div className="agent-metric">
                    <span className="agent-metric-value">10</span>
                    <span className="agent-metric-label">Runs (7d)</span>
                  </div>
                  <div className="agent-metric">
                    <span className="agent-metric-value">5</span>
                    <span className="agent-metric-label">Issues</span>
                  </div>
                </div>
              </div>
              <div className="agent-card">
                <div className="agent-card-header">
                  <span className="agent-card-icon">⚙</span>
                  <div>
                    <div className="agent-card-name">Client B&apos;s Sales Agent</div>
                    <div className="agent-card-sub">agent2</div>
                  </div>
                </div>
                <div className="agent-card-metrics">
                  <div className="agent-metric">
                    <span className="agent-metric-value">5/10</span>
                    <span className="agent-metric-label">Avg score</span>
                  </div>
                  <div className="agent-metric">
                    <span className="agent-metric-value">13</span>
                    <span className="agent-metric-label">Runs (7d)</span>
                  </div>
                  <div className="agent-metric">
                    <span className="agent-metric-value">6</span>
                    <span className="agent-metric-label">Issues</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
