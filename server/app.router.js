import express from "express";
import httpStatus from "http-status";
import RateLimit from "express-rate-limit";

import AppError from "./helpers/app-error";
import userRouter from "./components/user/user.router";
import authRouter from "./components/auth/auth.router";
import errorToAppError from "./helpers/router-middleware/error-to-apperror";
import config from "./config/config";

const router = express.Router();

const apiLimiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  delayMs: 0 // disabled
});

router.use(apiLimiter);

if (config.env === "development") {
  router.get("/", (req, res) => res.send("api-hrAppi"));
}

router.use("/auth", authRouter);
router.use("/users", userRouter);

router.use(errorToAppError);

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
  return res.end();
});

export default router;
