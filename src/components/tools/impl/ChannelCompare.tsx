'use client';

import React, { useState } from 'react';
import { GitCompare, AlertCircle } from 'lucide-react';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { formatNumber } from '@/lib/utils';
import { fetchYouTubeChannel, parseApiJson } from '@/lib/api-client';

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
        fetchYouTubeChannel(q1),
        fetchYouTubeChannel(q2),
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
            <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
              Channel 1 (Handle or URL)
            </label>
            <input
              type="text"
              value={ch1Input}
              onChange={(e) => setCh1Input(e.target.value)}
              placeholder="e.g. @MrBeast"
              className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
              Channel 2 (Handle or URL)
            </label>
            <input
              type="text"
              value={ch2Input}
              onChange={(e) => setCh2Input(e.target.value)}
              placeholder="e.g. @mkbhd"
              className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        <ToolPrimaryButton type="submit" loading={loading} loadingLabel="Comparing…" className="w-full sm:w-full">
          <GitCompare className="h-4 w-4" aria-hidden />
          <span>Compare Channels</span>
        </ToolPrimaryButton>
      </form>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Comparison Results Grid */}
      {ch1 && ch2 && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Channel 1 Card */}
            <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 border-b border-[#e5e5e5] dark:border-[#272727] pb-4">
                {ch1.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ch1.avatarUrl}
                    alt={ch1.title}
                    className="h-12 w-12 rounded-full border border-[#e5e5e5] dark:border-[#272727] object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-[#ff0000]/20 text-[#ff0000] font-black text-xl flex items-center justify-center border border-[#ff0000]/30">
                    {ch1.title.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{ch1.title}</h3>
                  <span className="text-xs text-[#606060] dark:text-[#aaaaaa] font-mono">{ch1.handle}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#e5e5e5] dark:border-[#272727] pb-2">
                  <span className="text-[#606060] dark:text-[#aaaaaa]">Subscribers</span>
                  <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] font-mono">{formatNumber(ch1.subscribers)}</span>
                </div>
                <div className="flex justify-between border-b border-[#e5e5e5] dark:border-[#272727] pb-2">
                  <span className="text-[#606060] dark:text-[#aaaaaa]">Lifetime Views</span>
                  <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] font-mono">{formatNumber(ch1.totalViews)}</span>
                </div>
                <div className="flex justify-between border-b border-[#e5e5e5] dark:border-[#272727] pb-2">
                  <span className="text-[#606060] dark:text-[#aaaaaa]">Total Uploads</span>
                  <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] font-mono">{ch1.videoCount}</span>
                </div>
                <div className="flex justify-between pt-1 gap-4">
                  <span className="text-[#606060] dark:text-[#aaaaaa]">Channel ID</span>
                  <span className="font-mono text-xs text-[#065fd4] dark:text-[#3ea6ff] font-semibold text-right break-all">{ch1.channelId}</span>
                </div>
              </div>
            </div>

            {/* Channel 2 Card */}
            <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 border-b border-[#e5e5e5] dark:border-[#272727] pb-4">
                {ch2.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={ch2.avatarUrl}
                    alt={ch2.title}
                    className="h-12 w-12 rounded-full border border-[#e5e5e5] dark:border-[#272727] object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-[#ff0000]/20 text-[#ff0000] font-black text-xl flex items-center justify-center border border-[#ff0000]/30">
                    {ch2.title.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{ch2.title}</h3>
                  <span className="text-xs text-[#606060] dark:text-[#aaaaaa] font-mono">{ch2.handle}</span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-[#e5e5e5] dark:border-[#272727] pb-2">
                  <span className="text-[#606060] dark:text-[#aaaaaa]">Subscribers</span>
                  <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] font-mono">{formatNumber(ch2.subscribers)}</span>
                </div>
                <div className="flex justify-between border-b border-[#e5e5e5] dark:border-[#272727] pb-2">
                  <span className="text-[#606060] dark:text-[#aaaaaa]">Lifetime Views</span>
                  <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] font-mono">{formatNumber(ch2.totalViews)}</span>
                </div>
                <div className="flex justify-between border-b border-[#e5e5e5] dark:border-[#272727] pb-2">
                  <span className="text-[#606060] dark:text-[#aaaaaa]">Total Uploads</span>
                  <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1] font-mono">{ch2.videoCount}</span>
                </div>
                <div className="flex justify-between pt-1 gap-4">
                  <span className="text-[#606060] dark:text-[#aaaaaa]">Channel ID</span>
                  <span className="font-mono text-xs text-[#065fd4] dark:text-[#3ea6ff] font-semibold text-right break-all">{ch2.channelId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
