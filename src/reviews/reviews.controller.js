const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

//middleware that checks that review exists with 'reviewId' as parameter
async function reviewExists(req, res, next) {
  const data = await service.read(req.params.reviewId);
  if (data) {
    res.locals.review = data;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
}

//deletes found review
async function destroy(req, res) {
  const data = await service.destroy(res.locals.review.review_id);
  res.status(204).json({ data });
}

//lists all reviews for single movie
async function list(req, res) {
  const { movieId } = req.params;
  const data = await service.list(movieId);
  res.json({ data });
}

//ensures 'movieId' in path; if not, calls methodNotAllowed()
function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

//ensures no 'movieId' in path; if so, calls methodNotAllowed()
function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

//takes request with 'reviewId' and body and updates review
async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  const data = await service.update(updatedReview);

  res.json({ data });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};