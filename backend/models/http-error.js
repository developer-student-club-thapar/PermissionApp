class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // Add a "message" property
    this.code = errorCode; // Adds a "code" property
    this.status = `${errorCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = HttpError;
