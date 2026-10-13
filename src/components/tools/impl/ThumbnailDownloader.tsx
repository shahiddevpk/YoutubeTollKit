'use client';

import React, { useState } from 'react';
import { Image, Search, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { fetchYouTubeVideo, parseApiJson } from '@/lib/api-client';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { toolFormRowClass } from '@/lib/tool-ui';

const PRESET_VIDEOS = [
  { label: 'MrBeast — 100M Subs', url: 'https://www.youtube.com/watch?v=YSToxPtHr6U' },
  { label: 'YouTube Rewind 2018', url: 'https://www.youtube.com/watch?v=YbJOTdZBX1g' },
];

const QUALITY_OPTIONS = [
  { key: 'maxresdefault', label: 'Max Resolution', size: '1280×720', note: 'Best quality' },
  { key: 'sddefault',     label: 'SD',             size: '640×480',  note: 'Standard' },
  { key: 'hqdefault',     label: 'HQ',             size: '480×360',  note: 'High quality' },
  { key: 'mqdefault',     label: 'MQ',             size: '320×180',  note: 'Medium quality' },
  { key: 'default',       label: 'Default',        size: '120×90',   note: 'Smallest' },
] as const;

type Quality = (typeof QUALITY_OPTIONS)[number]['key'];

interface VideoData {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnails?: Record<string, { url: string; width?: number; height?: number }>;
}

export function ThumbnailDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<Quality | null>(null);
  const [downloaded, setDownloaded] = useState<Quality | null>(null);

  const fetchVideo = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setVideoData(null);

    try {
      const res = await fetchYouTubeVideo(query);
      const parsed = await parseApiJson<VideoData>(res);
      if (parsed.ok) {
        setVideoData(parsed.data);
      } else {
        setError(parsed.error);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch video data');
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVideo(url);
  };

  const selectPreset = (presetUrl: string) => {
    setUrl(presetUrl);
    fetchVideo(presetUrl);
  };

  const downloadThumbnail = async (quality: Quality) => {
    if (!videoData) return;
    setDownloading(quality);
    try {
      const proxyUrl = `/api/youtube/thumbnail-proxy?videoId=${encodeURIComponent(videoData.videoId)}&quality=${quality}`;
      const res = await fetch(proxyUrl);
      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: string };
        setError(err.error ?? 'Thumbnail not available at this quality level.');
        return;
      }
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${videoData.videoId}-${quality}.jpg`;
      a.click();
      URL.revokeObjectURL(a.href);
      setDownloaded(quality);
      setTimeout(() => setDownloaded(null), 2000);
    } catch {
      setError('Download failed. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  const thumbUrl = (quality: Quality) =>
    videoData ? `https://i.ytimg.com/vi/${videoData.videoId}/${quality}.jpg` : null;

  return (
    <div className="space-y-6">
      <form onSubmit={handleFetch} className="space-y-3">
        <label className="block text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          Enter YouTube Video URL or Shorts Link
        </label>
        <div className={toolFormRowClass}>
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#909090] dark:text-[#717171]" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-3 pl-11 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#909090] dark:placeholder-[#717171] focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000] transition-colors"
              required
            />
          </div>
          <ToolPrimaryButton type="submit" loading={loading} loadingLabel="Loading…">
            <Image className="h-4 w-4" aria-hidden />
            <span>Get Thumbnails</span>
          </ToolPrimaryButton>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#909090] dark:text-[#717171]">Quick test:</span>
          {PRESET_VIDEOS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => selectPreset(preset.url)}
              className="rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 text-xs font-medium text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000]/60 hover:bg-[#e5e5e5] dark:hover:bg-[#383838] transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </form>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {videoData && (
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-6 space-y-5 animate-in fade-in duration-150">
          {/* Video header */}
          <div className="flex items-center gap-3 border-b border-[#e5e5e5] dark:border-[#272727] pb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbUrl('hqdefault') ?? ''}
              alt={videoData.title}
              className="h-14 w-24 rounded-lg object-cover border border-[#e5e5e5] dark:border-[#272727] shrink-0"
                        loading="lazy"
            />
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] line-clamp-2">
                {videoData.title}
              </h4>
              <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-0.5">{videoData.channelTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Image className="h-4 w-4 text-[#ff0000]" aria-hidden />
            <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
              Download Thumbnails — All Sizes
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUALITY_OPTIONS.map(({ key, label, size, note }) => {
              const src = thumbUrl(key);
              const isDownloading = downloading === key;
              const isDone = downloaded === key;
              return (
                <div
                  key={key}
                  className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src ?? ''}
                    alt={`${videoData.title} — ${label} thumbnail`}
                    className="w-full object-cover aspect-video bg-[#e5e5e5] dark:bg-[#272727]"
                    loading="lazy"
                  />
                  <div className="p-3 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{label}</p>
                      <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">
                        {size} · {note}
                      </p>
                    </div>
                    <button
                      onClick={() => downloadThumbnail(key)}
                      disabled={isDownloading}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#ff0000] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#cc0000] disabled:opacity-60 transition-colors cursor-pointer shrink-0"
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                          <span>Saved</span>
                        </>
                      ) : isDownloading ? (
                        <span>Saving…</span>
                      ) : (
                        <>
                          <Download className="h-3.5 w-3.5" aria-hidden />
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-[#909090] dark:text-[#717171]">
            Note: Max Resolution (1280×720) may not be available for all videos — use HQ (480×360) as a reliable fallback.
          </p>
        </div>
      )}
    </div>
  );
}
