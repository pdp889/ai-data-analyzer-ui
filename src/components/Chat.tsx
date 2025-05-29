import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useChat } from '../hooks/useChat';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};

interface ChatMessageFromHook {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const MessageBubble = ({ message, index }: { message: ChatMessageFromHook; index: number }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.1,
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className="flex flex-col max-w-[80%]">
        <div
          className={`rounded-2xl p-3 ${
            isUser
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
        >
          {message.content}
        </div>
        <span className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
};

const LoadingDots = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-start"
  >
    <div className="bg-gray-100 text-gray-800 rounded-2xl p-3 rounded-bl-none">
      <div className="flex space-x-2">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
          className="w-2 h-2 bg-gray-400 rounded-full"
        />
      </div>
    </div>
  </motion.div>
);

export const Chat = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isPending, error } = useChat();
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
    if (!input.trim() || isPending) return;

    sendMessage(input.trim());
    setInput('');
    // Scroll to bottom when user sends a message
    setTimeout(scrollToBottom, 100);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <AnimatePresence>
          {messages.map((message: ChatMessageFromHook, index: number) => (
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
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as FormEvent<HTMLFormElement>);
              }
            }}
            placeholder="Ask a question about the data..."
            className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none min-h-[40px] max-h-[120px]"
            disabled={isPending}
            rows={1}
            style={{ overflow: 'hidden' }}
            onInput={e => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 120) + 'px';
            }}
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
      </motion.form>
    </div>
  );
};
