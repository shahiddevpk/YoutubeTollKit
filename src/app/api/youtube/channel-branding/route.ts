import { NextRequest, NextResponse } from 'next/server';
import { parseYouTubeUrl } from '@/lib/youtube';
import {
  checkRateLimit,
  createRateLimitHeaders,
  createRateLimitResponse,
  type RateLimitInfo,
} from '@/lib/rate-limit';
import { getCachedResponse, storeCachedResponse } from '@/lib/response-cache';

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

interface ChannelBrandingData {
  channelId: string;
  title: string;
  handle: string;
  avatarUrl: string | null;
  avatarHdUrl: string | null;
  bannerUrl: string | null;
  isLiveApi: true;
  dataSource: 'youtube_data_api_v3';
}

async function fetchYouTubeJson(endpoint: string) {
  const res = await fetch(endpoint, {
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`YouTube API request failed (${res.status})`);
  return res.json();
}

async function resolveChannelBranding(
  query: string,
  apiKey: string
): Promise<ChannelBrandingData | null> {
  const parsed = parseYouTubeUrl(query);

  let channelId: string | null = null;

  if (parsed.type === 'channel' && parsed.id) {
    channelId = parsed.id;
  } else if (parsed.type === 'handle' && parsed.id) {
    const clean = parsed.id.replace(/^@+/, '');
    const json = await fetchYouTubeJson(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&forHandle=${encodeURIComponent(clean)}&key=${apiKey}`
    );
    if (!json.items?.length) return null;
    return mapBrandingItem(json.items[0]);
  } else if (parsed.type === 'video' && parsed.id) {
    const json = await fetchYouTubeJson(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${encodeURIComponent(parsed.id)}&key=${apiKey}`
    );
    channelId = json.items?.[0]?.snippet?.channelId ?? null;
  }

  if (!channelId) return null;

  const json = await fetchYouTubeJson(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,brandingSettings&id=${encodeURIComponent(channelId)}&key=${apiKey}`
  );
  if (!json.items?.length) return null;
  return mapBrandingItem(json.items[0]);
}

function mapBrandingItem(item: {
  id: string;
  snippet: {
    title: string;
    customUrl?: string;
    thumbnails?: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
  };
  brandingSettings?: {
    image?: {
      bannerExternalUrl?: string;
    };
  };
}): ChannelBrandingData {
  const thumbs = item.snippet.thumbnails;
  return {
    channelId: item.id,
    title: item.snippet.title,
    handle: item.snippet.customUrl ?? '',
    avatarUrl: thumbs?.default?.url ?? null,
    avatarHdUrl: thumbs?.high?.url ?? thumbs?.medium?.url ?? null,
    bannerUrl: item.brandingSettings?.image?.bannerExternalUrl ?? null,
    isLiveApi: true,
    dataSource: 'youtube_data_api_v3',
  };
}

async function lookupChannelBranding(query: string, rateLimitInfo: RateLimitInfo) {
  if (!query.trim()) {
    return NextResponse.json({ success: false, error: 'Missing input (q)' }, { status: 400 });
  }
  if (query.length > 300) {
    return NextResponse.json(
      { success: false, error: 'Input too long.', code: 'INPUT_TOO_LONG' },
      { status: 400 }
    );
  }

  const parsed = parseYouTubeUrl(query);
  if (parsed.type === 'unknown') {
    return NextResponse.json(
      {
        success: false,
        error: 'Enter a valid YouTube channel URL, @handle, UC channel ID, or video link.',
        code: 'INVALID_INPUT',
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        error: 'Live YouTube data is temporarily unavailable. Please try again later.',
        code: 'YOUTUBE_API_UNAVAILABLE',
      },
      { status: 503 }
    );
  }

  const data = await resolveChannelBranding(query, apiKey);
  if (!data) {
    return NextResponse.json(
      {
        success: false,
        error: 'Channel not found. Check the URL or handle and ensure the channel is public.',
        code: 'CHANNEL_NOT_FOUND',
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { success: true, data },
    { headers: { ...CACHE_HEADERS, ...createRateLimitHeaders(rateLimitInfo) } }
  );
}

export async function GET(req: NextRequest) {
  try {
    const query = new URL(req.url).searchParams.get('q');
    if (!query?.trim()) {
      return NextResponse.json({ success: false, error: 'Missing query parameter (q)' }, { status: 400 });
    }
    const q = query.trim();
    const cacheKey = `channel-branding:${q.toLowerCase()}`;
    const cached = getCachedResponse(cacheKey);
    if (cached) return cached;
    const rateLimit = await checkRateLimit(req);
    if (!rateLimit.allowed) return createRateLimitResponse(rateLimit);
    return await storeCachedResponse(cacheKey, await lookupChannelBranding(q, rateLimit));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as { q?: string } | null;
    const query = body?.q?.trim();
    if (!query) {
      return NextResponse.json({ success: false, error: 'Missing JSON field (q)' }, { status: 400 });
    }
    const q = query;
    const cacheKey = `channel-branding:${q.toLowerCase()}`;
    const cached = getCachedResponse(cacheKey);
    if (cached) return cached;
    const rateLimit = await checkRateLimit(req);
    if (!rateLimit.allowed) return createRateLimitResponse(rateLimit);
    return await storeCachedResponse(cacheKey, await lookupChannelBranding(q, rateLimit));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
