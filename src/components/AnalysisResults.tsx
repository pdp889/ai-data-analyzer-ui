import { useState } from 'react';
import type { AnalysisResponse } from '../types/api';
import { Chat } from './Chat';
import { InsightCard } from './InsightCard';
import { ChevronIcon } from './ChevronIcon';

interface AnalysisResultsProps {
  data: AnalysisResponse;
}

export const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  const { profile, insights, narrative } = data.data;
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column - Narrative */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow p-4 h-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Narrative</h2>
            <p className="text-gray-600 text-sm">{narrative}</p>
          </div>
        </div>

        {/* Middle Column - Insights */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow p-4 h-full">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Insights</h2>
            <div className="space-y-2 h-[550px] overflow-y-auto">
              {insights.map((insight, index) => (
                <InsightCard key={index} insight={insight} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Chat */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow p-4 h-full flex flex-col">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Ask Questions</h2>
            <div className="flex-1">
              <Chat />
            </div>
          </div>
        </div>

        {/* Dataset Profile - Full Width Below */}
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
      </div>
    </div>
  );
}; 