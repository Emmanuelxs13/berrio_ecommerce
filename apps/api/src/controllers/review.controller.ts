import { Response, NextFunction } from 'express';
import { prisma } from '@berrio/database';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export class ReviewController {
  async getProductReviews(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { productId } = (req as any).params;

      const reviews = await prisma.review.findMany({
        where: {
          productId,
          status: 'APPROVED',
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      res.json({
        success: true,
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  }

  async createReview(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { productId, rating, comment, title } = (req as any).body;

      // Check if user has purchased the product
      const hasPurchased = await prisma.orderItem.findFirst({
        where: {
          productId,
          order: {
            userId,
            status: 'DELIVERED',
          },
        },
      });

      if (!hasPurchased) {
        throw new AppError('You must purchase this product to review it', 403);
      }

      // Check if user already reviewed
      const existingReview = await prisma.review.findUnique({
        where: {
          productId_userId: {
            productId,
            userId,
          },
        },
      });

      if (existingReview) {
        throw new AppError('You already reviewed this product', 400);
      }

      const review = await prisma.review.create({
        data: {
          userId,
          productId,
          rating,
          comment,
          title,
          status: 'APPROVED', // Auto-approve for now
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });

      res.status(201).json({
        success: true,
        data: review,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateReview(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = (req as any).params;
      const { rating, comment, title } = (req as any).body;

      const review = await prisma.review.findUnique({
        where: { id },
      });

      if (!review || review.userId !== userId) {
        throw new AppError('Review not found', 404);
      }

      const updated = await prisma.review.update({
        where: { id },
        data: {
          rating,
          comment,
          title,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });

      res.json({
        success: true,
        data: updated,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteReview(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = (req as any).params;

      const review = await prisma.review.findUnique({
        where: { id },
      });

      if (!review || review.userId !== userId) {
        throw new AppError('Review not found', 404);
      }

      await prisma.review.delete({
        where: { id },
      });

      res.json({
        success: true,
        message: 'Review deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
