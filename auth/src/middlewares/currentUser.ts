import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      currentUser?: CurrentUser;
    }
  }
}

interface CurrentUser {
  id: string;
  email: string;
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) return next();
  try {
    const payload = jwt.verify(
      req.session?.jwt,
      process.env.JWT_KEY!,
    ) as CurrentUser;

    req.currentUser = payload;
  } catch (error) {}
  next();
};
