export interface TitleMetrics {
  charCount: number;
  wordCount: number;
  avgWordLength: number;
  uppercaseCount: number;
  uppercaseRatio: number;
  exclamationCount: number;
  questionCount: number;
  numberCount: number;
  emojiCount: number;
  hasYear: boolean;
  hasHook: boolean;
  isTooShort: boolean;
  isTooLong: boolean;
  hasWeakPhrases: boolean;
  weakPhrasesFound: string[];
  powerWordsFound: string[];
  hasBracket: boolean;
}

export interface TitleCategoryScore {
  name: string;
  score: number; // 0 to 100
  weight: number;
  status: 'good' | 'warning' | 'bad';
  feedback: string;
}

export interface TitleScoreBreakdown {
  totalScore: number;
  categories: {
    length: TitleCategoryScore;
    clarity: TitleCategoryScore;
    curiosity: TitleCategoryScore;
    emotionalImpact: TitleCategoryScore;
    specificity: TitleCategoryScore;
    readability: TitleCategoryScore;
  };
  suggestions: TitleSuggestion[];
}

export interface TitleSuggestion {
  id: string;
  type: 'good' | 'warning' | 'info';
  message: string;
  impact: string;
}

export interface TitleAlternative {
  id: string;
  title: string;
  formulaName: string;
  description: string;
  tags: string[];
}

export interface ThumbnailMetrics {
  fileName: string;
  fileSize: number; // bytes
  fileSizeFormatted: string;
  width: number;
  height: number;
  aspectRatio: number;
  aspectRatioFormatted: string;
  format: string;
  isLandscape: boolean;
  isCloseTo16x9: boolean;
  isAtLeast720p: boolean;
  isAtLeast1080p: boolean;
  isUnder2MB: boolean;
  isVerySmall: boolean;
  brightnessPercent?: number;
  contrastPercent?: number;
  saturationPercent?: number;
  previewUrl: string;
}

export interface ThumbnailCategoryScore {
  name: string;
  score: number;
  weight: number;
  status: 'good' | 'warning' | 'bad';
  feedback: string;
}

export interface ThumbnailScoreBreakdown {
  totalScore: number;
  categories: {
    resolution: ThumbnailCategoryScore;
    aspectRatio: ThumbnailCategoryScore;
    fileSize: ThumbnailCategoryScore;
    format: ThumbnailCategoryScore;
    technicalQuality: ThumbnailCategoryScore;
  };
  checks: {
    label: string;
    passed: boolean;
    warning?: boolean;
    detail: string;
  }[];
}

export type ScoreTier = 'excellent' | 'strong' | 'needs-improvement' | 'needs-work';

export interface OverallScoreResult {
  score: number;
  tier: ScoreTier;
  label: string;
  color: string;
  hasTitle: boolean;
  hasThumbnail: boolean;
  titleContribution: number;
  thumbnailContribution: number;
  summary: string;
}
