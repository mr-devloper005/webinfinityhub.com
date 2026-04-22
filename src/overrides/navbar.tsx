'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const NavbarAuthControls = dynamic(
  () => import('@/components/shared/navbar-auth-controls').then((m) => m.NavbarAuthControls),
  { ssr: false, loading: () => null },
)

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'PDF Library', href: '/pdf' },
  { label: 'Profiles', href: '/profile' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

export function NavbarOverride() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#FBE580]/40 bg-[#511D43]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FBE580] p-1.5">
            <img src="/favicon.png?v=20260401" alt={SITE_CONFIG.name} className="h-full w-full object-contain" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-[#FBE580]">{SITE_CONFIG.name}</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors',
                  isActive ? 'text-[#FBE580]' : 'text-[#FBE580]/70 hover:text-[#FBE580]',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className="rounded-full px-5 py-2 text-sm font-medium text-[#FBE580] hover:bg-[#901E3E]/40"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#DC2525] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#901E3E]"
              >
                Get Started
              </Link>
            </div>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="rounded-full p-2 text-[#FBE580] lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[#FBE580]/30 bg-[#511D43] lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-[#FBE580] hover:bg-[#901E3E]/40"
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-[#FBE580] px-4 py-2.5 text-center text-sm font-medium text-[#FBE580]"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-[#DC2525] px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
