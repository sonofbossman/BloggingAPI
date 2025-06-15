class CustomAPIError extends Error {
  constructor(message, statusCode, statusMsg) {
    super(message);
    this.statusCode = statusCode;
    this.statusMsg = statusMsg;
  }
}

const createCustomError = (message, statusCode, statusMsg) =>
  new CustomAPIError(message, statusCode, statusMsg);
export { CustomAPIError, createCustomError };
