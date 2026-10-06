import type { ToolCategory } from '@/types/tools';

export const CATEGORY_GUIDES: Record<
  ToolCategory,
  { intro: string; paragraphs: string[] }
> = {
  monetization: {
    intro:
      'Plan channel revenue responsibly with calculators and public monetization indicators — built for creators who want clarity without paywalls or downloader software.',
    paragraphs: [
      'Tools in this category evaluate public YouTube Data API signals or model revenue scenarios based on inputs you control. They do not download video files, scrape private creator earnings, or guarantee Partner Program approval. Treat every output as orientation, then confirm official eligibility and payouts inside YouTube Studio and Google AdSense.',
      'Which tool to use: Open the YouTube Monetization Checker to review public subscriber thresholds, upload velocity, and inferred eligibility signals for any channel. Channel owners can optionally verify read-only YouTube Analytics monetary access. Use the Earnings Calculator and RPM Calculator to model forward-looking scenario forecasts for your niche.',
      'Pair these utilities with our comprehensive guide hubs: explore the YouTube Monetization Guide Hub for policy rules, and read our 2026 YouTube Partner Program Checklist for verified eligibility requirements.',
    ],
  },
  research: {
    intro:
      'Look up permanent channel identifiers, compare surface metrics, and wire automations in full compliance with YouTube Data API quotas.',
    paragraphs: [
      'Research utilities help you identify canonical 24-character Channel IDs (UC…), public handles, and RSS feed URLs, or compare public subscriber and view totals between channels. These permanent identifiers are what external integrations, Discord bots, and feed readers require.',
      'Which tool to use: Use the Channel ID Finder to resolve handles and URLs to permanent UC IDs and direct RSS feed endpoints. Use Channel Compare to benchmark upload frequency and public view velocity across peer channels in your niche.',
      'Data is strictly limited to public API endpoints. We do not inspect private watch hours, internal demographic distributions, or private revenue. For integration guides, see our Channel ID vs Handle Guide.',
      'When you outgrow manual lookups, store UC IDs in your CRM or automation database instead of handles so rebrands do not break webhooks. Compare channels on similar upload cadence and niche so benchmarks stay meaningful.',
    ],
  },
  seo: {
    intro:
      'Audit titles, tags, descriptions, hashtags, and chapter timestamps before publishing — prioritizing audience clarity over keyword stuffing.',
    paragraphs: [
      'SEO tools on this platform audit metadata length, keyword placement, and formatting conventions that influence discovery across search and browse feeds. They help you remove packaging friction so YouTube recommendations can connect with the right audience.',
      'Which tool to use: Use the Tag Extractor to ethically research keywords from top-ranking public videos. Use the Title & Description Analyzer to catch mobile truncation before publishing. Use the SEO Score Checker for a pre-publish metadata checklist, and the Hashtag Generator for relevant description tags.',
      'Scores and recommendations are educational heuristics, not official Google or YouTube ranking scores. For complete publishing workflows, explore our YouTube SEO Guide Hub.',
      'Run metadata checks after every major Studio update because character limits and mobile truncation rules evolve. Pair SEO tools with retention analytics in YouTube Studio — packaging only helps when the video delivers on the title promise.',
    ],
  },
  analytics: {
    intro:
      'Track public counters and build stream-ready displays using official public statistics from the YouTube Data API.',
    paragraphs: [
      'Analytics utilities read public metrics including rounded subscriber counts, lifetime video views, and public upload numbers. They are designed for milestone streams, OBS browser overlays, and lightweight creator dashboards.',
      'Which tool to use: Open the Live Public Subscriber Counter to track public subscriber counts and milestone targets. The display supports fullscreen mode and custom browser source embedding in OBS Studio.',
      'Public subscriber counts for channels over 1,000 subscribers are rounded per YouTube’s platform policy. API updates are polled at regular intervals to respect quota budgets. For detailed stream setup instructions, see our Live Subscriber Count Guide.',
      'This category hub is optional for search indexing; the Live Subscriber Counter tool page carries the primary intent. Use public counters for celebration streams, not contractual subscriber audits — sponsors should request Studio exports when precision matters.',
    ],
  },
  utilities: {
    intro:
      'Shorts safe-zone overlays, thumbnail previews, chapter validators, and upload checklists to ensure polish before you hit publish.',
    paragraphs: [
      'Utility tools help creators format video descriptions, validate chapter timestamps, preview thumbnails across desktop and mobile frames, and position text within Shorts safe zones to prevent interface collisions.',
      'Which tool to use: Use the Shorts Safe Zone Checker to test screenshots against mobile feed overlays and download a transparent PNG template. Use the Timestamp Validator to ensure chapters start at 00:00 for Google Key Moments. Use the Thumbnail Preview tool to test contrast and legibility.',
      'All image processing and chapter validation occurs locally in your browser. We never host full video files or require video uploads. Review our Upload Checklist before scheduling your next release.',
      'Batch these utilities at the end of your edit: validate chapters, preview thumbnails on dark mode, then walk the upload checklist so end screens and disclosures are not forgotten on rushed publishes.',
    ],
  },
};
