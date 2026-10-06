import React from 'react';
import { Metadata } from 'next';
import { SITE_CONFIG, TOOLS_REGISTRY } from '@/lib/tools-registry';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | YouTubeFreeToolkit',
  description:
    'Learn about the YouTubeFreeToolkit mission: free, policy-compliant YouTube creator tools, public-metadata research, and transparent limitations — no video downloaders.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] py-14 transition-colors">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3.5 py-1 text-xs font-bold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20">
            <span>▶</span> About The Project
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
            About YouTubeFreeToolkit
          </h1>
          <p className="text-base text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-2xl">
            We build free tools for YouTube creators who need monetization indicators, metadata helpers, and public
            channel research without paywalls or misleading download features.
          </p>
        </header>

        <section className="space-y-3 text-sm sm:text-base text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">What we publish</h2>
          <p>
            The site includes {TOOLS_REGISTRY.length} interactive utilities, category hubs, long-form tool guides,
            and a small blog focused on Partner Program requirements, SEO checklists, and responsible monetization
            checks. Each tool page documents limitations so results are not mistaken for official YouTube status.
          </p>
          <p>
            We use YouTube API Services where needed and optional read-only Google OAuth for owner verification on the
            monetization checker. We are not affiliated with Google or YouTube.
          </p>
        </section>

        <section className="space-y-3 text-sm sm:text-base text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">What we do not publish</h2>
          <p>
            We do not offer MP3 or video downloaders, private-video viewers, members-only bypass tools, or spam
            utilities. That scope keeps the project aligned with YouTube Terms of Service and Google publisher policies.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3 text-sm">
          <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5 shadow-sm">
            <h3 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Free access</h3>
            <p className="mt-1 text-xs text-[#606060] dark:text-[#aaaaaa]">No subscriptions or daily caps on public tools.</p>
          </div>
          <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5 shadow-sm">
            <h3 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Policy-aware</h3>
            <p className="mt-1 text-xs text-[#606060] dark:text-[#aaaaaa]">Clear disclaimers and a public compliance page.</p>
          </div>
          <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5 shadow-sm">
            <h3 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Privacy</h3>
            <p className="mt-1 text-xs text-[#606060] dark:text-[#aaaaaa]">No Google password collection; optional OAuth only when you start it.</p>
          </div>
        </section>

        <p className="pt-4 border-t border-[#e5e5e5] dark:border-[#272727]">
          <Link href="/tools" className="text-sm font-semibold text-[#ff0000] dark:text-red-400 hover:underline">
            Browse all {TOOLS_REGISTRY.length} tools →
          </Link>
        </p>
      </div>
    </div>
  );
}
