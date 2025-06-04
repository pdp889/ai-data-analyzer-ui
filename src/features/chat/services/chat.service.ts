import type { ChatResponse } from '../types/chat.types';
import {
  getAuthHeaders,
  setSessionToken,
  extractSessionToken,
} from '../../../shared/services/session.service';

const API_URL = import.meta.env.VITE_API_URL + '/ask';
const REQUEST_TIMEOUT = 300000; // 5 minutes

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

const createTimeoutPromise = (ms: number): Promise<never> =>
  new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), ms));

const handleResponse = async (response: Response): Promise<ChatResponse> => {
  // Store the session token if it exists in the response
  const sessionToken = extractSessionToken(response);
  if (sessionToken) {
    setSessionToken(sessionToken);
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to get answer' }));
    throw new Error(error.message || 'Failed to get answer');
  }

  return response.json();
};

export const sendChatMessage = async (question: string): Promise<ChatResponse> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const response = await Promise.race([
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ question }),
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }),
      createTimeoutPromise(REQUEST_TIMEOUT),
    ]);

    clearTimeout(timeoutId);
    return handleResponse(response);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw new Error('An error occurred while sending the chat message');
    }
    throw error;
  }
};
