# Decisions

This file is a running log of meaningful **implementation** decisions made while building Tech4Bharat 2026 — the kind of choice where multiple valid approaches existed and someone had to pick one. It does not duplicate `architecture.md`, `ui-tokens.md`, `ui-rules.md`, or `code-standards.md`, and it does not replace `tbd.md`. Those files remain authoritative for requirements, architecture, design, and unresolved product decisions.

**Log an entry here for things like:** a significant architectural change made mid-implementation, a meaningful third-party dependency choice (see `library-docs.md`'s own documentation rule for the dependency itself — log here if the *decision* was non-obvious), a choice that affects multiple parts of the codebase, or a call made to resolve an ambiguity that came up during coding.

**Do not log here:** routine coding choices with only one reasonable approach, anything already decided in another context file, or a new product/requirements decision — those belong in `tbd.md` (once confirmed) or the file that owns that kind of decision.

If a decision resolves an item in `tbd.md`, update `tbd.md` as part of the same change. If a decision changes something `architecture.md` describes, update `architecture.md` as part of the same change. This file records that the decision happened; it doesn't substitute for updating the file that owns it.

## Format

```
## DEC-XXX — [Decision title]
**Status:** Accepted | Superseded | Reverted
**Date:** YYYY-MM-DD
**Owner:** [person/agent]

**Decision:**
What was decided.

**Reason:**
Why this approach was chosen over the alternatives.

**Impact:**
What parts of the project are affected.
```

---

## Log

### DEC-001 — Tailwind v4 CSS-first theming, next/font wiring, and shadcn integration strategy
**Status:** Accepted
**Date:** 2026-09-06
**Owner:** Implementation agent (Phase 0 — Foundation)

**Decision:**
Four related calls made while writing `app/globals.css`/`app/layout.tsx` and running `shadcn init`/`shadcn add`:

1. **Tailwind v4 is CSS-first.** `ui-tokens.md`'s `tailwind.config.ts` excerpt was adapted into an `@theme inline` block in `app/globals.css` instead — no `tailwind.config.ts` file exists in this project. Every `--color-*`/`--radius-*`/`--font-*` theme key references the runtime `:root` variable (e.g. `--color-primary: hsl(var(--primary))`) rather than duplicating its value, and `ui-tokens.md`'s `space-*` scale was **not** given named Tailwind utilities — its values (4px/8px/12px/16px/24px/32px/48px/64px/96px) are exact matches for Tailwind's default numeric spacing scale (`p-1`/`p-2`/`p-3`/`p-4`/`p-6`/`p-8`/`p-12`/`p-16`/`p-24`), so the built-in utilities already are the token scale.
2. **Font variables are indirected, not literal.** `ui-tokens.md`'s `:root` block defines `--font-display`/`--font-body`/`--font-mono` as literal font-name fallback stacks (e.g. `'Sora', ui-sans-serif, ...`). Since Sora/Inter/JetBrains Mono are actually loaded via `next/font/google` in `app/layout.tsx` (for self-hosting/optimization, per the task), those three next/font instances were given their own variable names (`--font-sora`/`--font-inter`/`--font-jetbrains-mono`) applied to `<html>`, and `globals.css`'s `--font-display`/`--font-body`/`--font-mono` reference those via `var()` ahead of the same fallback stack, e.g. `--font-display: var(--font-sora), ui-sans-serif, system-ui, sans-serif;`. This was necessary — letting next/font define `--font-display` directly would collide with `:root`'s same-named declaration at equal CSS specificity, with the winner dependent on injection order rather than anything explicit.
3. **shadcn's own theme slots are aliased onto our tokens, not replaced.** `npx shadcn@latest init` (CLI v4.21, Next.js 16 / Tailwind v4) required picking a `--base` (chose `radix`, for its mature accessible-primitive behavior — focus trap, ARIA listbox/dialog patterns — over the newer `base`/`aria` options) and a `--preset` (chose `nova`, which only sets a default icon library — Lucide — and default font pairing, both of which are fully overridden by this project's own tokens/fonts). The CLI's generated components (`Select`, `Checkbox`, `Dialog`, `Card`, etc.) internally reference shadcn's conventional `--card`/`--popover`/`--secondary`/`--muted`/`--accent`/`--destructive`/`--input`/`--ring` slots, which `ui-tokens.md` has no equivalent names for. Rather than leave those unthemed (shadcn's own oklch defaults) or rewrite every internal Radix wiring path by hand, a second `@theme inline` block aliases each shadcn slot onto the nearest `ui-tokens.md` token (e.g. `--color-accent: hsl(var(--surface-tertiary))`, `--color-destructive: hsl(var(--error))`) — see `app/globals.css`. No new visual value was introduced; every alias resolves to an existing token. Primitive files were still restyled directly with the project's own token utility classes (`bg-surface-secondary`, `text-text-primary`, etc.) per `build-plan.md` Phase 1's "customize each immediately with token classes" instruction — the aliases exist as a safety net for internal Radix state classes (`aria-invalid:border-destructive`-style rules), not as the primary styling mechanism.
4. **`shadcn init`'s scaffolded light/dark theme was discarded, not merged.** The CLI's first run overwrote `globals.css`/`layout.tsx` with its own oklch light-mode `:root` block, a `.dark` class override, and a stray Geist font import (all appended after/around the hand-authored tokens, clobbering several of them in place — e.g. `--background`, `--primary`, `--border` were redefined mid-file with oklch values). This was fully reverted: the project ships **only** the single dark-navy palette from `ui-tokens.md`, with no `.dark` class, no `@custom-variant dark`, and no light-mode fallback, per `ui-tokens.md`/`ui-rules.md`'s explicit dark-mode-only design and `build-plan.md` Phase 0 Task 8. `tw-animate-css` and the `shadcn/tailwind.css` package import were kept — they supply the `data-open`/`data-closed`/`data-checked` custom variants and animation keyframes several Nova-preset Radix components (Select, Dialog, Sheet) use for open/close transitions, and are inert until a component's className actually references them.

**Reason:**
Each of these is a real fork in a legitimate direction with no single "obvious" answer, and future agents running `shadcn add <component>` again will hit the same CLI prompts/merge behavior — recording the reasoning here (rather than rediscovering it, or re-merging shadcn's scaffolded defaults back in) keeps the token system as the single source of truth per `ui-tokens.md` Invariant 11.

**Impact:**
`app/globals.css`, `app/layout.tsx`, `components.json`, and every file under `components/ui/`. Any future `shadcn add` for a new primitive should be expected to re-scaffold unthemed oklch tokens for slots it needs (`--chart-*`, `--sidebar-*`, etc.) — only add an alias for a slot an actually-used component references, following the same pattern as #3 above, rather than re-importing shadcn's full default palette.

---

### DEC-002 — Added `--error-hover`/`--error-active` tokens
**Status:** Accepted
**Date:** 2026-09-06
**Owner:** Implementation agent (Phase 1 — Button primitive)

**Decision:**
`ui-tokens.md` didn't define hover/active values for `error`, but `ui-rules.md`'s Buttons section requires a Destructive-variant hover/active treatment ("darken by one step (same relationship as `primary`→`primary-hover`)"). Rather than hardcode a one-off darkened value inside `components/ui/button.tsx`, `--error-hover: 356 72% 47%` and `--error-active: 356 72% 41%` were added to `ui-tokens.md`'s and `globals.css`'s token definitions, using the exact same lightness-delta pattern already established for `primary`/`primary-hover`/`primary-active` (-7%, -6%) and `ember`/`ember-hover` (-7%). `ui-tokens.md`'s Buttons row was updated to reference the new token names instead of the prose "darken 8%" description.

**Reason:**
`ui-tokens.md` Invariant 11 requires adding a needed value to the token system first rather than hardcoding it locally; extending an already-established formula (rather than picking a new arbitrary darkening amount) keeps the semantic-color family internally consistent with how `primary`/`ember` already scale.

**Impact:**
`context/ui-tokens.md`, `app/globals.css`, `components/ui/button.tsx` (Destructive variant).

---

### DEC-004 — Hero visual richness expanded beyond original Motion restraint
**Status:** Accepted
**Date:** 2026-09-06
**Owner:** Sam

**Decision:**
The original Motion section's restraint (no continuous/looping motion, no decorative elements, minimal glow) is relaxed specifically for visual richness and polish, per direct product decision — the site should be catchy and visually impressive, not just credible-and-restrained. The saffron/ember/navy color palette, Sora/Inter/JetBrains Mono typography, and overall professional tone remain locked and must not change. This does not authorize an unprofessional/playful aesthetic (bounce easing, neon colors, cluttered layouts) — richness within the existing palette and a premium tone, not a departure from it.

**Reason:**
Teacher/evaluator wants the UI to be visually rich and eye-catching; the original restraint was calibrated for a different priority.

**Impact:**
`ui-rules.md`'s Motion "Forbidden" list is no longer a hard limit for hero/landing-page visual treatment — still avoid generic AI-template clichés (purple gradients unrelated to our palette, italic serif hero text, cursor-follow glow) even while pushing richness.

---

### DEC-006 — Timeline and Prizes become standalone pages, not Landing sections; grid texture and one specific pulse extended to them
**Status:** Accepted
**Date:** 2026-09-07
**Owner:** Sam

**Decision:**
Three related changes, made together:

1. **Timeline and Prizes are removed from `/` entirely.** They exist only as their own dedicated pages (`/timeline`, `/prizes`), already reachable from the header nav. Landing keeps Hero + Event at a Glance (+ a closing CTA band, not yet built). The homepage versions built in the prior session (a compressed 3-column teaser strip for each) are superseded, not kept as a second "landing" variant — `components/public/timeline.tsx` was rewritten in place for its one remaining context (the dedicated page) rather than forked, and `components/public/prize-teaser.tsx` was deleted in favor of `components/public/prize-display.tsx`, which fulfills the already-registered "Prize Display" composed component (total pool + three Prize Cards) that the teaser never fully implemented (no total-pool stat, no podium emphasis).
2. **The circuit/grid texture (not the aurora/ignition-glow) is extended to `/timeline` and `/prizes`.** `ui-tokens.md`'s Visual Effects table and Invariant 12, and `ui-rules.md`'s Invariant 2, all previously scoped this to "the hero section" (Invariant 12 already had a narrower "Prizes bookend section" exception that predates this decision and referred to a homepage bookend, not the now-standalone page). Explicit product instruction this round: use the grid only, not the moving aurora/glow — "it should distract too much." Both files' wording is updated to name `/timeline`/`/prizes` directly instead of the retired bookend framing.
3. **Timeline's active-node pulse.** `ui-rules.md`'s Timeline section explicitly said "no pulsing/looping animation" on the active dot's glow. Per direct instruction this round, a live-pulse ring is added to the active milestone specifically. This is a narrower, more specific carve-out than DEC-004's general hero/landing relaxation — it targets one named restriction in one component — so it's logged separately here rather than assumed covered by DEC-004. The pulse is CSS-only (`@keyframes`, not a JS-driven loop) and gated by `motion-reduce:` so it stops entirely under reduced motion, consistent with Invariant 7's spirit even though the invariant's literal "no looping animation" is what's being carved out.
4. **Small functional phase icons on Timeline nodes** (registration/online-preliminaries/grand-finale), always paired with the node's text label, never standing alone. `ui-tokens.md`'s Visual Effects table lists "Decorative icons/illustrations: Not used... Everywhere" — these are framed as functional wayfinding (same category as the existing completed-state check icon `ui-rules.md` already sanctions), not decoration, but the row's wording is broadened slightly to record the exception rather than leave it silently contradicted.
5. **Timeline's responsive shape changes.** With no homepage-compressed context left to serve, the previously documented "vertical mobile/tablet, horizontal desktop" behavior is retired in favor of a single vertical layout at all breakpoints, sized and spaced for a real page rather than a homepage strip.

**Reason:**
The homepage was carrying three consecutive sections (Event at a Glance, Timeline, Prizes) with near-identical shape — a left heading plus a row of three cards — while `/timeline` and `/prizes` already existed as real, confirmed, nav-linked routes doing nothing. Every fact the Timeline/Prize teasers showed was already stated elsewhere on the page (Hero's stat strip, Event at a Glance) with better context (Timeline had status/sequence; Prizes had nothing extra at all). Moving them to their own pages removes the redundancy and gives each the "real page-level composition, room to breathe" a dedicated page deserves, rather than a cropped card row.

**Impact:**
`app/page.tsx` (Timeline/Prizes removed), `app/timeline/page.tsx` and `app/prizes/page.tsx` (new), `components/public/timeline.tsx` (rewritten), `components/public/prize-teaser.tsx` (deleted) → `components/public/prize-display.tsx` (new), `components/public/page-header.tsx` (new — fulfills the previously-Planned "Page Header" registry entry, now used by both new pages), `context/ui-rules.md` (Invariant 2, Timeline section's pulse line), `context/ui-tokens.md` (Visual Effects table's grid-texture row, Invariant 12, the decorative-icons row), `context/ui-registry.md` (Timeline/Prize Card/Prize Display/Page Header entries and the Responsive Registry).

---

### DEC-007 — A bespoke animated signature illustration for /prizes' 1st place, exclusively
**Status:** Accepted
**Date:** 2026-09-07
**Owner:** Sam

**Decision:**
A hand-built, animated wireframe gem/polyhedron icon is added above the 1st-place marker on `/prizes`, per direct reference images and an explicit request ("the big winning icon... if u can render it like that with a good animation"). This is a materially different kind of exception than DEC-006's Timeline phase icons: those were small, always paired with a text label, functioning as wayfinding. This is a large, purely decorative signature graphic with no textual pairing requirement — closer to the "illustration" `ui-tokens.md`'s Visual Effects table rules out than to an icon, so it doesn't fit under DEC-006's carve-out and needs its own entry rather than being read into it. The two earlier Prize Display iterations this session (a plain 3-card grid, then a boxed ascending-bar podium) are both retired, not kept as fallbacks — the second one was explicitly rejected as too dense, with too little whitespace, prompting this pass. Boxed/carded containers for the three tiers are dropped entirely in favor of floating dot-and-line markers at staggered heights with no background fill, which is most of what actually fixes the whitespace complaint — the gem is the specific enhancement on top of that fix, not a substitute for it.

The gem is drawn as inline SVG geometry (a hexagon "girdle" with a top and bottom apex, faceted with alternating crown/pavilion lines) using only `primary`/`border-muted` — no new hue. Rotation is a real CSS 3D transform (`perspective` + `rotateY` via `@keyframes`), not an image asset or a new animation library. Gated behind `motion-safe:`/`motion-reduce:` like every other continuous animation on the site; a static angled view ships for reduced-motion users rather than nothing.

**Reason:**
The prior podium redesign was rejected on direct, specific feedback (whitespace, wanting the "big icon" treatment specifically) — not a vague "try again," so the fix responds to the actual named complaints rather than iterating blindly on the rejected direction.

**Impact:**
`components/public/prize-display.tsx` (rewritten again), `app/globals.css` (`--animate-gem-spin` keyframe), `context/ui-tokens.md` (the decorative-icons/illustrations row gets a second, narrower carve-out), `context/ui-registry.md` (Prize Card/Prize Display entries). This does not authorize decorative illustration anywhere else in the product — it's scoped to this one element on this one page, same as DEC-006's icon carve-out was scoped to Timeline specifically.

---

### DEC-008 — `/prizes` gets a bespoke two-column hero-style header with a CTA, and the tier markers become literal isometric 3D blocks
**Status:** Accepted
**Date:** 2026-09-07
**Owner:** Sam

**Decision:**
Fourth Prize Display pass this session, against a direct reference image and the explicit instruction "recreate this EXACTLY... no compromises":

1. **`/prizes` no longer renders `PageHeader`.** In its place, `PrizeDisplay` now owns a bespoke two-column composition: left column carries the eyebrow ("Prize Pool"), an `h1` ("Rewarding what matters" — this exact wording was authored by the user directly in their request, not sourced from the reference image, so it is not treated as invented content), supporting copy, and a "Register Now" CTA button linking to `/register`; the right column holds the podium visual. `ui-rules.md`'s Page Headers section names this precise pattern as a drift signal ("If a page header starts to accumulate a CTA, a stat strip, or a background treatment, that's a sign it's drifting toward hero composition — reserved for the homepage"). This is a deliberate, named exception for `/prizes` specifically, made on explicit "exactly like the reference" instruction, not a silent violation — `PageHeader` remains the standard for every other non-homepage page and is now used only by `/timeline`.
2. **The three tiers are literal isometric 3D blocks**, not cards or floating dot markers (both prior iterations are superseded). Each block is real CSS 3D — a `preserve-3d` container with three child faces (front, top, side), each positioned so its own center coincides with the block's shared geometric pivot, then rotated and pushed outward via `translateZ` by half the block's size along that face's axis (the standard technique for building CSS-3D box faces from one shared pivot, rather than each face hinging from its own edge — the edge-hinge approach was tried first and produced an invisible or badly misplaced top face, confirmed by actual computed-style inspection and screenshots, not assumed). The whole podium group sits in a `perspective` + `rotateX`/`rotateY` tilted wrapper — critically, a **separate, non-animated** wrapper: Motion writes its entrance-rise as an inline `transform` style on whichever element it animates, which silently overwrites a Tailwind `transform` utility class placed on that same element (inline style beats any class), so the isometric tilt had to move to an inner div that Motion never touches. Face colors stay within existing tokens (`surface-secondary` front, `border-light`/`primary-light` top, `surface` side) — no new hue. 1st place additionally gets `border-primary` + `shadow-glow-primary`, matching the featured treatment used elsewhere. The DEC-007 wireframe gem carries over unchanged (same keyframe, same component), repositioned above the new 1st-place block.
3. **Two omissions from the reference, communicated to the user before building, not silently applied:** the vertical "BUILD / SOLVE / INNOVATE / IMPACT" tagline list is left out as invented positioning copy with no basis in `project-overview.md`/`tbd.md`; "See Prize Breakdown" (which doesn't function as a CTA on the page that already is the breakdown) is replaced with "Register Now", a real action.

**Reason:**
Direct, repeated "recreate this exactly" instruction against a specific reference, following three earlier rounds of iteration on this same section. The two content deviations are held to the project's standing "never invent hackathon information" rule even under an "exactly, no compromises" instruction, since that rule is about factual/promotional content, not visual layout — the visual language (two-column layout, isometric blocks, gem placement) is followed exactly as shown.

**Impact:**
`components/public/prize-display.tsx` (rewritten again — two-column layout, `PodiumBlock`, isometric face geometry), `app/prizes/page.tsx` (`PageHeader` usage removed), `context/ui-rules.md` (Page Headers section gets a named `/prizes` exception), `context/ui-registry.md` (Prize Card/Prize Display entries rewritten again; Page Header's "Relevant routes" narrowed to `/timeline` only). Does not authorize hero-style headers or CTAs on any other non-homepage page — scoped to `/prizes` alone, per this specific "exactly like the reference" instruction.

---

### DEC-009 — Isometric podium scrapped for a mountain-range waveform with three rising rank markers; DEC-007's gem retired
**Status:** Accepted
**Date:** 2026-09-08
**Owner:** Sam

**Decision:**
Fifth Prize Display pass this session. DEC-008's isometric-block podium is scrapped entirely — not iterated on — per direct instruction against a new reference image, replaced with:

1. **A mountain-range/waveform SVG silhouette** spanning the full width of the visual, built from a single hand-authored path with three distinct peaks (each separated by a valley, not one smooth hill) at x = 22%/50%/78% of the viewBox, using only `primary` (low-opacity fill gradient) and `border-light` (stroke) — no new hue.
2. **Three vertical rank markers** (label, amount, dot, connecting line), one rising from each peak. Each marker's line lands exactly on its peak — not floating above it with a gap — because each marker carries its own precomputed `peakBottom` offset (derived from the waveform SVG's fixed rendered height and that peak's y-coordinate in the viewBox), rather than all three sharing one positioning wrapper. 1st place is visually dominant via both the tallest line and the largest/glowing dot, matching the reference. Only placement + amount are shown under each marker — the reference's descriptive taglines ("Most impactful solution...", "Ideas with strong execution...") are invented judging-criteria framing with no basis in `tbd.md`, so they're omitted; placement and amount are the only facts honestly confirmed.
3. **Vertical accent text** on the right (desktop/`lg`+ only — hidden narrower, since it's purely atmospheric and doesn't fit a compressed layout), reading "Scalable / Innovations / Next-Gen / India" stacked via `writing-mode: vertical-rl`. This is `project-overview.md`'s confirmed theme string ("Scalable Innovations for Next-Gen India" — already used verbatim in Hero) split into its four words, not the reference image's own wording ("PEOPLE / IDEAS / TECHNOLOGY / A STRONGER BHARAT"), which is itself unconfirmed invented copy.
4. **The DEC-007 wireframe gem is retired**, not carried over. It floated specifically above the now-gone podium's 1st-place block; the new reference doesn't include an equivalent element, and nothing in this round's request asked for it to persist. `ui-tokens.md`'s decorative-icons/illustrations exception list loses its narrower (2) entry as a result — only the Timeline phase-icon exception (DEC-006) remains.
5. **Entrance animation, verified rather than assumed:** the waveform and marker group are plain `motion.div`s with no `whileInView` of their own — a single ancestor `motion.div` declares `initial="hidden" whileInView="show" viewport={{ once: true }}`, and Motion's variant propagation carries that state down to both children (and the marker group's individual markers below that), each applying its own transition. This guarantees one shared trigger point rather than two independently-observed viewport thresholds that could drift. Verified two ways: (a) sampling computed opacity of the waveform vs. the 1st-place marker across the first ~2s after scroll-into-view confirmed the waveform reaches full opacity (~400ms) well before the marker starts appearing (~700–900ms) — genuine sequencing, not simultaneous; (b) comparing computed opacity/transform immediately after the first reveal against two further scroll-away-and-back cycles (including one that scrolls well past the section first) showed byte-identical values every time — confirms the entrance truly fires once and does not replay.
6. **A real layout bug caught and fixed before shipping:** the first attempt sized the waveform/marker container with `min-h-[280px]`, far shorter than the 1st-place marker's actual rendered extent (peak offset + line + label/amount/dot stack, ≈415px). This didn't visibly break the 1440px screenshot (enough natural gap above absorbed the overflow) but did overlap the "Register Now" button at 375px, where the wrapped 2-line heading left less clearance. Found via computed `getBoundingClientRect()` inspection (not visual guesswork alone) and fixed by sizing the container to the marker's actual measured extent (`min-h-[440px] sm:min-h-[480px]`).

**Reason:**
Direct instruction to scrap the podium concept entirely and rebuild against a new reference, with explicit, itemized requirements (waveform construction, marker composition, no invented taglines, theme-derived accent text, one-time staggered entrance) rather than a vague "try again."

**Impact:**
`components/public/prize-display.tsx` (rewritten again — `Waveform`, `Marker`, theme-word accent column; `PrizeGem`/`PodiumBlock` removed), `context/ui-tokens.md` (decorative-icons/illustrations exception list loses its DEC-007 entry), `context/ui-registry.md` (Prize Card/Prize Display entries rewritten again), `context/progress-tracker.md`. Per the user's explicit instruction this round, spacing/CTA/nav-active-state fixes mentioned as still pending are deliberately **not** addressed in this pass — this decision covers only the visual-direction rebuild.

---

### DEC-010 — Grid/circuit texture becomes a site-wide default background, not a Hero/Timeline/Prizes-only treatment; two bespoke network-graphic visuals added to `/about`
**Status:** Accepted
**Date:** 2026-09-09
**Owner:** Sam

**Decision:**
Two related changes, made together per direct instruction:

1. **`PageBackdrop`'s circuit/grid texture (no aurora/glow) is now the default background for every page**, not a narrow exception scoped to `/timeline` and `/prizes`. DEC-006 introduced the grid as a carve-out for those two pages specifically, with `ui-tokens.md`'s Visual Effects table and `ui-rules.md`'s equivalent row explicitly naming "Rules, FAQ, forms" as places the texture must NOT appear. That restriction is superseded here, not merely narrowed further — the texture becomes the site's standard page-level backdrop, and `PageBackdrop` is now expected to wrap every route's content rather than being an opt-in per page. This is recorded as its own entry rather than an amendment to DEC-006 so the history of "why" is preserved: DEC-006's original reasoning (grid = hero-adjacent spectacle, kept off text-heavy pages) is the thing being overturned, not extended.
2. **Two bespoke "network graphic" visuals are added to `/about`**, per a direct reference image: `components/public/network-graphic.tsx` exports `IndiaNetworkMap` (used in the "What is Tech4Bharat" section) and `GlobalNetworkGlobe` (used in the GAVS 2026 section), sharing common `NetworkDot`/`NetworkArc` pieces so both read as one consistent visual system at two scales — a stylized/simplified India outline zooming out to a wireframe globe — rather than two unrelated graphics. Per DEC-006/DEC-007's precedent, hand-authored decorative SVG illustration is otherwise not used in this product; this is a further named exception, scoped to these two specific elements on `/about` only, not a general license. Neither map is cartographically precise — both are stylized silhouettes, the same creative latitude already taken for Prize Display's mountain waveform (DEC-009).

   The India map's dots sit at approximate positions for Delhi, Mumbai, Kolkata, Chennai, and Bengaluru, with connecting arcs from each to Bengaluru specifically — Bengaluru is the one city-level location actually confirmed in `tbd.md` (the grand-finale city), so it's treated as the visual "hub" the arcs converge on. No venue name, city label, or claim about these cities' role in the hackathon is rendered as text — the map is decorative geography, not an assertion of fact. The globe reuses the same dot/arc/glow language at a "zoomed out" scale, radiating from a single India-position dot, evoking GAVS's global framing without asserting anything about specific countries or partners not confirmed anywhere.

   Both graphics use only `primary`/`border-light`/`ember` at existing opacities — no new hue. Entrance is a one-time reveal (fade+rise for the whole graphic, then a staggered dot pop-in, then a staggered arc fade-in — each stage using the same `motion.div`-with-propagated-variants technique verified for Prize Display's waveform/markers in DEC-009, not independently observed viewport triggers). A literal `pathLength`/stroke-draw animation for the arcs was deliberately not used: Motion's `reducedMotion="user"` config (this project's one accessibility mechanism for continuous/entrance motion) is documented to cover transform and opacity animations, not SVG `pathLength`, and introducing an animation type outside that already-verified-safe mechanism was judged not worth the accessibility risk for a purely decorative flourish — a staggered opacity fade-in on the arcs reads as "connections lighting up in sequence," which satisfies the spirit of "draw-in" without the gap.

**Reason:**
Direct instruction: the grid texture "should be the whole site's background," not something each page re-decides, and the About page's reference image called for a specific, cohesive network-graphic visual system spanning both its map-scale and globe-scale sections.

**Impact:**
`context/ui-tokens.md` (Visual Effects table's grid-texture row rewritten — no longer names Rules/FAQ/forms as an exclusion), `context/ui-rules.md` (the equivalent row and Invariant 2's hero-only framing updated), `context/ui-registry.md` (`PageBackdrop`'s "Relevant routes" updated to all public routes; new `IndiaNetworkMap`/`GlobalNetworkGlobe` entries), `app/about/page.tsx` (wrapped in `PageBackdrop`; two sections restructured to hold the new visuals), `components/public/network-graphic.tsx` (new). Applying `PageBackdrop` to `/challenges`, `/faq`, `/register`, `/rules` is covered by this same decision but tracked as a separate, immediately-following implementation step per the user's request to review `/about` first.

---

### DEC-011 — India outline replaced with real geographic data (react-simple-maps + d3-geo + topojson-client + world-atlas), after the hand-authored version was flagged as geographically wrong
**Status:** Accepted
**Date:** 2026-09-09
**Owner:** Sam

**Decision:**
DEC-010's `IndiaNetworkMap` shipped with a hand-authored SVG path meant to evoke India's outline — a stylized-silhouette approach with real precedent in this codebase (Prize Display's mountain waveform, DEC-009). Direct correction: the shape didn't actually resemble India and read as invented rather than stylized. Per explicit instruction, the outline (and the globe's landmass, for the same reason) is now sourced from real boundary data rather than freehand-drawn from memory:

1. **New dependencies**: `react-simple-maps`, `d3-geo`, `topojson-client`, `world-atlas` (plus their `@types/*` packages). `world-atlas` ships pre-built TopoJSON — `countries-50m.json` (all countries, ISO-numeric-keyed) and `land-110m.json` (merged world landmass) — extracted via `topojson-client`'s `feature()`.
2. **The extraction happens server-side, in `lib/geo.ts`** (`getIndiaFeature()`, `getWorldLandFeature()`), not inside the "use client" `network-graphic.tsx`. `countries-50m.json` is ~750KB; importing it directly into a client component would bundle the entire world's country data to every visitor for the sake of rendering one country. `app/about/page.tsx` (a Server Component) calls these functions and passes only the small resulting `Feature` objects as props — confirmed empirically, not assumed, by grepping the built `.next/static/chunks/*.js` output for a distinctive string ("Afghanistan") that would only be present if the raw world data had leaked into client JS; it wasn't found.
3. **Rendering uses `react-simple-maps`' actual components** (`ComposableMap`, `Geographies`, `Geography`, `Sphere`, `Graticule`), not a hand-rolled path built from the extracted GeoJSON. Getting this right required reading react-simple-maps' own source (`node_modules/react-simple-maps/dist/core/index.cjs.js`) rather than assuming its API from memory: passing a `projection` *string* (e.g. `"geoMercator"`) routes through react-simple-maps' own translate/rotate/scale wiring, which has no way to reach `d3-geo`'s `.fitSize()` (needed to center/scale the India map to its own bounding box) or `.clipAngle()` (needed on the globe to hide back-hemisphere geometry) — passing a *projection instance* instead bypasses that wiring entirely and is used as-is, which is what both `IndiaNetworkMap` and `GlobalNetworkGlobe` now do. Also discovered from source, not docs: `Geographies`' `geography` prop must receive an array of Features (`[feature]`), not a bare `Feature` — passing one directly hits a `.map()` call on a non-array internally and throws.
4. **The globe now renders the real world landmass** via `geoOrthographic()` rotated to center India (`rotate: [-82, -21, 0]`), with `react-simple-maps`' own `<Sphere>` (outline) and `<Graticule>` (real curved lat/long lines, not the hand-drawn squashed ellipses from the first version) — both automatically respect the projection's `.clipAngle(90)`, so the far hemisphere doesn't render distorted geometry.
5. **`NetworkDot`/`NetworkArc` and the whole entrance-animation system are unchanged** — per explicit instruction ("those were fine"), only the outline/landmass source was replaced. City/globe-point coordinates changed from hand-picked pixel positions to real `[longitude, latitude]` pairs (Delhi, Mumbai, Kolkata, Chennai, Bengaluru for the map; London, Dubai, Singapore, Tokyo for the globe — chosen only for being visible from the chosen orthographic rotation), projected through the real projection instance via `Geographies`' render-prop `projection` function rather than hardcoded.

**Reason:**
A hand-invented country silhouette is a factual-accuracy problem, not a stylistic one — unlike the mountain waveform (which was never claiming to be a real place), an "India map" that doesn't look like India undermines the one thing the graphic is supposed to communicate. Direct correction, fixed with real data rather than a closer freehand attempt.

**Impact:**
`lib/geo.ts` (new), `components/public/network-graphic.tsx` (rewritten — real projections replace hand-authored path/coordinate constants), `app/about/page.tsx` (now calls `getIndiaFeature()`/`getWorldLandFeature()` and passes them as props), `package.json`/`package-lock.json` (four new runtime dependencies, three new `@types/*` dev dependencies), `context/library-docs.md` (new adopted-library entry), `context/ui-registry.md` (India Network Map / Global Network Globe entry updated to describe the real-data implementation).

---

### DEC-012 — `TextReveal`: the Hero/Timeline text-entrance pattern extracted into a single reusable primitive
**Status:** Accepted
**Date:** 2026-09-09
**Owner:** Sam

**Decision:**
Hero (`components/public/hero.tsx`) and Timeline (`components/public/timeline.tsx`) each independently hand-rolled the same fade+rise scroll-entrance pattern for their text — same `EASE_OUT` cubic-bezier (`[0.22, 1, 0.36, 1]`), same 0.6s per-element duration, staggering in the same ~0.08–0.16s neighborhood (Hero: `staggerChildren: 0.09`/`delayChildren: 0.08`; Timeline: `0.16`/`0.1`) — confirmed by reading both files rather than assumed. Per direct instruction, this is extracted into one reusable component, `components/ui/text-reveal.tsx`, rather than left duplicated a third time on `/about`.

`TextReveal` adds one capability Hero/Timeline didn't have: per-word staggering (`split="word"`) for headings, on top of the existing whole-block fade+rise (`split="none"`, the default) for paragraphs — one component serves both, per explicit instruction not to build two. `as` is restricted to a small set of tags (`div`/`span`/`p`/`h1`–`h4`) resolved via a static object lookup of Motion's own pre-built `motion.h1`/`motion.div`/etc. — an earlier attempt used `motion.create(as)` called inside the component body to support an arbitrary `as` prop, which ESLint's `react-hooks/static-components` rule correctly flagged: creating a component during render resets its internal state on every re-render. The static lookup avoids the anti-pattern entirely since nothing is created at render time, only selected from already-stable references.

`once: true` on the `whileInView` trigger is hardcoded, not exposed as a configurable prop — deliberately, given how many times a replaying/scroll-linked entrance has been a real bug this session (Timeline's spine was originally continuously `useScroll`-linked; Prize Display's waveform/markers and the About page's network graphics both needed explicit post-hoc verification their entrances don't replay). Verified for `TextReveal` itself on its first real usage, not assumed safe by extension: computed per-word opacity sampled at short intervals after a fresh load showed genuine staggering (not simultaneous), and computed opacity/transform for both a word-split heading and a block paragraph came back byte-identical across two scroll-away-and-back cycles (including one scrolling past the whole page first) compared against their state immediately after first reveal.

Applied to `/about`'s headings and key text blocks (the hero intro, "What is Tech4Bharat", the theme statement, and the GAVS section) as the first real usage. Hero and Timeline's own existing implementations were **not** retrofitted onto `TextReveal` this round — they already work correctly, and the ask was to extract the pattern and prove it on new usage, not refactor every existing usage in the same pass. Whether to retrofit them, plus Challenges/FAQ/Register/Rules, is an open scoping question — see `context/progress-tracker.md`.

**Reason:**
Two independent hand-rolled copies of the same animation pattern is exactly the kind of duplication `code-standards.md` asks to avoid once a pattern repeats; a third copy on `/about` would have made that worse rather than better.

**Impact:**
`components/ui/text-reveal.tsx` (new), `app/about/page.tsx` (headings/paragraphs now use `TextReveal`), `context/ui-registry.md` (new Primitive Components entry). Does not change `components/public/hero.tsx` or `components/public/timeline.tsx` — both are unmodified.

---

### DEC-013 — `/challenges` redesigned: grid backdrop, `TextReveal`, a connected-step approach sequence, and the first real `Pending Confirmation State`
**Status:** Accepted
**Date:** 2026-09-09
**Owner:** Sam

**Decision:**
`/challenges` (previously a plain flat-navy page with a one-off "Coming Soon" card, built by the teammate) is rebuilt against several direct reference images, with one explicit exclusion:

1. **The four-sector icon-card layout from two of the references (Sustainable Development / Inclusive Growth / Education & Skills / Healthcare Access) is not used, anywhere.** Both "Problem statements" and "Challenge tracks" are listed Not Confirmed in `tbd.md`; naming specific sectors would be inventing challenge categories that don't exist yet, not a styling choice. This was flagged as off-limits before building, not discovered after the fact.
2. **In its place, a numbered "approach" sequence** (`components/public/approach-steps.tsx`) — Understand → Ideate → Build → Create Impact — describing the process every team follows, not a set of problem categories. Built as the connected-step variant (numbered circles + a one-time-drawn connecting line) rather than the plain unconnected list, per direct instruction and DEC-004's visual-richness allowance; collapses to an unconnected vertical stack below `md`, where a horizontal connector doesn't compress well.
3. **`PageBackdrop` (the grid texture, DEC-010) and `TextReveal` (DEC-012)** are both applied here — the grid as this round's next step in DEC-010's site-wide rollout, `TextReveal` on the hero eyebrow/heading/paragraph and the approach section's heading/copy, its second real usage after `/about`.
4. **`Pending Confirmation State` gets its first actual implementation** (`components/public/pending-confirmation-state.tsx`), replacing the page's old hand-rolled "Coming Soon" card. It was registered in `ui-registry.md`/`ui-rules.md` with a specific spec (dashed `border-muted`/`surface-muted` card + `warning` Badge reading "Pending confirmation" + heading + one sentence) but had no code — this builds exactly that spec rather than continuing the one-off card or inventing a new pattern. The existing accurate copy ("Official Challenge Statements... will be published once officially confirmed by the Tech4Bharat 2026 organizers") is preserved essentially verbatim, per instruction, as the `heading`/`message` passed in.
5. **A closing tagline strip** ("Real Problems. Real Solutions.") was added for visual richness, matching a treatment shown in the connected-step reference — generic, makes no claim about tracks, judging, or categories.

**Reason:**
Direct instruction to redesign the page against specific references, with an explicit, named exclusion (the sector cards) called out before implementation rather than caught in review.

**Impact:**
`app/challenges/page.tsx` (rewritten), `components/public/approach-steps.tsx` (new), `components/public/pending-confirmation-state.tsx` (new — the first real "Pending Confirmation State"), `context/ui-registry.md` (Pending Confirmation State and Pending Information Section flipped Planned → Active; new Approach Steps entry; `TextReveal`'s relevant-routes note updated). Does not touch FAQ/Register/Rules — those remain open per DEC-010/DEC-012's tracked-separately notes.

---

### DEC-014 — `/rules` redesigned: a 3x2 `IconCard` grid, plus the first real `IconCard` and `Status/Notification Banner`
**Status:** Accepted
**Date:** 2026-09-09
**Owner:** Sam

**Decision:**
`/rules` (previously flat-navy with a plain numbered-card grid, built by the teammate) is rebuilt against a direct reference image, with two components getting their first real implementation along the way:

1. **A correction before building, not silently worked around:** the request asked to "reuse the existing `IconCard` component from About/Challenges" — no such component existed anywhere in the codebase or `ui-registry.md` (confirmed by grepping the repo before writing any code, not assumed). Flagged, then built fresh as `components/ui/icon-card.tsx` (a small Card-based icon + title + description composition) rather than either silently inventing one under a false "it already existed" premise or stalling the whole task on the naming mix-up.
2. **`IconCard` powers `/rules`' 3x2 grid** — one icon per rule (`ClipboardCheck`/Eligibility, `Users`/Team Participation, `Lightbulb`/Original Work, `Shield`/Code of Conduct, `Upload`/Submission Requirements, `Gavel`/Organizer Decisions), each icon functionally paired with its rule's text title, never standing alone — same category as Timeline's phase icons (DEC-006), not a new decorative-icon exception. All six rules' copy, and the closing notice's copy, is unchanged from the previous version — only the visual presentation changed, per explicit instruction not to touch the substance (already correctly hedged against `tbd.md`'s unconfirmed eligibility/team-structure/submission details).
3. **No timeline/connected-step/numbered-sequence motif here**, per explicit instruction — these six rules are categorical (parallel, unordered), not chronological, and that shape is already `/timeline`'s and Challenges' `ApproachSteps`' visual identity. `/rules` deliberately looks different: a plain grid, no connecting line, no numbering.
4. **A real build error, caught and fixed before shipping:** the first attempt defined the six rules (icon components included) in the server-rendered `app/rules/page.tsx` and passed them as props into the "use client" grid component. The production build failed — Lucide icon components are functions, and React can't serialize a function across the Server → Client Component prop boundary. Fixed by moving the rule data (including the icon imports) inside the "use client" `components/public/rules-grid.tsx` itself, the same pattern Timeline's own `MILESTONES` array (also icon-bearing) already uses for the identical reason.
5. **`components/public/notification-banner.tsx`** is the first real implementation of the "Status / Notification Banner" registry entry (previously spec-only, confirmed use limited to `/register`'s not-yet-built form success state) — built to the existing spec (icon + short message on a semantic `-light` background, `role="alert"`/`aria-live` per variant) and used here in `warning` variant for "Official Guidelines May Be Updated," which the registry entry's own "other routes only once a concrete need exists" line already anticipated.

**Reason:**
Direct instruction to redesign against a specific reference, reusing (or, once the premise was checked and found false, freshly building) a shared icon-card pattern rather than a bespoke one-off, and to keep `/rules` visually distinct from the two sequence-shaped pages already in the product.

**Impact:**
`app/rules/page.tsx` (rewritten), `components/ui/icon-card.tsx` (new), `components/public/rules-grid.tsx` (new), `components/public/notification-banner.tsx` (new), `context/ui-registry.md` (new IconCard entry; Status/Notification Banner flipped Planned → Active; `TextReveal`'s and `PageHeader`'s relevant-routes notes updated). Does not touch FAQ/Register.
