# Noga Labs — SEO & GEO Guidelines
> **Instructions for Cursor / any AI assistant:** Every page must include the full meta block below. Update URLs and OG image once a real domain is confirmed. Do not remove structured data or semantic HTML elements.

---

## Current Status
- Domain: `https://nogalabs.com/`
- OG image: placeholder — **must be replaced with a real 1200×630px image before launch**

---

## Meta Block (Required on Every Page)

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="[Page-specific description — see table below]" />

<!-- Open Graph -->
<meta property="og:title" content="[Page-specific OG title]" />
<meta property="og:description" content="[Page-specific OG description]" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://[domain]/[path]" />
<meta property="og:image" content="https://[domain]/assets/og-image.jpg" />

<!-- Twitter / X Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Page-specific title]" />
<meta name="twitter:description" content="[Page-specific description]" />
<meta name="twitter:image" content="https://[domain]/assets/og-image.jpg" />

<!-- Canonical -->
<link rel="canonical" href="https://[domain]/[path]" />
```

---

## Per-Page Meta Copy

### index.html (Homepage — new site)
| Tag | Value |
|---|---|
| `<title>` | Noga Labs — Game Demos and Ad Credits for Mobile Developers |
| `meta description` | Noga Labs — Game demos and ad credits for mobile game developers. |
| `og:title` | Noga Labs — Mobile Game Demos and Credit-Based Advertising |
| `og:description` | Build playable demos fast. Earn ad credits. Grow your mobile game without burning your budget. |
| `canonical` | `https://nogalabs.com/` |

### landing/index.html (Landing Page / Waitlist)
| Tag | Value |
|---|---|
| `<title>` | Noga Labs — Game Demos and Ad Credits for Mobile Developers |
| `meta description` | Noga Labs is a platform for mobile game developers to build playable demos in minutes and advertise through a credit exchange marketplace. Join the waitlist for early access. |
| `og:title` | Noga Labs — Mobile Game Demos and Credit-Based Advertising |
| `og:description` | Build playable demos fast. Earn ad credits. Grow your mobile game without burning your budget. Join the waitlist. |
| `canonical` | `https://nogalabs.com/landing/` |

> ⚠️ The current `<title>` and meta description in `landing/index.html` may reference older framing. Update to align with current product messaging above.

---

## Target Keywords

### Primary (use in H1, title, meta description)
- mobile game demos
- mobile game advertising credits
- game demo platform
- mobile game developer tools

### Secondary (use in body, H2s, card text)
- playable game demo
- ad credit exchange
- mobile game user acquisition
- game advertising without budget
- small game studio tools
- indie mobile game marketing

### Long-tail (use naturally in body copy, blog posts, FAQ)
- how to create a game demo without a dev team
- low budget mobile game advertising
- earn advertising credits for mobile games
- mobile game demo creation platform

---

## Semantic HTML Rules

For SEO, always use the correct HTML elements:
- `<h1>` — one per page, the hero title
- `<h2>` — section headings
- `<h3>` — card/subsection headings
- `<main>` — wraps all page content
- `<header>` / `<footer>` — site header and footer
- `<nav aria-label="...">` — all navigation elements
- `<section aria-labelledby="...">` — all content sections
- `<article>` — self-contained cards (currently used for `.vault-card`)

---

## GEO (Generative Engine Optimization)

As LLMs and AI search tools become more common, structure content so it can be understood and cited by AI:

### Rules
1. **Answer questions directly in copy** — "What is Noga Labs?" should be answerable from the first paragraph on the page
2. **Use structured markup** — add `application/ld+json` schema (see below)
3. **Be specific** — AI tools prefer specific claims over vague ones ("build demos in minutes" beats "streamline your workflow")
4. **Name the category** — always include "mobile game" and "ad credits" / "credit exchange" near the top of the page

### Recommended Schema (add to `<head>`)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Noga Labs",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web",
  "description": "A platform for mobile game developers to create playable demos and advertise through a credit exchange marketplace.",
  "audience": {
    "@type": "Audience",
    "audienceType": "Mobile Game Developers"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/PreOrder",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

---

## OG Image Spec
- Dimensions: `1200 × 630px`
- File: `assets/og-image.jpg`
- Must include: Noga Labs logo + tagline "Game Demos and Ad Credits for Mobile Developers"
- Background: use brand blue gradient (`#0369a1` → `#0ea5e9`)
- Text: white, Plus Jakarta Sans Bold

---

## Checklist Before Launch
- [ ] Create and upload `og-image.jpg` (1200×630)
- [ ] Update `<title>` and meta description on all pages as needed
- [ ] Add `application/ld+json` schema to `<head>` on landing page
- [ ] Add `<link rel="canonical" href="..." />` to every page
- [ ] Submit sitemap to Google Search Console
- [ ] Verify OG tags with [opengraph.xyz](https://opengraph.xyz)
