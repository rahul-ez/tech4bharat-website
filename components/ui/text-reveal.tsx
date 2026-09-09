"use client";

import { motion, type Variants } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * TextReveal — a single reusable one-time scroll-entrance wrapper for text
 * content, extracted from the fade+rise pattern Hero (`components/public/
 * hero.tsx`) and Timeline (`components/public/timeline.tsx`) each already
 * hand-rolled independently this session. Same `EASE_OUT` cubic-bezier,
 * same 0.6s per-element duration, and a stagger in the same ~0.08–0.16s
 * neighborhood those two components already use (Hero: staggerChildren
 * 0.09/delayChildren 0.08; Timeline: 0.16/0.1) — confirmed by reading both
 * files rather than assumed, so this component matches what's actually in
 * the codebase, not a guess at what "should" match.
 *
 * `split="word"` staggers each word individually (for headings — reads as
 * a staggered line/word reveal); the default `split="none"` fades+rises
 * the whole block as one unit (for body paragraphs, which don't need
 * per-word staggering). One component serves both cases rather than two,
 * per the explicit requirement not to build separate heading/paragraph
 * components.
 *
 * Entrance is always `whileInView`/`viewport={{ once: true }}` — never
 * configurable to replay, since a recurring bug this session was
 * animations that quietly re-triggered on every scroll pass (Timeline's
 * spine used to be continuously `useScroll`/`useTransform`-linked; Prize
 * Display and the About page's network graphics both needed explicit
 * verification that their entrances don't replay). `once: true` is
 * hardcoded here rather than exposed as a prop, so every consumer gets
 * the same one-time guarantee.
 *
 * Reduced motion is handled the same way as everywhere else in this
 * project: `MotionConfig`'s `reducedMotion="user"` (applied globally by
 * `components/motion-provider.tsx`) drops the `y` transform for users who
 * ask for reduced motion while keeping the opacity fade, and does so after
 * hydration — so server-rendered markup and the first client render stay
 * identical regardless of the visitor's motion preference. Nothing here
 * branches on `useReducedMotion()` for structure, only Motion's built-in
 * per-property reduction.
 */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const DEFAULT_STAGGER = 0.08;
const DEFAULT_DELAY_CHILDREN = 0.05;
const ITEM_DURATION = 0.6;
const ITEM_RISE_PX = 16;

const item: Variants = {
  hidden: { opacity: 0, y: ITEM_RISE_PX },
  show: { opacity: 1, y: 0, transition: { duration: ITEM_DURATION, ease: EASE_OUT } },
};

/**
 * `motion.h1`, `motion.div`, etc. are stable, pre-built components the
 * `motion` package already exposes — referencing them here is a plain
 * object lookup, not creation. `motion.create(Component)` exists for
 * wrapping *custom* components and is documented to run once at module
 * scope; calling it every render (to support an arbitrary `as` prop)
 * recreates the component on each render and resets its internal state —
 * caught by the `react-hooks/static-components` lint rule, not just a
 * style preference. This lookup covers every tag Hero/Timeline/the About
 * page's headings and paragraphs actually need.
 */
const MOTION_TAGS = {
  div: motion.div,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const;

type TextRevealTag = keyof typeof MOTION_TAGS;

interface TextRevealBaseProps {
  /** The rendered tag — defaults to a plain `div`. */
  as?: TextRevealTag;
  className?: string;
  /** Gap between each word/element's entrance, in seconds. */
  stagger?: number;
  /** Delay before entrance starts, in seconds — the first word's delay in `split="word"` mode, or the whole block's own delay in `split="none"` mode. Use this to cascade several `TextReveal`s that enter the viewport together (e.g. an eyebrow, then a heading, then a paragraph), the same way Hero staggers its own block-level children. */
  delayChildren?: number;
  /** Viewport root-margin for the `whileInView` trigger — matches Timeline's `-100px`/Prize Display's `-80px` neighborhood by default. */
  viewportMargin?: string;
}

type TextRevealProps =
  | (TextRevealBaseProps & { split?: "none"; children: React.ReactNode })
  | (TextRevealBaseProps & { split: "word"; children: string });

export function TextReveal(props: TextRevealProps) {
  const {
    as = "div",
    className,
    stagger = DEFAULT_STAGGER,
    delayChildren = DEFAULT_DELAY_CHILDREN,
    viewportMargin = "-80px",
  } = props;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
  };

  const MotionTag = MOTION_TAGS[as];

  if (props.split === "word") {
    const words = props.children.split(" ");
    return (
      <MotionTag
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: viewportMargin }}
        className={cn(className)}
      >
        {words.map((word, i) => (
          <motion.span key={i} variants={item} className="inline-block">
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  const singleItem: Variants = {
    hidden: { opacity: 0, y: ITEM_RISE_PX },
    show: { opacity: 1, y: 0, transition: { duration: ITEM_DURATION, ease: EASE_OUT, delay: delayChildren } },
  };

  return (
    <MotionTag
      variants={singleItem}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: viewportMargin }}
      className={cn(className)}
    >
      {props.children}
    </MotionTag>
  );
}
