'use client';

import React, { useState } from 'react';
import { ThumbsUp, Eye, AlertCircle, ExternalLink } from 'lucide-react';
import { parseApiJson, fetchYouTubeVideo } from '@/lib/api-client';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';

interface VideoStats {
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  thumbnails: { medium?: { url: string }; high?: { url: string }; default?: { url: string } };
}

function extractVideoId(input: string): string | null {
  const trimmed = input.trim();
  // full URL
  const urlMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (urlMatch) return urlMatch[1];
  // bare 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  return null;
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function likeRatioTier(ratio: number): { label: string; color: string } {
  if (ratio >= 0.08) return { label: 'Exceptional', color: 'text-emerald-500' };
  if (ratio >= 0.05) return { label: 'Great', color: 'text-green-500' };
  if (ratio >= 0.03) return { label: 'Good', color: 'text-blue-500' };
  if (ratio >= 0.01) return { label: 'Average', color: 'text-amber-500' };
  return { label: 'Below Average', color: 'text-rose-500' };
}

export function LikeCounter() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<VideoStats | null>(null);

  const handleCheck = async () => {
    const videoId = extractVideoId(input);
    if (!videoId) {
      setError('Please enter a valid YouTube video URL or video ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setStats(null);
    try {
      const res = await fetchYouTubeVideo(videoId);
      const parsed = await parseApiJson<VideoStats>(res);
      if (parsed.ok) {
        setStats(parsed.data);
      } else {
        setError(parsed.error);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch video stats');
    } finally {
      setLoading(false);
    }
  };

  const [compareInput, setCompareInput] = useState('');
  const [compareStats, setCompareStats] = useState<VideoStats | null>(null);
  const [compareError, setCompareError] = useState<string | null>(null);
  const [comparing, setComparing] = useState(false);

  const handleCompare = async () => {
    const id = extractVideoId(compareInput);
    if (!id) {
      setCompareError('Enter a valid YouTube video URL or ID to compare.');
      return;
    }
    setComparing(true);
    setCompareError(null);
    try {
      const parsed = await parseApiJson<VideoStats>(await fetchYouTubeVideo(id));
      if (parsed.ok) setCompareStats(parsed.data);
      else setCompareError(parsed.error);
    } catch {
      setCompareError('Could not load the comparison video.');
    } finally {
      setComparing(false);
    }
  };

  const [now] = useState(() => Date.now());
  const daysLive = (v: VideoStats) => Math.max(1, Math.round((now - new Date(v.publishedAt).getTime()) / 86_400_000));

  const likeRatio = stats && stats.viewCount > 0 ? stats.likeCount / stats.viewCount : 0;
  const tier = stats ? likeRatioTier(likeRatio) : null;

  return (
    <div className="space-y-5">
      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Paste YouTube video URL or ID…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
          className="flex-1 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-4 py-3 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder:text-[#606060] focus:border-[#ff0000] focus:outline-none"
        />
        <ToolPrimaryButton type="button" loading={loading} loadingLabel="Checking…" onClick={handleCheck}>
          <ThumbsUp className="h-4 w-4" aria-hidden />
          <span>Check</span>
        </ToolPrimaryButton>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {stats && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Video info */}
          <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-4 flex gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stats.thumbnails?.medium?.url ?? stats.thumbnails?.default?.url ?? `https://i.ytimg.com/vi/${stats.videoId}/mqdefault.jpg`}
              alt={stats.title}
              className="h-16 w-28 rounded-lg object-cover border border-[#e5e5e5] dark:border-[#272727] shrink-0"
                        loading="lazy"
            />
            <div className="min-w-0 flex-1">
              <a
                href={`https://www.youtube.com/watch?v=${stats.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-1"
              >
                <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] line-clamp-2 group-hover:text-[#ff0000] transition-colors">
                  {stats.title}
                </p>
                <ExternalLink className="h-3.5 w-3.5 text-[#606060] shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-0.5">{stats.channelTitle}</p>
              <p className="text-[11px] text-[#606060] dark:text-[#a0a0a0]">
                {new Date(stats.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 text-center space-y-1">
              <ThumbsUp className="h-5 w-5 text-[#ff0000] mx-auto" />
              <p className="text-lg font-black text-[#0f0f0f] dark:text-[#f1f1f1]">
                {formatCompact(stats.likeCount)}
              </p>
              <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">Likes</p>
              <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa]">
                {formatNumber(stats.likeCount)}
              </p>
            </div>

            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 text-center space-y-1">
              <Eye className="h-5 w-5 text-blue-500 mx-auto" />
              <p className="text-lg font-black text-[#0f0f0f] dark:text-[#f1f1f1]">
                {formatCompact(stats.viewCount)}
              </p>
              <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">Views</p>
              <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa]">
                {formatNumber(stats.viewCount)}
              </p>
            </div>

            <div className="col-span-2 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 text-center space-y-1">
              <p className="text-2xl font-black text-[#0f0f0f] dark:text-[#f1f1f1]">
                {(likeRatio * 100).toFixed(2)}%
              </p>
              <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">Like-to-View Ratio</p>
              {tier && (
                <p className={`text-xs font-bold ${tier.color}`}>{tier.label}</p>
              )}
            </div>
          </div>

          {/* Ratio bar */}
          <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-4 space-y-3">
            <p className="text-xs font-semibold text-[#606060] dark:text-[#aaaaaa] uppercase tracking-wide">
              Like-to-View Ratio Benchmarks
            </p>
            <div className="space-y-1.5">
              {[
                { label: '8%+  Exceptional', pct: 100 },
                { label: '5–8% Great', pct: 62 },
                { label: '3–5% Good', pct: 37 },
                { label: '1–3% Average', pct: 12 },
              ].map(({ label, pct }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 text-[11px] text-[#606060] dark:text-[#aaaaaa]">{label}</span>
                  <div className="flex-1 h-2 rounded-full bg-[#e5e5e5] dark:bg-[#272727]">
                    <div
                      className="h-full rounded-full bg-[#ff0000]/60"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {stats && (
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-4 space-y-3">
          <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">Compare likes with another video</p>
          <div className="flex gap-2">
            <input
              type="url"
              value={compareInput}
              onChange={(e) => setCompareInput(e.target.value)}
              placeholder="Paste a second video URL (e.g. a competitor's upload)"
              aria-label="Second video URL to compare"
              className="flex-1 min-w-0 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#0f0f0f] px-3 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none"
            />
            <button type="button" onClick={handleCompare} disabled={comparing} className="rounded-xl bg-[#0f0f0f] dark:bg-[#f1f1f1] px-4 text-sm font-semibold text-white dark:text-[#0f0f0f] disabled:opacity-50">
              {comparing ? '…' : 'Compare'}
            </button>
          </div>
          {compareError && <p role="alert" className="text-xs text-rose-600 dark:text-rose-400">{compareError}</p>}
          {compareStats && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[#606060] dark:text-[#aaaaaa]">
                  <tr><th className="py-1 pr-2">Metric</th><th className="py-1 pr-2">Video A</th><th className="py-1">Video B</th></tr>
                </thead>
                <tbody className="text-[#0f0f0f] dark:text-[#f1f1f1]">
                  {[
                    ['Likes', (v: VideoStats) => formatNumber(v.likeCount)],
                    ['Views', (v: VideoStats) => formatNumber(v.viewCount)],
                    ['Like-to-view ratio', (v: VideoStats) => (v.viewCount ? ((v.likeCount / v.viewCount) * 100).toFixed(2) + '%' : '—')],
                    ['Likes per day', (v: VideoStats) => formatNumber(Math.round(v.likeCount / daysLive(v)))],
                    ['Comments per 1K views', (v: VideoStats) => (v.viewCount ? ((v.commentCount / v.viewCount) * 1000).toFixed(2) : '—')],
                  ].map(([label, fn]) => (
                    <tr key={label as string} className="border-t border-[#e5e5e5] dark:border-[#272727]">
                      <td className="py-1.5 pr-2 font-semibold">{label as string}</td>
                      <td className="py-1.5 pr-2">{(fn as (v: VideoStats) => string)(stats)}</td>
                      <td className="py-1.5">{(fn as (v: VideoStats) => string)(compareStats)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-1 text-[11px] text-[#606060] dark:text-[#a0a0a0]">A: {stats.title.slice(0, 60)} · B: {compareStats.title.slice(0, 60)}</p>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">
        Like count is fetched live from YouTube Data API v3 · Reflects YouTube&apos;s cached value, typically accurate within minutes
      </p>
    </div>
  );
}
