import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const YOUTUBE_READONLY_SCOPE = 'https://www.googleapis.com/auth/youtube.readonly';
export const YOUTUBE_MONETARY_SCOPE = 'https://www.googleapis.com/auth/yt-analytics-monetary.readonly';

export const OAUTH_NONCE_COOKIE = 'ytt_oauth_nonce';
export const MONETIZATION_RESULT_COOKIE = 'ytt_monetization_result';

const DEFAULT_SITE_URL = 'https://youtubefreetoolkit.com';

export type MonetizationVerificationStatus =
  | 'monetized'
  | 'not_monetized'
  | 'channel_mismatch'
  | 'error';

export interface MonetizationVerificationResult {
  status: MonetizationVerificationStatus;
  channelId?: string;
  channelTitle?: string;
  handle?: string;
  checkedAt: string;
  message: string;
  source: 'youtube_analytics_api';
}

interface OAuthStatePayload {
  nonce: string;
  targetChannelId: string;
  exp: number;
}

interface SignedEnvelope<T> {
  payload: T;
  exp: number;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function getSigningSecret() {
  const secret = process.env.YOUTUBE_OAUTH_STATE_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('YOUTUBE_OAUTH_STATE_SECRET must be configured with at least 32 characters.');
  }
  return secret;
}

function signEncodedPayload(encodedPayload: string) {
  return createHmac('sha256', getSigningSecret()).update(encodedPayload).digest('base64url');
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) return false;
  return timingSafeEqual(aBuffer, bBuffer);
}

export function createNonce() {
  return randomBytes(24).toString('base64url');
}

export function signOAuthState(payload: OAuthStatePayload) {
  const encoded = base64UrlEncode(JSON.stringify(payload));
  return `${encoded}.${signEncodedPayload(encoded)}`;
}

export function verifyOAuthState(token: string): OAuthStatePayload | null {
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return null;
  const expected = signEncodedPayload(encoded);
  if (!safeEqual(signature, expected)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encoded)) as OAuthStatePayload;
    if (!payload.nonce || !/^UC[a-zA-Z0-9_-]{22}$/.test(payload.targetChannelId)) return null;
    if (!payload.exp || Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}

export function signVerificationResult(result: MonetizationVerificationResult, ttlMs = 10 * 60 * 1000) {
  const envelope: SignedEnvelope<MonetizationVerificationResult> = {
    payload: result,
    exp: Date.now() + ttlMs,
  };
  const encoded = base64UrlEncode(JSON.stringify(envelope));
  return `${encoded}.${signEncodedPayload(encoded)}`;
}

export function verifyVerificationResult(token: string): MonetizationVerificationResult | null {
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return null;
  const expected = signEncodedPayload(encoded);
  if (!safeEqual(signature, expected)) return null;

  try {
    const envelope = JSON.parse(base64UrlDecode(encoded)) as SignedEnvelope<MonetizationVerificationResult>;
    if (!envelope.exp || Date.now() > envelope.exp) return null;
    return envelope.payload;
  } catch {
    return null;
  }
}

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '');
  if (configured) return configured;
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  return DEFAULT_SITE_URL;
}

export function getOAuthRedirectUri() {
  return (
    process.env.GOOGLE_OAUTH_REDIRECT_URI ||
    `${getSiteUrl()}/api/youtube/monetization/callback`
  );
}

export function getOAuthConfig() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('Google OAuth client credentials are not configured.');
  }
  // Also validate the signing secret before starting an auth flow.
  getSigningSecret();
  return { clientId, clientSecret, redirectUri: getOAuthRedirectUri() };
}

export function secureCookieOptions(maxAgeSeconds: number, path = '/') {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path,
    maxAge: maxAgeSeconds,
  };
}

export function formatUtcDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
