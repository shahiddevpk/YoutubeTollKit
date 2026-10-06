/**
 * Next.js equivalents for common Rank Math (WordPress) settings.
 * Do not import Rank Math JSON exports directly — they are site-specific
 * (URLs, verification tokens, WooCommerce, etc.).
 *
 * | Rank Math (WP)              | This project                          |
 * |-----------------------------|---------------------------------------|
 * | titles / meta templates     | `metadata` per route + tools-registry |
 * | sitemap                     | `src/app/sitemap.ts`                  |
 * | robots / noindex rules      | `robots.ts` + per-route `metadata`    |
 * | Schema (Organization, etc.) | `src/lib/seo.ts` JSON-LD              |
 * | breadcrumbs                 | UI nav + BreadcrumbList schema        |
 * | google_verify               | `GOOGLE_SITE_VERIFICATION` in env     |
 * | noindex search              | `/tools?q=` → noindex (see tools page)|
 * | attachment / author noindex   | N/A (no WP attachments or author URLs)|
 * | redirections              | `src/lib/redirects.ts` + `middleware.ts` |
 * | 404 monitor               | `not-found.tsx` + `not-found-monitor.ts` |
 * | pillar content hubs       | `/guides/*` in `guides-registry.ts`      |
 */

import type { Metadata } from 'next';

export const SEO_SITE = {
  titleSeparator: '—',
  twitterCard: 'summary_large_image' as const,
  /** Match Rank Math `advanced_robots_global` / layout googleBot settings */
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
  },
  /** Filtered / utility URLs should not be indexed (Rank Math: noindex_search) */
  noindexQueryKeys: ['q'] as const,
};

export function defaultRobots(): NonNullable<Metadata['robots']> {
  return {
    index: true,
    follow: true,
    googleBot: SEO_SITE.googleBot,
  };
}

export function noindexFollowRobots(): NonNullable<Metadata['robots']> {
  return {
    index: false,
    follow: true,
    googleBot: {
      ...SEO_SITE.googleBot,
      index: false,
    },
  };
}

export function hasNoindexSearchParams(
  searchParams: Record<string, string | string[] | undefined> | undefined
): boolean {
  if (!searchParams) return false;
  return SEO_SITE.noindexQueryKeys.some((key) => {
    const value = searchParams[key];
    if (Array.isArray(value)) return value.some((v) => v.trim().length > 0);
    return typeof value === 'string' && value.trim().length > 0;
  });
}

export function siteVerificationMetadata(): Pick<Metadata, 'verification'> {
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  if (!google) return {};
  return {
    verification: {
      google,
    },
  };
}
