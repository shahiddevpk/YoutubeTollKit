'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Mode = 'video' | 'audio';
type Situation = 'own' | 'premium' | 'licensed' | 'other';

interface Option {
  id: Situation;
  label: string;
}

const OPTIONS: Option[] = [
  { id: 'own', label: 'It is my own upload' },
  { id: 'premium', label: 'I want to watch/listen offline' },
  { id: 'licensed', label: 'I need royalty-free or licensed media' },
  { id: 'other', label: "It is someone else's video" },
];

const ANSWERS: Record<Mode, Record<Situation, { title: string; steps: string[]; link?: { href: string; label: string } }>> = {
  video: {
    own: {
      title: 'Download your own video from YouTube Studio',
      steps: [
        'Open studio.youtube.com and sign in to the channel that uploaded the video.',
        'Go to Content, hover the video, open the ⋮ (Options) menu and choose Download.',
        'YouTube saves an MP4 copy (usually up to 720p). For every upload at once, use Google Takeout → YouTube and YouTube Music → Videos.',
      ],
      link: { href: 'https://studio.youtube.com', label: 'Open YouTube Studio' },
    },
    premium: {
      title: 'Save videos offline with YouTube Premium',
      steps: [
        'Subscribe to YouTube Premium (a free trial is often available).',
        'In the YouTube app, tap Download under the video and pick a quality up to 1080p.',
        'Downloads stay available offline in Library → Downloads as long as you reconnect at least once every 30 days.',
      ],
      link: { href: 'https://www.youtube.com/premium', label: 'See YouTube Premium' },
    },
    licensed: {
      title: 'Use Creative Commons or licensed footage',
      steps: [
        'On YouTube search, use Filters → Features → Creative Commons to find reusable videos.',
        'In YouTube Studio, the Create → Video editor lets you remix Creative Commons videos without downloading them.',
        'For stock footage, use a stock library that grants a download licence and keep the licence for your records.',
      ],
    },
    other: {
      title: "Ask the creator — don't rip it",
      steps: [
        "YouTube's Terms of Service do not allow downloading other people's videos unless YouTube shows a download button or the owner gives permission.",
        'Message the creator (About tab → business email) and ask for the original file or a licence.',
        'If you only need research data, our Video Data Viewer, Thumbnail Downloader and Tag Extractor give you the public metadata legally.',
      ],
    },
  },
  audio: {
    own: {
      title: 'Get the audio from your own upload',
      steps: [
        'Download the MP4 from YouTube Studio (Content → ⋮ → Download), or export every upload with Google Takeout.',
        'Open the MP4 in a free editor such as Audacity or VLC (Media → Convert/Save) and export it as MP3.',
        'Keep your original project files — re-exporting from the source gives far better audio than converting a YouTube file.',
      ],
      link: { href: 'https://studio.youtube.com', label: 'Open YouTube Studio' },
    },
    premium: {
      title: 'Listen offline with YouTube Music Premium',
      steps: [
        'YouTube Premium and YouTube Music Premium include offline downloads and background play.',
        'In YouTube Music, tap Download on any song, album or playlist; smart downloads can refresh your library automatically.',
        'Downloads play inside the app for as long as your subscription is active.',
      ],
      link: { href: 'https://music.youtube.com', label: 'Open YouTube Music' },
    },
    licensed: {
      title: 'Download free music legally from the YouTube Audio Library',
      steps: [
        'In YouTube Studio, open Audio Library from the left menu.',
        'Filter by genre, mood, duration and licence (some tracks require attribution), then click Download for an MP3.',
        'Audio Library tracks are cleared for use in your YouTube videos, including monetized ones.',
      ],
      link: { href: 'https://studio.youtube.com/channel/UC/music', label: 'Open Audio Library' },
    },
    other: {
      title: "Converting someone else's track is not allowed",
      steps: [
        "Most music on YouTube is copyrighted; converting it to MP3 breaks YouTube's Terms and can infringe copyright.",
        'Buy or stream the track from the artist, or use the YouTube Audio Library for royalty-free alternatives.',
        'Need the song name? Check the video description or the “Music in this video” section under the video.',
      ],
    },
  },
};

export function DownloadOptionsGuide({ mode }: { mode: Mode }) {
  const [situation, setSituation] = useState<Situation>('own');
  const answer = ANSWERS[mode][situation];

  return (
    <div className="space-y-5">
      <fieldset>
        <legend className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] mb-3">
          What is your situation?
        </legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {OPTIONS.map((o) => (
            <label
              key={o.id}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm cursor-pointer transition-colors ${
                situation === o.id
                  ? 'border-[#ff0000] bg-[#ff0000]/5 text-[#0f0f0f] dark:text-[#f1f1f1]'
                  : 'border-[#e5e5e5] dark:border-[#272727] text-[#606060] dark:text-[#aaaaaa]'
              }`}
            >
              <input
                type="radio"
                name="situation"
                value={o.id}
                checked={situation === o.id}
                onChange={() => setSituation(o.id)}
                className="accent-[#ff0000]"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-5" aria-live="polite">
        <h3 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{answer.title}</h3>
        <ol className="mt-3 list-decimal list-inside space-y-2 text-sm text-[#606060] dark:text-[#aaaaaa]">
          {answer.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        {answer.link && (
          <a
            href={answer.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-xl bg-[#ff0000] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#cc0000]"
          >
            {answer.link.label}
          </a>
        )}
        {situation === 'other' && (
          <p className="mt-4 text-sm">
            <Link href="/tools/video-data-viewer" className="text-[#ff0000] dark:text-red-400 hover:underline font-medium">Video Data Viewer</Link>
            {' · '}
            <Link href="/tools/thumbnail-downloader" className="text-[#ff0000] dark:text-red-400 hover:underline font-medium">Thumbnail Downloader</Link>
            {' · '}
            <Link href="/tools/tag-extractor" className="text-[#ff0000] dark:text-red-400 hover:underline font-medium">Tag Extractor</Link>
          </p>
        )}
      </div>
    </div>
  );
}
