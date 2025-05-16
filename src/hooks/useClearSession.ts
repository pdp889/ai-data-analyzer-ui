import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ClearSessionResponse {
  success: boolean;
  message: string;
}

const API_URL = import.meta.env.VITE_API_URL + '/clear-session';

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

export const useClearSession = () => {
  const queryClient = useQueryClient();

  return useMutation<ClearSessionResponse, Error>({
    mutationFn: async () => {
      const response = await fetch(API_URL, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Failed to clear session' }));
        throw new Error(error.message || 'Failed to clear session');
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch the existing analysis query
      queryClient.invalidateQueries({ queryKey: ['existingAnalysis'] });
    },
  });
};
