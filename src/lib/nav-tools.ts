export interface NavToolItem {
  slug: string;
  name: string;
  description: string;
  category: string;
  badge?: string;
  primaryKeyword: string;
}

export const NAV_TOOLS: NavToolItem[] = [
  {
    slug: 'monetization-checker',
    name: 'YouTube Monetization Checker',
    description: 'Unofficial public YPP eligibility signals; optional owner verification via YouTube Analytics.',
    category: 'monetization',
    badge: 'Flagship',
    primaryKeyword: 'youtube monetization checker',
  },
  {
    slug: 'channel-id-finder',
    name: 'YouTube Channel ID Finder',
    description: 'Find official UC Channel IDs from handles, custom URLs, or video links.',
    category: 'research',
    badge: 'Popular',
    primaryKeyword: 'youtube channel id finder',
  },
  {
    slug: 'tag-extractor',
    name: 'YouTube Tag Extractor',
    description: 'Extract and analyze video tags and keywords from public YouTube videos.',
    category: 'seo',
    badge: 'Essential',
    primaryKeyword: 'youtube tag extractor',
  },
  {
    slug: 'earnings-calculator',
    name: 'YouTube Earnings Calculator',
    description: 'Model transparent YouTube ad revenue scenarios by niche and RPM.',
    category: 'monetization',
    badge: 'Trending',
    primaryKeyword: 'youtube earnings calculator',
  },
  {
    slug: 'seo-score-checker',
    name: 'YouTube SEO Score Checker',
    description: 'Audit video titles, descriptions, and tag optimization for search rankings.',
    category: 'seo',
    badge: 'Popular',
    primaryKeyword: 'youtube seo score checker',
  },
  {
    slug: 'live-subscriber-count',
    name: 'Live Subscriber Counter',
    description: 'Real-time subscriber counter and milestone tracker for public channels.',
    category: 'analytics',
    primaryKeyword: 'youtube live subscriber count',
  },
  {
    slug: 'thumbnail-preview',
    name: 'YouTube Thumbnail Preview',
    description: 'Preview video thumbnails across dark/light mode and feed layouts.',
    category: 'utilities',
    primaryKeyword: 'youtube thumbnail preview',
  },
  {
    slug: 'title-description-analyzer',
    name: 'Title & Description Analyzer',
    description: 'Optimize CTR, character limits, keywords, and mobile readability.',
    category: 'seo',
    primaryKeyword: 'youtube title description analyzer',
  },
  {
    slug: 'hashtag-generator',
    name: 'YouTube Hashtag Generator',
    description: 'Generate trending, contextual hashtags for Shorts and long-form videos.',
    category: 'utilities',
    primaryKeyword: 'youtube hashtag generator',
  },
  {
    slug: 'shorts-safe-zone',
    name: 'Shorts Safe Zone Checker',
    description: 'Overlay UI boundaries to ensure text and faces are never obstructed on mobile.',
    category: 'utilities',
    badge: 'New',
    primaryKeyword: 'youtube shorts safe zone checker',
  },
  {
    slug: 'timestamp-validator',
    name: 'Timestamp & Chapter Validator',
    description: 'Format, validate, and verify video chapter timestamps for YouTube description guidelines.',
    category: 'utilities',
    primaryKeyword: 'youtube timestamp validator',
  },
  {
    slug: 'rpm-calculator',
    name: 'YouTube RPM Calculator',
    description: 'Calculate effective revenue per 1,000 views across content categories and countries.',
    category: 'monetization',
    primaryKeyword: 'youtube rpm calculator',
  },
  {
    slug: 'channel-compare',
    name: 'YouTube Channel Compare',
    description: 'Compare subscriber growth, video volume, and views side-by-side.',
    category: 'research',
    primaryKeyword: 'youtube channel comparison',
  },
  {
    slug: 'upload-checklist',
    name: 'YouTube Upload Checklist',
    description: 'Interactive pre-publish checklist to maximize reach and avoid common SEO mistakes.',
    category: 'utilities',
    badge: 'Creator Pick',
    primaryKeyword: 'youtube video upload checklist',
  },
];

export const TOTAL_TOOLS_COUNT = NAV_TOOLS.length;
