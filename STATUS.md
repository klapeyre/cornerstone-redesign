# Status

Working progress log for the Cornerstone redesign. Read this for what has landed
and what's next; the ticket definitions live in
[docs/cornerstone-redesign-plan-final.md](docs/cornerstone-redesign-plan-final.md).
Update this file in the same change that moves a ticket's status.

_Last updated: 2026-09-11_ (CDL-13)

## Done

- **CDL-13 — Services page.** `app/services/page.tsx` (server component —
  static content only), routed at `/services` (already wired in `Header`'s
  `NAV_LINKS`). Mirrors the mockup's Services screen (`docs/sample_mockup.html`
  lines ~328-413): a `.page-shell` intro block (`Capabilities` eyebrow →
  `text-[34px]` "Services" → a `max-w-[60ch]` muted lede) over a `.page-shell`
  column (`flex flex-col gap-6`) of three category cards, one per
  Doors/Mouldings/Millwork. Each card is `border border-line bg-card p-8`,
  laid out `md:grid-cols-[220px_1fr]` (mockup's `220px 1fr`) with a stacked
  single column below `md` per CDL-5; the left side pairs the category's
  shared icon (`app/components/icons/services.tsx` — `DoorsIcon`/
  `MouldingsIcon`/`MillworkIcon`, already built for CDL-8's Services preview)
  with a `text-xl` heading, and the right side is a `flex flex-wrap gap-2.5`
  strip of chips, one per item. Item lists and grouping match the plan's
  ticket text verbatim (8 door items, 6 moulding items, 6 millwork items).
  Category/item data is a local `categories` array in the page file — no
  shared source needed since, unlike the gallery projects, nothing else in
  the app renders this same list.
  - **Styled chips (AC).** Added a `.chip` component class to
    `app/globals.css` (`@layer components`, next to `.btn`/`.ph`), 1:1 with
    the mockup's `.chip` rule (`padding:7px 14px; background:var(--bg);
    border:1px solid var(--line); font-size:13px; border-radius:2px`) — this
    was one of the utility classes CDL-2 explicitly deferred to this ticket.
    Replaces the live site's raw unstyled bullet list.
  - **Responsive chip wrapping (AC):** `flex-wrap` on the chip row, verified
    at desktop width in the browser — chips wrap onto additional lines within
    each card as the row fills. Card layout follows the CDL-5 convention
    (stacked below `md`, the mockup's two-column row at `md`+); automation
    viewport still can't narrow below ~1440px, so the sub-`md` stacking
    relies on the verified CDL-5 breakpoint patterns rather than a direct
    375px screenshot this session.
  - **Content grouping (AC):** all three categories present with the exact
    item lists from the plan, correctly grouped under their category heading.
  - **Not yet checked off in the plan.** CDL-14 ties CDL-13's "done" status to
    client sign-off on the item list (`Client sign-off on the final list
    before CDL-13 is considered done`) — implementation is complete and
    matches the plan's current content, but the plan checkbox is left
    unmarked until CDL-14 closes that loop.
  - `npm run lint` and `npm run build` pass (`/services` prerenders static);
    desktop layout verified against the mockup in the browser (card
    backgrounds, chip styling, icon/heading pairing, and spacing all match).

- **CDL-12 — Project detail lightbox.** `app/components/Lightbox.tsx` (client) +
  `app/components/GalleryGrid.tsx` (client). The Gallery page (`app/gallery/
  page.tsx`) stays a server component and its `<main>`/intro/`metadata` are
  unchanged; the grid `<ul>` moved into `GalleryGrid`, which owns the
  `activeProject` state and renders `<Lightbox>`. Grid cards are now `<button>`s
  (`aria-label="View photos of <name>"`) that open the overlay; a project with an
  empty `images` array falls back to the non-interactive placeholder card
  (`images` is populated for all 25 today — the guard keeps the graceful state).
  The first card's cover `<Image>` gets `priority` (it's the above-the-fold LCP
  element — clears a Next.js `loading="eager"` console warning). On `hover` an
  interactive card gains a 1px accent ring (2px on `focus-visible`) on top of
  the existing `-translate-y-0.5` lift — a light touch using the theme's
  reddish-brown accent.
  `Lightbox` mirrors the mockup's `#lightbox` (`docs/sample_mockup.html`
  ~77-89 / ~496-516): a `fixed inset-0 z-[600]` panel at
  `bg-[oklch(9%_0.006_75/0.97)]`, a top bar with the project name +
  zero-padded counter (`03 / 07`, `aria-live="polite"`) + explicit close button,
  a stage with flanking circular prev/next arrows and the photo, and a
  clickable dot strip below (accent = current). No per-photo subtitle — CDL-10
  dropped category/division and there's no source for one, so the mockup's
  "Mixed-use residential · Vancouver, BC" line is omitted rather than invented.
  Reads `projectsBySlug`'s image sets via the `Project` passed down from the
  page (`content/projects.ts`), so Home/Gallery/Lightbox share one data source.
  - **Accessibility (AC):** `role="dialog"` + `aria-modal` + `aria-label`;
    body-scroll lock while open; focus moves into the dialog on open and is
    restored to the triggering card on close; a `keydown` handler wraps Tab
    within the dialog (focus trap), maps ArrowLeft/ArrowRight to prev/next
    (wrapping), and Esc to close. All controls have `aria-label`s; dots carry
    `aria-current`. Full page-level `inert`/focus-trap hardening is still CDL-22.
  - **Focus/hover affordances.** The prev/next arrows and the close button
    (shared `ICON_BUTTON` class) invert to a filled `bg-ink` circle with a
    `text-on-accent` icon on `hover` and `focus-visible`, so it's obvious
    they're clickable and where keyboard focus is. Dots grow on
    `focus-visible`. The dialog container is programmatically focused (for the
    keydown handler + screen readers) so it carries `outline-none` — otherwise
    its `fixed inset-0` box drew a focus ring around the whole viewport. When
    the lightbox closes and focus returns to the originating gallery card, that
    card shows a deliberate 2px accent `focus-visible` ring (see the grid hover
    note below) instead of the UA default outline.
  - **Lazy-loading (AC):** only the current photo and its two neighbours are in
    the DOM (`Math.abs(i - index) > 1` → not rendered); neighbours render at
    `opacity-0` so the browser prefetches them for snappy nav, everything else
    is never requested. Current photo is `priority`, `next/image` `fill` +
    `object-contain`.
  - Basic touch-swipe on the stage (>50px horizontal delta) as a mobile
    affordance; keyboard + arrows remain the primary nav the AC calls for.
  - `key={activeProject?.slug}` on `<Lightbox>` from `GalleryGrid` resets the
    carousel to photo 1 per project via remount (avoids a
    setState-in-effect lint error).
  - `npm run lint` and `npm run build` pass (`/gallery` still prerenders
    static). Verified in the browser at desktop width: open from a card, arrow
    + keyboard nav advance the counter/dot/photo, Esc closes and returns focus
    to the card (branded accent ring, no viewport-wide outline), and the
    arrow/close buttons invert on hover. Automation viewport still can't narrow
    below ~1440px, so the
    mobile layout (single-column stage, `px-3` gutters, 44px-tall dot hit
    areas) relies on the verified CDL-5 breakpoint patterns.

- **CDL-11 — Gallery grid page.** `app/gallery/page.tsx` (server component),
  rendered inside a `flex-1 <main>` so the shared footer stays pinned. Mirrors
  the mockup's Gallery screen (`docs/sample_mockup.html` lines ~265-299): a
  `.page-shell` intro block (`Our Work` eyebrow → `text-[34px]` "Project Gallery"
  → a `max-w-[60ch]` muted lede whose project count reads from
  `projects.length`, not a literal) over a `.page-shell` grid section
  (`pt-9`, `pb-14 md:pb-[88px]`). The grid maps `projects` from
  `content/projects.ts` — the same source Home's `FeaturedWork` reads, no
  duplicated project data. Each card is an `<article>` at `aspect-[4/3]` with
  the mockup's caption treatment (`.ph-tag` scrim, `p-[14px] px-4 font-display
  text-sm`) and a subtle `hover:-translate-y-0.5` lift; every project has a real
  cover photo now (CDL-10 wired the sets), rendered via `next/image` `fill` +
  `object-cover` with responsive `sizes`. Projects without a `cover` fall back
  to the shared `.ph` placeholder (cycling `ph-a…ph-d` by index) with a
  "Photo coming soon" label — the graceful-placeholder AC. Responsive per CDL-5:
  `grid-cols-1` below `sm`, `sm:grid-cols-2`, `md:grid-cols-4` (the mockup's
  `repeat(4,1fr)`), `gap-6` (24px) throughout; column-count reflow is the kind
  of minor within-component change `sm` is reserved for. Added a static
  `metadata` export (title/description) for the route. Cards are presentational
  for now — CDL-12 wires the click to the project-detail lightbox. `npm run
  lint` and `npm run build` pass (`/gallery` prerenders static); desktop layout
  verified against the mockup in the browser with the real cover photos loading
  (automation viewport still can't narrow below ~1440px, so the mobile grid
  reflow relies on the verified CDL-5 breakpoint patterns).

- **CDL-10 — Project data model.** Formalized the schema in `content/projects.ts`
  on top of the minimal version CDL-9 introduced. Decisions taken this ticket:
  - **Local typed data file, no CMS** (resolves the plan's Open question). Content
    is a fixed set of 25 projects that changes rarely and the images are already
    committed to the repo, so a headless CMS isn't warranted. Adding a project is
    a small edit to the `projects` array plus a run of the image scripts below.
  - **Category/division dropped from scope.** No source data for it exists (not in
    the live-site scrape, the carousel manifest, or the mockup), and the mockup's
    gallery is a flat grid of all 25 with no category filter or label — matching
    today's live site. The field can be re-added later if the client wants it.
  - `Project` is now `{ slug, name, featured, images: GalleryImage[], cover:
    GalleryImage | undefined }`. `images`/`cover` are wired from
    `content/gallery-images.generated.ts` (`galleryImages` / `galleryCovers` keyed
    by slug) via the `project()` factory, so the 25 entries carry their real photo
    sets — the live-site gallery images, fetched and resized ≤2000px into
    `public/projects/<slug>/NN.jpg` (295 images, all 25 projects, committed in
    `adcb733`). `GalleryImage` (`{ src, width, height }`) is re-exported from
    `content/projects.ts` so consumers import from one place. Added
    `projectsBySlug` for the CDL-12 detail route; `featuredProjects` unchanged.
  - Consumers unchanged: `FeaturedWork.tsx` still reads `featuredProjects` and
    renders `.ph` placeholders (real photos in the Home/Gallery UI are CDL-17).
  - `npm run lint` and `npm run build` pass.

- **CDL-9 — Featured work section.** `app/components/FeaturedWork.tsx` (server
  component), rendered by `app/page.tsx` after `<ServicesPreview>`. Mirrors the
  mockup's "Recent Work" strip (`docs/sample_mockup.html` lines ~196-206): a
  `.page-shell` section (`py-14 md:pt-[72px] md:pb-[88px]`) with a
  baseline-aligned head (`text-[28px]` "Recent Work" + a `text-[13px]
  font-semibold` "View full gallery →" link to `/gallery`) over a three-up grid
  (`grid gap-6 md:grid-cols-3`, single-column stack below `md` per CDL-5). Each
  card is a `next/link` to `/gallery` styled as a `.ph` placeholder
  (`aspect-[4/3] rounded-xs`) with a `.ph-tag` caption in the display font — real
  photos land in CDL-17. Gradient variety uses the mockup's `.ph-a … .ph-d`
  classes, cycled by index; `.ph-b/.ph-c/.ph-d` were added to `app/globals.css`
  (`@layer components`, next to `.ph`) 1:1 with the mockup — `.ph-a` is the
  existing default.
  - **Project data source (minimal, pending CDL-10).** New `content/projects.ts`
    exports a typed `Project` (`slug`, `name`, `featured`, `images: string[]`),
    the `projects` array (all 25 mockup gallery names, in mockup order, with
    stable kebab-case slugs for the CDL-12 detail route), and
    `featuredProjects` (the three the mockup's Recent Work shows — Alexandra
    Court Clubhouse, Astoria, Kensington — flagged `featured: true`).
    FeaturedWork reads `featuredProjects` from here, so CDL-11's Gallery grid
    reads the same file — no duplicated project data, satisfying the CDL-9 AC.
    CDL-10 still owns the full schema (category/division, thumbnails, full image
    sets) and the CMS-vs-local decision; `images` is an empty array on every
    entry until CDL-17.
  - `npm run lint` and `npm run build` pass; desktop layout verified against the
    mockup in the browser (automation viewport still can't narrow below ~1440px,
    so the mobile stack relies on the verified CDL-5 breakpoint patterns).

- **CDL-8 — Services preview section.** `app/components/ServicesPreview.tsx`
  (server component — static content only), rendered by `app/page.tsx` after
  `<Stats>`. Mirrors the mockup's "What We Do" section
  (`docs/sample_mockup.html` lines ~172-193): a `.page-shell` section with a
  baseline-aligned head (`text-[28px]` "What We Do" + a `text-[13px] font-semibold`
  "View all services →" link to `/services`) over a three-up card grid. Each card
  is a `next/link` to `/services` styled `border border-line bg-card p-7` with an
  accent category icon, a `text-ink` `h3` (the `text-ink` utility is needed so the
  heading doesn't inherit the global link-accent colour from wrapping the card in
  an anchor), and a `text-muted` blurb — copy taken verbatim from the mockup.
  Category icons live in the new shared `app/components/icons/services.tsx`
  (`DoorsIcon` / `MouldingsIcon` / `MillworkIcon`, `currentColor`-based, sized via
  props like `icons/logos.tsx`) so CDL-13's Services page reuses them rather than
  redrawing — satisfying the AC. Responsive per CDL-5: single-column stack with
  `px-6` below `md`, the mockup's `md:grid-cols-3` row with `px-10` at `md`+;
  vertical rhythm follows the Hero/Stats idiom (`py-14` → `md:pt-[72px] md:pb-2`).
  `npm run lint` and `npm run build` pass; desktop layout verified against the
  mockup in the browser (automation viewport still can't narrow below ~1440px, so
  the mobile reflow relies on the verified CDL-5 breakpoint patterns).

- **CDL-7 — Stats bar.** `app/components/Stats.tsx` (server component — static
  content only), rendered by `app/page.tsx` immediately after `<Hero>`. Mirrors
  the mockup's recessed stats band (`docs/sample_mockup.html` lines ~151-170): a
  `bg-alt` section with `border-y border-line` (full-bleed) wrapping a
  `.page-shell` grid (see the ad-hoc content-width note below) of four centered
  cells, each a `font-display text-[34px] text-accent` number over a
  `text-xs uppercase tracking-[0.06em] text-muted` label. Data is a local `stats`
  array. The AC's open question is resolved in favour of auto-calculating: a
  `FOUNDED_YEAR = 1983` const drives `yearsInBusiness = new Date().getFullYear() -
  FOUNDED_YEAR` (43 as of 2026, matching the mockup) so the credibility band never
  goes stale; the remaining values are literals — 25 completed projects (CDL-10's
  count), 2 divisions, 3 service categories (CDL-13's Doors/Mouldings/Millwork).
  Responsive per the CDL-5 convention: `grid-cols-2` with `px-6` below `md`
  (2×2 layout, inter-cell dividers via `max-md:[&:nth-child(2n+1)]:border-r` +
  `max-md:[&:nth-child(n+3)]:border-t`), `md:grid-cols-4` with `px-10` at `md`+
  (the mockup's single row, `md:border-r` on every cell and
  `md:[&:last-child]:border-r-0` to drop the trailing divider). `npm run lint`
  and `npm run build` pass; desktop layout verified against the mockup in the
  browser (automation viewport still can't be narrowed below ~1440px, so the
  mobile reflow relies on the verified CDL-5 breakpoint patterns).

- **CDL-6 — Hero section.** `app/components/Hero.tsx` (server component — static
  content only), rendered by `app/page.tsx` inside a `flex-1 <main>` so the
  shared footer stays pinned to the bottom. Mirrors the mockup hero
  (`docs/sample_mockup.html` lines ~132-149): left column is the `Since 1983`
  eyebrow, a `Custom construction & millwork, built to last.` display headline, a
  muted `max-w-[46ch]` subhead, and the two CTAs — `View Our Work` → `/gallery`
  (`.btn .btn-primary`) and `Our Services` → `/services` (`.btn .btn-outline`),
  both `next/link`. Right column is a captioned photo placeholder using the new
  shared `.ph` / `.ph-label` / `.ph-tag` component classes added to
  `app/globals.css` (the CDL-2 note deferred these to the tickets that need them;
  the gallery grid in CDL-11 reuses `.ph`). Responsive per the CDL-5 convention:
  single-column stack with `px-6` below `md`, two-column grid (`md:grid-cols-2`,
  64px gap) with `px-10` at `md`+; the CTA row is `flex-col sm:flex-row` and the
  headline steps `text-[34px]` → `md:text-[44px]`. Hero copy and the featured
  project ("5 Points · Mixed-use residential · Vancouver, BC") stay as mockup
  placeholders pending client sign-off and real photography (CDL-17).
  `npm run lint` and `npm run build` pass; desktop layout verified against the
  mockup in the browser (the automation viewport could not be narrowed to 375px,
  so the mobile reflow relies on the already-verified CDL-5 breakpoint patterns).

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
  (40px) at `md`+, now applied through the shared `.page-shell` utility (see the
  ad-hoc content-width note below), which also removed the footer's former
  doubled desktop inset. Breakpoint
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

- **CDL-14 — Confirm services content is current.** Verify the CDL-13 item
  list with the client (it was scraped from the live site and may be stale);
  once signed off, check off CDL-13 in the plan.

## Not started

CDL-15 … CDL-25 — see the plan.

## Notes carried forward

- **Gallery image pipeline (prep for CDL-17, not wired in yet).** The live
  cdl1983.ca gallery serves all photos from its own server at
  `Pictures/Pictures/<Folder>/<file>`; directory listing is off, so the per-
  project file list was captured from the page's carousel JS into
  `scripts/gallery-manifest.json` (25 projects, 295 images, `files[0]` = cover,
  slugs match `content/projects.ts`). `npm run gallery:fetch`
  (`scripts/fetch-gallery.mjs`, no deps) downloads originals into the
  git-ignored `.gallery-src/`; `npm run gallery:build`
  (`scripts/build-gallery-images.mjs`, needs `sharp`) resizes to ≤2000px, writes
  `public/projects/<slug>/01.jpg…NN.jpg`, and emits
  `content/gallery-images.generated.ts` (`galleryImages` / `galleryCovers` keyed
  by slug, each `{ src, width, height }`). Both scripts have been run: the
  optimized set is committed under `public/projects/` (295 images, all 25
  projects) and the generated file is wired into the `Project` type as of CDL-10.
  Re-run `npm run gallery:fetch && npm run gallery:build` if the live gallery
  changes or `scripts/gallery-manifest.json` is regenerated. `sharp` is a
  devDependency.
- Tailwind v4 is CSS-first: theme config is `@theme` in `app/globals.css`, not a
  `tailwind.config.ts`. The plan text predates this.
- Node.js is installed on this machine via Homebrew (`/opt/homebrew/bin/node`).
- **Ad-hoc content-width change (outside the plan).** Header, Footer, Hero, and
  Stats now share one centered content column via the `.page-shell` utility in
  `app/globals.css` (`margin-inline: auto`, `max-width: var(--container-page)`,
  and the `px-6` → `md:px-10` gutters). `--container-page` is `1280px` — wider
  than the mockup's `1200px` `.container` so the layout doesn't letterbox on
  larger displays; change that one token to retune it. This deliberately departs
  from the mockup in two ways: the mockup's header has no width cap at all, and
  its footer nested `.container` inside `<footer>`'s own 40px padding for a
  doubled inset. Both are gone so every section's left/right content edges line
  up. Full-bleed backgrounds (header bottom border, stats `border-y` band,
  footer `--floor` panel) stay on the outer element and still span the viewport.
