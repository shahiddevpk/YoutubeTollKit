import { GuideHub } from '@/types/guides';

export const GUIDE_HUBS: GuideHub[] = [
  {
    slug: 'youtube-monetization',
    title: 'YouTube Monetization Hub',
    metaTitle: 'YouTube Monetization Hub — YPP, RPM & Free Checkers',
    metaDescription:
      'Pillar guide to YouTube Partner Program eligibility, unofficial public checks, owner verification, RPM basics, and free monetization tools — no downloaders.',
    primaryKeyword: 'youtube monetization',
    updatedAt: '2026-10-06',
    intro:
      'This hub collects everything on YouTubeFreeToolkit about earning on YouTube responsibly: Partner Program thresholds, how public monetization checks differ from official Studio status, and calculators that use your own assumptions. We do not guarantee approval, infer private AdSense data for other creators, or promote video downloaders.',
    sections: [
      {
        id: 'ypp-basics',
        heading: 'YouTube Partner Program basics',
        paragraphs: [
          'The YouTube Partner Program (YPP) is the main path to ad revenue sharing, YouTube Premium splits, and many fan-funding products. Eligibility combines subscriber and watch-time or Shorts view thresholds with policy compliance, an AdSense account, and human review.',
          'Thresholds change over time. Our blog post on 2026 requirements walks through the 1,000-subscriber tier, 4,000 public watch hours versus 10 million Shorts views, and the smaller 500-subscriber fan-funding tier. Treat any checklist as orientation, then confirm inside YouTube Studio.',
        ],
      },
      {
        id: 'public-vs-owner',
        heading: 'Public signals vs owner verification',
        paragraphs: [
          'For channels you do not own, the YouTube Data API exposes public statistics such as subscribers and video counts. Those numbers help you see eligibility-style signals but do not prove YPP enrollment. Ads playing on a video are also unreliable because YouTube may monetize platform inventory without paying the uploader.',
          'If you own the channel, optional read-only Google OAuth on our monetization checker can test whether YouTube Analytics grants monetary-metric access for the connected account. That is stronger than guessing from page markup, yet it still is not a substitute for reading official messages in Studio and AdSense.',
        ],
      },
      {
        id: 'inferred-report',
        heading: 'Understanding the inferred monetization report',
        paragraphs: [
          'After a public lookup, the monetization checker shows an inferred likelihood tier, illustrative daily/monthly/yearly revenue scenarios, and key insights such as channel age and average views per video. Each block is tagged as non-official because YouTube does not publish another creator’s YPP or AdSense enrollment through public APIs.',
          'Revenue rows use simple math: estimated daily views from lifetime views divided by channel age, multiplied by example RPM values. Treat them as brainstorming numbers for sponsors or goals — then validate with YouTube Studio exports on channels you control.',
          'Other monetization checkers may display a bold “Channel monetized” label from similar public proxies. We prefer explicit “inferred” wording so brands, educators, and creators do not mistake an estimate for Studio confirmation.',
        ],
      },
      {
        id: 'rpm-planning',
        heading: 'RPM, CPM, and planning calculators',
        paragraphs: [
          'CPM reflects advertiser bids per thousand impressions. RPM reflects what creators earn per thousand views after YouTube’s share and mixed revenue types. Use calculators to model scenarios, then reconcile with YouTube Analytics after monetization.',
          'Finance, tech, and education niches often show higher RPM ranges than broad entertainment, but geography, seasonality, and audience device mix matter more than generic benchmarks.',
        ],
      },
      {
        id: 'policy-traps',
        heading: 'Common monetization mistakes to avoid',
        paragraphs: [
          'Reused content, misleading metadata, and copyright strikes can delay or remove YPP access even when public subscriber counts look healthy. Public tools cannot see strikes or reused-content reviews — only your Studio account can.',
          'Never promise viewers that a third-party “monetization checker” proves another channel’s AdSense status. Responsible research sticks to public eligibility-style signals and cites official YouTube help articles for thresholds.',
        ],
      },
      {
        id: 'brands-and-verify',
        heading: 'Brands, rejections, and owner verification',
        paragraphs: [
          'Sponsors should treat inferred checker output as a first filter, then request Studio or Analytics proof from creators they intend to pay. The monetization checker tool page explains sponsor workflows and OAuth owner verification in detail.',
          'Creators denied YPP despite strong public counts should fix policy and originality issues in Studio before reapplying — subscriber milestones alone do not pass review.',
        ],
      },
      {
        id: 'hub-workflow',
        heading: 'Suggested workflow on this site',
        paragraphs: [
          'Start with the Partner Program requirements article, run public checks on your channel handle, optionally verify owner Analytics access, then model RPM scenarios with calculators using numbers from your own Studio exports.',
          'Revisit the hub quarterly when YouTube updates thresholds or when you expand into Shorts-heavy publishing, because watch-hour and Shorts view paths use different eligibility mechanics.',
        ],
      },
      {
        id: 'official-sources',
        heading: 'Official sources and record keeping',
        paragraphs: [
          'Bookmark YouTube Help articles for Partner Program thresholds, AdSense linking, and copyright strikes. Screenshot your Studio Earn tab when you apply or when policy messages change so you have timestamps if support asks for context.',
          'Keep music licenses, contract releases, and project files organized before you scale upload volume. Reused-content reviews often ask whether you own or licensed the footage you publish, and third-party monetization tools cannot see that paperwork for you.',
          'When you discuss earnings publicly, separate illustrative calculator output from verified AdSense deposits. Transparency protects your reputation with sponsors and viewers alike.',
        ],
      },
    ],
    toolSlugs: ['monetization-checker', 'earnings-calculator', 'rpm-calculator'],
    blogSlugs: [
      'youtube-partner-program-requirements-2026',
      'how-to-check-if-youtube-channel-is-monetized',
      'youtube-monetization-checker-inferred-vs-official',
      'why-youtube-shows-ads-on-non-monetized-channels',
      'youtube-shorts-monetization-requirements-2026',
      'how-brands-verify-youtube-creator-monetization',
      'youtube-monetization-rejection-reasons-and-fixes',
      'estimated-youtube-channel-revenue-from-public-views',
      'youtube-500-subscriber-monetization-tier',
      'verify-youtube-monetization-with-google-oauth',
      'youtube-earnings-calculator-explained',
      'what-is-youtube-rpm',
    ],
    faqs: [
      {
        question: 'Can this site tell me if another channel is monetized?',
        answer:
          'We show inferred likelihood and public eligibility signals, not official YPP enrollment. YouTube does not publish another creator’s private Partner Program status through public APIs.',
      },
      {
        question: 'How is our checker different from other monetization tools?',
        answer:
          'We label every third-party result as inferred, publish our data sources (YouTube Data API v3 only), and offer optional owner verification through official YouTube Analytics monetary access for channels you manage.',
      },
      {
        question: 'Are earnings calculator results guaranteed?',
        answer: 'No. Calculators are educational models using assumptions you control. Actual payouts depend on monetization status and live ad performance.',
      },
      {
        question: 'Do you offer ways to download videos for monetization research?',
        answer: 'No. We only use public metadata and official APIs within their terms.',
      },
    ],
  },
  {
    slug: 'youtube-seo',
    title: 'YouTube SEO Hub',
    metaTitle: 'YouTube SEO Hub — Metadata, Tags & Free Audit Tools',
    metaDescription:
      'Pillar guide to YouTube SEO in 2026: titles, descriptions, tags, chapters, and free checklist tools — focused on helpful metadata, not spam.',
    primaryKeyword: 'youtube seo',
    updatedAt: '2026-10-06',
    intro:
      'YouTube SEO starts with clarity: help viewers and systems understand what a video delivers. Titles and thumbnails drive clicks; retention drives distribution; metadata helps match the right audience. This hub links our free auditors and long-form guides without encouraging keyword stuffing or scraped tag lists. Work through the checklist article, run audits on drafts before upload, and revisit metadata only after you have enough impressions in Studio to judge click-through rate. Shorts and long-form videos share principles but not identical packaging rules — adjust hooks and chapter depth accordingly.',
    sections: [
      {
        id: 'metadata-stack',
        heading: 'The metadata stack',
        paragraphs: [
          'Titles should front-load the primary topic within the first 40–50 characters when possible so mobile feeds do not truncate the promise. Descriptions need a strong hook above the “Show more” fold, then supporting copy, chapters, and links.',
          'Tags are a supporting signal for synonyms and misspellings. Extract public tags only for research, then rewrite them for your own video rather than copying competitors verbatim.',
        ],
      },
      {
        id: 'chapters-thumbnails',
        heading: 'Chapters, thumbnails, and CTR',
        paragraphs: [
          'Chapters that start at 00:00 with at least three segments can qualify for key moments in search when YouTube supports them for your video. Validate formatting before publish.',
          'Thumbnails should stay readable on small screens. Keep text away from the bottom-right duration badge and preview layouts in light and dark themes when possible.',
        ],
      },
      {
        id: 'workflow',
        heading: 'A practical publishing workflow',
        paragraphs: [
          'Research intent, draft title and description, run an SEO score check, validate chapters, preview the thumbnail, then walk through an upload checklist. Revisit metadata after you see click-through rate and retention data in Studio.',
          'SEO tools cannot fix weak storytelling. Use scores to remove friction, not to automate uploads.',
        ],
      },
      {
        id: 'shorts-vs-long',
        heading: 'Shorts versus long-form metadata',
        paragraphs: [
          'Shorts discovery leans on hooks, pacing, and retention in the first seconds. Tags and descriptions still matter for context, but packaging and payoff dominate. Long-form videos benefit more from chapters, detailed descriptions, and sustained keyword clarity.',
          'When you repurpose clips, write Shorts-specific titles instead of copying long-form headlines that truncate awkwardly in vertical feeds.',
        ],
      },
      {
        id: 'measurement',
        heading: 'Measuring whether SEO changes worked',
        paragraphs: [
          'Wait at least one to two weeks after a meaningful metadata change before judging results, unless you are fixing a clear error such as a misleading title. Compare click-through rate, average view duration, and traffic sources in Studio.',
          'If CTR improves but retention drops, the new packaging may be over-promising. Iterate on honesty and clarity before adding more keywords.',
        ],
      },
      {
        id: 'content-quality',
        heading: 'Content quality beyond metadata',
        paragraphs: [
          'Metadata helps YouTube test the right audience, but retention and satisfaction decide whether distribution grows. Invest in clear audio, readable structure, and deliverables that match the title promise before you chase perfect tag character counts.',
          'Build series and playlists so returning viewers recognize your format. Internal links in descriptions and end screens guide people to the next logical video, which lifts session watch time more than stuffing unrelated keywords.',
          'When you localize videos, adapt titles and descriptions for each language instead of machine-translating English metadata alone. Unique localized copy avoids duplicate-signal confusion and reads more naturally to regional audiences.',
        ],
      },
    ],
    toolSlugs: [
      'seo-score-checker',
      'tag-extractor',
      'title-description-analyzer',
      'timestamp-validator',
      'thumbnail-preview',
      'upload-checklist',
    ],
    blogSlugs: [
      'youtube-seo-checklist-for-creators',
      'how-to-extract-youtube-video-tags',
      'youtube-title-length-best-practices',
    ],
    faqs: [
      {
        question: 'What matters most for ranking in 2026?',
        answer:
          'Click-through rate and viewer retention remain primary after initial impressions. Metadata helps YouTube test the right audience.',
      },
      {
        question: 'How many tags should I use?',
        answer: 'A focused set of relevant tags beats maxing the limit. Many creators use roughly 5–12 precise tags.',
      },
    ],
  },
  {
    slug: 'youtube-troubleshooting',
    title: 'YouTube Troubleshooting Hub',
    metaTitle: 'YouTube Troubleshooting Hub — Public Data & Policy-Safe Research',
    metaDescription:
      'Fix common creator research mistakes: channel IDs, subscriber counters, competitor benchmarks, and ToS-safe analysis — without downloaders or bypass tools.',
    primaryKeyword: 'youtube channel troubleshooting',
    updatedAt: '2026-10-06',
    intro:
      'Creators often hit the same walls: wrong channel identifiers, rounded subscriber counts, confusing monetization signals, or competitor research that crosses YouTube’s lines. This hub explains what public tools can and cannot do, and points to policy-safe utilities on this site. When something fails, verify identifiers first, then API freshness, then whether the video or channel is still public. Escalate to official YouTube support for account-level issues — third-party tools cannot reset strikes or force monetization reviews.',
    sections: [
      {
        id: 'identifiers',
        heading: 'Handles, URLs, and channel IDs',
        paragraphs: [
          '@Handles and custom URLs are for humans; the 24-character UC channel ID is for APIs, RSS, and automations. Handles can change, which breaks hard-coded bots if you skip the UC ID.',
          'Use the channel ID finder when integrating Discord bots, analytics pipelines, or feed readers. Always test with a fresh public video URL if a handle redirect fails.',
        ],
      },
      {
        id: 'public-stats',
        heading: 'Public stats and live counters',
        paragraphs: [
          'Live subscriber counters read public totals that YouTube may round on large channels. Refresh before milestone streams and disclose that overlays use public data, not private Studio dashboards.',
          'Comparing channels side by side is fine for motivation when you stick to public fields. Do not present rounded numbers as contractual proof.',
        ],
      },
      {
        id: 'policy-safe-research',
        heading: 'Policy-safe competitor research',
        paragraphs: [
          'Benchmark peers with public APIs, tag extractors on public videos, and SEO audits on your own drafts. Avoid bulk scraping, downloaders, comment spam, or impersonation.',
          'If a tactic requires bypassing access controls, it is out of scope for this toolkit and likely violates YouTube Terms.',
        ],
      },
      {
        id: 'data-hygiene',
        heading: 'Keeping research data accurate',
        paragraphs: [
          'Cache public stats with timestamps in your notes so you know when a comparison snapshot was taken. Viral videos can skew weekly benchmarks if you treat one outlier as the new normal.',
          'When automations fail, resolve the channel UC ID again, confirm the handle still maps to the same channel, and test with a fresh public upload URL.',
        ],
      },
      {
        id: 'creator-communication',
        heading: 'Communicating stats to your audience',
        paragraphs: [
          'On-stream milestone graphics should disclose that overlays use public counts, which may round or lag Studio. Transparency builds trust when numbers differ slightly from what viewers see on the channel page.',
          'Do not use public research tools to shame other creators. Competitive analysis belongs in private strategy docs, not call-out videos.',
        ],
      },
      {
        id: 'escalation',
        heading: 'When to escalate to YouTube Support',
        paragraphs: [
          'Use official support channels for account recovery, incorrect strikes, monetization appeals, and copyright disputes. Public lookup tools cannot reset passwords, remove penalties, or speed up human YPP reviews.',
          'Before you file a ticket, collect channel ID, video URLs, screenshots from Studio, and timestamps of when the issue started. Clear reproduction steps reduce back-and-forth with support agents.',
          'If an integration breaks after YouTube changes an API field, update your automations to use documented endpoints rather than undocumented page scraping that may violate Terms of Service.',
          'Keep a short internal runbook that lists which tools on this site you use for IDs, counters, and comparisons so new team members do not improvise risky workflows under deadline pressure.',
        ],
      },
    ],
    toolSlugs: ['channel-id-finder', 'live-subscriber-counter', 'channel-compare', 'monetization-checker'],
    blogSlugs: [
      'youtube-channel-id-vs-handle-guide',
      'live-youtube-subscriber-count-guide',
      'youtube-competitor-analysis-without-violating-tos',
    ],
    faqs: [
      {
        question: 'Why does my subscriber count differ between tools and Studio?',
        answer:
          'Public API values can lag slightly or display rounded figures. Use Studio for official reporting.',
      },
      {
        question: 'Can I automate scraping competitor channels?',
        answer:
          'Aggressive scraping that ignores API quotas or Terms is risky. Use rate-limited official APIs and store only what policies allow.',
      },
    ],
  },
];

export function getGuideBySlug(slug: string): GuideHub | undefined {
  return GUIDE_HUBS.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return GUIDE_HUBS.map((g) => g.slug);
}
