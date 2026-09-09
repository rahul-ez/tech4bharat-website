"use client";

import { ClipboardCheck, Gavel, Lightbulb, Shield, Upload, Users } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { IconCard } from "@/components/ui/icon-card";

/**
 * RulesGrid — `/rules`' 3x2 `IconCard` grid, one-time staggered entrance.
 * A categorical grid, not a sequence — deliberately no connecting line or
 * numbering motif here, unlike Timeline's spine or Challenges'
 * `ApproachSteps` connector, so `/rules` reads as visually distinct from
 * both rather than a third instance of the same "sequence" shape.
 *
 * The six rules (icon + title + description) are defined here, inside
 * this "use client" component, rather than passed in as props from the
 * server-rendered `app/rules/page.tsx` — a first attempt did the latter
 * and the build failed: Lucide icon components are functions, and
 * functions can't be serialized across the Server → Client Component
 * boundary as props. Timeline's own `MILESTONES` array (icons included)
 * is defined the same way, inside its own "use client" file, for the
 * same reason.
 *
 * Entrance follows the same one-shared-trigger technique as every other
 * animated grid this session: a single ancestor `motion.div` declares
 * `whileInView`/`viewport={{ once: true }}`, propagating to each card via
 * variant propagation rather than independent per-card triggers.
 */
interface Rule {
  icon: typeof ClipboardCheck;
  title: string;
  description: string;
}

const RULES: Rule[] = [
  {
    icon: ClipboardCheck,
    title: "Eligibility",
    description:
      "Tech4Bharat 2026 is open to eligible participants as per the official guidelines announced by the organizers.",
  },
  {
    icon: Users,
    title: "Team Participation",
    description:
      "Participants may compete individually or in teams, subject to the official team size and participation requirements.",
  },
  {
    icon: Lightbulb,
    title: "Original Work",
    description:
      "All submissions must represent original work created by the participating team. Any external resources or open-source technologies used must be properly acknowledged.",
  },
  {
    icon: Shield,
    title: "Code of Conduct",
    description:
      "Participants are expected to maintain respectful, professional and ethical conduct throughout the hackathon.",
  },
  {
    icon: Upload,
    title: "Submission Requirements",
    description:
      "Teams must submit their projects and required materials within the deadlines specified by the organizers.",
  },
  {
    icon: Gavel,
    title: "Organizer Decisions",
    description:
      "The decisions made by the Tech4Bharat 2026 organizers and judging panel regarding the competition will be considered final.",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export function RulesGrid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={grid}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:auto-rows-fr lg:grid-cols-3"
    >
      {RULES.map((rule) => (
        <motion.div key={rule.title} variants={card} className="h-full">
          <IconCard icon={rule.icon} title={rule.title} description={rule.description} className="h-full" />
        </motion.div>
      ))}
    </motion.div>
  );
}
