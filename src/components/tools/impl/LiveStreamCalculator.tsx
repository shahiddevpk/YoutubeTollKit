'use client';

import React, { useState, useMemo } from 'react';
import { Zap, DollarSign, Users, TrendingUp } from 'lucide-react';

function formatUSD(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

const SUPER_CHAT_TIERS = [
  { min: 2, max: 4.99, color: 'bg-sky-400', label: '$2–$5', pct: 55 },
  { min: 5, max: 9.99, color: 'bg-green-400', label: '$5–$10', pct: 25 },
  { min: 10, max: 49.99, color: 'bg-yellow-400', label: '$10–$50', pct: 15 },
  { min: 50, max: 500, color: 'bg-rose-400', label: '$50–$500', pct: 5 },
];

const YOUTUBE_CUT = 0.30;

export function LiveStreamCalculator() {
  const [avgViewers, setAvgViewers] = useState('500');
  const [streamHours, setStreamHours] = useState('2');
  const [superChatRate, setSuperChatRate] = useState('2');
  const [avgSuperChat, setAvgSuperChat] = useState('8');
  const [memberCount, setMemberCount] = useState('50');
  const [memberPrice, setMemberPrice] = useState('4.99');
  const [streamsPerMonth, setStreamsPerMonth] = useState('8');

  const results = useMemo(() => {
    const viewers = parseFloat(avgViewers) || 0;
    const rate = (parseFloat(superChatRate) || 0) / 100;
    const avgSC = parseFloat(avgSuperChat) || 0;
    const members = parseFloat(memberCount) || 0;
    const mPrice = parseFloat(memberPrice) || 0;
    const monthlyStreams = parseFloat(streamsPerMonth) || 0;

    const superChatsPerStream = viewers * rate;
    const grossSCPerStream = superChatsPerStream * avgSC;
    const netSCPerStream = grossSCPerStream * (1 - YOUTUBE_CUT);

    const grossMemberships = members * mPrice;
    const netMemberships = grossMemberships * (1 - YOUTUBE_CUT);

    const netPerStream = netSCPerStream;
    const netMonthly = netPerStream * monthlyStreams + netMemberships;
    const netYearly = netMonthly * 12;

    return {
      superChatsPerStream: Math.round(superChatsPerStream),
      grossSCPerStream,
      netSCPerStream,
      netMemberships,
      netPerStream,
      netMonthly,
      netYearly,
    };
  }, [avgViewers, superChatRate, avgSuperChat, memberCount, memberPrice, streamsPerMonth]);

  const inputCls =
    'w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-4 py-2.5 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder:text-[#606060] focus:border-[#ff0000] focus:outline-none';
  const labelCls =
    'block text-xs font-semibold text-[#606060] dark:text-[#aaaaaa] uppercase tracking-wide mb-1';

  return (
    <div className="space-y-6">
      {/* Input section */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Super Chat inputs */}
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[#ff0000]" />
            <span className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Super Chat Settings</span>
          </div>

          <div>
            <label className={labelCls}>Average Live Viewers</label>
            <input type="number" min="0" className={inputCls} value={avgViewers} onChange={(e) => setAvgViewers(e.target.value)} />
          </div>

          <div>
            <label className={labelCls}>Super Chat Rate (% of viewers)</label>
            <input type="number" min="0" max="100" step="0.1" className={inputCls} value={superChatRate} onChange={(e) => setSuperChatRate(e.target.value)} />
            <p className="text-[11px] text-[#606060] dark:text-[#a0a0a0] mt-1">Industry average: 1–3%</p>
          </div>

          <div>
            <label className={labelCls}>Average Super Chat Value ($)</label>
            <input type="number" min="2" step="0.5" className={inputCls} value={avgSuperChat} onChange={(e) => setAvgSuperChat(e.target.value)} />
          </div>

          <div>
            <label className={labelCls}>Streams Per Month</label>
            <input type="number" min="1" className={inputCls} value={streamsPerMonth} onChange={(e) => setStreamsPerMonth(e.target.value)} />
          </div>
        </div>

        {/* Membership inputs */}
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-violet-500" />
            <span className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Channel Memberships</span>
          </div>

          <div>
            <label className={labelCls}>Number of Members</label>
            <input type="number" min="0" className={inputCls} value={memberCount} onChange={(e) => setMemberCount(e.target.value)} />
          </div>

          <div>
            <label className={labelCls}>Membership Price ($/month)</label>
            <input type="number" min="0.99" step="0.01" className={inputCls} value={memberPrice} onChange={(e) => setMemberPrice(e.target.value)} />
            <p className="text-[11px] text-[#606060] dark:text-[#a0a0a0] mt-1">Minimum: $0.99/month</p>
          </div>

          <div>
            <label className={labelCls}>Stream Duration (hours)</label>
            <input type="number" min="0.5" step="0.5" className={inputCls} value={streamHours} onChange={(e) => setStreamHours(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-5 space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Earnings Estimate</span>
          <span className="ml-auto text-[11px] text-[#606060] dark:text-[#a0a0a0]">After YouTube&apos;s 30% cut</span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 text-center space-y-1">
            <p className="text-2xl font-black text-[#ff0000]">{formatUSD(results.netPerStream)}</p>
            <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">Per Stream (Super Chats)</p>
            <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa]">{results.superChatsPerStream} super chats expected</p>
          </div>

          <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 text-center space-y-1">
            <p className="text-2xl font-black text-emerald-500">{formatUSD(results.netMonthly)}</p>
            <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">Per Month Total</p>
            <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa]">
              SC {formatUSD(results.netSCPerStream * parseFloat(streamsPerMonth) || 0)} + Memberships {formatUSD(results.netMemberships)}
            </p>
          </div>

          <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-4 text-center space-y-1">
            <p className="text-2xl font-black text-violet-500">{formatUSD(results.netYearly)}</p>
            <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">Per Year Projection</p>
            <p className="text-[11px] text-[#606060] dark:text-[#aaaaaa]">Based on current settings</p>
          </div>
        </div>
      </div>

      {/* Super Chat tiers */}
      <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-5 space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[#ff0000]" />
          <span className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Typical Super Chat Distribution</span>
        </div>
        <div className="space-y-2">
          {SUPER_CHAT_TIERS.map(({ label, color, pct }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-[11px] text-[#606060] dark:text-[#aaaaaa]">{label}</span>
              <div className="flex-1 h-2.5 rounded-full bg-[#e5e5e5] dark:bg-[#272727]">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[11px] text-[#606060] dark:text-[#a0a0a0] w-8 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">
        Estimates based on industry averages. Actual earnings vary by audience demographics, niche, and engagement. YouTube takes 30% of Super Chat and Membership revenue.
      </p>
    </div>
  );
}
