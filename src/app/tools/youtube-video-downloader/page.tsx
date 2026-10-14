import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { noindexFollowRobots } from '@/lib/seo-site-config';
import { DownloadOptionsGuide } from '@/components/tools/DownloadOptionsGuide';

export const revalidate = 86400;

const PATH = '/tools/youtube-video-downloader';

export const metadata: Metadata = {
  title: 'How to Download YouTube Videos Legally (2026 Options)',
  description: 'The legitimate ways to save YouTube videos: YouTube Studio for your own uploads, YouTube Premium offline downloads, and Creative Commons footage. No shady converters.',
  alternates: { canonical: `${SITE_CONFIG.url}${PATH}` },
  openGraph: { title: 'How to Download YouTube Videos Legally (2026 Options)', description: 'The legitimate ways to save YouTube videos: YouTube Studio for your own uploads, YouTube Premium offline downloads, and Creative Commons footage. No shady converters.', url: `${SITE_CONFIG.url}${PATH}` },
  // Informational page about legitimate options — kept out of the index on purpose.
  robots: noindexFollowRobots(),
};

const faqItems = [
  {
    "q": "Is it legal to download YouTube videos?",
    "a": "Downloading is allowed when YouTube provides the feature (Premium offline, Studio download for your own videos) or when the copyright owner gives permission or a licence such as Creative Commons. Ripping other people’s videos with third-party sites breaks YouTube’s Terms of Service and may infringe copyright."
  },
  {
    "q": "What is the highest quality I can download?",
    "a": "YouTube Premium offers up to 1080p offline downloads in the app. YouTube Studio downloads of your own uploads are usually 720p MP4; keep your original export for full quality."
  },
  {
    "q": "Can I download a YouTube video’s thumbnail or tags instead?",
    "a": "Yes. Thumbnails and tags are public metadata. Use our Thumbnail Downloader and Tag Extractor to save them for research and reference."
  }
];

const sections = [
  {
    "h": "Why we do not offer a “YouTube video downloader”",
    "p": [
      "YouTube’s Terms of Service only allow downloads where YouTube shows a download button (Premium, Studio) or where the copyright owner gives permission. Third-party rippers break those terms, are frequently blocked, and are a common source of malware, pop-under ads and fake “update” prompts.",
      "Instead, this page explains the official routes. They are free or included in a subscription you may already have, and they give you clean files without risk to your device or your channel."
    ]
  },
  {
    "h": "Downloading your own uploads",
    "p": [
      "Creators can download any video they uploaded from YouTube Studio → Content → ⋮ → Download. If you need every upload (for example when migrating or backing up a channel), Google Takeout exports all videos plus metadata in one archive.",
      "If you lost the original high-quality file, check your editing software’s export folder or cloud backup first — the Studio download is re-encoded and usually capped at 720p."
    ]
  },
  {
    "h": "Watching offline on phone or tablet",
    "p": [
      "YouTube Premium adds a Download button to every eligible video in the mobile app, with quality options up to 1080p. Downloads remain available offline as long as the device reconnects at least once every 30 days."
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
          <span className="font-medium text-[#0f0f0f] dark:text-[#f1f1f1]">Download YouTube Videos</span>
        </nav>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">How to Download YouTube Videos (Legitimate Options)</h1>
        <p className="mt-2 text-sm sm:text-base text-[#606060] dark:text-[#aaaaaa]">We do not host a video ripper or send you to one. Pick your situation below and we will show the official, safe way to get the video file or watch it offline.</p>
      </div>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6" aria-labelledby="chooser-heading">
        <h2 id="chooser-heading" className="sr-only">Find the right option</h2>
        <div className="elevated-card rounded-2xl p-5 sm:p-7">
          <DownloadOptionsGuide mode="video" />
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
            <li><Link href="/tools/thumbnail-downloader" className="text-[#cc0000] dark:text-red-400 hover:underline font-medium">YouTube Thumbnail Downloader</Link></li>
            <li><Link href="/tools/video-data-viewer" className="text-[#cc0000] dark:text-red-400 hover:underline font-medium">YouTube Video Data Viewer</Link></li>
            <li><Link href="/tools/tag-extractor" className="text-[#cc0000] dark:text-red-400 hover:underline font-medium">YouTube Tag Extractor</Link></li>
          </ul>
        </section>
      </div>
    </article>
  );
}
