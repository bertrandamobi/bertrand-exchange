import { v4 as uuidv4 } from 'uuid';

class OrderBook {
  constructor(symbol) {
    this.symbol = symbol;
    this.bids = [];
    this.asks = [];
    this.trades = [];
  }

  addOrder(order) {
    const bookSide = order.side === 'buy' ? this.bids : this.asks;
    bookSide.push(order);
    this.sortBook();
    return this.matchOrders();
  }

  sortBook() {
    this.bids.sort((a, b) => b.price - a.price || a.timestamp - b.timestamp);
    this.asks.sort((a, b) => a.price - b.price || a.timestamp - b.timestamp);
  }

  matchOrders() {
    const fills = [];
    while (this.bids.length && this.asks.length && this.bids[0].price >= this.asks[0].price) {
      const bid = this.bids[0];
      const ask = this.asks[0];
      const qty = Math.min(bid.remainingQty, ask.remainingQty);
      const price = (bid.timestamp < ask.timestamp) ? bid.price : ask.price;
      const trade = { id: uuidv4(), symbol: this.symbol, qty, price, timestamp: Date.now() };
      fills.push(trade);
      this.trades.unshift(trade);
      bid.remainingQty -= qty;
      ask.remainingQty -= qty;
      if (bid.remainingQty === 0) this.bids.shift();
      if (ask.remainingQty === 0) this.asks.shift();
    }
    return fills;
  }

  snapshot() {
    return {
      symbol: this.symbol,
      bids: this.bids.slice(0, 20),
      asks: this.asks.slice(0, 20),
      trades: this.trades.slice(0, 40),
    };
  }
}

class TradingEngine {
  constructor() {
    this.books = new Map();
  }

  getBook(symbol) {
    if (!this.books.has(symbol)) this.books.set(symbol, new OrderBook(symbol));
    return this.books.get(symbol);
  }

  submitOrder(payload) {
    const order = {
      id: uuidv4(),
      ...payload,
      remainingQty: payload.qty,
      timestamp: Date.now(),
    };
    const book = this.getBook(payload.symbol);
    const fills = book.addOrder(order);
    return { order, fills, book: book.snapshot() };
  }
}

export const tradingEngine = new TradingEngine();
