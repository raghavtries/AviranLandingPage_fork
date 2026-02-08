import { useState } from 'react'
import './HowItWorks.css'

const STEPS = [
  {
    id: 'observation',
    title: 'Observation',
    subtitle: 'Monitor with precision',
    description:
      'Real-time monitoring of agent performance across all interactions, tracking accuracy, response times, and quality. Spot drift and failure patterns before users do.',
  },
  {
    id: 'model-comparison',
    title: 'Model Comparison',
    subtitle: 'Compare and optimize models',
    description:
      'Side-by-side comparison of model performance to choose the best configuration for your use case.',
  },
  {
    id: 'rca',
    title: 'Root Cause Analysis',
    subtitle: 'Deep dive into performance issues',
    description:
      'Trace failures and drift to their source with detailed logs and diagnostic tools.',
  },
  {
    id: 'logs',
    title: 'Logs',
    subtitle: 'Complete transparency and traceability',
    description:
      'Full audit trail of every agent interaction for compliance and debugging.',
  },
]

export default function HowItWorks() {
  const [active, setActive] = useState(0)
  const step = STEPS[active]

  return (
    <section className="how-it-works">
      <h2 className="how-heading">How it works</h2>
      <p className="how-subheading">
        Monitor, analyze, and optimize your AI agents in production—automatically
      </p>
      <div className="how-tabs">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`how-tab ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="how-tab-num">{i + 1}</span>
            <span className="how-tab-title">{s.title}</span>
          </button>
        ))}
      </div>
      <div className="how-content">
        <div className="how-text">
          <h3 className="how-step-title">{step.title}</h3>
          <p className="how-step-subtitle">{step.subtitle}</p>
          <p className="how-step-desc">{step.description}</p>
        </div>
        <div className="how-visual">
          <div className="how-visual-placeholder">
            {step.title} Dashboard
          </div>
        </div>
      </div>
    </section>
  )
}
