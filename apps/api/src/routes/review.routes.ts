import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const reviewController = new ReviewController();

router.get('/product/:productId', reviewController.getProductReviews);
router.post('/', authenticate, reviewController.createReview);
router.put('/:id', authenticate, reviewController.updateReview);
router.delete('/:id', authenticate, reviewController.deleteReview);

export default router;
