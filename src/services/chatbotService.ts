import { cryptoDatabase } from '../data/cryptoDatabase';
import { CryptoData } from '../types/crypto';

export class CryptoBuddy {
  private responses = {
    greeting: [
      "Hey there! 👋 I'm CryptoBuddy, your friendly crypto investment advisor! What can I help you discover today?",
      "Welcome to CryptoBuddy! 🚀 Ready to explore some crypto opportunities? Ask me anything!",
      "Hi! I'm CryptoBuddy, here to help you navigate the crypto world with smart, sustainable advice! 🌱"
    ],
    fallback: [
      "Hmm, I didn't quite catch that! Try asking about crypto trends, sustainability, or specific coins like Bitcoin or Ethereum! 🤔",
      "I'm still learning! You can ask me about rising cryptos, sustainable coins, or investment advice! 💡",
      "Not sure about that one! How about asking which crypto is trending or most eco-friendly? 🌿"
    ],
    disclaimer: "⚠️ Remember: Crypto investments are risky! Always do your own research and never invest more than you can afford to lose!"
  };

  generateResponse(userInput: string): string {
    const input = userInput.toLowerCase();

    // Greeting responses
    if (this.matchesKeywords(input, ['hello', 'hi', 'hey', 'start', 'help'])) {
      return this.getRandomResponse(this.responses.greeting);
    }

    // Sustainability queries
    if (this.matchesKeywords(input, ['sustainable', 'eco', 'green', 'environment', 'energy'])) {
      return this.getSustainableRecommendation();
    }

    // Profitability queries
    if (this.matchesKeywords(input, ['profit', 'rising', 'trending', 'growth', 'gains', 'bull'])) {
      return this.getProfitableRecommendation();
    }

    // Best overall investment
    if (this.matchesKeywords(input, ['best', 'recommend', 'invest', 'buy', 'good'])) {
      return this.getBestOverallRecommendation();
    }

    // High market cap queries
    if (this.matchesKeywords(input, ['safe', 'stable', 'large', 'established', 'market cap'])) {
      return this.getSafeInvestmentRecommendation();
    }

    // Specific coin queries
    const mentionedCoin = this.findMentionedCoin(input);
    if (mentionedCoin) {
      return this.getCoinAnalysis(mentionedCoin);
    }

    // Compare coins
    if (this.matchesKeywords(input, ['compare', 'versus', 'vs', 'difference'])) {
      return this.getComparisonAdvice();
    }

    // Fallback response
    return this.getRandomResponse(this.responses.fallback);
  }

  private matchesKeywords(input: string, keywords: string[]): boolean {
    return keywords.some(keyword => input.includes(keyword));
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getSustainableRecommendation(): string {
    const sustainableCoins = Object.entries(cryptoDatabase)
      .filter(([_, data]) => data.sustainability_score >= 7)
      .sort((a, b) => b[1].sustainability_score - a[1].sustainability_score);

    if (sustainableCoins.length > 0) {
      const [topCoin, data] = sustainableCoins[0];
      return `🌱 For sustainable investing, I recommend **${topCoin}**! It has a sustainability score of ${data.sustainability_score}/10 with ${data.energy_use} energy consumption. ${data.description} 

Current price: $${data.current_price?.toLocaleString()}

${this.responses.disclaimer}`;
    }

    return "I couldn't find sustainable options right now. Try asking about specific coins! 🌿";
  }

  private getProfitableRecommendation(): string {
    const risingCoins = Object.entries(cryptoDatabase)
      .filter(([_, data]) => data.price_trend === 'rising')
      .sort((a, b) => {
        const scoreA = this.calculateProfitScore(a[1]);
        const scoreB = this.calculateProfitScore(b[1]);
        return scoreB - scoreA;
      });

    if (risingCoins.length > 0) {
      const [topCoin, data] = risingCoins[0];
      return `🚀 **${topCoin}** is trending upward with ${data.market_cap} market cap! ${data.description}

Current price: $${data.current_price?.toLocaleString()}
24h Volume: $${data.volume_24h?.toLocaleString()}

${this.responses.disclaimer}`;
    }

    return "The market is quite volatile right now. Consider looking at stable, established coins! 📊";
  }

  private getBestOverallRecommendation(): string {
    const balancedCoins = Object.entries(cryptoDatabase)
      .map(([name, data]) => ({
        name,
        data,
        score: this.calculateOverallScore(data)
      }))
      .sort((a, b) => b.score - a.score);

    if (balancedCoins.length > 0) {
      const top = balancedCoins[0];
      return `⭐ Based on both profitability and sustainability, I recommend **${top.name}**! 

📊 Price trend: ${top.data.price_trend}
🌱 Sustainability: ${top.data.sustainability_score}/10
💰 Market cap: ${top.data.market_cap}
⚡ Energy use: ${top.data.energy_use}

${top.data.description}

${this.responses.disclaimer}`;
    }

    return "Let me analyze the market for you! Try asking about specific aspects like sustainability or growth potential! 📈";
  }

  private getSafeInvestmentRecommendation(): string {
    const safeCoins = Object.entries(cryptoDatabase)
      .filter(([_, data]) => data.market_cap === 'high')
      .sort((a, b) => this.calculateStabilityScore(b[1]) - this.calculateStabilityScore(a[1]));

    if (safeCoins.length > 0) {
      const [topCoin, data] = safeCoins[0];
      return `🛡️ For stability, consider **${topCoin}** - it has a ${data.market_cap} market cap and is ${data.price_trend}. 

${data.description}

Current price: $${data.current_price?.toLocaleString()}

${this.responses.disclaimer}`;
    }

    return "Consider looking at established cryptocurrencies with proven track records! 🏛️";
  }

  private getCoinAnalysis(coinName: string): string {
    const data = cryptoDatabase[coinName];
    const sustainabilityEmoji = data.sustainability_score >= 7 ? '🌱' : data.sustainability_score >= 5 ? '⚖️' : '⚠️';
    const trendEmoji = data.price_trend === 'rising' ? '📈' : data.price_trend === 'falling' ? '📉' : '➡️';

    return `${trendEmoji} **${coinName} Analysis:**

💰 Price: $${data.current_price?.toLocaleString()} (${data.price_trend})
📊 Market Cap: ${data.market_cap}
⚡ Energy Use: ${data.energy_use}
${sustainabilityEmoji} Sustainability: ${data.sustainability_score}/10

${data.description}

${this.getInvestmentAdvice(data)}

${this.responses.disclaimer}`;
  }

  private getComparisonAdvice(): string {
    return `🔍 I can help you compare cryptocurrencies! Try asking about specific coins like "tell me about Bitcoin" or "compare sustainable coins". 

You can also ask about:
• Most sustainable cryptocurrencies 🌱
• Rising/trending coins 📈  
• Safest investments 🛡️
• Best overall recommendations ⭐`;
  }

  private findMentionedCoin(input: string): string | null {
    const coins = Object.keys(cryptoDatabase);
    return coins.find(coin => input.includes(coin.toLowerCase())) || null;
  }

  private calculateProfitScore(data: CryptoData): number {
    let score = 0;
    if (data.price_trend === 'rising') score += 3;
    if (data.market_cap === 'high') score += 2;
    else if (data.market_cap === 'medium') score += 1;
    return score;
  }

  private calculateOverallScore(data: CryptoData): number {
    let score = 0;
    // Profitability factors
    if (data.price_trend === 'rising') score += 3;
    else if (data.price_trend === 'stable') score += 1;
    
    if (data.market_cap === 'high') score += 2;
    else if (data.market_cap === 'medium') score += 1;
    
    // Sustainability factors
    score += data.sustainability_score * 0.5;
    if (data.energy_use === 'low') score += 2;
    else if (data.energy_use === 'medium') score += 1;
    
    return score;
  }

  private calculateStabilityScore(data: CryptoData): number {
    let score = 0;
    if (data.market_cap === 'high') score += 3;
    if (data.price_trend === 'stable') score += 2;
    else if (data.price_trend === 'rising') score += 1;
    return score;
  }

  private getInvestmentAdvice(data: CryptoData): string {
    if (data.sustainability_score >= 8 && data.price_trend === 'rising') {
      return "💡 This looks like an excellent long-term investment with strong environmental credentials!";
    } else if (data.market_cap === 'high' && data.price_trend !== 'falling') {
      return "💡 A solid, established choice for conservative investors.";
    } else if (data.sustainability_score >= 7) {
      return "💡 Great for ESG-conscious investors looking for sustainable crypto options.";
    } else if (data.price_trend === 'rising') {
      return "💡 Could be good for short-term gains, but watch the sustainability impact.";
    } else {
      return "💡 Consider your risk tolerance and investment timeline carefully.";
    }
  }
}