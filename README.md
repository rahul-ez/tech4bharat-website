# Tech4Bharat 2026

The official website for **Tech4Bharat 2026** — a national hackathon, part of the Global Accelerator Vision Summit (GAVS) 2026, themed *"Scalable Innovations for Next-Gen India."* Online preliminary rounds followed by an on-site grand finale in Bengaluru, 25–27 December 2026.

Built with Next.js 16 (App Router), TypeScript (strict), and Tailwind CSS v4.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Before You Contribute — Read This First

This project is governed by a documentation system in [`context/`](./context) that every contributor — human or AI agent — is expected to read before making changes. It is the source of truth for requirements, architecture, and design, and takes precedence over ad hoc decisions made in code review.

Start with [`AGENTS.md`](./AGENTS.md), then:

| File | Covers |
|---|---|
| `context/project-overview.md` | What Tech4Bharat 2026 actually is — confirmed facts only |
| `context/tbd.md` | What's still unconfirmed — never invent past this |
| `context/architecture.md` | System boundaries and architecture |
| `context/ui-tokens.md` | Design tokens (color, type, spacing, motion) |
| `context/ui-rules.md` | How those tokens compose into UI |
| `context/ui-registry.md` | Every reusable component, its status, and where it's used |
| `context/code-standards.md` | Coding conventions |
| `context/library-docs.md` | Adopted libraries and the process for adding new ones |
| `context/decisions.md` | Log of non-obvious implementation decisions and why they were made |
| `context/progress-tracker.md` | What's actually built vs. planned, per route/component |
| `context/build-plan.md` | Implementation phase order |

**The two rules that matter most:** never invent hackathon facts or requirements beyond what `project-overview.md`/`tbd.md` confirm, and never introduce a color, font, or visual pattern outside what `ui-tokens.md` defines.

## Project Structure

```
app/                    Next.js App Router pages
  about/ challenges/ faq/ prizes/ register/ rules/ timeline/
components/
  ui/                   Design-system primitives (Button, Card, Input, ...)
  public/               Composed, page-level components
lib/                    Shared utilities, server-only data helpers
context/                Governance docs — see above
```

## Routes

`/`, `/about`, `/challenges`, `/timeline`, `/prizes`, `/rules`, `/faq`, `/register` are live. Participant/admin routes (`/dashboard`, `/team`, `/submission`, `/admin`) are conditional on unresolved product decisions — see `context/tbd.md`.
