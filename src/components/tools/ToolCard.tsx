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
    Flagship: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/25',
    Popular: 'bg-red-500/10 text-[#ff0000] dark:text-red-400 border-red-500/25',
    Trending: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/25',
    Essential: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/25',
    'Creator Pick': 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/25',
    New: 'bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-500/25',
  };

  const badgeClass = tool.badge
    ? badgeColors[tool.badge] || 'bg-[#f2f2f2] dark:bg-[#272727] text-[#606060] dark:text-[#aaaaaa] border-[#e5e5e5] dark:border-[#383838]'
    : '';

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-5 transition-all hover:border-[#ff0000]/60 dark:hover:border-[#ff0000]/40 hover:shadow-md hover:-translate-y-0.5"
    >
      <div>
        {/* Top bar with Badge & Arrow */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {tool.badge ? (
            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${badgeClass}`}>
              {tool.badge}
            </span>
          ) : (
            <span />
          )}
          <ArrowUpRight className="h-4 w-4 text-[#909090] dark:text-[#717171] group-hover:text-[#ff0000] dark:group-hover:text-red-400 transition-colors ml-auto" aria-hidden />
        </div>

        <h3 className="text-sm sm:text-base font-bold text-[#0f0f0f] dark:text-[#f1f1f1] group-hover:text-[#ff0000] dark:group-hover:text-red-400 transition-colors">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Footer Category and Free Notice */}
      {!compact && (
        <div className="mt-5 flex items-center justify-between border-t border-[#e5e5e5] dark:border-[#272727] pt-3 text-[11px]">
          <span className="capitalize font-medium text-[#606060] dark:text-[#aaaaaa]">{tool.category}</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Free</span>
        </div>
      )}
    </Link>
  );
}
