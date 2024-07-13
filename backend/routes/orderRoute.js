import express from 'express';
import * as orderController from '../controllers/orderController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, orderController.createOrder);
router.get('/user', authMiddleware, orderController.getUserOrders);
router.get('/all', orderController.getAllOrders);
router.patch('/:orderId', orderController.updateOrderStatus);

export default router;
