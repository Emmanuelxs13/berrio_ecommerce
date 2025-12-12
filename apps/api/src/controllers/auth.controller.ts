import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '@berrio/database';
import { AppError } from '../middleware/errorHandler';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const data = registerSchema.parse(req.body);

      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new AppError('Email already registered', 400);
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
          phone: data.phone,
          role: 'CUSTOMER',
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        success: true,
        data: { user, token },
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = loginSchema.parse(req.body);

      const user = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        throw new AppError('Invalid credentials', 401);
      }

      const isValidPassword = await bcrypt.compare(
        data.password,
        user.password
      );

      if (!isValidPassword) {
        throw new AppError('Invalid credentials', 401);
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body;

      if (!token) {
        throw new AppError('Token required', 400);
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      const newToken = jwt.sign(
        { id: decoded.id, email: decoded.email, role: decoded.role },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        data: { token: newToken },
      });
    } catch (error) {
      next(new AppError('Invalid token', 401));
    }
  }
}
