'use client';

import React, { useState } from 'react';
import { Tag, Search, Copy, Check, Hash, AlertCircle } from 'lucide-react';
import { fetchYouTubeVideo, parseApiJson } from '@/lib/api-client';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { toolFormRowClass } from '@/lib/tool-ui';

const PRESET_VIDEOS = [
  { label: 'YouTube Monetization Blueprint', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { label: 'YouTube SEO Guide', url: 'https://www.youtube.com/watch?v=9bZkp7q19f0' },
];

export function TagExtractor() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const fetchTags = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setTags([]);
    setVideoTitle(null);

    try {
      const res = await fetchYouTubeVideo(query);
      const parsed = await parseApiJson<{
        title: string;
        tags: string[];
        thumbnails?: { high?: { url: string }; default?: { url: string } };
      }>(res);

      if (parsed.ok) {
        const d = parsed.data;
        setTags(d.tags || []);
        setVideoTitle(d.title);
        setThumbnailUrl(d.thumbnails?.high?.url || d.thumbnails?.default?.url || null);
      } else {
        setError(parsed.error);
        return;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error extracting tags';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleExtract = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTags(url);
  };

  const selectPreset = (presetUrl: string) => {
    setUrl(presetUrl);
    fetchTags(presetUrl);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(tags.join(', '));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const copySingleTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1500);
  };

  const totalCharacters = tags.reduce((acc, tag) => acc + tag.length + 2, 0);

  return (
    <div className="space-y-6">
      <form onSubmit={handleExtract} className="space-y-3">
        <label className="block text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          Enter YouTube Video URL or Shorts Link
        </label>
        <div className={toolFormRowClass}>
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#909090] dark:text-[#717171]" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              className="w-full rounded-xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] px-4 py-3 pl-11 text-sm text-[#0f0f0f] dark:text-[#f1f1f1] placeholder-[#909090] dark:placeholder-[#717171] focus:border-[#ff0000] focus:outline-none focus:ring-1 focus:ring-[#ff0000] transition-colors"
              required
            />
          </div>
          <ToolPrimaryButton type="submit" loading={loading} loadingLabel="Extracting…">
            <Tag className="h-4 w-4" aria-hidden />
            <span>Extract Tags</span>
          </ToolPrimaryButton>
        </div>

        {/* Preset Video Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-[#909090] dark:text-[#717171]">Quick test:</span>
          {PRESET_VIDEOS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => selectPreset(preset.url)}
              className="rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 text-xs font-medium text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000]/60 hover:bg-[#e5e5e5] dark:hover:bg-[#383838] transition-colors cursor-pointer"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </form>

      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {tags.length > 0 && (
        <div className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#121212] p-6 space-y-5 animate-in fade-in duration-150">
          {videoTitle && (
            <div className="flex items-center gap-3 border-b border-[#e5e5e5] dark:border-[#272727] pb-3">
              {thumbnailUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnailUrl}
                  alt={videoTitle}
                  className="h-12 w-20 rounded-lg object-cover border border-[#e5e5e5] dark:border-[#272727] shrink-0"
                />
              )}
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] truncate">{videoTitle}</h4>
                <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-0.5">
                  Character count: <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{totalCharacters}</strong> / 500 max
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1] flex items-center gap-2">
              <Tag className="h-4 w-4 text-[#ff0000]" />
              Extracted Tags ({tags.length})
            </h3>

            <button
              onClick={copyAll}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#ff0000] px-4 py-2 text-xs font-bold text-white hover:bg-[#cc0000] transition-colors cursor-pointer"
            >
              {copiedAll ? <Check className="h-4 w-4 text-white" /> : <Copy className="h-4 w-4 text-white" />}
              <span>{copiedAll ? 'Copied to Clipboard!' : 'Copy all for YouTube Studio'}</span>
            </button>
          </div>

          {/* Tag Badges */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => copySingleTag(tag)}
                className="group flex items-center gap-1.5 rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-white dark:bg-[#181818] px-3.5 py-1.5 text-xs text-[#0f0f0f] dark:text-[#f1f1f1] hover:border-[#ff0000] hover:bg-[#f2f2f2] dark:hover:bg-[#272727] transition-all cursor-pointer shadow-sm"
                title="Click to copy single tag"
              >
                <Hash className="h-3 w-3 text-[#909090] group-hover:text-[#ff0000]" />
                <span>{tag}</span>
                {copiedTag === tag ? (
                  <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400 ml-1" />
                ) : (
                  <Copy className="h-3 w-3 text-[#909090] opacity-0 group-hover:opacity-100 ml-1 transition-opacity" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
