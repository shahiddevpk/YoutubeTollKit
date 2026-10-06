import type { ToolCategory } from '@/types/tools';

export const CATEGORY_GUIDES: Record<
  ToolCategory,
  { intro: string; paragraphs: string[] }
> = {
  monetization: {
    intro:
      'Plan revenue responsibly with calculators and unofficial monetization indicators — built for creators who want clarity without downloaders or exaggerated promises.',
    paragraphs: [
      'Tools in this category use public YouTube Data API fields or assumptions you enter yourself. They do not download videos, bypass restrictions, or guarantee Partner Program approval. Treat every output as orientation, then confirm eligibility, payouts, and policy messages inside YouTube Studio and AdSense.',
      'The monetization checker summarizes public statistics that relate to YouTube Partner Program (YPP) thresholds, such as subscriber totals and public video counts. Channel owners may optionally connect read-only Google access to see whether YouTube Analytics exposes monetary metrics for their own account — that is stronger than guessing from page markup, but still not a substitute for official Studio notifications.',
      'Earnings and RPM calculators model scenarios using RPM and view inputs you control. They are useful for sponsorship negotiations, content planning, and understanding how geography or niche might shift revenue — not for predicting another creator’s income.',
      'Before applying to YPP, review reused-content rules, music licensing, and community guidelines strikes. Public tools cannot see private watch hours, Shorts view bank totals, or AdSense linkage for channels you do not own.',
      'Pair these utilities with our monetization hub and blog guides on 2026 YPP requirements so your team shares the same vocabulary about “public signals” versus verified owner data.',
    ],
  },
  research: {
    intro:
      'Look up public channel identifiers, compare surface-level stats, and wire automations without crossing YouTube API terms.',
    paragraphs: [
      'Research utilities help you find canonical channel IDs (UC…), @handles, and RSS feed URLs, or compare public subscriber and view totals between channels. These fields are what legitimate integrations, Discord bots, and feed readers expect.',
      'Data is limited to what YouTube exposes publicly through official APIs. We do not estimate private revenue, demographics, watch hours, or monetization enrollment for third-party channels. Seeing ads on a video is not proof the uploader receives revenue.',
      'Use comparisons for niche benchmarking, milestone motivation, and content strategy — not for harassment, brigading, or scraping beyond documented quotas. Store only fields your use case needs and refresh numbers before publishing screenshots.',
      'Handles and custom URLs can change; channel IDs stay stable. When you build automations, persist the UC ID and treat handles as display labels. If a lookup fails, test with a recent public video URL from the same channel.',
      'Our troubleshooting hub explains common mistakes (rounded subscriber displays, stale API cache) and links to step-by-step articles on channel IDs versus handles.',
    ],
  },
  seo: {
    intro:
      'Improve titles, tags, descriptions, hashtags, and chapters before you publish — with audits that favor clarity over keyword stuffing.',
    paragraphs: [
      'SEO tools on this site audit metadata length, keyword placement, and formatting conventions that affect click-through rate and comprehension in search and browse surfaces. They help you remove friction from packaging so YouTube can test the right audience.',
      'Scores and suggestions are educational heuristics. Ranking and suggested traffic still depend on viewer satisfaction, retention, and relevance after upload. No metadata tweak compensates for misleading titles or weak storytelling.',
      'Tag and hashtag helpers should use public research ethically: extract tags only from public videos, cluster themes, then rewrite metadata for your own footage. Copying competitor tag blocks verbatim adds little value and can misrepresent your video.',
      'Descriptions benefit from a strong hook above the “Show more” fold, accurate chapters starting at 00:00, and links that support the viewer journey. Pair the title analyzer with thumbnail previews so mobile truncation does not hide your main promise.',
      'Visit the YouTube SEO hub for a publishing workflow that connects these tools with our upload checklist and timestamp validator.',
    ],
  },
  analytics: {
    intro:
      'Track public counters and build engagement-friendly displays using the same statistics YouTube shows on channel pages.',
    paragraphs: [
      'Analytics utilities read public statistics such as subscriber counts, total channel views, and video totals. They suit live stream overlays, milestone announcements, and lightweight dashboards when you do not need private Studio metrics.',
      'Rounded public numbers may differ slightly from precise values in YouTube Analytics, especially on large channels. API responses can also lag a few minutes behind Studio during viral spikes. Refresh before on-stream reveals and say overlays use public data.',
      'These tools are not replacements for YouTube Analytics when you need revenue, traffic sources, audience demographics, or retention curves. Use Studio for monetization reporting and policy messages.',
      'If you compare channels, stick to public fields and avoid presenting rounded totals as contractual proof. Combine numbers with qualitative review of content quality and upload consistency.',
      'Our live subscriber guide explains how to disclose data sources to viewers and when to re-fetch counts during subathons or charity streams.',
    ],
  },
  utilities: {
    intro:
      'Shorts safe zones, thumbnail previews, chapter validation, and upload checklists that support polish — not shortcuts around YouTube policies.',
    paragraphs: [
      'Utility tools help you format descriptions, validate timestamp chapters, preview thumbnails in desktop and mobile frames, and keep text inside Shorts safe zones. They reduce preventable publishing mistakes so viewers see your story clearly.',
      'Downloading a PNG overlay from the Shorts safe-zone tool is a design asset for your editor — not a YouTube video download. Uploading a draft thumbnail for preview stays in your browser session; we do not host your full video files.',
      'Checklists and validators work best as team rituals: producers, editors, and hosts share the same pre-publish pass so end screens, cards, and disclosure language are not forgotten on busy upload days.',
      'Thumbnail preview uses public stills or images you upload locally. Use it to check contrast, text size, and duration-badge overlap before you commit in YouTube Studio.',
      'Pair utilities with SEO audits so technical formatting supports strong hooks. The utilities category is where “last mile” quality happens after scripting and editing are done.',
    ],
  },
};
