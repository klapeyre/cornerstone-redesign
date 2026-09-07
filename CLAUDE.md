# CLAUDE.md

Guidance for Claude Code (and other AI agents) working in this repository.

## Project

**Cornerstone Site Redesign** — a modernized rebuild of the two-brand Cornerstone
website (Cornerstone Developments Ltd. + Cornerstone Millwork Inc.).

- **Current live site:** https://www.cdl1983.ca/a/default.php
- **Direction:** "corporate trust-builder" — credibility-forward home page, real
  project gallery with a full-screen lightbox, a properly styled services page,
  and login demoted to a secondary "Client / Trade" link.
- **Full implementation plan:** [docs/cornerstone-redesign-plan-final.md](docs/cornerstone-redesign-plan-final.md)
  — read this first. Tickets are written CDL-1 … CDL-25 so any one can be handed
  to a fresh session on its own.
- **Visual reference:** [docs/sample_mockup.html](docs/sample_mockup.html)

## Status

Planning phase. The app is **not yet scaffolded** — the repo currently holds only
docs. First code task is CDL-1 (scaffold via `create-next-app`).

## Tech stack (decided — see CDL-1)

- **Framework:** Next.js (App Router), TypeScript throughout
- **Styling:** Tailwind CSS; CSS Modules allowed for one-off styles that don't fit
  utilities well
- **Fonts:** loaded via `next/font/google` (self-hosted) — Source Serif 4
  (display) / Work Sans (body)
- **Images:** Next.js `<Image>` component for optimization / responsive `srcset`

## Conventions

- Design tokens come from the mockup's `:root` block and must match it 1:1
  (CDL-2). Accent ≈ `oklch(47% 0.135 35)`.
- Project data (the 25 gallery projects) is a structured data source, never
  hardcoded per-project markup (CDL-10). Home and Gallery read the same source —
  no duplicated project data.
- Shared icons live in one place; don't redraw the same icon for Home and
  Services (CDL-8 / CDL-13).
- Login is never in the primary nav — it's a small, muted secondary link set off
  by a divider (CDL-3).
- Placeholders in the mockup (`[ADDRESS]`, `[PHONE]`, `[EMAIL]`, redrawn logo
  marks, placeholder photos) are intentional — don't invent real values.

## Commands

Once the app is scaffolded, expected commands (update this section when CDL-1
lands):

```bash
npm run dev     # local dev server
npm run build   # production build
npm run lint    # eslint
```

## Repo layout

```
docs/                 planning docs + HTML mockup
.claude/
  skills/             project-specific skills (see .claude/README.md)
  commands/           project slash commands
  settings.json       shared project settings (checked in)
.mcp.json             project-scoped MCP servers (checked in)
CLAUDE.md             this file
```

## Git

**Do not run any git operations unless the user explicitly asks in that
message.** This includes `commit`, `push`, `add`/staging, `branch`, `checkout`,
`merge`, `rebase`, `reset`, `stash`, tags, and creating PRs. Read-only inspection
(`git status`, `git diff`, `git log`) is fine. Finishing a task means leaving the
changes in the working tree for the user to review and commit themselves — do not
offer to commit as a next step.

## Working agreements

- Keep this file current: when a decision in the plan's "Open questions" is
  resolved, or a command/convention changes, update CLAUDE.md in the same change.
- Prefer editing existing files over adding new ones.
