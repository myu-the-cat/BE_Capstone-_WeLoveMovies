const db = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const tableName = "reviews";

//destroys single review
async function destroy(reviewId) {
  return db(tableName).where({ review_id : reviewId }).del();
}

const reduceReviews = reduceProperties("critic_id", {
  critic_id: ["critic", null, "critic_id"],
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
});

//queries list of all reviews for specific movie
async function list(movie_id) {
  return db(`${tableName} as r`)
  .where({ movie_id })
  .join("critics as c", "r.critic_id", "c.critic_id")
  .then(reduceReviews)
  .then((data) =>
    data.map((review) => {
      const newReview = { ...review };
      const critic = review.critic[0];
      newReview.critic = critic;
      return newReview;
    })
  );  
}

//queries a single review
async function read(reviewId) {
  return db(tableName).select("*").where({ review_id : reviewId }).first();  
}

//queries a single critic
async function readCritic(critic_id) {
  return db("critics").where({ critic_id }).first();
}

//returns critic for specific review
async function setCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

//updates review including nested critic
async function update(review) {
  return db(tableName)
    .where({ review_id: review.review_id })
    .update(review, "*")
    .then(() => read(review.review_id))
    .then(setCritic);
}

module.exports = {
  destroy,
  list,
  read,
  update,
};