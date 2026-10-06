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
          <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
            Total Estimated YouTube Earnings ($ USD)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <input
              type="number"
              min="1"
              value={earnings}
              onChange={(e) => setEarnings(Number(e.target.value))}
              className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] pl-9 pr-4 py-2.5 text-sm font-mono text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#0f0f0f] dark:text-[#f1f1f1] uppercase tracking-wider mb-1.5">
            Total Video Views in That Period
          </label>
          <input
            type="number"
            min="100"
            value={views}
            onChange={(e) => setViews(Number(e.target.value))}
            className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-2.5 text-sm font-mono text-[#0f0f0f] dark:text-[#f1f1f1] focus:border-[#ff0000] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* RPM Result Display */}
      <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs uppercase tracking-wider font-bold text-[#606060] dark:text-[#aaaaaa]">
            Calculated YouTube RPM
          </span>
          <div className="text-4xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            ${rpm.toFixed(2)}
            <span className="text-sm font-medium text-[#606060] dark:text-[#aaaaaa] ml-1">/ 1,000 views</span>
          </div>
        </div>

        <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 text-xs space-y-2 w-full sm:w-auto shadow-sm">
          <div className="flex justify-between gap-6">
            <span className="text-[#606060] dark:text-[#aaaaaa]">Projected at 100K views:</span>
            <strong className="text-[#0f0f0f] dark:text-[#f1f1f1] font-mono">{formatCurrency(rpm * 100)}</strong>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-[#606060] dark:text-[#aaaaaa]">Projected at 500K views:</span>
            <strong className="text-[#0f0f0f] dark:text-[#f1f1f1] font-mono">{formatCurrency(rpm * 500)}</strong>
          </div>
          <div className="flex justify-between gap-6">
            <span className="text-[#606060] dark:text-[#aaaaaa]">Projected at 1M views:</span>
            <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{formatCurrency(rpm * 1000)}</strong>
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
