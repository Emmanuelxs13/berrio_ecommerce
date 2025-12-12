import { Request, Response, NextFunction } from 'express';
import { prisma } from '@berrio/database';
import { AppError } from '../middleware/errorHandler';

export class BrandController {
  async getBrands(req: Request, res: Response, next: NextFunction) {
    try {
      const brands = await prisma.brand.findMany({
        where: { isActive: true },
        include: {
          _count: {
            select: { products: true },
          },
        },
        orderBy: { name: 'asc' },
      });

      res.json({
        success: true,
        data: brands,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBrandById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const brand = await prisma.brand.findUnique({
        where: { id },
        include: {
          _count: { select: { products: true } },
        },
      });

      if (!brand) {
        throw new AppError('Brand not found', 404);
      }

      res.json({
        success: true,
        data: brand,
      });
    } catch (error) {
      next(error);
    }
  }

  async getBrandProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { page = '1', limit = '12' } = req.query;

      const skip = (Number(page) - 1) * Number(limit);

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where: {
            brandId: id,
            isActive: true,
          },
          include: {
            images: { take: 1, orderBy: { order: 'asc' } },
            category: { select: { id: true, name: true } },
          },
          skip,
          take: Number(limit),
        }),
        prisma.product.count({
          where: { brandId: id, isActive: true },
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
