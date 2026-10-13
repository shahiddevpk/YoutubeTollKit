import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ExternalLink, Download, HelpCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { defaultRobots } from '@/lib/seo-site-config';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'YouTube Video Downloader — Free HD, 4K & 1080p Download (No Install)',
  description:
    'Download YouTube videos free in HD, 1080p, 4K and MP4 format directly from any YouTube link. No software install required. Works on PC, Mac, and mobile.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/tools/youtube-video-downloader`,
  },
  openGraph: {
    title: 'YouTube Video Downloader — Free HD, 4K & 1080p Download',
    description:
      'Download YouTube videos in HD, 1080p, 4K and MP4 format directly from any link. Free, no install.',
    url: `${SITE_CONFIG.url}/tools/youtube-video-downloader`,
  },
  robots: defaultRobots(),
};

const faqItems = [
  {
    question: 'How do I download a YouTube video for free?',
    answer:
      'Copy the YouTube video URL from your browser, paste it into a free online downloader like cobalt.tools, choose your quality (1080p, 4K, 720p, etc.), and click download. No software or app install is needed.',
  },
  {
    question: 'Can I download YouTube videos in 4K or 1080p?',
    answer:
      'Yes. Free online YouTube video downloaders support up to 4K (2160p), 1440p, 1080p, 720p, and 360p depending on the quality available in the original video.',
  },
  {
    question: 'Is downloading a YouTube video free?',
    answer:
      'Using a free online downloader like cobalt.tools is completely free with no signup required. However, please be aware that downloading copyrighted content without the creator\'s permission may violate YouTube\'s Terms of Service. Only download videos you own or that are licensed for download.',
  },
  {
    question: 'What video format will the downloaded file be in?',
    answer:
      'Most YouTube video downloaders export videos in MP4 format, which is compatible with all devices including PC, Mac, iPhone, and Android. Some tools also offer WebM or MKV for 4K.',
  },
  {
    question: 'Can I download YouTube videos on mobile?',
    answer:
      'Yes. Web-based downloaders like cobalt.tools work on mobile browsers (Chrome, Safari, Firefox) on both Android and iPhone without any app installation.',
  },
  {
    question: 'Why can\'t I directly download YouTube videos?',
    answer:
      'YouTube\'s official apps do not allow downloading to local storage (only offline caching within the app for YouTube Premium subscribers). Third-party tools extract the video stream from YouTube\'s public CDN and let you save it as a file.',
  },
];

export default function YoutubeVideoDownloaderPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'YouTube Video Downloader',
    description:
      'Download YouTube videos free in HD, 1080p, 4K and MP4 format. No install required.',
    url: `${SITE_CONFIG.url}/tools/youtube-video-downloader`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.url },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_CONFIG.url}/tools` },
        { '@type': 'ListItem', position: 3, name: 'YouTube Video Downloader', item: `${SITE_CONFIG.url}/tools/youtube-video-downloader` },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-[#606060] dark:text-[#aaaaaa]">
          <Link href="/" className="hover:text-[#ff0000]">Home</Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-[#ff0000]">Tools</Link>
          <span>/</span>
          <span className="text-[#0f0f0f] dark:text-[#f1f1f1]">YouTube Video Downloader</span>
        </nav>

        {/* Hero */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3 py-1 text-xs font-semibold text-[#ff0000]">
            <Download className="h-3.5 w-3.5" />
            Free Online Tool
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[#0f0f0f] dark:text-[#f1f1f1] sm:text-4xl">
            YouTube Video Downloader
          </h1>
          <p className="text-base text-[#606060] dark:text-[#aaaaaa] max-w-xl mx-auto">
            Download any YouTube video in HD, 1080p, 4K or MP4 — free, no software install,
            works on any device. Paste your YouTube link below to get started.
          </p>
        </div>

        {/* CTA card */}
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-8 space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
              Step 1 — Copy your YouTube video URL
            </p>
            <div className="rounded-lg border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#0f0f0f] px-4 py-3 text-sm font-mono text-[#606060] dark:text-[#aaaaaa] select-all">
              https://www.youtube.com/watch?v=...
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
              Step 2 — Open a free downloader below
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { name: 'cobalt.tools', desc: 'Open-source · No ads', href: 'https://cobalt.tools' },
                { name: 'yt1s.com', desc: 'HD · 1080p · 4K', href: 'https://yt1s.com' },
                { name: 'loader.to', desc: 'MP4 · WebM · AVI', href: 'https://loader.to' },
              ].map(({ name, desc, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-1 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#0f0f0f] px-4 py-3.5 hover:border-[#ff0000]/50 hover:shadow-sm transition-all"
                >
                  <span className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{name}</span>
                  <span className="text-[11px] text-[#909090] dark:text-[#717171]">{desc}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#ff0000]">
                    Open free <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              ))}
            </div>
            <p className="text-xs text-[#909090] dark:text-[#717171] text-center pt-1">
              All three are free, browser-based, no signup. Paste your URL and select quality.
            </p>
          </div>
        </div>

        {/* Legal notice */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-300">
            Only download videos you own or that are licensed for download. Downloading copyrighted
            content without permission may violate YouTube&apos;s Terms of Service and applicable
            copyright law.
          </p>
        </div>

        {/* Supported formats & qualities */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            Supported Download Qualities
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {['4K (2160p)', '1440p (2K)', '1080p Full HD', '720p HD', '480p SD', '360p'].map((q) => (
              <div
                key={q}
                className="flex items-center gap-2 rounded-lg border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-3 py-2.5 text-sm font-medium text-[#0f0f0f] dark:text-[#f1f1f1]"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                {q}
              </div>
            ))}
          </div>
        </div>

        {/* How to download */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            How to Download a YouTube Video (Step-by-Step)
          </h2>
          <ol className="space-y-3">
            {[
              'Open the YouTube video you want to download in your browser.',
              'Copy the full video URL from the address bar (e.g. https://www.youtube.com/watch?v=xxxxx).',
              'Click the "Open Free YouTube Downloader" button above to open cobalt.tools.',
              'Paste the YouTube URL into the input box on cobalt.tools.',
              'Select your preferred video quality (1080p, 4K, 720p, etc.) and format (MP4).',
              'Click Download and save the file to your device.',
            ].map((step, i) => (
              <li
                key={i}
                className="flex gap-3 text-sm text-[#606060] dark:text-[#aaaaaa]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ff0000]/10 text-xs font-bold text-[#ff0000]">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* More tools */}
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-6 space-y-4">
          <h2 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            More Free YouTube Creator Tools
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {[
              { label: 'YouTube Thumbnail Downloader', href: '/tools/thumbnail-downloader' },
              { label: 'Channel Logo & Banner Downloader', href: '/tools/logo-banner-downloader' },
              { label: 'YouTube Monetization Checker', href: '/tools/monetization-checker' },
              { label: 'YouTube Tag Extractor', href: '/tools/tag-extractor' },
              { label: 'YouTube to MP3 Downloader', href: '/tools/youtube-mp3-downloader' },
              { label: 'YouTube Video Data Viewer', href: '/tools/video-data-viewer' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 rounded-lg border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-3 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000]/50 hover:text-[#ff0000] transition-colors"
              >
                <span className="text-[#ff0000]">→</span>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            <HelpCircle className="h-5 w-5 text-[#ff0000]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map(({ question, answer }) => (
              <div
                key={question}
                className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5 space-y-2"
              >
                <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{question}</h3>
                <p className="text-sm text-[#606060] dark:text-[#aaaaaa]">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
