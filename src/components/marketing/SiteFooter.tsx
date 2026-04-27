export function SiteFooter() {
  return (
    <footer className="border-t border-border-subtle bg-bg-raised">
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-text-primary">
            Aviran
          </span>
          <div className="flex flex-wrap items-center gap-6">
            <a href="mailto:akshaj.molukutla@gmail.com" className="font-mono text-[12px] text-text-tertiary transition-colors hover:text-text-secondary">
              akshaj.molukutla@gmail.com
            </a>
            <a href="mailto:raghav.jsub@gmail.com" className="font-mono text-[12px] text-text-tertiary transition-colors hover:text-text-secondary">
              raghav.jsub@gmail.com
            </a>
            <a href="mailto:hello@aviran.dev" className="font-mono text-[12px] text-text-tertiary transition-colors hover:text-text-secondary">
              hello@aviran.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
