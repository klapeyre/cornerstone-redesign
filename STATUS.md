# Status

Working progress log for the Cornerstone redesign. Read this for what has landed
and what's next; the ticket definitions live in
[docs/cornerstone-redesign-plan-final.md](docs/cornerstone-redesign-plan-final.md).
Update this file in the same change that moves a ticket's status.

_Last updated: 2026-09-07_

## Done

- **CDL-3 — Shared Header component.** `app/components/Header.tsx` (client
  component, uses `usePathname` for active-nav state) renders both wordmarks
  (Developments hammer mark + Millwork diamond mark, divided) and the
  Home/Gallery/Services nav with `Client Login` set apart by a divider as a
  small muted secondary link, per the mockup header exactly (`docs/
  sample_mockup.html` lines ~105-130). Logo marks are shared SVG components in
  `app/components/icons/logos.tsx` (`currentColor`-based, sized/colored via
  Tailwind classes) rather than the JPG assets added to `assets/` — kept unused
  for now per direction to use the mockup's SVGs instead. Rendered once in
  `app/layout.tsx` so it's shared across all routes. Not sticky — matches the
  mockup, which has no scroll-position styling on its header.
  - Fixed a pre-existing bug found while verifying this in the browser: the
    global `a`/`a:hover`/`body`/`h1-h3` rules in `app/globals.css` were
    unlayered plain CSS, which beats any Tailwind utility class regardless of
    source order (Tailwind utilities live in `@layer utilities`). This made
    `text-ink`/`text-accent` no-ops on links — every nav link rendered in the
    global accent color, so active vs. inactive state was invisible. Wrapped
    those base rules in `@layer base` so component-level utilities can
    override them, and confirmed active-state coloring now works via browser
    screenshot.

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

- **CDL-4 — Shared Footer component.**

## Not started

CDL-5 … CDL-25 — see the plan.

## Notes carried forward

- Tailwind v4 is CSS-first: theme config is `@theme` in `app/globals.css`, not a
  `tailwind.config.ts`. The plan text predates this.
- Node.js is installed on this machine via Homebrew (`/opt/homebrew/bin/node`).
