import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

/** CDN cache for pre-rendered SEO pages (ISR revalidate=3600 on those routes). */
const htmlCacheHeader = {
  key: 'Cache-Control',
  value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
};

const seoPageSources = [
  '/',
  '/tools',
  '/tools/:path*',
  '/blog',
  '/blog/:path*',
  '/about',
  '/privacy',
  '/terms',
  '/compliance',
  '/contact',
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      ...seoPageSources.map((source) => ({
        source,
        headers: [...securityHeaders, htmlCacheHeader],
      })),
      {
        source: '/api/:path*',
        headers: securityHeaders,
      },
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
