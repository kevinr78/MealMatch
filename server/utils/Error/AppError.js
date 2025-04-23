class AppError extends Error {
  constructor(message, statusCode, customeMessage) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.reason = customeMessage;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
