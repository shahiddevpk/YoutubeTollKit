import React from 'react';
import { Metadata } from 'next';
import { SITE_CONFIG, TOOLS_REGISTRY } from '@/lib/tools-registry';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | YouTubeFreeToolkit',
  description:
    'Learn about YouTubeFreeToolkit mission to provide 100% free, policy-compliant optimization tools for YouTube creators worldwide.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-16 text-slate-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3.5 py-1 text-xs font-bold text-red-400 border border-red-500/20">
            <Sparkles className="h-3.5 w-3.5" />
            Our Mission
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Built for Creators, 100% Free Forever
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We believe every YouTube creator deserves access to high-grade analytics, SEO tools, and monetization verification without paywalls or subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-red-600/10 text-red-500 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-base font-bold text-white">No Paywalls</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every tool on our platform is completely free. We do not charge subscription fees or limit daily checks.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-600/10 text-emerald-400 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-base font-bold text-white">Policy Compliant</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We strictly adhere to Google Search Central and YouTube API Services guidelines to ensure long-term stability and trust.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-base font-bold text-white">Privacy First</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We never require login credentials or store personal account tokens. Your privacy is paramount.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Explore All {TOOLS_REGISTRY.length} Free Tools Today
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            From tag extractors to revenue calculators, start growing your channel with our optimization suite.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition-all"
          >
            <span>Browse Directory</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
