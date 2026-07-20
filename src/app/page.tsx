import LeadForm from "@/components/LeadForm";

const SERVICES = [
  { icon: "🔧", name: "Plumbing", desc: "Leaks, installs, water heaters." },
  { icon: "⚡", name: "Electrical", desc: "Outlets, fixtures, panel work." },
  { icon: "🪚", name: "Carpentry", desc: "Trim, doors, custom builds." },
  { icon: "🎨", name: "Painting", desc: "Interior & exterior, done right." },
  { icon: "❄️", name: "HVAC", desc: "Heating, cooling, tune-ups." },
  { icon: "🛠️", name: "General Repairs", desc: "Anything on the honey-do list." },
];

const STEPS = [
  { n: "1", title: "Tell us what you need", desc: "Fill out the quick form — takes 30 seconds." },
  { n: "2", title: "Get matched fast", desc: "A vetted local pro reaches out within the hour." },
  { n: "3", title: "Job done right", desc: "Upfront pricing, licensed pros, satisfaction guaranteed." },
];

export default function Home() {
  return (
    <main className="flex-1 bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-lg font-bold">
            <span className="text-blue-600">🏠 HomePro</span>
          </div>
          <a
            href="#quote"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Get a quote
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              Trusted by 2,000+ homeowners
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Home repairs & maintenance,{" "}
              <span className="text-blue-600">handled.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600">
              One call connects you with licensed, background-checked local pros.
              Upfront pricing, no surprises, satisfaction guaranteed.
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Licensed & insured pros
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Response within the hour
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Free, no-obligation quotes
              </div>
            </div>
          </div>
          <div id="quote">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold">What we fix</h2>
          <p className="mt-2 text-slate-600">
            From a dripping tap to a full remodel — we&apos;ve got a pro for it.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md"
            >
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-3 text-lg font-semibold">{s.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-center text-3xl font-bold">How it works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.n} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                  {step.n}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to get it fixed?</h2>
          <p className="mt-2 text-blue-100">
            Get your free quote in under a minute.
          </p>
          <a
            href="#quote"
            className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50"
          >
            Get my free quote →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 text-center text-sm text-slate-400">
        <p>© 2026 HomePro. Demo lead-gen site.</p>
      </footer>
    </main>
  );
}
