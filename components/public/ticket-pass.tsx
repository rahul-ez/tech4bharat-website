"use client";

import { useEffect, useRef, useState } from "react";
import { IdCard, ScrollText, Users } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * TicketPass — `/register`'s hero visual: a hand-built boarding-pass/
 * event-ticket shape, per `context/decisions.md` DEC-017. Before building
 * anything, npm, Aceternity UI's full component list, shadcn.io's
 * 59-component list (which also covers Magic UI), and a targeted
 * registry/21st.dev search were all checked for an existing ticket-stub
 * pattern — nothing was found, so this is hand-drawn decorative geometry,
 * not a case with a "correct" answer to get wrong (unlike, say, the
 * India map earlier this session).
 *
 * The die-cut notches (corners + the perforation line's edge points) use
 * the standard CSS trick of a `bg-background`-colored circle overlapping
 * the card's border, rather than an SVG clip-path — simpler, and
 * `bg-background` already matches whatever's actually behind the card
 * (the page background, not a hardcoded color), so it stays correct if
 * that token ever changes.
 *
 * The perforation divides a main "pass" section from a smaller "stub"
 * carrying the three preparation line-items. Its orientation is
 * responsive, not just uniformly scaled down: a vertical line splitting
 * the card left/right on wide screens (matching a real boarding pass'
 * side stub), and a horizontal line splitting it top/bottom below `lg`,
 * where a vertical stub squeezed into a narrow column would leave an
 * awkwardly thin sliver. Both DOM structures always render; Tailwind
 * responsive classes toggle which is visible — the same "both variants
 * render, CSS switches" pattern used everywhere else in this project for
 * structural responsive differences, avoiding any hydration risk from
 * conditional rendering based on viewport.
 *
 * No functional CTA anywhere on this card — registration isn't wired up,
 * so nothing here is styled as a clickable action. Status reads "AWAITING
 * CONFIRMATION" as plain ticket-field text, matching what's actually true
 * per `tbd.md`.
 *
 * The countdown ("DEPARTURE" field) is computed client-side in a
 * `useEffect`, not synchronously during render — this page is statically
 * prerendered, so "now" at build time and "now" for an actual visitor are
 * different instants; computing the day-count synchronously would render
 * a stale build-time number on the server and a different, correct one
 * on the client, which is exactly the hydration-mismatch shape this
 * project has hit (and fixed) more than once already this session. The
 * server/first-paint render shows a placeholder; the real value fills in
 * after mount.
 */

const GRAND_FINALE = new Date(2026, 11, 25); // 25 Dec 2026, local time — month is 0-indexed

function useDaysUntilFinale() {
  const [days, setDays] = useState<number | null>(null);
  const hasComputedRef = useRef(false);

  useEffect(() => {
    if (hasComputedRef.current) return;
    hasComputedRef.current = true;
    const diff = GRAND_FINALE.getTime() - Date.now();
    setDays(Math.max(0, Math.ceil(diff / 86_400_000)));
  }, []);

  return days;
}

const STUB_ITEMS = [
  {
    icon: IdCard,
    label: "Participant Details",
    description: "Basic participant information required for registration.",
  },
  {
    icon: Users,
    label: "Team Information",
    description: "Team details, if required by the participation guidelines.",
  },
  {
    icon: ScrollText,
    label: "Official Guidelines",
    description: "Review the rules and eligibility criteria before registering.",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const ticketRise: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
};

const fieldRise: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/** A `bg-background`-colored circle overlapping the card edge — the die-cut illusion. */
function Notch({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("absolute size-7 rounded-full bg-background", className)} />;
}

function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <motion.div variants={fieldRise} className={className}>
      <p className="font-body text-[0.65rem] font-semibold tracking-[0.18em] text-text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-lg font-bold text-text-primary sm:text-xl">{value}</p>
    </motion.div>
  );
}

export function TicketPass() {
  const daysLeft = useDaysUntilFinale();

  return (
    <motion.div initial="hidden" animate="show" variants={ticketRise} className="mx-auto max-w-4xl">
      <div className="relative flex flex-col overflow-visible rounded-2xl border border-border bg-surface-secondary shadow-elevation lg:flex-row">
        {/* Corner die-cut notches — subtle, at all four outer corners. */}
        <Notch className="-top-3.5 -left-3.5" />
        <Notch className="-top-3.5 -right-3.5" />
        <Notch className="-bottom-3.5 -left-3.5" />
        <Notch className="-bottom-3.5 -right-3.5" />

        {/* Main pass section */}
        <motion.div variants={stagger} className="flex-1 p-6 sm:p-8 lg:p-10">
          <motion.div variants={fieldRise} className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-body text-xs font-semibold tracking-[0.25em] text-primary uppercase">
              Pass — Tech4Bharat 2026
            </p>
            <span className="rounded-full border border-warning bg-warning-light px-3 py-1 font-body text-[0.65rem] font-semibold tracking-[0.15em] text-warning uppercase">
              Awaiting Confirmation
            </span>
          </motion.div>

          <motion.h1
            variants={fieldRise}
            className="mt-5 font-display text-3xl leading-[1.1] font-bold tracking-[-0.01em] text-text-primary sm:text-4xl"
          >
            Grand Finale Boarding Pass
          </motion.h1>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            <Field label="Event Dates" value="25–27 Dec" />
            <Field label="Venue" value="Bengaluru" />
            <Field label="Departure" value={daysLeft === null ? "—" : `T-${daysLeft}d`} />
            <Field label="Class" value="Innovator" />
          </div>
        </motion.div>

        {/* Perforation — horizontal below lg (stub stacks beneath), vertical at lg+ (stub sits beside). */}
        <div aria-hidden="true" className="relative px-6 lg:hidden">
          <Notch className="top-1/2 -left-3.5 -translate-y-1/2" />
          <Notch className="top-1/2 -right-3.5 -translate-y-1/2" />
          <div className="border-t-2 border-dashed border-border-light" />
        </div>
        <div aria-hidden="true" className="relative hidden py-8 lg:block">
          <Notch className="-top-3.5 left-1/2 -translate-x-1/2" />
          <Notch className="-bottom-3.5 left-1/2 -translate-x-1/2" />
          <div className="h-full border-l-2 border-dashed border-border-light" />
        </div>

        {/* Stub — three ticket line-items, manifest-style. */}
        <motion.div variants={stagger} className="p-6 sm:p-8 lg:w-72 lg:shrink-0 lg:p-10">
          <motion.p
            variants={fieldRise}
            className="font-body text-[0.65rem] font-semibold tracking-[0.2em] text-text-muted uppercase"
          >
            Prepare to Board
          </motion.p>
          <ul className="mt-5 space-y-5">
            {STUB_ITEMS.map(({ icon: Icon, label, description }) => (
              <motion.li key={label} variants={fieldRise} className="flex gap-3">
                <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p className="font-display text-sm font-semibold text-text-primary">{label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">{description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
