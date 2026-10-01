import { ParsedYouTubeInput } from '@/lib/youtube';

/** YouTube Data API does not expose YPP / AdSense enrollment. We only surface public stats + threshold hints. */
export const YPP_SUBSCRIBER_THRESHOLD = 1000;

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
  yppSubscriberThresholdMet: boolean;
  isLiveApi: true;
  dataSource: 'youtube_data_api_v3';
  monetizationDisclaimer: string;
}

export function buildMonetizationDisclaimer(yppSubscriberThresholdMet: boolean): string {
  if (yppSubscriberThresholdMet) {
    return 'This channel meets the public 1,000-subscriber threshold used for YouTube Partner Program applications. YouTube does not publish active monetization or YPP enrollment via the Data API—confirm status in YouTube Studio or by reviewing ads on recent public uploads.';
  }
  return 'This channel is below the 1,000-subscriber threshold commonly required for YouTube Partner Program applications. Subscriber count alone does not confirm monetization status.';
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
  const yppSubscriberThresholdMet = subscriberCount >= YPP_SUBSCRIBER_THRESHOLD;
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
    yppSubscriberThresholdMet,
    isLiveApi: true,
    dataSource: 'youtube_data_api_v3',
    monetizationDisclaimer: buildMonetizationDisclaimer(yppSubscriberThresholdMet),
  };
}

export async function fetchChannelById(channelId: string, apiKey: string) {
  const endpoint = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${encodeURIComponent(channelId)}&key=${apiKey}`;
  const res = await fetch(endpoint, { next: { revalidate: 3600 } });
  const json = await res.json();
  if (!json.items?.length) return null;
  return mapChannelItem(json.items[0]);
}

export async function fetchChannelByHandle(handle: string, apiKey: string) {
  const clean = handle.replace(/^@+/, '');
  const endpoint = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${encodeURIComponent(clean)}&key=${apiKey}`;
  const res = await fetch(endpoint, { next: { revalidate: 3600 } });
  const json = await res.json();
  if (!json.items?.length) return null;
  return mapChannelItem(json.items[0]);
}

export async function fetchChannelIdFromVideo(videoId: string, apiKey: string): Promise<string | null> {
  const endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${encodeURIComponent(videoId)}&key=${apiKey}`;
  const res = await fetch(endpoint, { next: { revalidate: 3600 } });
  const json = await res.json();
  const channelId = json.items?.[0]?.snippet?.channelId;
  return channelId ?? null;
}

export async function searchChannelByLegacyName(query: string, apiKey: string) {
  const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(query)}&maxResults=1&key=${apiKey}`;
  const res = await fetch(endpoint, { next: { revalidate: 3600 } });
  const json = await res.json();
  const channelId = json.items?.[0]?.id?.channelId;
  if (!channelId) return null;
  return fetchChannelById(channelId, apiKey);
}

export async function resolveChannelFromInput(
  parsed: ParsedYouTubeInput,
  apiKey: string
): Promise<ChannelPublicData | null> {
  if (parsed.type === 'channel' && parsed.id) {
    return fetchChannelById(parsed.id, apiKey);
  }
  if (parsed.type === 'handle' && parsed.id) {
    const byHandle = await fetchChannelByHandle(parsed.id, apiKey);
    if (byHandle) return byHandle;
    return searchChannelByLegacyName(parsed.id, apiKey);
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
