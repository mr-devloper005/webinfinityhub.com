import Link from 'next/link'
import { ArrowRight, Briefcase, MapPin, Clock, Coffee, Globe2, Heart, Sparkles, GraduationCap } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

const roles = [
  { title: 'Senior Frontend Engineer', team: 'Engineering', location: 'Remote · Worldwide', type: 'Full-time' },
  { title: 'Library Curator', team: 'Content', location: 'Remote · EU/US', type: 'Full-time' },
  { title: 'Product Designer', team: 'Design', location: 'Berlin or Remote', type: 'Full-time' },
  { title: 'Community Manager', team: 'Community', location: 'Remote · Worldwide', type: 'Part-time' },
  { title: 'Backend Engineer', team: 'Engineering', location: 'Remote · Americas', type: 'Full-time' },
  { title: 'Editorial Intern', team: 'Content', location: 'Remote', type: 'Internship' },
]

const benefits = [
  { icon: Globe2, title: 'Remote-first', body: 'Work from wherever you do your best thinking. We sync, we don&apos;t surveil.' },
  { icon: Heart, title: 'Health covered', body: 'Comprehensive medical, dental, and vision coverage for you and your family.' },
  { icon: GraduationCap, title: 'Learning budget', body: 'Annual stipend for books, courses, conferences — anything that grows you.' },
  { icon: Coffee, title: 'Real time off', body: 'Minimum vacation policy, plus quarterly company-wide rest weeks.' },
]

const culture = [
  'We write things down so meetings stay short.',
  'We ship small, often, and reversibly.',
  'We value craft over speed, and trust over process.',
  'We treat each other like adults with good intentions.',
]

export default function CareersPage() {
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
                  <Briefcase className="h-3.5 w-3.5" />
                  Join the team
                </span>
                <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#511D43] sm:text-6xl lg:text-[68px]">
                  Help us build a calmer corner of the internet.
                </h1>
              </div>
              <div className="lg:pb-3">
                <p className="text-base leading-7 text-[#511D43]/80">
                  We&apos;re a small, distributed team building tools for people who care about quality. If that sounds like you, we&apos;d love to talk.
                </p>
                <Link
                  href="#open-roles"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#DC2525] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#901E3E]"
                >
                  See open roles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* OPEN ROLES */}
        <section id="open-roles" className="border-t border-[#511D43]/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[#901E3E]">Open positions</p>
                <h2 className="mt-2 text-4xl font-semibold tracking-[-0.02em] text-[#511D43] sm:text-[44px]">
                  Currently hiring.
                </h2>
              </div>
              <p className="text-sm text-[#511D43]/70">{roles.length} roles open · Updated weekly</p>
            </div>

            <div className="mt-10 divide-y divide-[#511D43]/10 overflow-hidden rounded-3xl border border-[#511D43]/15 bg-white">
              {roles.map((role) => (
                <Link
                  key={role.title}
                  href="/contact"
                  className="group grid gap-3 px-6 py-6 transition hover:bg-[#FBE580]/15 sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-center sm:gap-6"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-[#511D43] group-hover:text-[#901E3E]">{role.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#901E3E]">{role.team}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#511D43]/75">
                    <MapPin className="h-4 w-4" />
                    {role.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#511D43]/75">
                    <Clock className="h-4 w-4" />
                    {role.type}
                  </div>
                  <div className="flex items-center justify-end">
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#DC2525]">
                      Apply
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="border-t border-[#511D43]/10 bg-[#511D43] text-[#FBE580]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[44px]">
              The good stuff.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#FBE580]/80">
              Real benefits, written plainly. No "ping pong table" energy.
            </p>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((b) => (
                <div key={b.title} className="rounded-2xl border border-[#FBE580]/20 bg-[#901E3E]/30 p-6 backdrop-blur">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBE580]">
                    <b.icon className="h-5 w-5 text-[#511D43]" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-white">{b.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#FBE580]/85" dangerouslySetInnerHTML={{ __html: b.body }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CULTURE */}
        <section className="border-t border-[#511D43]/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr]">
              <p className="text-sm font-medium text-[#901E3E]">How we work</p>
              <div>
                <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-[#511D43] sm:text-[44px]">
                  A few things that are true here.
                </h2>
                <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                  {culture.map((line) => (
                    <li key={line} className="flex items-start gap-3 rounded-2xl border border-[#511D43]/15 bg-white p-5">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FBE580]">
                        <Sparkles className="h-3.5 w-3.5 text-[#511D43]" />
                      </div>
                      <span className="text-sm leading-6 text-[#511D43]">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#511D43]/10 bg-[#FBE580]">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8">
            <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.02em] text-[#511D43] sm:text-4xl">
              Don&apos;t see the right role?
            </h2>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#DC2525] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#901E3E]">
              Send us a note
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
