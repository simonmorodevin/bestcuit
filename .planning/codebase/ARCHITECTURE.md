# Architecture

**Analysis Date:** 2026-04-06

## Pattern Overview

**Overall:** Single-Page Application (SPA) — static HTML with client-side page switching

**Key Characteristics:**
- All pages live in a single `index.html` file as hidden `div` elements with class `page`
- Navigation is handled entirely by vanilla JavaScript: `showPage(id)` toggles the `active` class on the correct `div`
- No build step, no framework, no bundler — the site is pure HTML + CSS + JS
- A separate `bestcuit-mirror/` directory contains an archived HTTrack crawl of the original Astro-based site at `www.bestcuit.fr` (reference only, not served)

## Layers

**Markup Layer:**
- Purpose: Structure and content for all pages
- Location: `index.html`
- Contains: All six logical pages encoded as `div[id="page-*"]` elements, navigation bar `nav#navbar`, footer `footer#main-footer`, and all inline images (logo embedded as base64 PNG)
- Depends on: `style.css`, `script.js`, Google Fonts CDN
- Used by: Browser renders directly — no server-side processing

**Style Layer:**
- Purpose: All visual design, layout, animations, and responsive breakpoints
- Location: `style.css`
- Contains: CSS custom properties (design tokens), resets, typography helpers, per-section styles, and two responsive breakpoints (`@media(max-width:960px)` and `@media(max-width:480px)`)
- Depends on: Google Fonts (`Playfair Display`, `DM Sans`) loaded via CDN in `index.html`
- Used by: `index.html`

**Behaviour Layer:**
- Purpose: All interactivity
- Location: `script.js`
- Contains: `showPage()` (SPA router), scroll effect on navbar, Intersection Observer for `.fade-in` elements, hamburger menu toggle, animated counter for `.stat-num` elements using `requestAnimationFrame`
- Depends on: DOM IDs and classes defined in `index.html`
- Used by: Loaded via `<script src="script.js">` at bottom of `index.html`

## Data Flow

**Page Navigation:**
1. User clicks a nav link with `onclick="showPage('pageId')"`
2. `showPage()` in `script.js` removes `active` class from all `.page` divs and all nav anchors
3. It then adds `active` to the target `div#page-{id}` and to `a#nav-{id}`
4. `window.scrollTo({ top: 0 })` is called to reset scroll position
5. `observeElements()` is re-called to register new Intersection Observers for fade-in elements on the newly revealed page

**Scroll & Animation:**
1. `window.scroll` event toggles `scrolled` class on `nav#navbar` past 24 px
2. Intersection Observer watches `.fade-in:not(.visible)` elements and adds `visible` once they enter the viewport
3. A second Intersection Observer on `.stats-bar` triggers `animateCounter()` for each `.stat-num` element using `data-target` and `data-suffix` HTML attributes

**Contact Form:**
1. User fills text/email inputs inside `div#page-contact`
2. Submit button fires an `onclick="alert(...)"` — no actual form submission or backend call exists; the form is a UI placeholder only

## Key Abstractions

**Page Panels:**
- Purpose: Each logical section of the site is a full-page `div` hidden by default
- Examples: `div#page-accueil`, `div#page-apropos`, `div#page-engagement`, `div#page-catalogue`, `div#page-contact`, `div#page-politique`, `div#page-cgv`
- Pattern: `display:none` by default; `display:block` (or equivalent) when class `active` is present — toggled by `showPage()`

**Design Token System:**
- Purpose: Centralized color, font, shadow, and easing values
- Location: `:root` block at top of `style.css` (lines 3–21)
- Variables: `--cream`, `--salmon`, `--brown`, `--terra`, `--terra-light`, `--terra-dark`, `--terra-pale`, `--beige-dark`, `--white`, `--text-muted`, `--font-display`, `--font-body`, `--ease-out`, `--ease-spring`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-terra`

**Fade-In Animation Pattern:**
- Purpose: Scroll-triggered entrance animation for content sections
- Pattern: Add class `fade-in` to any element in `index.html`; `script.js` observes it and adds `visible` when it enters the viewport; CSS in `style.css` transitions opacity/transform on `.fade-in.visible`

**Animated Counter:**
- Purpose: Number stat display on the homepage stats bar
- Pattern: `span.stat-num` with `data-target="{number}"` and `data-suffix="{unit}"` attributes; `animateCounter()` in `script.js` drives the eased count-up animation

## Entry Points

**Browser Entry Point:**
- Location: `index.html`
- Triggers: Direct file open in browser or served via static file server
- Responsibilities: Loads fonts from Google CDN, loads `style.css`, renders all page panels, loads `script.js` at end of `<body>`

**JavaScript Entry Point:**
- Location: `script.js`
- Triggers: Loaded synchronously by `index.html` after DOM is rendered
- Responsibilities: Attaches scroll listener, initialises Intersection Observer for fade-ins, initialises counter observer for `.stats-bar`, exposes `showPage()` globally for inline `onclick` handlers

## Error Handling

**Strategy:** No formal error handling — vanilla JS uses direct DOM queries; missing IDs fail silently with null-guard `if (page)` / `if (navLink)` checks in `showPage()`

**Patterns:**
- `showPage()` checks element existence before calling `.classList.add()`
- No try/catch blocks anywhere in `script.js`
- Contact form submission uses `alert()` as a stub — no validation, no error feedback for invalid input

## Cross-Cutting Concerns

**Logging:** None — no console logging or error reporting service
**Validation:** None — contact form inputs are unvalidated; submit button only fires `alert()`
**Authentication:** None — purely informational public site, no login or protected content

---

*Architecture analysis: 2026-04-06*
