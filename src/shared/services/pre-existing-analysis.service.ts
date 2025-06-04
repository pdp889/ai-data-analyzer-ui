import type { AnalysisResponse } from '../../features/analysis/types/analysis.types';

const API_URL = import.meta.env.VITE_API_URL + '/existing-analysis';
const REQUEST_TIMEOUT = 300000; // 5 minutes

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set or endpoint is incorrect');
}

const createTimeoutPromise = (ms: number): Promise<never> =>
  new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), ms));

export const fetchExistingAnalysis = async (): Promise<AnalysisResponse> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await Promise.race([
      fetch(API_URL, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        signal: controller.signal,
      }),
      createTimeoutPromise(REQUEST_TIMEOUT),
    ]);

    clearTimeout(timeoutId);

    if (!response.ok) {
      return { status: 'success', data: null, conversationHistory: undefined };
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw new Error('An error occurred while fetching existing analysis');
    }
    return { status: 'success', data: null, conversationHistory: undefined };
  }
};
