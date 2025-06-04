import { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/chat.hooks';
import { toast } from 'react-hot-toast';
import type { ChatMessage } from '../types/chat.types';
import { sanitizeInput } from '../utils/sanitize';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

interface ChatProps {
  conversationHistory?: ChatMessage[];
}

export const Chat = ({ conversationHistory }: ChatProps): JSX.Element => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isPending, error } = useChat(conversationHistory ?? []);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!isPending && messages.length > 0) {
      scrollToBottom();
    }
  }, [isPending, messages.length]);

  if (error) {
    toast.error(error.message || 'An error occurred in the chat.');
  }

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isPending) return;

    const result = sanitizeInput(trimmedInput);
    if (!result.isValid) {
      toast.error(result.error || 'An error occurred in the chat.');
      return;
    }

    sendMessage(result.sanitizedInput);
    setInput('');
    requestAnimationFrame(scrollToBottom);
  };

  return (
    <div className="flex flex-col h-full">
      <MessageList messages={messages} isPending={isPending} containerRef={chatContainerRef} />
      <ChatInput input={input} isPending={isPending} onInputChange={setInput} onSend={handleSend} />
    </div>
  );
};
