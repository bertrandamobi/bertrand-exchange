import { Router } from 'express';
import { authRequired } from '../middleware/auth.js';
import { getAccount, placeOrder } from '../controllers/tradingController.js';

const router = Router();
router.get('/account', authRequired, getAccount);
router.post('/orders', authRequired, placeOrder);
export default router;
