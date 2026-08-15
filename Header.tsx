import { Youtube, Sparkles, SlidersHorizontal, Eye, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onLoadSample: () => void;
  onReset: () => void;
  hasData: boolean;
}

export function Header({ onLoadSample, onReset, hasData }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 via-red-600 to-rose-700 shadow-md shadow-red-900/30">
            <Youtube className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">YouTube ClickLab</span>
              <span className="hidden rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-semibold text-red-400 ring-1 ring-red-500/20 sm:inline-block">
                Free Analyzer
              </span>
            </div>
            <p className="text-xs text-slate-400">Free YouTube Title & Thumbnail Analyzer</p>
          </div>
        </div>

        {/* Navigation & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-300 md:flex">
            <a
              href="#analyzer"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <SlidersHorizontal className="h-4 w-4 text-red-400" />
              Analyzer
            </a>
            <a
              href="#simulator"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Eye className="h-4 w-4 text-sky-400" />
              YouTube Preview
            </a>
            <a
              href="#how-it-works"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              How It Works
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              id="header-load-sample-btn"
              type="button"
              onClick={onLoadSample}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 shadow-sm transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden xs:inline">Try Sample</span>
              <span className="xs:hidden">Sample</span>
            </button>

            {hasData && (
              <button
                id="header-reset-btn"
                type="button"
                onClick={onReset}
                className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
