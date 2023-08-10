import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tick } from '../store/store';

export const useDemoMarket = () => {
  const dispatch = useDispatch();
  const { prices, candles } = useSelector((s) => s.simulation);

  useEffect(() => {
    const id = setInterval(() => {
      const nextPrices = {};
      const nextCandles = {};
      Object.entries(prices).forEach(([symbol, value]) => {
        const drift = (Math.random() - 0.48) * value * 0.0025;
        const next = Math.max(0.01, value + drift);
        nextPrices[symbol] = Number(next.toFixed(2));
        const line = [...candles[symbol], nextPrices[symbol]].slice(-80);
        nextCandles[symbol] = line;
      });

      const flashNews = Math.random() > 0.85 ? { headline: `AI Pulse: ${Object.keys(nextPrices)[Math.floor(Math.random() * 5)]} volatility spike detected.` } : null;
      dispatch(tick({ prices: nextPrices, candles: nextCandles, news: flashNews }));
    }, 1200);
    return () => clearInterval(id);
  }, [candles, dispatch, prices]);
};
