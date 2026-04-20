import Link from 'next/link'
import { ArrowRight, BookOpen, Users, Sparkles, Globe2, ShieldCheck, Heart } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const stats = [
  { value: '2,400+', label: 'Curated PDFs' },
  { value: '850+', label: 'Active profiles' },
  { value: '48k+', label: 'Downloads served' },
  { value: '120+', label: 'Topics covered' },
]

const principles = [
  {
    icon: BookOpen,
    title: 'Knowledge first',
    body: 'Every PDF is reviewed before it joins the shelves. No fluff, no SEO bait — just useful documents.',
  },
  {
    icon: Users,
    title: 'People, not avatars',
    body: 'Profiles surface the humans behind the work, so you can connect with real expertise instead of guessing.',
  },
  {
    icon: ShieldCheck,
    title: 'Open access',
    body: 'No paywalls, no upsells. Download what you need, contribute what you can, and move on with your work.',
  },
  {
    icon: Heart,
    title: 'Built with care',
    body: 'A small team obsessed with calmer interfaces, fewer dark patterns, and tools you can actually trust.',
  },
]

const timeline = [
  { year: '2022', title: 'The first shelf', body: 'A handful of PDFs shared between friends turned into a small library worth keeping.' },
  { year: '2023', title: 'Profiles arrive', body: 'Contributors wanted credit and connection — profiles brought the people forward.' },
  { year: '2024', title: 'Public launch', body: 'We opened the doors to readers, researchers, and curious minds everywhere.' },
  { year: '2026', title: 'Today', body: 'Thousands of resources, hundreds of contributors, one clean home for shared knowledge.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f6efe7] text-[#511D43]">
      <NavbarShell />
      <main>
        {/* HERO */}
        <section className="bg-[#FBE580]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#511D43] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FBE580]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Our Story
                </span>
                <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#511D43] sm:text-6xl lg:text-[68px]">
                  A quieter home for shared knowledge.
                </h1>
              </div>
              <p className="text-base leading-7 text-[#511D43]/80">
                {SITE_CONFIG.name} began as a small shared folder of PDFs between collaborators. It grew into a curated library and profile network for anyone who values useful, honest, freely available knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="border-t border-[#511D43]/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr]">
              <p className="text-sm font-medium text-[#901E3E]">Our mission</p>
              <div>
                <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-[#511D43] sm:text-[44px]">
                  Make it easier to find the resources and people that move your work forward.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#511D43]/80">
                  The internet is full of knowledge — and noise. We&apos;re building a calmer alternative: a curated library, real profiles, and the smallest possible amount of UI between you and what you came for.
                </p>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-2xl border border-[#511D43]/15 bg-white p-6">
                      <p className="text-3xl font-semibold tracking-tight text-[#511D43]">{s.value}</p>
                      <p className="mt-1 text-sm text-[#901E3E]">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="border-t border-[#511D43]/10 bg-[#511D43] text-[#FBE580]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[44px]">
              What we believe.
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {principles.map((p) => (
                <div key={p.title} className="rounded-2xl border border-[#FBE580]/20 bg-[#901E3E]/30 p-6 backdrop-blur">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBE580]">
                    <p.icon className="h-5 w-5 text-[#511D43]" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#FBE580]/85">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="border-t border-[#511D43]/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr]">
              <p className="text-sm font-medium text-[#901E3E]">How we got here</p>
              <div>
                <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-[#511D43] sm:text-[44px]">
                  A short history of a small library.
                </h2>
                <ol className="mt-12 space-y-8">
                  {timeline.map((item, idx) => (
                    <li key={item.year} className="grid gap-4 sm:grid-cols-[100px_1fr]">
                      <div className="flex items-start gap-3">
                        <span className="text-3xl font-semibold tracking-tight text-[#901E3E]">{item.year}</span>
                      </div>
                      <div className={`border-l-2 border-[#FBE580] pl-6 ${idx === timeline.length - 1 ? '' : 'pb-2'}`}>
                        <h3 className="text-lg font-semibold text-[#511D43]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-[#511D43]/75">{item.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#511D43]/10 bg-[#FBE580]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div>
                <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.02em] text-[#511D43] sm:text-4xl">
                  Want to be part of what comes next?
                </h2>
                <p className="mt-3 max-w-xl text-sm text-[#511D43]/80">
                  Join the community as a reader, a contributor, or both — it only takes a moment.
                </p>
              </div>
              <div className="flex gap-3">
                <Link href="/register" className="inline-flex items-center gap-2 rounded-full bg-[#DC2525] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#901E3E]">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#511D43]/30 bg-white px-6 py-3 text-sm font-semibold text-[#511D43] transition hover:border-[#511D43]/60">
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
