'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePageVisible } from '@/lib/use-page-visible';
import { Users, Search, Eye, Video, Maximize2, AlertCircle } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { fetchYouTubeChannel, parseApiJson } from '@/lib/api-client';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { toolFormRowClass } from '@/lib/tool-ui';

const PRESET_CHANNELS = [
  { label: '@MrBeast', handle: '@MrBeast' },
  { label: '@mkbhd', handle: '@mkbhd' },
  { label: '@Veritasium', handle: '@Veritasium' },
];

export function LiveSubscriberCounter() {
  const [handle, setHandle] = useState('');
  const [channelTitle, setChannelTitle] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [subscribers, setSubscribers] = useState<number | null>(null);
  const [totalViews, setTotalViews] = useState<number | null>(null);
  const [videoCount, setVideoCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [goal, setGoal] = useState('');
  const activeQuery = useRef('');
  const pageVisible = usePageVisible();

  const fetchLiveStats = async (query: string, silent = false) => {
    if (!query.trim()) return;
    activeQuery.current = query;

    if (!silent) setLoading(true);
    setError(null);

    try {
      const res = await fetchYouTubeChannel(query);
      const parsed = await parseApiJson<{
        title: string;
        avatarUrl?: string;
        subscriberCount: number;
        viewCount: number;
        videoCount: number;
      }>(res);

      if (parsed.ok) {
        const d = parsed.data;
        setChannelTitle(d.title);
        setAvatarUrl(d.avatarUrl ?? null);
        setSubscribers(d.subscriberCount);
        setTotalViews(d.viewCount);
        setVideoCount(d.videoCount);
        setLastUpdated(new Date());
      } else {
        setError(parsed.error);
        return;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error fetching channel statistics';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh every 90s while a channel is loaded and the tab is visible.
  useEffect(() => {
    if (subscribers === null || !pageVisible || error) return;
    const id = setInterval(() => fetchLiveStats(activeQuery.current, true), 90_000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribers === null, pageVisible, error]);

  const nextMilestone = (n: number) => {
    const steps = [100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1000000000];
    return steps.find((s) => s > n) ?? Math.ceil((n + 1) / 100000000) * 100000000;
  };
  const customGoal = Number(goal.replace(/[^0-9]/g, ''));
  const target = subscribers !== null ? (customGoal > subscribers ? customGoal : nextMilestone(subscribers)) : null;
  const progressPct = subscribers !== null && target ? Math.min(100, (subscribers / target) * 100) : 0;

  const searchChannel = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLiveStats(handle);
  };

  const selectPreset = (presetHandle: string) => {
    setHandle(presetHandle);
    fetchLiveStats(presetHandle);
  };

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#0f0f0f] p-8 flex flex-col justify-center' : ''}`}>
      {!isFullscreen && (
        <form onSubmit={searchChannel} className="space-y-3">
          <label className="block text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
            Enter Channel Handle or Name
          </label>
          <div className={toolFormRowClass}>
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#606060] dark:text-[#a0a0a0]" />
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="e.g. @MrBeast, @mkbhd, or channel name"
                className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-3 pl-11 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#909090] dark:placeholder-[#717171] focus:border-[#ff0000] focus:outline-none transition-colors"
              />
            </div>
            <ToolPrimaryButton type="submit" loading={loading} loadingLabel="Loading…">
              <Users className="h-4 w-4" aria-hidden />
              <span>Get Subscriber Count</span>
            </ToolPrimaryButton>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-[#606060] dark:text-[#a0a0a0]">Quick test:</span>
            {PRESET_CHANNELS.map((preset) => (
              <button
                key={preset.handle}
                type="button"
                onClick={() => selectPreset(preset.handle)}
                className="rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 text-xs font-medium text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000]/60 hover:bg-[#e5e5e5] dark:hover:bg-[#383838] transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </form>
      )}

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Live Counter Display Screen */}
      <div className="rounded-3xl border border-[#272727] bg-[#0f0f0f] p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#272727] text-[#aaaaaa] hover:text-[#f1f1f1] hover:bg-[#383838] transition-colors cursor-pointer"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff0000]/15 px-3 py-0.5 text-xs font-bold text-[#cc0000] border border-[#ff0000]/30 mb-4 dark:text-red-400">
          <span className="h-2 w-2 rounded-full bg-[#ff0000] animate-ping" />
          Live Public Subscriber Tracker
        </span>

        {avatarUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={channelTitle ?? 'Channel avatar'}
            className="h-16 w-16 rounded-full mx-auto mb-3 border-2 border-[#272727] object-cover shadow-lg"
                    loading="lazy"
          />
        )}

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f1f1f1]">
          {channelTitle ?? 'Enter a channel to load stats'}
        </h2>
        {handle && <p className="text-xs sm:text-sm text-[#aaaaaa] font-mono mt-0.5">{handle}</p>}

        <div className="my-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#717171]">
            Subscribers
          </span>
          <div className="text-5xl sm:text-7xl font-black text-[#f1f1f1] font-mono tracking-tight my-2">
            {subscribers !== null ? subscribers.toLocaleString() : '—'}
          </div>
        </div>

        {subscribers !== null && target && (
          <div className="max-w-lg mx-auto mb-6 text-left">
            <div className="flex justify-between text-xs text-[#aaaaaa]">
              <span>Goal: {target.toLocaleString()} subscribers</span>
              <span>{(target - subscribers).toLocaleString()} to go · {progressPct.toFixed(1)}%</span>
            </div>
            <div className="mt-1.5 h-2.5 rounded-full bg-[#272727] overflow-hidden" role="progressbar" aria-valuenow={Math.round(progressPct)} aria-valuemin={0} aria-valuemax={100} aria-label="Progress to subscriber goal">
              <div className="h-full bg-[#ff0000] transition-all" style={{ width: `${progressPct}%` }} />
            </div>
            {!isFullscreen && (
              <label className="mt-3 flex items-center gap-2 text-xs text-[#aaaaaa]">
                Custom goal
                <input
                  inputMode="numeric"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g. 1000000"
                  className="w-32 rounded-lg border border-[#383838] bg-[#181818] px-2 py-1 text-[#f1f1f1]"
                />
              </label>
            )}
            {lastUpdated && (
              <p className="mt-2 text-[11px] text-[#aaaaaa]">
                Updated {lastUpdated.toLocaleTimeString()} · auto-refreshes every 90s while this tab is open. YouTube rounds public subscriber counts to 3 significant figures.
              </p>
            )}
          </div>
        )}

        {/* Supporting stats */}
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto pt-6 border-t border-[#272727]">
          <div className="rounded-xl bg-[#181818] p-3.5 border border-[#272727]">
            <span className="text-[11px] text-[#aaaaaa] uppercase font-semibold flex items-center justify-center gap-1">
              <Eye className="h-3.5 w-3.5 text-[#3ea6ff]" /> Total Views
            </span>
            <p className="text-base sm:text-lg font-bold text-[#f1f1f1] font-mono mt-1">
              {totalViews !== null ? formatNumber(totalViews) : '—'}
            </p>
          </div>
          <div className="rounded-xl bg-[#181818] p-3.5 border border-[#272727]">
            <span className="text-[11px] text-[#aaaaaa] uppercase font-semibold flex items-center justify-center gap-1">
              <Video className="h-3.5 w-3.5 text-[#2ba640]" /> Total Uploads
            </span>
            <p className="text-base sm:text-lg font-bold text-[#f1f1f1] font-mono mt-1">
              {videoCount !== null ? videoCount.toLocaleString() : '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
