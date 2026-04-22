'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Mail, MapPin, MessageCircle, Phone, Clock, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

const channels = [
  { icon: Mail, title: 'Email us', value: 'hello@webinfinityhub.com', body: 'For partnerships, press, and general questions.' },
  { icon: MessageCircle, title: 'Library support', value: 'support@webinfinityhub.com', body: 'Trouble with a download or a profile? Start here.' },
  { icon: Phone, title: 'Call us', value: '+1 (555) 010-2026', body: 'Mon–Fri, 9am–5pm in your local timezone.' },
]

const offices = [
  { city: 'Remote-first', region: 'Worldwide', detail: 'Our team works from 14 countries across 8 timezones.' },
  { city: 'Berlin', region: 'Germany', detail: 'A small studio space for European meetups.' },
  { city: 'New York', region: 'USA', detail: 'Coworking hub for our Americas-based team.' },
]

const faqs = [
  { q: 'How fast do you respond?', a: 'Most messages get a reply within one business day. Library issues are usually resolved within hours.' },
  { q: 'Can I contribute a PDF?', a: 'Yes — mention "Contribution" in your message and we&apos;ll send the submission flow.' },
  { q: 'Do you offer partnerships?', a: 'For institutions, libraries, and content collaborators — yes. Tell us about your work and we&apos;ll find a fit.' },
]

export function ContactPageOverride() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('General question')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!name || !email || !message) return
    setSent(true)
    setTimeout(() => {
      setName('')
      setEmail('')
      setMessage('')
      setSent(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#f6efe7] text-[#511D43]">
      <NavbarShell />
      <main>
        {/* HERO */}
        <section className="bg-[#FBE580]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#511D43] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FBE580]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Contact {SITE_CONFIG.name}
                </span>
                <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#511D43] sm:text-6xl lg:text-[68px]">
                  Let&apos;s talk.
                </h1>
              </div>
              <p className="text-base leading-7 text-[#511D43]/80">
                Questions, ideas, contributions, or just a hello — we read everything that comes through and reply to most of it the same week.
              </p>
            </div>
          </div>
        </section>

        {/* CHANNELS + FORM */}
        <section className="border-t border-[#511D43]/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-sm font-medium text-[#901E3E]">Pick a channel</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-[#511D43] sm:text-4xl">
                  However you prefer to reach us.
                </h2>

                <div className="mt-10 space-y-4">
                  {channels.map((c) => (
                    <div key={c.title} className="rounded-2xl border border-[#511D43]/15 bg-white p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FBE580]">
                          <c.icon className="h-5 w-5 text-[#511D43]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold text-[#511D43]">{c.title}</h3>
                          <p className="mt-0.5 text-sm font-medium text-[#901E3E]">{c.value}</p>
                          <p className="mt-2 text-sm leading-6 text-[#511D43]/75">{c.body}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-[#511D43]/15 bg-[#511D43] p-6 text-[#FBE580]">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-[#FBE580]" />
                    <div>
                      <p className="text-sm font-semibold text-white">Typical response time</p>
                      <p className="mt-1 text-sm text-[#FBE580]/80">Under 24 hours on weekdays. We don&apos;t use auto-replies.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-[0_8px_40px_rgba(81,29,67,0.1)] sm:p-10">
                <h2 className="text-2xl font-semibold text-[#511D43]">Send a message</h2>
                <p className="mt-1 text-sm text-[#511D43]/70">Tell us a bit about what you need and we&apos;ll route it to the right person.</p>

                <form onSubmit={onSubmit} className="mt-7 grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Your name">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Doe"
                        className="h-12 w-full rounded-xl border border-[#511D43]/20 bg-white px-4 text-sm text-[#511D43] outline-none focus:border-[#901E3E]"
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="h-12 w-full rounded-xl border border-[#511D43]/20 bg-white px-4 text-sm text-[#511D43] outline-none focus:border-[#901E3E]"
                      />
                    </Field>
                  </div>
                  <Field label="What&apos;s this about?">
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="h-12 w-full rounded-xl border border-[#511D43]/20 bg-white px-4 text-sm text-[#511D43] outline-none focus:border-[#901E3E]"
                    >
                      <option>General question</option>
                      <option>Library support</option>
                      <option>Contribute a PDF</option>
                      <option>Partnership</option>
                      <option>Press inquiry</option>
                    </select>
                  </Field>
                  <Field label="Message">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share the full context so we can respond with the right next step."
                      rows={6}
                      className="w-full rounded-xl border border-[#511D43]/20 bg-white px-4 py-3 text-sm text-[#511D43] outline-none focus:border-[#901E3E]"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#DC2525] px-6 text-sm font-semibold text-white transition hover:bg-[#901E3E]"
                  >
                    {sent ? 'Message sent ✓' : 'Send message'}
                    {!sent && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* OFFICES */}
        <section className="border-t border-[#511D43]/10 bg-[#511D43] text-[#FBE580]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[44px]">
              Where we are.
            </h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {offices.map((o) => (
                <div key={o.city} className="rounded-2xl border border-[#FBE580]/20 bg-[#901E3E]/30 p-6 backdrop-blur">
                  <MapPin className="h-5 w-5 text-[#FBE580]" />
                  <h3 className="mt-4 text-xl font-semibold text-white">{o.city}</h3>
                  <p className="text-sm text-[#FBE580]/80">{o.region}</p>
                  <p className="mt-3 text-sm leading-6 text-[#FBE580]/85">{o.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-[#511D43]/10">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr]">
              <p className="text-sm font-medium text-[#901E3E]">Quick answers</p>
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[#511D43] sm:text-4xl">Before you write</h2>
                <div className="mt-10 space-y-4">
                  {faqs.map((f) => (
                    <details key={f.q} className="group rounded-2xl border border-[#511D43]/15 bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-[#511D43]">
                        {f.q}
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FBE580] text-[#511D43] transition group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-sm leading-6 text-[#511D43]/75">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#901E3E]">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  )
}
