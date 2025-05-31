import type { AnalysisResponse } from '../../features/analysis/types/analysis.types';

const API_URL = import.meta.env.VITE_API_URL + '/existing-analysis';

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set or endpoint is incorrect');
}

export const fetchExistingAnalysis = async (): Promise<AnalysisResponse> => {
  const response = await fetch(API_URL, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to fetch existing analysis';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      errorMessage = `Failed to fetch existing analysis: ${response.statusText || response.status}`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
};
