'use client';

import React, { useState } from 'react';
import { formatNumber } from '@/lib/utils';
import { parseApiJson } from '@/lib/api-client';
import {
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Copy,
  Check,
  Info,
} from 'lucide-react';

interface ChannelApiData {
  channelId: string;
  title: string;
  handle: string;
  avatarUrl?: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  yppSubscriberThresholdMet: boolean;
  monetizationDisclaimer: string;
}

interface MonetizationResult {
  input: string;
  channelTitle: string;
  handle: string;
  channelId: string;
  avatarUrl?: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  yppSubscriberThresholdMet: boolean;
  estimatedRpm: string;
  monetizationDisclaimer: string;
}

const PRESET_CHANNELS = [
  { label: '@MrBeast', handle: '@MrBeast' },
  { label: '@mkbhd', handle: '@mkbhd' },
  { label: '@Veritasium', handle: '@Veritasium' },
  { label: '@AliAbdaal', handle: '@AliAbdaal' },
];

export function MonetizationChecker() {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MonetizationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkChannel = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/youtube/channel?q=${encodeURIComponent(query.trim())}`);
      const parsed = await parseApiJson<ChannelApiData>(res);

      if (!parsed.ok) {
        setError(parsed.error);
        return;
      }

      const d = parsed.data;
      setResult({
        input: query,
        channelTitle: d.title,
        handle: d.handle,
        channelId: d.channelId,
        avatarUrl: d.avatarUrl,
        subscriberCount: d.subscriberCount,
        viewCount: d.viewCount,
        videoCount: d.videoCount,
        yppSubscriberThresholdMet: d.yppSubscriberThresholdMet,
        estimatedRpm: '$2.00 – $8.00 (niche-dependent estimate)',
        monetizationDisclaimer: d.monetizationDisclaimer,
      });
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    checkChannel(urlInput);
  };

  const selectPreset = (handle: string) => {
    setUrlInput(handle);
    checkChannel(handle);
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `YouTube channel report for ${result.channelTitle} (${result.handle})
Channel ID: ${result.channelId}
Subscribers: ${formatNumber(result.subscriberCount)}
1,000-subscriber YPP threshold: ${result.yppSubscriberThresholdMet ? 'Met' : 'Not met'}
Note: Active monetization is not published by YouTube's public API.
Source: youtubefreetoolkit.com`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleCheck} className="space-y-3">
        <label className="block text-sm font-semibold text-slate-200">
          Enter YouTube Channel URL, Handle (@name), or Video Link
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="e.g. https://www.youtube.com/@MrBeast or @mkbhd"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pl-11 text-sm text-white placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/30 hover:bg-red-500 disabled:opacity-50 transition-all shrink-0 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Check Channel</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-500">Quick test:</span>
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

      <p className="text-xs text-slate-500 leading-relaxed">
        Uses the official YouTube Data API for public channel statistics. YouTube does not expose YPP or AdSense
        enrollment through this API—we show eligibility signals and disclaimers instead of guessing monetization status.
      </p>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-8 text-center space-y-3 animate-pulse">
          <Loader2 className="h-8 w-8 animate-spin text-red-500 mx-auto" />
          <p className="text-sm font-medium text-slate-300">Fetching public channel data from YouTube...</p>
        </div>
      )}

      {result && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-6 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-4">
              {result.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={result.avatarUrl}
                  alt={result.channelTitle}
                  className="h-14 w-14 rounded-2xl border border-slate-700 object-cover shadow-md"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-red-400 font-bold text-xl border border-slate-700">
                  {result.channelTitle.charAt(0)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-black text-white">{result.channelTitle}</h3>
                  <span className="text-xs text-slate-400 font-mono">{result.handle}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {result.yppSubscriberThresholdMet ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      1K subscriber YPP threshold met
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/15 px-2.5 py-0.5 text-xs font-bold text-slate-300 border border-slate-600/40">
                      <XCircle className="h-3.5 w-3.5" />
                      Below 1K subscriber threshold
                    </span>
                  )}
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                    {result.channelId}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={copyResult}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer shrink-0"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied' : 'Copy summary'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
              <span className="text-[11px] font-medium text-slate-400">Subscribers</span>
              <p className="text-sm font-bold text-white mt-1 font-mono">{formatNumber(result.subscriberCount)}</p>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
              <span className="text-[11px] font-medium text-slate-400">Lifetime views</span>
              <p className="text-sm font-bold text-white mt-1 font-mono">{formatNumber(result.viewCount)}</p>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
              <span className="text-[11px] font-medium text-slate-400">Public videos</span>
              <p className="text-sm font-bold text-white mt-1 font-mono">{formatNumber(result.videoCount)}</p>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5">
              <span className="text-[11px] font-medium text-slate-400">Typical RPM range (estimate)</span>
              <p className="text-sm font-bold text-emerald-400 mt-1">{result.estimatedRpm}</p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200/90 flex items-center gap-2">
              <Info className="h-3.5 w-3.5" />
              Monetization transparency
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{result.monetizationDisclaimer}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
              <li>• Watch hours, Shorts views, and policy strikes are not available via the public Data API.</li>
              <li>• Confirm enrollment in YouTube Studio → Earn → Monetization.</li>
              <li>• Ads on a public video suggest monetization but do not prove channel-wide YPP status.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
