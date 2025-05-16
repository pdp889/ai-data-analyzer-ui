import type { Insight } from '../types/api';

interface InsightCardProps {
  insight: Insight;
}

export const InsightCard = ({ insight }: InsightCardProps) => (
  <div className="border-b border-gray-200 pb-4 last:border-0">
    <div className="flex items-center justify-between mb-2">
      <span className="px-2 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
        {insight.type}
      </span>
      <span className="text-sm text-gray-500">
        Confidence: {Math.round(insight.confidence * 100)}%
      </span>
    </div>
    <p className="text-gray-600">{insight.description}</p>
  </div>
);
