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
      'When projecting future revenue, avoid relying on a single static RPM benchmark. Ad rates fluctuate significantly between Q1 (historically lower ad spend across all digital platforms) and Q4 (peak holiday advertising budgets). High-performing creators build conservative, moderate, and optimistic models to plan inventory effectively.',
      'Remember that YouTube takes a 45% revenue share on standard ad placements, meaning your reported RPM is what you pocket after YouTube’s cut. Fan funding mechanisms like Super Chats, Super Thanks, and Channel Memberships feature distinct fee structures that should be accounted for separately.',
      'Never attempt to artificially inflate view counts, buy watch hours from third-party vendor sites, or engage in click circles. YouTube’s automated invalid traffic detection filters fake activity and frequently terminates AdSense associations permanently.',
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
      'For automation architects, persisting the canonical 24-character UC identifier ensures your webhooks and RSS listeners survive future brand renames or handle transfers. YouTube allows creators to update @handles twice within a 14-day window, making handle-based polling unreliable for long-term production pipelines.',
      'When analyzing peer channels, examine upload cadences over 90-day intervals rather than fixating on single viral spikes. Channels that post consistently within focused thematic pillars develop stronger topical authority and higher viewer return rates.',
      'Respect creator boundaries and platform rate limits. Automated requests should include exponential backoff, obey HTTP 429 status codes, and avoid scraping private viewer interactions or comments in bulk.',
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
      'Keep mobile viewing habits at the center of your title strategy. Over 70% of YouTube watch time originates from mobile devices, where titles longer than 50 characters are routinely cut off. Front-load your core value proposition so mobile scrollers immediately understand your promise.',
      'Use video chapters not just for viewer navigation, but to capture Google Search key moments. When Google indexes well-structured timestamps starting at 00:00, your video segments can appear directly in search engine result pages (SERPs) for relevant conversational queries.',
      'Avoid outdated SEO tactics like dumping hundreds of comma-separated tags into your video description box. YouTube explicitly categorizes excessive hidden tag blocks as deceptive metadata, which can lead to algorithmic suppression or Community Guidelines strikes.',
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
      'Since YouTube introduced abbreviated public subscriber counts in September 2019, channels with over 1,000 subscribers display rounded numbers (e.g., 105K instead of 105,423). Creators building live broadcast milestones should set follower goals that align with public rounding steps.',
      'Combine quantitative metrics with qualitative engagement signals. A channel with 50,000 subscribers receiving 500 thoughtful comments per video demonstrates far stronger community health and sponsor value than an inactive channel with 500,000 subscribers and minimal interaction.',
      'When streaming live follower celebrations, use browser source caching to avoid saturating your local streaming machine. Set polling intervals to 30–60 seconds so your broadcast maintains smooth frame rates and complies with YouTube API quota budgets.',
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
      'Vertical video creation requires strict adherence to dynamic UI safe zones. On YouTube Shorts, the bottom 25% of the screen is overlaid with channel handles, sound attribution, and titles, while the right margin contains like, comment, and share buttons. Placing vital graphics or captions in these zones renders them unreadable.',
      'Thumbnail visual contrast should be evaluated across both light and dark display modes. A thumbnail with deep black borders may look striking against a white background but completely dissolve into the YouTube dark mode feed.',
      'Make pre-publish verification a non-negotiable routine. Establishing a standardized 10-step checklist guarantees that closed captions, sponsor disclosures, end-screen video cards, and description links are checked before videos switch from unlisted to public.',
    ],
  },
};
