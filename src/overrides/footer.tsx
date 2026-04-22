import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Team', href: '/team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'PDF Library', href: '/pdf' },
      { label: 'Profiles', href: '/profile' },
      { label: 'Search', href: '/search' },
      { label: 'Help Center', href: '/help' },
    ],
  },
]

const socials = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: Youtube, label: 'Youtube', href: 'https://youtube.com' },
  { icon: Linkedin, label: 'Linkedin', href: 'https://linkedin.com' },
]

export function FooterOverride() {
  return (
    <footer className="bg-[#511D43] text-[#FBE580]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FBE580] p-1.5">
                <img src="/favicon.png?v=20260401" alt={SITE_CONFIG.name} className="h-full w-full object-contain" />
              </div>
              <span className="text-xl font-semibold text-white">{SITE_CONFIG.name}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#FBE580]/75">{SITE_CONFIG.description}</p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-white">{col.title}</h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-[#FBE580]/75 transition hover:text-[#FBE580]">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Socials</h4>
            <ul className="mt-5 space-y-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-[#FBE580]/75 transition hover:text-[#FBE580]"
                  >
                    <s.icon className="h-4 w-4" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-[#901E3E]/50 pt-6 text-sm text-[#FBE580]/60">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
