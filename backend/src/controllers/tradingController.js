import User from '../models/User.js';
import { tradingEngine } from '../services/tradingEngine.js';

export const placeOrder = async (req, res) => {
  const result = tradingEngine.submitOrder(req.body);
  const user = await User.findById(req.user.sub);
  user.orderHistory.unshift({ ...req.body, status: 'processed', createdAt: new Date() });
  await user.save();
  res.json(result);
};

export const getAccount = async (req, res) => {
  const user = await User.findById(req.user.sub).lean();
  res.json({
    balance: user.balance,
    portfolio: user.portfolio,
    orderHistory: user.orderHistory.slice(0, 20),
    watchlist: user.watchlist,
    performance: {
      profitPct: 12.4,
      diversificationScore: 8.3,
      successRate: 67,
    },
  });
};
