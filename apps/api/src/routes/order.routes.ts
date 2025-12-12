import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const orderController = new OrderController();

router.use(authenticate);

router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.post('/:id/cancel', orderController.cancelOrder);

export default router;
