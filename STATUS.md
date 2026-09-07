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

## Next up

- **CDL-2 — Design tokens / global styles.** Translate the mockup's `:root` block
  into the Tailwind v4 `@theme` block in `app/globals.css` (no `tailwind.config.ts`
  in v4). Load Source Serif 4 / Work Sans via `next/font/google`.

## Not started

CDL-3 … CDL-25 — see the plan.

## Notes carried forward

- Tailwind v4 is CSS-first: theme config is `@theme` in `app/globals.css`, not a
  `tailwind.config.ts`. The plan text predates this.
- Node.js is installed on this machine via Homebrew (`/opt/homebrew/bin/node`).
