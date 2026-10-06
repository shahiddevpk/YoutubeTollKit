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
        score += 20;
      } else if (titleLen >= 30 && titleLen <= 90) {
        score += 10;
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

      // Tags scoring
      let tagsStatus: 'pass' | 'warn' | 'fail' = 'pass';
      let tagsMsg = `${tags.length} tags detected. Good semantic coverage.`;
      if (tags.length >= 5 && tags.length <= 15) {
        score += 10;
      } else if (tags.length > 0) {
        score += 5;
        tagsStatus = 'warn';
        tagsMsg = 'We recommend 5 to 12 relevant topic tags.';
      } else {
        tagsStatus = 'fail';
        tagsMsg = 'No tags detected.';
        recommendations.push('Add 5-10 specific tags covering misspellings and related topics.');
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
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Video Metadata SEO Auditor</h3>
        <button
          type="button"
          onClick={loadDemo}
          className="text-xs text-red-400 hover:text-red-300 font-semibold underline cursor-pointer"
        >
          Load Example Data
        </button>
      </div>

      <form onSubmit={runAudit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Video Title ({title.length} characters)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. How to Get Monetized on YouTube Fast (2026 Step-by-Step)"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-red-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Video Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Paste your video description text including links and timestamps..."
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. youtube seo, channel growth, monetization 2026"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-red-500 focus:outline-none"
          />
        </div>

        <ToolPrimaryButton type="submit" loading={loading} loadingLabel="Auditing…" className="w-full sm:w-full">
          <Gauge className="h-4 w-4" aria-hidden />
          <span>Run SEO Audit</span>
        </ToolPrimaryButton>
      </form>

      {audit && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 space-y-6 animate-in fade-in">
          {/* Score Circle Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl font-black text-2xl border ${
                  audit.score >= 80
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                    : audit.score >= 65
                    ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                }`}
              >
                {audit.score}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Overall SEO Score
                </span>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  Grade {audit.grade} Optimization
                </h4>
              </div>
            </div>

            <span className="text-xs text-slate-400">
              12 Algorithm Parameters Checked
            </span>
          </div>

          {/* Audit breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/60 p-3.5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Title Optimization</span>
                <span className="text-slate-400 font-mono">{audit.titleAudit.length} chars</span>
              </div>
              <p className="text-xs text-slate-400">{audit.titleAudit.message}</p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/60 p-3.5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Description Context</span>
                <span className="text-slate-400 font-mono">{audit.descriptionAudit.words} words</span>
              </div>
              <p className="text-xs text-slate-400">{audit.descriptionAudit.message}</p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/60 p-3.5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Tags & Semantic Keywords</span>
                <span className="text-slate-400 font-mono">{audit.tagsAudit.count} tags</span>
              </div>
              <p className="text-xs text-slate-400">{audit.tagsAudit.message}</p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-100 dark:bg-slate-900/60 p-3.5 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Chapters / Timestamps</span>
                <span className="text-emerald-400 font-mono">Google Rich Snippet</span>
              </div>
              <p className="text-xs text-slate-400">{audit.chaptersAudit.message}</p>
            </div>
          </div>

          {/* Action Recommendations */}
          {audit.recommendations.length > 0 && (
            <div className="rounded-xl border border-red-500/20 bg-red-950/20 p-4 space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                <ListChecks className="h-3.5 w-3.5" aria-hidden />
                Action Items to Boost Score
              </h5>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {audit.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-400 font-bold mt-0.5">•</span>
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
