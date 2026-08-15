import React, { useState } from 'react';
import {
  Smartphone,
  Monitor,
  Sidebar as SidebarIcon,
  Moon,
  Sun,
  CheckCircle,
  MoreVertical,
  ThumbsUp,
  Share2,
} from 'lucide-react';
import { ThumbnailMetrics } from '../types';

interface YouTubeSimulatorProps {
  title: string;
  thumbnailMetrics: ThumbnailMetrics | null;
}

export function YouTubeSimulator({ title, thumbnailMetrics }: YouTubeSimulatorProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile' | 'sidebar'>('desktop');
  const [ytTheme, setYtTheme] = useState<'dark' | 'light'>('dark');

  const displayTitle = title.trim() || 'Your Compelling YouTube Video Title Appears Right Here';
  const previewImg = thumbnailMetrics?.previewUrl || null;

  // Simulate YouTube mobile cutoff (~55-60 characters)
  const isMobileCutoff = displayTitle.length > 55;

  const isDark = ytTheme === 'dark';
  const cardBg = isDark ? 'bg-[#0f0f0f] text-white border-zinc-800' : 'bg-white text-zinc-900 border-zinc-200';
  const subText = isDark ? 'text-zinc-400' : 'text-zinc-600';
  const badgeBg = isDark ? 'bg-black/80 text-white' : 'bg-black/80 text-white';

  return (
    <section id="simulator" className="mt-8">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl shadow-black/40 backdrop-blur-sm sm:p-7">
        {/* Header with Mode Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">YouTube Feed Simulator</h2>
            <p className="text-xs text-slate-400">
              Preview how your title & thumbnail look in YouTube's actual desktop and mobile feed layouts
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Buttons */}
            <div className="flex rounded-lg border border-slate-800 bg-slate-950 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('desktop')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  viewMode === 'desktop'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('mobile')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  viewMode === 'mobile'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Mobile Feed</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('sidebar')}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                  viewMode === 'sidebar'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <SidebarIcon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Suggested</span>
              </button>
            </div>

            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={() => setYtTheme(isDark ? 'light' : 'dark')}
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-300 transition hover:border-slate-700 hover:bg-slate-800"
              title="Toggle simulated YouTube theme"
            >
              {isDark ? (
                <>
                  <Moon className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="text-[11px]">YT Dark</span>
                </>
              ) : (
                <>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-[11px]">YT Light</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Simulator Mockup Frame */}
        <div className="mt-6 flex justify-center">
          {viewMode === 'desktop' && (
            <div className={`w-full max-w-sm sm:max-w-md rounded-2xl border p-3.5 shadow-xl transition-all ${cardBg}`}>
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900">
                {previewImg ? (
                  <img
                    src={previewImg}
                    alt="YouTube Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900 p-4 text-center text-zinc-500">
                    <p className="text-xs font-medium">Upload a thumbnail to preview</p>
                    <span className="mt-1 text-[10px] text-zinc-600">16:9 Standard Canvas</span>
                  </div>
                )}
                {/* Duration Badge */}
                <div className={`absolute bottom-2 right-2 rounded px-1.5 py-0.5 text-[11px] font-semibold ${badgeBg}`}>
                  14:28
                </div>
              </div>

              {/* Title & Channel Details */}
              <div className="mt-3 flex items-start gap-3">
                {/* Channel Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-amber-600 font-bold text-white text-xs">
                  YT
                </div>

                {/* Text Metadata */}
                <div className="flex-1 min-w-0">
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight">
                    {displayTitle}
                  </h3>
                  <div className={`mt-1 text-xs ${subText} flex items-center gap-1`}>
                    <span>Creator Channel</span>
                    <CheckCircle className="h-3 w-3 fill-zinc-500 text-zinc-900 dark:text-zinc-100" />
                  </div>
                  <div className={`text-xs ${subText}`}>
                    142K views • 3 days ago
                  </div>
                </div>

                <button type="button" className={`p-1 ${subText} hover:text-white`}>
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {viewMode === 'mobile' && (
            <div className={`w-full max-w-xs rounded-3xl border-2 p-3 shadow-2xl transition-all ${cardBg}`}>
              {/* Mobile Phone Top Notch Simulation */}
              <div className="mb-2 flex items-center justify-between text-[10px] text-zinc-400 px-2">
                <span>9:41</span>
                <div className="h-1.5 w-12 rounded-full bg-zinc-700" />
                <span>5G 100%</span>
              </div>

              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900">
                {previewImg ? (
                  <img
                    src={previewImg}
                    alt="YouTube Mobile Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-center text-xs text-zinc-500">
                    No Thumbnail Uploaded
                  </div>
                )}
                <div className={`absolute bottom-1.5 right-1.5 rounded px-1.5 py-0.5 text-[10px] font-semibold ${badgeBg}`}>
                  14:28
                </div>
              </div>

              {/* Mobile Details */}
              <div className="mt-2.5 flex items-start gap-2.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-amber-600 text-[10px] font-bold text-white">
                  YT
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="line-clamp-2 text-xs font-semibold leading-snug">
                    {displayTitle}
                  </h3>
                  <p className={`mt-0.5 text-[11px] ${subText}`}>
                    Creator Channel • 142K views • 3 days ago
                  </p>
                </div>
              </div>

              {/* Mobile Truncation Indicator */}
              {isMobileCutoff && (
                <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 text-[10px] text-amber-300">
                  ⚠️ <strong>Mobile Truncation Note:</strong> On smaller phone screens, YouTube will truncate words after ~55-60 characters with "...".
                </div>
              )}
            </div>
          )}

          {viewMode === 'sidebar' && (
            <div className={`w-full max-w-md rounded-2xl border p-3.5 shadow-xl transition-all ${cardBg}`}>
              <div className="flex items-start gap-3">
                {/* Small Sidebar Thumbnail */}
                <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-zinc-900">
                  {previewImg ? (
                    <img
                      src={previewImg}
                      alt="Sidebar Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-[10px] text-zinc-500">
                      Thumbnail
                    </div>
                  )}
                  <div className={`absolute bottom-1 right-1 rounded px-1 text-[9px] font-semibold ${badgeBg}`}>
                    14:28
                  </div>
                </div>

                {/* Sidebar Title */}
                <div className="flex-1 min-w-0">
                  <h3 className="line-clamp-2 text-xs font-semibold leading-snug">
                    {displayTitle}
                  </h3>
                  <p className={`mt-1 text-[11px] ${subText}`}>Creator Channel</p>
                  <p className={`text-[10px] ${subText}`}>142K views • 3 days ago</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
