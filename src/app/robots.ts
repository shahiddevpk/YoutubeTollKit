import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/tools-registry';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // API routes + OAuth callbacks (Rank Math: no thin/utility endpoints in index)
      disallow: ['/api/'],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}
