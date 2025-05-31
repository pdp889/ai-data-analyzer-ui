import type { ToastOptions } from 'react-hot-toast';

interface CustomToastOptions extends ToastOptions {
  success?: {
    duration?: number;
    iconTheme?: {
      primary: string;
      secondary: string;
    };
  };
  error?: {
    duration?: number;
    iconTheme?: {
      primary: string;
      secondary: string;
    };
  };
}

export const TOAST_CONFIG: CustomToastOptions = {
  position: 'top-right',
  duration: 4000,
  style: {
    background: '#363636',
    color: '#fff',
  },
  success: {
    duration: 4000,
    iconTheme: {
      primary: '#4ade80',
      secondary: '#fff',
    },
  },
  error: {
    duration: 4000,
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  },
} as const;

export const TOAST_MESSAGES = {
  ANALYSIS_SUCCESS: 'Analysis completed successfully!',
  ANALYSIS_ERROR: 'An error occurred during analysis',
  EXISTING_ANALYSIS_ERROR: 'An error occurred fetching existing analysis',
} as const;
