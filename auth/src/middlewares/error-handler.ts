import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .json({ errors: error.serializeErrors() });
  }
  return res.status(400).json({ errors: [{ message: 'something wrongs' }] });
};
