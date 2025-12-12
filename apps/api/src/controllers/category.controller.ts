import { Request, Response, NextFunction } from 'express';
import { prisma } from '@berrio/database';
import { AppError } from '../middleware/errorHandler';
import { mockCategories } from '../utils/mockData';

// Check if DATABASE_URL is available
const useMockData = !process.env.DATABASE_URL;

export class CategoryController {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      // Use mock data if no database
      if (useMockData) {
        return res.json({
          success: true,
          data: mockCategories,
        });
      }

      const categories = await prisma.category.findMany({
        where: { isActive: true },
        include: {
          children: {
            where: { isActive: true },
          },
          _count: {
            select: { products: true },
          },
        },
        orderBy: { order: 'asc' },
      });

      res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      // Use mock data if no database
      if (useMockData) {
        const category = mockCategories.find((c) => c.id === id);
        if (!category) {
          throw new AppError('Category not found', 404);
        }
        return res.json({
          success: true,
          data: category,
        });
      }

      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          children: { where: { isActive: true } },
          parent: true,
          _count: { select: { products: true } },
        },
      });

      if (!category) {
        throw new AppError('Category not found', 404);
      }

      res.json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { page = '1', limit = '12' } = req.query;

      const skip = (Number(page) - 1) * Number(limit);

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where: {
            categoryId: id,
            isActive: true,
          },
          include: {
            images: { take: 1, orderBy: { order: 'asc' } },
            brand: { select: { id: true, name: true } },
          },
          skip,
          take: Number(limit),
        }),
        prisma.product.count({
          where: { categoryId: id, isActive: true },
        }),
      ]);

      res.json({
        success: true,
        data: {
          products,
          pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            pages: Math.ceil(total / Number(limit)),
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
