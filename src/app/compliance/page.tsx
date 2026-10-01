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
    <div className="min-h-screen bg-slate-950 py-16 text-slate-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="h-3.5 w-3.5" />
            Compliance & Transparency
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Policy & Quality Standards
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            YouTubeFreeToolkit is engineered strictly according to Google Search Essentials, Google AdSense Publisher Policies, and YouTube API Services Developer Policies.
          </p>
        </div>

        {/* 4 Core Pillars of Compliance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <CheckCircle2 className="h-5 w-5" />
              <span>Zero Piracy & Stream-Ripping</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We strictly prohibit video downloaders, MP3 converters, private video bypasses, or stream-ripping utilities. All tools operate exclusively on public metadata and official YouTube API Services.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <FileCheck className="h-5 w-5" />
              <span>Helpful, Original Content (No Spam)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every tool and guide page contains original, human-reviewed educational documentation, detailed FAQs, step-by-step instructions, and realistic calculation parameters.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <Lock className="h-5 w-5" />
              <span>User Privacy & Zero PII Storage</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We do not collect personal identifying information (PII), require logins, or store Google credentials. Queries are processed client-side or securely via server-side cached API requests.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
              <ShieldCheck className="h-5 w-5" />
              <span>Accurate Disclaimers & E-E-A-T</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              All monetization checks and RPM estimates are clearly labeled as public heuristic indicators and industry benchmarks, not guaranteed financial returns or official YouTube legal declarations.
            </p>
          </div>
        </div>

        {/* Official Policy Links */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">Official External Guidelines We Abide By:</h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
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
