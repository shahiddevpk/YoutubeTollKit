export interface GuideSection {
  heading: string;
  paragraphs: string[];
}

export interface ToolGuide {
  sections: GuideSection[];
}

const DEFAULT_TRUST: GuideSection = {
  heading: 'Transparency and acceptable use',
  paragraphs: [
    'YouTubeFreeToolkit is not affiliated with Google or YouTube. We do not offer video or audio downloaders, private-video viewers, or tools that bypass YouTube access controls.',
    'Results are based on public metadata, your inputs, or optional read-only Google permissions you choose to grant. Review our Policy Compliance page before relying on any output for business decisions.',
  ],
};

const GUIDES: Record<string, ToolGuide> = {
  'monetization-checker': {
    sections: [
      {
        heading: 'What this monetization checker does',
        paragraphs: [
          'YouTubeFreeToolkit’s monetization checker loads public channel statistics from the official YouTube Data API v3 — subscribers, lifetime views, video counts, and channel age — then builds an inferred monetization report with illustrative revenue ranges. Every inferred result is labeled “Inferred · Not official YPP status” because YouTube does not publish Partner Program enrollment for arbitrary channels.',
          'If you own the channel, you can optionally connect Google with read-only YouTube and YouTube Analytics monetary scopes. That owner verification tests whether your account can access official monetary metrics for the channel you checked. It is the strongest check this site offers, but final status always appears in YouTube Studio and AdSense.',
        ],
      },
      {
        heading: 'Inferred results vs official status',
        paragraphs: [
          'Visitors researching someone else’s channel see public eligibility-style signals, an inferred likelihood tier, and a planning-only revenue matrix. Those outputs are educational models — not proof of AdSense or YPP enrollment.',
          'Channel owners who complete verification see a yes/no style result based on YouTube Analytics monetary-metric access for the Google account they sign in with. Wrong account, cancelled OAuth, or channels still in review may return errors or mismatches — always confirm inside Studio.',
          'YouTube Studio remains the only place with definitive messaging about your own monetization application, limited ads, and policy holds. No third-party checker replaces that.',
        ],
      },
      {
        heading: 'How to check any public channel (four steps)',
        paragraphs: [
          'Copy a public channel URL, @handle, UC channel ID, or a link to any public video on that channel.',
          'Paste it into the search box at the top of this page and click Check Monetization.',
          'Review the inferred report: status headline, revenue matrix assumptions, key insights, and subscriber-based YPP threshold signals. Read the disclaimer before sharing screenshots with clients or sponsors.',
          'If you manage that channel, scroll to Channel owners only and use Verify Exact Monetization Status with the Google account linked to the channel. Skip verification if you are only researching another creator.',
        ],
      },
      {
        heading: 'What appears in your report',
        paragraphs: [
          'Channel profile: title, handle, avatar, and channel ID for your notes.',
          'Core stats: subscribers, lifetime views, public video count, join date, channel age, and average views per video.',
          'Inferred monetization block: likelihood tier (for example likely, possible, or below thresholds), plus low/mid/high RPM revenue scenarios calculated from estimated daily views (lifetime views divided by channel age in days).',
          'YPP subscriber signals: whether public counts meet unofficial 500- and 1,000-subscriber thresholds used in many eligibility discussions — watch hours, Shorts views, and policy review are not available publicly.',
          'Owner verification card: hidden or pending for visitors; shows official Analytics-based results only when the signed-in account owns the checked channel.',
        ],
      },
      {
        heading: 'Why seeing ads does not prove monetization',
        paragraphs: [
          'Viewers often assume pre-roll or banner ads mean the creator earns money. Under YouTube’s Right to Monetize policy, the platform may run ads on content when the uploader is not in the YouTube Partner Program — in those cases revenue may go to YouTube rather than the channel owner.',
          'Our checker does not inspect ad slots on the watch page and does not treat “ads visible” as a monetization signal. Rely on inferred public stats for third-party research and on Studio or owner verification for your own channel.',
        ],
      },
      {
        heading: 'YouTube Partner Program thresholds (summary)',
        paragraphs: [
          'Full ad-revenue eligibility in eligible regions commonly discusses 1,000 subscribers plus qualifying public watch hours or Shorts views, along with policy compliance, AdSense linking, and human review. A separate expanded tier near 500 subscribers can unlock some fan-funding products without full ad sharing.',
          'Public subscriber counts on this page are only one slice of that story. Watch hours, Shorts view totals, strikes, and reused-content reviews live in YouTube Studio — not in the public Data API. Read our Partner Program requirements article on the blog for a fuller 2026 checklist.',
        ],
      },
      {
        heading: 'Shorts vs long-form monetization',
        paragraphs: [
          'Shorts revenue uses pooled feed economics and different RPM patterns than long-form ad placements. A channel that looks “large” on subscribers may still earn differently on Shorts versus eight-minute videos with mid-rolls.',
          'This checker does not split Shorts versus long-form revenue. Use YouTube Studio analytics after monetization for format-specific RPM, and treat any public revenue matrix here as a blended planning scenario only. For Shorts-specific YPP thresholds, read our blog guide on Shorts monetization requirements.',
        ],
      },
      {
        heading: 'Common YPP rejection reasons (public stats will not show these)',
        paragraphs: [
          'A channel can display 1,000+ subscribers and strong lifetime views while still failing Partner Program review. YouTube evaluates originality, reused content, misleading metadata, artificial engagement, and community guideline history — none of which appear in the public Data API.',
          'Frequent rejection themes include: compilations or clips without meaningful commentary; repetitive templated uploads; copyright or reused-content flags; clickbait that does not match the video; purchased views or subscribers; and categories that are not suitable for all advertisers.',
          'If you were rejected, fix the underlying content issues, wait out strike timers where applicable, and reapply from Studio — do not rely on a third-party “monetized” label as approval proof. Our inferred report is a planning aid before you apply, not a guarantee of acceptance.',
        ],
      },
      {
        heading: 'For brands, sponsors, and competitor research',
        paragraphs: [
          'Marketing teams often want a fast yes/no before signing a creator. Public checkers can screen for audience scale and rough eligibility-style signals, but they cannot replace contracts, disclosures, or analytics access when spend is significant.',
          'Use this tool to compare subscriber counts, view velocity proxies, and inferred tiers across a short list of channels — then ask finalists for YouTube Studio or Analytics verification under NDA, media kits, and brand safety reviews.',
          'Do not cite inferred monetization output as “confirmed AdSense revenue” in client decks. Pair screenshots with our disclaimer language and official YouTube Help references. For competitive SEO research, combine results with our tag extractor and channel compare tools on public metadata only.',
        ],
      },
      {
        heading: 'Owner verification: how it works and what you will see',
        paragraphs: [
          'Owner verification is optional and only for the Google account that manages the channel you entered. Click Verify Exact Monetization Status, approve read-only YouTube and YouTube Analytics monetary scopes on Google’s consent screen, and return to this page for the result.',
          'We verify that the OAuth session owns the target channel, confirm routine Analytics access works, then request monetary metrics documented for Partner Program reporting. A successful monetary response is shown as owner-verified monetization access. If Analytics works but monetary metrics return the documented forbidden response, we surface that as not verified for monetary access — still confirm wording in Studio.',
          'We do not receive your Google password. Access tokens are used only to complete the verification request and are not intentionally stored in our application database. Results are delivered through a short-lived signed cookie on your browser. If you signed into the wrong Google account, you will see a channel mismatch message — sign out and retry with the owner account.',
          'Owner verification does not reveal another creator’s status to you. Visitors researching third-party channels should rely on the inferred public report only and read our Privacy Policy for how OAuth data is handled.',
        ],
      },
      {
        heading: 'Data sources and limitations',
        paragraphs: [
          'We use YouTube Data API v3 for public channel and video metadata only. We do not scrape watch pages, player ad tokens, or undocumented HTML markers to guess monetization.',
          'Illustrative RPM bands ($2–$10 per 1,000 views in the default matrix) are not your channel’s real RPM. Geography, content category, seasonality, and the share of monetized playbacks change actual AdSense payouts. The blog article on estimating channel revenue from public views explains the lifetime-views ÷ channel-age formula used in the matrix.',
          'We do not store your public search queries in a customer database for resale. Owner OAuth access tokens are used transiently during verification and are not intentionally persisted in our application database.',
          'Rate limits apply to API usage on this deployment. Very large channels still follow the same inference rules — big subscriber counts alone do not equal an official “monetized” flag in our UI.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'channel-id-finder': {
    sections: [
      {
        heading: 'Why channel IDs matter',
        paragraphs: [
          'Every YouTube channel has a permanent 24-character identifier that begins with UC. Handles and display names can change, but the channel ID stays stable for API calls, RSS subscriptions, and automation workflows.',
          'Developers use channel IDs in YouTube Data API requests. Creators use them for RSS readers, Discord bots, and analytics dashboards that need a canonical reference instead of a vanity URL.',
        ],
      },
      {
        heading: 'Channel ID vs Handle vs Custom URL',
        paragraphs: [
          'A YouTube @handle (e.g., @mkbhd) is a creator-chosen handle introduced for social tagging, mentions, and friendly sharing. Handles can be changed twice within a 14-day window.',
          'A legacy custom URL (/c/name or /user/name) is a deprecated vanity routing format from older YouTube systems. In contrast, the canonical 24-character UC identifier (e.g., UCX6OQ3DkcsbYNE6H8uQQuVA) never changes, even if a creator undergoes complete rebrands, ownership transfers, or handle updates.',
        ],
      },
      {
        heading: 'Supported inputs',
        paragraphs: [
          'Paste a modern @handle, a /channel/UC… URL, a bare UC ID, or a link to a public video uploaded by the channel. We resolve redirects and return the canonical ID plus helpful public profile fields when the API makes them available.',
          'Private, deleted, or terminated channels cannot be resolved. If a video is removed or restricted, lookup may fail until you supply another public URL.',
        ],
      },
      {
        heading: 'Integrating Channel IDs with Webhooks & Discord Bots',
        paragraphs: [
          'To receive real-time notifications when a channel uploads, Discord bots (like MEE6 or Carl-bot) and RSS listeners require the UC identifier formatted as: `https://www.youtube.com/feeds/videos.xml?channel_id=UC...`.',
          'Using the UC ID ensures your notification pipeline will never break when the channel owner adjusts their display name or switches handles.',
        ],
      },
      {
        heading: 'Who should use the channel ID finder',
        paragraphs: [
          'Developers wiring Discord bots, no-code automations, RSS readers, and internal dashboards that need a stable UC identifier instead of a vanity URL.',
          'Marketers documenting partner channels should store the UC ID in CRM notes even when public-facing materials use @handles.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'tag-extractor': {
    sections: [
      {
        heading: 'How public tags work on YouTube',
        paragraphs: [
          'Creators can add tags in YouTube Studio to clarify topics, capture alternate spellings, and support discovery. Tags are not the strongest ranking signal compared with titles, descriptions, and thumbnails, but they still help with relevance and competitor research.',
          'This tool reads tags that creators chose to attach to public videos. It does not reveal private studio drafts, hidden server fields, or metadata from videos you cannot access.',
        ],
      },
      {
        heading: 'How YouTube interprets video tags in 2026',
        paragraphs: [
          'According to YouTube official creator documentation, tags are primarily useful if the content of your video is commonly misspelled or searched with varied regional terminology (e.g., "grey" vs "gray", or technical product model codes).',
          'Tags provide secondary disambiguation context. YouTube natural language processing engines read your video spoken transcript, title, and description first. Tags serve as reinforcing signals for ambiguous keywords.',
        ],
      },
      {
        heading: 'Tag clustering and gap analysis workflow',
        paragraphs: [
          'Rather than copying a competitor tag block verbatim, inspect tags across 3 to 5 top-ranking videos for your target search query.',
          'Identify common thematic clusters (e.g., broad category, core mechanism, tool names, problem statements). Craft a unique tag block for your upload that covers keyword variations without stuffing unrelated terms.',
        ],
      },
      {
        heading: 'Responsible use',
        paragraphs: [
          'Copying a competitor’s tag list is a starting point, not a substitute for original titles and descriptions. Combine tag research with your own keyword strategy and audience knowledge.',
          'Respect copyright and community guidelines when publishing. Bulk copying tags across unrelated niches can hurt relevance more than it helps.',
        ],
      },
      {
        heading: 'Who should use the tag extractor',
        paragraphs: [
          'SEO specialists auditing competitor packaging, course creators building keyword briefs, and solo YouTubers validating whether their own tags match the topic they filmed.',
          'Use extracted tags as research notes, then rewrite metadata that reflects your unique angle rather than pasting entire lists into Studio.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'earnings-calculator': {
    sections: [
      {
        heading: 'Estimates, not paychecks',
        paragraphs: [
          'This calculator multiplies view counts by RPM or CPM assumptions you select. Real YouTube payouts depend on geography, seasonality, ad inventory, content category, viewer devices, and whether viewers use ad blockers.',
          'Use the output as a planning range for sponsorship decks or goal setting. Always reconcile estimates with YouTube Analytics and AdSense once you are monetized.',
        ],
      },
      {
        heading: 'Key variables that shift creator revenue',
        paragraphs: [
          'Audience geography is the single largest determinant of RPM. Viewers in Tier-1 countries (US, UK, Canada, Australia, Germany) command significantly higher advertiser bids than viewers in regions with developing digital ad markets.',
          'Viewer age and purchase intent also dictate CPM. Topics revolving around B2B software, personal finance, real estate, and enterprise technology routinely achieve RPMs above $15–$30, whereas gaming and viral meme content average between $1.50 and $4.00.',
        ],
      },
      {
        heading: 'Understanding RPM vs CPM',
        paragraphs: [
          'CPM usually refers to what advertisers pay per thousand ad impressions. RPM reflects what creators earn per thousand views after YouTube’s revenue share and non-ad sources are considered.',
          'Niche presets in the tool are illustrative benchmarks, not guarantees. Adjust sliders to match your own historical Analytics when possible.',
        ],
      },
      {
        heading: 'Seasonality and the Q1 vs Q4 earnings swing',
        paragraphs: [
          'Ad spend is cyclical. In Q4 (October through December), brands exhaust remaining annual budgets for holiday shopping and Black Friday, driving RPMs to yearly peaks.',
          'In January (Q1), ad budgets reset, often causing creator earnings to drop by 30% to 50% overnight despite identical view counts. Prudent creators plan cash flow using conservative annual average RPMs.',
        ],
      },
      {
        heading: 'Who should use the earnings calculator',
        paragraphs: [
          'Creators planning sponsorship minimums, finance educators teaching RPM concepts, and small teams forecasting runway from ad revenue scenarios.',
          'Replace preset RPM values with exports from YouTube Analytics whenever you are making hiring or equipment purchase decisions.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'seo-score-checker': {
    sections: [
      {
        heading: 'On-page SEO vs overall ranking',
        paragraphs: [
          'A strong metadata checklist improves clarity for viewers and search systems, but watch time, click-through rate, and satisfaction still dominate distribution on YouTube.',
          'This audit scores title length, description structure, tags, and related checklist items so you can fix obvious issues before publishing or refreshing a video.',
        ],
      },
      {
        heading: 'Balancing CTR with audience retention',
        paragraphs: [
          'A high score indicates that your metadata follows the educational checklist used by this tool, but click-through rate (CTR) and average view duration (AVD) dictate whether YouTube recommends the video on home feeds and suggested bars. This is a YouTubeFreeToolkit heuristic checklist score, not an official Google or YouTube ranking score.',
          'Never use sensationalized titles that score well for length but mislead viewers. When viewers bounce within the first 15 seconds, algorithmic impressions drop sharply regardless of keyword density.',
        ],
      },
      {
        heading: 'Updating historical metadata on older videos',
        paragraphs: [
          'Refreshing titles, descriptions, and chapters on existing videos that have lost momentum is a proven optimization technique.',
          'Audit your back catalog for outdated year references (e.g., updating 2024 to 2026), broken external links, or missing timestamps. A renewed title and clean chapters can revive impressions for evergreen tutorials.',
        ],
      },
      {
        heading: 'How to act on the score',
        paragraphs: [
          'Prioritize fixes that affect mobile truncation and the first lines of your description, because those elements influence clicks and whether viewers expand the description.',
          'Re-run the audit after you edit copy in YouTube Studio. Small wording changes can move a video from “needs work” to “ready to publish” without changing the underlying footage.',
        ],
      },
      {
        heading: 'Who should use the SEO score checker',
        paragraphs: [
          'Editors doing final metadata passes, agencies reviewing client uploads before scheduling, and creators learning which title and description habits hurt mobile readability.',
          'Run the audit on draft copy in a doc first, then again after you paste into Studio so formatting differences do not hide truncation issues.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'live-subscriber-count': {
    sections: [
      {
        heading: 'Public subscriber statistics',
        paragraphs: [
          'YouTube may round subscriber counts shown to the public, especially for larger channels. This tool displays the latest public totals available through the Data API, which is useful for milestones and live stream overlays.',
          'Numbers can lag brief spikes or corrections while YouTube processes updates. Refresh the page if you are celebrating a milestone on stream.',
        ],
      },
      {
        heading: 'Understanding YouTube abbreviated subscriber count policy',
        paragraphs: [
          'Since September 2019, YouTube standardizes public subscriber counts across all third-party platforms to prevent real-time metric tracking drama.',
          'Channels with under 1,000 subscribers display exact counts. Channels between 1,000 and 9,999 update every 10 subscribers. Between 10,000 and 99,999 update every 100 subscribers, and channels above 1M update in 10,000 increments.',
        ],
      },
      {
        heading: 'Technical best practices for streaming overlays',
        paragraphs: [
          'When adding a live counter into OBS Studio, vMix, or Streamlabs via Browser Source, configure custom CSS with transparent backgrounds and high-contrast typography.',
          'Set reasonable refresh rates (30–60 seconds). Polling too aggressively can burn out your local machine network buffers and trigger rate limits on public endpoints.',
        ],
      },
      {
        heading: 'Overlay and presentation tips',
        paragraphs: [
          'When embedding counts in OBS or Streamlabs, choose high-contrast typography and avoid covering safe zones on mobile-oriented layouts.',
          'Do not present rounded public counts as precise accounting for contracts or sponsorships. Use YouTube Studio analytics for official reporting.',
        ],
      },
      {
        heading: 'Who should use the subscriber counter',
        paragraphs: [
          'Streamers building milestone overlays, community managers tracking public growth between weekly reports, and creators celebrating goals with transparent on-screen disclaimers.',
          'Refresh immediately before a subathon segment and keep Studio open if a sponsor requires accounting-grade totals.',
        ],
      },
      {
        heading: 'Milestone stream disclaimer',
        paragraphs: [
          'On-screen counters show public API totals that may round or lag Studio by minutes during viral spikes. Mention that viewers see abbreviated counts on large channels so chat expectations stay realistic.',
          'If a brand sponsorship references subscriber targets, contract language should cite YouTube Studio analytics exports rather than a third-party overlay snapshot.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'thumbnail-preview': {
    sections: [
      {
        heading: 'Why preview thumbnails',
        paragraphs: [
          'Thumbnails compete for attention in crowded feeds. Testing contrast, text size, and focal points against light and dark themes reduces surprises after upload.',
          'For published videos, we load standard YouTube thumbnail URLs. For drafts, upload an image to see approximate framing with duration badges and grid layouts.',
        ],
      },
      {
        heading: 'The 3-second thumbnail contrast test',
        paragraphs: [
          'Viewers scan YouTube feeds at high speed. A successful thumbnail passes the 3-second test: within three seconds, a viewer should discern the subject, emotional tone, and promise.',
          'Test your draft image at small sizes (under 300px wide) in both light mode and dark mode. If primary text elements or focal points blend into surrounding feed borders, adjust brightness, outline strokes, or background separation.',
        ],
      },
      {
        heading: 'Mobile safe margins and duration badge collisions',
        paragraphs: [
          'YouTube overlays a black timestamp badge (e.g., 12:45) in the bottom-right corner of every thumbnail. Crucial text, faces, or branding placed in that corner will be completely obscured.',
          'Maintain a minimum 15% margin along the bottom-right edge. Keep your main focal element centered or slightly left-aligned to guarantee visibility across mobile phones, tablets, and smart TVs.',
        ],
      },
      {
        heading: 'Design basics',
        paragraphs: [
          'Keep critical text away from the bottom-right duration badge and avoid tiny type that disappears on phones.',
          'This is a layout helper, not a guarantee of click-through rate. Pair previews with honest titles and accurate descriptions.',
        ],
      },
      {
        heading: 'Who should use thumbnail preview',
        paragraphs: [
          'Thumbnail designers testing contrast on dark mode feeds, gaming channels checking badge overlap, and brands localizing text size for mobile-first audiences.',
          'Upload the same PNG you plan to publish in Studio rather than a heavily compressed chat preview so results match production quality.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'title-description-analyzer': {
    sections: [
      {
        heading: 'Titles and the “Show more” fold',
        paragraphs: [
          'Mobile feeds truncate long titles. Descriptions only show the first lines before viewers tap Show more, so place hooks, keywords, and important links above the fold when appropriate.',
          'The analyzer highlights character counts, truncation risk, and readability so you can iterate before publishing.',
        ],
      },
      {
        heading: 'Front-loading core promises for 50-character cutoffs',
        paragraphs: [
          'On mobile devices and sidebar recommended feeds, titles beyond 45–55 characters are routinely truncated with ellipsis (...).',
          'If your title is "How to Build an App in 2026: A Full Beginner Guide", mobile viewers may only see "How to Build an App in 2026: A Full...". Front-load the action verb and subject so the core value proposition remains intact on all screen sizes.',
        ],
      },
      {
        heading: 'Structuring descriptions for search and retention',
        paragraphs: [
          'The first 2–3 lines of your description (about 120 characters) appear in Google search snippets and YouTube search result cards. Treat this space as an extension of your title promise.',
          'Below the fold, organize content logically: detailed summary, video timestamps, resource links, affiliate disclosures, social handles, and gear credits. Avoid repetitive keyword dumping.',
        ],
      },
      {
        heading: 'Writing for people first',
        paragraphs: [
          'Keyword stuffing hurts clarity. Write titles that promise a specific outcome, then support that promise in the opening description lines.',
          'Link to authoritative sources when you cite policies or statistics, and update descriptions when YouTube changes studio limits.',
        ],
      },
      {
        heading: 'Who should use the title and description analyzer',
        paragraphs: [
          'Tutorial channels optimizing how-to queries, news creators fitting breaking headlines into mobile limits, and translators checking whether localized titles still truncate cleanly.',
          'Iterate titles and opening description lines together so the promise above the Show more fold matches what viewers see in search results.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'hashtag-generator': {
    sections: [
      {
        heading: 'Hashtags on YouTube',
        paragraphs: [
          'YouTube displays a small number of hashtags above titles when they appear in the description. Using a focused set of relevant hashtags is generally better than maxing out the limit.',
          'Hashtags help viewers browse topic pages; they do not replace strong titles, thumbnails, or audience retention.',
        ],
      },
      {
        heading: 'Hashtags vs tags vs keywords: algorithmic differences',
        paragraphs: [
          'Hashtags are clickable discovery links that lead directly to dedicated YouTube hashtag landing pages. They appear in blue above or below your title and inside video descriptions.',
          'Video tags are hidden backend metadata primarily used for spelling disambiguation. Descriptive keywords live directly in your natural prose. Each serves a distinct technical purpose in the YouTube ecosystem.',
        ],
      },
      {
        heading: 'Avoiding over-tagging and spam flags',
        paragraphs: [
          'YouTube policies state that if a video includes more than 60 hashtags, the algorithm will ignore all hashtags on that upload. Overuse can also trigger automated spam flags.',
          'Best practice is to include 3 to 5 highly relevant hashtags: one broad niche tag (#tech), one specific topic tag (#nextjs), and one format tag (#shorts or #tutorial).',
        ],
      },
      {
        heading: 'Choosing tags responsibly',
        paragraphs: [
          'Pick hashtags that match the actual video topic. Misleading tags can reduce trust and may conflict with spam policies.',
          'Shorts and long-form videos can share strategies, but the hook and pacing still matter more than hashtag volume.',
        ],
      },
      {
        heading: 'Who should use the hashtag generator',
        paragraphs: [
          'Shorts creators brainstorming topic labels, brands launching campaign hashtags, and educators teaching how hashtags differ from hidden video tags.',
          'Keep only hashtags that appear in the description or title where viewers can see them; remove trendy tags unrelated to the footage.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'shorts-safe-zone': {
    sections: [
      {
        heading: 'Shorts interface overlays',
        paragraphs: [
          'Vertical Shorts place like, comment, share, and audio controls on top of the video. Text and faces near those edges can be covered on some devices.',
          'Use the safe-zone overlay to position captions, logos, and calls to action in the center band where controls are less likely to collide with your creative.',
        ],
      },
      {
        heading: 'Understanding Shorts dynamic UI layers',
        paragraphs: [
          'The bottom 20% to 25% of a Short is covered by the channel avatar, handle, subscribe button, video title, and audio track credit. The top 10% is occupied by search and camera icons.',
          'The right edge features the like, dislike, comment, share, and sound remix buttons. Keep all critical text, speech captions, diagrams, and focal points strictly within the central 1080x1400 area.',
        ],
      },
      {
        heading: 'Technical export settings for 9:16 vertical video',
        paragraphs: [
          'Standard YouTube Shorts resolution is 1080x1920 pixels (9:16 aspect ratio). Videos should be exported at 30fps or 60fps using the H.264 or HEVC (H.265) video codec with AAC audio at 320 kbps.',
          'Ensure your video duration does not exceed 60 seconds (or current YouTube Shorts limit). Videos longer by even a single frame will be uploaded as standard long-form videos without the vertical feed carousel.',
        ],
      },
      {
        heading: 'Exporting the PNG guide',
        paragraphs: [
          'Saving the transparent overlay is a design aid for editors in CapCut, Premiere, or DaVinci. It is not a YouTube video download and does not access YouTube servers beyond what you upload locally.',
          'Always review the final export on a physical phone because aspect ratios differ slightly between iOS and Android.',
        ],
      },
      {
        heading: 'Who should use the Shorts safe zone tool',
        paragraphs: [
          'Vertical editors in CapCut or Premiere, agencies delivering Shorts templates to clients, and educators teaching why UI chrome covers bottom captions.',
          'Save the PNG overlay in your project template so every episode in a series keeps consistent margins without redrawing guides.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'timestamp-validator': {
    sections: [
      {
        heading: 'Video chapters requirements',
        paragraphs: [
          'YouTube chapters require the first timestamp to start at 00:00, at least three chapters, and minimum segment lengths. Correct formatting can unlock key moments in search when YouTube supports them for your video.',
          'This validator sorts timestamps, checks spacing, and highlights syntax mistakes before you paste chapters into a description.',
        ],
      },
      {
        heading: 'Unlocking Google search key moments',
        paragraphs: [
          'When video chapters meet formatting standards, Google Search can index individual segments directly on search results pages as clickable "Key Moments".',
          'This allows searchers to jump straight to the exact second that answers their query (e.g., "Install Node.js" at 03:15), significantly expanding your video organic reach beyond YouTube search alone.',
        ],
      },
      {
        heading: 'Minimum duration and syntax rules',
        paragraphs: [
          'Each chapter segment must be at least 10 seconds long. Chapters shorter than 10 seconds will prevent the chapter scrubber from rendering on the video player.',
          'Timestamps must be chronological and formatted as mm:ss or hh:mm:ss with at least one space between the timestamp and the chapter label (e.g., "00:00 Introduction").',
        ],
      },
      {
        heading: 'When chapters may not appear',
        paragraphs: [
          'Age-restricted content, active strikes, or YouTube quality checks can suppress chapters even when formatting is correct.',
          'Chapters should describe real segments viewers can jump to; misleading jumps may reduce trust.',
        ],
      },
      {
        heading: 'Who should use the chapter validator',
        paragraphs: [
          'Long-form educators publishing multi-section tutorials, podcasters uploading chapterized interviews, and producers fixing timestamp typos before a scheduled premiere.',
          'Paste chapters from your script doc, validate spacing, then copy the corrected block into Studio so Google key moments see consistent formatting.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'rpm-calculator': {
    sections: [
      {
        heading: 'Calculating RPM from your data',
        paragraphs: [
          'RPM equals total estimated earnings divided by total views, multiplied by one thousand. Enter numbers from YouTube Analytics for a week or month to see your realized RPM.',
          'Compare your RPM with niche benchmarks to spot under-monetized topics or audiences, then investigate geography, ad types, and video length.',
        ],
      },
      {
        heading: 'The role of monetized playback percentage',
        paragraphs: [
          'A video with 100,000 views does not receive 100,000 ad impressions. The monetized playback percentage represents the fraction of views where at least one ad was successfully served.',
          'Users on YouTube Premium, users with ad blockers, or impressions served when advertiser bids are low reduce monetized playbacks. If your monetized playback rate is only 40%, your real RPM will reflect that spread.',
        ],
      },
      {
        heading: 'Mid-roll ad placement on videos over 8 minutes',
        paragraphs: [
          'Videos longer than 8 minutes qualify for manual mid-roll ad placements in YouTube Studio. Strategic placement at natural narrative pauses can double or triple realized RPM without disrupting viewer retention.',
          'Avoid inserting mid-rolls in the middle of sentences or cliffhangers, which spikes viewer drop-off.',
        ],
      },
      {
        heading: 'Limits of benchmarks',
        paragraphs: [
          'Published RPM ranges aggregate many channels and change over time. Your RPM can swing between quarters without anything being “wrong” with your channel.',
          'Memberships, Super Thanks, and YouTube Premium revenue can affect RPM even when ad impressions look flat.',
        ],
      },
      {
        heading: 'Who should use this calculator',
        paragraphs: [
          'New monetized creators comparing last month’s Studio export to a niche benchmark, finance channels modeling sponsorship minimums, and educators explaining RPM in workshops all benefit from quick what-if math.',
          'Export your real views and revenue from YouTube Analytics for the same date range before you debate whether a generic benchmark applies to your audience.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'channel-compare': {
    sections: [
      {
        heading: 'Comparing public channels',
        paragraphs: [
          'Side-by-side comparisons help you benchmark subscribers, total views, and upload counts using the same public API fields for each channel.',
          'Use comparisons for motivation and niche research, not as proof of revenue, monetization, or private analytics.',
        ],
      },
      {
        heading: 'Evaluating average views per video',
        paragraphs: [
          'Dividing total lifetime views by public video count provides the average view baseline. A channel with 100 videos and 10M views averages 100,000 views per upload.',
          'Comparing this ratio across peers highlights which creators produce evergreen library content versus creators reliant on high-frequency daily uploads with lower longevity.',
        ],
      },
      {
        heading: 'Tracking 30- and 90-day growth momentum',
        paragraphs: [
          'Raw subscriber numbers reflect historical accumulation, not current audience enthusiasm. A legacy channel with 1M subscribers may receive fewer weekly views than a rapidly ascending creator with 100K subscribers.',
          'Pair public comparisons with recent video view velocity to understand authentic market share within your niche.',
        ],
      },
      {
        heading: 'Fair comparisons',
        paragraphs: [
          'Channels in different niches and upload schedules are not directly comparable beyond surface totals. Pair this tool with qualitative review of content quality and audience fit.',
          'Rounded subscriber displays can make tiny gaps look larger or smaller than they are in Studio.',
        ],
      },
      {
        heading: 'Who should use channel compare',
        paragraphs: [
          'Podcast networks benchmarking client channels, educators demonstrating growth trajectories, and solo creators choosing realistic peer channels for quarterly goals.',
          'Screenshot results with the date in your notes so viral weeks do not become permanent expectations.',
        ],
      },
      {
        heading: 'When not to rely on compare alone',
        paragraphs: [
          'Public totals cannot show Shorts versus long-form mix, returning viewer rates, or revenue. Use compare to shortlist channels worth deeper qualitative review, then watch recent uploads to judge packaging and retention.',
          'For monetization questions, follow with the Monetization Checker on public signals only — never treat subscriber gaps as proof of AdSense status for another creator.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
  'upload-checklist': {
    sections: [
      {
        heading: 'Pre-publish workflow',
        paragraphs: [
          'A repeatable checklist reduces forgotten end screens, missing chapters, or thumbnails that fail on mobile. Work through metadata, visuals, audio, and compliance items before you click Publish.',
          'The progress bar is a personal workflow aid. You can copy a summary for producers or editors on your team.',
        ],
      },
      {
        heading: 'Sponsor disclosures and COPPA compliance',
        paragraphs: [
          'If your video includes a paid product placement, sponsorship, or brand endorsement, YouTube requires checking the "Paid promotion" box in Studio to display an on-screen disclosure.',
          'Similarly, the Children’s Online Privacy Protection Act (COPPA) requires declaring whether content is "Made for Kids". Marking this incorrectly can lead to ad restrictions or regulatory penalties.',
        ],
      },
      {
        heading: 'Audio loudness and end-screen configuration',
        paragraphs: [
          'YouTube applies automated loudness normalization targeting roughly -14 LUFS. Mixes mastered substantially louder will be turned down by YouTube, often causing dynamic distortion.',
          'Ensure end-screen cards (subscribes, next video, playlists) are positioned in the final 20 seconds without covering vital tutorial details.',
        ],
      },
      {
        heading: 'Quality over speed',
        paragraphs: [
          'Checking every box does not guarantee performance. Retention and relevance still determine reach after upload.',
          'Update the checklist when YouTube ships new studio features so your process stays current.',
        ],
      },
      {
        heading: 'Who should use the upload checklist',
        paragraphs: [
          'Solo creators who publish without a producer, small teams handing videos between editor and host, and agencies standardizing client deliverables before Studio upload.',
          'Copy the completed summary into your project management ticket so reviewers know which SEO and technical steps were verified on this upload.',
        ],
      },
      {
        heading: 'Scheduling versus instant publish',
        paragraphs: [
          'Complete the checklist before scheduling so premiere chat, end screens, and chapter timestamps are locked in. Scheduled videos can still be edited, but teams often forget to revisit metadata after upload to a private scheduled slot.',
          'For multi-language channels, add a final pass for localized titles and disclosure text before the checklist summary is copied to your producer.',
        ],
      },
      DEFAULT_TRUST,
    ],
  },
};

export function getToolGuide(slug: string): ToolGuide | null {
  return GUIDES[slug] ?? null;
}

export function countGuideWords(guide: ToolGuide): number {
  return guide.sections.reduce(
    (sum, section) =>
      sum + section.paragraphs.join(' ').split(/\s+/).filter(Boolean).length,
    0
  );
}
