import { configureStore, createSlice } from '@reduxjs/toolkit';
import { assets, initialPortfolio, initialPrices } from '../data/demoSeed';

const simulation = createSlice({
  name: 'simulation',
  initialState: {
    cash: 100000,
    prices: initialPrices,
    candles: Object.fromEntries(assets.map((s) => [s, Array.from({ length: 30 }, (_, i) => initialPrices[s] * (1 + (Math.sin(i / 3) * 0.012)))])),
    selected: 'BTCUSDT',
    news: [{ headline: 'Bertrand AI: rotational strength seen in mega-cap tech.' }],
    portfolio: initialPortfolio,
    trades: [],
  },
  reducers: {
    tick: (state, { payload }) => {
      state.prices = payload.prices;
      state.candles = payload.candles;
      if (payload.news) state.news.unshift(payload.news);
      state.news = state.news.slice(0, 12);
    },
    setSelected: (state, { payload }) => { state.selected = payload; },
    placeDemoOrder: (state, { payload }) => { state.trades.unshift(payload); state.trades = state.trades.slice(0, 20); },
  },
});

export const { tick, setSelected, placeDemoOrder } = simulation.actions;
export const store = configureStore({ reducer: { simulation: simulation.reducer } });
