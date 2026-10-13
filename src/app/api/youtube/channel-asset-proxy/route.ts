import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, createRateLimitResponse } from '@/lib/rate-limit';

const ALLOWED_HOSTS = [
  'yt3.ggpht.com',
  'yt3.googleusercontent.com',
  'lh3.googleusercontent.com',
  'lh4.googleusercontent.com',
  'lh5.googleusercontent.com',
  'lh6.googleusercontent.com',
];

export async function GET(req: NextRequest) {
  const rateLimit = checkRateLimit(req);
  if (!rateLimit.allowed) return createRateLimitResponse(rateLimit);

  const { searchParams } = new URL(req.url);
  const rawUrl = searchParams.get('url')?.trim();
  const type = searchParams.get('type')?.trim();

  if (!rawUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.includes(parsed.hostname)) {
    return NextResponse.json({ error: 'URL host not allowed' }, { status: 400 });
  }

  const channelId = searchParams.get('channelId')?.replace(/[^a-zA-Z0-9_-]/g, '') ?? 'channel';
  const filename = `${channelId}-${type ?? 'asset'}.jpg`;

  try {
    const upstream = await fetch(rawUrl, {
      signal: AbortSignal.timeout(8000),
    });
    if (!upstream.ok) {
      return NextResponse.json({ error: 'Asset not available' }, { status: 404 });
    }
    const buffer = await upstream.arrayBuffer();
    const contentType = upstream.headers.get('Content-Type') ?? 'image/jpeg';
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch asset' }, { status: 502 });
  }
}
