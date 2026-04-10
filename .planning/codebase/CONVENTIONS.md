# Coding Conventions

**Analysis Date:** 2026-04-06

## Project Nature

This is a **static HTML/CSS/JS website** — a single-page application (SPA) built with vanilla technologies. There is no build tool, no framework, no package manager. All conventions are applied by hand.

Source files:
- `index.html` — full SPA markup (all pages embedded, ~1400+ lines)
- `style.css` — all styles in one file (762 lines)
- `script.js` — all JavaScript behaviour (71 lines)

## Naming Patterns

**CSS Classes:**
- BEM-like block-element naming with hyphens: `.why-card`, `.why-card-num`, `.hero-text`, `.hero-cta`, `.stat-item`, `.stat-num`, `.stat-label`
- Section wrappers use `.section-[name]` pattern: `.section-why`, `.section-action`, `.section-cta`
- Page containers use `.page` with `id="page-[name]"`: `page-accueil`, `page-apropos`
- Modifier classes added directly: `.active`, `.open`, `.visible`, `.scrolled`
- Navigation links use `id="nav-[name]"` paired with `id="page-[name]"` for JS targeting

**JavaScript:**
- camelCase for all function names: `showPage()`, `animateCounter()`, `observeElements()`
- camelCase for all variable names: `statsObserver`, `statsBar`, `navLink`
- Single-letter loop variables accepted for short arrow callbacks: `p`, `a`, `e`, `el`

**CSS Custom Properties (variables):**
- Defined in `:root` in `style.css` lines 3-22
- Named by semantic role: `--cream`, `--brown`, `--terra`, `--terra-light`, `--terra-dark`, `--terra-pale`
- Shadow variants: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-terra`
- Typography: `--font-display`, `--font-body`
- Easing curves: `--ease-out`, `--ease-spring`
- Used 146+ times throughout the stylesheet — all colours and shadows go through variables, never raw hex values inline

## Code Style

**CSS Formatting:**
- Minified/compressed syntax — all properties on one line per rule where short: `body{font-family:var(--font-body);background:var(--cream);color:var(--brown);overflow-x:hidden}`
- Multi-line only when rules are long or grouped logically
- No spaces after `:` or around `{` in compressed rules
- Section headers using `/* ===== SECTION NAME ===== */` pattern (24 sections total)

**JavaScript Formatting:**
- 2-space indentation
- `const` used for all non-reassigned values
- Arrow functions used for callbacks: `(entries) => { ... }`, `entries.forEach(e => { ... })`
- Traditional function declarations for named reusable functions: `function showPage(id) { }`, `function animateCounter(el, target, suffix, duration) { }`
- Semicolons used consistently
- Single quotes for strings

**HTML:**
- 2-space indentation
- Lowercase element and attribute names
- Double quotes for attribute values
- `data-*` attributes for JS-accessible data: `data-target`, `data-suffix` (used in animated counters)

## CSS Architecture

**Single-file approach:** All styles live in `style.css`. Sections are divided by `/* ===== NAME ===== */` comments in this order:
1. RESET & ROOT
2. TYPOGRAPHY HELPERS
3. NAV
4. BUTTONS
5. ANIMATIONS
6. HERO
7. STATS BAR
8. WHY SECTION
9. ACTION SECTION
10. CTA SECTION
11. FOOTER
12. PAGE SECTIONS
13. À PROPOS
14. CIRCULAR SECTION
15. ENGAGEMENT
16. NUTRITION
17. USE & EAT
18. LOGISTIQUE
19. CATALOGUE
20. CONTACT
21. LEGAL
22. RESPONSIVE (breakpoints at 960px and 480px)
23. NAV CATALOGUE PREVIEW
24. VALUES GRID

**Responsive breakpoints:**
- `@media(max-width:960px)` — tablet/mobile layout changes
- `@media(max-width:480px)` — small mobile adjustments

**Button system:**
- Four button variants defined as a group: `.btn`, `.btn-terra`, `.btn-outline`, `.btn-white`
- Shared base properties declared together, then overrides per variant

## Animation Conventions

**CSS keyframes** defined at top of animations section:
- `fadeUp` — opacity 0 + translateY(36px) → normal
- `fadeIn` — opacity only
- `slideInLeft` — opacity + translateX(-24px)
- `bounce` — vertical oscillation for scroll hint

**JS-driven animations:**
- `IntersectionObserver` used for scroll-triggered effects, never scroll event listeners for visibility
- `.fade-in` class + `.visible` modifier pattern for reveal-on-scroll: elements start `opacity:0; transform:translateY(28px)`, transition to visible when observer fires
- `requestAnimationFrame` loop used for numeric counter animation in `animateCounter()`
- `observer.unobserve(entry.target)` called after animation fires — animate once only

**Transition values:**
- Short interactions: `.2s` to `.3s`
- Medium transitions: `.35s` to `.55s`
- Long/entrance: `.9s`
- Easing always references `var(--ease-out)` or `var(--ease-spring)` — never hardcoded cubic-bezier inline

## JavaScript Patterns

**Page routing:**
- SPA navigation via `showPage(id)` toggling `.active` class on `.page` elements
- All pages pre-rendered in DOM, toggled with CSS `display: none` / `display: block`
- Nav links identified by paired IDs (`nav-[id]` / `page-[id]`)
- `return false` used in `showPage()` to prevent link default behaviour

**Event handling:**
- `window.addEventListener` for scroll events
- `document.getElementById` for single-element access
- `document.querySelectorAll` + `.forEach` for multi-element operations

**Guard patterns:**
- Null check before classList operations: `if (page) { ... }` and `if (navLink) { ... }`
- `if (statsBar) statsObserver.observe(statsBar)` — guard before observing optional elements

## Comments

**JavaScript:**
- Short `// Section name` comments group logical blocks: `// Scroll effects`, `// Hamburger menu`, `// Animated counter for stats`
- Inline comments for non-obvious behaviour: `// re-observe new page elements`

**CSS:**
- `/* ===== SECTION NAME ===== */` headers only — no inline property comments
- No JSDoc or TSDoc (not applicable — no TypeScript or module system)

## Import Organization

No import/export system — all code is in global scope. Script loaded via `<script>` tag at bottom of `index.html`. No ES modules.

---

*Convention analysis: 2026-04-06*
