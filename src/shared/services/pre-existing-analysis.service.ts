import type { AnalysisResponse } from '../../features/analysis/types/analysis.types';

const API_URL = import.meta.env.VITE_API_URL + '/existing-analysis';

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set or endpoint is incorrect');
}

export const fetchExistingAnalysis = async (): Promise<AnalysisResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      return { status: 'success', data: null };
    }

    return response.json();
  } catch {
    return { status: 'success', data: null };
  }
};
