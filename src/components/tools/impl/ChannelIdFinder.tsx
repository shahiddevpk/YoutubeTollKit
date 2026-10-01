'use client';

import React, { useState } from 'react';
import { Search, Fingerprint, Copy, Check, Rss, Loader2, AlertCircle } from 'lucide-react';
import { parseApiJson } from '@/lib/api-client';

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
      const res = await fetch(`/api/youtube/channel?q=${encodeURIComponent(query.trim())}`);
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
        <label className="block text-sm font-semibold text-slate-200">
          Enter Channel Link, Handle (@name), or Video URL
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. @mkbhd, youtube.com/@veritasium, or video link"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pl-11 text-sm text-white placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition-all shrink-0 cursor-pointer"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Fingerprint className="h-4 w-4" />}
            <span>Find Channel ID</span>
          </button>
        </div>

        {/* 1-Click Quick Preset Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-500">Try Preset:</span>
          {PRESET_CHANNELS.map((preset) => (
            <button
              key={preset.handle}
              type="button"
              onClick={() => selectPreset(preset.handle)}
              className="rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-300 hover:border-red-500/50 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </form>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {data && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            {data.avatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.avatarUrl}
                alt={data.title}
                className="h-10 w-10 rounded-xl object-cover border border-slate-700"
              />
            )}
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                {data.title}
              </h3>
              <span className="text-xs text-slate-400 font-mono">{data.handle}</span>
            </div>
          </div>

          {/* UC Channel ID */}
          <div className="rounded-xl border border-slate-800/90 bg-slate-900/70 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Permanent YouTube Channel ID (UC)
              </span>
              <p className="text-base font-mono font-bold text-emerald-400 mt-0.5 select-all">{data.channelId}</p>
            </div>
            <button
              onClick={() => copyToClipboard(data.channelId, 'channelId')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all cursor-pointer shrink-0"
            >
              {copiedField === 'channelId' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copiedField === 'channelId' ? 'Copied' : 'Copy ID'}</span>
            </button>
          </div>

          {/* RSS Feed URL */}
          <div className="rounded-xl border border-slate-800/90 bg-slate-900/70 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Rss className="h-3.5 w-3.5 text-amber-400" /> YouTube RSS XML Feed
              </span>
              <p className="text-xs font-mono text-slate-300 truncate mt-0.5 select-all">{data.rssFeed}</p>
            </div>
            <button
              onClick={() => copyToClipboard(data.rssFeed, 'rss')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-all cursor-pointer shrink-0"
            >
              {copiedField === 'rss' ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copiedField === 'rss' ? 'Copied' : 'Copy RSS'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
