import { HeaderStatus } from '../types/header.types';

export const HEADER_SUBTITLES: Record<HeaderStatus, string> = {
  [HeaderStatus.UPLOAD]: 'Upload your data file to get started with AI-powered analysis',
  [HeaderStatus.LOADING]: 'Your data is being analyzed in real-time',
  [HeaderStatus.ANALYSIS]: '',
  [HeaderStatus.FETCHING_ANALYSIS]: '',
} as const;

export const HEADER_TITLE = 'AI Data Analysis';
