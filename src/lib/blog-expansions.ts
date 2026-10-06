import { BlogPost } from '@/types/blog';

type BlogExpansion = Partial<Pick<BlogPost, 'content' | 'readTime' | 'tableOfContents' | 'faqs'>>;

/** Expanded bodies for posts under ~800 words (target 800–1,200). */
export const BLOG_EXPANSIONS: Record<string, BlogExpansion> = {
  'how-to-extract-youtube-video-tags': {
    readTime: '9 min read',
    content: `
## 1. What YouTube Tags Still Do in 2026

Tags are a **secondary** metadata signal. Titles, thumbnails, and viewer satisfaction drive most distribution, but tags still help YouTube understand synonyms, alternate spellings, and product model numbers that might not fit naturally in a title.

Tags do **not** override misleading titles. If your video promises something the content does not deliver, metadata tweaks will not save performance.

---

## 2. What You Can (and Cannot) See Publicly

Legitimate tag research only uses **public** videos. Tools read tags the uploader placed in YouTube Studio metadata. If a creator left the tag field empty, there is nothing ethical to extract.

You should not:

- Scrape private, unlisted, or members-only videos
- Hammer endpoints beyond API quotas
- Republish entire competitor tag lists without adding original analysis

---

## 3. Ethical Competitor Tag Research Workflow

1. Pick 3–5 top-ranking videos for a single search query you are targeting.
2. Note how each title frames the promise and which chapters they use.
3. Extract public tags with our [Tag Extractor](/tools/tag-extractor).
4. Cluster tags into themes: **core keyword**, **supporting phrases**, **brand/product names**, **common misspellings**.
5. Draft your own tag set (usually 5–12 focused tags) that matches **your** footage and angle.
6. Run a metadata audit in the [SEO Score Checker](/tools/seo-score-checker) before publish.

Document your findings in a brief content brief so future uploads stay consistent.

---

## 4. How to Extract Tags in 3 Steps

1. Copy a public video or Shorts URL.
2. Paste it into the [YouTube Tag Extractor](/tools/tag-extractor).
3. Review character totals (YouTube allows up to 500 characters combined) and copy formatted tags into Studio.

Remove irrelevant tags before saving. Tag stuffing with unrelated trending terms can hurt relevance signals.

---

## 5. Turning Tags Into Better Titles and Descriptions

Tags are a research input, not the finished SEO strategy. Translate repeated competitor themes into:

- A clearer title hook in the first 40 characters
- A description opening line that states the outcome
- Chapters that match real sections in your edit

Pair tag research with the [Title & Description Analyzer](/tools/title-description-analyzer) to catch mobile truncation issues early.

---

## 6. Measuring Whether Tag Changes Helped

After publishing, watch **click-through rate**, **average view duration**, and **traffic sources** in YouTube Studio for two weeks before making another metadata overhaul. Small tag edits rarely move metrics alone; retention and topic fit matter more.
`,
    faqs: [
      {
        question: 'Can I see tags on every YouTube video?',
        answer:
          'Only when the creator added public tags in metadata. Empty tag fields return zero results — that is normal.',
      },
      {
        question: 'Is copying a competitor tag list enough to rank?',
        answer:
          'No. Tags help context; they do not replace original value, watch time, or click-worthy packaging.',
      },
      {
        question: 'Do Shorts use the same tag strategy as long-form?',
        answer:
          'Shorts discovery leans on hooks and retention, but relevant tags can still clarify niche topics in Shorts feeds.',
      },
    ],
  },
  'youtube-earnings-calculator-explained': {
    readTime: '10 min read',
    content: `
## 1. RPM vs CPM — Plain Language

**CPM (cost per mille)** is what advertisers typically pay per thousand ad impressions before platform fees. **RPM (revenue per mille)** is what creators earn per thousand **views** after YouTube’s revenue share and non-monetized views are considered.

RPM is the number creators feel in AdSense; CPM is a useful advertiser-side benchmark when discussing brand deals.

---

## 2. The 55/45 Split (and What It Leaves Out)

YouTube’s standard ad revenue split gives creators roughly **55%** of net ad revenue on many monetized long-form views, with YouTube retaining the remainder. Shorts, Premium, memberships, and Super Thanks follow different accounting rules.

Calculators on this site apply **illustrative** RPM ranges by niche. They cannot know your real fill rate, audience country mix, or brand safety settings.

---

## 3. Variables That Change Payouts Week to Week

- **Geography:** US, UK, and Canada traffic often earns higher RPM than many emerging markets.
- **Seasonality:** Q4 advertiser spend frequently lifts RPM; January can dip.
- **Video length and mid-rolls:** Longer videos with thoughtful ad breaks can earn more per view when monetization is enabled.
- **Shorts vs long-form:** Shorts RPM is often lower per view than long-form, but volume can compensate.
- **Ad blockers and limited monetization:** Some views simply do not serve ads.

---

## 4. Using the Earnings Calculator Responsibly

1. Open the [YouTube Earnings Calculator](/tools/earnings-calculator).
2. Enter realistic daily or monthly view assumptions based on your last 90 days in Studio — not your best-ever viral day unless you label it a scenario.
3. Pick a niche preset or custom RPM.
4. Read outputs as **ranges**, not promises.

Validate with YouTube Analytics → Revenue once you are in YPP.

---

## 5. Combining Ad Revenue With Other Income

Many channels blend AdSense with sponsorships, affiliates, products, and services. Track RPM to understand **platform** earnings, but build a business model that does not depend on a single CPM spike.

Use the [RPM Calculator](/tools/rpm-calculator) when you have real revenue and view totals for a month.

---

## 6. Common Mistakes When Forecasting

- Treating one viral video as the new baseline forever
- Ignoring YouTube’s cut and calling CPM “take-home pay”
- Forgetting that not every view serves an ad
- Comparing your RPM to a creator in a different niche and country mix

Document assumptions in a spreadsheet so you can revisit forecasts quarterly.
`,
    faqs: [
      {
        question: 'Are calculator results guaranteed income?',
        answer: 'No. They are educational estimates using assumptions you control.',
      },
      {
        question: 'Should I use CPM or RPM for sponsorship pricing?',
        answer:
          'Sponsors often think in CPM for impressions, while creators should plan cash flow with RPM and diversified income.',
      },
    ],
  },
  'what-is-youtube-rpm': {
    readTime: '9 min read',
    content: `
## 1. RPM Definition

**RPM** means revenue per mille (per thousand views). YouTube Studio reports RPM by dividing estimated revenue by views, then multiplying by 1,000. It blends ad types and other monetization features where applicable.

RPM answers: “How much did I earn per thousand views **this month**?”

---

## 2. RPM Formula With Examples

**RPM = (Estimated revenue ÷ Total views) × 1,000**

Example A: $420 revenue on 280,000 views → RPM ≈ **$1.50**  
Example B: $3,200 revenue on 400,000 views → RPM ≈ **$8.00**

Use the [YouTube RPM Calculator](/tools/rpm-calculator) to avoid manual errors when comparing months.

---

## 3. RPM vs CPM — Why They Diverge

CPM looks at ad impressions; RPM looks at **all views**, including those without ads. A video with many non-monetized views (age restrictions, limited ads, or audience geography) can show a high CPM in ad tools but a lower RPM overall.

---

## 4. What Influences RPM Benchmarks

Finance, software, and B2B topics often show higher RPM than broad entertainment, but your **audience location** and **watch time from monetized countries** matter more than niche stereotypes.

Upload consistency helps RPM indirectly by training the algorithm to send qualified viewers, but RPM still moves with advertiser demand.

---

## 5. How to Improve RPM Without Tricks

- Publish videos long enough for thoughtful ad placement where policy allows
- Grow watch time in countries with strong advertiser demand
- Reduce clickbait that causes early drop-off (hurts future ad opportunities)
- Expand monetization products you genuinely use (memberships, Super Thanks) instead of chasing forbidden tactics

---

## 6. Using RPM in Planning Meetings

Share RPM trends with editors and sponsors to set realistic goals. If RPM rises while views flatline, ad efficiency improved. If views rise but RPM falls, check geography shifts or Shorts mix.

Pair RPM tracking with the [Earnings Calculator](/tools/earnings-calculator) for forward-looking scenarios.
`,
    faqs: [
      {
        question: 'Why is my RPM different from another creator in the same niche?',
        answer: 'Audience geography, ad types, upload mix, and percentage of monetized views all change RPM.',
      },
      {
        question: 'Does YouTube Studio show gross or net RPM?',
        answer: 'Studio RPM reflects creator earnings estimates, not gross advertiser bids.',
      },
    ],
  },
  'live-youtube-subscriber-count-guide': {
    readTime: '9 min read',
    content: `
## 1. Where the Numbers Come From

Public subscriber counters — including our [Live Subscriber Counter](/tools/live-subscriber-counter) — read channel statistics exposed through the YouTube Data API. They are ideal for milestone overlays, quick checks, and motivation, not for legal contracts.

Private analytics inside YouTube Studio may update moments earlier than public fields.

---

## 2. Rounding Rules You Should Expect

YouTube rounds public subscriber counts on many large channels (for example displaying 1.25M instead of an exact integer). API responses follow platform rounding policies that can change.

If you announce a milestone on stream, refresh the counter and keep a Studio screenshot for your records.

---

## 3. Cache Windows and Refresh Strategy

API-based tools cache responses to protect quotas. You might see a short delay after a viral video spikes subscribers. For live celebrations:

1. Refresh thirty seconds before the on-air segment
2. State that the overlay uses **public** data
3. Keep Studio open off-screen if you need precise accounting

---

## 4. Milestone Streams and OBS Overlays

Use high-contrast typography and avoid covering safe zones on vertical layouts. Test readability at 720p output because many viewers watch on phones.

Disclose that third-party counters are unofficial displays, especially if sponsors tie bonuses to subscriber totals.

---

## 5. Comparing Channels Fairly

Counters show point-in-time public totals. They do not show revenue, watch time, or audience demographics. Pair subscriber checks with [Channel Compare](/tools/channel-compare) for context, not rivalry harassment.

---

## 6. Policy-Safe Usage

Do not automate bulk polling that violates API terms. Do not use counters to scrape private data or intimidate other creators.
`,
    faqs: [
      {
        question: 'Is this the same number as YouTube Studio?',
        answer: 'It should be close for public totals, but Studio may update slightly earlier.',
      },
      {
        question: 'Can I embed the counter in OBS?',
        answer: 'Yes for layout tests; use browser sources responsibly and credit that numbers are public API stats.',
      },
    ],
  },
  'youtube-title-length-best-practices': {
    readTime: '10 min read',
    content: `
## 1. Recommended Title Length

Aim for **50–70 characters** for most videos. Shorter titles often win on mobile; longer titles can work for tutorial queries if the first clause contains the keyword.

Place the primary topic in the **first 40 characters** when possible.

---

## 2. Mobile Truncation Reality

YouTube mobile feeds truncate long titles with ellipses. Viewers may never see your clever suffix if the hook is buried at the end.

Patterns that work:

- **Outcome + qualifier:** “Fix YouTube Audio Sync in OBS (2026)”
- **Problem → solution:** “Shorts Safe Zones: Keep Text Visible”

Patterns that struggle:

- Brand-first titles with no keyword in the visible slice
- ALL CAPS stacks of emoji

---

## 3. SEO vs CTR — Serving Two Goals

Search-heavy videos need literal keywords early. Browse-heavy videos can prioritize curiosity, but clarity still matters for the algorithm to test the right audience.

Use Studio A/B title tests when available, and change one variable at a time.

---

## 4. Description Synergy

Titles and descriptions should tell a coherent story. Repeat keywords naturally in the first two description lines, then expand with chapters and links.

Use the [Title & Description Analyzer](/tools/title-description-analyzer) before scheduling.

---

## 5. Accessibility and Honesty

Write titles people can parse quickly with screen readers. Avoid misleading promises that hurt retention when viewers feel baited.

---

## 6. Checklist Before You Publish

- Primary keyword in the first 40 characters
- Under ~70 characters unless query demands more
- No critical info after character 55 on mobile-first videos
- Description hook matches the title promise
- Thumbnail text does not repeat the entire title verbatim
`,
    faqs: [
      {
        question: 'Do emojis hurt YouTube SEO?',
        answer: 'They are not a direct penalty, but clutter reduces clarity. Use at most one purposeful emoji.',
      },
      {
        question: 'Should I include episode numbers?',
        answer: 'Yes for series if the number appears early enough to stay visible on mobile.',
      },
    ],
  },
  'youtube-shorts-safe-zone-dimensions': {
    readTime: '9 min read',
    content: `
## 1. Canvas Size and Export Settings

Export Shorts at **1080×1920 pixels** with a **9:16** aspect ratio. Higher source resolution helps quality, but delivery is typically 1080p vertical.

Keep important faces and text inside the center band so UI chrome does not cover them.

---

## 2. Where UI Elements Sit

YouTube places like, comment, share, and audio information along the right and bottom edges. Captions you burn into the video may collide with these zones on some devices.

Treat safe-zone guides as **templates**, not legal guarantees — app padding can shift after redesigns.

---

## 3. Planning Text and Logos

Place hooks in the upper-middle third. Put calls to action above the bottom caption stack. Avoid tiny type that fails on 5-inch screens.

---

## 4. Using the Free Overlay Tool

Upload a still frame to the [Shorts Safe Zone Checker](/tools/shorts-safe-zone) or save the transparent PNG overlay for your editor. This downloads a **design file**, not a YouTube video.

Re-check after major YouTube app updates.

---

## 5. Editing Workflow Tips

- Edit in 9:16 sequences, not cropped horizontal footage, when possible
- Leave breathing room for auto-captions if you rely on them
- Preview on a physical phone before mass posting

---

## 6. Performance Notes

Safe zones protect comprehension; they do not replace strong hooks. Retention in the first two seconds still drives Shorts distribution.
`,
    faqs: [
      {
        question: 'Do safe zones change when YouTube updates the app?',
        answer: 'Padding can shift slightly. Re-test important campaigns after major redesigns.',
      },
      {
        question: 'Is 4K vertical necessary?',
        answer: '1080×1920 is the standard deliverable; higher sources may downscale fine but increase edit cost.',
      },
    ],
  },
  'youtube-competitor-analysis-without-violating-tos': {
    readTime: '11 min read',
    content: `
## 1. What Research Is Allowed

Policy-safe competitor research uses **public** videos and channels, official APIs within quotas, and your own YouTube Studio analytics. It does not use downloaders, private viewers, comment spam, or impersonation.

The goal is learning positioning, packaging, and topic gaps — not copying videos wholesale.

---

## 2. A Simple Weekly Competitor Workflow

1. Choose three peer channels with similar audience size.
2. Compare public subscribers, views, and upload counts in [Channel Compare](/tools/channel-compare).
3. Extract tags from their top public videos with [Tag Extractor](/tools/tag-extractor).
4. Audit **your** next upload with [SEO Score Checker](/tools/seo-score-checker).
5. Log takeaways in a one-page brief: hook, length, chapters, thumbnail style.

Repeat weekly instead of binge-scraping thousands of URLs.

---

## 3. Metrics That Matter vs Vanity Metrics

Subscriber totals alone do not show revenue or retention. Watch how often peers publish, which topics spike views, and how they structure chapters.

Avoid harassing creators or publishing “exposed” content — focus on your pipeline.

---

## 4. Tool Stack on YouTubeFreeToolkit

- [Channel ID Finder](/tools/channel-id-finder) for stable API identifiers
- [Live Subscriber Counter](/tools/live-subscriber-counter) for milestone context
- [Upload Checklist](/tools/upload-checklist) before you ship response videos

---

## 5. Automation Boundaries

Scripts that hammer undocumented endpoints or bypass rate limits risk API bans and ToS strikes. If an automation cannot cite an official API scope, do not run it.

---

## 6. Turning Research Into Original Videos

Use competitor insights to choose **angles** your channel can authentically cover: deeper tutorials, contrarian expertise, or better packaging for underserved keywords.

Cite statistics responsibly and link to sources in descriptions when quoting external data.
`,
    faqs: [
      {
        question: 'Can I automate competitor scraping?',
        answer:
          'Bulk scraping outside API rules is risky. Use rate-limited official access and store only permitted fields.',
      },
      {
        question: 'Is it okay to reuse a competitor title word-for-word?',
        answer: 'Legally gray and strategically weak. Write distinct titles that reflect your unique footage and expertise.',
      },
    ],
  },
  'youtube-channel-id-vs-handle-guide': {
    readTime: '10 min read',
    content: `
## 1. The 3 Types of YouTube Identifiers

### A. The Canonical Channel ID (\`UC...\`)
- **Format:** 24 characters starting with \`UC\`
- **Permanence:** Immutable for the life of the channel
- **Use case:** APIs, RSS, webhooks, databases

### B. The YouTube Handle (\`@username\`)
- **Format:** \`@handle\`
- **Permanence:** Can change (limited frequency in Studio)
- **Use case:** Branding, mentions, search

### C. Legacy Custom URLs (\`/c/name\` or \`/user/name\`)
- **Status:** Often redirect to handles but may linger on older links

---

## 2. Why Developers Require the UC ID

Software integrations break when handles change. The Data API expects stable resource IDs. RSS readers use \`channel_id=\` parameters.

If you hard-code a handle in a bot, schedule quarterly checks or store the UC ID instead.

---

## 3. How to Find Any Channel ID

**Option A — Free tool:** Paste a handle or URL into the [Channel ID Finder](/tools/channel-id-finder).

**Option B — YouTube Studio (your channel):** Settings → Channel → Advanced settings.

**Option C — Public video URL:** Resolve the uploader’s channel from a video link when handles are ambiguous.

---

## 4. Creating YouTube RSS Feeds

Append your UC ID:

\`https://www.youtube.com/feeds/videos.xml?channel_id=UCxxxxxxxx\`

Use feeds for personal readers, Discord bots, or internal dashboards — respect poll frequency and YouTube’s terms.

---

## 5. Migration Checklist When Handles Change

1. Resolve the new handle to confirm the UC ID stayed the same
2. Update marketing links, not API identifiers
3. Test automations with a fresh public video upload

---

## 6. Common Mistakes

- Confusing **user IDs** with **channel IDs** on brand accounts
- Storing `/c/` URLs that redirect differently per region
- Assuming vanity URLs are permanent API keys
`,
    faqs: [
      {
        question: 'Does my Channel ID change if I change my handle?',
        answer: 'No. The UC ID is permanent even when branding changes.',
      },
      {
        question: 'How do I generate an RSS feed for a YouTube channel?',
        answer: 'Use https://www.youtube.com/feeds/videos.xml?channel_id=YOUR_UC_ID',
      },
      {
        question: 'Can I look up IDs for competitors?',
        answer: 'Yes for public channels using legitimate tools; do not use data to harass or spam.',
      },
    ],
  },
};
