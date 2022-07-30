const knex = require("../db/connection");
// const mapProperties = require("../utils/map-properties")

// const addCritic = ({

// })

function list() {
    return knex("movies").select("*");
}

function listNowShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .where({ "mt.is_showing": true })
        .groupBy("m.title")
}

function read(movie_id) {
    return knex("movies")
        .select("*")
        .where({ movie_id })
        .first()
}

function readWithTheater(movie_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("mt.*", "t.*")
        .where({ "mt.movie_id": movie_id })
}

module.exports = {
    list,
    listNowShowing,
    read,
    readWithTheater
}