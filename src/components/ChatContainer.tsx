import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { QuickActions } from './QuickActions';
import { ChatMessage as ChatMessageType } from '../types/crypto';
import { CryptoBuddy } from '../services/chatbotService';

export const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      text: "Hey there! 👋 I'm CryptoBuddy, your friendly crypto investment advisor! I can help you find profitable and sustainable cryptocurrency investments. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatbot = useRef(new CryptoBuddy());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (messageText: string) => {
    // Add user message
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Generate bot response
    const response = chatbot.current.generateResponse(messageText);
    const botMessage: ChatMessageType = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <QuickActions onQuickAction={handleQuickAction} />
      )}

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};