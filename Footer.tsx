import { Youtube, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onReset: () => void;
}

export function Footer({ onReset }: FooterProps) {
  return (
    <footer className="mt-14 border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-600 text-white">
              <Youtube className="h-3.5 w-3.5" />
            </div>
            <span className="font-semibold text-slate-200">YouTube ClickLab</span>
            <span className="text-slate-600">•</span>
            <span>Free browser-based YouTube optimization tool.</span>
          </div>

          {/* Educational Note & Reset */}
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Built for educational/assignment purposes.</span>
            <button
              type="button"
              onClick={onReset}
              className="text-slate-400 underline hover:text-slate-200"
            >
              Reset Session
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Privacy Guaranteed: No images or title data are stored or transmitted.</span>
        </div>
      </div>
    </footer>
  );
}
