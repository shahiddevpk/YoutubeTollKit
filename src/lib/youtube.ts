export interface ParsedYouTubeInput {
  type: 'video' | 'channel' | 'handle' | 'playlist' | 'unknown';
  id?: string;
  originalInput: string;
  normalizedUrl?: string;
}

export function parseYouTubeUrl(input: string): ParsedYouTubeInput {
  const trimmed = input.trim();
  if (!trimmed) {
    return { type: 'unknown', originalInput: input };
  }

  // Handle @handle directly
  if (trimmed.startsWith('@')) {
    const handle = trimmed.replace(/^@+/, '');
    return {
      type: 'handle',
      id: handle,
      originalInput: input,
      normalizedUrl: `https://www.youtube.com/@${handle}`,
    };
  }

  // Handle UC... channel ID directly
  if (/^UC[a-zA-Z0-9_-]{22}$/.test(trimmed)) {
    return {
      type: 'channel',
      id: trimmed,
      originalInput: input,
      normalizedUrl: `https://www.youtube.com/channel/${trimmed}`,
    };
  }

  // Handle 11-char video ID directly
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return {
      type: 'video',
      id: trimmed,
      originalInput: input,
      normalizedUrl: `https://www.youtube.com/watch?v=${trimmed}`,
    };
  }

  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    const hostname = url.hostname.replace('www.', '').toLowerCase();

    if (!hostname.includes('youtube.com') && !hostname.includes('youtu.be')) {
      return { type: 'unknown', originalInput: input };
    }

    // Shortened youtu.be/VIDEO_ID
    if (hostname === 'youtu.be') {
      const videoId = url.pathname.slice(1).split('/')[0];
      if (videoId) {
        return {
          type: 'video',
          id: videoId,
          originalInput: input,
          normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`,
        };
      }
    }

    // youtube.com/shorts/VIDEO_ID
    if (url.pathname.startsWith('/shorts/')) {
      const videoId = url.pathname.replace('/shorts/', '').split('/')[0];
      return {
        type: 'video',
        id: videoId,
        originalInput: input,
        normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`,
      };
    }

    // youtube.com/watch?v=VIDEO_ID
    if (url.pathname === '/watch' && url.searchParams.has('v')) {
      const videoId = url.searchParams.get('v')!;
      return {
        type: 'video',
        id: videoId,
        originalInput: input,
        normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`,
      };
    }

    // youtube.com/embed/VIDEO_ID
    if (url.pathname.startsWith('/embed/')) {
      const videoId = url.pathname.replace('/embed/', '').split('/')[0];
      return {
        type: 'video',
        id: videoId,
        originalInput: input,
        normalizedUrl: `https://www.youtube.com/watch?v=${videoId}`,
      };
    }

    // youtube.com/@handle
    if (url.pathname.startsWith('/@')) {
      const handle = url.pathname.replace('/@', '').split('/')[0];
      return {
        type: 'handle',
        id: handle,
        originalInput: input,
        normalizedUrl: `https://www.youtube.com/@${handle}`,
      };
    }

    // youtube.com/channel/UC...
    if (url.pathname.startsWith('/channel/')) {
      const channelId = url.pathname.replace('/channel/', '').split('/')[0];
      return {
        type: 'channel',
        id: channelId,
        originalInput: input,
        normalizedUrl: `https://www.youtube.com/channel/${channelId}`,
      };
    }

    // youtube.com/c/custom_name or /user/username
    if (url.pathname.startsWith('/c/') || url.pathname.startsWith('/user/')) {
      const name = url.pathname.split('/')[2];
      return {
        type: 'handle',
        id: name,
        originalInput: input,
        normalizedUrl: url.toString(),
      };
    }

    return { type: 'unknown', originalInput: input };
  } catch {
    return { type: 'unknown', originalInput: input };
  }
}

export function getThumbnailUrls(videoId: string) {
  return {
    maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    mq: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
  };
}
