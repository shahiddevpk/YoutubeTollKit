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
    <div className="flex flex-wrap items-center gap-2 pb-2">
      <button
        onClick={() => onSelectCategory('all')}
        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
          activeCategory === 'all'
            ? 'bg-red-600 text-white'
            : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        <Layers className="h-4 w-4" />
        <span>All Tools</span>
        {totalCount !== undefined && (
          <span
            className={`rounded-full px-2 py-0.2 text-[11px] ${
              activeCategory === 'all' ? 'bg-red-700/60 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
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
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
              isActive
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
