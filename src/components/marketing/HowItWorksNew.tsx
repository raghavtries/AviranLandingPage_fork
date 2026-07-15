import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { MonoLabel } from '../primitives/MonoLabel'

// ─── Mini Visualizations ────────────────────────────────────────────────────

function ProductContractViz() {
  const items = [
    { label: 'Configurable prompts & policies', status: 'done' },
    { label: 'Tools & workflows', status: 'done' },
    { label: 'Integrations & field mappings', status: 'done' },
    { label: 'Permissions & escalation rules', status: 'done' },
    { label: 'Actions requiring vendor engineering', status: 'flag' },
  ]
  return (
    <div className="flex h-full flex-col gap-4 rounded border border-border-subtle bg-bg-raised p-6">
      <MonoLabel className="block text-[11px]">Product Contract — CollectFlow v3</MonoLabel>
      <div className="flex flex-1 flex-col justify-center gap-3">
        {items.map((it) => (
          <div key={it.label} className="flex items-center gap-3 font-mono text-[13px]">
            <span className={it.status === 'flag' ? 'text-signal-warn' : 'text-signal-good'}>
              {it.status === 'flag' ? '△' : '✓'}
            </span>
            <span className="text-text-secondary">{it.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RequirementsViz() {
  const rows = [
    { src: 'SOW §4.2',       req: 'Discounts above 7% require approval',                status: 'CONFIRMED' },
    { src: 'Slack thread',   req: 'CRM field renamed: deal_stage → opportunity_stage',   status: 'CONFIRMED' },
    { src: 'Discovery call', req: 'Salesforce sandbox access',                            status: 'WAITING'   },
    { src: 'Discovery call', req: 'Payment API test credentials',                         status: 'BLOCKING'  },
  ]
  const color: Record<string, string> = {
    CONFIRMED: 'text-signal-good', WAITING: 'text-signal-warn', BLOCKING: 'text-signal-bad',
  }
  return (
    <div className="flex h-full flex-col gap-4 rounded border border-border-subtle bg-bg-raised p-6">
      <MonoLabel className="block text-[11px]">Requirements — Acme Corp</MonoLabel>
      <div className="flex flex-1 flex-col justify-center gap-3">
        {rows.map((r, i) => (
          <div key={i} className="flex items-start gap-3 font-mono text-[12px] leading-relaxed">
            <span className="w-24 shrink-0 text-text-tertiary">{r.src}</span>
            <span className="flex-1 text-text-secondary">{r.req}</span>
            <span className={`w-20 shrink-0 text-right ${color[r.status]}`}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConfigDiffViz() {
  return (
    <div className="flex h-full flex-col gap-4 rounded border border-border-subtle bg-bg-raised p-6">
      <MonoLabel className="block text-[11px]">Generated Config — acme_corp.yaml</MonoLabel>
      <div className="flex flex-1 flex-col justify-center">
        <div className="overflow-hidden rounded border border-border-subtle font-mono text-[13px]">
          <div className="flex border-b border-border-subtle">
            <span className="w-1/2 border-r border-border-subtle bg-bg-overlay px-4 py-2.5 text-text-tertiary">CollectFlow contract</span>
            <span className="w-1/2 bg-signal-good/5 px-4 py-2.5 text-signal-good">+ acme_corp.yaml</span>
          </div>
          {[
            ['  discount_threshold: null', '+ discount_threshold: 7%'],
            ['  approval_required: false', '+ approval_required: true'],
            ['  crm_field: deal_stage',     '+ crm_field: opportunity_stage'],
            ['  escalation: default',       '  escalation: default'],
          ].map(([left, right], i) => (
            <div key={i} className="flex border-t border-border-subtle/50">
              <span className="w-1/2 border-r border-border-subtle/50 px-4 py-2 text-text-tertiary">{left}</span>
              <span className={`w-1/2 px-4 py-2 ${right.startsWith('+') ? 'bg-signal-good/5 text-signal-good' : 'text-text-tertiary'}`}>{right}</span>
            </div>
          ))}
          <div className="border-t border-border-subtle bg-bg-overlay px-4 py-2.5">
            <span className="text-signal-good">14/14 requirements mapped</span>
            <span className="mx-3 text-text-tertiary">·</span>
            <span className="text-signal-good">0 unmapped fields</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ValidationViz() {
  const [expanded, setExpanded] = useState(true)
  return (
    <div className="flex h-full flex-col gap-4 rounded border border-border-subtle bg-bg-raised p-6">
      <MonoLabel className="block text-[11px]">Validation — acme_corp.yaml</MonoLabel>
      <div className="flex flex-1 flex-col justify-center font-mono text-[14px]">
        <button type="button" className="flex items-center gap-3 text-left" onClick={() => setExpanded(!expanded)}>
          <span className="text-text-tertiary">{expanded ? '▼' : '▶'}</span>
          <span className="text-signal-good">contract compliance</span>
          <span className="text-[11px] text-signal-good">[PASS]</span>
        </button>
        {expanded && (
          <div className="ml-5 mt-3 flex flex-col gap-3 border-l border-border-subtle pl-5">
            {[
              { label: 'schema compatibility',                       status: 'good' },
              { label: 'permission checks',                          status: 'good' },
              { label: 'regression: escalation path  [1 flagged]',   status: 'bad'  },
            ].map((n, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-text-tertiary">●</span>
                <span className={n.status === 'bad' ? 'text-signal-bad' : 'text-text-secondary'}>{n.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function LaunchLogViz() {
  const lines = [
    { ts: 'Mon 09:14', level: 'INFO',  msg: 'acme_corp implementation approved by operator' },
    { ts: 'Mon 09:15', level: 'INFO',  msg: 'acme_corp launched — stage=LIVE' },
    { ts: 'Thu 14:02', level: 'INFO',  msg: 'slack: "discounts above 7% now require approval"' },
    { ts: 'Thu 14:03', level: 'DEBUG', msg: 'scoped change against CollectFlow contract' },
    { ts: 'Thu 14:04', level: 'INFO',  msg: 'diff generated — pending operator approval' },
    { ts: 'Thu 14:11', level: 'INFO',  msg: 'change approved, applied to acme_corp.yaml' },
    { ts: 'Thu 14:11', level: 'INFO',  msg: 'replied in Slack: "done — live now"' },
  ]
  const color: Record<string, string> = {
    INFO: 'text-text-secondary', DEBUG: 'text-text-tertiary',
  }
  return (
    <div className="flex h-full flex-col gap-4 rounded border border-border-subtle bg-bg-raised p-6">
      <MonoLabel className="block text-[11px]">Audit Trail — acme_corp</MonoLabel>
      <div className="flex flex-1 flex-col justify-center gap-2">
        {lines.map((l, i) => (
          <div key={i} className="flex gap-4 font-mono text-[13px] leading-relaxed">
            <span className="shrink-0 text-text-tertiary">{l.ts}</span>
            <span className={`w-12 shrink-0 ${color[l.level]}`}>{l.level}</span>
            <span className="text-text-secondary">{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

const TABS = [
  {
    id: 'product-discovery',
    title: 'Product Discovery',
    headline: 'Learn the product once.',
    body: 'Aviran inspects your documentation, schemas, APIs, repositories, and sample deployments to build a confirmed product contract — what’s configurable, what’s supported, and what needs engineering.',
    bullets: [
      'Identifies configurable prompts, policies, tools, and workflows',
      'Maps supported integrations, field mappings, and permissions',
      'Skippable when you already hand us a complete contract',
    ],
    Viz: ProductContractViz,
  },
  {
    id: 'customer-discovery',
    title: 'Customer Discovery',
    headline: 'Extract requirements, not assumptions.',
    body: 'Aviran reads customer documents, call transcripts, policies, Slack threads, and sample data, extracting structured, cited requirements — and routes open questions to the right stakeholder instead of guessing.',
    bullets: [
      'Every requirement is traceable to its source',
      'Missing or conflicting information is flagged and routed automatically',
      'Blocker owners and status are tracked until resolved',
    ],
    Viz: RequirementsViz,
  },
  {
    id: 'implementation',
    title: 'Implementation',
    headline: 'Generate the customer-specific build.',
    body: 'Combining the vendor product contract with confirmed customer requirements, Aviran generates configuration, field mappings, and workflows — plus the acceptance criteria to test them against. Requirement mapping and candidate generation draw on ICLR-published search techniques, applied here to implementation rather than optimization.',
    bullets: [
      'Config, mappings, and workflows generated from the product contract',
      'Acceptance tests and an implementation plan produced alongside the build',
      'Every artifact traces back to a source requirement',
    ],
    Viz: ConfigDiffViz,
  },
  {
    id: 'validation',
    title: 'Validation',
    headline: 'Prove it works before it ships.',
    body: 'Aviran checks the proposed configuration against your product contract for schema compatibility, permission correctness, expected behavior, and regressions — producing evidence, not just a pass/fail.',
    bullets: [
      'Contract compliance and schema checks',
      'Behavioral validation against acceptance criteria',
      'Failures come with proposed remediation, not just an error',
    ],
    Viz: ValidationViz,
  },
  {
    id: 'launch-maintain',
    title: 'Launch & Maintain',
    headline: 'Approve once. Maintain forever.',
    body: 'Aviran presents the plan, risks, and rollback path for operator approval, then launches the customer. Afterward, supported changes — policy updates, field mappings, routing rules — are suggested for approval before they ship.',
    bullets: [
      'Full plan, risk, and rollback surfaced before launch',
      'Post-launch changes are suggested, then approved — never silent',
      'Unsupported work escalates to engineering with full context',
    ],
    Viz: LaunchLogViz,
  },
]

// ─── Component ───────────────────────────────────────────────────────────────

const NAV_H = 56

export function HowItWorksNew() {
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (reduced) return
    const idx = Math.min(Math.floor(latest * TABS.length), TABS.length - 1)
    setActive(idx)
  })

  const tab = TABS[active]

  // Fallback for reduced-motion: normal flow layout
  if (reduced) {
    return (
      <section id="how-it-works" className="bg-bg-base px-6 py-24">
        <div className="mx-auto max-w-[1200px]">
          <MonoLabel className="block mb-4">How It Works</MonoLabel>
          <h2 className="font-display text-[40px] font-semibold leading-tight tracking-[-0.02em] text-text-primary mb-10">
            From new customer to launched, without a new hire.
          </h2>
          <div className="flex gap-0 border-b border-border-subtle mb-8">
            {TABS.map((t, i) => (
              <button key={t.id} type="button" onClick={() => setActive(i)}
                className={`px-5 py-3 font-mono text-[13px] relative ${i === active ? 'text-text-primary' : 'text-text-tertiary'}`}>
                {t.title}
                {i === active && <span className="absolute bottom-0 left-0 right-0 h-px bg-accent" />}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <h3 className="font-display text-[32px] font-semibold tracking-[-0.02em] text-text-primary">{tab.headline}</h3>
              <p className="font-body text-[17px] leading-relaxed text-text-secondary">{tab.body}</p>
              <ul className="flex flex-col gap-3">
                {tab.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 font-mono text-[14px] text-text-secondary">
                    <span className="mt-0.5 shrink-0 text-accent">›</span>{b}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ minHeight: 320 }}><tab.Viz /></div>
          </div>
        </div>
      </section>
    )
  }

  const innerHeight = `calc(100vh - ${NAV_H}px)`

  return (
    <div
      id="how-it-works"
      ref={containerRef}
      style={{ height: `${TABS.length * 100}vh` }}
    >
      <div
        style={{
          position: 'sticky',
          top: NAV_H,
          height: innerHeight,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        className="bg-bg-base px-6 lg:px-10"
      >
        {/* Header — fixed height */}
        <div className="shrink-0 pt-8 pb-4">
          <MonoLabel className="block mb-3 text-[11px]">How It Works</MonoLabel>
          <h2 className="font-display text-[36px] md:text-[44px] font-semibold leading-tight tracking-[-0.02em] text-text-primary">
            From new customer to launched, without a new hire.
          </h2>
        </div>

        {/* Tab bar — fixed height */}
        <div className="relative flex shrink-0 gap-0 overflow-x-auto border-b border-border-subtle">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              className={`relative shrink-0 px-5 py-3.5 font-mono text-[13px] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-border-strong ${
                i === active ? 'text-text-primary' : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {t.title}
              {i === active && (
                <motion.span layoutId="tab-ind" className="absolute bottom-0 left-0 right-0 h-px bg-accent" />
              )}
            </button>
          ))}
        </div>

        {/* Content — stretches to fill remaining height */}
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: 1, minHeight: 0, display: 'grid', gap: '2.5rem', paddingTop: '2rem', paddingBottom: '1rem' }}
              className="grid-cols-1 lg:grid-cols-2"
            >
              {/* Left — text */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
                <h3 className="font-display text-[28px] md:text-[34px] font-semibold leading-snug tracking-[-0.02em] text-text-primary">
                  {tab.headline}
                </h3>
                <p className="font-body text-[17px] leading-relaxed text-text-secondary">
                  {tab.body}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  {tab.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 font-mono text-[14px] text-text-secondary">
                      <span className="mt-0.5 shrink-0 text-accent">›</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — visualization, fills full cell height */}
              <div style={{ minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flex: 1, minHeight: 200 }}>
                  <tab.Viz />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicator — fixed height */}
        <div className="shrink-0 flex items-center gap-2 py-4 border-t border-border-subtle/40">
          {TABS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Jump to tab ${i + 1}`}
              className={`h-px rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-accent' : 'w-4 bg-border-strong hover:bg-border-strong/80'}`}
            />
          ))}
          <span className="ml-3 font-mono text-[11px] text-text-tertiary">
            {String(active + 1).padStart(2, '0')} / {String(TABS.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
