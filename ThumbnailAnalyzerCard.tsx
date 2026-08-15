import React, { useRef, useState } from 'react';
import {
  Image as ImageIcon,
  Upload,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Maximize2,
  Sparkles,
  ShieldCheck,
  Trash2,
  Layers,
  Sun,
  Activity,
} from 'lucide-react';
import { ThumbnailMetrics, ThumbnailScoreBreakdown } from '../types';
import { analyzeThumbnailFile, createPresetThumbnailCanvas } from '../utils/thumbnailAnalyzer';

interface ThumbnailAnalyzerCardProps {
  thumbnailMetrics: ThumbnailMetrics | null;
  thumbnailScore: ThumbnailScoreBreakdown | null;
  onThumbnailAnalyzed: (metrics: ThumbnailMetrics, score: ThumbnailScoreBreakdown) => void;
  onRemoveThumbnail: () => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  errorMessage: string | null;
  setErrorMessage: (msg: string | null) => void;
}

export function ThumbnailAnalyzerCard({
  thumbnailMetrics,
  thumbnailScore,
  onThumbnailAnalyzed,
  onRemoveThumbnail,
  isLoading,
  setIsLoading,
  errorMessage,
  setErrorMessage,
}: ThumbnailAnalyzerCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = async (file: File) => {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const result = await analyzeThumbnailFile(file);
      onThumbnailAnalyzed(result.metrics, result.scoreBreakdown);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Error analyzing image file.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleLoadPreset = async (presetType: 'tech' | 'gaming' | 'finance' | 'vlog') => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const file = await createPresetThumbnailCanvas(presetType);
      await handleFile(file);
    } catch (err) {
      setErrorMessage('Failed to generate preset image.');
    } finally {
      setIsLoading(false);
    }
  };

  const totalScore = thumbnailScore?.totalScore ?? 0;
  const categoriesList = thumbnailScore ? Object.values(thumbnailScore.categories) : [];

  return (
    <div
      id="thumbnail-analyzer-card"
      className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl shadow-black/40 backdrop-blur-sm sm:p-7"
    >
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20">
            <ImageIcon className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Thumbnail Analyzer</h2>
            <p className="text-xs text-slate-400">100% in-browser technical resolution & compliance audit</p>
          </div>
        </div>

        {thumbnailScore && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Technical Score:</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ${
                totalScore >= 90
                  ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/30'
                  : totalScore >= 75
                  ? 'bg-sky-500/10 text-sky-400 ring-sky-500/30'
                  : totalScore >= 60
                  ? 'bg-amber-500/10 text-amber-400 ring-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 ring-rose-500/30'
              }`}
            >
              {totalScore} / 100
            </span>
          </div>
        )}
      </div>

      {/* Preset Buttons for Quick Testing */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-slate-400">Quick preset:</span>
        <button
          type="button"
          onClick={() => handleLoadPreset('tech')}
          className="rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
        >
          ⚡ Tech 4K
        </button>
        <button
          type="button"
          onClick={() => handleLoadPreset('finance')}
          className="rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
        >
          💰 Finance
        </button>
        <button
          type="button"
          onClick={() => handleLoadPreset('gaming')}
          className="rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
        >
          🎮 Gaming
        </button>
        <button
          type="button"
          onClick={() => handleLoadPreset('vlog')}
          className="rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
        >
          🎥 Storytime
        </button>
      </div>

      {/* Upload Zone / Preview Area */}
      {!thumbnailMetrics ? (
        <div
          id="thumbnail-dropzone"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition ${
            isDragOver
              ? 'border-sky-400 bg-sky-500/10'
              : 'border-slate-700 bg-slate-950/70 hover:border-slate-600 hover:bg-slate-950'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleInputChange}
            className="hidden"
          />

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-400 ring-1 ring-sky-500/20">
            <Upload className="h-7 w-7" />
          </div>

          <h3 className="mt-3.5 text-sm font-bold text-white">
            {isLoading ? 'Analyzing thumbnail...' : 'Drop your YouTube thumbnail here'}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            or <span className="font-semibold text-sky-400 underline underline-offset-2">browse files</span> on your device
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500">
            <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800">JPG, PNG, WEBP</span>
            <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800">16:9 Landscape</span>
            <span className="rounded bg-slate-900 px-2 py-0.5 border border-slate-800">Max 2.0 MB</span>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-[11px] text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Processed 100% locally in browser • No server uploads</span>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {/* Thumbnail Preview Container */}
          <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-black shadow-lg">
            <img
              src={thumbnailMetrics.previewUrl}
              alt="Uploaded YouTube Thumbnail"
              className="h-auto w-full object-contain"
            />

            {/* Overlay Badges */}
            <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
              <span className="rounded-md bg-black/80 px-2 py-0.5 text-xs font-mono font-bold text-white backdrop-blur-md">
                {thumbnailMetrics.width} × {thumbnailMetrics.height} px
              </span>
              <span
                className={`rounded-md px-2 py-0.5 text-xs font-mono font-bold backdrop-blur-md ${
                  thumbnailMetrics.isCloseTo16x9
                    ? 'bg-emerald-600/90 text-white'
                    : 'bg-amber-600/90 text-white'
                }`}
              >
                {thumbnailMetrics.aspectRatioFormatted}
              </span>
            </div>

            {/* Remove / Replace Button */}
            <button
              id="remove-thumbnail-btn"
              type="button"
              onClick={onRemoveThumbnail}
              className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-rose-400 backdrop-blur-md transition hover:bg-rose-600 hover:text-white"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Change</span>
            </button>
          </div>

          {/* Metadata Breakdown */}
          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
              <div className="text-slate-400">Resolution</div>
              <div className="mt-0.5 font-mono font-semibold text-slate-200">
                {thumbnailMetrics.width}×{thumbnailMetrics.height}
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
              <div className="text-slate-400">Aspect Ratio</div>
              <div className="mt-0.5 font-mono font-semibold text-slate-200">
                {thumbnailMetrics.aspectRatioFormatted}
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
              <div className="text-slate-400">File Size & Format</div>
              <div className="mt-0.5 font-mono font-semibold text-slate-200">
                {thumbnailMetrics.fileSizeFormatted} • {thumbnailMetrics.format}
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-2.5">
              <div className="text-slate-400">Feed Pop & Contrast</div>
              <div className="mt-0.5 font-mono font-semibold text-slate-200">
                {thumbnailMetrics.contrastPercent}% Contrast • {thumbnailMetrics.brightnessPercent}% Bright
              </div>
            </div>
          </div>

          {/* Technical Compliance Checklist */}
          {thumbnailScore && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5">
              <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Technical Compliance Checks
              </h3>
              <div className="space-y-2">
                {thumbnailScore.checks.map((chk, idx) => (
                  <div
                    key={idx}
                    className="flex items-start justify-between gap-2 rounded-lg border border-slate-800/80 bg-slate-900/60 p-2 text-xs"
                  >
                    <div className="flex items-start gap-2">
                      {chk.passed ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      ) : chk.warning ? (
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      ) : (
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                      )}
                      <div>
                        <span className="font-semibold text-slate-200">{chk.label}</span>
                        <p className="text-[11px] text-slate-400">{chk.detail}</p>
                      </div>
                    </div>
                    <span
                      className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                        chk.passed
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : chk.warning
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {chk.passed ? 'PASS' : chk.warning ? 'WARN' : 'FAIL'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Category Scores */}
          {thumbnailScore && (
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Technical Quality Breakdown
              </h3>
              {categoriesList.map((cat, i) => {
                let barColor = 'bg-emerald-500';
                let badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
                if (cat.score < 60) {
                  barColor = 'bg-rose-500';
                  badgeColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
                } else if (cat.score < 75) {
                  barColor = 'bg-amber-500';
                  badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
                } else if (cat.score < 90) {
                  barColor = 'bg-sky-500';
                  badgeColor = 'text-sky-400 bg-sky-500/10 border-sky-500/30';
                }

                return (
                  <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{cat.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400">Weight: {cat.weight}%</span>
                        <span className={`rounded-md border px-2 py-0.5 font-mono font-bold ${badgeColor}`}>
                          {cat.score} / 100
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${cat.score}%` }}
                      />
                    </div>

                    <p className="mt-1.5 text-[11px] text-slate-400">{cat.feedback}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Explicit Text Detection Disclaimer Notice */}
          <div className="rounded-lg border border-slate-800/80 bg-slate-950/70 p-3 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Notice: </span>
            Advanced text detection is not available in this $0 browser-only version. Focus on 16:9 framing, high contrast, and crisp 1280×720 resolution.
          </div>
        </div>
      )}

      {/* Error Message if any */}
      {errorMessage && (
        <div className="mt-3 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
            <span>Image Error</span>
          </div>
          <p className="mt-1">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
