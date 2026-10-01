import React from 'react';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/tools-registry';

export const metadata: Metadata = {
  title: 'Privacy Policy | YouTubeFreeToolkit',
  description:
    'Privacy information for YouTubeFreeToolkit, including public YouTube API usage, optional Google OAuth verification, short-lived cookies, server logs, and third-party services.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-16 text-slate-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
          <p className="mt-2 text-xs text-slate-500 font-mono">Last updated: October 1, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Overview and Commitment</h2>
            <p>
              At <strong>{SITE_CONFIG.name}</strong> (accessible from{' '}
              <a href={SITE_CONFIG.url} className="text-red-400 underline">
                {SITE_CONFIG.domain}
              </a>
              ), we prioritize the privacy of our visitors. This Privacy Policy details the types of
              information collected and recorded by {SITE_CONFIG.name} and how we use it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. YouTube API Services & Google Privacy</h2>
            <p>
              {SITE_CONFIG.name} uses YouTube API Services to display public channel and video metrics. For the optional channel-owner monetization verification, we also use Google OAuth and the YouTube Analytics API after you explicitly choose to connect your account. By using our tools, you agree to be bound by the{' '}
              <a
                href="https://www.youtube.com/t/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 underline"
              >
                YouTube Terms of Service
              </a>{' '}
              and acknowledge the{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 underline"
              >
                Google Privacy Policy
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Optional Google/YouTube Owner Verification</h2>
            <p>
              Public channel checks do <strong>not</strong> require a Google login. If you choose{' '}
              <strong>Verify Exact Monetization Status</strong> for a channel you own, Google handles the sign-in and
              consent screen. We request only read-only YouTube account access and read-only YouTube monetary analytics
              access so we can confirm the connected channel and test official monetary-report access.
            </p>
            <p>
              We never receive your Google password. The OAuth access token is used transiently on the server to complete that verification request and is not intentionally written to our application database or browser storage. Short-lived, HTTP-only cookies are used to protect the OAuth session and return the verification result; they expire automatically.
            </p>
            <p>
              You can review or revoke previously granted Google account access from your Google Account permissions page. Revoking access does not affect the public tools.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Public Tool Inputs</h2>
            <p>
              Public YouTube channel/video URLs, handles, channel IDs, or video IDs submitted to a tool may be processed by our server and sent to the applicable YouTube API endpoint to complete the requested lookup. We do not use those public identifiers to infer private monetization data for third-party channels.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Cookies, Hosting Logs, and Web Analytics</h2>
            <p>
              Our hosting and security infrastructure may process standard technical request data such as IP address, user agent, requested URL, timestamps, and diagnostic information. If analytics, advertising, or consent-managed cookies are enabled in production, this policy should be updated to name those providers, purposes, cookie categories, and applicable user choices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">6. Contact Information</h2>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to
              contact us via our contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
