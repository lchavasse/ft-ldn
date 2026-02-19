# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, localhost:5173)
npm run build     # TypeScript compile + production build (outputs to dist/)
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

## Architecture

Single-page React 19 + TypeScript app built with Vite. Marketing site for a residential building concept with Stripe-integrated membership signup.

**Stack:** React 19, TypeScript, Vite 7, Tailwind CSS 4, Framer Motion, Lenis (smooth scroll), Headless UI, Stripe

**Layout:** Fixed left sidebar (nav, 260px) + centered content + fixed right sidebar (visual, 300px). Mobile uses overlay menu.

**Page flow:** `App.tsx` renders sections in order via `Layout.tsx` wrapper:
- `sections/Hero.tsx` — Animated intro
- `sections/Manifesto.tsx` — Scroll-triggered editorial content
- `sections/London.tsx` — Location with parallax
- `sections/GetInvolved.tsx` — CTA that opens `WaitlistModal`

**Payment flow** (`components/WaitlistModal.tsx`): Multi-step modal — form → API submission → Stripe Elements payment → success/error. Posts to `{VITE_API_URL}/next/pre-signup-requests/` and receives a Stripe `clientSecret`.

**Environment variables** (`.env`): `VITE_STRIPE_PUBLISHABLE_KEY`, `VITE_API_URL`

## Conventions

- **Utility function** `cn()` in `src/utils/cn.ts` — wraps clsx + tailwind-merge for class composition
- **Smooth scroll** hook in `src/hooks/useSmoothScroll.ts` using Lenis
- **Types** in `src/types/index.ts` for form data and payment interfaces
- **Fonts:** Fraunces (headings), Inter Tight (body) — loaded via Google Fonts in `index.css`
- **Theme colors** defined as CSS variables in `index.css`: canvas `#F9F8F4`, ink `#1C1C1E`, night `#0F0F11`, accent `#7C3AED`
