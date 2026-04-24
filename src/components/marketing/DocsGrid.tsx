import { ArrowUpRight } from 'lucide-react'
import { BracketPanel } from '../primitives/BracketPanel'
import { MonoLabel } from '../primitives/MonoLabel'

const DOCS = [
  {
    title: 'Getting Started',
    desc: 'Connect your agents to Aviran in minutes. SDK setup, first trace, and automatic optimization in one walkthrough.',
    snippet: 'pip install aviran\naviran init --framework langgraph',
    href: '#',
  },
  {
    title: 'Observation & Monitoring',
    desc: 'Track accuracy, latency, and quality across every agent run. Custom thresholds, drift alerts, and full retention for root-cause analysis.',
    snippet: 'from aviran import trace\n\n@trace(agent="sales.v7")\nasync def run(input): ...',
    href: '#',
  },
  {
    title: 'Auto-Deploy',
    desc: 'How Aviran generates candidate configs, simulates them against your real traffic, and promotes winners behind a feature flag.',
    snippet: 'aviran optimize --agent sales.v7\n# → 3 candidates scored\n# → v8 promoted at 10%',
    href: '#',
  },
  {
    title: 'API Reference',
    desc: 'Full REST and webhook APIs. Ingest logs, query metrics, trigger optimization, and manage candidates programmatically.',
    snippet: 'POST /v1/ingest\nAuthorization: Bearer <key>\n{"agent":"sales.v7","spans":[...]}',
    href: '#',
  },
]

export function DocsGrid() {
  return (
    <section id="docs" className="bg-bg-base px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col gap-3">
          <MonoLabel>Documentation</MonoLabel>
          <h2 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.02em] text-text-primary md:text-[36px]">
            Everything you need to integrate.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {DOCS.map((doc) => (
            <BracketPanel
              key={doc.title}
              className="group flex flex-col gap-4 p-6 transition-all duration-300 hover:border-border-strong hover:bg-bg-overlay"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display text-[16px] font-semibold tracking-[-0.01em] text-text-primary">
                  {doc.title}
                </h3>
                <ArrowUpRight
                  size={14}
                  className="shrink-0 text-text-tertiary transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
              <p className="font-body text-[13px] leading-relaxed text-text-secondary">
                {doc.desc}
              </p>
              <pre className="overflow-x-auto rounded border border-border-subtle bg-bg-base p-3 font-mono text-[11px] leading-relaxed text-text-tertiary">
                <code>{doc.snippet}</code>
              </pre>
            </BracketPanel>
          ))}
        </div>
      </div>
    </section>
  )
}
