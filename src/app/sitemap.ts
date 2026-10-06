import { MetadataRoute } from 'next';
import { TOOLS_REGISTRY, SITE_CONFIG, getAllCategoryIds } from '@/lib/tools-registry';
import { BLOG_POSTS } from '@/lib/blog-registry';
import { GUIDE_HUBS } from '@/lib/guides-registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const siteUpdated = new Date('2026-10-01T00:00:00.000Z');

  // Core static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.88,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/compliance`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: siteUpdated,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategoryIds().map((id) => ({
    url: `${baseUrl}/tools/category/${id}`,
    lastModified: siteUpdated,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic tool routes from tools registry
  const toolRoutes: MetadataRoute.Sitemap = TOOLS_REGISTRY.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.updatedAt),
    changeFrequency: tool.priority === 'P0' ? 'weekly' : 'monthly',
    priority: tool.priority === 'P0' ? 0.9 : tool.priority === 'P1' ? 0.8 : 0.7,
  }));

  // Dynamic blog routes
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const guideRoutes: MetadataRoute.Sitemap = GUIDE_HUBS.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.88,
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes, ...blogRoutes, ...guideRoutes];
}
