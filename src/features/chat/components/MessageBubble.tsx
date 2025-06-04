import { motion } from 'framer-motion';
import type { ChatMessage } from '../types/chat.types';
import { formatTime } from '../utils/formatTime';

interface MessageBubbleProps {
  message: ChatMessage;
  index: number;
}

export const MessageBubble = ({ message }: MessageBubbleProps): JSX.Element => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className="flex flex-col max-w-[80%]">
        <div
          className={`rounded-2xl p-3 break-words whitespace-pre-wrap ${
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
