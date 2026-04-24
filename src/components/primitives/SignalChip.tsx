type SignalVariant = 'healthy' | 'warn' | 'bad' | 'running'

const variantStyles: Record<SignalVariant, { border: string; bg: string; text: string; dot: string }> = {
  healthy: {
    border: 'border-signal-good/40',
    bg:     'bg-signal-good/10',
    text:   'text-signal-good',
    dot:    'bg-signal-good',
  },
  warn: {
    border: 'border-signal-warn/40',
    bg:     'bg-signal-warn/10',
    text:   'text-signal-warn',
    dot:    'bg-signal-warn',
  },
  bad: {
    border: 'border-signal-bad/40',
    bg:     'bg-signal-bad/10',
    text:   'text-signal-bad',
    dot:    'bg-signal-bad',
  },
  running: {
    border: 'border-accent/40',
    bg:     'bg-accent/10',
    text:   'text-accent',
    dot:    'bg-accent',
  },
}

interface SignalChipProps {
  variant: SignalVariant
  label?: string
}

export function SignalChip({ variant, label }: SignalChipProps) {
  const s = variantStyles[variant]
  const displayLabel = label ?? variant.toUpperCase()
  const pulse = variant === 'healthy' || variant === 'running'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] ${s.border} ${s.bg} ${s.text}`}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className={`absolute inset-0 rounded-full ${s.dot} ${pulse ? 'animate-ping opacity-75' : ''}`} />
        <span className={`relative rounded-full h-1.5 w-1.5 ${s.dot}`} />
      </span>
      {displayLabel}
    </span>
  )
}
