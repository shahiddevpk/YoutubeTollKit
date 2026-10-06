import { EXPANDED_YPP_SUBSCRIBER_THRESHOLD, FULL_YPP_SUBSCRIBER_THRESHOLD } from '@/lib/youtube-data';

export type InferredMonetizationTier = 'likely' | 'possible' | 'unlikely' | 'below_thresholds';

export interface PublicMonetizationReportInput {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  publishedAt: string;
}

export interface RevenueScenarioRow {
  label: string;
  daily: number;
  monthly: number;
  yearly: number;
}

export interface PublicMonetizationReport {
  inferredTier: InferredMonetizationTier;
  headline: string;
  subheadline: string;
  channelAgeYears: number;
  channelAgeMonths: number;
  joinedDateLabel: string;
  avgViewsPerVideo: number;
  viewsPerSubscriber: number;
  uploadsPerMonth: number;
  growthStage: string;
  insights: { tone: 'positive' | 'info' | 'warning'; text: string }[];
  estimatedDailyViews: number;
  revenueAssumptions: string;
  revenueRows: RevenueScenarioRow[];
  estimatedViewsRow: { daily: number; monthly: number; yearly: number };
  disclaimer: string;
}

const RPM_LOW = 2;
const RPM_MID = 5;
const RPM_HIGH = 10;

function channelAgeDays(publishedAt: string, now = Date.now()) {
  const created = Date.parse(publishedAt);
  if (!Number.isFinite(created)) return 365;
  return Math.max(30, Math.floor((now - created) / (1000 * 60 * 60 * 24)));
}

function formatJoinedDate(publishedAt: string) {
  const date = new Date(publishedAt);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

function inferTier(input: PublicMonetizationReportInput): InferredMonetizationTier {
  const { subscriberCount, viewCount, videoCount } = input;
  const safeVideos = Math.max(videoCount, 1);
  const avgViews = viewCount / safeVideos;

  if (subscriberCount < EXPANDED_YPP_SUBSCRIBER_THRESHOLD) {
    return 'below_thresholds';
  }

  if (subscriberCount >= FULL_YPP_SUBSCRIBER_THRESHOLD) {
    const substantialLibrary = videoCount >= 3 && viewCount >= 100_000;
    const strongEngagement = avgViews >= 5_000 || viewCount / Math.max(subscriberCount, 1) >= 20;
    if (substantialLibrary && strongEngagement) return 'likely';
    if (viewCount >= 10_000) return 'possible';
    return 'unlikely';
  }

  if (viewCount >= 50_000 && avgViews >= 2_000) return 'possible';
  return 'unlikely';
}

function tierCopy(tier: InferredMonetizationTier): { headline: string; subheadline: string } {
  switch (tier) {
    case 'likely':
      return {
        headline: 'Likely monetized (inferred)',
        subheadline:
          'Public stats match patterns common among established Partner Program channels. This is not confirmation from YouTube — only Studio or owner verification proves enrollment.',
      };
    case 'possible':
      return {
        headline: 'Possible monetization / expanded-tier signals',
        subheadline:
          'The channel meets some public YPP-style thresholds, but watch hours, Shorts views, policy review, and actual YPP status are not visible in public data.',
      };
    case 'unlikely':
      return {
        headline: 'Weak public monetization signals',
        subheadline:
          'Subscriber or view patterns alone do not strongly suggest full ad-revenue monetization. The channel may still use fan funding or be in review.',
      };
    case 'below_thresholds':
      return {
        headline: 'Below common public YPP subscriber thresholds',
        subheadline:
          'Fewer than 500 public subscribers on this lookup. That does not prove zero revenue (Shorts fund, sponsorships, etc.), but full YPP ad sharing is less likely from public proxies alone.',
      };
  }
}

function growthStage(subscriberCount: number, viewCount: number): string {
  if (subscriberCount >= 1_000_000 || viewCount >= 100_000_000) return 'Established';
  if (subscriberCount >= 10_000 || viewCount >= 1_000_000) return 'Growing';
  if (subscriberCount >= 1_000) return 'Emerging';
  return 'Early';
}

function buildInsights(
  input: PublicMonetizationReportInput,
  tier: InferredMonetizationTier,
  channelAgeYears: number,
  avgViewsPerVideo: number,
  uploadsPerMonth: number,
  viewsPerSubscriber: number,
  growthStageLabel: string
): PublicMonetizationReport['insights'] {
  const items: PublicMonetizationReport['insights'] = [
    { tone: 'info', text: `Channel age: about ${channelAgeYears} year${channelAgeYears === 1 ? '' : 's'}` },
    {
      tone: 'info',
      text: `Average views per public video: ${Math.round(avgViewsPerVideo).toLocaleString('en-US')}`,
    },
  ];

  if (input.subscriberCount >= FULL_YPP_SUBSCRIBER_THRESHOLD && input.viewCount >= 100_000) {
    items.push({
      tone: 'positive',
      text: 'Meets typical YPP subscriber and lifetime-view proxies (1,000+ subscribers, substantial views).',
    });
  } else if (input.subscriberCount >= EXPANDED_YPP_SUBSCRIBER_THRESHOLD) {
    items.push({
      tone: 'info',
      text: 'Meets the 500-subscriber expanded-tier subscriber proxy; full ad-revenue tier usually requires 1,000+ subscribers plus watch time or Shorts views.',
    });
  }

  if (tier === 'likely') {
    items.push({
      tone: 'positive',
      text: 'Public monetization signals are strong — still not official YPP confirmation.',
    });
  } else if (tier === 'below_thresholds' || tier === 'unlikely') {
    items.push({
      tone: 'warning',
      text: 'Do not treat ads on videos as proof this creator earns revenue — YouTube may run platform ads on non-partner content.',
    });
  }

  if (uploadsPerMonth > 0) {
    items.push({
      tone: 'info',
      text: `Estimated upload frequency: ~${uploadsPerMonth.toFixed(1)} public videos per month.`,
    });
  }

  items.push({
    tone: 'info',
    text: `Views per subscriber (engagement proxy): ${Math.round(viewsPerSubscriber).toLocaleString('en-US')}.`,
  });
  items.push({ tone: 'info', text: `Growth stage (from public metrics): ${growthStageLabel}.` });

  return items;
}

function revenueRow(label: string, dailyViews: number, rpm: number): RevenueScenarioRow {
  const daily = (dailyViews / 1000) * rpm;
  return {
    label,
    daily,
    monthly: daily * 30,
    yearly: daily * 365,
  };
}

export function buildPublicMonetizationReport(input: PublicMonetizationReportInput): PublicMonetizationReport {
  const ageDays = channelAgeDays(input.publishedAt);
  const channelAgeYears = Math.max(1, Math.round(ageDays / 365));
  const channelAgeMonths = Math.max(1, Math.round(ageDays / 30));
  const safeVideos = Math.max(input.videoCount, 1);
  const avgViewsPerVideo = input.viewCount / safeVideos;
  const viewsPerSubscriber = input.viewCount / Math.max(input.subscriberCount, 1);
  const uploadsPerMonth = input.videoCount / channelAgeMonths;
  const growthStageLabel = growthStage(input.subscriberCount, input.viewCount);
  const inferredTier = inferTier(input);
  const { headline, subheadline } = tierCopy(inferredTier);

  const estimatedDailyViews = input.viewCount / ageDays;
  const estimatedViewsRow = {
    daily: estimatedDailyViews,
    monthly: estimatedDailyViews * 30,
    yearly: estimatedDailyViews * 365,
  };

  const revenueRows = [
    revenueRow('Estimated earnings (low RPM)', estimatedDailyViews, RPM_LOW),
    revenueRow('Estimated earnings (mid RPM)', estimatedDailyViews, RPM_MID),
    revenueRow('Estimated earnings (high RPM)', estimatedDailyViews, RPM_HIGH),
  ];

  const insights = buildInsights(
    input,
    inferredTier,
    channelAgeYears,
    avgViewsPerVideo,
    uploadsPerMonth,
    viewsPerSubscriber,
    growthStageLabel
  );

  return {
    inferredTier,
    headline,
    subheadline,
    channelAgeYears,
    channelAgeMonths,
    joinedDateLabel: formatJoinedDate(input.publishedAt),
    avgViewsPerVideo,
    viewsPerSubscriber,
    uploadsPerMonth,
    growthStage: growthStageLabel,
    insights,
    estimatedDailyViews,
    revenueAssumptions:
      'Illustrative RPM range $2–$10 per 1,000 views. Daily views are estimated as lifetime channel views ÷ channel age in days — we do not have watch hours, geography, or monetized playback share. Not official AdSense or YouTube revenue.',
    revenueRows,
    estimatedViewsRow,
    disclaimer:
      'Inferred report only. YouTube does not publish YPP/AdSense enrollment for third-party lookups. Owner verification on this page or YouTube Studio is required for definitive status.',
  };
}
