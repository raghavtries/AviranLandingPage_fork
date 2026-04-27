import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { MonoLabel } from '../primitives/MonoLabel'

// ─── Mini Visualizations ────────────────────────────────────────────────────

function ObservationViz() {
  return (
    <div className="flex h-full flex-col gap-4 rounded border border-border-subtle bg-bg-raised p-6">
      <MonoLabel className="block text-[11px]">Trace Waterfall — run_a4f291</MonoLabel>
      <div className="flex flex-1 flex-col justify-center gap-4">
        {[
          { name: 'agent_run',   start: 0,   dur: 100, color: '#4DA3FF', ms: '2140ms' },
          { name: '  plan',      start: 2,   dur: 30,  color: '#3DDC97', ms: '620ms'  },
          { name: '  call_llm',  start: 5,   dur: 52,  color: '#4DA3FF', ms: '1080ms' },
          { name: '  tool_srch', start: 58,  dur: 18,  color: '#F5A623', ms: '380ms'  },
          { name: '  embed',     start: 77,  dur: 14,  color: '#4DA3FF', ms: '290ms'  },
        ].map((row) => (
          <div key={row.name} className="flex items-center gap-3">
            <span className="w-28 shrink-0 font-mono text-[13px] text-text-tertiary">{row.name}</span>
            <div className="relative h-6 flex-1">
              <div
                className="absolute inset-y-1 rounded-sm"
                style={{ left: `${row.start}%`, width: `${row.dur}%`, backgroundColor: row.color, opacity: 0.75 }}
              />
            </div>
            <span className="w-16 text-right font-mono text-[13px] text-text-tertiary">{row.ms}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function IssuePatternsViz() {
  const clusters = [
    { cx: 25, cy: 35, r: 22, color: '#FF5C5C', label: 'stale results ×412' },
    { cx: 65, cy: 55, r: 16, color: '#F5A623', label: 'handoff loop ×201' },
    { cx: 50, cy: 22, r: 10, color: '#F5A623', label: 'timeout ×73' },
    { cx: 82, cy: 30, r: 7,  color: '#3DDC97', label: '' },
    { cx: 75, cy: 70, r: 6,  color: '#3DDC97', label: '' },
  ]
  return (
    <div className="flex h-full flex-col gap-4 rounded border border-border-subtle bg-bg-raised p-6">
      <MonoLabel className="block text-[11px]">Issue Cluster Map — last 7 days</MonoLabel>
      <div className="flex flex-1 items-center justify-center">
        <svg viewBox="0 0 100 90" width="100%" height="100%" aria-hidden="true">
          {clusters.map((c, i) => (
            <g key={i}>
              <circle cx={c.cx} cy={c.cy} r={c.r} fill={c.color} fillOpacity="0.15" stroke={c.color} strokeWidth="0.8" strokeOpacity="0.5" />
              {c.label && (
                <text x={c.cx} y={c.cy + 0.5} textAnchor="middle" dominantBaseline="middle" fill={c.color} fontSize="4">
                  {c.label}
                </text>
              )}
            </g>
          ))}
          <text x="2" y="87" fill="#525F74" fontSize="3.5" fontFamily="JetBrains Mono, monospace">n=2,906 runs · 3 active clusters</text>
        </svg>
      </div>
    </div>
  )
}

function JudgeComparisonViz() {
  return (
    <div className="flex h-full flex-col gap-4 rounded border border-border-subtle bg-bg-raised p-6">
      <MonoLabel className="block text-[11px]">Config Diff — v7 vs v8 candidate</MonoLabel>
      <div className="flex flex-1 flex-col justify-center">
        <div className="overflow-hidden rounded border border-border-subtle font-mono text-[13px]">
          <div className="flex border-b border-border-subtle">
            <span className="w-1/2 border-r border-border-subtle bg-signal-bad/5 px-4 py-2.5 text-signal-bad">— v7 (current)</span>
            <span className="w-1/2 bg-signal-good/5 px-4 py-2.5 text-signal-good">+ v8 (candidate)</span>
          </div>
          {[
            ['  model: gpt-4o',    '  model: gpt-4o'],
            ['- ttl: 300',         '+ ttl: 900'],
            ['  retries: 1',       '  retries: 1'],
            ['- temperature: 0.9', '+ temperature: 0.7'],
            ['  tool: search_v2',  '  tool: search_v2'],
          ].map(([left, right], i) => (
            <div key={i} className="flex border-t border-border-subtle/50">
              <span className={`w-1/2 border-r border-border-subtle/50 px-4 py-2 ${left.startsWith('-') ? 'bg-signal-bad/5 text-signal-bad' : 'text-text-tertiary'}`}>{left}</span>
              <span className={`w-1/2 px-4 py-2 ${right.startsWith('+') ? 'bg-signal-good/5 text-signal-good' : 'text-text-tertiary'}`}>{right}</span>
            </div>
          ))}
          <div className="border-t border-border-subtle bg-bg-overlay px-4 py-2.5">
            <span className="text-signal-good">score 94.2 → 97.8</span>
            <span className="mx-3 text-text-tertiary">·</span>
            <span className="text-signal-good">fail_rate 2.9% → 1.2%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function RootCauseViz() {
  const [expanded, setExpanded] = useState(true)
  return (
    <div className="flex h-full flex-col gap-4 rounded border border-border-subtle bg-bg-raised p-6">
      <MonoLabel className="block text-[11px]">Trace Tree — run_b7e14 (fail)</MonoLabel>
      <div className="flex flex-1 flex-col justify-center font-mono text-[14px]">
        <button type="button" className="flex items-center gap-3 text-left" onClick={() => setExpanded(!expanded)}>
          <span className="text-text-tertiary">{expanded ? '▼' : '▶'}</span>
          <span className="text-signal-bad">agent_run</span>
          <span className="text-[11px] text-signal-bad">[FAIL]</span>
        </button>
        {expanded && (
          <div className="ml-5 mt-3 flex flex-col gap-3 border-l border-border-subtle pl-5">
            {[
              { label: 'plan_step',                     status: 'good' },
              { label: 'call_tool  [timeout 5003ms]',   status: 'bad'  },
              { label: 'retry → call_tool  [ok 312ms]', status: 'good' },
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

function LogsViz() {
  const lines = [
    { ts: '14:23:01.042', level: 'INFO',  msg: 'agent=sales.v7 run=a4f291 start' },
    { ts: '14:23:01.188', level: 'DEBUG', msg: 'span=call_llm tokens_in=1247 tokens_out=312' },
    { ts: '14:23:03.922', level: 'WARN',  msg: 'span=tool_search latency=4180ms' },
    { ts: '14:23:03.924', level: 'ERROR', msg: 'span=tool_search error="upstream timeout"' },
    { ts: '14:23:04.001', level: 'INFO',  msg: 'span=retry attempt=2 backoff=1000ms' },
    { ts: '14:23:04.388', level: 'INFO',  msg: 'span=tool_search ok latency=361ms' },
    { ts: '14:23:05.112', level: 'INFO',  msg: 'agent=sales.v7 run=a4f291 end score=0.91' },
  ]
  const color: Record<string, string> = {
    INFO: 'text-text-secondary', DEBUG: 'text-text-tertiary',
    WARN: 'text-signal-warn', ERROR: 'text-signal-bad',
  }
  return (
    <div className="flex h-full flex-col gap-4 rounded border border-border-subtle bg-bg-raised p-6">
      <MonoLabel className="block text-[11px]">Log Stream — run_a4f291</MonoLabel>
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
    id: 'observation',
    title: 'Observation',
    headline: 'Every span. Every run.',
    body: 'Aviran instruments your agent at the span level via OpenTelemetry, capturing full trace fidelity without sampling. Every production run is stored, indexed, and queryable.',
    bullets: [
      'Span-level traces with <2ms overhead at p50',
      'PII redaction via Presidio before storage',
      'Query by agent, run, cluster, or time window',
    ],
    Viz: ObservationViz,
  },
  {
    id: 'issue-patterns',
    title: 'Issue Patterns',
    headline: 'Failures cluster automatically.',
    body: 'Aviran embeds span summaries into pgvector, runs DBSCAN clustering, and surfaces recurring failure signatures—no manual labeling, no threshold tuning.',
    bullets: [
      'Semantic clustering over span embeddings',
      'Cluster severity scored by frequency × impact',
      'Webhook alerts when new cluster exceeds threshold',
    ],
    Viz: IssuePatternsViz,
  },
  {
    id: 'sampling-optimization',
    title: 'Sampling Optimization',
    headline: 'Bayesian optimization finds the best config.',
    body: 'Aviran uses state-of-the-art sampling algorithms—TPE (Tree-structured Parzen Estimator) for discrete config search and CMA-ES for continuous parameters like temperature and penalty weights. DSPy generates prompt mutations as structured proposals. Every candidate is scored on real held-out production traffic, not synthetic benchmarks.',
    bullets: [
      'TPE for efficient Bayesian exploration of prompt and tool space',
      'CMA-ES for continuous params (temperature, top_p, penalty weights)',
      'DSPy-guided prompt mutations as search proposals',
      'Candidates scored on real traffic, not synthetic evals',
    ],
    Viz: JudgeComparisonViz,
  },
  {
    id: 'rca',
    title: 'Root Cause Analysis',
    headline: 'Trace a failure to its exact cause.',
    body: 'Drill into any failing run. Aviran presents the span tree, highlights the offending node, and surfaces causal attribution across prompt, tool call, and parameter.',
    bullets: [
      'Collapsible trace tree per run',
      'Causal attribution: prompt vs. tool vs. config',
      'Linked directly to the cluster and suggested fix',
    ],
    Viz: RootCauseViz,
  },
  {
    id: 'logs',
    title: 'Logs',
    headline: 'Full audit trail, queryable.',
    body: 'Structured log lines for every agent interaction with level, timestamp, and span context. Filter by level, agent, or run.',
    bullets: [
      'Structured JSON logs with span correlation IDs',
      'Retention configurable per environment',
      'Exportable to S3, GCS, or your SIEM',
    ],
    Viz: LogsViz,
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
            Automatically monitor + diagnose + fix.
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
            Automatically monitor + diagnose + fix.
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
