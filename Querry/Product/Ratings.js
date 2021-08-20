const PromiseModule = require("../../dbModel/Promise/PromiseModule");

const Ratings = {
  getReview,
  addReview,
  removeReview,
  getRatingByCount
};

// sql query to get all data
async function getReview() {
  const sqlSearch = "Select * From product_reviews";
  return PromiseModule.readData(sqlSearch);
}

// sql query to add data
async function addReview(ratingsData) {
  const sqlInsert =
    "Insert into product_reviews (ratings,comment,inserted_at,updated_at,	isApproved,	user_email) values ?";

  return PromiseModule.createUpdateDelete(sqlInsert, ratingsData);
}

async function getRatingByCount() {
  const sqlSearch = `SELECT ratings, COUNT(ratings) AS count FROM product_reviews GROUP BY ratings Order by ratings desc`;
  return PromiseModule.readData(sqlSearch);
}
async function removeReview(reviewId) {
  const sqlDelete =
    "Delete From product_reviews where (product_review_id) in ?";
  return PromiseModule.createUpdateDelete(sqlDelete, reviewId);
}

module.exports = Ratings;
