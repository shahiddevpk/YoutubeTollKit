import React from 'react';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/tools-registry';

export const metadata: Metadata = {
  title: 'Terms of Service | YouTubeFreeToolkit',
  description:
    'Terms of service and acceptable use guidelines for using YouTubeFreeToolkit creator utilities.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] py-14 transition-colors">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3.5 py-1 text-xs font-bold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20 mb-3">
            <span>▶</span> Legal Terms
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1]">Terms of Service</h1>
          <p className="mt-2 text-xs text-[#909090] dark:text-[#717171] font-mono">Last updated: October 1, 2026</p>
        </div>

        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 sm:p-8 space-y-6 text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed shadow-sm">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">1. Agreement to Terms</h2>
            <p>
              By accessing or using {SITE_CONFIG.name} ({SITE_CONFIG.domain}), you agree to be bound by these Terms of
              Service. If you disagree with any part of the terms, you may not access our services.
            </p>
          </section>

          <section className="space-y-2 border-t border-[#e5e5e5] dark:border-[#272727] pt-5">
            <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">2. Permitted Use & Acceptable Behavior</h2>
            <p>
              Our tools are provided exclusively for educational, informational, and channel optimization purposes. You agree
              not to misuse our tools, perform automated denial-of-service attempts, or attempt unauthorized reverse
              engineering of proprietary algorithms.
            </p>
          </section>

          <section className="space-y-2 border-t border-[#e5e5e5] dark:border-[#272727] pt-5">
            <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">3. Optional Channel-Owner Verification</h2>
            <p>
              The owner verification feature is only for users authorized to access the connected YouTube channel. By starting verification, you authorize the service to use the read-only YouTube permissions shown on Google’s consent screen solely to identify the connected channel and test YouTube Analytics monetary-report access. Do not attempt to authenticate as or access a channel you do not own or manage.
            </p>
          </section>

          <section className="space-y-2 border-t border-[#e5e5e5] dark:border-[#272727] pt-5">
            <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">4. Third-Party Trademarks & Disclaimer</h2>
            <p>
              YouTube™ is a trademark of Google LLC. {SITE_CONFIG.name} is an independent utility and is not affiliated,
              associated, authorized, endorsed by, or in any way officially connected with YouTube, Google LLC, or any of
              their subsidiaries or affiliates.
            </p>
          </section>

          <section className="space-y-2 border-t border-[#e5e5e5] dark:border-[#272727] pt-5">
            <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">5. No Warranties</h2>
            <p>
              All tools, analytics, estimates (including RPM and earnings projections), and data are provided &quot;as is&quot;
              without warranty of any kind. Actual YouTube earnings and algorithm behaviors may vary.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
