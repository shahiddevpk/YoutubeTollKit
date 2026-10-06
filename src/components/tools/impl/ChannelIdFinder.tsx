'use client';

import React, { useState } from 'react';
import { Search, Fingerprint, Copy, Check, Rss, AlertCircle } from 'lucide-react';
import { fetchYouTubeChannel, parseApiJson } from '@/lib/api-client';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { toolFormRowClass } from '@/lib/tool-ui';

const PRESET_CHANNELS = [
  { label: '@MrBeast', handle: '@MrBeast' },
  { label: '@mkbhd', handle: '@mkbhd' },
  { label: '@Veritasium', handle: '@Veritasium' },
];

export function ChannelIdFinder() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    channelId: string;
    handle: string;
    title: string;
    avatarUrl?: string;
    rssFeed: string;
    canonicalUrl: string;
  } | null>(null);

  const fetchChannelId = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetchYouTubeChannel(query);
      const parsed = await parseApiJson<{
        channelId: string;
        handle: string;
        title: string;
        avatarUrl?: string;
      }>(res);

      if (parsed.ok) {
        const d = parsed.data;
        setData({
          channelId: d.channelId,
          handle: d.handle,
          title: d.title,
          avatarUrl: d.avatarUrl,
          rssFeed: `https://www.youtube.com/feeds/videos.xml?channel_id=${d.channelId}`,
          canonicalUrl: `https://www.youtube.com/channel/${d.channelId}`,
        });
      } else {
        setError(parsed.error);
        return;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error finding channel ID';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    fetchChannelId(input);
  };

  const selectPreset = (handle: string) => {
    setInput(handle);
    fetchChannelId(handle);
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleLookup} className="space-y-3">
        <label className="block text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          Enter Channel Link, Handle (@name), or Video URL
        </label>
        <div className={toolFormRowClass}>
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#909090] dark:text-[#717171]" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. @mkbhd, youtube.com/@veritasium, or video link"
              className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-3 pl-11 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#909090] dark:placeholder-[#717171] focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000] transition-colors"
              required
            />
          </div>
          <ToolPrimaryButton type="submit" loading={loading} loadingLabel="Looking up…">
            <Fingerprint className="h-4 w-4" aria-hidden />
            <span>Find Channel ID</span>
          </ToolPrimaryButton>
        </div>

        {/* 1-Click Quick Preset Chips */}
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

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {data && (
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-6 space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center gap-3 border-b border-[#e5e5e5] dark:border-[#272727] pb-3">
            {data.avatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.avatarUrl}
                alt={data.title}
                className="h-10 w-10 rounded-xl object-cover border border-[#e5e5e5] dark:border-[#272727]"
              />
            )}
            <div>
              <h3 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1] flex items-center gap-1.5">
                {data.title}
              </h3>
              <span className="text-xs text-[#606060] dark:text-[#aaaaaa] font-mono">{data.handle}</span>
            </div>
          </div>

          {/* UC Channel ID */}
          <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <span className="text-xs font-semibold text-[#606060] dark:text-[#aaaaaa] uppercase tracking-wider">
                Permanent YouTube Channel ID (UC)
              </span>
              <p className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 select-all">{data.channelId}</p>
            </div>
            <button
              onClick={() => copyToClipboard(data.channelId, 'channelId')}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-[#f2f2f2] dark:bg-[#272727] px-3.5 py-1.5 text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#e5e5e5] dark:hover:bg-[#383838] transition-all cursor-pointer shrink-0"
            >
              {copiedField === 'channelId' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#909090]" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          {/* RSS Feed URL */}
          <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div className="min-w-0 pr-2">
              <span className="text-xs font-semibold text-[#606060] dark:text-[#aaaaaa] uppercase tracking-wider flex items-center gap-1">
                <Rss className="h-3.5 w-3.5 text-amber-500" />
                Channel RSS Feed
              </span>
              <p className="text-xs font-mono text-[#0f0f0f] dark:text-[#f1f1f1] mt-0.5 truncate max-w-sm sm:max-w-md select-all">
                {data.rssFeed}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(data.rssFeed, 'rss')}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-[#f2f2f2] dark:bg-[#272727] px-3.5 py-1.5 text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#e5e5e5] dark:hover:bg-[#383838] transition-all cursor-pointer shrink-0"
            >
              {copiedField === 'rss' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#909090]" />
                  <span>Copy RSS</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
