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
}

export interface AnalysisResponse {
  status: 'success';
  data: AnalysisData | null;
}

export interface Insight {
  type: InsightType;
  description: string;
  confidence: number;
  supportingData: Record<string, unknown>;
}
