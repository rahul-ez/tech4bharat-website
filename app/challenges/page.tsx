export default function ChallengesPage() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-white">

      {/* Hero Section */}
      <section className="px-5 pt-16 pb-16 sm:px-6 sm:pt-20 sm:pb-20 md:px-12 md:pt-24 md:pb-24 lg:px-24 lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-6xl text-center">

          {/* Small heading */}
          <p className="mb-6 text-xs font-semibold tracking-[0.3em] text-orange-400 sm:text-sm sm:tracking-[0.4em]">
            TECH4BHARAT 2026
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-7xl lg:text-8xl">
            Build Solutions for
            <span className="mt-2 block text-orange-400">
              Real-World Challenges
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-8 max-w-4xl text-base leading-relaxed text-slate-400 sm:text-lg md:mt-10 md:text-xl lg:text-2xl">
            Tech4Bharat 2026 brings innovators together to explore meaningful
            problems and build practical, scalable technology solutions for
            India's next generation.
          </p>

        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Information Section */}
      <section className="bg-[#0f172a] px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24 lg:px-24">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-10 md:grid-cols-2 md:gap-16">

            {/* Left Side */}
            <div>
              <p className="mb-5 text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]">
                THE CHALLENGES
              </p>

              <h2 className="text-4xl font-bold leading-tight sm:text-5xl md:text-5xl lg:text-6xl">
                Problems That Matter
              </h2>
            </div>

            {/* Right Side */}
            <div className="space-y-6 text-base leading-relaxed text-slate-400 sm:text-lg md:space-y-8 md:text-xl">
              <p>
                Tech4Bharat is focused on encouraging participants to identify,
                explore and solve meaningful real-world challenges through
                technology and innovation.
              </p>

              <p>
                The official problem statements and challenge structure for
                Tech4Bharat 2026 will be announced by the organizers.
              </p>

              <p>
                Until then, participants can explore the theme and begin
                thinking about scalable innovations that can contribute to
                India's next generation.
              </p>
            </div>

          </div>


          {/* Coming Soon Card */}
          <div className="mt-12 rounded-3xl border border-white/10 bg-[#111827] p-7 text-center sm:mt-16 sm:p-10 md:mt-20 md:p-16">

            <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]">
              COMING SOON
            </p>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Official Challenge Statements
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg md:text-xl">
              Challenge details and problem statements will be published once
              they are officially confirmed by the Tech4Bharat 2026 organizers.
            </p>

          </div>

        </div>
      </section>

    </main>
  );
}