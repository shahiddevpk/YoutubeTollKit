import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { TOOLS_REGISTRY, CATEGORIES, SITE_CONFIG } from '@/lib/tools-registry';
import { defaultRobots } from '@/lib/seo-site-config';


export const metadata: Metadata = {
  title: { absolute: `Free YouTube Tools — ${TOOLS_REGISTRY.length} Tools, No Login | YouTubeFreeToolkit` },
  description:
    `${TOOLS_REGISTRY.length} free YouTube tools for monetization checks, tags, descriptions, channel research and analytics. No account needed, no downloaders.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/free-youtube-tools`,
  },
  robots: defaultRobots(),
  openGraph: {
    title: `Free YouTube Tools — ${TOOLS_REGISTRY.length}+ Free Creator Utilities`,
    description: `Browse ${TOOLS_REGISTRY.length} free YouTube creator tools: monetization checker, tag extractor, earnings calculator, live subscriber counter, thumbnail preview, and more. No login needed.`,
    url: `${SITE_CONFIG.url}/free-youtube-tools`,
    images: [
      {
        url: `${SITE_CONFIG.url}/api/og?title=Free+YouTube+Tools&desc=${TOOLS_REGISTRY.length}%2B+Free+Utilities+No+Login`,
        width: 1200,
        height: 630,
        alt: 'Free YouTube Tools — YouTubeFreeToolkit',
      },
    ],
  },
};

const faqItems = [
  {
    question: 'Are all these YouTube tools really free?',
    answer:
      'Yes — every tool on this page is completely free with no paid tier, no subscription, and no credit card required. Most public tools work without any login at all.',
  },
  {
    question: 'Do I need to create an account to use these free YouTube tools?',
    answer:
      `No account is required for any of the ${TOOLS_REGISTRY.length} tools listed here. The one optional exception is the Monetization Checker's "Verify" feature, which lets channel owners confirm their own YPP status by connecting their Google account with read-only OAuth — even that is optional.`,
  },
  {
    question: 'What is the best free YouTube tool for checking monetization?',
    answer:
      'The YouTube Monetization Checker at /tools/monetization-checker is the most comprehensive free tool for checking public YPP eligibility signals. It shows inferred monetization likelihood, subscriber thresholds, and illustrative revenue estimates based on public view counts.',
  },
  {
    question: 'Is there a free YouTube keyword research tool?',
    answer:
      'Yes. The Tag Extractor (/tools/tag-extractor) shows you the hidden tags any public YouTube video uses, giving you direct keyword intelligence on what top-ranking creators optimize for in your niche. The SEO Score Checker (/tools/seo-score-checker) analyzes your title, description, and tags for SEO quality.',
  },
  {
    question: 'Do these free YouTube tools violate YouTube\'s Terms of Service?',
    answer:
      'No. Every tool here uses only the official YouTube Data API v3 with public data that YouTube makes available to third-party applications under its API Terms of Service. We do not scrape YouTube, we do not download video or audio content, and we do not access private or monetization data without explicit owner authorization.',
  },
  {
    question: 'What is the best free tool to check how many subscribers a YouTube channel has in real time?',
    answer:
      'The Live Subscriber Counter (/tools/live-subscriber-count) shows the real-time subscriber count for any public channel, refreshing automatically. It fetches official subscriber counts from the YouTube Data API v3.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.url },
        { '@type': 'ListItem', position: 2, name: 'Free YouTube Tools', item: `${SITE_CONFIG.url}/free-youtube-tools` },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    },
    {
      '@type': 'ItemList',
      name: 'Free YouTube Creator Tools',
      description: `${TOOLS_REGISTRY.length} free YouTube tools for creators — monetization, SEO, analytics, research, and utilities.`,
      numberOfItems: TOOLS_REGISTRY.length,
      itemListElement: TOOLS_REGISTRY.map((tool, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: tool.name,
        url: `${SITE_CONFIG.url}/tools/${tool.slug}`,
        description: tool.description,
      })),
    },
  ],
};

const BADGE_COLORS: Record<string, string> = {
  Flagship: 'bg-[#ff0000]/10 text-[#cc0000] border-[#ff0000]/20 dark:text-red-400',
  Free: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  Live: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  'Community Data': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  New: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
};

export default function FreeYouTubeToolsPage() {
  const categorisedTools = CATEGORIES.map((cat) => ({
    category: cat,
    tools: TOOLS_REGISTRY.filter((t) => t.category === cat.id),
  })).filter((g) => g.tools.length > 0);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-16 transition-colors">
        {/* Hero */}
        <section className="border-b border-[#e5e5e5] dark:border-[#272727] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <nav aria-label="Breadcrumb" className="mb-4 text-xs text-[#606060] dark:text-[#a0a0a0]">
                <Link href="/" className="hover:text-[#ff0000] transition-colors">Home</Link>
                <span className="mx-1.5">/</span>
                <span className="text-[#0f0f0f] dark:text-[#f1f1f1]">Free YouTube Tools</span>
              </nav>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
                <span>✓</span> {TOOLS_REGISTRY.length} Free Tools — No Login Required
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight leading-tight">
                Free YouTube Tools
              </h1>
              <p className="mt-4 text-base sm:text-lg text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-2xl">
                {TOOLS_REGISTRY.length} free YouTube creator utilities — monetization indicators, SEO &amp; tag research, channel analytics, earnings estimators, thumbnail tools, and more. All free, all policy-safe, no video or audio downloads.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-3 py-1 text-xs font-medium text-[#606060] dark:text-[#aaaaaa] hover:border-[#ff0000] hover:text-[#ff0000] transition-colors"
                  >
                    {cat.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <div className="border-b border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#111111]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#606060] dark:text-[#aaaaaa]">
              <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> 100% Free — No Paid Plan</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> No Account or Signup</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Powered by YouTube Data API v3</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> No Video or Audio Downloads</span>
              <span className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Policy-Safe — No TOS Violations</span>
            </div>
          </div>
        </div>

        {/* Tools by category */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 space-y-14">
          {categorisedTools.map(({ category, tools }) => (
            <section key={category.id} id={category.id}>
              <div className="mb-5">
                <h2 className="text-xl font-black text-[#0f0f0f] dark:text-[#f1f1f1]">
                  {category.name}
                </h2>
                <p className="text-sm text-[#606060] dark:text-[#aaaaaa] mt-1 max-w-2xl">
                  {category.description}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5 hover:border-[#ff0000]/40 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0000] transition-colors leading-snug">
                        {tool.name}
                      </h3>
                      {tool.badge && (
                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${BADGE_COLORS[tool.badge] ?? 'bg-[#f9f9f9] dark:bg-[#272727] text-[#606060] dark:text-[#aaaaaa] border-[#e5e5e5] dark:border-[#272727]'}`}
                        >
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#606060] dark:text-[#aaaaaa] line-clamp-3 leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="mt-3 text-xs font-semibold text-[#cc0000] group-hover:underline dark:text-red-400">
                      Use free tool →
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* FAQ section */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-2xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqItems.map(({ question, answer }) => (
              <div
                key={question}
                className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5"
              >
                <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-2">
                  {question}
                </h3>
                <p className="text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed">{answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA bottom */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-14">
          <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-8 text-center">
            <h2 className="text-xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] mb-2">
              All {TOOLS_REGISTRY.length} tools. All free. No login.
            </h2>
            <p className="text-sm text-[#606060] dark:text-[#aaaaaa] mb-5 max-w-xl mx-auto">
              Every tool is powered by the official YouTube Data API v3, regularly updated, and free to use with no account required. We do not offer video or audio downloaders.
            </p>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-[#d40000] px-6 py-3 text-sm font-bold text-white hover:bg-[#cc0000] transition-colors"
            >
              Browse All Tools with Search &amp; Filter →
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
