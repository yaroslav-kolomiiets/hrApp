// if error is not an instanceOf AppError, convert it.
import expressValidation from "express-validation";

import AppError from "../app-error";

export default function(err, req, res, next) {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors
      .map(error => error.messages.join(". "))
      .join(" and ");
    const error = new AppError(unifiedErrorMessage, err.status);
    return next(error);
  }

  if (!(err instanceof AppError)) {
    const appError = new AppError(err.message, err.status);
    return next(appError);
  }

  return next(err);
};
