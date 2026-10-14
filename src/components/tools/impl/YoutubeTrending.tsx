'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, ExternalLink, Eye, ThumbsUp } from 'lucide-react';
import { parseApiJson } from '@/lib/api-client';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';

const REGIONS = [
  { code: 'US', name: '🇺🇸 USA' },
  { code: 'GB', name: '🇬🇧 UK' },
  { code: 'IN', name: '🇮🇳 India' },
  { code: 'CA', name: '🇨🇦 Canada' },
  { code: 'AU', name: '🇦🇺 Australia' },
  { code: 'DE', name: '🇩🇪 Germany' },
  { code: 'FR', name: '🇫🇷 France' },
  { code: 'BR', name: '🇧🇷 Brazil' },
  { code: 'JP', name: '🇯🇵 Japan' },
  { code: 'KR', name: '🇰🇷 Korea' },
  { code: 'PK', name: '🇵🇰 Pakistan' },
  { code: 'SA', name: '🇸🇦 Saudi Arabia' },
];

const CATEGORIES: Record<string, string> = {
  '0':  'All',
  '10': 'Music',
  '20': 'Gaming',
  '24': 'Entertainment',
  '17': 'Sports',
  '25': 'News',
  '28': 'Science & Tech',
  '23': 'Comedy',
};

interface TrendingVideo {
  videoId: string;
  title: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  thumbnailUrl: string;
  duration: string;
}

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatRelativeDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return 'Just now';
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

async function fetchTrending(region: string, category: string): Promise<Response> {
  return fetch(`/api/youtube/trending?region=${region}&category=${category}`);
}

export function YoutubeTrending() {
  const [region, setRegion] = useState('US');
  const [category, setCategory] = useState('0');
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<TrendingVideo[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadTrending = async (r: string, c: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchTrending(r, c);
      const parsed = await parseApiJson<{ videos: TrendingVideo[] }>(res);
      if (parsed.ok) {
        setVideos(parsed.data.videos);
      } else {
        setError(parsed.error);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load trending videos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrending('US', '0');
  }, []);

  const handleRegionChange = (r: string) => {
    setRegion(r);
    loadTrending(r, category);
  };

  const handleCategoryChange = (c: string) => {
    setCategory(c);
    loadTrending(region, c);
  };

  return (
    <div className="space-y-5">
      {/* Region selector */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#606060] dark:text-[#aaaaaa] uppercase tracking-wide">
          Region
        </label>
        <div className="flex flex-wrap gap-2">
          {REGIONS.map(({ code, name }) => (
            <button
              key={code}
              onClick={() => handleRegionChange(code)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                region === code
                  ? 'bg-[#d40000] text-white font-bold'
                  : 'border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000]/50'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-[#606060] dark:text-[#aaaaaa] uppercase tracking-wide">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CATEGORIES).map(([id, label]) => (
            <button
              key={id}
              onClick={() => handleCategoryChange(id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                category === id
                  ? 'bg-[#d40000] text-white font-bold'
                  : 'border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000]/50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Refresh button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[#cc0000] dark:text-red-400" aria-hidden />
          <span className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            Top 20 Trending — {REGIONS.find(r => r.code === region)?.name.split(' ')[1] ?? region}
          </span>
          {videos.length > 0 && !loading && (
            <span className="text-xs text-[#606060] dark:text-[#aaaaaa]">({videos.length} videos)</span>
          )}
        </div>
        <ToolPrimaryButton
          type="button"
          loading={loading}
          loadingLabel="Refreshing…"
          onClick={() => loadTrending(region, category)}
        >
          <TrendingUp className="h-4 w-4" aria-hidden />
          <span>Refresh</span>
        </ToolPrimaryButton>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && videos.length === 0 && (
        <div className="grid grid-cols-1 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-3 flex gap-3 animate-pulse"
            >
              <div className="h-16 w-28 rounded-lg bg-[#e5e5e5] dark:bg-[#272727] shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-3 bg-[#e5e5e5] dark:bg-[#272727] rounded w-4/5" />
                <div className="h-3 bg-[#e5e5e5] dark:bg-[#272727] rounded w-2/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {videos.length > 0 && (
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] divide-y divide-[#e5e5e5] dark:divide-[#272727] animate-in fade-in duration-150 overflow-hidden">
          {videos.map((video, index) => (
            <a
              key={video.videoId}
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] transition-colors group"
            >
              {/* Rank */}
              <span className="text-xs font-black text-[#606060] dark:text-[#a0a0a0] w-5 shrink-0 pt-1 text-right tabular-nums">
                {index + 1}
              </span>

              {/* Thumbnail */}
              <div className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="h-16 w-28 rounded-lg object-cover border border-[#e5e5e5] dark:border-[#272727]"
                  loading="lazy"
                />
                {index < 3 && (
                  <span className={`absolute top-1 left-1 rounded-full px-1.5 py-0.5 text-[9px] font-black text-white ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-slate-400' : 'bg-amber-600'
                  }`}>
                    #{index + 1}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] line-clamp-2 group-hover:text-[#ff0000] transition-colors">
                  {video.title}
                </p>
                <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-0.5 truncate">{video.channelTitle}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-[11px] text-[#606060] dark:text-[#aaaaaa]">
                    <Eye className="h-3 w-3" aria-hidden />
                    {formatCompact(video.viewCount)}
                  </span>
                  {video.likeCount > 0 && (
                    <span className="flex items-center gap-1 text-[11px] text-[#606060] dark:text-[#aaaaaa]">
                      <ThumbsUp className="h-3 w-3" aria-hidden />
                      {formatCompact(video.likeCount)}
                    </span>
                  )}
                  <span className="text-[11px] text-[#606060] dark:text-[#a0a0a0]">
                    {formatRelativeDate(video.publishedAt)}
                  </span>
                </div>
              </div>

              <ExternalLink className="h-3.5 w-3.5 text-[#606060] dark:text-[#a0a0a0] shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
            </a>
          ))}
        </div>
      )}

      <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">
        Data sourced from YouTube Data API v3 · Updated every 30 minutes · Trending is determined by YouTube&apos;s algorithm
      </p>
    </div>
  );
}
