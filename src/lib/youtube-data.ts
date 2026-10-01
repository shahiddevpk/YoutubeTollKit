import { ParsedYouTubeInput } from '@/lib/youtube';

/** YouTube Data API does not expose YPP / AdSense enrollment. We only surface public stats + threshold hints. */
export const EXPANDED_YPP_SUBSCRIBER_THRESHOLD = 500;
export const FULL_YPP_SUBSCRIBER_THRESHOLD = 1000;


async function fetchYouTubeJson(endpoint: string) {
  const res = await fetch(endpoint, {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`YouTube API request failed (${res.status})`);
  }

  return res.json();
}

export interface ChannelPublicData {
  channelId: string;
  title: string;
  handle: string;
  description: string;
  publishedAt: string;
  avatarUrl?: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  expandedYppSubscriberThresholdMet: boolean;
  fullYppSubscriberThresholdMet: boolean;
  isLiveApi: true;
  dataSource: 'youtube_data_api_v3';
  monetizationDisclaimer: string;
}

export function buildMonetizationDisclaimer(fullThresholdMet: boolean, expandedThresholdMet: boolean): string {
  if (fullThresholdMet) {
    return 'Public signal: this channel meets the 1,000-subscriber threshold used for full YPP ad-revenue eligibility. YouTube does not publish watch-hour/Shorts-view qualification, policy review results, or active YPP/AdSense enrollment through the public Data API.';
  }
  if (expandedThresholdMet) {
    return 'Public signal: this channel meets the 500-subscriber threshold used for the expanded YPP tier in eligible regions, but not the 1,000-subscriber threshold for full ad-revenue eligibility. Other requirements are not available through the public Data API.';
  }
  return 'Public signal: this channel is below the 500- and 1,000-subscriber YPP thresholds. Subscriber count is only one eligibility factor and does not reveal actual YPP or AdSense enrollment.';
}

export function mapChannelItem(item: {
  id: string;
  snippet: {
    title: string;
    customUrl?: string;
    description: string;
    publishedAt: string;
    thumbnails?: { high?: { url: string }; default?: { url: string } };
  };
  statistics: {
    subscriberCount?: string;
    viewCount?: string;
    videoCount?: string;
  };
}): ChannelPublicData {
  const subscriberCount = Number(item.statistics.subscriberCount || 0);
  const expandedYppSubscriberThresholdMet = subscriberCount >= EXPANDED_YPP_SUBSCRIBER_THRESHOLD;
  const fullYppSubscriberThresholdMet = subscriberCount >= FULL_YPP_SUBSCRIBER_THRESHOLD;
  const handle =
    item.snippet.customUrl?.startsWith('@')
      ? item.snippet.customUrl
      : item.snippet.customUrl
        ? `@${item.snippet.customUrl}`
        : `@${item.snippet.title.replace(/\s+/g, '')}`;

  return {
    channelId: item.id,
    title: item.snippet.title,
    handle,
    description: item.snippet.description,
    publishedAt: item.snippet.publishedAt,
    avatarUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
    subscriberCount,
    viewCount: Number(item.statistics.viewCount || 0),
    videoCount: Number(item.statistics.videoCount || 0),
    expandedYppSubscriberThresholdMet,
    fullYppSubscriberThresholdMet,
    isLiveApi: true,
    dataSource: 'youtube_data_api_v3',
    monetizationDisclaimer: buildMonetizationDisclaimer(fullYppSubscriberThresholdMet, expandedYppSubscriberThresholdMet),
  };
}

export async function fetchChannelById(channelId: string, apiKey: string) {
  const endpoint = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${encodeURIComponent(channelId)}&key=${apiKey}`;
  const json = await fetchYouTubeJson(endpoint);
  if (!json.items?.length) return null;
  return mapChannelItem(json.items[0]);
}

export async function fetchChannelByHandle(handle: string, apiKey: string) {
  const clean = handle.replace(/^@+/, '');
  const endpoint = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${encodeURIComponent(clean)}&key=${apiKey}`;
  const json = await fetchYouTubeJson(endpoint);
  if (!json.items?.length) return null;
  return mapChannelItem(json.items[0]);
}

export async function fetchChannelIdFromVideo(videoId: string, apiKey: string): Promise<string | null> {
  const endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${encodeURIComponent(videoId)}&key=${apiKey}`;
  const json = await fetchYouTubeJson(endpoint);
  const channelId = json.items?.[0]?.snippet?.channelId;
  return channelId ?? null;
}

export async function resolveChannelFromInput(
  parsed: ParsedYouTubeInput,
  apiKey: string
): Promise<ChannelPublicData | null> {
  if (parsed.type === 'channel' && parsed.id) {
    return fetchChannelById(parsed.id, apiKey);
  }
  if (parsed.type === 'handle' && parsed.id) {
    return fetchChannelByHandle(parsed.id, apiKey);
  }
  if (parsed.type === 'video' && parsed.id) {
    const channelId = await fetchChannelIdFromVideo(parsed.id, apiKey);
    if (channelId) return fetchChannelById(channelId, apiKey);
  }
  return null;
}

export interface VideoPublicData {
  videoId: string;
  title: string;
  description: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  tags: string[];
  viewCount: number;
  likeCount: number;
  commentCount: number;
  duration: string;
  thumbnails: Record<string, { url: string }>;
  isLiveApi: true;
  dataSource: 'youtube_data_api_v3';
}
