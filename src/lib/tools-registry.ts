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
    description: 'Real-time subscriber stats, engagement calculations, comment insights, and video performance.',
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
    metaTitle: 'YouTube Monetization Checker — Check Any Channel (Public Signals)',
    metaDescription:
      'Check inferred monetization likelihood, revenue estimates, and YPP-style public signals from any channel. Free, no signup. Clearly labeled non-official; owners can verify with YouTube Analytics.',
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
      'Extract the 24-character YouTube Channel ID (UC...), Channel Handle, and canonical RSS feed URL from a modern @handle, channel URL, or public video link.',
    category: 'research',
    badge: 'Popular',
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
      'Find the exact 24-character YouTube Channel ID (UC...) from a YouTube @handle, channel URL, UC ID, or public video link. Free lookup tool with RSS feed generator.',
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
    badge: 'Popular',
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
    metaTitle: 'YouTube Tag Extractor — View Public Video Tags',
    metaDescription:
      'Extract public SEO tags from any YouTube video in 1 click. View keyword rankings, tag count, and copy formatted tags for YouTube Studio.',
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
    headline: 'Calculate YouTube AdSense Income from Views',
    description:
      'Estimate your potential YouTube revenue based on daily video views, CPM/RPM brackets, creator niche, and geographic audience tier.',
    category: 'monetization',
    badge: 'Popular',
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
    metaTitle: 'YouTube Earnings Calculator — Estimate Ad Revenue',
    metaDescription:
      'Free YouTube earnings calculator. Estimate your daily, monthly, and yearly income based on views, CPM/RPM, niche category, and audience location.',
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
    headline: 'Audit YouTube Video SEO, Title Length, Tags & Descriptions',
    description:
      'Comprehensive YouTube SEO audit tool. Score your video optimization across title character counts, description keyword density, tag relevance, and metadata checklist.',
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
    metaTitle: 'YouTube SEO Score Checker — Video Metadata Audit',
    metaDescription:
      'Audit your YouTube video SEO score (0-100). Check title length, description formatting, tag count, chapters, and get actionable ranking recommendations.',
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
          'Yes. Refreshing the title, thumbnail, and chapter markers on older evergreen tutorials frequently triggers renewed impressions in browse features and Google Search Key Moments.',
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
    name: 'YouTube Live Subscriber Counter',
    shortTitle: 'Subscriber Count',
    headline: 'Live Public YouTube Subscriber Counter & Channel Statistics',
    description:
      'Track live public YouTube subscriber milestones, total video view counts, and channel growth rates with a clean, distraction-free tracker.',
    category: 'analytics',
    badge: 'Popular',
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
    metaTitle: 'Live YouTube Subscriber Count — Public Growth Tracker',
    metaDescription:
      'Track public YouTube subscriber statistics and milestone counts. Fast, full-screen live public sub tracker for any YouTube channel.',
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
      'Preview your YouTube video thumbnail across YouTube Homepage, Mobile Feed, Search Results, and Dark/Light mode before publishing.',
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
    metaTitle: 'YouTube Thumbnail Preview — Test CTR on Mobile & Desktop',
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
      'Analyze character count, mobile truncation cutoff, emoji density, and readability for YouTube titles and descriptions.',
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
    metaTitle: 'YouTube Title & Description Optimizer — Character & Truncation Checker',
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
      'Discover high-performing hashtags for YouTube Shorts and long-form videos to increase algorithmic discovery on hashtag landing pages.',
    category: 'seo',
    badge: 'Popular',
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
    metaTitle: 'YouTube Hashtag Generator — Best Hashtags for Shorts & Videos',
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
    metaTitle: 'YouTube Shorts Safe Zone Checker — 9:16 UI Overlay Guide',
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
        description: 'Adjust text positioning into the unobstructed green safe-zone area.',
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
    metaTitle: 'YouTube Chapter & Timestamp Validator — Fix Video Chapters Free',
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
          'YouTube Shorts do not generate scrub-bar chapter markers because Shorts are designed for quick continuous viewing under 60 seconds. However, clickable timestamps still work in comments or descriptions on the desktop watch page.',
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
    metaTitle: 'YouTube RPM Calculator — Calculate Revenue Per 1,000 Views Free',
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
        answer: 'RPM = (Total Estimated Earnings / Total Views) × 1,000.',
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
    metaTitle: 'YouTube Channel Comparison Tool — Compare Competitors Free',
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
    metaTitle: 'YouTube Upload Checklist — 15-Step Pre-Publishing Audit Free',
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
