import { Response, NextFunction } from 'express';
import { prisma } from '@berrio/database';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export class CartController {
  async getCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;

      const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: {
          product: {
            include: {
              images: { take: 1, orderBy: { order: 'asc' } },
              brand: { select: { name: true } },
            },
          },
        },
      });

      const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      res.json({
        success: true,
        data: {
          items: cartItems,
          subtotal,
          itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async addItem(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { productId, quantity = 1 } = req.body;

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      if (product.stock < quantity) {
        throw new AppError('Insufficient stock', 400);
      }

      const existingItem = await prisma.cartItem.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      let cartItem;

      if (existingItem) {
        cartItem = await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + quantity,
          },
          include: {
            product: {
              include: {
                images: { take: 1 },
              },
            },
          },
        });
      } else {
        cartItem = await prisma.cartItem.create({
          data: {
            userId,
            productId,
            quantity,
          },
          include: {
            product: {
              include: {
                images: { take: 1 },
              },
            },
          },
        });
      }

      res.status(201).json({
        success: true,
        data: cartItem,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateItem(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;
      const { quantity } = req.body;

      const cartItem = await prisma.cartItem.findUnique({
        where: { id },
        include: { product: true },
      });

      if (!cartItem || cartItem.userId !== userId) {
        throw new AppError('Cart item not found', 404);
      }

      if (cartItem.product.stock < quantity) {
        throw new AppError('Insufficient stock', 400);
      }

      const updated = await prisma.cartItem.update({
        where: { id },
        data: { quantity },
        include: {
          product: {
            include: {
              images: { take: 1 },
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

  async removeItem(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      const cartItem = await prisma.cartItem.findUnique({
        where: { id },
      });

      if (!cartItem || cartItem.userId !== userId) {
        throw new AppError('Cart item not found', 404);
      }

      await prisma.cartItem.delete({
        where: { id },
      });

      res.json({
        success: true,
        message: 'Item removed from cart',
      });
    } catch (error) {
      next(error);
    }
  }

  async clearCart(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;

      await prisma.cartItem.deleteMany({
        where: { userId },
      });

      res.json({
        success: true,
        message: 'Cart cleared',
      });
    } catch (error) {
      next(error);
    }
  }
}
