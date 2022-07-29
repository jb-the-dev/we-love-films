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

module.exports = {
    list,
    listNowShowing
}