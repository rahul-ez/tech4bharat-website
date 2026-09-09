import { PageBackdrop } from "@/components/public/page-backdrop";
import { RulesGrid } from "@/components/public/rules-grid";
import { NotificationBanner } from "@/components/public/notification-banner";
import { TextReveal } from "@/components/ui/text-reveal";

export default function RulesPage() {
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
              Rules &amp;
            </TextReveal>
            <TextReveal as="span" split="word" delayChildren={0.3} className="block text-orange-400">
              Guidelines
            </TextReveal>
          </h1>

          <TextReveal
            as="p"
            delayChildren={0.45}
            className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8 md:mt-8 md:text-xl"
          >
            Everything you need to know before participating in Tech4Bharat 2026.
            Please read the guidelines carefully before registering.
          </TextReveal>
        </section>

        {/* RULES SECTION */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24">

          <div className="mb-12 text-center">
            <TextReveal
              as="p"
              className="mb-4 text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]"
            >
              PARTICIPATION GUIDELINES
            </TextReveal>

            <TextReveal as="h2" split="word" delayChildren={0.1} className="text-3xl font-bold sm:text-4xl md:text-5xl">
              Know Before You Build
            </TextReveal>
          </div>

          <RulesGrid />

        </section>

        {/* IMPORTANT NOTICE */}
        <section className="border-t border-white/10 bg-white/[0.02] px-6 py-16 sm:py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <NotificationBanner
              variant="warning"
              eyebrow="Important"
              heading="Official Guidelines May Be Updated"
              message="Some participation rules and requirements may be updated as official event details are finalized. Participants should regularly check the Tech4Bharat website for the latest information."
            />
          </div>
        </section>

      </main>
    </PageBackdrop>
  );
}
