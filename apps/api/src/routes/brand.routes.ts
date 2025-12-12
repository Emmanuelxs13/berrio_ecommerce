import { Router } from 'express';
import { BrandController } from '../controllers/brand.controller';

const router = Router();
const brandController = new BrandController();

router.get('/', brandController.getBrands);
router.get('/:id', brandController.getBrandById);
router.get('/:id/products', brandController.getBrandProducts);

export default router;
