import React from 'react';
import { TrendingUp, Leaf, Shield, BarChart3 } from 'lucide-react';

interface QuickActionsProps {
  onQuickAction: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onQuickAction }) => {
  const quickActions = [
    {
      icon: TrendingUp,
      label: 'Trending Cryptos',
      action: 'What cryptocurrencies are rising right now?',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Leaf,
      label: 'Sustainable Options',
      action: 'Which cryptocurrencies are most sustainable?',
      color: 'from-green-600 to-teal-600'
    },
    {
      icon: Shield,
      label: 'Safe Investments',
      action: 'What are the safest cryptocurrency investments?',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: BarChart3,
      label: 'Best Overall',
      action: 'What is the best cryptocurrency to invest in?',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="p-4 border-t border-gray-100">
      <p className="text-sm text-gray-600 mb-3 font-medium">Quick questions:</p>
      <div className="grid grid-cols-2 gap-2">
        {quickActions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={index}
              onClick={() => onQuickAction(action.action)}
              className={`p-3 rounded-xl bg-gradient-to-r ${action.color} text-white text-sm font-medium hover:shadow-md transition-all duration-200 flex items-center gap-2`}
            >
              <IconComponent className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};