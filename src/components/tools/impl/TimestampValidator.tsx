'use client';

import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

export function TimestampValidator() {
  const [text, setText] = useState(
    `00:00 - Introduction & Hook\n01:15 - Core Algorithm Rules in 2026\n04:30 - YouTube Monetization Setup\n08:45 - High-RPM Niche List\n12:10 - Final Checklist & Q&A`
  );
  const [copied, setCopied] = useState(false);

  // Validate timestamps
  const lines = text.split('\n').filter((l) => l.trim().length > 0);
  const timestampRegex = /(\d{1,2}:\d{2}(?::\d{2})?)\s*[-:]?\s*(.+)/;

  const parsedChapters = lines.map((line) => {
    const match = line.match(timestampRegex);
    if (!match) return { valid: false, raw: line, time: '', title: '' };
    return { valid: true, raw: line, time: match[1], title: match[2].trim() };
  });

  const startsWithZero = parsedChapters.length > 0 && (parsedChapters[0].time === '00:00' || parsedChapters[0].time === '0:00');
  const hasMinChapters = parsedChapters.filter((c) => c.valid).length >= 3;
  const allValid = startsWithZero && hasMinChapters;

  const copyFormatted = () => {
    const cleanOutput = parsedChapters
      .filter((c) => c.valid)
      .map((c) => `${c.time} - ${c.title}`)
      .join('\n');
    navigator.clipboard.writeText(cleanOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider">
          Paste Timestamps and Chapter Titles
        </label>
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-3 font-mono text-xs text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none transition-colors"
        />
      </div>

      {/* Validation Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          className={`flex items-center gap-3 p-4 rounded-xl border ${
            startsWithZero
              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-400'
          }`}
        >
          {startsWithZero ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          <div>
            <p className="text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Rule 1: Starts at 00:00</p>
            <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa]">First timestamp must begin at 00:00</p>
          </div>
        </div>

        <div
          className={`flex items-center gap-3 p-4 rounded-xl border ${
            hasMinChapters
              ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/25 text-rose-600 dark:text-rose-400'
          }`}
        >
          {hasMinChapters ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          <div>
            <p className="text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Rule 2: Minimum 3 Chapters</p>
            <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa]">
              Found {parsedChapters.filter((c) => c.valid).length} valid chapters
            </p>
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center justify-between border-t border-[#e5e5e5] dark:border-[#272727] pt-4">
        <span className="text-xs text-[#606060] dark:text-[#aaaaaa]">
          {allValid ? '✓ Ready for YouTube Studio & Google Key Moments' : '⚠ Fix highlighted errors above'}
        </span>
        <button
          onClick={copyFormatted}
          disabled={!allValid}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#ff0000] px-4 py-2 text-xs font-bold text-white hover:bg-[#cc0000] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {copied ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied Chapters!' : 'Copy Formatted List'}</span>
        </button>
      </div>
    </div>
  );
}
