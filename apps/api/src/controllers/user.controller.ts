import { Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '@berrio/database';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export class UserController {
  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          avatar: true,
          role: true,
          createdAt: true,
        },
      });

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { name, phone, avatar } = (req as any).body;

      const user = await prisma.user.update({
        where: { id: userId },
        data: { name, phone, avatar },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          avatar: true,
          role: true,
        },
      });

      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { currentPassword, newPassword } = (req as any).body;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      const isValidPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isValidPassword) {
        throw new AppError('Invalid current password', 400);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      res.json({
        success: true,
        message: 'Password changed successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
