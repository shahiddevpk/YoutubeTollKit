'use client';

import React, { useState } from 'react';
import { parseYouTubeUrl, getThumbnailUrls } from '@/lib/youtube';
import { Image as ImageIcon, Smartphone, Monitor, Clock } from 'lucide-react';

export function ThumbnailPreview() {
  const [videoUrl, setVideoUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1280&q=80');
  const [videoTitle, setVideoTitle] = useState('How To Build High-Income YouTube Channels in 2026');
  const channelName = 'Creator Pro Academy';
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>('desktop');

  const handleFetch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    const parsed = parseYouTubeUrl(videoUrl);
    if (parsed.type === 'video' && parsed.id) {
      const urls = getThumbnailUrls(parsed.id);
      setPreviewUrl(urls.maxres);
      setVideoTitle('YouTube Video Analysis Preview');
    }
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <form onSubmit={handleFetch} className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Fetch Existing YouTube Video Thumbnail
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Paste YouTube video link..."
              className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500 transition-all cursor-pointer"
            >
              Fetch
            </button>
          </div>
        </form>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Or Upload Draft Thumbnail (PNG / JPG)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleCustomUpload}
            className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700 cursor-pointer"
          />
        </div>
      </div>

      {/* Device Viewport Toggle */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-4">
        <span className="text-xs font-semibold text-slate-400">Preview Layout Simulator</span>
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              deviceMode === 'desktop' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Desktop Feed</span>
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
              deviceMode === 'mobile' ? 'bg-red-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Mobile Feed</span>
          </button>
        </div>
      </div>

      {/* Feed Mockup Simulator */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 flex justify-center">
        <div className={`w-full ${deviceMode === 'mobile' ? 'max-w-xs' : 'max-w-md'} space-y-3`}>
          {/* Thumbnail Box with simulated 16:9 ratio and timestamp */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl group">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Thumbnail preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-600">
                <ImageIcon className="h-12 w-12" />
              </div>
            )}

            {/* YouTube Bottom-Right Duration Badge */}
            <div className="absolute bottom-2.5 right-2.5 rounded bg-black/85 px-1.5 py-0.5 text-[11px] font-mono font-bold text-white backdrop-blur-xs flex items-center gap-1">
              <Clock className="h-3 w-3 text-slate-300" />
              12:45
            </div>
          </div>

          {/* Video Metadata in Feed */}
          <div className="flex gap-3 pt-1">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 shrink-0 font-bold text-xs flex items-center justify-center text-white">
              C
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white line-clamp-2 leading-tight">
                {videoTitle}
              </h4>
              <p className="text-xs text-slate-400 mt-1">{channelName} • 142K views • 2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
