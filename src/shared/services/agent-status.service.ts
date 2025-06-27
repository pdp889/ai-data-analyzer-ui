import { getSessionToken } from './session.service';

export type AgentName =
  | 'Profiler Agent'
  | 'Detective Agent'
  | 'Storyteller Agent'
  | 'Additional Context Agent'
  | 'Analysis Pipeline';

export type AgentStatusType = 'starting' | 'running' | 'completed' | 'error';

export interface AgentStatus {
  agent: AgentName;
  status: AgentStatusType;
  message: string;
  timestamp: number;
}

class AgentStatusService {
  private eventSource: EventSource | null = null;
  private listeners: ((status: AgentStatus | null) => void)[] = [];

  connect(): void {
    const API_URL = import.meta.env.VITE_API_URL;
    if (!API_URL) {
      console.error('VITE_API_URL environment variable is not set');
      return;
    }

    const sessionToken = getSessionToken();
    const statusUrl = sessionToken
      ? `${API_URL}/analyze/status?sessionToken=${encodeURIComponent(sessionToken)}`
      : `${API_URL}/analyze/status`;

    this.eventSource = new EventSource(statusUrl, {
      withCredentials: true,
    });

    this.eventSource.onmessage = event => {
      try {
        const data: AgentStatus = JSON.parse(event.data);

        // Validate that we have the required fields
        if (data.agent && data.status && data.message !== undefined) {
          this.notifyListeners(data);
        }
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    this.eventSource.onerror = error => {
      console.error('SSE connection error:', error);
      this.notifyListeners(null);
    };
  }

  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  subscribe(listener: (status: AgentStatus | null) => void): () => void {
    this.listeners.push(listener);

    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners(status: AgentStatus | null): void {
    this.listeners.forEach(listener => listener(status));
  }
}

export const agentStatusService = new AgentStatusService();
