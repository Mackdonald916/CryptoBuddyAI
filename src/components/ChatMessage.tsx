import React from 'react';
import { Bot, User } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../types/crypto';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex gap-3 mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-2xl break-words ${
          isBot
            ? 'bg-white text-gray-800 shadow-sm border border-gray-100'
            : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
        }`}
      >
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.text.split('**').map((part, index) => (
            index % 2 === 1 ? (
              <strong key={index} className="font-semibold">{part}</strong>
            ) : (
              <span key={index}>{part}</span>
            )
          ))}
        </div>
        <div className={`text-xs mt-2 ${isBot ? 'text-gray-500' : 'text-blue-100'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};