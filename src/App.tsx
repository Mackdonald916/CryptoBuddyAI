import React from 'react';
import { ChatContainer } from './components/ChatContainer';
import { Bot, TrendingUp } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CryptoBuddy</h1>
              <p className="text-sm text-gray-600">Your AI Crypto Investment Advisor</p>
            </div>
            <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Live Analysis</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Container */}
      <main className="max-w-4xl mx-auto h-[calc(100vh-80px)]">
        <div className="h-full bg-white/60 backdrop-blur-sm border-x border-gray-200 shadow-xl">
          <ChatContainer />
        </div>
      </main>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center py-2 text-xs font-medium">
        ⚠️ Educational purposes only. Always do your own research before investing in cryptocurrencies.
      </div>
    </div>
  );
}

export default App;