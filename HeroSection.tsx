import { ShieldCheck, Sparkles, Zap, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 py-10 sm:py-14">
      {/* Subtle background ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-80 w-full max-w-4xl -translate-x-1/2 rounded-full bg-red-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/4 -z-10 h-64 w-64 rounded-full bg-sky-600/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Privacy & Speed pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>100% In-Browser Privacy • Zero Server Uploads • Instant Results</span>
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Optimize Your Next <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">YouTube Video</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mx-auto mt-3.5 max-w-2xl text-base text-slate-300 sm:text-lg">
          Analyze your YouTube video title quality, hook power, and thumbnail technical compliance in real time. Get actionable rule-based scores and smart title alternatives.
        </p>

        {/* Feature Highlights Grid */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Title Length & Hook Scoring</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>16:9 & 720p/1080p Resolution Checks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Curiosity & Emotional Punch Rules</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>Real-time YouTube Simulator</span>
          </div>
        </div>
      </div>
    </section>
  );
}
