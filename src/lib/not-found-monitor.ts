/**
 * Rank Math “404 Monitor” equivalent — lightweight server logging.
 * View misses in your host logs (Vercel, etc.); extend later with DB if needed.
 */

const MAX_RECENT = 100;
const recent = new Set<string>();

export function logNotFoundRequest(path: string, referrer?: string | null) {
  const key = `${path}|${referrer ?? ''}`;
  if (recent.has(key)) return;
  if (recent.size >= MAX_RECENT) recent.clear();
  recent.add(key);

  const payload = {
    type: 'not_found',
    path,
    referrer: referrer ?? undefined,
    at: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === 'development') {
    console.warn('[404]', payload);
  } else {
    console.info(JSON.stringify(payload));
  }
}
