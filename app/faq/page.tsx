"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";

import { PageBackdrop } from "@/components/public/page-backdrop";
import { VerticalAccentText } from "@/components/ui/vertical-accent-text";
import { TextReveal } from "@/components/ui/text-reveal";

/**
 * FAQPage — numbered accordion (01-09) + the vertical accent text device
 * shared with Prize Display (`components/ui/vertical-accent-text.tsx`),
 * per direct instruction. The sidebar-categorized layout offered as an
 * alternative was explicitly rejected — too many single-item categories
 * for the current question count (9 questions don't split meaningfully
 * into named categories yet).
 *
 * All nine answers were checked against `tbd.md` before this redesign
 * touched anything: the three flagged (challenge statements, eligibility/
 * team rules, registration) already give honest pending-confirmation
 * answers with no invented specifics — copy is unchanged from the
 * previous version, only the presentation changed.
 *
 * `PageBackdrop`'s grid texture (DEC-010) was missing here entirely on
 * the previous version — every other redesigned page (`/about`,
 * `/challenges`, `/rules`) already has it; this brings `/faq` in line.
 */

const faqs = [
  {
    question: "What is Tech4Bharat 2026?",
    answer:
      "Tech4Bharat 2026 is a national hackathon associated with the Global Accelerator Vision Summit (GAVS) 2026. It brings together innovators, developers and problem solvers to build practical and scalable technology solutions for real-world Indian challenges.",
  },
  {
    question: "What is the theme of Tech4Bharat 2026?",
    answer:
      'The theme is "Scalable Innovations for Next-Gen India." Participants will be encouraged to explore practical technology solutions with meaningful real-world impact.',
  },
  {
    question: "When is the grand finale?",
    answer: "The on-site grand finale is scheduled for 25–27 December 2026 in Bengaluru, India.",
  },
  {
    question: "When does registration open?",
    answer:
      "Registration is scheduled to open on 7 September 2026. Further registration details will be shared once the workflow is officially confirmed.",
  },
  {
    question: "Where will the hackathon take place?",
    answer: "The grand finale will take place in Bengaluru, India. Specific venue details will be announced by the organizers.",
  },
  {
    question: "What is the prize pool?",
    answer:
      "The total prize pool for Tech4Bharat 2026 is ₹6,00,000, with ₹3,00,000 for first place, ₹2,00,000 for second place and ₹1,00,000 for third place.",
  },
  {
    question: "What are the challenge statements?",
    answer:
      "Official challenge tracks and problem statements have not yet been confirmed. They will be announced by the organizers and updated on the Challenges page.",
  },
  {
    question: "What are the eligibility and team rules?",
    answer:
      "Eligibility criteria, team size and participation rules are currently pending organizer confirmation. Official information will be published once confirmed.",
  },
  {
    question: "How do I register?",
    answer: "The registration workflow is currently being finalized. The Register page will be updated once the official registration process is confirmed.",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <PageBackdrop>
      <main className="min-h-screen text-white">

        {/* HERO */}
        <section className="border-b border-white/10 px-6 py-16 text-center sm:py-20 md:px-12 md:py-28 lg:py-32">
          <TextReveal
            as="p"
            className="mb-5 text-xs font-semibold tracking-[0.3em] text-orange-400 sm:text-sm sm:tracking-[0.35em]"
          >
            TECH4BHARAT 2026
          </TextReveal>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
            <TextReveal as="span" split="word" delayChildren={0.1} className="inline-block">
              Frequently Asked
            </TextReveal>
            <TextReveal as="span" split="word" delayChildren={0.3} className="block text-orange-400">
              Questions
            </TextReveal>
          </h1>

          <TextReveal
            as="p"
            delayChildren={0.45}
            className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8 md:mt-8 md:text-xl"
          >
            Everything you need to know about Tech4Bharat 2026. More information
            will continue to be added as event details are officially confirmed.
          </TextReveal>
        </section>

        {/* FAQ SECTION */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24">

          <div className="mb-10 text-center sm:mb-12">
            <TextReveal
              as="p"
              className="mb-4 text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]"
            >
              HAVE QUESTIONS?
            </TextReveal>

            <TextReveal as="h2" split="word" delayChildren={0.1} className="text-3xl font-bold sm:text-4xl md:text-5xl">
              We&apos;ve Got Answers
            </TextReveal>
          </div>

          <div className="flex items-start gap-10 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={list}
              className="flex-1 space-y-3 sm:space-y-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  variants={item}
                  className="overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:rounded-2xl"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6 sm:py-6 md:px-8"
                  >
                    <span className="shrink-0 font-display text-sm font-bold text-primary sm:text-base">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="flex-1 text-base font-semibold leading-6 sm:text-lg md:text-xl">
                      {faq.question}
                    </span>

                    <span className="shrink-0 text-xl text-orange-400 sm:text-2xl">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  {openIndex === index && (
                    <div className="border-t border-white/10 px-5 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6 md:px-8 md:pb-8">
                      <p className="pl-9 text-sm leading-6 text-slate-400 sm:pl-11 sm:text-base sm:leading-7">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            <VerticalAccentText className="pt-4" />
          </div>

        </section>

        {/* UPDATE SECTION */}
        <section className="border-t border-white/10 bg-white/[0.02] px-6 py-16 text-center sm:py-20 md:py-24">

          <TextReveal
            as="p"
            className="text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]"
          >
            STILL HAVE QUESTIONS?
          </TextReveal>

          <TextReveal
            as="h2"
            split="word"
            delayChildren={0.1}
            className="mx-auto mt-5 max-w-3xl text-3xl font-bold sm:text-4xl md:text-5xl"
          >
            More details are coming soon.
          </TextReveal>

          <TextReveal
            as="p"
            delayChildren={0.3}
            className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7"
          >
            Tech4Bharat 2026 information will continue to be updated as official
            details are confirmed by the organizers.
          </TextReveal>

        </section>

      </main>
    </PageBackdrop>
  );
}
