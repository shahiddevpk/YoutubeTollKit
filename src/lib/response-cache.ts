import { NextResponse } from 'next/server';

/**
 * Tiny per-instance TTL cache for successful JSON API responses.
 * A cache hit is served without touching the YouTube API or the visitor's daily limit,
 * which keeps auto-refreshing counters and repeat lookups cheap.
 */
interface Entry {
  body: unknown;
  cacheControl: string;
  expires: number;
}

const cache = new Map<string, Entry>();
const MAX_ENTRIES = 500;
const DEFAULT_CACHE_CONTROL = 'public, s-maxage=60, stale-while-revalidate=300';

/** CDN headers for auto-refreshing counters (`?live=1`): short enough that counts still move. */
export const LIVE_CACHE_HEADERS = {
  'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
};

export function getCachedResponse(key: string): NextResponse | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (hit.expires < Date.now()) {
    cache.delete(key);
    return null;
  }
  return NextResponse.json(hit.body, {
    headers: { 'Cache-Control': hit.cacheControl, 'X-Cache': 'HIT' },
  });
}

export async function storeCachedResponse(key: string, res: NextResponse, ttlMs = 300_000): Promise<NextResponse> {
  if (res.status === 200) {
    try {
      const body = await res.clone().json();
      if (cache.size >= MAX_ENTRIES) {
        const oldest = cache.keys().next().value;
        if (oldest !== undefined) cache.delete(oldest);
      }
      cache.set(key, {
        body,
        cacheControl: res.headers.get('Cache-Control') ?? DEFAULT_CACHE_CONTROL,
        expires: Date.now() + ttlMs,
      });
    } catch {
      /* non-JSON response: skip caching */
    }
  }
  return res;
}
