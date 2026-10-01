# Google OAuth Setup - Owner-Verified YouTube Monetization

This project supports an optional owner-only YPP monetization verification flow. Public channel checks continue to work without Google login.

## 1. Google Cloud APIs

In the same Google Cloud project, enable:

- YouTube Data API v3
- YouTube Analytics API

## 2. OAuth consent screen

Configure your production app identity using:

- Homepage: `https://youtubefreetoolkit.com/`
- Privacy Policy: `https://youtubefreetoolkit.com/privacy`
- Terms: `https://youtubefreetoolkit.com/terms`

The verification flow requests only these read-only scopes:

- `https://www.googleapis.com/auth/youtube.readonly`
- `https://www.googleapis.com/auth/yt-analytics-monetary.readonly`

Google may require OAuth app verification before a public app can use these scopes broadly. Complete Google’s verification process before production launch if prompted.

Official references:

- https://developers.google.com/youtube/v3/guides/auth/server-side-web-apps
- https://developers.google.com/youtube/reporting/guides/authorization
- https://developers.google.com/youtube/analytics/channel_reports

## 3. OAuth Web Application client

Create an OAuth 2.0 Client ID with application type **Web application**.

Authorized redirect URI:

`https://youtubefreetoolkit.com/api/youtube/monetization/callback`

The redirect URI must match exactly.

## 4. Production environment variables

Set these in Vercel / your host:

```env
YOUTUBE_API_KEY=your_youtube_data_api_key
NEXT_PUBLIC_SITE_URL=https://youtubefreetoolkit.com
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_OAUTH_REDIRECT_URI=https://youtubefreetoolkit.com/api/youtube/monetization/callback
YOUTUBE_OAUTH_STATE_SECRET=use_a_random_secret_of_at_least_32_characters
```

Generate `YOUTUBE_OAUTH_STATE_SECRET` with a cryptographically random secret. Do not commit production secrets to Git.

## 5. How verification works

1. User checks a public channel.
2. If they own it, they click **Verify Exact Monetization Status**.
3. Google handles sign-in and consent.
4. The server uses `youtube.readonly` to confirm the authenticated account owns the checked channel.
5. The server calls a normal YouTube Analytics metric first to confirm Analytics/API access is healthy.
6. The server then calls a monetary metric (`estimatedRevenue`).
7. Success means owner-authorized monetary reporting is available. YouTube documents monetary channel reports as requiring YPP membership.
8. If normal Analytics works but the monetary metric returns HTTP 403, the UI reports the documented non-YPP result.

The access token is used during the callback request and is not intentionally persisted in the application database or browser storage.

## 6. Production checklist

- Connect `youtubefreetoolkit.com` to the deployment before OAuth production testing.
- Force HTTPS and redirect any alternate hostnames to the canonical domain at the hosting/CDN level.
- Verify the domain in Google Search Console.
- Submit `https://youtubefreetoolkit.com/sitemap.xml` in Search Console.
- Run Google Rich Results Test for the monetization tool page.
- Run PageSpeed Insights on mobile after production deployment and monitor field Core Web Vitals.
- Test OAuth with both a YPP channel and a non-YPP channel you are authorized to access.
