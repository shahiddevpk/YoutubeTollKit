'use client';

import React from 'react';
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

interface ToolRendererProps {
  slug: string;
}

export function ToolRenderer({ slug }: ToolRendererProps) {
  switch (slug) {
    case 'monetization-checker':
      return <MonetizationChecker />;
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
      return <MonetizationChecker />;
  }
}
