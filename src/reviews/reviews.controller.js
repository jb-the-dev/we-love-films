const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service");

// VALIDATORS
const reviewExists = (req, res, next) => {
    reviewsService
      .read(req.params.reviewId)
      .then((review) => {
        if (review) {
          res.locals.review = review;
          return next();
        }
        return next({ status: 404, message: `Review cannot be found.` });
      })
      .catch(next);
}

const VALID_PROPERTIES = [
    "review_id",
    "content",
    "score",
    "created_at",
    "updated_at",
    "critic_id",
    "movie_id",
    "critic"
]

function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
  
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
  
    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalid field(s): ${invalidFields.join(", ")}`,
      });
    }
    next();
  }


// HANDLERS
async function destroy(req, res, next){
    const { review } = res.locals
    await reviewsService.delete(review.review_id)
    res.sendStatus(204)
}

async function update(req, res, next) {
    const reviewId = req.params.reviewId
    const reviewData = req.body.data
    console.log("DATA??", req.body.data)
    const updatedReview = {
        ...reviewData,
        review_id: reviewId
    }
    res.json({ data: await reviewsService.update(updatedReview) })
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), destroy],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(hasOnlyValidProperties), asyncErrorBoundary(update)],
};