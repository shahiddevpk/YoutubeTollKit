/**
 * ISR window for marketing/tool pages (SEO HTML cached at the CDN).
 * Route files must use the same literal: `export const revalidate = 3600` (Next.js static analysis).
 */
export const PAGE_REVALIDATE_SECONDS = 3600;

/** CDN/browser hint for mostly-static HTML (paired with ISR on App Router pages). */
export const HTML_CACHE_CONTROL =
  'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400';
