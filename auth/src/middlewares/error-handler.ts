import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseValidationError } from '../errors/database-validation-error';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof RequestValidationError) {
    const formattedErrors = error.errors.map((error) => {
      // check if the error type is because of missing field
      if (error.type === 'field') {
        return { message: error.msg, field: error.path };
      }
    });
    return res.status(400).json({ errors: formattedErrors });
  }

  if (error instanceof DatabaseValidationError) {
    return res.status(500).json({ errors: error.reason });
  }

  return res.status(400).json({ errors: [{ message: 'something wrongs' }] });
};
