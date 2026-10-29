import { toast } from '@/components/ui/Toast';

interface LookupOptions {
  /** Auto-refreshing counters: CDN caches for 60s instead of 1h. */
  live?: boolean;
}

/** GET (not POST) so Vercel's CDN can cache identical lookups without invoking the function. */
function lookupUrl(path: string, q: string, { live }: LookupOptions) {
  const params = new URLSearchParams({ q: q.trim() });
  if (live) params.set('live', '1');
  return `${path}?${params.toString()}`;
}

export async function fetchYouTubeChannel(q: string, options: LookupOptions = {}) {
  return fetch(lookupUrl('/api/youtube/channel', q, options), { credentials: 'same-origin' });
}

export async function fetchYouTubeVideo(q: string, options: LookupOptions = {}) {
  return fetch(lookupUrl('/api/youtube/video', q, options), { credentials: 'same-origin' });
}

export interface ApiParsedResult<T> {
  ok: true;
  data: T;
}

export interface ApiParsedError {
  ok: false;
  error: string;
  code?: string;
  isRateLimit?: boolean;
}

export async function parseApiJson<T>(
  res: Response
): Promise<ApiParsedResult<T> | ApiParsedError> {
  const contentType = res.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    const snippet = (await res.text()).slice(0, 400);
    const blockedByEdge =
      snippet.includes('Security Checkpoint') ||
      snippet.includes('<!DOCTYPE') ||
      snippet.toLowerCase().includes('<html');

    return {
      ok: false,
      error: blockedByEdge
        ? 'The request was intercepted by hosting security (not YouTube). In Vercel → Security, allow /api/youtube/* or disable bot challenges for API routes, then try again.'
        : 'Unexpected server response. Please try again.',
    };
  }

  const json = await res.json();

  if (res.status === 429 || json.code === 'RATE_LIMIT_EXCEEDED') {
    const limitMsg =
      typeof json.error === 'string'
        ? json.error
        : "You've reached your daily limit of 20 lookups. Your limit will reset at midnight UTC.";

    // Trigger toast notification
    toast.warning(limitMsg, {
      title: 'Daily Limit Reached (20/20)',
      duration: 8000,
    });

    return {
      ok: false,
      error: limitMsg,
      code: 'RATE_LIMIT_EXCEEDED',
      isRateLimit: true,
    };
  }

  if (!res.ok || !json.success) {
    const message =
      typeof json.error === 'string'
        ? json.error
        : res.status === 503
          ? 'Live YouTube data is unavailable. Please try again later.'
          : 'Request failed. Please check your input and try again.';
    return { ok: false, error: message, code: json.code };
  }
  return { ok: true, data: json.data as T };
}
