---
name: project-context
description: Load shared context for the Cornerstone site redesign — the implementation plan, ticket structure (CDL-1…CDL-25), tech stack, and design conventions. Use at the start of any task touching this codebase, or when the user references a CDL ticket, the mockup, or the redesign plan.
---

# Project context — Cornerstone redesign

When starting work on this repo:

1. Read [docs/cornerstone-redesign-plan-final.md](../../../docs/cornerstone-redesign-plan-final.md)
   for the full plan. Tickets are numbered **CDL-1 … CDL-25** and each is written
   to stand alone.
2. Open [docs/sample_mockup.html](../../../docs/sample_mockup.html) as the visual
   reference. Design tokens must match its `:root` block 1:1.
3. Skim [CLAUDE.md](../../../CLAUDE.md) for stack and conventions.

## Fast facts

- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS.
- **App is not scaffolded yet** — CDL-1 is the first code ticket.
- **Two brands:** Cornerstone Developments Ltd. (hammer mark) + Cornerstone
  Millwork Inc. (diamond mark).
- **Accent color:** `oklch(47% 0.135 35)`. Fonts: Source Serif 4 / Work Sans.

## Guardrails

- Project data is one structured source, shared by Home and Gallery — never
  duplicate project markup.
- Login stays a secondary link, never in the primary nav.
- Mockup placeholders (`[ADDRESS]`, `[PHONE]`, `[EMAIL]`, redrawn logos,
  placeholder photos) are deliberate — don't substitute invented values.
- When a plan "Open question" is resolved, update CLAUDE.md in the same change.
