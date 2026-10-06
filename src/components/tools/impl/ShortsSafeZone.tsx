'use client';

import React, { useState } from 'react';
import { Smartphone, Heart, MessageCircle, Share2, Music, Upload, Download } from 'lucide-react';

export function ShortsSafeZone() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const showGrid = true;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const downloadPngOverlay = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 1080, 1920);

    // Safe zone box
    ctx.strokeStyle = '#2ba640';
    ctx.lineWidth = 6;
    ctx.setLineDash([20, 15]);
    ctx.strokeRect(80, 240, 920, 1380);

    ctx.fillStyle = 'rgba(43, 166, 64, 0.2)';
    ctx.fillRect(80, 240, 920, 1380);

    // Red Danger / Button Overlay Zones
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.fillRect(880, 900, 180, 950);
    ctx.fillRect(40, 1550, 840, 320);

    // Text labels
    ctx.setLineDash([]);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('100% SAFE TEXT ZONE (1080x1920)', 540, 960);
    ctx.font = '24px sans-serif';
    ctx.fillText('youtubefreetoolkit.com', 540, 1010);

    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('Action Buttons Zone', 970, 1400);
    ctx.fillText('Title & Sound Zone', 460, 1720);

    const link = document.createElement('a');
    link.download = 'youtube-shorts-safe-zone-1080x1920.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#0f0f0f] dark:text-[#f1f1f1]">Upload 9:16 Vertical Video Frame (1080x1920)</h3>
          <p className="text-xs text-[#606060] dark:text-[#aaaaaa] mt-0.5">
            Check if your subtitles, call-to-actions, or faces are hidden behind YouTube Shorts action buttons.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={downloadPngOverlay}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#ff0000] px-4 py-2 text-xs font-bold text-white hover:bg-[#cc0000] transition-all cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Save PNG Overlay</span>
          </button>

          <label className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e5e5] dark:border-[#272727] bg-[#f2f2f2] dark:bg-[#272727] px-4 py-2 text-xs font-semibold text-[#0f0f0f] dark:text-[#f1f1f1] hover:bg-[#e5e5e5] dark:hover:bg-[#383838] transition-all cursor-pointer">
            <Upload className="h-3.5 w-3.5 text-[#ff0000]" />
            <span>Upload Frame</span>
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Simulator Frame */}
      <div className="flex justify-center p-4">
        <div className="relative aspect-[9/16] w-full max-w-xs rounded-3xl overflow-hidden border-2 border-[#e5e5e5] dark:border-[#272727] bg-black shadow-2xl">
          {imagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imagePreview} alt="Shorts preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-6 text-center text-[#717171]">
              <Smartphone className="h-16 w-16 mb-2 text-[#555555]" />
              <p className="text-xs font-medium text-[#aaaaaa]">Upload a frame or save the transparent PNG overlay guide</p>
            </div>
          )}

          {/* Transparent Safe Zone Center Area */}
          {showGrid && (
            <div className="absolute inset-x-8 inset-y-24 rounded-2xl border-2 border-dashed border-emerald-500/70 bg-emerald-500/10 pointer-events-none flex items-center justify-center">
              <span className="rounded-full bg-emerald-950/90 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                ✓ 100% SAFE TEXT ZONE
              </span>
            </div>
          )}

          {/* YouTube Shorts UI Overlay Elements */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4 bg-gradient-to-b from-black/50 via-transparent to-black/80">
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
                  <div className="h-6 w-6 rounded-full bg-[#ff0000] text-[10px] font-bold flex items-center justify-center text-white">
                    YT
                  </div>
                  <span className="text-xs font-bold">@creator</span>
                  <span className="rounded-full bg-white text-black text-[9px] px-2 py-0.5 font-bold">
                    Subscribe
                  </span>
                </div>
                <p className="text-[11px] text-white/90 line-clamp-2">
                  How to make sure text is not cut off by Shorts UI #shorts #tips
                </p>
                <div className="flex items-center gap-1 text-[10px] text-white/70">
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
