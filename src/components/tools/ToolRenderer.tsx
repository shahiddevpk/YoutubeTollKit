'use client';

import React, { Suspense } from 'react';
import { MonetizationChecker } from './impl/MonetizationChecker';
import { ChannelIdFinder } from './impl/ChannelIdFinder';
import { TagExtractor } from './impl/TagExtractor';
import { EarningsCalculator } from './impl/EarningsCalculator';
import { SeoScoreChecker } from './impl/SeoScoreChecker';
import { LiveSubscriberCounter } from './impl/LiveSubscriberCounter';
import { ThumbnailPreview } from './impl/ThumbnailPreview';
import { TitleDescriptionAnalyzer } from './impl/TitleDescriptionAnalyzer';
import { HashtagGenerator } from './impl/HashtagGenerator';
import { ShortsSafeZone } from './impl/ShortsSafeZone';
import { TimestampValidator } from './impl/TimestampValidator';
import { RpmCalculator } from './impl/RpmCalculator';
import { ChannelCompare } from './impl/ChannelCompare';
import { UploadChecklist } from './impl/UploadChecklist';

const monetizationFallback = (
  <div className="min-h-40 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-8 text-center text-sm text-slate-400">
    Loading monetization checker…
  </div>
);

interface ToolRendererProps {
  slug: string;
}

/**
 * Static imports (no route-level lazy loading) so each tool page’s HTML from SSG/ISR
 * includes the full interactive shell on first response — better for crawlers and LCP.
 */
export function ToolRenderer({ slug }: ToolRendererProps) {
  switch (slug) {
    case 'monetization-checker':
      return (
        <Suspense fallback={monetizationFallback}>
          <MonetizationChecker />
        </Suspense>
      );
    case 'channel-id-finder':
      return <ChannelIdFinder />;
    case 'tag-extractor':
      return <TagExtractor />;
    case 'earnings-calculator':
      return <EarningsCalculator />;
    case 'seo-score-checker':
      return <SeoScoreChecker />;
    case 'live-subscriber-count':
      return <LiveSubscriberCounter />;
    case 'thumbnail-preview':
      return <ThumbnailPreview />;
    case 'title-description-analyzer':
      return <TitleDescriptionAnalyzer />;
    case 'hashtag-generator':
      return <HashtagGenerator />;
    case 'shorts-safe-zone':
      return <ShortsSafeZone />;
    case 'timestamp-validator':
      return <TimestampValidator />;
    case 'rpm-calculator':
      return <RpmCalculator />;
    case 'channel-compare':
      return <ChannelCompare />;
    case 'upload-checklist':
      return <UploadChecklist />;
    default:
      return (
        <Suspense fallback={monetizationFallback}>
          <MonetizationChecker />
        </Suspense>
      );
  }
}
