# Noga Labs — Inspiration & Design Principles

> Reference document. Not a spec — use DESIGN_SYSTEM.md for exact values.

---

## Reference Sites

| Site | What to borrow |
|---|---|
| [resend.com](https://resend.com) | H1 formula: "[Product] for [audience]" — dead simple, instantly clear |
| [linear.app](https://linear.app) | Clean layout, strong visual hierarchy, confident type |
| [monday.com](https://monday.com) | Section structure, benefit-focused copy |
| [cursor.com](https://cursor.com) | Minimal but not stripped — still functional and readable |
| [replit.com](https://replit.com) | Developer-friendly tone, feature-forward |
| [nunu.ai](https://nunu.ai) | Card animations — smooth, purposeful, not distracting |

---

## Video Notes: "Common Mistakes With Vibe Coded Websites" (Y Combinator)

1. **No purple** — all AI-generated sites default to purple. Ours uses blue. Keep it that way.
2. **Effects are fine, content is king** — animations and visuals support content, never compete with it.
3. **Button hover = more prominent**, not less — our buttons lift and get a glow shadow on hover. Never reduce opacity or fade on hover.
4. **Don't hide functionality** — the trend of ultra-minimal UIs where things only appear on hover is bad UX. Users shouldn't hunt for information.
5. **H1 formula** — what is it + who is it for + why they should care + CTA. All above the fold.
6. **No extravagant hover effects** — subtle is better. Our micro-interactions are intentional: button lift, arrow nudge, image tilt straighten.
7. **Bento boxes are overused** — if we ever revisit the benefits section layout, avoid pure bento. We currently use a dark-card grid which is acceptable.
8. **KISS** — the user should understand us in 3 seconds. Our H1 does this: "Game Demos and Ad Credits for Mobile Game Developers."

---

## Video Notes: "Every UI/UX Concept Explained in Under 10 Minutes" (Kole Jain)

1. **Images aid scanning** — the hero phone image and card background images serve this purpose. Keep them. Add alt text.
2. **Positioning + color = focus** — our primary blue draws the eye to CTAs. Don't dilute this by using the primary color for non-interactive elements.
3. **White space breathes** — our section padding (`clamp(3.5rem, 8vw, 6rem)`) is intentional. Don't compress sections.
4. **4-point grid** — our base unit is 8px (divisible by 4). All spacing follows this.
5. **One font** — Plus Jakarta Sans. Already implemented. Do not add a second font.
6. **Tight headers** — `letter-spacing: -0.03em`, `line-height: 1.1` on H1. Already in the CSS.
7. **Semantic color** — every color has a purpose (see DESIGN_SYSTEM.md). Don't add decorative color.
8. **Icons match font height** — our button icons are 16px to match the 1rem/0.875rem button text.
9. **Button sizing** — our primary buttons are roughly 2× height-to-padding ratio. Don't shrink them.
10. **4 button states** — default, hover, pressed, disabled. All implemented. Don't break them.
11. **3 input states** — default, focus, error. All implemented.
12. **Every interaction needs a response** — our forms give success/error feedback, buttons have hover/active states, the mobile nav animates.
13. **Micro-interactions** — arrow nudge, button lift, image tilt, timeline dot scale, scroll hint bounce. These are deliberate.
14. **Overlays for legibility** — timeline card images use a subtle left-to-right fade overlay for text contrast.

---

## Reddit Post Notes: SaaS Webpage Copy Mistakes
Source: [r/SaaS thread](https://www.reddit.com/r/SaaS/comments/18lzccd/comment/ke11rnc/)

Key takeaways applied to our site:
- Lead with the product, not the problem (we do this — H1 names the product category first)
- Don't bury the CTA — ours is above the fold and repeated in the footer
- Be specific about what "it" does — our H2 names both features (demos + credit marketplace)
- Social proof matters — consider adding a trust signal near the form (number of waitlist signups, a quote, logos) once we have real data

---

## Design Decisions Log

| Decision | Rationale |
|---|---|
| Blue color palette | Avoids the AI-slop purple. Blue also communicates trust and tech, fits the developer audience. |
| Plus Jakarta Sans | Clean, modern, readable at all weights. One of the recommended options from Kole Jain's video. |
| Sticky glass header | Keeps navigation accessible at all times without occupying visual weight |
| Horizontal scroll (mobile timeline) | More natural thumb interaction on mobile than vertical within a section |
| Radial gradient bg + grid overlay | Adds subtle depth and tech feel without being distracting |
| Phone image with tilt + hover straighten | Adds personality and makes the hero less static |
| Two waitlist forms (hero + footer) | Captures intent at two natural points: initial interest and after reading benefits |
| Dark bento cards on gradient bg | Creates contrast between section and page, visually separates benefits |
