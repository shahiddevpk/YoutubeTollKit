'use client';

import React, { useState } from 'react';
import { Hash, Sparkles, Copy, Check } from 'lucide-react';

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
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Topic or Keyword
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. crypto, podcast, ai"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Content Niche
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
          >
            <option value="general">General / Entertainment</option>
            <option value="finance">Finance & Business</option>
            <option value="tech">Technology & AI</option>
            <option value="gaming">Gaming</option>
            <option value="education">Education & Tutorials</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
            Video Format
          </label>
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-700">
            <button
              type="button"
              onClick={() => setFormat('shorts')}
              className={`flex-1 py-1 rounded-lg text-xs font-semibold ${
                format === 'shorts' ? 'bg-red-600 text-white' : 'text-slate-400'
              }`}
            >
              Shorts (9:16)
            </button>
            <button
              type="button"
              onClick={() => setFormat('long')}
              className={`flex-1 py-1 rounded-lg text-xs font-semibold ${
                format === 'long' ? 'bg-red-600 text-white' : 'text-slate-400'
              }`}
            >
              Long Form (16:9)
            </button>
          </div>
        </div>
      </div>

      {/* Output tags box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Recommended Hashtag Set ({generatedTags.length})
          </span>
          <button
            onClick={copyTags}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-red-500 transition-all cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Hashtags'}</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {generatedTags.map((tag) => (
            <span
              key={tag}
              className="rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs font-mono font-medium text-red-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
