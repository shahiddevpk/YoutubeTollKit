import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog-registry';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'YouTube Creator Guides & SEO Blog | YouTubeFreeToolkit',
  description:
    'Free in-depth guides on YouTube monetization requirements, SEO optimization, thumbnail CTR strategies, and channel growth blueprints.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/blog`,
  },
  openGraph: {
    title: 'YouTube Creator Guides & SEO Blog | YouTubeFreeToolkit',
    description:
      'Master YouTube monetization, SEO checklists, and algorithm tactics with our free creator guides.',
    url: `${SITE_CONFIG.url}/blog`,
  },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 py-12 sm:py-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-full max-w-4xl bg-red-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3.5 py-1 text-xs font-bold text-red-400 border border-red-500/20 mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            Creator Academy & Growth Guides
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            YouTube Creator Guides & Insights
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Actionable, 100% free tutorials and step-by-step blueprints for YouTube SEO, Partner Program qualification, and revenue optimization.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 hover:border-red-500/50 hover:bg-slate-900 transition-all shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="rounded-full bg-red-500/10 px-3 py-0.5 text-xs font-bold text-red-400 border border-red-500/20">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-red-400 transition-colors leading-tight">
                    {post.title}
                  </h2>
                </Link>

                <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 border-t border-slate-800/80 pt-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-400">
                  <div className="h-6 w-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white">
                    SD
                  </div>
                  <span>{post.author.name}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 font-bold text-red-400 group-hover:text-red-300 transition-colors"
                >
                  Read Article <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
