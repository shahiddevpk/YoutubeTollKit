import { NextRequest, NextResponse } from 'next/server';
import {
  MONETIZATION_RESULT_COOKIE,
  OAUTH_NONCE_COOKIE,
  YOUTUBE_MONETARY_SCOPE,
  getOAuthConfig,
  getSiteUrl,
  secureCookieOptions,
  signVerificationResult,
  verifyOAuthState,
  type MonetizationVerificationResult,
} from '@/lib/youtube-oauth';

export const dynamic = 'force-dynamic';

type TokenResponse = {
  access_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
};

type OwnedChannel = {
  id: string;
  snippet?: {
    title?: string;
    customUrl?: string;
  };
};

function toolUrl() {
  return `${getSiteUrl()}/tools/monetization-checker`;
}

function withResult(result: MonetizationVerificationResult) {
  const response = NextResponse.redirect(`${toolUrl()}?owner_verified=1`);
  response.cookies.set(MONETIZATION_RESULT_COOKIE, signVerificationResult(result), secureCookieOptions(10 * 60));
  response.cookies.set(OAUTH_NONCE_COOKIE, '', {
    ...secureCookieOptions(0, '/api/youtube/monetization'),
    expires: new Date(0),
  });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

function errorResult(message: string): MonetizationVerificationResult {
  return {
    status: 'error',
    checkedAt: new Date().toISOString(),
    message,
    source: 'youtube_analytics_api',
  };
}

async function getJsonWithBearer(url: string, accessToken: string) {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });
  const body = await response.json().catch(() => ({}));
  return { response, body };
}

function analyticsUrl(metrics: string) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 4);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 27);

  const params = new URLSearchParams({
    ids: 'channel==MINE',
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
    metrics,
  });
  return `https://youtubeanalytics.googleapis.com/v2/reports?${params.toString()}`;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const stateToken = url.searchParams.get('state') || '';
  const code = url.searchParams.get('code') || '';
  const oauthError = url.searchParams.get('error');
  let state: ReturnType<typeof verifyOAuthState> = null;
  try {
    state = stateToken ? verifyOAuthState(stateToken) : null;
  } catch {
    return NextResponse.redirect(`${toolUrl()}?oauth_error=oauth_not_configured`);
  }
  const nonceCookie = req.cookies.get(OAUTH_NONCE_COOKIE)?.value;

  if (oauthError) {
    return withResult(errorResult(oauthError === 'access_denied' ? 'Verification was cancelled. No YouTube account data was accessed.' : 'Google authorization did not complete. Please try again.'));
  }

  if (!state || !nonceCookie || state.nonce !== nonceCookie || !code) {
    return withResult(errorResult('The verification session expired or could not be validated. Please start the owner verification again.'));
  }

  try {
    const { clientId, clientSecret, redirectUri } = getOAuthConfig();
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000),
    });

    const token = (await tokenResponse.json()) as TokenResponse;
    if (!tokenResponse.ok || !token.access_token) {
      return withResult(errorResult('Google authorization could not be exchanged for a temporary access token. Please try again.'));
    }

    if (token.scope && !token.scope.split(' ').includes(YOUTUBE_MONETARY_SCOPE)) {
      return withResult(errorResult('The required read-only YouTube monetary analytics permission was not granted.'));
    }

    const channelLookup = await getJsonWithBearer(
      'https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true&maxResults=50',
      token.access_token
    );

    if (!channelLookup.response.ok) {
      return withResult(errorResult('We could not read the YouTube channel connected to this Google account. Make sure the account has a YouTube channel and try again.'));
    }

    const ownedChannels = (channelLookup.body?.items || []) as OwnedChannel[];
    const matchedChannel = ownedChannels.find((channel) => channel.id === state.targetChannelId);

    if (!matchedChannel) {
      const connected = ownedChannels[0];
      return withResult({
        status: 'channel_mismatch',
        channelId: connected?.id,
        channelTitle: connected?.snippet?.title,
        handle: connected?.snippet?.customUrl,
        checkedAt: new Date().toISOString(),
        message: connected
          ? `The Google account you authorized is connected to “${connected.snippet?.title || 'another channel'}”, not the channel you checked. Sign in with the owner account for the target channel.`
          : 'The authorized Google account does not expose the target YouTube channel. Sign in with the owner account for the channel you checked.',
        source: 'youtube_analytics_api',
      });
    }

    // First prove that normal Analytics access works. This prevents us from
    // misclassifying a generic API/configuration 403 as a non-monetized channel.
    const baseline = await getJsonWithBearer(analyticsUrl('views'), token.access_token);
    if (!baseline.response.ok) {
      return withResult({
        status: 'error',
        channelId: matchedChannel.id,
        channelTitle: matchedChannel.snippet?.title,
        handle: matchedChannel.snippet?.customUrl,
        checkedAt: new Date().toISOString(),
        message: 'Owner identity was confirmed, but YouTube Analytics access failed. Confirm that the YouTube Analytics API is enabled for your Google Cloud project and retry.',
        source: 'youtube_analytics_api',
      });
    }

    const monetary = await getJsonWithBearer(analyticsUrl('estimatedRevenue'), token.access_token);

    if (monetary.response.ok) {
      return withResult({
        status: 'monetized',
        channelId: matchedChannel.id,
        channelTitle: matchedChannel.snippet?.title,
        handle: matchedChannel.snippet?.customUrl,
        checkedAt: new Date().toISOString(),
        message: 'Monetization verified. YouTube Analytics accepted an owner-authorized monetary metrics request for this channel, which YouTube documents as requiring YPP membership.',
        source: 'youtube_analytics_api',
      });
    }

    if (monetary.response.status === 403) {
      return withResult({
        status: 'not_monetized',
        channelId: matchedChannel.id,
        channelTitle: matchedChannel.snippet?.title,
        handle: matchedChannel.snippet?.customUrl,
        checkedAt: new Date().toISOString(),
        message: 'Owner verification succeeded, normal Analytics access works, and the monetary report returned 403. YouTube documents this response for channels that are not YPP members.',
        source: 'youtube_analytics_api',
      });
    }

    return withResult({
      status: 'error',
      channelId: matchedChannel.id,
      channelTitle: matchedChannel.snippet?.title,
      handle: matchedChannel.snippet?.customUrl,
      checkedAt: new Date().toISOString(),
      message: `Owner identity was confirmed, but YouTube monetary analytics returned HTTP ${monetary.response.status}. No monetization conclusion was made.`,
      source: 'youtube_analytics_api',
    });
  } catch (error) {
    console.error('YouTube owner monetization verification failed', error instanceof Error ? error.message : 'unknown');
    return withResult(errorResult('YouTube owner verification is temporarily unavailable. Please try again shortly.'));
  }
}
