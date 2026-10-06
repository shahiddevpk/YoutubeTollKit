/**
 * Rank Math “Redirections” equivalent — edit this map when URLs change.
 * Keys must be lowercase paths without trailing slash (middleware normalizes).
 */

export type RedirectRule = {
  destination: string;
  permanent?: boolean;
};

/** 301 by default; set permanent: false for temporary moves */
export const REDIRECT_RULES: Record<string, RedirectRule> = {
  // Legacy / marketing shortcuts → canonical tool routes
  '/youtube-monetization-checker': { destination: '/tools/monetization-checker' },
  '/monetization-checker': { destination: '/tools/monetization-checker' },
  '/channel-id-finder': { destination: '/tools/channel-id-finder' },
  '/tag-extractor': { destination: '/tools/tag-extractor' },
  '/tools-directory': { destination: '/tools' },
  '/creator-tools': { destination: '/tools' },
  '/tools/live-subscriber-counter': { destination: '/tools/live-subscriber-count' },
  '/guides/monetization': { destination: '/guides/youtube-monetization' },
  '/guides/seo': { destination: '/guides/youtube-seo' },

  // WordPress migration hygiene (Rank Math often redirects attachments)
  '/wp-admin': { destination: '/' },
  '/wp-login.php': { destination: '/' },
  '/feed': { destination: '/blog' },
  '/rss': { destination: '/blog' },
  '/comments/feed': { destination: '/blog' },
};

export function resolveRedirect(pathname: string): RedirectRule | null {
  const path = pathname.replace(/\/+$/, '') || '/';
  const key = path.toLowerCase();
  return REDIRECT_RULES[key] ?? null;
}
