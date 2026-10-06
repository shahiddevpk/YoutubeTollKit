import React, { Suspense } from 'react';
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
      absolute: `Free YouTube Creator Tools Directory (${TOOLS_REGISTRY.length} Tools) | YouTubeFreeToolkit`,
    },
    description: `Browse ${TOOLS_REGISTRY.length} policy-safe YouTube creator tools — monetization indicators, metadata, and research. No downloaders. Public tools need no login.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/tools`,
    },
    robots: filtered ? noindexFollowRobots() : defaultRobots(),
    openGraph: {
      title: 'Free YouTube Creator Tools Directory | YouTubeFreeToolkit',
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
    <div className="min-h-screen bg-slate-950 pb-16">
      <section className="border-b border-slate-800 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">All YouTube creator tools</h1>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            {TOOLS_REGISTRY.length} free utilities for monetization indicators, channel research, SEO metadata,
            analytics, and publishing helpers. Each tool includes instructions, limitations, and FAQs. We do not offer
            video or audio downloaders.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8">
        <Suspense fallback={<p className="text-sm text-slate-400">Loading tools…</p>}>
          <ToolsExplorerClient initialTools={TOOLS_REGISTRY} categories={CATEGORIES} />
        </Suspense>
      </main>
    </div>
  );
}
