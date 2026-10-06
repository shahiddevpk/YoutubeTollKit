import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SITE_CONFIG, TOOLS_REGISTRY } from '@/lib/tools-registry';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { defaultRobots } from '@/lib/seo-site-config';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Database,
  Search,
  Code2,
  Sparkles,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: {
    absolute: 'About Us — YouTubeFreeToolkit Mission & Architecture',
  },
  description:
    'Learn who built YouTubeFreeToolkit, why our suite is 100% free, how our tools process data via the official YouTube Data API, and our strict privacy safeguards.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
  openGraph: {
    title: 'About Us — YouTubeFreeToolkit Mission & Architecture',
    description:
      'Learn who built YouTubeFreeToolkit, why our suite is 100% free, how our tools process data via the official YouTube Data API, and our strict privacy safeguards.',
    url: `${SITE_CONFIG.url}/about`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us — YouTubeFreeToolkit Mission & Architecture',
    description:
      'Learn who built YouTubeFreeToolkit, why our suite is 100% free, how our tools process data via the official YouTube Data API, and our strict privacy safeguards.',
  },
  robots: defaultRobots(),
};

export default function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About YouTubeFreeToolkit',
    description:
      'Comprehensive overview of YouTubeFreeToolkit, its developer background, data architecture, YouTube API usage, and security policies.',
    url: `${SITE_CONFIG.url}/about`,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      founder: {
        '@type': 'Person',
        name: 'Shahid Developer',
        url: `${SITE_CONFIG.url}/author/shahid`,
      },
    },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: 'About Us', url: `${SITE_CONFIG.url}/about` },
  ]);

  return (
    <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] pb-20 transition-colors">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header */}
      <section className="border-b border-[#e5e5e5] dark:border-[#272727] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-[#606060] dark:text-[#aaaaaa] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
              Home
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-[#0f0f0f] dark:text-[#f1f1f1] font-semibold">About</span>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3.5 py-1 text-xs font-bold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20 mb-4">
            <span>▶</span> Our Mission & Standards
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
            About YouTubeFreeToolkit
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-3xl">
            YouTubeFreeToolkit is an independent, 100% free suite of developer-built utilities designed to help YouTube
            creators optimize metadata, audit channel research, and understand monetization eligibility without paywalls,
            unauthorized scrapers, or downloader risks.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Who Built YouTubeFreeToolkit */}
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] flex items-center gap-2.5">
            <Code2 className="h-5 w-5 text-[#ff0000]" />
            Who Built YouTubeFreeToolkit?
          </h2>
          <p className="mt-3 text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
            The platform was founded and is actively maintained by{' '}
            <Link href="/author/shahid" className="text-[#ff0000] dark:text-red-400 font-semibold hover:underline">
              Shahid Developer
            </Link>
            , a full-stack developer specializing in YouTube platform integrations. After seeing countless creator tools
            hidden behind aggressive paywalls or built around dangerous video scrapers that jeopardize creator security,
            Shahid set out to engineer a transparent, policy-safe alternative.
          </p>
          <div className="mt-4 pt-4 border-t border-[#e5e5e5] dark:border-[#272727] flex items-center justify-between text-xs">
            <span className="text-[#909090]">Meet the developer:</span>
            <Link href="/author/shahid" className="font-bold text-[#ff0000] dark:text-red-400 hover:underline">
              View Shahid’s Profile & Credentials →
            </Link>
          </div>
        </div>

        {/* Why the Suite Exists */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            Why YouTubeFreeToolkit Exists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#151515] p-5 space-y-2">
              <h3 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                100% Free For Everyone
              </h3>
              <p className="text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
                Creators at every stage — from zero subscribers to millions — deserve access to metadata auditors and
                identifier lookups without monthly subscription fees.
              </p>
            </div>

            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#151515] p-5 space-y-2">
              <h3 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#3ea6ff]" />
                Zero Downloader Software
              </h3>
              <p className="text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
                We strictly adhere to YouTube Terms of Service. We do not provide video ripping, audio downloading, or
                private access bypasses.
              </p>
            </div>

            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#151515] p-5 space-y-2">
              <h3 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Transparent Indicators
              </h3>
              <p className="text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
                We clearly label what public APIs can and cannot see, never misleading creators with fake AdSense balance
                claims.
              </p>
            </div>
          </div>
        </div>

        {/* How Tools Obtain Data & Which APIs We Use */}
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] flex items-center gap-2.5">
            <Database className="h-5 w-5 text-[#3ea6ff]" />
            How Our Tools Obtain Data & Which APIs We Use
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
            <p>
              YouTubeFreeToolkit relies strictly on official developer endpoints provided by Google:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <strong className="text-[#0f0f0f] dark:text-[#f1f1f1]">YouTube Data API v3:</strong> Powers our public lookups (Channel ID Finder, Tag Extractor, Live Public Subscriber Counter, Channel Compare). We query official endpoints for publicly available channel metrics and video metadata.
              </li>
              <li>
                <strong className="text-[#0f0f0f] dark:text-[#f1f1f1]">YouTube Analytics API:</strong> Used exclusively in our optional channel-owner verification flow. If a creator chooses to verify their channel, we test whether YouTube Analytics exposes monetary reporting metrics for their own account.
              </li>
              <li>
                <strong className="text-[#0f0f0f] dark:text-[#f1f1f1]">Client-Side Heuristic Calculators:</strong> Tools like the Earnings Calculator, RPM Calculator, Timestamp Validator, and Shorts Safe Zone operate locally in your browser using mathematical models and design specifications.
              </li>
            </ul>
          </div>
        </div>

        {/* What We Store vs What We Never Store */}
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#151515] p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] flex items-center gap-2.5">
            <Lock className="h-5 w-5 text-emerald-600" />
            What We Store vs What We Never Store
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-2">
              <h3 className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                What We Store / Cache
              </h3>
              <ul className="space-y-1.5 text-[#606060] dark:text-[#aaaaaa] list-disc list-inside">
                <li>Temporary server-side cache of public YouTube Data API responses (1-hour window to conserve quota).</li>
                <li>Standard server access logs (IP address, user agent, request timestamp) for security and rate limiting.</li>
                <li>Anonymous website traffic metrics.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" />
                What We NEVER Store
              </h3>
              <ul className="space-y-1.5 text-[#606060] dark:text-[#aaaaaa] list-disc list-inside">
                <li>We do NOT store Google OAuth access tokens or refresh tokens in any database.</li>
                <li>We do NOT collect user passwords or Google account login credentials.</li>
                <li>We do NOT request or retain write permissions to your YouTube channel.</li>
                <li>We do NOT sell user data or share creator lists with third-party advertisers.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Editorial Policy & Factual Corrections */}
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1] flex items-center gap-2.5">
            <HelpCircle className="h-5 w-5 text-amber-500" />
            Editorial Policy & How Mistakes Are Corrected
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
            <p>
              The YouTube platform changes rapidly. New partner program rules, interface updates, and API deprecations
              occur regularly. Our editorial policy ensures ongoing accuracy:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                All numerical claims and policy statements are cross-referenced directly with official Google Help Center documentation.
              </li>
              <li>
                We conduct periodic quarterly reviews across our entire library of guides to update outdated year references and threshold requirements.
              </li>
              <li>
                If you spot a typo, an outdated policy reference, or a technical bug, you can report it directly via our{' '}
                <Link href="/contact" className="text-[#ff0000] dark:text-red-400 font-semibold hover:underline">
                  Contact Form
                </Link>
                . Validated corrections are published within 48 hours.
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Links */}
        <div className="border-t border-[#e5e5e5] dark:border-[#272727] pt-8 flex flex-wrap gap-4 text-xs font-semibold">
          <Link href="/tools" className="text-[#ff0000] dark:text-red-400 hover:underline">
            Explore All {TOOLS_REGISTRY.length} Tools →
          </Link>
          <Link href="/compliance" className="text-[#606060] dark:text-[#aaaaaa] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors">
            API Policy Compliance →
          </Link>
          <Link href="/privacy" className="text-[#606060] dark:text-[#aaaaaa] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors">
            Privacy Policy →
          </Link>
          <Link href="/terms" className="text-[#606060] dark:text-[#aaaaaa] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors">
            Terms of Service →
          </Link>
        </div>
      </section>
    </div>
  );
}
