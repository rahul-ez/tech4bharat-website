# Progress Tracker

## 1. Current Project State

**Phase 0 (Foundation) is functionally complete and Phase 1 (Design System)'s Primitive Component layer is implemented.** The Next.js App Router project (TypeScript strict, Tailwind CSS v4) is scaffolded and runs; `app/globals.css` carries the complete token set from `ui-tokens.md` (plus two additions — `--error-hover`/`--error-active`, see `decisions.md` DEC-002) via a Tailwind v4 `@theme inline` block (see `decisions.md` DEC-001 for why this replaces `ui-tokens.md`'s `tailwind.config.ts` excerpt); Sora/Inter/JetBrains Mono are loaded via `next/font/google` in the root layout; and every Primitive Component in `ui-registry.md` (Button, Input, Textarea, Select, Checkbox, Radio, Badge, Card, Drawer, Spinner, Separator, Dialog/Modal, Focus Treatment) is implemented in `components/ui/` on top of shadcn/ui + Radix, restyled to the project's own tokens. A temporary `/dev/components` review route renders every primitive/variant/state for visual QA against `ui-tokens.md`'s tables. No Composed Component, Page-Level Pattern, or public page exists yet — Phase 1's remaining tasks (composed components) and all of Phase 2 are still ahead.

- **Current development phase:** Phase 0 (Foundation) — functionally done; Phase 1 (Design System) — Primitive Component layer done, Composed Components not started.
- **Is the project runnable?** Yes — `npm run dev` serves `/` and the internal `/dev/components` review route; `npm run build` and `npm run lint` both pass cleanly.
- **Is the public website implemented?** No — `/` is still a placeholder pointing at the component-review route; none of the seven public pages exist.
- **Does backend functionality exist?** No — no Supabase project has been provisioned or referenced as actually created.
- **Does participant functionality exist?** No — also Conditional per `tbd.md`, so this is expected at this stage regardless.
- **Does admin functionality exist?** No — also Conditional per `tbd.md`.
- **Major blockers:** None technical — the project simply hasn't begun implementation. The main non-technical time pressure is that registration is scheduled to open 7 September 2026 per `tbd.md`'s Confirmed table, and Phase 0 has not started.

---

## 2. Phase Status

| Phase | Status | Completion | Notes |
|---|---|---|---|
| 0 — Foundation | Functionally Complete | Project scaffold, tokens, fonts, folder structure done. `config/site.ts` and Supabase env setup not yet done. | See Section 3 |
| 1 — Design System | In Progress | Primitive Components (13/13) Active; Composed Components (Site Header, Hero, Timeline, Prize Card, etc.) Not Started | See Section 4 |
| 2 — Public Website | Not Started | None | Depends on Phase 1 |
| 3 — Registration Entry | Not Started | None | Depends on Phase 1–2; also depends on `tbd.md`'s Registration decision for full scope |
| 4 — Participant Experience | Conditional | None | Gated on `tbd.md` decisions (Team Structure, Participant Experience, Submission) |
| 5 — Backend & Integrations | Not Started | None | Depends on Phase 0/3 |
| 6 — Admin | Conditional | None | Gated on `tbd.md`'s HackCulture Integration and Admin decisions |
| 7 — QA & Launch | Not Started | None | Depends on all shipped phases |

---

## 3. Foundation

| Item | Status | Evidence / Location | Notes |
|---|---|---|---|
| Next.js setup | Done | `package.json` (Next.js 16.3.4, App Router), `app/` | Scaffolded via Create Next App, then built on |
| TypeScript | Done | `tsconfig.json` (strict mode) | `npx tsc --noEmit` passes with zero errors |
| Tailwind CSS | Done | `app/globals.css` (Tailwind v4, CSS-first — no `tailwind.config.ts` by design, see `decisions.md` DEC-001) | Full token set + `@theme inline` mapping in place |
| shadcn/ui | Done (Primitives only) | `components.json` (`radix` base, `nova` preset), `components/ui/*` | Button/Input/Textarea/Select/Checkbox/Radio/Badge/Card/Separator/Dialog/Sheet/Spinner all added and restyled to project tokens |
| Project folder structure | Partial | `app/`, `components/ui/`, `lib/` exist | `components/public`, `lib/db`, `lib/validation`, `actions/`, `types/`, `config/` from `architecture.md`'s tree not yet created — no page/data work has needed them yet |
| Configuration (`config/site.ts`) | Not Started | None | Still queued — Section 14 |
| Environment setup | Not Started | None | No `.env.local` or Vercel env vars configured |
| Supabase setup | Not Started | None | No Supabase project referenced as provisioned |
| Shared utilities (`lib/utils.ts`) | Done | `lib/utils.ts` (re-exports `cn` from the `cn` package) | |
| Middleware (`middleware.ts`) | Not Started | None | Not yet created; note Next.js 16 renames this file to `proxy.ts` when it's eventually added — see `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` |
| Error/loading foundations | Not Started | None | No `loading.tsx`/`error.tsx` exist |

---

## 4. Design System

Cross-referenced against `ui-registry.md`'s Current Registry — every entry there is still Planned, not Active, because nothing has been implemented.

| Item | Status | Evidence / Location | Notes |
|---|---|---|---|
| Global design tokens (`globals.css`) | Done | `app/globals.css` | Full `:root` block from `ui-tokens.md` plus `--error-hover`/`--error-active` (DEC-002) |
| Typography (font loading) | Done | `app/layout.tsx` | Sora/Inter/JetBrains Mono via `next/font/google`, wired to `--font-display`/`--font-body`/`--font-mono` (DEC-001) |
| Color system (Tailwind mapping) | Done | `app/globals.css` `@theme inline` blocks | CSS-first Tailwind v4 mapping, not a `tailwind.config.ts` — see DEC-001 |
| Spacing | Done (no action needed) | — | `ui-tokens.md`'s `space-*` scale is an exact match for Tailwind's default numeric spacing scale — no custom mapping required, per DEC-001 |
| Button | Active | `components/ui/button.tsx` | Primary/Secondary/Ghost/Destructive + loading (via Spinner) |
| Input / Textarea / Select / Checkbox / Radio | Active | `components/ui/{input,textarea,select,checkbox,radio-group}.tsx` | Select/Checkbox/Radio built on Radix for full ARIA compliance |
| Card | Active | `components/ui/card.tsx` | Standard/Interactive/Featured/Informational/Status variants |
| Badge | Active | `components/ui/badge.tsx` | Default/Success/Warning/Error/Informational/Live |
| Dialog/Modal | Active | `components/ui/dialog.tsx` | Built ahead of a confirmed use case at explicit request — see `ui-registry.md`'s note |
| Drawer / Spinner / Separator | Active | `components/ui/{sheet,spinner,separator}.tsx` | Sheet = the registered Drawer |
| Site Header / Mobile Navigation Drawer | Not Started | None | Registered Planned — Composed Component, not yet built. Landing currently uses the temporary `components/layout/header.tsx` placeholder instead (see its own Avoid-list note below) |
| Page Backdrop | Active | `components/public/page-backdrop.tsx` | Grid-texture-only page background, `/timeline`/`/prizes` only — see `context/decisions.md` DEC-006 |
| Page Header | Active | `components/public/page-header.tsx` | Used by `/timeline` only — `/prizes` has its own bespoke header now, see DEC-008 |
| Hero | Active | `components/public/hero.tsx`, rendered by `app/page.tsx` | Aurora + animated grid + strengthened glow, staggered entrance (DEC-004) |
| Event Glance | Active | `components/public/event-glance.tsx`, rendered by `app/page.tsx` | Registration/Finale/Prize-pool recap directly below Hero |
| FAQ Item/Accordion | Not Started | None | Registered Planned |
| Timeline | Active | `components/public/timeline.tsx`, rendered by `app/timeline/page.tsx` | Vertical-always, phase icons, live-pulse on active node — moved off `/` per DEC-006 |
| Prize Card / Prize Display | Active | `components/public/prize-display.tsx`, rendered by `app/prizes/page.tsx` | Mountain-range waveform with three rising rank markers (1st tallest/most prominent), bespoke CTA header, vertical theme-word accent column — moved off `/` per DEC-006; isometric podium scrapped for this waveform direction per DEC-009 |
| Empty State | Not Started | None | Registered Planned |
| Pending Confirmation State | Not Started | None | Registered Planned |
| Responsive behavior | Verified for Hero, Event Glance, Timeline, Prize Display | Real Playwright/Chromium screenshots at 375/768/1440px each round, not just class-name inspection | A real bug was caught this way once (Prize Display's featured-card text clipping at a 768px 3-column layout) and fixed before shipping |
| Accessibility foundations (Focus Treatment) | Done | `.focus-ring` utility class in `app/globals.css`, applied by every interactive primitive above | |
| Reduced-motion foundation | Done | `components/motion-provider.tsx` (`<MotionConfig reducedMotion="user">` in the root layout) | Fixes a real hydration-mismatch bug found in Hero/EventGlance/Timeline — see `ui-registry.md`'s Accessibility Registry note |

---

## 5. Public Website

| Route | Status | UI | Responsive | Content | Notes |
|---|---|---|---|---|---|
| `/` | In Progress | Hero + Event Glance | Verified at 375/768/1440px | All confirmed facts only | Timeline and Prizes sections were built here in an earlier pass, then removed per `context/decisions.md` DEC-006 — they're real redundant with Hero/Event Glance and now live at `/timeline`/`/prizes` instead. A closing CTA band (the third of the three "bookend" sections) is not built yet |
| `/about` | Not Started | Not Started | Not Started | Not Started | — |
| `/challenges` | Not Started | Not Started | Not Started | Not Started | Will use Pending Confirmation State per `build-plan.md` — no content confirmed |
| `/timeline` | Done | `components/public/timeline.tsx` | Verified at 375/768/1440px | All confirmed facts only | Vertical-always layout, real page-level spacing (not a homepage-compressed strip) |
| `/prizes` | Done | `components/public/prize-display.tsx` | Verified at 375/768/1440px | All confirmed facts only | Mountain-range waveform silhouette with three rank markers rising from its peaks (DEC-009, superseding DEC-008's isometric podium) — a real layout bug (marker stack overflowing above an undersized container, overlapping the CTA button at 375px) was caught via `getBoundingClientRect()` inspection and fixed before shipping; one-time staggered entrance (waveform, then markers) verified via computed-style opacity sampling and scroll-cycle replay checks |
| `/rules` | Not Started | Not Started | Not Started | Not Started | Partially pending per `tbd.md` |
| `/faq` | Not Started | Not Started | Not Started | Not Started | — |
| `/register` | Not Started | Not Started | Not Started | Not Started | See Section 6 — scope depends on `tbd.md` |
| `/dev/components` | Done (temporary) | All Primitive Components | — | — | Internal-only review route, to be deleted before launch |

Four routes exist and build/render correctly: `/`, `/timeline`, `/prizes`, `/dev/components`.

---

## 6. Registration

| Item | Status | Notes |
|---|---|---|
| Registration entry point (route existing) | Not Started | — |
| Registration page/form | Not Started | Blocked on whether field set is confirmed — see `tbd.md`'s Registration decision |
| Validation | Not Started | — |
| Authentication dependency | Blocked | Authentication method itself is Not Confirmed in `tbd.md` |
| Participant creation | Not Started | — |
| College information | Not Started | Whether this field even exists is unconfirmed per `tbd.md` |
| Registration persistence | Not Started | Requires Phase 5 backend work |
| Confirmation state (UI) | Not Started | — |
| Email confirmation | Not Started | Conditional — Email/Notifications decision Not Confirmed in `tbd.md` |
| HackCulture integration | Not Started | Blocked — HackCulture Integration decision Not Confirmed in `tbd.md` |

**Do not assume:** team size, eligibility, team composition, registration closing date, or authentication method. None of these have been decided, and nothing above should be read as implying otherwise.

---

## 7. Participant Experience

| Item | Status | Notes |
|---|---|---|
| Authentication | Not Started | Method unconfirmed |
| Participant dashboard | Conditional | Gated on `tbd.md`'s Participant Experience decision |
| Profile | Conditional | Same gate |
| Team creation | Conditional | Gated on Team Structure decision |
| Team membership | Conditional | Same gate |
| Team management | Conditional | Same gate |
| Challenge selection | Conditional | Depends on Challenges content being confirmed first |
| Submission | Conditional | Gated on Submission decision |
| Submission status | Conditional | Same gate |
| Announcements | Not Started | Not gated by an unresolved decision, but not yet built |
| Shortlisted/finale state | Conditional | Depends on judging/finale-process confirmation |

Nothing in this section is implemented. This is expected at the current project stage regardless of `tbd.md` status.

---

## 8. Backend

### Database
| Item | Status | Notes |
|---|---|---|
| Supabase project | Not Started | — |
| PostgreSQL schema | Not Started | Defined conceptually in `architecture.md`, not yet created in a real database |
| Migrations | Not Started | Migration workflow itself not yet chosen (see `library-docs.md`) |
| Tables | Not Started | — |
| Constraints | Not Started | — |
| Indexes | Not Started | — |
| Row Level Security | Not Started | — |

### Authentication
| Item | Status | Notes |
|---|---|---|
| Auth configuration | Not Started | — |
| Session handling | Not Started | — |
| Protected routes | Not Started | — |
| Authorization | Not Started | — |

### Storage
| Item | Status | Notes |
|---|---|---|
| Buckets | Not Started | Conditional — gated on Submission decision |
| Upload handling | Not Started | Same gate |
| Access policies | Not Started | Same gate |

### Server Actions / API
| Item | Status | Notes |
|---|---|---|
| Validation | Not Started | — |
| Authorization | Not Started | — |
| Database operations | Not Started | — |
| Error handling | Not Started | — |

---

## 9. Admin

| Item | Status | Notes |
|---|---|---|
| Admin route | Conditional | Whether a custom admin system is built at all is gated on `tbd.md`'s Admin and HackCulture Integration decisions |
| Authentication | Conditional | Same gate |
| Authorization | Conditional | Same gate |
| Configuration management | Not Started | `tbd.md` currently recommends manual Supabase-dashboard editing for launch — a custom UI here may not be required at all |
| Registrations management | Conditional | Same gate |
| Teams management | Conditional | Same gate |
| Submissions management | Conditional | Same gate |
| Announcements management | Not Started | — |
| Content management | Not Started | See note above |
| HackCulture-related administration | Blocked | HackCulture's exact role is Not Confirmed |

**Do not assume a custom admin system is required** — ownership of this responsibility (custom build vs. HackCulture vs. manual Supabase dashboard use) is unresolved.

---

## 10. Integrations

| Integration | Status | Purpose | Notes |
|---|---|---|---|
| HackCulture | Not Selected | Platform partner (name confirmed; integration model not confirmed) | Blocked on `tbd.md`'s HackCulture Integration decision |
| Supabase | Planned | Database, auth, storage | Chosen in `architecture.md`; not yet provisioned |
| Resend | Conditional | Transactional email | Not confirmed as required per `tbd.md` |
| PostHog | Conditional | Analytics | Not confirmed as required per `tbd.md` |
| Vercel | Planned | Hosting/deployment | Chosen in `architecture.md`; no project deployed yet |

No integration has been implemented or configured.

---

## 11. Known Issues / Blockers

### Technical Blockers
None currently — no implementation has begun, so no technical blocker has yet been encountered.

### Product / Organizer Decisions

| Issue | Impact | Related Decision / File | Next Action |
|---|---|---|---|
| Registration field set/workflow unconfirmed | Blocks full `/register` implementation (Phase 3) | `tbd.md` — "Registration" | Organizer confirmation needed |
| Authentication method unconfirmed | Blocks real sign-in implementation (Phase 5) | `tbd.md` — "Authentication" | Organizer/technical decision needed |
| Team structure unconfirmed | Blocks all team-related work (Phase 4) | `tbd.md` — "Team Structure" | Organizer confirmation needed |
| Submission format/ownership unconfirmed | Blocks submission-related work (Phase 4/5) | `tbd.md` — "Submission" | Organizer confirmation needed |
| HackCulture's exact role unconfirmed | Blocks admin work and any HackCulture-adjacent integration (Phase 6) | `tbd.md` — "HackCulture Integration" | Organizer confirmation needed — highest-impact open item per `tbd.md` |
| Registration opens 7 Sept 2026 with Phase 0 not yet started | Time pressure on Phases 0–2 specifically | `tbd.md` Confirmed table; `build-plan.md` Phase 3 | Begin Phase 0 implementation |

None of the above are coding failures — they are organizer/product decisions this project is correctly waiting on, per `tbd.md`.

---

## 12. Recently Completed

**2026-09-06 — Phase 0 foundation + Phase 1 Primitive Components.**
- Verified the existing Next.js 16.3.4 App Router scaffold builds and serves (`npm install`, `npm run dev`, `npm run build`, `npm run lint` all clean).
- Rewrote `app/globals.css` with `ui-tokens.md`'s complete `:root` token block plus a Tailwind v4 `@theme inline` mapping (CSS-first — no `tailwind.config.ts`; see `decisions.md` DEC-001).
- Loaded Sora/Inter/JetBrains Mono via `next/font/google` in `app/layout.tsx`, wired to `--font-display`/`--font-body`/`--font-mono`.
- Ran `shadcn@latest init` (radix base, nova preset) and added Button, Input, Textarea, Select, Checkbox, Radio(Group), Badge, Card, Dialog, Separator, and Sheet (the registered Drawer); extracted a Spinner primitive from Button's loading state. Every primitive was restyled from shadcn's defaults to the project's own tokens per `build-plan.md` Phase 1 Task 1.
- Added `--error-hover`/`--error-active` tokens (DEC-002) to complete the Destructive button's hover/active spec.
- Built a temporary `/dev/components` route rendering every primitive across its default/hover/disabled/error states for review against `ui-tokens.md`'s tables.
- Updated `ui-registry.md` (Primitive Components → Active), `library-docs.md` (new dependencies), and `decisions.md` (DEC-001, DEC-002) as part of this change.

---

## 13. Current Focus

### Current Task
Phase 0 (Foundation) is functionally complete and Phase 1 (Design System)'s Primitive Component layer is implemented (this session). Remaining Phase 0 items are `config/site.ts` and Supabase/env setup (deferred — Supabase setup belongs to Phase 5 per the build plan; `config/site.ts` is still queued). The next substantive work is Phase 1's Composed Components (Site Header, Mobile Navigation Drawer, Page Header, Hero, FAQ Item, Timeline, Prize Card, Prize Display, Empty State, Pending Confirmation State).

### Why
Phase 2 (public pages) can't be built without the Composed Components it assembles, per `build-plan.md`'s dependency order. The Primitive layer those Composed Components need now exists and was reviewed at `/dev/components`.

### Dependencies
Phase 0's token/font setup (done) and the Primitive Component layer (done, this session).

### Avoid
- Do not start on `/register`'s form fields, team/participant/admin work, or any Supabase table — all of that is either gated on unresolved `tbd.md` decisions or sequenced into later phases.
- Do not provision Supabase yet — that begins in Phase 5, and `config/site.ts` (Phase 0) is the interim data source.
- Do not link `/dev/components` from any real navigation — it's a temporary review route, to be deleted before launch per `build-plan.md` Phase 1.
- Do not build Site Header/Mobile Navigation Drawer against invented nav item labels — `ui-rules.md`'s Navigation section already lists the confirmed public routes.
- `components/layout/header.tsx`, wired into `app/layout.tsx`, is a temporary placeholder header (wordmark + flat nav row, no drawer/active-state/sticky behavior) — not the registered Site Header composed component in `ui-registry.md`. Delete it and its import once the real Site Header is built; don't extend it with drawer/responsive logic in the meantime.

---

## 14. Next Tasks

1. Build Phase 1's Composed Components in `components/public/`: Site Header, Mobile Navigation Drawer (using the Drawer/Sheet primitive), Page Header, Hero (with the hero-only ignition glow + circuit texture per `ui-rules.md`), FAQ Item/Accordion, Timeline, Prize Card, Prize Display, Empty State, Pending Confirmation State.
2. Verify each new Composed Component's responsive behavior against `ui-rules.md`'s Responsive Behavior table and accessibility against `ui-registry.md`'s Accessibility Registry.
3. Update `ui-registry.md`'s Composed Components' Status fields and Current Registry table as each is built, per this session's approach for the Primitive layer.
4. Create `config/site.ts` populated only with the facts in `tbd.md`'s Confirmed table (still outstanding from Phase 0).
5. Once Composed Components exist, begin Phase 2's public pages.
6. Delete `/dev/components` once real pages make it redundant for visual QA, or before launch at the latest.
7. Update this file's Phase Status, Design System table, and Context File Synchronization table as each item above is completed.

---

## 15. Context File Synchronization

| Context File | Status | Needs Update? | Reason |
|---|---|---|---|
| `project-overview.md` | In sync | No | No implementation has changed confirmed scope |
| `tbd.md` | In sync | No | No decision has been confirmed since it was written |
| `architecture.md` | In sync | No | No implementation has established or contradicted an architectural detail yet |
| `ui-tokens.md` | Updated this session | No (current) | Added `--error-hover`/`--error-active` (DEC-002) — the Buttons row was updated to match |
| `ui-rules.md` | In sync | No | No composition work exists yet (Composed Components not started) |
| `ui-registry.md` | Updated this session | No (current) | Every Primitive Component moved Planned → Active with its implementation file noted |
| `code-standards.md` | In sync | No | Implemented code follows these standards (strict TS, Server Components by default, token-only styling) |
| `library-docs.md` | Updated this session | No (current) | Added shadcn/ui's actual CLI config (radix base, nova preset), radix-ui, class-variance-authority, cn, lucide-react, tw-animate-css |
| `build-plan.md` | In sync | No | Phase 0 tasks match what was built; Phase 1 Task 1 (primitives) is the first Phase 1 task completed |
| `decisions.md` | Updated this session | No (current) | DEC-001 (Tailwind v4 theming / next/font wiring / shadcn integration) and DEC-002 (error-hover/active tokens) logged |
| `progress-tracker.md` | Current | No | This update |

This table should be re-checked at the end of every implementation session.
