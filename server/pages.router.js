import express from "express";
import path from "path";
import httpStatus from "http-status";
import expressValidation from "express-validation";

import config from "./config/config";
import AppError from "./helpers/app-error";

const router = express.Router();
const publicPath = path.resolve(__dirname, config.publicDir);

router.use(express.static(publicPath));

router.get("*", (req, res) =>
  res.sendFile(path.join(publicPath, "index.html"))
);

// if error is not an instanceOf APIError, convert it.
router.use((err, req, res, next) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors
      .map(error => error.messages.join(". "))
      .join(" and ");
    const error = new AppError(unifiedErrorMessage, err.status);
    return next(error);
  }

  if (!(err instanceof AppError)) {
    const apiError = new AppError(err.message, err.status);
    return next(apiError);
  }

  return next(err);
});

// catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new AppError(httpStatus[404], httpStatus.NOT_FOUND);
  return next(err);
});

// TODO replace with error logger
router.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  return next(err);
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
  return res.send("Public dir is empty");
});

export default router;
