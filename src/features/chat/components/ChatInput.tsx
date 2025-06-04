import type { FormEvent, KeyboardEvent } from 'react';
import { MAX_MESSAGE_LENGTH } from '../utils/sanitize';

interface ChatInputProps {
  input: string;
  isPending: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export const ChatInput = ({ input, isPending, onInputChange, onSend }: ChatInputProps): JSX.Element => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = Math.min(target.scrollHeight, 120) + 'px';
  };

  return (
    <div className="p-3 border-t bg-gray-50">
      <div className="flex space-x-2">
        <textarea
          value={input}
          onChange={e => {
            const value = e.target.value;
            if (value.length <= MAX_MESSAGE_LENGTH) {
              onInputChange(value);
            }
          }}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Ask a question..."
          className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none min-h-[40px] max-h-[120px]"
          disabled={isPending}
          rows={1}
          style={{ overflow: 'hidden' }}
          maxLength={MAX_MESSAGE_LENGTH}
        />
        <button
          onClick={onSend}
          disabled={!input.trim() || isPending}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm self-end"
        >
          Send
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-1 text-right">
        {input.length}/{MAX_MESSAGE_LENGTH} characters
      </div>
    </div>
  );
}; 