import type { ChatMessage } from '../../chat/types/chat.types';

type ColumnType = 'numeric' | 'categorical' | 'datetime' | 'text';

interface ColumnInfo {
  name: string;
  type: ColumnType;
  uniqueValues?: number;
  missingValues?: number;
}

type InsightType = 'correlation' | 'trend' | 'anomaly' | 'pattern';

interface AnalysisData {
  columns: ColumnInfo[];
  rowCount: number;
  summary: string;
  anomalies: string[];
  profile: Record<string, unknown>;
  insights: Insight[];
  narrative: string;
  additionalContexts: AdditionalContext[];
}

type AdditionalContextType = 'FDA' | 'USDA';

export interface AdditionalContext {
  type: AdditionalContextType;
  event: string;
  relevanceToData: string;
  date: string;
}

export interface AnalysisResponse {
  status: 'success';
  data: AnalysisData | null;
  conversationHistory: ChatMessage[] | undefined;
}

export interface Insight {
  type: InsightType;
  description: string;
  confidence: number;
  supportingData: Record<string, unknown>;
}
