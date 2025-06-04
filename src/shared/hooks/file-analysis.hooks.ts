import { useMutation } from '@tanstack/react-query';
import type { AnalysisResponse } from '../../features/analysis/types/analysis.types';
import { analyzeFile } from '../services/file-analysis.service';

const API_URL = import.meta.env.VITE_API_URL + '/analyze';

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

export const useFileAnalysis = () => {
  return useMutation<AnalysisResponse, Error, File | 'default'>({
    mutationFn: analyzeFile,
  });
};
