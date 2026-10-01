import React from 'react';
import Link from 'next/link';
import { TOOLS_REGISTRY, CATEGORIES, getFeaturedTools, SITE_CONFIG } from '@/lib/tools-registry';
import { ToolCard } from '@/components/tools/ToolCard';
import { MonetizationChecker } from '@/components/tools/impl/MonetizationChecker';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Tag,
  Fingerprint,
  Gauge,
  HelpCircle,
} from 'lucide-react';

export default function HomePage() {
  const featuredTools = getFeaturedTools();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Hero Section with Embedded Flagship Monetization Checker */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 pt-12 sm:pt-16 pb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-96 w-full max-w-5xl bg-red-600/15 blur-[140px] pointer-events-none rounded-full" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-400 border border-red-500/20 mb-6">
            <Sparkles className="h-4 w-4" />
            <span>The 100% Free YouTube Creator Suite — 2026 Edition</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Supercharge Your YouTube Channel <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-400 bg-clip-text text-transparent">
              With Free Creator Tools
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Check monetization eligibility in seconds, extract competitor tags, find channel IDs, audit SEO scores, and estimate revenue — without sign-ups or subscription paywalls.
          </p>

          {/* Embedded Flagship Tool Card on Hero */}
          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 text-left shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white font-bold text-xs">
                  ▶
                </span>
                <div>
                  <h2 className="text-base font-bold text-white">YouTube Monetization Checker</h2>
                  <p className="text-xs text-slate-400">Flagship free verification tool</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                Instant Check
              </span>
            </div>

            <MonetizationChecker />
          </div>

          {/* Quick Stats Highlights */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4">
              <span className="text-2xl font-black text-white font-mono">{TOOLS_REGISTRY.length}+</span>
              <p className="text-xs text-slate-400 mt-0.5">Free Creator Tools</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4">
              <span className="text-2xl font-black text-emerald-400 font-mono">100%</span>
              <p className="text-xs text-slate-400 mt-0.5">Policy & ToS Safe</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4">
              <span className="text-2xl font-black text-blue-400 font-mono">0 sec</span>
              <p className="text-xs text-slate-400 mt-0.5">Zero Registration</p>
            </div>
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4">
              <span className="text-2xl font-black text-amber-400 font-mono">Free</span>
              <p className="text-xs text-slate-400 mt-0.5">Forever Free Tier</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Core Tools Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-500 mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              Essential Creator Suite
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Popular YouTube Tools
            </h2>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-400 hover:text-red-300 transition-colors"
          >
            Explore all {TOOLS_REGISTRY.length} tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Categorized Tools Hub */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Explore by Category
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Everything you need from pre-upload SEO to post-upload revenue analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const catTools = TOOLS_REGISTRY.filter((t) => t.category === cat.id);
            return (
              <div
                key={cat.id}
                className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{cat.description}</p>
                  <ul className="space-y-2">
                    {catTools.map((t) => (
                      <li key={t.slug}>
                        <Link
                          href={`/tools/${t.slug}`}
                          className="flex items-center justify-between text-xs font-semibold text-slate-300 hover:text-red-400 transition-colors py-1"
                        >
                          <span className="truncate">{t.name}</span>
                          <span className="text-[10px] text-slate-500 uppercase font-mono">
                            Free →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Competitor Comparison / Why YouTubeFreeToolkit */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-10 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              The Quality Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Why Creators Choose YouTubeFreeToolkit
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-semibold">Features & Guarantees</th>
                  <th className="pb-3 font-bold text-red-400">YouTubeFreeToolkit</th>
                  <th className="pb-3 font-semibold text-slate-500">Other Tool Sites</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="py-3 font-medium">100% Policy-Safe & ToS Compliant</td>
                  <td className="py-3 text-emerald-400 font-bold">✓ Full Compliance</td>
                  <td className="py-3 text-rose-400">✗ Risk of DMCA / Broken Tools</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Zero Sign-Up or Login Paywalls</td>
                  <td className="py-3 text-emerald-400 font-bold">✓ 100% Free Always</td>
                  <td className="py-3 text-slate-400">Frequent Paywalls</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Mobile & Core Web Vitals Speed</td>
                  <td className="py-3 text-emerald-400 font-bold">✓ Ultra Fast (&lt;1s)</td>
                  <td className="py-3 text-slate-400">Heavy Ads & Lag</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Shorts Safe-Zone Overlay & Timestamp Tools</td>
                  <td className="py-3 text-emerald-400 font-bold">✓ Included Free</td>
                  <td className="py-3 text-slate-500">Not Available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Global FAQs */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300 mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-red-400" />
            Common Questions
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <details className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 open:border-slate-700 transition-all">
            <summary className="flex cursor-pointer items-center justify-between font-semibold text-white text-base group-hover:text-red-400 transition-colors list-none">
              <span>Is YouTubeFreeToolkit completely free to use?</span>
              <span className="ml-4 text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
              Yes, all tools on YouTubeFreeToolkit are 100% free with no hidden charges, trial periods, or API key requirements.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 open:border-slate-700 transition-all">
            <summary className="flex cursor-pointer items-center justify-between font-semibold text-white text-base group-hover:text-red-400 transition-colors list-none">
              <span>Do I need to connect my YouTube channel or provide credentials?</span>
              <span className="ml-4 text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
              Never. We only analyze publicly accessible video metadata, channel handles, and public algorithm markers. We will never ask for your Google or YouTube account credentials.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-5 open:border-slate-700 transition-all">
            <summary className="flex cursor-pointer items-center justify-between font-semibold text-white text-base group-hover:text-red-400 transition-colors list-none">
              <span>How accurate is the YouTube Monetization Checker?</span>
              <span className="ml-4 text-slate-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
              Our checker inspects official YouTube Partner Program (YPP) code signatures, Google AdSense verification flags, and channel-level monetized ad playback markers, achieving 98%+ verification accuracy.
            </p>
          </details>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="rounded-3xl border border-red-500/30 bg-gradient-to-tr from-red-950/40 via-slate-900 to-slate-950 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 h-48 w-48 bg-red-600/10 blur-[80px] pointer-events-none rounded-full" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Optimize Your YouTube Presence?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Access our full suite of 12+ free creator tools and start analyzing your content today.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/tools/monetization-checker"
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>Check Monetization Now</span>
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-all cursor-pointer"
            >
              <span>Explore All Tools</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
