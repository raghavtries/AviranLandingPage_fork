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
        <div className="dashboard-mockup">
          <div className="dashboard-header">
            <div className="dashboard-title">Agent Performance</div>
            <div className="dashboard-badge">Live</div>
          </div>
          <div className="dashboard-metrics">
            <div className="metric-card">
              <div className="metric-label">Accuracy</div>
              <div className="metric-value">94.2%</div>
              <div className="metric-trend up">↑ 2.1%</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Avg Latency</div>
              <div className="metric-value">1.2s</div>
              <div className="metric-trend down">↓ 0.3s</div>
            </div>
            <div className="metric-card">
              <div className="metric-label">Success Rate</div>
              <div className="metric-value">98.7%</div>
              <div className="metric-trend up">↑ 0.5%</div>
            </div>
          </div>
          <div className="dashboard-chart">
            <div className="chart-bars">
              <div className="chart-bar" style={{ height: '60%' }}></div>
              <div className="chart-bar" style={{ height: '75%' }}></div>
              <div className="chart-bar" style={{ height: '85%' }}></div>
              <div className="chart-bar" style={{ height: '92%' }}></div>
              <div className="chart-bar" style={{ height: '88%' }}></div>
              <div className="chart-bar" style={{ height: '94%' }}></div>
              <div className="chart-bar" style={{ height: '96%' }}></div>
            </div>
            <div className="chart-label">Last 7 days</div>
          </div>
          <div className="dashboard-agents">
            <div className="agent-item">
              <div className="agent-name">Support Agent</div>
              <div className="agent-status active">Optimized</div>
            </div>
            <div className="agent-item">
              <div className="agent-name">Voice Agent</div>
              <div className="agent-status active">Optimized</div>
            </div>
            <div className="agent-item">
              <div className="agent-name">Sales Agent</div>
              <div className="agent-status pending">Testing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
