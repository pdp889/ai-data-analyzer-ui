import { useEffect } from 'react';
import { useFileAnalysis } from '../hooks/useFileAnalysis';
import { FileUpload } from './FileUpload';
import { AnalysisResults } from './AnalysisResults';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from './LoadingSpinner';

export const MainContent = () => {
  const mutation = useFileAnalysis();

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Analysis completed successfully!');
    } else if (mutation.isError) {
      toast.error(mutation.error?.message ?? 'An error occurred during analysis');
    }
  }, [mutation.isSuccess, mutation.isError, mutation.error]);

  const handleFileSelect = (file: File) => {
    mutation.mutate(file);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {!mutation.data && !mutation.isPending && (
        <FileUpload onFileSelect={handleFileSelect} />
      )}
      
      {mutation.isPending && <LoadingSpinner />}
      
      {mutation.data && !mutation.isPending && (
        <AnalysisResults data={mutation.data} />
      )}
    </div>
  );
}; 