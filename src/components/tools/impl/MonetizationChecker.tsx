'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { toolFormRowClass } from '@/lib/tool-ui';
import { fetchYouTubeChannel, parseApiJson } from '@/lib/api-client';
import {
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

const VISITOR_FAQS = [
  {
    question: 'I’m not the channel owner — what can I learn?',
    answer:
      'Public stats and unofficial subscriber-based YPP signals only. You cannot confirm whether another creator is monetized or in YPP. Ads on their videos are not proof of creator revenue.',
  },
  {
    question: 'Should I click “Verify” if I’m checking someone else’s channel?',
    answer:
      'No. Verification is only for the Google account that owns the channel you entered. It will not show you another creator’s monetization status.',
  },
  {
    question: 'What can the channel owner see after verifying?',
    answer:
      'Owners who sign in with the correct Google account get a yes/no on official YouTube Analytics monetary-metric access for that channel. Everyone else should use YouTube Studio for their own channel.',
  },
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

function publicEligibilityLine(result: MonetizationResult) {
  if (result.fullYppSubscriberThresholdMet) {
    return {
      text: 'Public count meets the 1,000-subscriber signal used for full YPP ad-revenue eligibility.',
      tone: 'positive' as const,
    };
  }
  if (result.expandedYppSubscriberThresholdMet) {
    return {
      text: 'Public count meets the 500-subscriber expanded YPP signal, but not the 1,000-subscriber full ad-revenue signal.',
      tone: 'partial' as const,
    };
  }
  return {
    text: 'Public count is below the 500-subscriber YPP threshold signals.',
    tone: 'low' as const,
  };
}

function ownerStatusCardCopy(
  verificationMatchesResult: boolean,
  verification: OwnerVerificationResult | null
) {
  if (!verificationMatchesResult || !verification) {
    return {
      headline: 'Hidden from public viewers',
      detail:
        'YouTube does not publish another creator’s YPP or AdSense enrollment. Only the channel owner can run an official check (button below).',
      tone: 'pending' as const,
    };
  }
  switch (verification.status) {
    case 'monetized':
      return {
        headline: 'Monetized — owner verified',
        detail: 'Connected account owns this channel and YouTube Analytics returned monetary-metric access.',
        tone: 'positive' as const,
      };
    case 'not_monetized':
      return {
        headline: 'Not monetized — owner verified',
        detail: 'Owner account confirmed; YouTube Analytics monetary access is not available for this channel.',
        tone: 'negative' as const,
      };
    case 'channel_mismatch':
      return {
        headline: 'Wrong Google account',
        detail: 'The signed-in account does not own the channel you checked. Sign in with the channel owner account.',
        tone: 'warning' as const,
      };
    default:
      return {
        headline: 'Verification incomplete',
        detail: verification.message,
        tone: 'warning' as const,
      };
  }
}

function monetizationAnswerLine(
  verificationMatchesResult: boolean,
  verification: OwnerVerificationResult | null
) {
  if (verificationMatchesResult && verification?.status === 'monetized') {
    return {
      question: 'Is this channel monetized (YPP monetary access)?',
      answer: 'Yes — confirmed by the channel owner via YouTube Analytics.',
      answerClass: 'text-emerald-400',
    };
  }
  if (verificationMatchesResult && verification?.status === 'not_monetized') {
    return {
      question: 'Is this channel monetized (YPP monetary access)?',
      answer: 'No — owner verification shows no monetary Analytics access (typical for non-YPP channels).',
      answerClass: 'text-rose-300',
    };
  }
  if (verificationMatchesResult && verification?.status === 'channel_mismatch') {
    return {
      question: 'Is this channel monetized (YPP monetary access)?',
      answer: 'Not determined — connect the Google account that owns this channel.',
      answerClass: 'text-amber-300',
    };
  }
  return {
    question: 'Is this channel monetized (YPP / AdSense)?',
    answer:
      'No public answer for this lookup. Unless you are the channel owner and complete verification below, this tool cannot confirm monetization — only public eligibility signals (above).',
    answerClass: 'text-amber-200',
    audience: 'visitor' as const,
  };
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
      const res = await fetchYouTubeChannel(query);
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

  const publicEligibility = result ? publicEligibilityLine(result) : null;
  const ownerCard = ownerStatusCardCopy(verificationMatchesResult, verification);
  const monetizationAnswer = result
    ? monetizationAnswerLine(verificationMatchesResult, verification)
    : null;

  return (
    <div className="space-y-6">
      <form onSubmit={handleCheck} className="space-y-3">
        <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
          Enter YouTube Channel URL, Handle (@name), or Video Link
        </label>
        <div className={toolFormRowClass}>
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="e.g. https://www.youtube.com/@MrBeast or @mkbhd"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-3 pl-11 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              maxLength={300}
              required
            />
          </div>
          <ToolPrimaryButton
            type="submit"
            loading={loading}
            loadingLabel="Checking…"
            title="Uses public channel data — unofficial YPP eligibility signals, not official Partner Program status"
            className="sm:min-w-[11rem]"
          >
            <Search className="h-4 w-4" aria-hidden />
            <span>Check Monetization</span>
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

      <div className="rounded-xl border border-blue-500/20 bg-blue-950/10 p-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        <div className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
          <p>
            <strong className="text-blue-200">Most visitors are not the channel owner.</strong> For any public channel you
            can see subscriber counts and unofficial YPP threshold signals only — not whether they earn ad revenue.
            The Google sign-in step is <strong className="text-blue-200">only for the person who owns that channel</strong>{' '}
            and does not reveal another creator’s monetization status to you.
          </p>
        </div>
      </div>

      <section className="space-y-2" aria-labelledby="visitor-faq-heading">
        <h2 id="visitor-faq-heading" className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Not the owner? Read this first
        </h2>
        <div className="space-y-2">
          {VISITOR_FAQS.map((faq) => (
            <details
              key={faq.question}
              className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-4 py-3"
            >
              <summary className="cursor-pointer text-sm font-medium text-slate-800 dark:text-slate-200 list-none">
                {faq.question}
              </summary>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {verificationLoading && (
        <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-4 text-sm text-blue-200 flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
          <span>Loading your owner verification result…</span>
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
        <div className="min-h-40 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-8 text-center space-y-3 animate-pulse">
          <Loader2 className="h-8 w-8 animate-spin text-red-500 mx-auto" />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Fetching public channel data from YouTube...</p>
        </div>
      )}

      {result && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
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
                  className="h-14 w-14 rounded-2xl border border-slate-300 dark:border-slate-700 object-cover shadow-md"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 dark:bg-slate-800 text-red-400 font-bold text-xl border border-slate-300 dark:border-slate-700">
                  {result.channelTitle.charAt(0)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">{result.channelTitle}</h3>
                  <span className="text-xs text-slate-400 font-mono">{result.handle}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {result.fullYppSubscriberThresholdMet ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      1K subscriber signal met
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-500/15 px-2.5 py-0.5 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-600/40">
                      <XCircle className="h-3.5 w-3.5" />
                      Below 1K subscriber signal
                    </span>
                  )}
                  <span className="rounded bg-slate-200 dark:bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400 font-mono">
                    {result.channelId}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={copyResult}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-900 dark:text-white transition-all cursor-pointer shrink-0"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied' : 'Copy summary'}</span>
            </button>
          </div>

          {monetizationAnswer && publicEligibility && (
            <div className="rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/90 p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Status summary</h4>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{monetizationAnswer.question}</p>
                <p className={`mt-1.5 text-sm font-bold leading-relaxed ${monetizationAnswer.answerClass}`}>
                  {monetizationAnswer.answer}
                </p>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Public eligibility signals (not enrollment)</p>
                <p
                  className={`mt-1.5 text-sm leading-relaxed ${
                    publicEligibility.tone === 'positive'
                      ? 'text-emerald-400 font-medium'
                      : publicEligibility.tone === 'partial'
                        ? 'text-amber-300 font-medium'
                        : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {publicEligibility.text}
                </p>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Watch hours, Shorts views, policy review, and AdSense linkage are not visible on a public lookup.
                </p>
              </div>
              {!verificationMatchesResult && (
                <div className="border-t border-slate-200 dark:border-slate-800 pt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Checking someone else&apos;s channel?</p>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed list-disc pl-4">
                      <li>You get public stats and subscriber-based YPP <em>signals</em> only.</li>
                      <li>You <strong className="text-slate-800 dark:text-slate-200">cannot</strong> see if they are monetized — YouTube keeps that private.</li>
                      <li>Ads on their videos do not prove they are in YPP.</li>
                      <li>Do not use “Verify” unless you manage this channel; signing in with your Google account will not show their revenue status.</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/10 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-300/90">Checking your own channel?</p>
                    <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed list-disc pl-4">
                      <li>Use <strong className="text-slate-800 dark:text-slate-100">Verify Exact Monetization Status</strong> below with the Google account tied to this channel.</li>
                      <li>That optional step returns a yes/no on official monetary Analytics access.</li>
                      <li>Final decisions always appear in{' '}
                        <a
                          href="https://studio.youtube.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-emerald-200"
                        >
                          YouTube Studio
                        </a>
                        .
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/60 p-3.5">
              <span className="text-[11px] font-medium text-slate-400">Subscribers</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 font-mono">{formatNumber(result.subscriberCount)}</p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/60 p-3.5">
              <span className="text-[11px] font-medium text-slate-400">Lifetime views</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 font-mono">{formatNumber(result.viewCount)}</p>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/60 p-3.5">
              <span className="text-[11px] font-medium text-slate-400">Public videos</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white mt-1 font-mono">{formatNumber(result.videoCount)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-100 dark:bg-slate-900/80 p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Expanded YPP subscriber signal</span>
              <p className={`mt-2 text-sm font-bold ${result.expandedYppSubscriberThresholdMet ? 'text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                {result.expandedYppSubscriberThresholdMet ? '500 subscriber threshold met' : 'Below 500 subscribers'}
              </p>
            </div>
            <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-100 dark:bg-slate-900/80 p-4">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">Full YPP subscriber signal</span>
              <p className={`mt-2 text-sm font-bold ${result.fullYppSubscriberThresholdMet ? 'text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                {result.fullYppSubscriberThresholdMet ? '1,000 subscriber threshold met' : 'Below 1,000 subscribers'}
              </p>
            </div>
            <div
              className={`rounded-xl border p-4 ${
                ownerCard.tone === 'positive'
                  ? 'border-emerald-500/35 bg-emerald-950/15'
                  : ownerCard.tone === 'negative'
                    ? 'border-rose-500/35 bg-rose-950/15'
                    : ownerCard.tone === 'warning'
                      ? 'border-amber-500/35 bg-amber-950/15'
                      : 'border-blue-500/30 bg-blue-950/10'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                Official YPP enrollment (owner check)
              </span>
              <p
                className={`mt-2 text-sm font-bold ${
                  ownerCard.tone === 'positive'
                    ? 'text-emerald-400'
                    : ownerCard.tone === 'negative'
                      ? 'text-rose-300'
                      : ownerCard.tone === 'warning'
                        ? 'text-amber-300'
                        : 'text-amber-200'
                }`}
              >
                {ownerCard.headline}
              </p>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{ownerCard.detail}</p>
            </div>
          </div>

          {verificationMatchesResult && verification ? (
            <OwnerVerificationBanner verification={verification} />
          ) : (
            <div className="rounded-2xl border border-dashed border-emerald-500/35 bg-emerald-950/10 p-5 sm:p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-500/10 p-2.5 border border-emerald-500/20">
                  <LockKeyhole className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Channel owners only</p>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Verify your monetization (not available for other creators)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    If you <strong>do not</strong> own {result.channelTitle}, skip this section — verification will not
                    tell you whether they are monetized. Owners can sign in once with the Google account linked to this
                    channel for a read-only yes/no on YouTube Analytics monetary access.
                  </p>
                </div>
              </div>

              <a
                href={`/api/youtube/monetization/start?channelId=${encodeURIComponent(result.channelId)}`}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-slate-900 dark:text-white hover:bg-emerald-500 transition-colors cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4" />
                Verify Exact Monetization Status
              </a>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Optional owner-only verification. We do not receive your Google password and the verification code does not store your access token in a site database. By continuing, you agree to our{' '}
                <Link href="/privacy" className="text-slate-700 dark:text-slate-300 underline hover:text-slate-900 dark:hover:text-slate-900 dark:text-white">Privacy Policy</Link>,{' '}
                <Link href="/terms" className="text-slate-700 dark:text-slate-300 underline hover:text-slate-900 dark:hover:text-slate-900 dark:text-white">Terms</Link>, and the{' '}
                <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="text-slate-700 dark:text-slate-300 underline hover:text-slate-900 dark:hover:text-slate-900 dark:text-white">
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
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{result.monetizationDisclaimer}</p>
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
      background: 'bg-white dark:bg-slate-100 dark:bg-slate-900/80',
      title: 'text-slate-800 dark:text-slate-200',
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
      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-8">{verification.message}</p>
      <p className="text-[10px] uppercase tracking-wider text-slate-600 pl-8">
        Owner-authorized source: YouTube Analytics API · Checked {new Date(verification.checkedAt).toLocaleString()}
      </p>
    </div>
  );
}
