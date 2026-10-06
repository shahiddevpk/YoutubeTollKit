'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NAV_TOOLS, TOTAL_TOOLS_COUNT } from '@/lib/nav-tools';
import { Search, Sparkles, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTools = searchQuery.trim()
    ? NAV_TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#e5e5e5] dark:border-[#272727] bg-white/92 dark:bg-[#12161d]/92 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-9 items-center justify-center rounded-xl bg-[#ff0000] text-white shadow-sm group-hover:bg-[#cc0000] transition-colors">
              <span className="font-black text-xs leading-none">▶</span>
            </div>
            <span className="text-base font-bold tracking-tight text-[#0f0f0f] dark:text-[#f1f1f1]">
              YouTube<span className="text-[#ff0000]">Free</span>Toolkit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/tools"
              className="text-sm font-medium text-[#606060] hover:text-[#0f0f0f] dark:text-[#aaaaaa] dark:hover:text-[#f1f1f1] transition-colors flex items-center gap-1.5"
            >
              All Tools
              <span className="rounded-full bg-[#ff0000]/10 px-2 py-0.5 text-xs font-semibold text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20">
                {TOTAL_TOOLS_COUNT}
              </span>
            </Link>

            <Link
              href="/tools/monetization-checker"
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Monetization Checker
            </Link>

            <Link
              href="/tools/channel-id-finder"
              className="text-sm font-medium text-[#606060] hover:text-[#0f0f0f] dark:text-[#aaaaaa] dark:hover:text-[#f1f1f1] transition-colors"
            >
              Channel ID
            </Link>

            <Link
              href="/tools/tag-extractor"
              className="text-sm font-medium text-[#606060] hover:text-[#0f0f0f] dark:text-[#aaaaaa] dark:hover:text-[#f1f1f1] transition-colors"
            >
              Tag Extractor
            </Link>

            <Link
              href="/tools/earnings-calculator"
              className="text-sm font-medium text-[#606060] hover:text-[#0f0f0f] dark:text-[#aaaaaa] dark:hover:text-[#f1f1f1] transition-colors"
            >
              Earnings Calc
            </Link>
          </nav>

          {/* Search Trigger & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-[#f2f2f2] dark:bg-[#1f1f1f] px-3.5 py-1.5 text-xs sm:text-sm text-[#606060] dark:text-[#aaaaaa] hover:border-[#cccccc] dark:hover:border-[#383838] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] transition-colors cursor-pointer"
              aria-label="Search tools"
            >
              <Search className="h-3.5 w-3.5 text-[#909090] dark:text-[#717171]" />
              <span className="hidden sm:inline">Search tools...</span>
              <kbd className="hidden sm:inline-block rounded-full bg-white dark:bg-[#272727] border border-[#e5e5e5] dark:border-[#383838] px-1.5 py-0.2 text-[10px] font-mono text-[#606060] dark:text-[#aaaaaa]">
                /
              </kbd>
            </button>

            <Link
              href="/tools"
              className="hidden lg:inline-flex items-center justify-center rounded-full bg-[#ff0000] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#cc0000] active:bg-[#990000] transition-colors"
            >
              Explore Free Suite
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-2 text-[#606060] dark:text-[#aaaaaa] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#121212] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <div className="px-3 pb-2 flex items-center justify-between border-b border-[#e5e5e5] dark:border-[#272727]">
                <span className="text-xs font-semibold text-[#606060] dark:text-[#aaaaaa]">
                  Appearance
                </span>
                <ThemeToggle />
              </div>
              <Link
                href="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#f2f2f2] dark:hover:bg-[#272727]"
              >
                <span>All Tools Directory</span>
                <span className="rounded-full bg-[#ff0000]/10 px-2 py-0.5 text-xs text-[#ff0000] dark:text-red-400 font-bold border border-[#ff0000]/20">
                  {TOTAL_TOOLS_COUNT}
                </span>
              </Link>
              <Link
                href="/tools/monetization-checker"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-[#f2f2f2] dark:hover:bg-[#272727]"
              >
                <Sparkles className="h-4 w-4" />
                Monetization Checker (Flagship)
              </Link>
              <Link
                href="/tools/channel-id-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#606060] dark:text-[#aaaaaa] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1]"
              >
                Channel ID Finder
              </Link>
              <Link
                href="/tools/tag-extractor"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#606060] dark:text-[#aaaaaa] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1]"
              >
                Tag Extractor
              </Link>
              <Link
                href="/tools/earnings-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#606060] dark:text-[#aaaaaa] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1]"
              >
                Earnings Calculator
              </Link>
              <Link
                href="/tools/seo-score-checker"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-[#606060] dark:text-[#aaaaaa] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1]"
              >
                SEO Score Checker
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-16 sm:pt-20">
          <div className="w-full max-w-2xl rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center border-b border-[#e5e5e5] dark:border-[#272727] px-4 py-3">
              <Search className="h-5 w-5 text-[#ff0000] mr-3 shrink-0" />
              <input
                type="text"
                autoFocus
                aria-label="Search tools"
                placeholder="Search tools (e.g. monetization, tags, channel id, earnings)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#909090] dark:placeholder-[#717171] focus:outline-none text-base"
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="rounded-full p-1.5 text-[#606060] dark:text-[#aaaaaa] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] hover:text-[#0f0f0f] dark:hover:text-[#f1f1f1] cursor-pointer"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {searchQuery.trim() === '' ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#606060] dark:text-[#aaaaaa] mb-3 px-2">
                    Popular Free Tools
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {NAV_TOOLS.slice(0, 6).map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center justify-between p-3 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#222222] hover:border-[#ff0000]/40 hover:bg-[#f2f2f2] dark:hover:bg-[#2a2a2a] transition-all"
                      >
                        <span className="text-sm font-medium text-[#0f0f0f] dark:text-[#f1f1f1]">{tool.name}</span>
                        {tool.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ff0000]/10 text-[#ff0000] dark:text-red-400 border border-[#ff0000]/20">
                            {tool.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="block p-3 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#222222] hover:border-[#ff0000] hover:bg-[#f2f2f2] dark:hover:bg-[#2a2a2a] transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">{tool.name}</span>
                      <span className="text-xs text-[#606060] dark:text-[#aaaaaa] capitalize">{tool.category}</span>
                    </div>
                    <p className="text-xs text-[#606060] dark:text-[#aaaaaa] line-clamp-1 mt-1">{tool.description}</p>
                  </Link>
                ))
              ) : (
                <div className="py-8 text-center text-[#606060] dark:text-[#aaaaaa]">
                  <p>No tools found matching &quot;{searchQuery}&quot;</p>
                  <Link
                    href="/tools"
                    onClick={() => setSearchOpen(false)}
                    className="mt-2 inline-block text-xs text-[#ff0000] dark:text-red-400 underline"
                  >
                    View all {TOTAL_TOOLS_COUNT} tools in index
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
