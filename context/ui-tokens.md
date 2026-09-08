# UI Tokens

This file is the single visual foundation for the entire Tech4Bharat 2026 website. Every color, font, spacing value, radius, and effect used anywhere in the product — public pages, forms, and any conditional participant/admin interface — must trace back to a token defined here. No component should introduce a raw value that isn't represented in this system. This keeps the product visually coherent as it grows from an informational site into a full participant/admin platform, and gives an AI coding agent an unambiguous source of truth instead of a poster to reinterpret on every page.

---

## Design Direction

The poster communicates its energy through a single dramatic gradient moment — dark navy dissolving into a glowing saffron-red horizon, with a luminous map of India rising out of it. That's the right emotional register for a one-time promotional image seen for a few seconds. It is the wrong basis for a website someone will navigate for minutes at a time across a dozen pages, some of which (Rules, FAQ, forms) need to prioritize legibility over spectacle.

So the design system extracts the *feeling* the poster produces — ignition, ascent, warmth rising out of depth — rather than its literal gradient. The website's foundation is a confident, near-black indigo-navy canvas (not pure black — pure black reads as generic "dark mode SaaS," while a navy-tinted dark reads as intentional and matches the poster's base tone). Against that canvas, a single saturated **saffron-orange** functions as the one true accent — the "ignition" color — reserved for CTAs, live moments, key numbers, and anything that should draw the eye. A secondary **ember-red** accent exists for urgency and energy (live badges, in-progress states) without competing with saffron for attention. That's it: one dark canvas, one accent that means "act here," one accent that means "this is happening now." Everything else — success, warning, error, info — are separate, clearly distinct hues so they're never confused with the brand accent.

This is deliberately a *restrained* palette compared to the poster, because a real product needs restraint to feel premium rather than noisy. Gradients are not used as a base surface treatment anywhere — the only approved gradient is a single, subtle radial glow reserved for the hero section, described in Visual Effects. Everywhere else, hierarchy is built through layered flat surfaces, hairline borders, and typographic scale, the way premium technical products (developer tools, fintech dashboards) achieve density and confidence without decoration.

The Indian identity is carried by color *temperature* rather than literal motif: the warmth of saffron and marigold-orange against deep indigo is instantly readable as festival light, dawn skies, and diya glow without resorting to decorative borders, rangoli patterns, or tricolor stripes scattered through the UI — which would read as costume rather than identity, and would age badly. Scale and ambition are carried by typography: large, confident numerals for prize amounts and stats, and a geometric display face with real structural weight for headlines. Technology-forward character comes from restraint itself — hairline 1px borders, a single disciplined glow token used only for focus and "live" states, and a monospace face reserved for IDs/timestamps/codes, the way technical products signal precision.

The result should not read as "a hackathon poster turned into a website" or as "a purple AI SaaS template." It should read as a serious, premium event platform that happens to be unmistakably Indian and unmistakably technology-forward — because of restraint and warmth, not because of decoration.

---

## How to Use

The token system is implemented as CSS custom properties in `globals.css`, mapped into Tailwind via `tailwind.config.ts` so components consume them as ordinary Tailwind classes — never as raw hex values or inline styles.

**Tailwind mapping (excerpt from `tailwind.config.ts`):**
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        surface: {
          DEFAULT: 'hsl(var(--surface))',
          secondary: 'hsl(var(--surface-secondary))',
          tertiary: 'hsl(var(--surface-tertiary))',
          muted: 'hsl(var(--surface-muted))',
        },
        border: {
          DEFAULT: 'hsl(var(--border))',
          light: 'hsl(var(--border-light))',
          muted: 'hsl(var(--border-muted))',
          focus: 'hsl(var(--border-focus))',
        },
        text: {
          primary: 'hsl(var(--text-primary))',
          secondary: 'hsl(var(--text-secondary))',
          muted: 'hsl(var(--text-muted))',
          inverse: 'hsl(var(--text-inverse))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          hover: 'hsl(var(--primary-hover))',
          active: 'hsl(var(--primary-active))',
          light: 'hsl(var(--primary-light))',
          muted: 'hsl(var(--primary-muted))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ember: {
          DEFAULT: 'hsl(var(--ember))',
          hover: 'hsl(var(--ember-hover))',
          foreground: 'hsl(var(--ember-foreground))',
        },
        success: { DEFAULT: 'hsl(var(--success))', foreground: 'hsl(var(--success-foreground))', light: 'hsl(var(--success-light))' },
        warning: { DEFAULT: 'hsl(var(--warning))', foreground: 'hsl(var(--warning-foreground))', light: 'hsl(var(--warning-light))' },
        error:   { DEFAULT: 'hsl(var(--error))',   foreground: 'hsl(var(--error-foreground))',   light: 'hsl(var(--error-light))' },
        info:    { DEFAULT: 'hsl(var(--info))',    foreground: 'hsl(var(--info-foreground))',    light: 'hsl(var(--info-light))' },
      },
      borderRadius: {
        sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)', xl: 'var(--radius-xl)', full: 'var(--radius-full)',
      },
      fontFamily: {
        display: ['var(--font-display)'], body: ['var(--font-body)'], mono: ['var(--font-mono)'],
      },
    },
  },
}
export default config
```

**Correct usage:**
```tsx
<div className="bg-surface border border-border rounded-lg p-6">
  <h2 className="font-display text-text-primary">Grand Finale</h2>
  <p className="text-text-secondary">25–27 December 2026</p>
  <button className="bg-primary text-primary-foreground hover:bg-primary-hover rounded-md">
    Register
  </button>
</div>
```

**Incorrect usage — never do this:**
```tsx
<div style={{ backgroundColor: '#0F1420', border: '1px solid #2A3142' }}>
  <h2 style={{ color: '#F5F7FA' }}>Grand Finale</h2>
  <button style={{ backgroundColor: '#E8830E' }}>Register</button>
</div>
```

**How a component decides which token to use:**
- Backgrounds → a `surface-*` token, chosen by layering depth (see Surfaces below), never `background` directly inside a card.
- Any text → a `text-*` token, chosen by hierarchy (primary/secondary/muted), never a raw gray.
- Any border → a `border-*` token, chosen by emphasis; `border-focus` only appears on focus states.
- Anything meant to draw the eye or prompt action → `primary`; anything meant to signal "live/urgent" → `ember`. Never both on the same element.
- Status/feedback → the matching semantic token (`success`/`warning`/`error`/`info`), never `primary` or `ember` repurposed as a status color.
- Spacing, radius, and typography → the scales defined below, never an arbitrary Tailwind number like `p-[13px]`.

If a component needs a value that doesn't exist in this system, the correct action is to add it here first, not to hardcode it locally.

---

## globals.css — Complete Token Definition

```css
:root {
  /* ============ Typography ============ */
  --font-display: 'Sora', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;

  /* ============ Surfaces ============ */
  --background: 224 42% 6%;
  --surface: 224 38% 9%;
  --surface-secondary: 224 32% 13%;
  --surface-tertiary: 224 28% 17%;
  --surface-muted: 224 20% 11%;

  /* ============ Borders ============ */
  --border: 224 20% 20%;
  --border-light: 224 16% 26%;
  --border-muted: 224 14% 15%;
  --border-focus: 28 90% 58%;

  /* ============ Text ============ */
  --text-primary: 210 20% 98%;
  --text-secondary: 216 16% 74%;
  --text-muted: 216 12% 52%;
  --text-inverse: 224 42% 8%;

  /* ============ Brand / Accent ============ */
  --primary: 28 88% 54%;
  --primary-hover: 28 88% 47%;
  --primary-active: 28 86% 41%;
  --primary-light: 28 90% 82%;
  --primary-muted: 28 35% 20%;
  --primary-foreground: 224 42% 8%;

  --ember: 14 82% 56%;
  --ember-hover: 14 82% 49%;
  --ember-foreground: 210 20% 98%;

  /* ============ Semantic ============ */
  --success: 152 55% 45%;
  --success-foreground: 210 20% 98%;
  --success-light: 152 45% 16%;

  --warning: 45 93% 58%;
  --warning-foreground: 224 42% 8%;
  --warning-light: 45 70% 18%;

  --error: 356 72% 54%;
  --error-hover: 356 72% 47%;
  --error-active: 356 72% 41%;
  --error-foreground: 210 20% 98%;
  --error-light: 356 55% 18%;

  --info: 205 85% 58%;
  --info-foreground: 210 20% 98%;
  --info-light: 205 60% 18%;

  /* ============ Effects ============ */
  --glow-primary: 0 0 32px hsl(28 88% 54% / 0.35);
  --glow-ember: 0 0 24px hsl(14 82% 56% / 0.30);
  --focus-ring: 0 0 0 3px hsl(28 90% 58% / 0.45);
  --overlay: 224 60% 4% / 0.72;
  --shadow-elevation: 0 8px 24px hsl(224 60% 2% / 0.45);

  /* ============ Radius ============ */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1.25rem;
  --radius-full: 9999px;
}
```

---

## Color Usage Guide

### Page Layout
| Token | Use |
|---|---|
| `background` | Root page background, always |
| `surface` | First layer above background — page sections, nav bar |
| `surface-secondary` | Cards and panels sitting on top of `surface` |
| `surface-tertiary` | Nested elements inside cards (e.g. an inner stat block) |
| `surface-muted` | Disabled areas, skeleton loaders, placeholder blocks |
| `border` | Default separator between sections and around cards |
| `border-light` | Emphasis border — hovered card, selected item |
| `border-muted` | Very low-contrast separator (e.g. divider inside a dense table) |

### Typography
| Token | Use |
|---|---|
| `text-primary` | Headings, primary body copy, anything that must read first |
| `text-secondary` | Supporting copy, descriptions, nav labels |
| `text-muted` | Timestamps, helper text, disabled labels |
| `text-inverse` | Text placed on top of `primary`/`ember`/light-colored fills |

### Brand Accent
| Token | Use |
|---|---|
| `primary` | Primary CTA buttons, active nav item, key stat numbers, prize amounts, completed/active timeline milestones |
| `ember` | "Live now" / "registrations open" badges, countdown urgency, secondary emphasis that shouldn't compete with the primary CTA |

Only one of `primary` or `ember` should appear as a dominant color per screen region — using both at full saturation side by side recreates the poster's gradient collision and undermines the "one accent = one action" logic.

### Indian / Event Identity
National-scale identity is expressed through **color temperature and typographic confidence**, not decorative motifs. Do not add tricolor stripes, rangoli-pattern borders, or literal map/globe illustrations to UI chrome — those belong to the promotional poster, not the product. The warmth of `primary`/`ember` against the deep `background` navy is the entire expression of that identity; it should be felt in every CTA and every large number, not illustrated separately.

### Semantic States
| Token | Use |
|---|---|
| `success` | Confirmed registration, successful submission, completed step |
| `warning` | Pending/awaiting-confirmation states (e.g. "details pending organizer confirmation") — this is the correct token for the many `[CONFIGURABLE]` placeholders described in project-overview.md |
| `error` | Failed validation, failed submission, destructive action confirmation |
| `info` | Neutral announcements, non-urgent notices |

### Conditional Participant/Admin UI
Dashboard, team, submission, and admin interfaces use the exact same tokens as the public site — same `background`/`surface` layering, same `primary` for primary actions, same semantic tokens for state. They should feel denser and more functional (smaller type scale, tighter spacing — see Responsive/Spacing), but never visually foreign, so a participant never feels like they've left the "Tech4Bharat product" and landed in a generic admin tool. Admin interfaces may lean more heavily on `surface-tertiary` and table tokens for information density, but must not introduce a separate color palette.

**Accent colors must NOT be used for:** large background fills (no full-bleed `primary` sections outside the hero glow), body text color, table row backgrounds, or as a substitute for a semantic token (e.g. never use `ember` to mean "error").

---

## Typography

| Element | Font | Size | Weight | Line Height | Letter Spacing | Color Token |
|---|---|---|---|---|---|---|
| Hero display heading | `font-display` | 3.5rem / 4.5rem (mobile/desktop) | 600 | 1.05 | -0.02em | `text-primary` |
| Hero supporting text | `font-body` | 1.125rem | 400 | 1.6 | 0 | `text-secondary` |
| Page heading (h1) | `font-display` | 2.25rem | 600 | 1.15 | -0.01em | `text-primary` |
| Section heading (h2) | `font-display` | 1.5rem | 600 | 1.2 | -0.01em | `text-primary` |
| Subsection heading (h3) | `font-display` | 1.125rem | 600 | 1.3 | 0 | `text-primary` |
| Body | `font-body` | 1rem | 400 | 1.65 | 0 | `text-primary` |
| Secondary text | `font-body` | 0.9375rem | 400 | 1.55 | 0 | `text-secondary` |
| Labels (eyebrow/section labels) | `font-body` | 0.75rem | 600 | 1.3 | 0.08em, uppercase | `text-muted` |
| Navigation | `font-body` | 0.875rem | 500 | 1.4 | 0 | `text-secondary` (`primary` when active) |
| Buttons | `font-body` | 0.9375rem | 600 | 1.2 | 0 | `primary-foreground` / `text-primary` per variant |
| Timestamps | `font-mono` | 0.8125rem | 400 | 1.4 | 0 | `text-muted` |
| Stat / prize numbers | `font-display` | 2rem / 2.75rem (card/hero) | 700 | 1.1 | -0.01em | `primary` |
| Table headers | `font-body` | 0.75rem | 600 | 1.3 | 0.06em, uppercase | `text-muted` |
| Form labels | `font-body` | 0.875rem | 500 | 1.4 | 0 | `text-primary` |
| Form help text | `font-body` | 0.8125rem | 400 | 1.5 | 0 | `text-muted` |
| Error text | `font-body` | 0.8125rem | 500 | 1.4 | 0 | `error` |

Hero display heading is the one place the type scale is allowed to be genuinely large and expressive — everywhere else, hierarchy is built with weight and color, not extreme size jumps, so long-form pages (Rules, FAQ) stay calm and readable.

---

## Spacing

| Token | Value | Usage |
|---|---|---|
| `space-1` | 0.25rem (4px) | Icon-to-label gaps, tight inline spacing |
| `space-2` | 0.5rem (8px) | Badge padding, form label-to-input gap |
| `space-3` | 0.75rem (12px) | Compact card padding, button padding (vertical) |
| `space-4` | 1rem (16px) | Default card padding, form field spacing |
| `space-6` | 1.5rem (24px) | Card padding (comfortable), gaps between related components |
| `space-8` | 2rem (32px) | Gaps between distinct content blocks |
| `space-12` | 3rem (48px) | Spacing between major page sections (mobile) |
| `space-16` | 4rem (64px) | Spacing between major page sections (desktop) |
| `space-24` | 6rem (96px) | Hero section vertical padding (desktop) |

- **Page horizontal padding:** `space-4` (mobile) → `space-8` (desktop), applied via the layout container, never per-page
- **Section spacing:** `space-12` (mobile) / `space-16`–`space-24` (desktop) between top-level sections
- **Card padding:** `space-4` default, `space-6` for feature/prize cards
- **Content gaps:** `space-4` between related items in a list/grid, `space-8` between unrelated groups
- **Form spacing:** `space-4` between fields, `space-2` between a label and its input, `space-6` between the form and its submit action

---

## Layout Tokens

| Token | Value | Notes |
|---|---|---|
| `content-max-width` | 72rem (1152px) | Standard reading/content container (About, Rules, FAQ, forms) |
| `hero-max-width` | 90rem (1440px) | Wider container for hero and event-scale visual sections |
| `page-padding` | `space-4` → `space-8` | Responsive horizontal page padding, see Spacing |
| `header-height` | 4rem (64px) | Fixed nav height, mobile and desktop |
| `section-spacing` | `space-12` → `space-24` | See Spacing |
| `grid-gap` | `space-6` | Default gap for card grids (prizes, stats, FAQ) |
| `content-column-narrow` | 42rem (672px) | Long-form text columns (About, Rules body copy) for readable line length |
| `content-column-wide` | 60rem (960px) | Timeline, prize grid, table-heavy content |

Pages break out of `content-max-width` only for: the hero section (uses `hero-max-width` with full-bleed background), the Prizes section background band, and the closing CTA band — the same three "bookend" moments identified in site-structure.md. All body content within those sections still aligns to `content-max-width` internally so text never stretches edge-to-edge.

---

## Component Tokens

### Cards
- Background: `surface-secondary`
- Border: `border`, 1px
- Radius: `radius-lg`
- Padding: `space-6`
- Shadow: none by default; `shadow-elevation` only on modals/popovers, not static cards
- Hover (interactive cards only): border → `border-light`, background unchanged — no shadow pop, no scale transform

### Buttons
| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | `primary` | `primary-foreground` | none |
| Secondary | `surface-secondary` | `text-primary` | `border` |
| Ghost | transparent | `text-secondary` | none |
| Destructive | `error` | `error-foreground` | none |

- Hover: `primary` → `primary-hover`; `error` → `error-hover`; Secondary/Ghost → background `surface-tertiary`
- Active: `primary` → `primary-active`; `error` → `error-active`
- Disabled: 40% opacity, `cursor-not-allowed`, no hover state applied
- Focus: `focus-ring` applied as `box-shadow`, visible on keyboard focus (`:focus-visible`)

### Inputs
- Background: `surface`
- Border: `border`, 1px, radius `radius-md`
- Padding: `space-3` vertical, `space-4` horizontal
- Text: `text-primary`; Placeholder: `text-muted`
- Focus: border → `border-focus`, `focus-ring` box-shadow
- Error: border → `error`, helper text switches to `error` color token
- Disabled: background → `surface-muted`, text → `text-muted`, no focus state

### Badges
| Variant | Background | Text |
|---|---|---|
| Default | `surface-tertiary` | `text-secondary` |
| Success | `success-light` | `success` |
| Warning | `warning-light` | `warning` |
| Error | `error-light` | `error` |
| Informational | `info-light` | `info` |
| Live/Event (event-specific) | `primary-muted` | `primary` |

`radius-full`, `space-2` horizontal padding, uppercase label typography.

### Tables
- Header: `surface-secondary` background, table-header typography, `border-b` in `border`
- Row: `background` (or `surface` in a card context), `border-b` in `border-muted`
- Hover: row background → `surface-secondary`
- Selected: row background → `primary-muted`, left border accent in `primary`

### Timeline
- Milestone dot: `radius-full`, `border` outline
- Upcoming milestone: dot fill `surface-tertiary`, connecting line `border-muted`, label `text-muted`
- Active milestone: dot fill `primary`, `glow-primary` applied as box-shadow, label `text-primary`
- Completed milestone: dot fill `primary-muted` with `primary`-colored check icon, connecting line `primary` (solid), label `text-secondary`

### Prize Display
- Card background: `surface-secondary`, border `border-light`
- First place: elevated treatment — border color `primary`, prize number uses stat/prize typography in `primary`, subtle `glow-primary` on the card border only (not the whole card fill)
- Second/third place: standard card treatment, prize number in `text-primary` (not `primary`) to keep visual weight on first place
- Total prize pool: shown once, separately, using stat/prize typography at the larger (hero) size in `primary`

The distinction between first place and the rest is carried by *border and glow*, not by size or gradient fill — this keeps the section feeling important without turning three cards into three competing gradients.

### FAQ
- Question: `text-primary`, form-label-equivalent weight (500), full-width clickable row
- Answer: `text-secondary`, body typography, revealed on expand
- Expanded state: chevron rotates, question row background → `surface-secondary`
- Divider: `border-muted` between items, no divider needed once inside an expanded item

### Empty States
Used for content awaiting organizer confirmation (Challenges, Rules details, etc.) — must read as "intentional and coming soon," never as a broken page.
- Background: `surface-muted`, dashed `border-muted` outline, `radius-lg`
- Icon/illustration: simple, in `text-muted`
- Heading: "Details coming soon" pattern, `text-secondary`
- Body: brief explanation, `text-muted`
- Uses `warning`-toned badge (not `error`) if a status indicator is shown, since this is a pending state, not a failure

---

## Responsive Tokens

| Breakpoint | Width | Typography scale | Horizontal padding | Section spacing |
|---|---|---|---|---|
| Mobile | < 640px | Base scale (see Typography table's mobile values) | `space-4` | `space-12` |
| Tablet | 640–1024px | Base scale, hero display heading steps up to ~4rem | `space-6` | `space-16` |
| Desktop | 1024–1440px | Full scale (hero display heading at 4.5rem) | `space-8` | `space-16`–`space-24` |
| Large desktop | > 1440px | Full scale, content stays capped at `content-max-width`/`hero-max-width` — no further type scaling | `space-8` (content stays centered, padding doesn't grow further) | `space-24` |

- **Grid behavior:** card grids (prizes, stats, FAQ) are 1 column on mobile, 2 on tablet, 3 on desktop, using `grid-gap` throughout — no bespoke breakpoint-specific gap values.
- **Card behavior:** cards never change padding across breakpoints (`space-6` stays constant); only the grid column count changes.
- **Navigation behavior:** full horizontal nav on desktop/large desktop; collapses into a drawer/menu below 1024px using the same `surface`/`border` tokens, not a visually distinct mobile theme.

The system is one responsive transformation of the same tokens — mobile is not a simplified re-theme, it's the same surfaces, same accent logic, and the same type scale at its smaller defined step.

---

## Visual Effects

| Effect | Where allowed | Where forbidden | Why it exists |
|---|---|---|---|
| Radial ignition glow (the one approved gradient) | Hero section background only, using `primary`/`ember` at very low opacity fading into `background` | Any other section, any card, any button | Carries the poster's "ignition" feeling into the product without making gradients a base surface treatment site-wide |
| `glow-primary` / `glow-ember` (box-shadow glow) | Active timeline milestone, "live" badges, first-place prize card border, focus ring | Static cards, buttons at rest, body content, navigation | Signals "this is active/important right now" — loses meaning if applied decoratively |
| `shadow-elevation` | Modals, dropdowns, popovers — anything floating above the page | Static cards, page sections | Dark UIs communicate elevation through layered surface tokens; shadow is reserved for things that are literally floating |
| Subtle circuit/grid line texture | Hero background, beneath the ignition glow. Also permitted alone (no glow/aurora) as a page-level backdrop on `/timeline` and `/prizes`, per `context/decisions.md` DEC-006 | Anywhere text-heavy (Rules, FAQ, forms) | Reinforces the technology-forward feel at moments spectacle is appropriate, without adding visual noise to functional pages |
| Background imagery | Hero only | Any other page | Keeps the site feeling like a product, not a poster reproduced page after page |
| Decorative icons/illustrations | Not used as decoration, with one narrow, named exception: small functional icons naming a Timeline node's phase (registration/prelims/finale), always paired with the node's text label, never standing alone, per `context/decisions.md` DEC-006. DEC-007's bespoke `/prizes` wireframe gem was retired per DEC-009 — the podium it floated above was scrapped, and the replacement waveform/marker design doesn't include an equivalent element | Anywhere else in the product | The system relies on color, type, and restraint rather than illustrative decoration; the remaining exception is scoped to Timeline specifically, not a general license |

---

## Accessibility

- **Minimum text contrast:** `text-primary` on `background`/`surface`/`surface-secondary` must meet 4.5:1 (verified: `text-primary` at 210 20% 98% against `background` at 224 42% 6% exceeds 15:1). `text-secondary` and `text-muted` must meet at least 4.5:1 for body-sized use and 3:1 for large/label-sized use — check against the specific surface they sit on, not just `background`.
- **Focus visibility:** every interactive element must show `focus-ring` on `:focus-visible`; focus must never be suppressed via `outline: none` without the box-shadow replacement.
- **Semantic state distinguishability:** success/warning/error/info are never communicated by color alone — pair each with an icon (check, triangle, x, info-circle) and a text label.
- **Disabled states:** communicated by reduced opacity *and* `cursor-not-allowed` *and* `aria-disabled`, not color alone.
- **Text over imagery:** any text placed over the hero background image/glow sits on an `overlay` scrim (defined in Effects) to guarantee the same contrast ratios as text on `background`.
- **Color-blind considerations:** the `primary`/`ember` distinction and the `success`/`warning`/`error` distinction must remain legible in grayscale — verify via icon/shape/position differences, not hue alone, especially on the prize cards (first place is distinguished by border/glow/position, not color alone) and timeline (distinguished by icon fill state, not color alone).

---

## Invariants

1. Never use raw hex colors inside components — always a token.
2. Never introduce arbitrary colors outside the token system, including one-off "just for this page" accents.
3. Never use a new font without adding it to `--font-display` / `--font-body` / `--font-mono` first.
4. Never introduce a new radius value without adding it to the radius scale.
5. Never use gradients simply because they're visually fashionable — the only approved gradient is the hero ignition glow.
6. Never use glow effects as decoration — `glow-primary`/`glow-ember` are reserved for active/live/focus states only.
7. Never sacrifice text readability for visual styling, especially on Rules, FAQ, and form pages.
8. Never use color as the only indicator of state — pair with icon and/or text.
9. Public pages and participant/admin pages must share the same design language — same tokens, same accent logic, denser spacing only where functionally justified.
10. New visual patterns must be evaluated against existing tokens before anything new is added to this file.
11. If a component needs a value that doesn't exist here, update this token system first — never hardcode locally as a workaround.
12. Only the hero section may use background imagery or the ignition glow. The circuit texture is additionally permitted, alone, as a page-level backdrop on `/timeline` and `/prizes`, per `context/decisions.md` DEC-006.
13. `primary` and `ember` are never both used at full saturation as dominant colors in the same region of a screen.
