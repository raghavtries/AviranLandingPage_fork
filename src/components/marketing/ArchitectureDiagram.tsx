import { MonoLabel } from '../primitives/MonoLabel'

const ROW1 = [
  'Your Agent',
  'OTel Collector',
  'Ingestion API',
  'NATS JetStream',
  'Classifier Worker',
]

const ROW2 = [
  'pgvector + Postgres',
  'Optimizer',
  'Candidate Registry',
  'Feature Flag Router',
  'Your Agent',
]

function ArchNode({ label, dashed = false }: { label: string; dashed?: boolean }) {
  return (
    <div
      className={`relative flex h-10 min-w-0 flex-1 items-center justify-center border px-2 ${
        dashed ? 'border-dashed border-border-strong' : 'border-border-strong'
      } bg-bg-raised`}
    >
      <span className="pointer-events-none absolute -left-px -top-px h-1.5 w-1.5 border-l border-t border-accent/40" />
      <span className="pointer-events-none absolute -right-px -top-px h-1.5 w-1.5 border-r border-t border-accent/40" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-1.5 w-1.5 border-b border-l border-accent/40" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-1.5 w-1.5 border-b border-r border-accent/40" />
      <span className="truncate text-center font-mono text-[10px] text-text-secondary">{label}</span>
    </div>
  )
}

function Arrow({ dir = 'right', dashed = false }: { dir?: 'right' | 'left' | 'down'; dashed?: boolean }) {
  const cls = `shrink-0 text-border-strong ${dashed ? 'opacity-60' : 'opacity-100'}`
  if (dir === 'right') return <span className={`${cls} font-mono text-xs`}>→</span>
  if (dir === 'left')  return <span className={`${cls} font-mono text-xs`}>←</span>
  return <span className={`${cls} font-mono text-xs`}>↓</span>
}

export function ArchitectureDiagram() {
  return (
    <section className="bg-bg-raised px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-4 flex flex-col gap-3">
          <MonoLabel>Architecture</MonoLabel>
          <h2 className="font-display text-[28px] font-semibold leading-tight tracking-[-0.02em] text-text-primary md:text-[36px]">
            Built on boring, proven infrastructure.
          </h2>
        </div>
        <p className="mb-10 max-w-[640px] font-body text-[14px] leading-relaxed text-text-secondary">
          Aviran is FastAPI, PostgreSQL with pgvector, Redis, and NATS JetStream for durable
          work queues. Nothing exotic. Nothing you&apos;ll have to explain to your security team.
        </p>

        {/* Diagram */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Row 1 — left to right */}
            <div className="flex items-center gap-1">
              {ROW1.map((label, i) => (
                <div key={i} className="flex flex-1 items-center gap-1">
                  <ArchNode label={label} />
                  {i < ROW1.length - 1 && <Arrow dir="right" />}
                </div>
              ))}
            </div>

            {/* Down arrow from row1[4] to row2[0] */}
            <div className="flex justify-end pr-4">
              <Arrow dir="down" />
            </div>

            {/* Row 2 — right to left (dashed = return path) */}
            <div className="flex items-center gap-1">
              {ROW2.map((label, i) => (
                <div key={i} className="flex flex-1 items-center gap-1">
                  <ArchNode label={label} dashed={i === ROW2.length - 1} />
                  {i < ROW2.length - 1 && <Arrow dir="left" dashed />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info tiles */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: 'OpenTelemetry-native', desc: 'Any OTel-compatible agent or framework works out of the box.' },
            { label: 'PII-safe by default',  desc: 'Presidio scrubs PII from spans before ingestion. No raw user data stored.' },
            { label: 'Self-hostable',         desc: 'Deploy entirely inside your VPC. Bring-your-own cloud on request.' },
          ].map((tile) => (
            <div key={tile.label} className="rounded border border-border-subtle bg-bg-base p-4">
              <MonoLabel className="mb-2 block">{tile.label}</MonoLabel>
              <p className="font-body text-[13px] text-text-secondary">{tile.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
