"use client";

import { motion, type Variants } from "motion/react";

/**
 * ApproachSteps — the Challenges page's numbered process sequence,
 * describing the APPROACH participants take (understand → ideate → build
 * → create impact), not specific challenge sectors/tracks. Per direct
 * instruction, the "four-sector icon card" reference pattern (Sustainable
 * Development / Inclusive Growth / Education & Skills / Healthcare
 * Access) was explicitly rejected as inventing challenge tracks that
 * aren't confirmed anywhere in `tbd.md` ("Challenge tracks: Not
 * confirmed"; "Problem statements: Not confirmed") — nothing here names
 * or implies a sector.
 *
 * Connected-step layout (numbered circles + a horizontal connecting line)
 * chosen over the two alternative reference patterns per direct
 * instruction, for the richer, "catchier" read DEC-004 authorizes for
 * this kind of section. Collapses to a plain vertical stack below `md` —
 * a horizontal connecting line across 4 items doesn't read well
 * compressed into a narrow column, so mobile drops the line rather than
 * contorting it, matching how Timeline itself only ever commits to one
 * shape per breakpoint rather than forcing a single layout everywhere.
 *
 * Entrance is a one-time reveal: a single ancestor `motion.div` declares
 * `whileInView`/`viewport={{ once: true }}`, and Motion's variant
 * propagation carries that state to the connecting line (`scaleX` from
 * left, transform-based — same technique as Timeline's `scaleY` spine)
 * and each step (staggered fade+rise) — not independent per-element
 * triggers, per the pattern this project has repeatedly needed to get
 * right this session (DEC-009, DEC-010's network graphics, DEC-012's
 * TextReveal).
 */

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { number: "01", title: "Understand", description: "Explore real-world problem statements." },
  { number: "02", title: "Ideate", description: "Think beyond conventional solutions." },
  { number: "03", title: "Build", description: "Develop practical, scalable prototypes." },
  { number: "04", title: "Create Impact", description: "Contribute to a stronger Bharat." },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

const step: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const line: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: EASE_OUT, delay: 0.1 } },
};

export function ApproachSteps() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
    >
      {/* Connecting line — desktop only, behind the numbered circles. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-6 hidden h-px bg-border-muted md:block"
      />
      <motion.div
        aria-hidden="true"
        variants={line}
        className="pointer-events-none absolute inset-x-0 top-6 hidden h-px origin-left bg-primary md:block"
      />

      <motion.ol variants={list} className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
        {STEPS.map((s) => (
          <motion.li key={s.number} variants={step} className="relative flex flex-col items-start md:items-center md:text-center">
            <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-primary bg-background font-display text-lg font-bold text-primary">
              {s.number}
            </span>
            <h3 className="mt-4 font-display text-lg font-semibold text-text-primary sm:text-xl">{s.title}</h3>
            <p className="mt-2 text-sm text-text-secondary sm:text-base">{s.description}</p>
          </motion.li>
        ))}
      </motion.ol>
    </motion.div>
  );
}
