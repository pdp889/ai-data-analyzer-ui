import { useState, useEffect, useCallback } from 'react';
import type { AgentStatus } from '../services/agent-status.service';
import { agentStatusService } from '../services/agent-status.service';

export const useAgentStatus = () => {
  const [agentStatus, setAgentStatus] = useState<AgentStatus | null>(null);

  useEffect(() => {
    const unsubscribe = agentStatusService.subscribe(status => {
      setAgentStatus(status);
    });

    return unsubscribe;
  }, []);

  const connect = useCallback(() => {
    agentStatusService.connect();
  }, []);

  const disconnect = useCallback(() => {
    agentStatusService.disconnect();
  }, []);

  return {
    agentStatus,
    connect,
    disconnect,
  };
};
