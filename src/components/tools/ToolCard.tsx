import React from 'react';
import Link from 'next/link';
import { ToolDefinition } from '@/types/tools';
import { DynamicIcon } from '@/components/tools/DynamicIcon';
import { ArrowUpRight } from 'lucide-react';

interface ToolCardProps {
  tool: ToolDefinition;
  compact?: boolean;
}

export function ToolCard({ tool, compact = false }: ToolCardProps) {
  const badgeColors: Record<string, string> = {
    Flagship: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    Popular: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    Trending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    Essential: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    'Creator Pick': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    New: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
  };

  const badgeClass = tool.badge
    ? badgeColors[tool.badge] || 'bg-slate-800 text-slate-300 border-slate-700'
    : '';

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 transition-all duration-200 hover:border-red-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-0.5"
    >
      <div>
        {/* Top bar with Icon and Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800 text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all shadow-inner">
            <DynamicIcon name={tool.iconName} className="h-5 w-5" />
          </div>

          <div className="flex items-center gap-2">
            {tool.badge && (
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold border ${badgeClass}`}>
                {tool.badge}
              </span>
            )}
            <div className="flex h-7 w-7 items-center justify-center rounded-full text-slate-500 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Footer Category and Free Notice */}
      {!compact && (
        <div className="mt-5 flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-500">
          <span className="capitalize font-medium text-slate-400">{tool.category}</span>
          <span className="font-semibold text-emerald-400">100% Free</span>
        </div>
      )}
    </Link>
  );
}
