import { useMutation } from '@tanstack/react-query';
import type { AnalysisResponse } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL + '/analyze';

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

export const useFileAnalysis = () => {
  return useMutation<AnalysisResponse, Error, File>({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to analyze file' }));
        throw new Error(error.message || 'Failed to analyze file');
      }

      return response.json();
    },
  });
}; 