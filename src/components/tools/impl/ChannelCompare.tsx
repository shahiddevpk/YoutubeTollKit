'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { parseApiJson } from '@/lib/api-client';

interface ChannelStats {
  handle: string;
  title: string;
  avatarUrl?: string;
  subscribers: number;
  totalViews: number;
  videoCount: number;
  channelId: string;
}

export function ChannelCompare() {
  const [ch1Input, setCh1Input] = useState('@MrBeast');
  const [ch2Input, setCh2Input] = useState('@mkbhd');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ch1, setCh1] = useState<ChannelStats | null>(null);
  const [ch2, setCh2] = useState<ChannelStats | null>(null);

  const compareChannels = async (q1: string, q2: string) => {
    if (!q1.trim() || !q2.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const [res1, res2] = await Promise.all([
        fetch(`/api/youtube/channel?q=${encodeURIComponent(q1.trim())}`),
        fetch(`/api/youtube/channel?q=${encodeURIComponent(q2.trim())}`),
      ]);

      const [parsed1, parsed2] = await Promise.all([
        parseApiJson<{
          handle: string;
          title: string;
          avatarUrl?: string;
          subscriberCount: number;
          viewCount: number;
          videoCount: number;
          channelId: string;
        }>(res1),
        parseApiJson<{
          handle: string;
          title: string;
          avatarUrl?: string;
          subscriberCount: number;
          viewCount: number;
          videoCount: number;
          channelId: string;
        }>(res2),
      ]);

      if (parsed1.ok && parsed2.ok) {
        const d1 = parsed1.data;
        const d2 = parsed2.data;


        setCh1({
          handle: d1.handle,
          title: d1.title,
          avatarUrl: d1.avatarUrl,
          subscribers: d1.subscriberCount,
          totalViews: d1.viewCount,
          videoCount: d1.videoCount,
          channelId: d1.channelId,
        });

        setCh2({
          handle: d2.handle,
          title: d2.title,
          avatarUrl: d2.avatarUrl,
          subscribers: d2.subscriberCount,
          totalViews: d2.viewCount,
          videoCount: d2.videoCount,
          channelId: d2.channelId,
        });
      } else {
        const errMsg = !parsed1.ok
          ? parsed1.error
          : !parsed2.ok
            ? parsed2.error
            : 'Failed to fetch one or both channels for comparison';
        setError(errMsg);
        return;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error comparing channels';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    compareChannels(ch1Input, ch2Input);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleCompare} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Channel 1 (Handle or URL)
            </label>
            <input
              type="text"
              value={ch1Input}
              onChange={(e) => setCh1Input(e.target.value)}
              placeholder="e.g. @MrBeast"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
              Channel 2 (Handle or URL)
            </label>
            <input
              type="text"
              value={ch2Input}
              onChange={(e) => setCh2Input(e.target.value)}
              placeholder="e.g. @mkbhd"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition-all cursor-pointer"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          <span>Compare Channels Side-by-Side</span>
        </button>
      </form>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Comparison Results Grid */}
      {ch1 && ch2 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Channel 1 Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                {ch1.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ch1.avatarUrl}
                    alt={ch1.title}
                    className="h-12 w-12 rounded-2xl border border-slate-700 object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-2xl bg-red-600/20 text-red-400 font-black text-xl flex items-center justify-center border border-red-500/30">
                    {ch1.title.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white">{ch1.title}</h3>
                  <span className="text-xs text-slate-400 font-mono">{ch1.handle}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Subscribers</span>
                  <span className="font-bold text-white font-mono">{formatNumber(ch1.subscribers)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Lifetime Views</span>
                  <span className="font-bold text-white font-mono">{formatNumber(ch1.totalViews)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Total Uploads</span>
                  <span className="font-bold text-white font-mono">{ch1.videoCount}</span>
                </div>
                <div className="flex justify-between pt-1 gap-4">
                  <span className="text-slate-400">Channel ID</span>
                  <span className="font-bold text-blue-400 font-mono text-right break-all">{ch1.channelId}</span>
                </div>
              </div>
            </div>

            {/* Channel 2 Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                {ch2.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ch2.avatarUrl}
                    alt={ch2.title}
                    className="h-12 w-12 rounded-2xl border border-slate-700 object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-2xl bg-blue-600/20 text-blue-400 font-black text-xl flex items-center justify-center border border-blue-500/30">
                    {ch2.title.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-white">{ch2.title}</h3>
                  <span className="text-xs text-slate-400 font-mono">{ch2.handle}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Subscribers</span>
                  <span className="font-bold text-white font-mono">{formatNumber(ch2.subscribers)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Lifetime Views</span>
                  <span className="font-bold text-white font-mono">{formatNumber(ch2.totalViews)}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-slate-400">Total Uploads</span>
                  <span className="font-bold text-white font-mono">{ch2.videoCount}</span>
                </div>
                <div className="flex justify-between pt-1 gap-4">
                  <span className="text-slate-400">Channel ID</span>
                  <span className="font-bold text-blue-400 font-mono text-right break-all">{ch2.channelId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
