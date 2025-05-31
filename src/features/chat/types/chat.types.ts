export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  success: boolean;
  data: {
    answer: string;
  };
}

export interface UseChatReturn {
  messages: ChatMessage[];
  sendMessage: (question: string) => void;
  isPending: boolean;
  error: Error | null;
}
