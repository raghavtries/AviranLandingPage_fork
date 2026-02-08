import { useState } from 'react'
import './Docs.css'

const DOC_SECTIONS = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    content: 'Connect your agents to Aviran in minutes. We support common agent frameworks and provide an SDK that finds issue patterns, generates candidate configs, and simulates them against tests from past runs. Once connected, optimization runs automatically.',
  },
  {
    id: 'observation',
    title: 'Observation & Monitoring',
    content: 'Track accuracy, latency, and quality across every agent run. Set custom thresholds and get alerted when drift is detected. All data is retained for root-cause analysis and continuous improvement.',
  },
  {
    id: 'remediation',
    title: 'Auto-Deploy',
    content: 'Aviran generates candidate configs across prompts, tools, and parameters, simulates them, and auto-deploys the best versions. No more manual A/B testing or duct-taping observability + eval + CI/CD.',
  },
  {
    id: 'api',
    title: 'API Reference',
    content: 'Full REST and webhook APIs for integrating Aviran into your workflows. Create workflow-specific agents via our API, ingest production logs, query metrics, and trigger optimization. Authentication via API keys or OAuth.',
  },
]

const FAQ_ITEMS = [
  {
    q: 'What kinds of agents does Aviran support?',
    a: 'Aviran works with any AI agent or LLM pipeline that can emit events or logs. Our ICP is agent vendors deploying at scale—voice agents, support agents, sales agents, coding agents, and internal workflow automation. We support popular frameworks and custom integrations via our SDK and API.',
  },
  {
    q: 'How does automatic optimization work?',
    a: 'We find issue patterns in agent runs, generate candidate configs across prompts, tools, and parameters, simulate them against tests from past runs and edge cases, and auto-deploy the best versions. You connect production logs and we close the loop—no manual config search.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We encrypt data in transit and at rest and provide full audit trails. You control data retention and region. We’re built for production use by agent vendors and teams.',
  },
  {
    q: 'Can I try Aviran before committing?',
    a: 'Absolutely. Request a demo and we’ll set you up with a sandbox and live product tour. We’re doing Collison installs with vendors to learn workflows and refine the deployment process—get in touch to join.',
  },
]

export default function Docs() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <section id="docs" className="docs">
      <h2 className="docs-heading">Documentation</h2>
      <p className="docs-intro">
        Everything you need to integrate, monitor, and improve your AI agents.
      </p>

      <div className="docs-grid">
        {DOC_SECTIONS.map((section) => (
          <article key={section.id} className="docs-card">
            <h3 className="docs-card-title">{section.title}</h3>
            <p className="docs-card-content">{section.content}</p>
          </article>
        ))}
      </div>

      <h2 className="docs-faq-heading">FAQs</h2>
      <div className="docs-faq-list">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className={`docs-faq-item ${openFaq === i ? 'open' : ''}`}
          >
            <button
              type="button"
              className="docs-faq-question"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              aria-expanded={openFaq === i}
            >
              <span>{item.q}</span>
              <span className="docs-faq-icon" aria-hidden>+</span>
            </button>
            <div className="docs-faq-answer">
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
