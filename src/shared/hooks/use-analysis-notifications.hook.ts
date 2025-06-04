import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { TOAST_MESSAGES } from '../constants/toast.constants';
import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import type { AnalysisResponse } from '../../features/analysis/types/analysis.types';

interface UseAnalysisNotificationsProps {
  fileAnalysisMutation: UseMutationResult<AnalysisResponse, Error, File | 'default'>;
  preExistingAnalysisQuery: UseQueryResult<AnalysisResponse, Error>;
}

export const useAnalysisNotifications = ({
  fileAnalysisMutation,
}: UseAnalysisNotificationsProps): void => {
  useEffect(() => {
    if (fileAnalysisMutation.isSuccess) {
      toast.success(TOAST_MESSAGES.ANALYSIS_SUCCESS);
    } else if (fileAnalysisMutation.isError) {
      toast.error(fileAnalysisMutation.error?.message ?? TOAST_MESSAGES.ANALYSIS_ERROR);
    }
  }, [fileAnalysisMutation.isSuccess, fileAnalysisMutation.isError, fileAnalysisMutation.error]);
};
