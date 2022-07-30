const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res, next) {
    if( req.query.is_showing) return next()
    res.json({ data: await moviesService.list() })
}

async function listNowShowing(req, res, next) {
    res.json({ data: await moviesService.listNowShowing() })
}

module.exports = {
    list: asyncErrorBoundary(list),
    listNowShowing: asyncErrorBoundary(listNowShowing)
}