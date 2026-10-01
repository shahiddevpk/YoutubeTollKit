'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
  ShieldCheck,
  ExternalLink,
  LockKeyhole,
} from 'lucide-react';

interface ChannelApiData {
  channelId: string;
  title: string;
  handle: string;
  avatarUrl?: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  expandedYppSubscriberThresholdMet: boolean;
  fullYppSubscriberThresholdMet: boolean;
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
  expandedYppSubscriberThresholdMet: boolean;
  fullYppSubscriberThresholdMet: boolean;
  monetizationDisclaimer: string;
}

type VerificationStatus = 'monetized' | 'not_monetized' | 'channel_mismatch' | 'error';

interface OwnerVerificationResult {
  status: VerificationStatus;
  channelId?: string;
  channelTitle?: string;
  handle?: string;
  checkedAt: string;
  message: string;
  source: 'youtube_analytics_api';
}

const PRESET_CHANNELS = [
  { label: '@MrBeast', handle: '@MrBeast' },
  { label: '@mkbhd', handle: '@mkbhd' },
  { label: '@Veritasium', handle: '@Veritasium' },
  { label: '@AliAbdaal', handle: '@AliAbdaal' },
];

function oauthErrorMessage(code: string | null) {
  if (!code) return null;
  const messages: Record<string, string> = {
    invalid_channel: 'Owner verification could not start because the target channel ID was invalid.',
    oauth_not_configured:
      'Owner verification is not available on this site yet. If you operate this deployment, configure Google OAuth using .env.example.',
  };
  return messages[code] || 'Owner verification could not start. Please try again.';
}

export function MonetizationChecker() {
  const searchParams = useSearchParams();
  const oauthErrorParam = searchParams.get('oauth_error');
  const ownerVerifiedParam = searchParams.get('owner_verified') === '1';
  const oauthErrorFromUrl = useMemo(() => oauthErrorMessage(oauthErrorParam), [oauthErrorParam]);
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MonetizationResult | null>(null);
  const [verification, setVerification] = useState<OwnerVerificationResult | null>(null);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const displayedVerificationError =
    verificationError ?? (ownerVerifiedParam ? null : oauthErrorFromUrl);

  useEffect(() => {
    if (oauthErrorParam && !ownerVerifiedParam) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [oauthErrorParam, ownerVerifiedParam]);

  useEffect(() => {
    if (!ownerVerifiedParam) return;

    const loadVerification = async () => {
      setVerificationLoading(true);
      setVerificationError(null);
      try {
        const response = await fetch('/api/youtube/monetization/result', {
          cache: 'no-store',
          credentials: 'same-origin',
        });
        const body = (await response.json()) as {
          success?: boolean;
          data?: OwnerVerificationResult;
          error?: string;
        };

        if (!response.ok || !body.success || !body.data) {
          setVerificationError(body.error || 'The owner verification result is unavailable or expired.');
          return;
        }

        setVerification(body.data);
      } catch {
        setVerificationError('Could not load the owner verification result. Please try again.');
      } finally {
        setVerificationLoading(false);
        window.history.replaceState({}, '', window.location.pathname);
      }
    };

    loadVerification();
  }, [ownerVerifiedParam]);

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
        expandedYppSubscriberThresholdMet: d.expandedYppSubscriberThresholdMet,
        fullYppSubscriberThresholdMet: d.fullYppSubscriberThresholdMet,
        monetizationDisclaimer: d.monetizationDisclaimer,
      });

      if (verification?.channelId && verification.channelId !== d.channelId) {
        setVerification(null);
      }
      setVerificationError(null);
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
    const ownerStatus =
      verification?.channelId === result.channelId
        ? verification.status === 'monetized'
          ? 'Owner-verified: Monetized / YPP monetary access available'
          : verification.status === 'not_monetized'
            ? 'Owner-verified: Not monetized / YPP monetary access unavailable'
            : `Owner verification: ${verification.status}`
        : 'Owner verification: Not completed';

    navigator.clipboard.writeText(
      `YouTube monetization report for ${result.channelTitle} (${result.handle})
Channel ID: ${result.channelId}
Subscribers: ${formatNumber(result.subscriberCount)}
500-subscriber expanded YPP signal: ${result.expandedYppSubscriberThresholdMet ? 'Met' : 'Not met'}
1,000-subscriber full YPP subscriber signal: ${result.fullYppSubscriberThresholdMet ? 'Met' : 'Not met'}
${ownerStatus}
Source: youtubefreetoolkit.com`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verificationMatchesResult = Boolean(
    verification && result && verification.channelId && verification.channelId === result.channelId
  );

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
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              maxLength={300}
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
                <span>Checking...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Check Monetization Status</span>
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

      <div className="rounded-xl border border-blue-500/20 bg-blue-950/10 p-4 text-xs text-slate-300 leading-relaxed">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
          <p>
            <strong className="text-blue-200">Two-level monetization check:</strong> any public channel can be checked for public YPP eligibility signals. If you own the channel, you can then connect YouTube with read-only OAuth to verify whether YouTube Analytics grants YPP monetary-metric access.
          </p>
        </div>
      </div>

      {verificationLoading && (
        <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-4 text-sm text-blue-200 flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
          <span>Loading your owner-verified monetization result...</span>
        </div>
      )}

      {displayedVerificationError && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <span>{displayedVerificationError}</span>
        </div>
      )}

      {verification && !result && (
        <OwnerVerificationBanner verification={verification} />
      )}

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="min-h-40 rounded-2xl border border-slate-800 bg-slate-950/60 p-8 text-center space-y-3 animate-pulse">
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
                  alt={`${result.channelTitle} YouTube channel avatar`}
                  width={56}
                  height={56}
                  loading="lazy"
                  referrerPolicy="no-referrer"
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
                  {result.fullYppSubscriberThresholdMet ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      1K subscriber signal met
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/15 px-2.5 py-0.5 text-xs font-bold text-slate-300 border border-slate-600/40">
                      <XCircle className="h-3.5 w-3.5" />
                      Below 1K subscriber signal
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Expanded YPP subscriber signal</span>
              <p className={`mt-2 text-sm font-bold ${result.expandedYppSubscriberThresholdMet ? 'text-emerald-400' : 'text-slate-300'}`}>
                {result.expandedYppSubscriberThresholdMet ? '500 subscriber threshold met' : 'Below 500 subscribers'}
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Full YPP subscriber signal</span>
              <p className={`mt-2 text-sm font-bold ${result.fullYppSubscriberThresholdMet ? 'text-emerald-400' : 'text-slate-300'}`}>
                {result.fullYppSubscriberThresholdMet ? '1,000 subscriber threshold met' : 'Below 1,000 subscribers'}
              </p>
            </div>
            <div className="rounded-xl border border-blue-500/30 bg-blue-950/10 p-4">
              <span className="text-[11px] uppercase tracking-wider text-blue-300/80 font-semibold">Owner-verified YPP status</span>
              <p className="mt-2 text-sm font-bold text-blue-200">
                {verificationMatchesResult
                  ? verification?.status === 'monetized'
                    ? 'Monetized - verified'
                    : verification?.status === 'not_monetized'
                      ? 'Not monetized - verified'
                      : 'Verification needs attention'
                  : 'Owner verification available'}
              </p>
            </div>
          </div>

          {verificationMatchesResult && verification ? (
            <OwnerVerificationBanner verification={verification} />
          ) : (
            <div className="rounded-2xl border border-emerald-500/25 bg-emerald-950/10 p-5 sm:p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-500/10 p-2.5 border border-emerald-500/20">
                  <LockKeyhole className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white">Own this channel? Verify its actual YPP monetary access</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Connect the channel-owner Google account. We request read-only YouTube account access plus read-only YouTube monetary analytics access, verify that the connected account owns this channel, then test official YouTube Analytics monetary-metric access.
                  </p>
                </div>
              </div>

              <a
                href={`/api/youtube/monetization/start?channelId=${encodeURIComponent(result.channelId)}`}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-500 transition-colors cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4" />
                Verify Exact Monetization Status
              </a>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Optional owner-only verification. We do not receive your Google password and the verification code does not store your access token in a site database. By continuing, you agree to our{' '}
                <Link href="/privacy" className="text-slate-300 underline hover:text-white">Privacy Policy</Link>,{' '}
                <Link href="/terms" className="text-slate-300 underline hover:text-white">Terms</Link>, and the{' '}
                <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="text-slate-300 underline hover:text-white">
                  YouTube Terms of Service <ExternalLink className="inline h-3 w-3" />
                </a>.
              </p>
            </div>
          )}

          <div className="rounded-xl border border-amber-500/20 bg-amber-950/10 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200/90 flex items-center gap-2">
              <Info className="h-3.5 w-3.5" />
              Public-check transparency
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{result.monetizationDisclaimer}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
              <li>• Public Data API statistics do not expose a random channel’s YPP/AdSense enrollment.</li>
              <li>• Current full YPP ad-revenue eligibility also requires qualifying watch hours or Shorts views, review, and other YouTube requirements.</li>
              <li>• Exact verification on this page only works when the channel owner authorizes read-only YouTube Analytics access.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function OwnerVerificationBanner({ verification }: { verification: OwnerVerificationResult }) {
  const styles = {
    monetized: {
      border: 'border-emerald-500/35',
      background: 'bg-emerald-950/20',
      title: 'text-emerald-300',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
      heading: 'Monetization verified by channel owner',
    },
    not_monetized: {
      border: 'border-rose-500/35',
      background: 'bg-rose-950/20',
      title: 'text-rose-300',
      icon: <XCircle className="h-5 w-5 text-rose-400" />,
      heading: 'Channel is not currently verified as monetized',
    },
    channel_mismatch: {
      border: 'border-amber-500/35',
      background: 'bg-amber-950/20',
      title: 'text-amber-300',
      icon: <AlertCircle className="h-5 w-5 text-amber-400" />,
      heading: 'Connected account does not own the checked channel',
    },
    error: {
      border: 'border-slate-600',
      background: 'bg-slate-900/80',
      title: 'text-slate-200',
      icon: <AlertCircle className="h-5 w-5 text-slate-400" />,
      heading: 'Owner verification could not be completed',
    },
  }[verification.status];

  return (
    <div className={`rounded-2xl border ${styles.border} ${styles.background} p-5 space-y-2`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{styles.icon}</div>
        <div>
          <h4 className={`font-bold ${styles.title}`}>{styles.heading}</h4>
          {verification.channelTitle && (
            <p className="mt-0.5 text-xs text-slate-400">
              {verification.channelTitle}{verification.handle ? ` (${verification.handle})` : ''}
            </p>
          )}
        </div>
      </div>
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-8">{verification.message}</p>
      <p className="text-[10px] uppercase tracking-wider text-slate-600 pl-8">
        Owner-authorized source: YouTube Analytics API · Checked {new Date(verification.checkedAt).toLocaleString()}
      </p>
    </div>
  );
}
