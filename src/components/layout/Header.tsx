'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NAV_TOOLS, TOTAL_TOOLS_COUNT } from '@/lib/nav-tools';
import { Search, Sparkles, Menu, X } from 'lucide-react';

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
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-sm">
        <div className="mx-auto flex h-15 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm group-hover:bg-red-500 transition-colors">
              <span className="font-black text-sm">▶</span>
            </div>
            <span className="text-base font-bold tracking-tight text-white group-hover:text-red-400 transition-colors">
              YouTube<span className="text-red-500">Free</span>Toolkit
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/tools"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              All Tools
              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-400 border border-red-500/20">
                {TOTAL_TOOLS_COUNT}
              </span>
            </Link>

            <Link
              href="/tools/monetization-checker"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Monetization Checker
            </Link>

            <Link
              href="/tools/channel-id-finder"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Channel ID
            </Link>

            <Link
              href="/tools/tag-extractor"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Tag Extractor
            </Link>

            <Link
              href="/tools/earnings-calculator"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Earnings Calc
            </Link>
          </nav>

          {/* Search Trigger & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 text-sm text-slate-400 hover:border-slate-700 hover:text-slate-200 transition-all shadow-inner"
              aria-label="Search tools"
            >
              <Search className="h-4 w-4 text-slate-400" />
              <span className="hidden sm:inline">Search tools...</span>
              <kbd className="hidden sm:inline-block rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
                /
              </kbd>
            </button>

            <Link
              href="/tools"
              className="hidden lg:inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-red-600/30 hover:bg-red-500 transition-all"
            >
              Explore Free Suite
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="border-b border-slate-800 bg-slate-950 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <Link
                href="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900"
              >
                <span>All Tools Directory</span>
                <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-400 font-bold">
                  {TOTAL_TOOLS_COUNT}
                </span>
              </Link>
              <Link
                href="/tools/monetization-checker"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-emerald-400 hover:bg-slate-900"
              >
                <Sparkles className="h-4 w-4" />
                Monetization Checker (Flagship)
              </Link>
              <Link
                href="/tools/channel-id-finder"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-900"
              >
                Channel ID Finder
              </Link>
              <Link
                href="/tools/tag-extractor"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-900"
              >
                Tag Extractor
              </Link>
              <Link
                href="/tools/earnings-calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-900"
              >
                Earnings Calculator
              </Link>
              <Link
                href="/tools/seo-score-checker"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-900"
              >
                SEO Score Checker
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 pt-20">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
            <div className="flex items-center border-b border-slate-800 px-4 py-3">
              <Search className="h-5 w-5 text-red-500 mr-3 shrink-0" />
              <input
                type="text"
                autoFocus
                aria-label="Search tools"
                placeholder="Search tools (e.g. monetization, tags, channel id, earnings)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-base"
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-4 space-y-2">
              {searchQuery.trim() === '' ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 px-2">
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
                        className="flex items-center justify-between p-2.5 rounded-lg border border-slate-800/80 bg-slate-950/60 hover:border-red-500/40 hover:bg-slate-800/50 transition-all"
                      >
                        <span className="text-sm font-medium text-slate-200">{tool.name}</span>
                        {tool.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">
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
                    className="block p-3 rounded-lg border border-slate-800 bg-slate-950/70 hover:border-red-500 hover:bg-slate-800/70 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{tool.name}</span>
                      <span className="text-xs text-slate-400 capitalize">{tool.category}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1">{tool.description}</p>
                  </Link>
                ))
              ) : (
                <div className="py-8 text-center text-slate-400">
                  <p>No tools found matching &quot;{searchQuery}&quot;</p>
                  <Link
                    href="/tools"
                    onClick={() => setSearchOpen(false)}
                    className="mt-2 inline-block text-xs text-red-400 underline"
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
