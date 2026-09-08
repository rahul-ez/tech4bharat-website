"use client";

import { motion, type Variants } from "motion/react";

import { BorderBeam } from "@/components/ui/border-beam";
import { Card } from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/number-ticker";

/**
 * EventGlance — a compact three-fact recap directly below the Hero:
 * Registration Opens, Grand Finale, Prize Pool. Every value traces to
 * project-overview.md/tbd.md's Confirmed table — no other fact is added.
 *
 * A regular content section (context/ui-rules.md reserves full-bleed/glow
 * background treatment for the hero and the Prizes/closing-CTA bookends),
 * so richness here comes from the card-level motion, not a section
 * background: a scroll-triggered stagger-in and a hover-only BorderBeam
 * (a light that loops the border on `:hover` — a binary state change, not
 * a value tracking the cursor's position, so it doesn't fall under
 * context/decisions.md DEC-004's still-forbidden "cursor-follow glow").
 * The Prize Pool figure count-up (`NumberTicker`) is the one place stat/
 * prize-number typography + `primary` legitimately pairs, per ui-tokens.md's
 * Named Rule — the two dates deliberately stay in `text-primary`, not the
 * accent color, since a date isn't a number of "scale or achievement."
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

function GlanceCard({
  label,
  beamDelay,
  children,
}: {
  label: string;
  beamDelay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={rise} className="group relative overflow-hidden rounded-lg">
      <Card variant="standard" className="relative h-full">
        <p className="font-body text-xs font-semibold tracking-[0.08em] text-text-muted uppercase">
          {label}
        </p>
        <div className="mt-3">{children}</div>
      </Card>
      {/* Hidden via CSS rather than skipped in JS — a `useReducedMotion()`
          branch here would change the DOM between server and client. */}
      <BorderBeam
        duration={4}
        delay={beamDelay}
        size={90}
        className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
      />
    </motion.div>
  );
}

export function EventGlance() {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h2 className="font-display text-2xl font-semibold text-text-primary">
          Event at a Glance
        </h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <GlanceCard label="Registration Opens" beamDelay={0} >
            <p className="font-display text-xl font-bold leading-tight text-text-primary">
              7 September 2026
            </p>
          </GlanceCard>

          <GlanceCard label="Grand Finale" beamDelay={1.3} >
            <p className="font-display text-xl font-bold leading-tight text-text-primary">
              25&ndash;27 December 2026
            </p>
          </GlanceCard>

          <GlanceCard label="Prize Pool" beamDelay={2.6} >
            <p className="flex items-baseline gap-1 font-display text-[2.75rem] leading-[1.1] font-bold tracking-[-0.01em] text-primary">
              &#8377;
              <NumberTicker value={600000} className="text-primary" />
            </p>
          </GlanceCard>
        </motion.div>
      </div>
    </section>
  );
}
