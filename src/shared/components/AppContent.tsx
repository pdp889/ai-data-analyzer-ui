import { useFileAnalysis } from '../hooks/file-analysis.hooks';
import { FileUpload } from '../../features/file-upload/components/FileUpload';
import { AnalysisResults } from '../../features/analysis/components/AnalysisResults';
import { LoadingSpinner } from './LoadingSpinner';
import { HeaderStatus } from '../types/header.types';
import { useQueryClient } from '@tanstack/react-query';
import { usePreExistingAnalysis } from '../hooks/pre-existing-analysis.hooks';
import { useAnalysisNotifications } from '../hooks/use-analysis-notifications.hook';

export const AppContent = (): JSX.Element => {
  const preExistingAnalysisQuery = usePreExistingAnalysis();
  const queryClient = useQueryClient();
  const fileAnalysisMutation = useFileAnalysis();

  useAnalysisNotifications({
    fileAnalysisMutation,
    preExistingAnalysisQuery,
  });

  const handleClear = (): void => {
    fileAnalysisMutation.reset();
    queryClient.setQueryData(['existingAnalysis'], { status: 'success', data: null });
  };

  const handleFileSelect = (file: File): void => {
    fileAnalysisMutation.mutate(file);
  };

  // Handle initial loading state for existing analysis
  if (preExistingAnalysisQuery.isLoading) {
    return <LoadingSpinner status={HeaderStatus.FETCHING_ANALYSIS} />;
  }

  const showNewAnalysis = fileAnalysisMutation.isPending || fileAnalysisMutation.data;
  const showExistingAnalysis = !showNewAnalysis && preExistingAnalysisQuery.data?.data;
  const showFileUpload = !showNewAnalysis && !showExistingAnalysis;

  return (
    <div className="max-w-7xl mx-auto">
      {showNewAnalysis && (
        <>
          {fileAnalysisMutation.isPending && <LoadingSpinner status={HeaderStatus.LOADING} />}
          {fileAnalysisMutation.data && (
            <AnalysisResults data={fileAnalysisMutation.data} onClear={handleClear} />
          )}
        </>
      )}

      {showExistingAnalysis && preExistingAnalysisQuery.data && (
        <AnalysisResults data={preExistingAnalysisQuery.data} onClear={handleClear} />
      )}

      {showFileUpload && <FileUpload onFileSelect={handleFileSelect} />}
    </div>
  );
};
