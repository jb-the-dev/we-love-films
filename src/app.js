if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const homeRouter = express.Router();
const moviesRouter = require("./movies/movies.router")
const reviewsRouter = require("./reviews/reviews.router")
const theatersRouter = require("./theaters/theaters.router")

const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")

app.use(cors())
app.use(express.json());

// CUSTOM HOMEPAGE ROUTE
homeRouter.get('/', (req, res) => {
  res.json({ message:
  'Welcome! You can access data via the following routes: /movies, /reviews, /theaters, /reviews/:reviewId, /movies/:movieId, /movies/:movieId/theaters, /movies/:movieId/reviews.'});
})

app.use('/', homeRouter);

// ROUTERS
app.use("/movies", moviesRouter)
app.use("/reviews", reviewsRouter)
app.use("/theaters", theatersRouter)

// ERRORS
app.use(notFound)
app.use(errorHandler)

module.exports = app;