# Aviran Landing Page

Landing page for **Aviran** — Self-Learning for Agents. Automatic agent optimization: find best configs, simulate, and auto-deploy. Built for AI agent vendors.

## Stack

- **Vite** — build tool
- **React 18** + **TypeScript**
- CSS (no UI framework)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # preview production build (e.g. localhost:4173)
```

## Deploy

**Option A — Vercel (recommended)**  
1. Log in: `npx vercel login`  
2. Deploy: `npx vercel --prod`  
Vercel will build and host the app and give you a URL.

**Option B — GitHub Pages**  
1. Push this repo to GitHub.  
2. In the repo: **Settings → Pages** → Source: **GitHub Actions**.  
3. Push to `main` (or run the “Deploy to GitHub Pages” workflow manually).  
4. Site will be at `https://<your-username>.github.io/<repo-name>/`.

## Sections

- **Header** — Logo, Features, Contact, Docs, Request Demo
- **Hero** — "AI agents that self learn" + CTA
- **Trusted by** — Wyn Labs, Sentrial, BrainHi, Artisio
- **Built for agent vendors** — Self-Learning Agents, Connect & Optimize, In Production Today
- **How it works** — Observation, Judge Comparison, Root Cause Analysis, Logs
- **Docs** — Documentation cards + FAQs (accordion)
- **CTA** — “Ready to see Aviran in action?” + Talk to us
- **Footer** — Tagline and copyright

Design: dark theme, Instrument Serif + DM Sans, blue accent.
