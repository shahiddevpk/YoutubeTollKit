'use client';

import React from 'react';
import { CATEGORIES } from '@/lib/tools-registry';
import { ToolCategory } from '@/types/tools';
import { Layers } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: ToolCategory | 'all';
  onSelectCategory: (category: ToolCategory | 'all') => void;
  totalCount?: number;
}

export function CategoryNav({ activeCategory, onSelectCategory, totalCount }: CategoryNavProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 pb-1">
      <button
        onClick={() => onSelectCategory('all')}
        className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
          activeCategory === 'all'
            ? 'bg-[#ff0000] text-white shadow-sm'
            : 'bg-[#f2f2f2] dark:bg-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#e5e5e5] dark:hover:bg-[#383838]'
        }`}
      >
        <Layers className="h-3.5 w-3.5" />
        <span>All Tools</span>
        {totalCount !== undefined && (
          <span
            className={`rounded-full px-2 py-0.2 text-[11px] font-semibold ${
              activeCategory === 'all'
                ? 'bg-white/20 text-white'
                : 'bg-[#e5e5e5] dark:bg-[#383838] text-[#606060] dark:text-[#aaaaaa]'
            }`}
          >
            {totalCount}
          </span>
        )}
      </button>

      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
              isActive
                ? 'bg-[#ff0000] text-white shadow-sm'
                : 'bg-[#f2f2f2] dark:bg-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#e5e5e5] dark:hover:bg-[#383838]'
            }`}
          >
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
