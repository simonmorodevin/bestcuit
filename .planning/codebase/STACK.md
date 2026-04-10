# Technology Stack

**Analysis Date:** 2026-04-06

## Project Context

This project contains two distinct codebases:

1. **Custom redesign** (`index.html`, `style.css`, `script.js`) — A hand-coded static website being built to replace the current live site.
2. **Live site mirror** (`bestcuit-mirror/www.bestcuit.fr/`) — An HTTrack crawl of the existing production site at `www.bestcuit.fr`, captured 2026-04-05.

---

## Custom Redesign (Root Files)

### Languages

**Primary:**
- HTML5 — `index.html` (single-page application, ~1.4MB including inline base64 assets)
- CSS3 — `style.css` (31KB, fully custom, no framework)
- JavaScript (ES2020+) — `script.js` (2.4KB, vanilla JS)

### Runtime

**Environment:**
- Static files — no server-side runtime required
- Runs entirely in the browser

**Package Manager:**
- None — no `package.json`, no lockfile, no build step

### Frameworks

**Core:**
- None — pure vanilla HTML/CSS/JS, no framework dependencies

**CSS:**
- No CSS framework (no Bootstrap, Tailwind, etc.)
- Custom CSS custom properties (CSS variables) for design tokens
- CSS architecture: single flat `style.css` file with section comments

**Build/Dev:**
- No build toolchain detected
- No bundler (Webpack, Vite, Rollup, Parcel)
- No transpiler (Babel, TypeScript)
- Files served directly as-is

### Key Dependencies

**Typography (CDN-loaded):**
- Google Fonts — `Playfair Display` (700, 900 weights) and `DM Sans` (300, 400, 500 weights)
  - Loaded via: `https://fonts.googleapis.com/css2?family=Playfair+Display...`

**JavaScript APIs used (browser-native):**
- `IntersectionObserver` — scroll-triggered fade-in animations (`script.js` lines 21–31)
- `requestAnimationFrame` — animated counter effect (`script.js` lines 42–53)
- `window.scrollTo` — smooth page transitions
- No third-party JS libraries

### Configuration

**Environment:**
- No environment variables
- No configuration files
- Static assets: logo embedded as base64 data URI directly in `index.html`

**Build:**
- No build config files

### Platform Requirements

**Development:**
- Any text editor or IDE
- Any local static file server (e.g., VS Code Live Server, `python -m http.server`)
- No Node.js, Python, or other runtime required

**Production:**
- Any static hosting provider (Netlify, Vercel, GitHub Pages, Hostinger, Apache, Nginx)
- No server-side processing required
- HTTPS recommended (Google Fonts requires it)

---

## Live Site Mirror (`bestcuit-mirror/www.bestcuit.fr/`)

### Platform

**Website Builder:**
- Hostinger Website Builder (`<meta name="generator" content="Hostinger Website Builder">`)
- Template type: `aigenerated` (AI-generated template)
- Internal platform: Zyro/Zyrosite (rebranded as Hostinger Builder)

### Languages (Mirror)

- HTML — server-rendered by Hostinger platform
- JavaScript — Astro framework runtime bundled by Hostinger
  - Evidence: `_astro-1775144808925/` directory, Astro island hydration scripts in HTML

### Frameworks (Mirror)

- **Astro** — static site generation framework used by Hostinger Builder internally
  - CSS bundles: `_astro-1775144808925/_slug_.EF61EKpi.css`, `_slug_.z-jXICr9.css`

### Fonts (Mirror)

- Google Fonts (proxied via Zyro CDN): `Poppins` (400–800) and `Inter` (400, 500)
  - Loaded from: `https://cdn.zyrosite.com/u1/google-fonts/font-faces?...`

### Assets (Mirror)

- Images served from: `https://assets.zyrosite.com/cdn-cgi/image/...` (Cloudflare Images CDN)
- Stock photos from: `https://images.unsplash.com/` and `https://images.pexels.com/`
- Video from: `https://videos.pexels.com/`
- Site asset ID: `ALpPMbl95zt93znw`

---

## Mirror Capture Tool

- **HTTrack Website Copier** 3.49-2 — used to capture the live site locally
- Log: `bestcuit-mirror/hts-log.txt`
- Captured: 2026-04-05, 22 links scanned, 9 files written

---

*Stack analysis: 2026-04-06*
