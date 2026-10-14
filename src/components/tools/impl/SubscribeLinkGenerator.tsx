'use client';

import React, { useState } from 'react';
import { Link2, Copy, Check, AlertCircle } from 'lucide-react';
import { fetchYouTubeChannel, parseApiJson } from '@/lib/api-client';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { toolFormRowClass, toolInputClass, toolSecondaryButtonClass } from '@/lib/tool-ui';

interface ChannelInfo {
  channelId: string;
  title: string;
  handle?: string;
  avatarUrl?: string;
}

export function SubscribeLinkGenerator() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [channel, setChannel] = useState<ChannelInfo | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setChannel(null);
    try {
      const parsed = await parseApiJson<ChannelInfo>(await fetchYouTubeChannel(input));
      if (parsed.ok) setChannel(parsed.data);
      else setError(parsed.error);
    } catch {
      setError('Could not look up that channel. Check the URL or @handle.');
    } finally {
      setLoading(false);
    }
  };

  const copy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const idLink = channel ? `https://www.youtube.com/channel/${channel.channelId}?sub_confirmation=1` : '';
  const handleLink = channel?.handle ? `https://www.youtube.com/${channel.handle.startsWith('@') ? channel.handle : '@' + channel.handle}?sub_confirmation=1` : '';
  const html = channel
    ? `<a href="${idLink}" target="_blank" rel="noopener" style="display:inline-block;background:#ff0000;color:#fff;padding:10px 18px;border-radius:8px;font-weight:700;text-decoration:none;font-family:sans-serif">Subscribe to ${channel.title.replace(/"/g, '&quot;')}</a>`
    : '';
  const qrSrc = channel ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=8&data=${encodeURIComponent(idLink)}` : '';

  const rows = channel
    ? [
        { key: 'id', label: 'Subscribe link (channel ID — never changes)', value: idLink },
        ...(handleLink ? [{ key: 'handle', label: 'Subscribe link (@handle — easier to read)', value: handleLink }] : []),
        { key: 'html', label: 'HTML button for your website or email signature', value: html },
      ]
    : [];

  return (
    <div className="space-y-6">
      <form onSubmit={generate} className="space-y-3">
        <label htmlFor="sub-channel" className="block text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          Your channel URL, @handle or channel ID
        </label>
        <div className={toolFormRowClass}>
          <input
            id="sub-channel"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. @yourchannel or https://www.youtube.com/@yourchannel"
            className={toolInputClass}
            required
          />
          <ToolPrimaryButton type="submit" loading={loading} loadingLabel="Generating…">
            <Link2 className="h-4 w-4" aria-hidden />
            <span>Create Link</span>
          </ToolPrimaryButton>
        </div>
      </form>

      {error && (
        <div role="alert" className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {channel && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {channel.avatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={channel.avatarUrl} alt="" className="h-10 w-10 rounded-full" loading="lazy" />
            )}
            <p className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">{channel.title}</p>
          </div>
          {rows.map((r) => (
            <div key={r.key} className="space-y-1.5">
              <p className="text-xs font-semibold text-[#606060] dark:text-[#aaaaaa]">{r.label}</p>
              <div className="flex gap-2">
                <input readOnly value={r.value} aria-label={r.label} className={`${toolInputClass} font-mono text-xs`} onFocus={(e) => e.currentTarget.select()} />
                <button type="button" onClick={() => copy(r.key, r.value)} className={toolSecondaryButtonClass}>
                  {copied === r.key ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied === r.key ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          ))}
          <div className="grid gap-4 sm:grid-cols-2 items-start">
            <div className="rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-white p-3 w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrSrc} alt={`QR code that opens the subscribe prompt for ${channel.title}`} width={200} height={200} loading="lazy" />
            </div>
            <div className="text-xs text-[#606060] dark:text-[#aaaaaa] space-y-2">
              <p>Print the QR code on merch, flyers or end slides — scanning it opens your channel with the Subscribe confirmation already showing.</p>
              <a href={idLink} target="_blank" rel="noopener noreferrer" className="inline-block text-[#ff0000] dark:text-red-400 hover:underline font-semibold">
                Test the link →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
