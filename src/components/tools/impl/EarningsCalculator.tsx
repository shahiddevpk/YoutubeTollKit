'use client';

import React, { useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { DollarSign } from 'lucide-react';

const NICHES = [
  { name: 'Finance, Investing & Crypto', rpm: 14.5 },
  { name: 'Technology & Software', rpm: 9.0 },
  { name: 'E-commerce & Business', rpm: 11.2 },
  { name: 'Health & Fitness', rpm: 6.5 },
  { name: 'Education & Tutorials', rpm: 5.5 },
  { name: 'Lifestyle & Vlogs', rpm: 3.2 },
  { name: 'Gaming & Streaming', rpm: 2.8 },
  { name: 'Entertainment & Comedy', rpm: 2.5 },
  { name: 'Music & Dance', rpm: 1.8 },
];

export function EarningsCalculator() {
  const [dailyViews, setDailyViews] = useState<number>(25000);
  const [selectedRpm, setSelectedRpm] = useState<number>(6.5);

  const dailyEarnings = (dailyViews / 1000) * selectedRpm;
  const monthlyEarnings = dailyEarnings * 30;
  const yearlyEarnings = dailyEarnings * 365;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls Column */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-white">Daily Expected Video Views</label>
              <span className="text-base font-black text-red-400 font-mono">
                {dailyViews.toLocaleString()} views/day
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="1000000"
              step="1000"
              value={dailyViews}
              onChange={(e) => setDailyViews(Number(e.target.value))}
              className="w-full accent-red-600 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>1K/day</span>
              <span>100K/day</span>
              <span>1M+/day</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Choose an Illustrative RPM Assumption
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {NICHES.map((niche) => {
                const isSelected = selectedRpm === niche.rpm;
                return (
                  <button
                    key={niche.name}
                    type="button"
                    onClick={() => setSelectedRpm(niche.rpm)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-red-500 bg-red-600/15 text-white shadow-md shadow-red-500/10'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="truncate pr-2">{niche.name}</span>
                    <span className="text-emerald-400 font-mono shrink-0">${niche.rpm.toFixed(1)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-white">Custom RPM Value ($ per 1,000 views)</label>
              <span className="text-sm font-mono text-emerald-400 font-bold">${selectedRpm.toFixed(2)}</span>
            </div>
            <input
              type="number"
              step="0.1"
              min="0.5"
              max="50"
              value={selectedRpm}
              onChange={(e) => setSelectedRpm(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white font-mono focus:border-red-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Output Projected Earnings Column */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                Revenue Scenario
              </h3>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400 border border-emerald-500/20">
                Uses your RPM input
              </span>
            </div>

            <div className="space-y-4 mt-6">
              {/* Daily */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Daily Revenue</span>
                  <p className="text-xs text-slate-500">{formatNumber(dailyViews)} views</p>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {formatCurrency(dailyEarnings)}
                </div>
              </div>

              {/* Monthly */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-400 uppercase font-semibold">Monthly Revenue</span>
                  <p className="text-xs text-slate-400">{formatNumber(dailyViews * 30)} views</p>
                </div>
                <div className="text-3xl font-black text-emerald-400 font-mono">
                  {formatCurrency(monthlyEarnings)}
                </div>
              </div>

              {/* Yearly */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/70 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 uppercase font-semibold">Annual Projected</span>
                  <p className="text-xs text-slate-500">{formatNumber(dailyViews * 365)} views</p>
                </div>
                <div className="text-2xl font-black text-slate-200 font-mono">
                  {formatCurrency(yearlyEarnings)}
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center">
            *Planning scenario only. RPM varies by channel, audience, content, geography, season, ad demand, and monetized playbacks. Use your own YouTube Studio RPM for the most relevant estimate.
          </p>
        </div>
      </div>
    </div>
  );
}
