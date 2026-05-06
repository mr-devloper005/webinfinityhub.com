import Link from 'next/link'
import { ArrowRight, Download, FileText, User, Users, Search, Sparkles, Calendar } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

type Theme = {
  eyebrow: string
  title: string
  description: string
  emptyTitle: string
  emptyBody: string
  Icon: any
}

const themes: Partial<Record<TaskKey, Theme>> = {
  pdf: {
    eyebrow: 'PDF Library',
    title: 'Documents worth keeping.',
    description: 'A curated shelf of research, guides, references, and reports — every one reviewed before it lands here.',
    emptyTitle: 'The shelves are being stocked.',
    emptyBody: 'New PDFs are being curated and added soon. Check back shortly or reach out if you have something to contribute.',
    Icon: FileText,
  },
  profile: {
    eyebrow: 'Profiles',
    title: 'The people behind the work.',
    description: 'Browse contributor profiles to find expertise, follow ongoing work, and connect over shared interests.',
    emptyTitle: 'No profiles yet.',
    emptyBody: 'The community is just getting started. Sign up to be one of the first profiles in the directory.',
    Icon: User,
  },
  org: {
    eyebrow: 'Our Team',
    title: 'Meet the people building it.',
    description: 'A small, distributed team obsessed with calmer interfaces, useful tools, and real human knowledge sharing.',
    emptyTitle: 'Team profiles coming soon.',
    emptyBody: 'We&apos;re putting together proper profiles for everyone on the team. In the meantime, say hello via the contact page.',
    Icon: Users,
  },
}

function getPostImage(post: SitePost) {
  const media = Array.isArray(post.media) ? post.media : []
  const mediaUrl = media.find((m) => typeof m?.url === 'string' && m.url)?.url
  const content = typeof post.content === 'object' && post.content ? (post.content as Record<string, unknown>) : {}
  const contentImage =
    Array.isArray((content as any).images) && (content as any).images.find((u: unknown) => typeof u === 'string' && u)
  const logo = typeof (content as any).logo === 'string' ? (content as any).logo : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=600&width=900'
}

function getMeta(post: SitePost) {
  const content = typeof post.content === 'object' && post.content ? (post.content as Record<string, unknown>) : {}
  return {
    category: (typeof content.category === 'string' && content.category) || (post.tags && post.tags[0]) || '',
    role: (typeof content.role === 'string' && content.role) || (typeof content.title === 'string' && content.title) || '',
    location: typeof content.location === 'string' ? content.location : '',
  }
}

function formatDate(value?: string | null) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  const taskConfig = getTaskConfig(task)
  const theme = themes[task] || {
    eyebrow: taskConfig?.label || 'Library',
    title: taskConfig?.label || 'Browse',
    description: taskConfig?.description || '',
    emptyTitle: 'Nothing here yet.',
    emptyBody: 'Content is being added — check back soon.',
    Icon: Sparkles,
  }
  const posts = await fetchTaskPosts(task, 30)
  const Icon = theme.Icon
  const route = taskConfig?.route || `/${task}`

  const isProfileLike = task === 'profile' || task === 'org'

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
                  <Icon className="h-3.5 w-3.5" />
                  {theme.eyebrow}
                </span>
                <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#511D43] sm:text-6xl lg:text-[68px]">
                  {theme.title}
                </h1>
              </div>
              <div className="lg:pb-3">
                <p className="text-base leading-7 text-[#511D43]/80">{theme.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <form action="/search" className="flex w-full max-w-md gap-2">
                    <input type="hidden" name="task" value={task} />
                    <div className="relative flex-1">
                      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#511D43]/60" />
                      <input
                        name="q"
                        placeholder={`Search ${theme.eyebrow.toLowerCase()}…`}
                        className="h-12 w-full rounded-full border border-[#511D43]/20 bg-white pl-10 pr-4 text-sm text-[#511D43] outline-none focus:border-[#901E3E]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-[#DC2525] px-5 text-sm font-semibold text-white transition hover:bg-[#901E3E]"
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* tiny stat strip */}
            <div className="mt-12 grid gap-3 rounded-3xl border border-[#511D43]/15 bg-white p-4 sm:grid-cols-3">
              <Stat label={isProfileLike ? 'Profiles' : 'PDFs'} value={`${posts.length || 0}+`} />
              <Stat label="Updated" value={posts[0]?.updatedAt ? formatDate(posts[0].updatedAt) : 'Weekly'} />
              <Stat label="Filter" value={category ? category : 'All categories'} />
            </div>
          </div>
        </section>

        {/* LIST */}
        <section className="border-t border-[#511D43]/10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <EmptyState title={theme.emptyTitle} body={theme.emptyBody} />
            ) : isProfileLike ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => {
                  const meta = getMeta(post)
                  return (
                    <Link
                      key={post.id}
                      href={`${route}/${post.slug}`}
                      className="group overflow-hidden rounded-3xl border border-[#511D43]/15 bg-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(81,29,67,0.12)]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#FBE580]/30">
                        <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                      </div>
                      <div className="p-6">
                        {meta.category && (
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#901E3E]">{meta.category}</p>
                        )}
                        <h3 className="mt-2 text-lg font-semibold text-[#511D43] group-hover:text-[#901E3E]">{post.title}</h3>
                        {meta.role && <p className="mt-1 text-sm text-[#511D43]/70">{meta.role}</p>}
                        {post.summary && <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#511D43]/75">{post.summary}</p>}
                        {meta.location && (
                          <p className="mt-4 text-xs text-[#901E3E]">{meta.location}</p>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {posts.map((post) => {
                  const meta = getMeta(post)
                  return (
                    <Link
                      key={post.id}
                      href={`${route}/${post.slug}`}
                      className="group flex gap-5 rounded-3xl border border-[#511D43]/15 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(81,29,67,0.12)]"
                    >
                      <div className="relative hidden h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-[#FBE580]/30 sm:block">
                        <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-[#511D43]/85 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FBE580]">
                          PDF
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          {meta.category && (
                            <span className="rounded-full bg-[#FBE580] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#511D43]">
                              {meta.category}
                            </span>
                          )}
                                                  </div>
                        <h3 className="mt-3 text-lg font-semibold text-[#511D43] group-hover:text-[#901E3E]">{post.title}</h3>
                        {post.summary && <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#511D43]/75">{post.summary}</p>}
                        <div className="mt-4 flex items-center justify-between">
                          {post.authorName && (
                            <span className="text-xs text-[#511D43]/60">By {post.authorName}</span>
                          )}
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#DC2525]">
                            <Download className="h-4 w-4" />
                            View PDF
                          </span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[#511D43]/10 bg-[#511D43] text-[#FBE580]">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8">
            <div>
              <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
                {isProfileLike ? 'Ready to build your own profile?' : 'Have a PDF worth sharing?'}
              </h2>
              <p className="mt-3 max-w-xl text-sm text-[#FBE580]/80">
                {isProfileLike
                  ? 'Sign up in under a minute and join the contributor community.'
                  : 'Send it our way — we&apos;ll review it and add it to the shelves if it fits.'}
              </p>
            </div>
            <div className="flex gap-3">
              <Link href={isProfileLike ? '/register' : '/contact'} className="inline-flex items-center gap-2 rounded-full bg-[#DC2525] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#901E3E]">
                {isProfileLike ? 'Get Started' : 'Submit a PDF'}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/help" className="inline-flex items-center gap-2 rounded-full border border-[#FBE580]/30 bg-transparent px-6 py-3 text-sm font-semibold text-[#FBE580] transition hover:bg-[#FBE580]/10">
                Visit Help Center
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#f6efe7] px-5 py-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#901E3E]">{label}</p>
      <p className="mt-1 text-lg font-semibold text-[#511D43]">{value}</p>
    </div>
  )
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-[#511D43]/20 bg-white p-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBE580]">
        <Sparkles className="h-6 w-6 text-[#511D43]" />
      </div>
      <h3 className="mt-5 text-2xl font-semibold text-[#511D43]">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#511D43]/75">{body}</p>
      <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#DC2525] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#901E3E]">
        Get in touch
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  )
}
