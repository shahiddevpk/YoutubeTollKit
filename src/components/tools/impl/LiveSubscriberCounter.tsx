'use client';

import React, { useState } from 'react';
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

  const fetchLiveStats = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
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

  const searchChannel = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLiveStats(handle);
  };

  const selectPreset = (presetHandle: string) => {
    setHandle(presetHandle);
    fetchLiveStats(presetHandle);
  };

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-50 dark:bg-slate-950 p-8 flex flex-col justify-center' : ''}`}>
      {!isFullscreen && (
        <form onSubmit={searchChannel} className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
            Enter Channel Handle or Name
          </label>
          <div className={toolFormRowClass}>
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="e.g. @MrBeast, @mkbhd, or channel name"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 pl-11 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-red-500 focus:outline-none"
              />
            </div>
            <ToolPrimaryButton type="submit" loading={loading} loadingLabel="Loading…">
              <Users className="h-4 w-4" aria-hidden />
              <span>Get Subscriber Count</span>
            </ToolPrimaryButton>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-500">Quick test:</span>
            {PRESET_CHANNELS.map((preset) => (
              <button
                key={preset.handle}
                type="button"
                onClick={() => selectPreset(preset.handle)}
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-100 dark:bg-slate-900/80 px-2.5 py-1 text-xs text-slate-700 dark:text-slate-300 hover:border-red-500/50 hover:bg-slate-200 dark:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white transition-all cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </form>
      )}

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Live Counter Display Screen */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl">
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-200 dark:bg-slate-800/60 text-slate-400 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white transition-colors cursor-pointer"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-0.5 text-xs font-bold text-red-400 border border-red-500/20 mb-4">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
          Live YouTube Tracker
        </span>

        {avatarUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={channelTitle ?? 'Channel avatar'}
            className="h-16 w-16 rounded-full mx-auto mb-3 border-2 border-slate-300 dark:border-slate-700 object-cover shadow-lg"
          />
        )}

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {channelTitle ?? 'Enter a channel to load stats'}
        </h3>
        {handle && <p className="text-xs sm:text-sm text-slate-400 font-mono mt-0.5">{handle}</p>}

        <div className="my-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Subscribers
          </span>
          <div className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-white font-mono tracking-tight my-2">
            {subscribers !== null ? subscribers.toLocaleString() : '—'}
          </div>
        </div>

        {/* Supporting stats */}
        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="rounded-xl bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/60 p-3 border border-slate-200 dark:border-slate-800/80">
            <span className="text-[11px] text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
              <Eye className="h-3.5 w-3.5 text-blue-400" /> Total Views
            </span>
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono mt-1">
              {totalViews !== null ? formatNumber(totalViews) : '—'}
            </p>
          </div>
          <div className="rounded-xl bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/60 p-3 border border-slate-200 dark:border-slate-800/80">
            <span className="text-[11px] text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
              <Video className="h-3.5 w-3.5 text-emerald-400" /> Total Uploads
            </span>
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-mono mt-1">
              {videoCount !== null ? videoCount.toLocaleString() : '—'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
