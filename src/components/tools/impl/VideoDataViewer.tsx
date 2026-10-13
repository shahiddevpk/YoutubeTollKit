'use client';

import React, { useState } from 'react';
import { Search, Eye, ThumbsUp, MessageSquare, Clock, Calendar, Hash, Copy, Check, AlertCircle, PlayCircle } from 'lucide-react';
import { fetchYouTubeVideo, parseApiJson } from '@/lib/api-client';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { toolFormRowClass } from '@/lib/tool-ui';

const PRESET_VIDEOS = [
  { label: 'MrBeast — 100M Subs', url: 'https://www.youtube.com/watch?v=YSToxPtHr6U' },
  { label: 'PSY — Gangnam Style', url: 'https://www.youtube.com/watch?v=9bZkp7q19f0' },
];

interface VideoData {
  videoId: string;
  title: string;
  description: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  tags: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  duration: string;
  thumbnails?: {
    high?: { url: string };
    default?: { url: string };
    maxres?: { url: string };
  };
}

function parseDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return iso;
  const h = parseInt(match[1] ?? '0', 10);
  const m = parseInt(match[2] ?? '0', 10);
  const s = parseInt(match[3] ?? '0', 10);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function VideoDataViewer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

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

  const copyField = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const CopyBtn = ({ value, id }: { value: string; id: string }) => (
    <button
      onClick={() => copyField(value, id)}
      className="ml-1.5 inline-flex items-center rounded-md p-1 text-[#909090] hover:text-[#ff0000] transition-colors cursor-pointer"
      title="Copy"
    >
      {copied === id ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );

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
            <PlayCircle className="h-4 w-4" aria-hidden />
            <span>View Data</span>
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
          {/* Thumbnail + title header */}
          <div className="flex items-start gap-4 border-b border-[#e5e5e5] dark:border-[#272727] pb-5">
            {(videoData.thumbnails?.high?.url ?? videoData.thumbnails?.default?.url) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={videoData.thumbnails?.maxres?.url ?? videoData.thumbnails?.high?.url ?? ''}
                alt={videoData.title}
                className="h-20 w-36 rounded-xl object-cover border border-[#e5e5e5] dark:border-[#272727] shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] line-clamp-3">
                {videoData.title}
              </h4>
              <p className="mt-1 text-xs text-[#606060] dark:text-[#aaaaaa]">{videoData.channelTitle}</p>
              <a
                href={`https://www.youtube.com/watch?v=${videoData.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xs text-[#ff0000] hover:underline"
              >
                Watch on YouTube ↗
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Eye, label: 'Views', value: formatNumber(videoData.viewCount), raw: String(videoData.viewCount) },
              { icon: ThumbsUp, label: 'Likes', value: formatNumber(videoData.likeCount), raw: String(videoData.likeCount) },
              { icon: MessageSquare, label: 'Comments', value: formatNumber(videoData.commentCount), raw: String(videoData.commentCount) },
              { icon: Clock, label: 'Duration', value: parseDuration(videoData.duration), raw: parseDuration(videoData.duration) },
            ].map(({ icon: Icon, label, value, raw }) => (
              <div
                key={label}
                className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-3 flex items-center gap-2"
              >
                <Icon className="h-4 w-4 text-[#ff0000] shrink-0" aria-hidden />
                <div className="min-w-0">
                  <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">{label}</p>
                  <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] truncate" title={raw}>
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Details table */}
          <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] divide-y divide-[#e5e5e5] dark:divide-[#272727] overflow-hidden">
            {[
              { label: 'Video ID', value: videoData.videoId, id: 'vid' },
              { label: 'Channel ID', value: videoData.channelId, id: 'cid' },
              { label: 'Published', value: formatDate(videoData.publishedAt), id: 'pub' },
              { label: 'Tags count', value: `${videoData.tags.length} tag${videoData.tags.length !== 1 ? 's' : ''}`, id: 'tags' },
            ].map(({ label, value, id }) => (
              <div key={id} className="flex items-center justify-between px-4 py-2.5 gap-2">
                <span className="text-xs text-[#606060] dark:text-[#aaaaaa] shrink-0 w-24">{label}</span>
                <div className="flex items-center min-w-0 flex-1 justify-end">
                  <span className="text-xs font-mono text-[#0f0f0f] dark:text-[#f1f1f1] truncate text-right">{value}</span>
                  <CopyBtn value={value} id={id} />
                </div>
              </div>
            ))}
          </div>

          {/* Published date */}
          <div className="flex items-center gap-2 text-xs text-[#606060] dark:text-[#aaaaaa]">
            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span>Published {formatDate(videoData.publishedAt)}</span>
          </div>

          {/* Tags */}
          {videoData.tags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-[#ff0000]" aria-hidden />
                <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
                  Video Tags ({videoData.tags.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {videoData.tags.slice(0, 30).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-3 py-1 text-xs text-[#0f0f0f] dark:text-[#f1f1f1]"
                  >
                    {tag}
                  </span>
                ))}
                {videoData.tags.length > 30 && (
                  <span className="text-xs text-[#909090] dark:text-[#717171] self-center">
                    +{videoData.tags.length - 30} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Description preview */}
          {videoData.description && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Description Preview</h3>
              <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4">
                <p className="text-xs text-[#606060] dark:text-[#aaaaaa] whitespace-pre-wrap line-clamp-6">
                  {videoData.description}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
