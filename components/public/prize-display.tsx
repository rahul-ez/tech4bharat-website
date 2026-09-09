"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";

import { Button } from "@/components/ui/button";
import { VerticalAccentText } from "@/components/ui/vertical-accent-text";
import { cn } from "@/lib/utils";

/**
 * PrizeDisplay — context/ui-registry.md's registered "Prize Display"
 * composed component. Fifth visual pass this session: the isometric-podium
 * concept (DEC-008) is scrapped entirely in favor of a mountain-range
 * waveform silhouette with three vertical rank markers rising from it, per
 * a direct reference image and explicit instruction. The DEC-007 wireframe
 * gem is dropped along with the podium it floated above — the new
 * reference doesn't include it, and nothing in this round's request asks
 * for it to carry over.
 *
 * Two things were deliberately not carried over from the reference,
 * per direct instruction this round:
 * 1. Each marker's descriptive tagline ("Most impactful solution...",
 *    "Ideas with strong execution...", "Promising ideas for the future")
 *    is invented judging-criteria framing with no basis anywhere in
 *    `tbd.md` — placement + amount is all that's honestly confirmed, so
 *    that's all that's shown.
 * 2. The vertical accent text on the right is not the reference's own
 *    wording ("PEOPLE / IDEAS / TECHNOLOGY / A STRONGER BHARAT" — itself
 *    unconfirmed invented copy). It's instead the exact confirmed theme
 *    string from `project-overview.md` ("Scalable Innovations for
 *    Next-Gen India" — already used verbatim in Hero), split into its
 *    four words and stacked vertically, so no new phrasing is introduced.
 *    Originally built inline here; extracted to
 *    `components/ui/vertical-accent-text.tsx` once `/faq` wanted the same
 *    device, rather than a second hand-copied instance.
 */

interface Tier {
  place: string;
  amount: string;
  featured: boolean;
  /** Marker's total height in px, from the waveform's peak beneath it up to the dot. */
  markerHeight: number;
  /** Distance in px from the container's bottom edge up to the waveform peak this marker sits on — matches WAVEFORM_HEIGHT * (240 - peakY) / 240 for this tier's peak in the SVG below, computed once rather than re-derived per render. */
  peakBottom: number;
  leftPercent: number;
}

/** Fixed (non-responsive) rendered height of the waveform SVG, in px — see Waveform. */
const WAVEFORM_HEIGHT = 176;

const TIERS: Tier[] = [
  { place: "2nd", amount: "₹2,00,000", featured: false, markerHeight: 96, peakBottom: 117, leftPercent: 22 },
  { place: "1st", amount: "₹3,00,000", featured: true, markerHeight: 172, peakBottom: 165, leftPercent: 50 },
  { place: "3rd", amount: "₹1,00,000", featured: false, markerHeight: 70, peakBottom: 106, leftPercent: 78 },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const headerRise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/**
 * One shared viewport trigger (on the outer wrapper below) drives both of
 * these via Motion's variant propagation — the waveform and marker group
 * are plain `motion.div`s with no `whileInView`/`animate` of their own,
 * so they inherit the "hidden"/"show" state change from the ancestor that
 * does declare it, each applying its own transition. This is what makes
 * the sequencing (waveform, then markers) reliable: both fire from the
 * exact same scroll-into-view moment rather than two independently
 * observed viewport thresholds that could drift apart.
 */
const waveformRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

const markerGroup: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.7, staggerChildren: 0.15 } },
};

const markerPop: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};

/**
 * Mountain-range/waveform silhouette, three distinct peaks (with a valley
 * dipping between each) whose x-positions in the 0..1200 viewBox —
 * 264 (22%), 600 (50%), 936 (78%) — line up with each marker's
 * `leftPercent`, and whose y-positions are what `TIERS[].peakBottom` is
 * computed from, so each marker's line lands exactly on the peak beneath
 * it rather than floating above the silhouette with a visible gap.
 */
const WAVEFORM_TOP_EDGE =
  "M0,170 C90,175 180,140 264,80 C320,42 350,110 420,150 C480,185 520,70 600,15 C680,70 720,175 780,150 C850,115 880,55 936,95 C1000,140 1080,175 1200,170";

function Waveform() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 240"
      preserveAspectRatio="none"
      style={{ height: WAVEFORM_HEIGHT }}
      className="w-full"
    >
      <defs>
        <linearGradient id="prize-waveform-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.14" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${WAVEFORM_TOP_EDGE} L1200,240 L0,240 Z`} fill="url(#prize-waveform-fill)" />
      <path d={WAVEFORM_TOP_EDGE} fill="none" stroke="hsl(var(--border-light))" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Marker({ place, amount, featured, markerHeight, peakBottom, leftPercent }: Tier) {
  return (
    <motion.div
      variants={markerPop}
      className="absolute flex -translate-x-1/2 flex-col items-center"
      style={{ left: `${leftPercent}%`, bottom: peakBottom }}
    >
      <span className="font-body text-xs font-semibold tracking-[0.1em] text-text-muted uppercase">
        {place} Place
      </span>
      <span
        className={cn(
          "mt-1 font-display text-2xl font-bold tracking-[-0.01em] sm:text-3xl",
          featured ? "text-primary" : "text-text-primary"
        )}
      >
        {amount}
      </span>
      <span
        className={cn("mt-3 rounded-full", featured ? "size-3.5 bg-primary shadow-glow-primary" : "size-2.5 bg-primary/80")}
      />
      <span className={cn("w-px", featured ? "bg-primary/50" : "bg-border-light")} style={{ height: markerHeight }} />
    </motion.div>
  );
}

export function PrizeDisplay() {
  return (
    <div>
      <motion.div variants={headerRise} initial="hidden" animate="show">
        <p className="font-body text-xs font-semibold tracking-[0.08em] text-text-muted uppercase">Prizes</p>
        <h1 className="mt-4 font-display text-4xl leading-[1.1] font-bold tracking-[-0.01em] text-text-primary sm:text-5xl">
          Rewarding what matters
        </h1>
        <p className="mt-5 max-w-content-narrow text-lg leading-[1.6] text-text-secondary">
          ₹6,00,000 across three tiers, awarded at the on-site grand finale.
        </p>
        <div className="mt-8">
          <Button asChild variant="primary">
            <Link href="/register">Register Now</Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-20 flex items-end gap-6 sm:mt-24 lg:gap-12"
      >
        <div className="relative min-h-[440px] flex-1 sm:min-h-[480px]">
          <motion.div variants={markerGroup} className="absolute inset-0">
            {TIERS.map((tier) => (
              <Marker key={tier.place} {...tier} />
            ))}
          </motion.div>
          <motion.div variants={waveformRise} className="absolute inset-x-0 bottom-0">
            <Waveform />
          </motion.div>
        </div>

        <VerticalAccentText className="pb-10" />
      </motion.div>
    </div>
  );
}
