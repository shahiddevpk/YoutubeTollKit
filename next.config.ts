import type { NextConfig } from "next";

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
    ];
  },
};

export default nextConfig;
