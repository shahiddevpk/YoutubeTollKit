'use client';

import React, { useState } from 'react';
import { CheckSquare, Square, Copy, Check } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  label: string;
  tip: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: '1', category: 'Thumbnail & Visuals', label: '1280x720 16:9 HD Resolution', tip: 'High resolution prevents pixelation across desktop screens.' },
  { id: '2', category: 'Thumbnail & Visuals', label: 'Bottom-Right Safe Zone Verified', tip: 'Ensure critical text/faces are clear of the video duration timestamp badge.' },
  { id: '3', category: 'Thumbnail & Visuals', label: 'High Contrast & 3-Word Max Text', tip: 'Make text readable at small mobile screen sizes.' },
  { id: '4', category: 'Title Optimization', label: 'Primary Keyword in First 40 Chars', tip: 'Prevents keyword truncation on mobile YouTube apps.' },
  { id: '5', category: 'Title Optimization', label: 'Total Length 50–70 Characters', tip: 'The optimal character sweet spot for click-through rate.' },
  { id: '6', category: 'Description & Chapters', label: 'Hook & Value in First 3 Lines', tip: 'Visible above the "Show More" fold without clicking.' },
  { id: '7', category: 'Description & Chapters', label: 'Chapters Starting at 00:00', tip: 'Required to qualify for Google Search Key Moments.' },
  { id: '8', category: 'Description & Chapters', label: '3+ Chapters with ≥10s Length', tip: 'Minimum threshold for YouTube interactive chapter bar.' },
  { id: '9', category: 'Tags & Metadata', label: '5–10 Targeted Topic Tags', tip: 'Include common misspellings and semantic synonyms.' },
  { id: '10', category: 'Tags & Metadata', label: '3 Relevant Hashtags in Description', tip: 'First 3 hashtags display prominently above video title.' },
  { id: '11', category: 'Engagement & Retention', label: 'End Screen Elements Added', tip: 'Promote best-for-viewer video and subscribe button in last 20s.' },
  { id: '12', category: 'Engagement & Retention', label: 'Info Cards Placed at Retention Drops', tip: 'Link to relevant playlists when viewers typically drop off.' },
  { id: '13', category: 'Technical & Audio', label: 'Audio Loudness at -14 LUFS', tip: 'YouTube standard loudness normalization target.' },
  { id: '14', category: 'Technical & Audio', label: 'Subtitles / Closed Captions Added', tip: 'Boosts SEO accessibility and non-native viewer retention.' },
  { id: '15', category: 'Publishing Settings', label: 'Category & Language Configured', tip: 'Helps YouTube recommendation algorithm route to the right audience.' },
];

export function UploadChecklist() {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set(['1', '2', '4', '6', '7']));
  const [copied, setCopied] = useState(false);

  const toggleItem = (id: string) => {
    const next = new Set(checkedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setCheckedIds(next);
  };

  const progressPercent = Math.round((checkedIds.size / CHECKLIST_ITEMS.length) * 100);

  const copySummary = () => {
    const summary = CHECKLIST_ITEMS.map(
      (item) => `${checkedIds.has(item.id) ? '[✓]' : '[ ]'} ${item.label} (${item.category})`
    ).join('\n');

    navigator.clipboard.writeText(
      `YouTube Pre-Upload SEO Checklist (${progressPercent}% Ready):\n\n${summary}\n\nGenerated via youtubefreetoolkit.com`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAll = () => {
    setCheckedIds(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-bold text-slate-400">Pre-Upload Readiness</span>
            <h3 className="text-xl font-black text-white">{progressPercent}% Ready to Publish</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={copySummary}
              className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-red-500 transition-all cursor-pointer"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied Log!' : 'Copy Checklist'}</span>
            </button>
          </div>
        </div>

        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              progressPercent === 100
                ? 'bg-emerald-500'
                : progressPercent >= 70
                ? 'bg-blue-500'
                : 'bg-amber-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {CHECKLIST_ITEMS.map((item) => {
          const isChecked = checkedIds.has(item.id);
          return (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                isChecked
                  ? 'border-emerald-500/30 bg-emerald-950/15 text-slate-100'
                  : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isChecked ? (
                  <CheckSquare className="h-5 w-5 text-emerald-400" />
                ) : (
                  <Square className="h-5 w-5 text-slate-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-sm font-semibold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                  <span className="rounded bg-slate-800 px-2 py-0.2 text-[10px] text-slate-400">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{item.tip}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
