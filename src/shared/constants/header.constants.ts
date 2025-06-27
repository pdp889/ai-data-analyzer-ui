import { HeaderStatus } from '../types/header.types';

export const HEADER_SUBTITLES: Record<HeaderStatus, string> = {
  [HeaderStatus.UPLOAD]: 'Enhanced with publically available data from the FDA',
  [HeaderStatus.LOADING]: 'This make take a few minutes',
  [HeaderStatus.ANALYSIS]: 'Enhanced with publically available data from the FDA',
  [HeaderStatus.FETCHING_ANALYSIS]: 'Enhanced with publically available data from the FDA',
} as const;

export const HEADER_TITLE = 'Food Intelligence: AI-Powered Data Analyzer';
