import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { ChatMessage, ChatResponse, UseChatReturn } from '../types/chat.types';
import { sendChatMessage } from '../services/chat.service';

export const useChat = (initialMessages: ChatMessage[] = []): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);

  const mutation = useMutation<ChatResponse, Error, string>({
    mutationFn: sendChatMessage,
    onSuccess: data => {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.data.answer, timestamp: new Date() },
      ]);
    },
  });

  const sendMessage = (question: string): void => {
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
