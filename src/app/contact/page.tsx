import React from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us & Feedback | YouTubeFreeToolkit',
  description:
    'Get in touch with the YouTubeFreeToolkit team for creator tool suggestions, bug reports, privacy inquiries, and DMCA copyright notices.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  openGraph: {
    title: 'Contact Us & Feedback | YouTubeFreeToolkit',
    description:
      'Send tool suggestions, bug reports, and inquiries to the YouTubeFreeToolkit creator team.',
    url: `${SITE_CONFIG.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen text-[#0f0f0f] dark:text-[#f1f1f1] py-16 transition-colors">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3.5 py-1 text-xs font-bold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20">
            <span>▶</span> Get In Touch
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0f0f0f] dark:text-[#f1f1f1] tracking-tight">
            Contact & feedback
          </h1>
          <p className="text-base text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
            Send tool ideas, bug reports, privacy questions, or copyright notices. We read every message and route
            compliance issues to our dedicated team.
          </p>
          <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5 text-xs text-[#606060] dark:text-[#aaaaaa] leading-relaxed space-y-2 shadow-sm">
            <p className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Copyright (DMCA)</p>
            <p>
              If you believe material on this site infringes your copyright, include your contact information, a
              description of the work, the URL in question, and a statement of good faith. We do not host user-uploaded
              YouTube videos; most issues relate to written content or tool output descriptions.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
