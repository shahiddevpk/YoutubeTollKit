'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Copy, Check } from 'lucide-react';
import { toolInputClass, toolSecondaryButtonClass } from '@/lib/tool-ui';

type Template = 'tutorial' | 'review' | 'vlog' | 'shorts' | 'podcast';

const TEMPLATES: Record<Template, { label: string; hook: (t: string, k: string) => string; body: (t: string, k: string) => string }> = {
  tutorial: {
    label: 'Tutorial / How-to',
    hook: (t, k) => `Learn ${k || t} step by step — no experience needed.`,
    body: (t) => `In this video I walk you through ${t.toLowerCase()} from start to finish, including the mistakes most beginners make and how to avoid them.`,
  },
  review: {
    label: 'Product review',
    hook: (t, k) => `Is ${k || t} worth it? My honest review after real-world use.`,
    body: () => `I cover build quality, performance, what I liked, what I didn't, and who should (and shouldn't) buy it.`,
  },
  vlog: {
    label: 'Vlog / story',
    hook: (t) => `${t} — come along for the whole day.`,
    body: () => `Here's everything that happened, the highlights, and what I'd do differently next time.`,
  },
  shorts: {
    label: 'Shorts',
    hook: (t, k) => `${t}${k ? ` #${k.replace(/\s+/g, '')}` : ''}`,
    body: () => '',
  },
  podcast: {
    label: 'Podcast / interview',
    hook: (t, k) => `${t}: a conversation about ${k || 'what really works'}.`,
    body: () => `We talk about the lessons learned, the biggest misconceptions, and practical advice you can use today.`,
  },
};

const LIMIT = 5000;
const FOLD = 157; // approx. characters visible before "...more" in search/desktop

export function DescriptionGenerator() {
  const [template, setTemplate] = useState<Template>('tutorial');
  const [title, setTitle] = useState('');
  const [keyword, setKeyword] = useState('');
  const [chapters, setChapters] = useState('0:00 Intro\n');
  const [links, setLinks] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [cta, setCta] = useState(true);
  const [disclosure, setDisclosure] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    const t = title.trim() || 'Your video title';
    const k = keyword.trim();
    const tpl = TEMPLATES[template];
    const parts: string[] = [tpl.hook(t, k)];
    const body = tpl.body(t, k);
    if (body) parts.push(body);
    if (template !== 'shorts' && chapters.trim()) parts.push(`⏱️ Chapters\n${chapters.trim()}`);
    if (links.trim()) parts.push(`🔗 Links mentioned\n${links.trim().split('\n').map((l) => l.trim()).filter(Boolean).join('\n')}`);
    if (cta && template !== 'shorts') parts.push('👍 If this helped, subscribe for more and tell me in the comments what you want to see next.');
    if (disclosure) parts.push('Disclosure: some links above are affiliate links. I may earn a small commission at no extra cost to you.');
    const tags = hashtags
      .split(/[\s,]+/)
      .map((h) => h.replace(/^#*/, '').trim())
      .filter(Boolean)
      .slice(0, 5)
      .map((h) => `#${h}`)
      .join(' ');
    if (tags && template !== 'shorts') parts.push(tags);
    return parts.join('\n\n');
  }, [template, title, keyword, chapters, links, hashtags, cta, disclosure]);

  const checks = [
    { ok: !keyword.trim() || output.slice(0, FOLD).toLowerCase().includes(keyword.trim().toLowerCase()), text: 'Main keyword appears before the “…more” cut-off' },
    { ok: template === 'shorts' || /^0:00\b/m.test(chapters), text: 'Chapters start at 0:00 (required for YouTube chapters)' },
    { ok: (output.match(/#\w+/g) ?? []).length <= 60, text: 'Fewer than 60 hashtags (above that YouTube ignores them all)' },
    { ok: output.length <= LIMIT, text: `Under ${LIMIT.toLocaleString()} characters` },
    { ok: !/[<>]/.test(output), text: 'No < or > characters (YouTube rejects them)' },
  ];

  const copy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const label = 'block text-xs font-bold uppercase tracking-wider text-[#0f0f0f] dark:text-[#f1f1f1] mb-1.5';

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <div>
          <span className={label}>Template</span>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Description template">
            {(Object.keys(TEMPLATES) as Template[]).map((k) => (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={template === k}
                onClick={() => setTemplate(k)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold border ${template === k ? 'bg-[#d40000] border-[#ff0000] text-white' : 'border-[#e5e5e5] dark:border-[#272727] text-[#0f0f0f] dark:text-[#f1f1f1]'}`}
              >
                {TEMPLATES[k].label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="dg-title" className={label}>Video title</label>
          <input id="dg-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. How to Edit Videos on Your Phone" className={toolInputClass} />
        </div>
        <div>
          <label htmlFor="dg-keyword" className={label}>Main keyword</label>
          <input id="dg-keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. edit videos on phone" className={toolInputClass} />
        </div>
        {template !== 'shorts' && (
          <div>
            <label htmlFor="dg-chapters" className={label}>Chapters (one per line)</label>
            <textarea id="dg-chapters" rows={4} value={chapters} onChange={(e) => setChapters(e.target.value)} className={`${toolInputClass} font-mono text-xs`} />
          </div>
        )}
        <div>
          <label htmlFor="dg-links" className={label}>Links (one per line, optional)</label>
          <textarea id="dg-links" rows={3} value={links} onChange={(e) => setLinks(e.target.value)} placeholder="Gear: https://…" className={`${toolInputClass} text-xs`} />
        </div>
        <div>
          <label htmlFor="dg-hashtags" className={label}>Hashtags (up to 5 used)</label>
          <input id="dg-hashtags" value={hashtags} onChange={(e) => setHashtags(e.target.value)} placeholder="videoediting, tutorial" className={toolInputClass} />
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-[#0f0f0f] dark:text-[#f1f1f1]">
          <label className="flex items-center gap-2"><input type="checkbox" checked={cta} onChange={(e) => setCta(e.target.checked)} className="accent-[#ff0000]" /> Subscribe call-to-action</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={disclosure} onChange={(e) => setDisclosure(e.target.checked)} className="accent-[#ff0000]" /> Affiliate disclosure</label>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={label}>Your description</span>
          <span className="text-xs text-[#606060] dark:text-[#aaaaaa]">{output.length.toLocaleString()} / {LIMIT.toLocaleString()}</span>
        </div>
        <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#0f0f0f] p-4 text-sm whitespace-pre-wrap text-[#0f0f0f] dark:text-[#f1f1f1] min-h-48" aria-live="polite">
          <span className="bg-amber-200/60 dark:bg-amber-500/20">{output.slice(0, FOLD)}</span>
          {output.slice(FOLD)}
        </div>
        <p className="text-[11px] text-[#606060] dark:text-[#a0a0a0]">Highlighted text is roughly what viewers see before “…more”.</p>
        <button type="button" onClick={copy} className={toolSecondaryButtonClass}>
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />} {copied ? 'Copied' : 'Copy description'}
        </button>
        <ul className="space-y-1 text-xs">
          {checks.map((c) => (
            <li key={c.text} className={c.ok ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}>
              {c.ok ? '✓' : '✗'} {c.text}
            </li>
          ))}
        </ul>
        <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">
          Validate your chapter list with the <Link href="/tools/timestamp-validator" className="text-[#cc0000] dark:text-red-400 hover:underline">Timestamp Validator</Link> and pick hashtags with the{' '}
          <Link href="/tools/hashtag-generator" className="text-[#cc0000] dark:text-red-400 hover:underline">Hashtag Generator</Link>.
        </p>
      </div>
    </div>
  );
}
