import { CustomError } from './custom-error';
export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message); // to log the error message as if calling throw new Error
    // only because we are extending a built-in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
