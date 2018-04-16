import express from "express";

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
  // eslint-disable-next-line no-console
  console.log(`userId is ${id}`);
  next();
});

export default router;
