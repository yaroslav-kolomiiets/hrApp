import express from "express";
import morgan from "morgan";
import methodOverride from "method-override";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";

import config from "./config";
import apiRouter from "../app.router";
import pagesRouter from "../pages.router";

const app = express();

app.disable("x-powered-by");

if (config.env === "development") {
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
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride());

app.use(helmet());
app.use(cors());

app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
  })
);

app.use("/api", apiRouter);
app.use(pagesRouter);

export default app;
