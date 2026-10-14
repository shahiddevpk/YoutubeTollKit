import React, { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { TOOLS_REGISTRY, CATEGORIES, SITE_CONFIG } from '@/lib/tools-registry';
import { hasNoindexSearchParams, noindexFollowRobots, defaultRobots } from '@/lib/seo-site-config';
import { ToolsExplorerClient } from './ToolsExplorerClient';

export const revalidate = 3600;

type ToolsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: ToolsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const filtered = hasNoindexSearchParams(params);

  return {
    title: {
      absolute: 'All YouTube Tools by Category | YouTubeFreeToolkit',
    },
    description: `Browse ${TOOLS_REGISTRY.length} policy-safe YouTube creator tools — monetization indicators, metadata, and research. No downloaders. Public tools need no login.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/tools`,
    },
    robots: filtered ? noindexFollowRobots() : defaultRobots(),
    openGraph: {
      title: 'All YouTube Tools by Category | YouTubeFreeToolkit',
      description:
        'Explore free YouTube monetization, SEO, and creator utilities. Public checks need no login; channel owners can optionally verify YPP access with YouTube Analytics.',
      url: `${SITE_CONFIG.url}/tools`,
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og?title=Free+YouTube+Tools+Directory&desc=${TOOLS_REGISTRY.length}%2B+Free+Creator+Utilities`,
          width: 1200,
          height: 630,
          alt: 'YouTube Tools Directory',
        },
      ],
    },
  };
}

export default function ToolsIndexPage() {
  return (
    <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-16 transition-colors">
      <section className="border-b border-[#e5e5e5] dark:border-[#272727] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3.5 py-1 text-xs font-bold text-[#cc0000] dark:text-red-400 border border-[#ff0000]/20 mb-3">
              <span>▶</span> {TOOLS_REGISTRY.length} Creator Tools
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
              All YouTube creator tools
            </h1>
            <p className="mt-3 text-base text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
              {TOOLS_REGISTRY.length} free utilities for monetization indicators, channel research, SEO metadata,
              analytics, and publishing helpers. Each tool includes instructions, limitations, and FAQs. We do not offer
              video or audio downloaders.
            </p>
          </div>
          <div className="mt-6 space-y-2 text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed border-t border-[#e5e5e5] dark:border-[#272727] pt-6 max-w-3xl">
            <p>
              Every tool page includes a short how-it-works list, a longer guide section, and policy limitations so you
              know what public APIs can and cannot prove. Use category hubs for overviews, or open our{' '}
              <Link href="/guides" className="text-[#cc0000] dark:text-red-400 hover:underline font-semibold">
                pillar guides
              </Link>{' '}
              for monetization, SEO, and troubleshooting workflows.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        {/* Server-rendered, crawlable directory shown until the interactive explorer (search + filters) hydrates */}
        <Suspense
          fallback={
            <div className="space-y-10">
              {CATEGORIES.map((cat) => {
                const tools = TOOLS_REGISTRY.filter((t) => t.category === cat.id);
                if (!tools.length) return null;
                return (
                  <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
                    <h2 id={`cat-${cat.id}`} className="text-xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
                      <Link href={`/tools/category/${cat.id}`} className="hover:text-[#ff0000]">{cat.name}</Link>
                    </h2>
                    <p className="mt-1 text-sm text-[#606060] dark:text-[#aaaaaa]">{cat.description}</p>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {tools.map((t) => (
                        <li key={t.slug} className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] p-4">
                          <Link href={`/tools/${t.slug}`} className="font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] hover:text-[#ff0000]">
                            {t.name}
                          </Link>
                          <p className="mt-1 text-xs text-[#606060] dark:text-[#aaaaaa] line-clamp-3">{t.metaDescription}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          }
        >
          <ToolsExplorerClient initialTools={TOOLS_REGISTRY} categories={CATEGORIES} />
        </Suspense>
      </div>
    </div>
  );
}
