"use client";

import { useState } from "react";

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
    answer:
      "The on-site grand finale is scheduled for 25–27 December 2026 in Bengaluru, India.",
  },
  {
    question: "When does registration open?",
    answer:
      "Registration is scheduled to open on 7 September 2026. Further registration details will be shared once the workflow is officially confirmed.",
  },
  {
    question: "Where will the hackathon take place?",
    answer:
      "The grand finale will take place in Bengaluru, India. Specific venue details will be announced by the organizers.",
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
    answer:
      "The registration workflow is currently being finalized. The Register page will be updated once the official registration process is confirmed.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#0b1120] text-white">

      {/* HERO */}
      <section className="border-b border-white/10 px-6 py-16 text-center sm:py-20 md:px-12 md:py-28 lg:py-32">
        <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-orange-400 sm:text-sm sm:tracking-[0.35em]">
          TECH4BHARAT 2026
        </p>

        <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
          Frequently Asked
          <span className="block text-orange-400">
            Questions
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8 md:mt-8 md:text-xl">
          Everything you need to know about Tech4Bharat 2026. More information
          will continue to be added as event details are officially confirmed.
        </p>
      </section>

      {/* FAQ SECTION */}
      <section className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24">

        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]">
            HAVE QUESTIONS?
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            We&apos;ve Got Answers
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:rounded-2xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6 sm:py-6 md:px-8"
              >
                <span className="text-base font-semibold leading-6 sm:text-lg md:text-xl">
                  {faq.question}
                </span>

                <span className="shrink-0 text-xl text-orange-400 sm:text-2xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>

              {openIndex === index && (
                <div className="border-t border-white/10 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5 md:px-8 md:pb-8">
                  <p className="text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* UPDATE SECTION */}
      <section className="border-t border-white/10 bg-white/[0.02] px-6 py-16 text-center sm:py-20 md:py-24">

        <p className="text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]">
          STILL HAVE QUESTIONS?
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold sm:text-4xl md:text-5xl">
          More details are coming soon.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
          Tech4Bharat 2026 information will continue to be updated as official
          details are confirmed by the organizers.
        </p>

      </section>

    </main>
  );
}