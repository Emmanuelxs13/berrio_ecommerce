import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const userController = new UserController();

router.use(authenticate);

router.get('/me', userController.getProfile);
router.put('/me', userController.updateProfile);
router.post('/me/change-password', userController.changePassword);

export default router;
