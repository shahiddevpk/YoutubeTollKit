export async function fetchYouTubeChannel(q: string) {
  return fetch('/api/youtube/channel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: q.trim() }),
    credentials: 'same-origin',
  });
}

export async function fetchYouTubeVideo(q: string) {
  return fetch('/api/youtube/video', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ q: q.trim() }),
    credentials: 'same-origin',
  });
}

export async function parseApiJson<T>(
  res: Response
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
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
  if (!res.ok || !json.success) {
    const message =
      typeof json.error === 'string'
        ? json.error
        : res.status === 503
          ? 'Live YouTube data is unavailable. Please try again later.'
          : 'Request failed. Please check your input and try again.';
    return { ok: false, error: message };
  }
  return { ok: true, data: json.data as T };
}
