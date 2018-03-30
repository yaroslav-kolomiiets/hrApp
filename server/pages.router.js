import express from "express";
import path from "path";
import httpStatus from "http-status";

import config from "./config/config";
import AppError from "./helpers/app-error";
import errorToAppError from "./helpers/router-middleware/error-to-apperror";

const router = express.Router();
const publicPath = path.resolve(__dirname, config.publicDir);

router.use(express.static(publicPath));

router.get("*", (req, res) =>
  res.sendFile(path.join(publicPath, "index.html"))
);

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
  res.status(err.status || httpStatus.NOT_FOUND);
  return res.send("nope"); // TODO res send index for get method
});

export default router;
