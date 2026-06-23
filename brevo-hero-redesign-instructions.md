# Brevo-Style Hero Redesign — Implementation Instructions

> Paste this into a new chat along with the target project's files to apply the same changes there.

---

## What This Does

Redesigns the hero section to match the Brevo landing page style:
- Blue gradient background covering the full hero
- Two-column layout: left = text + form, right = video/image
- Video anchored to the bottom-right of the hero
- Left column content vertically centered, not hugging the left edge
- Bottom-left curve only (`border-bottom-left-radius`), no right curve
- Hero height driven by content (not forced to full viewport height)
- Next section starts immediately after the hero

---

## Reference Layout

```
┌──────────────────────────────────────────────────────────┐
│  [BLUE BG]                                               │
│                                                          │
│    Left col (vertically centered)    Right col          │
│    ├─ h1 Headline                    ┌─────────────┐    │
│    ├─ p Subtitle                     │             │    │
│    ├─ p Note (form lead)             │   Video     │    │
│    └─ [Email input] [CTA btn]        │             │    │
│    └─ Perk badge                     └─────────────┘    │
│                                           (bottom-right) │
╰────────────────────────────────╮                        │
             bottom-left curve   │  no right curve        │
```

---

## HTML Changes (`index.html`)

Replace the current flat `.hero-content` wrapper with two explicit column divs inside `.hero-inner`.

**Before (single column):**
```html
<section id="welcome" class="hero" aria-labelledby="hero-title">
  <div class="container hero-inner">
    <div class="hero-content">
      <h1 ...>Headline</h1>
      <p class="hero-sub">Subtitle</p>
      <div class="hero-demo-video">...video...</div>  <!-- video was HERE between heading and form -->
      <p class="hero-note form-lead-text">Note</p>
      <form id="waitlist-hero" ...>...form...</form>
      <div class="form-perk ...">...perk...</div>
    </div>
  </div>
</section>
```

**After (two columns):**
```html
<section id="welcome" class="hero" aria-labelledby="hero-title">
  <div class="container hero-inner">

    <!-- LEFT COLUMN: headline, subtitle, form -->
    <div class="hero-left">
      <h1 ...>Headline</h1>
      <p class="hero-sub">Subtitle</p>
      <p class="hero-note form-lead-text">Note</p>
      <form id="waitlist-hero" ...>...form...</form>
      <div class="form-perk ...">...perk...</div>
    </div>

    <!-- RIGHT COLUMN: video anchored to bottom-right -->
    <div class="hero-right">
      <div class="hero-demo-video" ...>...video...</div>
    </div>

  </div>
</section>
```

Key moves:
- `.hero-content` → split into `.hero-left` and `.hero-right`
- The `hero-demo-video` block moves out of the left column entirely and into `.hero-right`
- Order in `.hero-left` is now: h1 → p.hero-sub → p.hero-note → form → .form-perk (video no longer between sub and note)

---

## CSS Changes (`style.css`)

### 1. Replace the `.hero` + `.hero-inner` + `.hero-content` block

**Remove this entire block:**
```css
/* Hero — above the fold + content column width */
.hero {
  min-height: calc(100svh - var(--header-h));
  display: flex;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 0;
}

.hero-inner {
  width: 100%;
}

/* Full container width — matches other sections (no side phone column). */
.hero-content {
  width: 100%;
  max-width: none;
  margin-inline: 0;
  padding-bottom: 0;
}

@media (min-width: 992px) {
  .hero-content {
    padding-top: 1rem;
    padding-bottom: 3.75rem;
  }
}
```

**Replace with:**
```css
/* Hero — two-column layout with blue background */
.hero {
  background: var(--primary-gradient);
  display: flex;
  align-items: stretch;
  padding-top: 0;
  padding-bottom: 0;
  border-bottom-left-radius: 64px;
  border-bottom-right-radius: 0;
  overflow: hidden;
}

.hero-inner {
  width: 100%;
  display: flex;
  align-items: stretch;
  gap: 3rem;
  padding-top: 0;
  padding-bottom: 0;
}

/* Left column: headline, subtitle, form — vertically centered */
.hero-left {
  flex: 0 0 52%;
  max-width: 52%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem clamp(1rem, 2vw, 2rem) 4rem clamp(1.5rem, 4vw, 3rem);
}

/* Right column: video anchored to bottom-right */
.hero-right {
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  overflow: hidden;
  padding-top: 2.5rem;
}
```

---

### 2. Update `.hero-title` — add white colour

```css
/* Add this line: */
color: #ffffff;
```

---

### 3. Update `.hero-sub` — change muted colour to white

```css
/* Change from: */
color: var(--text-muted);

/* To: */
color: rgba(255, 255, 255, 0.85);
```

---

### 4. Add hero blue-background overrides (add after the `@media (min-width: 992px)` hero-title/sub block)

```css
/* Hero on blue background — text and form colour overrides */
.hero .hero-note {
  color: rgba(255, 255, 255, 0.75);
}

.hero .form-perk {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}

.hero .form-perk:hover {
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.45);
}

.hero .form-perk__icon {
  color: #ffffff;
}

/* Inverted CTA button: white bg with primary blue text on blue hero */
.hero .btn-primary {
  background: #ffffff;
  color: var(--primary-pressed);
  border-color: #ffffff;
  box-shadow: 0 2px 8px rgba(2, 6, 23, 0.18);
}

.hero .btn-primary:hover {
  background: #f0f9ff;
  border-color: #f0f9ff;
  color: var(--primary-pressed);
}

.hero .btn-primary:active {
  background: #e0f2fe;
  border-color: #e0f2fe;
}

/* Form status text on blue bg */
.hero .form-status {
  color: rgba(255, 255, 255, 0.9);
}
```

---

### 5. Update `.hero-demo-video` base styles

```css
/* Change from: */
.hero-demo-video {
  margin: 0 0 1.5rem;
  border-radius: var(--radius-card);
  border: 1px solid var(--border);
  background: var(--bg-alt);
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.08);
}

/* To: */
.hero-demo-video {
  margin: 0;
  border-radius: var(--radius-card) var(--radius-card) 0 0;
  border: none;
  background: transparent;
  overflow: hidden;
  box-shadow: none;
}
```

---

### 6. Update `.hero-demo-video` desktop override (`@media (min-width: 768px)`)

```css
/* Change from: */
@media (min-width: 768px) {
  .hero-demo-video {
    width: 90%;
    max-width: 880px;
    margin-inline: auto;
  }
  /* ...rest unchanged... */
}

/* To: */
@media (min-width: 768px) {
  .hero-demo-video {
    width: 100%;
    max-width: none;
    margin: 0;
    border-radius: var(--radius-card) var(--radius-card) 0 0;
  }
  /* ...rest unchanged... */
}
```

---

### 7. Update mobile overrides (`@media (max-width: 767px)`)

```css
/* Change from: */
@media (max-width: 767px) {
  .hero {
    min-height: calc(100svh - var(--header-h));
    padding-top: 1.75rem;
    padding-bottom: 2rem;
  }

  .hero-content {
    padding-bottom: 1.5rem;
  }

  .hero-sub {
    margin-bottom: 1.5rem;
  }
  /* ...rest unchanged... */
}

/* To: */
@media (max-width: 767px) {
  .hero {
    border-bottom-left-radius: 32px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .hero-inner {
    flex-direction: column;
    gap: 1.5rem;
    align-items: stretch;
  }

  .hero-left {
    flex: unset;
    max-width: 100%;
    padding: 2.5rem 1.5rem 1rem;
    justify-content: flex-start;
  }

  .hero-right {
    padding-top: 0;
    justify-content: center;
    align-items: flex-end;
  }

  .hero-sub {
    margin-bottom: 1.5rem;
  }
  /* ...rest unchanged... */
}
```

---

## Summary of Key Visual Rules

| Goal | Rule |
|------|------|
| Blue background | `.hero { background: var(--primary-gradient) }` |
| Bottom-left curve only | `border-bottom-left-radius: 64px; border-bottom-right-radius: 0` |
| Clip children to curve | `overflow: hidden` on `.hero` |
| Two columns | `.hero-inner { display: flex; gap: 3rem }` |
| Left col 52% wide | `.hero-left { flex: 0 0 52%; max-width: 52% }` |
| Left content centered vertically | `.hero-left { justify-content: center }` |
| Left content not hugging edge | `padding-left: clamp(1.5rem, 4vw, 3rem)` on `.hero-left` |
| Video sticks to bottom-right | `.hero-right { align-items: flex-end; justify-content: flex-end }` |
| Video flush at hero bottom | `.hero-demo-video { border-radius: 16px 16px 0 0 }` |
| White text on blue | Overrides on `.hero-title`, `.hero-sub`, `.hero-note` |
| Inverted CTA button | `.hero .btn-primary { background: #fff; color: var(--primary-pressed) }` |
| Mobile stacked | `flex-direction: column` + reduced radius `32px` |
