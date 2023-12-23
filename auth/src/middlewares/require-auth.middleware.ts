import { NextFunction, Request, Response } from 'express';
import { NotAuthorizedError } from '../errors/notAuthorized.error';

export const requireAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
