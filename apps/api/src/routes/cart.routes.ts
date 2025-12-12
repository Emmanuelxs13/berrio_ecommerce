import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const cartController = new CartController();

router.use(authenticate);

router.get('/', cartController.getCart);
router.post('/items', cartController.addItem);
router.put('/items/:id', cartController.updateItem);
router.delete('/items/:id', cartController.removeItem);
router.delete('/', cartController.clearCart);

export default router;
