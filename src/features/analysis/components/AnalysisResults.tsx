import { useState } from 'react';
import type { AnalysisResponse, Insight } from '../types/analysis.types';
import { Chat } from '../../chat/components/Chat';
import { InsightCard } from './InsightCard';
import { ChevronIcon } from './ChevronIcon';
import { motion } from 'framer-motion';
import { Header } from '../../../shared/components/Header';
import { HeaderStatus } from '../../../shared/types/header.types';

import { useClearSession } from '../hooks/clear-session.hook';
import { toast } from 'react-hot-toast';

interface AnalysisResultsProps {
  data: AnalysisResponse;
  onClear?: () => void;
}

export const AnalysisResults = ({ data, onClear }: AnalysisResultsProps) => {
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const { mutate: clearSession, isPending } = useClearSession();

  if (!data || !data.data) {
    return (
      <div className="max-w-[1600px] mx-auto p-8 text-center">
        <p className="text-gray-600">No analysis data available.</p>
      </div>
    );
  }

  const { profile, insights, narrative } = data.data;

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
    <div className="max-w-[1600px] mx-auto p-8">
      <motion.div
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        className="flex justify-between items-center"
      >
        <Header status={HeaderStatus.ANALYSIS} />
        <motion.button
          onClick={handleClear}
          disabled={isPending}
          className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPending ? 'Clearing...' : 'Clear Analysis'}
        </motion.button>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-4"
      >
        {/* Left Column - Narrative */}
        {narrative && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-lg shadow p-4 h-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Narrative</h2>
              <p className="text-gray-600 text-sm">{narrative}</p>
            </div>
          </motion.div>
        )}

        {/* Middle Column - Insights */}
        {insights && insights.length > 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-lg shadow p-4 h-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Insights</h2>
              <div className="space-y-2 h-[550px] overflow-y-auto">
                {insights.map((insight: Insight, index: number) => (
                  <InsightCard key={index} insight={insight} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Right Column - Chat */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-4"
        >
          <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Ask Questions</h2>
            <div className="flex-1">
              <Chat />
            </div>
          </div>
        </motion.div>

        {/* Dataset Profile - Full Width Below */}
        {profile && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-12"
          >
            <div className="bg-white rounded-lg shadow p-4">
              <button
                onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                className="flex items-center justify-between w-full text-left"
              >
                <h2 className="text-lg font-semibold text-gray-800">Dataset Profile</h2>
                <ChevronIcon expanded={isProfileExpanded} />
              </button>

              {isProfileExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2"
                >
                  <pre className="text-sm text-gray-600 whitespace-pre-wrap bg-gray-50 p-3 rounded-lg overflow-auto max-h-48">
                    {JSON.stringify(profile, null, 2)}
                  </pre>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
