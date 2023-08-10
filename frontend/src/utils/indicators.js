export const sma = (arr, period = 14) => {
  if (arr.length < period) return null;
  const subset = arr.slice(-period);
  return subset.reduce((a, b) => a + b, 0) / period;
};

export const rsi = (arr, period = 14) => {
  if (arr.length <= period) return 50;
  let gains = 0; let losses = 0;
  for (let i = arr.length - period; i < arr.length; i += 1) {
    const d = arr[i] - arr[i - 1];
    if (d > 0) gains += d; else losses += Math.abs(d);
  }
  const rs = gains / Math.max(losses, 1e-9);
  return 100 - (100 / (1 + rs));
};
