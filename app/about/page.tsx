import { PageBackdrop } from "@/components/public/page-backdrop";
import { IndiaNetworkMap, GlobalNetworkGlobe } from "@/components/public/network-graphic";
import { getIndiaFeature, getWorldLandFeature } from "@/lib/geo";
import { TextReveal } from "@/components/ui/text-reveal";

export default function AboutPage() {
  const indiaFeature = getIndiaFeature();
  const worldLandFeature = getWorldLandFeature();

  return (
    <PageBackdrop>
      <main className="min-h-screen text-white">

        {/* Hero Section */}
        <section className="px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24 lg:px-24 lg:py-28">
          <div className="mx-auto max-w-6xl text-center">

            <TextReveal
              as="p"
              className="mb-6 text-xs font-semibold tracking-[0.3em] text-orange-400 sm:text-sm sm:tracking-[0.4em]"
            >
              ABOUT TECH4BHARAT
            </TextReveal>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-7xl lg:text-8xl">
              <TextReveal as="span" split="word" delayChildren={0.1} className="inline-block">
                Building for the
              </TextReveal>
              <TextReveal
                as="span"
                split="word"
                delayChildren={0.35}
                className="mt-2 block text-orange-400"
              >
                Next Generation of India
              </TextReveal>
            </h1>

            <TextReveal
              as="p"
              delayChildren={0.5}
              className="mx-auto mt-8 max-w-5xl text-base leading-relaxed text-slate-400 sm:text-lg md:mt-10 md:text-xl lg:text-2xl"
            >
              Tech4Bharat 2026 is a national hackathon associated with the Global
              Accelerator Vision Summit (GAVS) 2026, bringing together innovators,
              developers and problem solvers to build practical, scalable
              technology solutions for real-world Indian challenges.
            </TextReveal>

          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-white/10" />


        {/* What is Tech4Bharat */}
        <section className="px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24 lg:px-24">
          <div className="mx-auto max-w-7xl">

            <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">

              {/* Left: heading + copy */}
              <div>
                <TextReveal
                  as="p"
                  className="mb-5 text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]"
                >
                  THE HACKATHON
                </TextReveal>

                <TextReveal
                  as="h2"
                  split="word"
                  delayChildren={0.1}
                  className="text-4xl font-bold leading-tight sm:text-5xl md:text-5xl lg:text-6xl"
                >
                  What is Tech4Bharat?
                </TextReveal>

                <div className="mt-6 space-y-6 text-base leading-relaxed text-slate-400 sm:text-lg md:mt-8 md:space-y-8 md:text-xl">

                  <TextReveal as="p" delayChildren={0.3}>
                    Tech4Bharat 2026 is designed to encourage participants to think
                    beyond ideas and build practical technology solutions that can
                    address real-world challenges.
                  </TextReveal>

                  <TextReveal as="p" delayChildren={0.4}>
                    The hackathon brings together student developers, innovators and
                    problem solvers from across India to collaborate, experiment and
                    create scalable innovations.
                  </TextReveal>

                  <TextReveal as="p" delayChildren={0.5}>
                    The journey begins with online preliminary rounds and culminates
                    in an on-site grand finale in Bengaluru.
                  </TextReveal>

                </div>
              </div>

              {/* Right: India network map */}
              <IndiaNetworkMap feature={indiaFeature} />

            </div>
          </div>
        </section>


        {/* Theme Section */}
        <section className="bg-[#1a2030] px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24 lg:px-24">
          <div className="mx-auto max-w-6xl text-center">

            <TextReveal
              as="p"
              className="mb-6 text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]"
            >
              OUR THEME
            </TextReveal>

            <h2 className="text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
              <TextReveal as="span" split="word" delayChildren={0.1} className="inline-block">
                Scalable Innovations for
              </TextReveal>
              <TextReveal
                as="span"
                split="word"
                delayChildren={0.35}
                className="mt-2 block text-orange-400"
              >
                Next-Gen India
              </TextReveal>
            </h2>

            <TextReveal
              as="p"
              delayChildren={0.5}
              className="mx-auto mt-8 max-w-4xl text-base leading-relaxed text-slate-400 sm:text-lg md:mt-10 md:text-xl lg:text-2xl"
            >
              The focus is on building solutions that are practical, impactful and
              capable of scaling to meet the needs of India&apos;s next generation.
            </TextReveal>

          </div>
        </section>


        {/* GAVS Section */}
        <section className="px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24 lg:px-24">
          <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-[#171d2b] p-7 sm:p-10 md:p-16 lg:p-20">

            <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">

              {/* Left: heading + copy */}
              <div>
                <TextReveal
                  as="p"
                  className="mb-5 text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]"
                >
                  GAVS 2026
                </TextReveal>

                <TextReveal
                  as="h2"
                  split="word"
                  delayChildren={0.1}
                  className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
                >
                  Connected to the Global Accelerator Vision Summit
                </TextReveal>

                <TextReveal
                  as="p"
                  delayChildren={0.4}
                  className="mt-6 max-w-5xl text-base leading-relaxed text-slate-400 sm:text-lg md:mt-8 md:text-xl"
                >
                  Tech4Bharat is associated with the Global Accelerator Vision Summit
                  (GAVS) 2026 while maintaining its own identity as a dedicated
                  national hackathon focused on innovation and technology.
                </TextReveal>
              </div>

              {/* Right: globe, zoomed out from the India map above */}
              <GlobalNetworkGlobe landFeature={worldLandFeature} />

            </div>

          </div>
        </section>

      </main>
    </PageBackdrop>
  );
}
