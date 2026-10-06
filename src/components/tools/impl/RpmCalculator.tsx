'use client';

import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { ToolEstimateNotice } from '@/components/ui/ToolEstimateNotice';

export function RpmCalculator() {
  const [earnings, setEarnings] = useState<number>(450);
  const [views, setViews] = useState<number>(100000);

  const rpm = views > 0 ? (earnings / views) * 1000 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Total Estimated YouTube Earnings ($ USD)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-400" />
            <input
              type="number"
              min="1"
              value={earnings}
              onChange={(e) => setEarnings(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 pl-9 pr-4 py-2.5 text-sm font-mono text-slate-900 dark:text-white focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Total Video Views in That Period
          </label>
          <input
            type="number"
            min="100"
            value={views}
            onChange={(e) => setViews(Number(e.target.value))}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-white focus:border-red-500 focus:outline-none"
          />
        </div>
      </div>

      {/* RPM Result Display */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs uppercase tracking-wider font-bold text-slate-400">
            Calculated YouTube RPM
          </span>
          <div className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono">
            ${rpm.toFixed(2)}
            <span className="text-sm font-medium text-slate-400 ml-1">/ 1,000 views</span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/70 p-4 text-xs space-y-1.5 w-full sm:w-auto">
          <div className="flex justify-between gap-6">
            <span className="text-slate-400">Projected at 100K views:</span>
            <strong className="text-slate-900 dark:text-white font-mono">{formatCurrency(rpm * 100)}</strong>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-slate-400">Projected at 500K views:</span>
            <strong className="text-slate-900 dark:text-white font-mono">{formatCurrency(rpm * 500)}</strong>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-slate-400">Projected at 1M views:</span>
            <strong className="text-emerald-400 font-mono">{formatCurrency(rpm * 1000)}</strong>
          </div>
        </div>
      </div>

      <ToolEstimateNotice>
        Illustrative math only. Real RPM depends on niche, audience location, content type, seasonality, and
        monetized playbacks—confirm figures in YouTube Studio when you own the channel.
      </ToolEstimateNotice>
    </div>
  );
}
