export class DatabaseValidationError extends Error {
  reason = 'Error connecting to the database';
  constructor() {
    super();
    // only because we are extending a built-in class
    Object.setPrototypeOf(this, DatabaseValidationError.prototype);
  }
}
