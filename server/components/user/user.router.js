import express from "express";
import httpStatus from "http-status";
import expressValidation from "express-validation";

import AppError from "../../helpers/app-error";

const router = express.Router();

router
  .route("/")

  .get((req, res) => res.send("users get"))

  .post((req, res) => res.send("users post"));

router
  .route("/:userId")

  .get((req, res) => res.send("users by id get"))

  .put((req, res) => res.send("users by id put"))

  .delete((req, res) => res.send("users by id delete"));

router.param("userId", (req, res, next, id) => {
  console.log(`userId is ${id}`);
  next();
});

export default router;
