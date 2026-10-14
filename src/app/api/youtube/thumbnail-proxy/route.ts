import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rate-limit';

const ALLOWED_QUALITIES = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault', 'default'] as const;
type Quality = (typeof ALLOWED_QUALITIES)[number];

export async function GET(req: NextRequest) {
  const rateLimit = await checkRateLimit(req, { bucket: 'proxy', limit: 1000 });
  if (!rateLimit.allowed) return createRateLimitResponse(rateLimit);

  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get('videoId')?.trim();
  const quality = searchParams.get('quality')?.trim() as Quality;

  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
    return NextResponse.json({ error: 'Invalid videoId' }, { status: 400 });
  }
  if (!quality || !ALLOWED_QUALITIES.includes(quality)) {
    return NextResponse.json({ error: 'Invalid quality parameter' }, { status: 400 });
  }

  const imageUrl = `https://i.ytimg.com/vi/${videoId}/${quality}.jpg`;

  try {
    const upstream = await fetch(imageUrl, {
      signal: AbortSignal.timeout(8000),
    });
    if (!upstream.ok) {
      return NextResponse.json({ error: 'Thumbnail not available at this quality' }, { status: 404 });
    }
    const buffer = await upstream.arrayBuffer();
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="${videoId}-${quality}.jpg"`,
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch thumbnail' }, { status: 502 });
  }
}
