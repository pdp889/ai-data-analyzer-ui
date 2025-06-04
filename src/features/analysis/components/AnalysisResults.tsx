import { useState } from 'react';
import { motion } from 'framer-motion';
import type { AnalysisResponse, Insight, AdditionalContext } from '../types/analysis.types';
import { Chat } from '../../chat/components/Chat';
import { InsightCard } from './InsightCard';
import { ChevronIcon } from './ChevronIcon';
import { Header } from '../../../shared/components/Header';
import { HeaderStatus } from '../../../shared/types/header.types';

import { useClearSession } from '../hooks/clear-session.hook';
import { toast } from 'react-hot-toast';
import type { ChatMessage } from '../../chat/types/chat.types';

interface AnalysisResultsProps {
  data: AnalysisResponse;
  onClear?: () => void;
  conversationHistory: ChatMessage[] | undefined;
}

export const AnalysisResults = ({ data, onClear, conversationHistory }: AnalysisResultsProps) => {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const { mutate: clearSession, isPending } = useClearSession();

  if (!data || !data.data) {
    return (
      <div className="max-w-[1600px] mx-auto p-8 text-center">
        <p className="text-gray-600">No analysis data available.</p>
      </div>
    );
  }

  const { profile, insights, narrative, additionalContexts } = data.data;

  const handleClear = () => {
    clearSession(undefined, {
      onSuccess: () => {
        toast.success('Analysis session cleared successfully');
        onClear?.();
      },
      onError: error => {
        toast.error(error.message || 'Failed to clear session');
      },
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-[1600px] p-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
        <Header status={HeaderStatus.ANALYSIS} />
        <button
          onClick={handleClear}
          disabled={isPending}
          className="mx-5 sm:w-auto px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
        >
          {isPending ? 'Clearing...' : 'Clear Analysis'}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-4">
          {narrative && (
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Narrative</h2>
              <p className="text-gray-600 text-sm">{narrative}</p>
            </div>
          )}

          {insights && insights.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Insights</h2>
              <div className="space-y-2">
                {insights.map((insight: Insight, index: number) => (
                  <InsightCard key={index} insight={insight} />
                ))}
              </div>
            </div>
          )}

          {Array.isArray(additionalContexts) && additionalContexts.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Additional Context</h2>
              <div className="space-y-4">
                {additionalContexts.map((context: AdditionalContext, index: number) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-center mb-3">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        context.type === 'FDA' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {context.type}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Event</label>
                        <p className="text-gray-700 text-sm leading-relaxed">{context.event}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Why it matters</label>
                        <p className="text-gray-700 text-sm leading-relaxed">{context.relevanceToData}</p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Date</label>
                        <p className="text-gray-700 text-sm">{context.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow p-4 flex flex-col sticky top-4 h-[95vh]">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Ask Questions</h2>
            <div className="flex-1 min-h-0">
              <Chat conversationHistory={conversationHistory} />
            </div>
          </div>
        </div>

        {profile && (
          <div className="lg:col-span-12">
            <div className="bg-white rounded-lg shadow p-4">
              <button
                onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-lg font-semibold text-gray-800">Dataset Profile</h2>
                <ChevronIcon expanded={isProfileExpanded} />
              </button>

              {isProfileExpanded && (
                <div className="mt-2">
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg overflow-auto max-h-48">
                    {JSON.stringify(profile, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
