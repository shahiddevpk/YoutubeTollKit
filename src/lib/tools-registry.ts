import { ToolDefinition, CategoryDefinition, ToolCategory } from '@/types/tools';

export const SITE_CONFIG = {
  name: 'YouTubeFreeToolkit',
  domain: 'youtubefreetoolkit.com',
  url: 'https://youtubefreetoolkit.com',
  description:
    'Free YouTube creator toolkit for monetization indicators, metadata, and channel research. Policy-safe public-data tools only — no video or audio downloads.',
  ogImage: 'https://youtubefreetoolkit.com/api/og?title=YouTubeFreeToolkit&desc=Free+YouTube+Creator+Tools',
  creator: '@shahiddevpk',
  author: 'YouTubeFreeToolkit Creator Team',
  twitterHandle: '@ytfreetoolkit',
};

export const CATEGORIES: CategoryDefinition[] = [
  {
    id: 'monetization',
    name: 'Monetization & Revenue',
    description: 'Unofficial public YPP eligibility indicators, optional owner verification via YouTube Analytics, and revenue estimates with transparent assumptions.',
    iconName: 'DollarSign',
    gradient: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'research',
    name: 'Channel Research',
    description: 'Find official Channel IDs, handles, competitor stats, publish dates, and public profile metrics.',
    iconName: 'Search',
    gradient: 'from-blue-500 to-indigo-700',
  },
  {
    id: 'seo',
    name: 'SEO & Metadata',
    description: 'Extract public video tags, optimize titles, audit keyword density, and inspect SEO scores.',
    iconName: 'Sparkles',
    gradient: 'from-violet-500 to-purple-700',
  },
  {
    id: 'analytics',
    name: 'Analytics & Widgets',
    description: 'Real-time subscriber stats and live channel monitoring widgets.',
    iconName: 'TrendingUp',
    gradient: 'from-amber-500 to-orange-700',
  },
  {
    id: 'utilities',
    name: 'Shorts & Utilities',
    description: 'Shorts safe-zone overlays, chapter/timestamp validators, thumbnail inspectors, and hashtag tools.',
    iconName: 'Wrench',
    gradient: 'from-rose-500 to-pink-700',
  },
];

export const TOOLS_REGISTRY: ToolDefinition[] = [
  {
    slug: 'monetization-checker',
    name: 'YouTube Monetization Checker',
    shortTitle: 'Monetization Checker',
    headline:
      'Check any public channel for inferred monetization likelihood, revenue estimates, and YPP-style signals — with optional owner verification via YouTube Analytics.',
    description:
      'Paste a channel URL, @handle, or video link to load public stats and an inferred monetization report (clearly labeled non-official). Channel owners can optionally verify monetary Analytics access with read-only Google OAuth. Not a replacement for YouTube Studio.',
    category: 'monetization',
    badge: 'Flagship',
    priority: 'P0',
    featured: true,
    iconName: 'BadgeCheck',
    primaryKeyword: 'youtube monetization checker',
    secondaryKeywords: [
      'yt monetization checker',
      'check if youtube channel is monetized',
      'youtube monetization status',
      'is channel monetized',
      'youtube partner program checker',
    ],
    metaTitle: 'YouTube Monetization Checker (Free)',
    metaDescription:
      'Check if any YouTube channel shows monetization signals, with YPP eligibility and revenue estimates. Free, no signup; owners can verify via YouTube Analytics.',
    howItWorks: [
      {
        step: 1,
        title: 'Paste Channel or Video URL',
        description: 'Enter any public YouTube channel link, handle (@username), or video URL into the input field.',
      },
      {
        step: 2,
        title: 'Review Inferred Monetization Report',
        description:
          'See public stats, YPP subscriber signals, an inferred likelihood tier, illustrative revenue ranges, and key insights — all tagged as non-official estimates.',
      },
      {
        step: 3,
        title: 'Verify Owner Monetization Status (Optional)',
        description:
          'If you own the channel, connect Google with read-only OAuth to test whether YouTube Analytics grants monetary-metric access for your account.',
      },
    ],
    features: [
      'Public channel stats via YouTube Data API v3',
      'Inferred monetization likelihood (labeled non-official, not Studio confirmation)',
      'Illustrative daily/monthly/yearly revenue matrix from public view counts',
      'Key insights: channel age, avg views per video, upload frequency proxies',
      '500- and 1,000-subscriber YPP threshold signals (subscriber count is only one eligibility factor)',
      'Optional owner-only monetization verification via read-only Google OAuth',
      'Official YouTube Analytics monetary-access check for the authenticated channel owner',
      'Works with channel URLs, @handles, UC IDs, or public video links',
      'No Google password collection and no persistent storage of OAuth access tokens in the app database',
    ],
    limitations: [
      'YouTube does not expose another random channel’s active YPP or AdSense enrollment through the public Data API.',
      'Exact verification requires the channel owner to authorize read-only YouTube account and monetary Analytics access.',
      'Public watch hours, qualified Shorts views, policy review status, and AdSense linkage are not inferred for third-party channels.',
    ],
    faqs: [
      {
        question: 'I’m not the channel owner — what can I learn here?',
        answer:
          'You can see public subscriber, view, and video counts plus unofficial 500- and 1,000-subscriber YPP threshold signals. You cannot see whether another creator is in the YouTube Partner Program or linked to AdSense — YouTube does not expose that through public APIs. Signing in with your own Google account does not reveal someone else’s monetization status. Use “Verify” only if you manage the channel you pasted.',
      },
      {
        question: 'Will “Verify Exact Monetization Status” show me if another creator is monetized?',
        answer:
          'No. That button is for channel owners only. It checks whether the Google account you sign in with owns the channel you looked up and whether YouTube Analytics grants that account monetary-metric access. If you are researching another channel, rely on the public signals and disclaimers on this page — or ask the creator directly.',
      },
      {
        question: 'How is the “inferred” monetization result different from other checker sites?',
        answer:
          'Many tools label a channel “monetized” using public proxies (subscribers, views, ads). We show the same style of inferred likelihood and revenue estimates, but every result is tagged “Inferred · Not official YPP status.” Only YouTube Studio or our optional owner verification confirms enrollment for your own channel.',
      },
      {
        question: 'How do you check if a YouTube channel is monetized?',
        answer:
          'For any public channel, the official YouTube Data API can show public statistics and eligibility signals but not private YPP enrollment. If you own the channel, this checker can verify the connected owner account and test official YouTube Analytics monetary-metric access. YouTube documents monetary channel reports as available to YPP members and a 403 response for non-monetized channels.',
      },
      {
        question: 'What are the YouTube monetization requirements in 2026?',
        answer:
          'Through January 31, 2027, full YPP ad-revenue eligibility generally requires 1,000 subscribers plus either 4,000 qualified public watch hours in the previous 12 months or 10 million qualified Shorts views in 90 days, along with YouTube’s other policy and account requirements. YouTube has announced higher watch-hour and Shorts-view thresholds for new applicants starting February 1, 2027.',
      },
      {
        question: 'Can I check monetization for private or unlisted videos?',
        answer:
          'No. To strictly respect creator privacy and YouTube security standards, our tool only verifies publicly accessible videos and channel URLs.',
      },
      {
        question: 'Is this YouTube monetization checker completely free?',
        answer:
          'Yes. Public channel checks are free and require no account. Owner verification is also free but requires the channel owner to grant read-only Google/YouTube permissions for the verification request.',
      },
      {
        question: 'Why does a channel show ads if it is not monetized?',
        answer:
          'Seeing an ad is not proof that the channel owner receives ad revenue. YouTube can serve ads in situations where public viewers cannot determine the creator’s YPP enrollment, so our checker does not use ad presence as a definitive status signal.',
      },
      {
        question: 'How accurate is the inferred monetization result?',
        answer:
          'We do not publish a fixed accuracy percentage. Inference uses public subscriber, view, and age statistics only. It can be wrong for channels in YPP review, limited ads, demonetized channels with large legacy audiences, or creators who earn mainly from sponsorships. Use owner verification or YouTube Studio for decisions that require certainty.',
      },
      {
        question: 'What is the estimated revenue matrix?',
        answer:
          'It multiplies an estimated daily view count (lifetime channel views divided by channel age in days) by illustrative RPM values ($2, $5, and $10 per 1,000 views). It is a planning scenario, not AdSense data. For custom assumptions, use our YouTube Earnings Calculator.',
      },
      {
        question: 'Can I check Shorts or individual video monetization here?',
        answer:
          'You can paste a public video or Shorts URL to resolve the parent channel and run the same public channel report. Per-video monetization status is not exposed by the public Data API; we do not claim video-level YPP enrollment.',
      },
      {
        question: 'Does signing in with Google show another creator’s revenue?',
        answer:
          'No. Owner verification only reflects the Google account you authenticate. It confirms ownership of a channel and tests Analytics access for that account — never another person’s private earnings.',
      },
      {
        question: 'How often is checker data updated?',
        answer:
          'Each search requests fresh public statistics from YouTube (with short server caching to protect API quota). Inferred tiers and revenue math recompute from that snapshot at lookup time.',
      },
      {
        question: 'Can brands use this tool for sponsor due diligence?',
        answer:
          'Yes for initial screening on public stats and inferred tiers. It is not a substitute for contracts, brand-safety review, or creator-provided Analytics when deal size warrants official numbers.',
      },
      {
        question: 'What Google permissions does owner verification request?',
        answer:
          'Read-only YouTube account access plus read-only YouTube Analytics monetary scope. We use them only to confirm channel ownership and test monetary-metric access during the verification request — not to change your channel or upload on your behalf.',
      },
    ],
    relatedToolSlugs: ['earnings-calculator', 'channel-id-finder', 'seo-score-checker', 'rpm-calculator'],
    updatedAt: '2026-10-06',
  },
  {
    slug: 'channel-id-finder',
    name: 'YouTube Channel ID Finder',
    shortTitle: 'Channel ID Finder',
    headline: 'Resolve @handles, channel URLs, and public video links to the canonical UC identifier.',
    description:
      'Extract the permanent 24-character YouTube Channel ID (UC...), canonical @handle, and direct RSS feed URL from any @handle, channel URL, or public video link. The UC channel ID never changes even when a creator renames or rebrands, making it the reliable identifier for API integrations, Discord bots, and RSS readers.',
    category: 'research',
    badge: 'Flagship',
    priority: 'P0',
    featured: true,
    iconName: 'Fingerprint',
    primaryKeyword: 'youtube channel id finder',
    secondaryKeywords: [
      'find youtube channel id',
      'youtube uc id finder',
      'youtube user id finder',
      'get channel id from handle',
      'youtube channel id lookup',
    ],
    metaTitle: 'YouTube Channel ID Finder — Get ID From URL',
    metaDescription:
      'Find the 24-character YouTube channel ID (UC…) from any @handle, channel URL or video link. Free, instant lookup with RSS feed link.',
    howItWorks: [
      {
        step: 1,
        title: 'Input Channel Link or Handle',
        description: 'Paste a YouTube @handle (e.g., @mkbhd), /channel/UC... URL, UC ID, or public video URL.',
      },
      {
        step: 2,
        title: 'Extract Canonical Metadata',
        description: 'We resolve redirects and extract the permanent 24-character UC identifier.',
      },
      {
        step: 3,
        title: '1-Click Copy IDs & RSS Feed',
        description: 'Instantly copy Channel ID, User ID, and direct RSS Feed link for automation and embedding.',
      },
    ],
    features: [
      'Converts modern @handles, channel URLs, UC IDs, and public video links to the canonical UC ID',
      'Generates direct YouTube RSS XML Feed URL for readers and Discord bots',
      'Displays channel join date, country, and total video count',
      'One-click clipboard copy with clean formatting',
    ],
    limitations: [
      'Channel must be public and active on YouTube.',
      'Deleted or terminated channels cannot be resolved.',
    ],
    faqs: [
      {
        question: 'What is a YouTube Channel ID?',
        answer:
          'A YouTube Channel ID is a unique 24-character alphanumeric string starting with "UC" (e.g. UCX6OQ3DkcsbYNE6H8uQQuVA) that permanently identifies a YouTube channel regardless of how often the channel name or handle changes.',
      },
      {
        question: 'Why do I need a YouTube Channel ID?',
        answer:
          'You need the UC Channel ID for YouTube Data API integrations, setting up RSS feeds in Discord/Slack bots, configuring third-party streaming tools (OBS, Streamlabs), and developer webhooks.',
      },
      {
        question: 'How do I find a channel ID from a YouTube handle (@username)?',
        answer:
          'Simply paste the @handle into our search bar. Our tool automatically inspects the channel\'s canonical tag and returns the official 24-character UC ID instantly.',
      },
      {
        question: 'Does changing my YouTube handle or channel name change my Channel ID?',
        answer:
          'No. Your YouTube Channel ID (starting with UC) is permanent and immutable. Even if you rebrand, change your display name, or claim a new @handle, your UC ID never changes, ensuring all API connections and external links remain intact.',
      },
    ],
    relatedToolSlugs: ['monetization-checker', 'live-subscriber-count', 'tag-extractor'],
    updatedAt: '2026-09-30',
  },
  {
    slug: 'tag-extractor',
    name: 'YouTube Tag Extractor',
    shortTitle: 'Tag Extractor',
    headline: 'View and copy public tags and keywords from any YouTube video or Short.',
    description:
      'Extract all public tags and keywords used on any YouTube video. Analyze competitor SEO strategy, copy tags with commas, and optimize your video rankings.',
    category: 'seo',
    badge: 'Flagship',
    priority: 'P0',
    featured: true,
    iconName: 'Tag',
    primaryKeyword: 'youtube tag extractor',
    secondaryKeywords: [
      'youtube tag finder',
      'extract youtube tags',
      'youtube video tags viewer',
      'copy tags from youtube video',
      'youtube keyword tags extractor',
    ],
    metaTitle: 'YouTube Tag Extractor — Copy Video Tags',
    metaDescription:
      'See exactly which tags any YouTube video uses for SEO research — no account or browser extension needed. Copy them formatted for YouTube Studio in one click.',
    howItWorks: [
      {
        step: 1,
        title: 'Paste Video URL',
        description: 'Enter any public YouTube video link or Shorts URL.',
      },
      {
        step: 2,
        title: 'Extract Tag List',
        description: 'Our engine extracts the metadata keywords and calculates character counts.',
      },
      {
        step: 3,
        title: 'Copy Formatted Tags',
        description: 'Copy comma-separated tags directly into the YouTube Studio tags box.',
      },
    ],
    features: [
      'Extracts all public video keywords and tags',
      'Calculates total character count (YouTube 500-character limit gauge)',
      '1-Click "Copy All Tags" formatted for YouTube Studio upload panel',
      'Keyword length and relevance distribution analyzer',
    ],
    limitations: [
      'Only public tags included in the video metadata by the creator are shown.',
      'Videos with no tags specified by the creator will show 0 extracted tags.',
    ],
    faqs: [
      {
        question: 'Do YouTube tags still matter for SEO in 2026?',
        answer:
          'While titles, descriptions, and thumbnails carry the most ranking weight, tags remain valuable for capturing common misspellings, synonyms, and reinforcing topical relevance for YouTube recommendation algorithms.',
      },
      {
        question: 'What is the maximum character limit for YouTube video tags?',
        answer:
          'YouTube allows up to 500 total characters across all tags combined in YouTube Studio.',
      },
      {
        question: 'How do I add extracted tags to my YouTube video?',
        answer:
          'Open YouTube Studio → Content → Edit Video → Scroll down and click "Show More" → Paste the copied tags into the "Tags" box → Click Save.',
      },
      {
        question: 'Can copying tags from viral videos get my channel penalized?',
        answer:
          'Copying tags verbatim without relevance to your own video violates YouTube’s misleading metadata policies. Instead, extract tags from top-ranking videos to identify keyword themes, search synonyms, and spelling variations, then select only the tags that accurately describe your content.',
      },
    ],
    relatedToolSlugs: ['seo-score-checker', 'title-description-analyzer', 'hashtag-generator'],
    updatedAt: '2026-09-30',
  },
  {
    slug: 'earnings-calculator',
    name: 'YouTube Earnings Calculator',
    shortTitle: 'Earnings Calculator',
    headline: 'Estimate your YouTube ad revenue from daily views, RPM brackets, and creator niche in seconds.',
    description:
      'Enter your expected daily or monthly view count, choose your content niche, and see illustrative daily, monthly, and annual revenue projections after YouTube\'s 45% platform share. Calculations use 2026 RPM benchmarks across 12 creator niches and are clearly labeled as planning estimates, not actual AdSense data.',
    category: 'monetization',
    badge: 'Flagship',
    priority: 'P0',
    featured: true,
    iconName: 'Calculator',
    primaryKeyword: 'youtube earnings calculator',
    secondaryKeywords: [
      'youtube money calculator',
      'youtube views to money',
      'youtube income calculator',
      'how much does youtube pay for 1 million views',
      'youtube adsense calculator',
    ],
    metaTitle: 'YouTube Earnings & Money Calculator',
    metaDescription:
      'Estimate YouTube ad earnings from your views and niche. See daily, monthly and yearly revenue ranges with transparent RPM assumptions. Free.',
    howItWorks: [
      {
        step: 1,
        title: 'Set Expected Views',
        description: 'Adjust the slider for your estimated daily or monthly video views.',
      },
      {
        step: 2,
        title: 'Choose Niche & CPM Tier',
        description: 'Select your channel category (Finance, Gaming, Tech, Vlogs) for realistic RPM data.',
      },
      {
        step: 3,
        title: 'Review Projected Income',
        description: 'See estimated daily, monthly, and annual earnings after the 45% YouTube revenue split.',
      },
    ],
    features: [
      'Interactive views and CPM slider with dynamic real-time calculation',
      'Pre-calibrated 2026 RPM benchmarks across 12 creator niches',
      'Calculates net creator earnings after YouTube 45% platform share',
      'Comparison breakdown: Daily, Monthly, and Annual revenue projections',
    ],
    limitations: [
      'Estimates are based on industry-standard RPM averages. Actual payouts vary based on audience geography, ad blockers, and seasonal advertiser spend (Q4 vs Q1).',
    ],
    faqs: [
      {
        question: 'How much does YouTube pay for 1,000 views in 2026?',
        answer:
          'On average, YouTube creators earn between $1.50 and $6.00 per 1,000 views (RPM) for standard entertainment niches, and between $8.00 and $25.00+ for high-paying niches like Finance, SaaS, Real Estate, and Tech.',
      },
      {
        question: 'What is the difference between CPM and RPM?',
        answer:
          'CPM (Cost Per Mille) is what advertisers pay for 1,000 ad impressions before YouTube takes its 45% cut. RPM (Revenue Per Mille) is the actual net earnings a creator receives per 1,000 total video views after the YouTube split.',
      },
      {
        question: 'How do sponsorships factor into total channel earnings?',
        answer:
          'Sponsorships operate independently of AdSense and are paid directly by brands. Typical dedicated sponsorship rates range from $20 to $45 per 1,000 anticipated views, often dwarfing ad revenue for niche channels.',
      },
      {
        question: 'Why does my real YouTube payout differ from online calculators?',
        answer:
          'Calculators assume an even distribution of monetized playbacks. In reality, viewers using ad blockers, viewers in lower-CPM countries, and seasonality (Q4 holiday surge vs Q1 budget drop) significantly shift monthly income.',
      },
    ],
    relatedToolSlugs: ['monetization-checker', 'rpm-calculator', 'seo-score-checker'],
    updatedAt: '2026-09-30',
  },
  {
    slug: 'seo-score-checker',
    name: 'YouTube SEO Score Checker',
    shortTitle: 'SEO Score Checker',
    headline: 'Audit your YouTube video\'s SEO across title length, description, tags, and metadata with one click.',
    description:
      'Get an instant 0–100 SEO score for any published video or draft title. The 12-point checklist evaluates title character counts, description structure, tag relevance, and chapter presence, then returns specific actionable fixes to improve click-through rate and organic search visibility.',
    category: 'seo',
    badge: 'Creator Pick',
    priority: 'P0',
    featured: true,
    iconName: 'Gauge',
    primaryKeyword: 'youtube channel seo checker',
    secondaryKeywords: [
      'youtube seo score checker',
      'youtube video seo audit',
      'youtube optimization checker',
      'youtube metadata audit',
      'seo score youtube',
    ],
    metaTitle: 'YouTube SEO Score Checker (Free)',
    metaDescription:
      'Paste a video URL or draft and get a 0–100 YouTube SEO score with specific fixes for the title, description, tags and chapters. Free.',
    howItWorks: [
      {
        step: 1,
        title: 'Enter Video URL or Draft Content',
        description: 'Paste a published YouTube URL or test your draft title and description.',
      },
      {
        step: 2,
        title: 'Run Automated 12-Point SEO Audit',
        description: 'Our system audits title length, description structure, link placement, and tags.',
      },
      {
        step: 3,
        title: 'Get 0-100 Score & Improvement Action List',
        description: 'Receive specific suggestions to increase CTR and organic search visibility.',
      },
    ],
    features: [
      '12-point automated SEO inspection checklist',
      'Real-time Title length meter (optimal 50-70 characters)',
      'Description above-the-fold snippet preview for mobile and desktop',
      'Actionable recommendations to boost CTR and search rank',
    ],
    limitations: [
      'SEO score measures on-page optimization. Total ranking also depends on viewer retention, watch time, and click-through rate.',
    ],
    faqs: [
      {
        question: 'What is a good YouTube SEO score?',
        answer:
          'A score of 80/100 or above indicates strong on-page metadata optimization, with a focused title, keyword-rich description, timestamped chapters, and proper tags.',
      },
      {
        question: 'What is the best title length for YouTube SEO?',
        answer:
          'Between 50 and 70 characters. Titles under 70 characters prevent truncation on mobile devices while providing enough room for primary and secondary keywords.',
      },
      {
        question: 'Can updating metadata revive older, flatlining videos?',
        answer:
          'It can help. Refreshing the title, thumbnail, and chapter markers on older evergreen tutorials may trigger renewed impressions in browse features and Google Search Key Moments, though results vary by topic and competition.',
      },
      {
        question: 'Can description keyword density trigger spam penalties?',
        answer:
          'Yes. Stuffing blocks of disconnected keywords or repeating words unnaturally violates YouTube misleading metadata policies. Write natural sentences that incorporate keywords contextually.',
      },
    ],
    relatedToolSlugs: ['tag-extractor', 'title-description-analyzer', 'hashtag-generator'],
    updatedAt: '2026-09-30',
  },
  {
    slug: 'live-subscriber-count',
    name: 'YouTube Subscriber Counter',
    shortTitle: 'Subscriber Counter',
    headline: 'Auto-Refreshing Public YouTube Subscriber Counter & Channel Statistics',
    description:
      'Track public YouTube subscriber milestones, total video view counts, and channel growth with an auto-refreshing counter. Updates via the YouTube Data API every 60–90 seconds.',
    category: 'analytics',
    badge: 'Flagship',
    priority: 'P0',
    featured: true,
    iconName: 'Users',
    primaryKeyword: 'live youtube subscriber count',
    secondaryKeywords: [
      'youtube sub count live',
      'public youtube subscriber counter',
      'youtube subscriber tracker',
      'check youtube subscriber count',
    ],
    metaTitle: 'YouTube Live Subscriber Count — Real-Time',
    metaDescription:
      'Live YouTube subscriber count for any channel, auto-refreshing every 90 seconds with a goal progress bar. Great for milestone streams.',
    howItWorks: [
      {
        step: 1,
        title: 'Search Channel',
        description: 'Enter any YouTube channel name, handle (@username), or URL.',
      },
      {
        step: 2,
        title: 'Fetch Latest Public Statistics',
        description: 'View the latest verified subscriber tier, view count, and uploads.',
      },
      {
        step: 3,
        title: 'Fullscreen Milestone Mode',
        description: 'Switch to distraction-free full screen mode for celebration streams.',
      },
    ],
    features: [
      'Clean, high-visibility digit display suitable for live streams',
      'Displays total lifetime video views, subscriber count, and uploads',
      'Embeddable OBS browser source overlay friendly',
    ],
    limitations: [
      'YouTube abbreviates public subscriber counts (e.g. 10.2M) per official API policies.',
    ],
    faqs: [
      {
        question: 'Why does YouTube show abbreviated subscriber counts?',
        answer:
          'In 2019, YouTube standardized public subscriber counts to 3 significant figures (e.g., 100K, 1.25M) to reduce creator stress and maintain platform consistency.',
      },
      {
        question: 'Can I use this subscriber counter as an OBS browser source overlay?',
        answer:
          'Yes. Copy the tool URL or open fullscreen mode and add it as a Browser Source inside OBS Studio, Streamlabs, or vMix. You can apply custom CSS or crop the window to show just the counter numbers with a transparent or dark background for live celebration streams.',
      },
      {
        question: 'How frequently does the live subscriber count update?',
        answer:
          'The counter refreshes according to official YouTube Data API v3 poll cycles. Because YouTube rounds public counts to 3 significant figures for channels over 1,000 subscribers, the display updates whenever YouTube\'s servers publish the next milestone increment.',
      },
      {
        question: 'Can I view the exact unrounded subscriber count of another creator?',
        answer:
          'No. Since September 2019, YouTube has enforced public subscriber rounding across all third-party tools and the public Data API. Only the authenticated channel owner can view their exact, unrounded subscriber count in real time inside YouTube Studio Analytics.',
      },
    ],
    relatedToolSlugs: ['channel-id-finder', 'monetization-checker', 'earnings-calculator'],
    updatedAt: '2026-09-30',
  },
  {
    slug: 'thumbnail-preview',
    name: 'YouTube Thumbnail Preview',
    shortTitle: 'Thumbnail Preview',
    headline: 'Inspect HD Thumbnails & Test CTR Against Dark/Light Feeds',
    description:
      'Preview your YouTube video thumbnail across the YouTube Homepage, Mobile Feed, Search Results, and Sidebar in both Dark and Light mode before you publish. Upload a draft image or paste an existing video URL to test readability at every size, check that text is not obscured by the timestamp badge, and compare CTR impact across dark and light feeds.',
    category: 'utilities',
    badge: 'Trending',
    priority: 'P2',
    featured: true,
    iconName: 'Image',
    primaryKeyword: 'youtube thumbnail preview',
    secondaryKeywords: [
      'youtube thumbnail test',
      'view youtube thumbnail hd',
      'youtube thumbnail checker',
      'youtube thumbnail hd preview',
      'test thumbnail on youtube homepage',
    ],
    metaTitle: 'YouTube Thumbnail Preview & Tester',
    metaDescription:
      'Test your video thumbnail inside a realistic YouTube desktop & mobile mockup. View high-res HD/4K maxresdefault thumbnail images for free.',
    howItWorks: [
      {
        step: 1,
        title: 'Upload Image or Enter Video URL',
        description: 'Upload your draft thumbnail or paste an existing YouTube video link.',
      },
      {
        step: 2,
        title: 'Preview Multi-Device Feed',
        description: 'See how your thumbnail looks in YouTube mobile feed, desktop sidebar, and search grids.',
      },
      {
        step: 3,
        title: 'Check Readability & Timestamp Badge',
        description: 'Ensure text is not covered by YouTube bottom-right timestamp badge.',
      },
    ],
    features: [
      'Simulates YouTube mobile and desktop UI with 16:9 aspect ratio',
      'Timestamp badge overlay simulator (prevents critical text cutoff)',
      'Inspects full resolution MaxRes (1280x720) and HQ thumbnail images',
      'Dark mode and Light mode comparison toggle',
    ],
    limitations: [
      'For published videos, max resolution depends on the original resolution uploaded by the creator.',
    ],
    faqs: [
      {
        question: 'What is the optimal size for a YouTube thumbnail?',
        answer:
          'The ideal resolution is 1280x720 pixels (16:9 aspect ratio) with a minimum width of 640 pixels, formatted as JPG, PNG, or WebP under 2MB.',
      },
      {
        question: 'Where should I avoid placing text in a YouTube thumbnail?',
        answer:
          'Avoid the bottom-right corner where YouTube places the video duration timestamp badge (e.g. 10:24), which blocks underlying text and graphics.',
      },
      {
        question: 'Why does my thumbnail look blurry on high-resolution displays?',
        answer:
          'If you upload an image smaller than 1280x720 pixels or heavily compressed JPEG, YouTube\'s responsive player will upscale it on 1080p and 4K displays, causing blurriness and pixelation. Always export your thumbnail at 1280x720 or 1920x1080 in sRGB color space.',
      },
      {
        question: 'Should I design separate thumbnails for dark mode and light mode?',
        answer:
          'You should test your design against both backgrounds. Over 60% of active YouTube mobile and desktop users browse in Dark Theme. Thumbnails with pure black borders or dark edges can blend into the feed, losing visual definition. Use high-contrast borders or bright focal points to stand out in both modes.',
      },
    ],
    relatedToolSlugs: ['shorts-safe-zone', 'title-description-analyzer', 'seo-score-checker'],
    updatedAt: '2026-09-30',
  },
  {
    slug: 'title-description-analyzer',
    name: 'YouTube Title & Description Optimizer',
    shortTitle: 'Title & Description',
    headline: 'Optimize YouTube Titles, Descriptions & Character Limits',
    description:
      'Analyze character count, mobile truncation cutoff, emoji density, and readability scores for YouTube titles and descriptions before you publish. The live meters show desktop (70-character) and mobile (55-character) cutoff points, a preview of the first three description lines above the "Show More" fold, and keyword density flags — so you can front-load your primary keyword and hook before viewers click away.',
    category: 'seo',
    badge: 'Creator Pick',
    priority: 'P1',
    featured: false,
    iconName: 'FileText',
    primaryKeyword: 'youtube title checker',
    secondaryKeywords: [
      'youtube title character counter',
      'youtube description optimizer',
      'youtube title analyzer',
      'youtube title length check',
    ],
    metaTitle: 'YouTube Title & Description Length Checker',
    metaDescription:
      'Optimize YouTube titles and descriptions for maximum click-through rate. Check mobile truncation cutoff, readability, and keyword density.',
    howItWorks: [
      {
        step: 1,
        title: 'Type or Paste Title & Description',
        description: 'Enter your proposed video title and description text.',
      },
      {
        step: 2,
        title: 'Check Truncation & Character Meters',
        description: 'See exact character counts, mobile cut-off line (50-60 chars), and first 3 lines preview.',
      },
      {
        step: 3,
        title: 'Apply Recommendations',
        description: 'Refine hook placement, keywords, and links above the "Show More" fold.',
      },
    ],
    features: [
      'Visual title truncation meter (desktop 70 chars, mobile 55 chars)',
      'First 3 lines description preview (above "Show More" fold)',
      'Keyword density counter and link validator',
      'Uppercase & clickbait intensity meter',
    ],
    limitations: [
      'Provides copywriting guidance and formatting analytics based on YouTube UI conventions.',
    ],
    faqs: [
      {
        question: 'How many characters show before "Show More" in YouTube descriptions?',
        answer:
          'On desktop, approximately the first 150-200 characters (2-3 lines) appear before the "Show More" fold. On mobile, usually only the first 100 characters are visible.',
      },
      {
        question: 'How long should my YouTube title be for best click-through rate (CTR)?',
        answer:
          'While YouTube allows up to 100 characters in titles, mobile feeds truncate titles at approximately 50 to 60 characters depending on screen width. Aim for 50-65 characters, front-loading your primary keyword and emotional hook within the first 45 characters.',
      },
      {
        question: 'Do tags or descriptions matter more for YouTube algorithm recommendations?',
        answer:
          'Descriptions matter significantly more than tags. YouTube\'s recommendation engine indexes your description\'s first 3 lines and naturally spoken keywords to categorize content and match search queries. Tags are primarily used by YouTube to catch common spelling errors.',
      },
      {
        question: 'How many links can I include in a YouTube video description?',
        answer:
          'YouTube does not enforce a strict link count limit, but best practice is 3 to 5 clear outbound links placed below the introductory hook. Channels with advanced features unlocked can use clickable external hyperlinks; new channels must complete phone verification or build channel history to enable active links.',
      },
    ],
    relatedToolSlugs: ['seo-score-checker', 'tag-extractor', 'hashtag-generator'],
    updatedAt: '2026-09-30',
  },
  {
    slug: 'hashtag-generator',
    name: 'YouTube Hashtag Generator',
    shortTitle: 'Hashtag Generator',
    headline: 'Generate Trending & Relevant Hashtags for YouTube Videos & Shorts',
    description:
      'Discover high-performing hashtags for YouTube Shorts and long-form videos across 15+ creator niches to boost algorithmic discovery on hashtag landing pages. Enter your video topic, choose your format, and copy 3–5 optimized hashtags in one click — with built-in guidance to avoid the 60-hashtag penalty that causes YouTube to ignore all tags on a video.',
    category: 'seo',
    badge: 'Flagship',
    priority: 'P2',
    featured: false,
    iconName: 'Hash',
    primaryKeyword: 'youtube hashtag generator',
    secondaryKeywords: [
      'youtube shorts hashtags',
      'hashtags for youtube videos',
      'trending youtube hashtags',
      'best youtube hashtags generator',
    ],
    metaTitle: 'YouTube Hashtag Generator for Shorts & Videos',
    metaDescription:
      'Generate high-ranking hashtags for YouTube Shorts and videos. 100% free tool to find trending topic tags and copy them with one click.',
    howItWorks: [
      {
        step: 1,
        title: 'Enter Video Topic or Niche',
        description: 'Type your core subject (e.g., "podcast", "tech review", "gaming tutorial").',
      },
      {
        step: 2,
        title: 'Select Category',
        description: 'Pick format (Shorts vs Long-form) and target audience tone.',
      },
      {
        step: 3,
        title: 'Copy 3-5 Recommended Hashtags',
        description: 'Copy optimal hashtags to place above your video title or in description.',
      },
    ],
    features: [
      'Categorized hashtag pools for 15+ popular YouTube niches',
      'Specific recommendations tailored for YouTube Shorts discovery',
      'One-click formatted copy (#tag1 #tag2 #tag3)',
      'Guidance on avoiding YouTube hashtag over-tagging penalty',
    ],
    limitations: [
      'Using more than 60 hashtags on a video will cause YouTube to ignore all hashtags on that upload.',
    ],
    faqs: [
      {
        question: 'How many hashtags should I use on YouTube?',
        answer:
          'YouTube recommends using 3 to 5 relevant hashtags per video. The first 3 hashtags in your description will appear above your video title on desktop and mobile.',
      },
      {
        question: 'Where should I place hashtags in my YouTube video upload?',
        answer:
          'You can place hashtags anywhere in your video description. The first three hashtags listed in your description automatically display above your video title on the watch page. Avoid stuffing hashtags into your video title itself, as it reduces title readability and CTR.',
      },
      {
        question: 'What is the penalty for using too many hashtags on YouTube?',
        answer:
          'If you add more than 60 hashtags to a single video, YouTube\'s algorithm ignores all hashtags on that video entirely. Excessive hashtag usage can also trigger YouTube\'s spam and misleading metadata filters, which can reduce video impressions.',
      },
      {
        question: 'Are hashtags necessary for YouTube Shorts?',
        answer:
          'While not mandatory, adding 2 to 3 targeted hashtags (such as #Shorts and one niche-specific tag) helps the YouTube algorithm categorize your content faster during early testing, and connects your Short to dedicated hashtag topic feeds.',
      },
    ],
    relatedToolSlugs: ['tag-extractor', 'shorts-safe-zone', 'seo-score-checker'],
    updatedAt: '2026-09-30',
  },
  {
    slug: 'shorts-safe-zone',
    name: 'YouTube Shorts Safe Zone Checker',
    shortTitle: 'Shorts Safe Zone',
    headline: 'Ensure Critical Text & Faces Are Not Blocked by Shorts UI',
    description:
      'Preview your vertical 9:16 Shorts video against YouTube\'s native UI buttons (Like, Comment, Share, Sound Disc, Channel Title) to prevent text overlap.',
    category: 'utilities',
    badge: 'Essential',
    priority: 'P3',
    featured: true,
    iconName: 'Smartphone',
    primaryKeyword: 'youtube shorts safe zone',
    secondaryKeywords: [
      'youtube shorts dimensions',
      'youtube shorts overlay checker',
      'shorts aspect ratio preview',
      'shorts ui overlay template',
    ],
    metaTitle: 'YouTube Shorts Safe Zone Checker (9:16)',
    metaDescription:
      'Test your vertical video against YouTube Shorts UI overlay. Prevent captions and faces from being covered by Like/Comment buttons. 100% free.',
    howItWorks: [
      {
        step: 1,
        title: 'Upload Frame or Image',
        description: 'Select any 9:16 vertical video screenshot or thumbnail graphic.',
      },
      {
        step: 2,
        title: 'Inspect Native Overlay Grid',
        description: 'View the transparent YouTube Shorts UI layer (sidebar buttons, sound title, handle).',
      },
      {
        step: 3,
        title: 'Export Safe-Zone Guide',
        description: 'Download the PNG safe-zone overlay template and adjust your text and graphics into the unobstructed green safe-zone area before exporting your final video.',
      },
    ],
    features: [
      'Accurate 2026 YouTube Shorts mobile UI overlay mask',
      'Visual red/green zones highlighting button obstruction areas',
      'Supports 1080x1920 9:16 vertical resolution checks',
      'Free PNG safe-zone overlay template for Premiere / CapCut / DaVinci',
    ],
    limitations: [
      'Device UI scaling may vary slightly between iOS and Android screen aspect ratios (19.5:9 vs 20:9).',
    ],
    faqs: [
      {
        question: 'What are the dimensions for YouTube Shorts in 2026?',
        answer:
          'The official resolution is 1080x1920 pixels with a 9:16 aspect ratio. Videos must be vertical and 3 minutes (180 seconds) or shorter — YouTube extended the Shorts limit from 60 seconds to 3 minutes in October 2024.',
      },
      {
        question: 'What is the YouTube Shorts safe zone?',
        answer:
          'The safe zone is the central vertical area of the screen (avoiding the bottom 25% where title/sound info sits and the right 15% where action buttons reside) where captions and graphics remain 100% visible.',
      },
      {
        question: 'Why are my auto-generated captions covered by the Shorts UI?',
        answer:
          'By default, many editing apps place subtitles near the bottom center of the video frame. On YouTube Shorts, this zone is heavily obstructed by the channel name, subscribe button, and audio title overlay. Keep your captions positioned in the middle third of the vertical frame (between 35% and 65% height).',
      },
      {
        question: 'Does YouTube Shorts support 4K 2160x3840 resolution?',
        answer:
          'Yes, you can upload vertical videos in 4K (2160x3840), but YouTube renders Shorts at a maximum of 1080x1920 (1080p 60fps) on mobile screens. Uploading in 4K ensures superior sharpness due to higher bitrate encoding before YouTube compresses the file.',
      },
    ],
    relatedToolSlugs: ['thumbnail-preview', 'hashtag-generator', 'title-description-analyzer'],
    updatedAt: '2026-09-30',
  },
  {
    slug: 'timestamp-validator',
    name: 'YouTube Chapter & Timestamp Validator',
    shortTitle: 'Chapter Validator',
    headline: 'Format & Validate YouTube Video Chapters and Timestamps',
    description:
      'Validate, fix formatting errors, and preview interactive video chapters for your YouTube description to ensure Google Video Rich Snippets eligibility.',
    category: 'utilities',
    badge: 'Creator Pick',
    priority: 'P3',
    featured: false,
    iconName: 'ListOrdered',
    primaryKeyword: 'youtube chapter timestamps',
    secondaryKeywords: [
      'youtube timestamps generator',
      'youtube chapter validator',
      'fix youtube chapters not working',
      'youtube video chapters format',
    ],
    metaTitle: 'YouTube Timestamp & Chapter Validator',
    metaDescription:
      'Validate and generate error-free YouTube chapters and timestamps. Qualify for Google Search video key moments and rich snippets.',
    howItWorks: [
      {
        step: 1,
        title: 'Paste Timestamps',
        description: 'Paste your list of video timestamps (e.g. 00:00 Intro, 01:25 Step 1).',
      },
      {
        step: 2,
        title: 'Auto-Check YouTube Rules',
        description: 'System checks for starting at 00:00, minimum 3 chapters, and 10s chapter length.',
      },
      {
        step: 3,
        title: 'Copy Validated List',
        description: '1-Click copy formatted chapters directly into your video description.',
      },
    ],
    features: [
      'Checks YouTube mandatory rules (starts at 00:00, minimum 3 timestamps, ≥10 seconds length)',
      'Auto-fixes chronological sorting and syntax errors',
      'Interactive visual timeline preview',
      'Ensures Google Key Moments rich snippet compliance',
    ],
    limitations: [
      'Channels with active Community Guidelines strikes or certain age-restricted content may not show chapters on YouTube.',
    ],
    faqs: [
      {
        question: 'Why are my YouTube chapters not working?',
        answer:
          'Common reasons include: not starting the first chapter at 00:00, having fewer than 3 timestamps, chapters shorter than 10 seconds, or formatting issues. Our tool automatically detects and repairs these issues.',
      },
      {
        question: 'What are the exact YouTube requirements for video chapters to activate?',
        answer:
          'To enable chapters: (1) The first timestamp must start at 00:00, (2) You must list at least 3 chapters in ascending chronological order, and (3) Each chapter must be at least 10 seconds long. If any of these conditions fail, YouTube will not split your video scrub bar.',
      },
      {
        question: 'How do YouTube timestamps help search rankings on Google?',
        answer:
          'Valid timestamps allow Google Search to generate "Key Moments" rich snippets directly in Google SERPs. Searchers can jump directly to the specific answer in your video, which dramatically increases external search traffic and click-through rates from Google Search.',
      },
      {
        question: 'Can I use timestamps in YouTube Shorts descriptions?',
        answer:
          'YouTube Shorts do not generate scrub-bar chapter markers because the Shorts player uses a continuous-scroll feed format rather than a seek bar. Shorts can be up to 3 minutes (180 seconds) as of October 2024, but even longer Shorts still do not display chapter breakpoints in the Shorts player. Clickable timestamps in descriptions are visible on the desktop watch page, but they do not activate scrub-bar chapters for vertical Shorts.',
      },
    ],
    relatedToolSlugs: ['title-description-analyzer', 'seo-score-checker'],
    updatedAt: '2026-09-30',
  },
  {
    slug: 'rpm-calculator',
    name: 'YouTube RPM Calculator',
    shortTitle: 'RPM Calculator',
    headline: 'Calculate Revenue Per Mille (RPM) and Monetization Yield',
    description:
      'Calculate your exact RPM (Revenue Per 1,000 views) from total earnings and views, and benchmark against 2026 creator industry standards.',
    category: 'monetization',
    badge: 'New',
    priority: 'P0',
    featured: false,
    iconName: 'Percent',
    primaryKeyword: 'youtube rpm calculator',
    secondaryKeywords: [
      'calculate youtube rpm',
      'youtube revenue per thousand views',
      'cpm vs rpm calculator youtube',
      'how to calculate rpm on youtube',
    ],
    metaTitle: 'YouTube RPM Calculator — Revenue per 1K Views',
    metaDescription:
      'Calculate your YouTube RPM accurately. Compare your Revenue Per Mille against industry standards across Finance, Gaming, Tech, and Education.',
    howItWorks: [
      {
        step: 1,
        title: 'Enter Total Views & Estimated Revenue',
        description: 'Input your video or channel analytics numbers for any time period.',
      },
      {
        step: 2,
        title: 'Instant Formula Calculation',
        description: 'Applies the official formula: (Estimated Earnings / Total Views) * 1,000.',
      },
      {
        step: 3,
        title: 'Compare with Niche Benchmark',
        description: 'See whether your RPM is above or below average for your content category.',
      },
    ],
    features: [
      'Accurate (Revenue / Views) * 1000 calculation',
      'Direct comparison chart with 10 major content niches',
      'Calculates projected revenue scaling at 100K, 500K, and 1M views',
    ],
    limitations: [
      'RPM factors in all revenue streams (Ads, Premium, Super Thanks, Memberships) divided by total views.',
    ],
    faqs: [
      {
        question: 'What is the formula for calculating YouTube RPM?',
        answer:
          'The formula is: RPM = (Total Estimated Earnings ÷ Total Views) × 1,000. For example, if your channel earned $50 from 10,000 total views in a given period, your RPM would be ($50 ÷ 10,000) × 1,000 = $5.00. RPM is always lower than CPM because it factors in both monetized and non-monetized views.',
      },
      {
        question: 'Why is my YouTube RPM lower than my CPM?',
        answer:
          'CPM is what advertisers pay for 1,000 ad impressions before YouTube takes its 45% revenue cut. RPM is what you actually earn per 1,000 total video views after YouTube\'s cut, factoring in non-monetized views, ad-blockers, and viewer demographics. As a result, RPM is typically 50–60% of CPM.',
      },
      {
        question: 'Which YouTube niches have the highest RPM in 2026?',
        answer:
          'Personal Finance, SaaS / Software tutorials, Real Estate, B2B Marketing, and Legal topics consistently command the highest RPMs ($12 - $35+), while broad entertainment, reaction videos, and gaming walkthroughs typically range from $1.50 to $5.00 RPM.',
      },
      {
        question: 'How can a creator increase their YouTube RPM?',
        answer:
          'Creators can boost RPM by producing content over 8 minutes to enable mid-roll ads, targeting high-intent topics with strong commercial buyer interest, attracting audiences in Tier 1 countries (US, UK, Canada, Australia), and supplementing ad revenue with Channel Memberships and Super Thanks.',
      },
    ],
    relatedToolSlugs: ['earnings-calculator', 'monetization-checker'],
    updatedAt: '2026-09-30',
  },
  {
    slug: 'channel-compare',
    name: 'YouTube Channel Comparison Tool',
    shortTitle: 'Channel Compare',
    headline: 'Compare Two YouTube Channels Side-by-Side (Public Stats)',
    description:
      'Compare subscriber counts, lifetime views, upload counts, and channel identifiers between any two public YouTube channels.',
    category: 'research',
    badge: 'Trending',
    priority: 'P2',
    featured: true,
    iconName: 'Users',
    primaryKeyword: 'youtube channel comparison tool',
    secondaryKeywords: [
      'youtube competitor analysis',
      'compare youtube channels',
      'youtube subscriber compare',
      'compare views youtube channels',
    ],
    metaTitle: 'YouTube Channel Comparison Tool (Free)',
    metaDescription:
      'Compare any two YouTube channels side-by-side. Analyze public subscribers, lifetime views, upload counts, and channel IDs with 100% free metrics.',
    howItWorks: [
      {
        step: 1,
        title: 'Enter First Channel',
        description: 'Input handle (@channel1) or channel link.',
      },
      {
        step: 2,
        title: 'Enter Second Channel',
        description: 'Input competitor handle (@channel2) or channel link.',
      },
      {
        step: 3,
        title: 'Compare Metrics Side-by-Side',
        description: 'View a direct side-by-side comparison of subscribers, lifetime views, uploads, and channel IDs.',
      },
    ],
    features: [
      'Side-by-side subscriber and view comparison',
      'Lifetime views and total upload counts for each channel',
      'Official channel IDs and handles in one view',
      '100% public data — no creator login required',
    ],
    limitations: [
      'Comparisons use publicly available YouTube statistics only. Revenue or monetization status is not estimated for either channel.',
    ],
    faqs: [
      {
        question: 'How can I compare my YouTube channel to a competitor?',
        answer:
          'Enter both channel handles or URLs. We fetch public subscribers, total views, video counts, and channel IDs to display a side-by-side public stats comparison.',
      },
      {
        question: 'What key metrics should I compare between two YouTube channels?',
        answer:
          'Compare upload cadence, average views per video (calculated as lifetime views divided by total uploads), subscriber-to-view ratios, and channel age. A smaller channel with higher average views per upload often has stronger audience engagement than a large channel with stagnant viewership.',
      },
      {
        question: 'Can I compare YouTube channel earnings or private analytics with this tool?',
        answer:
          'No. Private YouTube Studio metrics (such as exact revenue, audience retention graphs, and click-through rate) are only accessible to verified channel owners. This tool analyzes verified public channel data to benchmark competitive performance ethically.',
      },
      {
        question: 'Is it policy-compliant and safe to compare competitor channels?',
        answer:
          'Yes. Our tool only queries public statistics exposed through official YouTube Data API v3 endpoints (subscriber milestones, public view counts, upload tallies). We do not scrape private data, store credentials, or violate YouTube\'s Terms of Service.',
      },
    ],
    relatedToolSlugs: ['channel-id-finder', 'live-subscriber-count', 'earnings-calculator'],
    updatedAt: '2026-10-01',
  },
  {
    slug: 'upload-checklist',
    name: 'YouTube Upload Checklist',
    shortTitle: 'Upload Checklist',
    headline: 'Interactive 15-Point Pre-Upload Checklist for Maximum Views',
    description:
      'Never forget an optimization step before publishing. Interactive checklist covering titles, mobile CTR thumbnails, tags, timestamps, cards, and audio normalization.',
    category: 'utilities',
    badge: 'Essential',
    priority: 'P3',
    featured: true,
    iconName: 'CheckSquare',
    primaryKeyword: 'youtube upload checklist',
    secondaryKeywords: [
      'youtube video upload checklist',
      'pre upload checklist youtube',
      'youtube seo checklist tool',
      'video publishing checklist',
    ],
    metaTitle: 'YouTube Upload Checklist — 15-Step Audit',
    metaDescription:
      'Free interactive YouTube pre-upload checklist. Ensure your video has optimal titles, thumbnail readability, tags, chapters, and cards before clicking publish.',
    howItWorks: [
      {
        step: 1,
        title: 'Review 15 Optimization Steps',
        description: 'Go through Metadata, Visuals, Engagement, and Technical checks.',
      },
      {
        step: 2,
        title: 'Check Off Completed Items',
        description: 'Track your real-time readiness score (0-100%).',
      },
      {
        step: 3,
        title: '1-Click Copy Summary',
        description: 'Copy your completed audit log for your production workflow.',
      },
    ],
    features: [
      '15 categorized pre-flight optimization checks',
      'Real-time readiness progress bar',
      'Covers Mobile UI safe-zones, audio loudness (-14 LUFS), and chapters',
      '1-Click Copy completed checklist to clipboard',
    ],
    limitations: [
      'Checklist serves as a production workflow companion before publishing in YouTube Studio.',
    ],
    faqs: [
      {
        question: 'What is the most critical item on a YouTube pre-upload checklist?',
        answer:
          'Ensuring your thumbnail is legible on small mobile screens without text being obscured by the bottom-right timestamp badge, paired with a keyword-focused title under 70 characters.',
      },
      {
        question: 'Why is audio loudness normalization (-14 LUFS) important before uploading?',
        answer:
          'YouTube applies automatic loudness normalization to all uploaded audio, targeting approximately -14 LUFS (Integrated Loudness). If your audio is louder than -14 LUFS, YouTube\'s compressor turns down your volume, which can cause clipping or muddiness. Mastering to -14 LUFS guarantees clean, consistent volume.',
      },
      {
        question: 'Should I publish my video as Unlisted before making it Public?',
        answer:
          'Yes. Setting your upload to Unlisted for 1 to 2 hours before publishing allows YouTube to complete high-definition (1080p/4K) and VP9/AV1 video processing, finish automatic copyright checks (Content ID), and generate auto-captions so early viewers get the highest quality experience.',
      },
      {
        question: 'What is the best time of day to publish a YouTube video?',
        answer:
          'The optimal publishing window is typically 2 to 3 hours before your audience’s peak viewing hours (often 2:00 PM – 4:00 PM on weekdays in your primary audience timezone). This allows YouTube time to process HD formats, index keywords, and deliver early notifications as viewers log on.',
      },
    ],
    relatedToolSlugs: ['seo-score-checker', 'thumbnail-preview', 'timestamp-validator'],
    updatedAt: '2026-10-01',
  },
  {
    slug: 'thumbnail-downloader',
    name: 'YouTube Thumbnail Downloader',
    shortTitle: 'Thumbnail Downloader',
    headline: 'Download Any YouTube Thumbnail in HD — All Sizes Free',
    description:
      'Paste any YouTube video URL and instantly download its thumbnail in every available resolution: Max Resolution (1280×720), SD, HQ, MQ, and Default. Free, no signup, no watermarks.',
    category: 'utilities',
    badge: 'New',
    priority: 'P0',
    featured: true,
    iconName: 'Image',
    primaryKeyword: 'youtube thumbnail downloader',
    secondaryKeywords: [
      'download youtube thumbnail',
      'youtube thumbnail download hd',
      'save youtube thumbnail',
      'youtube video thumbnail download',
      'yt thumbnail downloader',
    ],
    metaTitle: 'YouTube Thumbnail Downloader — HD & 4K',
    metaDescription:
      'Download any YouTube video or Shorts thumbnail in every size, up to 1280×720 HD. No signup, no watermark, instant download.',
    howItWorks: [
      {
        step: 1,
        title: 'Paste the YouTube Video URL',
        description: 'Enter any public YouTube video link or Shorts URL in the input field.',
      },
      {
        step: 2,
        title: 'Preview All Thumbnail Sizes',
        description: 'See all available resolutions displayed instantly: Max Res, SD, HQ, MQ, and Default.',
      },
      {
        step: 3,
        title: 'Download Your Chosen Resolution',
        description: 'Click Download next to any size to save the JPG file directly to your device.',
      },
    ],
    features: [
      'Five resolution options: 1280×720, 640×480, 480×360, 320×180, 120×90',
      'Direct JPG download — no redirect, no popup',
      'Works with all public YouTube videos and Shorts',
      'No login, no watermark, completely free',
    ],
    limitations: [
      'Max Resolution (1280×720) is only available for videos with custom thumbnails uploaded by the creator. Use HQ (480×360) as a reliable fallback.',
      'Thumbnails are public images served by YouTube — they belong to their respective copyright holders.',
    ],
    faqs: [
      {
        question: 'How do I download a YouTube thumbnail for free?',
        answer:
          'Paste your YouTube video URL into the field above, click "Get Thumbnails," then click the Download button next to your preferred resolution. The thumbnail saves directly to your device as a JPG file.',
      },
      {
        question: 'What is the highest resolution for a YouTube thumbnail?',
        answer:
          'The highest available resolution is Max Resolution at 1280×720 pixels (HD). However, this size is only generated by YouTube when the video creator has uploaded a custom thumbnail. If a video uses an auto-generated thumbnail, the highest available size will be HQ at 480×360.',
      },
      {
        question: 'Can I use a downloaded YouTube thumbnail?',
        answer:
          'Thumbnails belong to the video creator and may be subject to copyright. You may download thumbnails for personal reference, research, or fair-use purposes, but commercial reuse requires permission from the copyright holder.',
      },
      {
        question: 'Does this tool work for YouTube Shorts thumbnails?',
        answer:
          'Yes. Simply paste the YouTube Shorts URL (e.g., youtube.com/shorts/VIDEO_ID) and all available thumbnail resolutions will be shown for download.',
      },
    ],
    relatedToolSlugs: ['thumbnail-preview', 'video-data-viewer', 'logo-banner-downloader'],
    updatedAt: '2026-10-13',
  },
  {
    slug: 'logo-banner-downloader',
    name: 'YouTube Profile Picture & Banner Downloader',
    shortTitle: 'Profile Picture Downloader',
    headline: 'Download Any Channel’s Profile Picture (Logo) and Banner in HD',
    description:
      'Enter any YouTube channel URL, @handle, or channel ID and download the full-resolution channel profile picture (logo) and banner art. Free, instant, no signup.',
    category: 'utilities',
    badge: 'New',
    priority: 'P1',
    featured: false,
    iconName: 'Image',
    primaryKeyword: 'youtube profile picture downloader',
    secondaryKeywords: [
      'download youtube channel logo',
      'youtube channel banner download',
      'youtube banner download hd',
      'save youtube channel art',
      'youtube channel icon download',
    ],
    metaTitle: 'YouTube Profile Picture & Logo Downloader (HD)',
    metaDescription:
      'Download any YouTube channel profile picture (logo) and banner image in full resolution. Paste a channel URL or @handle for instant free download.',
    howItWorks: [
      {
        step: 1,
        title: 'Enter a Channel URL or @Handle',
        description: 'Paste any YouTube channel URL, @handle, or channel ID.',
      },
      {
        step: 2,
        title: 'Preview Logo and Banner',
        description: 'Both the channel profile picture and banner art are displayed instantly.',
      },
      {
        step: 3,
        title: 'Download Either Asset',
        description: 'Click Download Logo or Download Banner to save each file.',
      },
    ],
    features: [
      'Downloads full-resolution channel profile picture (up to 800×800 px)',
      'Downloads full-resolution channel banner art (2560×1440 px TV quality)',
      'Accepts channel URL, @handle, or UCxxxxx channel ID',
      'No login required — 100% public data from YouTube Data API v3',
    ],
    limitations: [
      'Not all channels have a banner set — newer or minimal channels may have no banner image.',
      'Profile picture resolution is provided by YouTube at up to 800×800 px (high quality tier).',
    ],
    faqs: [
      {
        question: 'How do I download a YouTube channel profile picture?',
        answer:
          'Enter the channel @handle (e.g. @MrBeast) or channel URL in the field above and click "Get Assets." The channel logo will be displayed and available to download as a JPG.',
      },
      {
        question: 'What size is a YouTube channel banner?',
        answer:
          'YouTube recommends uploading channel banners at 2560×1440 pixels. YouTube then crops the image for different devices: 2560×423 on TV, 1546×423 on desktop, and 1060×175 on mobile. We retrieve the full 2560×1440 banner via the YouTube Data API.',
      },
      {
        question: 'Can I download my competitor\'s channel logo for reference?',
        answer:
          'You can download publicly available channel branding for personal reference, competitive research, or design inspiration. Commercial or promotional reuse of another channel\'s logo requires permission from the copyright holder.',
      },
    ],
    relatedToolSlugs: ['thumbnail-downloader', 'channel-id-finder', 'video-data-viewer'],
    updatedAt: '2026-10-13',
  },
  {
    slug: 'video-data-viewer',
    name: 'YouTube Video Data Viewer',
    shortTitle: 'Video Data Viewer',
    headline: 'View All Public YouTube Video Metadata in One Place',
    description:
      'Enter any YouTube video URL to instantly see all its public metadata: views, likes, comments, duration, publish date, video ID, channel ID, all tags, and description — no login needed.',
    category: 'research',
    badge: 'New',
    priority: 'P1',
    featured: false,
    iconName: 'PlayCircle',
    primaryKeyword: 'youtube video data viewer',
    secondaryKeywords: [
      'youtube video metadata viewer',
      'youtube video info tool',
      'view youtube video statistics',
      'youtube video details extractor',
      'youtube public video data',
    ],
    metaTitle: 'YouTube Data Viewer — Video Metadata',
    metaDescription:
      'View all public metadata for any YouTube video — stats, tags, IDs, description — plus engagement rate, and export it as JSON or CSV.',
    howItWorks: [
      {
        step: 1,
        title: 'Paste a YouTube Video URL',
        description: 'Enter any public YouTube video link or Shorts URL.',
      },
      {
        step: 2,
        title: 'View All Public Metadata',
        description: 'See views, likes, comments, duration, publish date, video ID, channel ID, and all tags.',
      },
      {
        step: 3,
        title: 'Copy Any Field',
        description: 'Click the copy icon next to any field to instantly copy the value to your clipboard.',
      },
    ],
    features: [
      'Live view count, like count, comment count, and video duration',
      'Exact video ID and channel ID for API or research use',
      'All public video tags and description preview',
      'One-click copy for any individual field',
      '100% public data from YouTube Data API v3 — no login required',
    ],
    limitations: [
      'Metrics reflect publicly displayed YouTube stats. Videos with disabled likes show 0 likes.',
      'Videos with disabled comments show 0 comments.',
      'Private and unlisted videos are not accessible.',
    ],
    faqs: [
      {
        question: 'How do I find the video ID for any YouTube video?',
        answer:
          'Paste the YouTube video URL into the tool and click "View Data." The Video ID field shows the unique 11-character ID (e.g. dQw4w9WgXcQ) which is the part after ?v= in the video\'s URL.',
      },
      {
        question: 'Can I see the exact view count for any YouTube video?',
        answer:
          'Yes. Our tool fetches live stats directly from YouTube Data API v3 and displays the exact current public view count with one-click copy to clipboard.',
      },
      {
        question: 'Why does the like count show 0 for some videos?',
        answer:
          'Some creators disable like counts on their videos. When a creator hides likes in YouTube Studio, the YouTube Data API returns 0 for the likeCount field. This is a creator setting — the tool accurately reflects what YouTube makes publicly available.',
      },
      {
        question: 'Does this tool show video tags?',
        answer:
          'Yes. Video tags are public metadata accessible through the YouTube Data API v3 snippet.tags field. All tags are displayed and you can also use our dedicated Tag Extractor tool for tag analysis and bulk copy.',
      },
    ],
    relatedToolSlugs: ['tag-extractor', 'thumbnail-downloader', 'logo-banner-downloader'],
    updatedAt: '2026-10-13',
  },
  {
    slug: 'live-view-count',
    name: 'YouTube Live View Count',
    shortTitle: 'Live View Count',
    headline: 'Track Live YouTube View Count in Real-Time — Auto-Refresh',
    description:
      'Paste any YouTube video URL to see its current view count, likes, and comments. Enable auto-refresh every 10, 30, or 60 seconds to watch the count update live.',
    category: 'analytics',
    badge: 'New',
    priority: 'P1',
    featured: true,
    iconName: 'Eye',
    primaryKeyword: 'youtube live view count',
    secondaryKeywords: [
      'youtube real time view count',
      'youtube view counter live',
      'check youtube views live',
      'live view count youtube video',
      'youtube views tracker',
    ],
    metaTitle: 'YouTube Live View Count — Real-Time',
    metaDescription:
      'Track any YouTube video\'s view count live with auto-refresh, a session trend line, views-per-minute and CSV export. Free, no login.',
    howItWorks: [
      {
        step: 1,
        title: 'Paste a YouTube Video URL',
        description: 'Enter any public YouTube video link to load its current stats.',
      },
      {
        step: 2,
        title: 'See the Current View Count',
        description: 'The live view count, likes, and comment count are displayed instantly.',
      },
      {
        step: 3,
        title: 'Enable Auto-Refresh',
        description: 'Click "Start Live" to auto-refresh every 10, 30, or 60 seconds and watch the count update.',
      },
    ],
    features: [
      'Live view count with auto-refresh at 10s, 30s, or 60s intervals',
      'Shows view delta — how many views gained since last refresh',
      'Displays likes and comment count alongside views',
      'Works for any public YouTube video or Shorts',
    ],
    limitations: [
      'YouTube caches public view counts server-side and updates them periodically (not every second). Refreshes accurately reflect the latest publicly available count.',
      'View counts may appear to lag for viral videos with extremely high traffic.',
    ],
    faqs: [
      {
        question: 'How do I see a YouTube video\'s live view count?',
        answer:
          'Paste the YouTube video URL into the field above, click "Track Views," then click "Start Live" to enable auto-refresh. The counter updates at your chosen interval (10, 30, or 60 seconds) and shows how many new views appeared since the last refresh.',
      },
      {
        question: 'Is the YouTube view count truly real-time?',
        answer:
          'YouTube\'s public API refreshes view counts periodically on their servers — not every second. For regular videos, counts typically update every few minutes. For viral videos with millions of concurrent viewers, YouTube switches to rounded counts to reduce server load. Our tool fetches the latest count YouTube makes publicly available.',
      },
      {
        question: 'Can I track view counts on YouTube Shorts?',
        answer:
          'Yes. Paste a YouTube Shorts URL (youtube.com/shorts/VIDEO_ID) and the live view counter works identically to regular videos.',
      },
      {
        question: 'Why do view counts sometimes stop increasing?',
        answer:
          'YouTube periodically audits view counts to filter out bot traffic and low-quality views. During an audit (common after a viral spike), the count may freeze or even decrease temporarily before correcting. This is a normal YouTube platform behavior.',
      },
    ],
    relatedToolSlugs: ['live-subscriber-count', 'video-data-viewer', 'earnings-calculator'],
    updatedAt: '2026-10-13',
  },
  {
    slug: 'youtube-trending',
    name: 'YouTube Trending Videos Today',
    shortTitle: 'YouTube Trending',
    headline: 'See What\'s Trending on YouTube Right Now — By Country & Category',
    description:
      'Browse the top 20 trending YouTube videos for any country and category — Music, Gaming, Sports, News, Entertainment, and more. Updated every 30 minutes via YouTube Data API.',
    category: 'research',
    badge: 'New',
    priority: 'P1',
    featured: true,
    iconName: 'TrendingUp',
    primaryKeyword: 'youtube trending',
    secondaryKeywords: [
      'youtube trending videos today',
      'what is trending on youtube',
      'youtube trending list',
      'youtube trending videos right now',
      'youtube trending by country',
    ],
    metaTitle: 'YouTube Trending Videos Today by Country',
    metaDescription:
      'See today’s trending YouTube videos by country and category, straight from YouTube’s most-popular chart. Free, no login.',
    howItWorks: [
      {
        step: 1,
        title: 'Select Your Country',
        description: 'Choose from 12 countries including US, UK, India, Canada, Australia, and more.',
      },
      {
        step: 2,
        title: 'Filter by Category',
        description: 'Browse All trending or narrow to Music, Gaming, Entertainment, Sports, or News.',
      },
      {
        step: 3,
        title: 'Click to Watch',
        description: 'Click any trending video to open it on YouTube directly.',
      },
    ],
    features: [
      'Top 20 trending videos updated every 30 minutes',
      '12 country regions: US, UK, India, Canada, Australia, Germany, France, Brazil, Japan, Korea, Pakistan, Saudi Arabia',
      '8 categories: All, Music, Gaming, Entertainment, Sports, News, Science & Tech, Comedy',
      'Shows view count, likes, publish time, and channel name for each video',
    ],
    limitations: [
      'Trending data is updated every 30 minutes from YouTube Data API v3. Real-time second-by-second trending is not available via the public API.',
      'Not all categories have trending videos in all regions — the API returns what YouTube makes available.',
    ],
    faqs: [
      {
        question: 'How does YouTube decide what is trending?',
        answer:
          'YouTube\'s trending algorithm considers total view count, rate of view growth, where views come from (YouTube vs. external sources), video age, and how the video performs compared to the channel\'s previous videos. It\'s designed to reflect a diverse mix of creators and content types, not just the most-viewed videos.',
      },
      {
        question: 'How often does the YouTube trending list update?',
        answer:
          'YouTube refreshes its trending list approximately every 15 minutes. Our tool caches and updates the list every 30 minutes via the YouTube Data API v3 to provide fresh, accurate results.',
      },
      {
        question: 'Can I see trending YouTube videos in my country?',
        answer:
          'Yes. Select your country from the region buttons — we support 12 countries including US, UK, India, Canada, Australia, Germany, France, Brazil, Japan, South Korea, Pakistan, and Saudi Arabia. Each country has its own trending list driven by local viewer behavior.',
      },
      {
        question: 'How can I use trending videos for my YouTube channel strategy?',
        answer:
          'Study trending videos in your niche to identify content formats, titles, and topics that are resonating right now. Pay attention to video length, thumbnail style, and posting time of trending creators. React, commentary, and educational content based on trending topics can earn strong algorithm momentum if published quickly.',
      },
    ],
    relatedToolSlugs: ['tag-extractor', 'video-data-viewer', 'live-view-count'],
    updatedAt: '2026-10-13',
  },
  {
    slug: 'watch-time-calculator',
    name: 'YouTube Watch Time Calculator',
    shortTitle: 'Watch Time Calculator',
    headline: 'Calculate How Long Until You Hit 4,000 YouTube Watch Hours (YPP)',
    description:
      'Enter your average daily watch hours to see exactly how many days it will take to reach the 4,000-hour YPP threshold. Includes a progress tracker and tips to accelerate watch time.',
    category: 'monetization',
    badge: 'Free',
    priority: 'P1',
    featured: true,
    iconName: 'Clock',
    primaryKeyword: 'youtube watch time calculator',
    secondaryKeywords: [
      '4000 watch hours calculator',
      'youtube 4000 hours calculator',
      'watch hours youtube calculator',
      'how long to get 4000 watch hours',
      'youtube monetization watch hours tracker',
    ],
    metaTitle: 'YouTube Watch Time Calculator (4,000 Hours)',
    metaDescription:
      'Calculate how many days until you hit 4,000 YouTube watch hours for monetization. Enter your current hours and daily growth to see your exact timeline.',
    howItWorks: [
      {
        step: 1,
        title: 'Enter Your Current Watch Hours',
        description: 'Input your total watch hours so far (find this in YouTube Studio → Analytics).',
      },
      {
        step: 2,
        title: 'Set Your Daily Watch Hour Growth',
        description: 'Enter how many watch hours you earn per day on average.',
      },
      {
        step: 3,
        title: 'See Your Timeline',
        description: 'Instantly see the days remaining, projected date, and progress percentage toward 4,000 hours.',
      },
    ],
    features: [
      'Calculates exact days remaining to 4,000 watch hours',
      'Shows projected YPP-eligible date based on daily growth rate',
      'Visual progress bar toward the 4,000-hour milestone',
      'Scenarios: conservative, moderate, and optimistic growth',
      'Tips to increase watch time faster',
    ],
    limitations: [
      'Calculation assumes a consistent daily growth rate. Actual results vary with upload frequency and algorithm performance.',
    ],
    faqs: [
      {
        question: 'How many watch hours do I need to monetize my YouTube channel?',
        answer:
          'You need 4,000 public watch hours in the last 12 months (not lifetime) plus 1,000 subscribers to qualify for the YouTube Partner Program (YPP). Watch hours from private or unlisted videos do not count.',
      },
      {
        question: 'How do I find my current YouTube watch hours?',
        answer:
          'Go to YouTube Studio → Analytics → Overview. Switch the date filter to "Last 365 days." The "Watch Time (Hours)" card shows your rolling 12-month total. Only public video watch time counts toward the YPP threshold.',
      },
      {
        question: 'How can I increase my YouTube watch hours faster?',
        answer:
          'Key strategies include: uploading longer videos (8+ minutes), creating playlists to encourage auto-play, embedding videos on your blog or website, using end screens to chain videos together, promoting older videos in new video descriptions, and improving audience retention with strong hooks in the first 30 seconds.',
      },
      {
        question: 'Do YouTube Shorts watch hours count toward 4,000 hours?',
        answer:
          'No. As of 2023, YouTube Shorts watch time does not count toward the 4,000-hour YPP requirement for long-form monetization. Shorts have a separate monetization path that requires 1,000 subscribers and 10 million Shorts views in 90 days.',
      },
    ],
    relatedToolSlugs: ['monetization-checker', 'earnings-calculator', 'live-subscriber-count'],
    updatedAt: '2026-10-13',
  },
  {
    slug: 'like-counter',
    name: 'YouTube Like Counter',
    shortTitle: 'Like Counter',
    headline: 'Check the Live Like Count on Any YouTube Video',
    description:
      'Enter any YouTube video URL to see its current like count, view count, and like-to-view ratio. Live data from the YouTube Data API v3.',
    category: 'analytics',
    badge: 'Live',
    priority: 'P1',
    featured: true,
    iconName: 'ThumbsUp',
    primaryKeyword: 'youtube like counter',
    secondaryKeywords: [
      'youtube likes counter',
      'check youtube video likes',
      'youtube live like count',
      'how many likes youtube video',
      'like counter youtube',
    ],
    metaTitle: 'YouTube Like Counter — Live Like Count',
    metaDescription:
      'Check the live like count on any YouTube video instantly. See total likes, views, and like-to-view ratio. Free, no signup, uses official YouTube Data API.',
    howItWorks: [
      {
        step: 1,
        title: 'Paste Any YouTube Video URL',
        description: 'Enter a full YouTube URL, short link, or video ID.',
      },
      {
        step: 2,
        title: 'See Live Like Count',
        description: 'Instantly view the current like count, view count, and like-to-view ratio from the YouTube Data API.',
      },
      {
        step: 3,
        title: 'Compare & Analyze',
        description: 'Compare the like-to-view ratio against industry benchmarks to gauge audience satisfaction.',
      },
    ],
    features: [
      'Live like count from YouTube Data API v3',
      'Like-to-view ratio calculation',
      'View count, like count, and publish date in one view',
      'Works with any public YouTube video URL or video ID',
    ],
    limitations: [
      'YouTube hides exact dislike counts from the public API since December 2021. Like counts are fully public.',
    ],
    faqs: [
      {
        question: 'Can I see the like count on a YouTube video?',
        answer:
          'Yes. YouTube like counts are public and available through the official YouTube Data API v3. Paste any YouTube video URL into this tool to see the current like count instantly.',
      },
      {
        question: 'What is a good like-to-view ratio on YouTube?',
        answer:
          'A like-to-view ratio of 4–6% is considered good on YouTube. Ratios above 8% indicate highly engaged audiences. Viral or viral-adjacent content can reach 10–15%. Educational and tutorial videos often see higher ratios than entertainment content.',
      },
      {
        question: 'Why can I no longer see dislikes on YouTube?',
        answer:
          'In November 2021, YouTube removed the public dislike count from the player to reduce targeted dislike attacks on creators. The total like count is still publicly visible. Some third-party browser extensions attempt to estimate dislikes using community-sourced data.',
      },
      {
        question: 'How accurate is the like count shown?',
        answer:
          'The like count is fetched live from the official YouTube Data API v3 and reflects the most recently cached value from YouTube\'s servers, typically accurate to within a few minutes for active videos.',
      },
    ],
    relatedToolSlugs: ['video-data-viewer', 'live-view-count', 'live-subscriber-count'],
    updatedAt: '2026-10-13',
  },
  {
    slug: 'dislike-checker',
    name: 'YouTube Dislike Checker',
    shortTitle: 'Dislike Checker',
    headline: 'Check Estimated Dislikes & Like-to-Dislike Ratio on Any YouTube Video',
    description:
      'See the estimated dislike count and like-to-dislike ratio for any YouTube video using community-sourced data from the Return YouTube Dislike project.',
    category: 'analytics',
    badge: 'Community Data',
    priority: 'P2',
    featured: false,
    iconName: 'ThumbsDown',
    primaryKeyword: 'youtube dislike checker',
    secondaryKeywords: [
      'like to dislike ratio youtube',
      'youtube like dislike ratio',
      'check youtube dislikes',
      'youtube dislike count',
      'return youtube dislike',
    ],
    metaTitle: 'YouTube Dislike Checker & Like Ratio',
    metaDescription:
      'Check estimated dislike counts and like-to-dislike ratio on any YouTube video. Uses Return YouTube Dislike community data. Free, no signup.',
    howItWorks: [
      {
        step: 1,
        title: 'Paste a YouTube Video URL',
        description: 'Enter any public YouTube video URL, short link, or video ID.',
      },
      {
        step: 2,
        title: 'See Estimated Dislike Count',
        description: 'View the estimated dislike count from Return YouTube Dislike community data plus official like count from YouTube Data API.',
      },
      {
        step: 3,
        title: 'Analyze the Ratio',
        description: 'See the like-to-dislike ratio and gauge how well a video is received.',
      },
    ],
    features: [
      'Estimated dislike count from Return YouTube Dislike API (community-sourced)',
      'Official like count from YouTube Data API v3',
      'Like-to-dislike ratio visualization',
      'View count and video metadata',
    ],
    limitations: [
      'YouTube removed public dislike counts in December 2021. Estimated dislike counts are community-sourced extrapolations from the Return YouTube Dislike project and are approximations, not official data.',
    ],
    faqs: [
      {
        question: 'Can I see YouTube dislikes in 2026?',
        answer:
          'Not officially. YouTube removed public dislike counts in November 2021. However, the Return YouTube Dislike browser extension and API track estimated dislikes using pre-removal data and community contributions. This tool uses that community data to show estimated dislike counts.',
      },
      {
        question: 'How accurate are the estimated YouTube dislike counts?',
        answer:
          'Estimated dislike counts from the Return YouTube Dislike project are extrapolations based on pre-removal data and user reports. They become less accurate over time for recent videos. Treat them as rough estimates rather than exact figures.',
      },
      {
        question: 'What is a typical like-to-dislike ratio on YouTube?',
        answer:
          'Before YouTube hid dislikes, popular videos averaged 95–98% likes. Ratios below 80% (based on historical data) typically indicated controversial or low-quality content. A ratio above 95% likes is considered very well received.',
      },
      {
        question: 'Why did YouTube remove the dislike button count?',
        answer:
          'YouTube officially removed public dislike counts in November 2021 to reduce coordinated dislike attacks (dislike bombing) on smaller creators and to reduce the psychological impact on creators experiencing targeted harassment.',
      },
    ],
    relatedToolSlugs: ['like-counter', 'video-data-viewer', 'live-view-count'],
    updatedAt: '2026-10-13',
  },
  {
    slug: 'live-stream-calculator',
    name: 'YouTube Live Stream Earnings Calculator',
    shortTitle: 'Live Stream Calculator',
    headline: 'Calculate How Much You Can Earn from YouTube Live Super Chats & Memberships',
    description:
      'Estimate your YouTube live stream earnings from Super Chats, Super Stickers, and Channel Memberships. Enter your average viewers and engagement rate to project hourly and monthly income.',
    category: 'monetization',
    badge: 'Free',
    priority: 'P2',
    featured: true,
    iconName: 'Zap',
    primaryKeyword: 'youtube live stream earnings calculator',
    secondaryKeywords: [
      'superchat earnings calculator',
      'youtube superchat calculator',
      'youtube live stream income',
      'superchat live income',
      'how much do youtubers make from superchats',
    ],
    metaTitle: 'YouTube Live Stream Earnings Calculator',
    metaDescription:
      'Calculate how much you can earn from YouTube live streams via Super Chats, Super Stickers, and memberships. Free calculator, no signup.',
    howItWorks: [
      {
        step: 1,
        title: 'Enter Your Average Live Viewers',
        description: 'Input your typical concurrent viewer count during a live stream.',
      },
      {
        step: 2,
        title: 'Set Engagement & Super Chat Rates',
        description: 'Adjust the Super Chat engagement rate (% of viewers who send a Super Chat) and average Super Chat value.',
      },
      {
        step: 3,
        title: 'See Projected Live Income',
        description: 'Get estimated Super Chat revenue per stream, per month, and per year including membership projections.',
      },
    ],
    features: [
      'Super Chat revenue estimate based on viewer count and engagement rate',
      'Channel Membership revenue projection',
      'Super Sticker earnings estimate',
      'Per-stream and monthly income breakdown',
      'YouTube\'s 30% fee factored in automatically',
    ],
    limitations: [
      'Actual Super Chat revenue varies widely by audience demographics, content category, and individual viewer generosity. These are estimates based on industry averages.',
    ],
    faqs: [
      {
        question: 'How much does YouTube take from Super Chats?',
        answer:
          'YouTube takes 30% of all Super Chat and Super Sticker revenue. The creator receives 70%. For example, if a viewer sends a $10 Super Chat, YouTube keeps $3.00 and the creator earns $7.00 (before applicable taxes).',
      },
      {
        question: 'How much can a YouTuber earn from Super Chats?',
        answer:
          'Super Chat income varies enormously. Smaller channels with 100–500 concurrent viewers might earn $20–$200 per stream. Popular live streamers with 5,000+ viewers can earn $1,000–$10,000+ per stream. Gaming, vTuber, and React content niches tend to have the highest Super Chat engagement rates.',
      },
      {
        question: 'What is the minimum Super Chat amount?',
        answer:
          'The minimum Super Chat amount is $2.00 (or equivalent in local currency). Super Chats range from $2 to $500. Messages from Super Chats of $5 or more are highlighted in the live chat for up to 5 minutes.',
      },
      {
        question: 'Do Channel Memberships count toward live stream earnings?',
        answer:
          'Channel Memberships ($0.99–$99.99/month) are not live-stream specific, but they are often driven by live stream loyalty. YouTube takes 30% of membership revenue. A channel with 500 members at $4.99/month earns approximately $1,747/month after YouTube\'s cut.',
      },
    ],
    relatedToolSlugs: ['earnings-calculator', 'rpm-calculator', 'monetization-checker'],
    updatedAt: '2026-10-13',
  },
  {
    "slug": "tag-generator",
    "name": "YouTube Tag Generator",
    "shortTitle": "Tag Generator",
    "headline": "Generate YouTube Tags From Real Search Suggestions",
    "description": "Turn one topic into a ranked list of YouTube tags taken from real YouTube search autocomplete for your country. Pick the tags that match your video, watch the 500-character budget meter, and copy them in one click.",
    "category": "seo",
    "badge": "New",
    "priority": "P0",
    "featured": true,
    "iconName": "Tags",
    "primaryKeyword": "youtube tag generator",
    "secondaryKeywords": [
      "tag generator",
      "tags generator for youtube",
      "youtube keyword generator",
      "youtube tags generator free",
      "seo tags generator"
    ],
    "metaTitle": "YouTube Tag Generator — Tags From Real Searches",
    "metaDescription": "Free YouTube tag generator that uses real YouTube search suggestions. Pick relevant tags, stay under the 500-character limit, and copy them in one click.",
    "howItWorks": [
      {
        "step": 1,
        "title": "Enter Your Topic",
        "description": "Type the main subject of your video, e.g. \"home workout for beginners\", and choose the country your viewers search from."
      },
      {
        "step": 2,
        "title": "Review Ranked Ideas",
        "description": "Suggestions are ranked by how often and how high they appear across several YouTube autocomplete lookups; the strongest are pre-selected."
      },
      {
        "step": 3,
        "title": "Copy Within the Limit",
        "description": "Toggle tags on or off while the meter tracks YouTube’s 500-character tag limit, then copy the comma-separated list into YouTube Studio."
      }
    ],
    "features": [
      "Suggestions from live YouTube search autocomplete, not a static word list",
      "Country selector for region-specific search phrasing",
      "Ranking by frequency across multiple query variations",
      "Live 500-character budget meter that counts spaces the way YouTube does",
      "One-click copy in the comma format YouTube Studio expects"
    ],
    "limitations": [
      "Autocomplete shows what people type, not exact search volume.",
      "Tags are a minor ranking signal; titles, thumbnails and watch time matter more.",
      "Suggestions can include brand names — only use tags that truthfully describe your video."
    ],
    "faqs": [
      {
        "question": "Do YouTube tags still matter in 2026?",
        "answer": "YouTube says tags play a minimal role in discovery and mainly help with commonly misspelled words or alternate phrasings. Use a handful of accurate tags, but spend most of your effort on the title, thumbnail and first lines of the description."
      },
      {
        "question": "How many tags should I add?",
        "answer": "Quality beats quantity. Five to fifteen accurate tags are plenty. YouTube allows up to 500 characters in total; tags with spaces count two extra characters because YouTube wraps them in quotes."
      },
      {
        "question": "Where do these tag ideas come from?",
        "answer": "From YouTube’s public search autocomplete — the phrases that appear as viewers type in the YouTube search box — collected for your topic plus variations like “how to”, “best” and “for”."
      },
      {
        "question": "Is this different from the Tag Extractor?",
        "answer": "Yes. The Tag Extractor shows the tags an existing video already uses. The Tag Generator suggests new tags for your own upload based on what people search."
      }
    ],
    "relatedToolSlugs": [
      "tag-extractor",
      "hashtag-generator",
      "seo-score-checker",
      "description-generator"
    ],
    "updatedAt": "2026-10-14"
  },
  {
    "slug": "description-generator",
    "name": "YouTube Description Generator",
    "shortTitle": "Description Generator",
    "headline": "Build a Complete YouTube Description From Proven Templates",
    "description": "Create a well-structured YouTube description in under a minute. Choose a template for tutorials, reviews, vlogs, Shorts or podcasts, add your keyword, chapters, links and hashtags, and see exactly what appears before “…more” with live checks for YouTube’s rules.",
    "category": "seo",
    "badge": "New",
    "priority": "P1",
    "featured": true,
    "iconName": "FileText",
    "primaryKeyword": "youtube description generator",
    "secondaryKeywords": [
      "youtube description template",
      "description generator",
      "youtube video description",
      "youtube description example",
      "description for youtube"
    ],
    "metaTitle": "YouTube Description Generator & Templates (Free)",
    "metaDescription": "Write a YouTube description fast with templates for tutorials, reviews, vlogs, Shorts and podcasts. Adds chapters, links and hashtags with live rule checks.",
    "howItWorks": [
      {
        "step": 1,
        "title": "Pick a Template",
        "description": "Choose the format that matches your video — tutorial, review, vlog, Shorts or podcast."
      },
      {
        "step": 2,
        "title": "Fill in the Details",
        "description": "Add your title, main keyword, chapters, links and up to five hashtags. The preview updates as you type."
      },
      {
        "step": 3,
        "title": "Check and Copy",
        "description": "Confirm the keyword sits above the fold, chapters start at 0:00 and you are under 5,000 characters, then copy it into YouTube Studio."
      }
    ],
    "features": [
      "Five format-specific templates with different hooks and structure",
      "Highlighted “above the fold” preview of the first ~157 characters",
      "Automatic chapter, link, call-to-action and disclosure sections",
      "Live checks for 0:00 chapters, hashtag count, < > characters and the 5,000-character limit",
      "Runs entirely in your browser — nothing is uploaded"
    ],
    "limitations": [
      "Templates are starting points — edit the wording so it sounds like you.",
      "The fold position varies slightly by device and language."
    ],
    "faqs": [
      {
        "question": "How long should a YouTube description be?",
        "answer": "There is no ideal length, but the first one or two sentences matter most because they show in search results and before “…more”. Most well-optimized descriptions are 150–400 words with chapters and links. The hard limit is 5,000 characters."
      },
      {
        "question": "Should I put keywords in my description?",
        "answer": "Yes, naturally. Mention your main keyword in the first sentence and use related phrases where they fit. Repeating keywords unnaturally can be treated as spam."
      },
      {
        "question": "Why do my chapters not show?",
        "answer": "YouTube chapters need a first timestamp of 0:00, at least three timestamps in ascending order, and each chapter at least 10 seconds long. Use the Timestamp Validator to check your list."
      },
      {
        "question": "Do I need an affiliate disclosure?",
        "answer": "If you earn from links in the description, many countries’ advertising rules require a clear disclosure. Tick the disclosure option to add a plain-language line."
      }
    ],
    "relatedToolSlugs": [
      "timestamp-validator",
      "hashtag-generator",
      "title-description-analyzer",
      "tag-generator"
    ],
    "updatedAt": "2026-10-14"
  },
  {
    "slug": "subscribe-link-generator",
    "name": "YouTube Subscribe Link Generator",
    "shortTitle": "Subscribe Link Generator",
    "headline": "Create a Link That Opens Your Channel With the Subscribe Prompt",
    "description": "Generate a YouTube subscribe link that opens your channel with the “Subscribe” confirmation already showing. Get the permanent channel-ID version, a readable @handle version, an HTML button for your website and a printable QR code.",
    "category": "utilities",
    "badge": "New",
    "priority": "P1",
    "featured": false,
    "iconName": "Link2",
    "primaryKeyword": "youtube subscribe link generator",
    "secondaryKeywords": [
      "subscribe link generator",
      "youtube subscribe link",
      "sub_confirmation link",
      "youtube subscribe button link",
      "youtube subscribe qr code"
    ],
    "metaTitle": "YouTube Subscribe Link Generator + QR Code",
    "metaDescription": "Create a YouTube subscribe link that opens the Subscribe confirmation pop-up. Get the channel ID and @handle versions, an HTML button and a QR code.",
    "howItWorks": [
      {
        "step": 1,
        "title": "Enter Your Channel",
        "description": "Paste your channel URL, @handle or UC channel ID."
      },
      {
        "step": 2,
        "title": "Get Your Links",
        "description": "We resolve the official channel ID and build ?sub_confirmation=1 links for both the ID and the handle."
      },
      {
        "step": 3,
        "title": "Share Anywhere",
        "description": "Copy the link or HTML button, or save the QR code for flyers, merch and end slides."
      }
    ],
    "features": [
      "Permanent channel-ID link that survives handle changes",
      "Readable @handle link for bios and captions",
      "Copy-ready HTML subscribe button",
      "QR code for print and video end screens",
      "Test button to preview the confirmation prompt"
    ],
    "limitations": [
      "The prompt only appears for viewers who are signed in and not already subscribed.",
      "The QR image is created by the free api.qrserver.com service."
    ],
    "faqs": [
      {
        "question": "What does ?sub_confirmation=1 do?",
        "answer": "Adding ?sub_confirmation=1 to your channel URL makes YouTube open a “Subscribe to this channel?” confirmation dialog, removing one step for viewers who click it."
      },
      {
        "question": "Which link should I use — channel ID or handle?",
        "answer": "The channel-ID link never changes, so use it anywhere you cannot easily edit later (printed QR codes, old blog posts). The @handle link is easier to read in bios and captions."
      },
      {
        "question": "Does a subscribe link break YouTube rules?",
        "answer": "No. It only shows a confirmation that viewers can accept or cancel. Do not offer rewards for subscribing or use sub-for-sub schemes; those break YouTube’s fake engagement policy."
      }
    ],
    "relatedToolSlugs": [
      "channel-id-finder",
      "logo-banner-downloader",
      "channel-name-generator"
    ],
    "updatedAt": "2026-10-14"
  },
  {
    "slug": "category-checker",
    "name": "YouTube Category Checker",
    "shortTitle": "Category Checker",
    "headline": "See Which Category Any YouTube Video Uses",
    "description": "Find the official YouTube category of any public video or Short, see the category ID and language, and compare it with a competitor’s upload. Spot videos left on the default “People & Blogs” category and learn which category fits better.",
    "category": "seo",
    "badge": "New",
    "priority": "P1",
    "featured": false,
    "iconName": "FolderSearch",
    "primaryKeyword": "youtube category checker",
    "secondaryKeywords": [
      "youtube video category checker",
      "check youtube category",
      "youtube category id",
      "youtube channel category checker",
      "video category finder"
    ],
    "metaTitle": "YouTube Category Checker — Find Any Video’s Category",
    "metaDescription": "Check the category of any YouTube video or Short. See the category ID and language, compare with a competitor and fix default People & Blogs categories.",
    "howItWorks": [
      {
        "step": 1,
        "title": "Paste a Video URL",
        "description": "Enter any public YouTube video or Shorts link."
      },
      {
        "step": 2,
        "title": "Optionally Add a Competitor",
        "description": "Paste a second video to compare categories side by side."
      },
      {
        "step": 3,
        "title": "Review and Adjust",
        "description": "See the category name, ID and guidance, then change your own category in YouTube Studio if needed."
      }
    ],
    "features": [
      "Official category from the YouTube Data API",
      "Category ID and default language",
      "Side-by-side comparison with a second video",
      "Warning for videos left on the default People & Blogs",
      "Plain-English guidance for every category"
    ],
    "limitations": [
      "YouTube does not publish a single “channel category”; channels are judged by their videos.",
      "Category is a light signal; it will not rescue a video with a weak title or thumbnail."
    ],
    "faqs": [
      {
        "question": "Does the YouTube category affect ranking?",
        "answer": "Category is a minor signal that helps YouTube understand context — for example, Gaming uploads can show a game card and Music uploads can surface in YouTube Music. Choose the most accurate category, but focus on title, thumbnail and retention."
      },
      {
        "question": "How do I change my video category?",
        "answer": "In YouTube Studio, open Content, select the video, click Show more under Details and pick a new Category. You can also set a default in Settings → Upload defaults."
      },
      {
        "question": "What is category 22?",
        "answer": "Category ID 22 is People & Blogs, YouTube’s default. Many creators never change it, even when Education, Howto & Style or Science & Technology describes their video better."
      }
    ],
    "relatedToolSlugs": [
      "video-data-viewer",
      "tag-extractor",
      "seo-score-checker"
    ],
    "updatedAt": "2026-10-14"
  },
  {
    "slug": "channel-name-generator",
    "name": "YouTube Channel Name Generator",
    "shortTitle": "Channel Name Generator",
    "headline": "Brainstorm Channel Names and Check the @Handle",
    "description": "Generate YouTube channel name ideas from your niche keywords in brandable, personal, descriptive or playful styles. Each idea comes with a ready-made @handle and a one-click link to see whether that handle is already taken on YouTube.",
    "category": "utilities",
    "badge": "New",
    "priority": "P2",
    "featured": false,
    "iconName": "Sparkles",
    "primaryKeyword": "youtube channel name generator",
    "secondaryKeywords": [
      "youtube name generator",
      "channel name ideas",
      "youtube name checker",
      "youtube handle generator",
      "youtube channel name ideas"
    ],
    "metaTitle": "YouTube Channel Name Generator + Handle Check",
    "metaDescription": "Get YouTube channel name ideas from your niche in four styles, with a matching @handle for each and a quick link to check if the handle is taken.",
    "howItWorks": [
      {
        "step": 1,
        "title": "Describe Your Channel",
        "description": "Enter one to four keywords, plus your first name if you want a personal brand."
      },
      {
        "step": 2,
        "title": "Choose a Style",
        "description": "Pick brandable, personal, descriptive (SEO) or playful and generate ideas."
      },
      {
        "step": 3,
        "title": "Check the Handle",
        "description": "Copy a favourite or open its @handle on YouTube to see if it is free, then confirm in YouTube Studio."
      }
    ],
    "features": [
      "Four naming styles for different channel goals",
      "Combines your keywords with your name for personal brands",
      "Automatic @handle suggestion within YouTube’s 30-character rule",
      "One-click link to check if a handle is taken",
      "Shuffle for fresh combinations — runs in your browser"
    ],
    "limitations": [
      "Handle availability is only confirmed in YouTube Studio.",
      "Check trademarks before committing to a name for a business channel."
    ],
    "faqs": [
      {
        "question": "What makes a good YouTube channel name?",
        "answer": "Short, easy to spell and say, and connected to what viewers get from your videos. Avoid numbers and underscores that people forget, and make sure the matching @handle is available."
      },
      {
        "question": "Can I change my channel name later?",
        "answer": "Yes. You can change your channel name and handle in YouTube Studio → Customization → Basic info, within YouTube’s limits on how often you can change them."
      },
      {
        "question": "Should my channel name include keywords?",
        "answer": "A descriptive name such as “Budget Meals Academy” tells new viewers what to expect and can help in search, but a brandable name is easier to grow beyond one topic. Pick based on your long-term plans."
      }
    ],
    "relatedToolSlugs": [
      "subscribe-link-generator",
      "channel-id-finder",
      "logo-banner-downloader"
    ],
    "updatedAt": "2026-10-14"
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS_REGISTRY.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return TOOLS_REGISTRY.filter((tool) => tool.category === category);
}

export function getCategoryById(id: ToolCategory): CategoryDefinition | undefined {
  return CATEGORIES.find((category) => category.id === id);
}

export function getAllCategoryIds(): ToolCategory[] {
  return CATEGORIES.map((category) => category.id);
}

export function getFeaturedTools(): ToolDefinition[] {
  return TOOLS_REGISTRY.filter((tool) => tool.featured);
}

export function getAllToolSlugs(): string[] {
  return TOOLS_REGISTRY.map((tool) => tool.slug);
}
