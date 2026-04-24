import { MonoLabel } from '../primitives/MonoLabel'

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <span className="inline-flex h-8 items-center rounded border border-border-subtle px-3 font-mono text-xs tracking-[0.1em] text-text-tertiary opacity-60 transition-opacity duration-200 hover:opacity-100">
      {name.toUpperCase()}
    </span>
  )
}

const PARTNERS = [
  { name: 'Sentrial', href: 'https://sentrial.ai' },
  { name: 'Martin',   href: '#' },
  { name: 'Wyn Labs', href: '#' },
]

const PLACEHOLDERS = ['Partner', 'Partner', 'Partner']

export function SocialProof() {
  return (
    <div id="social-proof" className="border-y border-border-subtle bg-bg-raised">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-6 px-6 py-5">
        <MonoLabel className="shrink-0 whitespace-nowrap">In production with</MonoLabel>
        <div className="flex flex-wrap items-center gap-4">
          {PARTNERS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              className="inline-flex h-8 items-center font-mono text-xs tracking-[0.1em] text-text-secondary opacity-60 transition-opacity duration-200 hover:opacity-100"
            >
              {p.name}
            </a>
          ))}
          {PLACEHOLDERS.map((_, i) => (
            <LogoPlaceholder key={i} name="Partner" />
          ))}
        </div>
      </div>
    </div>
  )
}
