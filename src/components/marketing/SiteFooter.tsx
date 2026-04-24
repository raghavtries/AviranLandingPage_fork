import { MonoLabel } from '../primitives/MonoLabel'
import { SignalChip } from '../primitives/SignalChip'

const COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features',     href: '#features' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Changelog',    href: '#' },
      { label: 'Roadmap',      href: '#' },
    ],
  },
  {
    heading: 'Developers',
    links: [
      { label: 'Docs',          href: '#docs' },
      { label: 'API Reference', href: '#docs' },
      { label: 'SDK',           href: '#' },
      { label: 'Status',        href: '#' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About',   href: '#' },
      { label: 'Blog',    href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Cases',   href: '/cases' },
    ],
  },
  {
    heading: 'Contact',
    links: [
      { label: 'akshaj.molukutla@gmail.com', href: 'mailto:akshaj.molukutla@gmail.com' },
      { label: 'raghav.jsub@gmail.com',      href: 'mailto:raghav.jsub@gmail.com' },
      { label: 'hello@aviran.dev',           href: 'mailto:hello@aviran.dev' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-bg-raised">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        {/* Top — wordmark + columns */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          {/* Wordmark */}
          <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 no-underline">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-signal-good opacity-75" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-signal-good" />
              </span>
              <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-text-primary">
                Aviran
              </span>
            </a>
            <p className="font-mono text-[11px] text-text-tertiary" style={{ maxWidth: 200 }}>
              CI/CD for AI agents. Observe → diagnose → rewrite → simulate → deploy.
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <MonoLabel>{col.heading}</MonoLabel>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-[13px] text-text-tertiary transition-colors duration-200 hover:text-text-secondary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-6">
          <span className="font-mono text-[11px] text-text-tertiary">
            © {new Date().getFullYear()} Aviran. All rights reserved.
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-text-tertiary">Backed by YC</span>
            <span className="text-text-tertiary">·</span>
            {/* TODO: link to real status page once status.aviran.dev exists */}
            <a
              href="#"
              className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-tertiary transition-colors hover:text-text-secondary"
            >
              <SignalChip variant="healthy" label="OPERATIONAL" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
