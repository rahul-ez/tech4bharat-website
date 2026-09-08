"use client";

import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

/**
 * PageBackdrop — the circuit/grid texture as a full-page backdrop, no
 * aurora/ignition-glow. Used by /timeline and /prizes only, per
 * context/decisions.md DEC-006, which extended the grid (but not the glow)
 * to those two pages; every other non-hero page stays flat per
 * ui-rules.md's Page Headers section.
 *
 * Both the animated and static variants always render — the swap is
 * CSS-only (`motion-reduce:`/`motion-safe:`), matching the fix applied to
 * Hero/EventGlance/Timeline: branching this on the `useReducedMotion()` hook
 * would hydration-mismatch, since the server has no media query and always
 * resolves it false.
 */
export function PageBackdrop({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <AnimatedGridPattern
        width={56}
        height={56}
        numSquares={22}
        maxOpacity={0.12}
        duration={5}
        repeatDelay={1}
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full",
          "stroke-border-light/40 text-primary",
          "[mask-image:radial-gradient(ellipse_at_20%_0%,black_5%,transparent_70%)]",
          "motion-reduce:hidden"
        )}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(hsl(var(--border-light))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border-light))_1px,transparent_1px)] bg-[size:56px_56px] opacity-[0.05] [mask-image:radial-gradient(ellipse_at_20%_0%,black_5%,transparent_70%)] motion-reduce:block"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
