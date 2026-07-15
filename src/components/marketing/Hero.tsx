import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { BracketPanel } from '../primitives/BracketPanel'
import { MonoLabel } from '../primitives/MonoLabel'

interface NetNode { x: number; y: number; r: number }
type NetEdge = [number, number]

// Deterministic-enough organic mesh: each node links to its 1-2 nearest neighbors.
function generateNetwork(nodeCount: number, w: number, h: number, pad = 20) {
  const nodes: NetNode[] = Array.from({ length: nodeCount }, () => ({
    x: pad + Math.random() * (w - pad * 2),
    y: pad + Math.random() * (h - pad * 2),
    r: 1.4 + Math.random() * 2,
  }))
  const edges: NetEdge[] = []
  nodes.forEach((n, i) => {
    const ranked = nodes
      .map((m, j) => ({ j, d: j === i ? Infinity : Math.hypot(n.x - m.x, n.y - m.y) }))
      .sort((a, b) => a.d - b.d)
    const linkCount = 1 + Math.round(Math.random())
    for (let k = 0; k < linkCount; k++) {
      const j = ranked[k].j
      if (!edges.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) {
        edges.push([i, j])
      }
    }
  })
  return { nodes, edges }
}

// Abstract, self-organizing network — decorative, not a literal chart.
function NetworkMesh({
  nodeCount,
  width,
  height,
  travelers = 3,
  className,
}: {
  nodeCount: number
  width: number
  height: number
  travelers?: number
  className?: string
}) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const { nodes, edges } = useMemo(() => generateNetwork(nodeCount, width, height), [nodeCount, width, height])
  const travelerEdges = useMemo(
    () =>
      edges.length
        ? Array.from({ length: Math.min(travelers, edges.length) }, () => edges[Math.floor(Math.random() * edges.length)])
        : [],
    [edges, travelers]
  )

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" width="100%" height="100%" className={className} aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="#4DA3FF" strokeWidth="0.6" strokeOpacity="0.18"
        />
      ))}
      {!prefersReduced &&
        travelerEdges.map(([a, b], i) => (
          <motion.circle
            key={`t${i}`}
            r="1.6"
            fill="#4DA3FF"
            style={{ filter: 'drop-shadow(0 0 3px rgba(77,163,255,0.9))' }}
            animate={{ cx: [nodes[a].x, nodes[b].x, nodes[a].x], cy: [nodes[a].y, nodes[b].y, nodes[a].y] }}
            transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, ease: 'linear', delay: Math.random() * 2 }}
          />
        ))}
      {nodes.map((n, i) =>
        prefersReduced ? (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} fill="#4DA3FF" fillOpacity="0.5" />
        ) : (
          <motion.circle
            key={i}
            cx={n.x} cy={n.y} r={n.r}
            fill="#4DA3FF"
            animate={{ opacity: [0.25, 0.9, 0.25] }}
            transition={{ duration: 2.5 + Math.random() * 2.5, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 3 }}
          />
        )
      )}
    </svg>
  )
}

export function Hero() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
      {/* Decorative network texture behind the whole header — not data, just atmosphere */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <NetworkMesh nodeCount={30} width={1400} height={780} travelers={5} />
      </div>

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
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

        {/* Right — abstract, self-organizing network (decorative, not literal) */}
        <BracketPanel className="relative aspect-[4/5] w-full overflow-hidden" glow>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(60% 55% at 50% 42%, rgba(77,163,255,0.12), transparent 70%)',
            }}
          />
          <motion.svg
            viewBox="0 0 400 480"
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            animate={!prefersReduced ? { rotate: 360 } : {}}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '200px 230px' }}
          >
            <ellipse cx="200" cy="230" rx="150" ry="180" fill="none" stroke="#4DA3FF" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="3 7" />
          </motion.svg>
          <NetworkMesh nodeCount={20} width={400} height={480} travelers={4} className="absolute inset-0" />
        </BracketPanel>
      </div>
    </section>
  )
}
