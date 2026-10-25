'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Eye, Search, RefreshCw, ThumbsUp, MessageSquare, Play, AlertCircle, PauseCircle, PlayCircle } from 'lucide-react';
import { usePageVisible } from '@/lib/use-page-visible';
import { fetchYouTubeVideo, parseApiJson } from '@/lib/api-client';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { toolFormRowClass } from '@/lib/tool-ui';

const PRESET_VIDEOS = [
  { label: 'PSY — Gangnam Style', url: 'https://www.youtube.com/watch?v=9bZkp7q19f0' },
  { label: 'MrBeast 100M', url: 'https://www.youtube.com/watch?v=YSToxPtHr6U' },
];

const REFRESH_INTERVALS = [
  { label: '60s', value: 60 },
  { label: '2 min', value: 120 },
  { label: '5 min', value: 300 },
];

interface VideoStats {
  videoId: string;
  title: string;
  channelTitle: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  thumbnails?: { high?: { url: string }; default?: { url: string } };
}

function formatLargeNumber(n: number): string {
  return n.toLocaleString('en-US');
}

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function LiveViewCount() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<VideoStats | null>(null);
  const [prevViews, setPrevViews] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [intervalSeconds, setIntervalSeconds] = useState(60);  // minimum 60s to keep Vercel Fluid CPU within free tier
  const [countdown, setCountdown] = useState(0);
  const [refreshCount, setRefreshCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const activeQuery = useRef('');
  const pageVisible = usePageVisible();
  const [history, setHistory] = useState<{ t: number; v: number }[]>([]);

  const fetchStats = useCallback(async (query: string, silent = false) => {
    if (!query.trim()) return;
    if (!silent) setLoading(true);
    setError(null);

    try {
      const res = await fetchYouTubeVideo(query);
      const parsed = await parseApiJson<VideoStats>(res);
      if (parsed.ok) {
        setStats((prev) => {
          if (prev) setPrevViews(prev.viewCount);
          return parsed.data;
        });
        setLastUpdated(new Date());
        setHistory((h) => [...h.slice(-29), { t: Date.now(), v: parsed.data.viewCount }]);
        setRefreshCount((c) => c + 1);
      } else {
        setError(parsed.error);
        setAutoRefresh(false);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch video stats');
      setAutoRefresh(false);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  const startCountdown = useCallback((seconds: number) => {
    setCountdown(seconds);
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(countdownRef.current!);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    if (autoRefresh && stats && pageVisible) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);

      startCountdown(intervalSeconds);
      intervalRef.current = setInterval(() => {
        fetchStats(activeQuery.current, true);
        startCountdown(intervalSeconds);
      }, intervalSeconds * 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
      setCountdown(0);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [autoRefresh, intervalSeconds, stats, fetchStats, startCountdown, pageVisible]);

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();
    activeQuery.current = url;
    setRefreshCount(0);
    setPrevViews(null);
    setHistory([]);
    fetchStats(url);
  };

  const selectPreset = (presetUrl: string) => {
    setUrl(presetUrl);
    activeQuery.current = presetUrl;
    setRefreshCount(0);
    setPrevViews(null);
    setHistory([]);
    fetchStats(presetUrl);
  };

  const viewDelta = stats && prevViews !== null ? stats.viewCount - prevViews : null;
  const first = history[0];
  const last = history[history.length - 1];
  const elapsedMin = first && last && last.t > first.t ? (last.t - first.t) / 60000 : 0;
  const viewsPerMinute = elapsedMin > 0 ? (last.v - first.v) / elapsedMin : null;
  const sparkPoints = (() => {
    if (history.length < 2) return '';
    const vals = history.map((h) => h.v);
    const min = Math.min(...vals);
    const range = Math.max(1, Math.max(...vals) - min);
    return history
      .map((h, i) => `${((i / (history.length - 1)) * 200).toFixed(1)},${(38 - ((h.v - min) / range) * 34).toFixed(1)}`)
      .join(' ');
  })();

  return (
    <div className="space-y-6">
      <form onSubmit={handleFetch} className="space-y-3">
        <label className="block text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          Enter YouTube Video URL to Track Live View Count
        </label>
        <div className={toolFormRowClass}>
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#606060] dark:text-[#a0a0a0]" />
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
            <Eye className="h-4 w-4" aria-hidden />
            <span>Track Views</span>
          </ToolPrimaryButton>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#606060] dark:text-[#a0a0a0]">Quick test:</span>
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

      {stats && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Video identity */}
          <div className="flex items-center gap-3 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4">
            {stats.thumbnails?.high?.url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={stats.thumbnails.high.url}
                alt={stats.title}
                className="h-14 w-24 rounded-lg object-cover border border-[#e5e5e5] dark:border-[#272727] shrink-0"
                            loading="lazy"
              />
            )}
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] line-clamp-2">{stats.title}</p>
              <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-0.5">{stats.channelTitle}</p>
            </div>
          </div>

          {/* Live view counter — hero display */}
          <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#0f0f0f] dark:bg-[#0f0f0f] p-6 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-[#606060] mb-3 dark:text-[#aaaaaa]">
              <Eye className="h-4 w-4 text-[#cc0000] dark:text-red-400" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#aaaaaa]">Live View Count</span>
              {autoRefresh && (
                <span className="ml-2 rounded-full bg-[#d40000] px-2 py-0.5 text-[10px] font-bold text-white animate-pulse">
                  LIVE
                </span>
              )}
            </div>
            <p className="text-5xl sm:text-6xl font-black text-white tracking-tight tabular-nums">
              {formatLargeNumber(stats.viewCount)}
            </p>
            <p className="text-sm text-[#606060] dark:text-[#aaaaaa]">{formatCompact(stats.viewCount)} views</p>
            {viewDelta !== null && viewDelta !== 0 && (
              <p className={`text-sm font-bold ${viewDelta > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {viewDelta > 0 ? '▲' : '▼'} {Math.abs(viewDelta).toLocaleString()} since last refresh
              </p>
            )}
            {lastUpdated && (
              <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">
                Updated {lastUpdated.toLocaleTimeString()} · Refreshed {refreshCount}×
              </p>
            )}
          </div>

          {/* Session growth tracker */}
          {history.length >= 2 && (
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4">
              <div className="flex items-center justify-between text-xs text-[#606060] dark:text-[#aaaaaa]">
                <span className="font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">This session</span>
                <span>
                  +{(last.v - first.v).toLocaleString()} views
                  {viewsPerMinute !== null && ` · ~${Math.round(viewsPerMinute).toLocaleString()}/min`}
                </span>
              </div>
              <svg viewBox="0 0 200 40" className="mt-2 h-12 w-full" role="img" aria-label="View count trend for this session">
                <polyline points={sparkPoints} fill="none" stroke="#ff0000" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <p className="text-[11px] text-[#606060] dark:text-[#a0a0a0]">Trend of the public view count across {history.length} refreshes. Download as CSV for your records.</p>
              <button
                type="button"
                onClick={() => {
                  const csv = 'time,views\n' + history.map((h) => `${new Date(h.t).toISOString()},${h.v}`).join('\n');
                  const a = document.createElement('a');
                  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
                  a.download = `view-count-${stats.videoId ?? 'video'}.csv`;
                  a.click();
                }}
                className="mt-2 rounded-full border border-[#e5e5e5] dark:border-[#272727] px-3 py-1 text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000]/60"
              >
                Export CSV
              </button>
            </div>
          )}

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 flex items-center gap-3">
              <ThumbsUp className="h-5 w-5 text-[#cc0000] shrink-0 dark:text-red-400" aria-hidden />
              <div>
                <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">Likes</p>
                <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{formatLargeNumber(stats.likeCount)}</p>
              </div>
            </div>
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-[#cc0000] shrink-0 dark:text-red-400" aria-hidden />
              <div>
                <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">Comments</p>
                <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{formatLargeNumber(stats.commentCount)}</p>
              </div>
            </div>
          </div>

          {/* Auto-refresh controls */}
          <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <RefreshCw className={`h-4 w-4 text-[#cc0000] ${autoRefresh ? 'animate-spin' : ''}`} style={autoRefresh ? { animationDuration: '3s' } : {}} aria-hidden />
                <span className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">Auto-Refresh</span>
                {autoRefresh && countdown > 0 && (
                  <span className="text-xs text-[#606060] dark:text-[#aaaaaa]">
                    Next in {countdown}s
                  </span>
                )}
              </div>
              <button
                onClick={() => setAutoRefresh((v) => !v)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                  autoRefresh
                    ? 'bg-[#272727] text-white hover:bg-[#383838]'
                    : 'bg-[#d40000] text-white hover:bg-[#cc0000]'
                }`}
              >
                {autoRefresh ? (
                  <><PauseCircle className="h-3.5 w-3.5" aria-hidden /><span>Stop</span></>
                ) : (
                  <><PlayCircle className="h-3.5 w-3.5" aria-hidden /><span>Start Live</span></>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#606060] dark:text-[#aaaaaa]">Refresh every:</span>
              <div className="flex gap-1.5">
                {REFRESH_INTERVALS.map(({ label, value }) => (
                  <button
                    key={value}
                    onClick={() => setIntervalSeconds(value)}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition-colors cursor-pointer ${
                      intervalSeconds === value
                        ? 'bg-[#d40000] text-white'
                        : 'border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000]/50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">
              <Play className="inline h-3 w-3 mr-1" />
              YouTube API caches view counts and updates them periodically — small delays between refreshes are normal. Auto-refresh pauses while this tab is in the background.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
