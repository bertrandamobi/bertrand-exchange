import cors from 'cors';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import tradingRoutes from './routes/tradingRoutes.js';

export const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/trading', tradingRoutes);
