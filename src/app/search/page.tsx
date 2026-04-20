import Link from 'next/link'
import { ArrowRight, FileText, Search as SearchIcon, Sparkles, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { fetchSiteFeed, type SitePost } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG } from '@/lib/site-config'

export const revalidate = 3

const matchText = (value: string, query: string) => value.toLowerCase().includes(query)
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => {
  if (typeof value !== 'string') return ''
  return stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase()
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

const filters = [
  { label: 'All', value: '' },
  { label: 'PDF Library', value: 'pdf' },
  { label: 'Profiles', value: 'profile' },
]

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>
}) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined,
  )
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
      ? []
      : SITE_CONFIG.tasks.flatMap((t) => getMockPostsForTask(t.key))

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const typeText = compactText((content as any).type)
    if (typeText === 'comment') return false
    const description = compactText((content as any).description)
    const body = compactText((content as any).body)
    const excerpt = compactText((content as any).excerpt)
    const categoryText = compactText((content as any).category)
    const tags = Array.isArray(post.tags) ? post.tags.join(' ') : ''
    const tagsText = compactText(tags)
    const derivedCategory = categoryText || tagsText
    if (category && !derivedCategory.includes(category)) return false
    if (task && typeText && typeText !== task) return false
    if (!normalized.length) return true
    return (
      matchText(compactText(post.title || ''), normalized) ||
      matchText(compactText(post.summary || ''), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    )
  })

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24)

  return (
    <div className="min-h-screen bg-[#f6efe7] text-[#511D43]">
      <NavbarShell />
      <main>
        {/* HERO + SEARCH */}
        <section className="bg-[#FBE580]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#511D43] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FBE580]">
                <SearchIcon className="h-3.5 w-3.5" />
                Search
              </span>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#511D43] sm:text-6xl">
                {query ? `Results for "${query}"` : 'Find what you need.'}
              </h1>
              <p className="mt-6 text-base leading-7 text-[#511D43]/80">
                Search across the entire library — PDFs, profiles, and everything in between.
              </p>

              <form action="/search" className="mt-10 flex gap-2 rounded-full border border-[#511D43]/15 bg-white p-1.5 shadow-sm">
                <input type="hidden" name="master" value="1" />
                {category ? <input type="hidden" name="category" value={category} /> : null}
                {task ? <input type="hidden" name="task" value={task} /> : null}
                <div className="relative flex-1">
                  <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#511D43]/60" />
                  <input
                    name="q"
                    defaultValue={query}
                    placeholder="Search PDFs, profiles, topics…"
                    className="h-11 w-full rounded-full border-0 bg-transparent pl-11 pr-2 text-sm text-[#511D43] outline-none"
                  />
                </div>
                <button type="submit" className="inline-flex h-11 items-center justify-center rounded-full bg-[#DC2525] px-5 text-sm font-semibold text-white transition hover:bg-[#901E3E]">
                  Search
                </button>
              </form>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {filters.map((f) => {
                  const isActive = (f.value || '') === task
                  const href = `/search?${new URLSearchParams({
                    ...(query ? { q: query } : {}),
                    ...(f.value ? { task: f.value } : {}),
                    master: '1',
                  }).toString()}`
                  return (
                    <Link
                      key={f.label}
                      href={href}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                        isActive
                          ? 'bg-[#511D43] text-[#FBE580]'
                          : 'bg-white text-[#511D43] hover:bg-[#511D43]/10'
                      }`}
                    >
                      {f.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* RESULTS */}
        <section className="border-t border-[#511D43]/10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-[#901E3E]">{results.length} result{results.length === 1 ? '' : 's'}</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[#511D43] sm:text-3xl">
                  {query ? 'Matching the search' : 'Latest from the library'}
                </h2>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-[#511D43]/20 bg-white p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FBE580]">
                  <Sparkles className="h-6 w-6 text-[#511D43]" />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-[#511D43]">No matches yet.</h3>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#511D43]/75">
                  Try a different search term, or browse the PDF Library and Profiles directly.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Link href="/pdf" className="inline-flex items-center gap-2 rounded-full bg-[#DC2525] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#901E3E]">
                    Browse PDFs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/profile" className="inline-flex items-center gap-2 rounded-full border border-[#511D43]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#511D43] transition hover:border-[#511D43]/40">
                    View Profiles
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((post) => {
                  const taskKey = getPostTaskKey(post)
                  const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/posts/${post.slug}`
                  const isProfile = taskKey === 'profile' || taskKey === 'org'
                  const TypeIcon = isProfile ? User : FileText
                  return (
                    <Link
                      key={post.id}
                      href={href}
                      className="group overflow-hidden rounded-3xl border border-[#511D43]/15 bg-white transition hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(81,29,67,0.12)]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#FBE580]/30">
                        <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" />
                        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[#511D43]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FBE580] backdrop-blur">
                          <TypeIcon className="h-3 w-3" />
                          {isProfile ? 'Profile' : 'PDF'}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-base font-semibold text-[#511D43] group-hover:text-[#901E3E]">{post.title}</h3>
                        {post.summary && (
                          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#511D43]/75">{post.summary}</p>
                        )}
                        {post.authorName && (
                          <p className="mt-3 text-xs text-[#901E3E]">By {post.authorName}</p>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
