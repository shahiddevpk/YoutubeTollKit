import { NextRequest, NextResponse } from 'next/server';

/** Default lookups allowed per IP per calendar day (UTC) */
export const DEFAULT_DAILY_LIMIT = 20;

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
 * Known search engine crawler user-agents.
 * We exempt these to guarantee zero impact on search engine crawling / SEO.
 */
const SEARCH_ENGINE_BOTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',
  'facebot',
  'ia_archiver',
  'semrushbot',
  'ahrefsbot',
];

/**
 * Checks if request is from a known search engine bot.
 */
export function isSearchEngineBot(req: NextRequest): boolean {
  const userAgent = (req.headers.get('user-agent') || '').toLowerCase();
  return SEARCH_ENGINE_BOTS.some((bot) => userAgent.includes(bot));
}

/**
 * Extracts client IP from request headers (supports proxies, Vercel, Cloudflare, etc.)
 */
export function getClientIp(req: NextRequest): string {
  // 1. Cloudflare
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  // 2. Standard X-Forwarded-For (first entry is the client IP)
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }

  // 3. X-Real-IP
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  // 4. Fallback / local
  return '127.0.0.1';
}

/**
 * Checks and increments rate limit for the given request.
 */
export function checkRateLimit(req: NextRequest): RateLimitInfo {
  // Always allow search engines to avoid any SEO disturbance
  if (isSearchEngineBot(req)) {
    return {
      allowed: true,
      limit: 999999,
      remaining: 999999,
      reset: getMidnightUtcTimestamp(),
      retryAfter: 0,
    };
  }

  const configuredLimit = Number(process.env.DAILY_API_LIMIT);
  const limit = !Number.isNaN(configuredLimit) && configuredLimit > 0
    ? configuredLimit
    : DEFAULT_DAILY_LIMIT;

  const nowSec = Math.floor(Date.now() / 1000);
  cleanupStaleRecords(nowSec);

  const ip = getClientIp(req);
  const dateKey = getUtcDateKey();
  const storeKey = `${dateKey}:${ip}`;

  const midnightSec = getMidnightUtcTimestamp();
  const retryAfter = Math.max(1, midnightSec - nowSec);

  const existing = store.get(storeKey);

  if (!existing) {
    store.set(storeKey, { count: 1, resetAt: midnightSec });
    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - 1),
      reset: midnightSec,
      retryAfter,
    };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      reset: existing.resetAt,
      retryAfter,
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - existing.count),
    reset: existing.resetAt,
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
