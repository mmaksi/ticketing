import { CustomError } from './custom-error';
export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not authorized'); // to log the error message as if calling throw new Error
    // only because we are extending a built-in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
