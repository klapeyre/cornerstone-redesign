# Status

Working progress log for the Cornerstone redesign. Read this for what has landed
and what's next; the ticket definitions live in
[docs/cornerstone-redesign-plan-final.md](docs/cornerstone-redesign-plan-final.md).
Update this file in the same change that moves a ticket's status.

_Last updated: 2026-09-07_

## Done

- **CDL-5 — Responsive/mobile layout pass.** One layout breakpoint: Tailwind's
  default `md` (768px). At `md`+ the shared chrome matches the desktop mockup;
  below `md` the header's primary nav collapses to a hamburger button (≥44px hit
  target) that opens a full-screen overlay menu — `app/components/Header.tsx` is
  still a client component and now holds `menuOpen` state, locks body scroll
  while open, moves focus to the overlay's close button, and closes on Escape /
  route change (full focus-trapping deferred to CDL-22). The overlay reuses the
  same `NAV_LINKS` array and active-path logic; the desktop nav/brand and the
  mobile brand are separate `hidden md:flex` / `flex md:hidden` subtrees. On
  mobile the two-lockup brand condenses to both marks + a single `CORNERSTONE`
  wordmark, with the `Developments Ltd. + Millwork Inc.` sublabel hidden below
  480px. `app/components/Footer.tsx` (still a server component) reflows: the
  brand row and contact row stack column-wise below `sm` (640px) and the whole
  foot-top goes column below `md`; the foot-bottom copyright/login row stacks
  below `sm`. Page horizontal padding is `px-6` (24px) below `md`, `px-10`
  (40px) at `md`+ — the footer keeps its existing doubled desktop inset
  (`px-10` on `<footer>` + `md:px-10` on the inner max-width wrappers). Breakpoint
  system documented in CLAUDE.md ("Responsive" bullet) as the convention the
  later page tickets build against; the plan's "Mobile nav pattern and
  breakpoints" open question is marked resolved. Per-page stacking/grid reflow
  (hero, gallery grid, service cards) stays with each page's own ticket.
  `npm run lint` and `npm run build` pass.

- **CDL-4 — Shared Footer component.** `app/components/Footer.tsx` (server
  component — no interactivity needed) renders the mockup footer exactly
  (`docs/sample_mockup.html` lines ~208-230 / footer styles ~55-59): the
  darkest `--floor` layer, a top row with both brand marks single-line
  (`CORNERSTONE DEVELOPMENTS` with the hammer mark in `--floor-ink`,
  `CORNERSTONE MILLWORK` with the diamond mark in `--accent`) on the left and
  the `[ADDRESS]` / `[PHONE]` / `[EMAIL]` placeholders on the right, a
  `--floor-line` divider, then a bottom row with the copyright line and the
  `Client / Trade Login` link (points at `/login`, same as the header; rendered
  muted via `text-floor-muted`, relying on the CDL-3 `@layer base` fix so the
  utility beats the global `a` accent color). Logo marks reuse the shared
  `app/components/icons/logos.tsx` components rather than re-drawing the
  mockup's inline SVGs. Rendered once in `app/layout.tsx` after `{children}`,
  so it's shared across all routes. Placeholders stay literal pending CDL-20.
  `npm run lint` and `npm run build` pass; verified against the mockup in the
  browser.

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

- **CDL-6 — Hero section.**

## Not started

CDL-7 … CDL-25 — see the plan.

## Notes carried forward

- Tailwind v4 is CSS-first: theme config is `@theme` in `app/globals.css`, not a
  `tailwind.config.ts`. The plan text predates this.
- Node.js is installed on this machine via Homebrew (`/opt/homebrew/bin/node`).
