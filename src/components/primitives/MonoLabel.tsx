import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface MonoLabelProps {
  children: ReactNode
  className?: string
}

export function MonoLabel({ children, className }: MonoLabelProps) {
  return (
    <span
      className={cn(
        'font-mono text-xs uppercase tracking-[0.15em] text-text-tertiary',
        className
      )}
    >
      {children}
    </span>
  )
}
