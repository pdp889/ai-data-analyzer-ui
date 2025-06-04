import type { AnalysisResponse } from '../../features/analysis/types/analysis.types';

const API_URL = import.meta.env.VITE_API_URL + '/analyze';
const DEFAULT_API_URL = import.meta.env.VITE_API_URL + '/analyze-default';
const REQUEST_TIMEOUT = 300000; // 5 minutes

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

const createTimeoutPromise = (ms: number): Promise<never> =>
  new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), ms));

export const analyzeFile = async (file: File | 'default'): Promise<AnalysisResponse> => {
  if (file === 'default') {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  
      const response = await Promise.race([
        fetch(DEFAULT_API_URL, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          signal: controller.signal,
        }),
        createTimeoutPromise(REQUEST_TIMEOUT),
      ]);
  
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to analyze file' }));
        throw new Error(error.message || 'Failed to analyze file');
      }
  
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timed out');
        }
        throw new Error('An error occurred while analyzing the file');
      }
      throw error;
    }
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await Promise.race([
      fetch(API_URL, {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        signal: controller.signal,
      }),
      createTimeoutPromise(REQUEST_TIMEOUT),
    ]);

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to analyze file' }));
      throw new Error(error.message || 'Failed to analyze file');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw new Error('An error occurred while analyzing the file');
    }
    throw error;
  }
};