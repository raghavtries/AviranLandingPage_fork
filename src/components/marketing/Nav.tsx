import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Features',     href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-base/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center px-6">
        {/* Wordmark */}
        <a href="/" className="flex items-center gap-2.5 no-underline mr-auto">
          <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-text-primary">
            Aviran
          </span>
        </a>

        {/* Center nav — desktop */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded px-3 py-1.5 font-body text-[13px] text-text-secondary transition-colors duration-200 hover:bg-bg-overlay hover:text-text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right CTAs — desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://calendly.com/raghav-jsub/chat"
            className="group inline-flex items-center gap-1 rounded border border-accent/40 bg-accent/10 px-3 py-1.5 font-body text-[13px] text-accent shadow-[inset_0_1px_0_rgba(77,163,255,0.12)] transition-all duration-200 hover:border-accent/70 hover:bg-accent/15 hover:shadow-[0_0_16px_rgba(77,163,255,0.18)]"
          >
            Request access
            <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded text-text-secondary md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border-subtle bg-bg-raised px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded px-3 py-2 font-body text-sm text-text-secondary hover:bg-bg-overlay hover:text-text-primary"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t border-border-subtle pt-4">
            <a
              href="https://calendly.com/raghav-jsub/chat"
              className="inline-flex items-center justify-center gap-1 rounded border border-accent/40 bg-accent/10 px-3 py-2 font-body text-sm text-accent"
            >
              Request access <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
