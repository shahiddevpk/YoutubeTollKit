import { FAQItem } from './tools';

export interface GuideSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface GuideHub {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  updatedAt: string;
  intro: string;
  sections: GuideSection[];
  toolSlugs: string[];
  blogSlugs: string[];
  faqs: FAQItem[];
}
