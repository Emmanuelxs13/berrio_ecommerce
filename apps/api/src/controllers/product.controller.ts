import { Request, Response, NextFunction } from 'express';
import { prisma } from '@berrio/database';
import { AppError } from '../middleware/errorHandler';
import { mockProducts } from '../utils/mockData';

// Check if DATABASE_URL is available
const useMockData = !process.env.DATABASE_URL;

export class ProductController {
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      // Use mock data if no database
      if (useMockData) {
        const { page = '1', limit = '12' } = req.query;

        const skip = (Number(page) - 1) * Number(limit);
        const paginatedProducts = mockProducts.slice(
          skip,
          skip + Number(limit)
        );

        return res.json({
          success: true,
          data: {
            products: paginatedProducts,
            pagination: {
              total: mockProducts.length,
              page: Number(page),
              limit: Number(limit),
              pages: Math.ceil(mockProducts.length / Number(limit)),
            },
          },
        });
      }

      const {
        page = '1',
        limit = '12',
        categoryId,
        brandId,
        minPrice,
        maxPrice,
        sortBy = 'createdAt',
        sortOrder = 'desc',
      } = req.query;

      const skip = (Number(page) - 1) * Number(limit);
      const where: any = { isActive: true };

      if (categoryId) where.categoryId = categoryId;
      if (brandId) where.brandId = brandId;
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = Number(minPrice);
        if (maxPrice) where.price.lte = Number(maxPrice);
      }

      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          include: {
            images: { take: 1, orderBy: { order: 'asc' } },
            category: { select: { id: true, name: true } },
            brand: { select: { id: true, name: true } },
          },
          skip,
          take: Number(limit),
          orderBy: { [sortBy as string]: sortOrder },
        }),
        prisma.product.count({ where }),
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

  async getFeaturedProducts(req: Request, res: Response, next: NextFunction) {
    try {
      // Use mock data if no database
      if (useMockData) {
        const featuredProducts = mockProducts
          .filter((p) => p.isFeatured)
          .slice(0, 8);
        return res.json({
          success: true,
          data: featuredProducts,
        });
      }

      const products = await prisma.product.findMany({
        where: {
          isActive: true,
          isFeatured: true,
        },
        include: {
          images: { take: 1, orderBy: { order: 'asc' } },
          category: { select: { id: true, name: true } },
          brand: { select: { id: true, name: true } },
        },
        take: 8,
        orderBy: { createdAt: 'desc' },
      });

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  async searchProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;

      if (!q) {
        throw new AppError('Search query required', 400);
      }

      const products = await prisma.product.findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: q as string, mode: 'insensitive' } },
            { description: { contains: q as string, mode: 'insensitive' } },
          ],
        },
        include: {
          images: { take: 1, orderBy: { order: 'asc' } },
          category: { select: { id: true, name: true } },
          brand: { select: { id: true, name: true } },
        },
        take: 20,
      });

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          images: { orderBy: { order: 'asc' } },
          category: true,
          brand: true,
          reviews: {
            where: { status: 'APPROVED' },
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
          },
        },
      });

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await prisma.product.create({
        data: req.body,
        include: {
          images: true,
          category: true,
          brand: true,
        },
      });

      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const product = await prisma.product.update({
        where: { id },
        data: req.body,
        include: {
          images: true,
          category: true,
          brand: true,
        },
      });

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      await prisma.product.update({
        where: { id },
        data: { isActive: false },
      });

      res.json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
