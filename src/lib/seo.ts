import { ToolDefinition, FAQItem } from '@/types/tools';
import { SITE_CONFIG } from '@/lib/tools-registry';
import { Metadata } from 'next';

export function constructToolMetadata(tool: ToolDefinition): Metadata {
  const canonicalUrl = `${SITE_CONFIG.url}/tools/${tool.slug}`;

  return {
    title: {
      absolute: tool.metaTitle,
    },
    description: tool.metaDescription,
    keywords: [tool.primaryKeyword, ...tool.secondaryKeywords, 'youtube creator tools', 'free youtube toolkit'],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: tool.metaTitle,
      description: tool.metaDescription,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(tool.name)}&desc=${encodeURIComponent(tool.headline)}`,
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
      title: tool.metaTitle,
      description: tool.metaDescription,
      images: [
        `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(tool.name)}&desc=${encodeURIComponent(tool.headline)}`,
      ],
    },
  };
}

export function generateWebApplicationSchema(tool: ToolDefinition) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    url: `${SITE_CONFIG.url}/tools/${tool.slug}`,
    description: tool.description,
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

export function generateFAQSchema(faqs: FAQItem[]) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
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
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/brand-icon.svg`,
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
