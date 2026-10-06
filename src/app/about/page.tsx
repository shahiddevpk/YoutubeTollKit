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
    <div className="min-h-screen bg-slate-950 py-12 text-slate-300">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10">
        <header className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">About YouTubeFreeToolkit</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            We build free tools for YouTube creators who need monetization indicators, metadata helpers, and public
            channel research without paywalls or misleading download features.
          </p>
        </header>

        <section className="space-y-3 text-sm text-slate-400 leading-relaxed">
          <h2 className="text-base font-semibold text-white">What we publish</h2>
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

        <section className="space-y-3 text-sm text-slate-400 leading-relaxed">
          <h2 className="text-base font-semibold text-white">What we do not publish</h2>
          <p>
            We do not offer MP3 or video downloaders, private-video viewers, members-only bypass tools, or spam
            utilities. That scope keeps the project aligned with YouTube Terms of Service and Google publisher policies.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3 text-sm">
          <div className="rounded-lg border border-slate-800 p-4">
            <h3 className="font-semibold text-white">Free access</h3>
            <p className="mt-1 text-xs text-slate-500">No subscriptions or daily caps on public tools.</p>
          </div>
          <div className="rounded-lg border border-slate-800 p-4">
            <h3 className="font-semibold text-white">Policy-aware</h3>
            <p className="mt-1 text-xs text-slate-500">Clear disclaimers and a public compliance page.</p>
          </div>
          <div className="rounded-lg border border-slate-800 p-4">
            <h3 className="font-semibold text-white">Privacy</h3>
            <p className="mt-1 text-xs text-slate-500">No Google password collection; optional OAuth only when you start it.</p>
          </div>
        </section>

        <p>
          <Link href="/tools" className="text-sm font-medium text-red-400 hover:text-red-300">
            Browse all {TOOLS_REGISTRY.length} tools →
          </Link>
        </p>
      </div>
    </div>
  );
}
