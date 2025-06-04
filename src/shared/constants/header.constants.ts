import { HeaderStatus } from '../types/header.types';

export const HEADER_SUBTITLES: Record<HeaderStatus, string> = {
  [HeaderStatus.UPLOAD]: 'Enhanced with publically available data from the FDA and USDA',
  [HeaderStatus.LOADING]: 'Your data is being analyzed in real-time',
  [HeaderStatus.ANALYSIS]: 'Enhanced with publically available data from the FDA and USDA',
  [HeaderStatus.FETCHING_ANALYSIS]: 'Enhanced with publically available data from the FDA and USDA',
} as const;

export const HEADER_TITLE = 'Food Intelligence: AI-Powered Data Analyzer';
