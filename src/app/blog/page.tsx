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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      <section className="border-b border-slate-200 dark:border-slate-800 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">YouTube creator guides</h1>
          <div className="mt-4 space-y-3 text-sm text-slate-400 leading-relaxed">
            <p>
              These articles explain how YouTube monetization, metadata, and public channel research work in plain
              language. We cite official thresholds where possible, call out what YouTube keeps private, and link to
              free tools on this site when they match the topic.
            </p>
            <p>
              We do not publish download tutorials, gossip, or “bypass” guides. If a guide mentions checking
              monetization, it distinguishes unofficial public signals from owner-verified YouTube Analytics access.
            </p>
            <p>
              Start with our pillar hubs:{' '}
              <Link href="/guides/youtube-monetization" className="text-red-400 hover:text-red-300">Monetization</Link>
              {', '}
              <Link href="/guides/youtube-seo" className="text-red-400 hover:text-red-300">SEO</Link>
              {', or '}
              <Link href="/guides/youtube-troubleshooting" className="text-red-400 hover:text-red-300">Troubleshooting</Link>
              .
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/40 p-5 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
          >
            <p className="text-xs text-slate-500 mb-2">
              {post.category} · {post.readTime} · Updated {post.updatedAt}
            </p>
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white hover:text-red-400/90">{post.title}</h2>
            </Link>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-3 inline-block text-sm font-medium text-red-400 hover:text-red-300"
            >
              Read guide →
            </Link>
          </article>
        ))}
      </main>
    </div>
  );
}
