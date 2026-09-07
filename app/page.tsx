"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080d1a] text-white">

      {/* HERO SECTION */}
      <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">

        <p className="mb-5 text-sm font-semibold tracking-[0.3em] text-orange-400">
          TECH4BHARAT 2026
        </p>

        <h1 className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
          Scalable Innovations for
          <span className="block text-orange-400">
            Next-Gen India
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
          A national hackathon bringing together innovators, developers and
          problem solvers to build practical and scalable technology solutions
          for real-world Indian challenges.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Link
            href="/register"
            className="rounded-full bg-orange-500 px-8 py-4 font-semibold transition hover:bg-orange-600"
          >
            Register Now
          </Link>

          <Link
            href="/about"
            className="rounded-full border border-white/30 px-8 py-4 font-semibold transition hover:bg-white hover:text-black"
          >
            Explore Tech4Bharat
          </Link>

        </div>

        {/* EVENT INFO */}
        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-400">
              Grand Finale
            </p>

            <p className="mt-2 text-xl font-semibold">
              25–27 December 2026
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-400">
              Location
            </p>

            <p className="mt-2 text-xl font-semibold">
              Bengaluru, India
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-gray-400">
              Total Prize Pool
            </p>

            <p className="mt-2 text-xl font-semibold text-orange-400">
              ₹6,00,000
            </p>
          </div>

        </div>

      </section>


      {/* ABOUT PREVIEW */}
      <section className="border-t border-white/10 px-6 py-24 md:px-12">

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">

          <div>

            <p className="text-sm font-semibold tracking-widest text-orange-400">
              ABOUT THE HACKATHON
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              Build ideas that can scale across India.
            </h2>

          </div>


          <div>

            <p className="text-lg leading-relaxed text-gray-400">
              Tech4Bharat 2026 is a national hackathon associated with the
              Global Accelerator Vision Summit (GAVS) 2026. It brings together
              student innovators and developers to create technology solutions
              for real-world challenges.
            </p>

            <Link
              href="/about"
              className="mt-6 inline-block text-orange-400 transition hover:underline"
            >
              Learn more about Tech4Bharat →
            </Link>

          </div>

        </div>

      </section>


      {/* KEY DATES */}
      <section className="border-y border-white/5 bg-white/5 px-6 py-24 md:px-12">

        <div className="mx-auto max-w-6xl">

          <p className="text-center text-sm font-semibold tracking-widest text-orange-400">
            KEY DATES
          </p>

          <h2 className="mt-4 text-center text-4xl font-bold">
            Your Tech4Bharat Journey
          </h2>


          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {/* REGISTRATION */}

            <div className="rounded-2xl border border-white/10 bg-[#080d1a] p-7 transition hover:border-orange-400/40">

              <p className="text-sm font-semibold tracking-wider text-orange-400">
                07 SEPT 2026
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Registration Opens
              </h3>

              <p className="mt-2 text-gray-400">
                Begin your journey towards Tech4Bharat 2026.
              </p>

            </div>


            {/* PRELIMINARY */}

            <div className="rounded-2xl border border-white/10 bg-[#080d1a] p-7 transition hover:border-orange-400/40">

              <p className="text-sm font-semibold tracking-wider text-orange-400">
                ONLINE
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Preliminary Rounds
              </h3>

              <p className="mt-2 text-gray-400">
                Participate in the online preliminary rounds.
              </p>

            </div>


            {/* FINALE */}

            <div className="rounded-2xl border border-white/10 bg-[#080d1a] p-7 transition hover:border-orange-400/40">

              <p className="text-sm font-semibold tracking-wider text-orange-400">
                25–27 DEC 2026
              </p>

              <h3 className="mt-3 text-xl font-semibold">
                Grand Finale
              </h3>

              <p className="mt-2 text-gray-400">
                Shortlisted teams compete at the on-site grand finale in
                Bengaluru.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* PRIZE SECTION */}
      <section className="px-6 py-24 md:px-12">

        <div className="mx-auto max-w-6xl text-center">

          <p className="text-sm font-semibold tracking-[0.3em] text-orange-400">
            PRIZES
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            ₹6,00,000 Prize Pool
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-400">
            Celebrating the most impactful and innovative solutions built for
            Next-Gen India.
          </p>


          {/* PRIZE CARDS */}
          <div className="mt-14 grid gap-6 md:grid-cols-3 md:items-center">


            {/* THIRD PLACE */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-orange-400/40">

              <p className="text-sm font-semibold tracking-[0.2em] text-gray-400">
                THIRD PLACE
              </p>

              <div className="mt-6 text-5xl">
                🥉
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                3rd Place
              </h3>

              <p className="mt-4 text-4xl font-bold text-white">
                ₹1,00,000
              </p>

              <p className="mt-4 text-sm text-gray-400">
                Recognizing an exceptional innovation.
              </p>

            </div>


            {/* FIRST PLACE */}
            <div className="relative rounded-2xl border border-orange-400 bg-orange-500/10 p-10 shadow-[0_0_60px_rgba(249,115,22,0.12)] transition duration-300 hover:-translate-y-2">

              {/* WINNER BADGE */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-5 py-2 text-xs font-bold tracking-widest text-white">
                GRAND WINNER
              </div>

              <p className="text-sm font-semibold tracking-[0.2em] text-orange-400">
                FIRST PLACE
              </p>

              <div className="mt-7 text-6xl">
                🏆
              </div>

              <h3 className="mt-6 text-3xl font-bold">
                1st Place
              </h3>

              <p className="mt-4 text-5xl font-bold text-orange-400">
                ₹3,00,000
              </p>

              <p className="mt-4 text-sm text-gray-400">
                Awarded to the most impactful solution.
              </p>

            </div>


            {/* SECOND PLACE */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-orange-400/40">

              <p className="text-sm font-semibold tracking-[0.2em] text-gray-400">
                SECOND PLACE
              </p>

              <div className="mt-6 text-5xl">
                🥈
              </div>

              <h3 className="mt-6 text-2xl font-semibold">
                2nd Place
              </h3>

              <p className="mt-4 text-4xl font-bold text-white">
                ₹2,00,000
              </p>

              <p className="mt-4 text-sm text-gray-400">
                Celebrating outstanding innovation.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="border-t border-white/10 bg-orange-500 px-6 py-24 text-center">

        <p className="text-sm font-semibold tracking-widest text-white/70">
          TECH4BHARAT 2026
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-bold md:text-5xl">
          Ready to build the future?
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-white/80">
          Join innovators and developers working towards scalable solutions
          for Next-Gen India.
        </p>

        <Link
          href="/register"
          className="mt-8 inline-block rounded-full bg-[#080d1a] px-8 py-4 font-semibold text-white transition hover:bg-black"
        >
          Register for Tech4Bharat
        </Link>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-500">

        © 2026 Tech4Bharat. Associated with GAVS 2026.

      </footer>

    </main>
  );
}