import Link from 'next/link'
import { ArrowRight, FileText, Users, Download, ShieldCheck, Search, BookOpen } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export const HOME_PAGE_OVERRIDE_ENABLED = true

export async function HomePageOverride() {
  return (
    <div className="min-h-screen bg-[#f6efe7] text-[#511D43]">
      <NavbarShell />
      <main>
        {/* HERO */}
        <section className="bg-[#FBE580]">
          <div className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-28 lg:pt-20">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#511D43] sm:text-6xl lg:text-[68px]">
                  Sharing knowledge that actually matters.
                </h1>
              </div>
              <div className="lg:pt-6">
                <p className="text-base leading-7 text-[#511D43]/80">
                  We&apos;ve built a curated PDF library and profile network to help you discover, download, and connect with the resources and people that move your work forward.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/pdf"
                    className="inline-flex items-center gap-2 rounded-full bg-[#DC2525] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#901E3E]"
                  >
                    Browse PDFs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/profile"
                    className="inline-flex items-center gap-2 rounded-full border border-[#511D43]/30 bg-white px-6 py-3 text-sm font-semibold text-[#511D43] transition hover:border-[#511D43]/60"
                  >
                    View Profiles
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="mt-14 grid gap-5 lg:grid-cols-2">
              <FeatureCard
                eyebrow="PDF Library"
                title="Resources, reports, and reading you can rely on."
                body="A clean, searchable PDF library covering research, guides, and references — all free to download whenever you need them."
                image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&q=80"
                alt="Person reading on laptop"
                href="/pdf"
              />
              <FeatureCard
                eyebrow="Profiles"
                title="Real people, real expertise — discoverable by topic."
                body="Browse member profiles to find contributors, follow their work, and connect over the resources you both care about."
                image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80"
                alt="Team collaborating"
                href="/profile"
              />
            </div>
          </div>
        </section>

        {/* THREE-UP SECTION */}
        <section className="border-t border-[#511D43]/10 bg-[#f6efe7]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#511D43]">
                  Simpler, smarter, more useful resources.
                </h2>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                <Bullet
                  title="We help make sure you have no gaps."
                  body="With a curated library, you get comprehensive references — not scattered PDFs lost across the internet."
                />
                <Bullet
                  title="We look out for you."
                  body="Profiles let you connect with the right people first, so you find answers and collaborators faster."
                />
              </div>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="border-t border-[#511D43]/10 bg-[#511D43] text-[#FBE580]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr]">
              <div>
                <p className="text-sm font-medium text-[#FBE580]">Why choose {SITE_CONFIG.name}</p>
              </div>
              <div>
                <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[44px]">
                  Built from the ground up for the internet generation.
                </h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#FBE580]/80">
                  {SITE_CONFIG.name} is a digital-first platform, using technology to make PDF access and professional discovery simpler, faster, and more rewarding.
                </p>

                <div className="mt-12 grid gap-6 sm:grid-cols-3">
                  <Stat icon={FileText} value="2,400+" label="PDFs available" />
                  <Stat icon={Users} value="850+" label="Active profiles" />
                  <Stat icon={Download} value="48k+" label="Downloads served" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CUSTOMIZABLE / VALUES */}
        <section className="border-t border-[#511D43]/10 bg-[#f6efe7]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-[#511D43] sm:text-[44px]">
                Customizable discovery for readers and contributors of every kind.
              </h2>
              <div className="flex gap-3">
                <Link
                  href="/pdf"
                  className="inline-flex items-center gap-2 rounded-full bg-[#DC2525] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#901E3E]"
                >
                  Get a PDF
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#511D43]/30 px-5 py-2.5 text-sm font-semibold text-[#511D43] hover:border-[#511D43]/60"
                >
                  Contact us
                </Link>
              </div>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <ValueCard icon={Search} title="Smart Search" body="Find PDFs and profiles fast with title, tag, and topic search." />
              <ValueCard icon={ShieldCheck} title="Verified Profiles" body="Trust signals on every profile so you know who you're connecting with." />
              <ValueCard icon={BookOpen} title="Curated Library" body="Every resource is reviewed before it lands on the shelves." />
              <ValueCard icon={Download} title="Free Downloads" body="Open access — download what you need without paywalls." />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function FeatureCard({
  eyebrow,
  title,
  body,
  image,
  alt,
  href,
}: {
  eyebrow: string
  title: string
  body: string
  image: string
  alt: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group overflow-hidden rounded-3xl bg-white p-6 shadow-[0_2px_24px_rgba(81,29,67,0.08)] transition hover:shadow-[0_8px_40px_rgba(81,29,67,0.16)]"
    >
      <p className="text-sm font-semibold text-[#901E3E]">{eyebrow}</p>
      <p className="mt-2 text-sm leading-6 text-[#511D43]/75">{body}</p>
      <div className="mt-5 overflow-hidden rounded-2xl">
        <img
          src={image}
          alt={alt}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      </div>
      <p className="mt-5 text-base font-medium text-[#511D43]">{title}</p>
    </Link>
  )
}

function Bullet({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-[#901E3E]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#511D43]/75">{body}</p>
    </div>
  )
}

function Stat({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[#FBE580]/25 bg-[#901E3E]/30 p-6 backdrop-blur">
      <Icon className="h-5 w-5 text-[#FBE580]" />
      <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-1 text-sm text-[#FBE580]/80">{label}</p>
    </div>
  )
}

function ValueCard({ icon: Icon, title, body }: { icon: any; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[#511D43]/15 bg-white p-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FBE580]">
        <Icon className="h-5 w-5 text-[#511D43]" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-[#511D43]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#511D43]/75">{body}</p>
    </div>
  )
}
