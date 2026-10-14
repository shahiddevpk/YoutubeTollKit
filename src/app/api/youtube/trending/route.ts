import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  createRateLimitHeaders,
  createRateLimitResponse,
  type RateLimitInfo,
} from '@/lib/rate-limit';
import { getCachedResponse, storeCachedResponse } from '@/lib/response-cache';

const CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
};

const ALLOWED_REGIONS = [
  'US', 'GB', 'IN', 'CA', 'AU', 'DE', 'FR', 'BR', 'JP', 'KR',
  'MX', 'ID', 'TR', 'SA', 'PK', 'NG', 'EG', 'PH', 'TH', 'VN',
];

const ALLOWED_CATEGORIES: Record<string, string> = {
  '0':  'All',
  '10': 'Music',
  '20': 'Gaming',
  '23': 'Comedy',
  '17': 'Sports',
  '25': 'News',
  '28': 'Science & Tech',
  '24': 'Entertainment',
  '22': 'People & Blogs',
  '26': 'Howto & Style',
};

export interface TrendingVideo {
  videoId: string;
  title: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  thumbnailUrl: string;
  duration: string;
  categoryId: string;
}

async function lookupTrending(
  regionCode: string,
  categoryId: string,
  rateLimitInfo: RateLimitInfo
) {
  const apiKey = process.env.YOUTUBE_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: 'Live YouTube data is temporarily unavailable.', code: 'YOUTUBE_API_UNAVAILABLE' },
      { status: 503 }
    );
  }

  const params = new URLSearchParams({
    part: 'snippet,statistics,contentDetails',
    chart: 'mostPopular',
    regionCode,
    maxResults: '20',
    key: apiKey,
  });
  if (categoryId !== '0') {
    params.set('videoCategoryId', categoryId);
  }

  const endpoint = `https://www.googleapis.com/youtube/v3/videos?${params.toString()}`;
  const res = await fetch(endpoint, { next: { revalidate: 1800 } });
  const json = await res.json();

  if (!json.items?.length) {
    return NextResponse.json(
      { success: false, error: 'No trending videos found for this region.', code: 'NO_RESULTS' },
      { status: 404 }
    );
  }

  const videos: TrendingVideo[] = json.items.map(
    (item: {
      id: string;
      snippet: {
        title: string;
        channelTitle: string;
        channelId: string;
        publishedAt: string;
        thumbnails: { high?: { url: string }; medium?: { url: string }; default?: { url: string } };
        categoryId: string;
      };
      statistics: { viewCount?: string; likeCount?: string; commentCount?: string };
      contentDetails: { duration: string };
    }) => ({
      videoId: item.id,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      publishedAt: item.snippet.publishedAt,
      viewCount: Number(item.statistics.viewCount ?? 0),
      likeCount: Number(item.statistics.likeCount ?? 0),
      commentCount: Number(item.statistics.commentCount ?? 0),
      thumbnailUrl:
        item.snippet.thumbnails.high?.url ??
        item.snippet.thumbnails.medium?.url ??
        item.snippet.thumbnails.default?.url ??
        '',
      duration: item.contentDetails.duration,
      categoryId: item.snippet.categoryId,
    })
  );

  return NextResponse.json(
    { success: true, data: { videos, regionCode, categoryId, categories: ALLOWED_CATEGORIES } },
    { headers: { ...CACHE_HEADERS, ...createRateLimitHeaders(rateLimitInfo) } }
  );
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const regionCode = searchParams.get('region')?.toUpperCase() ?? 'US';
    const categoryId = searchParams.get('category') ?? '0';

    if (!ALLOWED_REGIONS.includes(regionCode)) {
      return NextResponse.json({ success: false, error: 'Invalid region code' }, { status: 400 });
    }
    if (!Object.keys(ALLOWED_CATEGORIES).includes(categoryId)) {
      return NextResponse.json({ success: false, error: 'Invalid category' }, { status: 400 });
    }

    const cacheKey = `trending:${regionCode}:${categoryId}`;
    const cached = getCachedResponse(cacheKey);
    if (cached) return cached;
    const rateLimit = await checkRateLimit(req);
    if (!rateLimit.allowed) return createRateLimitResponse(rateLimit);
    return await storeCachedResponse(cacheKey, await lookupTrending(regionCode, categoryId, rateLimit), 10 * 60_000);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
