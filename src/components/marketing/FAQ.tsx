import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MonoLabel } from '../primitives/MonoLabel'

const ITEMS = [
  {
    q: 'What kinds of agents does Aviran support?',
    a: 'Aviran works with any AI agent or LLM pipeline that can emit OpenTelemetry spans or structured logs. Our design partners are agent vendors deploying at scale—voice agents, support agents, sales agents, coding agents, and internal workflow automation. We support LangGraph, CrewAI, Mastra, Vercel AI SDK, and custom integrations via our SDK and HTTP ingestion API.',
  },
  {
    q: 'How does automatic optimization work?',
    a: 'Aviran clusters production failures by semantic similarity, identifies which part of the config—prompt, tool definition, or parameter—is the root cause, then uses DSPy + Optuna to search the config space. Candidates are scored against held-out production traces, not synthetic benchmarks. The winner is promoted via a feature flag with configurable guardrails.',
  },
  {
    q: 'Is my data secure?',
    a: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). PII is stripped by Presidio before any span data reaches persistent storage. You control retention period and region. VPC-isolated deployment is available on request. SOC 2 Type I is in progress.',
  },
  {
    q: 'Can I try Aviran before committing?',
    a: 'Yes. Request a walkthrough and we will instrument one of your agents live in the session—typically 30 minutes. We do Collison-style installs with design partners to understand your workflow before proposing a config. Contact us at team@aviran.dev to schedule.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="bg-bg-raised px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col gap-3">
          <MonoLabel>FAQ</MonoLabel>
          <h2 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.02em] text-text-primary md:text-[36px]">
            Common questions.
          </h2>
        </div>
        <div className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
          {ITEMS.map((item, i) => (
            <div key={i}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-border-strong"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-body text-[15px] font-medium text-text-primary">
                  {item.q}
                </span>
                <span
                  className="relative shrink-0"
                  aria-hidden="true"
                  style={{
                    width: 14,
                    height: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Horizontal bar — always visible */}
                  <span className="absolute h-px w-3.5 bg-text-tertiary transition-colors duration-200" />
                  {/* Vertical bar — rotates to 0 when open */}
                  <motion.span
                    className="absolute h-3.5 w-px bg-text-tertiary"
                    animate={{ rotate: open === i ? 90 : 0 }}
                    transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="pb-5 font-body text-[14px] leading-relaxed text-text-secondary">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
