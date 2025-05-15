import { useEffect } from 'react';
import { useFileAnalysis } from '../hooks/useFileAnalysis';
import { FileUpload } from './FileUpload';
import { AnalysisResults } from './AnalysisResults';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from './LoadingSpinner';
import { useExistingAnalysis } from '../hooks/useExistingAnalysis';
import { HeaderStatus } from './Header';

export const MainContent = () => {
  const existingAnalysisQuery = useExistingAnalysis();
  
  const mutation = useFileAnalysis();

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Analysis completed successfully!');
    } else if (mutation.isError) {
      toast.error(mutation.error?.message ?? 'An error occurred during analysis');
    }
  }, [mutation.isSuccess, mutation.isError, mutation.error]);

  useEffect(() => {
    if (existingAnalysisQuery.isError) {
      toast.error(existingAnalysisQuery.error?.message ?? 'An error occurred fetching existing analysis');
    }
  }, [existingAnalysisQuery.isError, existingAnalysisQuery.error]);

  const handleFileSelect = (file: File) => {
    mutation.mutate(file);
  };

  // Handle initial loading state for existing analysis
  if (existingAnalysisQuery.isLoading) {
    return <LoadingSpinner status={HeaderStatus.FETCHING_ANALYSIS} />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Case 1: New analysis is actively being processed */}
      {mutation.isPending && <LoadingSpinner status={HeaderStatus.LOADING} />}

      {/* Case 2: New analysis data is available (and not pending) - takes precedence */}
      {!mutation.isPending && mutation.data && (
        <AnalysisResults data={mutation.data} />
      )}

      {/* Case 3: No new analysis active or completed, but existing analysis data is available */}
      {!mutation.isPending && !mutation.data && existingAnalysisQuery.data && existingAnalysisQuery.data.data && (
        <AnalysisResults data={existingAnalysisQuery.data} />
      )}

      {/* Case 4: No new analysis (pending or data), no existing data -> Show FileUpload */}
      {/* This also implies existingAnalysisQuery.isLoading is false and existingAnalysisQuery.data is not available. */}
      {!mutation.isPending && !mutation.data && (!existingAnalysisQuery.data || !existingAnalysisQuery.data.data) && (
        <FileUpload onFileSelect={handleFileSelect} />
      )}
    </div>
  );
}; 