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

async function movieAndTheaterExist(req, res, next) {
    // console.log(req.params)
    const movieAndTheater = await moviesService.readWithTheater(req.params.movieId);
    console.log("move", movieAndTheater)
    if (movieAndTheater) {
        res.locals.movieAndTheater = movieAndTheater
        return next()
    }
    next({ status: 404, message: `Movie cannot be found.`})}

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

function readWithTheater(req, res, next){
    const { movieAndTheater: data } = res.locals;
    res.json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list),
    listNowShowing: asyncErrorBoundary(listNowShowing),
    read: [asyncErrorBoundary(movieExists), read],
    readWithTheater: [
        asyncErrorBoundary(movieAndTheaterExist), readWithTheater],
}