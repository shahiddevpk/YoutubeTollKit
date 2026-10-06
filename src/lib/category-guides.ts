import type { ToolCategory } from '@/types/tools';

export const CATEGORY_GUIDES: Record<
  ToolCategory,
  { intro: string; paragraphs: string[] }
> = {
  monetization: {
    intro: 'Plan revenue responsibly with calculators and unofficial monetization indicators.',
    paragraphs: [
      'Tools in this category use public YouTube Data API fields or your own inputs. They do not download videos, bypass restrictions, or promise Partner Program approval.',
      'Calculators show estimated ranges based on RPM and view assumptions you control. The monetization checker highlights public eligibility signals and optional owner verification through read-only Analytics access.',
      'Always confirm monetization status, payouts, and policy messages inside YouTube Studio and AdSense.',
    ],
  },
  research: {
    intro: 'Look up public channel identifiers and compare surface-level stats.',
    paragraphs: [
      'Research utilities help you find canonical channel IDs, handles, and RSS links, or compare public subscriber and view totals between channels.',
      'Data is limited to what YouTube exposes publicly. We do not estimate private revenue, demographics, or monetization enrollment for channels you do not own.',
      'Use these tools for competitive research, automation setup, and milestone tracking—not for harassment or scraping beyond API terms.',
    ],
  },
  seo: {
    intro: 'Improve titles, tags, descriptions, and hashtags before you publish.',
    paragraphs: [
      'SEO tools audit metadata length, keyword placement, and formatting conventions that affect click-through rate and clarity in search.',
      'Scores and suggestions are educational. YouTube ranking still depends on viewer satisfaction, retention, and relevance after upload.',
      'Extract only public tags and metadata. Do not misrepresent video topics with unrelated keywords or hashtags.',
    ],
  },
  analytics: {
    intro: 'Track public counters and engagement-friendly displays.',
    paragraphs: [
      'Analytics utilities read public statistics such as subscriber and view counts suitable for dashboards or live overlays.',
      'Rounded public numbers may differ slightly from precise values in YouTube Studio. Refresh data before announcing milestones on stream.',
      'These tools are not a replacement for YouTube Analytics when you need revenue, traffic sources, or audience demographics.',
    ],
  },
  utilities: {
    intro: 'Shorts layouts, thumbnails, chapters, and upload checklists.',
    paragraphs: [
      'Utility tools help you format descriptions, validate chapters, preview thumbnails, and keep text inside Shorts safe zones.',
      'Downloading a PNG overlay template from the Shorts safe-zone tool is a design file for your editor—not a YouTube video download.',
      'Pair utilities with your normal quality review so technical formatting supports strong storytelling.',
    ],
  },
};
