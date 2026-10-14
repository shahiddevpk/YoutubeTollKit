'use client';

import React, { useState } from 'react';
import { ThumbsDown, ThumbsUp, AlertCircle, ExternalLink, Info } from 'lucide-react';
import { parseApiJson, fetchYouTubeVideo } from '@/lib/api-client';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';

interface VideoStats {
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  thumbnails: { medium?: { url: string }; high?: { url: string }; default?: { url: string } };
}

interface RydData {
  dislikes: number;
  likes: number;
  rating: number;
  viewCount: number;
  rawLikes?: number;
  rawDislikes?: number;
}

function extractVideoId(input: string): string | null {
  const trimmed = input.trim();
  const urlMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (urlMatch) return urlMatch[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
  return null;
}

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function DislikeChecker() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<VideoStats | null>(null);
  const [ryd, setRyd] = useState<RydData | null>(null);

  const handleCheck = async () => {
    const videoId = extractVideoId(input);
    if (!videoId) {
      setError('Please enter a valid YouTube video URL or video ID.');
      return;
    }
    setLoading(true);
    setError(null);
    setStats(null);
    setRyd(null);

    try {
      // Fetch YouTube stats and Return YouTube Dislike data in parallel
      const [ytRes, rydRes] = await Promise.all([
        fetchYouTubeVideo(videoId),
        fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`),
      ]);

      const ytParsed = await parseApiJson<VideoStats>(ytRes);
      if (!ytParsed.ok) {
        setError(ytParsed.error);
        setLoading(false);
        return;
      }
      setStats(ytParsed.data);

      if (rydRes.ok) {
        const rydData: RydData = await rydRes.json();
        setRyd(rydData);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch video data');
    } finally {
      setLoading(false);
    }
  };

  const likes = ryd ? ryd.likes : (stats?.likeCount ?? 0);
  const dislikes = ryd ? ryd.dislikes : 0;
  const total = likes + dislikes;
  const likePct = total > 0 ? (likes / total) * 100 : 0;
  const dislikePct = total > 0 ? (dislikes / total) * 100 : 0;

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
          <ThumbsDown className="h-4 w-4" aria-hidden />
          <span>Check</span>
        </ToolPrimaryButton>
      </div>

      {/* Disclaimer */}
      <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 flex gap-2.5">
        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-800 dark:text-blue-300">
          YouTube removed public dislike counts in November 2021. Estimated dislikes come from the{' '}
          <a
            href="https://returnyoutubedislike.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600"
          >
            Return YouTube Dislike
          </a>{' '}
          community project and are approximations, not official figures.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {stats && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* Video card */}
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
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 text-center space-y-1">
              <ThumbsUp className="h-5 w-5 text-emerald-500 mx-auto" />
              <p className="text-lg font-black text-[#0f0f0f] dark:text-[#f1f1f1]">
                {formatCompact(likes)}
              </p>
              <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">Likes</p>
            </div>

            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 text-center space-y-1">
              <ThumbsDown className="h-5 w-5 text-rose-500 mx-auto" />
              <p className="text-lg font-black text-[#0f0f0f] dark:text-[#f1f1f1]">
                {ryd ? formatCompact(dislikes) : 'N/A'}
              </p>
              <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">
                {ryd ? 'Est. Dislikes' : 'Dislikes'}
              </p>
            </div>

            <div className="col-span-2 sm:col-span-1 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 text-center space-y-1">
              <p className="text-2xl font-black text-emerald-500">{likePct.toFixed(1)}%</p>
              <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">Like Rate</p>
            </div>
          </div>

          {/* Ratio bar */}
          {ryd && total > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#606060] dark:text-[#aaaaaa] uppercase tracking-wide">
                Like vs Dislike Ratio
              </p>
              <div className="h-4 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${likePct}%` }}
                />
                <div
                  className="h-full bg-rose-500 transition-all duration-500"
                  style={{ width: `${dislikePct}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-[#606060] dark:text-[#aaaaaa]">
                <span className="text-emerald-500">{likePct.toFixed(1)}% likes</span>
                <span className="text-rose-500">{dislikePct.toFixed(1)}% dislikes</span>
              </div>
            </div>
          )}
        </div>
      )}

      {ryd && stats && total > 0 && (
        <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 space-y-2 text-sm">
          <p className="font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
            Audience sentiment:{' '}
            <span className={dislikePct < 3 ? 'text-emerald-600 dark:text-emerald-400' : dislikePct < 10 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'}>
              {dislikePct < 3 ? 'Very positive' : dislikePct < 10 ? 'Mostly positive' : dislikePct < 25 ? 'Mixed' : 'Divisive'}
            </span>
          </p>
          <ul className="text-xs text-[#606060] dark:text-[#aaaaaa] space-y-1 list-disc list-inside">
            <li>About {stats.viewCount > 0 ? ((dislikes / stats.viewCount) * 1000).toFixed(2) : '0'} estimated dislikes per 1,000 views.</li>
            {typeof ryd.rawDislikes === 'number' && typeof ryd.rawLikes === 'number' && (
              <li>
                Estimate is extrapolated from {(ryd.rawLikes + ryd.rawDislikes).toLocaleString()} votes cast by Return YouTube Dislike extension users
                {ryd.rawLikes + ryd.rawDislikes < 1000 ? ' — a small sample, so treat the number as rough.' : ' — a reasonable sample size.'}
              </li>
            )}
            <li>Dislike counts have been hidden by YouTube since November 2021; no tool can show the exact official number.</li>
          </ul>
        </div>
      )}

      <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">
        Like counts: official YouTube Data API v3 · Dislike estimates: Return YouTube Dislike (community-sourced approximations)
      </p>
    </div>
  );
}
