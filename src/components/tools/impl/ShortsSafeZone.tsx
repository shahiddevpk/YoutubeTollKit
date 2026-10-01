'use client';

import React, { useState } from 'react';
import { Smartphone, Heart, MessageCircle, Share2, Music, Upload, Eye } from 'lucide-react';

export function ShortsSafeZone() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white">Upload 9:16 Vertical Video Frame (1080x1920)</h3>
          <p className="text-xs text-slate-400">
            Check if your subtitles, call-to-actions, or faces are hidden behind YouTube Shorts action buttons.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition-all cursor-pointer">
          <Upload className="h-4 w-4 text-red-500" />
          <span>Upload Test Frame</span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {/* Simulator Frame */}
      <div className="flex justify-center p-4">
        <div className="relative aspect-[9/16] w-full max-w-xs rounded-3xl overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-2xl">
          {imagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imagePreview} alt="Shorts preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center text-slate-500">
              <Smartphone className="h-16 w-16 mb-2 text-slate-600" />
              <p className="text-xs font-medium">Upload a frame or use default guide below</p>
            </div>
          )}

          {/* Transparent Safe Zone Center Area */}
          {showGrid && (
            <div className="absolute inset-x-8 inset-y-24 rounded-2xl border-2 border-dashed border-emerald-500/60 bg-emerald-500/10 pointer-events-none flex items-center justify-center">
              <span className="rounded bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                ✓ 100% SAFE TEXT ZONE
              </span>
            </div>
          )}

          {/* YouTube Shorts UI Overlay Elements */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 bg-gradient-to-b from-black/40 via-transparent to-black/70">
            {/* Top Bar */}
            <div className="flex justify-between items-center text-white text-xs font-bold pt-2">
              <span>Shorts</span>
              <span>🔍 📷</span>
            </div>

            {/* Bottom Content & Right Sidebar Actions */}
            <div className="flex items-end justify-between gap-4 pb-2">
              {/* Creator Metadata */}
              <div className="space-y-1.5 max-w-[200px] text-white">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-red-600 text-[10px] font-bold flex items-center justify-center">
                    YT
                  </div>
                  <span className="text-xs font-bold">@creator</span>
                  <span className="rounded-full bg-white text-black text-[9px] px-2 py-0.5 font-bold">
                    Subscribe
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 line-clamp-2">
                  How to make sure text is not cut off by Shorts UI #shorts #tips
                </p>
                <div className="flex items-center gap-1 text-[10px] text-slate-300">
                  <Music className="h-3 w-3" />
                  <span className="truncate">Original Audio — Creator Pro</span>
                </div>
              </div>

              {/* Right Action Icons (Like, Comment, Share) */}
              <div className="flex flex-col items-center gap-3 text-white">
                <div className="flex flex-col items-center">
                  <div className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
                    <Heart className="h-4 w-4" />
                  </div>
                  <span className="text-[10px]">124K</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <span className="text-[10px]">892</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="h-9 w-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center">
                    <Share2 className="h-4 w-4" />
                  </div>
                  <span className="text-[10px]">Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
