import React from 'react';
import Link from 'next/link';
import { ToolDefinition } from '@/types/tools';
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
      className="group flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-slate-600 hover:bg-slate-900"
    >
      <div>
        {/* Top bar with Icon and Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          {tool.badge && (
            <span className={`rounded px-2 py-0.5 text-[10px] font-semibold border ${badgeClass}`}>
              {tool.badge}
            </span>
          )}
          <ArrowUpRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-slate-400 ml-auto" aria-hidden />
        </div>

        <h3 className="text-sm font-semibold text-white group-hover:text-red-400/90 transition-colors">
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
