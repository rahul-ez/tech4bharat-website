"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Hero — context/ui-registry.md's homepage-only, single high-impact intro.
 * The only section allowed the ignition-glow + circuit-texture combination
 * and hero-display-heading typography (context/ui-rules.md Invariant 2/3).
 *
 * Visual richness — continuous aurora drift, the animated grid, decorative
 * glow, entrance motion — is authorized by context/decisions.md DEC-004,
 * which relaxed ui-rules.md's Motion "Forbidden" list for the landing
 * treatment. What DEC-004 explicitly did NOT relax, and what this component
 * still holds to: the saffron/ember/navy palette (no new hue appears here,
 * including from the installed registry components' defaults), the
 * Sora/Inter/JetBrains Mono faces, left-aligned composition, and a premium
 * rather than playful tone (no bounce/elastic easing, no cursor-chasing
 * effects). Every animation is disabled under `prefers-reduced-motion`.
 *
 * All copy is drawn from project-overview.md/tbd.md's Confirmed table only.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  /*
   * Variants are unconditional on purpose. `MotionProvider`'s
   * `reducedMotion="user"` drops the transform (y) for users who ask for
   * reduced motion while keeping the opacity fade, and it does so after
   * hydration — so the server-rendered markup and the first client render
   * stay identical either way.
   */
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
  };

  const rise: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
  };

  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Aurora mesh — saffron/ember over navy, anchored low-left. */}
      <AuroraBackground />

      {/* Animated circuit grid. Lines take `border-light`; the drifting
          cells take `primary` via currentColor. No foreign palette.
          Both variants always render — the swap is CSS-only (`motion-reduce:`)
          so server and client markup match; branching on the
          `useReducedMotion()` hook here would hydrate-mismatch, because the
          server has no media query and always resolves it false. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(hsl(var(--border-light))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border-light))_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.06] [mask-image:radial-gradient(ellipse_at_30%_0%,black_5%,transparent_75%)] motion-reduce:block"
      />
      <AnimatedGridPattern
        width={56}
        height={56}
        numSquares={26}
        maxOpacity={0.16}
        duration={5}
        repeatDelay={1}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full",
          "stroke-border-light/40 text-primary",
          "[mask-image:radial-gradient(ellipse_at_30%_0%,black_5%,transparent_75%)]",
          "motion-reduce:hidden"
        )}
      />

      {/* Core ignition glow — the one approved gradient, strengthened per DEC-004. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(58%_58%_at_28%_100%,hsl(var(--primary)/0.28),transparent_70%),radial-gradient(46%_46%_at_72%_100%,hsl(var(--ember)/0.18),transparent_72%)]"
      />

      {/* Settle the section back into the page background at its lower edge. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-background"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-hero px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
      >
        <div className="max-w-content-wide">
          <motion.p
            variants={rise}
            className="flex items-center gap-3 font-body text-xs font-semibold tracking-[0.08em] text-text-muted uppercase leading-[1.3]"
          >
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            India&apos;s Biggest Hackathon
          </motion.p>

          <motion.h1
            variants={rise}
            className="mt-5 font-display text-[3.5rem] font-bold leading-[1.05] tracking-[-0.02em] text-text-primary [text-shadow:0_0_90px_hsl(var(--primary)/0.28)] sm:text-[4rem] lg:text-[4.5rem]"
          >
            Scalable Innovations for Next-Gen India
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-content-narrow text-lg leading-[1.6] text-text-secondary"
          >
            Tech4Bharat 2026, part of the Global Accelerator Vision Summit (GAVS)
            2026, runs as online preliminary rounds followed by an on-site grand
            finale in Bengaluru, India, from 25&ndash;27 December 2026.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-stretch sm:gap-10"
          >
            <div className="border-l-2 border-primary pl-5">
              <p className="font-display text-[2.75rem] leading-[1.1] font-bold tracking-[-0.01em] text-primary">
                &#8377;6,00,000
              </p>
              <p className="mt-1 text-xs tracking-[0.06em] text-text-muted uppercase">
                Total prize pool
              </p>
            </div>
            <div className="border-l-2 border-border pl-5">
              <p className="font-display text-[2.75rem] leading-[1.1] font-bold tracking-[-0.01em] text-text-primary">
                7 Sept
              </p>
              <p className="mt-1 text-xs tracking-[0.06em] text-text-muted uppercase">
                Registration opens 2026
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={rise}
            className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <Button
              asChild
              variant="primary"
              className="w-full transition-all duration-200 hover:shadow-glow-primary sm:w-auto"
            >
              <Link href="/register">Register</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="w-full transition-all duration-200 hover:border-border-light sm:w-auto"
            >
              <Link href="/about">About Tech4Bharat</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
