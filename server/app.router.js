import express from "express";
import httpStatus from "http-status";
import expressValidation from "express-validation";

import AppError from "./helpers/app-error";
import userRouter from "./components/user/user.router";

const router = express.Router();

router.get("/", (req, res) => res.send("api-hrAppi"));

router.use("/users", userRouter);

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
  return res.send(httpStatus[404]);
});

export default router;
