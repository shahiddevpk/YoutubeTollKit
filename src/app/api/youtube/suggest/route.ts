import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rate-limit';
import { getCachedResponse, storeCachedResponse } from '@/lib/response-cache';

/**
 * Keyword ideas from YouTube's public search autocomplete (the same suggestions viewers see
 * while typing in the YouTube search box). No API key and no YouTube Data API quota used.
 */
const SUGGEST_URL = 'https://suggestqueries.google.com/complete/search';
const LANGS = ['en', 'es', 'pt', 'hi', 'ur', 'ar', 'fr', 'de', 'id'];
const REGIONS = ['US', 'GB', 'IN', 'PK', 'CA', 'AU', 'BR', 'MX', 'ES', 'DE', 'FR', 'ID', 'PH', 'NG', 'AE', 'SA'];

async function fetchSuggestions(q: string, hl: string, gl: string): Promise<string[]> {
  const url = `${SUGGEST_URL}?client=firefox&ds=yt&hl=${hl}&gl=${gl}&q=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(4000), headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return [];
    const text = await res.text();
    const data = JSON.parse(text) as [string, string[]];
    return Array.isArray(data?.[1]) ? data[1] : [];
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const seed = (searchParams.get('q') ?? '').trim().toLowerCase().replace(/\s+/g, ' ');
  const hl = LANGS.includes(searchParams.get('hl') ?? '') ? searchParams.get('hl')! : 'en';
  const gl = REGIONS.includes((searchParams.get('gl') ?? '').toUpperCase()) ? searchParams.get('gl')!.toUpperCase() : 'US';

  if (!seed || seed.length < 2 || seed.length > 80) {
    return NextResponse.json({ success: false, error: 'Enter a topic between 2 and 80 characters.' }, { status: 400 });
  }

  const cacheKey = `suggest:${hl}:${gl}:${seed}`;
  const cached = getCachedResponse(cacheKey);
  if (cached) return cached;

  const rateLimit = await checkRateLimit(req, { bucket: 'suggest', limit: 300 });
  if (!rateLimit.allowed) return createRateLimitResponse(rateLimit);

  const variants = [seed, `${seed} `, `how to ${seed}`, `best ${seed}`, `${seed} for`, `${seed} 2026`, `${seed} vs`];
  const lists = await Promise.all(variants.map((v) => fetchSuggestions(v, hl, gl)));

  // Score: earlier position and appearing in more lists = stronger signal.
  const scores = new Map<string, { score: number; sources: number }>();
  lists.forEach((list) =>
    list.forEach((raw, i) => {
      const s = raw.trim().toLowerCase();
      if (!s || s.length > 100) return;
      const prev = scores.get(s) ?? { score: 0, sources: 0 };
      scores.set(s, { score: prev.score + (10 - Math.min(i, 9)), sources: prev.sources + 1 });
    })
  );

  const suggestions = [...scores.entries()]
    .sort((a, b) => b[1].score - a[1].score)
    .slice(0, 60)
    .map(([keyword, v]) => ({ keyword, score: v.score, sources: v.sources }));

  return storeCachedResponse(
    cacheKey,
    NextResponse.json(
      { success: true, data: { seed, hl, gl, suggestions } },
      { headers: { 'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800' } }
    ),
    6 * 60 * 60_000
  );
}
