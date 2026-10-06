import React from 'react';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { ShieldCheck, CheckCircle2, Lock, FileCheck, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Google AdSense & YouTube API Policy Compliance | YouTubeFreeToolkit',
  description:
    'Our commitment to Google Search Essentials, AdSense Publisher Policies, YouTube Terms of Service, and ethical creator tooling standards.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/compliance`,
  },
};

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 py-16 text-slate-700 dark:text-slate-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            Compliance & Transparency
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
            Policy & Quality Standards
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            YouTubeFreeToolkit is designed with Google Search Essentials, Google Publisher Policies, and YouTube API Services Developer Policies in mind. Because policies and implementations can change, this page describes our current safeguards rather than guaranteeing approval or compliance outcomes.
          </p>
        </div>

        {/* 4 Core Pillars of Compliance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <CheckCircle2 className="h-5 w-5" />
              <span>Zero Piracy & Stream-Ripping</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We strictly prohibit video downloaders, MP3 converters, private video bypasses, or stream-ripping utilities. All tools operate exclusively on public metadata and official YouTube API Services.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <FileCheck className="h-5 w-5" />
              <span>Helpful, Original Content (No Spam)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every tool and guide page includes original educational copy, detailed FAQs, step-by-step instructions, and realistic calculation parameters. URL changes are handled with permanent redirects; missing pages log to server logs for review.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <Lock className="h-5 w-5" />
              <span>User Privacy & Minimal Data</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Public tools do not require Google login. Optional channel-owner monetization verification uses Google OAuth only after explicit user action, requests read-only YouTube scopes, uses the access token transiently for the verification request, and relies on short-lived HTTP-only cookies rather than persistent token storage in the application database.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <ShieldCheck className="h-5 w-5" />
              <span>Accurate Disclaimers & E-E-A-T</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              The monetization checker never estimates another channel’s private monetization status. Public checks report YouTube Data API eligibility signals; exact status verification is limited to an owner-authorized channel and uses official YouTube Analytics monetary access. Revenue calculators remain separate, user-controlled planning scenarios.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/50 p-6 space-y-3 text-sm text-slate-400 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">AdSense & site experience</h2>
          <p>
            If we display Google ads in the future, placement will follow the{' '}
            <a
              href="https://support.google.com/adsense/answer/48182"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-400 underline"
            >
              AdSense Program policies
            </a>
            : clear navigation, no deceptive buttons near ads, no pages created only to show ads, and no formatting
            that confuses content with advertisements.
          </p>
          <p>
            Tool pages pair interactive utilities with written guides, limitations, and FAQs so visitors understand
            what each feature does before acting on results. We do not use pop-ups, forced downloads, or misleading
            claims about streaming or ripping content.
          </p>
        </div>

        {/* Official Policy Links */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/60 p-8 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Official External Guidelines We Abide By:</h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            <li>
              <a
                href="https://developers.google.com/search/docs/essentials"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 underline flex items-center gap-1.5"
              >
                Google Search Essentials (Search Quality Guidelines) <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
            <li>
              <a
                href="https://support.google.com/adsense/answer/48182"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 underline flex items-center gap-1.5"
              >
                Google AdSense Program & Publisher Policies <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
            <li>
              <a
                href="https://developers.google.com/youtube/terms/developer-policies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 underline flex items-center gap-1.5"
              >
                YouTube API Services Developer Policies <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
            <li>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 underline flex items-center gap-1.5"
              >
                Google Privacy Policy <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
