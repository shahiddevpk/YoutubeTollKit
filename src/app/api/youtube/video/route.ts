import { NextRequest, NextResponse } from 'next/server';
import { parseYouTubeUrl } from '@/lib/youtube';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query?.trim()) {
      return NextResponse.json({ success: false, error: 'Missing query parameter (q)' }, { status: 400 });
    }

    const parsed = parseYouTubeUrl(query);
    if (parsed.type !== 'video' || !parsed.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Enter a valid public YouTube video or Shorts URL.',
          code: 'INVALID_INPUT',
        },
        { status: 400 }
      );
    }

    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.error('YouTube video lookup unavailable: YOUTUBE_API_KEY is not configured.');
      return NextResponse.json(
        {
          success: false,
          error: 'Live YouTube data is temporarily unavailable. Please try again later.',
          code: 'YOUTUBE_API_UNAVAILABLE',
        },
        { status: 503 }
      );
    }

    const videoId = parsed.id;
    const endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${encodeURIComponent(videoId)}&key=${apiKey}`;
    const res = await fetch(endpoint, { next: { revalidate: 3600 } });
    const json = await res.json();

    if (!json.items?.length) {
      return NextResponse.json(
        {
          success: false,
          error: 'Video not found or is not publicly accessible.',
          code: 'VIDEO_NOT_FOUND',
        },
        { status: 404 }
      );
    }

    const item = json.items[0];
    const videoData = {
      videoId: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      publishedAt: item.snippet.publishedAt,
      tags: item.snippet.tags || [],
      viewCount: Number(item.statistics.viewCount || 0),
      likeCount: Number(item.statistics.likeCount || 0),
      commentCount: Number(item.statistics.commentCount || 0),
      duration: item.contentDetails.duration,
      thumbnails: item.snippet.thumbnails,
      isLiveApi: true as const,
      dataSource: 'youtube_data_api_v3' as const,
    };

    return NextResponse.json({
      success: true,
      data: videoData,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
