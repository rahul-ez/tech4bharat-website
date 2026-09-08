"use client";

import { MotionConfig } from "motion/react";

/**
 * Applies Motion's `reducedMotion="user"` globally: transform and layout
 * animations are skipped for users who ask for reduced motion, while opacity
 * fades (which aren't vestibular triggers) are kept.
 *
 * This exists because gating motion on the `useReducedMotion()` hook at the
 * markup level causes hydration mismatches — the server has no media query, so
 * it always renders the "full motion" branch, and a reduced-motion client then
 * renders something structurally different. Anything Motion can't neutralize
 * on its own (a looping CSS animation, a decorative element that shouldn't
 * animate at all) is handled with Tailwind's `motion-reduce:` variant instead,
 * which is pure CSS and therefore identical on server and client.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
