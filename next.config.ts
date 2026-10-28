import type { NextConfig } from "next";
import { REDIRECT_RULES } from "./src/lib/redirects";

/**
 * noindex for filtered / OAuth-return / paginated query URLs (mirrors
 * SEO_SITE.noindexQueryKeys + noindexUtilityQueryKeys + page>=2). Sent as a
 * header so the pages themselves stay fully static.
 */
const noindexQueryRules = [
  ...['q', 'oauth_error', 'owner_verified', 'error', 'channel'].map((key) => ({ key, value: '.+' })),
  { key: 'page', value: '([2-9]|[1-9]\\d+)' },
].map(({ key, value }) => ({
  source: '/:path*',
  has: [{ type: 'query' as const, key, value }],
  headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }],
}));

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

/** Enhanced CDN / Edge cache for pre-rendered SEO pages */
const htmlCacheHeader = {
  key: 'Cache-Control',
  value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
};

/** Static public assets cache (SVGs, icons, manifests) */
const staticAssetCacheHeader = {
  key: 'Cache-Control',
  value: 'public, max-age=31536000, immutable',
};

const seoPageSources = [
  '/',
  '/tools',
  '/tools/:path*',
  '/blog',
  '/blog/:path*',
  '/guides',
  '/guides/:path*',
  '/about',
  '/privacy',
  '/terms',
  '/compliance',
  '/contact',
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'clsx', 'tailwind-merge'],
  },
  async headers() {
    return [
      {
        source: '/:path*.svg',
        headers: [staticAssetCacheHeader],
      },
      {
        source: '/manifest.json',
        headers: [staticAssetCacheHeader],
      },
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
      ...noindexQueryRules,
    ];
  },
  async redirects() {
    return Object.entries(REDIRECT_RULES).map(([source, rule]) => ({
      source,
      destination: rule.destination,
      statusCode: rule.permanent === false ? 302 : 301,
    }));
  },
};

export default nextConfig;
