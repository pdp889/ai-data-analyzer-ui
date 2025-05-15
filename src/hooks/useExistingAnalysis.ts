import { useQuery } from '@tanstack/react-query';
import type { AnalysisResponse } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL + '/existing-analysis';

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set or endpoint is incorrect');
}

const fetchExistingAnalysis = async (): Promise<AnalysisResponse> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    let errorMessage = 'Failed to fetch existing analysis';
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      errorMessage = `Failed to fetch existing analysis: ${response.statusText || response.status}`;
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

export const useExistingAnalysis = () => {
  return useQuery<AnalysisResponse, Error>({
    queryKey: ['existingAnalysis'],
    queryFn: fetchExistingAnalysis,
    staleTime: Infinity,
  });
}; 