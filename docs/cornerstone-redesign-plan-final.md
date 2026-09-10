# Cornerstone Site Redesign — Implementation Plan

**Source (current) site:** https://www.cdl1983.ca/a/default.php
**Design reference (mockup):** https://claude.ai/code/artifact/fb76917e-4dd9-4edf-81e6-c078f5a94513
**Status:** Draft. Tech stack is now decided (Next.js + TypeScript, see CDL-1); several other acceptance criteria are still open — see "Open questions" at the bottom. This is written so any ticket below can be handed to a fresh session/agent on its own, with the mockup link as visual reference.

## What this covers

A modernized rebuild of the two-brand Cornerstone site (Cornerstone Developments Ltd. + Cornerstone Millwork Inc.), direction: "corporate trust-builder" — credibility-forward home page, real project gallery with a preserved full-screen lightbox, a properly styled services page (currently broken/unstyled on the live site), and login demoted off the main nav into a secondary "Client / Trade" link.

## Assumptions baked into the mockup (revisit before building)

- No real project photography yet — mockup uses marked placeholders throughout.
- No real logo artwork — mockup uses simplified redrawn marks (hammer / diamond), not the client's actual logo files.
- Address/phone/email are unknown — footer uses `[ADDRESS]` / `[PHONE]` / `[EMAIL]` placeholders.
- What's actually behind "Login" is unknown (client portal? trade account? documents?) — treated as a UI stub only.
- Services taxonomy below was scraped from the current live site on 2026-09-02 and may be out of date.
- Gallery project list (25 names) was scraped from the current live site's Gallery page.

---

## EPIC 1 — Project Foundation

**CDL-1 — Tech stack: Next.js + TypeScript** ✅ Decided
- Framework: Next.js (App Router), written in TypeScript throughout.
- Styling: Tailwind CSS — the styling approach `create-next-app` scaffolds by default and the one most commonly recommended for new Next.js projects. Component-scoped CSS Modules remain an option for any one-off style that doesn't fit Tailwind's utility classes well.
- Still open (doesn't block scaffolding, but affects CDL-10/CDL-13 later): who maintains the site day-to-day (non-technical family member updating photos/projects?), whether a lightweight CMS is worth it for the Gallery/Services content, current hosting constraints.
- **AC:** Repo scaffolded via `create-next-app` (TypeScript + Tailwind + App Router template); local dev running.

**CDL-2 — Design tokens / global styles** ✅ Complete
- Translate the mockup's CSS variables into Tailwind's theme system: extend `tailwind.config.ts` (colors, font families, spacing, border radii) and keep any raw CSS custom properties that Tailwind can't express in `app/globals.css`.
- Tokens: background/ink/muted/line/accent colors (oklch-based; accent ≈ `oklch(47% 0.135 35)`, pulled from the existing Millwork diamond mark), type pairing (Source Serif 4 display / Work Sans body), spacing/button styles.
- Load both fonts via `next/font/google` rather than a Google Fonts `<link>` tag — this self-hosts them automatically and feeds directly into CDL-23's font-loading question.
- **AC:** Tokens match the mockup 1:1; verified against `Main.dc.html`'s `:root` block in the mockup source.

**CDL-3 — Shared Header component** ✅ Complete
- Both logos (Developments hammer mark + Millwork diamond mark) side by side, divided, roughly equal visual weight. Nav: Home / Gallery / Services. Login set apart by a divider as a small, muted secondary link — never in the primary nav group.
- **AC:** Matches mockup header; active-page nav state; behavior on scroll (sticky or not) decided.

**CDL-4 — Shared Footer component** ✅ Complete
- Both logos (smaller), contact info, copyright, "Client / Trade Login" link.
- **AC:** Matches mockup footer; placeholders replaced once CDL-20 lands.

**CDL-5 — Responsive/mobile layout pass** ✅ Complete
- Mockup is desktop-only (1440px frames). Mobile nav (hamburger/collapse), hero stacking, grid reflow, touch target sizing (≥44px) all need defining — none of this exists in the mockup yet.
- **AC:** Breakpoints documented; nav collapses below a defined width; every page usable at phone width.
- Resolved: single layout breakpoint at Tailwind `md` (768px); below it the header nav collapses to a hamburger opening a full-screen overlay menu; page padding `px-6`→`px-10` at `md`; touch targets ≥44px. Applied to the shared Header/Footer and documented in CLAUDE.md as the convention every later page ticket follows. Per-page stacking/grid reflow (hero, gallery grid, service cards) is handled in each page's own ticket against this convention.

---

## EPIC 2 — Home Page

**CDL-6 — Hero section** ✅ Complete
- Headline + subhead + two CTAs ("View Our Work", "Our Services") + featured project image with caption overlay.
- **AC:** Matches mockup layout; final copy approved by client (mockup copy is a draft); CTAs wired to Gallery/Services.
- Landed as `app/components/Hero.tsx`, rendered by `app/page.tsx`. CTAs are
  `next/link`s to `/gallery` and `/services`. Two-column grid at `md`+, stacked
  below (CDL-5 convention). Copy and the featured project ("5 Points") remain
  mockup placeholders pending client sign-off / real photography (CDL-17).

**CDL-7 — Stats bar** ✅ Complete
- Four-stat credibility band: years in business, completed projects, divisions, service categories.
- **AC:** Values sourced from real data (confirm whether "years in business" should auto-calculate from 1983); responsive stacking on mobile.

**CDL-8 — Services preview section** ✅ Complete
- Three category cards (Doors / Mouldings / Millwork) linking to the full Services page.
- **AC:** Matches mockup; icons shared with CDL-13, not redrawn twice.

**CDL-9 — Featured work section** ✅ Complete
- Three-project preview strip linking to the Gallery.
- **AC:** Pulls from the same project data source as CDL-10/CDL-11 — no duplicated project data between Home and Gallery.

---

## EPIC 3 — Gallery

**CDL-10 — Project data model** ✅ Complete
- Structured data source for all 25 projects (name, category/division, thumbnail, full image set) — not hardcoded HTML per project, so adding a project later doesn't mean writing new markup.
- With Next.js decided (CDL-1), the realistic options are: a local typed data file (e.g. `content/projects.ts` or `.json`, read at build time and rendered via static generation), or a headless CMS (e.g. Sanity, Contentful) fetched through Next.js's data-fetching if a non-technical family member needs to add projects without touching code. Still an open decision — see "Open questions."
- **AC:** Schema documented; existing 25 project names migrated as entries pending real photos.

**CDL-11 — Gallery grid page**
- Responsive grid of project cards driven by CDL-10's data.
- **AC:** Matches mockup grid; real images swap in as supplied (CDL-17); graceful placeholder state for projects without photos yet.

**CDL-12 — Project detail lightbox**
- Full-screen overlay carousel per project: left/right arrow nav, dot-thumbnail strip, explicit image counter ("3 / 12"), explicit close button. This replaces the current Jssor-based carousel — it's the one interaction being deliberately preserved from the old site, just restyled and (per this ticket) made more usable.
- **AC:** Keyboard support (arrow keys to navigate, Esc to close); focus trap + aria labels for accessibility; matches mockup visuals; lazy-loads offscreen images.
- **Note:** Check whether the current site supports keyboard/swipe navigation before calling this "parity" — the review of the old site didn't confirm this either way.

---

## EPIC 4 — Services

**CDL-13 — Services page**
- Three category cards (Doors, Mouldings, Millwork) with full item lists as styled chips/tags — replacing the current raw, unstyled bullet HTML (the page that "breaks styling" on the live site).
- **AC:** Content below is present and correctly grouped; responsive chip wrapping.
  - Doors: Entry Doors, Patio Doors, Interior Doors, Bifold Doors, Bipass Doors, Steel Doors, Custom Doors, Modoporte Doors
  - Mouldings: Door/Window/Bifold Casing, Baseboard, Crown Moulding, Wall Capping, Window Sills, Hand Railing
  - Millwork: Fireplace Mantels, Cabinets, Shelving, Wainscotting, Columns, Custom Items

**CDL-14 — Confirm services content is current**
- Verify the item list above with the client — it was scraped from the live site and may be stale or incomplete.
- **AC:** Client sign-off on the final list before CDL-13 is considered done.

---

## EPIC 5 — Login / Client Portal

**CDL-15 — Login page UI (stub only)**
- Recreate the username / password / company-select form matching the mockup style. No backend wired.
- **AC:** Visually matches mockup; form does not submit anywhere until CDL-16 is resolved.

**CDL-16 — Scope what's actually behind Login**
- Find out from the client what the current login actually gates (client documents? invoices? a trade/contractor account?) and decide whether to rebuild it, replace it with something else, or drop it from the new site entirely.
- **AC:** Written decision, before any backend work here is estimated.

---

## EPIC 6 — Content & Assets

**CDL-17 — Real project photography**
- Replace all placeholder image blocks with real photos for the 25 gallery projects plus hero/featured images.
- **AC:** Images optimized (modern formats, responsive srcset); each project has at least one image, ideally a full set for the lightbox.

**CDL-18 — Real brand assets**
- Get vector or high-resolution versions of both logos. The mockup uses simplified redrawn marks, not the client's actual artwork.
- **AC:** SVG (preferred) or high-res PNG of both logos in place of the placeholder marks.

**CDL-19 — Finalize copy**
- Replace draft copy (hero headline/subhead, any about-style content) with client-approved final copy.
- **AC:** Client sign-off.

**CDL-20 — Contact info**
- Replace `[ADDRESS]` / `[PHONE]` / `[EMAIL]` placeholders with real values. Decide whether a dedicated Contact page/section is needed — it wasn't part of the original site or this mockup, so flag for discussion.
- **AC:** Real values in place; decision recorded on whether Contact gets its own page.

---

## EPIC 7 — QA & Launch

**CDL-21 — Cross-browser/device QA**

**CDL-22 — Accessibility pass**
- Color contrast, image alt text, keyboard navigation (especially CDL-12's lightbox), screen reader labels.

**CDL-23 — Performance pass**
- Image weight (Next.js `<Image>` component for automatic optimization/responsive `srcset`, feeding into CDL-17). Font loading is handled by CDL-2's use of `next/font/google`, which self-hosts Source Serif 4 / Work Sans at build time — just confirm the resulting font files/weights match the mockup.

**CDL-24 — SEO basics**
- Meta tags via Next.js's Metadata API (`generateMetadata` / static `metadata` exports per route), sitemap via `app/sitemap.ts`, redirects from old URLs (`default.php`, `Gallery.php`, `Services.php`, `Log_In.php`) via `next.config.ts` redirects if routes change.

**CDL-25 — Hosting/DNS cutover plan**

---

## Open questions for the next planning pass

- ~~Tech stack (CDL-1)~~ — resolved: Next.js (App Router) + TypeScript, Tailwind CSS for styling.
- ~~CMS vs. hardcoded/JSON data for Gallery and Services content, within that Next.js stack (see CDL-10).~~ — resolved (CDL-10): local typed data file (`content/projects.ts` + generated image manifest), no CMS.
- ~~Mobile nav pattern and breakpoints~~ — resolved (CDL-5): collapse at Tailwind `md` (768px) to a full-screen hamburger overlay; see CLAUDE.md "Responsive".
- What's actually behind Login (CDL-16).
- Hosting/deploy target.
- Timeline and budget.
