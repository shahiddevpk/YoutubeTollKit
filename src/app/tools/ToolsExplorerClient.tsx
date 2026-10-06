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
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-[#e5e5e5] dark:border-[#272727] pb-5">
        <CategoryNav
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          totalCount={initialTools.length}
        />

        <div className="relative min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#909090] dark:text-[#717171]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setDraftSearchQuery(e.target.value)}
            placeholder="Filter tools by keyword..."
            className="w-full rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] pl-10 pr-4 py-2 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#909090] dark:placeholder-[#717171] focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000] transition-colors"
          />
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#606060] dark:text-[#aaaaaa]">
        <span>
          Showing <strong className="text-[#0f0f0f] dark:text-[#f1f1f1]">{filteredTools.length}</strong> tools
          {selectedCategory !== 'all' && (
            <span> in <strong className="text-[#ff0000] dark:text-red-400 capitalize">{selectedCategory}</strong></span>
          )}
        </span>
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="text-[#ff0000] dark:text-red-400 hover:underline cursor-pointer"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] p-12 text-center">
          <p className="text-base font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">No tools found</p>
          <p className="mt-1 text-xs text-[#606060] dark:text-[#aaaaaa]">
            Try adjusting your search query or choosing another category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              clearSearch();
            }}
            className="mt-4 rounded-full bg-[#ff0000] px-5 py-2 text-xs font-semibold text-white hover:bg-[#cc0000] cursor-pointer transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
