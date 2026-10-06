import React from 'react';
import Link from 'next/link';
import { TOOLS_REGISTRY, SITE_CONFIG } from '@/lib/tools-registry';
import { ShieldCheck, Sparkles } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 text-slate-400">
      {/* Top Banner Highlight */}
      <div className="border-b border-slate-200 dark:border-slate-800/60 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/30 py-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Policy-aware tools built with YouTube API Services guidance.</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/tools/monetization-checker"
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600/15 px-3 py-1.5 text-xs font-semibold text-red-400 border border-red-500/30 hover:bg-red-600/25 transition-all"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Monetization Checker
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-700 transition-all"
              >
                All Tools ({TOOLS_REGISTRY.length})
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand & Mission Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white font-black text-sm">
                ▶
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                YouTube<span className="text-red-500">Free</span>Toolkit
              </span>
            </Link>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed max-w-xs">
              Free YouTube creator toolkit — monetization indicators, metadata, and channel research. No video downloads.
              Public tools need no account.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              <span className="rounded bg-slate-100 dark:bg-slate-900 px-2 py-0.5 border border-slate-200 dark:border-slate-800">No Login</span>
              <span className="rounded bg-slate-100 dark:bg-slate-900 px-2 py-0.5 border border-slate-200 dark:border-slate-800">100% Free</span>
              <span className="rounded bg-slate-100 dark:bg-slate-900 px-2 py-0.5 border border-slate-200 dark:border-slate-800">Mobile Ready</span>
            </div>
          </div>

          {/* Column 1: Monetization & Revenue */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Monetization</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link
                  href="/tools/monetization-checker"
                  className="hover:text-red-400 transition-colors"
                >
                  Monetization Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/earnings-calculator"
                  className="hover:text-red-400 transition-colors"
                >
                  Earnings Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/rpm-calculator" className="hover:text-red-400 transition-colors">
                  RPM Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: SEO & Metadata */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">SEO & Metadata</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/tools/tag-extractor" className="hover:text-red-400 transition-colors">
                  Tag Extractor
                </Link>
              </li>
              <li>
                <Link href="/tools/seo-score-checker" className="hover:text-red-400 transition-colors">
                  SEO Score Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/title-description-analyzer"
                  className="hover:text-red-400 transition-colors"
                >
                  Title Optimizer
                </Link>
              </li>
              <li>
                <Link href="/tools/hashtag-generator" className="hover:text-red-400 transition-colors">
                  Hashtag Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Creator Utilities & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">Utilities & Legal</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/tools/channel-id-finder" className="hover:text-red-400 transition-colors">
                  Channel ID Finder
                </Link>
              </li>
              <li>
                <Link href="/tools/thumbnail-preview" className="hover:text-red-400 transition-colors">
                  Thumbnail Preview
                </Link>
              </li>
              <li>
                <Link href="/tools/shorts-safe-zone" className="hover:text-red-400 transition-colors">
                  Shorts Safe Zone
                </Link>
              </li>
              <li>
                <Link href="/tools/timestamp-validator" className="hover:text-red-400 transition-colors">
                  Chapter Validator
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <Link href="/guides" className="hover:text-red-400 transition-colors">
                  Creator Guide Hubs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-red-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-emerald-400 transition-colors">
                  Policy Compliance
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-800 dark:text-slate-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-800 dark:text-slate-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & YouTube API notice */}
        <div className="mt-10 border-t border-slate-900 pt-6 text-[11px] text-slate-500 space-y-2">
          <p>
            Uses YouTube API Services. Not affiliated with YouTube, Google LLC, or Alphabet Inc. YouTube™ is a
            registered trademark of Google LLC. Use of this site is subject to the{' '}
            <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700 dark:text-slate-300">YouTube Terms of Service</a>{' '}
            and{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700 dark:text-slate-300">Google Privacy Policy</a>.
          </p>
          <p>
            We do not offer video or audio downloaders. Tools read public metadata and provide calculators with clear
            limitations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2">
            <span>© {currentYear} {SITE_CONFIG.domain}. All rights reserved.</span>
            <span>Free tools for creators worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
