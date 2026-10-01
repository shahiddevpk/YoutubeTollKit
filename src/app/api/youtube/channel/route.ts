import { NextRequest, NextResponse } from 'next/server';
import { parseYouTubeUrl } from '@/lib/youtube';
import { resolveChannelFromInput } from '@/lib/youtube-data';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query?.trim()) {
      return NextResponse.json({ success: false, error: 'Missing query parameter (q)' }, { status: 400 });
    }

    if (query.length > 300) {
      return NextResponse.json(
        { success: false, error: 'Input is too long. Paste a YouTube URL, @handle, channel ID, or video ID.', code: 'INPUT_TOO_LONG' },
        { status: 400 }
      );
    }

    const parsed = parseYouTubeUrl(query);
    if (parsed.type === 'unknown') {
      return NextResponse.json(
        {
          success: false,
          error: 'Enter a valid YouTube channel URL, @handle, UC channel ID, or public video link.',
          code: 'INVALID_INPUT',
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.error('YouTube channel lookup unavailable: YOUTUBE_API_KEY is not configured.');
      return NextResponse.json(
        {
          success: false,
          error: 'Live YouTube data is temporarily unavailable. Please try again later.',
          code: 'YOUTUBE_API_UNAVAILABLE',
        },
        { status: 503 }
      );
    }

    const channelData = await resolveChannelFromInput(parsed, apiKey);

    if (!channelData) {
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
      { success: true, data: channelData },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      }
    );
  } catch (error: unknown) {
    console.error('YouTube channel lookup failed', error);
    return NextResponse.json(
      { success: false, error: 'YouTube data is temporarily unavailable. Please try again shortly.', code: 'UPSTREAM_ERROR' },
      { status: 502 }
    );
  }
}
