import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { BracketPanel } from '../primitives/BracketPanel'
import { MonoLabel } from '../primitives/MonoLabel'
import { SignalChip } from '../primitives/SignalChip'

const STAGES = [
  { label: 'DISCOVER',  detail: 'reading SOW, calls, schemas',      cmd: 'aviran discover --customer' },
  { label: 'MAP',       detail: 'systems → product model',          cmd: 'aviran map --customer' },
  { label: 'CONFIGURE', detail: 'generating config & workflows',    cmd: 'aviran configure --customer' },
  { label: 'VALIDATE',  detail: 'running acceptance tests',         cmd: 'aviran validate --customer' },
  { label: 'LAUNCH',    detail: 'live',                             cmd: 'aviran launch --customer' },
]

const CUSTOMERS = ['acme_corp', 'globex_inc', 'initech']

// Typing effect for a single command line, retriggered by remounting via `key`
function TypingLine({ cmd }: { cmd: string }) {
  const [text, setText] = useState('')
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReduced) {
      setText(cmd)
      return
    }
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const type = () => {
      i++
      setText(cmd.slice(0, i))
      if (i < cmd.length) timer = setTimeout(type, 22)
    }
    timer = setTimeout(type, 150)
    return () => clearTimeout(timer)
  }, [cmd, prefersReduced])

  return (
    <span className="text-accent">
      {text}
      <span className="animate-pulse">_</span>
    </span>
  )
}

// Animated pipeline: steps through Discover → Map → Configure → Validate → Launch,
// looping across a few example customers to show onboarding speed.
function DeploymentPipeline() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [stage, setStage] = useState(prefersReduced ? STAGES.length - 1 : 0)
  const [customer, setCustomer] = useState(0)

  useEffect(() => {
    if (prefersReduced) return
    let cancelled = false
    let s = 0
    let cust = 0
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (cancelled) return
      setStage(s)
      setCustomer(cust)
      const atLaunch = s === STAGES.length - 1
      timer = setTimeout(() => {
        if (atLaunch) {
          s = 0
          cust = (cust + 1) % CUSTOMERS.length
        } else {
          s += 1
        }
        tick()
      }, atLaunch ? 2200 : 1100)
    }

    tick()
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [prefersReduced])

  const customerName = CUSTOMERS[customer]

  return (
    <>
      <div className="flex items-center justify-between border-b border-border-subtle px-3 py-2">
        <span className="font-mono text-[10px] text-text-tertiary">
          CUSTOMER: <span className="text-text-secondary">{customerName}</span>
        </span>
        <span className="font-mono text-[10px] text-text-tertiary">
          {stage === STAGES.length - 1 ? (
            <span className="text-signal-good">LIVE</span>
          ) : (
            `stage ${stage + 1}/${STAGES.length}`
          )}
        </span>
      </div>

      <div className="flex flex-col gap-0 px-3 py-4">
        {STAGES.map((s, i) => {
          const state = i < stage ? 'done' : i === stage ? 'active' : 'pending'
          return (
            <div key={s.label} className="relative flex gap-3 pb-5 last:pb-0">
              {i < STAGES.length - 1 && (
                <span
                  className="absolute left-[7px] top-4 h-full w-px transition-colors duration-300"
                  style={{ backgroundColor: state === 'done' ? '#4DA3FF' : '#2A3547' }}
                  aria-hidden="true"
                />
              )}
              <span
                className="relative z-10 mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
                style={{
                  backgroundColor: state === 'done' ? '#4DA3FF' : state === 'active' ? 'rgba(77,163,255,0.15)' : 'transparent',
                  borderColor: state === 'pending' ? '#2A3547' : '#4DA3FF',
                }}
              >
                {state === 'done' && <Check size={9} className="text-bg-base" strokeWidth={3} />}
                {state === 'active' && (
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className={`font-mono text-[11px] uppercase tracking-[0.08em] ${state === 'pending' ? 'text-text-tertiary' : 'text-text-primary'}`}>
                  {s.label}
                </span>
                <span className="font-mono text-[10px] text-text-tertiary">{s.detail}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="border-t border-border-subtle px-3 py-2.5">
        <p className="font-mono text-[11px] leading-none text-text-tertiary">
          <TypingLine key={`${customer}-${stage}`} cmd={`> ${STAGES[stage].cmd} ${customerName}`} />
        </p>
      </div>
    </>
  )
}

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-bg-base px-6 py-24 md:py-32"
      aria-label="Hero"
      style={{
        backgroundImage:
          'radial-gradient(600px 400px at 20% 35%, rgba(77,163,255,0.08), transparent 70%), ' +
          'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), ' +
          'linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
        backgroundSize: 'auto, 48px 48px, 48px 48px',
      }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
        {/* Left — copy */}
        <div className="flex flex-col gap-6 pt-4">
          <MonoLabel className="tracking-[0.15em]">AI FDE for Agent Vendors</MonoLabel>

          <h1
            className="font-display text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-text-primary md:text-[56px]"
            style={{ maxWidth: '560px' }}
          >
            Deploy your product in minutes, not weeks.
          </h1>

          <p className="font-body text-[18px] leading-relaxed text-text-secondary md:text-[21px]" style={{ maxWidth: '540px' }}>
            Aviran is the AI FDE for agent vendors — it learns your product once,
            then handles onboarding and maintenance for every enterprise customer.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://calendly.com/raghav-jsub/chat"
              className="group inline-flex items-center gap-2 rounded border border-accent/40 bg-accent/10 px-7 py-4 font-body text-base font-medium text-accent shadow-[inset_0_1px_0_rgba(77,163,255,0.12)] transition-all duration-200 hover:border-accent/70 hover:bg-accent/15 hover:shadow-[0_0_24px_rgba(77,163,255,0.25)]"
            >
              Request access
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

        </div>

        {/* Right — Deployment pipeline panel */}
        <BracketPanel label="DEPLOYMENT" className="overflow-hidden" glow>
          {/* Top bar */}
          <div className="flex flex-wrap items-center gap-0 border-b border-border-subtle">
            <span className="border-r border-border-subtle px-3 py-2 font-mono text-[10px] text-text-tertiary">
              VENDOR: <span className="text-text-secondary">collectflow.v3</span>
            </span>
            <span className="flex items-center gap-2 px-3 py-2 font-mono text-[10px] text-text-tertiary">
              STATUS: <SignalChip variant="healthy" />
            </span>
          </div>

          <DeploymentPipeline />
        </BracketPanel>
      </div>
    </section>
  )
}
