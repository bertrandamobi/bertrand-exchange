import { generateAiInsights } from '../ai/predictor.js';

const symbols = ['BTCUSD', 'ETHUSD', 'AAPL', 'NVDA'];
const state = Object.fromEntries(symbols.map((s) => [s, 100 + Math.random() * 1000]));
const ticks = [];

export const initMarketSocket = (io) => {
  setInterval(() => {
    const updates = symbols.map((symbol) => {
      const delta = (Math.random() - 0.5) * 4;
      state[symbol] = Math.max(1, state[symbol] + delta);
      return { symbol, price: Number(state[symbol].toFixed(2)), volume: Math.round(1000 + Math.random() * 5000), time: Date.now() };
    });
    ticks.push(...updates);
    if (ticks.length > 150) ticks.splice(0, ticks.length - 150);
    io.emit('market:update', { updates, ai: generateAiInsights(ticks) });
    io.emit('news:update', { headline: 'AI detected volatility cluster in tech equities', ts: Date.now() });
  }, 1500);
};
