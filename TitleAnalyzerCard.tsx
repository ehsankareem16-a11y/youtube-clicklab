import React, { useState } from 'react';
import {
  Type,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Info,
  Hash,
  Smile,
  Zap,
  HelpCircle,
  Clock,
  Flame,
  Search,
} from 'lucide-react';
import { TitleMetrics, TitleScoreBreakdown } from '../types';

interface TitleAnalyzerCardProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  onAnalyze: () => void;
  analysis: TitleScoreBreakdown & { metrics: TitleMetrics };
  onSelectPreset: (presetTitle: string) => void;
}

const PRESETS = [
  { label: '🔥 Tech Review', text: 'I Tested the New M4 Max for 30 Days: DO NOT BUY Before This!' },
  { label: '💻 Coding Tutorial', text: 'How to Build a Full Stack App in 2026 (Step-by-Step for Beginners)' },
  { label: '💰 Finance Guide', text: '5 Passive Income Mistakes Costing You $1,000s Every Month' },
  { label: '🚀 Story / Vlog', text: 'Why I Finally Quit My $150k Tech Job to Create Content' },
];

export function TitleAnalyzerCard({
  title,
  onTitleChange,
  onAnalyze,
  analysis,
  onSelectPreset,
}: TitleAnalyzerCardProps) {
  const { metrics, categories, suggestions, totalScore } = analysis;
  const charCount = metrics.charCount;

  // Character range status
  let charStatusColor = 'text-slate-400 bg-slate-800/80 border-slate-700';
  let charStatusLabel = 'Too Short (< 25)';
  if (charCount >= 45 && charCount <= 65) {
    charStatusColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    charStatusLabel = 'Golden Zone (45-65 chars)';
  } else if (charCount >= 25 && charCount < 45) {
    charStatusColor = 'text-sky-400 bg-sky-500/10 border-sky-500/30';
    charStatusLabel = 'Good Length (25-45 chars)';
  } else if (charCount > 65 && charCount <= 75) {
    charStatusColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    charStatusLabel = 'Slightly Long (65-75 chars)';
  } else if (charCount > 75) {
    charStatusColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    charStatusLabel = 'Mobile Cutoff Risk (> 75 chars)';
  }

  const categoryList = Object.values(categories);

  return (
    <div
      id="title-analyzer-card"
      className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl shadow-black/40 backdrop-blur-sm sm:p-7"
    >
      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500/10 text-red-400 ring-1 ring-red-500/20">
            <Type className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Title Analyzer</h2>
            <p className="text-xs text-slate-400">Rule-based scoring for readability, curiosity & CTR</p>
          </div>
        </div>

        {title.trim().length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Title Score:</span>
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

      {/* Preset Pills */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-slate-400">Try template:</span>
        {PRESETS.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSelectPreset(preset.text)}
            className="rounded-lg border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Main Text Input Field */}
      <div className="mt-4">
        <label htmlFor="youtube-title-input" className="mb-1.5 block text-sm font-semibold text-slate-200">
          Enter your YouTube title
        </label>
        <div className="relative">
          <textarea
            id="youtube-title-input"
            rows={3}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g. How I Built a Profitable Web App in 30 Days (Step-by-Step)"
            className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950/90 p-3.5 text-sm text-white placeholder-slate-500 shadow-inner transition focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>

        {/* Live Counters & Safe Zone Indicators */}
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1 font-mono text-slate-300">
              <strong className="text-white">{charCount}</strong> chars
            </span>
            <span className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1 font-mono text-slate-300">
              <strong className="text-white">{metrics.wordCount}</strong> words
            </span>
            <span className={`rounded-md border px-2 py-1 font-medium ${charStatusColor}`}>
              {charStatusLabel}
            </span>
          </div>

          <button
            id="title-analyze-button"
            type="button"
            onClick={onAnalyze}
            className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-500 active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Analyze Title
          </button>
        </div>
      </div>

      {/* Calculated Title Metrics Grid */}
      {title.trim().length > 0 && (
        <div className="mt-5 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5">
          <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Detected Title Metrics
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            <div className="rounded-lg bg-slate-900/80 p-2 border border-slate-800">
              <div className="text-slate-400">Avg Word Length</div>
              <div className="mt-0.5 font-mono font-semibold text-slate-200">
                {metrics.avgWordLength} chars
              </div>
            </div>
            <div className="rounded-lg bg-slate-900/80 p-2 border border-slate-800">
              <div className="text-slate-400">Uppercase Letters</div>
              <div className="mt-0.5 font-mono font-semibold text-slate-200">
                {metrics.uppercaseCount} ({Math.round(metrics.uppercaseRatio * 100)}%)
              </div>
            </div>
            <div className="rounded-lg bg-slate-900/80 p-2 border border-slate-800">
              <div className="text-slate-400">Punctuation & Emojis</div>
              <div className="mt-0.5 font-mono font-semibold text-slate-200">
                !:{metrics.exclamationCount} • ?:{metrics.questionCount} • 😃:{metrics.emojiCount}
              </div>
            </div>
            <div className="rounded-lg bg-slate-900/80 p-2 border border-slate-800">
              <div className="text-slate-400">Numbers & Year</div>
              <div className="mt-0.5 font-semibold text-slate-200">
                {metrics.numberCount > 0 ? `Digits (${metrics.numberCount})` : 'None'}
                {metrics.hasYear ? ' • Year Detected' : ''}
              </div>
            </div>
          </div>

          {/* Quick flags row */}
          <div className="mt-2.5 flex flex-wrap gap-1.5 text-[11px]">
            {metrics.hasHook ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-medium text-emerald-400 ring-1 ring-emerald-500/20">
                <CheckCircle2 className="h-3 w-3" /> Strong Hook Starter
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2 py-0.5 text-slate-400">
                <Info className="h-3 w-3" /> No Standard Hook Starter
              </span>
            )}

            {metrics.powerWordsFound.length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 font-medium text-red-400 ring-1 ring-red-500/20">
                <Flame className="h-3 w-3" /> Power Words: {metrics.powerWordsFound.join(', ')}
              </span>
            )}

            {metrics.hasBracket && (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 px-2 py-0.5 font-medium text-purple-400 ring-1 ring-purple-500/20">
                Bracket Tag [ ]
              </span>
            )}

            {metrics.hasWeakPhrases && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 font-medium text-amber-400 ring-1 ring-amber-500/20">
                <AlertTriangle className="h-3 w-3" /> Weak Phrase Detected
              </span>
            )}
          </div>
        </div>
      )}

      {/* Category Scores Breakdown */}
      {title.trim().length > 0 && (
        <div className="mt-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Category Performance Scores
          </h3>
          <div className="space-y-3">
            {categoryList.map((cat, i) => {
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

                  {/* Progress Bar */}
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className={`h-full transition-all duration-500 ${barColor}`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>

                  {/* Feedback text */}
                  <p className="mt-1.5 text-[11px] text-slate-400">{cat.feedback}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Suggestions Section */}
      {title.trim().length > 0 && suggestions.length > 0 && (
        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
          <h3 className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Title Improvement Suggestions
          </h3>
          <div className="space-y-2">
            {suggestions.map((sug) => (
              <div
                key={sug.id}
                className="flex items-start gap-2.5 rounded-lg border border-slate-800/80 bg-slate-900/60 p-2.5 text-xs"
              >
                {sug.type === 'good' ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                ) : sug.type === 'warning' ? (
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                ) : (
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                )}
                <div className="flex-1">
                  <p className="text-slate-200">{sug.message}</p>
                  <span className="mt-1 inline-block text-[10px] font-semibold text-slate-400">
                    Impact: {sug.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-slate-400 italic">
            * Scores and suggestions are estimated rule-based heuristics to guide planning. They do not predict guaranteed YouTube CTR.
          </p>
        </div>
      )}

      {/* Empty State */}
      {title.trim().length === 0 && (
        <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-950/40 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-slate-400">
            <Type className="h-6 w-6" />
          </div>
          <h4 className="mt-3 text-sm font-semibold text-slate-300">Ready to Analyze Your Title</h4>
          <p className="mt-1 max-w-sm text-xs text-slate-400">
            Type your video title above or click one of the template pills to see instant scores, hook analysis, and character checks.
          </p>
        </div>
      )}
    </div>
  );
}
