import { NextRequest, NextResponse } from 'next/server';

/** Default lookups allowed per IP per calendar day (UTC) */
export const DEFAULT_DAILY_LIMIT = 200;

export interface RateLimitInfo {
  allowed: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp in seconds
  retryAfter: number; // Seconds until reset
}

interface IpRecord {
  count: number;
  resetAt: number; // Unix timestamp in seconds
}

// In-memory store: key is `${dateKey}:${clientIp}`
const store = new Map<string, IpRecord>();

// Run periodic cleanup every 30 minutes to prevent memory leaks
let lastCleanup = Date.now();
function cleanupStaleRecords(nowSec: number) {
  if (Date.now() - lastCleanup < 30 * 60 * 1000) return;
  lastCleanup = Date.now();
  for (const [key, record] of store.entries()) {
    if (record.resetAt <= nowSec) {
      store.delete(key);
    }
  }
}

/**
 * Calculates unix timestamp in seconds for the next midnight UTC.
 */
function getMidnightUtcTimestamp(): number {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
    0, 0, 0, 0
  ));
  return Math.floor(tomorrow.getTime() / 1000);
}

/**
 * Gets UTC date string format YYYY-MM-DD for partitioning keys.
 */
function getUtcDateKey(): string {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

/**
 * Extracts client IP from request headers (supports proxies, Vercel, Cloudflare, etc.)
 * Note: no user-agent based exemptions — a UA string is trivially spoofable and search
 * engines never call these POST/API endpoints, so exempting them only enabled quota abuse.
 */
export function getClientIp(req: NextRequest): string {
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

export interface RateLimitOptions {
  /** Separate counter namespace, e.g. 'api' (YouTube quota) or 'proxy' (image proxies) */
  bucket?: string;
  /** Override the daily limit for this bucket */
  limit?: number;
}

/**
 * Optional shared store: Upstash Redis REST (free tier) or Vercel KV (same REST protocol).
 * Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or KV_REST_API_URL + KV_REST_API_TOKEN).
 * Without them, or if the store errors, we fall back to the per-instance in-memory Map.
 */
function getSharedStoreConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}

async function incrementShared(key: string, ttlSec: number): Promise<number | null> {
  const cfg = getSharedStoreConfig();
  if (!cfg) return null;
  try {
    const res = await fetch(`${cfg.url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, String(ttlSec)],
      ]),
      signal: AbortSignal.timeout(1500),
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const out = (await res.json()) as Array<{ result?: number }>;
    const count = Number(out?.[0]?.result);
    return Number.isFinite(count) ? count : null;
  } catch {
    return null;
  }
}

function incrementMemory(key: string, resetAt: number): number {
  const existing = store.get(key);
  if (!existing) {
    store.set(key, { count: 1, resetAt });
    return 1;
  }
  existing.count += 1;
  return existing.count;
}

/**
 * Checks and increments the daily rate limit for the given request.
 */
export async function checkRateLimit(req: NextRequest, options: RateLimitOptions = {}): Promise<RateLimitInfo> {
  const configuredLimit = Number(process.env.DAILY_API_LIMIT);
  const baseLimit = !Number.isNaN(configuredLimit) && configuredLimit > 0 ? configuredLimit : DEFAULT_DAILY_LIMIT;
  const limit = options.limit ?? baseLimit;
  const bucket = options.bucket ?? 'api';

  const nowSec = Math.floor(Date.now() / 1000);
  cleanupStaleRecords(nowSec);

  const ip = getClientIp(req);
  const storeKey = `rl:${bucket}:${getUtcDateKey()}:${ip}`;
  const midnightSec = getMidnightUtcTimestamp();
  const retryAfter = Math.max(1, midnightSec - nowSec);

  const count = (await incrementShared(storeKey, retryAfter + 60)) ?? incrementMemory(storeKey, midnightSec);

  return {
    allowed: count <= limit,
    limit,
    remaining: Math.max(0, limit - count),
    reset: midnightSec,
    retryAfter,
  };
}

/**
 * Creates standard rate limit response headers.
 */
export function createRateLimitHeaders(info: RateLimitInfo): HeadersInit {
  return {
    'X-RateLimit-Limit': String(info.limit),
    'X-RateLimit-Remaining': String(info.remaining),
    'X-RateLimit-Reset': String(info.reset),
    ...(info.allowed ? {} : { 'Retry-After': String(info.retryAfter) }),
  };
}

/**
 * Formats a user-friendly rate limit error response with status 429.
 */
export function createRateLimitResponse(info: RateLimitInfo): NextResponse {
  const hoursRemaining = Math.max(1, Math.ceil(info.retryAfter / 3600));

  return NextResponse.json(
    {
      success: false,
      error: `Daily lookup limit reached. You can make up to ${info.limit} lookups per day. Your limit will reset at midnight UTC (in about ${hoursRemaining} ${hoursRemaining === 1 ? 'hour' : 'hours'}).`,
      code: 'RATE_LIMIT_EXCEEDED',
      limit: info.limit,
      remaining: 0,
      reset: info.reset,
      retryAfter: info.retryAfter,
    },
    {
      status: 429,
      headers: {
        ...createRateLimitHeaders(info),
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
