import express from "express";
import httpStatus from "http-status";
import expressValidation from "express-validation";

import AppError from "../../helpers/app-error";

const router = express.Router();

// TODO implement authentication
router.get("/", (req, res) => res.status(401).send({ user: true }));

router.post("/login", (req, res) => res.send("login post"));

router.post("/logout", (req, res) => res.send("logout post"));

export default router;
