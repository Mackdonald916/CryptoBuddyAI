import { CryptoDatabase } from '../types/crypto';

export const cryptoDatabase: CryptoDatabase = {
  "Bitcoin": {
    price_trend: "rising",
    market_cap: "high",
    energy_use: "high",
    sustainability_score: 3,
    current_price: 43250,
    volume_24h: 28500000000,
    description: "The original cryptocurrency and digital gold standard"
  },
  "Ethereum": {
    price_trend: "stable",
    market_cap: "high",
    energy_use: "medium",
    sustainability_score: 6,
    current_price: 2650,
    volume_24h: 15200000000,
    description: "Leading smart contract platform with proof-of-stake consensus"
  },
  "Cardano": {
    price_trend: "rising",
    market_cap: "medium",
    energy_use: "low",
    sustainability_score: 8,
    current_price: 0.45,
    volume_24h: 450000000,
    description: "Research-driven blockchain with focus on sustainability and scalability"
  },
  "Solana": {
    price_trend: "rising",
    market_cap: "high",
    energy_use: "low",
    sustainability_score: 7,
    current_price: 98.50,
    volume_24h: 2100000000,
    description: "High-performance blockchain supporting decentralized applications"
  },
  "Polygon": {
    price_trend: "stable",
    market_cap: "medium",
    energy_use: "low",
    sustainability_score: 8,
    current_price: 0.85,
    volume_24h: 380000000,
    description: "Ethereum scaling solution with carbon-negative commitment"
  },
  "Algorand": {
    price_trend: "rising",
    market_cap: "medium",
    energy_use: "low",
    sustainability_score: 9,
    current_price: 0.18,
    volume_24h: 45000000,
    description: "Pure proof-of-stake blockchain with carbon-negative protocol"
  }
};