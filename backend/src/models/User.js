import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  symbol: String,
  side: { type: String, enum: ['buy', 'sell'] },
  type: { type: String, enum: ['market', 'limit', 'stop'] },
  qty: Number,
  price: Number,
  status: { type: String, default: 'filled' },
  createdAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  balance: { type: Number, default: 100000 },
  marginEnabled: { type: Boolean, default: true },
  portfolio: {
    type: Map,
    of: Number,
    default: {},
  },
  watchlist: { type: [String], default: ['AAPL', 'BTCUSD', 'ETHUSD'] },
  orderHistory: { type: [orderSchema], default: [] },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
