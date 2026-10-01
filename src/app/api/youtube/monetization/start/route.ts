import { NextRequest, NextResponse } from 'next/server';
import {
  OAUTH_NONCE_COOKIE,
  YOUTUBE_MONETARY_SCOPE,
  YOUTUBE_READONLY_SCOPE,
  createNonce,
  getOAuthConfig,
  getSiteUrl,
  secureCookieOptions,
  signOAuthState,
} from '@/lib/youtube-oauth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const targetChannelId = new URL(req.url).searchParams.get('channelId')?.trim() || '';
  const returnUrl = `${getSiteUrl()}/tools/monetization-checker`;

  if (!/^UC[a-zA-Z0-9_-]{22}$/.test(targetChannelId)) {
    return NextResponse.redirect(`${returnUrl}?oauth_error=invalid_channel`);
  }

  try {
    const { clientId, redirectUri } = getOAuthConfig();
    const nonce = createNonce();
    const state = signOAuthState({
      nonce,
      targetChannelId,
      exp: Date.now() + 10 * 60 * 1000,
    });

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', `${YOUTUBE_READONLY_SCOPE} ${YOUTUBE_MONETARY_SCOPE}`);
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('access_type', 'online');
    authUrl.searchParams.set('include_granted_scopes', 'true');
    authUrl.searchParams.set('prompt', 'select_account');

    const response = NextResponse.redirect(authUrl);
    response.cookies.set(OAUTH_NONCE_COOKIE, nonce, secureCookieOptions(10 * 60, '/api/youtube/monetization'));
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) {
    console.error('Unable to start YouTube monetization verification', error instanceof Error ? error.message : 'unknown');
    return NextResponse.redirect(`${returnUrl}?oauth_error=oauth_not_configured`);
  }
}
