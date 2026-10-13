'use client';

import React, { useState } from 'react';
import { ExternalLink, ClipboardCheck, Clipboard } from 'lucide-react';

interface Converter {
  name: string;
  desc: string;
  href: string;
}

interface ConverterCTAProps {
  converters: Converter[];
  placeholder?: string;
}

export function ConverterCTA({ converters, placeholder = 'Paste YouTube URL here…' }: ConverterCTAProps) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const handleOpen = async (converter: Converter) => {
    const target = url.trim();
    if (target) {
      try {
        await navigator.clipboard.writeText(target);
        setCopied(converter.name);
        setTimeout(() => setCopied(null), 3000);
      } catch {
        // clipboard not available — still open the site
      }
    }
    window.open(converter.href, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-6 sm:p-8 space-y-5">
      {/* Step 1 — URL input */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          Step 1 — Paste your YouTube URL
        </p>
        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#0f0f0f] px-4 py-3 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder:text-[#909090] focus:border-[#ff0000] focus:outline-none transition-colors"
          />
          {url.trim() && (
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(url.trim());
                setCopied('__input__');
                setTimeout(() => setCopied(null), 2000);
              }}
              className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-3 text-[#606060] dark:text-[#aaaaaa] hover:text-[#ff0000] transition-colors"
              title="Copy URL"
            >
              {copied === '__input__'
                ? <ClipboardCheck className="h-4 w-4 text-emerald-500" />
                : <Clipboard className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Step 2 — Converter cards */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          Step 2 — Open a free converter
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {converters.map((c) => (
            <button
              key={c.name}
              onClick={() => handleOpen(c)}
              className="flex flex-col items-center gap-1 rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#0f0f0f] px-4 py-3.5 hover:border-[#ff0000]/50 hover:shadow-sm transition-all text-left cursor-pointer"
            >
              <span className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{c.name}</span>
              <span className="text-[11px] text-[#909090] dark:text-[#717171]">{c.desc}</span>
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#ff0000]">
                {copied === c.name ? (
                  <>
                    <ClipboardCheck className="h-3 w-3 text-emerald-500" />
                    <span className="text-emerald-500">URL copied — paste there</span>
                  </>
                ) : (
                  <>
                    Open free <ExternalLink className="h-3 w-3" />
                  </>
                )}
              </span>
            </button>
          ))}
        </div>

        {copied && copied !== '__input__' && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 text-center font-medium">
            ✓ URL copied to clipboard — just paste it into {copied}
          </p>
        )}

        <p className="text-xs text-[#909090] dark:text-[#717171] text-center">
          All three are free, browser-based, no signup required.
        </p>
      </div>
    </div>
  );
}
