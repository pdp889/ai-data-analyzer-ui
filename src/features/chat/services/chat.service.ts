import type { ChatResponse } from '../types/chat.types';

const API_URL = import.meta.env.VITE_API_URL + '/ask';

if (!API_URL) {
  throw new Error('VITE_API_URL environment variable is not set');
}

export const sendChatMessage = async (question: string): Promise<ChatResponse> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to get answer' }));
    throw new Error(error.message || 'Failed to get answer');
  }

  return response.json();
};
