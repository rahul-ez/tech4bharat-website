export default function RulesPage() {
  const rules = [
    {
      number: "01",
      title: "Eligibility",
      description:
        "Tech4Bharat 2026 is open to eligible participants as per the official guidelines announced by the organizers.",
    },
    {
      number: "02",
      title: "Team Participation",
      description:
        "Participants may compete individually or in teams, subject to the official team size and participation requirements.",
    },
    {
      number: "03",
      title: "Original Work",
      description:
        "All submissions must represent original work created by the participating team. Any external resources or open-source technologies used must be properly acknowledged.",
    },
    {
      number: "04",
      title: "Code of Conduct",
      description:
        "Participants are expected to maintain respectful, professional and ethical conduct throughout the hackathon.",
    },
    {
      number: "05",
      title: "Submission Requirements",
      description:
        "Teams must submit their projects and required materials within the deadlines specified by the organizers.",
    },
    {
      number: "06",
      title: "Organizer Decisions",
      description:
        "The decisions made by the Tech4Bharat 2026 organizers and judging panel regarding the competition will be considered final.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      
      {/* HERO */}
      <section className="border-b border-white/10 px-6 py-16 text-center sm:py-20 md:px-12 md:py-28 lg:py-32">
        <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-orange-400 sm:text-sm sm:tracking-[0.35em]">
          TECH4BHARAT 2026
        </p>

        <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-7xl">
          Rules &
          <span className="block text-orange-400">
            Guidelines
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8 md:mt-8 md:text-xl">
          Everything you need to know before participating in Tech4Bharat 2026.
          Please read the guidelines carefully before registering.
        </p>
      </section>

      {/* RULES SECTION */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24">
        
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]">
            PARTICIPATION GUIDELINES
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Know Before You Build
          </h2>
        </div>

        {/* RULE CARDS */}
        <div className="grid gap-5 md:grid-cols-2">
          {rules.map((rule) => (
            <div
              key={rule.number}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8"
            >
              <p className="text-sm font-semibold tracking-[0.2em] text-orange-400">
                {rule.number}
              </p>

              <h3 className="mt-4 text-2xl font-bold">
                {rule.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                {rule.description}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* IMPORTANT NOTICE */}
      <section className="border-t border-white/10 bg-white/[0.02] px-6 py-16 text-center sm:py-20 md:py-24">
        <div className="mx-auto max-w-3xl">
          
          <p className="text-xs font-semibold tracking-[0.25em] text-orange-400 sm:text-sm sm:tracking-[0.3em]">
            IMPORTANT
          </p>

          <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
            Official Guidelines May Be Updated
          </h2>

          <p className="mt-6 text-sm leading-7 text-slate-400 sm:text-base">
            Some participation rules and requirements may be updated as official
            event details are finalized. Participants should regularly check the
            Tech4Bharat website for the latest information.
          </p>

        </div>
      </section>

    </main>
  );
}