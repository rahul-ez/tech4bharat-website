"use client"

/**
 * NumberTicker — from Magic UI (`npx shadcn add https://magicui.design/r/number-ticker.json`).
 * Two changes from upstream: the count-up format defaults to "en-IN" (Indian
 * digit grouping, e.g. 6,00,000 rather than 600,000 — required for our
 * currency figures, not a style choice), and the hardcoded
 * `text-black dark:text-white` default color is dropped in favor of
 * `text-text-primary` — this project has no light/dark toggle
 * (context/decisions.md DEC-001), so the `dark:` variant never applied here
 * and `text-black` was silently wrong against our navy background.
 */

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import {
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
  locale?: string
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  locale = "en-IN",
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : startValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const prefersReducedMotion = useReducedMotion() ?? false

  /*
   * Reduced motion is handled here rather than by the caller swapping this
   * component out — the swap would change the DOM between the server render
   * and the first client render. Both paths render the same span; this effect
   * only decides whether the value springs to its target or jumps there.
   */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null
    const target = direction === "down" ? startValue : value

    if (prefersReducedMotion) {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat(locale, {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(target)
      }
      return
    }

    if (isInView) {
      timer = setTimeout(() => {
        motionValue.set(target)
      }, delay * 1000)
    }

    return () => {
      if (timer !== null) {
        clearTimeout(timer)
      }
    }
  }, [
    motionValue,
    isInView,
    delay,
    value,
    direction,
    startValue,
    prefersReducedMotion,
    locale,
    decimalPlaces,
  ])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat(locale, {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)))
        }
      }),
    [springValue, decimalPlaces, locale]
  )

  return (
    <span
      ref={ref}
      className={cn("inline-block tracking-wider text-text-primary tabular-nums", className)}
      {...props}
    >
      {startValue}
    </span>
  )
}
