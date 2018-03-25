import express from "express";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import httpStatus from "http-status";

import AppError from "./helpers/app-error";

// var index = require('./routes/index');
// var users = require('./routes/users');

const app = express();

app.disable("x-powered-by");

app.use(
  morgan("dev", {
    skip: (req, res) => res.statusCode < 400,
    stream: process.stderr
  })
);

app.use(
  morgan("dev", {
    skip: (req, res) => res.statusCode >= 400,
    stream: process.stdout
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "../dist/public")));

// app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new AppError(
    {
      name: "RouterError",
      httpCode: httpStatus.NOT_FOUND
    },
    httpStatus[404]
  );
  return next(err);
});

// global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(err.httpCode || httpStatus.INTERNAL_SERVER_ERROR);
  return res.end();
});

export default app;
