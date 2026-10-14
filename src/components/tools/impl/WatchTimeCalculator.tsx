'use client';

import React, { useState, useMemo } from 'react';
import { Clock, TrendingUp, Target, Lightbulb } from 'lucide-react';

function formatDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + Math.ceil(daysFromNow));
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const TIPS = [
  'Upload longer videos (8+ min) to earn more watch time per view',
  'Create playlists — they auto-play and stack watch hours',
  'Add end screens linking to older videos to extend session watch time',
  'Embed YouTube videos on your website or blog posts',
  'Improve your first 30 seconds to reduce early drop-offs',
  'Promote older evergreen videos in your new video descriptions',
  'Go live — live stream watch time counts toward the 4,000-hour goal',
];

export function WatchTimeCalculator() {
  const [currentHours, setCurrentHours] = useState('');
  const [dailyHours, setDailyHours] = useState('');

  const result = useMemo(() => {
    const current = parseFloat(currentHours) || 0;
    const daily = parseFloat(dailyHours) || 0;
    const target = 4000;
    const remaining = Math.max(0, target - current);
    const progressPct = Math.min(100, (current / target) * 100);

    if (daily <= 0) return { remaining, progressPct, days: null, date: null, scenarios: [] };

    const days = remaining / daily;
    const date = formatDate(days);

    const scenarios = [
      { label: 'Conservative (×0.5)', days: days / 0.5, daily: daily * 0.5 },
      { label: 'Current rate', days, daily },
      { label: 'Optimistic (×2)', days: days / 2, daily: daily * 2 },
    ];

    return { remaining, progressPct, days, date, scenarios };
  }, [currentHours, dailyHours]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#606060] dark:text-[#aaaaaa] uppercase tracking-wide">
            Current Watch Hours
          </label>
          <input
            type="number"
            min="0"
            max="4000"
            placeholder="e.g. 1250"
            value={currentHours}
            onChange={(e) => setCurrentHours(e.target.value)}
            className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-4 py-3 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder:text-[#606060] focus:border-[#ff0000] focus:outline-none"
          />
          <p className="text-[11px] text-[#606060] dark:text-[#a0a0a0]">
            Find in YouTube Studio → Analytics → Watch Time (last 365 days)
          </p>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#606060] dark:text-[#aaaaaa] uppercase tracking-wide">
            Average Daily Watch Hours Earned
          </label>
          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="e.g. 8.5"
            value={dailyHours}
            onChange={(e) => setDailyHours(e.target.value)}
            className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-4 py-3 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder:text-[#606060] focus:border-[#ff0000] focus:outline-none"
          />
          <p className="text-[11px] text-[#606060] dark:text-[#a0a0a0]">
            Check YouTube Studio → Analytics → 28-day Watch Time ÷ 28
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-[#ff0000]" />
            <span className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
              YPP Watch Hour Progress
            </span>
          </div>
          <span className="text-sm font-black text-[#ff0000]">
            {result.progressPct.toFixed(1)}%
          </span>
        </div>

        <div className="h-3 rounded-full bg-[#e5e5e5] dark:bg-[#272727] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#ff0000] transition-all duration-500"
            style={{ width: `${result.progressPct}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-black text-[#ff0000]">
              {parseFloat(currentHours) || 0}h
            </p>
            <p className="text-[11px] text-[#606060] dark:text-[#a0a0a0]">Current</p>
          </div>
          <div>
            <p className="text-lg font-black text-[#0f0f0f] dark:text-[#f1f1f1]">
              {result.remaining.toFixed(0)}h
            </p>
            <p className="text-[11px] text-[#606060] dark:text-[#a0a0a0]">Remaining</p>
          </div>
          <div>
            <p className="text-lg font-black text-emerald-500">4,000h</p>
            <p className="text-[11px] text-[#606060] dark:text-[#a0a0a0]">YPP Goal</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {result.days !== null && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#ff0000]" />
            <span className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
              Timeline Scenarios
            </span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {result.scenarios.map(({ label, days: scenarioDays, daily: scenarioDaily }) => (
              <div
                key={label}
                className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 space-y-2 text-center"
              >
                <p className="text-xs font-semibold text-[#606060] dark:text-[#aaaaaa]">{label}</p>
                <p className="text-xl font-black text-[#0f0f0f] dark:text-[#f1f1f1]">
                  {scenarioDays < 1 ? '< 1 day' : `${Math.ceil(scenarioDays)} days`}
                </p>
                <p className="text-[11px] text-[#606060] dark:text-[#a0a0a0]">
                  {scenarioDaily.toFixed(1)}h/day · {formatDate(scenarioDays)}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center">
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              At your current rate of{' '}
              <strong>{parseFloat(dailyHours).toFixed(1)}h/day</strong>, you&apos;ll reach 4,000
              hours on{' '}
              <strong>{result.date}</strong>
            </p>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-5 space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[#ff0000]" />
          <span className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">
            Tips to Reach 4,000 Hours Faster
          </span>
        </div>
        <ul className="space-y-2">
          {TIPS.map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-xs text-[#606060] dark:text-[#aaaaaa]">
              <Lightbulb className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">
        Only public video watch time from the last 12 months counts toward YPP. Shorts and private
        video watch time are excluded.
      </p>
    </div>
  );
}
