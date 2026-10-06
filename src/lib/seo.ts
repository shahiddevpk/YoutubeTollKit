import { ToolDefinition } from '@/types/tools';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { defaultRobots, siteVerificationMetadata, SEO_SITE } from '@/lib/seo-site-config';
import { Metadata } from 'next';

/** Root layout metadata (Rank Math “titles” + “general” global defaults). */
export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: `Free YouTube Creator Tools ${SEO_SITE.titleSeparator} Monetization & SEO Suite | ${SITE_CONFIG.name}`,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [
      'youtube tools',
      'youtube monetization checker',
      'youtube channel id finder',
      'youtube tag extractor',
      'youtube earnings calculator',
      'youtube seo tool',
      'youtube creator toolkit free',
    ],
    authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.creator,
    alternates: {
      canonical: SITE_CONFIG.url,
    },
    icons: {
      icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
      apple: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    },
    manifest: '/manifest.json',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_CONFIG.url,
      title: `Free YouTube Creator Tools ${SEO_SITE.titleSeparator} Monetization & SEO Suite | ${SITE_CONFIG.name}`,
      description: SITE_CONFIG.description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og?title=YouTubeFreeToolkit&desc=Free+YouTube+Creator+Suite`,
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      title: `Free YouTube Creator Tools ${SEO_SITE.titleSeparator} Monetization & SEO Suite | ${SITE_CONFIG.name}`,
      description: SITE_CONFIG.description,
      images: [`${SITE_CONFIG.url}/api/og?title=YouTubeFreeToolkit&desc=Free+YouTube+Creator+Suite`],
    },
    robots: defaultRobots(),
    ...siteVerificationMetadata(),
  };
}

export function formatToolMetaTitle(tool: ToolDefinition): string {
  const brand = SITE_CONFIG.name;
  const base = tool.metaTitle.replace(new RegExp(`\\s*\\|\\s*${brand}\\s*$`, 'i'), '').trim();
  return `${base} | ${brand}`;
}

export function constructToolMetadata(tool: ToolDefinition): Metadata {
  const canonicalUrl = `${SITE_CONFIG.url}/tools/${tool.slug}`;
  const metaTitle = formatToolMetaTitle(tool);

  return {
    title: {
      absolute: metaTitle,
    },
    description: tool.metaDescription,
    keywords: [tool.primaryKeyword, ...tool.secondaryKeywords, 'youtube creator tools', 'free youtube toolkit'],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: metaTitle,
      description: tool.metaDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(tool.name)}&desc=${encodeURIComponent(tool.description.slice(0, 120))}`,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: SITE_CONFIG.twitterHandle,
      title: metaTitle,
      description: tool.metaDescription,
      images: [
        `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(tool.name)}&desc=${encodeURIComponent(tool.description.slice(0, 120))}`,
      ],
    },
    robots: defaultRobots(),
  };
}

export function generateWebApplicationSchema(tool: ToolDefinition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: `${SITE_CONFIG.url}/tools/${tool.slug}`,
    description: tool.description,
    image: `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(tool.name)}&desc=${encodeURIComponent(tool.description.slice(0, 120))}`,
    keywords: [tool.primaryKeyword, ...tool.secondaryKeywords].join(', '),
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
    isAccessibleForFree: true,
    featureList: tool.features,
    dateModified: tool.updatedAt,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };
}

export function generateHowToSchema(tool: ToolDefinition) {
  if (!tool.howItWorks?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to use ${tool.name}`,
    description: tool.description,
    step: tool.howItWorks.map((step) => ({
      '@type': 'HowToStep',
      position: step.step,
      name: step.title,
      text: step.description,
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    alternateName: 'YouTube Free Toolkit',
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/brand-icon.svg`,
    description: SITE_CONFIG.description,
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    alternateName: 'YouTube Free Toolkit',
    url: SITE_CONFIG.url,
  };
}
