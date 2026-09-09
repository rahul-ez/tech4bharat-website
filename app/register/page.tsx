import { PageBackdrop } from "@/components/public/page-backdrop";
import { TicketPass } from "@/components/public/ticket-pass";
import { InterestForm } from "@/components/public/interest-form";
import { VerticalAccentText } from "@/components/ui/vertical-accent-text";
import { TextReveal } from "@/components/ui/text-reveal";

/**
 * RegisterPage — rebuilt around a boarding-pass/event-ticket visual
 * metaphor, per `context/decisions.md` DEC-017. Deliberately different
 * from every other page's approach (no accordion, no icon grid, no
 * waveform/network-graphic illustration) — this is the one page where a
 * "you're holding a ticket to something real, once it's confirmed" frame
 * fits the content (a not-yet-open registration) better than a generic
 * hero+cards layout.
 */
export default function RegisterPage() {
  return (
    <PageBackdrop>
      <main className="min-h-screen text-white">

        {/* HERO */}
        <section className="px-5 pt-16 pb-10 text-center sm:px-6 sm:pt-20 md:px-12 md:pt-24">
          <TextReveal
            as="p"
            className="mb-5 text-xs font-semibold tracking-[0.3em] text-primary sm:text-sm sm:tracking-[0.35em]"
          >
            TECH4BHARAT 2026
          </TextReveal>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <TextReveal as="span" split="word" delayChildren={0.1} className="inline-block">
              Your Pass to
            </TextReveal>
            <TextReveal as="span" split="word" delayChildren={0.3} className="mt-2 block text-primary">
              Tech4Bharat 2026
            </TextReveal>
          </h1>

          <TextReveal
            as="p"
            delayChildren={0.45}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg"
          >
            Registration hasn&apos;t opened yet. Here&apos;s what your pass will look
            like — details fill in as the organizers confirm them.
          </TextReveal>
        </section>

        {/* TICKET */}
        <section className="px-5 py-10 sm:px-6 md:px-12">
          <TicketPass />
        </section>

        {/* INTEREST FORM — the page's actual functional element; the ticket
            above is illustrative, this is what visitors can do today. */}
        <section className="px-5 py-10 sm:px-6 md:px-12">
          <InterestForm />
        </section>

        {/* GATE / TERMINAL CLOSING SECTION */}
        <section className="border-t border-white/10 px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24">
          <div className="mx-auto flex max-w-4xl items-center gap-10 text-center lg:gap-16">
            <div className="flex-1">
              <TextReveal
                as="p"
                className="text-xs font-semibold tracking-[0.25em] text-primary uppercase sm:text-sm sm:tracking-[0.3em]"
              >
                Gate Status
              </TextReveal>

              <TextReveal
                as="h2"
                split="word"
                delayChildren={0.1}
                className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl"
              >
                Boarding details coming soon.
              </TextReveal>

              <TextReveal
                as="p"
                delayChildren={0.3}
                className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-text-secondary sm:text-base sm:leading-7"
              >
                Registration details, eligibility requirements and participation
                guidelines will be updated as official information is confirmed
                by the Tech4Bharat 2026 organizers.
              </TextReveal>
            </div>

            <VerticalAccentText />
          </div>
        </section>

      </main>
    </PageBackdrop>
  );
}
