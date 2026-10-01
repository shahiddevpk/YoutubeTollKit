export type ToolCategory =
  | 'monetization'
  | 'research'
  | 'seo'
  | 'analytics'
  | 'utilities';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface ToolDefinition {
  slug: string;
  name: string;
  shortTitle: string;
  headline: string;
  description: string;
  category: ToolCategory;
  badge?: 'Popular' | 'Flagship' | 'Trending' | 'Essential' | 'New' | 'Creator Pick';
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  featured: boolean;
  iconName: string; // Lucide icon identifier
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  howItWorks: HowItWorksStep[];
  features: string[];
  limitations: string[];
  faqs: FAQItem[];
  relatedToolSlugs: string[];
  relatedBlogSlugs?: string[];
  updatedAt: string;
}

export interface CategoryDefinition {
  id: ToolCategory;
  name: string;
  description: string;
  iconName: string;
  gradient: string;
}
