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
        heading: 'What this tool does',
        paragraphs: [
          'The YouTube Monetization Checker helps creators and researchers review public channel statistics that relate to YouTube Partner Program (YPP) eligibility, such as subscriber counts and video totals returned by the YouTube Data API.',
          'For channels you own, you may optionally sign in with Google using read-only scopes so we can test whether YouTube Analytics exposes monetary metrics for that account. That owner check is closer to ground truth for your channel, but it still is not a replacement for reading official messages inside YouTube Studio.',
        ],
      },
      {
        heading: 'What it cannot tell you',
        paragraphs: [
          'YouTube does not publish another creator’s private YPP enrollment through public APIs. Seeing advertisements on a video is not proof that the uploader receives revenue, so we do not infer monetization status from ad presence alone.',
          'Watch hours, Shorts view thresholds, policy strikes, and AdSense linkage are not guessed for third-party channels. Treat every public result as an unofficial indicator and confirm monetization decisions inside your own YouTube Studio account.',
        ],
      },
      {
        heading: 'Who should use this checker',
        paragraphs: [
          'Creators approaching YPP thresholds, managers vetting brand partnerships, and educators demonstrating the difference between public stats and private Studio status.',
          'Researchers comparing eligibility-style signals across niches should still cite YouTube’s official help articles and avoid presenting unofficial output as proof of another channel’s AdSense enrollment.',
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
        heading: 'Supported inputs',
        paragraphs: [
          'Paste a modern @handle, a /channel/UC… URL, a bare UC ID, or a link to a public video uploaded by the channel. We resolve redirects and return the canonical ID plus helpful public profile fields when the API makes them available.',
          'Private, deleted, or terminated channels cannot be resolved. If a video is removed or restricted, lookup may fail until you supply another public URL.',
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
        heading: 'Understanding RPM vs CPM',
        paragraphs: [
          'CPM usually refers to what advertisers pay per thousand ad impressions. RPM reflects what creators earn per thousand views after YouTube’s revenue share and non-ad sources are considered.',
          'Niche presets in the tool are illustrative benchmarks, not guarantees. Adjust sliders to match your own historical Analytics when possible.',
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
