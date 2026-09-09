import { PageBackdrop } from "@/components/public/page-backdrop";
import { ApproachSteps } from "@/components/public/approach-steps";
import { PendingConfirmationState } from "@/components/public/pending-confirmation-state";
import { TextReveal } from "@/components/ui/text-reveal";

export default function ChallengesPage() {
  return (
    <PageBackdrop>
      <main className="min-h-screen text-white">

        {/* Hero Section */}
        <section className="px-5 pt-16 pb-16 sm:px-6 sm:pt-20 sm:pb-20 md:px-12 md:pt-24 md:pb-24 lg:px-24 lg:pt-32 lg:pb-24">
          <div className="mx-auto max-w-6xl text-center">

            <TextReveal
              as="p"
              className="mb-6 text-xs font-semibold tracking-[0.3em] text-orange-400 sm:text-sm sm:tracking-[0.4em]"
            >
              THE CHALLENGES
            </TextReveal>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-7xl lg:text-8xl">
              <TextReveal as="span" split="word" delayChildren={0.1} className="inline-block">
                Build Solutions for
              </TextReveal>
              <TextReveal
                as="span"
                split="word"
                delayChildren={0.35}
                className="mt-2 block text-orange-400"
              >
                Real-World Challenges
              </TextReveal>
            </h1>

            <TextReveal
              as="p"
              delayChildren={0.5}
              className="mx-auto mt-8 max-w-4xl text-base leading-relaxed text-slate-400 sm:text-lg md:mt-10 md:text-xl lg:text-2xl"
            >
              Tech4Bharat 2026 brings innovators together to explore meaningful
              problems and build practical, scalable technology solutions for
              India&apos;s next generation.
            </TextReveal>

          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Approach Section */}
        <section className="bg-[#0f172a] px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24 lg:px-24">
          <div className="mx-auto max-w-6xl">

            <div className="mx-auto max-w-3xl text-center">
              <TextReveal
                as="p"
                className="mb-5 text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]"
              >
                THE APPROACH
              </TextReveal>

              <TextReveal
                as="h2"
                split="word"
                delayChildren={0.1}
                className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
              >
                From Problem to Prototype
              </TextReveal>

              <TextReveal
                as="p"
                delayChildren={0.35}
                className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg md:text-xl"
              >
                Every team follows the same journey — from identifying a real
                problem to shipping something that solves it.
              </TextReveal>
            </div>

            <div className="mt-16 md:mt-20">
              <ApproachSteps />
            </div>

            <TextReveal
              as="p"
              delayChildren={0.2}
              className="mt-16 flex items-center justify-center gap-4 text-xs font-semibold tracking-[0.3em] text-text-muted uppercase sm:mt-20 sm:text-sm"
            >
              <span aria-hidden="true" className="hidden h-px w-10 bg-border-muted sm:block" />
              Real Problems. Real Solutions.
              <span aria-hidden="true" className="hidden h-px w-10 bg-border-muted sm:block" />
            </TextReveal>

          </div>
        </section>

        {/* Pending Content Section */}
        <section className="px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24 lg:px-24">
          <div className="mx-auto max-w-4xl">
            <PendingConfirmationState
              heading="Official Challenge Statements"
              message="Challenge details and problem statements will be published once they are officially confirmed by the Tech4Bharat 2026 organizers."
            />
          </div>
        </section>

      </main>
    </PageBackdrop>
  );
}
