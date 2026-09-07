# Cornerstone Site Redesign

A modernized rebuild of the two-brand Cornerstone website — Cornerstone
Developments Ltd. and Cornerstone Millwork Inc.

- **Current live site:** https://www.cdl1983.ca/a/default.php
- **Direction:** "corporate trust-builder" — a credibility-forward home page, a
  real project gallery with a full-screen lightbox, a properly styled services
  page, and login demoted to a secondary "Client / Trade" link.
- **Implementation plan:** [docs/cornerstone-redesign-plan-final.md](docs/cornerstone-redesign-plan-final.md)
  (tickets CDL-1 … CDL-25).
- **Visual reference:** [docs/sample_mockup.html](docs/sample_mockup.html)
- **Agent guidance:** [CLAUDE.md](CLAUDE.md)

## Tech stack

- **Framework:** Next.js 16 (App Router), TypeScript
- **Styling:** Tailwind CSS v4 (theme config lives in `app/globals.css`)
- **Fonts:** Source Serif 4 (display) / Work Sans (body), via `next/font/google`
- **Images:** Next.js `<Image>`

## Getting started

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the local dev server      |
| `npm run build` | Production build                |
| `npm run start` | Serve the production build      |
| `npm run lint`  | Run ESLint                      |

## Project structure

```
app/       routes, layouts, and global styles
public/    static assets
docs/      planning docs + HTML mockup
```

## Status

See [STATUS.md](STATUS.md) for current progress and what's next.
