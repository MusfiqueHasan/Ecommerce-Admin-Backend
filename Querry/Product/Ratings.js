const PromiseModule = require("../../helpers/Promise/PromiseModule");

const Ratings = {
  getReview,
  addReview,
  removeReview,
  getRatingByCount,
  updateReview,
  getReviewById,
};

// sql query to get all data
async function getReview() {
  const sqlSearch =
    "Select * From product_reviews,user_info where user_info.email = product_reviews.user_email";
  return PromiseModule.readData(sqlSearch);
}

// sql query to add data
async function addReview(ratingsData) {
  const sqlInsert =
    "Insert into product_reviews (ratings,comment,inserted_at,updated_at,	isApproved,	user_email,product_id) values ?";

  return PromiseModule.createUpdateDelete(sqlInsert, ratingsData);
}

async function getRatingByCount() {
  const sqlSearch = `SELECT ratings, COUNT(ratings) AS count FROM product_reviews GROUP BY ratings Order by ratings desc`;
  return PromiseModule.readData(sqlSearch);
}
async function removeReview(reviewId) {
  const sqlDelete =
    "Delete From product_reviews where (product_review_id) in (?)";
  return PromiseModule.createUpdateDelete(sqlDelete, reviewId);
}

async function updateReview(data) {
  const sqlUpdate = `UPDATE product_reviews SET isApproved=? WHERE product_reviews.product_review_id = ?`;
  return PromiseModule.createUpdateDelete(sqlUpdate, data);
}

async function getReviewById(id) {
  const sqlSearch = `Select * From product_reviews,user_info where user_info.email = product_reviews.user_email And product_reviews.product_id = ${id} And product_reviews.isApproved = 1 ORDER BY product_reviews.product_review_id DESC `;
  return PromiseModule.readData(sqlSearch);
}
module.exports = Ratings;
