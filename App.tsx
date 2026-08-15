import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TitleAnalyzerCard } from './components/TitleAnalyzerCard';
import { ThumbnailAnalyzerCard } from './components/ThumbnailAnalyzerCard';
import { OverallScoreCard } from './components/OverallScoreCard';
import { ImproveTitleSection } from './components/ImproveTitleSection';
import { YouTubeSimulator } from './components/YouTubeSimulator';
import { HowItWorksSection } from './components/HowItWorksSection';
import { Footer } from './components/Footer';

import {
  ThumbnailMetrics,
  ThumbnailScoreBreakdown,
  OverallScoreResult,
  ScoreTier,
} from './types';
import { analyzeTitle, generateTitleAlternatives } from './utils/titleAnalyzer';
import { createPresetThumbnailCanvas, analyzeThumbnailFile } from './utils/thumbnailAnalyzer';

export default function App() {
  const [title, setTitle] = useState<string>('');
  const [thumbnailMetrics, setThumbnailMetrics] = useState<ThumbnailMetrics | null>(null);
  const [thumbnailScore, setThumbnailScore] = useState<ThumbnailScoreBreakdown | null>(null);
  const [isImgLoading, setIsImgLoading] = useState<boolean>(false);
  const [imgError, setImgError] = useState<string | null>(null);
  const [analysisCount, setAnalysisCount] = useState<number>(0);

  // Compute live title analysis directly from reactive title state
  const titleAnalysis = useMemo(() => {
    return analyzeTitle(title);
  }, [title, analysisCount]);

  const alternatives = useMemo(() => {
    return generateTitleAlternatives(title);
  }, [title]);

  // Compute Overall Optimization Score:
  // overallScore = Math.round(titleScore * 0.6 + thumbnailScore * 0.4)
  const overallResult: OverallScoreResult = useMemo(() => {
    const hasTitle = title.trim().length > 0;
    const hasThumbnail = thumbnailScore !== null && thumbnailMetrics !== null;

    if (!hasTitle && !hasThumbnail) {
      return {
        score: 0,
        tier: 'needs-work',
        label: 'Awaiting Input',
        color: 'text-slate-400',
        hasTitle: false,
        hasThumbnail: false,
        titleContribution: 0,
        thumbnailContribution: 0,
        summary: 'Enter a video title and upload a thumbnail to calculate your full optimization score.',
      };
    }

    const titleScoreVal = hasTitle ? titleAnalysis.totalScore : 0;
    const thumbScoreVal = hasThumbnail && thumbnailScore ? thumbnailScore.totalScore : 0;

    // Mathematical formula
    const score = Math.round(titleScoreVal * 0.60 + thumbScoreVal * 0.40);

    let summary = '';
    if (hasTitle && hasThumbnail) {
      summary = `Composite score calculated from 60% Title Quality (${titleScoreVal}/100) and 40% Thumbnail Technical Compliance (${thumbScoreVal}/100).`;
    } else if (hasTitle && !hasThumbnail) {
      summary = `Title score is ${titleScoreVal}/100 (60% contribution = ${Math.round(titleScoreVal * 0.6)} pts). Upload a thumbnail to complete your full 100-point optimization audit.`;
    } else {
      summary = `Thumbnail score is ${thumbScoreVal}/100 (40% contribution = ${Math.round(thumbScoreVal * 0.4)} pts). Enter your video title above to complete full optimization scoring.`;
    }

    let tier: ScoreTier = 'needs-work';
    let label = 'Needs Work';
    let color = 'text-rose-400';

    if (score >= 90) {
      tier = 'excellent';
      label = 'Excellent';
      color = 'text-emerald-400';
    } else if (score >= 75) {
      tier = 'strong';
      label = 'Strong';
      color = 'text-sky-400';
    } else if (score >= 60) {
      tier = 'needs-improvement';
      label = 'Needs Improvement';
      color = 'text-amber-400';
    }

    return {
      score,
      tier,
      label,
      color,
      hasTitle,
      hasThumbnail,
      titleContribution: titleScoreVal,
      thumbnailContribution: thumbScoreVal,
      summary,
    };
  }, [title, titleAnalysis, thumbnailMetrics, thumbnailScore]);

  // Handlers
  const handleTitleChange = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  const handleTitleAnalyzeTrigger = useCallback(() => {
    setAnalysisCount((prev) => prev + 1);
  }, []);

  const handleSelectPresetTitle = useCallback((presetText: string) => {
    setTitle(presetText);
  }, []);

  const handleThumbnailAnalyzed = useCallback((metrics: ThumbnailMetrics, score: ThumbnailScoreBreakdown) => {
    setThumbnailMetrics((prev) => {
      if (prev?.previewUrl && prev.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(prev.previewUrl);
      }
      return metrics;
    });
    setThumbnailScore(score);
    setImgError(null);
  }, []);

  const handleRemoveThumbnail = useCallback(() => {
    setThumbnailMetrics((prev) => {
      if (prev?.previewUrl && prev.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(prev.previewUrl);
      }
      return null;
    });
    setThumbnailScore(null);
    setImgError(null);
  }, []);

  const handleReset = useCallback(() => {
    setThumbnailMetrics((prev) => {
      if (prev?.previewUrl && prev.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(prev.previewUrl);
      }
      return null;
    });
    setTitle('');
    setThumbnailScore(null);
    setImgError(null);
    setAnalysisCount(0);
  }, []);

  // Load sample demo with preset title and generated high-res thumbnail
  const handleLoadSample = async () => {
    const sampleTitle = 'I Tested the New M4 Max for 30 Days: DO NOT BUY Before This!';
    setTitle(sampleTitle);
    setIsImgLoading(true);
    setImgError(null);

    try {
      const file = await createPresetThumbnailCanvas('tech');
      const res = await analyzeThumbnailFile(file);
      handleThumbnailAnalyzed(res.metrics, res.scoreBreakdown);
    } catch (err) {
      setImgError('Failed to load sample thumbnail.');
    } finally {
      setIsImgLoading(false);
    }
  };

  const hasData = title.trim().length > 0 || thumbnailMetrics !== null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-red-500 selection:text-white font-sans antialiased">
      {/* Top Navigation */}
      <Header
        onLoadSample={handleLoadSample}
        onReset={handleReset}
        hasData={hasData}
      />

      {/* Main Hero Header */}
      <HeroSection />

      {/* Main Content Dashboard Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Overall Score Section (Always Visible at the Top of Analyzer) */}
        <div className="mb-8">
          <OverallScoreCard
            result={overallResult}
            onReset={handleReset}
          />
        </div>

        {/* Two-Column Analyzer Grid: Card 1 (Title) & Card 2 (Thumbnail) */}
        <div id="analyzer" className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Card 1: Title Analyzer */}
          <TitleAnalyzerCard
            title={title}
            onTitleChange={handleTitleChange}
            onAnalyze={handleTitleAnalyzeTrigger}
            analysis={titleAnalysis}
            onSelectPreset={handleSelectPresetTitle}
          />

          {/* Card 2: Thumbnail Analyzer */}
          <ThumbnailAnalyzerCard
            thumbnailMetrics={thumbnailMetrics}
            thumbnailScore={thumbnailScore}
            onThumbnailAnalyzed={handleThumbnailAnalyzed}
            onRemoveThumbnail={handleRemoveThumbnail}
            isLoading={isImgLoading}
            setIsLoading={setIsImgLoading}
            errorMessage={imgError}
            setErrorMessage={setImgError}
          />
        </div>

        {/* Before / After Title Section (Improve Your Title) */}
        {title.trim().length > 0 && (
          <ImproveTitleSection
            currentTitle={title}
            alternatives={alternatives}
            onApplyTitle={handleTitleChange}
          />
        )}

        {/* Live YouTube Feed Preview Simulator */}
        <YouTubeSimulator
          title={title}
          thumbnailMetrics={thumbnailMetrics}
        />

        {/* How It Works Educational Section */}
        <HowItWorksSection />
      </main>

      {/* Footer */}
      <Footer onReset={handleReset} />
    </div>
  );
}
