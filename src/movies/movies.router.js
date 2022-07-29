const router = require("express").Router();
const moviesController = require("./movies.controller");
// insert methodNotAllowed handler

router.route("/").get(moviesController.list).get(moviesController.listNowShowing)

module.exports = router