import { ArrowUpRight } from 'lucide-react'
import { MonoLabel } from '../primitives/MonoLabel'

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-bg-base px-6 py-28 md:py-40"
      aria-label="Hero"
      style={{
        backgroundImage:
          'radial-gradient(600px 400px at 20% 35%, rgba(77,163,255,0.08), transparent 70%), ' +
          'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), ' +
          'linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
        backgroundSize: 'auto, 48px 48px, 48px 48px',
      }}
    >
      <div className="mx-auto flex max-w-[760px] flex-col gap-6">
        <MonoLabel className="tracking-[0.15em]">AI FDE for Agent Vendors</MonoLabel>

        <h1 className="font-display text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-text-primary md:text-[64px]">
          Deploy your product in minutes, not weeks.
        </h1>

        <p className="font-body text-[18px] leading-relaxed text-text-secondary md:text-[21px]" style={{ maxWidth: '600px' }}>
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
    </section>
  )
}
