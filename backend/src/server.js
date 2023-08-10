import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { app } from './app.js';
import { env } from './config/env.js';
import { initMarketSocket } from './sockets/marketSocket.js';

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

mongoose.connect(env.mongoUri).then(() => console.log('Mongo connected')).catch(() => console.log('Mongo unavailable, demo mode'));
initMarketSocket(io);

server.listen(env.port, () => console.log(`Backend running on ${env.port}`));
