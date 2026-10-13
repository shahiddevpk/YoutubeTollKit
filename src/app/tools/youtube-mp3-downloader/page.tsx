import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ExternalLink, Music, HelpCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { defaultRobots } from '@/lib/seo-site-config';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'YouTube to MP3 Converter — Free Download Any YouTube Video as MP3',
  description:
    'Convert and download any YouTube video to MP3 audio for free — 320kbps, 256kbps, 128kbps. No signup, no install. Works on PC, Mac, iPhone, and Android.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/tools/youtube-mp3-downloader`,
  },
  openGraph: {
    title: 'YouTube to MP3 Converter — Free 320kbps Download',
    description:
      'Convert any YouTube video to MP3 audio free. No signup or install. 320kbps, 256kbps, 128kbps.',
    url: `${SITE_CONFIG.url}/tools/youtube-mp3-downloader`,
  },
  robots: defaultRobots(),
};

const faqItems = [
  {
    question: 'How do I convert a YouTube video to MP3 for free?',
    answer:
      'Copy the YouTube video URL from your browser, paste it into a free online YouTube to MP3 converter like cobalt.tools, select the audio (MP3) option and desired bitrate (320kbps, 256kbps, 128kbps), then click download. No app install is required.',
  },
  {
    question: 'What is the best quality for YouTube to MP3 download?',
    answer:
      'YouTube audio maxes out at 128kbps (AAC) for standard videos and 256kbps for some music content. Requesting 320kbps MP3 technically re-encodes from the source audio, so 128–256kbps is the realistic quality ceiling for most YouTube videos.',
  },
  {
    question: 'Is YouTube to MP3 conversion free?',
    answer:
      'Online converters like cobalt.tools are completely free and require no signup. However, downloading copyrighted music or audio without the rights holder\'s permission may violate YouTube\'s Terms of Service and copyright law. Only convert content you own or that is licensed for download.',
  },
  {
    question: 'Can I convert YouTube Shorts to MP3?',
    answer:
      'Yes. YouTube Shorts are treated like regular videos by online converters. Paste the YouTube Shorts URL and select the audio option to extract the audio track as an MP3 file.',
  },
  {
    question: 'Does the YouTube to MP3 converter work on iPhone?',
    answer:
      'Yes. Web-based converters work in Safari, Chrome, or Firefox on iPhone and iPad. After conversion, the MP3 file saves to your Downloads folder or Files app automatically.',
  },
  {
    question: 'Can I download YouTube music as MP3?',
    answer:
      'You can download audio from any public YouTube video as an MP3 file using a free online converter. However, for YouTube Music content and licensed songs, downloading without authorization infringes the rights of artists and labels. Always check the license and only download content you have rights to.',
  },
];

export default function YoutubeMp3DownloaderPage() {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'YouTube to MP3 Converter',
    description:
      'Convert and download any YouTube video to MP3 audio for free — 320kbps, no signup.',
    url: `${SITE_CONFIG.url}/tools/youtube-mp3-downloader`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.url },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_CONFIG.url}/tools` },
        { '@type': 'ListItem', position: 3, name: 'YouTube to MP3 Downloader', item: `${SITE_CONFIG.url}/tools/youtube-mp3-downloader` },
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
          <span className="text-[#0f0f0f] dark:text-[#f1f1f1]">YouTube to MP3 Downloader</span>
        </nav>

        {/* Hero */}
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff0000]/10 px-3 py-1 text-xs font-semibold text-[#ff0000]">
            <Music className="h-3.5 w-3.5" />
            Free Online Converter
          </div>
          <h1 className="text-3xl font-black tracking-tight text-[#0f0f0f] dark:text-[#f1f1f1] sm:text-4xl">
            YouTube to MP3 Converter
          </h1>
          <p className="text-base text-[#606060] dark:text-[#aaaaaa] max-w-xl mx-auto">
            Convert any YouTube video to MP3 audio — 320kbps, 256kbps, or 128kbps — free,
            no signup, no software install. Works on PC, Mac, iPhone, and Android.
          </p>
        </div>

        {/* CTA card */}
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-8 text-center space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
              Step 1 — Copy your YouTube URL
            </p>
            <div className="rounded-lg border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#0f0f0f] px-4 py-3 text-sm font-mono text-[#606060] dark:text-[#aaaaaa] select-all">
              https://www.youtube.com/watch?v=...
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
              Step 2 — Convert to MP3 for free
            </p>
            <a
              href="https://cobalt.tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ff0000] px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#cc0000] active:scale-95 transition-all cursor-pointer"
            >
              <Music className="h-4 w-4" />
              Open Free YouTube to MP3 Converter
              <ExternalLink className="h-3.5 w-3.5 opacity-75" />
            </a>
            <p className="text-xs text-[#909090] dark:text-[#717171]">
              Opens cobalt.tools — a free, open-source converter. No ads, no signup.
            </p>
          </div>
        </div>

        {/* Legal notice */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-300">
            Only convert audio from videos you own or that are explicitly licensed for download.
            Downloading copyrighted music without authorization may violate YouTube&apos;s Terms of
            Service and applicable copyright law.
          </p>
        </div>

        {/* Supported bitrates */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            Supported Audio Formats & Bitrates
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              'MP3 320kbps',
              'MP3 256kbps',
              'MP3 128kbps',
              'OGG Vorbis',
              'M4A (AAC)',
              'OPUS',
            ].map((q) => (
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

        {/* How to convert */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            How to Convert YouTube Video to MP3 (Step-by-Step)
          </h2>
          <ol className="space-y-3">
            {[
              'Open the YouTube video you want to convert to MP3 in your browser.',
              'Copy the full video URL from the address bar.',
              'Click "Open Free YouTube to MP3 Converter" above to open cobalt.tools.',
              'Paste the YouTube URL into the input box on cobalt.tools.',
              'Select "Audio only" or "MP3" as the output format.',
              'Choose the bitrate (320kbps for best quality) and click Download.',
              'The MP3 file saves to your Downloads folder automatically.',
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
              { label: 'YouTube Video Downloader (HD/4K)', href: '/tools/youtube-video-downloader' },
              { label: 'YouTube Thumbnail Downloader', href: '/tools/thumbnail-downloader' },
              { label: 'YouTube Tag Extractor', href: '/tools/tag-extractor' },
              { label: 'YouTube Earnings Calculator', href: '/tools/earnings-calculator' },
              { label: 'YouTube Monetization Checker', href: '/tools/monetization-checker' },
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
