import React from 'react';
import Link from 'next/link';
import { TOOLS_REGISTRY, SITE_CONFIG } from '@/lib/tools-registry';
import { ShieldCheck, Sparkles } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e5e5e5] dark:border-[#2a2e38] bg-chrome text-[#606060] dark:text-[#aaaaaa] transition-colors">
      {/* Top Banner Highlight */}
      <div className="border-b border-[#e5e5e5] dark:border-[#272727] bg-[#f2f2f2]/70 dark:bg-[#141414] py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#606060] dark:text-[#aaaaaa]">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Policy-aware tools built with YouTube API Services guidance.</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/tools/monetization-checker"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#ff0000]/10 px-3 py-1.5 text-xs font-semibold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/25 hover:bg-[#ff0000]/20 transition-all"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Monetization Checker
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-[#272727] border border-[#e5e5e5] dark:border-[#383838] px-3 py-1.5 text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#323232] transition-all"
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
              <div className="flex h-8 w-9 items-center justify-center rounded-xl bg-[#ff0000] text-white font-black text-xs">
                ▶
              </div>
              <span className="text-lg font-bold tracking-tight text-[#0f0f0f] dark:text-[#f1f1f1]">
                YouTube<span className="text-[#ff0000]">Free</span>Toolkit
              </span>
            </Link>
            <p className="mt-3 text-xs text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-xs">
              Free YouTube creator toolkit — monetization indicators, metadata, and channel research. No video downloads.
              Public tools need no account.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-[#606060] dark:text-[#aaaaaa]">
              <span className="rounded-full bg-white dark:bg-[#1f1f1f] px-2.5 py-0.5 border border-[#e5e5e5] dark:border-[#272727]">No Login</span>
              <span className="rounded-full bg-white dark:bg-[#1f1f1f] px-2.5 py-0.5 border border-[#e5e5e5] dark:border-[#272727]">100% Free</span>
              <span className="rounded-full bg-white dark:bg-[#1f1f1f] px-2.5 py-0.5 border border-[#e5e5e5] dark:border-[#272727]">Mobile Ready</span>
            </div>
          </div>

          {/* Column 1: Monetization & Revenue */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f0f0f] dark:text-[#f1f1f1]">Monetization</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link
                  href="/tools/monetization-checker"
                  className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors"
                >
                  Monetization Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/earnings-calculator"
                  className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors"
                >
                  Earnings Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/rpm-calculator" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                  RPM Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: SEO & Metadata */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f0f0f] dark:text-[#f1f1f1]">SEO & Metadata</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/tools/tag-extractor" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                  Tag Extractor
                </Link>
              </li>
              <li>
                <Link href="/tools/seo-score-checker" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                  SEO Score Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/title-description-analyzer"
                  className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors"
                >
                  Title Optimizer
                </Link>
              </li>
              <li>
                <Link href="/tools/hashtag-generator" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                  Hashtag Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Utilities & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0f0f0f] dark:text-[#f1f1f1]">Utilities & Legal</h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/tools/channel-id-finder" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                  Channel ID Finder
                </Link>
              </li>
              <li>
                <Link href="/tools/thumbnail-preview" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                  Thumbnail Preview
                </Link>
              </li>
              <li>
                <Link href="/tools/shorts-safe-zone" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                  Shorts Safe Zone
                </Link>
              </li>
              <li>
                <Link href="/tools/timestamp-validator" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                  Chapter Validator
                </Link>
              </li>
              <li className="pt-2 border-t border-[#e5e5e5] dark:border-[#272727]">
                <Link href="/guides" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                  Creator Guide Hubs
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#ff0000] dark:hover:text-red-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Policy Compliance
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & YouTube API notice */}
        <div className="mt-10 border-t border-[#e5e5e5] dark:border-[#272727] pt-6 text-[11px] text-[#909090] dark:text-[#717171] space-y-2">
          <p>
            Uses YouTube API Services. Not affiliated with YouTube, Google LLC, or Alphabet Inc. YouTube™ is a
            registered trademark of Google LLC. Use of this site is subject to the{' '}
            <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1]">YouTube Terms of Service</a>{' '}
            and{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1]">Google Privacy Policy</a>.
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
