export default class AppError extends Error {
  constructor(data, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    if ("name" in data && typeof data.name === "string") {
      this.name = data.name;
    }

    if ("httpCode" in data && !Number.isNaN(data.httpCode)) {
      this.httpCode = Number(data.httpCode);
    }
  }
}
