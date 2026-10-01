import { FAQItem } from './tools';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Monetization' | 'YouTube SEO' | 'Channel Growth' | 'Troubleshooting';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  coverImage?: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  toolCta: {
    slug: string;
    title: string;
    description: string;
    buttonText: string;
  };
  tableOfContents: { id: string; title: string }[];
  content: string; // Rich Markdown / HTML content
  faqs: FAQItem[];
  relatedBlogSlugs: string[];
}
