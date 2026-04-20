'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { useAuth } from '@/lib/auth-context'

export const REGISTER_PAGE_OVERRIDE_ENABLED = true

export function RegisterPageOverride() {
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!name || !email || !password) {
      setError('Please fill in all fields.')
      return
    }
    try {
      await signup(name, email, password)
      router.push('/')
    } catch (err) {
      setError('Unable to create account. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f6efe7] text-[#511D43]">
      <NavbarShell />
      <main className="bg-[#FBE580]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#511D43] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FBE580]">
              <Users className="h-3.5 w-3.5" />
              Join the community
            </span>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#511D43] sm:text-6xl">
              Start sharing knowledge that matters.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[#511D43]/80">
              Create your free account to download PDFs, save your library, and build a profile that other readers can discover.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-[0_8px_40px_rgba(81,29,67,0.12)] sm:p-10">
            <h2 className="text-2xl font-semibold text-[#511D43]">Create account</h2>
            <p className="mt-1 text-sm text-[#511D43]/70">It only takes a moment.</p>

            <form onSubmit={onSubmit} className="mt-7 grid gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#901E3E]">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="mt-2 h-12 w-full rounded-xl border border-[#511D43]/20 bg-white px-4 text-sm text-[#511D43] outline-none focus:border-[#901E3E]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#901E3E]">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 h-12 w-full rounded-xl border border-[#511D43]/20 bg-white px-4 text-sm text-[#511D43] outline-none focus:border-[#901E3E]"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[#901E3E]">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="mt-2 h-12 w-full rounded-xl border border-[#511D43]/20 bg-white px-4 text-sm text-[#511D43] outline-none focus:border-[#901E3E]"
                />
              </div>

              {error && <p className="text-sm text-[#DC2525]">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#DC2525] px-6 text-sm font-semibold text-white transition hover:bg-[#901E3E] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? 'Creating account…' : 'Create account'}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm text-[#511D43]/70">
              <span>Already have an account?</span>
              <Link href="/login" className="font-semibold text-[#901E3E] hover:underline">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
