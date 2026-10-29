import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/tools-registry';

/** Google + Bing crawlers that may crawl the site; every other bot is disallowed. */
const ALLOWED_BOTS = [
  'Googlebot',
  'Googlebot-Image',
  'Googlebot-Video',
  'Googlebot-News',
  'Storebot-Google',
  'Google-InspectionTool',
  'GoogleOther',
  'Google-Extended',
  'AdsBot-Google',
  'AdsBot-Google-Mobile',
  'Mediapartners-Google',
  'Bingbot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ALLOWED_BOTS,
        allow: '/',
        // API routes + OAuth callbacks (Rank Math: no thin/utility endpoints in index)
        disallow: ['/api/'],
      },
      {
        userAgent: '*',
        disallow: '/',
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
