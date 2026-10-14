import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { noindexFollowRobots } from '@/lib/seo-site-config';
import { DownloadOptionsGuide } from '@/components/tools/DownloadOptionsGuide';

export const revalidate = 86400;

const PATH = '/tools/youtube-mp3-downloader';

export const metadata: Metadata = {
  title: 'YouTube to MP3: Legal Ways to Get YouTube Audio (2026)',
  description: 'Legitimate ways to get audio from YouTube: export your own uploads, listen offline with YouTube Music Premium, or download royalty-free MP3s from the YouTube Audio Library.',
  alternates: { canonical: `${SITE_CONFIG.url}${PATH}` },
  openGraph: { title: 'YouTube to MP3: Legal Ways to Get YouTube Audio (2026)', description: 'Legitimate ways to get audio from YouTube: export your own uploads, listen offline with YouTube Music Premium, or download royalty-free MP3s from the YouTube Audio Library.', url: `${SITE_CONFIG.url}${PATH}` },
  // Informational page about legitimate options — kept out of the index on purpose.
  robots: noindexFollowRobots(),
};

const faqItems = [
  {
    "q": "Is converting YouTube to MP3 legal?",
    "a": "Converting copyrighted music or videos you do not own is not permitted by YouTube’s Terms and may infringe copyright. Converting your own uploads, or downloading tracks from the YouTube Audio Library, is fine."
  },
  {
    "q": "How do I listen to YouTube music offline?",
    "a": "YouTube Music Premium (included in YouTube Premium) lets you download songs, albums and playlists for offline listening in the app."
  },
  {
    "q": "Where can I download free music for my YouTube videos?",
    "a": "Use the YouTube Audio Library in YouTube Studio. Every track there is cleared for use in YouTube videos; some require a credit line in your description."
  }
];

const sections = [
  {
    "h": "The free, legal MP3 source most creators miss",
    "p": [
      "The YouTube Audio Library inside YouTube Studio offers thousands of royalty-free tracks and sound effects you can download as MP3 and use in your videos — including monetized ones. Filter by genre, mood, duration and attribution requirement.",
      "Tracks that require attribution show the exact credit line to paste into your description."
    ]
  },
  {
    "h": "Getting audio from your own videos",
    "p": [
      "Download your upload from YouTube Studio or Google Takeout, then export the audio track as MP3 with a free tool such as Audacity or VLC. For best quality, export directly from your original editing project instead of converting the YouTube copy."
    ]
  },
  {
    "h": "Why “YouTube to MP3” converter sites are risky",
    "p": [
      "Converter sites violate YouTube’s Terms, often re-encode audio at low quality, and rely on aggressive ads, redirects and fake download buttons. Many have been shut down after legal action by record labels."
    ]
  }
];

export default function Page() {
  return (
    <article className="min-h-screen pb-16 text-[#0f0f0f] dark:text-[#f1f1f1]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-2">
        <nav className="text-xs text-[#606060] dark:text-[#aaaaaa] mb-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#ff0000]">Home</Link>
          <span className="mx-1.5">/</span>
          <Link href="/tools" className="hover:text-[#ff0000]">Tools</Link>
          <span className="mx-1.5">/</span>
          <span className="font-medium text-[#0f0f0f] dark:text-[#f1f1f1]">YouTube Audio Options</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">YouTube to MP3: The Legal Ways to Get Audio</h1>
        <p className="mt-2 text-sm sm:text-base text-[#606060] dark:text-[#aaaaaa]">We do not convert other people’s videos to MP3. Choose your situation and we will show the safe, official option — including free royalty-free MP3s from YouTube itself.</p>
      </div>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6" aria-labelledby="chooser-heading">
        <h2 id="chooser-heading" className="sr-only">Find the right option</h2>
        <div className="elevated-card rounded-2xl p-5 sm:p-7">
          <DownloadOptionsGuide mode="audio" />
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10 text-sm">
        {sections.map((s) => (
          <section key={s.h} className="space-y-2">
            <h2 className="text-lg font-bold">{s.h}</h2>
            {s.p.map((para) => (
              <p key={para} className="text-[#606060] dark:text-[#aaaaaa] leading-relaxed">{para}</p>
            ))}
          </section>
        ))}

        <section className="border-t border-[#e5e5e5] dark:border-[#272727] pt-8" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-lg font-bold mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqItems.map((f) => (
              <details key={f.q} className="rounded-xl border border-theme bg-card px-4 py-3.5">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2.5 text-[#606060] dark:text-[#aaaaaa] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="border-t border-[#e5e5e5] dark:border-[#272727] pt-8">
          <h2 className="text-lg font-bold mb-3">Free tools that work with public YouTube data</h2>
          <ul className="space-y-2">
            <li><Link href="/tools/upload-checklist" className="text-[#cc0000] dark:text-red-400 hover:underline font-medium">YouTube Upload Checklist</Link></li>
            <li><Link href="/tools/description-generator" className="text-[#cc0000] dark:text-red-400 hover:underline font-medium">YouTube Description Generator</Link></li>
            <li><Link href="/tools/video-data-viewer" className="text-[#cc0000] dark:text-red-400 hover:underline font-medium">YouTube Video Data Viewer</Link></li>
          </ul>
        </section>
      </div>
    </article>
  );
}
