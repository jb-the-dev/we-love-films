const knex = require("../db/connection");

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

module.exports = {
    list,
    listNowShowing,
    read
}