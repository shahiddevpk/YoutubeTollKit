'use client';

import React, { useMemo, useState } from 'react';
import Link from '@/components/link';
import { Tags, Copy, Check } from 'lucide-react';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { toolFormRowClass, toolInputClass, toolSecondaryButtonClass } from '@/lib/tool-ui';

interface Suggestion {
  keyword: string;
  score: number;
  sources: number;
}

const TAG_LIMIT = 500;

/** YouTube counts a tag containing spaces as if wrapped in quotes (+2 characters). */
function tagCost(tag: string): number {
  return tag.length + (tag.includes(' ') ? 2 : 0);
}

const REGIONS = [
  ['US', 'United States'],
  ['GB', 'United Kingdom'],
  ['IN', 'India'],
  ['PK', 'Pakistan'],
  ['CA', 'Canada'],
  ['AU', 'Australia'],
  ['BR', 'Brazil'],
  ['DE', 'Germany'],
  ['ID', 'Indonesia'],
] as const;

export function TagGenerator() {
  const [topic, setTopic] = useState('');
  const [gl, setGl] = useState('US');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const used = useMemo(() => selected.reduce((sum, t) => sum + tagCost(t), 0) + Math.max(0, selected.length - 1), [selected]);

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/youtube/suggest?q=${encodeURIComponent(topic.trim())}&gl=${gl}`);
      const body = (await res.json()) as { success: boolean; error?: string; data?: { suggestions: Suggestion[] } };
      if (!body.success || !body.data) {
        setError(body.error ?? 'Could not load suggestions. Try again.');
        return;
      }
      const list = body.data.suggestions;
      setSuggestions(list);
      // Pre-select the strongest tags until ~80% of the budget is used.
      const pre: string[] = [];
      let budget = 0;
      for (const s of list) {
        const cost = tagCost(s.keyword) + (pre.length ? 1 : 0);
        if (budget + cost > TAG_LIMIT * 0.8 || pre.length >= 15) break;
        pre.push(s.keyword);
        budget += cost;
      }
      setSelected(pre);
      if (list.length === 0) setError('YouTube returned no suggestions for this topic. Try a broader phrase.');
    } catch {
      setError('Network error while loading suggestions.');
    } finally {
      setLoading(false);
    }
  };

  const toggle = (tag: string) =>
    setSelected((cur) => (cur.includes(tag) ? cur.filter((t) => t !== tag) : [...cur, tag]));

  const copy = async () => {
    await navigator.clipboard.writeText(selected.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const over = used > TAG_LIMIT;

  return (
    <div className="space-y-6">
      <form onSubmit={generate} className="space-y-3">
        <label htmlFor="tag-topic" className="block text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          Video topic or main keyword
        </label>
        <div className={toolFormRowClass}>
          <input
            id="tag-topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. home workout for beginners"
            className={toolInputClass}
            maxLength={80}
            required
          />
          <select
            aria-label="Search region"
            value={gl}
            onChange={(e) => setGl(e.target.value)}
            className="rounded-xl border border-theme bg-card px-3 py-3 text-sm text-[#0f0f0f] dark:text-[#f1f1f1]"
          >
            {REGIONS.map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          <ToolPrimaryButton type="submit" loading={loading} loadingLabel="Generating…">
            <Tags className="h-4 w-4" aria-hidden />
            <span>Generate Tags</span>
          </ToolPrimaryButton>
        </div>
        <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">
          Ideas come from real YouTube search autocomplete for the selected region, ranked by how often and how high they appear.
        </p>
      </form>

      {error && (
        <p role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-300">
          {error}
        </p>
      )}

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#0f0f0f] dark:text-[#f1f1f1]">{selected.length} tags selected</span>
              <span className={over ? 'text-rose-600 dark:text-rose-400' : 'text-[#606060] dark:text-[#aaaaaa]'}>
                {used} / {TAG_LIMIT} characters
              </span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-[#e5e5e5] dark:bg-[#272727] overflow-hidden" role="progressbar" aria-valuenow={used} aria-valuemin={0} aria-valuemax={TAG_LIMIT} aria-label="Tag character budget">
              <div className={`h-full ${over ? 'bg-rose-500' : 'bg-[#ff0000]'}`} style={{ width: `${Math.min(100, (used / TAG_LIMIT) * 100)}%` }} />
            </div>
            {over && <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">YouTube will reject tags over 500 characters — deselect a few.</p>}
          </div>

          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => {
              const on = selected.includes(s.keyword);
              return (
                <button
                  key={s.keyword}
                  type="button"
                  onClick={() => toggle(s.keyword)}
                  aria-pressed={on}
                  title={`Seen in ${s.sources} suggestion list${s.sources === 1 ? '' : 's'}`}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    on
                      ? 'border-[#ff0000] bg-[#d40000] text-white'
                      : 'border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000]/60'
                  }`}
                >
                  {s.keyword}
                  {s.sources > 1 && <span className="ml-1 opacity-70">×{s.sources}</span>}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={copy} disabled={!selected.length} className={toolSecondaryButtonClass}>
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy selected tags'}
            </button>
            <button type="button" onClick={() => setSelected([])} className={toolSecondaryButtonClass}>
              Clear selection
            </button>
          </div>
          <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">
            Want to see what a ranking video already uses? Check it with the{' '}
            <Link href="/tools/tag-extractor" className="text-[#cc0000] dark:text-red-400 hover:underline">Tag Extractor</Link>, then score your
            draft with the <Link href="/tools/seo-score-checker" className="text-[#cc0000] dark:text-red-400 hover:underline">SEO Score Checker</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
