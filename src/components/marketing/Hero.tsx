import { useEffect, useState, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { BracketPanel } from '../primitives/BracketPanel'
import { MonoLabel } from '../primitives/MonoLabel'
import { SignalChip } from '../primitives/SignalChip'

// Sparkline showing fail rate drop after v7 deploy
function Sparkline() {
  const pathRef = useRef<SVGPathElement>(null)
  const [len, setLen] = useState(0)
  const W = 340
  const H = 100

  // Points: high fail rate before x=180, drops after
  const pts: [number, number][] = [
    [0, 55], [25, 50], [50, 58], [75, 48], [100, 54],
    [125, 46], [150, 52], [170, 50],
    [180, 52],
    [195, 72], [215, 80], [235, 82], [255, 85], [275, 83], [300, 85], [320, 88], [340, 86],
  ]

  const d = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ')

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength())
  }, [])

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="relative" style={{ height: H }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        width="100%"
        height={H}
        aria-hidden="true"
        className="overflow-visible"
      >
        {/* Area fill */}
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4DA3FF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#4DA3FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`${d} L 340 ${H} L 0 ${H} Z`}
          fill="url(#spark-fill)"
        />
        {/* Line */}
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="#4DA3FF"
          strokeWidth="1.5"
          style={
            len > 0 && !prefersReduced
              ? {
                  strokeDasharray: len,
                  strokeDashoffset: len,
                  animation: 'drawLine 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s forwards',
                }
              : {}
          }
        />
        {/* Deploy marker */}
        <line x1="180" y1="8" x2="180" y2={H - 4} stroke="#2A3547" strokeWidth="1" strokeDasharray="3 3" />
        <text x="184" y="16" fill="#525F74" fontSize="8" fontFamily="JetBrains Mono, monospace">v7 deployed</text>
        {/* After-drop highlight dot */}
        <circle cx="340" cy="86" r="3" fill="#4DA3FF" />
      </svg>
      <style>{`
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  )
}

// Typing effect for the deploy command
function TypingLine() {
  const CMD = '> aviran deploy --candidate v8 --traffic 10% --guardrail fail_rate<2.0'
  const [text, setText] = useState('')
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (prefersReduced) {
      setText(CMD)
      return
    }
    let i = 0
    let timer: ReturnType<typeof setTimeout>

    const type = () => {
      i++
      setText(CMD.slice(0, i))
      if (i < CMD.length) {
        timer = setTimeout(type, 30)
      } else {
        // Wait ~8s after full text, then clear and restart
        timer = setTimeout(() => {
          setText('')
          i = 0
          timer = setTimeout(type, 500)
        }, 8000)
      }
    }

    timer = setTimeout(type, 800)
    return () => clearTimeout(timer)
  }, [prefersReduced])

  return (
    <span className="text-accent">
      {text}
      <span className="animate-pulse">_</span>
    </span>
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
          <MonoLabel className="tracking-[0.15em]">Reliability Infrastructure for AI Agents</MonoLabel>

          <h1
            className="font-display text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-text-primary md:text-[60px]"
            style={{ maxWidth: '580px' }}
          >
            Your agents ship fixes to themselves.
          </h1>

          <p className="font-body text-[18px] leading-relaxed text-text-secondary md:text-[21px]" style={{ maxWidth: '540px' }}>
            Aviran ingests every production run, clusters the failures, rewrites the
            prompts, tools, and parameters, and redeploys the versions that win.
            Observability that actually closes the loop.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://cal.com/aviran/demo"
              className="group inline-flex items-center gap-1.5 rounded border border-accent/40 bg-accent/10 px-4 py-2.5 font-body text-sm font-medium text-accent shadow-[inset_0_1px_0_rgba(77,163,255,0.12)] transition-all duration-200 hover:border-accent/70 hover:bg-accent/15 hover:shadow-[0_0_20px_rgba(77,163,255,0.2)]"
            >
              Request access
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#docs"
              className="inline-flex items-center gap-1.5 rounded border border-border-subtle px-4 py-2.5 font-body text-sm font-medium text-text-secondary transition-all duration-200 hover:border-border-strong hover:text-text-primary"
            >
              Read the docs
            </a>
          </div>

        </div>

        {/* Right — Live Ops panel */}
        <BracketPanel label="LIVE OPS" className="overflow-hidden" glow>
          {/* Top bar */}
          <div className="flex flex-wrap items-center gap-0 border-b border-border-subtle">
            <span className="border-r border-border-subtle px-3 py-2 font-mono text-[10px] text-text-tertiary">
              AGENT: <span className="text-text-secondary">client_a.sales.v7</span>
            </span>
            <span className="border-r border-border-subtle px-3 py-2 font-mono text-[10px] text-text-tertiary">
              REGION: <span className="text-text-secondary">us-east-1</span>
            </span>
            <span className="flex items-center gap-2 px-3 py-2 font-mono text-[10px] text-text-tertiary">
              STATUS: <SignalChip variant="healthy" />
            </span>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-3 divide-x divide-border-subtle border-b border-border-subtle">
            {[
              { label: 'RUNS (24H)', value: '14,028', delta: '+6.2%', up: true },
              { label: 'FAIL RATE',  value: '2.1%',   delta: '−0.8%', up: false },
              { label: 'P95 LAT',    value: '940ms',  delta: '−120ms', up: false },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1 px-3 py-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-tertiary">
                  {s.label}
                </span>
                <span className="font-mono text-lg font-medium text-text-primary leading-none">
                  {s.value}
                </span>
                <span className={`font-mono text-[10px] ${s.up ? 'text-signal-good' : 'text-signal-good'}`}>
                  {s.delta}
                </span>
              </div>
            ))}
          </div>

          {/* Sparkline */}
          <div className="border-b border-border-subtle px-3 py-3">
            <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.12em] text-text-tertiary">
              FAIL RATE — 7 DAY
            </span>
            <Sparkline />
          </div>

          {/* Cluster table */}
          <div className="border-b border-border-subtle">
            <div className="grid grid-cols-[auto_1fr_auto_auto] gap-x-3 border-b border-border-subtle px-3 py-1.5">
              {['CLUSTER ID', 'PATTERN', 'N', 'SUGGESTED FIX'].map((h) => (
                <span key={h} className="font-mono text-[9px] uppercase tracking-[0.1em] text-text-tertiary">
                  {h}
                </span>
              ))}
            </div>
            {[
              { id: 'c_0142', pattern: 'tool=search returns stale results', n: '412', fix: '↑ ttl 300→900' },
              { id: 'c_0089', pattern: 'handoff loop on refund intent',     n: '201', fix: 'split policy prompt' },
              { id: 'c_0037', pattern: 'timeout on invoice PDF extract',    n: '73',  fix: 'retry backoff=2x' },
            ].map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[auto_1fr_auto_auto] gap-x-3 px-3 py-2 transition-colors hover:bg-bg-overlay"
              >
                <span className="font-mono text-[10px] text-accent">{row.id}</span>
                <span className="truncate font-mono text-[10px] text-text-secondary">{row.pattern}</span>
                <span className="font-mono text-[10px] text-text-tertiary">{row.n}</span>
                <span className="font-mono text-[10px] text-signal-good">{row.fix}</span>
              </div>
            ))}
          </div>

          {/* Typing footer */}
          <div className="px-3 py-2.5">
            <p className="font-mono text-[11px] leading-none text-text-tertiary">
              <TypingLine />
            </p>
          </div>
        </BracketPanel>
      </div>
    </section>
  )
}
