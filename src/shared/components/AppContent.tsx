import { useFileAnalysis } from '../hooks/file-analysis.hooks';
import { FileUpload } from '../../features/file-upload/components/FileUpload';
import { AnalysisResults } from '../../features/analysis/components/AnalysisResults';
import { LoadingSpinner } from './LoadingSpinner';
import { HeaderStatus } from '../types/header.types';
import { useQueryClient } from '@tanstack/react-query';
import { usePreExistingAnalysis } from '../hooks/pre-existing-analysis.hooks';
import { useAnalysisNotifications } from '../hooks/use-analysis-notifications.hook';
import { useAgentStatus } from '../hooks/use-agent-status.hook';
import { useEffect, useState } from 'react';
import { fetchExistingAnalysis } from '../services/pre-existing-analysis.service';

export const AppContent = (): JSX.Element => {
  const preExistingAnalysisQuery = usePreExistingAnalysis();
  const queryClient = useQueryClient();
  const fileAnalysisMutation = useFileAnalysis();
  const { connect, disconnect, agentStatus } = useAgentStatus();
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const [isAnalysisRunning, setIsAnalysisRunning] = useState(false);

  useAnalysisNotifications({
    fileAnalysisMutation,
    preExistingAnalysisQuery,
  });

  // Manage SSE connection independently of mutation state
  useEffect(() => {
    if (isAnalysisRunning) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [isAnalysisRunning, connect, disconnect]);

  // Check for completion when agent status indicates analysis is done
  useEffect(() => {
    if (agentStatus && agentStatus.status === 'completed' && !isAnalysisComplete) {
      setIsAnalysisComplete(true);
      setIsAnalysisRunning(false);
      // Fetch the completed analysis
      fetchExistingAnalysis().then((result) => {
        queryClient.setQueryData(['existingAnalysis'], result);
      }).catch((error) => {
        console.error('Failed to fetch completed analysis:', error);
      });
    }
  }, [agentStatus, isAnalysisComplete, queryClient]);

  const handleClear = (): void => {
    fileAnalysisMutation.reset();
    queryClient.setQueryData(['existingAnalysis'], { status: 'success', data: null });
    setIsAnalysisComplete(false);
    setIsAnalysisRunning(false);
  };

  const handleFileSelect = (file: File | 'default'): void => {
    // Start analysis and SSE connection
    setIsAnalysisRunning(true);
    setIsAnalysisComplete(false);
    fileAnalysisMutation.mutate(file);
  };

  // Handle initial loading state for existing analysis
  if (preExistingAnalysisQuery.isLoading) {
    return <LoadingSpinner status={HeaderStatus.FETCHING_ANALYSIS} fileName="" />;
  }

  const showNewAnalysis = isAnalysisRunning || (isAnalysisComplete && preExistingAnalysisQuery.data?.data);
  const showExistingAnalysis = !showNewAnalysis && preExistingAnalysisQuery.data?.data;
  const existingConversationHistory = preExistingAnalysisQuery.data?.conversationHistory;
  const showFileUpload = !showNewAnalysis && !showExistingAnalysis;

  return (
    <div className="max-w-7xl mx-auto">
      {showNewAnalysis && (
        <>
          {isAnalysisRunning && (
            <LoadingSpinner
              status={HeaderStatus.LOADING}
              fileName={
                fileAnalysisMutation.variables === 'default'
                  ? 'sample_foodborne_illness.csv'
                  : fileAnalysisMutation.variables?.name || 'Unknown file'
              }
            />
          )}
          {isAnalysisComplete && preExistingAnalysisQuery.data && (
            <AnalysisResults
              data={preExistingAnalysisQuery.data}
              onClear={handleClear}
              conversationHistory={undefined}
            />
          )}
        </>
      )}

      {showExistingAnalysis && preExistingAnalysisQuery.data && (
        <AnalysisResults
          data={preExistingAnalysisQuery.data}
          onClear={handleClear}
          conversationHistory={existingConversationHistory}
        />
      )}

      {showFileUpload && <FileUpload onFileSelect={handleFileSelect} />}
    </div>
  );
};
