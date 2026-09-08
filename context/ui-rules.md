# UI Rules

This file defines how the tokens in `ui-tokens.md` are composed into actual interfaces — layout, hierarchy, component behavior, and page-level patterns. `ui-tokens.md` is the source of truth for *values*; this file is the source of truth for *composition*. No new colors, fonts, spacing values, or effects are introduced here — anything missing gets added to `ui-tokens.md` first, not improvised here.

---

## Design Principles

1. **The dark indigo-navy canvas is the default everywhere** — public pages, forms, and any future participant/admin surface. There is no light-mode fallback and no "lighter" variant for functional pages.
2. **Saffron (`primary`) marks exactly one action per view.** If a screen has a primary CTA, nothing else on that screen competes with it in saturation.
3. **Ember marks "happening now,"** never a default UI color. If ember appears somewhere without a live/urgent meaning attached, that's a misuse.
4. **Semantic colors stay semantic.** `success`/`warning`/`error`/`info` are never borrowed for brand emphasis, and `primary`/`ember` are never borrowed to mean a status.
5. **Hierarchy comes from scale, weight, spacing, and surface layering — not from decoration.** A more important element gets more space and a heavier weight before it gets a brighter color.
6. **Indian/national identity is expressed through warmth and typographic confidence, never literal motifs.** No tricolor, no rangoli, no map/globe illustration in interface chrome.
7. **Gradients and glow are rare and load-bearing, not atmospheric.** They exist at exactly three points on the site (hero, prizes, closing CTA) and nowhere else.
8. **Functional and long-form pages (Rules, FAQ, forms, tables) prioritize legibility over spectacle.** Spectacle is spent deliberately, not spread evenly.
9. **Density increases for participant/admin interfaces, but the visual language never forks.** Tighter spacing and denser tables are allowed; a different color system or component style is not.
10. **Every visual decision traces to a named token.** If a rule below can't be expressed in terms of an existing `ui-tokens.md` value, it isn't implemented until that token exists.

---

## Font

| Font | Token | Used for |
|---|---|---|
| Sora | `font-display` | All headings (hero through subsection), stat/prize numbers, the nav wordmark |
| Inter | `font-body` | Body copy, nav links, buttons, form labels/inputs, table content, badges |
| JetBrains Mono | `font-mono` | Timestamps, technical identifiers (registration/team/submission IDs once those exist), anything meant to read as a precise system-generated value |

**Configuration:** loaded via `next/font/google` in the root layout, exposed as `--font-display` / `--font-body` / `--font-mono` (already defined in `ui-tokens.md`), consumed only through the `font-display`/`font-body`/`font-mono` Tailwind utilities — never a raw `font-family` in a component.

**Heading usage:** `font-display`, weight 600, always `text-primary` — never a lighter weight for a heading, even a subsection heading.
**Body usage:** `font-body`, weight 400, `text-primary` for primary reading content, `text-secondary` for supporting copy.
**Numerical/stat usage:** `font-display`, weight 700, `primary` color — this is the one place display font at heavy weight is paired with the accent color; it's reserved for numbers that represent scale or achievement (prize amounts, stat counts), not ordinary data.
**Technical identifiers/timestamps:** `font-mono`, regular weight, `text-muted` — deliberately quiet, never used at heading size.

Do not introduce a fourth font for any reason (icons, "fun" numerals, etc.) without adding it to `ui-tokens.md` first.

---

## Layout

- **Page container:** every route renders inside a root wrapper using `background`; full-bleed sections (hero, prizes, closing CTA) fill this wrapper edge to edge, everything else sits inside a centered container.
- **Content max width:** `content-max-width` (72rem) — the default container for all non-hero page content.
- **Hero max width:** `hero-max-width` (90rem) — used only by the hero's outer background band and the Prizes/closing-CTA bookend bands.
- **Horizontal padding:** `page-padding` — `space-4` on mobile scaling to `space-8` on desktop, applied once at the container level, never re-implemented per page.
- **Section spacing:** `section-spacing` — `space-12` between sections on mobile, up to `space-16`–`space-24` on desktop, applied as vertical padding on each section, not as margin hacks between adjacent sections.
- **Narrow content column:** `content-column-narrow` (42rem) — long-form reading content: About body copy, Rules body copy, FAQ answers, form containers.
- **Wide content column:** `content-column-wide` (60rem) — timeline, prize grid, table-heavy content.
- **Grid gaps:** `grid-gap` (`space-6`) for every card grid (prizes, stats, FAQ groups) — no per-page custom gap values.
- **Vertical rhythm:** every section's internal spacing (heading → supporting text → content) uses the `space-*` scale from `ui-tokens.md`; never an arbitrary pixel value between two stacked elements.
- **Full-width sections:** reserved for the hero, Prizes section, and closing CTA — the same three "bookend" sections defined in `site-structure.md`. Every other section is a standard centered container on `background`.
- **Centered content:** all page headers, form containers, and narrow-column reading content are horizontally centered within their container; card grids align left within the container but are internally centered as a grid.

---

## Navigation

**Desktop navigation**
- Height: `header-height` (4rem), fixed/sticky to the top of the viewport.
- Background: `surface` with a `border` bottom hairline — not `background`, so the nav visually sits one layer above the page.
- Nav item spacing: `space-6` gap between items.
- Active item: `primary` text color, no background fill, `aria-current="page"` set.
- Inactive item: `text-secondary`.
- Hover: `text-primary` (no background change, no underline animation — a simple color shift).
- Focus: `focus-ring` visible on keyboard focus, same as any interactive element.
- Primary CTA (e.g. "Register"): rendered as the standard Primary button, positioned at the end of the nav — this is the one place `primary` fill legitimately appears in the nav bar.

**Mobile navigation**
- Below the 1024px breakpoint (per `ui-tokens.md` Responsive Tokens), the horizontal nav collapses into a menu trigger; nav items move into a full-height drawer.
- Drawer background: `surface`, drawer scrim behind it: `overlay` token.
- Items stacked vertically, `space-4` gap, larger tap targets than desktop (minimum 44px height).
- Primary CTA remains visually distinct (Primary button) at the bottom or top of the drawer list, not buried among plain links.

**Responsive transition:** a simple fade/slide of the drawer panel (see Motion) — no elaborate animation, no bounce.

**Public vs. conditional nav:** the public nav (Home/About/Challenges/Timeline/Prizes/Rules/FAQ/Register) is the only nav that exists today. A separate participant nav and a separate admin nav are structurally anticipated (per `architecture.md`'s `(participant)`/`(admin)` route groups) but are not built and must not be designed with specific item labels beyond what's already named in `architecture.md` (Dashboard, Team, Submission) until those features are confirmed per `tbd.md`. Public and conditional nav components must never share a layout file, even though they'll share the same visual tokens.

---

## Hero

The hero is the site's one deliberate "wow" moment — everything below is written to make sure it stays exactly that: one moment, not a template repeated per page.

- **Height/padding:** full-bleed section, vertical padding `space-16` (mobile) → `space-24` (desktop).
- **Max content width:** outer band uses `hero-max-width`; the text/CTA content itself sits in a column no wider than `content-column-wide`, not edge to edge.
- **Alignment:** left-aligned content block, not centered — a deliberate departure from the poster's symmetric, centered composition, so the hero reads as a product screen rather than a poster reproduction.
- **Eyebrow:** label typography, `text-muted`, uppercase — states the confirmed positioning line only (e.g. the event's confirmed positioning from `project-overview.md`), never invented marketing copy.
- **Headline:** hero display heading typography, `text-primary` (not `primary`/saffron — the headline stays legible white-on-navy; saffron is reserved for the CTA and stat numbers so it retains meaning).
- **Supporting text:** hero supporting text typography, `text-secondary`, 1–2 sentences, using only confirmed facts (theme, format, dates) from `project-overview.md`.
- **Primary CTA:** Primary button, leads to the registration entry point as it currently exists — the button's existence doesn't imply any particular registration workflow; the page it leads to is governed by whatever `/register` actually contains per current scope.
- **Secondary CTA:** Ghost or Secondary button, non-committal action (e.g. jump to the theme/about section) — never a second competing saturated action.
- **Background:** `background` token as the base fill.
- **Ignition glow:** the one approved radial gradient (`glow-primary`/`glow-ember`), positioned low in the section, fading into `background` — atmosphere, not a literal sunrise-over-India illustration.
- **Circuit/grid texture:** very low-opacity linear grid pattern beneath the glow, present but not competing with text contrast.
- **Imagery:** none required — no globe, no India-outline illustration, no photographic imagery. The glow and texture alone carry the "technology-forward, national-scale" feeling.
- **Overlay:** if any imagery is ever added, the `overlay` token sits between the image and the text to guarantee contrast — not optional.
- **Content positioning:** vertically centered within the hero band, headline → supporting text → CTAs, top to bottom.
- **Mobile behavior:** headline steps down to the mobile display-heading size; glow and texture remain present but scaled down; CTAs stack full-width.

**Hard limits:** the ignition-glow + circuit-texture combination, hero-display-heading typography, and this composition pattern belong exclusively to the homepage hero. The Prizes and closing-CTA sections may reuse `glow-primary`/`glow-ember` (per `ui-tokens.md`), but never the circuit texture and never hero-display-heading type — they are bookends, not second heroes.

---

## Page Headers

Standard pattern for About, Challenges, Timeline, Rules, FAQ, and Registration:

- **Eyebrow:** label typography, `text-muted`, uppercase — the page's section name only (e.g. "Rules & Eligibility"), not a marketing line.
- **Heading:** page heading typography (not hero-display), `text-primary`.
- **Supporting text:** one to two sentences, `text-secondary`, body-secondary typography — plain description of what the page contains, sourced from confirmed content only.
- **Alignment:** left-aligned, flush with the page's content container — never centered like the hero.
- **Width:** constrained to `content-column-narrow` for the heading block, even on pages whose body content later uses `content-column-wide`.
- **Spacing:** `space-8` between the header block and the first content section; `space-12`–`space-16` (section spacing) above the header from the page top.
- **Background:** flat `background`/`surface` — no gradient, no glow, no full-bleed band.

This pattern is intentionally quiet. If a page header starts to accumulate a CTA, a stat strip, or a background treatment, that's a sign it's drifting toward hero composition — which is explicitly reserved for the homepage, with one named exception: **`/prizes`** uses a bespoke two-column hero-style header (eyebrow, heading, supporting text, and a "Register Now" CTA on the left; the isometric prize podium on the right) instead of this pattern, per `context/decisions.md` DEC-008 — built to an explicit, direct "recreate this exactly" reference rather than a general license for other pages to add CTAs.

---

## Cards

| Type | Surface | Border | Radius | Padding | Hover | Accent |
|---|---|---|---|---|---|---|
| Standard | `surface-secondary` | `border` | `radius-lg` | `space-6` | none | none |
| Interactive (clickable) | `surface-secondary` | `border` | `radius-lg` | `space-6` | border → `border-light` | none |
| Featured (e.g. 1st-place prize) | `surface-secondary` | `primary` | `radius-lg` | `space-6` | n/a (not typically hovered) | `glow-primary` on the border only |
| Informational | `surface-secondary` | `border` | `radius-lg` | `space-4` (compact) | none | none |
| Status (pending/success/etc.) | matching semantic `-light` token | matching semantic base token | `radius-lg` | `space-4` | none | icon in the semantic base color |

Ordinary cards never gain a gradient fill, a decorative glow, or a scale/transform on hover — the only permitted hover change is the border-color shift, and the only permitted glow is the Featured variant's border glow, used exclusively where a rule elsewhere (Prize Display) explicitly calls for it.

---

## Buttons

### Primary
- Background: `primary` · Text: `primary-foreground` · Border: none · Radius: `radius-md`
- Padding: `space-3` vertical, `space-6` horizontal · Typography: buttons row (font-body, 600, 0.9375rem)
- Hover: `primary-hover` · Active: `primary-active` · Disabled: 40% opacity, `cursor-not-allowed`, hover disabled
- Focus: `focus-ring` box-shadow · Icon positioning: leading or trailing, `space-2` gap, icon sized to match text line-height
- Loading: label replaced by a static (non-bouncing) spinner in `primary-foreground`, button retains its resting width to avoid layout shift

### Secondary
- Background: `surface-secondary` · Text: `text-primary` · Border: `border`, 1px · Radius: `radius-md`
- Same padding/typography/focus/loading pattern as Primary
- Hover: background → `surface-tertiary` · Active: border → `border-light` · Disabled: 40% opacity

### Ghost
- Background: transparent · Text: `text-secondary` · Border: none · Radius: `radius-md`
- Same padding/typography as above
- Hover: background → `surface-secondary`, text → `text-primary` · Active: background → `surface-tertiary` · Disabled: 40% opacity

### Destructive
- Background: `error` · Text: `error-foreground` · Border: none · Radius: `radius-md`
- Same padding/typography as above
- Hover: darken by one step (same relationship as `primary`→`primary-hover`) · Active: darken further · Disabled: 40% opacity
- Reserved for genuinely destructive actions (e.g. deleting a draft submission, once that feature exists) — never used for a routine "cancel."

No fifth variant is introduced without a concrete product need — a "tertiary" or "link" button is not created speculatively.

---

## Badges

| Variant | Background | Text | Meaning |
|---|---|---|---|
| Default | `surface-tertiary` | `text-secondary` | Neutral label, no state implied |
| Success | `success-light` | `success` | Confirmed/completed |
| Warning | `warning-light` | `warning` | **Pending / awaiting organizer confirmation** |
| Error | `error-light` | `error` | Actual failure or problem |
| Informational | `info-light` | `info` | Neutral notice |
| Live/Event | `primary-muted` | `primary` | Registration open, event in progress — genuine live/urgent state |

This mapping is not interchangeable: `warning` never stands in for `error`, `primary`/Live-Event badges never stand in for a genuine urgency signal that should be `ember`-toned in context (e.g. a countdown), and `ember` itself is used directly (not as a badge variant) for in-context urgency like countdown timers rather than as a badge color.

---

## Typography Hierarchy

Hierarchy is achieved primarily through **font weight, color, and spacing** — the type scale itself has relatively few discrete steps (see `ui-tokens.md`'s Typography table for exact sizes). A subsection heading is not "a slightly smaller h2" achieved by nudging a font-size number; it's the same `font-display` family at a defined step down, paired with tighter surrounding spacing.

| Element | Font | Weight | Color | How it earns its place in the hierarchy |
|---|---|---|---|---|
| Hero heading | `font-display` | 600 | `text-primary` | Largest size step, used once per site |
| Page heading | `font-display` | 600 | `text-primary` | Second size step, generous space above/below |
| Section heading | `font-display` | 600 | `text-primary` | Third size step, tighter spacing than page heading |
| Subsection heading | `font-display` | 600 | `text-primary` | Smallest display step, sits close to its content |
| Body | `font-body` | 400 | `text-primary` | Baseline — everything else is judged relative to this |
| Secondary text | `font-body` | 400 | `text-secondary` | Same size as body, color does the demoting |
| Muted text | `font-body` | 400 | `text-muted` | Same size as secondary, color demotes further |
| Labels | `font-body` | 600 | `text-muted` | Small size + uppercase + letter-spacing, not color alone |
| Navigation | `font-body` | 500 | `text-secondary` (`primary` active) | Weight + active-state color |
| Timestamps | `font-mono` | 400 | `text-muted` | Font-family switch itself signals "system value" |
| Prize/stat numbers | `font-display` | 700 | `primary` | The one legitimate pairing of heavy display weight + accent color |
| Table headers | `font-body` | 600 | `text-muted` | Small, uppercase, letter-spaced — quiet but structured |
| Form labels | `font-body` | 500 | `text-primary` | Medium weight, full-strength color — must be easy to scan |
| Helper text | `font-body` | 400 | `text-muted` | Smallest body step |
| Error text | `font-body` | 500 | `error` | Weight + semantic color, never size alone |

All exact size/line-height/letter-spacing values are defined once in `ui-tokens.md`'s Typography table — this section governs *when* to reach for which row, not the numbers themselves.

---

## Forms

This section defines the visual shell of any form. **Which fields exist is a product decision governed by `project-overview.md`/`tbd.md`, not by this file** — registration fields specifically are not defined here because eligibility and the registration workflow are unconfirmed.

- **Form container:** `surface-secondary`, `radius-lg`, `space-6` padding, width capped at `content-column-narrow`.
- **Field grouping:** vertical stack, `space-4` gap between fields.
- **Labels:** form-label typography, positioned above the input with `space-2` gap.
- **Required indicators:** a small asterisk in `text-secondary` directly after the label text (not semantic-colored — a required marker is not an error state).
- **Inputs:** `surface` background, `border` (1px), `radius-md`, `space-3`/`space-4` padding, `text-primary` value text, `text-muted` placeholder.
- **Textareas:** same visual shell as inputs, vertical resize only.
- **Selects:** same shell as inputs, with a chevron icon in `text-muted`.
- **Checkboxes/radio buttons:** unchecked = `surface` fill + `border`; checked = `primary` fill with the check/dot rendered in `primary-foreground`.
- **Helper text:** form-help-text typography, `text-muted`, directly below the field.
- **Validation errors:** replaces helper text with error typography in `error`; the field's border also switches to `error`.
- **Disabled states:** `surface-muted` background, `text-muted` value text, no focus ring available.
- **Focus states:** border → `border-focus`, `focus-ring` box-shadow — identical pattern to buttons/nav.
- **Submit buttons:** Primary button, full-width on mobile, inline-width on desktop.
- **Loading states:** same spinner pattern as the Buttons section — never a separate full-page loading treatment for a simple form submit.
- **Success states:** a `success`/`success-light` inline banner above or below the form with a check icon and a generic confirmation message — the message stays generic ("submitted") rather than describing a specific next step, since post-submission workflow (confirmation email, next steps) is not yet confirmed.

---

## Tables

For future participant/admin interfaces.

- **Header:** `surface-secondary` background, table-header typography, `border` bottom.
- **Rows:** `background` (or `surface` inside a card), `border-muted` bottom between rows — no zebra striping, to stay restrained.
- **Hover:** row background → `surface-secondary`.
- **Selected:** row background → `primary-muted`, left border accent in `primary`.
- **Typography:** body/secondary size for cell content; numeric/ID columns may use `font-mono` and right-align.
- **Responsive behavior:** tables with five or fewer columns (typical participant-facing tables) collapse into stacked label:value "mini-card" rows below the tablet breakpoint. Dense, many-column tables (typical of admin) instead scroll horizontally with a sticky header and sticky first column, rather than stacking.
- **Mobile overflow:** when horizontal scroll is used, a visible scroll affordance (subtle edge fade or scrollbar) is required — a table must never silently clip content with no indication more columns exist.

---

## Timeline

- **Milestone dot:** `radius-full`, `border` outline by default.
- **Upcoming milestone:** dot fill `surface-tertiary`, connecting line `border-muted`, label `text-muted`.
- **Active milestone:** dot fill `primary`, `glow-primary` applied as a box-shadow, label `text-primary`. A live-pulse ring is permitted specifically here, per `context/decisions.md` DEC-006 — CSS-only, gated by `motion-reduce:`. No other milestone state pulses.
- **Completed milestone:** dot fill `primary-muted` with a check icon in `primary`, connecting line solid `primary`, label `text-secondary`.
- **Status is never color-only:** completed uses a check icon, active uses the glow plus current styling, upcoming uses neither — distinguishable in grayscale.
- **Mobile layout:** vertical timeline, dot-and-line on the left, content to the right.
- **Desktop layout:** horizontal timeline is acceptable given the current small number of confirmed milestones (registration opens, prelims, grand finale).
- **Unconfirmed dates:** the timeline renders only the milestones and dates confirmed in `project-overview.md` (registration opens 7 Sept 2026; event 25–27 Dec 2026). Any additional milestone whose date isn't confirmed (e.g. registration close, submission deadline) renders as a milestone node with a `warning` badge reading "Date to be announced" — never a fabricated date, and never simply omitted in a way that makes the timeline look incomplete/broken.

---

## Prize Display

- **Total prize pool:** shown once, using the largest stat/prize-number treatment (`primary`, heavy weight), positioned above or beside the three individual prize cards — not repeated per card.
- **First place:** the Featured card treatment — `primary` border, `glow-primary` on the border, prize number in `primary` at the full stat-number size. Given visual priority in layout order (first in reading order / center position in the grid).
- **Second/third place:** Standard card treatment — `border` (not `primary`), no glow, prize number in `text-primary` (not `primary`) — deliberately one visual step down from first place.
- **Prize cards:** no gradient fills on any of the three cards — the emphasis hierarchy is carried entirely by border color, glow, and number color, not by background treatment.
- **Supporting information:** only confirmed facts (the three amounts and the total) are displayed. No claims about additional/track-specific prizes, judging criteria, or distribution process are made in this section, since those are unconfirmed per `tbd.md`. If additional confirmed prize tiers are added later, they follow the same Standard-card, non-glowing treatment as 2nd/3rd place — first place remains the only card with the Featured treatment.

---

## FAQ

- **Question row:** full-width clickable row, form-label weight (500), `text-primary`.
- **Answer:** revealed on expand, body/secondary typography, `text-secondary`.
- **Divider:** `border-muted` between collapsed items; no internal divider needed once an item is expanded.
- **Expanded state:** question row background shifts to `surface-secondary`; chevron rotates 180°.
- **Hover:** question row background → `surface-secondary` (same as expanded, so hovering previews the expanded feel).
- **Focus:** `focus-ring` visible on the question row when reached via keyboard.
- **Chevron:** `text-muted`, rotates via a short transition (see Motion).
- **Spacing:** `space-4` vertical padding per question row, consistent regardless of expanded state (answer content adds height, not padding change).
- **Mobile behavior:** identical pattern, full-width rows, no layout change beyond the container's responsive padding.

---

## Pending / Unconfirmed Content

Applies to challenges, problem statements, eligibility, rules details, deadlines, venue specifics, team requirements, and submission requirements — anything `tbd.md` lists as Not Confirmed.

**Standard treatment:** a `warning`-toned badge ("Pending confirmation") paired with a short, neutral heading ("Details coming soon") and one plain sentence of context (e.g. "Challenge tracks will be published once confirmed by the organizing committee"). This sits inside the Empty-State card pattern below (dashed `border-muted`, `surface-muted` background) — never a bare blank section, and never `error`.

**What this must communicate:** the information is intentionally not finalized yet — a normal, expected state for a hackathon whose full requirements aren't locked. It must not read as a broken page, a missing feature, or a loading failure.

**What this must never do:** invent illustrative example content (a sample problem statement, a sample rule, an example team-size number) to "fill" the space. A pending section stays visibly pending, even if that means it's visually quieter than a fully populated section.

**Distinguish clearly between:**
- **Genuinely empty data** — e.g. no announcements have been posted yet. Neutral empty state, no `warning` badge (this isn't pending anything, it's just currently empty).
- **Unpublished data** — content exists in the database but `published = false`. To a visitor, this looks identical to "genuinely empty." To an admin, it shows with a `warning`-toned "Draft" badge so they know it exists but isn't public yet.
- **Pending organizer confirmation** — the case above: content that doesn't exist yet because a decision hasn't been made. Uses the full Pending/Unconfirmed pattern.
- **Unavailable functionality** — a feature (dashboard, team, submission) that hasn't been built yet because it's conditional per `project-overview.md`. This is not a content state at all; the route simply shouldn't exist or should redirect, not render an empty/pending message.

---

## Empty States

Four distinct patterns — never one generic "nothing here" component for all of them.

1. **No data exists** (e.g. no announcements posted yet): centered icon + `text-muted` message inside a plain `surface-muted` card with a solid `border-muted` — calm and unremarkable, communicates "normal, just nothing yet."
2. **Data exists but is unpublished:** visitors see pattern 1 (indistinguishable from "no data"). Admins/organizers see the item rendered normally but with a `warning`-toned "Draft" badge attached — the content is visible to the people who need to know it exists.
3. **Pending organizer confirmation:** the Pending/Unconfirmed Content pattern above — dashed `border-muted`, `warning` badge, "Details coming soon" heading, one sentence of context.
4. **A participant has no records yet** (e.g. no team formed, no submission started — once these features exist): action-oriented — icon + message + a Primary button prompting the relevant next step (e.g. "Create or join a team"). This pattern only applies once the corresponding conditional feature is confirmed and built; it does not currently exist anywhere in the product.

---

## Responsive Behavior

| | Mobile (<640px) | Tablet (640–1024px) | Desktop (1024–1440px) | Large desktop (>1440px) |
|---|---|---|---|---|
| Navigation | Drawer | Drawer | Full horizontal nav | Full horizontal nav |
| Grids | 1 column | 2 columns | 3 columns | 3 columns, content stays capped |
| Cards | Constant padding, full-width | Constant padding | Constant padding | Constant padding |
| Hero | Smallest display-heading step, `space-12` vertical padding | Mid step | Full step, `space-24` padding | Full step, capped width |
| Typography | Base scale | Base scale, hero steps up | Full scale | Full scale, no further scaling |
| Forms | Single column, full-width fields | Single column | Single column, capped at `content-column-narrow` | Same |
| Tables | Stacked cards (≤5 cols) or horizontal scroll (dense) | Same rule | Full table | Full table |
| Timeline | Vertical | Vertical | Horizontal (given current 3 milestones) | Horizontal |
| Spacing | `space-12` sections, `space-4` padding | `space-16`, `space-6` padding | `space-16`–`space-24`, `space-8` padding | Same as desktop |
| Content widths | Fluid to viewport minus padding | Fluid, capped by `content-max-width` | Capped by `content-max-width`/`hero-max-width` | Same caps, extra space stays empty on either side |

Mobile is the same design system at its smaller defined step — not a simplified re-theme. No component changes color logic, border treatment, or accent usage between breakpoints; only size, column count, and navigation pattern change.

---

## Accessibility

- **Keyboard navigation:** every interactive element (nav items, buttons, form fields, FAQ rows, table sort controls if any) reachable via Tab in visual order.
- **Focus:** `:focus-visible` only, always rendered with `focus-ring`; `outline: none` is never applied without this replacement.
- **Contrast:** verified against the specific surface a text token sits on, per `ui-tokens.md`'s Accessibility section — not assumed from `background` alone.
- **Semantic HTML:** real `<button>`, `<nav>`, `<table>`, `<form>` elements; one `<h1>` per page; heading levels used in order, not chosen for visual size.
- **Labels:** every input has a programmatically associated `<label>` — placeholder text is never a substitute for a label.
- **Form errors:** associated to their field via `aria-describedby`; a form-level error summary (if used) gets `role="alert"`.
- **ARIA attributes:** `aria-expanded` on FAQ triggers, `aria-current="page"` on the active nav item, `aria-live="polite"` around async status changes (e.g. form submit success).
- **State communication:** every status (badge, timeline milestone, form validation) pairs color with an icon and/or text label — never color alone.
- **Reduced motion:** all transitions respect `prefers-reduced-motion`; the hero entrance animation and any non-essential transition are disabled (snap to end-state instead) when set.
- **Text over imagery:** any text over the hero glow/texture sits on the `overlay` token to preserve contrast.
- **Color-blind users:** the `primary`/`ember` and `success`/`warning`/`error` distinctions remain legible without color — verified via icon, border, and position differences (e.g. 1st-place card differs by border/glow/layout position, not hue alone).

---

## Motion

**Philosophy:** motion reinforces hierarchy and interaction feedback; it never exists to fill visual space or add "energy" on its own.

**Allowed:**
- Micro-interactions on buttons/links (hover/active color transitions, ~150ms, standard ease)
- FAQ expand/collapse (~200ms height/opacity transition)
- Mobile nav drawer open/close (~200ms slide/fade)
- Timeline milestone state changes on load (a one-time transition into the completed/active state, not a repeating one)
- A single, subtle hero entrance (fade/slide-up of hero content on initial page load, one time only)

**Forbidden:**
- Parallax scrolling effects
- Particle effects
- Floating/bobbing decorative objects
- Continuous or looping background animation (including an animated/shimmering gradient)
- Any motion added purely because a section "feels empty"

All allowed transitions are short (150–250ms) with standard ease curves — no bounce or elastic easing anywhere, which keeps the product feeling credible and premium rather than playful.

---

## Visual Effects

| Effect | Purpose | Where it may appear |
|---|---|---|
| Hero ignition glow | Sets the hero's atmosphere, the site's one spectacle moment | Hero only (Prizes/closing-CTA may reuse per `ui-tokens.md`) |
| Ember glow | Signals live/urgent state | "Live now" badges, active countdown elements only |
| Focus ring | Accessibility — visible keyboard focus | Every interactive element, universally |
| Elevation shadow | Signals something is floating above the page | Modals, dropdowns, popovers only — never static cards |
| Circuit/grid texture | Reinforces technology-forward feel at the one spectacle moment | Hero background only, beneath the glow, low opacity, never behind unshielded text |
| Background imagery | Not currently required | Hero only, if ever introduced, must sit under an `overlay` |
| Overlay | Guarantees text contrast over any glow/imagery | Wherever text sits on top of the hero background |

No new gradient or glow is introduced anywhere in the product without first being added to `ui-tokens.md`'s Effects table.

---

## Do Nots

- Never use raw hex colors.
- Never use arbitrary Tailwind colors (e.g. `bg-orange-500`).
- Never introduce unapproved gradients.
- Never use glow as decoration.
- Never use tricolor stripes as UI chrome.
- Never use rangoli or other decorative "Indian-themed" motifs as UI chrome.
- Never turn every page into a hero.
- Never use `primary` and `ember` as competing dominant colors in the same region.
- Never use `warning` to represent an error.
- Never fabricate TBD content — no sample problem statements, sample rules, or invented numbers.
- Never invent registration fields.
- Never imply unconfirmed hackathon rules (dates beyond the two confirmed, venue, team size, eligibility, submission format).
- Never make functional pages (Rules, FAQ, forms, tables) visually noisy.
- Never create a separate visual language for dashboards/admin.
- Never sacrifice readability for a visual effect.
- Never communicate state through color alone.
- Never introduce a new visual token locally — update `ui-tokens.md` first.
- Never use continuous or looping animation anywhere on the site.
- Never use bounce/elastic easing.
- Never display an unconfirmed venue name as if it were final, including the poster's "Palace Grounds" reference.
- Never let participant/admin surfaces borrow the hero-only ignition glow or circuit texture.
- Never use lorem-ipsum-style filler copy for pending content — use the defined Pending/Unconfirmed pattern instead.

---

## Invariants

1. Every color used in a component resolves to a CSS variable defined in `ui-tokens.md` — no raw hex/rgb anywhere in component code.
2. The homepage hero is the only place the ignition-glow + circuit-texture combination and hero-display-heading typography appear together; a future closing-CTA band may reuse glow tokens alone, never the texture or hero typography. The circuit/grid texture (not the glow) is additionally permitted on `/timeline` and `/prizes` as page-level backdrops, per `context/decisions.md` DEC-006 — those two pages still never use the ignition glow, aurora, or hero-display-heading typography.
3. No page other than the homepage uses hero-display-heading typography for its top heading.
4. Every interactive element has a visible `:focus-visible` state using `border-focus`/`focus-ring`.
5. Every badge/status indicator pairs color with an icon and/or text label, verifiable by inspecting the markup.
6. No component sets `outline: none` without a `focus-ring` replacement.
7. No animation in the codebase runs longer than 250ms or loops indefinitely.
8. No hackathon detail marked "Not Confirmed" in `tbd.md` appears in rendered UI as if it were confirmed.
9. Public-route components and any participant/admin-route components import from the same `components/ui` primitives — there is no forked component library.
10. Every form input has a programmatically associated `<label>`.
11. Card and table components never exceed the padding/radius/border values defined in `ui-tokens.md`'s Component Tokens.
12. Second- and third-place prize cards never use `glow-primary`, `glow-ember`, or a `primary`-colored border — only the first-place card may.
