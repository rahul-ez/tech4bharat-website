export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#0b1120] text-white">

      {/* HERO SECTION */}
      <section className="border-b border-white/10 px-6 py-24 text-center md:px-12 md:py-32">

        <p className="mb-6 text-sm font-semibold tracking-[0.35em] text-orange-400">
          TECH4BHARAT 2026
        </p>

        <h1 className="text-5xl font-bold leading-tight md:text-7xl">
          Register for
          <span className="block text-orange-400">
            Tech4Bharat 2026
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
          Join innovators, developers and problem solvers from across India
          and be part of the journey towards building scalable innovations
          for India's next generation.
        </p>

      </section>

      {/* REGISTRATION SECTION */}
      <section className="px-6 py-24 md:px-12 lg:px-24">

        <div className="mx-auto max-w-6xl">

          {/* Heading */}
          <div className="text-center">

            <p className="mb-6 text-sm font-semibold tracking-[0.3em] text-orange-400">
              REGISTRATION
            </p>

            <h2 className="text-4xl font-bold md:text-6xl">
              Be Part of the
              <span className="block text-orange-400">
                Innovation Journey
              </span>
            </h2>

          </div>

          {/* Registration Card */}
          <div className="mx-auto mt-16 max-w-4xl rounded-3xl border border-white/10 bg-[#171d2b] p-8 text-center md:p-16">

            <p className="text-sm font-semibold tracking-[0.3em] text-orange-400">
              REGISTRATION OPENS
            </p>

            <h3 className="mt-5 text-4xl font-bold md:text-6xl">
              7 September 2026
            </h3>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400">
              Registration for Tech4Bharat 2026 will open soon. Complete your
              registration and begin your journey towards building meaningful
              technology solutions.
            </p>

            {/* Button */}
            <button
              className="mt-10 rounded-full bg-orange-500 px-10 py-4 text-lg font-semibold text-white transition hover:bg-orange-600"
            >
              Registration Opening Soon
            </button>

          </div>

        </div>

      </section>

      {/* WHAT YOU NEED SECTION */}
      <section className="border-t border-white/10 bg-[#0f172a] px-6 py-24 md:px-12 lg:px-24">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="mb-6 text-sm font-semibold tracking-[0.3em] text-orange-400">
              GET READY
            </p>

            <h2 className="text-4xl font-bold md:text-6xl">
              What You'll Need
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
              Keep the following information ready when the official
              registration process opens.
            </p>

          </div>

          {/* Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="rounded-3xl border border-white/10 bg-[#171d2b] p-8">

              <p className="text-sm font-semibold tracking-[0.3em] text-orange-400">
                01
              </p>

              <h3 className="mt-6 text-2xl font-bold">
                Participant Details
              </h3>

              <p className="mt-4 leading-relaxed text-slate-400">
                Basic participant information and relevant details required
                for the official registration process.
              </p>

            </div>

            {/* Card 2 */}
            <div className="rounded-3xl border border-white/10 bg-[#171d2b] p-8">

              <p className="text-sm font-semibold tracking-[0.3em] text-orange-400">
                02
              </p>

              <h3 className="mt-6 text-2xl font-bold">
                Team Information
              </h3>

              <p className="mt-4 leading-relaxed text-slate-400">
                Team details may be required depending on the official
                participation and team formation guidelines.
              </p>

            </div>

            {/* Card 3 */}
            <div className="rounded-3xl border border-white/10 bg-[#171d2b] p-8">

              <p className="text-sm font-semibold tracking-[0.3em] text-orange-400">
                03
              </p>

              <h3 className="mt-6 text-2xl font-bold">
                Official Guidelines
              </h3>

              <p className="mt-4 leading-relaxed text-slate-400">
                Make sure to review the official rules, eligibility criteria
                and participation requirements before registering.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* IMPORTANT NOTICE */}
      <section className="border-t border-white/10 px-6 py-24 text-center md:px-12">

        <div className="mx-auto max-w-4xl">

          <p className="text-sm font-semibold tracking-[0.3em] text-orange-400">
            IMPORTANT NOTICE
          </p>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Stay Updated
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-slate-400 md:text-xl">
            Registration details, eligibility requirements and participation
            guidelines will be updated as official information is confirmed by
            the Tech4Bharat 2026 organizers.
          </p>

        </div>

      </section>

    </main>
  );
}