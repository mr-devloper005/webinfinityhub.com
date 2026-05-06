import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { PdfActions } from "./pdf-actions";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { buildPostUrl, fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("pdf", 50);
  if (!posts.length) {
    return [{ slug: "placeholder" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("pdf", resolvedParams.slug);
    return post ? await buildPostMetadata("pdf", post) : await buildTaskMetadata("pdf");
  } catch (error) {
    console.warn("PDF metadata lookup failed", error);
    return await buildTaskMetadata("pdf");
  }
}

export default async function PdfDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post = null;
  try {
    post = await fetchTaskPostBySlug("pdf", resolvedParams.slug);
  } catch (error) {
    console.warn("PDF detail lookup failed", error);
  }
  if (!post) {
    notFound();
  }

  const content = post.content && typeof post.content === "object" ? post.content : {};
  const contentAny = content as Record<string, unknown>;
  const fileUrl =
    (typeof contentAny.fileUrl === "string" && contentAny.fileUrl) ||
    (typeof contentAny.pdfUrl === "string" && contentAny.pdfUrl) ||
    "";

  if (!fileUrl || !/^https?:\/\//i.test(fileUrl)) {
    notFound();
  }

  const viewerUrl = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`;
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const category =
    typeof contentAny.category === "string" ? contentAny.category : "";
  const related = (await fetchTaskPosts("pdf", 6))
    .filter((item) => item.slug !== post.slug)
    .filter((item) => {
      if (!category) return true;
      const itemContent = item.content && typeof item.content === "object" ? item.content : {};
      const itemCategory =
        typeof (itemContent as Record<string, unknown>).category === "string"
          ? (itemContent as Record<string, unknown>).category
          : "";
      return itemCategory === category;
    })
    .slice(0, 3);
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "PDF Library",
        item: `${baseUrl}/pdf`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${baseUrl}/pdf/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <NavbarShell />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-400 text-slate-900">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/20" />
          
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
              <div>
                <Link
                  href="/pdf"
                  className="group inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-slate-900/90 hover:bg-white/30 transition-all duration-300"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Library
                </Link>
                <div className="mt-8">
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                    {post.title}
                  </h1>
                  {category && (
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-slate-900">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 12h10m-7 5h10" />
                        </svg>
                        {category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-2xl bg-white/20 backdrop-blur-md" />
                  <div className="relative rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-gradient-to-br from-amber-600 to-orange-500 p-3">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">PDF Document</h3>
                        <p className="text-sm text-slate-900/80">Interactive viewer with enhanced controls</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Viewer Section */}
        <section className="relative -mt-16 bg-white shadow-2xl">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
              <div className="lg:col-span-2">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-inner">
                  {/* Viewer Header */}
                  <div className="flex items-center border-b border-slate-200 bg-white px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-amber-100 p-2">
                        <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">Document Viewer</h2>
                        <p className="text-sm text-slate-600">High-quality PDF viewing experience</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* PDF Iframe */}
                  <div className="bg-white">
                    <iframe
                      src={viewerUrl}
                      title={post.title}
                      className="h-[75vh] w-full border-0"
                    />
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="space-y-6">
                {/* Actions Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                  <PdfActions fileUrl={fileUrl} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {related.length ? (
          <section className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Related Documents</h2>
                  <p className="mt-2 text-slate-600">Explore more PDFs in the same category</p>
                </div>
                <Link
                  href="/pdf"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-amber-500 bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600 hover:border-amber-600 transition-all duration-300"
                >
                  View All
                  <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <TaskPostCard
                    key={item.id}
                    post={item}
                    href={buildPostUrl("pdf", item.slug)}
                  />
                ))}
              </div>
              <div className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-full bg-amber-100 p-2">
                    <svg className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Quick Links</h3>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <ul className="space-y-2">
                    {related.map((item) => (
                      <li key={`related-${item.id}`}>
                        <Link
                          href={buildPostUrl("pdf", item.slug)}
                          className="group flex items-center gap-2 rounded-lg p-3 text-slate-700 hover:bg-white hover:text-amber-600 transition-all duration-200"
                        >
                          <svg className="h-4 w-4 text-slate-400 group-hover:text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="line-clamp-1">{item.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-2">
                    <Link 
                      href="/pdf" 
                      className="group flex items-center gap-2 rounded-lg p-3 text-slate-700 hover:bg-white hover:text-amber-600 transition-all duration-200"
                    >
                      <svg className="h-4 w-4 text-slate-400 group-hover:text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>Browse all PDFs</span>
                    </Link>
                    <Link 
                      href="/" 
                      className="group flex items-center gap-2 rounded-lg p-3 text-slate-700 hover:bg-white hover:text-amber-600 transition-all duration-200"
                    >
                      <svg className="h-4 w-4 text-slate-400 group-hover:text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      <span>Return to Home</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
