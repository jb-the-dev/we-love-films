# WeLoveMovies

## Description
The purpose of this app is to build the server side of a React app that would allow users to navigate through a selection of movies and their associated movie theaters & reviews.

This work represents the first full back-end application developed by JB. The tools and skills implemented were PostgreSQL, Knex, CORS, RESTful API structure, and Express.

In each resource directory, there are three files: `[resource].router.js`, `[resource].controller.js`, and `[resource].service.js`.

For this project, the service files contain code interacting with the database, the controller files contain any data validation & async handling functions to the database, and the router files link the backend logic to their specific routes

The app's frontend UI was already provided. See this repo's **About** section for a link to the deployed frontend of the app.

### Available routes
| Routes                        | CRUD allowed         | Description |
| :-----------------------------|:----------------------------:|:------------|
| `/movies`                     | GET                          | Gets list of movies |
| `/movies?is_showing=true`     | GET                          | Gets list of movies showing in theaters |
| `/movies/:movieId`            | GET                          | Gets a single movie |
| `/movies/:movieId/theaters`   | GET                          | Gets all theaters showing a specific movie |
| `/movies/:movieId/reviews`    | GET                          | Gets all reviews written abouat a specific movie |
| `/reviews/:reviewId`          | POST,  DELETE                | Allows for deletion and creation of reviews |
| `/theaters`                   | GET                          | Lists all theaters and the movies showing at each theater |


## Instructions for using locally
1. Fork and clone this repository.
2. Run `npm install`
3. Run `npm start`

## Reflections
- CORS errors are typically red herrings; the error is likely somewhere else
- The resource file structure of *service, controller*, and *router* is functionally synonymous with that of *repository, service* and *controller*, respectively.
