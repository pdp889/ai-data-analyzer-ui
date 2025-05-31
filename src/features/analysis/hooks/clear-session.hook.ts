import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ClearSessionResponse } from '../types/clear-session.types';
import { clearSession } from '../services/clear-session.service';

const API_URL = import.meta.env.VITE_API_URL + '/clear-session';

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

export const useClearSession = () => {
  const queryClient = useQueryClient();

  return useMutation<ClearSessionResponse, Error>({
    mutationFn: clearSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['existingAnalysis'] });
    },
  });
};
