'use client';

import React, { useState } from 'react';
import { FileText, Eye, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

export function TitleDescriptionAnalyzer() {
  const [title, setTitle] = useState('How I Built a $10,000/Month YouTube Channel from Scratch 🚀');
  const [description, setDescription] = useState(
    'In this video, I break down the exact YouTube automation strategies, monetization tricks, and SEO tools I used to hit $10K/mo.\n\nSubscribe for more weekly creator tips!\nWebsite: youtubefreetoolkit.com'
  );

  const titleLen = title.length;
  const descChars = description.length;
  const firstLine = description.split('\n')[0] || '';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Editor Inputs */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Video Title ({titleLen}/100 max)
              </label>
              <span
                className={`text-xs font-mono font-bold ${
                  titleLen >= 50 && titleLen <= 70 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {titleLen <= 70 ? '✓ Mobile Friendly' : '⚠ Mobile Truncated'}
              </span>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
            {/* Visual Length Meter */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className={`h-full transition-all ${
                  titleLen > 70 ? 'bg-amber-500' : titleLen >= 50 ? 'bg-emerald-500' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(100, (titleLen / 100) * 100)}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Description ({descChars}/5000 chars)
              </label>
              <span className="text-xs text-slate-400">First 3 lines appear before &quot;Show More&quot;</span>
            </div>
            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Live Snippet Preview */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Eye className="h-4 w-4 text-red-500" />
            Search & Feed Snippet Preview
          </h4>

          {/* Desktop Search Card Preview */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-500">
              Desktop YouTube Search
            </span>
            <h5 className="text-sm font-bold text-white line-clamp-2">
              {title || 'Your Video Title'}
            </h5>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {firstLine || 'Your video description above the fold will appear here...'}
            </p>
          </div>

          {/* Optimization Checklist */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-xs">
              {titleLen >= 45 && titleLen <= 70 ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-400" />
              )}
              <span className="text-slate-300">
                Title length: <strong>{titleLen}</strong> chars (Ideal: 50–70)
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {/http|https|\.com/.test(description) ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-400" />
              )}
              <span className="text-slate-300">Call-to-Action Link included in description</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
