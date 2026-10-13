'use client';

import React, { useState } from 'react';
import { Search, Download, AlertCircle, CheckCircle2, User, Image } from 'lucide-react';
import { parseApiJson } from '@/lib/api-client';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { toolFormRowClass } from '@/lib/tool-ui';

const PRESET_CHANNELS = [
  { label: 'MrBeast', url: 'https://www.youtube.com/@MrBeast' },
  { label: 'PewDiePie', url: 'https://www.youtube.com/@PewDiePie' },
];

interface BrandingData {
  channelId: string;
  title: string;
  handle: string;
  avatarUrl: string | null;
  avatarHdUrl: string | null;
  bannerUrl: string | null;
}

type AssetType = 'avatar' | 'banner';

async function fetchChannelBranding(q: string): Promise<Response> {
  return fetch('/api/youtube/channel-branding', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q }),
  });
}

export function LogoBannerDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<BrandingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<AssetType | null>(null);
  const [downloaded, setDownloaded] = useState<AssetType | null>(null);

  const fetchBranding = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetchChannelBranding(query);
      const parsed = await parseApiJson<BrandingData>(res);
      if (parsed.ok) {
        setData(parsed.data);
      } else {
        setError(parsed.error);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch channel branding');
    } finally {
      setLoading(false);
    }
  };

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBranding(url);
  };

  const selectPreset = (presetUrl: string) => {
    setUrl(presetUrl);
    fetchBranding(presetUrl);
  };

  const downloadAsset = async (type: AssetType) => {
    if (!data) return;
    const assetUrl = type === 'avatar' ? (data.avatarHdUrl ?? data.avatarUrl) : data.bannerUrl;
    if (!assetUrl) {
      setError(`${type === 'avatar' ? 'Channel logo' : 'Banner'} not available for this channel.`);
      return;
    }

    setDownloading(type);
    try {
      const res = await fetch(
        `/api/youtube/channel-asset-proxy?url=${encodeURIComponent(assetUrl)}&channelId=${encodeURIComponent(data.channelId)}&type=${type}`
      );

      if (!res.ok) {
        // Fallback: open in new tab so user can save manually
        window.open(assetUrl, '_blank', 'noopener,noreferrer');
        setDownloaded(type);
        setTimeout(() => setDownloaded(null), 2000);
        return;
      }

      const blob = await res.blob();
      const ext = type === 'banner' ? 'jpg' : 'jpg';
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${data.channelId}-${type}.${ext}`;
      a.click();
      URL.revokeObjectURL(a.href);
      setDownloaded(type);
      setTimeout(() => setDownloaded(null), 2000);
    } catch {
      // Fallback to opening in new tab
      const assetUrlFallback = type === 'avatar' ? (data.avatarHdUrl ?? data.avatarUrl) : data.bannerUrl;
      if (assetUrlFallback) window.open(assetUrlFallback, '_blank', 'noopener,noreferrer');
      setDownloaded(type);
      setTimeout(() => setDownloaded(null), 2000);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleFetch} className="space-y-3">
        <label className="block text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          Enter YouTube Channel URL, @Handle, or Channel ID
        </label>
        <div className={toolFormRowClass}>
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#909090] dark:text-[#717171]" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. @MrBeast or https://youtube.com/@MrBeast"
              className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-3 pl-11 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#909090] dark:placeholder-[#717171] focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000] transition-colors"
              required
            />
          </div>
          <ToolPrimaryButton type="submit" loading={loading} loadingLabel="Loading…">
            <User className="h-4 w-4" aria-hidden />
            <span>Get Assets</span>
          </ToolPrimaryButton>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#909090] dark:text-[#717171]">Quick test:</span>
          {PRESET_CHANNELS.map((preset) => (
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

      {data && (
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-6 space-y-6 animate-in fade-in duration-150">
          {/* Channel header */}
          <div className="flex items-center gap-3 border-b border-[#e5e5e5] dark:border-[#272727] pb-4">
            {data.avatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.avatarHdUrl ?? data.avatarUrl}
                alt={data.title}
                className="h-12 w-12 rounded-full border border-[#e5e5e5] dark:border-[#272727] object-cover shrink-0"
                            loading="lazy"
              />
            )}
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] truncate">{data.title}</h4>
              {data.handle && (
                <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-0.5">{data.handle}</p>
              )}
            </div>
          </div>

          {/* Channel Logo */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#ff0000]" aria-hidden />
              <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Channel Logo (Profile Picture)</h3>
            </div>
            {data.avatarHdUrl || data.avatarUrl ? (
              <div className="flex items-center gap-4 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.avatarHdUrl ?? data.avatarUrl ?? ''}
                  alt={`${data.title} channel logo`}
                  className="h-20 w-20 rounded-full border border-[#e5e5e5] dark:border-[#272727] object-cover shrink-0"
                                loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">Profile Picture</p>
                  <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-0.5">800×800 px (HD)</p>
                  <button
                    onClick={() => downloadAsset('avatar')}
                    disabled={downloading === 'avatar'}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#ff0000] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#cc0000] disabled:opacity-60 transition-colors cursor-pointer"
                  >
                    {downloaded === 'avatar' ? (
                      <><CheckCircle2 className="h-3.5 w-3.5" aria-hidden /><span>Saved</span></>
                    ) : downloading === 'avatar' ? (
                      <span>Saving…</span>
                    ) : (
                      <><Download className="h-3.5 w-3.5" aria-hidden /><span>Download Logo</span></>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#909090] dark:text-[#717171]">No logo available for this channel.</p>
            )}
          </div>

          {/* Channel Banner */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Image className="h-4 w-4 text-[#ff0000]" aria-hidden />
              <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Channel Banner Art</h3>
            </div>
            {data.bannerUrl ? (
              <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={data.bannerUrl}
                  alt={`${data.title} channel banner`}
                  className="w-full object-cover"
                  style={{ maxHeight: '180px' }}
                                loading="lazy"
                />
                <div className="p-3 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">Channel Banner</p>
                    <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-0.5">2560×1440 px (TV/Desktop)</p>
                  </div>
                  <button
                    onClick={() => downloadAsset('banner')}
                    disabled={downloading === 'banner'}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#ff0000] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#cc0000] disabled:opacity-60 transition-colors cursor-pointer shrink-0"
                  >
                    {downloaded === 'banner' ? (
                      <><CheckCircle2 className="h-3.5 w-3.5" aria-hidden /><span>Saved</span></>
                    ) : downloading === 'banner' ? (
                      <span>Saving…</span>
                    ) : (
                      <><Download className="h-3.5 w-3.5" aria-hidden /><span>Download Banner</span></>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#909090] dark:text-[#717171]">
                This channel has not set a banner image, or the banner is not publicly accessible.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
