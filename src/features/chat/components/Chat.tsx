import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useChat } from '../hooks/chat.hooks';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import type { ChatMessage } from '../types/chat.types';
import { MessageBubble } from './MessageBubble';
import { LoadingDots } from './LoadingDots';
import { MAX_MESSAGE_LENGTH, sanitizeInput } from '../utils/sanitize';

interface ChatProps {
  conversationHistory?: ChatMessage[];
}

export const Chat = ({ conversationHistory }: ChatProps): JSX.Element => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isPending, error } = useChat(conversationHistory ?? []);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Only scroll if the last message was from the user
    if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'An error occurred in the chat.');
    }
  }, [error]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    
    if (!trimmedInput || isPending) return;
    
    const result = sanitizeInput(trimmedInput);
    if (!result.isValid) {
      toast.error(result.error || 'An error occurred in the chat.');
      return;
    }
    
    sendMessage(result.sanitizedInput);
    setInput('');
    // Scroll to bottom when user sends a message
    setTimeout(scrollToBottom, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setInput(value);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <AnimatePresence>
          {messages.map((message: ChatMessage, index: number) => (
            <MessageBubble key={index} message={message} index={index} />
          ))}
          {isPending && <LoadingDots />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="p-3 border-t bg-gray-50"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="flex space-x-2">
          <motion.textarea
            value={input}
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
              }
            }}
            placeholder="Ask a question..."
            className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none min-h-[40px] max-h-[120px]"
            disabled={isPending}
            rows={1}
            style={{ overflow: 'hidden' }}
            onInput={e => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 120) + 'px';
            }}
            maxLength={MAX_MESSAGE_LENGTH}
          />
          <motion.button
            type="submit"
            disabled={!input.trim() || isPending}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm self-end"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </div>
        <div className="text-xs text-gray-500 mt-1 text-right">
          {input.length}/{MAX_MESSAGE_LENGTH} characters
        </div>
      </motion.form>
    </div>
  );
};
