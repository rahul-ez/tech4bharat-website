"use client";

import { CheckIcon, ClipboardCheckIcon, LaptopIcon, TrophyIcon } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Timeline — context/ui-registry.md's confirmed-milestone sequence, rebuilt
 * for its one remaining context, the dedicated /timeline page (removed from
 * Landing per context/decisions.md DEC-006). Vertical at every breakpoint
 * now — there's no homepage-compressed strip left to justify a horizontal
 * desktop variant.
 *
 * State per ui-rules.md's Timeline section: dot fill/label color per status,
 * a `warning` Badge for the one milestone whose date isn't confirmed
 * (Online Preliminaries — the format is confirmed online, the date isn't),
 * a `live` Badge plus a pulse ring on the active node (DEC-006 — the
 * original "no pulsing" line is narrowly carved out for this one element).
 * Status is never color-only: completed uses a check icon, active uses the
 * glow + pulse + Badge + text, upcoming uses none of those.
 *
 * The per-phase icons (registration/online/finale) are DEC-006's other
 * carve-out — always paired with the node's text title, never standing
 * alone, so they read as wayfinding rather than decoration.
 *
 * Entrance is a one-time `whileInView` stagger — NOT scroll-position-linked.
 * An earlier version of this component drew the connecting line via
 * useScroll/useTransform tied continuously to scroll offset; that's gone.
 * The connecting spine is now a single one-time reveal, like the nodes.
 */

type MilestoneStatus = "completed" | "active" | "upcoming";

interface Milestone {
  title: string;
  date: string | null;
  detail?: string;
  description: string;
  status: MilestoneStatus;
  icon: typeof ClipboardCheckIcon;
}

/*
 * Build-time snapshot, not derived from `new Date()` — this page is
 * statically prerendered, so a runtime-computed status could disagree
 * between server and client. Belongs in `hackathon_config` once Phase 5
 * lands (see architecture.md).
 */
const MILESTONES: Milestone[] = [
  {
    title: "Registration Opens",
    date: "7 September 2026",
    description: "The registration window opens — mark your calendar.",
    status: "active",
    icon: ClipboardCheckIcon,
  },
  {
    title: "Online Preliminaries",
    date: null,
    description: "The preliminary round runs entirely online.",
    status: "upcoming",
    icon: LaptopIcon,
  },
  {
    title: "Grand Finale",
    date: "25–27 December 2026",
    detail: "Bengaluru, India",
    description: "Shortlisted teams travel to compete on-site for the final round.",
    status: "upcoming",
    icon: TrophyIcon,
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

const node: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const spine: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.9, ease: EASE_OUT, delay: 0.1 } },
};

export function Timeline() {
  return (
    <motion.ol
      variants={list}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="relative flex flex-col gap-12 sm:gap-16"
    >
      {/* Connecting spine — one-time scale-in from the top, fired once by
          the same whileInView pass as the nodes. Not tied to scroll offset. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-2 bottom-2 left-7 w-px bg-border-muted sm:left-8"
      />
      <motion.div
        aria-hidden="true"
        variants={spine}
        className="pointer-events-none absolute top-2 bottom-2 left-7 w-px origin-top bg-primary sm:left-8"
      />

      {MILESTONES.map((milestone) => {
        const Icon = milestone.icon;

        return (
          <motion.li
            key={milestone.title}
            variants={node}
            className="relative flex gap-6 sm:gap-8"
          >
            <span
              className={cn(
                "relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border sm:size-16",
                milestone.status === "active" && "border-primary bg-primary shadow-glow-primary",
                milestone.status === "completed" && "border-primary bg-primary-muted",
                milestone.status === "upcoming" && "border-border bg-surface-tertiary"
              )}
            >
              {milestone.status === "active" && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-primary/50 motion-safe:animate-ping motion-reduce:hidden"
                />
              )}
              {milestone.status === "completed" ? (
                <CheckIcon className="relative size-5 text-primary sm:size-6" />
              ) : (
                <Icon
                  className={cn(
                    "relative size-5 sm:size-6",
                    milestone.status === "active" ? "text-primary-foreground" : "text-text-muted"
                  )}
                />
              )}
            </span>

            <div className="flex-1 rounded-lg border border-border bg-surface-secondary p-6 transition-colors hover:border-border-light sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h2
                  className={cn(
                    "font-display text-xl font-semibold sm:text-2xl",
                    milestone.status === "upcoming" ? "text-text-muted" : "text-text-primary"
                  )}
                >
                  {milestone.title}
                </h2>
                {milestone.status === "active" ? <Badge variant="live">Open now</Badge> : null}
              </div>

              {milestone.date ? (
                <p
                  className={cn(
                    "mt-3 font-display text-2xl leading-[1.1] font-bold tracking-[-0.01em] sm:text-[2rem]",
                    milestone.status === "active" ? "text-primary" : "text-text-secondary"
                  )}
                >
                  {milestone.date}
                </p>
              ) : (
                <p className="mt-3">
                  <Badge variant="warning">Date to be announced</Badge>
                </p>
              )}

              {milestone.detail ? (
                <p className="mt-1 text-sm text-text-secondary">{milestone.detail}</p>
              ) : null}

              <p className="mt-4 max-w-content-narrow text-text-secondary">
                {milestone.description}
              </p>
            </div>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
