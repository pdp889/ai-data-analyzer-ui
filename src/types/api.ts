export type ColumnType = 'numeric' | 'categorical' | 'datetime' | 'text';

export interface ColumnInfo {
  name: string;
  type: ColumnType;
  uniqueValues?: number;
  missingValues?: number;
}

export type InsightType = 'correlation' | 'trend' | 'anomaly' | 'pattern';

export interface Insight {
  type: InsightType;
  description: string;
  confidence: number;
  supportingData: Record<string, unknown>;
}

export interface AnalysisData {
  columns: ColumnInfo[];
  rowCount: number;
  summary: string;
  anomalies: string[];
  profile: Record<string, unknown>;
  insights: Insight[];
  narrative: string;
}

export interface AnalysisResponse {
  status: 'success';
  data: AnalysisData;
} 