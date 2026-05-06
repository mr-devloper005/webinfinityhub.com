"use client";

import Link from "next/link";
import { useState } from "react";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { buildPostUrl } from "@/lib/task-data";
import type { SitePost } from "@/lib/site-connector";

interface ProfileClientProps {
  post: SitePost;
  suggestedArticles: SitePost[];
  brandName: string;
  domain?: string;
  descriptionHtml: string;
  website?: string;
  logoUrl?: string;
  breadcrumbData: any;
}

export function ProfileClient({
  post,
  suggestedArticles,
  brandName,
  domain,
  descriptionHtml,
  website,
  logoUrl,
  breadcrumbData,
}: ProfileClientProps) {
  const [showNotification, setShowNotification] = useState(false);

  const handleShareProfile = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <>
      <SchemaJsonLd data={breadcrumbData} />
      
      {/* Hero Profile Card */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-white via-white to-slate-50/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top-right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(148,163,184,0.03)_25%,rgba(148,163,184,0.03)_26%,transparent_27%,transparent_74%,rgba(148,163,184,0.03)_75%,rgba(148,163,184,0.03)_76%,transparent_77%,transparent)] bg-[length:60px_60px]" />
        
        <div className="relative px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[320px_1fr] lg:items-start">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 blur-md transition-all duration-500 group-hover:from-primary/30 group-hover:to-purple-600/30 group-hover:blur-lg" />
                <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white/80 bg-gradient-to-br from-slate-100 to-slate-200 shadow-xl">
                  {logoUrl ? (
                    <ContentImage 
                      src={logoUrl} 
                      alt={post.title} 
                      fill 
                      className="object-cover" 
                      sizes="192px" 
                      intrinsicWidth={192} 
                      intrinsicHeight={192} 
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
                      <span className="text-5xl font-bold text-primary/60">
                        {post.title.slice(0, 1).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Content Section */}
            <div className="flex flex-col">
              {/* Header */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                    {brandName}
                  </h1>
                </div>
                
                {domain && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="font-medium">{domain}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-8">
                <div className="rounded-2xl border border-border/40 bg-white/50 p-6 shadow-sm backdrop-blur-sm">
                  <h2 className="text-lg font-semibold text-foreground mb-4">About</h2>
                  <article
                    className="article-content prose prose-slate max-w-none text-base leading-relaxed prose-p:my-3 prose-a:text-primary prose-a:underline prose-strong:font-semibold prose-headings:text-foreground"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                {website && (
                  <Button 
                    asChild 
                    size="lg" 
                    className="px-8 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Link href={website} target="_blank" rel="noopener noreferrer">
                      Visit Official Site
                    </Link>
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 text-base font-semibold border-2 hover:bg-primary hover:text-white transition-all duration-300"
                  asChild
                >
                  <Link href="/login">
                    Contact Profile
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="px-8 text-base font-semibold hover:bg-muted transition-all duration-300"
                  onClick={handleShareProfile}
                >
                  Share Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {suggestedArticles.length ? (
        <section className="mt-16">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Suggested Articles</h2>
              <p className="mt-2 text-sm text-muted-foreground">Discover more content related to this profile</p>
            </div>
            <Link 
              href="/articles" 
              className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-white/80 px-6 py-3 text-sm font-semibold text-foreground shadow-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              View all
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {/* Articles Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {suggestedArticles.slice(0, 3).map((article) => (
              <TaskPostCard
                key={article.id}
                post={article}
                href={buildPostUrl("article", article.slug)}
                compact
              />
            ))}
          </div>

          {/* Related Links Card */}
          <nav className="mt-12 rounded-[2rem] border border-border/40 bg-gradient-to-br from-white/90 to-slate-50/80 p-8 shadow-[0_10px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full bg-primary/10 p-2">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Related Links</h3>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Quick Access</p>
                <ul className="space-y-2">
                  {suggestedArticles.slice(0, 3).map((article) => (
                    <li key={`related-${article.id}`}>
                      <Link
                        href={buildPostUrl("article", article.slug)}
                        className="group flex items-center gap-2 rounded-lg p-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                      >
                        <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="line-clamp-1">{article.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Explore More</p>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      href="/profile" 
                      className="group flex items-center gap-2 rounded-lg p-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                    >
                      <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Browse all profiles</span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/articles" 
                      className="group flex items-center gap-2 rounded-lg p-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-all duration-200"
                    >
                      <svg className="h-4 w-4 text-muted-foreground group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>All articles</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </section>
      ) : null}
      
      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex items-center gap-3 rounded-lg bg-green-600 px-6 py-4 text-white shadow-lg">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Profile URL copied to clipboard!</span>
          </div>
        </div>
      )}
    </>
  );
}
