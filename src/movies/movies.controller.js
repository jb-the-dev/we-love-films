const moviesService = require("./movies.service");
// insert asyncErrorBoundary

async function list(req, res, next) {
    if( req.query.is_showing) return next()
    res.json({ data: await moviesService.list() })
}

async function listNowShowing(req, res, next) {
        res.json({ data: await moviesService.listNowShowing() })
    next({ status: 404, message: "No movies are currently showing"})
}

module.exports = {
    list: list,
    listNowShowing: listNowShowing
}