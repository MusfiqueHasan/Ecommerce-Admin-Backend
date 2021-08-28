const Ratings = ratings => {
  const ratingFormat = {
    product_review_id: ratings.product_review_id,
    ratings: ratings.ratings,
    comment: ratings.comment,
    isApproved: ratings.isApproved,
    user_email: ratings.user_email,
    product_id: ratings.product_id,
    user_id: ratings.id,
    first_name: ratings.first_name,
    last_name: ratings.last_name,
    time: ratings.inserted_at,
  };
  return ratingFormat;
};

module.exports = { Ratings };
