import { ArrowUpRight } from 'lucide-react'
import { BracketPanel } from '../primitives/BracketPanel'
import { MonoLabel } from '../primitives/MonoLabel'

const CARDS = [
  {
    num: '01',
    title: 'Product Contract, Once',
    body: 'Aviran learns your configurable objects, workflows, and permission boundaries a single time. Every customer after that reuses the same contract — progressively less custom work, not a fresh integration.',
    href: '#docs',
  },
  {
    num: '02',
    title: 'Owner-Routed Blockers',
    body: 'Most implementation delay sits with the customer — missing access, unclear ownership, unanswered questions. Aviran identifies the blocker owner, asks them directly, and tracks the answer as an implementation record.',
    href: '#docs',
  },
  {
    num: '03',
    title: 'Approve, Don’t Audit',
    body: 'Every generated config and every post-launch change ships with a diff, validation evidence, and a rollback path. Nothing goes live without operator approval.',
    href: '#',
  },
]

export function FeatureGrid() {
  return (
    <section className="bg-bg-raised px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col gap-3">
          <MonoLabel>Capabilities</MonoLabel>
          <h2 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.02em] text-text-primary md:text-[36px]">
            Built different by design.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {CARDS.map((card) => (
            <BracketPanel
              key={card.num}
              className="group flex flex-col gap-4 p-6 transition-all duration-300 hover:border-border-strong hover:bg-bg-overlay"
            >
              <div className="flex items-start justify-between">
                <MonoLabel className="text-[10px]">{card.num}</MonoLabel>
                <ArrowUpRight
                  size={14}
                  className="text-text-tertiary opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-display text-[17px] font-semibold leading-snug tracking-[-0.01em] text-text-primary">
                {card.title}
              </h3>
              <p className="font-body text-[13px] leading-relaxed text-text-secondary">
                {card.body}
              </p>
              {/* Top-right bracket accent glow */}
              <span
                className="pointer-events-none absolute -right-px -top-px h-2 w-2 border-r-2 border-t-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
            </BracketPanel>
          ))}
        </div>
      </div>
    </section>
  )
}
