# Noga Labs — Design System
> **Instructions for Cursor / any AI assistant:** Read this file in full before touching any HTML, CSS, or JS. Do not change copy, colors, fonts, or component structure without explicit user approval. When in doubt, ask.

---

## 1. Brand Identity

**Product name:** Noga Labs  
**Tagline:** Game Demos and Ad Credits for Mobile Game Developers  
**Audience:** Small mobile game development teams with limited budget, time, and technical resources  
**Tone:** Clear, direct, confident — never hype-y, never jargon-heavy  

---

## 2. Color Palette

All colors are defined as CSS custom properties in `:root`. Never hardcode hex values in components — always reference the variable.

### Semantic Roles

| Variable | Hex | Role |
|---|---|---|
| `--bg` | `#ffffff` | Main page background |
| `--bg-alt` | `#f8fafc` | Alternate section background (e.g. footer waitlist) |
| `--text` | `#0f172a` | Primary body text |
| `--text-muted` | `#475569` | Secondary / supporting text |
| `--primary` | `#0ea5e9` | Brand blue — interactive elements, highlights |
| `--primary-gradient` | `linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)` | CTA buttons, nav CTA |
| `--primary-hover` | `#0284c7` | Button hover state |
| `--primary-pressed` | `#0369a1` | Button active/pressed state |
| `--accent` | `#0ea5e9` | Accent highlights, icon glow |
| `--accent-line` | `#38bdf8` | Lighter accent for lines, dividers |
| `--timeline-accent` | `#2563eb` | Active state in timeline dots/lines |
| `--timeline-accent-line` | `#60a5fa` | Active text in timeline nav |
| `--bento-bg` | `linear-gradient(135deg, #0369a1 0%, #0ea5e9 100%)` | Benefits section background |
| `--bento-card-bg` | `#0f172a` | Dark card background in benefits grid |
| `--bento-text` | `#f8fafc` | Text on dark cards |
| `--bento-text-muted` | `#94a3b8` | Muted text on dark cards |
| `--bento-icon` | `#38bdf8` | Icon color on dark cards |
| `--border` | `#e2e8f0` | Borders, dividers |
| `--gray-dot` | `#cbd5e1` | Inactive timeline dots |
| `--glass-border` | `rgba(226, 232, 240, 0.8)` | Glass effect borders |
| `--glass-bg` | `rgba(255, 255, 255, 0.85)` | Glass effect backgrounds (header) |

### ⚠️ Color Rules
- **No purple.** Anywhere. Ever. This is a deliberate anti-AI-slop decision.
- Do not introduce new colors without updating this table and getting approval.
- Use color for purpose, not decoration. Every color choice should have a semantic reason.
- Error states use `#ef4444` (red). Success states use `#5eead4` (teal). These are the only exceptions to the blue palette.

---

## 3. Typography

### Font
```css
font-family: "Plus Jakarta Sans", system-ui, -apple-system, sans-serif;
```
Loaded via Google Fonts — already in `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Plus Jakarta Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```
**Do not add a second font family.** One font, multiple weights.

### Type Scale & Rules

| Element | Size | Weight | Letter Spacing | Line Height |
|---|---|---|---|---|
| H1 (hero) | `clamp(2.25rem, 6vw, 3.5rem)` | 800 | `-0.03em` | `1.1` |
| H2 (section) | `clamp(1.75rem, 4vw, 2.5rem)` | 700 | `-0.03em` | `1.15` |
| H3 (card) | `clamp(1.1rem, 2.5vw, 1.35rem)` | 600 | `-0.02em` | `1.3` |
| Body (lead) | `clamp(1.0625rem, 2vw, 1.1875rem)` | 400 | default | `1.55` |
| Body (default) | `1rem` | 400 | default | `1.6` |
| Small / muted | `0.875rem` | 400–500 | default | `1.5` |
| Nav links | `0.875rem` | 500 | default | `1.2` |
| Buttons | `1rem` (primary), `0.875rem` (header) | 600 | default | `1.2` |

### Typography Rules
- Tight headers look professional: always apply `letter-spacing: -0.03em` and `line-height: 1.1` to H1s.
- Use `clamp()` for fluid type — never fixed px for headings.
- H1 should always answer: what is it + who is it for. See Copy Guidelines.

---

## 4. Spacing & Layout

### Spacing Unit
Base unit: `8px`. All spacing should be multiples of 8 (or 4 for micro-spacing).

| Token | Value | Use |
|---|---|---|
| `--mobile-pad` | `24px` | Horizontal padding on mobile |
| `--header-h` | `72px` | Header height (used for scroll-margin-top) |
| Section padding | `clamp(3.5rem, 8vw, 6rem)` | Top/bottom on most sections |
| Container max-width | `1120px` | Page-wide content cap |
| Container padding | `1.25rem` inline (desktop), `var(--mobile-pad)` (mobile) |
| Card padding | `clamp(1.5rem, 3vw, 2.5rem)` | Internal card padding |
| Card gap (grid) | `1.25rem` | Gap between bento cards |

### Grid System
- Base: CSS Grid with 4-column implied structure (bento cards are 2-col on desktop, stack on mobile)
- Container: `max-width: 1120px`, centered
- No Bootstrap, no external grid framework

### Breakpoints
| Name | Value | Behavior |
|---|---|---|
| Mobile | `< 480px` | Single column, stacked forms |
| Tablet | `480px – 767px` | Forms go inline, some 2-col |
| Desktop (sm) | `768px` | Nav shows, header layout switches |
| Desktop (lg) | `992px` | Hero goes 2-col (text + image) |

---

## 5. Border Radius

| Variable | Value | Use |
|---|---|---|
| `--radius-pill` | `9999px` | Buttons, input fields, nav toggle |
| `--radius-card` | `16px` | Cards (vault, timeline) |
| `--radius-ui` | `12px` | UI elements (tags, chips, badges) |

---

## 6. Shadows & Effects

### Box Shadows
- Button hover: `0 4px 12px rgba(14, 165, 233, 0.3)` — lifts the button
- Input focus ring: `0 0 0 3px rgba(14, 165, 233, 0.15)`
- Input error ring: `0 0 0 2px rgba(239, 68, 68, 0.2)`
- Cards: subtle `box-shadow` with low opacity dark — never harsh

### Background Effects
- Page has a **fixed radial gradient** background (subtle blue glows at 15%/85%) — do not remove
- Page has a **fixed subtle grid overlay** (`32px × 32px` lines at 3% opacity) — do not remove
- These provide depth without distraction

### Glass Effect (Header)
```css
background: rgba(255, 255, 255, 0.85);
backdrop-filter: blur(16px);
border-bottom: 1px solid var(--border);
```

### Overlays on Images
- For text over images, use: `linear-gradient(to right, rgba(255,255,255,0.1), transparent)` as a `::before` pseudo-element
- Progressive blur is acceptable for contrast

---

## 7. Components

### 7.1 Buttons

All buttons must have **4 states**: default, hover, pressed/active, disabled.

#### Primary Button (`.btn.btn-primary`)
```css
/* Default */
background: var(--primary-gradient);
color: #fff;
padding: 0.875rem 1.75rem;
border-radius: var(--radius-pill);
font-weight: 600;

/* Hover — lifts the button, makes it more prominent */
background: var(--primary-hover);
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);

/* Active/Pressed */
background: var(--primary-pressed);
transform: translateY(0);
box-shadow: none;

/* Disabled */
opacity: 0.5;
cursor: not-allowed;
transform: none;
```

#### Header CTA Button (`.btn-header`)
- Same states as primary but `padding: 0.625rem 1.25rem`, `font-size: 0.875rem`
- On mobile: min-height `40px`, fluid padding via `clamp()`

#### Arrow Icon in Buttons
- All primary CTAs include a right-arrow SVG (`.btn-icon`)
- On hover, the icon nudges right: `transform: translateX(3px)`
- Icon size: `16px × 16px`, matches font height

#### ⚠️ Button Rules
- Hover must **make the button MORE visible**, not less (no fading, no opacity reduction)
- No hover effects that distract from the content — subtle lift + shadow is enough
- Never use only an icon as a button label without accessible text

### 7.2 Input Fields

All inputs must have **3 states**: default, focus, error.

#### Email Input (`.input-email`)
```css
/* Default */
border: 1px solid var(--border);
border-radius: var(--radius-pill);
padding: 0.875rem 1.25rem;
background: #ffffff;

/* Focus */
border-color: var(--primary);
box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);

/* Error */
border-color: #ef4444;
box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
```

### 7.3 Cards (Bento / Vault)

- Dark background: `var(--bento-card-bg)` = `#0f172a`
- Text: `var(--bento-text)` = `#f8fafc`
- Icon: `var(--bento-icon)` = `#38bdf8`
- Border radius: `var(--radius-card)` = `16px`
- The section wrapper uses the gradient background (`--bento-bg`)

### 7.4 Timeline / How It Works

- Desktop: vertical scroll snap with sidebar dot navigation
- Mobile: horizontal swipe snap with synced progress rail
- Sidebar dots animate on scroll: inactive = `var(--gray-dot)`, active = `var(--timeline-accent)`
- Timeline lines animate on scroll with `transition: height 0.6s ease`
- Scroll hint animates with bounce (desktop) or horizontal nudge (mobile), hides after first interaction

### 7.5 Navigation (Header)

- Sticky, glass effect
- Desktop: Logo left | Nav center | CTA right (3-col grid)
- Mobile: Logo left | CTA center | Hamburger right
- Hamburger animates to X on open
- Mobile drawer slides down from header with backdrop blur

### 7.6 Forms (Waitlist)

- Two instances: `#waitlist-hero` (above the fold) and `#waitlist-footer`
- UTM params auto-filled from URL
- On success: `is-success` class added, status message shown, input cleared
- On error: `is-error` class on input, error message shown
- Submit button disabled during fetch, re-enabled on completion

---

## 8. Micro-interactions & Animations

| Element | Animation | Trigger |
|---|---|---|
| Primary button | `translateY(-2px)` + shadow | `:hover` |
| Arrow icon | `translateX(3px)` | Parent `:hover` |
| Hero phone image | `rotate(0) scale(1.02)` from slight tilt | `:hover` |
| Timeline dot | `scale(1.25)` | Scroll intersection |
| Timeline line fill | `height: 0 → 100%` | Scroll intersection |
| Scroll hint | Fade out (`opacity: 0`) | After first section passed |
| Scroll hint icon | Bounce (Y) on desktop, nudge (X) on mobile | Continuous, 1.4s loop |
| Form success | `scale(1.02)` pop | On submit success |
| Mobile nav drawer | Slide down + fade in | Toggle |

### ⚠️ Animation Rules
- Effects should guide attention, never steal it
- No extravagant hover effects on sections or large elements
- All transitions: `0.2s ease` for UI, `0.5s–0.6s` for scroll-driven
- Never add animations that block or delay content reading

---

## 9. Icons

- All icons are inline SVG — no icon font, no external icon library
- Style: `stroke="currentColor"`, `stroke-width="1.5"` or `2`
- Size: match font height of surrounding text (16px for buttons and nav, 24px for cards)
- Never oversized — icons support the label, they don't replace it
- Icons that are purely decorative: `aria-hidden="true"`

---

## 10. Accessibility

- All forms have `<label>` elements (visually hidden via `.sr-only` is acceptable)
- Interactive elements have `:focus` styles
- Images have `alt` text. Decorative images: `alt=""`
- `aria-live="polite"` on form status messages
- Mobile nav drawer: `role="dialog"`, `aria-modal="true"`, `aria-hidden` toggled by JS
- Escape key closes mobile nav
- `scroll-margin-top` on all anchor targets to account for sticky header

---

## 11. What NOT to Do

- ❌ No purple — in any shade, for any reason
- ❌ No revealing content on hover (anti-pattern — don't make users hunt for info)
- ❌ No bento-box layouts as a default pattern (overused by AI tools)
- ❌ No extravagant hover effects on sections, cards, or images
- ❌ No animations that delay or obscure content
- ❌ No second font family
- ❌ No hardcoded hex values in components — always use CSS variables
- ❌ Do not change copy without consulting the user (see COPY_GUIDELINES.md)
- ❌ Do not hide navigation or functionality to "clean up" the UI
- ❌ Do not use more than 2 levels of visual hierarchy in a single section

---

## 12. File Structure

```
/
├── index.html              ← New website homepage (future design)
├── landing/
│   └── index.html          ← LP / waitlist page (this design system applies here)
├── css/
│   ├── main.css            ← New website styles
│   └── landing.css         ← LP styles (single file, no preprocessor)
├── js/
│   ├── main.js             ← New website JS
│   └── landing.js          ← LP JS (IIFE, vanilla, no framework)
├── assets/
│   └── landing/            ← LP-specific images and media
│       ├── logo-black.png      ← Full wordmark (desktop)
│       ├── logo-black-n.png    ← Icon only (mobile)
│       └── phone-hero.png      ← Hero product image
├── robots.txt
├── sitemap.xml
└── docs/
    ├── DESIGN_SYSTEM.md    ← This file (applies to landing page)
    ├── COPY_GUIDELINES.md  ← Approved copy + tone rules
    ├── SEO.md              ← Meta, OG, keywords
    └── INSPIRATION.md      ← Reference links and design notes
```

> **Note:** This design system applies to the landing page (`landing/index.html`). The new website homepage uses `css/main.css` and will have its own design when built.

---

## 13. Session Start Checklist (for AI assistants)

Before making any changes, confirm:
- [ ] I have read DESIGN_SYSTEM.md in full
- [ ] I am using CSS variables, not hardcoded values
- [ ] I am not changing copy without approval
- [ ] I am not introducing new colors or fonts
- [ ] My hover effects make elements MORE visible, not less
- [ ] I have checked mobile breakpoints (767px, 480px)
- [ ] I have preserved all 4 button states and 3 input states
