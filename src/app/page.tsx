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
    <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-16 transition-colors">
      {/* Hero Section */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3.5 py-1 text-xs font-bold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20 mb-4">
              <span>▶</span> Free YouTube Creator Suite
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
              Free YouTube creator tools
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
              Check any channel for inferred monetization likelihood and illustrative revenue from public stats — clearly
              labeled non-official. Plus tags, SEO audits, and research tools. No downloaders. Free public checks; owners
              can verify with YouTube Analytics.
            </p>
          </div>

          {/* Flagship Monetization Checker Card */}
          <div className="mt-10 elevated-card rounded-2xl p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">YouTube Monetization Checker</h2>
                <p className="text-xs text-[#909090] dark:text-[#717171] mt-0.5">
                  Inferred report + revenue matrix · optional owner verification via YouTube Analytics
                </p>
              </div>
              <span className="self-start sm:self-auto rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                Flagship Tool
              </span>
            </div>
            <Suspense
              fallback={
                <div className="min-h-32 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#1f1f1f] p-6 text-center text-sm text-[#909090]">
                  Loading tool…
                </div>
              }
            >
              <MonetizationChecker />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Value Proposition / Mission */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">What you will find here</h2>
        <div className="mt-4 space-y-3 text-sm sm:text-base text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-4xl">
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
        <p className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
          <Link href="/tools" className="text-[#ff0000] dark:text-red-400 hover:underline">
            View all {TOOLS_REGISTRY.length} tools →
          </Link>
          <Link href="/guides" className="text-[#606060] dark:text-[#aaaaaa] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors">
            Pillar guide hubs →
          </Link>
        </p>
      </section>

      {/* Popular Tools Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Popular creator tools</h2>
            <p className="text-xs sm:text-sm text-[#909090] dark:text-[#717171] mt-1">Frequently used by YouTube creators worldwide</p>
          </div>
          <Link href="/tools" className="text-xs sm:text-sm font-semibold text-[#ff0000] dark:text-red-400 hover:underline">
            See all {TOOLS_REGISTRY.length} →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTools.slice(0, 6).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} compact />
          ))}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-6">Browse by category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CATEGORIES.map((cat) => {
            const count = TOOLS_REGISTRY.filter((t) => t.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/tools/category/${cat.id}`}
                className="group elevated-card block rounded-2xl p-5 transition-all hover:border-[#ff0000]/50 dark:hover:border-[#ff0000]/35"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0000] dark:group-hover:text-red-400 transition-colors">
                    {cat.name}
                  </span>
                  <span className="rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-2.5 py-0.5 text-xs font-semibold text-[#606060] dark:text-[#aaaaaa]">
                    {count} tools
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Common Questions */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14 pb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-6">Frequently asked questions</h2>
        <div className="space-y-3.5 text-sm">
          {[
            {
              q: 'Is this site free?',
              a: 'Yes. All tools are 100% free to use. We do not sell your data or require API keys for public checks.',
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
            <details key={q} className="group elevated-card rounded-xl px-5 py-4 transition-all">
              <summary className="cursor-pointer font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0000] dark:group-hover:text-red-400 list-none flex items-center justify-between">
                <span>{q}</span>
                <span className="text-[#909090] dark:text-[#717171] group-open:rotate-180 transition-transform text-xs ml-2">▼</span>
              </summary>
              <p className="mt-3 text-[#606060] dark:text-[#aaaaaa] leading-relaxed border-t border-theme pt-3">
                {a}
              </p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-xs text-[#909090] dark:text-[#717171] flex flex-wrap gap-3">
          <Link href="/compliance" className="hover:text-[#ff0000] dark:hover:text-red-400 underline">Policy compliance</Link>
          <span>·</span>
          <Link href="/privacy" className="hover:text-[#ff0000] dark:hover:text-red-400 underline">Privacy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-[#ff0000] dark:hover:text-red-400 underline">Terms</Link>
          <span>·</span>
          <Link href="/contact" className="hover:text-[#ff0000] dark:hover:text-red-400 underline">Contact</Link>
        </p>
      </section>
    </div>
  );
}
