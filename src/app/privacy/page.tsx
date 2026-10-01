import React from 'react';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/tools-registry';

export const metadata: Metadata = {
  title: 'Privacy Policy | YouTubeFreeToolkit',
  description:
    'Our privacy policy explains how YouTubeFreeToolkit respects user privacy, with zero personal data storage and compliance with Google Privacy Policy.',
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
              {SITE_CONFIG.name} uses public YouTube API Services and public metadata endpoints to display public channel
              and video metrics. By using our tools, you agree to be bound by the{' '}
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
            <h2 className="text-lg font-bold text-white">3. Zero Personal Data Storage</h2>
            <p>
              We do <strong>not</strong> require user registration, logins, or payment details. We do not store or collect
              personal information (PII), YouTube login credentials, or private account tokens.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Cookies and Web Analytics</h2>
            <p>
              Like most modern websites, we use standard server logs and privacy-friendly web analytics to understand general
              traffic trends, browser types, and popular pages to improve site performance. These logs do not contain
              personally identifiable information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Contact Information</h2>
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
