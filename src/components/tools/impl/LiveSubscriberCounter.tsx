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
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#0f0f0f] p-8 flex flex-col justify-center' : ''}`}>
      {!isFullscreen && (
        <form onSubmit={searchChannel} className="space-y-3">
          <label className="block text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
            Enter Channel Handle or Name
          </label>
          <div className={toolFormRowClass}>
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#909090] dark:text-[#717171]" />
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
            <span className="text-xs text-[#909090] dark:text-[#717171]">Quick test:</span>
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

        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff0000]/15 px-3 py-0.5 text-xs font-bold text-[#ff0000] border border-[#ff0000]/30 mb-4">
          <span className="h-2 w-2 rounded-full bg-[#ff0000] animate-ping" />
          Live Public Subscriber Tracker
        </span>

        {avatarUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={channelTitle ?? 'Channel avatar'}
            className="h-16 w-16 rounded-full mx-auto mb-3 border-2 border-[#272727] object-cover shadow-lg"
          />
        )}

        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#f1f1f1]">
          {channelTitle ?? 'Enter a channel to load stats'}
        </h3>
        {handle && <p className="text-xs sm:text-sm text-[#aaaaaa] font-mono mt-0.5">{handle}</p>}

        <div className="my-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#717171]">
            Subscribers
          </span>
          <div className="text-5xl sm:text-7xl font-black text-[#f1f1f1] font-mono tracking-tight my-2">
            {subscribers !== null ? subscribers.toLocaleString() : '—'}
          </div>
        </div>

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
