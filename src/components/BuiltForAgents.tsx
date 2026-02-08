import './BuiltForAgents.css'

const FEATURES = [
  {
    number: '01',
    title: 'Self-Improving Agents',
    description:
      'Find issue patterns in agent runs, generate candidate configs across prompts and tools, simulate against tests from past runs, and auto-deploy the best versions.',
  },
  {
    number: '02',
    title: 'Connect & Optimize',
    description:
      'Agent vendors create workflow-specific agents through our API. Connect production logs and optimize performance within hours—no manual A/B testing.',
  },
  {
    number: '03',
    title: 'In Production Today',
    description:
      'Used by AI agent vendors and startups. Live in production with teams like Sentrial, Martin, Wyn Labs, and more.',
  },
]

export default function BuiltForAgents() {
  return (
    <section id="features" className="built-for">
      <h2 className="built-for-heading">Built for agent vendors</h2>
      <ul className="built-for-list">
        {FEATURES.map((f) => (
          <li key={f.number} className="built-for-card">
            <span className="built-for-number">{f.number}</span>
            <h3 className="built-for-title">{f.title}</h3>
            <p className="built-for-desc">{f.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
