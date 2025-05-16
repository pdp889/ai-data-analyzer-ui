import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatResponse {
  success: boolean;
  data: {
    answer: string;
  };
}

const API_URL = import.meta.env.VITE_API_URL + '/ask';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const mutation = useMutation<ChatResponse, Error, string>({
    mutationFn: async (question: string) => {
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
    },
    onSuccess: data => {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.data.answer, timestamp: new Date() },
      ]);
    },
  });

  const sendMessage = (question: string) => {
    const now = new Date();
    setMessages(prev => [...prev, { role: 'user', content: question, timestamp: now }]);
    mutation.mutate(question);
  };

  return {
    messages,
    sendMessage,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
