import { Type, Image as ImageIcon, Sparkles, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      num: '1',
      icon: Type,
      title: 'Enter your title',
      desc: 'Type or paste your video title. The analyzer tests character limits, hook phrases, curiosity drivers, power words, and mobile scannability.',
      color: 'from-red-500/20 to-red-500/5 text-red-400 border-red-500/30',
    },
    {
      num: '2',
      icon: ImageIcon,
      title: 'Upload your thumbnail',
      desc: 'Select your JPG, PNG, or WEBP image. The app inspects 16:9 aspect ratio, 1280×720 minimum resolution, file size limits, and feed contrast pop.',
      color: 'from-sky-500/20 to-sky-500/5 text-sky-400 border-sky-500/30',
    },
    {
      num: '3',
      icon: Sparkles,
      title: 'Get optimization insights',
      desc: 'Receive transparent category breakdowns, an overall 0–100 score, actionable checklist warnings, and high-CTR title variations.',
      color: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30',
    },
  ];

  return (
    <section id="how-it-works" className="mt-10 border-t border-slate-800/80 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            How It Works
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-400 sm:text-sm">
            Everything runs locally in your browser with zero latency and complete privacy.
          </p>
        </div>

        {/* 3-Step Cards Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg backdrop-blur-sm"
              >
                {/* Step Number badge */}
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-gradient-to-br ${step.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-700">
                    0{step.num}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-bold text-white">{step.title}</h3>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Educational Disclaimer Note */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-center text-xs text-slate-400">
          <p>
            <span className="font-semibold text-slate-300">Disclaimer: </span>
            This tool provides rule-based estimates for educational and planning purposes. It is not affiliated with or endorsed by YouTube.
          </p>
        </div>
      </div>
    </section>
  );
}
