# Twin Repository Synchronization Strategy

## Overview

bestcuit.fr (French) and bestcuit.es (Spanish) are kept in sync through a shared asset structure and coordinated translation updates. This document explains the strategy and provides workflows for maintaining consistency.

## Repository Structure

```
Web BESTCUIT FRANCE/
├── bestcuit-redesign/    # French version (bestcuit.fr)
│   ├── index.html
│   ├── catalogue.html
│   ├── contact.html
│   ├── a-propos.html
│   ├── engagement.html
│   ├── css/styles.css    # SHARED: Do NOT modify independently
│   ├── js/main.js        # SHARED: Do NOT modify independently
│   └── img/              # SHARED: Do NOT modify independently
│       ├── Cuchara.glb
│       ├── Paletina.glb
│       ├── Removedor.glb
│       ├── Tenedor.glb
│       └── [16 other assets]
│
├── bestcuit-es/          # Spanish version (bestcuit.es)
│   ├── index.html        # Translated copy
│   ├── catalogue.html    # Translated copy
│   ├── contact.html      # Translated copy
│   ├── a-propos.html     # Translated copy
│   ├── engagement.html   # Translated copy
│   ├── css/ → copies of ../bestcuit-redesign/css/
│   ├── js/ → copies of ../bestcuit-redesign/js/
│   └── img/ → copies of ../bestcuit-redesign/img/
```

## Core Principles

### 1. Single Source of Truth for Assets
- **CSS, JavaScript, and images** are defined ONLY in `bestcuit-redesign/`
- `bestcuit-es/` contains copied versions that must match exactly
- When assets are updated, both versions must use the same files

### 2. Content Localization
- **HTML content** is independently maintained:
  - French content: `bestcuit-redesign/[page].html`
  - Spanish content: `bestcuit-es/[page].html`
- Each version can be updated independently for text/content changes

### 3. Metadata Synchronization
- **hreflang tags** on every page point to both versions
- **Language switcher** on every page links to corresponding pages on each domain
- Both versions must be kept up-to-date with proper SEO attributes

## Synchronization Rules

### ✅ When to Update French Version (bestcuit-redesign/)

**CSS/JS changes** (applies to both versions):
```
1. Edit bestcuit-redesign/css/styles.css or bestcuit-redesign/js/main.js
2. Test both versions locally (they share the same files)
3. Commit and deploy to both bestcuit.fr and bestcuit.es
4. Both sites update automatically
```

**Image/Asset updates** (applies to both versions):
```
1. Add new image/asset to bestcuit-redesign/img/
2. Update bestcuit-redesign/[page].html to reference new asset
3. Update bestcuit-es/[page].html to reference same asset (same path)
4. Test both versions
5. Commit asset + both HTML files
```

**HTML/Content updates** (French only initially):
```
1. Edit bestcuit-redesign/[page].html (French)
2. Test French version
3. Note what changed for translation
4. Plan Spanish translation update (next step)
```

### ✅ When to Update Spanish Version (bestcuit-es/)

**HTML/Content updates** (Spanish only):
```
1. Read the updated French content from bestcuit-redesign/[page].html
2. Translate to Spanish
3. Update bestcuit-es/[page].html with translation
4. Test Spanish version
5. Verify language switcher and hreflang tags are correct
```

**⚠️ NEVER modify**:
- css/ folder in bestcuit-es/
- js/ folder in bestcuit-es/
- img/ folder in bestcuit-es/

These must always match bestcuit-redesign/ versions exactly.

## Workflows

### Workflow 1: Styling/Interactive Feature Change

Applied to both versions automatically.

```
User want to change: Add new button style or fix CSS bug

1. Edit bestcuit-redesign/css/styles.css
2. Test on both versions locally:
   - Open bestcuit-redesign/index.html
   - Open bestcuit-es/index.html
   - Verify both look identical
3. Commit: git commit -m "fix: update button styles"
4. Deploy to both bestcuit.fr and bestcuit.es
5. Both sites automatically updated (shared CSS)
```

### Workflow 2: Product Information Change

Affects both versions (specs, nutrition, products).

```
User wants to: Update product specs or nutrition information

1. Edit bestcuit-redesign/catalogue.html (French)
2. Update product specs or nutrition values
3. Test French version
4. Translate any text changes to Spanish
5. Update bestcuit-es/catalogue.html with Spanish translation
6. Test Spanish version
7. Commit both: git commit -m "feat: update product specifications (FR + ES)"
8. Deploy both versions
```

### Workflow 3: New Page Feature

Requires coordination between versions.

```
User wants to: Add new section or page

1. Create/update bestcuit-redesign/[new-file].html (French)
2. Add hreflang tags:
   <link rel="alternate" hreflang="fr" href="https://www.bestcuit.fr/[new-file].html">
   <link rel="alternate" hreflang="es" href="https://www.bestcuit.es/[new-file].html">
3. Add language switcher markup
4. Test French version
5. Create bestcuit-es/[new-file].html (translated)
6. Add matching hreflang tags (swap fr/es)
7. Add language switcher (swap links)
8. Test Spanish version
9. Update navigation on ALL 10 pages (5 FR + 5 ES) if menu changed
10. Commit all changes: git commit -m "feat: add new page (FR + ES)"
```

### Workflow 4: New Asset/Image

Assets are shared between versions.

```
User wants to: Add new product image or icon

1. Add file to bestcuit-redesign/img/[new-image]
2. Reference in bestcuit-redesign/[page].html
3. Reference same asset in bestcuit-es/[page].html (same path: img/[new-image])
4. Test both versions
5. Commit: git commit -m "feat: add new product image"
6. Both versions reference same file automatically
```

## SEO & International Configuration

### hreflang Tags

Every HTML page MUST have hreflang tags in `<head>`:

**French pages (bestcuit-redesign/):**
```html
<link rel="alternate" hreflang="fr" href="https://www.bestcuit.fr/[page].html">
<link rel="alternate" hreflang="es" href="https://www.bestcuit.es/[page].html">
<link rel="alternate" hreflang="x-default" href="https://www.bestcuit.fr/[page].html">
```

**Spanish pages (bestcuit-es/):**
```html
<link rel="alternate" hreflang="fr" href="https://www.bestcuit.fr/[page].html">
<link rel="alternate" hreflang="es" href="https://www.bestcuit.es/[page].html">
<link rel="alternate" hreflang="x-default" href="https://www.bestcuit.fr/[page].html">
```

### Language Switcher

Every page MUST have language switcher:

**French pages:**
```html
<div class="language-switcher">
  <a href="https://www.bestcuit.fr/[page].html" class="lang-link active" lang="fr">FR</a>
  <span class="lang-separator">|</span>
  <a href="https://www.bestcuit.es/[page].html" class="lang-link" lang="es">ES</a>
</div>
```

**Spanish pages:**
```html
<div class="language-switcher">
  <a href="https://www.bestcuit.fr/[page].html" class="lang-link" lang="fr">FR</a>
  <span class="lang-separator">|</span>
  <a href="https://www.bestcuit.es/[page].html" class="lang-link active" lang="es">ES</a>
</div>
```

## Pre-Deployment Checklist

Before committing changes to either version:

### For any page change:
- [ ] French version (bestcuit-redesign/) updated and tested
- [ ] Spanish version (bestcuit-es/) translated and tested
- [ ] Both have matching hreflang tags
- [ ] Both have language switcher with correct URLs
- [ ] Navigation links point to correct versions
- [ ] CSS/JS files match between versions
- [ ] Images/assets exist in both versions (if referenced)
- [ ] Commit message mentions (FR + ES) if both updated

### For CSS/JS-only changes:
- [ ] bestcuit-redesign/css/ or bestcuit-redesign/js/ updated
- [ ] bestcuit-es/css/ and bestcuit-es/js/ copies updated to match
- [ ] Both versions tested in browser
- [ ] No visual differences between versions

### For new pages:
- [ ] Both French and Spanish pages created
- [ ] hreflang tags added to both
- [ ] Language switcher added to both
- [ ] Navigation updated on ALL existing pages (FR + ES)
- [ ] Links from both versions are correct

## Common Mistakes to Avoid

❌ **DON'T:**
- Edit css/ folder in bestcuit-es/ independently
- Edit js/ folder in bestcuit-es/ independently
- Edit img/ folder in bestcuit-es/ independently
- Forget to update hreflang tags on both versions
- Forget to update language switcher URLs
- Translate a page and forget to update corresponding French page with new content
- Commit only one version when both were updated

✅ **DO:**
- Always update French first, then translate to Spanish
- Keep CSS/JS/images in sync (same files/copies)
- Test both versions before committing
- Include (FR + ES) in commit messages when both updated
- Use consistent HTML structure in both versions
- Check hreflang tags in browser DevTools

## Version Control Strategy

### Branch Management
- All work on `master` branch
- Each language version (FR/ES) commits together
- Commit message format: `type: description (FR + ES)` or `type: description (FR)` if French-only

### Commit Frequency
- One commit per logical change
- Commits should touch related files together:
  - CSS + both HTML versions if styling change affects content layout
  - Both HTML versions if content changes affect both
  - Asset + both HTML versions if new image added

### Example Commits
```
✓ feat: expand nutrition table (FR + ES)
✓ fix: 3D model visualization sizing (FR)
✓ feat: add language switcher (FR + ES)
✓ style: update brand colors (FR + ES)
```

## Testing & Validation

### Local Testing (Before Commit)
1. Open both versions in separate browser tabs
2. Navigate to same page on both
3. Compare:
   - Layout (should be identical)
   - Colors/styling (should be identical)
   - Language (FR on left, ES on right)
   - Links (both point to correct versions)
   - 3D models (if present)
4. Check browser DevTools → `<head>`:
   - hreflang tags present
   - lang attribute correct (fr vs es)
   - CSS/JS paths correct

### Automated Testing (Future)
- Add script to verify CSS/JS files match between versions
- Add hreflang tag validation
- Add 404 checks on language switcher links

## Maintenance Schedule

### Weekly
- Test both versions in browser
- Verify language switcher works
- Check for broken links

### Monthly
- Full audit of both versions
- Verify all hreflang tags correct
- Test mobile responsiveness on both
- Check SEO metadata (titles, descriptions)

### Quarterly
- Code review of both versions
- Update synchronization documentation if needed
- Plan next feature additions
- Update this document with lessons learned

## Contact & Support

For questions about:
- **Content translations**: Contact translation team
- **Technical setup**: Contact development team
- **Deployment**: Contact DevOps team
- **SEO/international**: Contact marketing team

---

**Last Updated:** 2026-04-10
**Maintained by:** BESTCUIT Development Team
