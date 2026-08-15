import React, { useEffect } from 'react';
import {
  Award,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Percent,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OverallScoreResult } from '../types';

interface OverallScoreCardProps {
  result: OverallScoreResult;
  onReset: () => void;
}

export function OverallScoreCard({ result, onReset }: OverallScoreCardProps) {
  const {
    score,
    tier,
    label,
    hasTitle,
    hasThumbnail,
    titleContribution,
    thumbnailContribution,
    summary,
  } = result;

  // Trigger celebratory confetti if score is Excellent (>= 90) and both components exist
  useEffect(() => {
    if (score >= 90 && hasTitle && hasThumbnail) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#10b981', '#38bdf8', '#f59e0b'],
        });
      } catch {
        // Safe fail
      }
    }
  }, [score, hasTitle, hasThumbnail]);

  // Circular gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  let ringColor = 'stroke-emerald-500';
  let badgeColor = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let textColor = 'text-emerald-400';

  if (!hasTitle && !hasThumbnail) {
    ringColor = 'stroke-slate-700';
    badgeColor = 'bg-slate-800 text-slate-400 border-slate-700';
    textColor = 'text-slate-400';
  } else if (score < 60) {
    ringColor = 'stroke-rose-500';
    badgeColor = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    textColor = 'text-rose-400';
  } else if (score < 75) {
    ringColor = 'stroke-amber-500';
    badgeColor = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    textColor = 'text-amber-400';
  } else if (score < 90) {
    ringColor = 'stroke-sky-500';
    badgeColor = 'bg-sky-500/10 text-sky-400 border-sky-500/30';
    textColor = 'text-sky-400';
  }

  return (
    <div
      id="overall-score-card"
      className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-md sm:p-8"
    >
      {/* Decorative subtle background gradient */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-red-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-sky-600/10 blur-3xl" />

      <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-center">
        {/* Left: Overall Circular Dial & Rating */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          {/* Circular SVG Meter */}
          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Background Track */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Animated Progress Fill */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className={`${ringColor} transition-all duration-700 ease-out`}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Center Score Text */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className={`text-3xl font-extrabold tracking-tight ${textColor}`}>
                {score}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                out of 100
              </span>
            </div>
          </div>

          {/* Score Meta Description */}
          <div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <h2 className="text-xl font-bold text-white">Overall Optimization Score</h2>
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${badgeColor}`}>
                {label}
              </span>
            </div>

            <p className="mt-1.5 max-w-md text-xs text-slate-300">
              {summary}
            </p>

            {/* Formula weighting pill */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 sm:justify-start">
              <div className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                <span>Title Weight: <strong>60%</strong></span>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
                <span>Thumbnail Weight: <strong>40%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Contributions & Reset Action Button */}
        <div className="flex w-full flex-col items-center gap-3 md:w-auto md:items-end">
          {/* Quick Score Contribution Pills */}
          <div className="flex w-full justify-around gap-2 text-xs md:w-auto md:justify-end">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-2 text-center">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Title Score</div>
              <div className="font-mono text-sm font-bold text-white">
                {hasTitle ? `${titleContribution}/100` : 'Pending'}
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-2 text-center">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Thumbnail Score</div>
              <div className="font-mono text-sm font-bold text-white">
                {hasThumbnail ? `${thumbnailContribution}/100` : 'Pending'}
              </div>
            </div>
          </div>

          {/* Prominent Reset Button */}
          <button
            id="reset-analyzer-button"
            type="button"
            onClick={onReset}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 shadow-sm transition hover:border-slate-600 hover:bg-slate-700 hover:text-white md:w-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Analyzer
          </button>
        </div>
      </div>

      {/* Rating Scale Legend */}
      <div className="mt-6 border-t border-slate-800/80 pt-4">
        <div className="grid grid-cols-2 gap-2 text-center text-[11px] sm:grid-cols-4">
          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-1.5">
            <span className="font-bold text-emerald-400">90–100:</span>
            <span className="ml-1 text-slate-300">Excellent</span>
          </div>
          <div className="rounded-lg border border-sky-500/20 bg-sky-500/5 p-1.5">
            <span className="font-bold text-sky-400">75–89:</span>
            <span className="ml-1 text-slate-300">Strong</span>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-1.5">
            <span className="font-bold text-amber-400">60–74:</span>
            <span className="ml-1 text-slate-300">Needs Improvement</span>
          </div>
          <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-1.5">
            <span className="font-bold text-rose-400">&lt; 60:</span>
            <span className="ml-1 text-slate-300">Needs Work</span>
          </div>
        </div>

        <p className="mt-3 text-center text-[11px] text-slate-400">
          Estimated rule-based optimization score. Not an official YouTube metric.
        </p>
      </div>
    </div>
  );
}
