'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const HASHTAG_POOLS: Record<string, string[]> = {
  general: ['#youtube', '#youtubeshorts', '#viral', '#creator', '#trending', '#video', '#explore'],
  finance: ['#personalfinance', '#investing', '#money', '#passiveincome', '#stockmarket', '#crypto', '#wealth'],
  tech: ['#tech', '#technology', '#gadgets', '#software', '#coding', '#ai', '#apple', '#android'],
  gaming: ['#gaming', '#gameplay', '#gamer', '#streamer', '#twitch', '#playstation', '#pcgaming'],
  education: ['#education', '#learning', '#tutorials', '#facts', '#science', '#knowledge', '#howto'],
};

export function HashtagGenerator() {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('general');
  const [format, setFormat] = useState<'shorts' | 'long'>('shorts');
  const [copied, setCopied] = useState(false);

  const baseTags = HASHTAG_POOLS[category] || HASHTAG_POOLS.general;
  const customTag = keyword.trim() ? `#${keyword.replace(/\s+/g, '').toLowerCase()}` : '';
  const generatedTags = [
    ...(customTag ? [customTag] : []),
    ...(format === 'shorts' ? ['#shorts', '#youtubeshorts'] : []),
    ...baseTags,
  ].slice(0, 8);

  const copyTags = () => {
    navigator.clipboard.writeText(generatedTags.join(' '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
            Topic or Keyword
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. crypto, podcast, ai"
            className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-3.5 py-2.5 text-xs text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
            Content Niche
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-3.5 py-2.5 text-xs text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none transition-colors"
          >
            <option value="general">General / Entertainment</option>
            <option value="finance">Finance & Business</option>
            <option value="tech">Technology & AI</option>
            <option value="gaming">Gaming</option>
            <option value="education">Education & Tutorials</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
            Video Format
          </label>
          <div className="flex rounded-full bg-[#f2f2f2] dark:bg-[#272727] p-1 border border-[#e5e5e5] dark:border-[#383838]">
            <button
              type="button"
              onClick={() => setFormat('shorts')}
              className={`flex-1 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                format === 'shorts' ? 'bg-[#ff0000] text-white shadow-sm' : 'text-[#606060] dark:text-[#aaaaaa]'
              }`}
            >
              Shorts (9:16)
            </button>
            <button
              type="button"
              onClick={() => setFormat('long')}
              className={`flex-1 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                format === 'long' ? 'bg-[#ff0000] text-white shadow-sm' : 'text-[#606060] dark:text-[#aaaaaa]'
              }`}
            >
              Long Form (16:9)
            </button>
          </div>
        </div>
      </div>

      {/* Output tags box */}
      <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#e5e5e5] dark:border-[#272727] pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#606060] dark:text-[#aaaaaa]">
            Recommended Hashtag Set ({generatedTags.length})
          </span>
          <button
            onClick={copyTags}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#ff0000] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#cc0000] transition-all cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-white" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Hashtags'}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {generatedTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-3.5 py-1.5 text-xs font-mono font-semibold text-[#ff0000] dark:text-red-400 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
