# Status

Working progress log for the Cornerstone redesign. Read this for what has landed
and what's next; the ticket definitions live in
[docs/cornerstone-redesign-plan-final.md](docs/cornerstone-redesign-plan-final.md).
Update this file in the same change that moves a ticket's status.

_Last updated: 2026-09-07_

## Done

- **CDL-1 — Scaffold.** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4,
  scaffolded via `create-next-app` (`--no-src-dir`, `@/*` import alias). `npm run
  dev`, `npm run build`, and `npm run lint` all pass. `app/` still holds the
  default `create-next-app` template page.
- **CDL-2 — Design tokens / global styles.** `app/globals.css` now defines the
  mockup's full dark palette (bg/bg-alt/card/ink/muted/line/accent/accent-hover/
  accent-soft/on-accent/floor/floor-line/floor-ink/floor-muted) as Tailwind v4
  `@theme` color tokens, 1:1 with the `:root` block in `docs/sample_mockup.html`
  (the mockup is dark-only — no light-mode variant exists, so the scaffold's
  light/dark auto-switch was removed). Source Serif 4 (display) / Work Sans
  (body) are self-hosted via `next/font/google` in `app/layout.tsx` and exposed
  as `--font-display`/`--font-body` theme tokens. Base global element styles
  (body background/color/font, heading font/weight/letter-spacing, link colors)
  and `.btn`/`.btn-primary`/`.btn-outline` (the only non-token rule the ticket
  calls out by name) are also in place. Mockup-only utility classes with no
  consumer yet (`.container`, `.eyebrow`, `.chip`, `.ph` placeholder-image
  styles, nav-specific rules) are deferred to the component tickets that need
  them (CDL-3, CDL-6, CDL-8, CDL-13). No custom spacing/radius tokens were
  needed — the mockup doesn't define a spacing scale, and its 2px button/chip
  radius already matches Tailwind's default `--radius-sm`. `npm run build` and
  `npm run lint` both pass; verified the compiled CSS resolves the oklch color
  and font-variable tokens correctly.

## Next up

- **CDL-3 — Shared Header component.**

## Not started

CDL-4 … CDL-25 — see the plan.

## Notes carried forward

- Tailwind v4 is CSS-first: theme config is `@theme` in `app/globals.css`, not a
  `tailwind.config.ts`. The plan text predates this.
- Node.js is installed on this machine via Homebrew (`/opt/homebrew/bin/node`).
