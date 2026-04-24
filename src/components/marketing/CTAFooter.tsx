import { useState } from 'react'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { BracketPanel } from '../primitives/BracketPanel'
import { MonoLabel } from '../primitives/MonoLabel'

const EMAIL = 'hello@aviran.dev'

export function CTAFooter() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="bg-bg-base px-6 py-24 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <BracketPanel className="p-10 md:p-16" glow>
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4" style={{ maxWidth: 580 }}>
              <MonoLabel>Get Started</MonoLabel>
              <h2 className="font-display text-[32px] font-semibold leading-tight tracking-[-0.02em] text-text-primary md:text-[44px]">
                Stop watching dashboards. Start shipping fixes.
              </h2>
              <p className="font-body text-[15px] leading-relaxed text-text-secondary">
                30-minute technical walkthrough. We&apos;ll instrument one of your agents live.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
              <a
                href="https://cal.com/aviran/demo"
                className="group inline-flex items-center gap-1.5 rounded border border-accent/40 bg-accent/10 px-5 py-3 font-body text-sm font-medium text-accent shadow-[inset_0_1px_0_rgba(77,163,255,0.12)] transition-all duration-200 hover:border-accent/70 hover:bg-accent/15 hover:shadow-[0_0_24px_rgba(77,163,255,0.22)]"
              >
                Book a walkthrough
                <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="group inline-flex items-center gap-2 font-mono text-[12px] text-text-tertiary transition-colors duration-200 hover:text-text-secondary focus:outline-none focus-visible:ring-1 focus-visible:ring-border-strong"
                aria-label={copied ? 'Email copied' : 'Copy email address'}
              >
                <span>{EMAIL}</span>
                {copied ? (
                  <Check size={12} className="text-signal-good" />
                ) : (
                  <Copy size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </button>
            </div>
          </div>
        </BracketPanel>
      </div>
    </section>
  )
}
