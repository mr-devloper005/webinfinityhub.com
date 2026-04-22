import Link from 'next/link'
import { ArrowRight, BookOpen, Download, FileText, HelpCircle, LifeBuoy, MessageCircle, Search, Settings, ShieldCheck, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

const categories = [
  { icon: BookOpen, title: 'Getting Started', count: '8 articles', body: 'Create your account, find your first PDF, and set up your profile.' },
  { icon: Download, title: 'PDF Library', count: '14 articles', body: 'Search, download, save, and share documents from the library.' },
  { icon: User, title: 'Profiles', count: '11 articles', body: 'Build your profile, manage what you publish, and connect with others.' },
  { icon: Settings, title: 'Account & Settings', count: '9 articles', body: 'Email preferences, password, two-factor, and account deletion.' },
  { icon: ShieldCheck, title: 'Privacy & Safety', count: '6 articles', body: 'How we handle your data and how to report content.' },
  { icon: LifeBuoy, title: 'Troubleshooting', count: '12 articles', body: 'Fixes for downloads that fail, profile issues, and broken links.' },
]

const popular = [
  'How do I download a PDF without an account?',
  'Why can&apos;t I open a downloaded file?',
  'How do I add my own PDF to the library?',
  'Can I edit my profile after publishing?',
  'How do I delete my account?',
  'How are PDFs reviewed before being added?',
]

const faqs = [
  {
    q: 'Is the library really free?',
    a: 'Yes � every PDF in the library is free to download. We don&apos;t use paywalls, watermarks, or "free trial" gates.',
  },
  {
    q: 'Do I need an account to download PDFs?',
    a: 'No. Downloads are open. An account lets you save documents to your shelf and build a profile, but isn&apos;t required.',
  },
  {
    q: 'How do I contribute a PDF?',
    a: 'Send us the document via the contact page. Our curators review every submission to make sure it fits the library.',
  },
  {
    q: 'Can I make my profile private?',
    a: 'Yes. From your settings page you can switch your profile to unlisted at any time.',
  },
  {
    q: 'How long does it take to review a submission?',
    a: 'Most submissions are reviewed within 3�5 working days. Larger collections may take a little longer.',
  },
  {
    q: 'I found a broken link or duplicate file. What do I do?',
    a: 'Use the report button on the PDF page, or write to support and we&apos;ll fix it within a day or two.',
  },
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[#f6efe7] text-[#511D43]">
      <NavbarShell />
      <main>
        {/* HERO */}
        <section className="bg-[#FBE580]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#511D43] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FBE580]">
                <HelpCircle className="h-3.5 w-3.5" />
                Help Center
              </span>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#511D43] sm:text-6xl">
                How can we help?
              </h1>
              <p className="mt-6 text-base leading-7 text-[#511D43]/80">
                Search articles, browse topics, or message us directly. Real humans on the other end.
              </p>

              <form action="/search" className="mt-10 flex gap-2 rounded-full border border-[#511D43]/15 bg-white p-1.5 shadow-sm">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#511D43]/60" />
                  <input
                    name="q"
                    placeholder="Search help articles�"
                    className="h-11 w-full rounded-full border-0 bg-transparent pl-11 pr-2 text-sm text-[#511D43] outline-none"
                  />
                </div>
                <button type="submit" className="inline-flex h-11 items-center justify-center rounded-full bg-[#DC2525] px-5 text-sm font-semibold text-white transition hover:bg-[#901E3E]">
                  Search
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="border-t border-[#511D43]/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[#901E3E]">Browse by topic</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-[#511D43] sm:text-4xl">
                  Pick a category.
                </h2>
              </div>
              <p className="text-sm text-[#511D43]/70">{categories.reduce((acc, c) => acc + parseInt(c.count) || 0, 0)}+ articles total</p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <Link
                  key={c.title}
                  href="/help"
                  className="group rounded-2xl border border-[#511D43]/15 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(81,29,67,0.1)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FBE580]">
                    <c.icon className="h-5 w-5 text-[#511D43]" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-[#511D43] group-hover:text-[#901E3E]">{c.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#511D43]/75">{c.body}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#901E3E]">
                    {c.count}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* POPULAR + FAQ */}
        <section className="border-t border-[#511D43]/10 bg-[#511D43] text-[#FBE580]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="text-sm font-medium text-[#FBE580]">Most viewed</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
                  Popular questions.
                </h2>
                <ul className="mt-10 space-y-3">
                  {popular.map((q) => (
                    <li key={q}>
                      <Link
                        href="/help"
                        className="group flex items-center justify-between gap-4 rounded-2xl border border-[#FBE580]/20 bg-[#901E3E]/30 px-5 py-4 backdrop-blur transition hover:border-[#FBE580]/40"
                      >
                        <span className="text-sm leading-6 text-[#FBE580]" dangerouslySetInnerHTML={{ __html: q }} />
                        <ArrowRight className="h-4 w-4 shrink-0 text-[#FBE580]/70 transition group-hover:translate-x-0.5 group-hover:text-[#FBE580]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-medium text-[#FBE580]">Quick answers</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
                  Frequently asked.
                </h2>
                <div className="mt-10 space-y-3">
                  {faqs.map((f) => (
                    <details
                      key={f.q}
                      className="group rounded-2xl border border-[#FBE580]/20 bg-[#901E3E]/30 p-6 backdrop-blur [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-white">
                        <span>{f.q}</span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FBE580] text-[#511D43] transition group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-sm leading-6 text-[#FBE580]/85" dangerouslySetInnerHTML={{ __html: f.a }} />
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="border-t border-[#511D43]/10 bg-[#FBE580]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-6 rounded-3xl bg-white p-8 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DC2525]">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#511D43]">Still need help?</h2>
                <p className="mt-1 text-sm text-[#511D43]/75">Send us a message and we&apos;ll get back to you within one business day.</p>
              </div>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#DC2525] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#901E3E]">
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
