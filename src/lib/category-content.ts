import type { ToolCategory } from '@/types/tools';

export interface CategoryComparisonRow {
  slug: string;
  bestFor: string;
  input: string;
  output: string;
}

export interface CategoryContent {
  /** Short paragraph shown under the H1, before the tools grid. */
  lead: string;
  sections: { heading: string; paragraphs: string[] }[];
  useCases: { title: string; text: string; slugs: string[] }[];
  comparison: CategoryComparisonRow[];
  faqs: { question: string; answer: string }[];
  related: { href: string; label: string }[];
}

export const CATEGORY_CONTENT: Partial<Record<ToolCategory, CategoryContent>> = {
  monetization: {
    lead:
      'Five free calculators and checkers that answer the money questions creators actually ask: am I close to the Partner Program, what could this channel earn, and how much watch time do I still need?',
    sections: [
      {
        heading: 'What these monetization tools can and cannot tell you',
        paragraphs: [
          'YouTube only shows real revenue to the channel owner, inside YouTube Studio and AdSense. Every outside tool, including ours, works from public numbers (subscribers, views, upload dates) or from figures you type in yourself. That makes these tools good for planning, sanity checks and research, but not for proving what a channel earns.',
          'We label every estimate as an estimate and show the inputs behind it. When a figure depends on your niche, audience country or ad season, the tool lets you change that assumption rather than hiding it inside one “exact” number.',
        ],
      },
      {
        heading: 'How to choose the right tool',
        paragraphs: [
          'Start with the question you need answered. If it is “is this channel likely monetized?”, use the Monetization Checker; it reads public channel data and scores how strong the public signals are. If you own the channel, its optional owner verification gives a far more reliable answer.',
          'If the question is “what could I earn?”, use the Earnings Calculator for a range based on views and niche, or the RPM Calculator when you already know your revenue and want the per-1,000-views rate. The Watch Time Calculator takes your current public watch hours and your daily gain and shows how many hours remain to the 4,000 needed for the Partner Program and roughly how long that will take, and the Live Stream Earnings Calculator models Super Chat, memberships and ad revenue for streams.',
        ],
      },
      {
        heading: 'RPM, CPM and why estimates vary so much',
        paragraphs: [
          'CPM is what advertisers pay per 1,000 ad impressions; RPM is what you receive per 1,000 views after YouTube’s share and after counting views that showed no ads. RPM is the number that matters for planning, and it is usually well below CPM.',
          'Two channels with identical view counts can earn very different amounts. Finance, software and business topics with audiences in high-income countries tend to earn more per view than entertainment or gaming aimed at a global audience, and rates rise in the fourth quarter as advertisers spend more. Shorts revenue is pooled and shared differently, so Shorts views earn far less per view than long-form views.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Checking your own path to YPP',
        text: 'Use the Watch Time Calculator to see how many more watch hours you need and how long reaching them may take, then confirm your official progress in YouTube Studio → Earn.',
        slugs: ['watch-time-calculator', 'monetization-checker'],
      },
      {
        title: 'Vetting a creator before a sponsorship',
        text: 'Run the Monetization Checker for public signal strength and the Earnings Calculator for a realistic revenue range, then ask the creator for a Studio screenshot to confirm.',
        slugs: ['monetization-checker', 'earnings-calculator'],
      },
      {
        title: 'Planning a new channel or niche',
        text: 'Compare RPM scenarios for two or three niches before you commit, so your expectations match the audience you are building.',
        slugs: ['rpm-calculator', 'earnings-calculator'],
      },
      {
        title: 'Deciding whether to go live',
        text: 'Model a stream with a realistic average viewer count and Super Chat rate to see whether live content is worth the extra production time.',
        slugs: ['live-stream-calculator'],
      },
    ],
    comparison: [
      { slug: 'monetization-checker', bestFor: 'Checking whether any channel shows public signs of monetization', input: 'Channel URL, @handle or video link', output: 'Public signal score, eligibility indicators, revenue range' },
      { slug: 'earnings-calculator', bestFor: 'Estimating daily, monthly and yearly revenue', input: 'Daily views, niche or custom RPM', output: 'Daily, monthly and yearly revenue' },
      { slug: 'rpm-calculator', bestFor: 'Working out revenue per 1,000 views', input: 'Earnings and views for a period', output: 'Your RPM, projected at 100K–1M views' },
      { slug: 'watch-time-calculator', bestFor: 'Tracking progress to 4,000 watch hours', input: 'Current watch hours, hours gained per day', output: 'Hours remaining and time to goal' },
      { slug: 'live-stream-calculator', bestFor: 'Estimating income from a live stream', input: 'Average viewers, stream length, Super Chats, members', output: 'Ad, Super Chat and membership estimate' },
    ],
    faqs: [
      {
        question: 'Can any tool show exactly how much a YouTube channel earns?',
        answer: 'No. Exact revenue is private to the channel owner in YouTube Studio and AdSense. Outside tools, including these, estimate earnings from public views and typical RPM ranges, so treat the results as a range rather than a fact.',
      },
      {
        question: 'Which monetization tool should I use first?',
        answer: 'If you are not monetized yet, start with the Watch Time Calculator to see how far you are from the Partner Program. If you already earn, open the RPM Calculator with your real figures from YouTube Studio. If you are researching someone else’s channel, start with the Monetization Checker.',
      },
      {
        question: 'Why is my real RPM lower than the calculator’s estimate?',
        answer: 'RPM drops when a large share of views come from Shorts, from countries with lower ad rates, from viewers using ad blockers or YouTube Premium, or from videos that are not suitable for most advertisers. Enter your own RPM from YouTube Studio for the most accurate projection.',
      },
      {
        question: 'Are these monetization tools free, and do they need my login?',
        answer: 'All five tools are free and work without an account. Only the optional owner verification in the Monetization Checker asks you to connect Google, using read-only permissions that you can revoke at any time.',
      },
    ],
    related: [
      { href: '/guides/youtube-monetization', label: 'YouTube Monetization Hub' },
      { href: '/blog/how-to-check-youtube-monetization-status', label: 'How to check if a channel is monetized' },
      { href: '/blog/what-is-youtube-rpm', label: 'What is YouTube RPM?' },
    ],
  },
  research: {
    lead:
      'Free research tools for looking up channels and videos: find permanent channel IDs, compare competitors side by side, read a video’s full public metadata and see what is trending in any country.',
    sections: [
      {
        heading: 'Why channel and video research matters',
        paragraphs: [
          'Good YouTube decisions start with good reference points. Before you choose a topic, pitch a sponsor or build an automation, you need reliable facts about the channels and videos involved: who they are, how often they publish, how their videos perform and what the audience is watching right now.',
          'All four tools read the official YouTube Data API, so the numbers match what YouTube shows publicly. They never access private analytics, watch-time data or demographics, which only the channel owner can see in YouTube Studio.',
        ],
      },
      {
        heading: 'How to choose the right research tool',
        paragraphs: [
          'Use the Channel ID Finder whenever software asks for a channel ID. Handles and custom URLs can change, but the 24-character ID that starts with “UC” never does, which is why RSS readers, Discord bots, Zapier and the YouTube API all depend on it.',
          'Use Channel Compare to put two channels side by side on subscribers, lifetime views and video count; dividing views by videos gives a quick average-views-per-video benchmark. Use the Video Data Viewer to inspect one video in depth (publish time, tags, engagement rate, views per day and age) and export it as JSON or CSV. Use YouTube Trending to see the most popular videos by country and category today.',
        ],
      },
      {
        heading: 'Getting meaningful comparisons',
        paragraphs: [
          'Compare like with like. A channel with 2,000 uploads will beat a channel with 50 uploads on total views, so look at average views per video and recent upload frequency as well as lifetime totals. Channels in the same niche and at a similar stage give the most useful benchmarks.',
          'Public subscriber counts are rounded by YouTube (for example 1.23 million), so small differences between large channels are not meaningful. View counts and video counts are exact and are the better signals for growth over time.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Setting up an RSS feed, bot or automation',
        text: 'Paste the channel’s @handle into the Channel ID Finder, copy the UC ID and the ready-made RSS feed URL, and store the ID rather than the handle.',
        slugs: ['channel-id-finder'],
      },
      {
        title: 'Benchmarking competitors',
        text: 'Compare your channel with a close peer in Channel Compare (repeat for other competitors), then open their best recent videos in the Video Data Viewer to see the titles and tags behind them.',
        slugs: ['channel-compare', 'video-data-viewer'],
      },
      {
        title: 'Finding timely video ideas',
        text: 'Check YouTube Trending for your country and category, note the formats that keep appearing, and adapt the idea to your own audience rather than copying the video.',
        slugs: ['youtube-trending'],
      },
      {
        title: 'Auditing a sponsor or collaboration partner',
        text: 'Confirm the channel’s real ID, video count and view totals before agreeing to a deal, so you are not relying on a screenshot alone.',
        slugs: ['channel-id-finder', 'channel-compare'],
      },
    ],
    comparison: [
      { slug: 'channel-id-finder', bestFor: 'Getting a permanent UC channel ID and RSS feed', input: 'Channel URL, @handle or video link', output: 'Channel ID, handle, RSS URL' },
      { slug: 'channel-compare', bestFor: 'Benchmarking two channels side by side', input: 'Two channel URLs or @handles', output: 'Subscribers, lifetime views, video count' },
      { slug: 'video-data-viewer', bestFor: 'Reading every public detail of one video', input: 'Video URL', output: 'Metadata, tags, engagement, JSON/CSV export' },
      { slug: 'youtube-trending', bestFor: 'Seeing what is popular today', input: 'Country and category', output: 'Current trending videos' },
    ],
    faqs: [
      {
        question: 'Is it allowed to research other YouTube channels?',
        answer: 'Yes. These tools only read public information that YouTube itself shows to every visitor, retrieved through the official YouTube Data API. They do not scrape private data or bypass any access controls.',
      },
      {
        question: 'Which research tool helps most before a sponsorship deal?',
        answer: 'Use Channel Compare to set a channel’s lifetime views against its video count and against a similar channel, then open a few recent uploads in the Video Data Viewer. Consistent recent performance matters more to a sponsor than lifetime totals.',
      },
      {
        question: 'Can I see another channel’s watch time or audience demographics?',
        answer: 'No. Watch time, traffic sources, demographics and revenue are visible only to the channel owner in YouTube Studio. Public research tools can show subscribers, views, video counts and per-video metadata.',
      },
      {
        question: 'Do these research tools use my own YouTube account or API quota?',
        answer: 'No. Lookups run through our server using the public YouTube Data API, so you do not need an API key or a Google login. A fair daily limit per visitor keeps the shared quota available for everyone.',
      },
    ],
    related: [
      { href: '/blog/youtube-channel-id-vs-handle-guide', label: 'Channel ID vs handle vs custom URL' },
      { href: '/blog/youtube-competitor-analysis-without-violating-tos', label: 'Policy-safe competitor analysis' },
      { href: '/guides/youtube-troubleshooting', label: 'YouTube Troubleshooting Hub' },
    ],
  },
  seo: {
    lead:
      'Free YouTube SEO tools for every step of writing metadata: research tags from real searches, generate descriptions, check titles for truncation, pick hashtags and score the whole package before you publish.',
    sections: [
      {
        heading: 'What YouTube SEO really means in 2026',
        paragraphs: [
          'YouTube ranks videos mainly on how viewers respond: whether they click, how long they watch and whether they come back. Metadata (title, description, tags, hashtags, chapters and category) does not replace a good video, but it tells YouTube and viewers what the video is about, so it can be shown to the right people in search and suggested videos.',
          'That is why these tools focus on clarity rather than keyword stuffing. They check that your main topic appears early, that titles fit on a phone screen, that descriptions give context above the fold and that tags reflect what people actually search for.',
        ],
      },
      {
        heading: 'How to choose the right SEO tool',
        paragraphs: [
          'For keyword ideas, start with the Tag Generator, which pulls suggestions from YouTube’s own search autocomplete, or the Tag Extractor to see which tags a successful video used. For writing, use the Description Generator for a structured first draft and the Title & Description Analyzer to check length and mobile truncation.',
          'Use the Hashtag Generator for the three hashtags that appear above your title, and the Category Checker to make sure your video is not stuck in the default People & Blogs category. Finish with the SEO Score Checker, which rates a draft or published video against a 12-point metadata checklist.',
        ],
      },
      {
        heading: 'A simple pre-publish workflow',
        paragraphs: [
          'Pick one main search phrase per video. Put it near the start of the title, use it naturally in the first two lines of the description and include it as your first tag. Add a few closely related phrases as extra tags rather than dozens of loosely related ones.',
          'Then check the package as a viewer would: does the title make sense when cut off at around 60 characters, does the description explain what the viewer will get, and do chapters help them jump to the part they need? Score it, fix the weakest item and publish.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Researching keywords for a new video',
        text: 'Enter your topic in the Tag Generator to see real search suggestions, then check a top-ranking video’s tags in the Tag Extractor to fill gaps.',
        slugs: ['tag-generator', 'tag-extractor'],
      },
      {
        title: 'Writing the description and title',
        text: 'Start from a Description Generator template, then run the title and description through the Analyzer to catch truncation before you upload.',
        slugs: ['description-generator', 'title-description-analyzer'],
      },
      {
        title: 'Optimizing Shorts',
        text: 'Pick a small set of relevant hashtags and keep the title short enough to read over the video on mobile.',
        slugs: ['hashtag-generator'],
      },
      {
        title: 'Auditing old videos that underperform',
        text: 'Load the video into the SEO Score Checker, confirm its category with the Category Checker, and update the weakest metadata first.',
        slugs: ['seo-score-checker', 'category-checker'],
      },
    ],
    comparison: [
      { slug: 'tag-generator', bestFor: 'New tag and keyword ideas from real searches', input: 'Topic or seed keyword', output: 'Ranked tags with a 500-character meter' },
      { slug: 'tag-extractor', bestFor: 'Seeing the tags a published video uses', input: 'Video URL', output: 'Tag list ready to copy' },
      { slug: 'description-generator', bestFor: 'Drafting a structured description', input: 'Video details and a template', output: 'Description with fold preview and checks' },
      { slug: 'title-description-analyzer', bestFor: 'Checking length and mobile truncation', input: 'Title and description text', output: 'Length, truncation and readability checks' },
      { slug: 'hashtag-generator', bestFor: 'Choosing hashtags for videos and Shorts', input: 'Topic', output: 'Relevant hashtags' },
      { slug: 'category-checker', bestFor: 'Finding and comparing video categories', input: 'Video URL', output: 'Category name, ID and advice' },
      { slug: 'seo-score-checker', bestFor: 'Scoring a draft or published video', input: 'Video URL or draft metadata', output: '0–100 score with fixes' },
    ],
    faqs: [
      {
        question: 'In what order should I use these SEO tools?',
        answer: 'A practical order is: Tag Generator for keyword ideas, Description Generator for a first draft, Title & Description Analyzer for length checks, Hashtag Generator for hashtags, Category Checker for the right category, and finally the SEO Score Checker to review the whole package.',
      },
      {
        question: 'Are free YouTube SEO tools as useful as paid ones?',
        answer: 'For metadata work, largely yes. Paid suites add things like rank tracking and historical keyword volume, but writing a clear title, a helpful description and accurate tags only needs reliable checks and real search suggestions, which these free tools provide.',
      },
      {
        question: 'Will updating metadata on old videos help?',
        answer: 'It can, especially when an old video has a vague title, an empty description or the wrong category. Change one element at a time and give it a couple of weeks so you can see the effect in YouTube Studio before changing anything else.',
      },
      {
        question: 'Is the SEO score an official YouTube ranking score?',
        answer: 'No. It is an educational checklist based on YouTube’s published guidance and common best practice. A high score means your metadata is clear and complete; it does not guarantee rankings.',
      },
    ],
    related: [
      { href: '/guides/youtube-seo', label: 'YouTube SEO Hub' },
      { href: '/blog/youtube-seo-guide-2026', label: 'YouTube SEO Guide 2026' },
      { href: '/blog/youtube-title-length-best-practices', label: 'YouTube title length guide' },
    ],
  },
  utilities: {
    lead:
      'Practical utilities for the jobs around publishing: preview thumbnails, check Shorts safe zones, validate chapters, follow an upload checklist, grab thumbnails and channel art, create subscribe links and brainstorm channel names.',
    sections: [
      {
        heading: 'Small tools for the steps that are easy to skip',
        paragraphs: [
          'Most upload mistakes are not about strategy. A caption hidden behind the Shorts buttons, a thumbnail that is unreadable at phone size, chapters that do not appear because the first timestamp is not 0:00: each one is quick to fix before publishing and annoying to discover afterwards. These utilities catch those problems in seconds.',
          'Everything runs in your browser or reads public YouTube data. Nothing is uploaded to YouTube on your behalf, and none of the tools need you to sign in.',
        ],
      },
      {
        heading: 'How to choose the right utility',
        paragraphs: [
          'Before publishing, use Thumbnail Preview to see your thumbnail in the home feed, search and suggested layouts, the Shorts Safe Zone checker to keep text clear of YouTube’s on-screen controls and the Timestamp Validator to make sure your chapters will display. The Upload Checklist ties these steps together.',
          'For assets, the Thumbnail Downloader saves a video’s thumbnail in every available size, and the Profile Picture & Banner Downloader saves a channel’s avatar and banner. For growth, the Subscribe Link Generator creates a link that opens the subscribe prompt, and the Channel Name Generator helps you brainstorm names with matching @handles.',
        ],
      },
      {
        heading: 'Using downloaded images responsibly',
        paragraphs: [
          'Thumbnails, profile pictures and banners belong to the creators who made them. Downloading your own artwork, or using another creator’s image for commentary, research or a mock-up you will not publish, is generally fine. Reusing someone else’s artwork as your own thumbnail or branding is not, and it can lead to copyright claims.',
          'When in doubt, ask the creator for permission and credit them. For your own channel, keep original design files so you are not relying on a compressed download.',
        ],
      },
    ],
    useCases: [
      {
        title: 'Final checks before an upload',
        text: 'Preview the thumbnail, validate chapters and run through the Upload Checklist so nothing is missed on publish day.',
        slugs: ['thumbnail-preview', 'timestamp-validator', 'upload-checklist'],
      },
      {
        title: 'Making Shorts that read well on phones',
        text: 'Place your Short’s frame in the Safe Zone checker and move captions or faces that sit under the like, comment or caption areas.',
        slugs: ['shorts-safe-zone'],
      },
      {
        title: 'Growing subscribers from outside YouTube',
        text: 'Create a subscribe link with a QR code for your website, newsletter, packaging or business card.',
        slugs: ['subscribe-link-generator'],
      },
      {
        title: 'Starting or rebranding a channel',
        text: 'Brainstorm names and handles, then study how established channels in your niche present their profile picture and banner.',
        slugs: ['channel-name-generator', 'logo-banner-downloader'],
      },
    ],
    comparison: [
      { slug: 'thumbnail-preview', bestFor: 'Testing a thumbnail before publishing', input: 'Image upload or video URL', output: 'Home, search and mobile previews' },
      { slug: 'shorts-safe-zone', bestFor: 'Keeping Shorts text clear of YouTube controls', input: 'Uploaded 9:16 frame', output: 'Safe-area overlay, PNG export' },
      { slug: 'timestamp-validator', bestFor: 'Making sure chapters will display', input: 'Description timestamps', output: 'Errors, fixes and chapter preview' },
      { slug: 'upload-checklist', bestFor: 'A repeatable pre-publish routine', input: 'None', output: 'Interactive, copyable checklist' },
      { slug: 'thumbnail-downloader', bestFor: 'Saving a video thumbnail', input: 'Video URL', output: 'Thumbnail in every available size' },
      { slug: 'logo-banner-downloader', bestFor: 'Saving a channel’s profile picture and banner', input: 'Channel URL or @handle', output: 'Full-size avatar and banner' },
      { slug: 'subscribe-link-generator', bestFor: 'Linking straight to the subscribe prompt', input: 'Channel URL or @handle', output: 'Subscribe link, HTML button, QR code' },
      { slug: 'channel-name-generator', bestFor: 'Brainstorming a channel name', input: 'Topic and style', output: 'Name ideas with @handle suggestions' },
    ],
    faqs: [
      {
        question: 'Which utility should I run before every upload?',
        answer: 'The Upload Checklist is the best habit to build, because it links to the other checks. At minimum, preview your thumbnail at phone size and validate your chapters; for Shorts, check the safe zone as well.',
      },
      {
        question: 'Do the utilities work for both Shorts and long-form videos?',
        answer: 'Most do. The Shorts Safe Zone checker is made for vertical Shorts, while Thumbnail Preview and the Timestamp Validator are for long-form videos. The downloaders, Subscribe Link Generator and Channel Name Generator work at channel level and apply to any format.',
      },
      {
        question: 'Is it legal to download a YouTube thumbnail?',
        answer: 'Saving a thumbnail is technically simple, but the image is still protected by copyright. Using your own thumbnails, or using others for commentary, research or private reference, is generally fine; republishing someone else’s artwork as your own is not.',
      },
      {
        question: 'Do these utilities need my YouTube login?',
        answer: 'No. They run in your browser or read public data, so you never have to connect your account.',
      },
    ],
    related: [
      { href: '/blog/youtube-thumbnail-size-guide-2026', label: 'YouTube thumbnail size guide' },
      { href: '/blog/youtube-shorts-safe-zone-dimensions', label: 'Shorts safe zone and 9:16 sizes' },
      { href: '/guides/youtube-seo', label: 'YouTube SEO Hub' },
    ],
  },
};
