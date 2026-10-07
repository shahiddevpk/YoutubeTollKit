'use client';

import React, { useState } from 'react';
import { Gauge, ListChecks } from 'lucide-react';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';

interface SeoAuditResult {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  titleAudit: { status: 'pass' | 'warn' | 'fail'; message: string; length: number };
  descriptionAudit: { status: 'pass' | 'warn' | 'fail'; message: string; words: number };
  tagsAudit: { status: 'pass' | 'warn' | 'fail'; message: string; count: number };
  chaptersAudit: { status: 'pass' | 'warn' | 'fail'; message: string };
  recommendations: string[];
}

export function SeoScoreChecker() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [audit, setAudit] = useState<SeoAuditResult | null>(null);

  const runAudit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAudit(null);

    setTimeout(() => {
      setLoading(false);
      const titleLen = title.length;
      const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
      const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
      const hasTimestamps = /00:00|\d{1,2}:\d{2}/.test(description);

      let score = 50;
      const recommendations: string[] = [];

      // Title scoring (50-70 ideal)
      let titleStatus: 'pass' | 'warn' | 'fail' = 'pass';
      let titleMsg = 'Title length is in the optimal 50-70 character sweet spot.';
      if (titleLen >= 50 && titleLen <= 70) {
        score += 25;
      } else if (titleLen >= 30 && titleLen <= 90) {
        score += 12;
        titleStatus = 'warn';
        titleMsg = 'Title is acceptable, but 50-70 characters gets maximum mobile CTR without truncation.';
        recommendations.push('Adjust title length between 50 and 70 characters for best mobile visibility.');
      } else {
        titleStatus = 'fail';
        titleMsg = 'Title is either too short (<30 chars) or prone to heavy truncation (>90 chars).';
        recommendations.push('Write a punchy title between 50 and 70 characters with primary keyword in the first 40 characters.');
      }

      // Description scoring
      let descStatus: 'pass' | 'warn' | 'fail' = 'pass';
      let descMsg = 'Rich description with adequate length for search indexing.';
      if (wordCount >= 150) {
        score += 15;
      } else if (wordCount >= 50) {
        score += 8;
        descStatus = 'warn';
        descMsg = 'Description is moderate. Expanding to 150+ words provides more context for YouTube AI.';
        recommendations.push('Expand description with 200+ words including timestamps, links, and topic keywords.');
      } else {
        descStatus = 'fail';
        descMsg = 'Description is too brief for optimal organic YouTube search ranking.';
        recommendations.push('Add a full summary and call to action above the "Show More" fold.');
      }

      // Tags scoring (minor signal — YouTube has de-emphasised tags in ranking)
      let tagsStatus: 'pass' | 'warn' | 'fail' = 'pass';
      let tagsMsg = `${tags.length} tags detected.`;
      if (tags.length >= 5 && tags.length <= 15) {
        score += 5;
      } else if (tags.length > 0) {
        score += 3;
        tagsStatus = 'warn';
        tagsMsg = 'Consider using 5–12 focused tags to help YouTube categorise the video.';
      } else {
        tagsStatus = 'fail';
        tagsMsg = 'No tags detected. Tags have limited ranking impact but can help with categorisation.';
        recommendations.push('Optionally add 5–10 relevant tags (misspellings, topic keywords). Tags carry less weight than title and description.');
      }

      // Chapters scoring
      let chapStatus: 'pass' | 'warn' | 'fail' = 'pass';
      let chapMsg = 'Timestamps detected! Qualifies for Google Key Moments rich snippets.';
      if (hasTimestamps) {
        score += 5;
      } else {
        chapStatus = 'warn';
        chapMsg = 'No video chapter timestamps detected in description.';
        recommendations.push('Include chapter timestamps (starting with 00:00) to boost watch time and Google search visibility.');
      }

      score = Math.min(100, score);
      const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : 'D';

      setAudit({
        score,
        grade,
        titleAudit: { status: titleStatus, message: titleMsg, length: titleLen },
        descriptionAudit: { status: descStatus, message: descMsg, words: wordCount },
        tagsAudit: { status: tagsStatus, message: tagsMsg, count: tags.length },
        chaptersAudit: { status: chapStatus, message: chapMsg },
        recommendations,
      });
    }, 600);
  };

  const loadDemo = () => {
    setTitle('How to Make $5,000/Month on YouTube (Full Monetization Blueprint 2026)');
    setDescription(
      `In this complete 2026 YouTube monetization guide, we break down how to get monetized, calculate your RPM, and build high-income automated channels.\n\n00:00 - Introduction\n01:45 - YPP Requirements in 2026\n05:10 - Highest Paying Niches\n12:30 - RPM Optimization Blueprint\n\nCheck your channel status free at youtubefreetoolkit.com`
    );
    setTagsInput('youtube monetization, youtube rpm, how to make money on youtube, youtube creator tips');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Video Metadata SEO Auditor</h3>
        <button
          type="button"
          onClick={loadDemo}
          className="text-xs text-[#ff0000] dark:text-red-400 hover:underline font-semibold cursor-pointer"
        >
          Load Example Data
        </button>
      </div>

      <form onSubmit={runAudit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
            Video Title ({title.length} characters)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How to Get Monetized on YouTube Fast (2026 Step-by-Step)"
            className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
            Video Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Paste your video description text including links and timestamps..."
            className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. youtube seo, channel growth, monetization 2026"
            className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none transition-colors"
          />
        </div>

        <ToolPrimaryButton type="submit" loading={loading} loadingLabel="Auditing…" className="w-full sm:w-full">
          <Gauge className="h-4 w-4" aria-hidden />
          <span>Run SEO Audit</span>
        </ToolPrimaryButton>
      </form>

      {audit && (
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-6 space-y-6 animate-in fade-in shadow-sm">
          {/* Score Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#e5e5e5] dark:border-[#272727] pb-5">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl font-black text-2xl border ${
                  audit.score >= 80
                    ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : audit.score >= 65
                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                }`}
              >
                {audit.score}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#606060] dark:text-[#aaaaaa] font-bold">
                  Overall SEO Score
                </span>
                <h4 className="text-xl font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
                  Grade {audit.grade} Optimization
                </h4>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#606060] dark:text-[#aaaaaa] block">
                Educational Metadata Checklist
              </span>
              <span className="text-[10px] text-[#909090] dark:text-[#717171] block mt-0.5">
                Heuristic audit · Not an official Google/YouTube ranking score
              </span>
            </div>
          </div>

          {/* Audit breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 space-y-1 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Title Optimization</span>
                <span className="text-[#606060] dark:text-[#aaaaaa] font-mono">{audit.titleAudit.length} chars</span>
              </div>
              <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">{audit.titleAudit.message}</p>
            </div>

            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 space-y-1 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Description Context</span>
                <span className="text-[#606060] dark:text-[#aaaaaa] font-mono">{audit.descriptionAudit.words} words</span>
              </div>
              <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">{audit.descriptionAudit.message}</p>
            </div>

            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 space-y-1 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Tags & Semantic Keywords</span>
                <span className="text-[#606060] dark:text-[#aaaaaa] font-mono">{audit.tagsAudit.count} tags</span>
              </div>
              <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">{audit.tagsAudit.message}</p>
            </div>

            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 space-y-1 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Chapters / Timestamps</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Google Rich Snippet</span>
              </div>
              <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">{audit.chaptersAudit.message}</p>
            </div>
          </div>

          {/* Action Recommendations */}
          {audit.recommendations.length > 0 && (
            <div className="rounded-xl border border-[#ff0000]/20 bg-[#ff0000]/5 dark:bg-[#ff0000]/10 p-4 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[#ff0000] dark:text-red-400 flex items-center gap-1.5">
                <ListChecks className="h-3.5 w-3.5" aria-hidden />
                Action Items to Boost Score
              </h5>
              <ul className="space-y-1.5 text-xs text-[#0f0f0f] dark:text-[#f1f1f1]">
                {audit.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#ff0000] dark:text-red-400 font-bold mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
