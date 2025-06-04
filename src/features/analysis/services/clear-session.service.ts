import type { ClearSessionResponse } from '../types/clear-session.types';

const API_URL = import.meta.env.VITE_API_URL + '/clear-session';

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

export const clearSession = async (): Promise<ClearSessionResponse> => {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to clear session' }));
    throw new Error(error.message || 'Failed to clear session');
  }

  return response.json();
};

