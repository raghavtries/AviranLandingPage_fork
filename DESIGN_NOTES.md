# Aviran Landing Page — Design Notes

## Stack
React 18 + Vite + TypeScript + Tailwind CSS v4 + framer-motion + lucide-react.
No Next.js. No UI kit. No shadcn.

---

## Design Tokens

All tokens live in `src/index.css` inside the `@theme` block (Tailwind v4 convention).
They generate both Tailwind utility classes AND raw CSS variables.

| Token name           | Value      | Tailwind class           |
|----------------------|------------|--------------------------|
| `--color-bg-base`    | `#05070A`  | `bg-bg-base`             |
| `--color-bg-raised`  | `#0A0E14`  | `bg-bg-raised`           |
| `--color-bg-overlay` | `#111822`  | `bg-bg-overlay`          |
| `--color-border-subtle` | `#1A2230` | `border-border-subtle`  |
| `--color-border-strong` | `#2A3547` | `border-border-strong`  |
| `--color-text-primary`  | `#E6ECF5` | `text-text-primary`     |
| `--color-text-secondary`| `#8A97AB` | `text-text-secondary`   |
| `--color-text-tertiary` | `#525F74` | `text-text-tertiary`    |
| `--color-accent`     | `#4DA3FF`  | `text-accent`, `bg-accent`, `border-accent` |
| `--color-accent-dim` | `#1E3A5F`  | `bg-accent-dim`          |
| `--color-signal-good`| `#3DDC97`  | `text-signal-good`       |
| `--color-signal-warn`| `#F5A623`  | `text-signal-warn`       |
| `--color-signal-bad` | `#FF5C5C`  | `text-signal-bad`        |

Fonts (loaded via Google Fonts in `index.html`):
- `font-display` → Inter Tight 500–600
- `font-body` → Inter 400–500
- `font-mono` → JetBrains Mono 400–500

---

## Primitive Components

### `BracketPanel` — `src/components/primitives/BracketPanel.tsx`
The core container. Renders a 1px `border-border-subtle` border with four L-shaped
bracket marks at each corner in `border-border-strong`. Props:
- `className` — additional Tailwind classes
- `glow?: boolean` — adds `box-shadow` in accent blue
- `label?: string` — mono label that overlaps the top-left edge

### `MonoLabel` — `src/components/primitives/MonoLabel.tsx`
Uppercase mono micro-label in `text-text-tertiary` with `tracking-[0.15em]`.
Use it as the eyebrow above every section heading.

### `SignalChip` — `src/components/primitives/SignalChip.tsx`
Status chip with variants: `healthy | warn | bad | running`.
Each variant uses signal colors at 10% background opacity and 40% border opacity.
`healthy` and `running` show a pulsing dot.

---

## Section Map

| File                          | Section ID        | Purpose                          |
|-------------------------------|-------------------|----------------------------------|
| `marketing/Nav.tsx`           | sticky header     | Wordmark + nav + CTAs            |
| `marketing/Hero.tsx`          | —                 | Copy + Live Ops instrumentation panel |
| `marketing/SocialProof.tsx`   | `#social-proof`   | Design partner logos             |
| `marketing/LoopVisualizer.tsx`| `#features`       | 5-node pipeline animation        |
| `marketing/FeatureGrid.tsx`   | —                 | 3-card feature summary           |
| `marketing/HowItWorksNew.tsx` | `#how-it-works`   | 5-tab walkthrough + mini-viz     |
| `marketing/ArchitectureDiagram.tsx` | —           | 2-row system diagram             |
| `marketing/DocsGrid.tsx`      | `#docs`           | 4 doc cards with code snippets   |
| `marketing/FAQ.tsx`           | —                 | 4 accordion FAQs                 |
| `marketing/CTAFooter.tsx`     | —                 | Book walkthrough + copy email    |
| `marketing/SiteFooter.tsx`    | —                 | 4-column footer + status chip    |

---

## Editing Copy

Every text string is inline in its component — no CMS, no translation layer.

- **Hero headline/subhead**: `src/components/marketing/Hero.tsx` lines ~35–46
- **Live Ops cluster table rows**: `Hero.tsx` — the array starting with `c_0142`
- **Loop node descriptions/tooltips**: `LoopVisualizer.tsx` — the `NODES` array
- **Feature card body copy**: `FeatureGrid.tsx` — the `CARDS` array
- **How It Works tab bullets/headlines**: `HowItWorksNew.tsx` — the `TABS` array
- **FAQ answers**: `FAQ.tsx` — the `ITEMS` array
- **Footer columns / contact emails**: `SiteFooter.tsx` — the `COLUMNS` array

Design partner logos in `SocialProof.tsx` are plain text — drop real SVGs in when ready.
The `LogoPlaceholder` component accepts a `name` prop and renders a mono text block.

---

## Motion

All animations use framer-motion. Shared easing in `src/lib/motion.ts`:
- Entrance: `cubic-bezier(0.16, 1, 0.3, 1)`, 400ms
- Hover: `cubic-bezier(0.4, 0, 0.2, 1)`, 200ms

Components call `useReducedMotion()` from framer-motion and skip animation when true.
The sparkline draw-in uses a CSS `@keyframes drawLine` animation with
`stroke-dashoffset` — it reads `window.matchMedia('prefers-reduced-motion')` before
setting the animated style.

---

## What's Placeholder / TODO

- Logo SVGs in `SocialProof.tsx` — replace `LogoPlaceholder` with real SVGs
- Status page link in `SiteFooter.tsx` — change `href="#"` to `status.aviran.dev`
- Nav Pricing link — `href="#"` until pricing page exists
- `DESIGN_NOTES.md` "Backed by YC" in footer — swap in the real backer name/logo
