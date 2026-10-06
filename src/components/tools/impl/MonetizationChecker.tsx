'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { buildPublicMonetizationReport } from '@/lib/monetization-public-report';
import { ToolEstimateNotice } from '@/components/ui/ToolEstimateNotice';
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
  publishedAt: string;
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
  publishedAt: string;
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
      answerClass: 'text-emerald-600 dark:text-emerald-400',
    };
  }
  if (verificationMatchesResult && verification?.status === 'not_monetized') {
    return {
      question: 'Is this channel monetized (YPP monetary access)?',
      answer: 'No — owner verification shows no monetary Analytics access (typical for non-YPP channels).',
      answerClass: 'text-rose-600 dark:text-rose-400',
    };
  }
  if (verificationMatchesResult && verification?.status === 'channel_mismatch') {
    return {
      question: 'Is this channel monetized (YPP monetary access)?',
      answer: 'Not determined — connect the Google account that owns this channel.',
      answerClass: 'text-amber-600 dark:text-amber-400',
    };
  }
  return {
    question: 'Is this channel monetized (YPP / AdSense)?',
    answer:
      'No official public answer. See the inferred monetization report above (labeled non-official). Channel owners can verify below with Google + YouTube Analytics.',
    answerClass: 'text-amber-700 dark:text-amber-300',
    audience: 'visitor' as const,
  };
}

function inferredStatusStyles(tier: ReturnType<typeof buildPublicMonetizationReport>['inferredTier']) {
  switch (tier) {
    case 'likely':
      return {
        border: 'border-emerald-500/35',
        bg: 'bg-emerald-500/5 dark:bg-emerald-950/20',
        badge: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
        title: 'text-emerald-700 dark:text-emerald-300',
      };
    case 'possible':
      return {
        border: 'border-amber-500/35',
        bg: 'bg-amber-500/5 dark:bg-amber-950/15',
        badge: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
        title: 'text-amber-700 dark:text-amber-300',
      };
    case 'unlikely':
      return {
        border: 'border-[#e5e5e5] dark:border-[#272727]',
        bg: 'bg-[#f9f9f9] dark:bg-[#181818]',
        badge: 'bg-[#f2f2f2] dark:bg-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1] border-[#e5e5e5] dark:border-[#272727]',
        title: 'text-[#0f0f0f] dark:text-[#f1f1f1]',
      };
    case 'below_thresholds':
      return {
        border: 'border-rose-500/35',
        bg: 'bg-rose-500/5 dark:bg-rose-950/15',
        badge: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30',
        title: 'text-rose-700 dark:text-rose-300',
      };
  }
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
        publishedAt: d.publishedAt,
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

    const inferredLine =
      publicReport && !verificationMatchesResult
        ? `Inferred status (non-official): ${publicReport.headline}`
        : '';

    navigator.clipboard.writeText(
      `YouTube monetization report for ${result.channelTitle} (${result.handle})
Channel ID: ${result.channelId}
Subscribers: ${formatNumber(result.subscriberCount)}
500-subscriber expanded YPP signal: ${result.expandedYppSubscriberThresholdMet ? 'Met' : 'Not met'}
1,000-subscriber full YPP subscriber signal: ${result.fullYppSubscriberThresholdMet ? 'Met' : 'Not met'}
${inferredLine}
${ownerStatus}
Source: youtubefreetoolkit.com — inferred rows are estimates, not YouTube confirmation.`
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
  const publicReport = useMemo(
    () =>
      result
        ? buildPublicMonetizationReport({
            subscriberCount: result.subscriberCount,
            viewCount: result.viewCount,
            videoCount: result.videoCount,
            publishedAt: result.publishedAt,
          })
        : null,
    [result]
  );

  return (
    <div className="space-y-6">
      <form onSubmit={handleCheck} className="space-y-3">
        <label className="block text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          Enter YouTube Channel URL, Handle (@name), or Video Link
        </label>
        <div className={toolFormRowClass}>
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#606060] dark:text-[#aaaaaa]" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="e.g. https://www.youtube.com/@MrBeast or @mkbhd"
              className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#0f0f0f] px-4 py-3 pl-11 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#606060] dark:placeholder-[#aaaaaa] focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000]"
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
          <span className="text-xs text-[#606060] dark:text-[#aaaaaa]">Quick test:</span>
          {PRESET_CHANNELS.map((preset) => (
            <button
              key={preset.handle}
              type="button"
              onClick={() => selectPreset(preset.handle)}
              className="rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 text-xs font-medium text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000] hover:bg-[#e5e5e5] dark:hover:bg-[#383838] transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </form>

      <div className="rounded-xl border border-blue-500/25 bg-blue-500/5 dark:bg-blue-950/20 p-4 text-xs text-[#0f0f0f] dark:text-[#f1f1f1] leading-relaxed">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
          <p>
            <strong className="text-blue-700 dark:text-blue-300">Most visitors are not the channel owner.</strong> We show inferred monetization
            likelihood and illustrative revenue from public stats — always labeled non-official. That is not the same as
            YouTube Studio confirmation.
            The Google sign-in step is <strong className="text-blue-700 dark:text-blue-300">only for the person who owns that channel</strong>{' '}
            and does not reveal another creator’s monetization status to you.
          </p>
        </div>
      </div>

      <section className="space-y-2" aria-labelledby="visitor-faq-heading">
        <h2 id="visitor-faq-heading" className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          Not the owner? Read this first
        </h2>
        <div className="space-y-2">
          {VISITOR_FAQS.map((faq) => (
            <details
              key={faq.question}
              className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-4 py-3"
            >
              <summary className="cursor-pointer text-sm font-medium text-[#0f0f0f] dark:text-[#f1f1f1] list-none">
                {faq.question}
              </summary>
              <p className="mt-2 text-xs text-[#606060] dark:text-[#aaaaaa] leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {verificationLoading && (
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 dark:bg-blue-950/30 p-4 text-sm text-blue-700 dark:text-blue-200 flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin shrink-0 text-blue-600 dark:text-blue-400" />
          <span>Loading your owner verification result…</span>
        </div>
      )}

      {displayedVerificationError && (
        <div className="rounded-xl border border-amber-500/35 bg-amber-500/10 dark:bg-amber-950/30 p-4 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <span>{displayedVerificationError}</span>
        </div>
      )}

      {verification && !result && (
        <OwnerVerificationBanner verification={verification} />
      )}

      {error && (
        <div className="rounded-xl border border-rose-500/35 bg-rose-500/10 dark:bg-rose-950/30 p-4 text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading && (
        <div className="min-h-40 rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-8 text-center space-y-3 animate-pulse">
          <Loader2 className="h-8 w-8 animate-spin text-[#ff0000] mx-auto" />
          <p className="text-sm font-medium text-[#0f0f0f] dark:text-[#f1f1f1]">Fetching public channel data from YouTube...</p>
        </div>
      )}

      {result && (
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e5e5] dark:border-[#272727] pb-5">
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
                  className="h-14 w-14 rounded-full border border-[#e5e5e5] dark:border-[#272727] object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f2f2f2] dark:bg-[#272727] text-[#ff0000] font-bold text-xl border border-[#e5e5e5] dark:border-[#272727]">
                  {result.channelTitle.charAt(0)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-black text-[#0f0f0f] dark:text-[#f1f1f1]">{result.channelTitle}</h3>
                  <span className="text-xs text-[#606060] dark:text-[#aaaaaa] font-mono">{result.handle}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {result.fullYppSubscriberThresholdMet ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      1K subscriber signal met
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-2.5 py-0.5 text-xs font-semibold text-[#606060] dark:text-[#aaaaaa] border border-[#e5e5e5] dark:border-[#272727]">
                      <XCircle className="h-3.5 w-3.5" />
                      Below 1K subscriber signal
                    </span>
                  )}
                  <span className="rounded bg-[#f2f2f2] dark:bg-[#272727] px-2 py-0.5 text-[10px] text-[#606060] dark:text-[#aaaaaa] font-mono">
                    {result.channelId}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={copyResult}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-[#f2f2f2] dark:bg-[#272727] px-4 py-2 text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#e5e5e5] dark:hover:bg-[#383838] transition-colors cursor-pointer shrink-0"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied' : 'Copy summary'}</span>
            </button>
          </div>

          {publicReport && !verificationMatchesResult && (
            <InferredMonetizationReport report={publicReport} />
          )}

          {publicReport && verificationMatchesResult && (
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#212121] p-3 text-xs text-[#606060] dark:text-[#aaaaaa]">
              Public inference is hidden because owner verification below is the official result for this channel.
            </div>
          )}

          {monetizationAnswer && publicEligibility && (
            <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#212121] p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#606060] dark:text-[#aaaaaa]">Status summary</h4>
              <div>
                <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">{monetizationAnswer.question}</p>
                <p className={`mt-1.5 text-sm font-bold leading-relaxed ${monetizationAnswer.answerClass}`}>
                  {monetizationAnswer.answer}
                </p>
              </div>
              <div className="border-t border-[#e5e5e5] dark:border-[#272727] pt-4">
                <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">Public eligibility signals (not enrollment)</p>
                <p
                  className={`mt-1.5 text-sm leading-relaxed ${
                    publicEligibility.tone === 'positive'
                      ? 'text-emerald-700 dark:text-emerald-400 font-medium'
                      : publicEligibility.tone === 'partial'
                        ? 'text-amber-700 dark:text-amber-300 font-medium'
                        : 'text-[#606060] dark:text-[#aaaaaa]'
                  }`}
                >
                  {publicEligibility.text}
                </p>
                <p className="mt-2 text-xs text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
                  Watch hours, Shorts views, policy review, and AdSense linkage are not visible on a public lookup.
                </p>
              </div>
              {!verificationMatchesResult && (
                <div className="border-t border-[#e5e5e5] dark:border-[#272727] pt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#606060] dark:text-[#aaaaaa]">Checking someone else&apos;s channel?</p>
                    <ul className="mt-2 space-y-1.5 text-xs text-[#606060] dark:text-[#aaaaaa] leading-relaxed list-disc pl-4">
                      <li>You get public stats and subscriber-based YPP <em>signals</em> only.</li>
                      <li>You <strong className="text-[#0f0f0f] dark:text-[#f1f1f1]">cannot</strong> see if they are monetized — YouTube keeps that private.</li>
                      <li>Ads on their videos do not prove they are in YPP.</li>
                      <li>Do not use “Verify” unless you manage this channel; signing in with your Google account will not show their revenue status.</li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 dark:bg-emerald-950/20 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Checking your own channel?</p>
                    <ul className="mt-2 space-y-1.5 text-xs text-[#0f0f0f] dark:text-[#f1f1f1] leading-relaxed list-disc pl-4">
                      <li>Use <strong className="text-[#0f0f0f] dark:text-white">Verify Exact Monetization Status</strong> below with the Google account tied to this channel.</li>
                      <li>That optional step returns a yes/no on official monetary Analytics access.</li>
                      <li>Final decisions always appear in{' '}
                        <a
                          href="https://studio.youtube.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-emerald-600 dark:hover:text-emerald-300"
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#212121] p-3.5">
              <span className="text-[11px] font-medium text-[#606060] dark:text-[#aaaaaa]">Subscribers</span>
              <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mt-1 font-mono">{formatNumber(result.subscriberCount)}</p>
            </div>
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#212121] p-3.5">
              <span className="text-[11px] font-medium text-[#606060] dark:text-[#aaaaaa]">Lifetime views</span>
              <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mt-1 font-mono">{formatNumber(result.viewCount)}</p>
            </div>
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#212121] p-3.5">
              <span className="text-[11px] font-medium text-[#606060] dark:text-[#aaaaaa]">Public videos</span>
              <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mt-1 font-mono">{formatNumber(result.videoCount)}</p>
            </div>
            {publicReport && (
              <>
                <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#212121] p-3.5">
                  <span className="text-[11px] font-medium text-[#606060] dark:text-[#aaaaaa]">Joined</span>
                  <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mt-1">{publicReport.joinedDateLabel}</p>
                </div>
                <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#212121] p-3.5">
                  <span className="text-[11px] font-medium text-[#606060] dark:text-[#aaaaaa]">Channel age</span>
                  <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mt-1">
                    ~{publicReport.channelAgeYears} yr{publicReport.channelAgeYears === 1 ? '' : 's'}
                  </p>
                </div>
                <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#212121] p-3.5">
                  <span className="text-[11px] font-medium text-[#606060] dark:text-[#aaaaaa]">Avg views / video</span>
                  <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mt-1 font-mono">
                    {formatNumber(Math.round(publicReport.avgViewsPerVideo))}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#212121] p-4">
              <span className="text-[11px] uppercase tracking-wider text-[#606060] dark:text-[#aaaaaa] font-semibold">Expanded YPP subscriber signal</span>
              <p className={`mt-2 text-sm font-bold ${result.expandedYppSubscriberThresholdMet ? 'text-emerald-700 dark:text-emerald-400' : 'text-[#606060] dark:text-[#aaaaaa]'}`}>
                {result.expandedYppSubscriberThresholdMet ? '500 subscriber threshold met' : 'Below 500 subscribers'}
              </p>
            </div>
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#212121] p-4">
              <span className="text-[11px] uppercase tracking-wider text-[#606060] dark:text-[#aaaaaa] font-semibold">Full YPP subscriber signal</span>
              <p className={`mt-2 text-sm font-bold ${result.fullYppSubscriberThresholdMet ? 'text-emerald-700 dark:text-emerald-400' : 'text-[#606060] dark:text-[#aaaaaa]'}`}>
                {result.fullYppSubscriberThresholdMet ? '1,000 subscriber threshold met' : 'Below 1,000 subscribers'}
              </p>
            </div>
            <div
              className={`rounded-xl border p-4 ${
                ownerCard.tone === 'positive'
                  ? 'border-emerald-500/35 bg-emerald-500/5 dark:bg-emerald-950/20'
                  : ownerCard.tone === 'negative'
                    ? 'border-rose-500/35 bg-rose-500/5 dark:bg-rose-950/20'
                    : ownerCard.tone === 'warning'
                      ? 'border-amber-500/35 bg-amber-500/5 dark:bg-amber-950/20'
                      : 'border-blue-500/30 bg-blue-500/5 dark:bg-blue-950/15'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider text-[#606060] dark:text-[#aaaaaa] font-semibold">
                Official YPP enrollment (owner check)
              </span>
              <p
                className={`mt-2 text-sm font-bold ${
                  ownerCard.tone === 'positive'
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : ownerCard.tone === 'negative'
                      ? 'text-rose-700 dark:text-rose-400'
                      : ownerCard.tone === 'warning'
                        ? 'text-amber-700 dark:text-amber-400'
                        : 'text-blue-700 dark:text-blue-300'
                }`}
              >
                {ownerCard.headline}
              </p>
              <p className="mt-1.5 text-xs text-[#606060] dark:text-[#aaaaaa] leading-relaxed">{ownerCard.detail}</p>
            </div>
          </div>

          {verificationMatchesResult && verification ? (
            <OwnerVerificationBanner verification={verification} />
          ) : (
            <div className="rounded-2xl border border-dashed border-emerald-500/35 bg-emerald-500/5 dark:bg-emerald-950/15 p-5 sm:p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-emerald-500/15 p-2.5 border border-emerald-500/25">
                  <LockKeyhole className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Channel owners only</p>
                  <h4 className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
                    Verify your monetization (not available for other creators)
                  </h4>
                  <p className="text-xs sm:text-sm text-[#0f0f0f] dark:text-[#f1f1f1] leading-relaxed">
                    If you <strong>do not</strong> own {result.channelTitle}, skip this section — verification will not
                    tell you whether they are monetized. Owners can sign in once with the Google account linked to this
                    channel for a read-only yes/no on YouTube Analytics monetary access.
                  </p>
                </div>
              </div>

              <a
                href={`/api/youtube/monetization/start?channelId=${encodeURIComponent(result.channelId)}`}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4" />
                Verify Exact Monetization Status
              </a>

              <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa] leading-relaxed">
                Optional owner-only verification. We do not receive your Google password and the verification code does not store your access token in a site database. By continuing, you agree to our{' '}
                <Link href="/privacy" className="text-[#0f0f0f] dark:text-[#f1f1f1] underline hover:text-[#ff0000]">Privacy Policy</Link>,{' '}
                <Link href="/terms" className="text-[#0f0f0f] dark:text-[#f1f1f1] underline hover:text-[#ff0000]">Terms</Link>, and the{' '}
                <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="text-[#0f0f0f] dark:text-[#f1f1f1] underline hover:text-[#ff0000]">
                  YouTube Terms of Service <ExternalLink className="inline h-3 w-3" />
                </a>.
              </p>
            </div>
          )}

          <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 dark:bg-amber-950/20 p-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-2">
              <Info className="h-3.5 w-3.5" />
              Public-check transparency
            </h4>
            <p className="text-xs text-[#0f0f0f] dark:text-[#f1f1f1] leading-relaxed">{result.monetizationDisclaimer}</p>
            <ul className="space-y-1.5 text-xs text-[#606060] dark:text-[#aaaaaa] pt-1">
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

function InferredMonetizationReport({
  report,
}: {
  report: ReturnType<typeof buildPublicMonetizationReport>;
}) {
  const styles = inferredStatusStyles(report.inferredTier);

  return (
    <section className={`rounded-2xl border ${styles.border} ${styles.bg} p-5 sm:p-6 space-y-5`} aria-labelledby="inferred-report-heading">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles.badge}`}
          >
            Inferred · Not official YPP status
          </span>
          <h2 id="inferred-report-heading" className={`text-lg sm:text-xl font-black ${styles.title}`}>
            {report.headline}
          </h2>
          <p className="text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] leading-relaxed max-w-3xl">
            {report.subheadline}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 space-y-4">
        <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Estimated revenue matrix</h3>
        <div className="overflow-x-auto -mx-1">
          <table className="w-full min-w-[320px] text-xs sm:text-sm">
            <thead>
              <tr className="text-left text-[#606060] dark:text-[#aaaaaa] border-b border-[#e5e5e5] dark:border-[#272727]">
                <th className="py-2 pr-3 font-semibold">Metric</th>
                <th className="py-2 px-2 font-semibold">Daily</th>
                <th className="py-2 px-2 font-semibold">Monthly</th>
                <th className="py-2 pl-2 font-semibold">Yearly</th>
              </tr>
            </thead>
            <tbody className="text-[#0f0f0f] dark:text-[#f1f1f1]">
              {report.revenueRows.map((row) => (
                <tr key={row.label} className="border-b border-[#e5e5e5]/60 dark:border-[#272727]/60">
                  <td className="py-2.5 pr-3 text-[#606060] dark:text-[#aaaaaa]">{row.label}</td>
                  <td className="py-2.5 px-2 font-mono">{formatCurrency(row.daily)}</td>
                  <td className="py-2.5 px-2 font-mono">{formatCurrency(row.monthly)}</td>
                  <td className="py-2.5 pl-2 font-mono">{formatCurrency(row.yearly)}</td>
                </tr>
              ))}
              <tr>
                <td className="py-2.5 pr-3 text-[#606060] dark:text-[#aaaaaa]">Est. views (lifetime ÷ age)</td>
                <td className="py-2.5 px-2 font-mono">{formatNumber(Math.round(report.estimatedViewsRow.daily))}</td>
                <td className="py-2.5 px-2 font-mono">{formatNumber(Math.round(report.estimatedViewsRow.monthly))}</td>
                <td className="py-2.5 pl-2 font-mono">{formatNumber(Math.round(report.estimatedViewsRow.yearly))}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ToolEstimateNotice>{report.revenueAssumptions}</ToolEstimateNotice>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] mb-3">Key insights (public data)</h3>
        <ul className="space-y-2">
          {report.insights.map((item) => (
            <li
              key={item.text}
              className={`flex gap-2 text-xs sm:text-sm leading-relaxed ${
                item.tone === 'positive'
                  ? 'text-emerald-700 dark:text-emerald-300'
                  : item.tone === 'warning'
                    ? 'text-amber-700 dark:text-amber-300'
                    : 'text-[#606060] dark:text-[#aaaaaa]'
              }`}
            >
              <span className="shrink-0 font-bold" aria-hidden>
                {item.tone === 'positive' ? '✓' : item.tone === 'warning' ? '!' : 'ℹ'}
              </span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa] leading-relaxed border-t border-[#e5e5e5] dark:border-[#272727] pt-3">
        {report.disclaimer}
      </p>
    </section>
  );
}

function OwnerVerificationBanner({ verification }: { verification: OwnerVerificationResult }) {
  const styles = {
    monetized: {
      border: 'border-emerald-500/35',
      background: 'bg-emerald-500/10 dark:bg-emerald-950/20',
      title: 'text-emerald-700 dark:text-emerald-300',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
      heading: 'Monetization verified by channel owner',
    },
    not_monetized: {
      border: 'border-rose-500/35',
      background: 'bg-rose-500/10 dark:bg-rose-950/20',
      title: 'text-rose-700 dark:text-rose-300',
      icon: <XCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />,
      heading: 'Channel is not currently verified as monetized',
    },
    channel_mismatch: {
      border: 'border-amber-500/35',
      background: 'bg-amber-500/10 dark:bg-amber-950/20',
      title: 'text-amber-700 dark:text-amber-300',
      icon: <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
      heading: 'Connected account does not own the checked channel',
    },
    error: {
      border: 'border-[#e5e5e5] dark:border-[#272727]',
      background: 'bg-[#f9f9f9] dark:bg-[#181818]',
      title: 'text-[#0f0f0f] dark:text-[#f1f1f1]',
      icon: <AlertCircle className="h-5 w-5 text-[#606060] dark:text-[#aaaaaa]" />,
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
            <p className="mt-0.5 text-xs text-[#606060] dark:text-[#aaaaaa]">
              {verification.channelTitle}{verification.handle ? ` (${verification.handle})` : ''}
            </p>
          )}
        </div>
      </div>
      <p className="text-xs sm:text-sm text-[#0f0f0f] dark:text-[#f1f1f1] leading-relaxed pl-8">{verification.message}</p>
      <p className="text-[10px] uppercase tracking-wider text-[#606060] dark:text-[#aaaaaa] pl-8">
        Owner-authorized source: YouTube Analytics API · Checked {new Date(verification.checkedAt).toLocaleString()}
      </p>
    </div>
  );
}
