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
      return NextResponse.json(
        {
          success: false,
          error:
            'Live YouTube data is temporarily unavailable. Configure YOUTUBE_API_KEY on the server to enable real channel lookups.',
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

    return NextResponse.json({
      success: true,
      data: channelData,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
