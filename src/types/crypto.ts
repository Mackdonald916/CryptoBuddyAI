export interface CryptoData {
  price_trend: 'rising' | 'falling' | 'stable';
  market_cap: 'high' | 'medium' | 'low';
  energy_use: 'high' | 'medium' | 'low';
  sustainability_score: number;
  current_price?: number;
  volume_24h?: number;
  description?: string;
}

export interface CryptoDatabase {
  [key: string]: CryptoData;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}