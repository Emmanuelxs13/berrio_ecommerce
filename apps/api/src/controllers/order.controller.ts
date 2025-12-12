import { Response, NextFunction } from 'express';
import { prisma } from '@berrio/database';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

export class OrderController {
  async getOrders(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;

      const orders = await prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: { take: 1 },
                },
              },
            },
          },
          payment: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      res.json({
        success: true,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = (req as any).params;

      const order = await prisma.order.findFirst({
        where: {
          id,
          userId,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: { take: 1 },
                },
              },
            },
          },
          payment: true,
          shippingAddress: true,
        },
      });

      if (!order) {
        throw new AppError('Order not found', 404);
      }

      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async createOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { shippingAddressId, paymentMethod } = (req as any).body;

      // Get cart items
      const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { product: true },
      });

      if (cartItems.length === 0) {
        throw new AppError('Cart is empty', 400);
      }

      // Validate stock
      for (const item of cartItems) {
        if (item.product.stock < item.quantity) {
          throw new AppError(
            `Insufficient stock for ${item.product.name}`,
            400
          );
        }
      }

      // Calculate totals
      const subtotal = cartItems.reduce(
        (sum: number, item: any) => sum + item.product.price * item.quantity,
        0
      );
      const tax = subtotal * 0.16; // 16% IVA
      const shipping = 99; // Fixed shipping cost
      const total = subtotal + tax + shipping;

      // Create order with transaction
      const order = await prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
          data: {
            userId,
            subtotal,
            tax,
            shipping,
            total,
            status: 'PENDING',
            shippingAddressId,
            items: {
              create: cartItems.map((item: any) => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.product.price,
              })),
            },
            payment: {
              create: {
                amount: total,
                provider: paymentMethod,
                status: 'PENDING',
              },
            },
          },
          include: {
            items: {
              include: {
                product: {
                  include: {
                    images: { take: 1 },
                  },
                },
              },
            },
            payment: true,
          },
        });

        // Clear cart
        await tx.cartItem.deleteMany({
          where: { userId },
        });

        // Reduce stock
        for (const item of cartItems) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        }

        return newOrder;
      });

      res.status(201).json({
        success: true,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const { id } = (req as any).params;

      const order = await prisma.order.findFirst({
        where: {
          id,
          userId,
        },
      });

      if (!order) {
        throw new AppError('Order not found', 404);
      }

      if (order.status !== 'PENDING') {
        throw new AppError('Cannot cancel this order', 400);
      }

      await prisma.order.update({
        where: { id },
        data: { status: 'CANCELLED' },
      });

      res.json({
        success: true,
        message: 'Order cancelled successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
