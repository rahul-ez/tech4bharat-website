import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

/**
 * AuroraBackground — decorative aurora / mesh-gradient layer.
 *
 * Adapted from Aceternity UI's `aurora-background`, installed via
 * `npx shadcn@latest add https://ui.aceternity.com/registry/aurora-background.json`
 * and then substantially re-themed. Three things from the original are
 * deliberately gone:
 *
 * 1. Its hardcoded blue/indigo/violet palette (#3b82f6/#a5b4fc/#ddd6fe) —
 *    replaced entirely by `primary` (saffron) and `ember` from
 *    context/ui-tokens.md. No hue outside our palette survives.
 * 2. Its light-mode-first `invert` + `mix-blend-difference` pipeline, which
 *    depends on a `.dark` class this project deliberately doesn't have
 *    (dark-mode-only, see context/decisions.md DEC-001). Replaced with
 *    `mix-blend-plus-lighter`, which reads as additive light on navy.
 * 3. Its opinionated `<main>` / `h-[100vh]` / centered-flex wrapper, which
 *    would have forced a centered composition — context/ui-rules.md requires
 *    the hero stay left-aligned. This is now a pure background layer that
 *    takes its size from whatever it's placed in.
 *
 * Richer/continuous motion here is authorized by context/decisions.md
 * DEC-004; the animation is disabled under `prefers-reduced-motion`
 * (see the `motion-reduce:` variant below).
 */
export function AuroraBackground({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <div
        className={cn(
          // Aurora bands, built only from our saffron/ember tokens.
          "[--aurora:repeating-linear-gradient(100deg,hsl(var(--primary)/0.85)_8%,hsl(var(--ember)/0.65)_16%,transparent_24%,hsl(var(--primary)/0.5)_32%,hsl(var(--ember)/0.75)_40%)]",
          // Navy bands that slice the aurora into distinct ribbons.
          "[--band:repeating-linear-gradient(100deg,hsl(var(--background))_0%,hsl(var(--background))_7%,transparent_10%,transparent_12%,hsl(var(--background))_16%)]",
          "absolute -inset-[10px] opacity-55 blur-[52px] will-change-transform",
          "[background-image:var(--band),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%]",
          // Second, slower-reading copy drifts across the first, additively.
          "after:absolute after:inset-0 after:content-['']",
          "after:[background-image:var(--band),var(--aurora)] after:[background-size:200%,_100%]",
          "after:mix-blend-plus-lighter after:animate-aurora",
          "after:motion-reduce:animate-none",
          // Anchored low and left — "ignition rising out of depth", matching
          // the left-aligned content column rather than a centered bloom.
          "[mask-image:radial-gradient(ellipse_at_18%_105%,black_5%,transparent_72%)]"
        )}
      />
    </div>
  );
}
