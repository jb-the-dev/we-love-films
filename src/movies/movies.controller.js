const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


// VALIDATION FUNCTIONS
async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie
        return next()
    }
    next({ status: 404, message: `Movie cannot be found.`})
}

// HANDLERS
async function list(req, res, next) {
    if( req.query.is_showing) return next()
    res.json({ data: await moviesService.list() })
}

async function listNowShowing(req, res, next) {
    res.json({ data: await moviesService.listNowShowing() })
}

function read(req, res, next) {
    const { movie: data } = res.locals;
    res.json({ data });
}

async function readMovieTheaters(req, res, next) {
    const movieId = req.params.movieId
    res.json({data: await moviesService.readMovieTheaters(movieId)})
}

async function readMovieReviews(req, res, next) {
    const movieId = req.params.movieId
    res.json({data: await moviesService.readMovieReviews(movieId)})
}

module.exports = {
    list: asyncErrorBoundary(list),
    listNowShowing: asyncErrorBoundary(listNowShowing),
    read: [asyncErrorBoundary(movieExists), read],
    readMovieTheaters: [asyncErrorBoundary(movieExists), readMovieTheaters],
    readMovieReviews: [asyncErrorBoundary(movieExists), readMovieReviews]
    }