import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/search', productController.searchProducts);
router.get('/:id', productController.getProductById);

// Admin routes
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  productController.createProduct
);
router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  productController.updateProduct
);
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  productController.deleteProduct
);

export default router;
