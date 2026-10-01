'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ToolDefinition, CategoryDefinition, ToolCategory } from '@/types/tools';
import { ToolCard } from '@/components/tools/ToolCard';
import { CategoryNav } from '@/components/tools/CategoryNav';
import { Search } from 'lucide-react';

interface ToolsExplorerClientProps {
  initialTools: ToolDefinition[];
  categories: CategoryDefinition[];
}

export function ToolsExplorerClient({ initialTools }: ToolsExplorerClientProps) {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [draftSearchQuery, setDraftSearchQuery] = useState('');
  const urlSearchQuery = searchParams.get('q')?.trim() ?? '';
  const searchQuery = urlSearchQuery || draftSearchQuery;

  const filteredTools = useMemo(() => {
    return initialTools.filter((tool) => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.secondaryKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [initialTools, selectedCategory, searchQuery]);

  const clearSearch = () => {
    setDraftSearchQuery('');
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <CategoryNav
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          totalCount={initialTools.length}
        />

        <div className="relative min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setDraftSearchQuery(e.target.value)}
            placeholder="Filter tools by keyword..."
            className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Showing <strong className="text-white">{filteredTools.length}</strong> tools
          {selectedCategory !== 'all' && (
            <span> in <strong className="text-red-400 capitalize">{selectedCategory}</strong></span>
          )}
        </span>
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="text-red-400 hover:text-red-300 underline"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <p className="text-base font-semibold text-slate-300">No tools found</p>
          <p className="mt-1 text-xs text-slate-500">
            Try adjusting your search query or choosing another category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              clearSearch();
            }}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
