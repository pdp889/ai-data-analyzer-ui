import type { ClearSessionResponse } from '../types/clear-session.types';
import { getAuthHeaders, clearSessionToken } from '../../../shared/services/session.service';

const API_URL = import.meta.env.VITE_API_URL + '/clear-session';

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

export const clearSession = async (): Promise<ClearSessionResponse> => {
  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to clear session' }));
    throw new Error(error.message || 'Failed to clear session');
  }

  // Clear the session token after successful session clear
  clearSessionToken();
  return response.json();
};

