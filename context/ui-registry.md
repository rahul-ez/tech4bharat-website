# UI Registry

This file is the catalogue of reusable UI building blocks for the Tech4Bharat 2026 website. It does not define visual values — that's `ui-tokens.md`. It does not define how those values are composed — that's `ui-rules.md`. It records *what reusable components and patterns exist, what they're for, where they're used, and what status they're in*, so a coding agent reuses an existing component before building a near-duplicate, and a developer can tell at a glance whether a new component is actually justified.

---

## Registry Rules

- Reuse an existing component before creating a new one.
- Do not create visually identical components under different names.
- A new component must have a clear, statable reuse boundary — not just "it looked convenient here."
- Components must use existing design tokens (`ui-tokens.md`) — no local values.
- Components must follow `ui-rules.md`'s composition rules.
- Components must preserve the accessibility requirements defined in `ui-rules.md`.
- Do not create a component to solve a one-off layout problem unless the pattern is genuinely reused elsewhere.
- Do not register speculative participant/admin components before the corresponding product decision is confirmed in `tbd.md`.
- Do not create separate public/participant/admin versions of the same visual primitive — one `Button`, not `PublicButton` and `AdminButton`.
- When a component changes materially, update its registry entry.
- When a component is removed, mark it Removed rather than deleting its entry — history matters for future agents.

---

## Component Status

- **Planned** — conceptually justified by the context files, not yet implemented.
- **Active** — implemented and available for reuse.
- **Conditional** — only applicable if a specific `tbd.md` decision becomes confirmed.
- **Deprecated** — implemented, but should no longer be used for new work.
- **Removed** — no longer exists in the implementation.

The Phase 0/1 primitive pass (see `progress-tracker.md`) implemented every Primitive Component below except Textarea/Select/Checkbox/Radio's underlying HTML-native alternative was not pursued — Select/Checkbox/Radio use Radix for full ARIA-listbox/checkbox/radiogroup compliance instead. Composed Components, Page-Level Patterns, and Conditional Components remain Planned/Conditional — only the Primitive layer is Active as of this writing.

---

## Primitive Components

### Button
- **Status:** Active — `components/ui/button.tsx`
- **Purpose:** The single interactive-action element across the entire product.
- **Use when:** Any clickable action — navigation CTAs, form submission, destructive confirmations.
- **Do not use when:** A plain navigational link with no button semantics is more appropriate (e.g. inline text links) — those are not registered separately here because none are currently justified by a confirmed page pattern.
- **Variants:** Primary, Secondary, Ghost, Destructive (per `ui-rules.md` Buttons section).
- **States:** default, hover, active, disabled, loading, focus-visible.
- **Key token dependencies:** `primary`/`primary-hover`/`primary-active`, `surface-secondary`, `border`, `error`, `radius-md`, button typography row, `focus-ring`.
- **Accessibility requirements:** real `<button>` element, visible `:focus-visible` state, loading state does not remove accessible name, disabled state uses `aria-disabled` in addition to visual treatment.
- **Notes:** No fifth variant exists yet; do not add "link" or "tertiary" variants speculatively.

### Input
- **Status:** Active — `components/ui/input.tsx`
- **Purpose:** Single-line text entry.
- **Use when:** Any short text/number/email field in a form.
- **Do not use when:** Multi-line entry is needed (use Textarea).
- **Variants:** none beyond type (`text`, `email`, `tel`, etc. — HTML attribute, not a visual variant).
- **States:** default, focus, error, disabled.
- **Key token dependencies:** `surface`, `border`/`border-focus`, `radius-md`, `text-primary`/`text-muted` (placeholder), `error`.
- **Accessibility requirements:** always paired with a programmatically associated `<label>`; error state linked via `aria-describedby`.
- **Notes:** Registered as a primitive because forms are already a confirmed part of the product surface (registration entry point). No specific fields are assumed by this registration.

### Textarea
- **Status:** Active — `components/ui/textarea.tsx`
- **Purpose:** Multi-line text entry.
- **Use when:** Longer free-text input is needed.
- **Do not use when:** A single line suffices (use Input).
- **Variants:** none.
- **States:** same as Input.
- **Key token dependencies:** same as Input.
- **Accessibility requirements:** same as Input.
- **Notes:** Vertical resize only, per `ui-rules.md`.

### Select
- **Status:** Active — `components/ui/select.tsx` (Radix `Select`, native `<select>` semantics aren't achievable with a styled listbox)
- **Purpose:** Single choice from a defined set of options.
- **Use when:** A form field needs a constrained set of choices.
- **Do not use when:** More than a handful of mutually exclusive short options exist (consider Radio instead) or multiple selections are needed (not yet a registered primitive — not currently justified).
- **Variants:** none.
- **States:** same as Input, plus open/closed.
- **Key token dependencies:** same shell as Input, `text-muted` chevron.
- **Accessibility requirements:** native `<select>` semantics preferred where possible; if a custom listbox is used, full keyboard and ARIA listbox pattern is required.
- **Notes:** No confirmed field currently requires this, but it's a standard form primitive and reasonably anticipated by any registration form.

### Checkbox
- **Status:** Active — `components/ui/checkbox.tsx` (Radix `Checkbox`)
- **Purpose:** Binary/multi-select toggle within a form.
- **Use when:** A yes/no or multi-select-from-a-list input is needed.
- **Variants:** none.
- **States:** unchecked, checked, disabled, focus.
- **Key token dependencies:** `surface`/`border` (unchecked), `primary`/`primary-foreground` (checked).
- **Accessibility requirements:** native `<input type="checkbox">` or a fully ARIA-compliant custom equivalent; always has an associated label.

### Radio
- **Status:** Active — `components/ui/radio-group.tsx` (Radix `RadioGroup`)
- **Purpose:** Single choice among a small visible set of options.
- **Use when:** A short, mutually exclusive option set should be fully visible rather than hidden in a Select.
- **Variants:** none.
- **States:** same as Checkbox.
- **Key token dependencies:** same as Checkbox.
- **Accessibility requirements:** grouped under a `<fieldset>`/`<legend>` or equivalent ARIA radiogroup pattern.

### Badge
- **Status:** Active — `components/ui/badge.tsx`
- **Purpose:** Small inline status/label indicator.
- **Use when:** Communicating a discrete state (pending, live, draft, success, error) inline with other content.
- **Do not use when:** The message needs more than a couple of words or an action — use Status/Notification Banner instead.
- **Variants:** Default, Success, Warning, Error, Informational, Live/Event (per `ui-rules.md` Badges section — the semantic mapping there is authoritative and must not be reinterpreted per-use).
- **States:** static (badges don't have interactive states).
- **Key token dependencies:** `surface-tertiary`, `success`/`warning`/`error`/`info` + their `-light` variants, `primary`/`primary-muted`.
- **Accessibility requirements:** never the sole means of conveying status — always paired with adjacent text or an icon per `ui-rules.md`.
- **Notes:** This is the component most at risk of semantic drift — see `ui-rules.md`'s explicit warning-vs-error distinction before adding any new usage.

### Card
- **Status:** Active — `components/ui/card.tsx`
- **Purpose:** The base surface container for grouped content.
- **Use when:** Any bounded content block — prize display, FAQ container, empty states, informational groupings.
- **Variants:** Standard, Interactive, Featured, Informational, Status (per `ui-rules.md` Cards table).
- **States:** default, hover (Interactive variant only).
- **Key token dependencies:** `surface-secondary`, `border`/`border-light`, `radius-lg`, `space-4`/`space-6`, `glow-primary` (Featured only).
- **Accessibility requirements:** if interactive, must be a real `<button>`/`<a>` or have full keyboard/ARIA support — a `<div>` with an onClick is not acceptable.
- **Notes:** Featured variant's glow is reserved specifically for the 1st-place prize card per `ui-rules.md` — not a general-purpose "emphasis" toggle.

### Drawer
- **Status:** Active — `components/ui/sheet.tsx` (shadcn/Radix "Sheet"; this is the Drawer primitive registered here)
- **Purpose:** Slide-in overlay panel from a screen edge.
- **Use when:** Mobile navigation menu.
- **Do not use when:** A centered, page-blocking confirmation is needed — use Dialog/Modal instead.
- **Variants:** none beyond direction (currently only used from the side, per Mobile Navigation Drawer below).
- **States:** open, closed, transitioning.
- **Key token dependencies:** `surface`, `overlay`.
- **Accessibility requirements:** focus trapped while open, closes on `Escape`, focus returns to the trigger on close.

### Spinner / Loading Indicator
- **Status:** Active — `components/ui/spinner.tsx`, consumed by Button's `loading` prop
- **Purpose:** Communicates an in-progress async action.
- **Use when:** Button loading state, form submission in progress.
- **Do not use when:** A full-page loading treatment is implied — none is currently justified by any confirmed flow.
- **Variants:** none (a single static, non-decorative spin).
- **States:** visible/hidden.
- **Key token dependencies:** `primary-foreground` (on Primary buttons) or `text-muted` (standalone).
- **Accessibility requirements:** `aria-live="polite"` announcement of the loading/complete transition where it affects form state.

### Separator
- **Status:** Active — `components/ui/separator.tsx`
- **Purpose:** A visual divider between grouped content.
- **Use when:** FAQ item dividers, table row borders, nav/content section boundaries.
- **Key token dependencies:** `border-muted` (primary use), `border` (higher-emphasis contexts).
- **Accessibility requirements:** decorative only — `aria-hidden="true"` unless it carries actual semantic meaning (rare).
- **Notes:** This is a lightweight style primitive, not a complex component — registered because it's reused across several composed components (FAQ, Table) rather than being redefined per-use.

### Dialog / Modal
- **Status:** Active — `components/ui/dialog.tsx`
- **Purpose:** A centered, page-blocking overlay for a focused task or confirmation.
- **Use when:** A future flow requires interrupting the user for a decision (e.g. a destructive confirmation once a delete-capable feature exists).
- **Do not use when:** The task doesn't need to block the rest of the page — prefer inline states or a Banner.
- **Key token dependencies:** `shadow-elevation`, `overlay`, `surface-secondary`, `radius-lg`.
- **Accessibility requirements:** full dialog ARIA pattern (`role="dialog"`, `aria-modal`, focus trap, `Escape` to close, focus return on close).
- **Notes:** Implemented in the Phase 0/1 primitive pass at explicit request rather than waiting for a concrete consuming flow; no page currently renders it. The next agent adding a real usage should not need to touch this file beyond this status line.

### Focus Treatment
- **Status:** Active — `.focus-ring` utility class in `app/globals.css`
- **Purpose:** Not a rendered component — the shared focus-visibility style (`border-focus` + `focus-ring`) applied uniformly across every interactive primitive above.
- **Notes:** Documented here so it isn't reinvented per-component. Implemented as a shared utility class/style, not a React component.

### TextReveal
- **Status:** Active — `components/ui/text-reveal.tsx`
- **Purpose:** The single reusable one-time scroll-entrance wrapper for text content — extracted from the fade+rise pattern Hero and Timeline had each hand-rolled independently (same `EASE_OUT` cubic-bezier `[0.22, 1, 0.36, 1]`, same 0.6s per-element duration, same ~0.08–0.16s stagger neighborhood, confirmed by reading both files rather than assumed). Intended to replace ad hoc `motion.h1`/`motion.p`+`Variants` blocks for new text entrances going forward, though Hero/Timeline's own existing implementations were not retrofitted onto it this round (see Notes).
- **Use when:** Any heading or paragraph that should fade+rise in once on scroll into view. `split="word"` for headings (staggers each word — reads as a staggered word/line reveal); the default `split="none"` for body paragraphs (fades+rises as one block, no per-word stagger) — one component serves both, not two.
- **Do not use when:** Content that's part of a larger, already-orchestrated `motion.ol`/`motion.div` stagger group with its own shared trigger (e.g. Timeline's node list, Prize Display's marker group) — introducing a second independent `whileInView` trigger inside an already-propagating variant tree would risk exactly the kind of drift DEC-009's "one shared trigger" fix was written to avoid. Use plain `motion.li`/`motion.g` with inherited variants there instead, as those components already do.
- **Composition:** `split="word"` splits `children` (must be a plain `string` in this mode — enforced by a discriminated prop type, not a runtime check) on spaces and wraps each word in its own `motion.span`, inside an outer container element (`as`) driving `staggerChildren`/`delayChildren`. `split="none"` renders `as` directly as a single fade+rise unit, with `delayChildren` repurposed as that unit's own entrance delay (for cascading several `TextReveal`s that enter together — e.g. eyebrow, then heading, then paragraph — the same way Hero staggers its own block-level children). `as` is restricted to a small fixed set of tags (`div`/`span`/`p`/`h1`–`h4`) resolved via a static lookup of Motion's own pre-built `motion.h1`/`motion.div`/etc. components, not `motion.create()` called per-render — calling `motion.create()` inside the render body was tried first and caught by the `react-hooks/static-components` ESLint rule (it resets the created component's state on every re-render); the static lookup avoids that entirely since nothing is created at render time, only selected.
- **Responsive behavior:** No structural change — the underlying text/heading element's own responsive classes (font-size steps, etc.) are untouched; `TextReveal` only adds the entrance behavior via `className`/`variants`, never repositions or resizes content.
- **Accessibility requirements:** `once: true` on the `whileInView` trigger is hardcoded, not exposed as a prop — every consumer gets the same one-time guarantee, since a recurring bug this session was animations quietly re-triggering on scroll (Timeline's spine used to be continuously `useScroll`-linked; Prize Display and the About page's network graphics both needed explicit verification their entrances don't replay). Reduced motion is handled the same way as everywhere else — `MotionConfig`'s `reducedMotion="user"` (global, via `components/motion-provider.tsx`) drops the `y` transform after hydration while keeping the opacity fade; nothing here branches on `useReducedMotion()` for structure. Verified on its first real usage (About page), not assumed from the pattern alone: (1) computed per-word opacity sampled at short intervals after a fresh page load showed genuine staggering — word 1 reaches ~0.98 opacity while word 7 is still at 0 in the same frame, not simultaneous; (2) computed opacity/transform for both a `split="word"` heading and a `split="none"` paragraph, compared immediately after their first reveal against two further scroll-away-and-back cycles (including one scrolling past the whole page first), came back byte-identical every time — confirmed neither replays.
- **Token/rule dependencies:** No new tokens — consumes whatever typography/color classes the caller passes via `className`, same as `motion.h1`/`motion.p` did directly before extraction.
- **Relevant routes:** `/about`, `/challenges`. Not yet retrofitted onto Hero/Timeline's own existing hand-rolled implementations, or onto FAQ/Register/Rules — see `context/decisions.md` for the reasoning and `progress-tracker.md` for what's still open.
- **Notes:** Hero and Timeline's own text entrances were deliberately left as-is this round rather than refactored onto `TextReveal` — they already work correctly and doing so wasn't asked for; the extraction was scoped to "pull the pattern into a reusable component and prove it on new usage," not "retrofit every existing usage in the same pass."

---

## Composed Components

### Site Header
- **Status:** Planned
- **Purpose:** The persistent public navigation bar.
- **Use when:** Every public page.
- **Composition:** wordmark + Button (nav CTA) + nav links, collapsing to a drawer trigger on mobile.
- **Variants:** none — one Site Header for the whole public site.
- **States:** default, scrolled (if sticky-shadow behavior is added later — not currently specified), mobile-collapsed.
- **Responsive behavior:** full horizontal nav ≥1024px; collapses to a drawer trigger below that, per `ui-rules.md` Navigation section.
- **Accessibility requirements:** `<nav>` landmark, `aria-current="page"` on the active item.
- **Token/rule dependencies:** `header-height`, `surface`, `border`, nav typography, `primary` (active item/CTA).
- **Relevant routes:** all public routes (`/`, `/about`, `/challenges`, `/timeline`, `/prizes`, `/rules`, `/faq`, `/register`).

### Mobile Navigation Drawer
- **Status:** Planned
- **Purpose:** Mobile-collapsed nav menu.
- **Composition:** Drawer primitive + stacked nav links + Button (CTA).
- **Responsive behavior:** only rendered below the 1024px breakpoint.
- **Accessibility requirements:** see Drawer primitive.
- **Token/rule dependencies:** `overlay`, `surface`, `space-4`.
- **Relevant routes:** all public routes.

### Page Backdrop
- **Status:** Active — `components/public/page-backdrop.tsx`
- **Purpose:** The circuit/grid texture as a full-page decorative background, without the aurora/ignition-glow. The site-wide default page backdrop, per `context/decisions.md` DEC-010 — DEC-006 originally scoped this to `/timeline`/`/prizes` only; DEC-010 supersedes that scope.
- **Use when:** Every public page. `/about` was wrapped in it as part of DEC-010; `/challenges`, `/faq`, `/register`, `/rules` are the immediately-following rollout step (same decision, tracked separately per the user's request to review `/about` first).
- **Do not use when:** The homepage — Hero already supplies its own richer aurora + grid + ignition-glow treatment; wrapping `/` in `PageBackdrop` on top of that would be redundant.
- **Composition:** `AnimatedGridPattern` (motion) + a static grid fallback, both always rendered, visibility toggled by `motion-safe:`/`motion-reduce:` CSS only — never a `useReducedMotion()` structural branch (see the Accessibility Registry's note on why).
- **Token/rule dependencies:** `border-light` (grid lines), `background`. Never `primary`/`ember` (no glow/aurora here — that distinction from Hero is unchanged by DEC-010, which only broadened *where* the grid-only treatment applies, not what it contains).
- **Relevant routes:** All public routes except `/`.

### Page Header
- **Status:** Active — `components/public/page-header.tsx`
- **Purpose:** The standard non-hero page introduction (eyebrow + heading + supporting text).
- **Use when:** Every page except the homepage.
- **Do not use when:** The homepage — that uses Hero instead.
- **Composition:** eyebrow label + page heading + supporting paragraph, left-aligned.
- **Variants:** none — deliberately one consistent pattern across all pages.
- **Responsive behavior:** no structural change; width caps to `content-column-narrow` at all sizes.
- **Accessibility requirements:** the heading here is the page's single `<h1>`.
- **Token/rule dependencies:** label typography, page-heading typography (`text-4xl`/`leading-[1.15]` — the exact `2.25rem`/`1.15` from `ui-tokens.md`'s Typography table), `text-secondary`, `space-8` to first content section. The component itself stays flat (no gradient/glow of its own) even on `/timeline`, which wraps it in `PageBackdrop` — the backdrop is the page's concern, not the header's, per `ui-rules.md`'s Page Headers section.
- **Relevant routes:** `/timeline` only. `/prizes` no longer uses this component — it now has its own bespoke two-column header built into `PrizeDisplay`, per `context/decisions.md` DEC-008. Not yet used by `/about`, `/challenges`, `/rules`, `/faq`, `/register` — those pages don't exist yet.

### Hero
- **Status:** Active — `components/public/hero.tsx`
- **Purpose:** The homepage's single high-impact introduction.
- **Use when:** Homepage only.
- **Do not use when:** Any other page — see `ui-rules.md`'s hard limit on hero composition leaking elsewhere.
- **Composition:** eyebrow + hero heading + supporting text + a prize-pool/registration-date teaser + primary/secondary CTA (Buttons), over an aurora mesh (`components/ui/aurora-background.tsx`) + animated grid (`components/ui/animated-grid-pattern.tsx`) + a strengthened ignition-glow radial gradient.
- **Responsive behavior:** headline steps through three distinct sizes (3.5rem → 4rem → 4.5rem at the 640px/1024px breakpoints, not a single scaled-down value), CTAs stack full-width below 640px, per `ui-rules.md`. Verified with real browser screenshots at 375/768/1440px — no horizontal overflow at any width.
- **Accessibility requirements:** contains the site's single `<h1>` on the homepage. Continuous aurora/grid motion and a staggered entrance (fade + rise) are authorized by `context/decisions.md` DEC-004, which relaxed `ui-rules.md`'s Motion "Forbidden" list for this treatment specifically; every animated piece is gated behind `useReducedMotion`/`motion-reduce:` and falls back to a static equivalent.
- **Token/rule dependencies:** `hero-max-width` (`max-w-hero`), `content-column-wide`/`content-column-narrow` (`max-w-content-wide`/`max-w-content-narrow`), hero typography, `primary`/`ember` (aurora + ignition glow — no hue outside these two survives from the installed components' defaults), `border-light` (circuit texture/grid lines), stat/prize-number typography (prize-pool figure only — the registration date intentionally uses plain text styling, not the heavy stat pairing, per the typography Named Rule reserving that for numbers representing scale/achievement).
- **Relevant routes:** `/` only.

### Event Glance
- **Status:** Active — `components/public/event-glance.tsx`
- **Purpose:** A compact three-fact recap directly below the Hero: Registration Opens, Grand Finale, Prize Pool.
- **Use when:** Homepage, directly below Hero.
- **Do not use when:** As a replacement for Timeline or Prize Display — those are the full compositions, now live on `/timeline`/`/prizes` (see their entries below); this stays a lightweight homepage recap, not a duplicate of either.
- **Composition:** section heading (h2, "Event at a Glance") + a 1/2/3-column card grid (`ui-tokens.md`'s standard card-grid responsive rule). Each card: a Standard-variant Card + a hover-only `BorderBeam` (`components/ui/border-beam.tsx`) that loops the card's border on `:hover` — a binary state change, not a value tracking cursor position, so it doesn't fall under `context/decisions.md` DEC-004's still-forbidden "cursor-follow glow." The Prize Pool figure uses `NumberTicker` (`components/ui/number-ticker.tsx`) to count up on scroll into view.
- **Responsive behavior:** 1 column (mobile) → 2 (≥640px) → 3 (≥1024px), per `ui-tokens.md`'s card-grid rule. Verified with real browser screenshots at 375/768/1440px — no horizontal overflow at any width.
- **Accessibility requirements:** entrance stagger triggers once via `whileInView` (not on every scroll pass); `BorderBeam` is purely decorative (`pointer-events-none`) and never carries information a screen reader needs. Gated on `useReducedMotion`: the rise/stagger snaps straight to its end state, `BorderBeam` isn't rendered at all, and the Prize Pool figure renders its final formatted value directly instead of counting up.
- **Token/rule dependencies:** `content-max-width` (`max-w-content` — a regular section, not a hero/bookend, per `ui-rules.md`'s Layout section), `surface-secondary`/`border` (Card standard), `primary`/`ember` (BorderBeam, NumberTicker), stat/prize-number typography (Prize Pool figure only, same Named Rule as Hero).
- **Relevant routes:** `/` only.

### FAQ Item / FAQ Accordion
- **Status:** Planned
- **Purpose:** A single expandable question/answer row, composed into a full FAQ list.
- **Composition:** clickable question row + chevron + expandable answer region.
- **States:** collapsed, expanded, hover, focus.
- **Responsive behavior:** no structural change across breakpoints.
- **Accessibility requirements:** `aria-expanded` on the trigger, answer region associated via `aria-controls`.
- **Token/rule dependencies:** `border-muted` divider, question/answer typography, `surface-secondary` (expanded/hover), `focus-ring`.
- **Relevant routes:** `/faq`.

### Timeline
- **Status:** Active — `components/public/timeline.tsx`
- **Purpose:** Displays the confirmed hackathon milestones in sequence, as its own dedicated page.
- **Composition:** repeated milestone nodes (icon-in-circle + card containing title/badge/date/description) connected by a spine, wrapped in a semantic `<ol>`/`<li>`. Three nodes: Registration Opens (7 Sept 2026, active), Online Preliminaries (pending-date), Grand Finale (25–27 Dec 2026, Bengaluru).
- **Variants:** none — a single vertical layout at every breakpoint. The previously-documented "vertical mobile/tablet, horizontal desktop" behavior was retired per `context/decisions.md` DEC-006: Timeline was removed from `/` (where the horizontal desktop variant existed to compress into a homepage strip), and with no homepage context left to serve, a single generously-spaced vertical layout suits the dedicated page better than a compressed one ever did.
- **States per milestone:** upcoming, active, completed, pending-date (uses a `warning` badge for unconfirmed dates — never a fabricated date). Milestone state is a build-time snapshot in the component's data array; it belongs in `hackathon_config` once Phase 5 lands, and is deliberately not derived from `new Date()` at render (the page is statically prerendered, so a runtime date would disagree between server and client).
- **Responsive behavior:** vertical at all sizes, node/icon/typography sizing steps up at the `sm` breakpoint. Verified with real browser screenshots at 375/768/1440px — no horizontal overflow at any width.
- **Accessibility requirements:** milestone state communicated via icon + text, not color alone — active carries a `live` Badge ("Open now") plus a pulse ring, pending-date a `warning` Badge, completed a check icon (overriding the phase icon), upcoming neither. The connecting spine and pulse ring are `aria-hidden` decoration. Entrance is a one-time `whileInView` stagger (`viewport={{ once: true }}`) — explicitly verified this round by reading computed styles across multiple scroll direction changes (down past the section, back to page top, back down again): state is byte-identical after the first reveal, confirming it doesn't re-trigger or track scroll position. An earlier version tied the spine's draw-in continuously to scroll offset via `useScroll`/`useTransform`; that's gone, replaced by a one-time `scaleY` reveal fired by the same `whileInView` pass as the nodes. Gated on `prefers-reduced-motion` via CSS (`motion-safe:`/`motion-reduce:`), never the `useReducedMotion()` hook for anything structural — see the note on this in the Accessibility Registry below.
- **Token/rule dependencies:** `primary`, `primary-muted`, `border-muted`, `glow-primary` (active dot's static box-shadow) plus a CSS `animate-ping` ring specifically on the active dot — `ui-rules.md`'s Timeline section previously forbade pulsing here; DEC-006 carves out this one element specifically, narrower than DEC-004's general hero/landing relaxation. `warning`, `surface-secondary`/`border` (per-node cards), `content-max-width`. Phase icons (registration/online/finale, from `lucide-react`) are DEC-006's other carve-out to the "no decorative icons" rule — always paired with the node's text title, functioning as wayfinding, not standing alone as decoration. The page itself (not this component) adds the circuit/grid texture via `PageBackdrop`, also DEC-006.
- **Relevant routes:** `/timeline` only — removed from `/` per DEC-006.

### Prize Card
- **Status:** Active — inlined within `components/public/prize-display.tsx` as `Marker`, not a separately exported component. "Prize Card" names the registered concept (one tier's display unit); the current implementation is a vertical marker rising from the waveform, not a card, box, or 3D block.
- **Purpose:** Displays a single prize tier.
- **Composition:** placement label ("1st/2nd/3rd Place") + amount, stacked above a small dot, above a vertical connector line whose bottom end lands exactly on the mountain-waveform peak beneath it (see Prize Display's `Waveform`). Line length (and therefore how "elevated" the marker reads) varies per tier — 1st tallest — with 1st's dot also larger and glowing. No tagline, description, or judging-criteria copy under any marker — placement and amount are the only facts confirmed anywhere in `tbd.md`.
- **Variants:** First-place (featured — tallest line, larger glowing dot, `primary`-colored amount), Standard (2nd/3rd place and any future confirmed tier — shorter line, smaller dot, `text-primary` amount stays white).
- **Responsive behavior:** the whole waveform+marker composition scales with its container; marker x-positions are percentage-based (22/50/78%) so they track the waveform's peaks at every width. Verified with real browser screenshots at 375/768/1440px — no horizontal overflow at any width.
- **Accessibility requirements:** rank communicated as literal text ("1st/2nd/3rd Place" label, not position/color alone). The waveform SVG is `aria-hidden`, purely decorative.
- **Token/rule dependencies:** `primary` (dots, featured amount, line), `border-light` (standard line, waveform stroke), `text-primary`/`text-muted` (standard amount, label).
- **Relevant routes:** `/prizes` only.

### Prize Display
- **Status:** Active — `components/public/prize-display.tsx`
- **Purpose:** The full prize section, including its own bespoke header — headline + supporting copy + CTA at top, a mountain-range waveform with three rank markers and a vertical theme-word accent column below — as its own dedicated page. Fifth visual pass this session: a plain 3-equal-card grid, a boxed ascending-bar podium, floating dot-and-line markers with a signature gem icon, literal isometric 3D podium blocks (DEC-008), each superseded by the next on direct feedback or a new reference — now a mountain-range waveform with three rising rank markers, per `context/decisions.md` DEC-009. Earlier versions are not kept as fallbacks.
- **Composition:** header block (eyebrow "Prizes" + `h1` "Rewarding what matters" + supporting copy, the confirmed ₹6,00,000/three-tiers/grand-finale statement + a "Register Now" CTA → `/register`) — a named, page-specific exception to `ui-rules.md`'s Page Headers pattern, per DEC-008/DEC-009. Below it: a full-width row containing the waveform+markers (a hand-authored three-peak SVG path, `Marker`s positioned on each peak — see Prize Card) and, at `lg`+ only, a vertical accent column reading "Scalable / Innovations / Next-Gen / India" (`writing-mode: vertical-rl`) — `project-overview.md`'s confirmed theme string split into its four words, not invented phrasing.
- **Responsive behavior:** header stacks above the waveform at all widths (no two-column split in this version); the vertical accent column is hidden below `lg` (1024px) as a purely atmospheric element that doesn't compress well. Verified with real browser screenshots at 375/768/1440px — no horizontal overflow at any width.
- **A real layout bug caught and fixed before shipping:** the waveform/marker container was first sized `min-h-[280px]`, well short of the 1st-place marker's actual rendered extent (peak offset + line + label/amount/dot stack, ≈415px measured via `getBoundingClientRect()`). This overlapped the "Register Now" button at 375px specifically, where a wrapped 2-line heading left less clearance than at wider breakpoints — not caught by the 1440px screenshot alone, which had enough incidental gap to hide it. Fixed by sizing the container to the marker's measured extent (`min-h-[440px] sm:min-h-[480px]`).
- **Accessibility requirements:** entrance is a one-time reveal — one ancestor `motion.div` declares `whileInView`/`viewport={{ once: true }}`, and Motion's variant propagation carries that state to the waveform and marker group beneath it (no independent per-element viewport triggers that could drift apart), gated on `prefers-reduced-motion` via `MotionConfig`'s `reducedMotion="user"` (no `useReducedMotion()` structural branch). Verified two ways, not assumed: (1) sampling computed opacity of the waveform vs. the 1st-place marker across the first ~2s after scroll-into-view confirmed real sequencing — waveform fully visible (~400ms) well before the marker starts appearing (~700–900ms); (2) comparing computed opacity/transform after the first reveal against two further scroll-away-and-back cycles showed byte-identical values every time, confirming the entrance doesn't replay.
- **Token/rule dependencies:** see Prize Card. The page itself (not this component) adds the circuit/grid texture via `PageBackdrop`, per DEC-006. The bespoke header is DEC-008/DEC-009 — see `ui-rules.md`'s Page Headers section. DEC-007's wireframe gem is retired as of DEC-009 (see `ui-tokens.md`'s Visual Effects table).
- **Relevant routes:** `/prizes` only.
- **Notes:** Only the three confirmed prize tiers and the confirmed total are ever rendered — see Page-Level Patterns below. This round's reference image's per-tier taglines ("Most impactful solution...", "Ideas with strong execution...") and its vertical accent wording ("PEOPLE / IDEAS / TECHNOLOGY / A STRONGER BHARAT") were both deliberately not adopted — neither is confirmed anywhere in `project-overview.md`/`tbd.md`. The accent column instead reuses the exact confirmed theme string already used verbatim in Hero. Everything else in the reference (waveform silhouette, three-peak composition, 1st-place prominence, one-time staggered entrance) was built as specified. Per explicit instruction this round, spacing/CTA/nav-active-state fixes are deliberately deferred to a later pass, not part of this redesign.

### India Network Map / Global Network Globe
- **Status:** Active — `components/public/network-graphic.tsx` (`IndiaNetworkMap`, `GlobalNetworkGlobe`, sharing internal `NetworkDot`/`NetworkArc` pieces)
- **Purpose:** Two bespoke decorative illustrations for `/about`, per `context/decisions.md` DEC-010 — a real India outline with glowing city-position dots and connecting arcs in the "What is Tech4Bharat" section, and a real-landmass globe with the same dot/arc language at a "zoomed out" scale in the GAVS 2026 section. Deliberately built as one consistent visual system across two scales, not two unrelated graphics.
- **Composition:** `IndiaNetworkMap` — India's actual boundary (real TopoJSON via `react-simple-maps`/`d3-geo`/`topojson-client`/`world-atlas`, extracted server-side in `lib/geo.ts` and passed in as a `Feature` prop; see DEC-011 — a first hand-authored version was corrected after it didn't actually resemble India), with dots at real coordinates for Delhi/Mumbai/Kolkata/Chennai/Bengaluru and arcs from each to Bengaluru specifically (the one city-level location confirmed in `tbd.md` — the grand-finale city — so it's the visual "hub", not an arbitrary pick). No city name or claim is rendered as text; this is decorative geography, not an assertion of fact. `GlobalNetworkGlobe` — the real world landmass on a `geoOrthographic` projection rotated to center India, with `react-simple-maps`' own `<Sphere>`/`<Graticule>` for the outline and real curved lat/long lines, a featured "India" dot, and arcs radiating to four real outer coordinates (London/Dubai/Singapore/Tokyo, chosen only for being visible from that rotation) evoking global reach, reusing the same `NetworkDot`/`NetworkArc` primitives.
- **Variants:** None — each is a single fixed composition, sized via `max-w-sm` and scaling with its container.
- **Responsive behavior:** scales fluidly with its parent grid column; stacks below its section's text on narrower breakpoints as part of the section's `grid md:grid-cols-2` layout. Verified with real browser screenshots at 375/768/1440px — no horizontal overflow at any width.
- **Accessibility requirements:** both `<svg>`s are `aria-hidden="true"`, purely decorative. Entrance is a one-time reveal, self-contained in each component (an outer `motion.div` with `whileInView`/`viewport={{ once: true }}` propagates to a fade+rise wrapper, then a staggered dot pop-in, then a staggered arc fade-in that starts after the dots) — the same variant-propagation technique verified for Prize Display's waveform/markers (DEC-009), reused rather than reinvented. Gated on `prefers-reduced-motion` via `MotionConfig`'s `reducedMotion="user"` — arcs deliberately use an opacity stagger rather than a `pathLength` stroke-draw, since `pathLength` isn't covered by that mechanism (see DEC-010's reasoning). Verified two ways for this component specifically, not assumed from the Prize Display precedent alone: (1) an initial full-page screenshot with no incremental scroll made the globe appear entirely missing — traced to Playwright's `fullPage` capture not reliably firing `IntersectionObserver`-based `whileInView` triggers for content below the fold without an actual scroll first, not a real component bug, and fixed in the verification script (scroll incrementally through the page before capturing), not the component; (2) comparing computed opacity/transform for both graphics immediately after their first reveal against two further scroll-away-and-back cycles (including one scrolling past the whole page first) showed byte-identical values every time, confirming neither entrance replays.
- **Token/rule dependencies:** `primary`/`border-light` only (dots, arcs, outline strokes, wireframe lines) — no new hue. This is `ui-tokens.md`'s Visual Effects table's second exception to the decorative-icons/illustrations restriction (the first being Timeline's phase icons, DEC-006) — scoped to `/about` specifically, not a general license for illustration elsewhere. `react-simple-maps`/`d3-geo`/`topojson-client`/`world-atlas` are documented in `context/library-docs.md`; the ~750KB/55KB source TopoJSON files never reach the client bundle — confirmed by grepping built chunks, not assumed — since extraction happens server-side in `lib/geo.ts`.
- **Relevant routes:** `/about` only.

### Empty State
- **Status:** Planned
- **Purpose:** Communicates "no data exists yet" for a genuinely empty (not pending, not unpublished) content area.
- **Composition:** centered icon + `text-muted` message inside a `surface-muted` card.
- **Variants:** the four distinct patterns defined in `ui-rules.md` (no data / unpublished-to-admin / pending confirmation / participant-has-no-records) are **not** the same component — see Pending Confirmation State below and the Conditional Components section for the participant-specific variant.
- **Token/rule dependencies:** `surface-muted`, `border-muted`, `text-muted`.
- **Relevant routes:** any route with organizer-populated content (e.g. `/challenges`, `/faq` before content exists).

### Pending Confirmation State
- **Status:** Active — `components/public/pending-confirmation-state.tsx`. First real implementation of what was a spec-only registry entry until this round (`/challenges`); built exactly to the composition already recorded here and in `ui-rules.md`'s "Pending / Unconfirmed Content" section, not a new one-off design.
- **Purpose:** Communicates "this information isn't finalized yet" without looking broken — the standard treatment for any `tbd.md` Not Confirmed item.
- **Composition:** dashed `border-muted`/`surface-muted` Card (`variant="informational"`, the Empty-State card pattern) + `warning` Badge reading "Pending confirmation" + short heading + one sentence of neutral context, passed in via `heading`/`message` props so callers supply accurate, route-specific copy rather than the component inventing example content.
- **Do not use when:** Content is genuinely empty with no pending decision behind it — use Empty State instead.
- **Token/rule dependencies:** `warning`/`warning-light`, `surface-muted`, `border-muted`.
- **Relevant routes:** `/challenges` (its first usage — "Official Challenge Statements... will be published once confirmed by organizers"), `/rules` (for unconfirmed detail sections), `/timeline` (for unconfirmed milestone dates), any route surfacing a `tbd.md` item.

### Approach Steps
- **Status:** Active — `components/public/approach-steps.tsx`
- **Purpose:** `/challenges`' numbered process sequence (Understand → Ideate → Build → Create Impact), describing the APPROACH participants take, not specific challenge sectors/tracks. Two reference layouts were explicitly rejected for this section: a four-sector icon-card grid (Sustainable Development / Inclusive Growth / Education & Skills / Healthcare Access), which invents challenge tracks with no basis in `tbd.md` (both "Problem statements" and "Challenge tracks" are listed Not Confirmed there); and a plain unconnected numbered list, in favor of the richer connected-step version per DEC-004's visual-richness allowance and direct instruction.
- **Composition:** four numbered circles (`primary` border, `background` fill) in a horizontal row at `md`+, connected by a one-time `scaleX` line-draw (`origin-left`, same transform-based technique as Timeline's `scaleY` spine) — collapses to a plain vertical stack with no line below `md`, since a horizontal connector doesn't compress well into a narrow column.
- **Variants:** None — a single fixed 4-step sequence; step count/labels are hardcoded content describing the confirmed general approach, not organizer-supplied data.
- **Responsive behavior:** `grid-cols-1` (mobile) → `sm:grid-cols-2` → `md:grid-cols-4` with the connecting line appearing only at `md`+. Verified with real browser screenshots at 375/768/1440px — no horizontal overflow at any width.
- **Accessibility requirements:** one-time entrance — a single ancestor `motion.div` declares `whileInView`/`viewport={{ once: true }}`, propagating to the connecting line and each step (staggered fade+rise) via variant propagation, not independent triggers. Verified via computed transform/opacity comparison across two scroll-away-and-back cycles (including one scrolling past the whole page first) — byte-identical every time, confirming no replay.
- **Token/rule dependencies:** `primary` (circles, line), `background` (circle fill), `border-muted` (static line track), `text-primary`/`text-secondary` (titles/descriptions).
- **Relevant routes:** `/challenges` only.

### Form Field
- **Status:** Planned
- **Purpose:** The reusable label + input/textarea/select + helper/error-text unit.
- **Composition:** Form label + one of (Input/Textarea/Select/Checkbox/Radio) + helper or error text.
- **States:** default, focus, error, disabled.
- **Token/rule dependencies:** form-label typography, form-help-text typography, `error`.
- **Relevant routes:** `/register` and any future form-bearing page.
- **Notes:** This component defines the visual shell only. It does not define or imply which fields exist on any given form — that remains a product decision.

### Form Section
- **Status:** Planned
- **Purpose:** Groups related Form Fields with consistent spacing inside a form Card.
- **Composition:** Card (form container) + stacked Form Fields + submit Button.
- **Token/rule dependencies:** `content-column-narrow`, `space-4`/`space-6`.
- **Relevant routes:** `/register`.

### Status / Notification Banner
- **Status:** Planned
- **Purpose:** An inline, non-blocking message communicating success, error, warning, or informational state at a section/page level (distinct from a Badge, which is inline with other content).
- **Use when:** Form submission success/failure, page-level notices.
- **Composition:** icon + short message on a semantic `-light` background.
- **Token/rule dependencies:** `success`/`warning`/`error`/`info` + their `-light` variants.
- **Accessibility requirements:** `role="alert"` (error) or `aria-live="polite"` (success/info) as appropriate.
- **Relevant routes:** `/register` (confirmed use — the Forms success state in `ui-rules.md`); other routes only once a concrete need exists.

### Table
- **Status:** Planned
- **Purpose:** Structured tabular data display for future participant/admin interfaces.
- **Composition:** header row + data rows, responsive collapse per `ui-rules.md` (stacked cards ≤5 columns, horizontal scroll for dense data).
- **Token/rule dependencies:** `surface-secondary` (header), `border-muted` (row dividers), `primary-muted` (selected row).
- **Accessibility requirements:** semantic `<table>`/`<thead>`/`<tbody>`, scoped headers.
- **Relevant routes:** none currently confirmed — this is registered because `architecture.md` and `ui-rules.md` both anticipate it for the conditional participant/admin surfaces; see Conditional Components.

### Table Empty State
- **Status:** Planned
- **Purpose:** The Empty State pattern specifically inside a Table context (e.g. "No registrations yet").
- **Composition:** Empty State rendered inside the table body region instead of rows.
- **Relevant routes:** same as Table — conditional on those surfaces being built.

---

## Page-Level Patterns

Patterns describe reusable *composition*, not confirmed content. Product-specific content (actual copy, actual dates, actual fields) is never defined by this file.

### Public Information Page
**Reusable composition:** Page Header → main content sections (using Cards, grids, or narrow-column prose as appropriate) → no mandatory closing treatment beyond the site's Footer (not yet a separately registered component — currently just contains standard nav-adjacent content, no distinct interactive pattern beyond links).
**Product-specific:** which sections exist and what they say is defined by `site-structure.md`/`project-overview.md`, not here.
**Applies to:** `/about`, `/challenges`, `/rules`, `/faq`.

### Public Registration Page
**Reusable composition:** Page Header → Form Section (Card containing Form Fields + submit Button) → Status/Notification Banner on submit.
**Product-specific — explicitly NOT defined here:** which fields the form contains, whether account creation happens before or after, and what happens post-submission. These remain unresolved per `tbd.md`'s Registration decision entry. This registry documents only the visual shell described above.
**Applies to:** `/register`.

### Pending Information Section
**Reusable composition:** the Pending Confirmation State component, placed wherever a page would otherwise show organizer-supplied content that doesn't exist yet.
**Product-specific:** the specific sentence of context shown is written per-instance but must stay factual and neutral (e.g. "Challenge tracks will be published once confirmed"), never inventing example content.
**Applies to:** any page surfacing a `tbd.md` Not Confirmed item.

### Timeline Section
**Reusable composition:** `PageBackdrop` (circuit/grid texture) → Page Header → the Timeline component.
**Product-specific:** only the two confirmed milestones (registration opens, event dates) currently have real dates; any additional milestone node renders via the Timeline's pending-date state, not an invented date.
**Applies to:** `/timeline` only. Removed from `/` per `context/decisions.md` DEC-006 — see the Timeline entry above.

### Prize Section
**Reusable composition:** `PageBackdrop` (circuit/grid texture) → the Prize Display component, which owns its own bespoke two-column header (no separate Page Header — see `context/decisions.md` DEC-008).
**Product-specific:** exactly three confirmed prize tiers plus the confirmed total. No additional prize category (track prizes, special mentions) is rendered unless and until confirmed in `tbd.md` — at which point it uses the existing Standard Prize Card treatment, not a new component.
**Applies to:** `/prizes` only. Removed from `/` per `context/decisions.md` DEC-006 — see the Prize Display entry above.

---

## Conditional Components

These are structurally anticipated by `architecture.md` but depend on decisions that are Not Confirmed in `tbd.md`. They are not designed or implemented here — only tracked so they aren't silently duplicated or prematurely built.

| Component | Why it's conditional | Decision it depends on | Current status | What must be confirmed first |
|---|---|---|---|---|
| Team components (team creation/invite/member list) | Team-based participation itself is unconfirmed | "Team Structure" decision in `tbd.md` | Conditional | Whether teams exist at all, and size/composition rules |
| Participant dashboard components (status overview, nav) | Dashboard is explicitly conditional in `project-overview.md` | "Participant Experience" decision in `tbd.md` | Conditional | Whether a dashboard is required at all |
| Submission components (upload form, status display) | Submission format/ownership is unconfirmed | "Submission" decision in `tbd.md` | Conditional | Submission format and team-vs-individual ownership |
| Upload component (file/link submission input) | Depends entirely on confirmed submission format | "Submission" decision in `tbd.md` | Conditional | What's actually being submitted (repo link vs. file vs. video, etc.) |
| Admin data-management components (registration/challenge/announcement management views) | Admin system's existence depends on the HackCulture integration model | "Admin" and "HackCulture Integration" decisions in `tbd.md` | Conditional | Whether a custom admin system is built at all, vs. relying on HackCulture's tooling |
| Authentication-specific UI (OTP entry, password fields) | Auth method is unconfirmed | "Authentication" decision in `tbd.md` | Conditional | Email/password vs. OTP vs. both |
| Participant status panels (registration status, team status) | Depends on both registration ownership and team-model decisions | "Registration" and "Team Structure" decisions in `tbd.md` | Conditional | Both underlying decisions |

None of these should be implemented, designed in detail, or given placeholder content before the corresponding `tbd.md` item moves to Confirmed.

---

## Component Naming Rules

Names describe **what the component represents and its reusable responsibility** — never its page-specific location.

**Good:** `PageHeader`, `PrizeCard`, `Timeline`, `PendingState`, `FormField`, `StatusBanner`
**Avoid:** `HomeOrangeCard`, `AboutSection2`, `RegisterBox`, `SpecialPrizeThing`, `PublicButton`/`AdminButton` (see Registry Rules — one `Button`, not per-area variants)

A page-specific name is acceptable only when the component is genuinely not intended for reuse anywhere else (e.g. `Hero` is intentionally homepage-only, but is still named for what it *is*, not where it lives — not `HomePageTopSection`).

---

## Composition Rules

- Pages compose Page-Level Patterns.
- Page-Level Patterns compose Composed Components.
- Composed Components compose Primitive Components.
- Primitives consume design tokens directly.
- No layer bypasses the one below it — a page must not reach past a Composed Component to hardcode Primitive-level styling.
- Page-specific styling never creates a parallel design system — if a page needs something the tokens/rules don't support, that's a `ui-tokens.md`/`ui-rules.md` change, not a local override.
- Reuse happens at the lowest appropriate abstraction level — don't build a new Composed Component when a Primitive plus existing layout rules already solves the problem.
- Avoid excessive abstraction: two components that happen to look similar are not automatically the same component. `Card` (Status variant) and `Pending Confirmation State` look related but represent different concepts (a general status surface vs. a specific "awaiting organizer confirmation" message) and are registered separately for that reason.
- Visual consistency does not require forcing unrelated use cases into one component — a shared look achieved through shared tokens is sufficient; it does not require a shared component.

---

## Accessibility Registry

Component-level implications of `ui-rules.md`'s accessibility rules (see that file for the full requirements):

- **Keyboard interaction:** every Primitive above (Button, Input, Select, Checkbox, Radio, Drawer, Dialog) must be fully operable via keyboard alone; Composed Components inherit this by construction if they're built from these primitives rather than custom markup.
- **Focus-visible:** every interactive Primitive uses the shared Focus Treatment — no component defines its own focus style.
- **Semantic HTML:** Composed Components must use real landmark/structural elements (`<nav>` for Site Header, `<table>` for Table, `<form>` for Form Section) rather than generic `<div>` trees.
- **Labels:** every Form Field pairs its input with a real `<label>` — enforced at the Form Field level, not left to each page.
- **ARIA use:** limited to where native semantics fall short (`aria-expanded` on FAQ Item, `aria-current` on Site Header's active link, dialog/drawer patterns) — not applied by default to every component.
- **Status communication:** Badge, Status/Notification Banner, and Timeline milestone states all pair color with icon and/or text — this is a hard requirement on those three components specifically, since they're the components most likely to be color-only if built carelessly.
- **Reduced motion:** Hero's entrance animation, FAQ Item's expand transition, and Mobile Navigation Drawer's open/close transition must all respect `prefers-reduced-motion`. Project-wide this is handled by `components/motion-provider.tsx` (`<MotionConfig reducedMotion="user">` in the root layout), which drops transform/layout animations while keeping opacity fades. **Do not gate markup on the `useReducedMotion()` hook** — the server has no media query and always resolves it `false`, so any structural branch on it (rendering element A vs. element B, or skipping a decorative child) hydration-mismatches for exactly the users it was meant to help. Use Tailwind's `motion-reduce:`/`motion-safe:` variants for anything that must change structurally, and confine the hook to post-mount effects. This was a real bug caught in Hero/EventGlance/Timeline, not a hypothetical.
- **Minimum interactive target:** Mobile Navigation Drawer items and any touch-oriented control use at least a 44px tap target on mobile, per `ui-rules.md`.

---

## Responsive Registry

| Component | Mobile | Tablet | Desktop |
|---|---|---|---|
| Site Header | Drawer trigger | Drawer trigger | Full horizontal nav |
| Mobile Navigation Drawer | Full-height panel | Full-height panel | Not rendered |
| Hero | Smallest heading step, stacked CTAs | Mid heading step | Full heading step, side-by-side CTAs |
| Page Header | No structural change | No structural change | No structural change |
| Prize Card / Prize Display | 1 column (header above waveform, accent column hidden) | 1 column, accent column hidden | Accent column revealed (≥1024px) — see Prize Display entry for why the header no longer uses the standard Page Header responsive rule |
| Timeline | Vertical | Vertical | Vertical (no desktop variant — see Timeline entry) |
| Form Field / Form Section | Full-width, single column | Single column | Single column, capped width |
| Table | Stacked cards or horizontal scroll (per column count) | Same rule | Full table |
| FAQ Item | No structural change | No structural change | No structural change |

Components not listed here (Button, Input, Badge, Card, Separator, Spinner, Dialog) do not change structurally across breakpoints — sizing follows the standard responsive spacing/typography scale from `ui-tokens.md`, but no layout logic differs.

---

## Token Dependencies

Every component's token dependencies fall into these categories — the actual values live in `ui-tokens.md`, not here:

- **Color** — surface, border, text, brand accent, and semantic tokens.
- **Typography** — font family, size, weight, and color pairing per element type.
- **Spacing** — the `space-*` scale for padding, gaps, and margins.
- **Radius** — the `radius-*` scale for corner treatment.
- **Border** — width and color tokens for dividers and outlines.
- **Effects** — glow, shadow, and overlay tokens, used only where `ui-rules.md` explicitly authorizes them for that component.
- **Responsive tokens** — breakpoint-driven behavior, referenced from `ui-tokens.md`'s Responsive Tokens and `ui-rules.md`'s Responsive Behavior section.

A component's registry entry lists *which* categories it depends on; it never restates the actual values.

---

## Component Decision Checklist

Before creating a new reusable component, ask:

1. Does an existing component already solve this?
2. Is the new pattern genuinely reused, or is this a one-off?
3. Can an existing component support it through an existing variant/state instead?
4. Does creating it introduce a duplicate abstraction (see Composition Rules)?
5. Is the component allowed by `tbd.md` — or does it silently assume a decision that's still Not Confirmed?
6. Does it follow `ui-rules.md`'s composition rules?
7. Does it use existing tokens only, with no new values?
8. Does it need to be added to this registry?

---

## Registry Maintenance

**When implementing a new reusable component:**
1. Check this registry first.
2. Reuse an existing component if it fits.
3. If a new component is genuinely required, implement it according to `ui-tokens.md` and `ui-rules.md`.
4. Add it to this registry with its purpose, states, variants, dependencies, and accessibility requirements.

**When changing an existing component:** update its registry entry if its behavior, variants, states, or responsibility materially changes.

**When removing a component:** update its status to Removed rather than deleting the entry.

**When a `tbd.md` decision becomes confirmed:** update `tbd.md` first, then update any other affected context file, and only then move the relevant Conditional Component entries here to Planned/Active as appropriate. Never resolve a TBD item by simply building or registering a component for it.

---

## Current Registry

| Component | Category | Status | Reusable responsibility | Routes/Areas |
|---|---|---|---|---|
| Button | Primitive | Active | Single interactive-action element | All routes |
| Input | Primitive | Active | Single-line text entry | `/register` |
| Textarea | Primitive | Active | Multi-line text entry | `/register` (if needed) |
| Select | Primitive | Active | Constrained-choice entry | `/register` (if needed) |
| Checkbox | Primitive | Active | Binary/multi-select entry | `/register` (if needed) |
| Radio | Primitive | Active | Single-choice entry | `/register` (if needed) |
| Badge | Primitive | Active | Inline status/label indicator | All routes |
| Card | Primitive | Active | Base bounded-content surface | All routes |
| Drawer | Primitive | Active | Slide-in overlay panel | Mobile nav |
| Spinner / Loading Indicator | Primitive | Active | In-progress async state | Buttons, forms |
| Separator | Primitive | Active | Visual divider | FAQ, Table |
| Dialog / Modal | Primitive | Active | Centered blocking overlay | None confirmed yet |
| Focus Treatment | Primitive (style) | Active | Shared focus-visibility style | All interactive elements |
| TextReveal | Primitive | Active | One-time fade+rise text entrance (word-stagger or block) | `/about` so far |
| Site Header | Composed | Planned | Persistent public navigation | All public routes |
| Mobile Navigation Drawer | Composed | Planned | Mobile-collapsed nav | All public routes |
| Page Backdrop | Composed | Active | Grid-texture-only page background (no aurora/glow) | All public routes except `/` |
| Page Header | Composed | Active | Standard non-hero page intro | `/timeline` only |
| Hero | Composed | Active | Homepage's single high-impact intro | `/` only |
| Event Glance | Composed | Active | Compact 3-fact homepage recap | `/` only |
| FAQ Item / FAQ Accordion | Composed | Planned | Expandable Q&A row | `/faq` |
| Timeline | Composed | Active | Confirmed-milestone sequence display | `/timeline` only |
| Prize Card | Composed | Active | Single rank-marker prize tier display, rising from the waveform (inlined in Prize Display) | `/prizes` only |
| Prize Display | Composed | Active | Full prize section, incl. bespoke two-column header | `/prizes` only |
| India Network Map / Global Network Globe | Composed | Active | Decorative dot/arc network illustrations, map + globe scale | `/about` only |
| Empty State | Composed | Planned | "Genuinely no data" state | Content-bearing routes |
| Pending Confirmation State | Composed | Active | "Awaiting organizer confirmation" state | `/challenges`, any route with `tbd.md` content |
| Approach Steps | Composed | Active | Numbered process sequence, connected-step layout | `/challenges` only |
| Form Field | Composed | Planned | Label + input + helper/error unit | `/register` |
| Form Section | Composed | Planned | Grouped Form Fields + submit | `/register` |
| Status / Notification Banner | Composed | Planned | Inline success/error/warning/info message | `/register` |
| Table | Composed | Planned | Structured tabular data display | Conditional (participant/admin) |
| Table Empty State | Composed | Planned | Empty Table body state | Conditional (participant/admin) |
| Public Information Page | Page Pattern | Planned | Header → content composition | `/about`, `/challenges`, `/rules`, `/faq` |
| Public Registration Page | Page Pattern | Planned | Header → form composition (shell only) | `/register` |
| Pending Information Section | Page Pattern | Active | Reusable placement of Pending Confirmation State | `/challenges`, any route with `tbd.md` content |
| Timeline Section | Page Pattern | Active | `PageBackdrop` → Page Header → Timeline | `/timeline` only |
| Prize Section | Page Pattern | Active | `PageBackdrop` → Prize Display (header built in) | `/prizes` only |
| Team components | Conditional | Conditional | — (see Conditional Components) | Conditional |
| Participant dashboard components | Conditional | Conditional | — (see Conditional Components) | Conditional |
| Submission components | Conditional | Conditional | — (see Conditional Components) | Conditional |
| Upload component | Conditional | Conditional | — (see Conditional Components) | Conditional |
| Admin data-management components | Conditional | Conditional | — (see Conditional Components) | Conditional |
| Authentication-specific UI | Conditional | Conditional | — (see Conditional Components) | Conditional |
| Participant status panels | Conditional | Conditional | — (see Conditional Components) | Conditional |
