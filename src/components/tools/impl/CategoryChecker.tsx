'use client';

import React, { useState } from 'react';
import Link from '@/components/link';
import { FolderSearch, AlertCircle } from 'lucide-react';
import { fetchYouTubeVideo, parseApiJson } from '@/lib/api-client';
import { ToolPrimaryButton } from '@/components/ui/ToolPrimaryButton';
import { toolFormRowClass, toolInputClass } from '@/lib/tool-ui';

/** Standard YouTube video category IDs (assignable categories). */
const CATEGORIES: Record<string, { name: string; tip: string }> = {
  '1': { name: 'Film & Animation', tip: 'Short films, trailers, animation and movie commentary.' },
  '2': { name: 'Autos & Vehicles', tip: 'Car reviews, motorcycles, repairs and EV content.' },
  '10': { name: 'Music', tip: 'Official music, covers and lyric videos. Music-category uploads can surface in YouTube Music.' },
  '15': { name: 'Pets & Animals', tip: 'Pet care, wildlife and animal compilations.' },
  '17': { name: 'Sports', tip: 'Highlights, training, fitness sport and analysis.' },
  '19': { name: 'Travel & Events', tip: 'Travel vlogs, destination guides and event coverage.' },
  '20': { name: 'Gaming', tip: 'Let’s plays, walkthroughs and esports. Gaming uploads can link to a game title card.' },
  '22': { name: 'People & Blogs', tip: 'YouTube’s default category — vlogs and personal channels. Often left unchanged by mistake.' },
  '23': { name: 'Comedy', tip: 'Sketches, stand-up, parody and funny compilations.' },
  '24': { name: 'Entertainment', tip: 'Broad entertainment, reactions, celebrity and pop-culture content.' },
  '25': { name: 'News & Politics', tip: 'News, commentary and politics. Subject to extra authoritative-source treatment in search.' },
  '26': { name: 'Howto & Style', tip: 'Tutorials, DIY, beauty, fashion and cooking how-tos.' },
  '27': { name: 'Education', tip: 'Lessons, explainers, courses and academic content.' },
  '28': { name: 'Science & Technology', tip: 'Tech reviews, gadgets, coding, science explainers.' },
  '29': { name: 'Nonprofits & Activism', tip: 'Charity, causes and advocacy content.' },
};

interface VideoInfo {
  videoId: string;
  title: string;
  channelTitle: string;
  categoryId: string | null;
  defaultLanguage?: string | null;
  tags: string[];
}

interface Row {
  video: VideoInfo;
}

export function CategoryChecker() {
  const [input, setInput] = useState('');
  const [compare, setCompare] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<Row[]>([]);

  const check = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRows([]);
    try {
      const urls = [input, compare].map((s) => s.trim()).filter(Boolean);
      const results = await Promise.all(urls.map(async (u) => parseApiJson<VideoInfo>(await fetchYouTubeVideo(u))));
      const failed = results.find((r) => !r.ok);
      if (failed && !failed.ok) setError(failed.error);
      setRows(results.filter((r): r is { ok: true; data: VideoInfo } => r.ok).map((r) => ({ video: r.data })));
    } catch {
      setError('Could not load that video. Check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  const same = rows.length === 2 && rows[0].video.categoryId === rows[1].video.categoryId;

  return (
    <div className="space-y-6">
      <form onSubmit={check} className="space-y-3">
        <label htmlFor="cat-video" className="block text-sm font-semibold text-[#0f0f0f] dark:text-[#f1f1f1]">
          YouTube video or Shorts URL
        </label>
        <div className={toolFormRowClass}>
          <input id="cat-video" type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. https://www.youtube.com/watch?v=..." className={toolInputClass} required />
          <ToolPrimaryButton type="submit" loading={loading} loadingLabel="Checking…">
            <FolderSearch className="h-4 w-4" aria-hidden />
            <span>Check Category</span>
          </ToolPrimaryButton>
        </div>
        <label htmlFor="cat-compare" className="block text-xs font-semibold text-[#606060] dark:text-[#aaaaaa]">
          Optional: compare with a competitor video
        </label>
        <input id="cat-compare" type="text" value={compare} onChange={(e) => setCompare(e.target.value)} placeholder="Second video URL (optional)" className={toolInputClass} />
      </form>

      {error && (
        <div role="alert" className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-700 dark:text-rose-300">
          <AlertCircle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {rows.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {rows.map(({ video }) => {
            const cat = video.categoryId ? CATEGORIES[video.categoryId] : undefined;
            return (
              <div key={video.videoId} className="rounded-2xl border border-[#e5e5e5] dark:border-[#272727] bg-[#f9f9f9] dark:bg-[#181818] p-5 space-y-2">
                <p className="text-xs text-[#606060] dark:text-[#aaaaaa] line-clamp-2">{video.title} · {video.channelTitle}</p>
                <p className="text-2xl font-black text-[#0f0f0f] dark:text-[#f1f1f1]">{cat?.name ?? `Category ${video.categoryId ?? 'unknown'}`}</p>
                <p className="text-xs text-[#606060] dark:text-[#aaaaaa]">Category ID: <span className="font-mono">{video.categoryId ?? '—'}</span>{video.defaultLanguage ? ` · Language: ${video.defaultLanguage}` : ''}</p>
                {cat && <p className="text-sm text-[#606060] dark:text-[#aaaaaa]">{cat.tip}</p>}
                {video.categoryId === '22' && (
                  <p className="text-xs rounded-lg bg-amber-500/10 border border-amber-500/30 p-2 text-amber-800 dark:text-amber-300">
                    “People & Blogs” is the default. If this video is really a tutorial, review or lesson, a more specific category describes it better.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
      {rows.length === 2 && (
        <p className="text-sm text-[#0f0f0f] dark:text-[#f1f1f1]">
          {same ? 'Both videos use the same category.' : 'These videos use different categories — check which one better matches your content and audience.'}
        </p>
      )}
      <p className="text-xs text-[#606060] dark:text-[#a0a0a0]">
        Change a category in YouTube Studio → Content → Details → Show more → Category. Need to fix the rest of your metadata? Try the{' '}
        <Link href="/tools/seo-score-checker" className="text-[#cc0000] dark:text-red-400 hover:underline">SEO Score Checker</Link>.
      </p>
    </div>
  );
}
