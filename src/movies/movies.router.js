const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const cors = require("cors");
router.use(cors());

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

//routes for /movies/:movieId/reviews
//routes for /movies/:movieId/theaters

router.use("/:movieId([0-9]+)/reviews", controller.movieExists, reviewsRouter);
router.use(
  "/:movieId([0-9]+)/theaters",
  controller.movieExists,
  theatersRouter
);

//routes for /movies/:movieId
//routes for /movies

router.route("/:movieId([0-9]+)").get(controller.read).all(methodNotAllowed);
router.route("/").all(cors()).get(controller.list).all(methodNotAllowed);

module.exports = router;
