import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { TOOLS_REGISTRY, CATEGORIES, SITE_CONFIG } from '@/lib/tools-registry';
import { ToolsExplorerClient } from './ToolsExplorerClient';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: `Free YouTube Creator Tools Directory (${TOOLS_REGISTRY.length} Tools) | YouTubeFreeToolkit`,
  },
  description:
    `Explore ${TOOLS_REGISTRY.length} free YouTube tools for monetization checks, channel research, tags, SEO, RPM planning, and more. Public tools require no login; owner verification is optional.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/tools`,
  },
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

export default function ToolsIndexPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 py-12 sm:py-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-full max-w-4xl bg-red-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3.5 py-1 text-xs font-bold text-red-400 border border-red-500/20 mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Complete Free Creator Suite
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            All YouTube Creator Tools
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
            Browse our policy-safe tools for channel monetization checks, SEO metadata optimization,
            and revenue projections. 100% free with zero limits.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Policy-aware design</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-amber-400" />
              <span>Instant Client-Side & API Processing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Directory Client */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <Suspense fallback={<p className="text-sm text-slate-400">Loading tools directory...</p>}>
          <ToolsExplorerClient initialTools={TOOLS_REGISTRY} categories={CATEGORIES} />
        </Suspense>
      </main>
    </div>
  );
}
