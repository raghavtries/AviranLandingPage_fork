import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MonoLabel } from '../primitives/MonoLabel'

const ITEMS = [
  {
    q: 'Why wouldn’t we build this internally?',
    a: 'Deployment is a different surface from your core product. Instead of your engineers getting backlogged onboarding 10 customers, Aviran automates the onboarding and maintenance work — faster than a human FDE — so your team spends its time on the product itself. Building requirements intake, configuration generation, validation, approvals, rollout, rollback, and auditability from scratch is substantial infrastructure that distracts from what you’re actually selling.',
  },
  {
    q: 'Won’t every vendor be different, making this a consulting business?',
    a: 'We integrate with your product once, through a reusable product contract, workflows, schemas, tests, and execution hooks. Every customer after that requires progressively less custom work — it’s implementation infrastructure, not a services engagement.',
  },
  {
    q: 'What can Aviran actually change without approval?',
    a: 'Nothing ships without operator sign-off. Aviran suggests changes — policy updates, prompt and workflow edits, field mappings, integration config, routing rules — and shows the exact diff. You approve before anything goes live.',
  },
  {
    q: 'What happens when the customer is the blocker?',
    a: 'A lot of implementation delay sits with the customer — missing access, unclear ownership, unresolved requirements. Aviran identifies who owns each blocker, asks them directly, and turns the answer into an implementation record, e.g. "Salesforce sandbox access — Owner: Acme CRM admin — Status: Waiting."',
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
