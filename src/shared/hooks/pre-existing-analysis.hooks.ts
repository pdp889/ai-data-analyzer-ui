import { useQuery } from '@tanstack/react-query';
import type { AnalysisResponse } from '../../features/analysis/types/analysis.types';
import { fetchExistingAnalysis } from '../services/pre-existing-analysis.service';

export const usePreExistingAnalysis = () => {
  return useQuery<AnalysisResponse, Error>({
    queryKey: ['existingAnalysis'],
    queryFn: fetchExistingAnalysis,
    staleTime: Infinity,
  });
};
