'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, ExternalLink, RefreshCw } from 'lucide-react';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { toolFormRowClass, toolInputClass } from '@/lib/tool-ui';

type Style = 'brandable' | 'personal' | 'descriptive' | 'playful';

const STYLE_WORDS: Record<Style, { prefixes: string[]; suffixes: string[] }> = {
  brandable: { prefixes: ['Nova', 'Prime', 'Apex', 'Echo', 'Pixel', 'Atlas', 'Orbit', 'Vivid'], suffixes: ['Lab', 'Hub', 'HQ', 'Studio', 'Works', 'Craft', 'Forge', 'Base'] },
  personal: { prefixes: ['With', 'Just', 'Simply', 'Daily', 'Real', 'Hey'], suffixes: ['Diaries', 'Life', 'Journal', 'Notes', 'Days', 'Talks'] },
  descriptive: { prefixes: ['Learn', 'Easy', 'Smart', 'Quick', 'Pro', 'Pure', 'Total'], suffixes: ['Guide', 'Academy', 'Explained', 'Tips', 'School', 'Basics', 'Made Simple'] },
  playful: { prefixes: ['Mega', 'Tiny', 'Wild', 'Super', 'Happy', 'Crazy', 'Epic'], suffixes: ['Zone', 'Party', 'Squad', 'Island', 'Planet', 'Gang', 'Show'] },
};

function cap(w: string) {
  return w.charAt(0).toUpperCase() + w.slice(1);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeNames(keywords: string[], name: string, style: Style): string[] {
  const { prefixes, suffixes } = STYLE_WORDS[style];
  const kws = keywords.map(cap);
  const out = new Set<string>();
  for (const k of kws) {
    for (const p of prefixes) out.add(`${p} ${k}`);
    for (const s of suffixes) out.add(`${k} ${s}`);
    if (name) {
      out.add(`${cap(name)} ${k}`);
      out.add(`${k} with ${cap(name)}`);
      out.add(`${cap(name)}'s ${k}`);
    }
  }
  if (kws.length >= 2) out.add(`${kws[0]} & ${kws[1]}`);
  return shuffle([...out]).filter((n) => n.length <= 30).slice(0, 24);
}

/** Rough handle suggestion: YouTube handles are 3–30 chars of letters, digits, ., _, - */
function toHandle(n: string) {
  return '@' + n.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '').slice(0, 30);
}

export function ChannelNameGenerator() {
  const [keywords, setKeywords] = useState('');
  const [name, setName] = useState('');
  const [style, setStyle] = useState<Style>('brandable');
  const [names, setNames] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = (e?: React.FormEvent) => {
    e?.preventDefault();
    const kws = keywords.split(/[,\n]+/).map((k) => k.trim()).filter(Boolean).slice(0, 4);
    if (!kws.length) return;
    setNames(makeNames(kws, name.trim().split(/\s+/)[0] ?? '', style));
  };

  const copy = async (n: string) => {
    await navigator.clipboard.writeText(n);
    setCopied(n);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={generate} className="space-y-3">
        <label htmlFor="cn-keywords" className="block text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          What is your channel about? (1–4 keywords, comma separated)
        </label>
        <div className={toolFormRowClass}>
          <input id="cn-keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g. cooking, budget meals" className={toolInputClass} required />
          <ToolPrimaryButton type="submit">
            <Sparkles className="h-4 w-4" aria-hidden />
            <span>Generate Names</span>
          </ToolPrimaryButton>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="cn-name" className="block text-xs font-semibold text-[#606060] dark:text-[#aaaaaa] mb-1">Your first name (optional)</label>
            <input id="cn-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Sara" className={toolInputClass} />
          </div>
          <div>
            <label htmlFor="cn-style" className="block text-xs font-semibold text-[#606060] dark:text-[#aaaaaa] mb-1">Style</label>
            <select id="cn-style" value={style} onChange={(e) => setStyle(e.target.value as Style)} className={toolInputClass}>
              <option value="brandable">Brandable</option>
              <option value="personal">Personal</option>
              <option value="descriptive">Descriptive (SEO)</option>
              <option value="playful">Playful</option>
            </select>
          </div>
        </div>
      </form>

      {names.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">{names.length} name ideas</p>
            <button type="button" onClick={() => generate()} className="inline-flex items-center gap-1 text-xs font-semibold text-[#ff0000] dark:text-red-400">
              <RefreshCw className="h-3.5 w-3.5" /> Shuffle
            </button>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {names.map((n) => {
              const handle = toHandle(n);
              return (
                <li key={n} className="flex items-center justify-between gap-2 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] truncate">{n}</p>
                    <p className="text-[11px] font-mono text-[#606060] dark:text-[#aaaaaa] truncate">{handle}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button type="button" onClick={() => copy(n)} aria-label={`Copy ${n}`} className="p-1.5 text-[#606060] hover:text-[#ff0000]">
                      {copied === n ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <a href={`https://www.youtube.com/${handle}`} target="_blank" rel="noopener noreferrer" aria-label={`Check if ${handle} is taken on YouTube`} title="Check if this handle is taken" className="p-1.5 text-[#606060] hover:text-[#ff0000]">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">
            The link opens youtube.com/@handle: a “page isn’t available” message usually means the handle is free. Confirm in YouTube Studio → Customization → Basic info, which checks availability as you type.
          </p>
        </div>
      )}
    </div>
  );
}
