import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Radio, Layers, Stethoscope, FlaskConical, Rocket } from 'lucide-react'
import { BracketPanel } from '../primitives/BracketPanel'
import { MonoLabel } from '../primitives/MonoLabel'

const NODES = [
  {
    num: '01',
    label: 'OBSERVE',
    icon: Radio,
    desc: 'Span-level telemetry via OpenTelemetry.',
    details: [
      'OTel spans, 1:1 trace fidelity per production run',
      'PII redaction via Presidio before any storage',
      '<2ms overhead at p50, <8ms at p99',
    ],
  },
  {
    num: '02',
    label: 'CLUSTER',
    icon: Layers,
    desc: 'Semantic clustering of failure patterns.',
    details: [
      'pgvector embeddings over span summaries',
      'DBSCAN clustering, no manual labeling required',
      'New cluster alerts delivered via webhook',
    ],
  },
  {
    num: '03',
    label: 'DIAGNOSE',
    icon: Stethoscope,
    desc: 'Root-cause attribution per cluster.',
    details: [
      'Causal attribution: prompt vs. tool vs. param',
      'Counterfactual traces generated per cluster',
      'Confidence scores surfaced in the dashboard',
    ],
  },
  {
    num: '04',
    label: 'SIMULATE',
    icon: FlaskConical,
    desc: 'Candidate configs scored on real traffic.',
    details: [
      'DSPy + Optuna search over prompt/tool/param space',
      'Replayed against historical traces as ground truth',
      'Pareto-optimal candidates ranked by score + latency',
    ],
  },
  {
    num: '05',
    label: 'DEPLOY',
    icon: Rocket,
    desc: 'Winning version shipped behind a feature flag.',
    details: [
      'Gradual rollout: 1% → 10% → 50% → 100%',
      'Guardrails: auto-rollback if fail_rate exceeds threshold',
      'Full audit trail in Candidate Registry',
    ],
  },
]

interface NodeTooltipProps {
  details: string[]
}

function NodeTooltip({ details }: NodeTooltipProps) {
  return (
    <div className="absolute left-1/2 top-full z-20 mt-3 w-64 -translate-x-1/2 rounded border border-border-strong bg-bg-overlay p-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <ul className="flex flex-col gap-1.5">
        {details.map((d, i) => (
          <li key={i} className="flex items-start gap-2 font-mono text-[11px] text-text-secondary">
            <span className="mt-0.5 shrink-0 text-accent">›</span>
            {d}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function LoopVisualizer() {
  const [hovered, setHovered] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })
  const reduced = useReducedMotion()

  return (
    <section
      id="features"
      ref={containerRef}
      className="bg-bg-base px-6 py-24 md:py-32"
      aria-label="The Loop"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col gap-3">
          <MonoLabel>The Loop</MonoLabel>
          <h2 className="font-display text-[32px] font-semibold leading-tight tracking-[-0.02em] text-text-primary md:text-[40px]">
            Five stages. Zero humans in the critical path.
          </h2>
        </div>

        {/* Pipeline */}
        <BracketPanel className="overflow-visible p-8 md:p-10">
          {/* Nodes row */}
          <div className="relative">
            <div className="grid grid-cols-5 gap-0">
              {NODES.map((node, i) => {
                const Icon = node.icon
                const active = hovered === i
                return (
                  <div key={node.label} className="relative flex flex-col items-center">
                    {/* Connector line — left side (skip first) */}
                    {i > 0 && (
                      <div className="absolute left-0 top-[44px] h-px w-1/2 bg-border-strong" aria-hidden="true" />
                    )}
                    {/* Connector line — right side (skip last) */}
                    {i < NODES.length - 1 && (
                      <div className="absolute right-0 top-[44px] h-px w-1/2 bg-border-strong" aria-hidden="true" />
                    )}

                    {/* Node box */}
                    <motion.div
                      className="relative z-10 flex flex-col items-center"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${node.label}: ${node.desc}`}
                    >
                      <MonoLabel className="mb-2 text-[9px]">{node.num} · {node.label}</MonoLabel>
                      <motion.div
                        className={`flex h-[88px] w-[88px] flex-col items-center justify-center rounded-sm border transition-colors duration-200 ${active ? 'border-accent bg-accent-dim/30' : 'border-border-strong bg-bg-raised'}`}
                        style={{
                          boxShadow: active ? '0 0 0 1px rgba(77,163,255,0.15), inset 0 1px 0 rgba(77,163,255,0.08)' : undefined,
                        }}
                        animate={
                          !reduced && isInView
                            ? { opacity: 1, y: 0 }
                            : { opacity: 1, y: 0 }
                        }
                        initial={!reduced ? { opacity: 0, y: 12 } : false}
                        transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <motion.div
                          animate={active && !reduced ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <Icon
                            size={22}
                            className={`transition-colors duration-200 ${active ? 'text-accent' : 'text-text-tertiary'}`}
                            aria-hidden="true"
                          />
                        </motion.div>
                      </motion.div>
                      <p className="mt-2 max-w-[100px] text-center font-mono text-[10px] leading-snug text-text-tertiary">
                        {node.desc}
                      </p>

                      {/* Tooltip */}
                      {active && <NodeTooltip details={node.details} />}
                    </motion.div>
                  </div>
                )
              })}
            </div>

            {/* Traveling packet */}
            {!reduced && isInView && (
              <motion.div
                className="pointer-events-none absolute top-[40px] h-2 w-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_rgba(77,163,255,0.8)]"
                aria-hidden="true"
                animate={{ left: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
              />
            )}
          </div>

          {/* Return arrow SVG */}
          <div className="mt-6 flex justify-center" aria-hidden="true">
            <svg viewBox="0 0 600 32" width="100%" height="32" aria-hidden="true">
              <defs>
                <marker id="arrow-head" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M 0 0 L 6 3 L 0 6 Z" fill="#2A3547" />
                </marker>
              </defs>
              <path
                d="M 560 4 Q 590 4 590 16 Q 590 28 560 28 L 40 28 Q 10 28 10 16 Q 10 4 40 4 L 80 4"
                fill="none"
                stroke="#2A3547"
                strokeWidth="1"
                strokeDasharray="4 4"
                markerEnd="url(#arrow-head)"
              />
              <text x="290" y="22" textAnchor="middle" fill="#525F74" fontSize="9" fontFamily="JetBrains Mono, monospace">
                LOOP BACK TO OBSERVE
              </text>
            </svg>
          </div>
        </BracketPanel>
      </div>
    </section>
  )
}
