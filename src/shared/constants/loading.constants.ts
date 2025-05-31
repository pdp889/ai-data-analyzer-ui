import { HeaderStatus } from '../types/header.types';

export const LOADING_MESSAGES: Record<HeaderStatus, string> = {
  [HeaderStatus.LOADING]: 'Analyzing your data...',
  [HeaderStatus.FETCHING_ANALYSIS]: 'Checking for existing analysis...',
  [HeaderStatus.UPLOAD]: 'Upload your data file to get started with AI-powered analysis',
  [HeaderStatus.ANALYSIS]: 'Analysis Results',
} as const;
