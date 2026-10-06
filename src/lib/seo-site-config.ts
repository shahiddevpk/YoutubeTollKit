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
 * | noindex search              | `?q=` on `/tools`, `/blog` → noindex   |
 * | noindex_paginated_pages     | `?page=2+` on index routes → noindex   |
 * | OAuth / utility query URLs  | `oauth_error`, `owner_verified` → noindex |
 * | new_window_external_links   | `markdown-to-html.ts` external `<a>`     |
 * | llms / AI visibility        | `public/llms.txt`                        |
 * | FAQPage JSON-LD             | Omitted (rich results retired; FAQs on-page) |
 * | WebSite SearchAction        | Omitted (sitelinks search box retired)   |
 * | attachment noindex          | N/A (no WP media attachments)            |
 * | author archives noindex     | We index `/author/shahid` (E-E-A-T hub)  |
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
  /** Filtered URLs (Rank Math: noindex_search) */
  noindexQueryKeys: ['q'] as const,
  /** OAuth return / status params — thin duplicates of tool pages */
  noindexUtilityQueryKeys: ['oauth_error', 'owner_verified', 'error'] as const,
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

function queryParamHasValue(value: string | string[] | undefined): boolean {
  if (Array.isArray(value)) return value.some((v) => v.trim().length > 0);
  return typeof value === 'string' && value.trim().length > 0;
}

/** Rank Math: noindex_search, noindex_paginated_pages, and utility query variants. */
export function hasNoindexSearchParams(
  searchParams: Record<string, string | string[] | undefined> | undefined
): boolean {
  if (!searchParams) return false;

  const matchesKeyList = (keys: readonly string[]) =>
    keys.some((key) => queryParamHasValue(searchParams[key]));

  if (matchesKeyList(SEO_SITE.noindexQueryKeys)) return true;
  if (matchesKeyList(SEO_SITE.noindexUtilityQueryKeys)) return true;

  const page = searchParams.page;
  const pageNum = Array.isArray(page) ? parseInt(page[0] ?? '', 10) : parseInt(page ?? '', 10);
  if (!Number.isNaN(pageNum) && pageNum >= 2) return true;

  return false;
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
