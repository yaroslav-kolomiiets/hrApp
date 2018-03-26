import httpStatus from "http-status";

export default class AppError extends Error {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR, ...params) {
    super(...params);

    this.name = this.constructor.name;
    this.message = message;
    this.status = status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}
