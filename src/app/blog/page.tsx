import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { BLOG_POSTS } from '@/lib/blog-registry';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { noindexFollowRobots, defaultRobots, hasNoindexSearchParams } from '@/lib/seo-site-config';

export const revalidate = 3600;

type BlogPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const params = await searchParams;
  const filtered = hasNoindexSearchParams(params);

  return {
    title: 'YouTube Creator Guides & SEO Blog | YouTubeFreeToolkit',
    description:
      'Free guides on YouTube Partner Program requirements, monetization checks, SEO checklists, and channel research — written for creators, with links to matching free tools.',
    alternates: {
      canonical: `${SITE_CONFIG.url}/blog`,
    },
    robots: filtered ? noindexFollowRobots() : defaultRobots(),
    openGraph: {
      title: 'YouTube Creator Guides & SEO Blog | YouTubeFreeToolkit',
      description:
        'Policy-safe YouTube monetization, SEO, and channel research guides with transparent limitations.',
      url: `${SITE_CONFIG.url}/blog`,
    },
  };
}

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-16 transition-colors">
      <section className="border-b border-[#e5e5e5] dark:border-[#272727] py-10 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3.5 py-1 text-xs font-bold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20 mb-3">
            <span>▶</span> Creator Knowledge Base
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
            YouTube creator guides & articles
          </h1>
          <div className="mt-4 space-y-3 text-base text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-3xl">
            <p>
              These articles explain how YouTube monetization, metadata, and public channel research work in plain
              language. We cite official thresholds where possible, call out what YouTube keeps private, and link to
              free tools on this site when they match the topic.
            </p>
            <p className="text-sm">
              Start with our pillar hubs:{' '}
              <Link href="/guides/youtube-monetization" className="text-[#ff0000] dark:text-red-400 hover:underline font-semibold">Monetization</Link>
              {', '}
              <Link href="/guides/youtube-seo" className="text-[#ff0000] dark:text-red-400 hover:underline font-semibold">SEO</Link>
              {', or '}
              <Link href="/guides/youtube-troubleshooting" className="text-[#ff0000] dark:text-red-400 hover:underline font-semibold">Troubleshooting</Link>
              .
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-10 space-y-5">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="group rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 hover:border-[#ff0000]/60 dark:hover:border-[#ff0000]/40 hover:shadow-md transition-all"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#909090] dark:text-[#717171] mb-2">
              <span className="rounded-full bg-[#ff0000]/10 px-2.5 py-0.5 font-bold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20">
                {post.category}
              </span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <span>Updated {post.updatedAt}</span>
            </div>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-lg sm:text-xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0000] dark:group-hover:text-red-400 transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="mt-2 text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#ff0000] dark:text-red-400 hover:underline"
            >
              Read guide →
            </Link>
          </article>
        ))}
      </main>
    </div>
  );
}
