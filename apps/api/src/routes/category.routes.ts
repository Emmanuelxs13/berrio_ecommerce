import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const router = Router();
const categoryController = new CategoryController();

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/products', categoryController.getCategoryProducts);

export default router;
