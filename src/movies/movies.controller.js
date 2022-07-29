const moviesService = require("./movies.service");
// insert asyncErrorBoundary

async function list(req, res, next) {
    res.json({ data: await moviesService.list() })
}

module.exports = {
    list: list
}