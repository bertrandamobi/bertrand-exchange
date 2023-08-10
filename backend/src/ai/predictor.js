export const generateAiInsights = (ticks) => {
  const prices = ticks.map((t) => t.price);
  const avg = prices.reduce((a, b) => a + b, 0) / Math.max(prices.length, 1);
  const momentum = prices.length > 1 ? prices[prices.length - 1] - prices[0] : 0;
  const direction = momentum > 0 ? 'bullish' : 'bearish';
  return {
    avgPrice: Number(avg.toFixed(2)),
    momentum: Number(momentum.toFixed(2)),
    sentiment: direction,
    prediction: `${direction.toUpperCase()} bias with ${Math.abs(momentum).toFixed(2)} move range`,
    strategy: momentum > 0 ? 'Consider trailing stop for long positions' : 'Use tight stop-loss on long entries',
  };
};
