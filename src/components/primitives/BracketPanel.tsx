import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface BracketPanelProps {
  children: ReactNode
  className?: string
  glow?: boolean
  label?: string
}

export function BracketPanel({ children, className, glow, label }: BracketPanelProps) {
  return (
    <div
      className={cn(
        'relative border border-border-subtle bg-bg-raised',
        glow && 'shadow-[0_0_24px_rgba(77,163,255,0.12)]',
        className
      )}
    >
      {label && (
        <span className="absolute -top-[10px] left-4 bg-bg-base px-2 font-mono text-[10px] uppercase tracking-[0.15em] text-text-tertiary">
          {label}
        </span>
      )}
      {/* Corner brackets */}
      <span className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l-2 border-t-2 border-border-strong" />
      <span className="pointer-events-none absolute -right-px -top-px h-2 w-2 border-r-2 border-t-2 border-border-strong" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-2 w-2 border-b-2 border-l-2 border-border-strong" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b-2 border-r-2 border-border-strong" />
      {children}
    </div>
  )
}
