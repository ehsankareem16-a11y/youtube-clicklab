import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Lightbulb,
  Wand2,
  BookmarkPlus,
} from 'lucide-react';
import { TitleAlternative } from '../types';

interface ImproveTitleSectionProps {
  currentTitle: string;
  alternatives: TitleAlternative[];
  onApplyTitle: (newTitle: string) => void;
}

export function ImproveTitleSection({
  currentTitle,
  alternatives,
  onApplyTitle,
}: ImproveTitleSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (!currentTitle.trim() || alternatives.length === 0) {
    return null;
  }

  return (
    <section id="improve-title-section" className="mt-8">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl shadow-black/40 backdrop-blur-sm sm:p-7">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20">
              <Wand2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Improve Your Title</h2>
              <p className="text-xs text-slate-400">
                Template-based transformations built from your topic keywords
              </p>
            </div>
          </div>
          <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/30">
            {alternatives.length} Alternatives Generated
          </span>
        </div>

        {/* Current Title Banner (Before) */}
        <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-slate-400">Current Title (Before)</span>
            <span className="font-mono">{currentTitle.length} chars</span>
          </div>
          <p className="mt-1.5 text-sm font-semibold text-slate-200 sm:text-base">
            "{currentTitle}"
          </p>
        </div>

        {/* Generated Alternative Title Cards (After) */}
        <div className="mt-5">
          <h3 className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            High-Performing Alternative Formats (After)
          </h3>

          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {alternatives.map((alt) => {
              const isCopied = copiedId === alt.id;

              return (
                <div
                  key={alt.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4 transition hover:border-slate-700 hover:bg-slate-950/80"
                >
                  <div>
                    {/* Formula Pill & Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-bold text-amber-400 border border-amber-500/20">
                        {alt.formulaName}
                      </span>
                      <div className="flex gap-1">
                        {alt.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-400 border border-slate-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Transformed Title */}
                    <p className="mt-2.5 text-sm font-bold text-white leading-snug">
                      {alt.title}
                    </p>

                    {/* Psychology description */}
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {alt.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-800/80 pt-3">
                    <button
                      type="button"
                      onClick={() => handleCopy(alt.id, alt.title)}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onApplyTitle(alt.title)}
                      className="flex items-center gap-1 rounded-lg bg-red-600/90 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-red-500 active:scale-95"
                    >
                      <span>Apply to Analyzer</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
