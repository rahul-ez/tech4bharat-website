# Library Documentation

## 1. Purpose

This file records which libraries are actually adopted in the Tech4Bharat 2026 codebase and gives lightweight, practical guidance for introducing new ones. It is **not a whitelist** — developers and coding agents have reasonable freedom to bring in a third-party library when it offers a clear technical, UX, accessibility, performance, or maintainability benefit. This file exists so that freedom doesn't turn into dependency sprawl or undocumented choices, not to gatekeep every addition.

This file is subordinate to `architecture.md`, `tbd.md`, `ui-tokens.md`, `ui-rules.md`, and `code-standards.md`. It never overrides a boundary, decision, or convention defined there — it only documents library-level detail those files don't cover. For version-specific API behavior, the official documentation for the installed version is always the authority, not this file.

---

## 2. Current Stack (Adopted)

These are actually in use, per `architecture.md`:

| Library / Technology | Purpose | Docs |
|---|---|---|
| Next.js (App Router) | Framework, routing, rendering | nextjs.org/docs |
| React | UI library | react.dev |
| TypeScript (strict) | Type safety | typescriptlang.org/docs |
| Tailwind CSS v4 | Styling, consumes `ui-tokens.md`'s tokens via a CSS-first `@theme inline` block in `app/globals.css` (no `tailwind.config.ts` — see `context/decisions.md` DEC-001) | tailwindcss.com/docs |
| shadcn/ui (CLI v4.21, `radix` base, `nova` preset) | UI primitive source (`components/ui`); primitives are restyled with project tokens immediately after being added, per `build-plan.md` Phase 1 | ui.shadcn.com/docs |
| radix-ui | Accessible unstyled primitive behavior (focus trap, ARIA dialog/listbox/checkbox patterns) underlying every `components/ui/*` primitive that needs it (Select, Checkbox, RadioGroup, Dialog, Sheet, Separator) | radix-ui.com/primitives/docs |
| class-variance-authority | Typed variant classnames for primitives with a `variant` prop (Button, Badge, Card) | cva.style |
| cn | Classname merging (clsx + tailwind-merge, in one package); `lib/utils.ts` re-exports it as `cn` | npmjs.com/package/cn |
| lucide-react | Icon set for functional icons (chevrons, check, close, spinner) — status is still always paired with text/color per `ui-rules.md`, icons are never decoration | lucide.dev |
| tw-animate-css | Tailwind-consumable open/close animation keyframes used by Select/Dialog/Sheet's Radix transitions | github.com/Wombosvideo/tw-animate-css |
| motion (Framer Motion) | Entrance/scroll-triggered animation on the Hero and Event at a Glance sections (`components/public/hero.tsx`, `components/public/event-glance.tsx`) and the springs behind `NumberTicker`/`BorderBeam`. Continuous/decorative motion is authorized for landing-page treatment by `context/decisions.md` DEC-004; every animated component respects `prefers-reduced-motion`. | motion.dev |
| Aceternity UI / Magic UI components (`components/ui/aurora-background.tsx`, `animated-grid-pattern.tsx`, `border-beam.tsx`, `number-ticker.tsx`) | Installed via `npx shadcn add <registry-url>` (21st.dev required auth this session didn't have — confirmed by actually running the command, not assumed; public Aceternity/Magic UI registries used instead) then substantially re-themed: every hardcoded hue (blue/indigo/violet, orange/purple) replaced with `primary`/`ember`, `next-themes`'s light/dark branching removed (dark-mode-only, DEC-001), `number-ticker`'s locale fixed to `en-IN` for Indian digit grouping. See the attribution comment at the top of each file for exactly what changed. | ui.aceternity.com/docs, magicui.design/docs |
| Supabase | Database (Postgres), Auth, Storage | supabase.com/docs |
| Zod | Validation (`lib/validation`) | zod.dev |
| Vercel | Hosting/deployment | vercel.com/docs |
| GitHub | Version control | — |

**Conditional — adopted in principle, not yet built**, pending the `tbd.md` decision noted:

| Library / Technology | Purpose | Gated on |
|---|---|---|
| Supabase Storage | File storage for submissions | `tbd.md` — Submission decision |
| Resend | Transactional email | `tbd.md` — Email/Notifications decision |
| PostHog | Analytics | `tbd.md` — Analytics decision |

**Not yet selected:** a testing framework. Don't assume one — see `code-standards.md` Section 19.

Nothing outside these tables is currently installed. That doesn't mean other libraries are forbidden — it means nothing else has been needed yet.

---

## 3. Dependency Guidelines

- Reuse what's already adopted before reaching for something new — check Section 2 first.
- Adding a library is reasonable when it provides a real, statable benefit (a genuinely hard problem it solves, meaningful accessibility or performance win, significantly better maintainability) — it doesn't require exhausting every native alternative first, just a clear reason.
- Avoid two libraries that solve the same problem (e.g. a second date/form/animation library once one is adopted).
- Check compatibility before adding: does it work with React Server Components / the App Router's server-client boundary (per `architecture.md`)? Does it work with strict TypeScript? Can it be styled through the token system in `ui-tokens.md`/`ui-rules.md` rather than bringing its own visual system?
- Prefer actively maintained, reasonably popular packages over obscure or unmaintained ones — bus factor and long-term maintainability matter for a project other agents will keep working on.
- Weight bundle size and runtime cost, especially for anything that would ship to the client.
- Don't add a library for a one-off convenience that a few lines of native code already handles.

---

## 4. Process for Introducing a New Dependency

1. Confirm the existing stack (Section 2) doesn't already solve the problem.
2. Check that the candidate library fits `architecture.md`'s boundaries and `code-standards.md`'s conventions (Section 3 above).
3. Pick a specific, well-justified library — not the first search result.
4. Install it and use it for the task at hand.
5. Add it to Section 2's table (Adopted, or Conditional if it's tied to an unresolved `tbd.md` decision) as part of the same change.
6. If it changes how a whole category of work is done (e.g. a new data-fetching pattern), note that in `architecture.md` or `library-docs.md` as appropriate — don't let the convention live only in one PR's memory.

This process is intentionally light. It exists to keep this file accurate, not to slow down reasonable technical decisions.

---

## 5. Rules for Documenting Dependency Decisions

- Every dependency that ends up in `package.json` should have a corresponding row in Section 2 — no undocumented dependencies.
- Each entry needs a one-line purpose — enough for the next agent to know why it's there without re-deriving it from usage.
- When a dependency is removed, remove its row rather than leaving a stale entry.
- When a Conditional dependency's gating decision in `tbd.md` is confirmed, move it from the Conditional table to the Adopted table as part of that same update.
- Trivial dev-only tooling (formatters, linters already implied by standard Next.js/TypeScript setup) doesn't need its own row unless it's a non-obvious or project-specific choice worth flagging.
- This file tracks *what's adopted and why*, not a running changelog of every version bump — routine updates don't need an entry here.
