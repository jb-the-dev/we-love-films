const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const moviesController = require("./movies.controller");

router
  .route("/")
  .get(moviesController.list)
  .get(moviesController.listNowShowing)
  .all(methodNotAllowed);

router
  .route("/:movieId([0-9]+)")
  .get(moviesController.read)
  .all(methodNotAllowed);

router
  .route("/:movieId/theaters")
  .get(moviesController.readMovieTheaters)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(moviesController.readMovieReviews)
  .all(methodNotAllowed)

module.exports = router;
