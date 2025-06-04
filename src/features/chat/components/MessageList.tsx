import type { ChatMessage } from '../types/chat.types';
import { MessageBubble } from './MessageBubble';
import { LoadingDots } from './LoadingDots';

interface MessageListProps {
  messages: ChatMessage[];
  isPending: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const MessageList = ({
  messages,
  isPending,
  containerRef,
}: MessageListProps): JSX.Element => (
  <div ref={containerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
    {messages.map((message: ChatMessage, index: number) => (
      <MessageBubble key={index} message={message} index={index} />
    ))}
    {isPending && <LoadingDots />}
  </div>
);
