import { CustomError } from './custom-error';

export class DatabaseValidationError extends CustomError {
  reason = 'Error connecting to the database';
  statusCode = 500;

  constructor() {
    super('Error connecting to the database');
    // only because we are extending a built-in class
    Object.setPrototypeOf(this, DatabaseValidationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
