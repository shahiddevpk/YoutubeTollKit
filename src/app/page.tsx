import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TOOLS_REGISTRY, CATEGORIES, getFeaturedTools, SITE_CONFIG } from '@/lib/tools-registry';
import { ToolCard } from '@/components/tools/ToolCard';
import { MonetizationChecker } from '@/components/tools/impl/MonetizationChecker';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: 'Free YouTube Monetization Checker & Creator Tools | YouTubeFreeToolkit',
  },
  description:
    'Free YouTube creator tools for monetization indicators, SEO metadata, and channel research. Public-data checks only — no video downloads. Optional owner verification via YouTube Analytics.',
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: 'Free YouTube Monetization Checker & Creator Tools',
    description:
      'Free YouTube monetization, SEO, and creator tools. Public checks need no login; channel owners can optionally verify YPP monetary access with YouTube Analytics.',
    url: SITE_CONFIG.url,
    images: [
      {
        url: `${SITE_CONFIG.url}/api/og?title=Free+YouTube+Tools&desc=Monetization+Checker+%7C+SEO+%7C+Tags`,
        width: 1200,
        height: 630,
        alt: 'YouTubeFreeToolkit',
      },
    ],
  },
};

export default function HomePage() {
  const featuredTools = getFeaturedTools();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      <section className="border-b border-slate-800 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Free YouTube creator tools
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
            Monetization indicators, channel research, tags, SEO checks, and revenue estimates using public metadata
            only. No video or audio downloaders. Most tools work without an account.
          </p>

          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/80 p-4 sm:p-6">
            <h2 className="text-base font-semibold text-white mb-1">YouTube Monetization Checker</h2>
            <p className="text-xs text-slate-500 mb-4">Unofficial public indicators · optional owner verification</p>
            <Suspense
              fallback={
                <div className="min-h-32 rounded-lg border border-slate-800 bg-slate-950 p-6 text-center text-sm text-slate-500">
                  Loading…
                </div>
              }
            >
              <MonetizationChecker />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800">
        <h2 className="text-lg font-semibold text-white">What you will find here</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-400 leading-relaxed">
          <p>
            YouTubeFreeToolkit is a policy-aware suite for creators who need practical utilities without paywalls or
            misleading download promises. Each tool page explains what data we read, what we cannot infer, and how to
            interpret results next to official YouTube Studio analytics.
          </p>
          <p>
            We use YouTube API Services for public channel and video metadata where applicable. Optional Google sign-in
            is limited to read-only verification for channel owners on the monetization checker. We are not affiliated
            with Google or YouTube.
          </p>
          <p>
            Browse {TOOLS_REGISTRY.length} tools by category—monetization, research, SEO, analytics, and utilities—or
            open the full directory to search by name.
          </p>
        </div>
        <p className="mt-4 flex flex-wrap gap-4 text-sm">
          <Link href="/tools" className="font-medium text-red-400 hover:text-red-300">
            View all tools →
          </Link>
          <Link href="/guides" className="font-medium text-slate-400 hover:text-slate-200">
            Pillar guide hubs →
          </Link>
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-white">Popular tools</h2>
          <Link href="/tools" className="text-xs text-slate-500 hover:text-slate-300">
            See all {TOOLS_REGISTRY.length}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredTools.slice(0, 6).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} compact />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-4">Browse by category</h2>
        <ul className="space-y-3">
          {CATEGORIES.map((cat) => {
            const count = TOOLS_REGISTRY.filter((t) => t.category === cat.id).length;
            return (
              <li key={cat.id}>
                <Link
                  href={`/tools/category/${cat.id}`}
                  className="block rounded-lg border border-slate-800 px-4 py-3 hover:border-slate-600 transition-colors"
                >
                  <span className="font-medium text-slate-200">{cat.name}</span>
                  <span className="text-xs text-slate-500 ml-2">({count})</span>
                  <p className="text-xs text-slate-500 mt-1">{cat.description}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-800">
        <h2 className="text-lg font-semibold text-white mb-4">Common questions</h2>
        <div className="space-y-3 text-sm">
          {[
            {
              q: 'Is this site free?',
              a: 'Yes. Tools are free to use. We do not sell your data or require API keys for public checks.',
            },
            {
              q: 'Do you offer video downloaders?',
              a: 'No. We do not host MP3 converters, rip streams, or bypass private or members-only videos. That keeps the site aligned with YouTube Terms of Service and Google publisher policies.',
            },
            {
              q: 'How should I use monetization results?',
              a: 'Treat public checks as unofficial indicators. Channel owners can optionally verify Analytics monetary access with read-only Google permissions. Always confirm status in YouTube Studio.',
            },
            {
              q: 'Where are policies explained?',
              a: 'Read our Privacy Policy, Terms, and Policy Compliance pages for API usage, limitations, and contact information.',
            },
          ].map(({ q, a }) => (
            <details key={q} className="rounded-lg border border-slate-800 px-4 py-3">
              <summary className="cursor-pointer font-medium text-slate-200 list-none">{q}</summary>
              <p className="mt-2 text-slate-400 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500">
          <Link href="/compliance" className="underline hover:text-slate-400">Policy compliance</Link>
          {' · '}
          <Link href="/privacy" className="underline hover:text-slate-400">Privacy</Link>
          {' · '}
          <Link href="/contact" className="underline hover:text-slate-400">Contact</Link>
        </p>
      </section>
    </div>
  );
}
